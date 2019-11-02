const Discord = require('discord.js');
const dice = require('./dice');

class Client {
    constructor() {
        this.token;
        this.client = new Discord.Client();
    }

    start(token=null) {
        if (token) {
            this.token = token;
        } 
        else if (!this.token) {
            throw new Error("Token not defined");
        }

        this.load_event_handlers();
        this.client.login(this.token);
        this.running = true;
    }

    stop() {
        if (this.running) {
            this.running = false;
            this.client.destroy();
        }
    }

    destroy() {
        this.client.destroy();
        this.running = false;
    }

    load_event_handlers(){
        this.client.on('ready', () => {
            console.log('Initializaion Complete.')
        });

        this.client.on('message', (message) => {
            if (message.content == "!Ping") {
                message.channel.send('Pong!');
            }
            else if (message.content == '!terminate') {
                this.stop();
            }
        });

        this.client.on('message', (message) => {
            if (dice.DICE_REGEX.test(message.content.slice(1))) {
                message.channel.send(dice.roll(message.content.slice(1)).total);
            }
        })
    }
}

const client = new Client();
client.start(require('./bot-token.json').token);