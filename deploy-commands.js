const express = require('express');
const { Client, GatewayIntentBits, EmbedBuilder, REST, Routes, SlashCommandBuilder } = require('discord.js');

const app = express();
const port = process.env.PORT || 10000;

const TOKEN = process.env.TOKEN;
const CLIENT_ID = "1491448051280121938";
const GUILD_ID = "1463988119878766594"; // <- Hier deine Server-ID eintragen

// ✅ Express-Server für Render Healthcheck
app.get('/', (req, res) => {
    res.send('Bot läuft! ✅');
});
app.listen(port, () => console.log(`Server läuft auf Port ${port}`));

// 🔹 Slash-Commands definieren
const commands = [
    new SlashCommandBuilder().setName('open').setDescription('Whitelist öffnen'),
    new SlashCommandBuilder().setName('close').setDescription('Whitelist schließen'),
];

// 🔹 Slash-Commands beim Server registrieren (Guild-Commands = sofort verfügbar)
const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        console.log('Slash-Commands werden registriert...');
        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands }
        );
        console.log("Commands geladen und registriert ✅");
    } catch (error) {
        console.error(error);
    }
})();

// 🔹 Discord-Client initialisieren
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
    console.log(`Bot online als ${client.user.tag}`);
});

// 🔹 Interaktionen abfangen
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'open') {
        const embed = new EmbedBuilder()
            .setColor("#00ff88")
            .setTitle("🔓 Whitelist geöffnet")
            .setDescription("Die Whitelist ist jetzt **offen!**\n\n🕒 Öffnungszeiten: täglich 18–21 Uhr")
            .setFooter({ text: "HIGHLIFE Whitelist" });
        await interaction.reply({ embeds: [embed] });
    }

    if (interaction.commandName === 'close') {
        const now = new Date().toLocaleString("de-DE");
        const embed = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("🔒 Whitelist geschlossen")
            .setDescription(`Die Whitelist ist jetzt geschlossen!\n\n**Nächste Öffnung:** täglich 18–21 Uhr\n\nGeschlossen um: ${now}`)
            .setFooter({ text: "HIGHLIFE Whitelist" });
        await interaction.reply({ embeds: [embed] });
    }
});

// 🔹 Bot einloggen
client.login(TOKEN);