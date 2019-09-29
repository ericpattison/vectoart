import {BrowserWindow, remote} from "electron";

type BaseType = new(...args: any[]) => {};

export abstract class WebComponent extends HTMLElement {
    protected template: HTMLTemplateElement;
    protected window: BrowserWindow;

    constructor() {
        super();

        this.window = remote.getCurrentWindow();

        this.template = document.createElement("template");
        this.template.innerHTML = this.render();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    }

    public abstract render(): string;

    public connectedCallback() {
        this.template.innerHTML = this.render();
    }

    public clickOn(selector: string, handler: (el: HTMLElement)=>void): void {
        handler = handler.bind(this);
        const me = this.shadowRoot.querySelector(selector) as HTMLElement;
        me.addEventListener("click", () => handler(me));
    }
}

export const Component = (name: string) => {
    return <T extends WebComponent>(component: T|BaseType) => {
        customElements.define(name, component as BaseType);
    };
};
