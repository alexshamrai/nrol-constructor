import { useTranslation } from 'react-i18next';

export function useLocalizedField() {
  const { i18n } = useTranslation();
  const isUa = i18n.language === 'ua';

  return {
    name: (item: { nameEn: string; nameUa: string }) =>
      isUa ? item.nameUa : item.nameEn,
    description: (item: { descriptionEn: string; descriptionUa: string }) =>
      isUa ? item.descriptionUa : item.descriptionEn,
    label: (item: { labelEn?: string; labelUa?: string }) =>
      isUa ? (item.labelUa ?? item.labelEn ?? '') : (item.labelEn ?? ''),
  };
}
