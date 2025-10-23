import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { stringCaster, truncateString } from '@/utils/utils';
import Image from 'next/image';



  
export default function HotelOffersMini(props: any) {

    const router = useRouter();
    const [hotels, setHotels] = useState([]);
    const [readyQuery, setReadyQuery] = useState(false);

    const klass = (props.home)? 'destination-area' : 'flight-offer-area';
    const loc: any = props.location;
    const flight: any = props.flight;

    useEffect(() => {
        if (router.isReady) {
                const cred: any = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },   
                }

                const q = (props.home)? '?latitude='+ loc.lat +'&longitude='+ loc.lon +'&cc='+loc.countryCode : '?cityCode='+flight.iata_code;
                const u = (props.home)? '/hotel/home-offers' : '/hotel/offers';
    
                fetch(process.env.NEXT_PUBLIC_API_URL+u+q, cred)
                    .then((res) => res.json())
                    .then((data) => {
                        
                        if(data.status) {
                            setHotels(data.result.data)
                            setReadyQuery(true)
                        }

                }).then(function(res){

                    

                }).catch(function(responseError){
                            
                        });
                }

      }, [router.isReady]);

    return (
        <>
             {/* flight-offer-area */}
             <section className="flight-offer-area">
                {(!readyQuery)?
                <div className="container">
                    <div className="row align-items-center mb-35">
                        <div className="col-md-12">
                            <Skeleton height={20} className="skele" /><br/>
                            <Skeleton height={20} className="skele" />
                        </div>
                    </div>
                </div>
                : (hotels.length < 1)? '' :
                    <div className="container">
                    <div className="row align-items-center mb-35">
                        <div className="col-md-12">
                        <div className="section-title">
                            {(props.home)?<span className="sub-title">Amazing hotel deals</span> : <span className="sub-title">Discover favorite places to stay on your trip</span> }
                            <h2 className="title">Hotels and Accomodation</h2>
                        </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">

                        {hotels.slice(0, 8).map((hotel: any, index: number) => (
                            <div key={index} className="col-sm-3">
                            <div className="flight-offer-item offer-item-two">
                                <div className="flight-offer-thumb">
                                <Image src={process.env.NEXT_PUBLIC_HOTEL_IMG_URL+'/hotel/'+ hotel.hotel?.hotelId +'?name='+ hotel.hotel?.name +'&location='+ hotel.hotel?.latitude +','+ hotel.hotel?.longitude +'&w=500'} width={248} height={144} alt="" />
                                </div>
                                <div className="flight-offer-content">
                                <h2 className="title">{truncateString(hotel.hotel?.name ?? '',35)}</h2>
                                <p>Price from</p>
                                <h4 className="price">{hotel.offers[0]?.price?.total} {hotel.offers[0]?.price?.currency}</h4>
                                </div>
                                <div className="overlay-content">
                                <h2 className="title">{hotel.hotel?.name}</h2>
                                <p>Price from</p>
                                <h4 className="price">{hotel.offers[0]?.price?.total} {hotel.offers[0]?.price?.currency}</h4>
                                <div className="content-bottom">
                                    <a href='#' className="btn" target="_blank">
                                    Book Now
                                    </a>
                                    <a href="booking-list.html" className="discover">
                                    Discover More
                                    </a>
                                </div>
                                </div>
                            </div>
                            </div>
                        ))}
                        
                    </div>
                    </div>
                }
                </section>
                {/* flight-offer-area-end */}
        </>
    )
}