import Script from 'next/script'
import Link from 'next/link'

export default function Footer() {
    return (
      <>
        <footer>
            <div className="footer-area footer-bg">
              <div className="footer-top">
                <div className="container">
                  <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-6">
                      <div className="footer-widget">
                        <div className="footer-logo">
                          <Link href="/">
                          <img src="./travelpally-white.png" alt="" />
                          </Link>
                        </div>
                        <div className="footer-content">
                          <p>
                            ...Make your journey memorable
                          </p>
                          <ul className="footer-social">
                            <li>
                              <Link href="#">
                                <i className="fa-brands fa-facebook-f" />
                              </Link>
                            </li>
                            <li>
                              <Link href="#">
                                <i className="fa-brands fa-twitter" />
                              </Link>
                            </li>
                            <li>
                              <Link href="#">
                                <i className="fa-brands fa-instagram" />
                              </Link>
                            </li>
                            <li>
                              <Link href="#">
                                <i className="fa-brands fa-linkedin-in" />
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-xl-4 col-lg-4 col-sm-4">
                      <div className="footer-widget privacy">
                        <div className="fw-title">
                          <h4 className="title">Links</h4>
                        </div>
                        <div className="fw-link">
                          <ul>
                            <li>
                              <Link href="/privacypolicy">Privacy Policy</Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-sm-8">
                      <div className="footer-widget">
                        <div className="fw-title">
                          <h4 className="title">Contacts</h4>
                        </div>
                        <div className="footer-contact">
                          <p>7404 King George Blvd., Suite 200, Surrey, British Columbia, V3W 1N6, Canada</p>
                          <h2 className="title">
                            <Link href="#">+1 250 900 6417</Link>
                          </h2>
                          <Link href="#">contact@travelpally.com</Link>
                         
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="footer-bottom">
                <div className="container">
                  <div className="row align-items-center">
                    <div className="col-lg-6">
                      <div className="copyright-text">
                        <p>
                          Copyright © 2023.All Rights Reserved By <span>PallyTech Co.</span>
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="cart-img text-end">
                        {/* <img src="assets/img/images/cart.png" alt="" /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
          <Script src="assets/js/main.js" strategy="afterInteractive" />
      </>
   )
}