
import Head from 'next/head'
import Headerbar from '@/components/header'
import Script from 'next/script'
import Footer from '@/components/footer'
import React from 'react';
import Link from 'next/link'

export default function ExperienceExplore() {

return (
<>  
<Head>
        <title>TravelPally | AI Travel Assistant, Cheap flight deals, Cheap hotel deals, Cheap car rentals</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

  
  {/* main-area */}
  <main>
  <Headerbar />
    {/* breadcrumb-area */}
    <section className="breadcrumb-area breadcrumb-bg">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="breadcrumb-content text-center">
              <h2 className="title">Contact Us</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Contact Us
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* breadcrumb-area-end */}
    {/* contact-area */}
    <section className="contact-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="section-title text-center mb-40">
              <span className="sub-title">contact us now</span>
              <h2 className="title">Your can reach us electronically below or  pay us a visit at our office</h2>
            </div>

            <div className="section-title text-center mb-40">
              <h4>Canada Office: +1 250 900 6417</h4>
              <h4>Email: contact@travelpally.com</h4>
              <h4>Address: 7404 King George Blvd., Suite 200, Surrey, British Columbia, V3W 1N6, Canada</h4>
            </div>
            
          </div>
        </div>
      </div>
    </section>
    {/* contact-area-end */}
    {/* contact-map */}
    
    
    {/* contact-map-end */}
  </main>

  {/* main-area-end */}

            <Script src="assets/js/main.js" strategy="afterInteractive" />
            <Footer />
            

  {/* JS here */}
</>
);
}
