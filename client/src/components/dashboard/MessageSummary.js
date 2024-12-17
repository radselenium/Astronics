import React, { useEffect, useState, useRef } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from "react-router-dom";

function MessageSummary(props) {
   // console.log(props)
    //console.log(props.sourceselectValue)
    const [isAdvanced, setIsAdvanced] = useState(false);
    const [filterRows, setFilterRows] = useState([{ key: 0, value: '' }]);
    //const [showSave, setshowSave] = useState(true);

    const [globalFilter, setGlobalFilter] = useState('');

    const [overallStatus, setOverallStatus] = useState('');
    const dt = useRef(null);

    const onFilter = (e) => {
        setGlobalFilter(e.target.value);
        dt.current.filter(e.target.value, 'global', 'contains');
    };

    const [startDate, setStartDate] = useState(getFormattedDate(new Date()));
    const [endDate, setEndDate] = useState(getFormattedDate(new Date()));
    const [messageType, setMessageType] = useState('All');
    const [documentId, setDocumentId] = useState('');

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };
    
   
    const Reset = () => {
        setStartDate(getFormattedDate(new Date()));
        setEndDate(getFormattedDate(new Date()));
        setMessageType('All');
        setDocumentId('');
      //  console.log('hi')
        //messageType="";
    };
    // Function to format a date as "YYYY-MM-DD"
    function getFormattedDate(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
       
    }


   


    const MultiStatusFilter = (SourceselectValue, dateOption) => {
        let statuses = [];
        if (SourceselectValue === "All") {
            if (dateOption === "Custom") {
                statuses = ["Dispatched", "Picked_up","Deleted"];
                return statuses;
            }
            statuses = ["Dispatched", "Picked_up"];
        } else if (SourceselectValue === "ASTRONICS") {
            if (dateOption === "Custom") {
                statuses = ["Dispatched","Deleted"];
                return statuses;
            }
            statuses = ["Dispatched"];
        } else {
            if (dateOption === "Custom") {
                statuses = ["Picked_up","Deleted"];
                return statuses;
            }
            statuses = ["Picked_up"];
        }
        return statuses;
    };

    var statuses = MultiStatusFilter(props.sourceselectValue, props.DateOption);



    const calculateMessageCount = () => {
        let messageCount = 0;

        if (props.sourceselectValue === "All") {
            if (props.DateOption === "Custom") {
                messageCount = 
                    Number(props.messages.processedMessages || 0) +
                    Number(props.messages.dispatchedMessages || 0) +
                    Number(props.messages.deletedMessages || 0);
                    console.log(messageCount);
            } else {
                messageCount = 
                    Number(props.messages.processedMessages || 0) +
                    Number(props.messages.dispatchedMessages || 0);
            }
        } else if (props.sourceselectValue === "ASTRONICS") {
            if (props.DateOption === "Custom") {
                messageCount = 
                    Number(props.messages.dispatchedMessages || 0) +
                    Number(props.messages.deletedMessages || 0);
            } else {
                messageCount = 
                    Number(props.messages.dispatchedMessages || 0);
            }
        } else {
            if (props.DateOption === "Custom") {
                messageCount = 
                    Number(props.messages.processedMessages || 0) +
                    Number(props.messages.deletedMessages || 0);
            } else {
                messageCount = 
                    Number(props.messages.processedMessages || 0);
            }
        }

        return messageCount;
    };
    


    return (
        <>





            <div>&nbsp;</div>

           

            {/*begin::Row*/}
            <div class="row g-5 g-xl-10 mb-xl-5 md-mb-5" id='messge-report-card'>

                {/*begin::Col*/}
                <div class="col-md-6 col-lg-3 col-xl-3 col-xxl-3 col-sm-6 mb-md-5 mb-xl-5 message-count-card ">

                    {/*begin::Card widget 5*/}
                    <div class=" card card-flush mb-xl-1 p-1 mb-1 shadow-sm" style={{}} id='message-card-1'>
                        {/*begin::Header*/}
                        <div class="card-header pt-5 justify-content-center">
                            {/*begin::Title*/}
                            <div class="card-title d-flex flex-column ">
                                {/*begin::Info*/}
                                <div class="d-flex align-items-center mb-md-5 my-4">
                                    {/*begin::Amount*/}
                                    <span class="fs-2x fw-normal text-dark me-2 lh-1 ls-n2 textsize">Total Messages</span>
              
                                    {/*end::Amount*/}

                                </div>
                                <div class="align-self-center">
                                    {/*begin::Amount*/}
                                    <Link
                                        to={{ pathname: "/messageTracing" }}
                                        state={{
                                            productType: props.productselectValue,
                                            messageSource: props.sourceselectValue,
                                            startDate: props.startDate,
                                            endDate: props.endDate,
                                            status: "All",

                                            isDirect: true,
                                        }}
                                    >
                                        <span class="fs-2hx fw-bold text-primary me-2 lh-1 ls-n2">
                                            {props.messages.incomingMessage}
                                        </span>
                                    </Link>
                                    {/* <span class="fs-2hx fw-bold text-primary me-2 lh-1 ls-n2">{props.messages.incomingMessage}</span> */}
                                    {/*end::Amount*/}

                                </div>
                                {/*end::Info*/}

                            </div>
                            {/*end::Title*/}
                        </div>
                        {/*end::Header*/}
                        {/*begin::Card body*/}
                        <div class="card-body d-flex align-items-end pt-0">

                        </div>
                        {/*end::Card body*/}
                    </div>
                    {/*end::Card widget 5*/}


                </div>
                {/*end::Col*/}

              
                {/*begin::Col*/}
                <div class="col-md-6 col-lg-3 col-xl-3 col-xxl-3 col-sm-6 mb-md-5 mb-xl-5 message-count-card">

                    {/*begin::Card widget 5*/}
                    <div class=" card card-flush  mb-xl-1 shadow-sm p-1 mb-1" id='message-card-3'>
                        {/*begin::Header*/}
                        <div class="card-header pt-5 justify-content-center">
                            {/*begin::Title*/}
                            <div class="card-title d-flex flex-column ">
                                {/*begin::Info*/}
                                <div class="d-flex align-items-center mb-md-5 my-4">
                                    {/*begin::Amount*/}
                                    <span class="fs-2x fw-normal text-dark lh-1 ls-n2 textsize">Processed Messages</span>
                                    {/* <span class="fs-2x fw-normal text-dark lh-1 ls-n2">Picked Up</span> */}
                                    {/*end::Amount*/}

                                </div>
                                <div class="align-self-center">
                                    {/*begin::Amount*/}
                                    {/* <span class="fs-2hx fw-bold text-success me-2 lh-1 ls-n2">{props.messages.processedMessages}</span> */}
                                    <Link
                                        to={{ pathname: "/messageTracing" }}
                                        state={{
                                            productType: props.productselectValue,
                                            messageSource: props.sourceselectValue,
                                            startDate: props.startDate,
                                            endDate: props.endDate,
                                            status: statuses,
                                            isDirect: true,
                                        }}
                                    >
                                        <span className="fs-2hx fw-bold text-success me-2 lh-1 ls-n2">
                                            {/* {
                                                props.sourceselectValue === "All"
                                                    ? Number(props.messages.processedMessages || 0) +
                                                    Number(props.messages.dispatchedMessages || 0) +
                                                    Number(props.messages.deletedMessages || 0)
                                                    : props.sourceselectValue === "ASTRONICS"
                                                        ? Number(props.messages.dispatchedMessages || 0) +
                                                        Number(props.messages.deletedMessages || 0)
                                                        : Number(props.messages.processedMessages || 0) +
                                                        Number(props.messages.deletedMessages || 0)
                                            } */}
                                            {calculateMessageCount()}
                                        </span>
                                    </Link>
                                    {/*end::Amount*/}

                                </div>
                                {/*end::Info*/}

                            </div>
                            {/*end::Title*/}
                        </div>
                        {/*end::Header*/}
                        {/*begin::Card body*/}
                        <div class="card-body d-flex align-items-end pt-0">

                        </div>
                        {/*end::Card body*/}
                    </div>
                    {/*end::Card widget 5*/}


                </div>
                {/*end::Col*/}

                {/*begin::Col*/}
                <div class="col-md-6 col-lg-3 col-xl-3 col-xxl-3 col-sm-6 mb-md-5 mb-xl-5 message-count-card ">

                    {/*begin::Card widget 5*/}
                    <div class=" card card-flush  mb-xl-1 shadow-sm p-1 mb-1" id='message-card-4'>
                        {/*begin::Header*/}
                        <div class="card-header pt-5 justify-content-center">
                            {/*begin::Title*/}
                            <div class="card-title d-flex flex-column ">
                                {/*begin::Info*/}
                                <div class="d-flex align-items-center mb-md-5 my-4">
                                    {/*begin::Amount*/}
                                    
                                    <span class="fs-2x fw-normal text-dark me-2 lh-1 ls-n2 textsize">Awaiting Processing</span>
                                    {/*end::Amount*/}

                                </div>
                                <div class="align-self-center">
                                    {/*begin::Amount*/}
                                    <Link
                                        to={{ pathname: "/messageTracing" }}
                                        state={{
                                            productType: props.productselectValue,
                                            messageSource: props.sourceselectValue,
                                            startDate: props.startDate,
                                            endDate: props.endDate,
                                            status: "Awaiting_pickup",
                                            isDirect: true,
                                        }}
                                    >
                                        <span class="fs-2hx fw-bold text-warning me-2 lh-1 ls-n2">{props.messages.inQueue}</span>
                                    </Link>
                                    {/*end::Amount*/}

                                </div>
                                {/*end::Info*/}

                            </div>
                            {/*end::Title*/}
                        </div>
                        {/*end::Header*/}
                        {/*begin::Card body*/}
                        <div class="card-body d-flex align-items-end pt-0">

                        </div>
                        {/*end::Card body*/}
                    </div>
                    {/*end::Card widget 5*/}


                </div>
                {/*end::Col*/}

                {/*begin::Col*/}

                <div class="col-md-6 col-lg-3 col-xl-3 col-xxl-3 col-sm-6 mb-md-5 mb-xl-5 message-count-card ">
                    {/*begin::Card widget 5*/}
                    <div class=" card card-flush  mb-xl-1 shadow-sm p-1 mb-1" id='message-card-5'>
                        {/*begin::Header*/}
                        <div class="card-header pt-5 justify-content-center">
                            {/*begin::Title*/}
                            <div class="card-title d-flex flex-column ">
                                {/*begin::Info*/}
                                <div class="d-flex align-items-center mb-md-5 my-4">
                                    {/*begin::Amount*/}
                                    <span class="fs-2x fw-normal text-dark me-2 lh-1 ls-n2 textsize">Failed Processing</span>
                                    {/*end::Amount*/}

                                </div>
                                <div class="align-self-center">
                                    {/*begin::Amount*/}
                                    <Link
                                        to={{ pathname: "/messageTracing" }}
                                        state={{
                                            productType: props.productselectValue,
                                            messageSource: props.sourceselectValue,
                                            startDate: props.startDate,
                                            endDate: props.endDate,
                                            status: "Failed",
                                            isDirect: true,
                                        }}
                                    >
                                        <span class="fs-2hx fw-bold text-danger me-2 lh-1 ls-n2">{props.messages.failedProcessing}</span>
                                    </Link>
                                    {/*end::Amount*/}

                                </div>
                                {/*end::Info*/}

                            </div>
                            {/*end::Title*/}
                        </div>
                        {/*end::Header*/}
                        {/*begin::Card body*/}
                        <div class="card-body d-flex align-items-end pt-0">

                        </div>
                        {/*end::Card body*/}
                    </div>
                    {/*end::Card widget 5*/}
                </div>
                {/*end::Col*/}




            </div>
            {/*end::Row*/}

            {/* Start message Report */}



            {/* End message Report */}





            {/*end::Content*/}
        </>
    )
}

export default MessageSummary