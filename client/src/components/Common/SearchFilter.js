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
import { toast } from 'react-toastify';

const SearchFilter = (props) => {

    const [messagesummary, setmessagesummary] = useState([]);
    const { showDataTable, setShowDataTable } = props;
    const [isSaved, setIsSaved] = useState(false);
    const [savedSearch, setSavedSearch] = useState([])
    const [isAdvanced, setIsAdvanced] = useState(false);
    const [filterRows, setFilterRows] = useState([{ key: 0, value: '' }]);
    const [saveButton, setSaveButton] = useState(props.showSaveButton);
    const [showSettings, setShowSettings] = useState(props.showSettings);
    const [showSearch, setShowSearch] = useState(props.showSearch);
    const [isSavedSelected, setIsSavedSelected] = useState(false);
    const [isEditable, setIsEditable] = useState(false)
    const [HandleChange, setHandleChange] = useState(false);
    console.log(new Date(props.endDate))
    console.log(new Date(props.startDate))
    console.log(props.setShowDataTable)
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
    // const [startDate, setStartDate] = useState(subMonths(new Date(), 3));
    // const [endDate, setEndDate] = useState(new Date());
    const [startDate, setStartDate] = useState(props.startDate);
    const [endDate, setEndDate] = useState(props.endDate);
    const [messageType, setMessageType] = useState('All');
    const [documentId, setDocumentId] = useState('');
    const [test, setTest] = useState('');
    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        console.log(date);
        setHandleChange(true);
        // date.setUTCHours(23, 59, 59, 999);
        setEndDate(date);
        console.log(endDate);
    };

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

    const SwitchSavedsearch = (e) => {
        setIsSaved(true);
    };
    const SwitchDefaultsearch = (e) => {
        setIsSaved(false);
        setIsSavedSelected(false);
        setIsEditable(false);
        setIsAdvanced(false);
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




    const isCurrentZoneBehindUTC = (date) => {
        // Get the time string with the UTC offset in the specified time zone
        console.log(date);
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
        // setEndDate((new Date()));
        const EndDate = new Date();
        EndDate.setUTCHours(23, 59, 59, 999);
        const QueryEndDate = EndDate;
        EndDate.setDate(EndDate.getDate() - 1)
        setEndDate(EndDate);
        //  setStartDate((prevStartDate) => (subMonths(new Date(), 3)));
        //setEndDate((prevEndDate) => new Date());
        setMessageType('All');
        setDocumentId('');
        console.log(startDate);
        console.log(endDate);

        const newFormData = {
            startDate: subMonths(startDate, 3),
            endDate: QueryEndDate,
            messageType: 'All',

        };
        console.log("test");
        //console.log('hi')
        props.getAllMessageData(newFormData)
        setShowDataTable(false);
        console.log(showDataTable)
        //getRecordBySearchValue(newFormData);
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
    // var getStartDate = startDate.getDate();

    const handleSubmit = (e) => {
        e.preventDefault();
        var getStartDate = formatDate(startDate, 0);
        console.log(getStartDate);
        var getEndDate = formatDate(endDate, 1);
        // getEndDate= new Date (getEndDate.setUTCHours(23, 59, 59, 999));
        console.log(getEndDate);
        //var getDocumentId = documentId??documentId;

        if (getStartDate > getEndDate) {
            toast("Invalid Start Date", {
                position: "top-right",
                type: "error"
            })
            return;
        }

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

    //     const formatDate = (date, addDate) => {

    //         var d = new Date(date),
    //             month = '' + (d.getMonth() + 1),
    //             day = '' + (date.getDate() + addDate),
    //             year = d.getFullYear();
    //         var d2 = new Date(year + "-" + month + "-" + day)
    //         console.log(d2)
    //         if(addDate==0){

    // return d2
    //         }
    //         else if(addDate==1)
    //         {

    //         return d2
    //         }
    //     }


    // const formatDate = (date, addDate) => {

    //     var d = new Date(date),
    //         month = '' + (d.getMonth() + 1),
    //         day = '' + (date.getDate() + addDate),
    //         year = d.getFullYear();
    //     var d2 = new Date(year + "-" + month + "-" + day)
    //     console.log(d2)
    //     d2.setDate(d2.getDate()+1);
    //     d2.setUTCHours(0, 0, 0, 0)
    //     if(addDate){
    //         d2.setTime(d2.getTime() - 1);
    //     }
    //     console.log(d2.toISOString());
    //     return d2.toISOString();

    // }


    const formatDate = (date, addDate) => {

        const d2 = date;
        if (addDate) {

            console.log(d2);
            const offminutes = new Date().getTimezoneOffset(); // for utc negative regions
            if (offminutes > 0 && HandleChange) {
                d2.setDate(d2.getDate() - 1);       // for utc negative regions
                setHandleChange(false);
            }
            d2.setUTCHours(23, 59, 59, 999);
            console.log("After ISOString" + d2.toISOString());

            console.log("End Date Condition");
            d2.setDate(d2.getDate() + 1);
            console.log("Before adding Date" + d2.toISOString());
            const endDate = d2.toISOString();
            d2.setDate(d2.getDate() - 1);
            console.log("After subtract Date" + d2.toISOString());

            return endDate;
        }
        d2.setUTCHours(0, 0, 0, 0);


        console.log(d2.toISOString());
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
                                <div className=" col-md-12 mt-5 flex-d-row pe-5 ps-5 justify-content-end" style={{ paddingLeft: "0px", marginLeft: "0px", marginRight: "0px" }} >
                                    <div class="col-md-4 col-lg-4 col-xl-4 col-xs-4 align-items-baseline mb-md-5  flex-d-row"  >
                                        <div class="px-2 col-md-6 d-flex float-right justify-content-end">
                                            <span class=" fw-small text-dark fs-6" >Received Date From</span>
                                        </div>

                                        <div class="col-md-6 d-flex">

                                            <DatePicker
                                                selected={isCurrentZoneBehindUTC(startDate)}
                                                onChange={handleStartDateChange}
                                                customInput={<CustomDatePickerInput />}
                                                dateFormat="dd-MMM-yyyy"
                                                wrapperClassName='date-picker-custom-width'
                                            />
                                        </div>
                                    </div>

                                    <div class="col-md-4 col-lg-4 col-xl-4 col-xs-4 align-items-baseline mb-md-5  flex-d-row"   >
                                        <div class="px-2 col-md-6 d-flex float-right justify-content-end">
                                            <span class="fw-small text-dark fs-6" >Received Date To </span>
                                        </div>

                                        <div className='col-md-6 d-flex' >


                                            <DatePicker
                                                selected={isCurrentZoneBehindUTC(endDate)}
                                                onChange={handleEndDateChange}
                                                customInput={<CustomDatePickerInput />}
                                                dateFormat="dd-MMM-yyyy"
                                                wrapperClassName='date-picker-custom-width'


                                            />



                                        </div>
                                    </div>
                                    <div class="col-md-4 col-lg-4 col-xl-4 mb-md-5 col-xs-4 flex-d-row align-items-baseline"   >
                                        <div class="px-2 col-md-6 d-flex float-right justify-content-end">
                                            <span class="fw-small text-dark fs-6 ">Message Type</span>
                                        </div>
                                        <div className='col-md-6'>
                                            <select class="form-select" name="messageType" value={messageType}
                                                onChange={(e) => setMessageType(e.target.value)} aria-label="Select example" style={{ padding: "2px 5px", }}>
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
                                    {/* <div class="col-md-4 col-lg-4 col-xl-4 mb-md-5  flex-d-row align-items-baseline"  >
                                        <div class="px-2 col-md-6 d-flex justify-content-end">
                                            <span class="fw-small text-dark fs-6" >Document ID</span>
                                        </div>
                                        <div class="col-md-6">
                                            <input type="text" name="documentId" value={documentId}
                                                onChange={(e) => setDocumentId(e.target.value)} class="form-control" style={{ padding: "2px 2px",  }} />
                                        </div>

                                    </div> */}


                                </div>










                                <div class="justify-content-end flex-d-row mb-2 mt-2">
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