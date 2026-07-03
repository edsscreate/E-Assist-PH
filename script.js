const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll(".service-select").forEach((button) => {
  button.addEventListener("click", () => {
    const selectedService = button.dataset.service || "";
    const select = document.querySelector("#service");
    if (select) select.value = selectedService;
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => document.querySelector("#name")?.focus(), 550);
  });
});

const form = document.querySelector("#inquiryForm");
const modal = document.querySelector("#messageModal");
const generatedMessage = document.querySelector("#generatedMessage");
const closeModal = document.querySelector(".modal-close");
const closeModalLink = document.querySelector("#closeModalLink");
const copyButton = document.querySelector("#copyMessage");
const copyStatus = document.querySelector("#copyStatus");

function closeMessageModal() {
  modal?.classList.remove("show");
  modal?.setAttribute("aria-hidden", "true");
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("#name").value.trim();
  const service = document.querySelector("#service").value;
  const contactInfo = document.querySelector("#contactInfo").value.trim();
  const details = document.querySelector("#details").value.trim();

  const message = `Hi E-Assist PH! 👋

Name: ${name}
Service Needed: ${service}
Contact: ${contactInfo}

Request Details:
${details}

Thank you!`;

  generatedMessage.value = message;
  copyStatus.textContent = "";
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  setTimeout(() => generatedMessage.focus(), 150);
});

copyButton?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(generatedMessage.value);
    copyStatus.textContent = "Copied! You can now paste it in Messenger.";
    copyButton.textContent = "Copied ✓";
    setTimeout(() => { copyButton.textContent = "Copy message"; }, 1600);
  } catch {
    generatedMessage.select();
    document.execCommand("copy");
    copyStatus.textContent = "Copied! You can now paste it in Messenger.";
  }
});

closeModal?.addEventListener("click", closeMessageModal);
closeModalLink?.addEventListener("click", closeMessageModal);
modal?.addEventListener("click", (event) => {
  if (event.target === modal) closeMessageModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMessageModal();
});

document.querySelectorAll("[data-placeholder-link]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    alert("Replace this link in index.html with your actual Facebook Messenger, email, or phone link before publishing.");
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();
