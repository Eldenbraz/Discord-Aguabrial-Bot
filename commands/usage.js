module.exports = {
    name: 'usage',
    description: 'how to use the damn bot',
    execute(message, args) {
        message.channel.send('Usage du bot: préfixe "?" puis arguments. Un argument ne peux pas être composé de plusieurs mots. Pour plus d`informations, mp Furie-Eclair.');
    },
};
