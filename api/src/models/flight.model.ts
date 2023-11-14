import {Traveler} from "./traveler.model";

export interface Flight {
    id: number;
    travelers: Traveler[];
    date: string;
    checkinStarted: boolean;
    checkinClosed: boolean;
    origin: string;
    destination: string;
}