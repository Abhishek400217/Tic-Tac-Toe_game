let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-game");
let msgContainer = document.querySelector(".msgcontainer");
let msg = document.querySelector("#msg");
let count = 0; 
let gameOver = false;

const clickSound = new Audio("Click.wav");
const winSound = new Audio("win.wav");



let turnO = true; // true = O, false = X

const winPatterns = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
];


boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if(gameOver) return;
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    clickSound.play();
count++;
checkWinner();

  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("winner");
  }
};


const showWinner = (winner) => {
  gameOver = true;
  winSound.play();
  msg.innerText = `🎉 Congratulations, Winner is ${winner} 🎉`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};


const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      showWinner(pos1);
      return; 
    }
    
  }

  // DRAW condition
  if (count === 9 && !gameOver) {
  msg.innerText = "It's a Draw!";
  msgContainer.classList.remove("hide");
  disableBoxes();
}
};

const resetGame = () => {
  turnO = true;
  count = 0;
  gameOver = false;
  enableBoxes();
  msgContainer.classList.add("hide");
  clickSound.currentTime = 0;
  winSound.currentTime = 0;

};


resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
