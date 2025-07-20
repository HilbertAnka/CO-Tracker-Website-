//Tabelle + Pagination-Buttons

const pageSize = 10;
let curPage = 1;
let data = [];
let totalPages;

const dataBody = document.getElementById("data-body");

// JSON-Daten laden und initialisieren
fetch("./tabelle.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Fehler beim Laden der JSON-Datei.");
    }
    return response.json();
  })
  .then((jsonData) => {
    data = jsonData;
    totalPages = Math.ceil(data.length / pageSize);
    renderTable();
    renderPagination();
  })

  .catch((error) => {
    console.error("Fehler:", error);
  });

// Tabellen-Rendering
function createRow(row) {
  return `
    <tr>
      <td>${row.land}</td>
      <td>${row.unternehmen}</td>
      <td>${row.emissionen}</td>
    </tr>
  `;
}

function renderTable() {
  const start = (curPage - 1) * pageSize;
  const end = start + pageSize;
  const paginatedData = data.slice(start, end);

  dataBody.innerHTML = paginatedData.map(createRow).join('');
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
