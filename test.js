const { curly } = require('node-libcurl')
const fetch = require('node-fetch');


async function test() {
    // const { data } = await curly.get('https://dofensive.com/api/monsterPreview.php?Language=fr');
    fetch('https://dofensive.com/api/monsterPreview.php?Language=fr')
        .then(res => res.json())
        .then(json => console.log(json));

    // var test = await data.find(x => x.Name == "Bouftou");
    // console.log(test);
    // console.log(`https://dofensive.com/api/monster.php?Id=${test.Id}&Language=fr`);
    // console.log(test.Id);
    // const pourkoi = await curly.get(`https://dofensive.com/api/monster.php?Id=${test.Id}&Language=fr`);

    // console.log(pourkoi.data)
    // console.log(pourkoi.data.Dungeons[0].Name)
}

test();