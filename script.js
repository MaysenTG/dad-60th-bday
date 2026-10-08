const giftScene = document.getElementById("gift-scene");
const present = document.getElementById("present");
const openButton = document.getElementById("open-gift");
const hint = document.getElementById("hint");
const heroImg = document.getElementById("hero-img");
const thumbs = document.querySelectorAll(".thumb");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function openGift() {
  if (openButton.disabled) return;
  openButton.disabled = true;
  openButton.classList.add("is-open");
  hint.textContent = "";

  const wait = reduceMotion ? 0 : 1900;
  window.setTimeout(() => {
    giftScene.classList.add("is-leaving");
    window.setTimeout(() => {
      giftScene.hidden = true;
      present.hidden = false;
      present.classList.add("is-visible");
      present.querySelector("h2").focus();
    }, reduceMotion ? 0 : 420);
  }, wait);
}

openButton.addEventListener("click", openGift);

thumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    heroImg.src = thumb.dataset.src;
    heroImg.alt = thumb.dataset.alt;
    thumbs.forEach((item) => item.classList.remove("is-selected"));
    thumb.classList.add("is-selected");
  });
});
