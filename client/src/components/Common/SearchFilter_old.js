import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { MessageTypes, OptionalFields } from './MessageData';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { format, subMonths } from 'date-fns';
import axios from 'axios';
import HttpClient from '../config/HttpConfig';

const SearchFilter = (props) => {

    const [isSaved, setIsSaved] = useState(false);
    const [savedSearch, setSavedSearch] = useState([])
    const [isAdvanced, setIsAdvanced] = useState(false);
    const [filterRows, setFilterRows] = useState([{ key: 0, value: '' }]);
    const [saveButton, setSaveButton] = useState(props.showSaveButton);
    const [showSettings, setShowSettings] = useState(props.showSettings);
    const [showSearch, setShowSearch] = useState(props.showSearch);
    const [isSavedSelected, setIsSavedSelected] = useState(false);
    const [isEditable, setIsEditable] = useState(false)
    console.log(new Date(props.endDate))
    console.log(new Date(props.startDate))
    const [formData, setFormData] = useState({});
    //const [messagesummary, setmessagesummary] = useState([]);
    const toggleFilterType = () => {
        setIsAdvanced(!isAdvanced);
        setFilterRows([{ key: 0, value: '' }]);
        setSaveButton(props.showSave ? !isAdvanced : false);
    };
    const handleEditClick = () => {
        setIsEditable(true);
    };

    const [globalFilter, setGlobalFilter] = useState('');
    const dt = useRef(null);

    const onFilter = (e) => {
        setGlobalFilter(e.target.value);
        dt.current.filter(e.target.value, 'global', 'contains');
    };

    // const [startDate, setStartDate] = useState(getFormattedDate(new Date(),0));
    // const [endDate, setEndDate] = useState(getFormattedDate(new Date(),1));
    const [startDate, setStartDate] = useState(subMonths(new Date(), 3));
    const [endDate, setEndDate] = useState(new Date());
    const [messageType, setMessageType] = useState('All');
    const [documentId, setDocumentId] = useState('');
    const [test, setTest] = useState('');
    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        date.setUTCHours(23, 59, 59, 999);
        setEndDate(date);
    };

    const CustomDatePickerInput = ({ value, onClick }) => (
        <div className="input-group" style={{ minWidth: "200px", maxWidth: "200px" }}>
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

    const SwitchSavedsearch = (e) => {
        setIsSaved(true);
    };
    const SwitchDefaultsearch = (e) => {
        setIsSaved(false);
        setIsSavedSelected(false);
    };




    // const onRowClick = (rowData) => {
    //     setSelectedRowData(rowData);
    //     setPopupVisible(true);
    // };
    // const hidePopup = () => {
    //     setPopupVisible(false);
    // };
    const handleSearch = () => {
        // Handle the search action with the selected dates
        // You can use the startDate and endDate values here
    };


    const Reset = (e) => {
        e.preventDefault();
        setStartDate(subMonths(new Date(), 3));
        setEndDate((new Date()));
        setMessageType('All');
        setDocumentId('');
        const newFormData = {
            startDate: startDate,
            endDate: endDate,
            messageType: 'All'
        };
        //console.log('hi')
        props.getAllMessageData(newFormData)
        //getRecordBySearchValue(newFormData);
    };







    const addFilterRow = () => {
        setFilterRows([...filterRows, { key: Date.now(), value: '' }]);
    };

    const removeFilterRow = (key) => {
        setFilterRows(filterRows.filter((row) => row.key !== key));
    };

    const handleChange = (key, value) => {
        setFilterRows(
            filterRows.map((row) => (row.key === key ? { ...row, value } : row))
        );
    };
    const handleSavedSearchChange = (e) => {
        setSavedSearch(e.target.value);
        setIsSavedSelected(true);
    }
    var getStartDate = startDate.getDate();

    const handleSubmit = (e) => {
        e.preventDefault();
        var getStartDate = formatDate(startDate, 0);
        var getEndDate = formatDate(endDate, 1);
        //var getDocumentId = documentId??documentId;

        const newFormData = {
            startDate: getStartDate,
            endDate: getEndDate,
            messageType,
            documentId,
        };
        console.log(newFormData);
        // Update formData state
        props.getAllMessageData(newFormData)
        //getRecordBySearchValue(newFormData);
    };

    const formatDate = (date, addDate) => {
        //var d1 = (date.getDate() + addDate)
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + (date.getDate() + addDate),
            year = d.getFullYear();
        var d2 = new Date(year + "-" + month + "-" + day)
        console.log(d2)
        d2.setUTCHours(0, 0, 0, 0)
        return d2.toISOString();
    }

    return (
        <div>
            {showSearch ?
                <div className='col-md-12 border border-light'>

                    <div className='col-md-12 d-flex justify-content-between search-filter-header py-1' style={{ minHeight: "34px" }}>
                        <div className='d-flex align-items-center'>
                            <span className='text-white m-0 px-3 fs-3'>Search</span>
                        </div>
                        {showSettings ? <>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', }} className="dropdown mx-2">
                                <button type="button" className="btn btn-light btn-sm dropdown-toggle p-ml-auto d-flex align-items-center" data-bs-toggle="dropdown" style={{ padding: '3px' }}>
                                    <i className="fa fa-gear" style={{ fontSize: '16px', color: '#065590' }}></i>
                                </button>
                                <ul className="dropdown-menu py-0">
                                    {!isSaved ? <li onClick={SwitchSavedsearch}><a className="dropdown-item text-center px-3" href="#"><i class="fa-regular fa-floppy-disk px-2 " style={{ color: 'blue' }}></i>Saved Search</a></li>
                                        : <li onClick={SwitchDefaultsearch}><a className="dropdown-item text-center px-3" href="#"><i class="fa-regular fa-floppy-disk px-2" style={{ color: 'blue' }}></i>Basic Search</a></li>
                                    }

                                </ul>
                            </div>
                        </> : ''}
                    </div>


                    {isSaved ?
                        <div className=" col-md-12 " style={{ backgroundColor: "#e1ebf6" }}>
                            <div className="col-md-12 pb-5 pt-3" style={{ padding: "0px" }}>
                                <div class="col-md-4 col-lg-4 col-xl-4 align-items-baseline " style={{ flexDirection: "row", display: "flex" }}>

                                    <div class="px-2 col-md-6 d-flex float-right justify-content-end">
                                        <span class=" fw-small text-dark fs-6">Saved Search</span>
                                    </div>

                                    <div class="col-md-6 ">


                                        <select class="form-select" name="messageType" placeholder='Select Saved Search' value={savedSearch}
                                            onChange={handleSavedSearchChange} aria-label="Select example" style={{ padding: "2px 5px", minWidth: "200px" }}>
                                            <option value="" disabled>Select Saved Search</option>
                                            <option value="1">Outbound lastmonth</option>
                                            <option value="2">PO Creation Aex</option>


                                        </select>



                                    </div>

                                </div>
                            </div>

                            {isSavedSelected ? <div> <div className="col-md-12 " style={{ padding: "0px" }}>
                                <div class="col-md-4 col-lg-4 col-xl-4 align-items-baseline mb-md-5" style={{ flexDirection: "row", display: "flex" }}>

                                    <div class="px-2 col-md-6 d-flex float-right justify-content-end">
                                        <span class=" fw-small text-dark fs-6" >Description</span>
                                    </div>

                                    <div class="col-md-6 d-flex justify-content-start">


                                        <span>Description of saved search</span>



                                    </div>

                                </div>
                            </div>

                                <div className=' border-bottom border-black' style={{ width: "98%", marginRight: "auto", marginLeft: "auto" }}></div>

                                <div class=" col-md-12"  >

                                    <div className=" col-md-12 mt-5 flex-d-row pe-5" style={{ paddingLeft: "0px", marginLeft: "0px", marginRight: "0px" }} >
                                        <div class="col-md-4 col-lg-4 col-xl-4 align-items-baseline mb-md-5  flex-d-row"  >
                                            <div class="px-2 col-md-6 d-flex float-right justify-content-end">
                                                <span class=" fw-small text-dark fs-6">Received Date From</span>
                                            </div>

                                            <div class="col-md-6 d-flex">

                                                <DatePicker
                                                    selected={startDate}
                                                    onChange={handleStartDateChange}
                                                    customInput={<CustomDatePickerInput />}
                                                    dateFormat="dd-MMM-yyyy"
                                                    disabled={!isEditable}
                                                />



                                            </div>
                                        </div>

                                        <div class="col-md-4 col-lg-4 col-xl-4 align-items-baseline mb-md-5  flex-d-row"   >
                                            <div class="px-2 col-md-6 d-flex float-right justify-content-end">
                                                <span class="fw-small text-dark fs-6" >Received Date To </span>
                                            </div>

                                            <div className='col-md-6 d-flex'>


                                                <DatePicker
                                                    selected={endDate}
                                                    onChange={handleEndDateChange}
                                                    customInput={<CustomDatePickerInput />}
                                                    dateFormat="dd-MMM-yyyy"
                                                    disabled={!isEditable}
                                                />



                                            </div>
                                        </div>
                                        <div class="col-md-4 col-lg-4 col-xl-4 mb-md-5 flex-d-row align-items-baseline"   >
                                            <div class="px-2 col-md-6 d-flex float-right justify-content-end">
                                                <span class="fw-small text-dark fs-6" >Message Type</span>
                                            </div>
                                            <div className='col-md-6'>
                                                <select class="form-select" name="messageType" value={messageType} disabled={!isEditable}
                                                    onChange={(e) => setMessageType(e.target.value)} aria-label="Select example" style={{ padding: "2px 5px", minWidth: "200px", maxWidth: "200px" }}>
                                                    <option>All</option>
                                                    <option value="1">PO Creation</option>
                                                    <option value="2">PO Ack</option>
                                                    <option value="1">PO Shipment</option>
                                                    <option value="2">PO Invoice</option>

                                                </select>

                                            </div>
                                        </div>
                                        <div class="col-md-4 col-lg-4 col-xl-4 mb-md-5  flex-d-row align-items-baseline"  >
                                            <div class="px-2 col-md-6 d-flex justify-content-end">
                                                <span class="fw-small text-dark fs-6" >Document ID</span>
                                            </div>
                                            <div class="col-md-6">
                                                <input type="text" name="documentId" value={documentId} disabled={!isEditable}
                                                    onChange={(e) => setDocumentId(e.target.value)} class="form-control" style={{ padding: "2px 2px", minWidth: "200px", maxWidth: "200px" }} />
                                            </div>

                                        </div>


                                    </div>



                                    <div>

                                        <div className='mx-4'>
                                            <div className="row mb-1">
                                                <div className="col-md-3">
                                                    <label className="form-label" htmlFor={`select1`}>Field</label>
                                                </div>
                                                <div className="col-md-3">
                                                    <label className="form-label" htmlFor={`select2`}>Operator</label>
                                                </div>
                                                <div className="col-md-3">
                                                    <label className="form-label" htmlFor={`input`}>Value</label>
                                                </div>

                                            </div>
                                            {filterRows.map((row, index) => (
                                                <div key={row.key} className="row mb-2">
                                                    <div className="col-md-3">
                                                        <select
                                                            id={`select1_${row.key}`}
                                                            className="form-select"
                                                            onChange={(e) => handleChange(row.key, e.target.value)}
                                                            value={row.value}
                                                            disabled={!isEditable}
                                                            aria-label="Select example" style={{ padding: "2px 5px", minWidth: "180px" }}
                                                        >
                                                            <option value="option1">Document ID</option>
                                                            <option value="option2">Document Type</option>
                                                            {/* Add more options as needed */}
                                                        </select>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <select
                                                            id={`select2_${row.key}`}
                                                            className="form-select"
                                                            onChange={(e) => handleChange(row.key, e.target.value)}
                                                            disabled={!isEditable}
                                                            //  value={row.value}
                                                            aria-label="Select example" style={{ padding: "2px 5px", minWidth: "180px" }}
                                                        >
                                                            <option value="Is Blank">Is Blank</option>
                                                            <option value="Is Not Blank">Is Not Blank</option>
                                                            <option value="Equals">Equals</option>
                                                            <option value="Not Equals">Not Equals</option>
                                                            <option value="Contains">Contains</option>
                                                            <option value="Begins With">Begins With</option>
                                                            {/* Add more options as needed */}
                                                        </select>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <input
                                                            type="text"
                                                            id={`input_${row.key}`}
                                                            className="form-control"
                                                            placeholder="Enter value"
                                                            onChange={(e) => handleChange(row.key, e.target.value)}
                                                            disabled={!isEditable}
                                                            // value={row.value}
                                                            aria-label="Select example" style={{ padding: "2px 5px", minWidth: "180px" }}
                                                        />
                                                    </div>
                                                    {/* <div className="col-md-3" style={{ textAlign: 'left' }}>
                                            <a className="btn btn-circle btn-primary" onClick={addFilterRow} style={{ padding: "2px 5px 3px 8px", marginTop: "-2px", borderRadius: '50%' }}>
                                                <i className="fa fa-plus"></i>
                                            </a>

                                            <a
                                                className={`btn btn-danger ml-2 ${index === 0 ? 'disabled-button' : ''}`}
                                                onClick={() => index !== 0 && removeFilterRow(row.key)}
                                                style={{ padding: "2px 5px 3px 8px", marginTop: "-2px", borderRadius: '50%' }}
                                            >
                                                <i className="fa fa-minus"></i>
                                            </a>

                                        

                                        </div> */}
                                                </div>
                                            ))}
                                        </div>

                                    </div>






                                    {/* Actions Section Start */}

                                    <div class="col-md-12 flex-d-row pb-2 ">
                                        <div class="col-md-6"></div>
                                        <div class="col-md-6 row" style={{ justifyContent: 'end' }} >
                                            {/* <div class=" col-md-3" style={{ paddingTop: '10px ', textAlign: 'right' }}>
                                    <span
                                        style={{ textDecoration: "underline", fontSize: "1rem", cursor: "pointer" }}
                                        onClick={toggleFilterType}
                                    >
                                        <a>{isAdvanced ? "Basic Filter" : "Advanced Filter"}</a>
                                    </span></div> */}
                                            <div class=" col-md-2" style={{ paddingLeft: '0px ', paddingRight: '0px ' }}>
                                                {!isEditable ?
                                                    <button href="#" class="btn btn-sm btn-light py-1" onClick={handleEditClick}>
                                                        <i class="fa fa-edit fs-8"></i>
                                                        Edit
                                                    </button> : null}
                                            </div>

                                            <div class=" col-md-2" style={{ paddingLeft: '0px ', paddingRight: '0px ' }}>
                                                {isEditable ? <button href="#" class="btn btn-sm btn-success py-1" data-bs-toggle="modal" data-bs-target="#myModal">
                                                    <i class="fa fa-floppy-disks fs-8"></i>
                                                    Save as New
                                                </button> : <button href="#" class="btn btn-sm btn-danger py-1" data-bs-toggle="modal" data-bs-target="#myModal">
                                                    <i class="fa fa-trash fs-8"></i>
                                                    Delete
                                                </button>}


                                            </div>

                                            <div class=" col-md-2" style={{ paddingLeft: '0px ', paddingRight: '0px ', width: '100px' }}>
                                                {isEditable ? <button href="#" class="btn btn-sm btn-primary py-1" >
                                                    <i class="fa fa-floppy-disks fs-8"></i>
                                                    Update
                                                </button> : <button href="#" class="btn btn-sm btn-primary py-1">
                                                    <i class="ki-outline ki-magnifier fs-8"></i>
                                                    Search
                                                </button>}

                                            </div>
                                        </div>



                                    </div>

                                    {/* Actions Section End */}
                                    {/* modal popup */}

                                    {/* <!-- The Modal --> */}
                                    <div class="modal" id="myModal">
                                        <div class="modal-dialog modal-lg">
                                            <div class="modal-content">
                                                <form class="form-horizontal" name="addsaveForm" role="form">
                                                    {/* <!-- Modal Header --> */}
                                                    <div class="modal-header">
                                                        <h4 class="modal-title">Save Search</h4>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                                    </div>

                                                    {/* <!-- Modal body --> */}
                                                    <div class="modal-body">
                                                        <div class="form-group row mb-3">
                                                            <label class="col-sm-4 control-label MoveRight">Name:</label>

                                                            <div class="col-sm-8">
                                                                <input type="text" required class="form-control" name="name"
                                                                />


                                                            </div>

                                                        </div>
                                                        <div class="form-group row mb-3">
                                                            <label class="col-sm-4 control-label MoveRight">Description:</label>

                                                            <div class="col-sm-8">
                                                                <textarea class="form-control" name="description"></textarea>

                                                            </div>

                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Public" checked />
                                                            <label class="form-check-label" for="inlineRadio1">Public</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Private" />
                                                            <label class="form-check-label" for="inlineRadio2">Private</label>
                                                        </div>
                                                    </div>

                                                    {/* <!-- Modal footer --> */}
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-primary py-1" data-bs-dismiss="modal">Add</button>
                                                        <button type="button" class="btn btn-danger py-1" data-bs-dismiss="modal">Close</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    {/*End modal popup  */}



                                </div>
                            </div> : null}
                        </div> : null}



                    {/* Basic Filter */}

                    {isSaved === false ?
                        <div class="flex-d-row  " style={{ backgroundColor: "#e1ebf6" }} >

                            <form class="form-horizontal row" name="messageTracingFilterForm" role="form" >
                                <div className=" col-md-12 mt-5 flex-d-row pe-5" style={{ paddingLeft: "0px", marginLeft: "0px", marginRight: "0px" }} >
                                    <div class="col-md-4 col-lg-4 col-xl-4 align-items-baseline mb-md-5  flex-d-row"  >
                                        <div class="px-2 col-md-6 d-flex float-right justify-content-end">
                                            <span class=" fw-small text-dark fs-6" >Received Date From</span>
                                        </div>

                                        <div class="col-md-6 d-flex">

                                            <DatePicker
                                                selected={startDate}
                                                onChange={handleStartDateChange}
                                                customInput={<CustomDatePickerInput />}
                                                dateFormat="dd-MMM-yyyy"
                                            />
                                        </div>
                                    </div>

                                    <div class="col-md-4 col-lg-4 col-xl-4 align-items-baseline mb-md-5  flex-d-row"   >
                                        <div class="px-2 col-md-6 d-flex float-right justify-content-end">
                                            <span class="fw-small text-dark fs-6" >Received Date To </span>
                                        </div>

                                        <div className='col-md-6 d-flex' >


                                            <DatePicker
                                                selected={endDate}
                                                onChange={handleEndDateChange}
                                                customInput={<CustomDatePickerInput />}
                                                dateFormat="dd-MMM-yyyy"


                                            />



                                        </div>
                                    </div>
                                    <div class="col-md-4 col-lg-4 col-xl-4 mb-md-5 flex-d-row align-items-baseline"   >
                                        <div class="px-2 col-md-6 d-flex float-right justify-content-end">
                                            <span class="fw-small text-dark fs-6 ">Message Type</span>
                                        </div>
                                        <div className='col-md-6'>
                                            <select class="form-select" name="messageType" value={messageType}
                                                onChange={(e) => setMessageType(e.target.value)} aria-label="Select example" style={{ padding: "2px 5px", minWidth: "200px", maxWidth: "200px" }}>
                                                <option>All</option>
                                                {MessageTypes.map((e, key) => {
                                                    return <option key={key} value={e.value}>{e.name}</option>;
                                                })}
                                                {/* <option value="1">PO Creation</option>
                                    <option value="2">PO Ack</option>
                                    <option value="1">PO Shipment</option>
                                    <option value="2">PO Invoice</option> */}

                                            </select>

                                        </div>
                                    </div>
                                    <div class="col-md-4 col-lg-4 col-xl-4 mb-md-5  flex-d-row align-items-baseline"  >
                                        <div class="px-2 col-md-6 d-flex justify-content-end">
                                            <span class="fw-small text-dark fs-6" >Document ID</span>
                                        </div>
                                        <div class="col-md-6">
                                            <input type="text" name="documentId" value={documentId}
                                                onChange={(e) => setDocumentId(e.target.value)} class="form-control" style={{ padding: "2px 2px", minWidth: "200px", maxWidth: "200px" }} />
                                        </div>

                                    </div>


                                </div>



                                <div className='col-md-12'>
                                    {isAdvanced ? (
                                        <div className='col-md-12 mx-4'>
                                            <div className="col-md-12 row mb-1">
                                                <div className="col-md-3">
                                                    <label className="form-label" htmlFor={`select1`}>Field</label>
                                                </div>
                                                <div className="col-md-3">
                                                    <label className="form-label" htmlFor={`select2`}>Operator</label>
                                                </div>
                                                <div className="col-md-3">
                                                    <label className="form-label" htmlFor={`input`}>Value</label>
                                                </div>

                                            </div>
                                            {filterRows.map((row, index) => (
                                                <div key={row.key} className=" col-md-12 row mb-2">
                                                    <div className="col-md-3">
                                                        <select
                                                            id={`select1_${row.key}`}
                                                            className="form-select"
                                                            onChange={(e) => handleChange(row.key, e.target.value)}
                                                            value={row.value}
                                                            aria-label="Select example" style={{ padding: "2px 5px", minWidth: "180px" }}
                                                        >
                                                            <option disabled value="">Select Field</option>
                                                            {/* <option value="option1">Document ID</option>
                                                <option value="option2">Document Type</option> */}
                                                            {OptionalFields.map((e, key) => {
                                                                return <option key={key} value={e.value}>{e.name}</option>;
                                                            })}
                                                        </select>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <select
                                                            id={`select2_${row.key}`}
                                                            className="form-select"
                                                            onChange={(e) => handleChange(row.key, e.target.value)}
                                                            //  value={row.value}
                                                            aria-label="Select example" style={{ padding: "2px 5px", minWidth: "180px" }}
                                                        >
                                                            <option disabled value="">Select Operator</option>
                                                            <option value="Is Blank">Is Blank</option>
                                                            <option value="Is Not Blank">Is Not Blank</option>
                                                            <option value="Equals">Equals</option>
                                                            <option value="Not Equals">Not Equals</option>
                                                            <option value="Contains">Contains</option>
                                                            <option value="Begins With">Begins With</option>
                                                            {/* Add more options as needed */}
                                                        </select>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <input
                                                            type="text"
                                                            id={`input_${row.key}`}
                                                            className="form-control"
                                                            placeholder="Enter value"
                                                            onChange={(e) => handleChange(row.key, e.target.value)}
                                                            // value={row.value}
                                                            aria-label="Select example" style={{ padding: "2px 5px", minWidth: "180px" }}
                                                        />
                                                    </div>
                                                    <div className="col-md-3 d-flex align-items-center" style={{ textAlign: 'left' }}>
                                                        <span className='' style={{ marginRight: "5px" }}> <a className=" btn-primary  align-items-center " onClick={addFilterRow} >
                                                            <i className=" fa-circle-plus fa  fs-2 pe-0"></i>
                                                        </a></span>


                                                        <span>
                                                            <a
                                                                className={` btn-danger  ${index === 0 ? 'disabled-button' : ''}`}
                                                                onClick={() => index !== 0 && removeFilterRow(row.key)}

                                                            >
                                                                <i className="fa fa-circle-minus fs-2  pe-0"></i>
                                                            </a></span>



                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : null}
                                </div>






                                <div class="col-md-12 d-flex row mb-2 mt-2">
                                    <div class="col-md-6"></div>
                                    <div class="col-md-6 row" style={{ justifyContent: 'end' }} >
                                        <div class=" col-md-3 d-flex align-items-baseline justify-content-end" >
                                            <span
                                                style={{ textDecoration: "underline", fontSize: "1rem", cursor: "pointer" }}
                                                onClick={toggleFilterType}
                                            >
                                                <a>{isAdvanced ? "Basic Filter" : "Advanced Filter"}</a>
                                            </span>
                                        </div>
                                        <div class=" col-md-2" style={{ paddingLeft: '0px ', paddingRight: '0px ' }}>
                                            <button class="btn btn-sm btn-light py-1" onClick={Reset}>
                                                <i class="ki-outline ki-arrows-circle fs-8"></i>
                                                Reset
                                            </button></div>
                                        {saveButton && (
                                            <div class=" col-md-2" style={{ paddingLeft: '0px ', paddingRight: '0px ' }}>
                                                <button type="button" class="btn btn-sm btn-success py-1" data-bs-toggle="modal" data-bs-target="#myModal">
                                                    <i class="fa fa-save fs-8"></i>
                                                    Save
                                                </button></div>
                                        )}
                                        <div class=" col-md-2" style={{ paddingLeft: '0px ', paddingRight: '0px ', width: '100px' }}>
                                            <button type="submit" class="btn btn-sm btn-primary py-1" onClick={handleSubmit}>
                                                <i class="ki-outline ki-magnifier fs-8"></i>
                                                Search
                                            </button></div>
                                    </div>



                                </div>
                            </form>

                            {/* modal popup */}

                            {/* <!-- The Modal --> */}
                            <div class="modal" id="myModal">
                                <div class="modal-dialog modal-lg">
                                    <div class="modal-content">
                                        <form class="form-horizontal" name="addsaveForm" role="form">
                                            {/* <!-- Modal Header --> */}
                                            <div class="modal-header">
                                                <h4 class="modal-title">Save Search</h4>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                            </div>

                                            {/* <!-- Modal body --> */}
                                            <div class="modal-body">
                                                <div class="form-group row mb-3">
                                                    <label class="col-sm-4 control-label MoveRight">Name:</label>

                                                    <div class="col-sm-8">
                                                        <input type="text" required class="form-control" name="name"
                                                        />
                                                    </div>

                                                </div>
                                                <div class="form-group row mb-3">
                                                    <label class="col-sm-4 control-label MoveRight">Description:</label>

                                                    <div class="col-sm-8">
                                                        <textarea class="form-control" name="description"></textarea>

                                                    </div>

                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Public" checked />
                                                    <label class="form-check-label" for="inlineRadio1">Public</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Private" />
                                                    <label class="form-check-label" for="inlineRadio2">Private</label>
                                                </div>
                                            </div>

                                            {/* <!-- Modal footer --> */}
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-primary py-1" data-bs-dismiss="modal">Add</button>
                                                <button type="button" class="btn btn-danger py-1" data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            {/*End modal popup  */}



                        </div>
                        : null}
                </div>
                : ''}

        </div >
    )
}

export default SearchFilter;