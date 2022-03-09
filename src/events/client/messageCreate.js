const { prefix } =require('../../../config.json')

module.exports = {
	name: "messageCreate",
	run: async(message, bot) => {

		if (message.author.bot) return;

		if (!message.content.toLowerCase().startsWith(prefix)) return;

		let args = message.content.substring(prefix.length).split(" ");

		const cmd = args[0].toLowerCase();
		const command = bot.commands.get(`${cmd}`) 
		if (!command) return;
		command.run(bot, message, args);
	}
};
