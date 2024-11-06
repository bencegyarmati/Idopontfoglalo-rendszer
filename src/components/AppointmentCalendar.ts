import { Hairdresser } from "../models/Hairdresser";
import { getFreeAppointments } from "../services/appointmentService";
import { format, addDays } from "date-fns"; // Importáld az addDays függvényt is

export const createAppointmentCalendar = (
  hairdresser: Hairdresser
): HTMLElement => {
  // 1. Töltsd be az appointment-calendar.html template-t
  const template = document.createElement("template");
  // Feltételezzük, hogy van egy appointment-calendar.html fájlod a megfelelő template-tel
  template.innerHTML = `
    <div class="appointment-calendar">
      <div class="calendar-header">
        <button class="prev-day">&lt;</button>
        <span class="current-date"></span>
        <button class="next-day">&gt;</button>
      </div>
      <div class="appointments">
        <h3>Szabad időpontok:</h3>
        <ul class="appointment-list"></ul>
      </div>
    </div>
  `;

  // 2. Klónozd a template-t
  const calendar = template.content.cloneNode(true) as HTMLElement;

  // 3. Dátum kezelése
  let currentDate = new Date();
  const currentDateSpan = calendar.querySelector(".current-date");
  const prevDayButton = calendar.querySelector(".prev-day");
  const nextDayButton = calendar.querySelector(".next-day");

  const updateDate = () => {
    if (currentDateSpan) {
      currentDateSpan.textContent = format(currentDate, "yyyy.MM.dd");
    }
    updateAppointments();
  };

  const updateAppointments = () => {
    const appointmentList = calendar.querySelector(".appointment-list");
    if (appointmentList) {
      appointmentList.innerHTML = ""; // Töröld a régi időpontokat
    }

    const szabadIdopontok = getFreeAppointments(
      hairdresser,
      format(currentDate, "yyyy.MM.dd")
    );

    szabadIdopontok.forEach((idopont) => {
      const listItem = document.createElement("li");
      listItem.textContent = idopont;
      if (appointmentList) {
        appointmentList.appendChild(listItem);
      }

      // Eseménykezelő az időpont kiválasztásához
      listItem.addEventListener("click", () => {
        // Itt kezeld az időpont kiválasztását
        // Pl. jelenítsd meg a BookingForm komponenst a kiválasztott időponttal
        console.log(`Kiválasztott időpont: ${idopont}`);
      });
    });
  };

  if (prevDayButton) {
    prevDayButton.addEventListener("click", () => {
      currentDate = addDays(currentDate, -1);
      updateDate();
    });
  }

  if (nextDayButton) {
    nextDayButton.addEventListener("click", () => {
      currentDate = addDays(currentDate, 1);
      updateDate();
    });
  }

  updateDate(); // Inicializáld a dátumot

  // 4. Add vissza a létrehozott HTML elemet
  return calendar;
};