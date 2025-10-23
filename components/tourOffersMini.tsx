import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Tour from '@/models/tour';
import { stringCaster, truncateString } from '@/utils/utils';
import Image from 'next/image';



  
export default function TourOffersMini(props: any) {

    const router = useRouter();
    const [tours, setTours] = useState(Array<Tour>());
    const [readyQuery, setReadyQuery] = useState(false);

    const klass = (props.home)? 'destination-area destination-bg' : 'flight-offer-area';
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
                
                const q = (props.home)? '?latitude='+ loc.lat +'&longitude='+ loc.lon +'&cc='+loc.countryCode : '?latitude='+ flight.latitude +'&longitude='+ flight.longitude;
                const u = (props.home)? '/tour/home-offers' : '/tour/offers';
                fetch(process.env.NEXT_PUBLIC_API_URL+u+q, cred)
                    .then((res) => res.json())
                    .then((data) => {
                        
                        if(data.status) {
                            setTours(data.result.data.filter((tour: Tour) => !!tour.name && tour?.pictures))
                            setReadyQuery(true)
                        }
                }).catch(function(responseError){
                    
                });
        }

      }, [router.isReady]);

      

    return (
        <>
             {/* flight-offer-area */}
             <section className={klass}>
                {(!readyQuery)?
                <div className="container">
                    <div className="row align-items-center mb-35">
                        <div className="col-md-12">
                            <Skeleton height={20} className="skele" /><br/>
                            <Skeleton height={20} className="skele" />
                        </div>
                    </div>
                </div>
                : (tours.length < 1)? '' :
                    <div className="container">
                    <div className="row align-items-center mb-35">
                        <div className="col-md-12">
                        <div className="section-title">
                        {(props.home)?<span className="sub-title">Explore {loc.country}</span> : <span className="sub-title">Make your stay worthwhile</span> }
                            <h2 className="title">Tourism and Activities</h2>
                        </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">

                        {tours.slice(0, 8).map((tour: Tour, index: number) => (
                            <div key={index} className="col-sm-3">
                            <div className="flight-offer-item offer-item-two">
                                <div className="flight-offer-thumb">
                                <Image src={ (tour?.pictures)? tour.pictures[0] : '' } width={248} height={144} alt="" />
                                </div>
                                <div className="flight-offer-content">
                                <h2 className="title">{truncateString(tour.name ?? '',35)}</h2>
                                <span>{tour.minimumDuration}</span>
                                <p>Price from</p>
                                <h4 className="price">{tour.price?.amount} {tour.price?.currencyCode}</h4>
                                </div>
                                <div className="overlay-content">
                                <h2 className="title">{tour.name}</h2>
                                <span>{tour.minimumDuration}</span>
                                <p>Price from</p>
                                <h4 className="price">{tour.price?.amount} {tour.price?.currencyCode}</h4>
                                <div className="content-bottom">
                                    <a href={tour.bookingLink} className="btn" target="_blank">
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