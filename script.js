const giftScene = document.getElementById("gift-scene");
const present = document.getElementById("present");
const gift1 = document.getElementById("gift-1");
const gift2 = document.getElementById("gift-2");
const hint = document.getElementById("hint");
const heroImg = document.getElementById("hero-img");
const thumbs = document.querySelectorAll(".thumb");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, reduceMotion ? 0 : ms);
  });
}

async function openOuterGift() {
  if (gift1.disabled) return;
  gift1.disabled = true;
  gift1.classList.add("is-open");
  hint.textContent = "";

  await wait(1600);

  gift1.classList.add("is-spent");
  await wait(420);

  gift1.hidden = true;
  gift2.hidden = false;
  gift2.classList.add("is-arrive");
  gift2.setAttribute("aria-disabled", "true");
  hint.textContent = "One more.";

  // Wait out the arrive animation so the first click can't also open this one.
  await wait(500);
  gift2.removeAttribute("aria-disabled");
  gift2.classList.add("is-ready");
  gift2.focus();
}

async function openInnerGift() {
  if (gift2.disabled || !gift2.classList.contains("is-ready")) return;
  gift2.disabled = true;
  gift2.classList.add("is-open");
  hint.textContent = "";

  await wait(1900);

  giftScene.classList.add("is-leaving");
  await wait(420);

  giftScene.hidden = true;
  present.hidden = false;
  present.classList.add("is-visible");
  present.querySelector("h2").focus();
}

gift1.addEventListener("click", openOuterGift);
gift2.addEventListener("click", openInnerGift);

thumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    heroImg.src = thumb.dataset.src;
    heroImg.alt = thumb.dataset.alt;
    thumbs.forEach((item) => item.classList.remove("is-selected"));
    thumb.classList.add("is-selected");
  });
});
