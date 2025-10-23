import Head from 'next/head'
import Script from 'next/script'
import Background from '../public/assets/img/slider/slider_bg02.jpeg'
import Headerbar from '@/components/header'
import BookingAreaTwo from '@/components/bookingAreaTwo'
import Footer from '@/components/footer'
import BookingList from '../components/bookingList';
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ContextData } from '@/context/context'

export default function FlightsPage() {

    const { setLocation, setTz } = useContext(ContextData);
    const router = useRouter();
    const [readyQuery, setReadyQuery] = useState(false);
    const [rand, setRand] = useState('');
    const [queryParams, setQueryParams] = useState();

    const reloadData = (data: string) => {
      setRand(data)
    }

    const loadQueryParams = (data: any) => {
      setQueryParams(data)
    }
  
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

            <section className="breadcrumb-area-two breadcrumb-bg">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="breadcrumb-content text-center">
                               
                            </div>
                        </div>
                    </div>
                </div>
            </section> 

            <BookingAreaTwo reloadCallback={reloadData} queryParamsCallback={loadQueryParams} />

            <BookingList reload={rand} queryParams={queryParams} />

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