import React, { useEffect, useState, useRef } from 'react';
import MessagingReport from './MessagingReport'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SearchFilter from '../Common/SearchFilter';
import axios from 'axios';
import HttpClient from '../config/HttpConfig';

function MessageSummary(props) {
    console.log(props)
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
    const Reset = () => {
        setStartDate(getFormattedDate(new Date()));
        setEndDate(getFormattedDate(new Date()));
        setMessageType('All');
        setDocumentId('');
        console.log('hi')
        //messageType="";
    };
    // Function to format a date as "YYYY-MM-DD"
    function getFormattedDate(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
        // return `${day}/${month}/${year}`;
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

    
    return (
        <>



                        

                        <div>&nbsp;</div>

                        {/*begin::Row*/}
                        {/* <div class="row g-5 g-xl-10">

                               
                                <div class="col-xl-12 mb-5 mb-xl-2" style={{ marginTop: "5px" }}>
                                    
                                    <div class="card card-flush h-xl-100" style={{ borderBottom: "0px", border: "0px" }}>
                                      
                                        <div class="card-header" style={{ paddingLeft: "0px", border: "0px" }}>

                                           
                                            <div class="card-toolbar">
                                               
                                                <ul class="nav">
                                                    <li class="nav-item">
                                                        <a class="nav-link btn btn-text-custom btn-md btn-color-muted btn-active btn-active-light fw-bold px-4 me-2 py-2 active border" data-kt-timeline-widget-1="tab" data-bs-toggle="tab" href="#kt_timeline_widget_1_tab_day">Current Week</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link btn btn-text-custom btn-md btn-color-muted btn-active btn-active-light fw-bold px-4 me-2 py-2 border" data-kt-timeline-widget-1="tab" data-bs-toggle="tab" href="#kt_timeline_widget_1_tab_week">Last Month</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link btn btn-text-custom btn-md btn-color-muted btn-active btn-active-light fw-bold px-4 me-2 py-2 border" data-kt-timeline-widget-1="tab" data-bs-toggle="tab" href="#kt_timeline_widget_1_tab_month">Last Year</a>
                                                    </li>
                                                </ul>
                                             
                                            </div>
                                        
                                        </div>
                                   

                                    </div>
                                  
                                </div>
                                
                            </div> */}
                        {/*end::Row*/}

                        {/*begin::Row*/}
                        <div class="row g-5 g-xl-10 mb-xl-5 md-mb-5" id='messge-report-card'>

                            {/*begin::Col*/}
                            <div class="col-md-4 col-lg-4 col-xl-4 col-xxl-4 col-sm-6 mb-md-5 mb-xl-5 message-count-card ">

                                {/*begin::Card widget 5*/}
                                <div class=" card card-flush mb-xl-1 p-1 mb-1 shadow-sm" style={{}} id='message-card-1'>
                                    {/*begin::Header*/}
                                    <div class="card-header pt-5 justify-content-center">
                                        {/*begin::Title*/}
                                        <div class="card-title d-flex flex-column ">
                                            {/*begin::Info*/}
                                            <div class="d-flex align-items-center mb-md-5 ">
                                                {/*begin::Amount*/}
                                                <span class="fs-2x fw-normal text-dark me-2 lh-1 ls-n2">Total Messages</span>
                                                {/*end::Amount*/}

                                            </div>
                                            <div class="align-self-center">
                                                {/*begin::Amount*/}
                                                <span class="fs-2hx fw-bold text-primary me-2 lh-1 ls-n2">{props.messages.incomingMessage}</span>
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
                            <div class="col-md-4 col-lg-4 col-xl-4 col-xxl-4 col-sm-6 mb-md-5 mb-xl-5 message-count-card ">

                                {/*begin::Card widget 5*/}
                                <div class=" card card-flush  mb-xl-1 shadow-sm p-1 mb-1" id='message-card-2'>
                                    {/*begin::Header*/}
                                    <div class="card-header pt-5 justify-content-center">
                                        {/*begin::Title*/}
                                        <div class="card-title d-flex flex-column ">
                                            {/*begin::Info*/}
                                            <div class="d-flex align-items-center mb-md-5 ">
                                                {/*begin::Amount*/}
                                                <span class="fs-2x fw-normal text-dark me-2 lh-1 ls-n2">Received Messages</span>
                                                {/*end::Amount*/}

                                            </div>
                                            <div class="align-self-center">
                                                {/*begin::Amount*/}
                                                <span class="fs-2hx fw-bold text-info me-2 lh-1 ls-n2">{props.messages.recievedMessages}</span>
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
                            <div class="col-md-4 col-lg-4 col-xl-4 col-xxl-4 col-sm-6 mb-md-5 mb-xl-5 message-count-card">

                                {/*begin::Card widget 5*/}
                                <div class=" card card-flush  mb-xl-1 shadow-sm p-1 mb-1" id='message-card-3'>
                                    {/*begin::Header*/}
                                    <div class="card-header pt-5 justify-content-center">
                                        {/*begin::Title*/}
                                        <div class="card-title d-flex flex-column ">
                                            {/*begin::Info*/}
                                            <div class="d-flex align-items-center mb-md-5 ">
                                                {/*begin::Amount*/}
                                                <span class="fs-2x fw-normal text-dark lh-1 ls-n2">Processed Messages</span>
                                                {/*end::Amount*/}

                                            </div>
                                            <div class="align-self-center">
                                                {/*begin::Amount*/}
                                                <span class="fs-2hx fw-bold text-success me-2 lh-1 ls-n2">{props.messages.processedMessages}</span>
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
                            <div class="col-md-4 col-lg-4 col-xl-4 col-xxl-4 col-sm-6 mb-md-5 mb-xl-5 message-count-card mt-5">

                                {/*begin::Card widget 5*/}
                                <div class=" card card-flush  mb-xl-1 shadow-sm p-1 mb-1"  id='message-card-4'>
                                    {/*begin::Header*/}
                                    <div class="card-header pt-5 justify-content-center">
                                        {/*begin::Title*/}
                                        <div class="card-title d-flex flex-column ">
                                            {/*begin::Info*/}
                                            <div class="d-flex align-items-center mb-md-5 ">
                                                {/*begin::Amount*/}
                                                <span class="fs-2x fw-normal text-dark me-2 lh-1 ls-n2">In Queue</span>
                                                {/*end::Amount*/}

                                            </div>
                                            <div class="align-self-center">
                                                {/*begin::Amount*/}
                                                <span class="fs-2hx fw-bold text-warning me-2 lh-1 ls-n2">{props.messages.inQueue}</span>
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

                            <div class="col-md-4 col-lg-4 col-xl-4 col-xxl-4 col-sm-6 mb-md-5 mb-xl-5 message-count-card mt-5">
                                {/*begin::Card widget 5*/}
                                <div class=" card card-flush  mb-xl-1 shadow-sm p-1 mb-1"  id='message-card-5'>
                                    {/*begin::Header*/}
                                    <div class="card-header pt-5 justify-content-center">
                                        {/*begin::Title*/}
                                        <div class="card-title d-flex flex-column ">
                                            {/*begin::Info*/}
                                            <div class="d-flex align-items-center mb-md-5 ">
                                                {/*begin::Amount*/}
                                                <span class="fs-2x fw-normal text-dark me-2 lh-1 ls-n2">Failed Processing</span>
                                                {/*end::Amount*/}

                                            </div>
                                            <div class="align-self-center">
                                                {/*begin::Amount*/}
                                                <span class="fs-2hx fw-bold text-danger me-2 lh-1 ls-n2">{props.messages.failedProcessing}</span>
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
                            <div class="col-md-4 col-lg-4 col-xl-4 col-xxl-4 col-sm-6 mb-md-5 mb-xl-5 message-count-card mt-5">

                                {/*begin::Card widget 5*/}
                                <div class=" card card-flush  mb-xl-1 shadow-sm p-1 mb-1"  id='message-card-6'>
                                    {/*begin::Header*/}
                                    <div class="card-header pt-5 justify-content-center">
                                        {/*begin::Title*/}
                                        <div class="card-title d-flex flex-column ">
                                            {/*begin::Info*/}
                                            <div class="d-flex align-items-center mb-md-5 ">
                                                {/*begin::Amount*/}
                                                <span class="fs-2x fw-normal text-dark me-2 lh-1 ls-n2">Resolved Messages</span>
                                                {/*end::Amount*/}

                                            </div>
                                            <div class="align-self-center">
                                                {/*begin::Amount*/}
                                                <span class="fs-2hx fw-bold  me-2 lh-1 ls-n2" style={{color:"#495d78"}}>{props.messages.resolvedMessages}</span>
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