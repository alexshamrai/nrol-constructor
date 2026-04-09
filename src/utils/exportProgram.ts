import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { programs } from '../data/programs';
import { exercises } from '../data/exercises';
import {
  hyp1Periodization,
  hyp2Periodization,
  hyp3Periodization,
  waveLoadingSessions,
} from '../data/periodization';
import type { ProgramId, PeriodizationMode, LinearPhase, UndulatingWeek } from '../types';

// ── Helpers ───────────────────────────────────────────────────

const isHypertrophy = (id: ProgramId): boolean =>
  id === 'hyp1' || id === 'hyp2' || id === 'hyp3';

const periodizationMap: Record<
  string,
  { undulating: { undulating?: { weeks: UndulatingWeek[] } }; linear: { linear?: LinearPhase[] } }
> = {
  hyp1: hyp1Periodization,
  hyp2: hyp2Periodization,
  hyp3: hyp3Periodization,
};

function lookupExerciseName(exerciseId: string): string {
  const ex = exercises.find((e) => e.id === exerciseId);
  return ex ? ex.nameEn : exerciseId;
}

function formatRest(seconds: number | undefined): string {
  if (!seconds) return '-';
  return seconds >= 60 ? `${seconds / 60}m` : `${seconds}s`;
}

// ── Session plan row builder (shared between PDF and XLSX) ───

interface SessionRow {
  session: number;
  workoutLabel: string;
  setsReps: string;
  rest: string;
  phaseIntensity: string;
}

function buildSessionRows(
  programId: ProgramId,
  mode: PeriodizationMode,
): SessionRow[] {
  const program = programs.find((p) => p.id === programId);
  if (!program) return [];

  const totalSessions = 12;
  const workoutCount = program.workouts.length;
  const rows: SessionRow[] = [];

  if (programId === 'sp3') {
    for (let s = 0; s < totalSessions; s++) {
      const workoutIdx = s % workoutCount;
      const occurrence = Math.floor(s / workoutCount);
      const wave = waveLoadingSessions[occurrence];
      const waveReps = wave
        ? wave.wave1.reps.join('-') + ', ' + wave.wave2.reps.join('-')
        : '';
      rows.push({
        session: s + 1,
        workoutLabel: program.workouts[workoutIdx].label,
        setsReps: wave ? `6 x ${wave.wave1.reps.join('-')}` : 'wave',
        rest: '120s',
        phaseIntensity: wave ? `Wave ${occurrence + 1}: ${waveReps}` : '',
      });
    }
    return rows;
  }

  if (programId === 'sp2') {
    for (let s = 0; s < totalSessions; s++) {
      const workoutIdx = s % workoutCount;
      const workout = program.workouts[workoutIdx];
      const maxSlot = workout.slots.find((sl) => sl.isMaxStrength);
      rows.push({
        session: s + 1,
        workoutLabel: workout.label,
        setsReps: maxSlot ? `${maxSlot.sets} x ${maxSlot.reps}` : '-',
        rest: maxSlot?.restSeconds ? `${maxSlot.restSeconds}s` : '-',
        phaseIntensity: 'MAX Strength',
      });
    }
    return rows;
  }

  if (programId === 'sp1') {
    for (let s = 0; s < totalSessions; s++) {
      const workoutIdx = s % workoutCount;
      const workout = program.workouts[workoutIdx];
      const maxSlot = workout.slots.find((sl) => sl.isMaxStrength);
      rows.push({
        session: s + 1,
        workoutLabel: workout.label,
        setsReps: maxSlot ? `${maxSlot.sets} x ${maxSlot.reps}` : '-',
        rest: maxSlot?.restSeconds ? `${maxSlot.restSeconds}s` : '-',
        phaseIntensity: 'MAX Strength + Giant Set',
      });
    }
    return rows;
  }

  if (isHypertrophy(programId)) {
    const config = periodizationMap[programId];
    if (!config) return [];

    if (mode === 'linear') {
      const phases = config.linear.linear ?? [];
      for (let s = 0; s < totalSessions; s++) {
        const workoutIdx = s % workoutCount;
        const workout = program.workouts[workoutIdx];
        const phase = phases.find(
          (p) => s + 1 >= p.sessions[0] && s + 1 <= p.sessions[1],
        );
        const phaseIdx = phases.indexOf(phase!);
        rows.push({
          session: s + 1,
          workoutLabel: workout.label,
          setsReps: phase ? `${phase.sets} x ${phase.reps}` : '-',
          rest: phase ? `${phase.restSeconds}s` : '-',
          phaseIntensity: phase ? `Phase ${phaseIdx + 1}` : '',
        });
      }
    } else {
      const weeks = config.undulating.undulating?.weeks ?? [];
      for (let s = 0; s < totalSessions; s++) {
        const workoutIdx = s % workoutCount;
        const weekIdx = Math.floor(s / 2);
        const week = weeks[weekIdx];
        const data = workoutIdx === 0 ? week?.workoutA : week?.workoutB;
        rows.push({
          session: s + 1,
          workoutLabel: program.workouts[workoutIdx].label,
          setsReps: data ? `${data.sets} x ${data.reps}` : '-',
          rest: data ? `${data.restSeconds}s` : '-',
          phaseIntensity: data?.intensity
            ? data.intensity.charAt(0).toUpperCase() + data.intensity.slice(1)
            : '',
        });
      }
    }
    return rows;
  }

  // BT programs
  for (let s = 0; s < totalSessions; s++) {
    const workoutIdx = s % workoutCount;
    const workout = program.workouts[workoutIdx];
    const mainSlot = workout.slots.find(
      (sl) => sl.order === '1a' || sl.order === '1',
    );
    rows.push({
      session: s + 1,
      workoutLabel: workout.label,
      setsReps: mainSlot ? `${mainSlot.sets} x ${mainSlot.reps}` : '-',
      rest: mainSlot?.restSeconds ? `${mainSlot.restSeconds}s` : '-',
      phaseIntensity: '-',
    });
  }

  return rows;
}

