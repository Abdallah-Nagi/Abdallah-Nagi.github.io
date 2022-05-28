let container = document.querySelector(".blocks-container");
let c, r, size;
window.addEventListener("load", () => {
  let height = window.innerHeight * 0.7;
  let width = window.innerWidth * 0.6;
  if (height > width) {
    r = 5;
    c = 4;
    size = width / c;
    container.style.cssText = `grid-template-columns: repeat(${c}, ${size}px);grid-template-rows: repeat(${r}, ${size}px);`;
  } else {
    r = 4;
    c = 5;
    size = height / r;
    container.style.cssText = `grid-template-columns: repeat(${c}, ${size}px);grid-template-rows: repeat(${r}, ${size}px);`;
  }
});

window.addEventListener("resize", () => {
  console.log(window.innerHeight);
  let height = window.innerHeight * 0.7;
  let width = window.innerWidth * 0.6;
  if (height > width) {
    r = 5;
    c = 4;
    size = width / c;
    container.style.cssText = `grid-template-columns: repeat(${c}, ${size}px);grid-template-rows: repeat(${r}, ${size}px);`;
  } else {
    r = 4;
    c = 5;
    size = height / r;
    container.style.cssText = `grid-template-columns: repeat(${c}, ${size}px);grid-template-rows: repeat(${r}, ${size}px);`;
  }
});
