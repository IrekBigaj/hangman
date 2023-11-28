//TODO: do przeniesienia do zewnętrznego pliku JSON
categories: ["Ogólne", "Sport", "Szkoła", "Boże Narodzenie", "Film"];
levels: ["easy", "medium", "hard"];

//TODO: do przeniesienia do zewnętrznego pliku JSON
//TODO: rozbudować o powiązanie z kategoriami, aby po wylosowaniu hasła wyświetlać także kategorię z jakiej jest hasło
const sentences = [
	"Fantomas",
	"Myszka Miki",
	"Super pies",
	"Przyjaciele",
	"Terminator",
	"Superman",
	"Herkules",
	"Batman",
	"Spiderman",
	"Kapitan Ameryka",
];

let attempt_number = 5; // standard no of attempts
let currentLettersInSentence = null;

let english = document.getElementById("en"),
	polish = document.getElementById("pl"),
	german = document.getElementById("de");

// let elemSentence = document.querySelector(".game-sentence");
let elemSentence = document.getElementById("game-sentence");

function generateWord() {
	const max_no = sentences.length - 1;
	const min_no = 0;
	const random_no = Math.floor(Math.random() * max_no);
	let currentSentence = sentences[random_no].toUpperCase();

	currentLettersInSentence = currentSentence.replace(/ /g, "");
	// return [currentSentence, currentSentenceLength];

	console.log("Word generated: " + currentSentence);

	showSentenceSpaces(currentSentence);
	return currentSentence;
}

function LetterInSentenceExists() {
	return currentLettersInSentence.length;
}

function showSentenceSpaces(sentence) {
	const currentSentenceLength = sentence.length;
	const letters = sentence.split("");
	// const where = document.getElementById("game-sentence");

	// console.log(where);
	// console.log("Show sentence: " + sentence + " letters: " + currentSentenceLength	);

	elemSentence.innerText = "";

	for (let i = 0; i < letters.length; i++) {
		const div = document.createElement("div");
		div.classList.add("game-sentence-box"); //space for letter
		if (letters[i] === " ") {
			div.classList.add("game-sentence-box-space"); // space for space
		}
		// console.log(div);

		elemSentence.appendChild(div);
		// document.getElementsByClassName("game-sentece").appendChild(div);
	}
}

function disableAllLetters() {
	const letters = document.getElementsByClassName("game-letter");
	for (let i = 0; i < letters.length; i++) {
		letters[i].disabled = true;
	}
}

function enableAllLetters() {
	const letters = document.getElementsByClassName("game-letter");
	for (let i = 0; i < letters.length; i++) {
		letters[i].disabled = false;
	}
}

function startGame() {
	// console.log("Start game button pressed.");
	currentSentence = generateWord();
	enableAllLetters();
	attempt_number = 5;
	showNoAttempts(attempt_number);
	console.log(currentSentence + " zostało:" + attempt_number + " prob");
}

function checkLetterInSentence(letter) {
	console.log("checkLetterInSentence for letter: " + letter);
	if (currentSentence.includes(letter)) {
		for (let i = 0; i < currentSentence.length; i++) {
			if (currentSentence[i] === letter) {
				elemSentence.querySelectorAll(".game-sentence-box")[i].innerText =
					letter;
			}
		}

		currentLettersInSentence = currentLettersInSentence.replace(
			new RegExp(letter, "g"),
			""
		);

		if (!LetterInSentenceExists()) {
			//if there is no letter in sentence
			gameCompleted();
		}
	} else {
		// decrease number of attmpts
		attempt_number = attempt_number - 1;
		showNoAttempts(attempt_number);
		console.log("Liczba prob po: " + attempt_number);
		if (attempt_number === 0) {
			gameOver();
		}
	}
}

function addButtonsListeners() {
	let elemLetters = document.querySelector(".game-letters");
	elemLetters.addEventListener("click", (e) => {
		if (
			// e.target.nodeName.toUpperCase() === "BUTTON" &&
			e.target.classList.contains("game-letter")
		) {
			let letter = e.target.dataset.letter.toUpperCase();
			checkLetterInSentence(letter.toUpperCase());
			console.log("Klawisz " + letter);
			e.target.disabled = true; //Disable used letter
		}
	});
}

function gameOver() {
	alert("Koniec gry. Nie zgadłeś hasła.");
	disableAllLetters();
}

function gameCompleted() {
	alert("Odgadłeś hasło i wygrałeś! Brawo!");
	disableAllLetters();
}

function showNoAttempts(attempt_number) {
	//todo
	const where_attempts = document.getElementsByClassName("game-data")[0];
	console.log(where_attempts);
	where_attempts.innerText = attempt_number;
	console.log(attempt_number);
}

function generateLetterButtons() {
	const alphabet = [
		"a",
		"ą",
		"b",
		"c",
		"ć",
		"d",
		"e",
		"ę",
		"f",
		"g",
		"h",
		"i",
		"j",
		"k",
		"l",
		"ł",
		"m",
		"n",
		"ń",
		"o",
		"ó",
		"p",
		"q",
		"r",
		"s",
		"ś",
		"t",
		"u",
		"v",
		"w",
		"x",
		"y",
		"z",
		"ż",
		"ź",
	];
	alphabet.forEach((letter) => {
		const button = document.createElement("button");
		button.classList.add("game-letter");
		button.type = "button";
		button.classList.add(letter);
		button.dataset.letter = letter;
		button.innerText = letter;
		document.getElementsByClassName("game-letters")[0].appendChild(button);
	});
}

function initBoard() {
	generateLetterButtons();
	addButtonsListeners();
	disableAllLetters();
}

initBoard();
document.querySelector(".game-start").addEventListener("click", function () {
	startGame();
});
