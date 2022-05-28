let header = document.querySelector("header");
let headerName = document.querySelector(".name span");
let tries = document.querySelector(".tries span");
let blocksContainer = document.querySelector(".blocks-container");
let arrayBlocks = Array.from(blocksContainer.children);
let displayContainer = document.querySelector(".display-container");
let displayTitle = document.querySelector(".display-title");
let displayExample = Array.from(
  document.querySelectorAll(".example-container")
);
let displayBtn = document.querySelector(".display-btn");
let inputContainer = document.querySelector(".input-container");
let displayInput = document.querySelector(".display-input");
let displayDesc = document.querySelector(".display-description");
let successSound = document.querySelector(".success-sound");
let loseSound = document.querySelector(".lose-sound");
let timer = document.querySelector(".timer span");
let peekParent = document.querySelector(".peek");
let wrongCounter = 0;
let correctCounter = 0;
let gameCounter = 120;
let correctInARow = 0;
let wrongInARow = 0;
let NumberToObtainPeek = 2;
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
    showAllBlocks();
    timeCounter();
  }
});

displayBtn.addEventListener("click", () => {
  if (displayBtn.classList.contains("retry")) {
    window.location.reload();
  }
});

// Randomize numberArray
randomizeBlocks();
function randomizeBlocks() {
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
}
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
    alertColor("success");
    blocksContainer.classList.add("disable");
    setTimeout(() => {
      blocksContainer.classList.remove("disable");
    }, 200);
    firstBlock.classList.add("disable");
    secondBlock.classList.add("disable");
    firstBlock.lastElementChild.classList.add("finished");
    secondBlock.lastElementChild.classList.add("finished");
    numberOfBlocksFlipped = 0;
    correctInARow++;
    wrongInARow = 0;
    CheckAddPeek();
    checkGameOver();
  } else {
    loseSound.play();
    alertColor("failure");
    firstBlock.classList.remove("disable");
    blocksContainer.classList.add("disable");
    tries.textContent = wrongCounter += 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
      blocksContainer.classList.remove("disable");
    }, 1000);
    wrongInARow++;
    checkForShuffle();
    numberOfBlocksFlipped = 0;
    correctInARow = 0;
  }
}

// check if game is finished by finishing all blocks || timer has finished
function checkGameOver() {
  correctCounter++;
  if (correctCounter == arrayBlocks.length / 2 || gameCounter <= 0) {
    editDisplay();
    let finishMsg = document.createElement("div");
    finishMsg.classList.add("finish-msg");
    displayDesc.prepend(finishMsg);
    if (correctCounter == arrayBlocks.length / 2) {
      finishMsg.classList.add("success");
      if (wrongCounter == 0) {
        finishMsg.textContent = "Easy Game!";
      } else if (wrongCounter < 5) {
        finishMsg.textContent = "Well Done!";
      } else {
        finishMsg.textContent = "You Can Do Better!";
      }
    } else {
      finishMsg.classList.add("fail");
      finishMsg.textContent = "Out of Time, Try Again?";
    }
  }
}

// timer countdown function
let countInterval;
function timeCounter() {
  gameCounter--;
  countInterval = setInterval(() => {
    if (gameCounter >= 0) {
      timer.textContent = gameCounter--;
    } else {
      checkGameOver();
    }
  }, 1000);
}

// Check if 3 answers are correct in a row => add peek
function CheckAddPeek() {
  if (correctInARow == NumberToObtainPeek) {
    let peek = document.createElement("span");
    peek.classList.add("peek-btn");
    peek.textContent = "?";
    peekParent.appendChild(peek);
    correctInARow = 0;
  }
}
peekParent.addEventListener("click", (e) => {
  if (e.target.classList.contains("peek-btn")) {
    e.target.remove();
    arrayBlocks.forEach((block) => {
      if (!block.classList.contains("is-flipped")) {
        block.classList.add("is-flipped");
        blocksContainer.classList.add("disable");
        setTimeout(() => {
          block.classList.remove("is-flipped");
          blocksContainer.classList.remove("disable");
        }, 1000);
      }
    });
  }
});

// function for success & failure border color change
function alertColor(action) {
  // document.body.style.backgroundColor = "red";
  header.classList.add(action);
  arrayBlocks.forEach((block) => {
    block.classList.add(action);
  });
  setTimeout(() => {
    header.classList.remove(action);
    arrayBlocks.forEach((block) => {
      block.classList.remove(action);
    });
    // document.body.style.backgroundColor = "#FFF";
  }, 1000);
}

// show all blocks at start
function showAllBlocks() {
  arrayBlocks.forEach((block) => {
    block.classList.add("is-flipped");
    blocksContainer.classList.add("disable");
    setTimeout(() => {
      block.classList.remove("is-flipped");
      blocksContainer.classList.remove("disable");
    }, 1000);
  });
}

// shuffle blocks if 3 in a row
function checkForShuffle() {
  if (wrongInARow == 3) {
    setTimeout(() => {
      randomizeBlocks();
    }, 500);
    wrongInARow = 0;
  }
}

// edit text in finish screen
function editDisplay() {
  clearTimeout(countInterval);
  displayExample.forEach((item) => {
    item.remove();
  });
  displayInput.previousElementSibling.remove();
  displayInput.remove();
  displayDesc.classList.add("final");
  Array.from(displayDesc.children).forEach((child) => {
    child.remove();
  });
  displayDesc.innerHTML = `Wrong tires: <span> ${wrongCounter} </span> <br> Time left: <span>${
    gameCounter + 1
  }</span>s`;
  blocksContainer.classList.add("disable");
  displayBtn.classList.add("retry");
  displayBtn.textContent = "Retry";

  displayContainer.classList.remove("no-display");
}
