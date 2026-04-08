const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const TOKEN = "MTQ5MTQ0ODA1MTI4MDEyMTkzOA.GMabA4.jkwQ_ZPzi0g2ebh2EiLcXesa0uK9Z8M3TQY2U8";
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