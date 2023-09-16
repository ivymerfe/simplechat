import TokenService from "./token";

export type WsMessage = {
    from_user: string,
    date: Date,
    text: string,
}

export default class ChatWebSocket {
    socket: WebSocket;
    messageHandlers: ((message: WsMessage) => void)[];
    closed: boolean;
    closeCode: number;

    constructor() {
        if (!TokenService.getRefreshToken()) {
            throw new Error('No user token');
        }
        this.socket = new WebSocket(`ws:localhost:8000/api/v1/chat/connect/?token=${TokenService.getRefreshToken()}`);
        this.socket.addEventListener("open", () => console.log("Websocket was opened."));
        this.socket.addEventListener("message", this.onMessage.bind(this));
        this.socket.addEventListener("error", (event: Event) => console.error("Websocket error", event));
        this.socket.addEventListener("close", this.onClose.bind(this));
        this.closed = false;
        this.closeCode = 0;
        this.messageHandlers = [];
    }

    addMessageHandler(handler: ((message: WsMessage) => void)) {
        this.messageHandlers.push(handler);
    }

    removeMessageHandler(handler: ((message: WsMessage) => void)) {
        if (this.messageHandlers.includes(handler)) {
            this.messageHandlers.splice(this.messageHandlers.indexOf(handler), 1);
        }
    }

    fireMessage(message: WsMessage) {
        for (const handler of this.messageHandlers) {
            handler(message);
        }
    }

    onMessage(event: MessageEvent) {
        const msg = JSON.parse(event.data);
        if (msg.error) {
            console.error(`Websocket error: ${msg.error}`);
        } else if (msg.type === "message") {
            this.fireMessage({
                from_user: msg.from_user,
                date: new Date(msg.date),
                text: msg.text
            });
        }
    }

    sendMessage(to_user: string, text: string) {
        this.socket.send(JSON.stringify({ to_user, text }));
    }

    onClose(event: CloseEvent) {
        this.closeCode = event.code;
        this.closed = true;
        console.log(`Websocket was closed with code: ${event.code}`);
    }
}
