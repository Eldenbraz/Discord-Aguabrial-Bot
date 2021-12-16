const Discord = require('discord.js');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// import { Destiny2 } from 'bungie-api-ts/destiny2';

//https://www.bungie.net
module.exports = {
    name: 'weeklyprogress',
    description: '',
    async execute(message, args) {
        var apiKey = "32d9272d895b424cb359b58f4fc1189e";
        var initUrl = "https://www.bungie.net";
        var gibName = "";
        var playerId = "";
        var memberId = "";
        var char_n = 0;

        if (args.length === 1 && args[0] == "help") {
            message.channel.send("\`\`\`Usage: ?weeklyprogress [bungie ID] *[character nbr]\n\t* = optionnal\n\t[character nbr] can be 1,2,3 depending of the character's position on the character selection menu.\`\`\`");
            return;
        }
        
        if (args.length >= 2 && args[args.length-1] <= '3' && args[args.length-1] >= '1') {
            char_n = Number(args[1])-1;
            console.log("I WNET IN")
            args.pop();
        }

        for (n = 0; n < args.length; n++) {
            gibName += args[n];
            gibName += ' ';
        }

        let fixName = gibName.replace("#","%23");
        
        var xhr = new XMLHttpRequest();
        xhr.open("GET",`${initUrl}/Platform/Destiny2/SearchDestinyPlayer/-1/${fixName}/`,true)
        xhr.setRequestHeader("X-API-Key", apiKey);
        xhr.onreadystatechange = function() {
            if(this.readyState === 4 && this.status === 200) {
                console.log("sradoche");
                var json = JSON.parse(this.responseText);
                var perc = json.Response;
                console.log(perc);
                if (perc.length === 0) {
                    message.channel.send("Nothing was found! You may want to check the Name's spelling and Bungie usertag.")
                    message.react('☠️');
                    return;
                }

                playerId = perc[0].membershipId;
                memberId = perc[0].membershipType;

                // if (perc[0].isPublic === false) {
                //     message.channel.send("The account you're looking for is private. His datas cannot be accessed.");
                //     return;
                // }

                // ^^ TEMPLATE GET A PLAYER PROFILE

                var xhr2 = new XMLHttpRequest();
                xhr2.open("GET", `${initUrl}/Platform/Destiny2/${memberId}/Profile/${playerId}/?components=104,202,200`,true);
                xhr2.setRequestHeader("X-API-Key", apiKey);
                xhr2.onreadystatechange = function() {
                    if(this.readyState === 4 && this.status === 200) {
                        var json2 = JSON.parse(this.responseText);
                        var perc2 = json2.Response;
                        var chose_char = Object.keys(perc2.characterProgressions.data)[char_n]; // 0/1/2 = characters
                        console.log(chose_char);
                        // for (var test in perc2.characterProgressions.data) {
                        //     console.log(test);
                        // }
                        var Pcolor = ['#FAA9A7','#DE3CA7','#D24EF5','#905EE0','#191EFF'];
                        const playerEmbed = new Discord.MessageEmbed()
                            .setColor(Pcolor[Math.floor(Math.random()*Pcolor.length)])
                            .setTitle(`Weekly Progression`)
                            .setImage(`${initUrl}/${perc2.characters.data[chose_char].emblemPath}`)
                            .setAuthor(`${perc[0].bungieGlobalDisplayName}#${perc[0].bungieGlobalDisplayNameCode}`,`${initUrl}${perc[0].iconPath}`,'')
                            .addField("XP Progression",`${perc2.profileProgression.data.seasonalArtifact.powerBonusProgression.progressToNextLevel} / ${perc2.profileProgression.data.seasonalArtifact.powerBonusProgression.nextLevelAt}`,true)
                            .addField("Pwr Bonus",`${perc2.profileProgression.data.seasonalArtifact.powerBonus}`,true)
                            // .addField("Trials",`Milestone 1: ${perc2.characterProgressions.data[chose_char].milestones["2311040624"].availableQuests["0"].status.redeemed}\nMilestone 2: ${perc2.characterProgressions.data[chose_char].milestones["2311040624"].availableQuests["0"].status.stepObjectives["0"].complete}`)
                            .addField("Presage",`Status: ${perc2.characterProgressions.data[chose_char].milestones["3927548661"].activities["0"].challenges["0"].objective.complete}`)
                            // .addField("Caw Caw",`Status: ${perc2.characterProgressions.data[chose_char].milestones["3927548661"].activities["0"].challenges["0"].objective.complete}`,true)
                            .addField("Clan Engrams",`1: ${perc2.characterProgressions.data[chose_char].milestones["4253138191"].rewards["1"].entries["0"].redeemed}\n2: ${perc2.characterProgressions.data[chose_char].milestones["4253138191"].rewards["1"].entries["1"].redeemed}\n3: ${perc2.characterProgressions.data[chose_char].milestones["4253138191"].rewards["1"].entries["2"].redeemed}\n4: ${perc2.characterProgressions.data[chose_char].milestones["4253138191"].rewards["1"].entries["3"].redeemed}`)
                            
                            if (perc2.characterProgressions.data[chose_char].milestones["3842941126"])
                                playerEmbed.addField("Trials",`Milestone 1: ${perc2.characterProgressions.data[chose_char].milestones["3842941126"].availableQuests["0"].status.redeemed}\nMilestone 2: ${perc2.characterProgressions.data[chose_char].milestones["3842941126"].availableQuests["0"].status.stepObjectives["0"].complete}`)
        
                            message.channel.send(playerEmbed);

                        // console.log(perc2.characterProgressions.data[chose_char].milestones);
                    }
                }
                xhr2.send();
            }
        }
        xhr.send();
    }
}