const Discord = require('discord.js');
const fetch = require('node-fetch');
const querystring = require('querystring');
const { exit } = require('process');
const { resolve } = require('path');

module.exports = {
    name: 'abs',
    description: 'Look for a precise mob\'s abilities from Dofensive.',
    async execute(message, args) {
        if (!args.length)
            return message.channel.send('MANQUE LES ARGUMENTS');
        if (args[0] == "help")
            return message.channel.send("Utilisation de la commande \"Abs\": .abs [Nom du monstre]\nLa commande supporte les espaces, mais ne supporte pas la recherche de plusieurs monstres en même temps. Si le monstre renvoyé est incorrect, réessayez en plaçant des majuscules aux différents mots.");

        async function test() {
            fetch('https://dofensive.com/api/monsterPreview.php?Language=fr')
                .catch(reason => console.log(reason))
                .then(res => res.json()).catch(reason => console.log(reason))
                .then(async function (json) {
                    var test = await json.find(x => x.Name == args.join(' '));
                    if (test == undefined) {
                        console.log("Erreur : nom");
                        message.channel.send("Erreur lors de l'exécution de la commande. Vérifiez l'orthographe du nom entré.\n\".abs help\" pour plus d'informations sur cette commande.");
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
                                                var a, b, c, d;
                                                var retour,buffer;
                                                // console.log(json.Levels[0].Effects[0].Actions);
                                                // console.log("--------------------------------------------------------------------------------------\n");
                                                retour += "PA : **" + json.Levels[0].ActionPoints + "**\tCrit : **" + json.Levels[0].CriticalProbability + "%**"
                                                retour += "\nPortée : **"+json.Levels[0].MinRange+" - "+json.Levels[0].Range+"** > Portée **"
                                                retour += (json.Levels[0].EditableRange == true ? "Modifiable" : "Non Modifiable" )+"**\n"
                                                retour += (json.Levels[0].CastInLine == true ? "Lancer en ligne Uniquement\n" : "")
                                                retour += (json.Levels[0].CastInDiagonal == true ? "Lancer en Diagonale Possible\n" : "")
                                                retour += (json.Levels[0].CastLineOfSight == true ? "Ligne de Vue nécessaire\n" : "Ne nécessite pas de Ligne de Vue\n")
                                                retour += (json.Levels[0].NeedFreeCell == true ? "Ne nécessite pas de cible\n" : "")
                                                retour += (json.Levels[0].NeedTakenCell == true ? "Nécessite une cible\n" : "")
                                                retour += (json.Levels[0].NeedFreeTrapCell == true ? "Nécessite une cellule **libre**\n" : "")
                                                retour += (json.Levels[0].MaxStack > 0 ? `Cumul max des effets : ${json.Levels[0].MaxStack}\n` : "")
                                                retour += (json.Levels[0].MaxCastPerTurn > 0 ? `Utilisations par tour : ${json.Levels[0].MaxCastPerTurn}\n` : "")
                                                retour += (json.Levels[0].MaxCastPerTarget > 0 ? `Utilisations par cible : ${json.Levels[0].MaxCastPerTarget}\n` : "")
                                                retour += (json.Levels[0].MinCastInterval > 0 ? `Intervale de relance : ${json.Levels[0].MinCastInterval}\n` : "")
                                                retour += (json.Levels[0].Effects[0].Dispellable > 0 ? "*Peut être désenvouté*\n" : "")

                                                retour += ("\`\`\`apache\n")
                                                for (a = 0; a < json.Levels[0].Effects.length; a++) {
                                                    buffer = (json.Levels[0].Effects[a].Description)
                                                    for (b = 0; b < json.Levels[0].Effects[a].Actions.length; b++) {
                                                        console.log(buffer)
                                                        console.log("#"+(b+1))
                                                        buffer = (buffer.replace("#"+(b+1),json.Levels[0].Effects[a].Actions[b].Value.Name))
                                                    }
                                                    retour += (buffer+"\n")
                                                }
                                                retour += (`<Zone d'effet> : ${json.Levels[0].Effects[0].Zone.Value}\n`)
                                                retour += (`\`\`\`\n`)
                                                resolve({
                                                    name: x.Name, 
                                                    value: retour 
                                                    
                                                    // (json.Levels[0].Effects[0].Actions[1]?.Value.Name ? `\`\`\`apache\n${json.Levels[0].Effects[0].Description.replace("#1",`${json.Levels[0].Effects[0].Actions[0].Value.Name}`).replace("#2",`${json.Levels[0].Effects[0].Actions[1].Value.Name}`)}\n` : (json.Levels[0].Effects[0].Description.replace("#1",`${json.Levels[0].Effects[0].Actions[0]?.Value.Name}`) ? `\`\`\`apache\n${json.Levels[0].Effects[0].Description.replace("#1",`${json.Levels[0].Effects[0].Actions[0]?.Value.Name}`)}\n` : "")) +
                                                    // (`<Zone d'effet> : ${json.Levels[0].Effects[0].Zone.Value}\`\`\`\n`) +
                                                    // (json.Levels[0].Effects[1]?.Actions[1]?.Value.Name ? `\`\`\`apache\n${json.Levels[0].Effects[1].Description.replace("#1",`${json.Levels[0].Effects[1].Actions[0].Value.Name}`).replace("#2",`${json.Levels[0].Effects[1].Actions[1].Value.Name}`)}\n` : (json.Levels[0].Effects[1]?.Description?.replace("#1",`${json.Levels[0].Effects[1].Actions[0]?.Value.Name}`) ? `\`\`\`apache\n${json.Levels[0].Effects[1]?.Description?.replace("#1",`${json.Levels[0].Effects[1].Actions[0]?.Value.Name}`)}\n` : "")) +
                                                    // (json.Levels[0].Effects[1]?.Zone.Value ? `<Zone d'effet> : ${json.Levels[0].Effects[1]?.Zone.Value}\`\`\`\n` : "") +
                                                    // (json.Levels[0].Effects[2]?.Actions[1]?.Value.Name ? `\`\`\`apache\n${json.Levels[0].Effects[2].Description.replace("#1",`${json.Levels[0].Effects[2].Actions[0].Value.Name}`).replace("#2",`${json.Levels[0].Effects[2].Actions[1].Value.Name}`)}\n` : (json.Levels[0].Effects[2]?.Description?.replace("#1",`${json.Levels[0].Effects[2].Actions[0]?.Value.Name}`) ? `\`\`\`apache\n${json.Levels[0].Effects[2]?.Description?.replace("#1",`${json.Levels[0].Effects[2].Actions[0]?.Value.Name}`)}\n` : "")) +
                                                    // (json.Levels[0].Effects[2]?.Zone.Value ? `<Zone d'effet> : ${json.Levels[0].Effects[2]?.Zone.Value}\`\`\`\n` : "") +
                                                    // (json.Levels[0].Effects[3]?.Actions[1]?.Value.Name ? `\`\`\`apache\n${json.Levels[0].Effects[3].Description.replace("#1",`${json.Levels[0].Effects[3].Actions[0].Value.Name}`).replace("#2",`${json.Levels[0].Effects[3].Actions[1].Value.Name}`)}\n` : (json.Levels[0].Effects[3]?.Description?.replace("#1",`${json.Levels[0].Effects[3].Actions[0]?.Value.Name}`) ? `\`\`\`apache\n${json.Levels[0].Effects[3]?.Description?.replace("#1",`${json.Levels[0].Effects[3].Actions[0]?.Value.Name}`)}\n` : "")) +
                                                    // (json.Levels[0].Effects[3]?.Zone.Value ? `<Zone d'effet> : ${json.Levels[0].Effects[3]?.Zone.Value}\`\`\`\n` : "") 
                                                });
                                            })
                                    })
                                })))// "\u200B" = truc vide
                                .setURL(`https://dofensive.com/fr/monster/${test.Id}`)
                            message.channel.send({ embed });
                        });
                }).catch(reason => console.log(reason));
        }
        async function test3() {
            fetch('https://dofensive.com/api/monsterPreview.php?Language=fr')
            .catch(reason => console.log(reason))
            .then(res => res.json()).catch(reason => console.log(reason))
            .then(async function (json) {
                var test = await json.find(x => x.Name == args.join(' '));
                                
                fetch(`https://dofensive.com/api/monster.php?Id=${test.Id}&Language=fr`)
                    .then(res => res.json())
                    .then(async function (json) {
                        const embed = new Discord.MessageEmbed()
                            .setColor('#e5t6y7')
                            .setTitle('Résistances')
                            .addField(`<:res_neutral:838851182965424129>`,json.Grades[4].Resistances.Neutral+" %",false)
                            .addField('<:res_earth:838851183321940009>',json.Grades[4].Resistances.Earth+" %",false)
                            .addField('<:res_fire:838851183418015804>',json.Grades[4].Resistances.Fire+" %",false)
                            .addField('<:res_water:838851183065563176>',json.Grades[4].Resistances.Water+" %",false)
                            .addField('<:res_air:838851197137453119>',json.Grades[4].Resistances.Air+" %",false)
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

        test2();
        test();
        test3();
    }

};