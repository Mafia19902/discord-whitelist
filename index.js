const express = require('express');
const app = express();
const port = process.env.PORT || 10000;

// Einfacher Healthcheck, damit Render den Port erkennt
app.get('/', (req, res) => {
    res.send('Bot läuft! ✅');
});

app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});

const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

// ⚙️ ANPASSEN
const TOKEN = process.env.TOKEN;


client.once('ready', () => {
    console.log(`Bot online als ${client.user.tag}`);
});

// COMMANDS
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    // 🔓 OPEN
    if (interaction.commandName === 'open') {
        const embed = new EmbedBuilder()
            .setColor("#00ff88")
            .setTitle("🔓 Whitelist geöffnet")
            .setDescription(
                `Die Whitelist ist jetzt **offen!**\n\n` +
                `🕒 Öffnungszeiten: täglich 18–21 Uhr`
            )
            .setImage("https://i.imgur.com/yourimage.gif") // optional GIF
            .setFooter({ text: "HIGHLIFE Whitelist" });

        await interaction.reply({ embeds: [embed] });
    }

    // 🔒 CLOSE
    if (interaction.commandName === 'close') {
        const now = new Date().toLocaleString("de-DE");

        const embed = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("🔒 Whitelist geschlossen")
            .setDescription(
                `Die Whitelist ist jetzt geschlossen!\n\n` +
                `**Nächste Öffnung:** täglich 18–21 Uhr\n\n` +
                `Geschlossen um: ${now}`
            )
            .setImage("https://i.imgur.com/yourimage.gif")
            .setFooter({ text: "HIGHLIFE Whitelist" });

        await interaction.reply({ embeds: [embed] });
    }
});

client.login(TOKEN);


const { REST, Routes, SlashCommandBuilder } = require('index.js');

const CLIENT_ID = "1491448051280121938";
const GUILD_ID = "1463988119878766594"; // dein Server

// Commands definieren
const commands = [
    new SlashCommandBuilder().setName('open').setDescription('Whitelist öffnen'),
    new SlashCommandBuilder().setName('close').setDescription('Whitelist schließen')
].map(cmd => cmd.toJSON()); // <- wichtig!

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        console.log('Slash-Commands werden registriert...');
        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands }
        );
        console.log('Commands erfolgreich registriert ✅');
    } catch (err) {
        console.error(err);
    }
})();