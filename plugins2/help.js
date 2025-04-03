const fs = require("fs");
const path = require("path");

const handler = async (msg, { conn }) => {
  const rawID = conn.user?.id || "";
  const subbotID = rawID.split(":")[0] + "@s.whatsapp.net";

  const prefixPath = path.resolve("prefixes.json");
  let prefixes = {};
  if (fs.existsSync(prefixPath)) {
    prefixes = JSON.parse(fs.readFileSync(prefixPath, "utf-8"));
  }
  const usedPrefix = prefixes[subbotID] || ".";
  const userId = msg.key.participant || msg.key.remoteJid;

  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: "📜", key: msg.key }
  });

  const menu = `
╔═⌬AZURA ULTRA SUBBOT⌬═╗
║   Menú por categorías  
╚═─────────────────═╝

〔 AI & Respuestas 〕
⟢ ${usedPrefix}chatgpt
⟢ ${usedPrefix}geminis

〔 Descargas 〕
⟢ ${usedPrefix}play / ${usedPrefix}playdoc
⟢ ${usedPrefix}play2 / ${usedPrefix}play2doc
⟢ ${usedPrefix}ytmp3 / ${usedPrefix}ytmp3doc
⟢ ${usedPrefix}ytmp4 / ${usedPrefix}ytmp4doc
⟢ ${usedPrefix}apk
⟢ ${usedPrefix}instagram / ${usedPrefix}ig
⟢ ${usedPrefix}tiktok / ${usedPrefix}tt
⟢ ${usedPrefix}facebook / ${usedPrefix}fb

〔 Stickers & Multimedia 〕
⟢ ${usedPrefix}s
⟢ ${usedPrefix}ver
⟢ ${usedPrefix}whatmusic
⟢ ${usedPrefix}tts
⟢ ${usedPrefix}perfil

〔 Grupos 〕
⟢ ${usedPrefix}abrirgrupo
⟢ ${usedPrefix}cerrargrupo
⟢ ${usedPrefix}infogrupo
⟢ ${usedPrefix}kick
⟢ ${usedPrefix}tag
⟢ ${usedPrefix}tagall / ${usedPrefix}invocar / ${usedPrefix}todos

〔 Configuración & Dueño 〕

▣ ${usedPrefix}setprefix ↷
  Cambiar prefijo del subbot
▣ ${usedPrefix}creador ↷
  Contacto del creador
▣ ${usedPrefix}get ↷
  Descargar estados
▣ ${usedPrefix}addgrupo ↷
  Autorizar grupo pa que lo usen.
▣ ${usedPrefix}addlista ↷
  Autorizar usuario privado pa lo usen.
▣ ${usedPrefix}dellista ↷
  Quitar usuario autorizado pa que o lo usen.
▣ ${usedPrefix}delgrupo ↷
  Eliminar grupo autorizado pa que no lo usen.
▣ ${usedPrefix}pong ↷
  Medir latencia del bot

═⌬ © Azura Ultra Subbot ⌬═`;

  await conn.sendMessage(msg.key.remoteJid, {
    image: { url: `https://cdn.russellxz.click/ffb38c93.PNG` },
    caption: menu
  }, { quoted: msg });

  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: "✅", key: msg.key }
  });
};

handler.command = ['menu', 'help', 'ayuda', 'comandos'];
module.exports = handler;
