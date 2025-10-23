import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Script from 'next/script'
import Background from '../public/assets/img/slider/slider_bg02.jpeg'
import Headerbar from '@/components/header'
import Footer from '@/components/footer'
import { useRouter } from 'next/router'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import TourOffersMini from '@/components/tourOffersMini';
import HotelOffersMini from '@/components/hotelOffersMini';

export default function CompletePayment() {

    const router = useRouter();
    const [readyQuery, setReadyQuery] = useState(false);
    const [flight, setFlight] = useState();

    useEffect(() => {

            if (typeof window !== 'undefined' && window.localStorage && router.isReady) {

                localStorage.clear();
                const query = router.query;

                const cred: any = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },   
                }
    
                fetch('/api/complete/'+query.ref, cred)
                    .then((res) => res.json())
                    .then((data) => {
                    
                        if(data.status) {
                            setFlight(data.data)
                            setReadyQuery(true)
                        }
                }).catch(function(responseError){
                    
                });
                
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
                        <div className="col-50">

                        <Skeleton height={20} className="skele" /><br/>
                        <Skeleton height={20} className="skele" />
                        </div>

                        :

                        <div className="col-50">
                            <h3>Your booking is complete. You will receive an email with your tickets soon.</h3>

                        </div>

                        }
                       
                    </div> 
                    
                </div>
            </section>


            {(!readyQuery)? <span></span> : <TourOffersMini home={false} flight={flight} /> }
            {(!readyQuery)? <span></span> : <HotelOffersMini home={false} flight={flight} /> }

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