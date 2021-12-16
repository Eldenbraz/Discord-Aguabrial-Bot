module.exports = {
    name: 'drifter',
    description: 'ouient',
    execute(message) {
        function doRandHT() {
            message.channel.send("Alors, alors, alors... voyons ce qui nous attends!")
            var rand = ['cabal','vex','fallen','scorn','hive','cabal','vex','fallen','scorn','hive','cabal','vex','fallen','scorn','hive','cabal','vex','fallen','scorn','hive','ding'];
            
            return rand[Math.floor(Math.random()*rand.length)];
        }
        
        let result = doRandHT();
        if (result == 'cabal') {
            embed = {
                "title": "Cabals",
                "description": "DES CABALS SUR LE TERRAIN !!",
                "color": 7584788,
            };
        }
        else if (result == 'vex') {
            embed = {
                "title": "Vex",
                "description": "DES VEX SUR LE TERRAIN !!",
                "color": 7584788,
            };
        }
        else if (result == 'fallen') {
            embed = {
                "title": "Fallen",
                "description": "DES DECHUS A L'HORIZON !!",
                "color": 7584788,
            };
        }
        else if (result == 'scorn') {
            embed = {
                "title": "Scorn",
                "description": "DES INFÂMES EN APPROCHE !!",
                "color": 7584788,
            };
        }
        else if (result == 'hive') {
            embed = {
                "title": "Hive",
                "description": "LA RUCHE! APPORTEZ UNE EPEE !!",
                "color": 7584788,
            };
        }
        else if (result == 'ding') {
            embed = {
                "title": "Ding!",
                "description": "Ding, Ding, Ding, DingDingDingDingDing!\n(Wow, that's rare)",
                "color": 7584788,
            };
        }
        message.channel.send({ embed });
        // message.delete();
    },
};