const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const deck = require('./deck7.json');
// const dictionary = require('./symbol-dictionary.json');
// space for the 3 robots i.e. dealer, checker, score-keeper
const dealer = require('./dealer.js');
// const checker = require('./checker.js');
// const scoreKeeper = require('./score-keeper.js');

const client = new Discord.Client();
const cooldowns = new Discord.Collection();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

client.on('ready', () => {
	console.log('Ready!');
});

const array = ['one', deck[0], 'three'];

client.on('message', message => {
	// console.log('got it this message: ' + message.content);
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	// start experiment
	if (message.content == '!ping') {
		// message.reply('pong');
		// message.reply(array[3]);
	}
	array[0] = '1';
	array[3] = 'four';
	// end experiment

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	// Robot start
	try {
		const userID = message.author.id;
		const username = message.author.username;
		dealer.execute(commandName, userID, username, message);
		// console.log('dealer.roundActive is ', dealer.roundActive());
		if (dealer.gameStarted() && !dealer.roundActive()) {
			const { card1, card2 } = dealer.startGame(message);
			// REPLACE BELOW WITH PICTURE CARDS
			// console.log('card1 is ', card1, ' and card2 is ', card2);
			message.channel.send('', {
				files: [
					'./cards/' + card1 + '.png',
					'./cards/' + card2 + '.png',
				],
			});
		}
	}
	catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}

	if (commandName == 'start') {
		if (dealer.gameStarted() == true) {
			message.channel.send('Game already in progress!');
		}
		else {
			message.channel.send('Let the games begin! \nFirst to 6 rounds takes all the glory!');
			const { card1, card2 } = dealer.startGame(message);
			// REPLACE BELOW WITH PICTURE CARDS
			console.log('card1 is ', card1, ' and card2 is ', card2);
			message.channel.send('', {
				files: [
					'./cards/' + card1 + '.png',
					'./cards/' + card2 + '.png',
				],
			});
		}
	}
	// Robot end

	if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);

	if (command.args && !args.length) {
		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	}

	// Cooldown information
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 10) * 1000;
	if (!timestamps.has(message.author.id)) {
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	}
	else {
		// ...
	}

	// Execute command and catch errors
	try {
		command.execute(message, args, array);
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(token);
