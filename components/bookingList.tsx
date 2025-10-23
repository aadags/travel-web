import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import FlightItinerary from './flightItinerary';
import { sortFastest, sortCheapest, sortEarliest, sortLatest, getUniqueAirlines } from '@/utils/sort';
import { paginator, ucCountryFirstCase } from '@/utils/utils';
import { sortAirline, sortStops, sortTimeRange } from '../utils/sort';
import FlightInspiration from '@/components/flightInspiration';
import { ContextData } from '@/context/context';

export default function BookingList(props: any) {

    const router = useRouter();
    const query = router.query;
    const [readyQuery, setReadyQuery] = useState(false);
    const [isBlank, setBlank] = useState(false);
    const { setLocation } = useContext(ContextData);

    let dic ={
        carriers: [],
        locations: [],
        aircrafts: [],
        currencies: []
    }

    const [dictionaries, setDictionaries] = useState(dic);
    const [flights, setFlights] = useState([]);
    const [showLoadBtn, setShowLoadBtn] = useState(true);
    const [uniqueAirlines, setUniqueAirlines] = useState([]);
    const [perPage, setPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const [trigger, setTrigger] = useState(0);
    const [airlineFilter, setAirlineFilter] = useState([]);
    const [stopFilter, setStopFilter] = useState([]);
    const [timeFilter, setTimeFilter] = useState([]);
    const [listFilter, setListFilter] = useState('C');

    const onFilterCheapest = async (e: any) => {
        setListFilter('C')
        setTrigger(Math.random())
    }
    const onFilterFastest = async (e: any) => {
        setListFilter('F')
        setTrigger(Math.random())
    }
    const onFilterEarliest = async (e: any) => {
        setListFilter('E')
        setTrigger(Math.random())
    }
    const onFilterLatest = async (e: any) => {
        setListFilter('L')
        setTrigger(Math.random())
    }
    const OnAirlineFilter = (e: any) => {
        const checked = e.target.checked;
        const val = e.target.value;
        if (checked) {
            let a: any = airlineFilter
            a.push(val)
            setAirlineFilter(a)
            setTrigger(Math.random())
        } else {
            let a = airlineFilter.filter(function (a) {
                return a !== val;
            });
            setAirlineFilter(a)
            setTrigger(Math.random())
        }

    }
    const OnStopFilter = (e: any) => {
        const checked = e.target.checked;
        const val = e.target.value;
        if (checked) {
            let a: any = stopFilter
            a.push(val)
            setStopFilter(a)
            setTrigger(Math.random())
        } else {
            let a = stopFilter.filter(function (a) {
                return a !== val;
            });
            setStopFilter(a)
            setTrigger(Math.random())
        }

    }
    const OnTimeFilter = (e: any) => {
        const checked = e.target.checked;
        const val = e.target.value;
        if (checked) {
            let a: any = timeFilter
            a.push(val)
            setTimeFilter(a)
            setTrigger(Math.random())
        } else {
            let a = timeFilter.filter(function (a) {
                return a !== val;
            });
            setTimeFilter(a)
            setTrigger(Math.random())
        }

    }

    function loadMore() {
        setPerPage(perPage+10)
        setShowLoadBtn(perPage >= total)
        setTrigger(Math.random())
    }

    function filterPage(flights: any){

        if(airlineFilter.length > 0){
            flights = sortAirline(flights, airlineFilter)
        }

        if(stopFilter.length > 0){
            flights = sortStops(flights, stopFilter)
        }

        if(timeFilter.length > 0){
            flights = sortTimeRange(flights, timeFilter)
        }

        if(listFilter == 'F')
        {
            flights = sortFastest(flights)
        }
        else if(listFilter == 'E')
        {
            flights = sortEarliest(flights)
        }
        else if(listFilter == 'L')
        {
            flights = sortLatest(flights)
        } else {
            flights = sortCheapest(flights)
        }

        flights = paginator(flights, 1, perPage)

        return flights

    }

    useEffect(() => {

          setReadyQuery(false)
          const cred: any = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },   
            }

            if(!query.fromId)
            {
                const loc = JSON.parse(localStorage.getItem("x-lk") ?? '{}');
                setLocation(loc);
                setBlank(true)
            } else {
            
                const loc = JSON.parse(localStorage.getItem("x-lk") ?? '{}');
                setLocation(loc);
                setBlank(false)
                const newQuery = (props.queryParams)? props.queryParams : query;
                const q = '?origin='+newQuery.fromId
                        +'&destination='+newQuery.toId
                        +'&datefrom='+newQuery.fromDate
                        +'&dateto='+newQuery.toDate
                        +'&adult='+newQuery.adult
                        +'&child='+newQuery.child
                        +'&infant='+newQuery.infant
                        +'&cabin='+newQuery.cabin

                const url = (newQuery.oneway == '1')? '/flight/offers/oneway' : '/flight/offers/return'
                
                fetch(process.env.NEXT_PUBLIC_API_URL+ url + q, cred)
                    .then((res) => res.json())
                    .then((data) => {
                        setFlights(data.result.data)
                        setDictionaries(data.result.dictionaries)
                        setUniqueAirlines(getUniqueAirlines(data.result.data))
                        if(data.status) {
                            setReadyQuery(true)
                        }
                }).catch(function(responseError){
                    
                });
            }
    }, [props.reload])


    if(isBlank) {

        return (
            <>
                <div className="booking-list-area">

                    <div className="container">
                    <div className="row justify-content-center">

                        <div className="col-100">
                            <FlightInspiration />
                        </div>
                    </div>

                    </div>
                </div>
            </>
        )

    } else if(!readyQuery) {
         return (
            <>
                <div className="booking-list-area">

                    <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-27 order-2 order-xl-0">
                        <aside className="booking-sidebar">
                            <Skeleton height={20} className="skele" /><br/>
                            <Skeleton height={20} className="skele" />
                        </aside>
                        </div>
                        <div className="col-73">
                        <Skeleton height={20} className='skele' /><br/>
                        <Skeleton height={20} className="skele" />
                        </div>
                    </div>

                    </div>
                </div>
            </>
        )
    }

        return (
        <>
            <div className="booking-list-area">

                        <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-27 order-2 order-xl-0">
                            <aside className="booking-sidebar">
                                <div className="widget filters">
                                <h2 className="title">filters</h2>
                                
                                <div className="widget">
                                    <ul className="airlines-cat-list">
                                        <li>
                                        <div className="form-check">
                                            <input
                                            className="form-check-input"
                                            type="radio"
                                            value="cheapest"
                                            id="refOne"
                                            name="general"
                                            onChange={onFilterCheapest} 
                                            checked={listFilter==='C'}
                                            />
                                            <label className="form-check-label" htmlFor="refOne">
                                            Cheapest
                                            </label>
                                        </div>
                                        </li>
                                        <li>
                                        <div className="form-check">
                                            <input
                                            className="form-check-input"
                                            type="radio"
                                            value="fastest"
                                            id="refTwo"
                                            name="general"
                                            onChange={onFilterFastest}
                                            checked={listFilter==='F'}
                                            />
                                            <label className="form-check-label" htmlFor="refTwo">
                                            Fastest
                                            </label>
                                        </div>
                                        </li>
                                        <li>
                                        <div className="form-check">
                                            <input
                                            className="form-check-input"
                                            type="radio"
                                            value="earliest"
                                            id="refThree"
                                            name="general"
                                            onChange={onFilterEarliest}
                                            checked={listFilter==='E'}
                                            />
                                            <label className="form-check-label" htmlFor="refThree">
                                            Earliest
                                            </label>
                                        </div>
                                        </li>
                                        <li>
                                        <div className="form-check">
                                            <input
                                            className="form-check-input"
                                            type="radio"
                                            value="latest"
                                            id="refFour"
                                            name="general"
                                            onChange={onFilterLatest}
                                            checked={listFilter==='L'}
                                            />
                                            <label className="form-check-label" htmlFor="refFour">
                                            Latest
                                            </label>
                                        </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="widget">
                                    <h2 className="widget-title">Stops (To & Fro)</h2>
                                    <ul className="airlines-cat-list">
                                        <li>
                                        <div className="form-check">
                                            <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value="0"
                                            id="stopOne"
                                            name="tt"
                                            onClick={OnStopFilter}
                                            />
                                            <label className="form-check-label" htmlFor="stopOne">
                                            Direct Flight
                                            </label>
                                        </div>
                                        </li>
                                        <li>
                                        <div className="form-check">
                                            <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value="1"
                                            id="stopTwo"
                                            name="ty"
                                            onClick={OnStopFilter}
                                            />
                                            <label className="form-check-label" htmlFor="stopTwo">
                                            1 Stop
                                            </label>
                                        </div>
                                        </li>
                                        <li>
                                        <div className="form-check">
                                            <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value="2"
                                            id="stopThree"
                                            name="tu"
                                            onClick={OnStopFilter}
                                            />
                                            <label className="form-check-label" htmlFor="stopThree">
                                            2 Stops
                                            </label>
                                        </div>
                                        </li>
                                        <li>
                                        <div className="form-check">
                                            <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value="3"
                                            id="stopFour"
                                            name="tu"
                                            onClick={OnStopFilter}
                                            />
                                            <label className="form-check-label" htmlFor="stopFour">
                                            2+ Stops
                                            </label>
                                        </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="widget">
                                <h2 className="widget-title">Airlines</h2>
                                <ul className="airlines-cat-list">
                                    {uniqueAirlines.map((airline: any) => (
                                    <li key={airline}>
                                    <div className="form-check">
                                        <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={airline}
                                        id={'air-'+airline}
                                        onClick={OnAirlineFilter}
                                        />
                                        <label className="form-check-label" htmlFor={'air-'+airline}>
                                        {ucCountryFirstCase(dictionaries.carriers[airline])}
                                        </label>
                                    </div>
                                    </li>
                                    ))}
                                </ul>
                                </div>
                                
                                <div className="widget">
                                <h2 className="widget-title">Departure Time</h2>
                                <ul className="airlines-cat-list">
                                    <li>
                                        <div className="form-check">
                                            <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value="0"
                                            id="timeOne"
                                            name="rt"
                                            onClick={OnTimeFilter}
                                            />
                                            <label className="form-check-label" htmlFor="timeOne">
                                            <i className="flaticon-sunrise" /> 00:00 am - 05:59 am
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check">
                                            <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value="1"
                                            id="timeTwo"
                                            name="rt"
                                            onClick={OnTimeFilter}
                                            />
                                            <label className="form-check-label" htmlFor="timeTwo">
                                            <i className="flaticon-sunny" /> 06:00 am - 11:59 am
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check">
                                            <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value="2"
                                            id="timeThree"
                                            name="rt"
                                            onClick={OnTimeFilter}
                                            />
                                            <label className="form-check-label" htmlFor="timeThree">
                                            <i className="flaticon-sunset" /> 12:00 pm - 05:59 pm
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check">
                                            <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value="3"
                                            id="timeFour"
                                            name="rt"
                                            onClick={OnTimeFilter}
                                            />
                                            <label className="form-check-label" htmlFor="timeFour">
                                            <i className="flaticon-crescent-moon" /> 06:00 pm - 11:59 pm
                                            </label>
                                        </div>
                                    </li>
                                </ul>
                                </div> 
                               
                                </div>
                            </aside>
                            </div>
                            <div className="col-73">

                            {filterPage(flights).map((flight: any) => (

                                <FlightItinerary key={flight.id} trigger={trigger} dictionaries={dictionaries} flight={flight} oneway={query.oneway} />

                            ))}

                            {showLoadBtn && <button className="btn" onClick={loadMore}>Load More <i className="flaticon-load-cursor"/></button>}

                            </div>
                        </div>
                </div>

            </div>

            
        </>
        )
}