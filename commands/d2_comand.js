const Discord = require('discord.js');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// import { Destiny2 } from 'bungie-api-ts/destiny2';

//https://www.bungie.net
module.exports = {
    name: 'd2',
    description: '',
    async execute(message, args) {
        var apiKey = "32d9272d895b424cb359b58f4fc1189e";
        var initUrl = "https://www.bungie.net";
        var gibItem = "";
        var itemId = "";
        var buster = 0;

        if (args.length === 1 && args[0] == "help") {
            message.channel.send("\`\`\`Usage: ?d2 [item name] *[item nbr]\n\t* = optionnal\n\t[item nbr] can be used to select an item when the bot responds with a list of items.");
            return;
        }
        for (n = 0; n < args.length; n++) {
            gibItem += args[n];
            gibItem += ' ';
        }

        var xhr = new XMLHttpRequest();
        xhr.open("GET",`${initUrl}/Platform/Destiny2/Armory/Search/DestinyInventoryItemDefinition/${gibItem}`,true)
        xhr.setRequestHeader("X-API-Key", apiKey);
        
        xhr.onreadystatechange = function() {
            if(this.readyState === 4 && this.status === 200) {
                var numbrick = '1';
                console.log("sradoche");
                var json = JSON.parse(this.responseText);
                var perc = json.Response.results;
                if (perc.results.length === 0) {
                    message.channel.send("Nothing was found! You may want to check your spelling, or maybe the item you're looking for isn't in the API yet.")
                    message.react('☠️');
                    return;
                } else if (args[args.length-1] <= '9' && args[args.length-1] >='0') {
                    numbrick = args[args.length-1];
                } else if (perc.results.length >= 2) {
                    message.channel.send('Found all those items:');
                    for (y = 0; y < perc.results.length; y++) {
                        const embeded = new Discord.MessageEmbed()
                            .setTitle(perc.results[y].displayProperties.name)
                            .setThumbnail( `${initUrl}${perc.results[y].displayProperties.icon}`)
                        message.channel.send(embeded);
                    }
                    message.channel.send('To find a specific item, make another search ending with the number matching the right item. (Warning: looking for a Catalyst or an Emblem will result in an error)');
                    return;
                }
                // console.log(perc.results)
                itemId = perc.results[Number(numbrick)-1].hash;
                console.log(itemId);
            }
            var xhr2 = new XMLHttpRequest();
            xhr2.open("GET", `${initUrl}/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/${itemId}/`,true);
            xhr2.setRequestHeader("X-API-Key", apiKey);

            xhr2.onreadystatechange = function() {
                if(this.readyState === 4 && this.status === 200) {
                    var json = JSON.parse(this.responseText);
                    var perc = json.Response;
                    
                    var color = ['#40A2F6','#363FD6','#8E48EB','#C837D4','#F64068'];
                    const newEmbed = new Discord.MessageEmbed()
                        .setColor(color[Math.floor(Math.random()*color.length)])
                        .setTitle(perc.displayProperties.name)
                        .setThumbnail(`${initUrl}${perc.displayProperties.icon}`)
                        .addField("Type",`${perc.itemTypeAndTierDisplayName}`)
                        .addField("Description",`${perc.flavorText}`)
                    message.channel.send(newEmbed);

                    console.log(perc);
                }
            }
            xhr2.send();
        }
        xhr.send();

        // xhr.onreadystatechange = function() {
        //    if(xhr.readyState === XMLHttpRequest.DONE && this.readyState === 4 && this.status === 200){
        //        console.log("sradochent");
        //         var json = JSON.parse(this.responseText);
        //         var perc = json.Response.results;
        //         if (perc.results.length === 0)
        //             return;
        //         console.log(perc);
        //         var color = ['#40A2F6','#363FD6','#8E48EB','#C837D4','#F64068'];
        //         const newEmbed = new Discord.MessageEmbed()
        //             .setColor(color[Math.floor(Math.random()*color.length)])
        //             .setTitle(perc.results[0].displayProperties.name)
        //             .setThumbnail(`${initUrl}${perc.results[0].displayProperties.icon}`)
        //         message.channel.send(newEmbed);
    }
}