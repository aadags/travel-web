import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Script from 'next/script'
import Background from '../public/assets/img/slider/slider_bg02.jpeg'
import Headerbar from '@/components/header'
import Footer from '@/components/footer'
import BookingProgress from '@/components/bookingProgress'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useRouter } from 'next/router'
import Passenger from '@/models/passenger'
import moment from 'moment'
import { returnAirportLocation, numberCaster, returnLat, returnLong, returnCityCountry, localCurrency, calculateTotal } from '@/utils/utils'

export default function PaymentPage() {

    const router = useRouter();

    const [readyQuery, setReadyQuery] = useState(false);
    const [price, setPrice] = useState('');
    const [reference, setReference] = useState('');
    const [ttl, setTtl] = useState('');
    const [currency, setCurrency] = useState('CAD');

    useEffect(() => {

        if (typeof window !== 'undefined' && window.localStorage && localStorage.getItem('ttl') == '0') {


          const fetchData = async () => {

            const loc = JSON.parse(localStorage.getItem("x-lk") ?? '{}');
            const fd = localStorage.getItem('flightData')
            setCurrency(localCurrency(loc))
        
            //confirm flightdate is still valid
                const cred: any = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },   
                        body: fd
                    }

                const offerPricing = await fetch(process.env.NEXT_PUBLIC_API_URL+'/flight/offer/pricing', cred)
                const offerPricingData = await offerPricing.json()

                            let flight = offerPricingData.result.data.flightOffers[0]
                            let travellers: Array<Passenger> = []
                            let ref = generateString(10).trim();
                            setReference(ref)

                            //make passenger body
                            let contct: any = localStorage.getItem('contact')
                            contct = JSON.parse((contct)?contct:'[]')
                            let pls: any = localStorage.getItem('passengers')
                            pls = JSON.parse((pls)?pls:'[]')
                            for(var key in pls) {

                                let guest: Passenger = {
                                    first_name: pls[key].first_name,
                                    middle_name: pls[key].middle_name,
                                    last_name: pls[key].last_name,
                                    email: pls[key].email,
                                    gender: pls[key].gender,
                                    date_of_birth: pls[key].date_of_birth,
                                    cc: pls[key].cc,
                                    mobile_number: pls[key].mobile_number,
                                    passport_number: pls[key].passport_number,
                                    nationality: pls[key].nationality,
                                    issuing_nationality: pls[key].issuing_nationality,
                                    issuing_authority: pls[key].issuing_authority,
                                    place_of_birth: pls[key].place_of_birth,
                                    passport_issuance_date: pls[key].passport_issuance_date,
                                    passport_expiry_date: pls[key].passport_expiry_date,
                                }

                                travellers.push(guest)
                            }

                            const from_iata = flight.itineraries[0].segments[0].departure.iataCode
                            const iata = flight.itineraries[flight.itineraries.length - 1].segments[flight.itineraries[flight.itineraries.length - 1].segments.length - 1].arrival.iataCode
                            let totalPrice = calculateTotal(flight.price.total)
                            setPrice(totalPrice)
                            localStorage.setItem('price', totalPrice)


                            const cred2: any = {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },   
                                body: JSON.stringify({
                                    summary: 'Trip to ' + returnCityCountry(iata),
                                    departure_date: moment(flight.itineraries[0].segments[0].departure.at).toISOString(),
                                    reference: ref,
                                    airline_booking_code: '-',
                                    latitude: returnLat(iata),
                                    longitude: returnLong(iata),
                                    from_iata_code: from_iata,
                                    iata_code: iata,
                                    flight_data: JSON.stringify(flight),
                                    address: contct.address,
                                    postalcode: contct.postcode,
                                    city: contct.city,
                                    country: contct.country,
                                    payments: {
                                        create: {
                                            reference: ref,
                                            status: 'pending',
                                            amount: totalPrice                                                                 ,
                                        }
                                    },
                                    passengers: {
                                        create: travellers
                                    }
                                })
                            }

                        const paymentFetch = await fetch('/api/payment', cred2)
                        const paymentFetchData = await paymentFetch.json()

                        if(paymentFetchData.status) {
                                setReadyQuery(true)
                                setTtl(moment().add(10, 'minutes').toISOString())
                                localStorage.setItem('ttl', moment().add(10, 'minutes').format('YYYY-MM-DD hh:mm:ss A'))
                                localStorage.setItem('payment', JSON.stringify(paymentFetchData.data))
                        }
                      
                    
            }

            fetchData().catch(console.error);

        } else {

            const fetchData = async () => {
           
                let ttl = localStorage.getItem('ttl')

                var dateToCheck = moment(ttl);            
                if( moment().isAfter(dateToCheck) )
                {
                    localStorage.setItem('ttl', '0')
                    router.push({
                        pathname: '/flights'
                    })   
                }

                setTtl(moment(ttl).toISOString())

                let pt: any = localStorage.getItem('payment')
                pt = JSON.parse((pt)?pt:'[]')
                setReference(pt.reference)

                let price = numberCaster(localStorage.getItem('price'))
                setPrice(price+'')
                setReadyQuery(true)
            }

            fetchData().catch(console.error);
        }
        
      }, []);


    function generateString(length: number) {
        const characters ='abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result.toUpperCase();
    }

    const proceedToPay = (e: any) => {
            router.push({
                pathname: '/checkout',
                query: { ref: reference }
            })
    }

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

            <BookingProgress title="Payment: Enter your payment information to secure your tickets" value="100" pbar={{ width: "100%" }} />

            <section className="booking-details-area">
            
                <div className="container">
                    {(!readyQuery)?
                    <div className="row justify-content-center">
                    
                    <div className="col-73 order-2 order-xl-0">
                    <aside className="booking-sidebar">
                        <Skeleton height={20} className="skele" /><br/>
                        <Skeleton height={20} className="skele" />
                    </aside>
                    <br/><br/><br/>
                    </div>
                    </div>

                    
                    :


                    <div className="row justify-content-center">
                
                        <div className="col-100">
                    
                        <h3>Your payment reference is {reference}</h3>
                        <p>Note that a successful payment is required to confirm and reserve your booking.</p>
                        <p>Due to limited booking availability, we can only hold this booking for your for <b>10 mins</b>. Endeavour to make your payments within this duration.</p>
                        <p>This payment hold expires at <b>{moment(ttl).format('hh:mm:ss A')}</b>.</p>
                        {(currency !== 'CAD')? <p>You will be charged in CAD equivalent of your cost in your local currency. Ensure you have a card enabled for international payments</p> : <p></p>  }
                        <p>Click on the button below to proceed to pay for your flight.</p>
                        <br/>

                        <button className="btn" onClick={proceedToPay}>Pay {price} CAD</button> 
                        </div>
                    
                    </div> 
                    }
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