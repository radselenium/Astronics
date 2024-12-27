import React, { useEffect, useState, useRef } from 'react';
import HttpClient from '../config/HttpConfig';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { subMonths } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

const CustomFilter = (props) => {
    const [sourceselectValue, SourcesetSelectValue] = useState("All");
    const [productselectValue, setproductSelectValue] = useState("All");
    const [CustomDate, setCustomDate] = useState("");
    const [startDate, setStartDate] = useState(subMonths(new Date(), 1));
    const [endDate, setEndDate] = useState(new Date());
    const [HandleChange, setHandleChange] = useState(false);
    const messageType = {
        incomingMessage: 0,
        recievedMessages: 0,
        processedMessages: 0,
        inQueue: 0,
        failedProcessing: 0,
        resolvedMessages: 0,
        dispatchedMessages: 0,
        deletedMessages: 0
    }

    //Custom startDate Filter
    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    //Custom EndDate Filter
    const handleEndDateChange = (date) => {
        setHandleChange(true);
        setEndDate(date);
    };

    const isCurrentZoneBehindUTC = (date) => {
        // Get the time string with the UTC offset in the specified time zone
        let offsetMinutes = new Date().getTimezoneOffset();
        if (offsetMinutes > 0) {
            const LocalDateTime = new Date(date);
            console.log(LocalDateTime);
            LocalDateTime.setHours(LocalDateTime.getHours() + 13);
            return LocalDateTime;
        }
        return date;
    };

    //Datepicker inputbox function as generic
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

    //productType setting value  
    const ProductonChange = (event) => {
        const value = event.target.value;
        setproductSelectValue(value);
        setproductSelectValue(value);
    };

    //sourceType setting value  
    const SourceonChange = (event) => {
        const value = event.target.value;
        SourcesetSelectValue(value);
        SourcesetSelectValue(value);
        props.SourcesetSelectValue(value);
    };

    const InitialRender = useRef(1);

    //Date Range Logic for Custom option
    const DateRangeonChange = (event) => {
        const value1 = event.target.value;
        setCustomDate(value1);
        props.setDateSelectValue(value1);

        if (value1 == "Custom" && !InitialRender.current) {
            setStartDate(subMonths(new Date(), 1))
            const EndDate = new Date();
            EndDate.setUTCHours(23, 59, 59, 999);
            EndDate.setDate(EndDate.getDate() - 1)
            setEndDate(EndDate);
        }

        if (InitialRender.current && value1 == 'Custom') {
            getTimeRange(value1, InitialRender);
            InitialRender.current = 0;
            return;
        }
        getTimeRange(value1, InitialRender)

    };

    //Date Range logic for different option value
    const getTimeRange = (selectValue, isInitial) => {
        const ProductSource = productselectValue;
        const MessageSource = sourceselectValue;
        const DateRangeValue = selectValue;
        const currentDate = new Date();
        const epochDate = new Date(0);// Pass 0 as the timestamp to represent the epoch time
        var ProductTypeValue = "";
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

        if (selectValue === "Today") {
            props.setShowDayChart(true);
            // Set start of today
            const StartDate = new Date();
            StartDate.setUTCHours(0, 0, 0, 0); // Start of today (UTC 00:00:00)
            const formattedStartDate = StartDate.toISOString();
            // Set end of today
            const EndDate = new Date();
            EndDate.setUTCHours(23, 59, 59, 999); // End of today (UTC 23:59:59)
            const formattedEndDate = EndDate.toISOString();
            props.setStartDate(formattedStartDate);
            props.setEndDate(formattedEndDate);

            const formdata = {
                formattedStartDate: formattedStartDate,
                formattedEndDate: formattedEndDate,

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
            StartDate.setUTCHours(0, 0, 0, 0);
            formattedStartDate = StartDate.toISOString();
            EndDate = new Date();
            EndDate.setUTCHours(23, 59, 59, 999);
            formattedEndDate = EndDate.toISOString();
            props.setStartDate(formattedStartDate);
            props.setEndDate(formattedEndDate);

            const formdata = {
                formattedStartDate: formattedStartDate,
                formattedEndDate: formattedEndDate,

            }
            // Conditionally add xmlMessageSource if MessageSource is not "All"
            if (MessageSource !== "All") {
                formdata.xmlMessageSource = MessageSource; // Add xmlMessageSource property
            }
            if (ProductSource !== "All") {
                formdata.productType = ProductSource;
            }
            console.log(formdata);

            getRecords(formdata, selectValue)

        }
        else if (selectValue == "CurrentWeek") {
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

            // Find the end of the current week (Sunday)
            EndDate = new Date(today);
            const differenceToSunday = 7 - dayOfWeek; // Calculate days to next Sunday
            EndDate.setDate(EndDate.getDate() + differenceToSunday);
            EndDate.setUTCHours(23, 59, 59, 999);
            formattedEndDate = EndDate.toISOString();

            props.setStartDate(formattedStartDate);
            props.setEndDate(formattedEndDate);

            const formdata = {
                formattedStartDate: formattedStartDate,
                formattedEndDate: formattedEndDate,

            };
            // Conditionally add xmlMessageSource if MessageSource is not "All"
            if (MessageSource !== "All") {
                formdata.xmlMessageSource = MessageSource; // Add xmlMessageSource property
            }
            if (ProductSource !== "All") {
                formdata.productType = ProductSource;
            }


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

            // Add 5 hours and 30 minutes
            StartDate.setHours(StartDate.getHours() + 5);
            StartDate.setMinutes(StartDate.getMinutes() + 30);
            StartDate.setUTCHours(0, 0, 0, 0); // Start of the day
            console.log("Start of the month:", StartDate);
            formattedStartDate = StartDate.toISOString();
            console.log("Start of the month:", formattedStartDate);

            // Find the end of the current month (last day)
            const EndDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() + 1, 0));
            EndDate.setUTCHours(23, 59, 59, 999); // End of the day
            formattedEndDate = EndDate.toISOString();

            props.setStartDate(formattedStartDate);
            props.setEndDate(formattedEndDate);

            const formdata = {
                formattedStartDate: formattedStartDate,
                formattedEndDate: formattedEndDate,

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


        else if (selectValue == "Custom") {
            props.setmessagesPerDay([]);
            props.setShowDayChart(false)
            const StartCustomDate = startDate;
            const EndCustomDate = endDate;
            console.log(startDate);
            console.log(endDate);
            const offminutes = new Date().getTimezoneOffset(); // for utc negative regions
            if (offminutes > 0 && HandleChange) {
                EndCustomDate.setDate(EndCustomDate.getDate() - 1);       // for utc negative regions
                setHandleChange(false);
            }
            StartCustomDate.setUTCHours(0, 0, 0, 0);
            EndCustomDate.setUTCHours(23, 59, 59, 999);
            console.log(isInitial.current);
            if (!isInitial.current) {
                EndCustomDate.setDate(EndCustomDate.getDate() + 1);
                formattedStartDate = StartCustomDate.toISOString();
                formattedEndDate = EndCustomDate.toISOString();
                EndCustomDate.setDate(EndCustomDate.getDate() - 1);

            } else {
                formattedStartDate = StartCustomDate.toISOString();
                formattedEndDate = EndCustomDate.toISOString();
                EndCustomDate.setDate(EndCustomDate.getDate() - 1);

            }

            if (formattedStartDate > formattedEndDate) {
                toast("start date is greater than the end date.", {
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

            };
            // Conditionally add xmlMessageSource if MessageSource is not "All"
            if (MessageSource !== "All") {
                formdata.xmlMessageSource = MessageSource; // Add xmlMessageSource property
            }
            if (ProductSource !== "All") {
                formdata.productType = ProductSource;
            }
            getRecords(formdata, selectValue);
        }

    }

    const flag = useRef(true);
    useEffect(() => {
        if (flag.current) {
            getTimeRange(props.dateSelectValue, 1);
            flag.current = false;
            return;
        }
        getTimeRange(props.dateSelectValue, 0);
    }, [sourceselectValue, productselectValue]);


    useEffect(()=>{
        if(props.dateSelectValue =="Custom" && !flag.current){
            setStartDate(startDate => subMonths(new Date(), 1))
            const EndDate = new Date();
            EndDate.setUTCHours(23,59,59,999);
            EndDate.setDate(EndDate.getDate() - 1)
            setEndDate(endDate => EndDate);
            console.log(startDate);
            console.log(endDate);
            console.log("Inside Not InitialRender");
            getTimeRange(props.dateSelectValue, 0);
        }
      
    },[props.dateSelectValue])

    const getRecords = (formdata, selectValue) => {

        HttpClient.get(
            '/api/getAllStatusCount/findByAggregateQuery', {
            params: formdata
        }
        )

            .then(function (response) {
                const firstItem = response.data || {}; // Get the first item or an empty object
                const { statusCounts = [], overallCount = 0 } = firstItem; // Default to empty array and 0 for overallCount

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
                            case 'Deleted':
                                messageType.deletedMessages = count;
                                break;

                            default:
                                // Handle unknown status, if necessary
                                break;
                        }
                    });
                }

                props.setMessages({ ...messageType })
            })
        HttpClient.get('/api/getMessageTypeCount/messageTypeAggregateQuery', { params: formdata }).then(function (response) {
            try {
                const result = response.data;
                const filteredData = result.filter(entry => entry.messageType !== null);
                props.setmessagesPerType(filteredData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        })
        if (selectValue == 'Last7Days' || 'Today' || 'CurrentWeek') {
            HttpClient.get('/api/getAllMessagePerDayCount/findByAggregateQueryMessagePerDay', { params: formdata }).then(function (response) {
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
            <div className="card-custom-border card flex-d-row justify-content-start py-2 px-5" id="custom-search-bar">
                <div className="flex-d-row align-items-center justify-content-start gap-2">

                    {/* Product Dropdown */}
                    <div className="flex-d-row mx-1 align-items-center">
                        <div className="px-3 label-container">
                            <label htmlFor="selectDropdown2" className="fs-5 fw-semibold">Product:</label>
                        </div>
                        <div>
                            <select className="form-select" id="selectDropdown2" style={{ padding: "2px 5px", minWidth: "130px" }} onChange={ProductonChange}>
                                <option value="All">All</option>
                                <option value="AeroBuy">AeroBuy</option>
                                <option value="AeroRepair">AeroRepair</option>
                            </select>
                        </div>
                    </div>

                    {/* Source Dropdown */}
                    <div className="flex-d-row mx-1 align-items-center">
                        <div className="px-3 label-container">
                            <label htmlFor="selectDropdown1" className="fs-5 fw-semibold">Source:</label>
                        </div>
                        <div>
                            <select className="form-select" id="selectDropdown1" style={{ padding: "2px 5px", minWidth: "130px" }} onChange={SourceonChange}>
                                <option value="All">All</option>
                                <option value="ASTRONICS">Astronics</option>
                                <option value="AEX">Aex</option>
                            </select>
                        </div>
                    </div>

                    {/* Date Range Dropdown */}
                    <div className="flex-d-row mx-1 align-items-center">
                        <div className="px-3 label-container">
                            <label htmlFor="selectDropdown3" className="fs-5 fw-semibold">Date Range:</label>
                        </div>
                        <div>
                            <select className="form-select" id="selectDropdown3" style={{ padding: "2px 5px", minWidth: "130px" }} onChange={DateRangeonChange}>
                                <option value="Today">Today</option>
                                <option value="Last7Days">Last 7 Days</option>
                                <option value="CurrentWeek">Current Week</option>
                                <option value="CurrentMonth">Current Month</option>
                                <option value="Custom">Custom</option>
                            </select>
                        </div>
                    </div>

                </div>
            </div>
            <ToastContainer />


            {CustomDate === "Custom" && (
                <div className="card-custom-border card flex-d-row align-items-start py-2 px-3 mt-3" id="custom-search-bar1">
                    <div className="col-12 flex-d-row align-items-center gap-3">
                        {/* Start Date */}
                        <div className="col-12 col-sm-12 col-md-4 col-lg-2 col-xl-2 d-flex align-items-center gap-2 dashboard-filter">
                            <label className="fw-small text-dark fs-6 col-sm-3 col-md-4 col-lg-4 col-xl-4 labelright">Start Date:</label>
                            <DatePicker
                                selected={isCurrentZoneBehindUTC(startDate)}
                                onChange={handleStartDateChange}
                                customInput={<CustomDatePickerInput />}
                                dateFormat="dd-MMM-yyyy"
                                wrapperClassName="date-picker-custom-width"
                            // minDate={startDate}
                            />
                        </div>

                        {/* End Date */}
                        <div className="col-12 col-sm-12 col-md-4 col-lg-2 col-xl-2 d-flex align-items-center gap-2 dashboard-filter">
                            <label className="fw-small text-dark fs-6 col-sm-3 col-md-4 col-lg-4 col-xl-4 labelright">End Date:</label>
                            <DatePicker
                                selected={isCurrentZoneBehindUTC(endDate)}
                                onChange={handleEndDateChange}
                                customInput={<CustomDatePickerInput />}
                                dateFormat="dd-MMM-yyyy"
                                wrapperClassName="date-picker-custom-width"
                            />
                        </div>

                        {/* Search Button */}
                        <div className="col-12 col-sm-12 col-md-2 col-lg-3 col-xl-3 d-flex align-items-center dashboard-filter">
                            <button href="#" className="btn btn-primary btn-sm " onClick={() => getTimeRange("Custom", 0)}>
                                <i className="ki-outline ki-magnifier fs-8"></i>
                                Search
                            </button>
                        </div>
                    </div>
                </div>

            )}


        </>
    )
}

export default CustomFilter