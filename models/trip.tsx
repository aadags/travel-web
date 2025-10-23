import Passenger from "./passenger";

export default class Trip {

    id?: number
    summary?: string
    departure_date?: string
    reference?: string
    airline_booking_code?: string
    latitude?: string
    longitude?: string
    flight_data?: string
    iata_code?: string
    address?: string
    city?: string
    country?: string
    postalcode?: string
    passengers?: Array<Passenger>
}
