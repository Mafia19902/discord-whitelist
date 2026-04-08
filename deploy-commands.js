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

const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const TOKEN = process.env.TOKEN;
const CLIENT_ID = "1491448051280121938";

const commands = [
    new SlashCommandBuilder().setName('open').setDescription('Whitelist öffnen'),
    new SlashCommandBuilder().setName('close').setDescription('Whitelist schließen'),
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        await rest.put(
            Routes.applicationCommands(CLIENT_ID),
            { body: commands }
        );
        console.log("Commands geladen!");
    } catch (error) {
        console.error(error);
    }
})();