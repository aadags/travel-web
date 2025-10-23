import { ContextData } from '@/context/context';
import Link from 'next/link'
import React, {  useContext, useState } from 'react';
import { localCurrency } from '@/utils/utils';
import Modal from 'react-modal';
import { useRouter } from 'next/router';

export default function Headerbar() {

  const router = useRouter();

  const { location } = useContext(ContextData);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const [bookingNumber, setBookingNumber] = useState('');
  const [lastName, setLastName] = useState('');
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '40%',
    },
  };

  function openModal() {
    setIsOpen(true);
    setError('')
  }

  function closeModal() {
    setIsOpen(false);
    setError('')
  }

  function loadBooking()
  {
      const cred: any = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },   
          body: JSON.stringify({
              booking_number: bookingNumber,
              last_name: lastName
          })
      }

      fetch('/api/trip/get', cred)
          .then((res) => res.json())
          .then((data) => {
          
              if(data.status) {
                  localStorage.setItem("mytrip", JSON.stringify(data.data));
                  router.push({
                    pathname: '/mytrip'
                  })
              } else {
                setError('Trip not found')
              }
      }).catch(function(responseError){
          setError('Trip not found')
      });

  }

    return (
      <>
        {/* Scroll-top */}
        <button className="scroll-top scroll-to-target" data-target="html">
          <i className="fas fa-angle-up" />
        </button>
        {/* Scroll-top-end*/}
        {/* header-area */}
        <header>
          <div className="header-top">
            <div className="container custom-container">
              <div className="row">
                <div className="col-xl-4">
                  <div className="header-top-left">
                    {/* <Link href="#">
                      <i className="fa-solid fa-plane" /> No special annoucement at this time!
                    </Link> */}
                  </div>
                </div>
                <div className="col-xl-8">
                  <div className="header-top-right">
                    <ul>
                      
                      <li>
                        <Link href="#">
                          <i className="fa-solid fa-location-pin" />
                          {location.countryCode}
                        </Link>
                      </li>
                      <li>
                        <Link href="contact.html">
                          <i className="fa-solid fa-dollar-sign" />
                          {localCurrency(location)}
                        </Link>
                      </li>
                      <li>
                        <Link href="booking-list.html">
                          <i className="fa-solid fa-earth-asia" />
                          EN - INT
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="sticky-header" className="menu-area transparent-header">
            <div className="container custom-container">
              <div className="row">
                <div className="col-12">
                  <div className="mobile-nav-toggler">
                    <i className="fas fa-bars" />
                  </div>
                  <div className="menu-wrap">
                    <nav className="menu-nav">
                      <div className="logo">
                        <Link href="/">
                          <img src="./travelpally-white.png" alt="" />
                        </Link>
                      </div>
                      <div className="navbar-wrap main-menu d-none d-lg-flex">
                        <ul className="navigation">
                        <li className="">
                            <Link href="/claudia">Claudia AI</Link>
                          </li>

                        <li className="">
                            <Link href="/about">About Us</Link>
                          </li>
                          
                          <li className="">
                            <Link href="/contact">Contact Us</Link>
                          </li>
                        </ul>
                      </div>
                      <div className="header-action d-none d-md-block">
                        <ul>
                          
                          <li className="header-btn">
                            {/* <button className="btn" onClick={openModal}>
                              Manage My Trip
                            </button> */}
                            <Link className="btn" href="https://account.travelpally.com/auth/register">
                              Get Started
                            </Link>
                          </li>
                          <li className="header-btn sign-in">
                            <Link href="https://account.travelpally.com/auth/login" className="btn">
                              Login
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </nav>
                  </div>
                  {/* Mobile Menu  */}
                  <div className="mobile-menu">
                    <nav className="menu-box">
                      <div className="close-btn">
                        <i className="fa-solid fa-xmark" />
                      </div>
                      <div className="nav-logo">
                        <Link href="index.html">
                          <img src="./travelpally-white.png" alt="" title="" />
                        </Link>
                      </div>
                      <div className="menu-outer">
                        {/*Here Menu Will Come Automatically Via Javascript / Same Menu as in Header*/}
                      </div>
                      <div className="social-links">
                        <ul className="clearfix">
                          <li>
                            <Link href="#">
                              <span className="fab fa-twitter" />
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <span className="fab fa-facebook-f" />
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <span className="fab fa-pinterest-p" />
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <span className="fab fa-instagram" />
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <span className="fab fa-youtube" />
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </nav>
                  </div>
                  <div className="menu-backdrop" />
                  {/* End Mobile Menu */}
                </div>
              </div>
            </div>
          </div>
          <Modal
            isOpen={modalIsOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className="booking-details-wrap">
                <h2 className="title">Manage My Trip <Link href="#" onClick={closeModal}><span style={{ float:'right' }}>x</span></Link></h2><br/>
                <form>
                <div className="row">
                                <div className="col-md-12">
                                    <div className="form-grp">
                                        <div className="form">
                                            <input type="text" name="bn" placeholder="Booking Number" onChange={(e) => setBookingNumber(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-grp">
                                        <div className="form">
                                            <input type="text" name="ln" placeholder="Last Name"  onChange={(e) => setLastName(e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                </form>
                <br/>
                <button className="btn" onClick={loadBooking}>Get Trip</button> <span style={{color:'red'}}>{error}</span>
            </div>
          </Modal>
        </header>
      </>
    )
}