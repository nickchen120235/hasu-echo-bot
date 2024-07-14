import { REST } from "npm:@discordjs/rest@^2.2.0";
import { globals, DC, members, isMember } from "./core.ts";

const { BOT_TOKEN, APPLICATION_ID } = globals;
const rest = new REST({ version: "10" }).setToken(BOT_TOKEN);
const kv = await Deno.openKv(Deno.env.get("KV"));

class DiscordError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DiscordError";
  }
}

kv.listenQueue(async (token: string) => {
  await rest.delete(DC.Routes.webhookMessage(APPLICATION_ID, token));
})

export async function sendMessageAs(interactionToken: string, channel: string, member: keyof typeof members, content: string): Promise<void> {
  if (!isMember(member)) throw new DiscordError("Invalid member");
  const { name, avatar } = members[member];
  // create webhook
  const { id, token } = await rest.post(DC.Routes.channelWebhooks(channel), {
    body: { name: "蓮ノ空bot" }
  }) as DC.RESTPostAPIChannelWebhookResult;
  if (!id || !token) throw new DiscordError("Failed to create webhook");
  // send message using webhook
  await fetch(`https://discord.com/api/webhooks/${id}/${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content,
      username: name,
      avatar_url: avatar,
    }),
  });
  // delete webhook
  await rest.delete(DC.Routes.webhook(id, token));
  // delete replied message after 3 seconds
  await kv.enqueue(interactionToken);
}
