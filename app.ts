import { loadHairSalonData } from "./services/dataService";
import { createHairdresserCard } from "./components/HairdresserCard.ts";

const hairSalon = loadHairSalonData();

// Fodrászkártyák megjelenítése
const hairdresserListContainer = document.getElementById("hairdresser-list");
if (hairdresserListContainer) {
  hairSalon.forEach((hairdresser: any) => {
    const card = createHairdresserCard(hairdresser);
    hairdresserListContainer.appendChild(card);
  });
} else {
  console.error("Nem található a 'hairdresser-list' ID-jű elem!");
}