const Discord = require("discord.js");
const client = new Discord.Client();

const prefix = "vox"

var msg = []
var dispatcher = null
var voice = null

client.on("message", function(message) {
    var mess = message.content.toLowerCase()
    if(mess.startsWith(prefix))
    {
        if(!message.member.voiceChannel)
        {
            message.channel.sendMessage("NO! I'm not joinning it without you being in it!!!!11!!11!1!!1!111!1")
        }else{
            msg = mess.split(' ')
            playSentence(message)
        }
    }
})

function playSentence(message)
{
    voice = message.member.voiceChannel
    voice.join().then(function(connection){
        dispatcher = connection.playFile("voices/hgrunt/"+msg.shift()+".wav")
        console.log("Going through words.")
        dispatcher.on('end', function() {
            if(msg[0])
            {
                playSentence(message)
            }else{
                connection.disconnect()
            }
        })
    })
}

client.on("ready", function(message) {
    console.log("Ready!");
})

client.login("MzcxNTA4MDMyMTI0NzQ3Nzc4.DM7h_Q.LAapmQ-L1lAzu6Isd67XYedgOBw")