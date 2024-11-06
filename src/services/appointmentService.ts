import Hairdresser from '../models/Hairdresser';
import Appointment from '../models/Appointment';

const getFreeTimeSlots = (hairdresser: Hairdresser, date: string): string[] => {    
  // TODO: Implementáld a szabad időpontok lekérdezését
  return [];
};

const createAppointment = (
  hairdresser: Hairdresser,
  appointment: Appointment
): void => {
  // TODO: Implementáld az időpontfoglalás létrehozását
};

export { getFreeTimeSlots, createAppointment };