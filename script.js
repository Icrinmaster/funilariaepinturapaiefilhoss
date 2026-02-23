/* ========= Helpers ========= */
const $ = (q, el = document) => el.querySelector(q);
const $$ = (q, el = document) => Array.from(el.querySelectorAll(q));

function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("is-show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => t.classList.remove("is-show"), 2200);
}

/* ========= Splash (logo zoom) ========= */
window.addEventListener("load", () => {
  const splash = $("#splash");
  // tempo mínimo pra dar sensação premium
  setTimeout(() => {
    splash.classList.add("is-hidden");
    setTimeout(() => splash.remove(), 800);
  }, 1400);
});

/* ========= Ano no footer ========= */
$("#year").textContent = new Date().getFullYear();

/* ========= Drawer mobile ========= */
const drawer = $("#navDrawer");
const burger = $("#burger");
const drawerClose = $("#drawerClose");
const drawerBackdrop = $("#drawerBackdrop");

function openDrawer() {
  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
  burger.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}
function closeDrawer() {
  drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
  burger.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}
burger.addEventListener("click", openDrawer);
drawerClose.addEventListener("click", closeDrawer);
drawerBackdrop.addEventListener("click", closeDrawer);
$$("[data-drawer-link]").forEach(a => a.addEventListener("click", closeDrawer));

/* ========= Reveal on scroll ========= */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("is-in");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

$$(".reveal").forEach(el => io.observe(el));

/* ========= Hero slider ========= */
const slides = $$(".hero__slide");
const dots = $$(".dot");
let current = 0;
let sliderTimer = null;

function setSlide(i) {
  current = i;
  slides.forEach((s, idx) => s.classList.toggle("is-active", idx === i));
  dots.forEach((d, idx) => d.classList.toggle("is-active", idx === i));
}
function nextSlide() {
  setSlide((current + 1) % slides.length);
}
function startSlider() {
  stopSlider();
  sliderTimer = setInterval(nextSlide, 5500);
}
function stopSlider() {
  if (sliderTimer) clearInterval(sliderTimer);
}
dots.forEach(d => {
  d.addEventListener("click", () => {
    setSlide(Number(d.dataset.dot));
    startSlider();
  });
});
startSlider();

/* ========= Voltar ao topo ========= */
const toTop = $("#toTop");
window.addEventListener("scroll", () => {
  const show = window.scrollY > 700;
  toTop.classList.toggle("is-show", show);
});
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* ========= Form Orçamento -> WhatsApp ========= */
const budgetForm = $("#budgetForm");
budgetForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const fd = new FormData(budgetForm);
  const nome = (fd.get("nome") || "").toString().trim();
  const telefone = (fd.get("telefone") || "").toString().trim();
  const servico = (fd.get("servico") || "").toString().trim();
  const mensagem = (fd.get("mensagem") || "").toString().trim();

  if (!nome || !telefone || !servico || !mensagem) {
    toast("Preencha todos os campos para enviar.");
    return;
  }

  const text =
    `Olá! Quero um orçamento na Pai e Filhos Funilaria e Pintura.%0A` +
    `Nome: ${encodeURIComponent(nome)}%0A` +
    `Telefone: ${encodeURIComponent(telefone)}%0A` +
    `Serviço: ${encodeURIComponent(servico)}%0A` +
    `Descrição: ${encodeURIComponent(mensagem)}`;

  window.open(`https://wa.me/5534992496801?text=${text}`, "_blank");
});

/* ========= Form Contato -> WhatsApp ========= */
const contactForm = $("#contactForm");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const fd = new FormData(contactForm);
  const nome = (fd.get("nome") || "").toString().trim();
  const assunto = (fd.get("assunto") || "").toString().trim();
  const mensagem = (fd.get("mensagem") || "").toString().trim();

  if (!nome || !assunto || !mensagem) {
    toast("Preencha todos os campos para enviar.");
    return;
  }

  const text =
    `Olá! Meu nome é ${encodeURIComponent(nome)}.%0A` +
    `Assunto: ${encodeURIComponent(assunto)}%0A` +
    `Mensagem: ${encodeURIComponent(mensagem)}`;

  window.open(`https://wa.me/5534992496801?text=${text}`, "_blank");
});

/* ========= Galeria -> Modal ========= */
const modal = $("#modal");
const modalImg = $("#modalImg");

function openModal(src) {
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  modalImg.src = src;
  document.body.style.overflow = "hidden";
}
function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  modalImg.src = "";
  document.body.style.overflow = "";
}

$$(".gallery__item").forEach(btn => {
  btn.addEventListener("click", () => openModal(btn.dataset.img));
});
$$("[data-close]").forEach(el => el.addEventListener("click", closeModal));
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
});