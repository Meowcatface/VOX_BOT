const Discord = require("discord.js");
const client = new Discord.Client();
var cleverbot = require("cleverbot.io"),
bot = new cleverbot("rFTeQco0SCEKaFbd", "0We2F05M5eJqsjLSxgiLqF7T1zgGHDMY");

var dispatcher = null
var voice = null
var prefix = "!"

bot.setNick("Session1");

bot.create(function (err, session) {
  // session is your session name, it will either be as you set it previously, or cleverbot.io will generate one for you

  // Woo, you initialized cleverbot.io.  Insert further code here
});

client.on("message", function(message) {
    //const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
    var mess = message.content.toLowerCase()
    if(message.author.equals(client.user))
    {
        return;
    }
    if(mess.startsWith("gmcsays"))
    {
        if(!message.member.voiceChannel)
        {
            message.channel.sendMessage("ERROR: 404")
        }else{
            msg = mess.split(' ')
            playSentence(message)
        }
    }
    if(message.content == "freetv")
    {
        message.channel.sendMessage("GIVE US OUR FREE TVs!")
    }
    else if(message.content == "!leak" || message.content == "!beta")
    {
        message.channel.sendMessage("You can download the leak from here. https://hl2-beta.ru/index.php?action=downloads;sa=view;down=15")
    }
    else if(message.content == "!leaknet")
    {
        message.channel.sendMessage("You can download the LeakNet patch from here. http://leaknet.tk/")
    }
    else if(message.content == "!gmhelp")
    {
        message.author.sendMessage("Commands: leaknet, leak/beta.")
    }
	else if(command == "talk")
	{
		bot.ask("'"+args+"'", function (err, response) {
          message.channel.sendMessage(response)
          console.log(response)
		});
	}
})

function playSentence(message)
{
    voice = message.member.voiceChannel
    voice.join().then(function(connection){
        dispatcher = connection.playFile("voices/gasman/"+msg.shift()+".wav")
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

client.login(process.env.BOT_TOKEN);
