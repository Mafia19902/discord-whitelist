const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const TOKEN = "DEIN_BOT_TOKEN";
const CLIENT_ID = "DEINE_CLIENT_ID";

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