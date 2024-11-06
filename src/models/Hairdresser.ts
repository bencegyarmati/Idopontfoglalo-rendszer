export interface Hairdresser {
    nev: string;
    nyitvatartas: {
      nap: string;
      napIndex: number;
      tol: string;
      ig: string;
    }[];
    idopontfoglals: {
      nev: string;
      datum: string;
      ora: string;
    }[];
  }