module.exports = {
    name: 'help',
    description: 'Get some help',
    execute(message, args) {
        //message.channel.send(`Liste des commandes actuelles: \`\`\`json\n.item [Nom_de_l_objet]\n\t"Displays an item's informations" (COMMANDE DESACTIVEE MOMENTANEMENT)\n\n.mob [Nom_du_monstre]\n\t"Displays a monster's informations" (COMMANDE DESACTIVEE MOMENTANEMENT)\n\n.abs [Nom_du_monstre]\n\t"Displays a monster's abilities"\n\n.stats [Nom_du_monstre]\n\t"Displays a monster's stats"\n\n.dreams [Nom_du_monstre] [Niveau]\n\t"Displays a monster's stats & abilities, based on given level"\`\`\`'[Commande] help' pour plus d'informations sur celle-ci.`);
        message.channel.send(`Liste des commandes actuelles: \`\`\`json\n?activity\n\t"Create an activity subscription embed." \n\n?drifter\n\t"Let's bank some motes, brother!" \n\n?d2\n\t"Calls upon Destiny 2 API to look for an item."\n\n?weeklyprogress\n\t"Checks for your character's weekly progression regarding Pinacles."\n\n'[Commande] help' pour plus d'informations sur celle-ci.\`\`\``)
        message.channel.send(`\`\`\`json\nLatest release:\n\tAdded 'help' to ?d2 and ?weeklyprogress.\nFixed precise items crash in ?d2 command.\nAdded character chosing in ?weeklyprogress.\`\`\``)
    },
};
