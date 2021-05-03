module.exports = {
    name: 'help',
    description: 'Get some help',
    execute(message, args) {
        message.channel.send(`Liste des commandes actuelles: \`\`\`json\n.item\n\t"Displays an item's informations" (COMMANDE DESACTIVEE MOMENTANEMENT)\n.mob\n\t"Displays a monster's informations" (COMMANDE DESACTIVEE MOMENTANEMENT)\n.abs [Nom_du_monstre]\n\t"Displays a monster's stats & abilities"\n.dreams [Nom_du_monstre] [Niveau]\n\t"Displays a monster's stats & abilities, based on a level"\`\`\`'[Commande] help' pour plus d'informations sur celle-ci.`);
    },
};
