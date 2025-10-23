import Backbone from "backbone";
import _ from "underscore";
const airportsJSON = require('../airports/airports.json');
const airlinesJSON = require('../airports/airlines.json');
const airports = new Backbone.Collection(airportsJSON);
const airlines = new Backbone.Collection(airlinesJSON);


export function ucAirportFirstCase(data: string) {

    return (data && data.charAt(0))? data.toLowerCase().split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') + ' Airport' : '';

}

export function ucCountryFirstCase(data: string) {

    return data.toLowerCase().split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

}

export function stringCaster(data: any) {

    return data as string;

}

export function numberCaster(data: any) {

    return data as number;

}

export function calculateTime(minutes: number) {

    return Math.floor(minutes / 60) + 'hrs ' + (minutes % 60)+'min'

}

export function returnAirportLocation(icode: string) {
        airports.comparator = 'name';
        let a = airports.findWhere({ iata: icode })
        return a.get('name').replace("International", "Intl")+ ' ('+a.get('country')+')';

}

export function returnCity(icode: string) {
    airports.comparator = 'city';
    let a = airports.findWhere({ iata: icode })
    return a.get('city');
}

export function returnCityCountry(icode: string) {
    airports.comparator = 'city';
    let a = airports.findWhere({ iata: icode })
    return a.get('city')+', '+a.get('country');
}

export function returnLat(icode: string) {
    airports.comparator = 'latitude';
    let a = airports.findWhere({ iata: icode })
    return a.get('latitude');
}

export function returnLong(icode: string) {
    airports.comparator = 'longitude';
    let a = airports.findWhere({ iata: icode })
    return a.get('longitude');
}

export function returnAirportData(icode: string) {
    airports.comparator = 'city';
    let a = airports.findWhere({ iata: icode })
    return a;
}

export function returnAirport(icode: string) {
    airports.comparator = 'name';
    let a = airports.findWhere({ iata: icode })
    return a.get('name');
}

export function searchAirport(search: string)
{
    let a = airports.filter(function(model) {
        return _.some(
          [ model.get('name'), model.get('city'), model.get('country'), model.get('iata') ], 
          function(value) {
            return value.toLowerCase().indexOf(search.toLowerCase()) != -1;
          });
       });
    return a
}

export function returnAirline(icode: string) {
    airlines.comparator = 'name';
    let a = airlines.findWhere({ iata: icode })
    return a.get('name');
}

export function returnCabin(cabinCode: string)
{
    const cb: any = {
        'ECONOMY': 'Economy',
        'PREMIUM_ECONOMY': 'Premium Economy',
        'BUSINESS': 'Business',
        'FIRST': 'First Class',
    }

    return cb[cabinCode]
}

export function cabin(segmentId: any, data: any) {

    let cabin = ''
    data.forEach(function (v:any) {
        
        v.fareDetailsBySegment.forEach(function (val: any) {
        
            if(val.segmentId == segmentId)
            {
                cabin = val.cabin
            }

        });

    });
    return returnCabin(cabin);

}

export function checkedBags(segmentId: any, data: any) {

    let bag = ' '
    data.forEach(function (v:any) {
        
        v.fareDetailsBySegment.forEach(function (val: any) {
        
            if(val.segmentId == segmentId)
            {
                bag += (val?.includedCheckedBags?.quantity)? ' x'+val?.includedCheckedBags?.quantity ?? ' ' + ' '+ val?.includedCheckedBags?.weight ?? ' ' + ' '+ val?.includedCheckedBags?.weightUnit ?? ' ' : '';
            }

        });

    });
    return bag;

}

export function paginator(flights: any, page: number, per_page: number) {

    var page = page || 1,
    per_page = per_page || 10,
    offset = (page - 1) * per_page,
  
    paginatedItems = flights.slice(offset).slice(0, per_page),
    total_pages = Math.ceil(flights.length / per_page);
    return paginatedItems
    // return {
    // page: page,
    // per_page: per_page,
    // pre_page: page - 1 ? page - 1 : null,
    // next_page: (total_pages > page) ? page + 1 : null,
    // total: flights.length,
    // total_pages: total_pages,
    // data: paginatedItems
    // };
}

export function calculateTax(total: number) {

    let tax = (17/100) * total;
    return tax.toFixed(2)

}

export function calculateTotal(total: number) {

    let tax = (17/100) * total;
    tax = numberCaster(tax.toFixed(2));

    let sum = (tax*1) + (total*1);
    return sum.toFixed(2)
}

export function randomIntFromInterval(min: number, max: number) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function truncateString(str: string, n: number){
    return (str.length > n) ? str.slice(0, n-1) + '...' : str;
}

export function localCurrency(loc: any){

    let cur = 'USD';

    switch(loc.countryCode) {

        case 'CA':
          cur = 'CAD'
          break;

        case 'US':
          cur = 'USD'
          break;

        case 'NG':
          cur = 'NGN'
          break;

        case 'UK':
          cur = 'GBP'
          break;

        case 'KE':
          cur = 'KES'
          break;

        case 'ZE':
            cur = 'ZAR'
            break;

        case 'AE':
            cur = 'AED'
            break;
          
        default:
            cur = 'USD'
    }

    return cur;
      
}

// Convert Degress to Radians
function Deg2Rad(deg: any) {
    return deg * Math.PI / 180;
}
  
function PythagorasEquirectangular(lat1: any, lon1: any, lat2: any, lon2: any) {
    lat1 = Deg2Rad(lat1);
    lat2 = Deg2Rad(lat2);
    lon1 = Deg2Rad(lon1);
    lon2 = Deg2Rad(lon2);
    var R = 6371; // km
    var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
    var y = (lat2 - lat1);
    var d = Math.sqrt(x * x + y * y) * R;
    return d;
}

export function nearestCity(latitude: any, longitude: any, ports: any) {
    var minDif = 99999;
    var closest;
  
    ports.map((port: any) => {
        if(port.get('iata') !== '\\N' && port.get('name').indexOf('International') !== -1){
            var dif = PythagorasEquirectangular(latitude, longitude, port.get('latitude'), port.get('longitude'));
            if (dif < minDif) {
                closest = port.get('iata');
                minDif = dif;
            }
        }
    })
  
    // return the nearest city
    return closest;
  }


export function convert(price: any, curr: string)
{
    const ex: any = {
        CAD: 1,
        NGN: 834,
        USD: 0.73,
        EUR: 0.68,
    }

    let rate: number = ex[curr]
    let cov: number = price * rate
    // return numberWithCommas(cov)
    return cov.toFixed(2)
}

export function numberWithCommas(x: any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}