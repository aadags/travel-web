import Head from 'next/head'
import Script from 'next/script'
import Background from '../public/assets/img/slider/slider_bg02.jpeg'
import Headerbar from '@/components/header'
import Footer from '@/components/footer'
import BookingProgress from '@/components/bookingProgress'
import PassengerForm from '@/components/passengerForm'
import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import FlightItinerary from '@/components/flightItinerary'
import { useRouter } from 'next/router'
import { calculateTax, calculateTotal, numberCaster, ucCountryFirstCase, convert, localCurrency } from '../utils/utils'
import Passenger from '@/models/passenger'
import PassengerFormError from '@/models/errors/passenger-form-error'
import PassengerContactForm from '../components/passengerContactForm';
import ContactForm from '@/models/contactForm'
import ContactFormError from '../models/errors/contact-form-error';

export default function FlightDetailPage() {

    const router = useRouter();

    const [readyQuery, setReadyQuery] = useState(false);
    const [flight, setFlight] = useState({ id: 0,  itineraries:[], travelerPricings:[] });
    const [flightOffer, setFlightOffer] = useState({ itineraries:[], travelerPricings:[], price:{currency: '', total: 0.00} });
    const [travelerReq, setTravelerReq] = useState({ travelerRequirements:[] });
    const [dictionaries, setDictionaries] = useState({ carriers:[], aircraft:[], currencies:[]});
    const formList: Array<Passenger> = [];
    const [infoForm, setInfoForm] = useState(formList);
    const [contactForm, setContactForm] = useState(new ContactForm());
    const [errors, setErrors] = useState({});
    const [contactErrors, setContactErrors] = useState({});
    const [oneway, setOneway] = useState(0);
    const [curr, setCurrency] = useState('CAD');
    const [isFormValid, setIsFormValid] = useState(true);1

    type FormData = {
        index: number;
        type: string;
        value: string;
      };

    type ContactData = {
        type: string;
        value: string;
      };
    

    const contactFormData = (formData: ContactData) => {

        let fdata: ContactForm = contactForm

        switch(formData.type) {
            case 'address':
                fdata.address = formData.value 
              break;
            case 'city':
                fdata.city = formData.value 
              break;
            case 'country':
                fdata.country = formData.value 
              break;
            case 'postcode':
                fdata.postcode = formData.value 
              break;
            default:        
        }

        setContactForm(fdata)
        validateForm();
    }

    const infoFormData = (formData: FormData) => {
        let ifo = infoForm
        if(typeof ifo[formData.index] === 'undefined') {
            ifo[formData.index] = {}
        }
        
        let sdata: Passenger = ifo[formData.index]
        
        switch(formData.type) {
            case 'first_name':
                sdata.first_name = formData.value 
              break;
            case 'middle_name':
                sdata.middle_name = formData.value 
              break;
            case 'last_name':
                sdata.last_name = formData.value 
              break;
            case 'date_of_birth':
                sdata.date_of_birth = formData.value 
              break;
            case 'email':
                sdata.email = formData.value 
              break;
            case 'gender':
                sdata.gender = formData.value 
              break;
            case 'cc':
                sdata.cc = formData.value 
              break;
            case 'mobile_number':
                sdata.mobile_number = formData.value 
              break;
            case 'passport_number':
                sdata.passport_number = formData.value 
                break;
            case 'nationality':
                sdata.nationality = formData.value 
                break;
            case 'issuing_nationality':
                sdata.issuing_nationality = formData.value 
                break;
            case 'issuing_authority':
                    sdata.issuing_authority = formData.value 
                    break;
            case 'place_of_birth':
                sdata.place_of_birth = formData.value 
                break;
            case 'passport_issuance_date':
                sdata.passport_issuance_date = formData.value 
                break;
            case 'passport_expiry_date':
                sdata.passport_expiry_date = formData.value 
                break;
            default:
        }

        ifo[formData.index] = sdata
        setInfoForm(ifo)
        validateForm();
    }

    const validateForm = () => {

        let errors: Array<PassengerFormError> = [];
        let contactErr: ContactFormError = new ContactFormError();
        let passErr = new PassengerFormError;
        setIsFormValid(true)

        for(var key in infoForm) {

            let psg = new Passenger;
            psg = infoForm[key]

            if (!psg.first_name) {
                passErr.first_name = 'First name is required'
                setIsFormValid(false)
            }
            if (!psg.last_name) {
                passErr.last_name = 'Last name is required'
                setIsFormValid(false)
            }
            if (!psg.date_of_birth) {
                passErr.date_of_birth = 'Date of birth is required'
                setIsFormValid(false)
            }
            if (!psg.gender) {
                passErr.gender = 'Gender is required'
                setIsFormValid(false)
            }
            if (!psg.email) {
                passErr.email = 'Email is required'
                setIsFormValid(false)
            } else if (!/\S+@\S+\.\S+/.test(psg.email)) {
                passErr.email = 'Email is invalid.';
                setIsFormValid(false)
            }

            if (!psg.mobile_number) {
                passErr.mobile_number = 'Mobile number is required'
                setIsFormValid(false)
            } 

            if (!psg.cc) {
                passErr.cc = 'Country dial code is required'
                setIsFormValid(false)
            } 

            if (!psg.passport_number) {
                passErr.passport_number = 'Passport number is required'
                setIsFormValid(false)
            }
            if (!psg.nationality) {
                passErr.nationality = 'Nationality is required'
                setIsFormValid(false)
            }  
            if (!psg.issuing_authority) {
                passErr.issuing_authority = 'Issuing authority is required'
                setIsFormValid(false)
            }          
            if (!psg.issuing_nationality) {
                passErr.issuing_nationality = 'Issuing nationality is required'
                setIsFormValid(false)
            }
            if (!psg.place_of_birth) {
                passErr.place_of_birth = 'Place of birth is required'
                setIsFormValid(false)
            }
            if (!psg.passport_issuance_date) {
                passErr.passport_issuance_date = 'Passport issuance date is required'
                setIsFormValid(false)
            }
            if (!psg.passport_expiry_date) {
                passErr.passport_expiry_date = 'Passport expiry date is required'
                setIsFormValid(false)
            }

            if(Object.keys(passErr).length > 0)
            {
                errors[key] = passErr;
            }
        }
  
        setErrors(errors);

        for(var key in contactForm) {
            if (!contactForm.address) {
                contactErr.address = 'Contact address is required'
                setIsFormValid(false)
            }
            if (!contactForm.city) {
                contactErr.city = 'Contact city is required'
                setIsFormValid(false)
            }
            if (!contactForm.country) {
                contactErr.country = 'Contact country is required'
                setIsFormValid(false)
            }
            if (!contactForm.postcode) {
                contactErr.postcode = 'Contact postcode is required'
                setIsFormValid(false)
            }
        }

        setContactErrors(contactErr)
    };

    const proceedToPayment = async (e: any) => {
        validateForm()
        if (typeof window !== "undefined" && window.localStorage && isFormValid) {

            localStorage.setItem("flightData", JSON.stringify(flight));
            localStorage.setItem("passengers", JSON.stringify(infoForm));
            localStorage.setItem("contact", JSON.stringify(contactForm));
        
            router.push({
                pathname: '/payment'
            })
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {

          const flightData = localStorage.getItem('flightData')
          const dictionaries = localStorage.getItem('dictionaries')
          setOneway(numberCaster(localStorage.getItem('oneway')) ?? 0)
          setFlight(JSON.parse((flightData)?flightData:'{}'))
          setDictionaries(JSON.parse((dictionaries)?dictionaries:'{}'))
          const loc = JSON.parse(localStorage.getItem("x-lk") ?? '{}');
          setCurrency(localCurrency(loc))
        
          const cred: any = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },   
                body: flightData
            }

            fetch(process.env.NEXT_PUBLIC_API_URL+'/flight/offer/pricing', cred)
                .then((res) => res.json())
                .then((data) => {
                    setFlightOffer(data.result.data.flightOffers[0])
                    setTravelerReq(data.result.data.bookingRequirements)
                    if(data.status) {
                        setReadyQuery(true)
                    }
            }).catch(function(responseError){
                console.log(responseError)
                router.push({
                    pathname: '/flights'
                })
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

            <BookingProgress title="Trip Info & Options: Please fill in with valid information and select suitable options" value="50" pbar={{ width: "50%" }} />

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
                    <div className="col-73">

                    <FlightItinerary key={flight.id} trigger="-1" dictionaries={dictionaries} flight={flight} oneway={oneway} />
                    
                            {flightOffer.travelerPricings.map((t: any, index: number) => (

                                <PassengerForm key={index} rules={t} grules={travelerReq} index={index} errors={errors} infoFormCallback={infoFormData} />
                            ))}

                    <PassengerContactForm rules={travelerReq} errors={contactErrors} AddressFormCallback={contactFormData} />

                        <br/>
                        <button className="btn" disabled={!isFormValid} onClick={proceedToPayment}>Continue</button> 
                                        
                    </div>



                    <div className="col-27">
                        <aside className="booking-sidebar">
                        <h2 className="main-title">Price Summary</h2>
                        
                        <div className="widget">
                            <div className="price-summary-top">
                            <ul>
                                <li>Details</li>
                                <li>Amount</li>
                            </ul>
                            </div>
                            <div className="price-summary-detail">
                            <ul>
                                {flightOffer.travelerPricings.map((t: any, index: number) => (
                                    <li key={index}>
                                        {ucCountryFirstCase(t.travelerType) + ' ' + t.travelerId} <span>{convert(t.price.total, t.price.currency)} {t.price.currency}</span>
                                    </li>
                                ))}
                                <li>
                                Sub Total: <span> { convert(flightOffer.price.total, curr) } {curr} </span>
                                </li>
                                <li>
                                Tax & Charges: <span> { convert(calculateTax(flightOffer.price.total), curr) } {curr} </span>
                                </li>
                                <li>
                                Total Payable<span>{convert(calculateTotal(flightOffer.price.total), curr)} {curr}</span>
                                </li>
                            </ul>
                            </div>
                        </div>
                        </aside>
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