import { Hairdresser } from "../models/Hairdresser";

const localStorageKey = "hairSalon";

export const loadHairSalonData = (): Hairdresser[] => {
  const data = localStorage.getItem(localStorageKey);
  if (data) {
    return JSON.parse(data);
  } else {
    // Alapértelmezett adatstruktúra, ha a localStorage üres
    return [
      {
        nev: "Fodrász Fruzsi",
        nyitvatartas: [
          { nap: "Hétfő", napIndex: 1, tol: "10", ig: "15:30" },
          { nap: "Szerda", napIndex: 3, tol: "9", ig: "14:30" },
          { nap: "Szombat", napIndex: 6, tol: "10", ig: "13" },
        ],
        idopontfoglals: [],
      },
      // ... további fodrászok adatai
    ];
  }
};


export const saveHairSalonData = (data: Hairdresser[]) => {
  localStorage.setItem(localStorageKey, JSON.stringify(data));
};


