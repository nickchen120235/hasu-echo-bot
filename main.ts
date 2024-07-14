import { verifyKey, globals, DC, isMember } from "./core.ts";
import { sendMessageAs } from "./discord.ts";

function verifyRequest(body: string, signature: string, timestamp: string): boolean {
  const { BOT_KEY } = globals;
  return verifyKey(body, signature, timestamp, BOT_KEY);
}

function createResponse(status: number, content: object): Response {
  return new Response(JSON.stringify(content), {
    status,
    headers: {
      "Content-Type": "application/json"
    }
  });
}

Deno.serve(async (req) => {
  const body = await req.text();
  const signature = req.headers.get("X-Signature-Ed25519");
  const timestamp = req.headers.get("X-Signature-Timestamp");
  if (!signature || !timestamp || !verifyRequest(body, signature, timestamp))
    return createResponse(401, { error: "Invalid request" });
  const interaction = JSON.parse(body) as DC.APIInteraction;
  switch (interaction.type) {
    case DC.InteractionType.Ping: {
      return createResponse(200, { type: DC.InteractionResponseType.Pong });
    }
    case DC.InteractionType.ApplicationCommand: {
      const { data } = interaction as DC.APIApplicationCommandInteraction;
      console.log(JSON.stringify(data, undefined, 2));
      const { name, options } = data as DC.APIChatInputApplicationCommandInteractionData;
      const content = (options![0] as DC.APIApplicationCommandInteractionDataBasicOption).value as string;
      if (!isMember(name))
        return createResponse(400, { error: "Invalid command" });
      else {
        await sendMessageAs(interaction.token, interaction.channel.id, name, content);
        return createResponse(200, {
          type: DC.InteractionResponseType.ChannelMessageWithSource,
          data: {
            content: "OK",
            flags: DC.MessageFlags.Ephemeral,
          }
        });
      }
    }
    default: {
      return createResponse(400, { error: "Invalid request" });
    }
  }
})