const Discord = require('discord.js');
const fetch = require('node-fetch');
const querystring = require('querystring');
const { exit } = require('process');
const { resolve } = require('path');

module.exports = {
    name: 'stats',
    description: 'Look for a precise mob\'s stats from Dofensive.',
    async execute(message, args) {
        if (!args.length)
            return message.channel.send('MANQUE LES ARGUMENTS');
        if (args[0] == "help")
            return message.channel.send("Utilisation de la commande \"Stats\": .stats [Nom du monstre]\nLa commande supporte les espaces, mais ne supporte pas la recherche de plusieurs monstres en même temps. Si le monstre renvoyé est incorrect, réessayez en plaçant des majuscules aux différents mots.");

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
                                .addField(`<:res_neutral:838851182965424129>`, json.Grades[4].Resistances.Neutral + " %", false)
                                .addField('<:res_earth:838851183321940009>', json.Grades[4].Resistances.Earth + " %", false)
                                .addField('<:res_fire:838851183418015804>', json.Grades[4].Resistances.Fire + " %", false)
                                .addField('<:res_water:838851183065563176>', json.Grades[4].Resistances.Water + " %", false)
                                .addField('<:res_air:838851197137453119>', json.Grades[4].Resistances.Air + " %", false)
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
                                .addField('HPs', json.Grades[0].LifePoints, true)
                                .addField('APs', json.Grades[0].ActionPoints, true)
                                .addField('MPs', json.Grades[0].MovementPoints, true)
                            // .setURL(`https://dofensive.com/fr/monster/${test.Id}`)
                            message.channel.send({ embed });
                        });
                }).catch(reason => console.log(reason));
        }
        test2();
        test3();
    }
};


