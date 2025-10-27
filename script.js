const PUZZLES = [
    "LA SALLE UNIVERSITY ",
    "TEAM FOUR",
    "MOON KNIGHT",
    "POISON IVY",
    "KILLER CROC "
];

let puzzle = "";
let board = [];
let guessedLetters = [];

function choosePuzzle() {
    const randomIndex = Math.floor(Math.random() * PUZZLES.length);
    puzzle = PUZZLES[randomIndex];
    board = puzzle.split("").map(char => (char == ""?"" : "_"));
    guessedLetters = [];
    renderBoard();
}

function renderBoard() {
    const boardElement = document.getElementById("puzzle-board");
    boardElement.textContent = board.join(" ");
}

function createLetterButtons(){
    const lettersDiv = document.getElementById("letters");
    lettersDiv.innerHTML = "";

    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const btn = document.createElement("button");
        btn.textContent = letter;
        btn.onclick = () => guessLetter(letter, btn);
        lettersDiv.appendChild(btn);
    }
}

function guessLetter(letter, btn) {
    btn.disabled = true;
    guessedLetters.push(letter);
    
    let correct = false;
    for(let i = 0; i<puzzle.length; i++) {
        if (puzzle[i].toUpperCase() == letter) {
            board[i] = puzzle[i];
            correct = true;
        }
    }

    renderBoard();

    if (correct) {
    btn.style.backgroundColor = "#2ecc71"; // green for correct
  } else {
    btn.style.backgroundColor = "#e74c3c"; // red for incorrect
  }


if (!board.includes("_")) {
    setTimeout(() => alert("🎉 You solved it!"), 200);
  }
}

document.getElementById("reset").onclick = choosePuzzle;

createLetterButtons();
choosePuzzle();

