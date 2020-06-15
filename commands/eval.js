const Discord = require("discord.js");
const beautify = require("beautify")

module.exports.run = async (client, message, args) => {

    name: "eval",
    aliases: ["e", "evaluate", "evaluation", "run"],
    description: "Evaluates and runs your JS code",

        if(message.author.id !== "440200028292907048") {
            return message.channel.send({embed: {
                color: 16734039,
                description: "You do not have permission to run this command (Only owner of the bot can run this)!"
            }});
        }

        if(!args[0]) {
		    return message.channel.send({embed: {
                color: 16734039,
                description: "Please put code to evaluate!"
            }});
        }

        try {
            if (args.join(" ").toLowerCase().includes("token")) {
            return message.channel.send({embed: {
                color: 16734039,
                description: "You can't use this (This for safety reson)!"
            }});
            }

            const toEval = args.join(" ")
            const evaluated = eval(toEval)

            let embed = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setTimestamp()
                .setTitle("Eval")
                .addField("To evaluate:", `\`\`\`js\n${beautify(args.join(" "), { format: "js"})}\n\`\`\``)
                .addField("Evaluated:", evaluated)
                .addField("Type of:", typeof(evaluated));

            message.channel.send(embed);
        } catch (e) {

            let embed = Discord.RichEmbed()
                .setColor("#FF0000")
                .setTitle("\:x: Error!")
                .setDescription(e)
                .setFooter(client.user.username, client.user.displayAvatarURL())

            message.channel.send(embed);
        }
    }
}