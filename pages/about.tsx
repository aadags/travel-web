
import Head from 'next/head'
import Headerbar from '@/components/header'
import Script from 'next/script'
import Footer from '@/components/footer'
import React from 'react';
import Link from 'next/link'

export default function About() {

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
              <h2 className="title">About Us</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    About Us
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
    <section className="about-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 order-0 order-lg-2">
            <div className="about-img">
              <img src="default.png" alt="img" className="img-two" />
            </div>
          </div>
          <div className="col-lg-5">
            <div className="about-content">
              <div className="section-title">
                <span className="sub-title">who we are</span>
                <h2 className="title">
                  We are on a mission to make your journeys memorable!
                </h2>
              </div>
              <p>
                Enjoy the best curated travel experiences on the planet just for you.
              </p>
              <ul>
                <li>
                  <i className="flaticon-tick-1" />
                  Best ticket flight ticket deals
                </li>
                <li>
                  <i className="flaticon-tick-1" />
                  Wide range of activities to do on your travel
                </li>
                <li>
                  <i className="flaticon-tick-1" />
                  Plan your Itinerary with AI
                </li>
                <li>
                <i className="flaticon-tick-1" />
                  We have your best interests!
                </li>
              </ul>
              <Link href="/contact" className="btn">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* about-area-end */}
    {/* destination-area */}
    <section className="destination-area destination-bg">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="section-title">
              <span className="sub-title">Best Deals</span>
              <h2 className="title">Enjoy Your Top Destinations with the best Itinerary planner</h2>
            </div>
            <div className="destination-content">
              <p>
                Get informed ahead of your travels on the best AI curated itinerary planner
              </p>
              <ul>
                <li>
                  <div className="counter-item">
                    <div className="counter-content">
                      <h2 className="count">
                        <span className="odometer" data-count={5830} />100+
                      </h2>
                      <p>Happy Customers</p>
                    </div>
                    <div className="counter-icon">
                      <i className="flaticon-group" />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="counter-item">
                    <div className="counter-content">
                      <h2 className="count">
                        <span className="odometer" data-count={100} />100%
                      </h2>
                      <p>Guaranteed Satisfaction</p>
                    </div>
                    <div className="counter-icon">
                      <i className="flaticon-globe" />
                    </div>
                  </div>
                </li>
              </ul>
              <div className="content-bottom">
                <p>Discover the latest offers &amp; news and start planning</p>
                <Link href="https://account.travelpally.com/auth/register">Get Started</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* destination-area-end */}
    {/* service-area */}
    <section className="service-area service-style-two">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="section-title text-center mb-40">
              <span className="sub-title">Why Travelpally</span>
              <h2 className="title">We care more about you</h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-xl-4 col-lg-6 col-md-6">
            <div className="service-item">
              <div className="service-icon">
                <img src="assets/img/icon/service_icon01.png" alt="" />
              </div>
              <div className="service-content">
                <span></span>
                <h2 className="title">Pre-book ahead and pack your bags when ready</h2>
                <div className="service-list">
                  <ul>
                    <li>
                      Enjoy timely reminders and recommendations
                      <i className="flaticon-check-mark" />
                    </li>
                    <li>
                      Plan ahead for you and your friends and family
                      <i className="flaticon-check-mark" />
                    </li>
                    <li>
                      Full travel insurance coverage offers
                      <i className="flaticon-check-mark" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6">
            <div className="service-item">
              <div className="service-icon">
                <img src="assets/img/icon/service_icon02.png" alt="" />
              </div>
              <div className="service-content">
                <span></span>
                <h2 className="title">Cheap and rich with variety of options!</h2>
                <div className="service-list">
                  <ul>
                    <li>
                      Cheapest air ticket deals
                      <i className="flaticon-check-mark" />
                    </li>
                    <li>
                      Cheapest accomodation deals 
                      <i className="flaticon-check-mark" />
                    </li>
                    <li>
                      Cheap variety of itineraries on your vacation<i className="flaticon-check-mark" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6">
            <div className="service-item">
              <div className="service-icon">
                <img src="assets/img/icon/service_icon03.png" alt="" />
              </div>
              <div className="service-content">
                <span></span>
                <h2 className="title">Enjoy stress-free travel</h2>
                <div className="service-list">
                  <ul>
                    <li>
                      Travel stress-free by getting
                      <i className="flaticon-check-mark" />
                    </li>
                    <li>
                      Covered for flight modification{" "}
                      <i className="flaticon-check-mark" />
                    </li>
                    <li>
                      Cancellation, accident &amp; medical{" "}
                      <i className="flaticon-check-mark" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* service-area-end */}
    
  </main>
  {/* main-area-end */}


  {/* main-area-end */}

            <Script src="assets/js/main.js" strategy="afterInteractive" />
            <Footer />
            

  {/* JS here */}
</>
);
}
