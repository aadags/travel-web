
import Head from 'next/head'
import Headerbar from '@/components/header'
import Script from 'next/script'
import Footer from '@/components/footer'


export default function ClaudiaPage() {

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
              <h2 className="title">Meet Claudia</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item active" aria-current="page">
                    Your AI travel Assistant
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
        <div className="row">
          <div className="col-lg-7 order-0 order-lg-2">
            <div className="about-img">
              <img
                src="assets/img/home_ai.jpeg"
                height="90%"
                alt="img"
                className="img-one"
              />
            </div>
          </div>
          <div className="col-lg-5">
            <div className="about-content">
              <div className="section-title">
                <span className="sub-title">who am I</span>
                <h2 className="title">
                  My name is Claudia
                </h2>
              </div>
              <p>
                I am an AI travel assistant. I will be managing your travel bookings and itineraries for you.
              </p>
              <ul>
                <li>
                  <i className="flaticon-tick-1" />
                  Scouting for best prices
                </li>
                <li>
                  <i className="flaticon-tick-1" />
                  Interactive communication and notification
                </li>
                <li>
                  <i className="flaticon-tick-1" />
                  Personalized experience just for you
                </li>
              </ul>
            </div>
            <div className="faq-content">
              <div className="section-title">
                <span className="sub-title">Frequently Asked Questions</span>
                <h2 className="title">Most Asked Questions</h2>
              </div>
              <br/>
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      How can I use Claudia? 
                      <span className="dot" />
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <p>
                        You need an account to enjoy all my functionalities. You can enjoy my functionalities on web and mobile. For better accessibility I will recommend you install the &ldquo;travelpally&rdquo; mobile app from your app store. 
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Can you make travel recommendations? 
                      <span className="dot" />
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <p>
                        Yes, AI is the core of my existence and that means I have access to enough information to make the right travel recommendations for you.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Can you help me plan and book my holiday trip from start to finish?
                      <span className="dot" />
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <p>
                        I am here to help your plan your itineraries and provide you a seamless booking process.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    
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

            <Footer />
            

  {/* JS here */}
</>
);
}
