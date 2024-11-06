export const createConfirmationMessage = (): HTMLElement => {
    // 1. Töltsd be a confirmation-message.html template-t
    const template = document.createElement("template");
    // Feltételezzük, hogy van egy confirmation-message.html fájlod a megfelelő template-tel
    template.innerHTML = `
      <div class="confirmation-message">
        <h3>Foglalás sikeres!</h3>
        <p>Köszönjük a foglalást!</p>
      </div>
    `;
  
    // 2. Klónozd a template-t
    const message = template.content.cloneNode(true) as HTMLElement;
  
    // 3. Nincs szükség további logikára
  
    // 4. Add vissza a létrehozott HTML elemet
    return message;
  };