let originalData = [];
let data = [];

// Tabelle + Pagination-Variablen
const pageSize = 10;
let curPage = 1;
let totalPages;

// Filter-Variablen
let filterLand = "";
let filterUnternehmen = "";

// DOM-Elemente
const dataBody = document.getElementById("data-body");



// JSON-Daten laden und initialisieren
fetch("./tabelle.json")
  .then((response) => {
    if (!response.ok) throw new Error("Fehler beim Laden der JSON-Datei.");
    return response.json();
  })
  .then((jsonData) => {
    data = jsonData;
    originalData = [...jsonData]; // Kopie der Daten, damit nach dem Sortiern oder Filtern immer das Original noch vorhanden ist
    totalPages = Math.ceil(data.length / pageSize); // Rechnung wieviele Pages insgesamt
    renderTable();
    renderPagination();
    setupSortListeners(); // richtet die Klick-Events für die Sortierpfeile ein
  })
  .catch((error) => {
    console.error("Fehler:", error);
  });


// Tabellen-Rendering
function createRow(row) { // erzeugt aus einem Datenobjekt ein HTML-String (Tabellenzeile)
  return `
    <tr>
      <td>${row.land}</td>
      <td>${row.unternehmen}</td>
      <td>${row.emissionen}</td>
    </tr>
  `;
}

function renderTable() {
  const start = (curPage - 1) * pageSize; // Berechnung des sichtbaren Bereichs
  const end = start + pageSize;
  const paginatedData = data.slice(start, end); // schneidet das Datenarray auf genau diesen Bereich zu

  dataBody.innerHTML = paginatedData.map(createRow).join("");
}



// Pagination (Buttons + Seitenzahlen dynamisch erstellen)

function renderPagination() {
  const pagination = document.querySelector(".pagination");
  pagination.innerHTML = ""; // Alles löschen

  // === Previous Button ===
  const prevLi = document.createElement("li");
  prevLi.classList.add("page-item");
  if (curPage === 1) prevLi.classList.add("disabled");

  const prevA = document.createElement("a");
  prevA.classList.add("page-link");
  prevA.href = "#";
  prevA.setAttribute("aria-label", "Previous");
  prevA.innerHTML = `<span aria-hidden="true">&laquo;</span>`;
  prevA.addEventListener("click", (e) => {
    e.preventDefault();
    if (curPage > 1) {
      curPage--;
      renderTable();
      renderPagination();
    }
  });

  prevLi.appendChild(prevA);
  pagination.appendChild(prevLi);

  // === Seitenzahlen ===
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.classList.add("page-item");
    if (i === curPage) li.classList.add("active");

    const a = document.createElement("a");
    a.classList.add("page-link");
    a.href = "#";
    a.textContent = i;

    a.addEventListener("click", (e) => {
      e.preventDefault();
      curPage = i;
      renderTable();
      renderPagination();
    });

    li.appendChild(a);
    pagination.appendChild(li);
  }

  // === Next Button ===
  const nextLi = document.createElement("li");
  nextLi.classList.add("page-item");
  if (curPage === totalPages) nextLi.classList.add("disabled");

  const nextA = document.createElement("a");
  nextA.classList.add("page-link");
  nextA.href = "#";
  nextA.setAttribute("aria-label", "Next");
  nextA.innerHTML = `<span aria-hidden="true">&raquo;</span>`;
  nextA.addEventListener("click", (e) => {
    e.preventDefault();
    if (curPage < totalPages) {
      curPage++;
      renderTable();
      renderPagination();
    }
  });

  nextLi.appendChild(nextA);
  pagination.appendChild(nextLi);
}



// Sortier-Funktion
function setupSortListeners() {
  const headers = document.querySelectorAll("#emissionsTable th"); // alle th-Elemente werden geholt (Überschriftenzeile)

  // für jede Spalte wird wird festgelegt:
  headers.forEach((th) => {
    const label = th.querySelector(".sort-label");
    const upIcon = th.querySelector(".up");
    const downIcon = th.querySelector(".down");
    const key = label.dataset.key;

    // bei Klick auf den Spaltennamen → Tabelle auf nicht-sortierten Ursprungszustand zurücksetzen
    label.addEventListener("click", () => {
      data = [...originalData]; // Originaldaten wiederherstellen
      window.currentSortKey = null;
      window.currentSortAsc = null;
      clearSortIndicators(); // Pfeilmarkierung zurücksetzen
      curPage = 1;
      renderTable(); // Tabelle zurücksetzen
      renderPagination(); // Pagination zurücksetzen
    });

    // ▲ klick -> aufsteigend sortieren
    upIcon.addEventListener("click", () => {
      sortByKey(key, true);
    });

    // ▼ klick -> absteigend sortieren
    downIcon.addEventListener("click", () => {
      sortByKey(key, false);
    });
  });
}

// sortiert die Daten nach der gewünschten Spalte und Richtung
function sortByKey(key, asc) {
  window.currentSortKey = key;
  window.currentSortAsc = asc;

  // Array wird sortiert
  data.sort((a, b) => {
    const valA = a[key];
    const valB = b[key];

    if (!isNaN(valA) && !isNaN(valB)) {
      return asc ? valA - valB : valB - valA;
    } else {
      return asc
        ? valA.localeCompare(valB, "de", { numeric: true })
        : valB.localeCompare(valA, "de", { numeric: true });
    }
  });

  updateSortIndicators(); // Pfeil hervorheben
  curPage = 1;
  renderTable();
  renderPagination();
}

// sorgt dafür, dass die richtigen Pfeile hervorgehoben sind
function updateSortIndicators() {
  document.querySelectorAll("#emissionsTable th").forEach((th) => {
    const key = th.querySelector(".sort-label")?.dataset.key;
    const up = th.querySelector(".up");
    const down = th.querySelector(".down");

    if (!key) return;

    up.classList.remove("active");
    down.classList.remove("active");

    if (key === window.currentSortKey) {
      if (window.currentSortAsc) {
        up.classList.add("active");
      } else {
        down.classList.add("active");
      }
    }
  });
}

// wenn zurückgesetzt wird -> Entfernung der Hervorhebung der Pfeile
function clearSortIndicators() {
  document.querySelectorAll("#emissionsTable .up, .down").forEach((icon) => {
    icon.classList.remove("active");
  });
}




// Filter-Funktion

function applyFilters() {
  data = originalData.filter((row) => { // für jede Zeile im Datensatz wird geprüft ...
    const landMatch = row.land.toLowerCase().includes(filterLand.toLowerCase()); // ... ob das eingegebene Suchwort irgendwo enthalten ist (unabhängig von Groß- oder Kleinschreibung)
    const unternehmenMatch = row.unternehmen.toLowerCase().includes(filterUnternehmen.toLowerCase());
    return landMatch && unternehmenMatch; // es wird nur die Zeile behalten, die die Bedingung erfüllt
  });

  curPage = 1; // nach dem Filtern zurück auf Seite 1
  renderTable(); // Tabelle neu gerendert
  renderPagination(); // Seitenzahl neu gerendert
}

// Filterfunktion reagiert live, sobald im Textfeld getippt wird
document.querySelector("#filterLand").addEventListener("input", (e) => {
  filterLand = e.target.value;
  applyFilters();
});

document.querySelector("#filterUnternehmen").addEventListener("input", (e) => {
  filterUnternehmen = e.target.value;
  applyFilters();
});
