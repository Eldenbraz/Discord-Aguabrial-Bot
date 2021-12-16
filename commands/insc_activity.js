const Discord = require('discord.js');

module.exports = {
    name: 'activity',
    description: '',
    async execute(message, args) {
        if (args[0] == "help")
            return message.channel.send("Utilisation de la commande \"activity\": ?activity [activité] [date] *[desctription]\n* -> facultatif");
        if (!args.length || args.length < 2)
            return message.channel.send('Il manque des arguments!');

        async function activity_embed(message, args) {

            var fielding = "";
            var descript = "";

            for (v = 0; v < args.length-2; v++) {
                descript += args[v+2];
                descript += ' ';
            }

            const participants = [message.author.username];
            participants[0] += '\n';
            // fielding += (args.length > 2? `${args[2]}\n`: "\u200b")
            const embed = new Discord.MessageEmbed()
            .setColor('#E62575')
            .setAuthor(message.author.username, message.author.avatarURL(),'')
            .setTitle(args[0].toUpperCase())
            .addField(descript, `${args[1]}`, false)
            .addField(`Participants: (${participants.length}/6)`, participants[0], false)
            
            message.channel.send(embed).then(async embedReact => {
                embedReact.react('🟩');
                embedReact.react('🟥');
                
                const filter = (reaction, user) => {
                    return ['🟩','🟥'].includes(reaction.emoji.name) && user.id != '652439135193137153';
                };
                
                const collector = await embedReact.createReactionCollector(filter, { time: 0 });
                collector.on('collect', (reaction, reactionCollector) => {
                    console.log(`Collected ${reaction.emoji.name}`)
                    
                    let firstUser = reaction.users.cache.last();
                    
                    if (reaction.emoji.name === '🟩') {
                        
                        var buffering = "";
                        if (participants.length <= 6) {
                            if (participants.length == 6) {
                                // message.channel.send("Error! This activity is full!\n")
                                return;
                            }
                            for (u = 0; u < participants.length; u++) {
                                if (participants[u] === firstUser.username+'\n') {
                                    // message.channel.send("Error! You've already subscribed to this activity!\n");
                                    return;
                                }
                            }
                        }
                            
                        participants.push(firstUser.username+'\n');

                        for (i = 0; i < participants.length; i++)
                            buffering += participants[i];

                        const newEmbed = new Discord.MessageEmbed()
                            .setColor('#E62575')
                            .setAuthor(message.author.username, message.author.avatarURL(),'')
                            .setTitle(args[0].toUpperCase())
                            .addField(descript, `${args[1]}`, false)
                            .addField(`Participants: (${participants.length}/6)`, buffering, false)
                        embedReact.edit(newEmbed);
                        // message.channel.send(`${firstUser.username} grosse paz ptdr`)
                        // participants.pop();

                    } else if (reaction.emoji.name === '🟥') {
                    
                        // message.channel.send(`${firstUser.username} je n'avais pas à dire ça`)
                    
                    }
                });
                collector.on('end', collected => {
                    console.log(`Collected ${collected.size} items`);
                    });
                });
        }
        activity_embed(message, args);
        message.delete();
    }
};