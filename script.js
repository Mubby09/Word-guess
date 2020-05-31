const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-parts");

const words = [
  "laptop",
  "lagoon",
  "belgium",
  "kangaroo",
  "authenticataion",
  "industry",
  "platform",
  "animal",
  "danger",
  "successful",
  "flamboyant",
  "computer",
  "table",
  "antelope",
  "dollar",
  "euphoria",
  "aura",
  "antidote",
  "antagonistic",
  "behavioural",
  "protagonist",
  "shameful",
  "almighty",
  "potent",
  "programming",
  "javascript",
  "python",
  "change",
  "kangaroo",
  "market",
  "restaurant",
  "dorky",
  "intelligent",
  "stupid",
  "cane",
  "medicine",
  "cure",
  "virus",
  "settle",
  "kettle",
  "lonely",
  "black",
  "eloquent",
  "fluent",
  "satisfy",
  "crave",
  "charming",
  "beautiful",
  "television",
  "staple",
  "center"
];

const selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//show hidden word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `
    <span class='letter'>
    ${correctLetters.includes(letter) ? letter : ""}
    </span>
    `
      )
      .join("")}
    `;
  const innerWord = wordEl.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    finalMessage.innerText = `Hey...You WON!!!😀`;
    popup.style.display = "flex";
  }
}

//update the wrong letters
function updateWrongLettersEl() {
  //Display wrong letters
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  //Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  //Echeck if game is lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = `Sorry,You LOST!!!🤒`;
    popup.style.display = "flex";
  }
}

//show notification
function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

//keydown press
document.body.addEventListener("keydown", (e) => {
  // CHARACTER CODES FOR THE LETTERS A-Z is from 65 to 90
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
      ///////
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

//Resart Game and play again.
playAgainBtn.addEventListener("click", (e) => {
  window.location.reload(true);
});

displayWord();
