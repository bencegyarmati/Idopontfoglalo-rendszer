import Hairdresser from '../models/Hairdresser';

const localStorageKey = 'hairSalon';

const loadData = (): Hairdresser[] => {
  const data = localStorage.getItem(localStorageKey);
  return data ? JSON.parse(data) : [];
};

const saveData = (hairSalon: Hairdresser[]): void => {
  localStorage.setItem(localStorageKey, JSON.stringify(hairSalon));
};

export { loadData, saveData };