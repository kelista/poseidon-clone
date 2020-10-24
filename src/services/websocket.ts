import { v4 } from "uuid";

export type ListenerCallback<T = any> = (data: T) => Promise<void>;

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
    this.connected = false;
  }

  connect(connected: () => void, close: () => void) {
    this.wsc = new WebSocket(this.url);
    this.wsc.onopen = e => {
      console.log(e);
      this.connected = true;
      connected();
    };
    this.wsc.onclose = (e) => {
      console.log(e);
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

  disconnect() {
    this.wsc.close()
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