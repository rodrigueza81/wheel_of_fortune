import random 
#Random variable generator with bits form 0 to 256

# Step 1: Storing possible puzzles
PUZZLES = [
    "LA SALLE UNIVERSITY ",
    "TEAM FOUR",
    "MOON KNIGHT",
    "POISON IVY",
    "KILLER CROC "
]

def choose_puzzle():
    """Pick a random puzzle from the list."""
    return random.choice(PUZZLES)

def display_board(puzzle, guessed_letters):
    """Show the board with guessed letters revealed."""
    board = ""
    for letter in puzzle:
        if letter == " ":
            board += "  "
        elif letter.upper() in guessed_letters:
            board += letter + " "
        else:
            board += "_ "
    return board.strip()

def main():
    print("🎯 WHEEL OF FORTUNE 🎯\n")
    puzzle = choose_puzzle()
    guessed_letters = set()

    while True:
        print("\nPuzzle:")
        print(display_board(puzzle, guessed_letters))

        guess = input("\nGuess a consonant (or type 'quit' to stop): ").upper()

        if guess == "QUIT":
            print(" Hope you enjoyed!")
            break

        if not guess.isalpha() or len(guess) != 1:
            print("❌ Please enter a single letter.")
            continue

        if guess in guessed_letters:
            print("⚠️ You already guessed that letter!")
            continue

        guessed_letters.add(guess)

        if guess in puzzle:
            print("✅ Correct!")
        else:
            print("❌ Incorrect!")

        if all(letter == " " or letter in guessed_letters for letter in puzzle):
            print("\n🎉 You solved it! The phrase was:", puzzle)
            break

if __name__ == "__main__":
    main()
