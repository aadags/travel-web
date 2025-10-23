import moment from 'moment';

export function sortFastest(flights: any) {

    for(let i : number =0; i<flights.length; i++)
    {
        let flightDuration = moment.duration('PT0S')
        flights[i].itineraries.map((itinerary: any) => (
            flightDuration.add(moment.duration(itinerary.duration))
        ))

        flights[i].totalDuration = flightDuration.asMinutes()
    }

    flights.sort((a: any, b: any) => {
        return a.totalDuration - b.totalDuration;
    });

    return flights

}

export function sortCheapest(flights: any) {

    flights.sort((a: any, b: any) => {
        return a.price.total - b.price.total;
    });

    return flights

}

export function sortEarliest(flights: any) {

    for(let i : number =0; i<flights.length; i++)
    {
        let flightTime = moment(flights[i].itineraries[0].segments[0].departure.at).unix()
        flights[i].flightTime = flightTime
    }

    flights.sort((a: any, b: any) => {
        return a.flightTime - b.flightTime;
    });

    return flights

}

export function sortLatest(flights: any) {

    for(let i : number =0; i<flights.length; i++)
    {
        let flightTime = moment(flights[i].itineraries[0].segments[0].departure.at).unix()
        flights[i].flightTime = flightTime
    }

    flights.sort((a: any, b: any) => {
        return b.flightTime - a.flightTime;
    });

    return flights

}

export function getUniqueAirlines(flights: any)
{
    let unique_values = flights
            .map((flight: any) => flight.itineraries[0].segments[0].carrierCode)
            .filter(
                (value: string, index: number, current_value: string) => current_value.indexOf(value) === index
            )
    return unique_values
}

export function sortAirline(flights: any, airlines: any)
{
    let filtered = flights.filter((flight: any) => {
        return airlines.some((airline: string) => {
            return airline === flight.itineraries[0].segments[0].carrierCode;
          });
    });
    return filtered
}

export function sortStops(flights: any, stops: any)
{   
    let filtered = []
    for(let i =0; i < flights.length; i++){
        let stopover=0
        flights[i].itineraries.map((itinerary: any) => (
            stopover += itinerary.segments.length-1
        ))
        if(stops.includes(stopover+''))
        {
            filtered.push(flights[i])
        }
        if(stops.includes('3') && stopover > 3)
        {
            filtered.push(flights[i])
        }
    }

    return filtered
}

export function sortTimeRange(flights: any, timeRange: any)
{   
    let range = [
        {
            start: '00:00:00',
            end: '05:59:00'
        },
        {
            start: '06:00:00',
            end: '11:59:00'
        },
        {
            start: '12:00:00',
            end: '17:59:00'
        },
        {
            start: '18:00:00',
            end: '23:59:00'
        }
    ]

    let filtered = []
    for(let i =0; i < flights.length; i++){

        let flightTime = moment(flights[i].itineraries[0].segments[0].departure.at)
        
        for(let j =0; j < timeRange.length; j++){
            let start = moment(flightTime.format("YYYY-MM-DD") +'T'+ range[timeRange[j]].start)
            let end = moment(flightTime.format("YYYY-MM-DD") +'T'+ range[timeRange[j]].end)

            if(flightTime.isBetween(start, end)) {
                filtered.push(flights[i])                
            }
        }

    }
    return filtered
}