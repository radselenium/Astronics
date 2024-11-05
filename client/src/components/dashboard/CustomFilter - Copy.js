import React, { useEffect, useState, useRef } from 'react';
import Header from "../Header"
import axios from 'axios';
import HttpClient from '../config/HttpConfig';
import moment from 'moment';

const CustomFilter = (props) => {
    console.log(props)
    const [sourceselectValue, SourcesetSelectValue] = useState("AEX");

    //const [messagesperType, setmessagesPerType] = useState([]);
    //const [messagesPerDay, setmessagesperDay] = useState([]);
    const messageType = {
        incomingMessage: 0,
        recievedMessages: 0,
        processedMessages: 0,
        inQueue: 0,
        failedProcessing: 0,
        resolvedMessages: 0,
    }
    //const [messages, setMessages] = props.messages;
    const SourceonChange = (event) => {
        const value = event.target.value;
        console.log(value);
        console.log(SourcesetSelectValue(value));
        SourcesetSelectValue(value);
    };
    const DateRangeonChange = (event) => {
        const value1 = event.target.value;
        console.log(value1);
        props.setDateSelectValue(value1);
        getTimeRange(value1)
    };
    const getTimeRange = (selectValue) => {
        console.log(sourceselectValue);
        //console.log(props.dateSelectValue);
        const MessageSource = sourceselectValue;
        console.log(MessageSource);
        const DateRangeValue = selectValue;
        const currentDate = new Date();
        console.log(selectValue);
        const epochDate = new Date(0);
        // console.log(epochDate); // Pass 0 as the timestamp to represent the epoch time
        console.log(epochDate.toISOString());
        var MessageSourceValue = "";
        var SetDateValue = "";
        var StartDate = "";
        var EndDate = "";
        var formattedStartDate = "";
        var formattedEndDate = "";
        if (MessageSource == "AEX") {
            MessageSourceValue = MessageSource;
        } else if (MessageSource == "SELLER") {
            MessageSourceValue = MessageSource;
        } else {

        }

        //DateRange
        if (selectValue == "All") {
            props.setmessagesPerDay([]);
            props.setShowDayChart(false)
            StartDate = new Date(0);
            StartDate.setUTCHours(0, 0, 0, 0);
            formattedStartDate = StartDate.toISOString();
            console.log(formattedStartDate);

            EndDate = new Date();
            EndDate.setUTCHours(23, 59, 59, 999);
            formattedEndDate = EndDate.toISOString();
            console.log(formattedEndDate);
            const formdata = {
                formattedStartDate: formattedStartDate,
                formattedEndDate: formattedEndDate,
                xmlMessageSource: MessageSource
            }
            // console.log(formdata);
            getRecords(formdata, selectValue)
            // HttpClient.post('/api/getAllStatusCount', formdata).then(function (response) {
            //     console.log(response.data);
            //     const { statusCounts, overallCount } = response.data[0];
            //     console.log('Status Counts:', statusCounts);
            //     console.log('Overall Count:', overallCount);

            //     messageType.incomingMessage = overallCount;
            //     if (Array.isArray(statusCounts)) {
            //         statusCounts.forEach(statusCount => {
            //             const { _id, count } = statusCount;
            //             switch (_id.status) {
            //                 case "DONE":
            //                     messageType.processedMessages = count;
            //                     break;
            //                 case "QUEUED":
            //                     messageType.inQueue = count;
            //                     break;
            //                 case "DONE W/ERRORS":
            //                     messageType.failedProcessing = count;
            //                     break;
            //                 case "RESOLVED":
            //                     messageType.resolvedMessages = count;
            //                     break;
            //                 case "RECEIVED":
            //                     messageType.recievedMessages = count;
            //                     break;
            //                 default:
            //                     break;
            //             }
            //         });
            //     }
            //     props.setMessages({ ...messageType })
            // })
            // HttpClient.post('/api/getMessageTypeCount', formdata).then(function (response) {
            //     try {
            //         //const response =  fetch('');
            //         const result = response.data;
            //         console.log(result);
            //         const filteredData = result.filter(entry => entry._id !== null);
            //         props.setmessagesPerType(filteredData);
            //     } catch (error) {
            //         console.error('Error fetching data:', error);
            //     }

            // })

        } else if (selectValue == "Last7Days") {
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
            const formdata = {
                formattedStartDate: formattedStartDate,
                formattedEndDate: formattedEndDate,
                xmlMessageSource: MessageSource
            }
            console.log(formdata);

            getRecords(formdata, selectValue)

        } else if (selectValue == "LastMonth") {
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
            const formdata = {
                formattedStartDate: formattedStartDate,
                formattedEndDate: formattedEndDate,
                xmlMessageSource: MessageSource
            }
            console.log(formdata);
            getRecords(formdata, selectValue)
            // HttpClient.post(
            //     '/api/getAllStatusCount', formdata

            // ).then(function (response) {
            //     console.log(response.data);
            //     const { statusCounts, overallCount } = response.data[0];
            //     console.log('Status Counts:', statusCounts);
            //     console.log('Overall Count:', overallCount);

            //     messageType.incomingMessage = overallCount;
            //     if (Array.isArray(statusCounts)) {
            //         statusCounts.forEach(statusCount => {
            //             const { _id, count } = statusCount;
            //             switch (_id.status) {
            //                 case "DONE":
            //                     messageType.processedMessages = count;
            //                     break;
            //                 case "QUEUED":
            //                     messageType.inQueue = count;
            //                     break;
            //                 case "DONE W/ERRORS":
            //                     messageType.failedProcessing = count;
            //                     break;
            //                 case "RESOLVED":
            //                     messageType.resolvedMessages = count;
            //                     break;
            //                 case "RECEIVED":
            //                     messageType.recievedMessages = count;
            //                     break;
            //                 default:
            //                     break;
            //             }
            //         });
            //     }
            //     props.setMessages({ ...messageType })
            // })
            // HttpClient.post('/api/getMessageTypeCount', formdata).then(function (response) {
            //     try {
            //         //const response =  fetch('');
            //         const result = response.data;
            //         console.log(result);
            //         const filteredData = result.filter(entry => entry._id !== null);
            //         props.setmessagesPerType(filteredData);
            //     } catch (error) {
            //         console.error('Error fetching data:', error);
            //     }

            // })


        } else if (DateRangeValue == "Custom") {
            // DateRangeValue=DateRangeValue;
        }


        // if (MessageSourceValue !== null && SetDateValue !== null) {

        // }
    }
    useEffect(() => {
        getTimeRange(props.dateSelectValue)

    }, [sourceselectValue]);

    const getRecords = (formdata, selectValue) => {
        HttpClient.post(
            '/api/getAllStatusCount', formdata

        ).then(function (response) {
            //console.log(response.data);
            const { statusCounts, overallCount } = response.data[0]?response.data[0]:[];
            console.log('Status Counts:', statusCounts);
            console.log('Overall Count:', overallCount);

            messageType.incomingMessage = overallCount?overallCount:0;
            if (Array.isArray(statusCounts)) {
                statusCounts.forEach(statusCount => {
                    const { _id, count } = statusCount;
                    switch (_id.status) {
                        case "DONE":
                            messageType.processedMessages = count;
                            break;
                        case "QUEUED":
                            messageType.inQueue = count;
                            break;
                        case "DONE W/ERRORS":
                            messageType.failedProcessing = count;
                            break;
                        case "RESOLVED":
                            messageType.resolvedMessages = count;
                            break;
                        case "RECEIVED":
                            messageType.recievedMessages = count;
                            break;
                        default:
                            break;
                    }
                });
            }
            props.setMessages({ ...messageType })
        })
        HttpClient.post('/api/getMessageTypeCount', formdata).then(function (response) {
            try {
                //const response =  fetch('');
                const result = response.data;
                console.log(result);
                const filteredData = result.filter(entry => entry._id !== null);
                props.setmessagesPerType(filteredData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        })
        if (selectValue == 'Last7Days') {
            HttpClient.post('/api/getAllMessagePerDayCount', formdata).then(function (response) {
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
        <div class="card-custom-border card flex-d-row justify-content-end py-2 px-5" id="custom-search-bar">
        <div className=' flex-d-row align-items-center justify-content-end'>
            <div className=" flex-d-row mx-5">
                {/* <!-- First Dropdown for Message Source --> */}

                <div className='px-3 d-flex align-items-center'>
                    <label for="selectDropdown1" className="fs-5 fw-semibold">Source:</label>
                </div>
                <div>
                    <select class="form-select" id="selectDropdown1" style={{ padding: "2px 5px", minWidth: "120px" }} onChange={SourceonChange}>
                        <option value="AEX">Aex</option>
                        <option value="SELLER">Seller</option>

                    </select>
                </div>
            </div>


            <div className=" flex-d-row ms-5">
                {/* <!-- Second Dropdown for Time Range--> */}
                <div className='px-3 d-flex align-items-center'>
                    <label for="selectDropdown2" className="fs-5 fw-semibold">Date Range:</label>
                </div>
                <div>
                    <select class="form-select form-control" id="selectDropdown2" style={{ padding: "2px 5px", minWidth: "120px" }}  onChange={DateRangeonChange}>
                        <option value="All">All</option>
                        <option value="Last7Days">Last 7 Days</option>
                        <option value="LastMonth">Last Month</option>
                        <option value="Custom" disabled>Custom</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
    )
}

export default CustomFilter