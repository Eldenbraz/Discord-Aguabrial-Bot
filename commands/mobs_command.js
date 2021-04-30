const Discord = require('discord.js');
const fetch = require('node-fetch');
const querystring = require('querystring');
const puppeteer = require('puppeteer');
const { exit } = require('process');

module.exports = {
    name: 'mob',
    description: 'Look for a precise mob\'s informations in Dofus\' encyclopedia',
    async execute(message,args) {
      if (!args.length)
        return message.channel.send('MANQUE LES ARGUMENTS');
      var mob_type = "monstres";
      var mob_call = args[0];
      var mob_race, mob_name, mob_image, mob_loot, mob_stats;
      var browser;
      if (args[0] == "help")
        return message.channel.send("Utilisation de la commande \"Mob\": .mob [Nom du monstre]\n");

      try {
        browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto('https://www.dofus.com/fr/mmorpg/encyclopedie/'+mob_type+'?text='+mob_call);
        await page.click('.ak-linker a');
        await page.screenshot({ path: './found_this_mob.png'}); //debug
        mob_name = await page.$eval(".ak-title-container.ak-backlink h1",el => el.textContent);
        mob_image = await page.$eval('link[rel="image_src"]',el => el.href);
        // mob_race = await page.$eval(".col-xs-8 ak-encyclo-detail-type",el => el.textContent);
        mob_stats = await page.$$eval('.ak-content-list.ak-displaymode-col .ak-list-element .ak-main .ak-main-content .ak-content .ak-title span',el => el.map(el=>el.textContent));
        mob_loot = await page.$$eval('.ak-content-list .ak-list-element .ak-title a',el => el.map(el=>el.textContent))

        // for (i = 0; i < mob_loot.length;i++)
        //   message.channel.send("Got this from the array: "+mob_loot[i].split('{')[0]);
        await browser.close();
      
        const embed = new Discord.MessageEmbed()
        // .attachFiles(['./agi_logo.png'])
        // .attachFiles(['./chance_logo.png'])
        // .attachFiles(['./str_logo.png'])
        // .attachFiles(['./intel_logo.png'])
        // .attachFiles(['./neutre_logo.png'])
        
        .setColor('#9999ff')
        .setTitle(mob_name)
        .setImage(mob_image)
        .addFields(
            { name: 'PV', value: mob_stats[0] },
            { name: 'PA', value: mob_stats[1] },
            { name: 'PM', value: mob_stats[2] },
        )// "\u200B" = truc vide
        .addFields(
          { name: 'Res Terre', value: mob_stats[3] },
          { name: 'Res Air', value: mob_stats[4] },
          { name: 'Res Feu', value: mob_stats[5] },
          { name: 'Res Eau', value: mob_stats[6] },
          { name: 'Res Neutre', value: mob_stats[7] },
        )
        .addField('Loots',mob_loot[0].split('{')[0],true)
        for (i = 1; i < 6 ;i++) // PROBLEME HERE
          embed.addField('\u200B',mob_loot[i].split('{')[0],true)
        message.channel.send({embed});
      } catch(error) {
        await message.channel.send("Erreur lors de l'exécution de la commande. Vérifiez l'ortographe employée, et que la page correspondante existe bien.\n\".mob help\" pour plus d'informations sur cette commande.");
        await message.channel.send("Debug mode: error is ["+error+"]");
        browser.close();
      }
    }
};