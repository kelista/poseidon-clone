import { v4 } from "uuid";

const url = 'ws://35.220.179.54:3021/events?token=asd'

export type ListenerCallback = <T = any>(data: T) => void;

export type WebSocketConnectCallback = () => void;

export interface WebSocketListener {
  id: string,
  eventName: string,
  callback: ListenerCallback,
}

export class WebSocketClient {
  private wsc: WebSocket;
  private connected: boolean;
  private listeners: Map<string, WebSocketListener>;

  constructor(public readonly url: string) {
    this.listeners = new Map();
    this.wsc = new WebSocket(url);
    this.connected = false;
  }

  connect(connected: () => void, close: () => void) {
    this.wsc = new WebSocket(url);
    this.wsc.onopen = e => {
      this.connected = true;
      connected();
    };
    this.wsc.onclose = () => {
      this.connected = false;
      close();
    };
    this.wsc.onmessage = (e: WebSocketMessageEvent) => {
      try {
        const message = JSON.parse(e.data);
        const event = message.event;
        const data = message.data;
        this.listeners.forEach(v => {
          if (v.eventName === event) {
            v.callback(data);
          }
        });
      } catch (err) {
        // ignore
      }
    }
  }

  isConnected() {
    return this.connected;
  }

  addListener(eventName: string, callback: ListenerCallback) {
    const randomId = v4();
    const wsListener: WebSocketListener = {
      id: randomId,
      eventName,
      callback,
    }
    this.listeners.set(randomId, wsListener);
    return randomId;
  }

  removeListener(id: string) {
    this.listeners.delete(id);
  }

  sendMessage(eventName: string, data?: any) {
    this.wsc.send(JSON.stringify({ event: eventName, data }));
  }
}

// const client = new WebSocketClient("ws://35.220.179.54:3021/events?token=asd");

// client.connect(
//   () => {
//     console.log("connected boi");
//   },
//   () => {
//     console.log("remove dari client");
//   }
// );

// // Taro di useEffect()
// const echoId = client.addListener("echo", async (data) => {
//   console.log("ini echo ", data);
// });

// const lobbyListenerId = client.addListener("lobby/rooms", async (data) => {
//   client.sendMessage("thanks", { message: "terimakasih udah kasih lobby/rooms" });
//   console.log("ini rooms", data);
// });

// // contoh remove listener di useEffect clean()
// client.removeListener(echoId);
// client.removeListener(lobbyListenerId);