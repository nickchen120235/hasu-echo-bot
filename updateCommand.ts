import { commands } from "./commands.ts";
import { Routes } from "npm:discord-api-types@^0.37.67/v10";
import { REST } from "npm:@discordjs/rest@^2.2.0";
import { load } from "https://deno.land/std@0.213.0/dotenv/mod.ts";

await load({ export: true });
const BOT_TOKEN = Deno.env.get("DISCORD_BOT_TOKEN");
const APPLICATION_ID = Deno.env.get("DISCORD_APPLICATION_ID");
const GUILD_ID = Deno.env.get("DISCORD_GUILD_ID");
if (!BOT_TOKEN || !APPLICATION_ID || !GUILD_ID)
  throw new Error("Missing env variables");

console.log("Updating slash commands...");
const rest = new REST({ version: "10" }).setToken(BOT_TOKEN);
const res = await rest.put(Routes.applicationCommands(APPLICATION_ID), { body: commands });
console.log(`Registed ${(res as unknown[]).length} commands`);
