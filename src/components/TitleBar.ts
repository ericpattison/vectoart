import {remote} from "electron";
import { Component, WebComponent } from "../Component";

@Component("title-bar")
export class TitleBar extends WebComponent {
    constructor() {
        super();
        this.clickOn(".windows-control.close", this.close);
        this.clickOn(".windows-control.minimize", this.minimize);
        this.clickOn(".windows-control.maximize", this.maximize);
    }

    public render(): string {
        return `<style>
            * {
                padding: 0;
                margin: 0;
                box-sizing: border-box;
            }
            .title-bar {
                position: absolute;
                top: 0; left: 0;
                height: 30px; right: 0px;
                -webkit-app-region: drag;
                background-color: #333366;
                color: #cccc99;
                user-select: none;
                display: flex;
                align-items: center;
                justify-content: left;
                overflow:visible;
                white-space: normal;
                zoom: 1;
                flex-shrink: 0;
            }
            .title-bar .title {
                flex-basis: auto;
                flex-grow: 0;
                flex-shrink: 1;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: 12px;
                cursor: default;
                margin: 0 auto;
            }
            :host-context(.mac) .title-bar .windows-controls {
                display: none;
            }
            .title-bar .windows-controls {
                position: absolute;
                right: 0;
                -webkit-app-region: no-drag;
            }
            .title-bar .windows-controls .windows-control-bg {
                position: relative;
                display: inline-block;
                -webkit-mask-clip: border-box;
                text-align: center;
                font-size: 13px;
            }
            .title-bar .windows-controls .windows-control{
                color: #fff;
                background-color: #fff;
                width: 40px;
                height: 30px;
            }
            .title-bar .windows-controls .windows-control.minimize {
                -webkit-mask: url("data:image/svg+xml;charset=utf-8,%3Csvg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 4.399V5.5H0V4.399h11z' fill='%23000'/%3E%3C/svg%3E") no-repeat 50% 50%;
            }
            .title-bar .windows-controls .windows-control.unmaximize {
                -webkit-mask: url("data:image/svg+xml;charset=utf-8,%3Csvg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 8.798H8.798V11H0V2.202h2.202V0H11v8.798zm-3.298-5.5h-6.6v6.6h6.6v-6.6zM9.9 1.1H3.298v1.101h5.5v5.5h1.1v-6.6z' fill='%23000'/%3E%3C/svg%3E") no-repeat 50% 50%;
            }
            .title-bar .windows-controls .windows-control.maximize {
                -webkit-mask: url("data:image/svg+xml;charset=utf-8,%3Csvg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 0v11H0V0h11zM9.899 1.101H1.1V9.9h8.8V1.1z' fill='%23000'/%3E%3C/svg%3E") no-repeat 50% 50%;
            }
            .title-bar .windows-controls .windows-control.close {
                -webkit-mask: url("data:image/svg+xml;charset=utf-8,%3Csvg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6.279 5.5L11 10.221l-.779.779L5.5 6.279.779 11 0 10.221 4.721 5.5 0 .779.779 0 5.5 4.721 10.221 0 11 .779 6.279 5.5z' fill='%23000'/%3E%3C/svg%3E") no-repeat 50% 50%;
            }
            .title-bar .windows-controls .windows-control-bg:hover {
                background-color: #66c;
            }
            .title-bar .windows-controls .windows-control-close-bg:hover {
                background-color: red;
            }
        </style>

        <header part="title-bar" class="title-bar">
            <div part="title-bar" class="icon"></div>
            <slot name="menu"></slot>
            <div part="title-bar" class="title">
                <slot name="title"></slot>
            </div>
            <div part="title-bar" class="windows-controls">
                <div part="title-bar" id="btnmin" class="windows-control-bg"><div part="title-bar" class="windows-control minimize"></div></div>
                <div part="title-bar" id="btnmax" class="windows-control-bg"><div part="title-bar" class="windows-control maximize"></div></div>
                <div part="title-bar" id="btnclose" class="windows-control-bg windows-control-close-bg"><div part="title-bar" class="windows-control close"></div>
            </div>
        </header>`;
    }

    private close(el: HTMLElement): void {
        this.window.close();
    }

    private minimize(el: HTMLElement): void {
        this.window.minimize();
    }

    private maximize(el: HTMLElement): void {
        if(this.window.isMaximized()) {
            this.window.unmaximize();
            el.classList.remove("unmaximize");
            el.classList.add("maximize");
        } else {
            this.window.maximize();
            el.classList.remove("maximize");
            el.classList.add("unmaximize");
        }
    }
}
