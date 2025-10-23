import React, { useState, useMemo } from 'react'
import countryList from 'react-select-country-list'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function PassengerForm(props: any) {

    const rules = props.rules
    const errors: Array<any> = props.errors

    const options = useMemo(() => countryList().getData(), [])

    const [dateOfBirth, setDateOfBirth] = useState();
    const [passportIssuance, setPassportIssuance] = useState();
    const [passportExpiry, setPassportExpiry] = useState();

    const handleForm = (event: any) => {
        let n = event.target.name
        let v = event.target.value
        let data = { index: props.index, type: n, value: v }
        
        props.infoFormCallback(data)
    }

    function handleDateForm(date: any, type: string){
        
        let data = { index: props.index, type: type, value: date }
        
        props.infoFormCallback(data)
    }

    return (
    <>
<div className="primary-contact">
                        <i className="fa-regular fa-user" />
                        <h2 className="title">Passenger {rules.travelerId}</h2>
                        </div>
                        <div className="booking-details-wrap">
                        <form action="#">
                            
                            <ul>
                            <li>
                                <div className="form-grp">
                                    <div className="form">
                                        <label htmlFor="first_name">First Name *</label>
                                        <input type="text" name="first_name" onChange={handleForm} />
                                        <span style={{color:'red'}}>{(errors[props.index])?errors[props.index].first_name:''}</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="form-grp">
                                    <div className="form">
                                        <label htmlFor="middle_name">Middle Name</label>
                                        <input type="text" name="middle_name"  onChange={handleForm} />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="form-grp">
                                    <div className="form">
                                        <label htmlFor="last_name">Last Name *</label>
                                        <input type="text" name="last_name"  onChange={handleForm} />
                                        <span style={{color:'red'}}>{(errors[props.index])?errors[props.index].last_name:''}</span>
                                    </div>
                                </div>
                            </li>
                            
                            </ul>
                            <div className="row">
                            <div className="col-md-4">
                                <div className="form-grp">
                                <div className="form">
                                    <label htmlFor="email">Date Of Birth *</label>
                                    <DatePicker dateFormat="yyyy-MM-dd" name="date_of_birth" placeholderText="yyyy-mm-dd" onChange={(date: any) => { setDateOfBirth(date); handleDateForm(date, 'date_of_birth'); }} selected={dateOfBirth} />
                                    <span style={{color:'red'}}>{(errors[props.index])?errors[props.index].date_of_birth:''}</span>
                                </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-grp">
                                <div className="form">
                                    <label htmlFor="cc">Dial Code *</label>
                                    <input type="text" name="cc" id="cc" placeholder="+1"  onChange={handleForm} />
                                    <span style={{color:'red'}}>{(errors[props.index])?errors[props.index].cc:''}</span>
                                </div>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="form-grp">
                                <div className="form">
                                    <label htmlFor="mobile_number">Mobile Number *</label>
                                    <input type="text" name="mobile_number" id="mobile_number" placeholder="xxxxxxxxxx"  onChange={handleForm} />
                                    <span style={{color:'red'}}>{(errors[props.index])?errors[props.index].mobile_number:''}</span>
                                </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-grp">
                                <div className="form">
                                    <label htmlFor="email">Email *</label>
                                    <input type="email" id="email" name="email" placeholder="youinfo@email.com" onChange={handleForm} />
                                    <span style={{color:'red'}}>{(errors[props.index])?errors[props.index].email:''}</span>
                                </div>
                                </div>
                            </div>
                            
                            <div className="col-md-4">
                                <div className="form-grp">
                                <div className="form">
                                    <label htmlFor="nationality">Gender *</label>
                                    <select
                                    id="gender"
                                    name="gender"
                                    className="form-select"
                                    onChange={handleForm}
                                    aria-label="Default select gender">
                                        <option value=''>Select</option>
                                        <option value='MALE'>Male</option>
                                        <option value='FEMALE'>Female</option>
                                        <option value='UNSPECIFIED'>Unspecified</option>
                                        <option value='UNDISCLOSED'>Undisclosed</option>
                                    </select>
                                    <span style={{color:'red'}}>{(errors[props.index])?errors[props.index].gender:''}</span>
                                </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="form-grp">
                                <div className="form">
                                    <label htmlFor="passport_number">Passport Number *</label>
                                    <input type="text" name="passport_number" id="passport_number" placeholder="Passport Number"  onChange={handleForm} />
                                    <span style={{color:'red'}}>{(errors[props.index])?errors[props.index].passport_number:''}</span>
                                </div>
                                </div>
                            </div>
                            
                            <div className="col-md-4">
                                <div className="form-grp">
                                <div className="form">
                                    <label htmlFor="nationality">Passport Nationality *</label>
                                    <select
                                    id="nationality"
                                    name="nationality"
                                    className="form-select"
                                    onChange={handleForm}
                                    aria-label="Default select example">
                                        <option value=''>Select</option>
                                    {options.map((data: any, index: number) => (
                                    <option key={index} value={data.value}>{data.label}</option>
                                    ))}
                                    </select>
                                    <span style={{color:'red'}}>{(errors[props.index])?errors[props.index].nationality:''}</span>
                                </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="form-grp">
                                <div className="form">
                                    <label htmlFor="issuing_nationality">Passport Issuing Country *</label>
                                    <select
                                    id="issuing_nationality"
                                    name="issuing_nationality"
                                    className="form-select"
                                    onChange={handleForm}
                                    aria-label="Default select example">
                                        <option value=''>Select</option>
                                    {options.map((data: any, index: number) => (
                                    <option key={index} value={data.value}>{data.label}</option>
                                    ))}
                                    </select>
                                    <span style={{color:'red'}}>{(errors[props.index])?errors[props.index].issuing_nationality:''}</span>
                                </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="form-grp">
                                <div className="form">
                                    <label htmlFor="place_of_birth">Place Of Birth *</label>
                                    <input type="text" name="place_of_birth" placeholder="Place of Birth" onChange={handleForm} />
                                    <span style={{color:'red'}}>{(errors[props.index])?errors[props.index].place_of_birth:''}</span>
                                </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="form-grp">
                                <div className="form">
                                    <label htmlFor="place_of_birth">Passport Authority *</label>
                                    <input type="text" name="issuing_authority" placeholder="Passport Authority" onChange={handleForm} />
                                    <span style={{color:'red'}}>{(errors[props.index])?errors[props.index].issuing_authority:''}</span>
                                </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="form-grp">
                                <div className="form">
                                    <label htmlFor="passport_issuance_date">Passport Issuance Date *</label>
                                    <DatePicker dateFormat="yyyy-MM-dd" name="passport_issuance_date" placeholderText="yyyy-mm-dd" onChange={(date: any) => { setPassportIssuance(date); handleDateForm(date, 'passport_issuance_date'); }} selected={passportIssuance} />
                                    <span style={{color:'red'}}>{(errors[props.index])?errors[props.index].passport_issuance_date:''}</span>
                                </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="form-grp">
                                <div className="form">
                                    <label htmlFor="passport_expiry_date">Passport Expiry Date *</label>
                                    <DatePicker dateFormat="yyyy-MM-dd" name="passport_expiry_date" placeholderText="yyyy-mm-dd" onChange={(date: any) => { setPassportExpiry(date); handleDateForm(date, 'passport_expiry_date'); }} selected={passportExpiry} />
                                    <span style={{color:'red'}}>{(errors[props.index])?errors[props.index].passport_expiry_date:''}</span>
                                </div>
                                </div>
                            </div>    

                            <p>Please ensure your passport is valid for at least 6 months from the departure date.</p>


                            </div>
                        </form>
                        </div>
    </>
    )
}