// ── PDF Export ─────────────────────────────────────────────────

export function exportProgramPdf(
  programId: ProgramId,
  exerciseSelections: Record<string, Record<string, string>>,
  periodizationMode: PeriodizationMode = 'linear',
): void {
  const program = programs.find((p) => p.id === programId);
  if (!program) return;

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const darkBg: [number, number, number] = [30, 30, 36];
  const headerBg: [number, number, number] = [45, 45, 55];
  const textWhite: [number, number, number] = [230, 230, 235];
  const textGray: [number, number, number] = [160, 160, 170];

  // Background
  doc.setFillColor(...darkBg);
  doc.rect(0, 0, 210, 297, 'F');

  // Title
  doc.setTextColor(...textWhite);
  doc.setFontSize(20);
  doc.text(program.nameEn, 14, 20);

  // Description
  doc.setFontSize(10);
  doc.setTextColor(...textGray);
  doc.text(program.descriptionEn, 14, 28, { maxWidth: 180 });

  // Overview info
  let y = 38;
  doc.setFontSize(9);
  doc.text(`Phase: ${program.phase.replace('_', ' ')}`, 14, y);
  doc.text(`Sessions: ${program.sessions}  |  Workouts/week: ${program.workoutsPerWeek}`, 14, y + 5);
  if (isHypertrophy(programId)) {
    doc.text(`Periodization: ${periodizationMode}`, 14, y + 10);
    y += 5;
  }
  y += 15;

  // Workout tables
  for (const workout of program.workouts) {
    doc.setFontSize(12);
    doc.setTextColor(...textWhite);
    doc.text(`Workout ${workout.label}`, 14, y);
    y += 3;

    const workoutSelections = exerciseSelections[workout.id] ?? {};
    const tableBody = workout.slots.map((slot) => {
      const exerciseName = workoutSelections[slot.order]
        ? lookupExerciseName(workoutSelections[slot.order])
        : '(not selected)';
      return [
        slot.order,
        slot.category,
        exerciseName,
        slot.sets,
        slot.reps,
        formatRest(slot.restSeconds),
      ];
    });

    autoTable(doc, {
      startY: y,
      head: [['#', 'Category', 'Exercise', 'Sets', 'Reps', 'Rest']],
      body: tableBody,
      theme: 'grid',
      styles: {
        fillColor: darkBg,
        textColor: textWhite,
        lineColor: [60, 60, 70],
        lineWidth: 0.2,
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: headerBg,
        textColor: textWhite,
        fontStyle: 'bold',
        fontSize: 8,
      },
      alternateRowStyles: {
        fillColor: [35, 35, 42],
      },
      margin: { left: 14, right: 14 },
    });

    y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 8;

    // Add new page if running out of space
    if (y > 260) {
      doc.addPage();
      doc.setFillColor(...darkBg);
      doc.rect(0, 0, 210, 297, 'F');
      y = 15;
    }
  }

  // Session Plan table
  doc.addPage();
  doc.setFillColor(...darkBg);
  doc.rect(0, 0, 210, 297, 'F');

  doc.setFontSize(14);
  doc.setTextColor(...textWhite);
  doc.text('Session Plan (12 Sessions)', 14, 15);

  const sessionRows = buildSessionRows(programId, periodizationMode);
  autoTable(doc, {
    startY: 20,
    head: [['#', 'Workout', 'Sets x Reps', 'Rest', 'Phase / Intensity']],
    body: sessionRows.map((r) => [
      r.session.toString(),
      r.workoutLabel,
      r.setsReps,
      r.rest,
      r.phaseIntensity,
    ]),
    theme: 'grid',
    styles: {
      fillColor: darkBg,
      textColor: textWhite,
      lineColor: [60, 60, 70],
      lineWidth: 0.2,
      fontSize: 8,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: headerBg,
      textColor: textWhite,
      fontStyle: 'bold',
      fontSize: 8,
    },
    alternateRowStyles: {
      fillColor: [35, 35, 42],
    },
    margin: { left: 14, right: 14 },
  });

  doc.save(`${program.nameEn.replace(/\s+/g, '_')}.pdf`);
}

