const guess = document.getElementById("guess");
const paragraph = document.getElementById("paragraph");
const par = document.querySelector("p");

// Username creation
const promptAnswer = prompt("Please enter your name!", "Name");
if (promptAnswer === null || promptAnswer === "") {
  paragraph.innerText = "Idiot with no name!";
} else {
  paragraph.innerText = ` Player: ${promptAnswer}`;
}
//Random number creation
const randNumber = Math.floor(Math.random() * 100 + 1);

console.log(randNumber);
//create speech recognition
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
//get the result
recognition.onresult = (event) => {
  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript;
  guessNumber(transcript);
  countingClicks(transcript);
};
//What to do in which case
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
// Starting the guess app
guess.addEventListener("click", () => {
  recognition.start();
});

let clicks = 7;
function countingClicks(numb) {
  const number = +numb;
  guess.value = --clicks;
  if (guess.value == 0) {
    guess.disabled = true;
    par.innerText = "You don't have any more guesses!";
  } else {
    par.innerText = `You have ${guess.value} more guesses left!`;
  }
  if (guess.value > 0 && randNumber == number) {
    par.innerText = "Well done, that's a correct answer. You rock 'n' roll!";
  }
}

//Voice answer
function suggestion(message) {
  let speech = new SpeechSynthesisUtterance();
  speech.text = message;
  speech.volume = 1;
  speech.rate = 0.8;
  speech.pitch = 1;
  console.log(speech);
  window.speechSynthesis.speak(speech);
}
