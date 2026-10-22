const nav = document.getElementById("nav");
const cats = document.getElementById("cats");
const content = document.getElementById("content");

function fmt(text) {
  return text
    .replace(/^(Verdadero)/i, '<span class="tag v">Verdadero</span>')
    .replace(/^(Falso|False)/i, '<span class="tag f">Falso</span>');
}

function renderList(items, isVF) {
  return items.map((t, i) => `
    <div class="item">
      <button><span class="num">${i + 1}</span>${isVF ? "Afirmación" : "Pregunta"} ${i + 1}<span class="chev">▼</span></button>
      <div class="answer"><p>${isVF ? fmt(t) : t}</p></div>
    </div>`).join("");
}

DATA.forEach((c) => {
  nav.insertAdjacentHTML("beforeend", `<a href="#${c.id}">${c.name}</a>`);
  cats.insertAdjacentHTML("beforeend", `<a class="cat" href="#${c.id}"><strong>${c.name}</strong><small>${c.area}</small></a>`);
  content.insertAdjacentHTML("beforeend", `
    <section class="section" id="${c.id}">
      <div class="section-head"><h2>${c.name}</h2><p>${c.area}</p><div class="line"></div></div>
      <div class="toggle">
        <button class="on" data-t="q">Preguntas abiertas</button>
        <button data-t="vf">Verdadero o falso</button>
      </div>
      <div class="list" data-l="q">${renderList(c.q, false)}</div>
      <div class="list" data-l="vf" hidden>${renderList(c.vf, true)}</div>
    </section>`);
});

content.addEventListener("click", (e) => {
  const tbtn = e.target.closest(".toggle button");
  if (tbtn) {
    const sec = tbtn.closest(".section");
    sec.querySelectorAll(".toggle button").forEach((b) => b.classList.toggle("on", b === tbtn));
    sec.querySelectorAll(".list").forEach((l) => (l.hidden = l.dataset.l !== tbtn.dataset.t));
    return;
  }
  const ibtn = e.target.closest(".item button");
  if (ibtn) {
    const item = ibtn.parentElement;
    const ans = item.querySelector(".answer");
    const open = item.classList.toggle("open");
    ans.style.maxHeight = open ? ans.scrollHeight + "px" : 0;
  }
});

// Estrellas del pie de página
const stars = document.querySelector(".stars");
for (let i = 0; i < 18; i++) {
  const s = document.createElement("span");
  s.textContent = "✦";
  s.style.left = Math.random() * 100 + "%";
  s.style.top = Math.random() * 100 + "%";
  s.style.animationDelay = Math.random() * 3 + "s";
  stars.appendChild(s);
}

// Navegación activa y botón subir
const topBtn = document.getElementById("top");
topBtn.onclick = () => scrollTo({ top: 0 });
addEventListener("scroll", () => {
  topBtn.classList.toggle("show", scrollY > 500);
  let current = "";
  document.querySelectorAll(".section").forEach((s) => { if (s.getBoundingClientRect().top < 120) current = s.id; });
  nav.querySelectorAll("a").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
});
