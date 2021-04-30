module.exports = {
    name: 'help',
    description: 'Get some help',
    execute(message, args) {
        message.channel.send(`Liste des commandes actuelles: \`\`\`json\n.item\n\t"Displays an item's informations"\n.mob\n\t"Displays a monster's informations"\n.abs\n\t"Displays a monster's stats & abilities"\`\`\`'[Commande] help' pour plus d'informations sur celle-ci.`);
    },
};
