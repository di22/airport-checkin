import db from './_db';
import {Booking} from "./models/booking.model";
import {Traveler} from "./models/traveler.model";
import {Flight} from "./models/flight.model";
import {I18nService} from "./core/services/i18.service";
import {FormatErrorService} from "./core/services/format-error.service";
import {ResponseCodes} from "./core/response-codes";

export const resolvers = {
    Query: {
        bookings(): Booking[] {
            return db.bookings;
        },
        travelers(): Traveler[] {
            return db.travelers;
        },
        flights(): Flight[] {
            return db.flights;
        },
        booking(_: any, args: Partial<Booking>): Booking {
            return <Booking>db.bookings.find((b) => b.code === args.code && !b.checkedIn);
        },
        labels: (_: any, __: any, req: any) => {
            return I18nService.getLabels(req)
        },

        checkin: (_: any, args: {code: number, lastname: string, date: string}, req: any) => {
            const errors = FormatErrorService.formatError(req);

            const booking = db.bookings.find(b => b.code === args.code);
            if (!booking) return errors[9001]();

            const traveler = db.travelers.find(t => t.lastName === args.lastname);
            if (!traveler) return errors[9002]();

            const bookingDate = new Date(args.date).setHours(0,0,0,0);
            const currentDate = new Date().setHours(0,0,0,0);

            const dateEarlier = bookingDate > currentDate;
            if (dateEarlier) return errors[9003]();

            const dateLate = bookingDate < currentDate;
            if (dateLate) return errors[9004]();

            return {
                status: 200,
                message: I18nService.translate(req, ResponseCodes['200'])
            }
        }
    },
    Booking: {
        traveler(booking: Booking): Traveler {
            return <Traveler>db.travelers.find(t => booking.traveler.id === t.id);
        }
    },
    Flight: {
        travelers(flight: Flight): Traveler[] {
            if (!flight.travelers?.length) return [];

            const travelersIds = flight.travelers?.map(t => t.id);
            return db.travelers.filter(t => travelersIds.includes(t.id));
        }
    }
}
