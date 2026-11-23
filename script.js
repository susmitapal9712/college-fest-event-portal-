// 1. Event Data Array
const events = [
  { id: 1, title: "Inter-Department Cricket", category: "sports", date: "Feb 15, 2027 | 10:00 AM", desc: "10-over knockout tournament on the main college ground." },
  { id: 2, title: "Classical & Fusion Dance", category: "dance", date: "Feb 16, 2027 | 2:00 PM", desc: "Solo and group dance performances celebrating Indian and modern styles." },
  { id: 3, title: "Acoustic & Solo Singing", category: "music", date: "Feb 16, 2027 | 5:00 PM", desc: "Showcase your vocal talent in Bengali, Hindi, or English." },
  { id: 4, title: "Badminton Championship", category: "sports", date: "Feb 15, 2027 | 1:00 PM", desc: "Singles and doubles matches in the indoor sports arena." },
  { id: 5, title: "Group Dance Face-Off", category: "dance", date: "Feb 17, 2027 | 4:00 PM", desc: "High-energy crew choreography battle." },
  { id: 6, title: "Battle of Bands", category: "music", date: "Feb 17, 2027 | 6:30 PM", desc: "Live instrumental and vocal band performances." }
];

const eventsGrid = document.getElementById("events-grid");
const tabBtns = document.querySelectorAll(".tab-btn");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");
const modalTitle = document.getElementById("modal-event-title");
const regForm = document.getElementById("reg-form");
const formMessage = document.getElementById("form-message");

// 2. Render Events Function
function renderEvents(filter = "all") {
  eventsGrid.innerHTML = "";
  const filtered = filter === "all" ? events : events.filter(e => e.category === filter);

  filtered.forEach(event => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.innerHTML = `
      <div>
        <span class="badge">${event.category}</span>
        <h3>${event.title}</h3>
        <p><strong>When:</strong> ${event.date}</p>
        <p>${event.desc}</p>
      </div>
      <button class="reg-btn" onclick="openModal('${event.title}')">Register Now</button>
    `;
    eventsGrid.appendChild(card);
  });
}

// 3. Category Filter Logic
tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".tab-btn.active").classList.remove("active");
    btn.classList.add("active");
    renderEvents(btn.dataset.category);
  });
});

// 4. Modal & Phone Validation Logic
function openModal(eventTitle) {
  modalTitle.textContent = `Register: ${eventTitle}`;
  formMessage.textContent = "";
  regForm.reset();
  modal.classList.remove("hidden");
}

closeModal.addEventListener("click", () => modal.classList.add("hidden"));

regForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("student-name").value.trim();
  const phone = document.getElementById("student-phone").value.trim();

  // Validate 10-digit Indian mobile number
  if (!/^[6-9]\d{9}$/.test(phone)) {
    formMessage.style.color = "red";
    formMessage.textContent = "Please enter a valid 10-digit mobile number.";
    return;
  }

  formMessage.style.color = "green";
  formMessage.textContent = `Success! ${name}, your spot is confirmed.`;
});

// 5. Live Countdown Timer (Target: Feb 15, 2027)
const festDate = new Date("February 15, 2027 10:00:00").getTime();
setInterval(() => {
  const now = new Date().getTime();
  const diff = festDate - now;

  if (diff <= 0) {
    document.getElementById("countdown").textContent = "The Fest is Live!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / 1000 / 60) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  document.getElementById("countdown").textContent =
    `Starts in: ${days}d ${hours}h ${mins}m ${secs}s`;
}, 1000);

// Initial load
renderEvents();
