import React, { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext'; // Import InputText
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Dialog } from 'primereact/dialog';
import Header from './Header';
import SearchFilter from './Common/SearchFilter';
import axios from 'axios';
import moment from 'moment';
import { Button } from 'primereact/button';
import { format, subMonths } from 'date-fns';
import HttpClient from './config/HttpConfig';


const MessageTracing = () => {
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [isAdvanced, setIsAdvanced] = useState(false);
    const [filterRows, setFilterRows] = useState([{ key: 0, value: '' }]);
    const [messagesummary, setmessagesummary] = useState([]);


    const toggleFilterType = () => {
        setIsAdvanced(!isAdvanced);
        setFilterRows([{ key: 0, value: '' }]);
    };

    const [globalFilter, setGlobalFilter] = useState('');
    const dt = useRef(null);

    const onFilter = (e) => {
        setGlobalFilter(e.target.value);
        dt.current.filter(e.target.value, 'global', 'contains');
    };

    const [startDate, setStartDate] = useState(subMonths(new Date(), 3));
    const [endDate, setEndDate] = useState(new Date());
    const [messageType, setMessageType] = useState('All');
    const [documentId, setDocumentId] = useState('');

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        e.setUTCHours(23, 59, 59, 999);
        setEndDate(e.target.value);
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     // startDate.setUTCHours(0, 0, 0, 0);
    //     //  endDate.setUTCHours(23, 59, 59, 999);
    //     const newFormData = {
    //         startDate: startDate.toISOString(),
    //         endDate: endDate.toISOString(),
    //         messageType,
    //         documentId,
    //     };


    //     console.log('Form submitted:', newFormData);

    //     axios.post('http://localhost:5000/get/messageSummaryData',
    //         newFormData
    //     )
    //         .then(function (response) {
    //             console.log(response);
    //             setmessagesummary(response.data.data);

    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // };

    const [first, setFirst] = useState(1); // To manage current page
    const rows = 5; // Number of rows per page



    const onRowClick = (event) => {
        const clickedColumn = event.originalEvent.target.cellIndex;
        const rowData = event.data;

        // Check if the clicked column is 'messageID'
        if (clickedColumn === 0) {
            // Open the dialog box
            handleLinkClick(rowData);
            setSelectedRowData(rowData);
            setPopupVisible(true);
        }
        // Add oth
    }
    const handleLinkClick = (rowData) => {



        setSelectedRowData(rowData);
        setPopupVisible(true);
    };

    const hidePopup = () => {
        setPopupVisible(false);
    };
    const handleSearch = () => {
        // Handle the search action with the selected dates
        // You can use the startDate and endDate values here
    };
    // const Reset = () => {
    //     setStartDate(getFormattedDate(new Date()));
    //     setEndDate(getFormattedDate(new Date()));
    //     setMessageType('All');
    //     setDocumentId('');


    // };
    const Reset = () => {
        setStartDate(subMonths(new Date(), 3));
        setEndDate((new Date()));
        setMessageType('All');
        setDocumentId('');
        console.log('hi')

    };
    // Function to format a date as "YYYY-MM-DD"
    // function getFormattedDate(date) {
    //     const year = date.getFullYear();
    //     const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    //     const day = date.getDate().toString().padStart(2, '0');
    //     return `${year}-${month}-${day}`;

    // }


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

    // const fetchData = async () => {
    //     try {
    //         startDate.setUTCHours(0, 0, 0, 0);
    //         endDate.setUTCHours(23, 59, 59, 999);

    //         const newFormData = {
    //             startDate: startDate.toISOString(),
    //             endDate: endDate.toISOString(),
    //             messageType,
    //             documentId,
    //         };

    //         console.log(newFormData);

    //         const response = await axios.post('http://localhost:7001/get/messageSummaryData', newFormData);

    //         console.log(response);
    //         setmessagesummary(response.data.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    useEffect(() => {
        startDate.setUTCHours(0, 0, 0, 0);
        endDate.setUTCHours(23, 59, 59, 999);
        const newFormData = {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            messageType,
            documentId,
        };
        console.log(newFormData);
        //  axios.get('http://74.208.235.215:7001/messageSummary/get').then(function (response) {
        //     axios.get('http://localhost:5000/messageSummary/get').then(function (response) {

        //     setmessagesummary(response.data.data);
        //     console.log(response);
        // })
        HttpClient.post('/get/messageSummaryData',
            newFormData
        )
            .then(function (response) {
                console.log(response);
                setmessagesummary(response.data.data);

            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const [visibleColumns, setVisibleColumns] = useState({
        messageID: true,
        xmlMessageSource: true,
        messageType: true,
        messageDirection: true,
        receivedDate: true,
        status: false, // Initially hidden
        documentID: false, // Initially hidden
        processedDate: false, // Initially hidden
    });

    const initialColumns = [
        {
            field: '', header: '', sortable: false, disabled: true, body: (rowData) => (

                <div  className="dropdown">
                                            <button type="button" className="btn  btn-sm  p-ml-auto d-flex align-items-center" data-bs-toggle="dropdown" style={{ padding: '3px' }}>
                                                <i className="fa fa-list" style={{ fontSize: '16px', color: '#065590' }}></i>
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <a className="dropdown-item" href="#">
                                                    <i class="fa fa-download pe-1" style={{color:" rgb(6, 85, 144)"}}>
                                                        </i> Download XML Message
                                                        </a>
                                                       






                                                        </li>
                                                <li>
                                                    <a className="dropdown-item" href="#" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS">
                                                    <i class="fa fa-pencil-square-o pe-1" style={{color:" rgb(6, 85, 144)"}}> </i>Mark as Resolved</a>
                                                </li>
                                            </ul>
                                        </div>
               
            ),
        },
       
        {
            field: 'xmlMessageName', header: 'XML Message Name', sortable: true, disabled: true, body: (rowData) => (
                <a href="#" onClick={() => handleLinkClick(rowData)} style={{ color: '#065590' }}>
                    <b>{rowData.xmlMessageName}</b>
                </a>
            ),
        },
        { field: 'messageID', header: 'Message Id', sortable: true, disabled: true, },

        { field: 'xmlMessageSource', header: 'XML Message Source', sortable: true, disabled: true },
        { field: 'messageType', header: 'Message Type', sortable: true, disabled: true },
        { field: 'messageDirection', header: 'Message Direction', sortable: true, disabled: true },
        { field: 'receivedDate', header: 'Received Date(GMT)', sortable: true, disabled: true },
        { field: 'status', header: 'Status', sortable: true, disabled: true },
        { field: 'documentID', header: 'Document ID', sortable: true, disabled: true },
        { field: 'processedDate', header: 'Processed Date(GMT)', sortable: true, disabled: true },
        { field: 'errorInfo', header: 'Error Info', sortable: true, disabled: false },

    ];

    const [columns, setColumns] = useState(initialColumns);

    const initialState = initialColumns.reduce((acc, column) => {
        acc[column.field] = { checked: column.disabled, disabled: column.disabled };
        return acc;
    }, {});




    const [showModal, setShowModal] = useState(false);

    const onButtonClick = () => {
        console.log('Button clicked. showModal:', showModal);
        setShowModal(true);
    };

    const onModalClose = () => {
        setShowModal(false);
    };

    const onModalButtonSubmit = (selectedColumns) => {
        setVisibleColumns(selectedColumns);
        setShowModal(false);
    };
    const [selectedColumns, setSelectedColumns] = useState(initialState);

    const handleCheckboxChange = (column) => {
        // Ensure that the first four columns are always disabled
        if (initialState[column].disabled) {
            return;
        }

        setSelectedColumns((prevColumns) => ({
            ...prevColumns,
            [column]: {
                checked: !prevColumns[column]?.checked,
                disabled: prevColumns[column]?.disabled,
            },
        }));
    };

    const handleModalSubmit = () => {
        setVisibleColumns(selectedColumns);
        setShowModal(false);
    };


    const teststyle = {
        textAlign: 'right',

    }
    const formatDate = (rowData) => {
        const receivedDate = rowData.receivedDate;
        if (receivedDate) {
            const formattedDate = moment(receivedDate).format('DD-MMM-YYYY HH:mm:ss');
            return <span>{formattedDate}</span>;
        } else {
            return <span>No date available</span>; // or any other message or representation for an empty date
        }
    };
    const formatprocessedDate = (rowData) => {
        const processedDate = rowData.processedDate;
        if (processedDate) {
            const processedDate = moment(rowData.processedDate).format('DD-MMM-YYYY HH:mm:ss');
            return <span>{processedDate}</span>;
        } else {
            return <span></span>; // or any other message or representation for an empty date
        }
    };

    //   const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    //   const paginatorRight = <Button type="button" icon="pi pi-download" text />;

    const exportColumns = messagesummary.map((col) => ({ title: col.header, dataKey: col.field }));

    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(messagesummary);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'AEX_Report');
        });
    };

    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };

    return (
        <div class="d-flex flex-column flex-root app-root" id="kt_app_root">
            {/*begin::Page  */}
            <div class="app-page flex-column flex-column-fluid" id="kt_app_page">
                <Header activeMenuItem="messageTracing" />
                <div class="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
                    {/*begin::Wrapper container*/}
                    <div class="app-container container-xxl d-flex flex-row flex-column-fluid px-md-5">
                        {/*begin::Main*/}
                        <div class="app-main flex-column flex-row-fluid" id="kt_app_main">
                            {/*begin::Content wrapper*/}
                            <div class="d-flex flex-column flex-column-fluid card pt-5 px-md-5 pb-0 my-md-5">
                                {/*begin::Content*/}
                                <div>


                                    <SearchFilter showSaveButton={false} showSave={true} showSettings={true} showSearch={true} startDate={startDate} endDate={endDate} messageType={messageType} documentId={documentId} onStartDateChange={handleStartDateChange} onEndDateChange={handleEndDateChange} onMessageTypeChange={setMessageType} onDocumentIdChange={setDocumentId} setmessagesummary={setmessagesummary} />


                                </div>


                                <Dialog
                                    visible={isPopupVisible}
                                    onHide={hidePopup}
                                    header="Message Log"
                                    modal
                                    style={{ width: '500px' }}
                                >

                                    {selectedRowData && (
                                        <div>
                                            <div class='row'><div class="col-md-4" style={teststyle}><b >Message Id :</b></div>  <div class="col-md-4"> {selectedRowData.messageID}</div></div>
                                            <div class='row'><div class="col-md-4" style={teststyle}><b >XML Message Name :</b></div>  <div class="col-md-4"> {selectedRowData.xmlMessageName}</div></div>
                                            <div class='row'><div class="col-md-4" style={teststyle}><b >XML Message Source :</b></div>  <div class="col-md-4"> {selectedRowData.xmlMessageSource}</div></div>
                                            <div class='row'><div class="col-md-4" style={teststyle}><b >Message Type :</b></div>  <div class="col-md-4"> {selectedRowData.messageType}</div></div>
                                            <div class='row'><div class="col-md-4" style={teststyle}><b >Message Direction :</b></div>  <div class="col-md-4"> {selectedRowData.messageDirection}</div></div>
                                            <div class='row'><div class="col-md-4" style={teststyle}><b >Received Date :</b></div>  <div class="col-md-4"> {selectedRowData.receivedDate ? moment(selectedRowData.receivedDate).format('DD-MMM-YYYY HH:mm:ss') : ''}</div></div>
                                            <div class='row'><div class="col-md-4" style={teststyle}><b >Status :</b></div>  <div class="col-md-4"> {selectedRowData.status}</div></div>
                                            <div class='row'><div class="col-md-4" style={teststyle}><b >Document ID : </b></div>  <div class="col-md-4"> {selectedRowData.documentID}</div></div>
                                            <div class='row'><div class="col-md-4" style={teststyle}><b >Processed Date : </b></div>  <div class="col-md-4"> {selectedRowData.processedDate ? moment(selectedRowData.processedDate).format('DD-MMM-YYYY HH:mm:ss') : ''}</div></div>
                                            <div class='row'><div class="col-md-4" style={teststyle}><b >Error Info :</b></div>  <div class="col-md-4"> {selectedRowData.errorInfo}</div></div>

                                            <div class='row'> <a href="#" class="d-flex justify-content-end">Download Message</a></div>

                                        </div>
                                    )}






                                </Dialog>




                                {showModal && (
                                    <Dialog header="Settings" visible={true} onHide={onModalClose} style={{ width: '30%' }}>
                                        <p>Check/Uncheck checkbox to show/hide column</p>
                                        <form>
                                            {columns.map((col) => (
                                                <div key={col.field} className="p-field-checkbox" style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                                    <input
                                                        type="checkbox"
                                                        id={col.field}
                                                        checked={selectedColumns[col.field]?.checked}
                                                        onChange={() => handleCheckboxChange(col.field)}
                                                        disabled={selectedColumns[col.field]?.disabled}
                                                        style={{ marginRight: '8px' }}
                                                    />
                                                    <label htmlFor={col.field}>{` ${col.header}`}</label>
                                                </div>
                                            ))}
                                            <hr />
                                            <div className="p-mt-2" style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                                <Button label="Cancel" onClick={onModalClose} className="p-button-secondary" />
                                                <Button label="OK" onClick={handleModalSubmit} />
                                            </div>
                                        </form>
                                    </Dialog>
                                )}
                                <div className="datatable-filter-demo mt-5">

                                    <div className="p-input-icon-left d-flex align-items-center" style={{ display: 'flex', padding: '3px', backgroundColor: '#065590' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                                            <span className='px-3 fs-3' style={{ margin: 0, color: 'white' }}>Message Summary</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                            <InputText
                                                type="text"
                                                value={globalFilter}
                                                onChange={onFilter}
                                                placeholder="Global Search"
                                                className="p-ml-auto"

                                                style={{ width: '150px', height: '30px', fontSize: '12px' }}
                                            />
                                        </div>
                                        <div style={{ marginLeft: '8px' }} className="dropdown pe-1">
                                            <button type="button" className="btn btn-light btn-sm dropdown-toggle p-ml-auto d-flex align-items-center" data-bs-toggle="dropdown" style={{ padding: '3px' }}>
                                                <i className="fa fa-gear" style={{ fontSize: '16px', color: '#065590' }}></i>
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><a className="dropdown-item" href="#" onClick={onButtonClick}>
                                                    <i class="fa-regular fa-eye-slash" style={{ color: 'blue' }} ></i> Column visibility</a></li>
                                                <li><a className="dropdown-item" href="#" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS">
                                                    <i class="fa-solid fa-file-excel fa-xs" style={{ color: 'green' }}> </i> &nbsp; Download Excel </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>



                                    <DataTable
                                        ref={dt}
                                        value={messagesummary}
                                        globalFilter={globalFilter}
                                        className="custom-datatable"
                                        paginator
                                        rows={5}
                                        rowsPerPageOptions={[5, 10, 25, 50]}
                                        onRowClick={(event) => onRowClick(event)}
                                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                        currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                    >




                                        {/* <Column field="messageID" header="Message Id" sortable />
                                        <Column field="xmlMessageSource" header="XML Message Source" sortable />
                                        <Column field="messageType" header="Message Type" sortable />
                                        <Column field="messageDirection" header="Message Direction" sortable />
                                        <Column field="receivedDate" header="Received Date(GMT)" sortable  />
                                        <Column field="status" header="Status" sortable />
                                        <Column field="documentID" header="Document ID" sortable />
                                        <Column field="processedDate" header="Processed Date(GMT)" sortable /> */}

                                        {columns
                                            .filter((col) => selectedColumns[col.field]?.checked) // Only include columns that are selected
                                            .map((col) => (
                                                <Column
                                                    key={col.field}
                                                    field={col.field}
                                                    header={col.header}
                                                    sortable={col.sortable}
                                                    body={col.body}
                                                >
                                                </Column>
                                            ))}

                                    </DataTable>

                                    {/* <p>Current Page {first} of {rows}. Total {messagesummary ? messagesummary.length : 0}records </p> */}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MessageTracing;