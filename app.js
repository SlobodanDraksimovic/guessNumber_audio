const guess = document.getElementById("guess");
const paragraph = document.getElementById("paragraph");

//Random number creation

const randNumber = Math.floor(Math.random() * 100 + 1);

console.log(randNumber);

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  guessNumber(transcript);
};

guessNumber = (audio) => {
  const number = +audio;
  if (Number.isNaN(number)) {
    paragraph.innerText =
      "Please provide a valid number! Click the button and guess again!";
  } else if (number < 1 || number > 100) {
    paragraph.innerText =
      "Please provide number between 1 and 100! Click the button and guess again!";
  } else if (number > randNumber) {
    paragraph.innerText =
      "Please try lower number! Click the button and guess again!";
  } else if (number < randNumber) {
    paragraph.innerText =
      "Please try higher number! Click the button and guess again!";
  } else {
    paragraph.innerText = `You said: ${number} and it's a match, well done!`;
  }
};

guess.addEventListener("click", () => {
  recognition.start();
  paragraph.innerText = "";
});
