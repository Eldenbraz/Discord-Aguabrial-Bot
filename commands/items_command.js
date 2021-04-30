const Discord = require('discord.js');
const fetch = require('node-fetch');
const querystring = require('querystring');
const puppeteer = require('puppeteer');
const { exit } = require('process');

module.exports = {
    name: 'item',
    description: 'Look for an item in Dofus\' encyclopedia',
    async execute(message,args) {
      if (!args.length)
        return message.channel.send('MANQUE LES ARGUMENTS');
      var item_type;
      var item_call = args[1];
      var item_description, item_name, item_image;
      var browser;
      if (args[0] == "help")
        return message.channel.send("Utilisation de la commande \"Item\": .item [Type de l'objet] [Nom de l'objet]\n\n[Types] : armes (dague, epee, baguette...)\n\t\t\t\t  equipements (set)\n");
      else if (args[0] == "dague" || args[0] == "hache" || args[0] == "epee" || args[0] == "arc" || args[0] == "baton" || args[0] == "pelle" || args[0] == "baguette" || args[0] == "pioche" || args[0] == "faux" || args[0] == "marteau")
        item_type = "armes";
      else if (args[0] == "set")
        item_type = "equipements";

      try {
        browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto('https://www.dofus.com/fr/mmorpg/encyclopedie/'+item_type+'?text='+item_call);
        await page.click('.ak-linker');
        await page.screenshot({ path: './found_this_item.png'}); //debug
        item_name = await page.$eval(".ak-title-container.ak-backlink h1",el => el.textContent);
        item_description = await page.$eval("aside .ak-panel > .ak-panel-content, .ak-light-skin .ak-main-container aside .ak-panel > .ak-panel-content, .ak-nocontentpadding .ak-panel > .ak-panel-content",el => el.textContent);
        item_image = await page.$eval(".ak-encyclo-detail-illu img",el => el.src);
        await browser.close();
      
        const embed = new Discord.MessageEmbed()
        .setColor('#9999ff')
        .setTitle(item_name)
        .setImage(item_image)
        .addField("Type: "+item_type,item_description,true)
        message.channel.send({embed});
      } catch(error) {
        await message.channel.send("Erreur lors de l'exécution de la commande. Vérifiez l'ortographe employée, et que la page correspondante existe bien.\n\".item help\" pour plus d'informations sur cette commande.");
        browser.close();
      }

      // const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json())
      // message.channel.send(file);
      // const query = querystring.stringify({ term: args.join(' ') });
      // const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());
      // message.channel.send(list[0].definition);
    }  
};