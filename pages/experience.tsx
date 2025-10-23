
import Head from 'next/head'
import Headerbar from '@/components/header'
import Script from 'next/script'
import Footer from '@/components/footer'
import React from 'react';
const html = require("../components/html/banner.html");

export default function ExperienceExplore() {

return (
<>  
<Head>
        <title>TravelPally | AI Travel Assistant, Cheap flight deals, Cheap hotel deals, Cheap car rentals</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
      <Headerbar />
    {/* breadcrumb-area */}
    <section className="breadcrumb-area breadcrumb-bg">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="breadcrumb-content text-center">
              <h2 className="title">Travel Experiences</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item active" aria-current="page">
                    Explore various travel destinations
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* breadcrumb-area-end */}
    {/* about-area */}
    <section className="about-area faq-area">
      <div className="container">
      <div className="eg-widget" data-widget="search" data-program="ca-expedia" data-lobs="stays" data-network="pz" data-camref="1011l3DzCT"></div>
        <div className="row">
          <div className="col-lg-2" dangerouslySetInnerHTML={{ __html: html.default }}>
          </div>
          <div className="col-lg-10">
            <div data-vi-partner-id="U00481636" data-vi-widget-ref="W-5e697a46-4935-4bb4-854c-36c7f0a3584e"></div>
          </div>
        </div>
      </div>
    </section>
    {/* about-area-end */}
    {/* faq-area */}
    {/* faq-area-end */}
  </main>
  {/* main-area-end */}

            <Script src="assets/js/main.js" strategy="afterInteractive" />
            <Script async src="https://www.viator.com/orion/partner/widget.js" strategy="afterInteractive" />
            <Footer />
            

  {/* JS here */}
</>
);
}
