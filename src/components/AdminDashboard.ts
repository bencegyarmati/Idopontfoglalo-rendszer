import { loadHairSalonData } from "../services/dataService";

export const createAdminDashboard = (): HTMLElement => {
  // 1. Töltsd be az admin-dashboard.html template-t
  const template = document.createElement("template");
  // Feltételezzük, hogy van egy admin-dashboard.html fájlod a megfelelő template-tel
  template.innerHTML = `
    <div class="admin-dashboard">
      <h2>Admin Felület</h2>
      <ul class="appointments-list"></ul>
    </div>
  `;

  // 2. Klónozd a template-t
  const dashboard = template.content.cloneNode(true) as HTMLElement;

  // 3. Töltsd be a foglalásokat
  const hairSalon = loadHairSalonData();
  const appointmentsList = dashboard.querySelector(".appointments-list");

  if (appointmentsList) {
    hairSalon.forEach((hairdresser) => {
      hairdresser.idopontfoglals.forEach((appointment) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${appointment.nev} - ${appointment.datum}, ${appointment.ora} - ${hairdresser.nev}`;
        appointmentsList.appendChild(listItem);
      });
    });
  }

  // 4. Add vissza a létrehozott HTML elemet
  return dashboard;
};