import {Booking} from "./booking.model";

export interface Traveler {
    id: number;
    firstName: string;
    lastName: string;
    bookings?: Booking[];
}