import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { stringCaster, truncateString, searchAirport, nearestCity, returnCity, returnAirportData } from '@/utils/utils';
import Image from 'next/image';
import { ContextData } from '@/context/context';
import moment from 'moment';



  
export default function FlightInspiration(props: any) {

    const router = useRouter();
    const [readyQuery, setReadyQuery] = useState(false);
    const [fd, setFd] = useState(Array<{origin: string, destination: string, price: any, departureDate: any, returnDate: any }>());
    const [curr, setCurr] = useState('');
    const { location } = useContext(ContextData);


    useEffect(() => {
        if (router.isReady) {

            const data = searchAirport(location.country)
            const city = nearestCity(location.lat, location.lon, data)
            const day = moment().add(1,'days').format('YYYY-MM-DD');
            
                const cred: any = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },   
                }
    
                fetch(process.env.NEXT_PUBLIC_API_URL+'/flight/inspiration?cityCode='+city+'&date='+day, cred)
                    .then((res) => res.json())
                    .then((data) => {
                        
                        if(data.status) {
                            setFd(data.result.data)
                            setCurr(Object.keys(data.result.dictionaries.currencies)[0])
                            setReadyQuery(true)
                        }
                }).catch(function(responseError){
                    
                });
        }

      }, [router.isReady]);

      

    return (
        <>
             {/* flight-offer-area */}
      <section className="flight-offer-area">
      {(!readyQuery)?
                <div className="container">
                    <div className="row align-items-center mb-35">
                        <div className="col-md-12">
                            <Skeleton height={20} className="skele" /><br/>
                            <Skeleton height={20} className="skele" />
                        </div>
                    </div>
                </div>
                :
        <div className="container">
          <div className="row align-items-center mb-35">
            <div className="col-md-8">
              <div className="section-title">
                <span className="sub-title">Flight Offers</span>
                <h2 className="title">Enjoy the best deals</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-10">
              <div className="flight-offer-item">
                <div className="flight-offer-thumb">
                <Image src={process.env.NEXT_PUBLIC_HOTEL_IMG_URL+'/city/'+ returnCity(fd[0].destination) +'?name='+ returnCity(fd[0].destination) +'&location='+ returnAirportData(fd[0].destination).get('latitude') +','+ returnAirportData(fd[0].destination).get('longitude') +'&w=800'} width={585} height={472} alt="" />
                </div>
                <div className="flight-offer-content">
                  <h2 className="title">{ returnCity(fd[0].origin) } to { returnCity(fd[0].destination) }</h2>
                  <span>{moment(fd[0].departureDate).format('DD MMM YYYY')}</span>
                  <p>Flights from</p>
                  <h4 className="price">{ fd[0].price.total +' '+ curr }</h4>
                </div>
                <div className="overlay-content">
                  
                  <div className="content-bottom">
                    <a href={"/flights?fromId="+ fd[0].origin+ "&toId="+ fd[0].destination +"&fromDate="+ moment(fd[0].departureDate).format('YYYY-MM-DD') +"&toDate="+ moment(fd[0].returnDate).format('YYYY-MM-DD') +"&adult=1&child=0&infant=0&cabin=ECONOMY"} className="btn">
                      See Flights
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-10">
              <div className="row">

                {fd.slice(1, 5).map((f: any, k: any) => (
                <div key={k} className="col-sm-6">
                  <div className="flight-offer-item offer-item-two">
                    <div className="flight-offer-thumb">
                    <Image src={process.env.NEXT_PUBLIC_HOTEL_IMG_URL+'/city/'+ returnCity(f.destination) +'?name='+ returnCity(f.destination) +'&location='+ returnAirportData(f.destination).get('latitude') +','+ returnAirportData(f.destination).get('longitude') +'&w=800'} width={248} height={144} alt="" />
                    </div>
                    <div className="flight-offer-content">
                      <h2 className="title">{ returnCity(f.origin) } to { returnCity(f.destination) }</h2>
                      <span>{moment(f.departureDate).format('DD MMM YYYY')}</span>
                      <p>Flights from</p>
                      <h4 className="price">{ f.price.total +' '+ curr }</h4>
                    </div>
                    <div className="overlay-content">
                      <div className="content-bottom">
                      <a href={"/flights?fromId="+ f.origin+ "&toId="+ f.destination +"&fromDate="+ moment(f.departureDate).format('YYYY-MM-DD') +"&toDate="+ moment(f.returnDate).format('YYYY-MM-DD') +"&adult=1&child=0&infant=0&cabin=ECONOMY"} className="btn">
                          See Flights
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                ))}

              </div>
            </div>
          </div>
        </div>
        }
      </section>
      {/* flight-offer-area-end */}
        </>
    )
}