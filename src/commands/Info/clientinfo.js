const si = require('systeminformation');
var pjson = require("../../../package.json");
const moment = require("moment");
const { version } = require("../../../config.json");
const { MessageEmbed } = require('discord.js')

//const {formatBytes} =require("../../Utils/functions");

async function formatBytes(bytes, decimals = 0) {
			if (bytes === 0) return "0 Bytes";

			const k = 1024;
			const dm = decimals < 0 ? 0 : decimals;
			const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];

			const i = Math.floor(Math.log(bytes) / Math.log(k));
			return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
		}

module.exports = {
	name: "clientinfo",
	desc: "Client Information",
	category: "Info",
	usage: "clientinfo",
	plugin: "info",
	run: async(client, message, args) => {
		let memused;
		let memtotal;
		let os;
		let node;
		let cpu;
		let net;
		let nets;
		let disk;
let npm;
		message.channel.sendTyping(1);
		await si.mem().then((data) => {
			memused = data.active;
			memtotal = data.total;
		});
		await si.osInfo().then(data => {
			os = data;
		});
		await si.fsSize().then(data => {
			disk = data;
		})
		await si.versions().then(data => {
			node = data;
			npm = data.npm
		})
		await si.cpu().then(data => {
			cpu = data;
		})
		await si.networkStats().then(data => {
			net = data;
		})
		await si.networkInterfaces().then(data => {
			nets = data;
		})
		
		let seconds = Number(await si.time().uptime);
		let seconds2 = Number(await client.uptime / 1000);

		var d = Math.floor(seconds / (3600 * 24));
		var h = Math.floor((seconds % (3600 * 24)) / 3600);
		var m = Math.floor(seconds % 3600 / 60);
		var s = Math.floor(seconds % 60);

		var d2 = Math.floor(seconds2 / (3600 * 24));
		var h2 = Math.floor((seconds2 % (3600 * 24)) / 3600);
		var m2 = Math.floor((seconds2 % 3600) / 60);
		var s2 = Math.floor(seconds2 % 60);

		memused = await formatBytes(memused);

		memtotal = await formatBytes(memtotal);

		let totaldiskbytes = disk[0].size;
		let useddiskbytes = disk[0].used;

		let totaldisk = await formatBytes(totaldiskbytes);
		let useddisk = await formatBytes(useddiskbytes);

		const embed = new MessageEmbed()
		.setTitle("Server/Client Info")
		.addField("Discord.js", `${pjson.dependencies["discord.js"]}`, true)
		.addField("Memery", `${memused} / ${memtotal}`, true)
		.addField("Storage", `${useddisk} / ${totaldisk})`,true)
		.addField("Storage Type", `${disk[0].type}`, true)
		.addField("Os", `${os.platform}`, true)
		.addField("Os Version", `${os.distro}`, true)
		.addField("node.js", `${node.node}`, true)
		.addField("Npm", `${npm || "NULL"}`, true)
		.addField("Processors", `${cpu.processors}`, true)
		.addField("Cpu Cores", `${cpu.cores}`, true)
		.addField("Bot Version", `${version}`, true)
		.addField("Timezone", `${await si.time().timezoneName}`, true)
		.addField("Time", `${await moment(si.time().current).format("hh:mm:ss A")}`, true)
		.addField("Today's Date", `${await moment(si.time().current).format("dddd, MMMM Do YYYY")}`, true)
		.addField(
				"System Uptime",
				`${d} Days, ${h} Hours, ${m} Minutes, ${s} Seconds`,
				false
			)
            .addField(
				"Bots Uptime",
				`${d2} Days, ${h2} Hours, ${m2} Minutes, ${s2} Seconds`,
				false


			);

message.channel.send({embeds: [embed] });
}
}
