module.exports = {
	name: 'tutorial',
	description: 'Use "!start" to start a game of Spot It! then use commands like !cat or !dog (all words at 3 letters) to identify the matching symbol. Best to 12 wins!',
	execute(message) {
		message.channel.send('Use "!start" to start a game of Spot It! then use commands like !cat or !dog (all words at 3 letters) to identify the matching symbol. Best to 12 wins!');
	},
};
