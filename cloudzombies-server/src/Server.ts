import { DurableObject } from 'cloudflare:workers'
import { Hono } from "hono";
import { websocket } from 'hono/bun';
import { upgradeWebSocket } from 'hono/cloudflare-workers'

interface User {
  id: String
}

interface Zombie {
  id: String
}


interface Item {
  id: String
}

interface Connections {
  id: String,
  name: String,
  websocket: WebSocket
}

interface WorldResponse {
  users: User[]
  zombies: Zombie[]
  items: Item[]
}

export class WorldManager extends DurableObject {
  users: User[] = []
  connections: Connections[] = []
  zombies: Zombie[] = []
  items: Item[] = []
  constructor(ctx: DurableObjectState, env: Cloudflare.Env) {
    super(ctx, env)

    ctx.blockConcurrencyWhile(async () => {
      this.users = (await ctx.storage.get('users')) || []
      this.connections = (await ctx.storage.get('websockets')) || []
      this.zombies = (await ctx.storage.get('zombies')) || []
      this.items = (await ctx.storage.get('items')) || []
    })
  }

  async tick(skipSet: Set<String>) {
    const worldResponse: WorldResponse = {
      users: this.users.filter(user => skipSet.has(user.id)),
      zombies: this.zombies.filter(zombie => skipSet.has(zombie.id)),
      items: this.items.filter(item => skipSet.has(item.id))
    }
    this.connections
      .forEach(connection => {
        connection.websocket.send(
          JSON.stringify(worldResponse)
        )
      })
  }

  async key(ip: String) {
    const text = new TextEncoder().encode(`${this.env.SECRET}-${ip}`)
    const digest = await crypto.subtle.digest(
      { name: "SHA-256", },
      text, 
    )
    const digestArray = new Uint8Array(digest)
    return btoa(String.fromCharCode.apply(null, digestArray.values().toArray()))
  }

}



const app = new Hono<{ Bindings: CloudflareBindings }>();

app.get("/message", (c) => {
  return c.text("Hello Hono!");
});

export default app;
