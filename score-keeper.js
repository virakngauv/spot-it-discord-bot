let scores = {};
let globalWinner = -1;

module.exports = {
	getScoreOf(username) {
		return scores[username];
	},
	setGlobalWinner(username) {
		globalWinner = username;
	},
	globalWinner() {
		return globalWinner;
	},
	execute(message) {
		const username = message.author.username;
		if (!(scores[username])) {
			scores[username] = 1;
		}
		else {
			scores[username]++;
			// console.log('One point for you !');
		}

		if (scores[username] >= 6) {
			globalWinner = username;
		}
	},
	scores() {
		return scores;
	},
	clearScores() {
		scores = {};
		globalWinner = -1;
	},
};
