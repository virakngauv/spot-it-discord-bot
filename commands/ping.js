module.exports = {
	name: 'ping',
	cooldown: 5,
	description: 'Ping!',
	execute(message, args, array) {
		message.channel.send('Pong.');
		message.reply(array[1][1]);
	},
};
