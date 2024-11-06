import Appointment from "./Appointment";

interface Nyitvatartas {
    nap: string;
    napIndex: number;
    tol: string;
    ig: string;
  }
  
  interface Hairdresser {
    neve: string;
    nyitvatartas: Nyitvatartas[];
    idopontfoglalas:Appointment[];
  }
  
  export default Hairdresser;