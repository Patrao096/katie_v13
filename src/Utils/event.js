const { readdirSync } = require("fs");

module.exports = (bot) => {

		readdirSync("./src/events/").forEach((dir) => {
			const events = readdirSync(`./src/events/${dir}/`).filter((f) =>
				f.endsWith("js")
			);

	for (let file of events) {
		let pull = require(`../events/${dir}/${file}`);

		bot.events.set(pull.name, pull);
		console.log(`Loaded Event: ${file}`);
		}
	});
}
