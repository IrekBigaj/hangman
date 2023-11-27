//TODO: do przeniesienia do zewnętrznego pliku JSON
categories: ["Ogólne", "Sport", "Szkoła", "Boże Narodzenie", "Film"];
levels: ["easy", "medium", "hard"];

//TODO: do przeniesienia do zewnętrznego pliku JSON
// rozbudować o powiązanie z kategoriami, aby po wylosowaniu hasła wyświetlać także kategorię z jakiej jest hasło
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

var english = document.getElementById("en"),
	polish = document.getElementById("pl"),
	german = document.getElementById("de");

function generateWord() {
	const max_no = sentences.length - 1;
	const min_no = 0;
	const random_no = Math.floor(Math.random() * max_no);
	let currentSentece = sentences[random_no].toUpperCase();

	// return [currentSentece, currentSenteceLength];

	console.log("Word generated: " + currentSentece);

	showSentenceSpaces(currentSentece);
	return currentSentece;
}

function showSentenceSpaces(sentence) {
	const currentSenteceLength = sentence.length;
	const letters = sentence.split("");
	const where = document.getElementById("game-sentence");

	// console.log(where);
	// console.log("Show sentence: " + sentence + " letters: " + currentSenteceLength	);

	where.innerText = "";

	for (let i = 0; i < letters.length; i++) {
		const div = document.createElement("div");
		div.classList.add("game-sentence-box"); //space for letter
		if (letters[i] === " ") {
			div.classList.add("game-sentence-box-space"); // space for space
		}
		// console.log(div);

		where.appendChild(div);
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
	currentSentece = generateWord();
	enableAllLetters();
	attempt_number = 5;
	showNoAttempts(attempt_number);
	console.log(currentSentece + " zostało:" + attempt_number + " prob");
	checkLetterInSentence();
	// zamien zdanie na tablice
	// sprawdz ile
}

//function checkLetterInSentence(letter) {
function checkLetterInSentence() {
	// document
	// 	.getElementsByClassName("game-letter")
	// 	.addEventListener("click", function () {
	// 		console.log(innerText);

	let elemLetters = document.querySelector(".game-letters");
	//to do - something is wront in second sentence - somthing should be erased
	elemLetters.addEventListener("click", (e) => {
		if (
			// e.target.nodeName.toUpperCase() === "BUTTON" &&
			e.target.classList.contains("game-letter")
		) {
			let letter = e.target.dataset.letter.toUpperCase();
			// this.checkLettersInSentention(letter.toUpperCase());
			console.log("Klawisz " + letter);
			console.log("Liczba prob przed: " + attempt_number);
			e.target.disabled = true; //Disable used letter
			attempt_number = attempt_number - 1;
			showNoAttempts(attempt_number);
			console.log("Liczba prob po: " + attempt_number);
			if (attempt_number === 0) {
				gameOver();
			}
		}
	});
	//jeśli litera jest w haśle to ją wyświetl
	//jeśli litery nie ma w haśle to zmniejsz liczbę prób
	//jeśli skończyła się liczba prób to zakończ grę
}

function gameOver() {
	//to do

	alert("Koniec gry. Nie zgadłeś hasła.");
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
	disableAllLetters();
}

initBoard();
document.querySelector(".game-start").addEventListener("click", function () {
	startGame();
});
