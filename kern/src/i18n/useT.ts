import { useStore } from '../store/useStore';
import { translations, TransKey, Lang } from './translations';

export function useT() {
  const lang = useStore(s => s.lang);
  return (key: TransKey): string => translations[lang]?.[key] ?? translations.it[key] ?? key;
}

export { type Lang, type TransKey };
