// Tabelle erstellen
function generateTable(data) {
  if (!data || data.length === 0) return "No data available.";
  // Create the table element
  const table = document.createElement("table");

  // Kopfzeile erstellen
  const headerRow = document.createElement("tr");
  const keys = Object.keys(data[0]); // Schlüssel aus dem ersten Datenobjekt
  keys.forEach((key) => {
    const th = document.createElement("th");
    th.textContent = key.charAt(0).toUpperCase() + key.slice(1); // Wort beginnt mit Großbuchstaben
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // für jedes Objekt eine neue Tabellenzeile
  data.forEach((item) => {
    const row = document.createElement("tr");
    keys.forEach((key) => {
      const td = document.createElement("td");
      td.textContent = item[key] || ""; // Falls leeres Feld -> leerer String
      row.appendChild(td);
    });
    table.appendChild(row);
  });
  return table;
}

// JSON-Datei wird geladen
fetch("./tabelle.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Fehler beim Laden der JSON-Datei.");
    }
    return response.json();
  })
  .then((jsonData) => {
    const container = document.getElementById("table-container");
    const table = generateTable(jsonData); // Tabelle wird aus jsonData erstellt
    if (table) container.appendChild(table);
  })

  .catch((error) => {
    console.error("Fehler:", error);
  });
