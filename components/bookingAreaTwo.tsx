import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AutocompleteFrom from './autocompletefrom';
import AutocompleteTo from './autocompleteto';
import { returnAirport, stringCaster, numberCaster, returnCabin } from '@/utils/utils';
import { useRouter } from 'next/router'
import { searchAirport } from '@/utils/utils';
import ReactModal from 'react-modal';
import { ContextData } from '@/context/context';
import moment from 'moment-timezone';

export default function BookingAreaTwo(props: any) {

    const router = useRouter();

    const [departureDate, setDepartureDate] = useState(new Date);
    const [returnDate, setReturnDate] = useState(new Date());
    const [fromDestination, setFromDestination] = useState('');
    const [fromDestinationPh, setFromDestinationPh] = useState('From');
    const [fromDestinationId, setFromDestinationId] = useState('');
    let arr: any;
    const [fromData, setFromData] = useState(arr);
    const [toDestination, setToDestination] = useState('');
    const [toDestinationPh, setToDestinationPh] = useState('To');
    const [toDestinationId, setToDestinationId] = useState('');
    const [toData, setToData] = useState(arr);
    const [isOpenFrom, setIsOpenFrom] = useState(false);
    const [isOpenTo, setIsOpenTo] = useState(false);
    const [isSearched, setIsSearched] = useState(false);
    const [adult, setAdult] = useState(0);
    const [infant, setInfant] = useState(0);
    const [child, setChild] = useState(0);
    const [cabin, setCabin] = useState('ECONOMY');
    const [oneWay, setOneWay] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [url, setUrl] = useState('');
    const { tz } = useContext(ContextData);

    useEffect(() => {

        if (typeof window !== 'undefined' && window.localStorage && router.isReady) {
            const query = router.query;
            setIsSearched((query.fromDate)? true: false)
            setDepartureDate((query.fromDate)? moment(stringCaster(query.fromDate)).toDate() : new Date())
            setReturnDate((query.toDate)? moment(stringCaster(query.toDate)).toDate() : moment(stringCaster(query.fromDate)).toDate())
            setFromDestinationPh((query.fromId)? returnAirport(stringCaster(query.fromId)) : 'From')
            setFromDestinationId((query.fromId)? stringCaster(query.fromId) : '')
            setToDestinationPh((query.toId)? returnAirport(stringCaster(query.toId)) : 'To')
            setToDestinationId((query.toId)? stringCaster(query.toId) : '')
            setAdult((query.adult)? numberCaster(query.adult) : 0)
            setChild((query.child)? numberCaster(query.child) : 0)
            setInfant((query.infant)? numberCaster(query.infant) : 0)
            setCabin((query.cabin)? stringCaster(query.cabin) : 'ECONOMY')
            setOneWay((query.oneway)? numberCaster(query.oneway) : 0)
            // alert(moment(stringCaster(query.fromDate)))

        }

    }, [router.isReady])

    const findFlights = (e: any) => {
        props.reloadCallback(Math.random()+'')
        props.queryParamsCallback({ fromId: fromDestinationId, toId: toDestinationId, 
            fromDate: departureDate.toLocaleDateString('en-CA', {timeZone: tz}), toDate: (oneWay<1)? returnDate.toLocaleDateString('en-CA', {timeZone: tz}) : '',
            oneway: oneWay,
            adult: adult,
            child: child,
            infant: infant,
            cabin: cabin
        })
        router.push({
            pathname: '/flights',
            query: { fromId: fromDestinationId, toId: toDestinationId, 
                     fromDate: departureDate.toLocaleDateString('en-CA', {timeZone: tz}), toDate: (oneWay<1)? returnDate.toLocaleDateString('en-CA', {timeZone: tz}) : '',
                     oneway: oneWay,
                     adult: adult,
                     child: child,
                     infant: infant,
                     cabin: cabin
            }
        })
    }

    const handleAdult = (event: any) => {
        let v = event.target.value
        v = (v < 0)? 0 : v
        setAdult(v)
    }

    const handleChild = (event: any) => {
        let v = event.target.value
        v = (v < 0)? 0 : v
        setChild(v)
    }

    const handleInfant = (event: any) => {
        let v = event.target.value
        v = (v < 0)? 0 : v
        setInfant(v)
    }



    const handleFromChange = async (event: any) => {
        setFromDestination(event.target.value)
        if(event.target.value.length > 2) {
            // const res = await fetch(process.env.NEXT_PUBLIC_API_URL+'/flight/airports/lookup?location='+event.target.value)
            // const data = await res.json()
            const data = searchAirport(event.target.value)
            setFromData(data)
            setIsOpenFrom(true)
        } else {
            setIsOpenFrom(false)
        }
    };

    const handleToChange = async (event: any) => {
        setToDestination(event.target.value)
        if(event.target.value.length > 2) {
            // 
            const data = searchAirport(event.target.value)
            setToData(data)
            setIsOpenTo(true)
        } else {
            setIsOpenTo(false)
        }
    };

    const handleFromCallback = (childFromData: any) => {
        setFromDestinationId(childFromData.get('iata'))
        setFromDestination(childFromData.get('name'))
        setIsOpenFrom(false)
    }

    const handleToCallback = (childToData: any) => {
        setToDestinationId(childToData.get('iata'))
        setToDestination(childToData.get('name'))
        setIsOpenTo(false)
    }

    var pas: number = (adult * 1) + (child * 1) + (infant * 1);

    return (
        <>
            <div className="booking-area">
            <div className="container">
            <div className="row">
                <div className="col-lg-12">
                { !isSearched?
                <div className="booking-tag">
                    <ul>
                    {/* <li>
                        <Link href="booking-list.html">
                        <i className="flaticon-flight" />
                        My trips
                        </Link>
                    </li>
                    <li>
                        <Link href="booking-list.html">
                        <i className="flaticon-check" />
                        Check-in
                        </Link>
                    </li> */}
                    </ul>
                </div>
                :
                <div className="booking-tag"><br/><br/><br/></div>
                }
                <div className="booking-wrap">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button
                        className="nav-link active"
                        id="bOOKing-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#bOOKing-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="bOOKing-tab-pane"
                        aria-selected="true"
                        >
                        <i className="flaticon-flight" />
                        Search Flights
                        </button>
                    </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">

                    <div className="tab-pane fade show active"
                        id="bOOKing-tab-pane"
                        role="tabpanel"
                        aria-labelledby="bOOKing-tab"
                        tabIndex={0}>

                        <div className="row">
                        <div className="col-lg-12">
                            <div className="tab-content-wrap">
                            <div className="content-top">
                            </div>
                            <form action="#" className="booking-form">
                                <ul>
                                <li>
                                    <div className="form-grp">
                                    <input type="text" placeholder={fromDestinationPh} value={fromDestination} onChange={handleFromChange} />
                                    </div>
                                    {isOpenFrom && <AutocompleteFrom searchData={fromData} parentFromCallback={handleFromCallback} />}
                                </li>
                                <li>
                                    <div className="form-grp">
                                    <input type="text" placeholder={toDestinationPh} value={toDestination} onChange={handleToChange} />
                                    <button className="exchange-icon">
                                        <i className="flaticon-exchange-1" />
                                    </button>
                                    </div>
                                    {isOpenTo && <AutocompleteTo searchData={toData} parentToCallback={handleToCallback} />}
                                </li>
                                <li>
                                    <div className="form-grp">
                                    <ul>
                                        <li>
                                        <label htmlFor="shortBy">Departure Date </label>
                                        <DatePicker dateFormat="yyyy-MM-dd" selected={departureDate} placeholderText="Select Date" minDate={new Date()} onChange={(date: any) => setDepartureDate(date)} />
                                        </li>
                                        {(oneWay < 1)?
                                        <li>
                                        <label htmlFor="shortBy">Return Date</label>
                                        <DatePicker dateFormat="yyyy-MM-dd" selected={returnDate} placeholderText="Select Date" minDate={departureDate} onChange={(date: any) => setReturnDate(date)} />
                                        </li>
                                        :
                                        <li></li>
                                        }
                                    </ul>
                                    </div>
                                </li>
                                <li onClick={() => setModalOpen(true)}>
                                    <div className="form-grp economy">
                                    <label>{ pas } Passenger(s)</label>
                                    <label>{returnCabin(cabin)}</label>
                                    </div>
                                </li>
                                </ul>
                                <ReactModal isOpen={modalOpen} className={'booking-form'} shouldCloseOnEsc={true} style={{
                                    overlay: {
                                        position: 'absolute',
                                        backgroundColor: '#f8f3e7',
                                        width: '40%',
                                        height: '25%',
                                        top: '45%',
                                        left: '55%' 
                                    }, 
                                    content: {
                                        paddingTop: '3%'
                                    }
                                    }} contentElement={
                                        (props, children) => <div {...props}>{children}</div>
                                      /* Custom Content element. */}>
                                        <ul style={{ borderBottom: '1px solid #dedcd7' }}>
                                            <li>
                                            <div className="form-grp">
                                                <label htmlFor="text">Adult(+12)</label>
                                                <input type="number" value={adult} onChange={handleAdult} />
                                            </div>
                                            </li>
                                            <li>
                                            <div className="form-grp">
                                                <label htmlFor="text">Child(2-12)</label>
                                                <input type="number" value={child} onChange={handleChild} />
                                            </div>
                                            </li>
                                            <li>
                                            <div className="form-grp">
                                                <label htmlFor="text">Infant({'<'}2)</label>
                                                <input type="number" value={infant} onChange={handleInfant} />
                                            </div>
                                            </li>
                                        </ul>
                                        <ul>
                                        <li>
                                            <div className="form-grp">
                                                <label htmlFor="text">Cabin</label>
                                                <select onChange={(e: any) => setCabin(e.target.value)}>
                                                    <option value={'ECONOMY'}>Economy</option>
                                                    <option value={'PREMIUM_ECONOMY'}>Premium Economy</option>
                                                    <option value={'BUSINESS'}>Business</option>
                                                    <option value={'FIRST'}>First Class</option>
                                                </select>
                                            </div>
                                            </li>
                                            <li>
                                            <div style={{ float:'right', marginTop:'25%' }} onClick={() => setModalOpen(false)}>
                                             X close
                                            </div>
                                        
                                            </li>
                                        </ul>
                                        
                                        
                                    </ReactModal>
                            </form>
                            <div className="content-bottom">

                            <div className="form-check" style={{ marginRight:'2%' }}>
                                            <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value="one-way"
                                            id="one-way"
                                            checked={oneWay == 1}
                                            onClick={() => setOneWay(oneWay==1?0:1)}
                                            />
                                            <label className="form-check-label" htmlFor="refOne">
                                            One Way
                                            </label>
                                        </div>

                                <button type="button" disabled={(pas > 0 && fromDestinationId !== '' && toDestinationId !== '')? false : true} className="btn" onClick={findFlights}>
                                Show Flights <i className="flaticon-flight-1" />
                                </button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="tab-pane fade"
                        id="trips-tab-pane"
                        role="tabpanel"
                        aria-labelledby="trips-tab"
                        tabIndex={0}>

                        <div className="row">
                        <div className="col-lg-12">
                            <div className="tab-content-wrap">
                            <div className="content-top">
                            </div>
                            <form action="#" className="booking-form">
                                {/* to do replace form */}
                            </form>
                            <div className="content-bottom">

                                <button type="button" disabled={(pas > 0 && fromDestinationId !== '')? false : true} className="btn" onClick={findFlights}>
                                Show Flights <i className="flaticon-flight-1" />
                                </button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div
                        className="tab-pane fade"
                        id="check-tab-pane"
                        role="tabpanel"
                        aria-labelledby="check-tab"
                        tabIndex={0}
                    >
                        <div className="row">
                        <div className="col-lg-12">
                            <div className="tab-content-wrap">
                            <div className="content-top">
                                <ul>
                                <li>Flights</li>
                                <li>
                                    <span>Just from $12</span>Geair Stopover
                                </li>
                                </ul>
                            </div>
                            <form action="#" className="booking-form">
                                <ul>
                                <li>
                                    <div className="form-grp">
                                    <input type="text" placeholder="From" />
                                    </div>
                                </li>
                                <li>
                                    <div className="form-grp">
                                    <input type="text" placeholder="To" />
                                    <button className="exchange-icon">
                                        <i className="flaticon-exchange-1" />
                                    </button>
                                    </div>
                                </li>
                                <li>
                                    <div className="form-grp select">
                                    <label htmlFor="shortByThree">Trip</label>
                                    <select
                                        id="shortByThree"
                                        name="select"
                                        className="form-select"
                                        aria-label="Default select example"
                                    >
                                        <option value="">Tour type</option>
                                        <option>Adventure Travel</option>
                                        <option>Family Tours</option>
                                        <option>Newest Item</option>
                                        <option>Nature &amp; wildlife</option>
                                    </select>
                                    </div>
                                </li>
                                <li>
                                    <div className="form-grp date">
                                    <ul>
                                        <li>
                                        <label htmlFor="shortBy">Depart</label>
                                        <input
                                            type="text"
                                            className="date"
                                            placeholder="Select Date"
                                        />
                                        </li>
                                        <li>
                                        <label htmlFor="shortBy">Return</label>
                                        <input
                                            type="text"
                                            className="date"
                                            placeholder="Select Date"
                                        />
                                        </li>
                                    </ul>
                                    </div>
                                </li>
                                <li>
                                    <div className="form-grp economy">
                                    <label htmlFor="textThree">
                                        Passenger/ Class
                                    </label>
                                    <input
                                        type="text"
                                        id="textThree"
                                        placeholder="1 Passenger, Economy"
                                    />
                                    </div>
                                </li>
                                </ul>
                            </form>
                            <div className="content-bottom">
                                <Link href="booking-details.html" className="promo-code">
                                + Add Promo code
                                </Link>
                                <Link href="booking-details.html" className="btn">
                                Show Flights <i className="flaticon-flight-1" />
                                </Link>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                   
                    </div>
                </div>
                </div>
            </div>
            </div>
            </div>
            {/* booking-area-end */}
        </>
    )
}