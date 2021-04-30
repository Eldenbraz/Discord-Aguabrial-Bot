module.exports = {
    name: 'clear',
    description: 'clear some messages',
    execute(message, args) {
        message.channel.fetchMessage({ args })
            .then(messages => console.log(`Received ${messages.size} messages`))
            .catch(console.error);
        //message.delete(message);
    }
};
                                                                               
        
