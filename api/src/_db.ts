import {Traveler} from "./models/traveler.model";
import {Booking} from "./models/booking.model";
import {Flight} from "./models/flight.model";

const travelers: Traveler[] = [
    {id: 1, firstName: 'diaa', lastName: 'hammad'},
    {id: 2, firstName: 'yoshi', lastName: 'toushi'},
    {id: 3, firstName: 'Demi', lastName: 'Rutger'}
]

const flights: Flight[] = [
    {id: 1, travelers: [travelers[0]], date: '26-12-2023', checkinStarted: false, checkinClosed: false, origin: 'Amsterdam',
        destination: 'Cairo',},
    {id: 2, travelers: [travelers[1]], date: '30-12-2023', checkinStarted: true, checkinClosed: false, origin: 'Chennai',
        destination: 'New York'},
    {id: 3, travelers: [travelers[2]], date: '14-11-2023', checkinStarted: true, checkinClosed: true, origin: 'London',
        destination: 'Paris'}
]

const bookings: Booking[] = [
    {
        id: 1,
        traveler: travelers[0],
        code: 123,
        flight: flights[0]
    },
    {
        id: 2,
        traveler: travelers[1],
        code: 456,
        flight: flights[1]
    },
    {
        id: 2,
        traveler: travelers[2],
        code: 789,
        flight: flights[2],
        checkedIn: true,
    }
]

export default {bookings, travelers, flights}