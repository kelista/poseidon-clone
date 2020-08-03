import { ActionSheetIOS } from "react-native"
import { v4 } from "uuid";

const url = 'ws://35.220.179.54:3021/events?token=asd'

// export const initWebsocket = async () => {
//   const ws = new WebSocket(url)
//   return ws
// }

// export const sendData = async () => {
//   ws.send(JSON.stringify({ event: "echo", data: { name: "hello" } }))
// }

export type ListenerCallback = <T = any>(connection: WebSocket, data:T) => void;

export interface WebSocketListener {
  id: string,
  eventName: string,
  callback: ListenerCallback,
}

export class WebSocketClient {
  private wsc : WebSocket;
  private connected: boolean;
  private listeners: Map<string, WebSocketListener>;

  constructor(public readonly url: string) {
    this.listeners = new Map();
    this.wsc = new WebSocket(url);
    this.connected = false;
  }

  connect(callback: any ) {
    this.wsc = new WebSocket(url);
    this.wsc.onopen = e => {
      this.connected = true;
    };
    this.wsc.onclose = () => {
      this.connected = false;
    };

    this.wsc.onmessage = (e: WebSocketMessageEvent) => {
      try {
        const message = JSON.parse(e.data);
        const event = message.event;
        const data = message.data;

        const listeners = Array.from()
      } catch (err) {
        
      }
    }
  }

  addListener(eventName: string, callback: ListenerCallback) {
    const randomId = v4();
    const wsListener: WebSocketListener = {
      id: randomId,
      eventName,
      callback,
    }
    this.listeners.set(randomId,wsListener );
    return randomId;
  }

  removeListener(id: string) {
    this.listeners.delete(id);
  }

  sendMessage(eventName: string, data?: any){
    this.wsc.send(JSON.stringify({event:eventName, data}));
  }
}