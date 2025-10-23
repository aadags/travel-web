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
    
    useEffect(() => {

        const loc = JSON.parse(localStorage.getItem("x-lk") ?? '{}');
        setLocation(loc);
        const tzn = localStorage.getItem("x-tz");
        setTz(tzn)
  
  }, [router.isReady]);

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
                              <h1 style={{ color:'white' }}>Privacy Policy</h1>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </section> 

            <div className="booking-list-area">

                    <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-100">


<p><strong>Effective Date:</strong> November 1, 2023</p>

<p>Welcome to <b>TravelPally.com</b> (the &quot;Site&quot;). This Privacy Policy outlines how TravelPally.com collects, uses, maintains, and discloses information gathered from users (each, a &quot;User&quot;) of the website. This Privacy Policy applies to the Site and all products and services offered by TravelPally.com.</p>

<h2>1. Information Collection</h2>

<h3>1.1 Personal Identification Information</h3>

<p>We may collect personal identification information from Users in various ways, including but not limited to when Users visit our site, register on the site, fill out a form, and in connection with other activities, services, features, or resources we make available on our Site. Users may be asked for, as appropriate, name, email address, mailing address, phone number, and payment information.</p>

<h3>1.2 Non-personal Identification Information</h3>

<p>We may collect non-personal identification information about Users whenever they interact with our Site. Non-personal identification information may include the browser name, the type of computer, and technical information about Users&apos; means of connection to our Site, such as the operating system and the Internet service providers utilized.</p>

<h2>2. How We Use Collected Information</h2>

<p>TravelPally.com may collect and use Users&apos; personal information for the following purposes:</p>

<ul>
    <li>To personalize user experience</li>
    <li>To improve our Site</li>
    <li>To process transactions</li>
    <li>To send periodic emails</li>
</ul>

<h2>3. Protection of Information</h2>

<p>We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of Users&apos; personal information, username, password, transaction information, and data stored on our Site.</p>

<h2>4. Sharing Personal Information</h2>

<p>We do not sell, trade, or rent Users&apos; personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates, and advertisers for the purposes outlined above.</p>

<h2>5. Changes to this Privacy Policy</h2>

<p>TravelPally.com has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the bottom of this page. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect.</p>

<h2>6. Your Acceptance of these Terms</h2>

<p>By using this Site, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our Site. Your continued use of the Site following the posting of changes to this policy will be deemed your acceptance of those changes.</p>

<h2>7. Contacting Us</h2>

<p>If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at:</p>

<p>TravelPally.com<br/>
booking@travelpally.com</p>

<p>This document was last updated on December 18, 2023.</p>

   
                        </div>
                    </div>

                    </div>
                </div>
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