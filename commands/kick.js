module.exports = {
    name: 'kick',
    description: 'get kicked dummy',
    execute(message, args) {
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.member(user);
            if (member) {
                member.kick('Ce membre a été réduit en cendres.').then(() => {
                    message.reply(` &{args[0]} a fini roti.`);
                }).catch(err => {
                    message.reply('Ce membre ne peut être expulsé.');
                    console.error(err);
                });
            } else {
                message.reply('Cet utilisateur n\'existe pas ._.');
            }
        } else {
            message.reply('Vous n\'avez pas mentionné la cible à éliminer...');
        }
    }
};
