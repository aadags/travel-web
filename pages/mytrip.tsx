import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Script from 'next/script'
import Background from '../public/assets/img/slider/slider_bg02.jpeg'
import Headerbar from '@/components/header'
import Footer from '@/components/footer'
import { useRouter } from 'next/router'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Trip from '@/models/trip';
import FlightOrder from '@/components/flightOrder';

export default function CompletePayment() {

    const router = useRouter();
    const [readyQuery, setReadyQuery] = useState(false);
    const [trip, setTrip] = useState(new Trip());
    const f: any = {}
    const [flight, setFlight] = useState(f);
    const [travelers, setTravelers] = useState(f);

    useEffect(() => {

            if (typeof window !== 'undefined' && window.localStorage && router.isReady) {

                const mytrip: Trip = JSON.parse(localStorage.getItem('mytrip') ?? '{}');
                setTrip(mytrip)

                const fetchData = async () => {
           
                    const cred: any = {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }

                    const flightOrder = await fetch(process.env.NEXT_PUBLIC_API_URL+'/flight/booking/'+mytrip.airline_booking_code, cred)
                    const flightOrderData = await flightOrder.json()
                    setFlight(flightOrderData.result.data.flightOffers[0])
                    setTravelers(flightOrderData.result.data.travelers)
                    setReadyQuery(true)

                }
    
                fetchData().catch(console.error);

                setFlight(JSON.parse(mytrip.flight_data?? '{}'))
                localStorage.removeItem('mytrip')
            }

      }, [router.isReady]);

    

    return (
        <>
            <Head>
                <title>TravelPally | AI Travel Assistant, Cheap flight deals, Cheap hotel deals, Cheap car rentals</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>
            <Headerbar />

            <section className="breadcrumb-area breadcrumb-bg-alt">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="breadcrumb-content text-center">
                               
                            </div>
                        </div>
                    </div>
                </div>
            </section> 

            <section className="booking-details-area">
            
                <div className="container">
                    
                    <div className="row justify-content-center">
                
                        {(!readyQuery)?
                        <div className="col-100">

                        <Skeleton height={20} className="skele" /><br/>
                        <Skeleton height={20} className="skele" />
                        </div>

                        :

                        <div className="col-100">
                            <FlightOrder key={trip.id} trigger="-1" flight={flight} trip={trip} travelers={travelers} />

                        </div>

                        }
                       
                    </div> 
                    
                </div>
            </section>

            </main>

            <Script src="assets/js/main.js" strategy="afterInteractive" />

            <Footer />
            
            <style jsx>{`
                    .breadcrumb-bg {
                        background: url(${Background.src});
                    }
            `}</style>
        </>
    );

}