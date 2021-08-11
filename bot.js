console.log('HALLO!');

require('dotenv').config();
require('node-fetch');

const { Player } = require('discord-player');
const Discord = require('discord.js');
const { default: fetch } = require('node-fetch');
const { default: YouTube } = require('youtube-sr');
const client = new Discord.Client();
const player = new Player(client);

client.player = player;

client.login(process.env.botToken);

const prefix = '`';

mtroll = [
    'Miskin Miskin Miskin Miskin',
    'Ee what is wrong with you bro?',
    '?',
    'noobness level infinity',
    '..........................'
]

client.on('ready', () => console.log("Yes sir, I'm online") );

client.on('message', async message => {
    console.log(message.content);
    if(message.content === "who is jarvis"){
        message.reply("I'm a Super fast and super smart version of YOU :)");
    }
    if(message.author.id == process.env.miskin){
        let index = Math.floor(Math.random() * mtroll.length);
        message.reply(mtroll[index]);
        return;
    }
    else if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args1 = message.content.slice(prefix.length);
    const command1 = args1.toLowerCase();
    
    if(command1 === 'show my face'){
        message.reply('Ur a cuite!!');
        message.channel.send(message.author.displayAvatarURL());
    }
    else if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.cleanContent.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();
    const keywords = args.slice().join(" ");

    if(command === 'ping'){
        message.channel.send('Pong!');
    }else if(command === 'gif'){
        // const attachment = new Discord.MessageAttachment('https://media1.giphy.com/media/YnkMcHgNIMW4Yfmjxr/giphy.gif?cid=ecf05e479twnj6la66zi7a6b5t98ihf1pzpsfqvslbr3ibbm&rid=giphy.gif');
        // message.channel.send(attachment);
        //console.log(keywords + "lololol");
        sendGif(keywords).
        then(json => {
            let index = Math.floor(Math.random() * json.results.length);
            message.channel.send(json.results[index].url);
        }).
        catch(err => message.reply("sorry!, couldn't find any gifs"));
        
    }else if(command === 'play'){
        //client.player.setVolume(message,90);
        const yt = await YouTube.search(keywords,{limit : 1});     
        let linkyt = `https://www.youtube.com/watch?v=${yt[0].id}`   
        console.log(linkyt);
         client.player.play(message,linkyt).
         then( () => { 
             console.log('song found');
            message.channel.send('Boom Boom I found off!! Now Playing:- ' + keywords);
    
     })
         .catch((e) => {
             message.channel.send("Couldn't find the song!");});


    }else if (command === 'stop'){
        client.player.stop(message);
    }
});

async function sendGif(tag){
    let url = "https://api.tenor.com/v1/search?q=" + tag + "&key="+ process.env.gifKey +"&limit=" + 8;
    let response = await fetch(url);
    let json = await response.json();
    return json;
}

