import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Script from 'next/script'
import Background from '../public/assets/img/slider/slider_bg02.jpeg'
import Headerbar from '@/components/header'
import Footer from '@/components/footer'
import { useRouter } from 'next/router'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import TourOffersMaxi from '@/components/tourOffersMaxi';

export default function Tours() {

    const router = useRouter();
    const [readyQuery, setReadyQuery] = useState(true);

    useEffect(() => {

            if (typeof window !== 'undefined' && window.localStorage && router.isReady) {

                
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


            {(!readyQuery)? <span></span> : <TourOffersMaxi /> }

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