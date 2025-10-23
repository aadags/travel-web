import React, { useEffect } from 'react';
import Head from 'next/head'
import Script from 'next/script'
import Background from '../public/assets/img/slider/slider_bg02.jpeg'
import Headerbar from '@/components/header'
import Footer from '@/components/footer'
import Stripe from 'stripe'
import { PrismaClient } from '@prisma/client'
import { useRouter } from 'next/router'
import { numberCaster, stringCaster } from '../utils/utils';
import moment from 'moment-timezone';

export async function getServerSideProps({ query }: any) {

    const prisma = new PrismaClient()
    
    const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_KEY ?? '', {
        apiVersion: '2023-08-16',
      });
  
    const paymentIntent = await stripe.paymentIntents.retrieve(query.payment_intent);


    const pay = await prisma.payment.findFirst({
          where: {
              reference: stringCaster(paymentIntent.description)
          }
        });

    if(pay?.status=='succeeded')
    {
        return {
            redirect: {
              destination: '/complete?ref='+paymentIntent.description,
              permanent: false,
            },
        }
    }

    console.log(paymentIntent)

    if(paymentIntent.status=='succeeded' && paymentIntent.amount == (numberCaster(pay?.amount) * 100))
    {

        const upay = await prisma.payment.update({
            where: {
                id: pay?.id
            },
            data: {
              status: paymentIntent.status,
            },
          });

        const trip = await prisma.trip.findFirst({
            where: {
                id: pay?.trip_id
            }
          });

        const passengers = await prisma.passenger.findMany({
            where: {
                trip_id: pay?.trip_id
            }
          });

          let trv: any = []

          passengers.map((p: any, index: number) => {
                let ob = {
                    id: (index*1) + 1,
                    dateOfBirth: moment(p.date_of_birth).format('YYYY-MM-DD'),
                    name: {
                        firstName: p.first_name,
                        lastName: p.last_name,
                    },
                    gender: p.gender,
                    contact: {
                        emailAddress: p.email,
                        phones: [
                            {
                            deviceType: "MOBILE",
                            countryCallingCode: p.cc?.replace('+', ''),
                            number: p.mobile_number
                            }
                        ]
                    },
                    documents: [
                        {
                            documentType: "PASSPORT",
                            birthPlace: p.place_of_birth,
                            issuanceLocation: p.issuing_authority,
                            issuanceDate: moment(p.passport_issuance_date).format('YYYY-MM-DD'),
                            number: p.passport_number,
                            expiryDate: moment(p.passport_expiry_date).format('YYYY-MM-DD'),
                            issuanceCountry: p.issuing_nationality,
                            validityCountry: p.issuing_nationality,
                            nationality: p.nationality,
                            holder: true
                        }
                    ]
                }

                trv.push(ob)
          });

          let flightData = JSON.parse(trip?.flight_data?? '{}')

          //create ticket
          const cred: any = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },  
              body: JSON.stringify({
                offer: flightData,
                travelers: trv,
                contact: {
                      "addresseeName": {
                        "firstName": trv[0].name.firstName,
                        "lastName": trv[0].name.lastName
                      },
                      "companyName": "TravelPally Canada",
                      "purpose": "STANDARD",
                      "phones": [
                        {
                          "deviceType": "MOBILE",
                          "countryCallingCode": trv[0].contact.phones[0].countryCallingCode,
                          "number": trv[0].contact.phones[0].number
                        }
                      ],
                      "emailAddress": trv[0].contact.emailAddress,
                      "address": {
                        "lines": [
                            trip?.address
                        ],
                        "postalCode": trip?.postalcode,
                        "cityName": trip?.city,
                        "countryCode": trip?.country
                      }
                    },
                remarks: {
                    general: [
                        {
                        subType: "GENERAL_MISCELLANEOUS",
                        text: "ONLINE BOOKING FROM TRAVELPALLY CANADA"
                        }
                    ]
                }
             })
          }

        const orderCreate = await fetch(process.env.NEXT_PUBLIC_API_URL+'/flight/order/create', cred)
        const orderCreateData = await orderCreate.json()

        const tripUpdate = await prisma.trip.update({
                    where: {
                        id: trip?.id
                    },
                    data: {
                      airline_booking_code: orderCreateData.result.data.id,
                    },
                });

        await prisma.$disconnect();

        return {
                    redirect: {
                      destination: '/complete?ref='+paymentIntent.description,
                      permanent: false,
                    },
                }

    
    }

    await prisma.$disconnect();

    return {
        props: {
            error: 'Payment failed: '+JSON.stringify(paymentIntent)
        }
    }
  
};


export default function CompletePayment({ err }: any) {

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {

        }
      }, []);


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
                
                        <div className="col-50">
                                An error occurred
                        </div>
                    
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