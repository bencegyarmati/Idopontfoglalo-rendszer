import { Hairdresser } from "../models/Hairdresser";

export const createHairdresserCard = (hairdresser: Hairdresser): HTMLElement => {
  // 1. Töltsd be a hairdresser-card.html template-t
  const template = document.createElement("template"); 
  // Feltételezzük, hogy van egy hairdresser-card.html fájlod a megfelelő template-tel
  template.innerHTML = `
    <div class="hairdresser-card">
      <h3>${hairdresser.nev}</h3>
      <img src="..." alt="${hairdresser.nev} képe"> 
      <button class="book-appointment">Időpontfoglalás</button>
    </div>
  `;

  // 2. Klónozd a template-t
  const card = template.content.cloneNode(true) as HTMLElement;

  // 3. Eseménykezelő hozzáadása
  const bookButton = card.querySelector(".book-appointment");
  if (bookButton) {
    bookButton.addEventListener("click", () => {
    // Itt kezeld az időpontfoglalás gombra kattintást
    // Pl. jelenítsd meg az AppointmentCalendar komponenst
    });
  }

  // 4. Add vissza a létrehozott HTML elemet
  return card;
};