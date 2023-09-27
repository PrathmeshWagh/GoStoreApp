interface IEventData {
    action: string;
    response?: any;
    [key: string]: any;
}

interface IHandlers {
    [action: string]: (data: IEventData) => void;
}

class WebViewMessageHandler {
    private handlers: IHandlers = {};

	constructor() {
		this.init();
	}

    private init() {
        const messageHandler = (event: MessageEvent) => {
            try {
				const eventData: IEventData = JSON.parse(event.data);
				const { action } = eventData;

            if (this.handlers[action]) {
                this.handlers[action](eventData);
            }
            } catch (e) {
				console.error('Failed to parse event data:', e);
            }
        };

        document.addEventListener('message', messageHandler);
        window.addEventListener('message', messageHandler);
    }

    public registerHandler(action: string, callback: (data: IEventData) => void) {
      this.handlers[action] = callback;
    }

    public unregisterHandler(action: string) {
      delete this.handlers[action];
    }

    public async sendMessage(window: Window, data: IEventData): Promise<any> {
		return new Promise((resolve, reject) => {
			try {
				this.registerHandler(data.action, (response) => {
					resolve(response.response);
				});

				window?.ReactNativeWebView?.postMessage(JSON.stringify(data));
			} catch (e) {
				console.error('Failed to send message:', e);
				reject(e);
			}
		});
    }
}

export default new WebViewMessageHandler();
