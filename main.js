let headerName = document.querySelector(".name span");
let tries = document.querySelector(".tries span");
let blocksContainer = document.querySelector(".blocks-container");
let arrayBlocks = Array.from(blocksContainer.children);
let displayContainer = document.querySelector(".display-container");
let displayTitle = document.querySelector(".display-title");
let displayBtn = document.querySelector(".display-btn");
let displayInput = document.querySelector(".display-input");
let successSound = document.querySelector(".success-sound");
let loseSound = document.querySelector(".lose-sound");
let wrongCounter = 0;
let correctCounter = 0;
let playerName;
// create number array from 1 to length of arrayblocks
let randomNumArray = Array.from(Array(arrayBlocks.length).keys()).map(
  (x) => x + 1
);

let pattern = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;

displayBtn.addEventListener("click", () => {
  if (pattern.test(displayInput.value)) {
    playerName = displayInput.value;
    displayContainer.classList.add("no-display");
    blocksContainer.classList.remove("disable");
    headerName.textContent = playerName;
  }
});

displayBtn.addEventListener("click", () => {
  if (displayBtn.classList.contains("retry")) {
    window.location.reload();
  }
});

// Randomize numberArray
randomNumArray.map((number, index) => {
  let temp, random;
  random = Math.floor(Math.random() * arrayBlocks.length);
  temp = randomNumArray[random];
  randomNumArray[random] = randomNumArray[index];
  randomNumArray[index] = temp;
});

// add flex order randomly to each block
arrayBlocks.forEach((block, index) => {
  block.style.order = randomNumArray[index];
});

let numberOfBlocksFlipped = 0;
let firstBlock, secondBlock;
arrayBlocks.forEach((block) => {
  block.addEventListener("click", (e) => {
    let clickedBlock = e.currentTarget;
    checkIfClicked(clickedBlock);
  });
});

// check number of blocks clicked and flip them
function checkIfClicked(clickedBlock) {
  if (numberOfBlocksFlipped < 2) {
    numberOfBlocksFlipped++;
    clickedBlock.classList.add("is-flipped");

    if (numberOfBlocksFlipped == 1) {
      firstBlock = clickedBlock;
      firstBlock.classList.add("disable");
    } else if (numberOfBlocksFlipped == 2) {
      secondBlock = clickedBlock;
      checkIfMatch();
    }
  }
}

// check if clicked blocks match
function checkIfMatch() {
  if (
    firstBlock.getAttribute("data-lang") ==
    secondBlock.getAttribute("data-lang")
  ) {
    successSound.play();
    firstBlock.classList.add("disable");
    secondBlock.classList.add("disable");
    numberOfBlocksFlipped = 0;
    checkIfWin();
  } else {
    loseSound.play();
    firstBlock.classList.remove("disable");
    blocksContainer.classList.add("disable");
    tries.textContent = wrongCounter += 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
      blocksContainer.classList.remove("disable");
    }, 1000);
    numberOfBlocksFlipped = 0;
  }
}

// check if win game and display game won!
function checkIfWin() {
  correctCounter++;
  if (correctCounter == arrayBlocks.length / 2) {
    displayTitle.textContent = `Congrats, number of wrong tires: ${wrongCounter}`;
    displayInput.remove();
    displayBtn.classList.add("retry");
    displayBtn.textContent = "Retry";
    displayContainer.classList.remove("no-display");
  }
}
