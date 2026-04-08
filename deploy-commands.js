const { REST, Routes, SlashCommandBuilder } = require('index.js');

const TOKEN = process.env.TOKEN;
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