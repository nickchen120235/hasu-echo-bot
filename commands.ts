import {
  RESTPostAPIApplicationCommandsJSONBody,
  ApplicationCommandOptionType,
} from "npm:discord-api-types@^0.37.67/v10";
import { members } from "./core.ts";

function createCommand(name: string, description: string): RESTPostAPIApplicationCommandsJSONBody {
  return {
    name, description, options: [{
      name: "message", description: "想說的話",
      type: ApplicationCommandOptionType.String,
      required: true,
    }],
  }
}

export const commands = Array.from(
  Object.keys(members) as (keyof typeof members)[],
  (name) => createCommand(name, `用「${members[name].name}」說說話`)
);
