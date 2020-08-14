import React from "react";
import { WebSocketClient } from "../src/services/websocket"
// @ts-ignore
export const WSContext = React.createContext<WebSocketClient|undefined>(null);