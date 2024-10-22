export * as DC from "npm:discord-api-types@^0.37.67/v10";
export { verifyKey } from "npm:discord-interactions@^3.4.0";

import { monotonicFactory } from "https://deno.land/x/ulid/mod.ts";
export const ulid = monotonicFactory();
// globals
import { load } from "https://deno.land/std@0.213.0/dotenv/mod.ts";
await load({ export: true });
// the assertions are to prevent deployment failure
const BOT_KEY = Deno.env.get("DISCORD_PUBLIC_KEY")!;
const BOT_TOKEN = Deno.env.get("DISCORD_BOT_TOKEN")!;
const APPLICATION_ID = Deno.env.get("DISCORD_APPLICATION_ID")!;
if (!BOT_KEY || !BOT_TOKEN || !APPLICATION_ID)
  console.warn("Missing environment variables");
export const globals = {
  BOT_KEY,
  BOT_TOKEN,
  APPLICATION_ID,
};

export const members = {
  kaho: {
    name: "日野下 花帆",
    avatar: "https://www.lovelive-anime.jp/hasunosora/shared/img/member/01_thumb.png",
  },
  sayaka: {
    name: "村野 さやか",
    avatar: "https://www.lovelive-anime.jp/hasunosora/shared/img/member/02_thumb.png",
  },
  kozue: {
    name: "乙宗 梢",
    avatar: "https://www.lovelive-anime.jp/hasunosora/shared/img/member/03_thumb.png",
  },
  tsuzuri: {
    name: "夕霧 綴理",
    avatar: "https://www.lovelive-anime.jp/hasunosora/shared/img/member/04_thumb.png",
  },
  rurino: {
    name: "大沢 瑠璃乃",
    avatar: "https://www.lovelive-anime.jp/hasunosora/shared/img/member/05_thumb.png",
  },
  megumi: {
    name: "藤島 慈",
    avatar: "https://www.lovelive-anime.jp/hasunosora/shared/img/member/06_thumb.png",
  },
  ginko: {
    name: "百生 吟子",
    avatar: "https://www.lovelive-anime.jp/hasunosora/shared/img/member/07_thumb.png",
  },
  kosuzu: {
    name: "徒町 小鈴",
    avatar: "https://www.lovelive-anime.jp/hasunosora/shared/img/member/08_thumb.png",
  },
  hime: {
    name: "安養寺 姫芽",
    avatar: "https://www.lovelive-anime.jp/hasunosora/shared/img/member/09_thumb.png",
  },
};

export function isMember(member: string): member is keyof typeof members {
  return Object.keys(members).includes(member);
}
