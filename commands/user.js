module.exports = {
    name: 'user',
    description: 'Print an user informations',
    execute(message, args) {
        message.channel.send(message.author.username);
        message.channel.send(message.author.avatarURL);
    },
};
