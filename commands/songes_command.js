const Discord = require('discord.js');
const fetch = require('node-fetch');
const querystring = require('querystring');
const { exit } = require('process');
const { resolve } = require('path');

module.exports = {
    name: 'dreams',
    description: 'Look for a precise mob\'s stats, calculated with Dreams formula.',
    async execute(message, args) {
        if (!args.length)
            return message.channel.send('MANQUE LES ARGUMENTS');
        if (args[0] == "help")
            return message.channel.send("Utilisation de la commande \"Songes\": .songes [Nom du monstre] [Niveau]\nLa commande supporte les espaces, mais pas la recherche de plusieurs monstres en même temps. Pour plus d'informations sur un monstre, utiliser la commande Abs.");

        async function test() {
            fetch('https://dofensive.com/api/monsterPreview.php?Language=fr')
                .catch(reason => console.log(reason))
                .then(res => res.json()).catch(reason => console.log(reason))
                .then(async function (json) {
                    var test = await json.find(x => x.Name == args.join(' '));
                    if (test == undefined) {
                        console.log("Erreur : nom");
                        message.channel.send("Erreur lors de l'exécution de la commande. Vérifiez l'orthographe du nom entré.\n\".dreams help\" pour plus d'informations sur cette commande.");
                        return;
                    }
                                     
                    fetch(`https://dofensive.com/api/monster.php?Id=${test.Id}&Language=fr`)
                        .then(res => res.json())
                        .then(async function (json) {
                            const embed = new Discord.MessageEmbed()
                                .setColor('#ffffef')
                                .setTitle('Abilities')
                                .addFields(await Promise.all(json.Spells.map(async function (x) {
                                    return new Promise((resolve, reject) => {
                                        fetch(`https://dofensive.com/api/spell.php?Id=${x.Id}&Language=fr`)
                                            .then(res => res.json())
                                            .then(async function (json) {
                                                resolve({ 
                                                    name: x.Name, 
                                                    value: 
                                                    "PA : **" + json.Levels[0].ActionPoints + "**\tCrit : **" + json.Levels[0].CriticalProbability + "%**" +
                                                    "\nPortée : **"+json.Levels[0].MinRange+" - "+json.Levels[0].Range+"** > Portée **"+
                                                    (json.Levels[0].EditableRange == true ? "Modifiable" : "Non Modifiable" )+"**\n" + 
                                                    (json.Levels[0].CastInLine == true ? "Lancer en ligne Uniquement\n" : "") +
                                                    (json.Levels[0].CastInDiagonal == true ? "Lancer en Diagonale Possible\n" : "") +
                                                    (json.Levels[0].CastLineOfSight == true ? "Ligne de Vue nécessaire\n" : "Ne nécessite pas de Ligne de Vue\n") +
                                                    (json.Levels[0].NeedFreeCell == true ? "Ne nécessite pas de cible\n" : "") +
                                                    (json.Levels[0].NeedTakenCell == true ? "Nécessite une cible\n" : "") +
                                                    (json.Levels[0].NeedFreeTrapCell == true ? "Nécessite une cellule **libre**\n" : "") +
                                                    (json.Levels[0].MaxStack > 0 ? `Cumul max des effets : ${json.Levels[0].MaxStack}\n` : "") +
                                                    (json.Levels[0].MaxCastPerTurn > 0 ? `Utilisations par tour : ${json.Levels[0].MaxCastPerTurn}\n` : "") +
                                                    (json.Levels[0].MaxCastPerTarget > 0 ? `Utilisations par cible : ${json.Levels[0].MaxCastPerTarget}\n` : "") +
                                                    (json.Levels[0].MinCastInterval > 0 ? `Intervale de relance : ${json.Levels[0].MinCastInterval}\n` : "") +
                                                    (json.Levels[0].Effects[0].Dispellable > 0 ? "*Peut être désenvouté*\n" : "") +
                                                    //.replace("#3",`${json.Levels[0].Effects[0].Actions[2]?.Value.Name}`)
                                                    (json.Levels[0].Effects[0].Actions[1]?.Value.Name ? `\`\`\`apache\n${json.Levels[0].Effects[0].Description.replace("#1",`${json.Levels[0].Effects[0].Actions[0].Value.Name}`).replace("#2",`${json.Levels[0].Effects[0].Actions[1].Value.Name}`)}\n` : (json.Levels[0].Effects[0].Description.replace("#1",`${json.Levels[0].Effects[0].Actions[0]?.Value.Name}`) ? `\`\`\`apache\n${json.Levels[0].Effects[0].Description.replace("#1",`${json.Levels[0].Effects[0].Actions[0]?.Value.Name}`)}\n` : "")) +
                                                    (`<Zone d'effet> : ${json.Levels[0].Effects[0].Zone.Value}\`\`\`\n`) +
                                                    (json.Levels[0].Effects[1]?.Actions[1]?.Value.Name ? `\`\`\`apache\n${json.Levels[0].Effects[1].Description.replace("#1",`${json.Levels[0].Effects[1].Actions[0].Value.Name}`).replace("#2",`${json.Levels[0].Effects[1].Actions[1].Value.Name}`)}\n` : (json.Levels[0].Effects[1]?.Description?.replace("#1",`${json.Levels[0].Effects[1].Actions[0]?.Value.Name}`) ? `\`\`\`apache\n${json.Levels[0].Effects[1]?.Description?.replace("#1",`${json.Levels[0].Effects[1].Actions[0]?.Value.Name}`)}\n` : "")) +
                                                    (json.Levels[0].Effects[1]?.Zone.Value ? `<Zone d'effet> : ${json.Levels[0].Effects[1]?.Zone.Value}\`\`\`\n` : "") +
                                                    (json.Levels[0].Effects[2]?.Actions[1]?.Value.Name ? `\`\`\`apache\n${json.Levels[0].Effects[2].Description.replace("#1",`${json.Levels[0].Effects[2].Actions[0].Value.Name}`).replace("#2",`${json.Levels[0].Effects[2].Actions[1].Value.Name}`)}\n` : (json.Levels[0].Effects[2]?.Description?.replace("#1",`${json.Levels[0].Effects[2].Actions[0]?.Value.Name}`) ? `\`\`\`apache\n${json.Levels[0].Effects[2]?.Description?.replace("#1",`${json.Levels[0].Effects[2].Actions[0]?.Value.Name}`)}\n` : "")) +
                                                    (json.Levels[0].Effects[2]?.Zone.Value ? `<Zone d'effet> : ${json.Levels[0].Effects[2]?.Zone.Value}\`\`\`\n` : "") +
                                                    (json.Levels[0].Effects[3]?.Actions[1]?.Value.Name ? `\`\`\`apache\n${json.Levels[0].Effects[3].Description.replace("#1",`${json.Levels[0].Effects[3].Actions[0].Value.Name}`).replace("#2",`${json.Levels[0].Effects[3].Actions[1].Value.Name}`)}\n` : (json.Levels[0].Effects[3]?.Description?.replace("#1",`${json.Levels[0].Effects[3].Actions[0]?.Value.Name}`) ? `\`\`\`apache\n${json.Levels[0].Effects[3]?.Description?.replace("#1",`${json.Levels[0].Effects[3].Actions[0]?.Value.Name}`)}\n` : "")) +
                                                    (json.Levels[0].Effects[3]?.Zone.Value ? `<Zone d'effet> : ${json.Levels[0].Effects[3]?.Zone.Value}\`\`\`\n` : "") 
                                                });
                                            })
                                    })
                                })))// "\u200B" = truc vide
                                .setURL(`https://dofensive.com/fr/monster/${test.Id}`)
                            message.channel.send({ embed });
                        });
                }).catch(reason => console.log(reason));
        }
        async function test2() {
            fetch('https://dofensive.com/api/monsterPreview.php?Language=fr')
                .catch(reason => console.log(reason))
                .then(res => res.json()).catch(reason => console.log(reason))
                .then(async function (json) {
                    var test = await json.find(x => x.Name == args.join(' '));
                                     
                    fetch(`https://dofensive.com/api/monster.php?Id=${test.Id}&Language=fr`)
                        .then(res => res.json())
                        .then(async function (json) {
                            const embed = new Discord.MessageEmbed()
                                .setColor('#F51504')
                                .setTitle(json.Name)
                                .setImage(`https://dofensive.com/data/picture/${test.Id}.webp`)
                                .addField('HPs',json.Grades[0].LifePoints,true)
                                .addField('APs',json.Grades[0].ActionPoints,true)
                                .addField('MPs',json.Grades[0].MovementPoints,true)
                                // .setURL(`https://dofensive.com/fr/monster/${test.Id}`)
                            message.channel.send({ embed });
                        });
                }).catch(reason => console.log(reason));
        }

        test();
        test2();
    }

};