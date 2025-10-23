import React, { useState } from 'react';
import { returnAirportLocation, cabin, checkedBags, calculateTime, convert, returnCabin, localCurrency, returnAirline } from '@/utils/utils';
import moment from 'moment';
import Image from 'next/image';


export default function FlightOrder(props: any) {

    const flight = props.flight
    const trigger = props.trigger
    const trip = props.trip
    const travelers = props.travelers

    console.log(travelers)

    const [currency, setCurrency] = useState('CAD')

    let flightDuration = moment.duration('PT0S')
    flight.itineraries.map((itinerary: any) => {
        flightDuration.add(moment.duration(itinerary.duration))
    })

        return (
            <>
            <h1>{trip.summary}</h1>
            <div className="booking-list-item">
                                <div className="booking-list-item-inner">
                                <div className="booking-list-top">
                                    <div className="flight-airway">
                                    <div className="flight-logo">
                                    <Image src={process.env.NEXT_PUBLIC_HOTEL_IMG_URL+'/airline/'+ flight.itineraries[0].segments[0].carrierCode+'?w=400&h=120'} width={100} height={30} alt="" />
                                        <h6 className="title">{returnAirline(flight.itineraries[0].segments[0].carrierCode)}</h6>
                                    </div>
                                    
                                    </div>
                                    <ul className="flight-info">
                                    <li>
                                        
                                    </li>
                                    <li className="time">
                                    {(trigger > -1)? calculateTime(flightDuration.asMinutes()) : 
                                    moment(flight.itineraries[0].segments[0].departure.at).format('DD MMM YYYY')+' - '+moment(flight.itineraries[flight.itineraries.length - 1].segments[flight.itineraries[flight.itineraries.length - 1].segments.length - 1].arrival.at).format('DD MMM YYYY')}
                                    </li>
                                    <li>
                                        <span>{(flight.travelerPricings.length > 1)? flight.travelerPricings.length+' passengers' : flight.travelerPricings.length+' passenger'}</span>
                                    </li> 
                                    </ul>
                                    <div className="flight-price">
                                    <h4 className="title">{convert(flight.price.total, currency)} {currency}</h4>
                                    </div>
                                </div>
                                </div>
                                {flight.itineraries.map((itinerary: any, index: number) => (
                                <div className="flight-detail-wrap" key={index}>
                                    <div className="flight-date">
                                        <ul>
                                        {(index == 0)? <li>Outbound</li> : <li>Return</li>}
                                        
                                        <li></li>
                                        </ul>
                                        
                                    </div>

                                    <div className="flight-detail-right">
                                    {itinerary.segments.map((segment: any, index: number) => (
                                        <span key={index}>
                                            {(index > 0)? <h4 className="layover"><br/>Transfer time: {calculateTime(moment.duration(moment(segment.departure.at).diff(moment(itinerary.segments[index-1].arrival.at))).asMinutes())} <br/><br/></h4> : ''}
                                            <h4 className="title">{returnAirportLocation(segment.departure.iataCode)}<br/>
                                            <span>{moment(segment.departure.at).format('YYYY-MM-DD hh:mm:ss A')}</span>
                                            </h4>
                                            <div className="flight-detail-info">
                                            <Image src={process.env.NEXT_PUBLIC_HOTEL_IMG_URL+'/airline/'+ segment.carrierCode+'?w=400&h=120'} width={100} height={30} alt="" />
                                            <ul>
                                                <li>{returnAirline(segment.carrierCode)}</li>
                                                {(typeof segment.operating !== "undefined" && segment.carrierCode !== segment.operating.carrierCode)? <li>Operated by {returnAirline(segment.operating.carrierCode)}</li> : ''  }
                                                <li>{calculateTime(moment.duration(segment.duration).asMinutes())}</li>
                                                <li>{cabin(segment.id, flight.travelerPricings)} | Flight {segment.carrierCode+segment.aircraft.code} | {segment.aircraft.code}</li>
                                                <li><i className="fa-solid fa-bag-shopping"></i>{checkedBags(segment.id, flight.travelerPricings)}</li>
                                            </ul>
                                            </div>
                                            <h4 className="title">{returnAirportLocation(segment.arrival.iataCode)}<br/>
                                            <span>{moment(segment.arrival.at).format('YYYY-MM-DD hh:mm:ss A')}</span>
                                            </h4>
                                        </span>
                                    ))}
                                    </div>
                                </div>
                                ))}

                                <div className="flight-detail-wrap">
                                    <div className="flight-date">
                                        <ul>
                                        <li>{(flight.travelerPricings.length > 1)? 'passengers' : 'passenger'}</li>
                                        
                                        <li></li>
                                        </ul>
                                        
                                    </div>

                                    <div className="flight-detail-right">
                                        {flight.travelerPricings.map((traveler: any, index: number) => (
                                        <span key={index}>
                                            <h4 className="psg">{travelers[index].name.firstName} {travelers[index].name.lastName} ({traveler.travelerType})<br/>
                                            <span>{travelers[index].gender}</span><br/>
                                            <span>{travelers[index].contact.emailAddress}</span>
                                            </h4>
                                        </span>
                                        ))}
                                    </div>
                                </div>

                            </div>
                    </>
        )
}