module.exports = {
    name: 'rand',
    description: 'Random??',
    execute(message) {
        function doRandHT() {
            var rand = ['win','lose'];
            
            return rand[Math.floor(Math.random()*rand.length)];
        }
        
        let result = doRandHT();
        if (result == 'win') {
            embed = {
                "title": "Bien vu ça "+message.author.username,
                "description": "C'est réussi...",
                "color": 7584788,
            }
        }
        else if (result == 'lose') {
            embed = {
                "title": "Ptdr t ki "+message.author.username,
                "description": "C'est foiré...",
                "color": 7584788,
            };
        }
        message.channel.send({ embed });
    },
};