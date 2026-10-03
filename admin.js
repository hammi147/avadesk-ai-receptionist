// ================= AVADESK ADMIN DASHBOARD =================

const leadsTable = document.getElementById("leadsTable");

const totalLeads = document.getElementById("totalLeads");
const newLeads = document.getElementById("newLeads");
const appointments = document.getElementById("appointments");
const quotes = document.getElementById("quotes");

const topService = document.getElementById("topService");
const latestRequest = document.getElementById("latestRequest");

const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");

const refreshBtn = document.getElementById("refreshBtn");
const clearBtn = document.getElementById("clearBtn");


// ================= DEMO LEADS =================

const demoLeads = [
  {
    id: 1,
    name: "Sarah Ahmed",
    contact: "+971 50 123 4567",
    service: "HVAC / AC repair",
    date: "2026-10-05",
    time: "Morning",
    status: "New"
  },
  {
    id: 2,
    name: "Daniel Khan",
    contact: "daniel@example.com",
    service: "Plumbing",
    date: "2026-10-06",
    time: "Afternoon",
    status: "Contacted"
  },
  {
    id: 3,
    name: "Maya Ali",
    contact: "+971 55 987 1234",
    service: "Electrical",
    date: "2026-10-07",
    time: "Evening",
    status: "Completed"
  },
  {
    id: 4,
    name: "Omar Hassan",
    contact: "omar@example.com",
    service: "HVAC / AC repair",
    date: "2026-10-08",
    time: "Morning",
    status: "New"
  }
];


// ================= LOCAL STORAGE =================

function getLeads() {

  const savedLeads =
    localStorage.getItem("avadeskLeads");


  if (savedLeads) {

    try {

      return JSON.parse(savedLeads);

    } catch (error) {

      return [...demoLeads];

    }

  }


  localStorage.setItem(
    "avadeskLeads",
    JSON.stringify(demoLeads)
  );


  return [...demoLeads];
}


function saveLeads(leads) {

  localStorage.setItem(
    "avadeskLeads",
    JSON.stringify(leads)
  );

}


// ================= DATE FORMAT =================

function formatDate(date) {

  if (!date) {
    return "Not specified";
  }


  const parsedDate =
    new Date(`${date}T00:00:00`);


  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }


  return parsedDate.toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric"
    }
  );
}


// ================= STATUS CLASS =================

function getStatusClass(status) {

  if (status === "New") {
    return "status-new";
  }

  if (status === "Contacted") {
    return "status-contacted";
  }

  if (status === "Completed") {
    return "status-completed";
  }

  return "status-new";
}


// ================= RENDER TABLE =================

function renderLeads() {

  const leads = getLeads();

  const search =
    searchInput.value
      .trim()
      .toLowerCase();


  const selectedStatus =
    statusFilter.value;


  const filteredLeads =
    leads.filter(function (lead) {

      const matchesSearch =
        !search ||
        lead.name.toLowerCase().includes(search) ||
        lead.contact.toLowerCase().includes(search) ||
        lead.service.toLowerCase().includes(search);


      const matchesStatus =
        selectedStatus === "all" ||
        lead.status === selectedStatus;


      return matchesSearch && matchesStatus;

    });


  leadsTable.innerHTML = "";


  if (filteredLeads.length === 0) {

    leadsTable.innerHTML = `
      <tr>
        <td colspan="4">
          <div class="empty">
            <strong>No leads found</strong>
            Try changing your search or filter.
          </div>
        </td>
      </tr>
    `;

    updateDashboardStats(leads);

    return;
  }


  filteredLeads.forEach(function (lead) {

    const row =
      document.createElement("tr");


    row.innerHTML = `
      <td>
        <div class="customer-name">
          ${escapeHtml(lead.name)}
        </div>

        <div class="customer-contact">
          ${escapeHtml(lead.contact)}
        </div>
      </td>

      <td>
        ${escapeHtml(lead.service)}
      </td>

      <td>
        ${escapeHtml(formatDate(lead.date))}
        <br>
        <span style="color:#777;font-size:10px;">
          ${escapeHtml(lead.time)}
        </span>
      </td>

      <td>
        <select
          class="status-select"
          data-id="${lead.id}"
        >

          <option
            value="New"
            ${lead.status === "New" ? "selected" : ""}
          >
            New
          </option>

          <option
            value="Contacted"
            ${lead.status === "Contacted" ? "selected" : ""}
          >
            Contacted
          </option>

          <option
            value="Completed"
            ${lead.status === "Completed" ? "selected" : ""}
          >
            Completed
          </option>

        </select>

        <br>

        <span class="status ${getStatusClass(lead.status)}">
          ${escapeHtml(lead.status)}
        </span>
      </td>
    `;


    leadsTable.appendChild(row);

  });


  updateDashboardStats(leads);

}


// ================= ESCAPE HTML =================

function escapeHtml(value) {

  const div =
    document.createElement("div");

  div.textContent =
    String(value ?? "");

  return div.innerHTML;
}


// ================= DASHBOARD STATS =================

function updateDashboardStats(leads) {

  totalLeads.textContent =
    leads.length;


  const newCount =
    leads.filter(function (lead) {
      return lead.status === "New";
    }).length;


  newLeads.textContent =
    newCount;


  const appointmentCount =
    leads.filter(function (lead) {

      return (
        lead.service === "HVAC / AC repair" ||
        lead.service === "Plumbing" ||
        lead.service === "Electrical" ||
        lead.service === "General maintenance"
      );

    }).length;


  appointments.textContent =
    appointmentCount;


  const quoteCount =
    leads.filter(function (lead) {

      return lead.status === "New";

    }).length;


  quotes.textContent =
    quoteCount;


  // ================= TOP SERVICE =================

  if (leads.length === 0) {

    topService.textContent = "—";

    latestRequest.textContent = "—";

    return;
  }


  const serviceCounts = {};


  leads.forEach(function (lead) {

    serviceCounts[lead.service] =
      (serviceCounts[lead.service] || 0) + 1;

  });


  const mostRequested =
    Object.entries(serviceCounts)
      .sort(function (a, b) {
        return b[1] - a[1];
      })[0];


  topService.textContent =
    mostRequested
      ? mostRequested[0]
      : "—";


  // ================= LATEST REQUEST =================

  latestRequest.textContent =
    leads[leads.length - 1]
      ? leads[leads.length - 1].name
      : "—";

}


// ================= STATUS UPDATE =================

leadsTable.addEventListener(
  "change",
  function (event) {

    if (
      !event.target.classList.contains(
        "status-select"
      )
    ) {
      return;
    }


    const id =
      Number(event.target.dataset.id);


    const newStatus =
      event.target.value;


    const leads = getLeads();


    const lead =
      leads.find(function (item) {
        return item.id === id;
      });


    if (!lead) {
      return;
    }


    lead.status =
      newStatus;


    saveLeads(leads);

    renderLeads();

  }
);


// ================= SEARCH =================

searchInput.addEventListener(
  "input",
  renderLeads
);


// ================= FILTER =================

statusFilter.addEventListener(
  "change",
  renderLeads
);


// ================= REFRESH =================

refreshBtn.addEventListener(
  "click",
  function () {

    renderLeads();

  }
);


// ================= CLEAR DEMO LEADS =================

clearBtn.addEventListener(
  "click",
  function () {

    const confirmed =
      window.confirm(
        "Are you sure you want to clear all demo leads?"
      );


    if (!confirmed) {
      return;
    }


    localStorage.removeItem(
      "avadeskLeads"
    );


    renderLeads();

  }
);


// ================= INITIAL LOAD =================

renderLeads();