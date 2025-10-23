import React, { useState, useMemo } from 'react'
import countryList from 'react-select-country-list'

export default function PassengerContactForm(props: any) {

    const errors: {address: string, postcode: string, city: string, country: string} = props.errors

    const options = useMemo(() => countryList().getData(), [])

    const handleForm = (event: any) => {
        let n = event.target.name
        let v = event.target.value
        let data = { type: n, value: v }
        
        props.AddressFormCallback(data)
    }


    return (
    <>
<div className="primary-contact">
                        <i className="fa-regular fa-user" />
                        <h2 className="title">Contact </h2>
                        </div>
                        <div className="booking-details-wrap">

                        <p>We need your contact for record purpose. We will not share your contact with any third party.</p>

                        <form action="#">
                       
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-grp">
                                        <div className="form">
                                            <label htmlFor="address">Address *</label>
                                            <input type="text" name="address" placeholder="Address" onChange={handleForm} />
                                            <span style={{color:'red'}}>{(errors.address)?errors.address:''}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                            
                            <div className="col-md-4">
                                <div className="form-grp">
                                <div className="form">
                                    <label htmlFor="postcode">Postal Code *</label>
                                    <input type="text" name="postcode" id="postcode" placeholder="Postal Code"  onChange={handleForm} />
                                    <span style={{color:'red'}}>{(errors.postcode)?errors.postcode:''}</span>
                                </div>
                                </div>
                            </div>
                            
                            <div className="col-md-4">
                                <div className="form-grp">
                                <div className="form">
                                    <label htmlFor="email">City *</label>
                                    <input type="email" id="city" name="city" placeholder="City" onChange={handleForm} />
                                    <span style={{color:'red'}}>{(errors.city)?errors.city:''}</span>
                                </div>
                                </div>
                            </div>
                            
                            <div className="col-md-4">
                                <div className="form-grp">
                                <div className="form">
                                    <label htmlFor="country">Country *</label>
                                    <select
                                    id="country"
                                    name="country"
                                    className="form-select"
                                    onChange={handleForm}
                                    aria-label="Default select example">
                                        <option value=''>Select</option>
                                    {options.map((data: any, index: number) => (
                                    <option key={index} value={data.value}>{data.label}</option>
                                    ))}
                                    </select>
                                    <span style={{color:'red'}}>{(errors.country)?errors.country:''}</span>
                                </div>
                                </div>
                            </div>



                            </div>
                        </form>
                        </div>
    </>
    )
}