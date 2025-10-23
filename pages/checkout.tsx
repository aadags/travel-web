import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Script from 'next/script'
import Background from '../public/assets/img/slider/slider_bg02.jpeg'
import Headerbar from '@/components/header'
import Footer from '@/components/footer'
import Stripe from 'stripe'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from '@/components/checkoutForm';
import { PrismaClient } from '@prisma/client'
import { numberCaster } from '../utils/utils';

export const getServerSideProps = async ({ query }: any) => {

    const prisma = new PrismaClient()

    const pay = await prisma.payment.findFirst({
        where: {
            reference: query.ref
        }
      });

    if(pay && pay.status=="pending") {

        const stripe = new Stripe("sk_test_51NuGbxLUItVcE9ZsaX5QYsRmYoq308OoA2Q7xpb71mQb0NX9l5qMa6NdELofgg39b9yocsSWXqoldZ5NH2ZpYRNL00J7EbkztC", {
            apiVersion: '2023-08-16',
        });
    
        const paymentIntent = await stripe.paymentIntents.create({
            amount: numberCaster(pay.amount) * 100,
            currency: 'cad',
            description: pay.reference,
            payment_method_types: ['card'],
        });

        await prisma.$disconnect();
    
        return {
            props: {
                paymentIntent
            }
        };
    } else {
        
            return {
                redirect: {
                destination: '/',
                permanent: false,
                },
            }
    }
};

export default function CheckoutPage({ paymentIntent }: any) {

    const stripePromise = loadStripe('pk_test_51NuGbxLUItVcE9Zs8FNFjKYgP8VuWlVcWhkklOd0YrleMHKYrS8XEP5zMzSOyhgQWtZkUEMni7nPxScrSwH7Un5x00xWGUMjli');
    const options = {
        // passing the client secret obtained from the server
        clientSecret: paymentIntent.client_secret,
    };
    

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
                
                        <div className="col-lg-2">
                        </div>

                        <div className="col-lg-8">
                        <Elements stripe={stripePromise} options={options}>
                            <CheckoutForm />
                        </Elements>
                        </div>

                        <div className="col-lg-2">
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