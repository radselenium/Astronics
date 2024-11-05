import React, { useEffect, useState, useRef } from 'react';
import Header from "../Header"
import axios from 'axios';
import HttpClient from '../config/HttpConfig';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { format, getTime, subMonths } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

const CustomFilter = (props) => {
    console.log(props)
    const [sourceselectValue, SourcesetSelectValue] = useState("All");
    const [productselectValue, setproductSelectValue] = useState("All");
    const [CustomDate, setCustomDate] = useState("");
    const [startDate, setStartDate] = useState(subMonths(new Date(), 1));
    const [endDate, setEndDate] = useState(new Date());
    //const [messagesperType, setmessagesPerType] = useState([]);
    //const [messagesPerDay, setmessagesperDay] = useState([]);
    const messageType = {
        incomingMessage: 0,
        recievedMessages: 0,
        processedMessages: 0,
        inQueue: 0,
        failedProcessing: 0,
        resolvedMessages: 0,
        dispatchedMessages: 0,
        archivedMessages: 0
    }
    //const [messages, setMessages] = props.messages;

    //Custom Date Filter
    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        // date.setUTCHours(23, 59, 59, 999);
        setEndDate(date);
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


    const ProductonChange = (event) => {
        const value = event.target.value;
        console.log(value);
        console.log(setproductSelectValue(value));
        setproductSelectValue(value);
        setproductSelectValue(value);
       // props.setproductSelectValue(value);
    };

    const SourceonChange = (event) => {
        const value = event.target.value;
        console.log(value);
        console.log(SourcesetSelectValue(value));
        SourcesetSelectValue(value);
        SourcesetSelectValue(value);
        props.SourcesetSelectValue(value);
    };
    const InitialRender =useRef(1);
    const DateRangeonChange = (event) => {
        const value1 = event.target.value;
        setCustomDate(value1);
        console.log(value1);
        props.setDateSelectValue(value1);

        if(CustomDate == 'Custom'){
            setStartDate(subMonths(new Date(), 1))
            const EndDate = new Date();
            EndDate.setUTCHours(23,59,59,999);
            EndDate.setDate(EndDate.getDate() - 1)
            setEndDate(EndDate);
        }
        
        if(InitialRender && CustomDate =='Custom'){
            getTimeRange(value1, InitialRender);
            InitialRender.current = 0;
            return;
        }
        getTimeRange(value1,InitialRender)
       // getTimeRange(value1, 1)
    };
    const getTimeRange = (selectValue, isInitial) => {
        console.log(sourceselectValue);
        //console.log(props.dateSelectValue);
        const ProductSource = productselectValue;
        console.log(ProductSource);
        const MessageSource = sourceselectValue;
        console.log(MessageSource);
        const DateRangeValue = selectValue;
        const currentDate = new Date();
        console.log(selectValue);
        const epochDate = new Date(0);
        // console.log(epochDate); // Pass 0 as the timestamp to represent the epoch time
        console.log(epochDate.toISOString());
        var ProductTypeValue="";
        var MessageSourceValue = "";
        var SetDateValue = "";
        var StartDate = "";
        var EndDate = "";
        var formattedStartDate = "";
        var formattedEndDate = "";

        props.SourcesetSelectValue(MessageSource);
    props.setDateSelectValue(selectValue);
    props.setproductSelectValue(productselectValue)

        if (ProductSource == "AeroBuy") {
            ProductTypeValue = ProductSource;
        } else if (ProductSource == "AeroRepair") {
            ProductTypeValue = ProductSource;
        } else if (ProductSource == "All") {
            ProductTypeValue = ProductSource;

        } else {

        }

        if (MessageSource == "AEX") {
            MessageSourceValue = MessageSource;
        } else if (MessageSource == "ASTRONICS") {
            MessageSourceValue = MessageSource;
        } else if (MessageSource == "All") {
            MessageSourceValue = MessageSource;

        } else {

        }


        //DateRange
        // if (selectValue == "All") {
        //     props.setmessagesPerDay([]);
        //     props.setShowDayChart(false)
        //     StartDate = new Date(0);
        //     StartDate.setUTCHours(0, 0, 0, 0);
        //     formattedStartDate = StartDate.toISOString();
        //     console.log(formattedStartDate);

        //     EndDate = new Date();
        //     EndDate.setUTCHours(23, 59, 59, 999);
        //     formattedEndDate = EndDate.toISOString();
        //     console.log(formattedEndDate);

        //     const formdata = {
        //         formattedStartDate: formattedStartDate,
        //         formattedEndDate: formattedEndDate,
                
        //     }
          
        //     if (MessageSource !== "BOTH") {
        //         formdata.xmlMessageSource = MessageSource; // Add xmlMessageSource property
        //     }
            
        //     getRecords(formdata, selectValue)
           

        // } 
        if (selectValue === "Today") {
           // props.setmessagesPerDay([]);
            props.setShowDayChart(true);
        
            // Set start of today
            const StartDate = new Date();
            StartDate.setUTCHours(0, 0, 0, 0); // Start of today (UTC 00:00:00)
            const formattedStartDate = StartDate.toISOString();
        
            // Set end of today
            const EndDate = new Date();
            EndDate.setUTCHours(23, 59, 59, 999); // End of today (UTC 23:59:59)
            const formattedEndDate = EndDate.toISOString();
        
            console.log("Start Date:", formattedStartDate);
            console.log("End Date:", formattedEndDate);

            props.setStartDate(formattedStartDate);
            props.setEndDate(formattedEndDate);
        
            const formdata = {
                formattedStartDate: formattedStartDate,
                formattedEndDate: formattedEndDate,
                // xmlMessageSource: MessageSource
            };
        
            // Conditionally add xmlMessageSource if MessageSource is not "BOTH"
            if (MessageSource !== "All") {
                formdata.xmlMessageSource = MessageSource;
            }
            if (ProductSource !== "All") {
                formdata.productType = ProductSource;
            }
        
            // Send form data to getRecords function
            getRecords(formdata, selectValue);
        }
        
        else if (selectValue == "Last7Days") {
            props.setShowDayChart(true)
            SetDateValue = DateRangeValue;
            StartDate = new Date();
            StartDate.setDate(StartDate.getDate() - 6);
            console.log(StartDate);
            StartDate.setUTCHours(0, 0, 0, 0);
            formattedStartDate = StartDate.toISOString();
            console.log(formattedStartDate);
            EndDate = new Date();
            EndDate.setUTCHours(23, 59, 59, 999);
            formattedEndDate = EndDate.toISOString();
            console.log(formattedEndDate);

            props.setStartDate(formattedStartDate);
            props.setEndDate(formattedEndDate);

            const formdata = {
                formattedStartDate: formattedStartDate,
                formattedEndDate: formattedEndDate,
                //  xmlMessageSource: MessageSource
            }
            // Conditionally add xmlMessageSource if MessageSource is not "BOTH"
            if (MessageSource !== "All") {
                formdata.xmlMessageSource = MessageSource; // Add xmlMessageSource property
            }
            if (ProductSource !== "All") {
                formdata.productType = ProductSource;
            }
            console.log(formdata);

            getRecords(formdata, selectValue)

        } else if (selectValue == "CurrentWeek") {
            props.setShowDayChart(true)
            SetDateValue = DateRangeValue;

            // Get today's date
            const today = new Date();

            // Find the start of the current week (Monday)
            StartDate = new Date(today);
            const dayOfWeek = StartDate.getDay();
            const differenceToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // If Sunday, subtract 6 to get Monday
            StartDate.setDate(StartDate.getDate() - differenceToMonday);
            StartDate.setUTCHours(0, 0, 0, 0);
            formattedStartDate = StartDate.toISOString();
            console.log("Start of the week (Monday):", formattedStartDate);

            // Find the end of the current week (Sunday)
            EndDate = new Date(today);
            const differenceToSunday = 7 - dayOfWeek; // Calculate days to next Sunday
            EndDate.setDate(EndDate.getDate() + differenceToSunday);
            EndDate.setUTCHours(23, 59, 59, 999);
            formattedEndDate = EndDate.toISOString();
            console.log("End of the week (Sunday):", formattedEndDate);

            props.setStartDate(formattedStartDate);
            props.setEndDate(formattedEndDate);

            const formdata = {
                formattedStartDate: formattedStartDate,
                formattedEndDate: formattedEndDate,
                // xmlMessageSource: MessageSource
            };
            // Conditionally add xmlMessageSource if MessageSource is not "BOTH"
            if (MessageSource !== "All") {
                formdata.xmlMessageSource = MessageSource; // Add xmlMessageSource property
            }
            if (ProductSource !== "All") {
                formdata.productType = ProductSource;
            }
            console.log(formdata);

            getRecords(formdata, selectValue);
        }

        else if (selectValue == "CurrentMonth") {
            props.setmessagesPerDay([]);
            props.setShowDayChart(false)
            SetDateValue = DateRangeValue;

            // Get today's date
            const today = new Date();

            // Find the start of the current month (1st day)
            StartDate = new Date(today.getFullYear(), today.getMonth(), 1);
            console.log("Start of the month:", StartDate);
            // Add 5 hours and 30 minutes
            StartDate.setHours(StartDate.getHours() + 5);
            StartDate.setMinutes(StartDate.getMinutes() + 30);
            StartDate.setUTCHours(0, 0, 0, 0); // Start of the day
            console.log("Start of the month:", StartDate);
            formattedStartDate = StartDate.toISOString();
            console.log("Start of the month:", formattedStartDate);

            // Find the end of the current month (last day)
            EndDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); // 0 gives the last day of the previous month
            EndDate.setUTCHours(23, 59, 59, 999); // End of the day
            formattedEndDate = EndDate.toISOString();
            console.log("End of the month:", formattedEndDate);

            props.setStartDate(formattedStartDate);
            props.setEndDate(formattedEndDate);

            const formdata = {
                formattedStartDate: formattedStartDate,
                formattedEndDate: formattedEndDate,
                //xmlMessageSource: MessageSource
            };
            // Conditionally add xmlMessageSource if MessageSource is not "BOTH"
            if (MessageSource !== "All") {
                formdata.xmlMessageSource = MessageSource; // Add xmlMessageSource property
            }
            if (ProductSource !== "All") {
                formdata.productType = ProductSource;
            }
            console.log(formdata);

            getRecords(formdata, selectValue);
        }






        else if (selectValue == "LastMonth") {
            props.setmessagesPerDay([]);
            props.setShowDayChart(false)
            SetDateValue = DateRangeValue;
            var currentDate1 = new Date();
            console.log(currentDate1);
            var firstDayOfPreviousMonth = new Date(currentDate1.getFullYear(), currentDate1.getMonth() - 1, 1);
            var lastDayOfPreviousMonth = new Date(currentDate1.getFullYear(), currentDate1.getMonth(), 0);


            // Add 5 hours and 30 minutes
            firstDayOfPreviousMonth.setHours(firstDayOfPreviousMonth.getHours() + 5);
            firstDayOfPreviousMonth.setMinutes(firstDayOfPreviousMonth.getMinutes() + 30);
            lastDayOfPreviousMonth.setHours(lastDayOfPreviousMonth.getHours() + 5);
            lastDayOfPreviousMonth.setMinutes(lastDayOfPreviousMonth.getMinutes() + 30);
            console.log(firstDayOfPreviousMonth);

            console.log(firstDayOfPreviousMonth);
            console.log(lastDayOfPreviousMonth);
            // Set time to midnight (00:00:00.000) in UTC
            firstDayOfPreviousMonth.setUTCHours(0, 0, 0, 0);
            lastDayOfPreviousMonth.setUTCHours(23, 59, 59, 999);

            // Output as ISO strings
            const utcFirstDay = firstDayOfPreviousMonth.toISOString();
            const utcLastDay = lastDayOfPreviousMonth.toISOString();
            formattedStartDate = utcFirstDay;
            formattedEndDate = utcLastDay;
            console.log("First Day of Previous Month:", formattedStartDate);
            console.log("Last Day of Previous Month:", formattedEndDate);

            props.setStartDate(formattedStartDate);
            props.setEndDate(formattedEndDate);

            const formdata = {
                formattedStartDate: formattedStartDate,
                formattedEndDate: formattedEndDate,
                // xmlMessageSource: MessageSource
            }
            // Conditionally add xmlMessageSource if MessageSource is not "BOTH"
            if (MessageSource !== "All") {
                formdata.xmlMessageSource = MessageSource; // Add xmlMessageSource property
            }
            if (ProductSource !== "All") {
                formdata.productType = ProductSource;
            }
            console.log(formdata);
            getRecords(formdata, selectValue)



        }


        else if (selectValue == "Custom") {
            // DateRangeValue=DateRangeValue;
            props.setmessagesPerDay([]);
            props.setShowDayChart(false)
            const StartCustomDate = startDate;
            const EndCustomDate = endDate;
            console.log(startDate);
            console.log(endDate);
            StartCustomDate.setUTCHours(0, 0, 0, 0);
            EndCustomDate.setUTCHours(23, 59, 59, 999);
            console.log(isInitial.current);
            if (!isInitial.current) {
                EndCustomDate.setDate(EndCustomDate.getDate() + 1);
                formattedStartDate = StartCustomDate.toISOString();
                formattedEndDate = EndCustomDate.toISOString();
                EndCustomDate.setDate(EndCustomDate.getDate() - 1);
                console.log("Not Initial");
            } else {
                formattedStartDate = StartCustomDate.toISOString();
                formattedEndDate = EndCustomDate.toISOString();
                EndCustomDate.setDate(EndCustomDate.getDate() - 1);
                console.log("Initial");
            }
            console.log(formattedStartDate);
            console.log(formattedEndDate);
            if (formattedStartDate > formattedEndDate) {
                toast("Invalid Start Date", {
                    position: "top-right",
                    type: "error",
                });
                return;
            }

            props.setStartDate(formattedStartDate);
            props.setEndDate(formattedEndDate);

            const formdata = {
                formattedStartDate: formattedStartDate,
                formattedEndDate: formattedEndDate,
                // xmlMessageSource: MessageSource,
            };
            // Conditionally add xmlMessageSource if MessageSource is not "BOTH"
            if (MessageSource !== "All") {
                formdata.xmlMessageSource = MessageSource; // Add xmlMessageSource property
            }
            if (ProductSource !== "All") {
                formdata.productType = ProductSource;
            }
            getRecords(formdata, selectValue);
        }

        // else if (selectValue == "Custom") {

        //     const StartCustomDate = startDate;
        //     const EndCustomDate = endDate;
        //     StartCustomDate.setUTCHours(0, 0, 0, 0);
        //     EndCustomDate.setUTCHours(23, 59, 59, 999);
        //     EndCustomDate.setDate(EndCustomDate.getDate() + 1);
        //     formattedStartDate=StartCustomDate.toISOString();
        //     formattedEndDate= EndCustomDate.toISOString();
        //     EndCustomDate.setDate(EndCustomDate.getDate() - 1);
        //     console.log(formattedStartDate);
        //     console.log(formattedEndDate);
        //     if(formattedStartDate > formattedEndDate){
        //         toast("Invalid Start Date",{
        //             position:"top-right",
        //             type:"error"
        //         })
        //         return;
        //     }
        //     const formdata = {
        //         formattedStartDate: formattedStartDate,
        //         formattedEndDate: formattedEndDate,
        //         xmlMessageSource: MessageSource
        //     }
        //     getRecords(formdata,selectValue);


        // }


        // if (MessageSourceValue !== null && SetDateValue !== null) {

        // }
    }

    // useEffect(() => {
    //     getTimeRange(props.dateSelectValue, 1)

    // }, [sourceselectValue]);


    const flag = useRef(true);
    useEffect(() => {
      if (flag.current) {
        getTimeRange(props.dateSelectValue, 1);
        flag.current = false;
        return;
      }
      getTimeRange(props.dateSelectValue, 0);
    }, [sourceselectValue,productselectValue]);

    const getRecords = (formdata, selectValue) => {
        // HttpClient.post(
        //     '/api/getAllStatusCount', formdata

        // )
        HttpClient.get(
            '/api/getAllStatusCount/findByAggregateQuery', {
            params: formdata
        }
        )

            .then(function (response) {
                console.log(response.data);
                const firstItem = response.data || {}; // Get the first item or an empty object
                const { statusCounts = [], overallCount = 0 } = firstItem; // Default to empty array and 0 for overallCount

                console.log('Status Counts:', statusCounts);
                console.log('Overall Count:', overallCount);

                // const { statusCounts, overallCount } = response.data[0]?response.data[0]:[];
                // console.log('Status Counts:', statusCounts);
                // console.log('Overall Count:', overallCount);

                messageType.incomingMessage = overallCount ? overallCount : 0;

                if (Array.isArray(statusCounts)) {
                    statusCounts.forEach((statusCount) => {
                        const { status, count } = statusCount; // Destructure the status and count

                        // Switch case for different statuses
                        switch (status) {
                            case 'Picked_up':
                                messageType.processedMessages = count;
                                break;
                            case 'Awaiting_pickup':
                                messageType.inQueue = count;
                                break;
                            case 'Failed':
                                messageType.failedProcessing = count;
                                break;
                            case 'Dispatched':
                                messageType.dispatchedMessages = count;
                                break;
                            case 'Archived':
                                messageType.archivedMessages = count;
                                break;

                            default:
                                // Handle unknown status, if necessary
                                break;
                        }
                    });
                }
                // if (Array.isArray(statusCounts)) {
                //     statusCounts.forEach(statusCount => {
                //         const { _id, count } = statusCount;
                //         switch (_id.status) {
                //             case "PROCESSED":
                //                 messageType.processedMessages = count;
                //                 break;
                //             case "QUEUED":
                //                 messageType.inQueue = count;
                //                 break;
                //             case "FAILED":
                //                 messageType.failedProcessing = count;
                //                 break;

                //             default:
                //                 break;
                //         }
                //     });
                // }
                props.setMessages({ ...messageType })
            })
        HttpClient.get('/api/getMessageTypeCount/messageTypeAggregateQuery', { params: formdata }).then(function (response) {
            try {
                //const response =  fetch('');
                const result = response.data;
                console.log(result);
                const filteredData = result.filter(entry => entry.messageType !== null);
                props.setmessagesPerType(filteredData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        })
        if (selectValue == 'Last7Days'|| 'Today') {
            HttpClient.get('/api/getAllMessagePerDayCount/findByAggregateQueryMessagePerDay', { params: formdata }).then(function (response) {
                console.log(response)
                console.log(response.data);
                const result = (response.data)
                result.forEach(element => {
                    if (element._id) {
                        element._id = moment(element._id).format('DD-MMM');

                    }
                });
                props.setmessagesPerDay(result);
            })
        }
        if (selectValue == 'CurrentWeek') {
            HttpClient.get('/api/getAllMessagePerDayCount/findByAggregateQueryMessagePerDay', { params: formdata }).then(function (response) {
                console.log(response)
                console.log(response.data);
                const result = (response.data)
                result.forEach(element => {
                    if (element._id) {
                        element._id = moment(element._id).format('DD-MMM');

                    }
                });
                props.setmessagesPerDay(result);
            })
        }
    }
    return (
        <>
            <div class="card-custom-border card flex-d-row justify-content-end py-2 px-5" id="custom-search-bar">
                <div className=' flex-d-row align-items-center justify-content-end'>
                    <div className=" flex-d-row mx-5">
                        {/* <!-- First Dropdown for Message Source --> */}

                        <div className='px-3 d-flex align-items-center'>
                            <label for="selectDropdown2" className="fs-5 fw-semibold">Product:</label>
                        </div>
                        <div>
                            <select class="form-select" id="selectDropdown2" style={{ padding: "2px 5px", minWidth: "120px" }} onChange={ProductonChange}>
                                <option value="All">All</option>
                                <option value="AeroBuy">AeroBuy</option>
                                <option value="AeroRepair">AeroRepair</option>
                               

                            </select>
                        </div>
                    </div>


                    <div className=" flex-d-row mx-5">
                        {/* <!-- First Dropdown for Message Source --> */}

                        <div className='px-3 d-flex align-items-center'>
                            <label for="selectDropdown1" className="fs-5 fw-semibold">Source:</label>
                        </div>
                        <div>
                            <select class="form-select" id="selectDropdown1" style={{ padding: "2px 5px", minWidth: "120px" }} onChange={SourceonChange}>
                                <option value="All">All</option>
                                <option value="ASTRONICS">Astronics</option>
                                <option value="AEX">Aex</option>
                                

                            </select>
                        </div>
                    </div>


                    <div className=" flex-d-row ms-5">
                        {/* <!-- Second Dropdown for Time Range--> */}
                        <div className='px-3 d-flex align-items-center'>
                            <label for="selectDropdown2" className="fs-5 fw-semibold">Date Range:</label>
                        </div>
                        <div>
                            <select class="form-select form-control" id="selectDropdown2" style={{ padding: "2px 5px", minWidth: "120px" }} onChange={DateRangeonChange}>
                                {/* <option value="All">All</option> */}
                                <option value="Today">Today</option>
                                <option value="Last7Days">Last 7 Days</option>
                                <option value="CurrentWeek">Current Week</option>
                                <option value="CurrentMonth">Current Month</option>
                                {/* <option value="LastMonth">Last Month</option> */}
                                <option value="Custom" >Custom</option>

                            </select>
                        </div>
                    </div>
                </div>
            </div>


            {CustomDate === "Custom" && <div class="card-custom-border card flex-d-row justify-content-end py-2 px-3 mt-3" id="custom-search-bar">
                <div className='col-5 flex-d-row align-items-center justify-content-center'>
                    {/* <div class="px-2 col-md-6 d-flex float-right justify-content-end">
            <span class=" fw-small text-dark fs-6">Received Date From</span>
        </div> */}

                    <div class="col-md-5 d-flex justify-content-end">

                        <DatePicker
                            selected={startDate}
                            onChange={handleStartDateChange}
                            customInput={<CustomDatePickerInput />}
                            dateFormat="dd-MMM-yyyy"
                            style={{ width: "100%" }}
                            wrapperClassName='date-picker-custom-width'
                           // minDate={startDate}
                        />
                    </div>
                    <div class="col-md-5 d-flex justify-content-end">

                        <DatePicker
                            selected={endDate}
                            onChange={handleEndDateChange}
                            customInput={<CustomDatePickerInput />}
                            dateFormat="dd-MMM-yyyy"
                            style={{ width: "100%" }}
                            wrapperClassName='date-picker-custom-width'

                        />
                    </div>
                    <div class="col-md-2 d-flex justify-content-end">
                        <button href="#" class="btn btn-primary btn-sm" onClick={() => getTimeRange("Custom", 0)}>
                            <i class="ki-outline ki-magnifier fs-8"></i>
                            Search
                        </button>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default CustomFilter