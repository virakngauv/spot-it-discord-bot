const deck = require('./deck.json');

module.exports = {
	execute(card1, card2) {
		// given 2 cards, find the answer and return answer back
		// card1 and card2 are strings e.g. '1', '2', etc.
		let answer = -1;

		for (let i = 0; i < deck[card1].length; i++) {
			for (let j = 0; j < deck[card2].length; j++) {
				const symbol1 = deck[card1][i];
				const symbol2 = deck[card2][j];
				if (symbol1 == symbol2) {
					answer = symbol1;
					return answer;
				}
			}
		}

		return answer;
	},
};
