import React, { useState } from 'react';
import { returnAirportLocation, cabin, checkedBags, calculateTime, convert, returnCabin, localCurrency } from '@/utils/utils';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router'


export default function FlightItinerary(props: any) {

    const dictionaries = props.dictionaries
    const flight = props.flight
    const trigger = props.trigger
    const oneway = props.oneway
    const router = useRouter();

    const [seeDetail, setSeeDetail] = useState(false)
    const [currency, setCurrency] = useState('CAD')

    function handleClick() {
        setSeeDetail(!seeDetail);
    }

    const bookFlight = (e: any) => {
        if (typeof window !== "undefined" && window.localStorage) {

            localStorage.setItem("flightData", JSON.stringify(flight));
            localStorage.setItem("dictionaries", JSON.stringify(dictionaries));
            localStorage.setItem("ttl", "0");
            localStorage.setItem("oneway", oneway);
            const loc = JSON.parse(localStorage.getItem("x-lk") ?? '{}');
            setCurrency(localCurrency(loc))
        
            router.push({
                pathname: '/flight-detail'
            })
        }
    }

    let flightDuration = moment.duration('PT0S')
    let stopover = 0
    flight.itineraries.map((itinerary: any) => {
        flightDuration.add(moment.duration(itinerary.duration))
        stopover += itinerary.segments.length-1
    })

        return (
            <>

            <div className="booking-list-item">
                                <div className="booking-list-item-inner">
                                <div className="booking-list-top">
                                    <div className="flight-airway">
                                    <div className="flight-logo">
                                    <Image src={process.env.NEXT_PUBLIC_HOTEL_IMG_URL+'/airline/'+ flight.itineraries[0].segments[0].carrierCode+'?w=400&h=120'} width={50} height={15} alt="" />
                                        <h6 className="title">{dictionaries.carriers[flight.itineraries[0].segments[0].carrierCode]}</h6>
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
                                        {(trigger > -1)?  (stopover == 0)? <span>Direct Flight</span> : <span>{stopover>1? stopover+' Stops' : stopover+' Stop'}</span> :
                                        <span>{(flight.travelerPricings.length > 1)? flight.travelerPricings.length+' passengers' : flight.travelerPricings.length+' passenger'}</span> }
                                    </li> 
                                    </ul>
                                    <div className="flight-price">
                                    {(trigger > -1)? <h4 className="title">{convert(flight.price.total, currency)} {currency}</h4> : ''}
                                    {(trigger > -1)? <button className="btn" onClick={bookFlight}>
                                        Select <i className="flaticon-flight-1" />
                                    </button> : ''}
                                    </div>
                                </div>
                                
                                <div className="booking-list-bottom">
                                    <ul>
                                    { seeDetail?
                                    <li className="detail show" onClick={handleClick}>
                                        <i className="fa-solid fa-angle-down" /> Flight Detail
                                    </li>
                                    :
                                    <li className="detail" onClick={handleClick}>
                                        <i className="fa-solid fa-angle-down" /> Flight Detail
                                    </li>
                                    }
                                    {(flight.numberOfBookableSeats < 11 && trigger > -1)?<li style={{color:'red'}}>Only {flight.numberOfBookableSeats } seat(s) left on this flight!</li>: <li></li>}
                                    </ul>
                                </div>
                                </div>
                                {seeDetail && 
                                flight.itineraries.map((itinerary: any, index: number) => (
                                <div className="flight-detail-wrap" key={index}>
                                    <div className="flight-date">
                                        <ul>
                                        {(index == 0)? <li>Outbound</li> : <li>Return</li>}
                                        <li>
                                            <br/><span>{calculateTime(moment.duration(itinerary.duration).asMinutes())}</span>
                                        </li>
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
                                            <Image src={process.env.NEXT_PUBLIC_HOTEL_IMG_URL+'/airline/'+ segment.carrierCode+'?w=400&h=120'} width={50} height={15} alt="" />
                                            <ul>
                                                <li>{dictionaries.carriers[segment.carrierCode]}</li>
                                                {(typeof segment.operating !== "undefined" && segment.carrierCode !== segment.operating.carrierCode)? <li>Operated by {dictionaries.carriers[segment.operating.carrierCode]}</li> : ''  }
                                                <li>{calculateTime(moment.duration(segment.duration).asMinutes())}</li>
                                                <li>{cabin(segment.id, flight.travelerPricings)} | Flight {segment.carrierCode+segment.aircraft.code} | {dictionaries.aircraft[segment.aircraft.code]}</li>
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

                            </div>
                    </>
        )
}