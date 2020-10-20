const guess = document.getElementById("guess");
const paragraph = document.getElementById("paragraph");

//Random number creation

const randNumber = Math.floor(Math.random() * 100 + 1);

console.log(randNumber);

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript;
  guessNumber(transcript);
};

guessNumber = (audio) => {
  const number = +audio;
  if (Number.isNaN(number)) {
    suggestion(
      "Please provide a valid number! Click the button and guess again!"
    );
  } else if (number < 1 || number > 100) {
    suggestion(
      "Please provide number between 1 and 100! Click the button and guess again!"
    );
  } else if (number > randNumber) {
    suggestion("Please try lower number! Click the button and guess again!");
  } else if (number < randNumber) {
    suggestion("Please try higher number! Click the button and guess again!");
  } else {
    suggestion(`You said: ${number} and it's a match. Well done!`);
  }
};

guess.addEventListener("click", () => {
  recognition.start();
  // paragraph.innerText = "";
});

function suggestion(message) {
  let speech = new SpeechSynthesisUtterance();
  speech.text = message;
  speech.volume = 1;
  speech.rate = 0.8;
  speech.pitch = 1;
  console.log(speech);
  window.speechSynthesis.speak(speech);
}
