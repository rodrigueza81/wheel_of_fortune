// ✅ Store puzzles
const PUZZLES = [
    "LA SALLE UNIVERSITY",
    "TEAM FOUR",
    "MOON KNIGHT",
    "POISON IVY",
    "KILLER CROC",
    "LUCKI"
  ];
  
  //store for clues, they happen to align with 
  //the position for their puzzle but does not need to 
  const CLUES = [
    "A University in Philadelphia",
    "A group working together",
    "A Marvel superhero",
    "A DC Comics villain and a plant",
    "A reptilian Batman villain",
    "Popular Chicago rapper",
  ];
  
  //initializing of the variables

  //the current phrase
  let puzzle = "";

  //current clue text
  let clue = "";

  //visible display of the puzzle
  let board = [];

  //already guessed consonants
  let guessedLetters = [];
  
  //puzzle section

  //A random puzzle is chosen from const PUZZLES
  function choosePuzzle() {
    const randomIndex = Math.floor(Math.random() * PUZZLES.length);
    puzzle = PUZZLES[randomIndex];
  
    //makes letters and symbols underscores 
    //spaces are kept as spaces, no need to guess
    //char === ... is the if else statement making letters blank spaces as spaces
    board = puzzle.split("").map(char => (char === " " ? " " : "_"));
    guessedLetters = [];
  
    //update board and re-enables letters
    renderBoard();
    resetLetterButtons();
  }
  
//clue section 

  //choose random clue from const CLUES and displays it 
  //the clue is not yet chosen with its appropriate puzzle(independent of puzzle)
  function chooseClue() {
    const randomIndex = Math.floor(Math.random() * CLUES.length);
    clue = CLUES[randomIndex];
    //the displaying of clues
    renderClue();
  }
  

  //display puzzle board
  
  function renderBoard() {
    //finds puzzle-board in index.html and fills it with underscors & spaces
    const boardElement = document.getElementById("puzzle-board");
    boardElement.textContent = board.join(" ");
  }
  
  //display clue text
  function renderClue() {
    //finds clue-text in index.html and fills it with the randomly chosen clue
    const clueElement = document.getElementById("clue-text");
    clueElement.textContent = clue;
  }
  
  //create consonant buttons

  function createLetterButtons() {
    //searches for elements with id of letters and clear them
    const lettersDiv = document.getElementById("letters");
    lettersDiv.innerHTML = "";
  
    const vowels = ["A", "E", "I", "O", "U"];
  
    for (let i = 65; i <= 90; i++) {
      const letter = String.fromCharCode(i);
      if (vowels.includes(letter)) continue; //skip vowels
  
      const btn = document.createElement("button");
      btn.textContent = letter; //get a button corresponding to letter chosen
      btn.onclick = () => guessLetter(letter, btn);
      lettersDiv.appendChild(btn); //adds button to the webpage
    }
  }
  
  //reset button visuals
  function resetLetterButtons() {
    const buttons = document.querySelectorAll("#letters button"); //look for all button elements with id of letters
    buttons.forEach(btn => {
      btn.disabled = false;
      btn.style.backgroundColor = "";
    });
  }
  
  // ✅ Handle guesses
  function guessLetter(letter, btn) {
    btn.disabled = true; //prevents double guesses
    guessedLetters.push(letter);
  
    let correct = false; //start of each guess is false
  
    for (let i = 0; i < puzzle.length; i++) {
      if (puzzle[i] === " ") continue; //skip spaces
  
      if (puzzle[i].toUpperCase() === letter) {
        board[i] = puzzle[i];
        correct = true;
      }
    }
  
    renderBoard(); //update display of board
    btn.style.backgroundColor = correct ? "#2ecc71" : "#e74c3c";
  //2ecc71 is green e74c3c is red

  //if there is no more underscores the puzzle has been guessed
  //timeout then message
    if (!board.includes("_")) {
      setTimeout(() => alert("🎉 You solved the puzzle!"), 200);
    }
  }
  
  //button event handlers
  document.getElementById("reset").onclick = choosePuzzle;
  document.getElementById("new-clue").onclick = chooseClue;
  
  // ✅ Initialize on page load
  createLetterButtons();
  choosePuzzle();
  chooseClue();
  