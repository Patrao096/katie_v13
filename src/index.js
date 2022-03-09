const { Client, Intents, Collection, MessageEmbed } = require("discord.js");

const bot = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

bot.events = new Collection();

bot.commands = new Collection();


const { prefix, version, token } = require("../config.json");


["event", "command"].forEach((hand) => {
	require(`./Utils/${hand}`)(bot);
});

//ready event

bot.on("ready", async () => {
	await bot.events.get("ready").run(version, bot);
});

//message event
bot.on("messageCreate", async (message) => {
	bot.config = {
		prefix,
		version,
	};
	await bot.events
		.get("messageCreate")
		.run(message, bot);
});



bot.login(token);
