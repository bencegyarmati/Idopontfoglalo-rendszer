import { Hairdresser} from "../models/Hairdresser";
import { Appointment } from "../models/Appointment";
import { createAppointment } from "../services/appointmentService";

export const createBookingForm = (
  hairdresser: Hairdresser,
  selectedDate: string,
  selectedTime: string
): HTMLElement => {
  // 1. Töltsd be a booking-form.html template-t
  const template = document.createElement("template");
  // Feltételezzük, hogy van egy booking-form.html fájlod a megfelelő template-tel
  template.innerHTML = `
    <div class="booking-form">
      <h3>Foglalás ${hairdresser.nev}-nál</h3>
      <label for="name">Név:</label>
      <input type="text" id="name" name="name"><br><br>
      <input type="hidden" id="date" name="date" value="${selectedDate}">
      <input type="hidden" id="time" name="time" value="${selectedTime}">
      <button class="submit-booking">Foglalás</button>
    </div>
  `;

  // 2. Klónozd a template-t
  const form = template.content.cloneNode(true) as HTMLElement;

  // 3. Eseménykezelő a foglaláshoz
  const submitButton = form.querySelector(".submit-booking");
  if (submitButton) {
    submitButton.addEventListener("click", () => {
    const nameInput = form.querySelector("#name") as HTMLInputElement;
    const name = nameInput.value;

    const appointment: Appointment = {
      nev: name,
      datum: selectedDate,
      ora: selectedTime,
      fodrasz: hairdresser.nev,
    }

    createAppointment(hairdresser, appointment);

    // Jelenítsd meg a visszaigazoló üzenetet
        alert("Foglalás sikeres!");
      });
    }
  }

  // 4. Add vissza a létrehozott HTML elemet
  return form;

}