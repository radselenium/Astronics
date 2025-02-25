import React, { useEffect, useState, useRef } from 'react';
import { MessageTypes } from './MessageData';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { subMonths } from 'date-fns';
import HttpClient from '../config/HttpConfig';
import { toast } from 'react-toastify';

const SearchFilter = (props) => {

    const [messagesummary, setmessagesummary] = useState([]);
    const { showDataTable, setShowDataTable } = props;
    const [isSaved, setIsSaved] = useState(false);
    const [showSearch, setShowSearch] = useState(props.showSearch);
    const [HandleChange, setHandleChange] = useState(false);
    
    const [globalFilter, setGlobalFilter] = useState('');
    const dt = useRef(null);

    const onFilter = (e) => {
        setGlobalFilter(e.target.value);
        dt.current.filter(e.target.value, 'global', 'contains');
    };


    const [startDate, setStartDate] = useState(props.startDate);
    const [endDate, setEndDate] = useState(props.endDate);
    const [messageType, setMessageType] = useState('All');
    const [documentId, setDocumentId] = useState('');
    const [test, setTest] = useState('');
    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setHandleChange(true);
        setEndDate(date);
    };

    //Datepicker value setting for start and end date
    const CustomDatePickerInput = ({ value, onClick }) => (
        <div className="input-group d-flex" >
            <input
                type="text"
                value={value}
                readOnly
                className="form-control"
                style={{ cursor: 'pointer', padding: "2px 5px" }}
            />
            <button
                type="button"
                className="btn btn-primary"
                onClick={onClick}
                style={{ padding: "2px 5px", minWidth: "25px" }}
            >
                <FontAwesomeIcon icon={faCalendarAlt} />
            </button>
        </div>
    );

    


    const isCurrentZoneBehindUTC = (date) => {
        // Get the time string with the UTC offset in the specified time zone
        // console.log(date);
        let offsetMinutes = new Date().getTimezoneOffset();
        if (offsetMinutes > 0) {
            const LocalDateTime = new Date(date);
            console.log(LocalDateTime);
            LocalDateTime.setHours(LocalDateTime.getHours() + 13);
            return LocalDateTime;
        }
        return date;
    };


    const Reset = (e) => {
        e.preventDefault();
       
        setStartDate(subMonths(new Date(), 1));
        const resetStartDate = subMonths(new Date(), 1);
        resetStartDate.setUTCHours(0,0,0,0);
        const EndDate = new Date();
        EndDate.setUTCHours(23, 59, 59, 999);
        const QueryEndDate = EndDate.toISOString();
        console.log(QueryEndDate);
        EndDate.setDate(EndDate.getDate() - 1)
        setEndDate(EndDate);
        setMessageType('All');
        setDocumentId('');

        const newFormData = {
            startDate: resetStartDate,
            endDate: QueryEndDate,
            messageType: 'All',
        };
console.log(newFormData);
        props.getAllMessageData(newFormData)
        setShowDataTable(false);

    };


    const getAllMessageData = (newFormData) => {
        HttpClient.post('/api/getAllMessageTracing',
            newFormData
        )
            .then(function (response) {
                console.log(response);
                var result = response.data;
                setmessagesummary(result);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    
    

    //Search click funtionality
    const handleSubmit = (e) => {
        e.preventDefault();
        var getStartDate = formatDate(startDate, 0);
        var getEndDate = formatDate(endDate, 1);

        if (getStartDate > getEndDate) {
            toast("Received Date From cannot be greater than Received Date To.", {
                position: "top-right",
                type: "error"
            })
            return;
        }

        const newFormData = {
            startDate: getStartDate,
            endDate: getEndDate,
            messageType,
        };

        // Update formData state
        props.getAllMessageData(newFormData)

    };


    //start and end date setting the value
    const formatDate = (date, addDate) => {
        const d2 = date;
        if (addDate) {
            const offminutes = new Date().getTimezoneOffset(); // for utc negative regions
            if (offminutes > 0 && HandleChange) {
                d2.setDate(d2.getDate() - 1);       // for utc negative regions
                setHandleChange(false);
            }
            d2.setUTCHours(23, 59, 59, 999);
            d2.setDate(d2.getDate() + 1);
            const endDate = d2.toISOString();
            d2.setDate(d2.getDate() - 1);
            return endDate;
        }
        d2.setUTCHours(0, 0, 0, 0);
        return d2.toISOString();
    };


    useEffect(() => {
        setStartDate(new Date(props.startDate));
        setEndDate(new Date(props.endDate));
    }, [props.startDate, props.endDate]);

    return (
        <div>
            {showSearch ?
                <div className='col-md-12 border border-light'>

                    <div className='col-md-12 d-flex justify-content-between search-filter-header py-1' style={{ minHeight: "34px" }}>
                        <div className='d-flex align-items-center'>
                            <span className='text-white m-0 px-3 fs-3'>Search</span>
                        </div>

                    </div>


                    {/* Basic Filter */}

                    {isSaved === false ?
                        <div class="flex-d-row  " style={{ backgroundColor: "#e1ebf6" }} >

                            <form class="form-horizontal row col-md-12" name="messageTracingFilterForm" role="form" >
                                <div className=" col-md-12 mt-5 flex-d-row pe-5 ps-5 justify-content-end " style={{ paddingLeft: "0px", marginLeft: "0px", marginRight: "0px" }} >
                                    <div class="col-12 col-md-4 col-lg-4 col-xl-4 col-xs-4 align-items-baseline mb-md-5  flex-d-row"  >
                                        <div class="px-2 col-6 col-md-6 d-flex float-right justify-content-end msgtracefilter">
                                            <span class=" fw-small text-dark fs-6" >Received Date From</span>
                                        </div>

                                        <div class="col-6 col-md-6 d-flex">

                                            <DatePicker
                                                selected={isCurrentZoneBehindUTC(startDate)}
                                                onChange={handleStartDateChange}
                                                customInput={<CustomDatePickerInput />}
                                                dateFormat="dd-MMM-yyyy"
                                                wrapperClassName='date-picker-custom-width'
                                            />
                                        </div>
                                    </div>

                                    <div class="col-12 col-md-4 col-lg-4 col-xl-4 col-xs-4 align-items-baseline mb-md-5  flex-d-row"   >
                                        <div class="px-2 col-6 col-md-6 d-flex float-right justify-content-end msgtracefilter">
                                            <span class="fw-small text-dark fs-6" >Received Date To </span>
                                        </div>

                                        <div className='col-6 col-md-6 d-flex' >


                                            <DatePicker
                                                selected={isCurrentZoneBehindUTC(endDate)}
                                                onChange={handleEndDateChange}
                                                customInput={<CustomDatePickerInput />}
                                                dateFormat="dd-MMM-yyyy"
                                                wrapperClassName='date-picker-custom-width'
                                            />



                                        </div>
                                    </div>
                                    <div class="col-12 col-md-4 col-lg-4 col-xl-4 mb-md-5 col-xs-4 flex-d-row align-items-baseline"   >
                                        <div class="px-2 col-6 col-md-6 d-flex float-right justify-content-end msgtracefilter">
                                            <span class="fw-small text-dark fs-6 ">Message Type</span>
                                        </div>
                                        <div className='col-6 col-md-6'>
                                            <select class="form-select" name="messageType" value={messageType}
                                                onChange={(e) => setMessageType(e.target.value)} aria-label="Select example" style={{ padding: "2px 5px", }}>
                                                <option>All</option>
                                                {MessageTypes.map((e, key) => {
                                                    return <option key={key} value={e.value}>{e.name}</option>;
                                                })}


                                            </select>

                                        </div>
                                    </div>



                                </div>


                                <div class="justify-content-end flex-d-row mb-2 mt-2 msgtracefilter-btn">
                                    {/* <div class="col-md-6"></div> */}
                                    <div class="flex-d-row" style={{ justifyContent: 'end' }} >

                                        <div class=" mx-5" style={{ paddingLeft: '0px ', paddingRight: '0px ' }}>
                                            <button class="btn btn-sm btn-light py-1" onClick={Reset}>
                                                <i class="ki-outline ki-arrows-circle fs-8"></i>
                                                Reset
                                            </button></div>

                                        <div class=" mx-5" style={{ paddingLeft: '0px ', paddingRight: '0px ', width: '100px' }}>
                                            <button type="submit" class="btn btn-sm btn-primary py-1" onClick={handleSubmit}>
                                                <i class="ki-outline ki-magnifier fs-8"></i>
                                                Search
                                            </button></div>
                                    </div>



                                </div>
                            </form>





                        </div>
                        : null}
                </div>
                : ''}

        </div >
    )
}

export default SearchFilter;