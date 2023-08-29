export class Event {
	constructor() {
		this.handlers = [];
		this.trigger = (data) => {
			// @ts-ignore
			this.handlers.slice(0).forEach((h) => h(data));
		};
	}

	on(handler) {
		this.handlers.push(handler);
	}

	off(handler) {
		this.handlers = this.handlers.filter((h) => h !== handler);
	}

	reset() {
		this.handlers.length = 0;
	}
}
