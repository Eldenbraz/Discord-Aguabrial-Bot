module.exports = {
    name: 'help',
    description: 'Get some help',
    execute(message, args) {
        message.channel.send(`Liste des commandes actuelles: \`\`\`json\n.item [Nom_de_l_objet]\n\t"Displays an item's informations" (COMMANDE DESACTIVEE MOMENTANEMENT)\n\n.mob [Nom_du_monstre]\n\t"Displays a monster's informations" (COMMANDE DESACTIVEE MOMENTANEMENT)\n\n.abs [Nom_du_monstre]\n\t"Displays a monster's abilities"\n\n.stats [Nom_du_monstre]\n\t"Displays a monster's stats"\n\n.dreams [Nom_du_monstre] [Niveau]\n\t"Displays a monster's stats & abilities, based on given level"\`\`\`'[Commande] help' pour plus d'informations sur celle-ci.`);
    },
};
