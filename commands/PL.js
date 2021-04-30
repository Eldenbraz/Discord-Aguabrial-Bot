module.exports = {
    name: 'pl',
    description: 'For PL advertissements',
    execute(message, args) {
        message.channel.send(`Salut tout le monde! ${message.author} lâche son meilleur PL à ${args[0]} pour seulement ${args[1]}.`);
    },
};
