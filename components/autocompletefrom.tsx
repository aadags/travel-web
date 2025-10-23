import React, { useState } from 'react';
import { ucAirportFirstCase, ucCountryFirstCase } from '@/utils/utils';


  
export default function AutocompleteFrom(props: any) {

    function selectAirport(airport: any){
        props.parentFromCallback(airport);
    }
    const airports = (props.searchData) ? props.searchData : {};

    return (
        <>
            <div className="autocomplete">
            { props.searchData ?
                airports.map((airport: any) => (
                    <div key={airport.get('id')} className="autocomplete-items autocomplete-active" onClick={() => selectAirport(airport)}>
                        <div>{airport.get('name')} ({airport.get('iata')})<br/>{airport.get('country')}</div>
                    </div>
                ))
                    :
                <div></div>
            }
            </div>
        </>
    )
}