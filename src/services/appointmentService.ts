import { Hairdresser} from "../models/Hairdresser";
import { Appointment } from "../models/Appointment";
import { getDay, format } from "date-fns"; // Importáld a date-fns függvényeket
import { loadHairSalonData, saveHairSalonData } from "./dataService";

export const getFreeAppointments = (
  hairdresser: Hairdresser,
  date: string
): string[] => {
  const selectedDate = new Date(date);
  const dayIndex = getDay(selectedDate); // A hét napjának indexe (0 - vasárnap, 1 - hétfő, stb.)

  const nyitvatartas = hairdresser.nyitvatartas.find(
    (nyitva) => nyitva.napIndex === dayIndex
  );

  if (!nyitvatartas) {
    return []; // Nincs nyitvatartás ezen a napon
  }

  const { tol, ig } = nyitvatartas;
  const [tolOra, tolPerc] = tol.split(":").map(Number);
  const [igOra, igPerc] = ig.split(":").map(Number);

  const szabadIdopontok: string[] = [];
  let ora = tolOra;
  let perc = tolPerc;

  while (ora < igOra || (ora === igOra && perc <= igPerc)) {
    const idopont = `${ora.toString().padStart(2, "0")}:${perc
      .toString()
      .padStart(2, "0")}`;

    // Ellenőrizd, hogy az időpont foglalt-e már
    const foglalt = hairdresser.idopontfoglals.some(
      (foglalas) =>
        foglalas.datum === format(selectedDate, "yyyy.MM.dd") &&
        foglalas.ora === idopont
    );

    if (!foglalt) {
      szabadIdopontok.push(idopont);
    }

    perc += 30; // 30 perces időközönként
    if (perc >= 60) {
      perc = 0;
      ora++;
    }
  }

  return szabadIdopontok;
};

export const createAppointment = (
  hairdresser: Hairdresser,
  appointment: Appointment
): void => {
  // Ellenőrizd, hogy az időpont szabad-e
  const szabadIdopontok = getFreeAppointments(hairdresser, appointment.datum);
  if (!szabadIdopontok.includes(appointment.ora)) {
    // Hiba: az időpont már foglalt
    console.error("Az időpont már foglalt!");
    return;
  }

  // Hozzáadás a foglalásokhoz
  hairdresser.idopontfoglals.push(appointment);

  // Mentés a localStorage-ba
  const hairSalon = loadHairSalonData();
  const hairdresserIndex = hairSalon.findIndex((h) => h.nev === hairdresser.nev);
  hairSalon[hairdresserIndex] = hairdresser;
  saveHairSalonData(hairSalon);
};