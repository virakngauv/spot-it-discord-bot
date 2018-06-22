const checker = require('./checker.js');
const scoreKeeper = require('./score-keeper.js');
const dictionary = require('./symbol-dictionary.json');
const deck = require('./deck.json');
let startGame = false;
let endGame = false;
let roundActive = false;
let card1 = '';
let card2 = '';
let answer = -1;

let round = 0;
// const roundLimit = 12;

module.exports = {
	gameStarted() {
		return startGame;
	},
	roundActive() {
		return roundActive;
	},
	startGame(message) {
		card1 = Math.floor(Math.random() * Object.keys(deck).length);
		card2 = Math.floor(Math.random() * Object.keys(deck).length);
		while (card1 == card2) {card2 = Math.floor(Math.random() * Object.keys(deck).length);}

		round++;
		console.log('round is ', round);
		message.channel.send('Round: ' + round);

		startGame = true;
		roundActive = true;
		// console.log('GAME HAS STARTED');
		// console.log('card1 is ', card1, ' and card2 is ', card2);

		return { card1, card2 };
	},
	execute(userMessage, userID, username, message) {
		if (!startGame || !roundActive) { return; }
		// Dealer Management
		// Pick 2 random cards

		answer = checker.execute(card1.toString(), card2.toString());

		// Translate userMessage into Int with For/In loop
		for (const key in dictionary) {
			// console.log('dictionary[key] is ', dictionary[key]);
			// console.log('answer is ', answer);
			// console.log('userMessage is ', userMessage, ' and key is ', key);
			if (userMessage == key) {
				if (answer == dictionary[key]) {
					scoreKeeper.execute(message);
					// console.log('CORRECT ANSWER!!!!!');
					message.channel.send(username + ' got it right!');
					roundActive = false;
				}
			}
		}

		// if (round > roundLimit - 1) {
		// 	scoreKeeper.setGlobalWinner(username);
		// }

		if (scoreKeeper.globalWinner() != -1) {
			// console.log('WE HAVE A WINNER!');
			// console.log('IT IS ', username);
			message.channel.send(username + ' won with ' + scoreKeeper.getScoreOf(username) + ' points!\n\nIf you want to start a new game, execute the "!start" command again.');

			endGame = true;
		}

		// End Game Management
		if (endGame) {
			scoreKeeper.clearScores();
			round = 0;
			startGame = false;
			endGame = false;
		}

	},
};
