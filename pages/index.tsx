import React, { useEffect, useState, useContext } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import Background from '../public/assets/img/slider/slider_bg01.jpeg'
import Headerbar from '@/components/header'
import BookingArea from '@/components/bookingArea'
import Footer from '@/components/footer'
import TourOffersMini from '@/components/tourOffersMini';
import HotelOffersMini from '@/components/hotelOffersMini';
import { useRouter } from 'next/router'
import { ContextData } from '@/context/context';
import FlightInspiration from '@/components/flightInspiration';
import Link from 'next/link'


export default function HomePage() {

  const { location, setLocation, tz, setTz } = useContext(ContextData);
  const router = useRouter();
  const [readyQuery, setReadyQuery] = useState(false);

  useEffect(() => {

    if (typeof window !== 'undefined' && window.localStorage && router.isReady) {

      if (localStorage.getItem("x-lk") === null) {
        try {

          const cred: any = {
            method: 'GET'
          }
      
          const ipInfo = fetch(process.env.NEXT_PUBLIC_IP_SEEK+'', cred)
                        .then((res) => res.json())
                        .then((data) => {
                          
                          setLocation(data);
                          localStorage.setItem('x-lk', JSON.stringify(data))
                          setReadyQuery(true);

                          return data
                            
          }).then((data) => {

            return getTimeZone(data.lat, data.lon, (new Date().getTime() / 1000))

          }).then((tz) => {

            setTz(tz)
            localStorage.setItem('x-tz', tz)

          }).catch(function(responseError){
                        
          });
      
      } catch (err) {
        console.log(err);
      }

    } else {
      const loc = JSON.parse(localStorage.getItem("x-lk") ?? '{}');
      setLocation(loc);
      const tzn = localStorage.getItem("x-tz");
      setTz(tzn)
      setReadyQuery(true);
    }
        
    }

}, [router.isReady]);

async function getTimeZone(lat: any, long: any, time: any)
      {
          const res = await fetch('https://maps.googleapis.com/maps/api/timezone/json?location='+ lat +'%2C'+ long +'&timestamp='+ time +'&key=AIzaSyCzZUtpoLjBKa5hFrvqCAP_9zBQFPVcXy8')
          const data = await res.json()
          return data.timeZoneId
      } 


  return (
    <>
      <Head>
        <title>TravelPally | AI Travel Assistant, Cheap flight deals, Cheap hotel deals, Cheap car rentals</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>

      <Headerbar />
      
      {/* slider-area */}
      <section className="slider-area">
        <div className="slider-active">
          <div
            className="single-slider slider-bg">
              
            <div className="container">
              <div className="row">
                <div className="col-xl-8 col-lg-8">
                  <div className="slider-content">
                    <h2
                      className="title"
                      data-animation="fadeInUp"
                      data-delay=".2s"
                    >
                      Improving your travel experience...
                    </h2>
                    <p data-animation="fadeInUp" data-delay=".4s">
                    <br/> Be up to date with your travel plans with personalized experiences<br/> 
                      Make your journey memorable with your virtual travel companion<br/>                     
                    </p>
                    <Link href="https://account.travelpally.com/auth/register" className="btn">
                        Get Started
                      </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>         
        </div>
      </section>
      {/* slider-area-end */}
      
      <BookingArea />

      {/* features-area */}
      <section className="features-area">
        <div className="container">
          <div className="row justify-content-center">
            
            
          </div>
        </div>
      </section>
      {/* features-area-end */}
      
      {(!readyQuery)? <span></span> : <FlightInspiration /> }

      {/* destination-area */}
      
      {(!readyQuery)? <span></span> : <TourOffersMini home={true} location={location} /> }
            
      {/* destination-area-end */}
      {/* fly-next-area */}

      <br/><br/><br/>
      {(!readyQuery)? <span></span> : <HotelOffersMini home={true} location={location} /> }
      
      {/* fly-next-area-end */}
      {/* brand-area */}
      <div className="brand-area brand-bg">
        <div className="container">
          <div className="row brand-active">
            <div className="col-3">
              <div className="brand-item">
                
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* brand-area-end */}
    
  
    </main>
    
    <Footer />

  <style jsx>{`
        .slider-area {
          position: relative;
          z-index: -1;
          background: url(${Background.src});
        }
`}</style>
    </>
  )
}
