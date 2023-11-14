import {Traveler} from "./traveler.model";
import {Flight} from "./flight.model";

export interface Booking {
    id: number;
    code: number;
    flight: Flight;
    traveler: Traveler;
    checkedIn?: boolean;
}