import { Directive, HostListener, Input, Output } from "@angular/core";
import { EventEmitter } from "events";

@Directive({ selector: "[copy-clipboard]" })
export class CopyClipboardDirective {

    @Input("copy-clipboard")
    public payload: string;

    @Output("copied")
    public copied = new EventEmitter();

    @HostListener("click", ["$event"])
    public onClick(event: MouseEvent): void {
        if (!this.payload)
            return;

        event.preventDefault();

        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        const listener = (e: ClipboardEvent) => {
            const clipboard = e.clipboardData || window["clipboardData"];
            clipboard.setData("text", this.payload.toString());
            e.preventDefault();

            this.copied.emit(this.payload);
        };

        document.addEventListener("copy", listener, false);
        document.execCommand("copy");
        document.removeEventListener("copy", listener, false);
    }
}