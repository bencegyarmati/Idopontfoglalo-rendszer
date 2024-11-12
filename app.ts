import { loadHairSalonData, Hairdresser } from "./services/dataService";
import { createHairdresserCard } from "./components/HairdresserCard";
import { createAppointmentCalendar } from "./components/AppointmentCalendar";
import { createBookingForm } from "./components/BookingForm";
import { createConfirmationMessage } from "./components/ConfirmationMessage";
import { createAdminDashboard } from "./components/AdminDashboard";

const hairSalon = loadHairSalonData();

// Fodrászkártyák megjelenítése
const hairdresserListContainer = document.getElementById("hairdresser-list");
if (hairdresserListContainer) {
  hairSalon.forEach((hairdresser: Hairdresser) => {
    const card = createHairdresserCard(hairdresser);
    hairdresserListContainer.appendChild(card);

    // Eseménykezelő a kártyára kattintáshoz
    card.addEventListener("click", () => {
      // 1. Elrejted a fodrász listát
      hairdresserListContainer.style.display = "none";

      // 2. Megjeleníted a naptárat
      const calendar = createAppointmentCalendar(hairdresser);
      document.body.appendChild(calendar); // Vagy egy másik konténerbe

      // 3. Eseménykezelő az időpont kiválasztásához
      const appointmentList = calendar.querySelector(".appointment-list");
      appointmentList.addEventListener("click", (event) => {
        const selectedTime = (event.target as HTMLElement).textContent;

        // 4. Megjeleníted a foglalási űrlapot
        const bookingForm = createBookingForm(
          hairdresser,
          // Itt add át a kiválasztott dátumot a naptárból!
          "2024-11-12", // Példa dátum
          selectedTime
        );
        document.body.appendChild(bookingForm); // Vagy egy másik konténerbe

        // 5. Eseménykezelő a foglalás elküldéséhez
        bookingForm.addEventListener("submit", () => {
          // 6. Elrejted a foglalási űrlapot
          bookingForm.style.display = "none";

          // 7. Megjeleníted a visszaigazoló üzenetet
          const confirmationMessage = createConfirmationMessage();
          document.body.appendChild(confirmationMessage); // Vagy egy másik konténerbe

          // 8. Eseménykezelő a "Vissza a naptárhoz" gombhoz
          const backButton = confirmationMessage.querySelector(
            ".back-to-calendar"
          );
          backButton.addEventListener("click", () => {
            // Elrejted a visszaigazoló üzenetet
            confirmationMessage.style.display = "none";

            // Megjeleníted a naptárat
            calendar.style.display = "block";
          });
        });
      });
    });
  });
} else {
  console.error("Nem található a 'hairdresser-list' ID-jű elem!");
}

// Admin felület megjelenítése
const adminButton = document.getElementById("admin-button");
if (adminButton) {
  adminButton.addEventListener("click", () => {
    const adminDashboard = createAdminDashboard();
    document.body.appendChild(adminDashboard); // Vagy egy másik konténerbe
  });
}