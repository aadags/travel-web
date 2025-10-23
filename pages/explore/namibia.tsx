
import Head from 'next/head'
import Headerbar from '@/components/header'
import Script from 'next/script'
import Footer from '@/components/footer'


export default function NamibiaExplore() {

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
        <div className="row">
          <div className="col-lg-12 order-0 order-lg-2">
            <div data-vi-partner-id="U00481636" data-vi-widget-ref="W-a5053668-ec93-40bb-ac19-cf6f8995bd71" ></div>
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
            <Script async src="https://www.viator.com/orion/partner/widget.js" />


            <Footer />
            

  {/* JS here */}
</>
);
}