// ── XLSX Export ────────────────────────────────────────────────

export function exportProgramXlsx(
  programId: ProgramId,
  exerciseSelections: Record<string, Record<string, string>>,
  periodizationMode: PeriodizationMode = 'linear',
): void {
  const program = programs.find((p) => p.id === programId);
  if (!program) return;

  const wb = XLSX.utils.book_new();

  // Sheet 1: Program Overview
  const overviewData = [
    ['Program', program.nameEn],
    ['Phase', program.phase.replace('_', ' ')],
    ['Sessions', program.sessions],
    ['Workouts/week', program.workoutsPerWeek],
    ['Description', program.descriptionEn],
    ['Changes from previous', program.changesFromPrevEn],
    ['Metabolic', program.metabolic.detailsEn],
  ];
  if (isHypertrophy(programId)) {
    overviewData.push(['Periodization mode', periodizationMode]);
  }
  const overviewSheet = XLSX.utils.aoa_to_sheet(overviewData);
  overviewSheet['!cols'] = [{ wch: 22 }, { wch: 60 }];
  XLSX.utils.book_append_sheet(wb, overviewSheet, 'Program Overview');

  // Sheet per workout
  for (const workout of program.workouts) {
    const workoutSelections = exerciseSelections[workout.id] ?? {};
    const header = ['#', 'Category', 'Pattern', 'Exercise', 'Sets', 'Reps', 'Rest'];
    const body = workout.slots.map((slot) => {
      const exerciseName = workoutSelections[slot.order]
        ? lookupExerciseName(workoutSelections[slot.order])
        : '(not selected)';
      return [
        slot.order,
        slot.category,
        slot.pattern,
        exerciseName,
        slot.sets,
        slot.reps,
        formatRest(slot.restSeconds),
      ];
    });
    const sheetData = [header, ...body];
    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    ws['!cols'] = [
      { wch: 10 },
      { wch: 18 },
      { wch: 18 },
      { wch: 30 },
      { wch: 8 },
      { wch: 12 },
      { wch: 8 },
    ];
    XLSX.utils.book_append_sheet(wb, ws, `Workout ${workout.label}`);
  }

  // Last sheet: Session Plan
  const sessionRows = buildSessionRows(programId, periodizationMode);
  const sessionHeader = ['#', 'Workout', 'Sets x Reps', 'Rest', 'Phase / Intensity'];
  const sessionBody = sessionRows.map((r) => [
    r.session,
    r.workoutLabel,
    r.setsReps,
    r.rest,
    r.phaseIntensity,
  ]);
  const sessionSheet = XLSX.utils.aoa_to_sheet([sessionHeader, ...sessionBody]);
  sessionSheet['!cols'] = [
    { wch: 6 },
    { wch: 10 },
    { wch: 14 },
    { wch: 8 },
    { wch: 24 },
  ];
  XLSX.utils.book_append_sheet(wb, sessionSheet, 'Session Plan');

  XLSX.writeFile(wb, `${program.nameEn.replace(/\s+/g, '_')}.xlsx`);
}
