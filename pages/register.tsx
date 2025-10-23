
import Head from 'next/head'
import Headerbar from '@/components/header'
import Script from 'next/script'
import Footer from '@/components/footer'


export default function Register() {

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
              <h2 className="title">Register</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item active" aria-current="page">
                    Let&rsquo;s get you started
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
          <div className="col-lg-5 order-0 order-lg-2">
            <div className="">
              <img
                src="assets/img/claudia.png"
                width="20%"
                alt="img"
                className="img-one"
              />
            </div>
            <div className="about-content">
              <div className="section-title">
                <span className="sub-title">welcome</span>
                <p>
                  My name is Claudia
                </p>
                <p>
                  I will be assisting you with your travel needs from here onwards...
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
          <div className="contact-form">
            <form action="#">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-grp">
                    <input type="text" name="" placeholder="Your First Name *" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-grp">
                    <input type="text" placeholder="Your Last Name *" />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-grp">
                    <input type="email" placeholder="Your Email *" />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-grp">
                    <input type="text" placeholder="Your Phone Number *" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-grp">
                    <input type="password" placeholder="Password" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-grp">
                    <input type="password" placeholder="Confirm Password" />
                  </div>
                </div>
              </div>
              <div className="submit-btn text-center">
                <button type="submit" className="btn">
                  Register
                </button>
              </div>
            </form>
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
