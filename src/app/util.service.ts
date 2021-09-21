import { Injectable } from "@angular/core";
import { DateTime } from "luxon";

@Injectable({
    providedIn: "root"
})
export class UtilService {

    constructor() { }

    public formatTime(ms: number, relative: boolean, format = DateTime.TIME_SIMPLE): string {
        if (relative) {
            return DateTime.fromMillis(ms).toRelative() as string;
        }
        return DateTime.fromMillis(ms).toLocaleString(format);
    }

    // Keys, Value example:  KeyValue<"Players" | "EventsLeft" | "OpenedTime" | "UpdatedTime", RealmOrder>
    public sortOriginal(a, b): number {
        return 0;
    }
}