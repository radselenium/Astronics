import React, { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext'; // Import InputText
import { Tooltip } from 'primereact/tooltip';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Dialog } from 'primereact/dialog';
import Header from '../Header';
import SearchFilter from '../Common/SearchFilter';
import moment from 'moment';
import { Button } from 'primereact/button';
import { format, subMonths, parse, isValid } from 'date-fns';
import HttpClient from '../config/HttpConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from "react-router-dom";


const MessageTracing = () => {

    const [selectedRowData, setSelectedRowData] = useState(null);
    const [messagesummary, setmessagesummary] = useState([]);
    const [showDataTable, setShowDataTable] = useState(false);
    const { state } = useLocation();
    const [displayValue, setDisplayValue] = useState("");

    //Global filter dateformats
    const dateFormats = [
        "dd-MM-yyyy",
        "yyyy-MM-dd",
        "MM/dd/yyyy",
        "MMM dd, yyyy",
        "dd-MMM-yyyy",
        "MM-dd-yyyy",
        "dd-MM-yy",
        "d-MM-yyyy",
        // Add any additional formats as needed
    ];

    const parseDate = (value) => {
        for (const formatString of dateFormats) {
            const parsedDate = parse(value, formatString, new Date());
            if (isValid(parsedDate) && value.length == formatString.length) {
                return format(parsedDate, "yyyy-MM-dd"); // Standardized format
            }
        }
        return value; // Return original input if it doesn't match a date format
    };

    const handleButtonDownloadClick = (rowData) => {

    };

    const dateBodyTemplateStatus = (status) => {
        return status.replace('_', ' ')
            .replace(/\b\w/g, char => char.toUpperCase()); // Capitalizes each word
    }

    const statusFormats = {
        "picked up": "Picked_up",
        "awaiting pickup": "Awaiting_pickup",
        // Add any additional status mappings as needed
    };

    const parseStatus = (value) => {
        const trimmedValue = value.trim().toLowerCase();
        // Look for a close match based on the beginning of the input
        for (const [key, dbValue] of Object.entries(statusFormats)) {
            if (key.startsWith(trimmedValue)) {
                // console.log(dbValue);
                return dbValue;
            }
        }
        // Return the original value if no close match is found
        return value;
    };

    const [globalFilter, setGlobalFilter] = useState('');
    const dt = useRef(null);


    //filter in datatable
    const onFilter = (e) => {
        const inputValue = e.target.value;
        setDisplayValue(inputValue);

        // Clear filter when input is empty
        if (!inputValue.trim()) {
            setGlobalFilter(null); // Clear global filter state
            dt.current.filter(null, "global", "contains"); // Reset the table filter
            return;
        }

        const standardizedStatus = parseStatus(inputValue);
        const standardizedDate = parseDate(inputValue);
       // console.log(standardizedDate);
        const standardizedFilter =
            standardizedStatus !== inputValue ? standardizedStatus : standardizedDate;
        setGlobalFilter(standardizedFilter);
        dt.current.filter(standardizedFilter, "global", "contains");
    };

    const [startDate, setStartDate] = useState(subMonths(new Date(), 1));
    const [endDate, setEndDate] = useState(new Date());
    const [messageType, setMessageType] = useState('All');
    const [documentId, setDocumentId] = useState('');

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    //start and end date setting value
    const format_Date = (date, addDate) => {
        const d2 = date;
        if (addDate) {
            d2.setUTCHours(23, 59, 59, 999);
            const EndDate = d2.toISOString();
            d2.setDate(d2.getDate() - 1);
            setEndDate(new Date(d2));
            return EndDate;
        }
        d2.setUTCHours(0, 0, 0, 0);
        setStartDate(new Date(d2));
        return d2.toISOString();
    };

    const [first, setFirst] = useState(1); // To manage current page
    const rows = 10; // Number of rows per page



    const onRowClick = (event) => {
        const clickedColumn = event.originalEvent.target.cellIndex;
        const rowData = event.data;

        // Check if the clicked column is 'messageID'
        if (clickedColumn === 0) {
            // Open the dialog box
            setSelectedRowData(rowData);
        }

    }


    const getMessageTracingData = () => {

        const isDirect = state?.isDirect ?? false;
        if (isDirect) {
            // Setting the DatePicker in message Tracing
            setStartDate(state.startDate);
            const EndDate = new Date(state.endDate);
            EndDate.setUTCHours(23, 59, 59, 999);
            EndDate.setDate(EndDate.getDate() - 1);
            setEndDate(EndDate);
            let newFormData = {
                startDate: state.startDate,
                endDate: state.endDate,
            };
            if (state.messageSource !== "All") {
                newFormData.messageSource = state.messageSource;
            }
            if (state.status !== "All") {
                newFormData.status = state.status;
            }
            if (state.productType !== "All") {
                newFormData.productType = state.productType;
            }
            getAllMessageData(newFormData);

            return;
        }

        var getStartDate = format_Date(startDate, 0);

        var getEndDate = format_Date(endDate, 1);

        const newFormData = {
            startDate: getStartDate,
            endDate: getEndDate,
            messageType,

        };

        getAllMessageData(newFormData)
    }

    const getAllMessageData = (newFormData) => {
        HttpClient.get('/api/getAllMessageTracing/messageTracingWithQuery', {
            params: newFormData
        }
        )
            .then(function (response) {
                var result = response.data;
                setmessagesummary(result);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const dateBodyTemplate = (data) => {

        if (!data) return ""; // Return empty string if data is null or undefined
        return moment(data).format("DD-MMM-YYYY HH:mm:ss");
    }

    useEffect(() => {
        getMessageTracingData();

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
            field: 'productType', header: 'Product Type', sortable: true, disabled: true, tooltip: 'Type of the Product',
        },
        {
            field: 'xmlMessageName', header: 'Document Name', sortable: true, disabled: true, tooltip: 'Document Name with Appended Date',
        },
        {
            field: 'documentID', header: 'Document ID', sortable: true, disabled: false, tooltip: 'Name of the Document ID',
        },
        { field: 'xmlMessageSource', header: 'XML Message Source', sortable: true, disabled: true, tooltip: 'Source of the Request' },
        { field: 'messageType', header: 'Message Type', sortable: true, disabled: true, tooltip: 'Type of the Message' },
        { field: 'messageDirection', header: 'Message Direction', sortable: true, disabled: true, tooltip: 'Direction of Request Message' },
        { field: 'receivedDate', header: 'Received Date', sortable: true, disabled: true, body: (rowData) => dateBodyTemplate(rowData.receivedDate), tooltip: 'Request Received Date' },
        { field: 'status', header: 'Status', sortable: true, disabled: true, body: (rowData) => dateBodyTemplateStatus(rowData.status), tooltip: 'Status of the Message' },
        { field: 'processedDate', header: 'Processed Date', sortable: true, disabled: false, body: (rowData) => dateBodyTemplate(rowData.processedDate), tooltip: 'Request Processed Date' },
        {
            field: '',
            header: 'Download',
            sortable: false,
            disabled: true,
            // tooltip: 'This is the Download column',
            body: (rowData) => (
                <a
                    href={rowData.url ? rowData.url : undefined}
                    target="_blank"
                    style={{
                        pointerEvents: rowData.url ? 'auto' : 'none',
                    }}
                >
                    <i
                        className="fa fa-download pe-1"
                        style={{
                            color: rowData.url ? 'rgb(6, 85, 144)' : '#888',
                            cursor: rowData.url ? 'pointer' : 'not-allowed'
                        }}
                        onClick={() => {
                            if (rowData.url) handleButtonDownloadClick(rowData);
                        }}
                    ></i>
                </a>
            ),
        },


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

    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(messagesummary);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'Astronics_Report');
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
                <div style={{ position: "sticky", top: 0, zIndex: 1000 }}>
                    <Header activeMenuItem="messageTracing" />
                </div>
                <div class="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
                    {/*begin::Wrapper container*/}
                    <div class="app-container container-xxl d-flex flex-row flex-column-fluid px-md-5">
                        {/*begin::Main*/}
                        <div class="app-main flex-column flex-row-fluid" id="kt_app_main">
                            {/*begin::Content wrapper*/}
                            <div class="d-flex flex-column flex-column-fluid card pt-5 px-md-5 pb-0 my-md-5">
                                {/*begin::Content*/}
                                <div>

                                    <SearchFilter showSaveButton={false} showSave={true} showSettings={false} showSearch={true} startDate={startDate} endDate={endDate} messageType={messageType} documentId={documentId} onStartDateChange={handleStartDateChange} onEndDateChange={handleEndDateChange} onMessageTypeChange={setMessageType} onDocumentIdChange={setDocumentId} setmessagesummary={setmessagesummary}  getAllMessageData={getAllMessageData} setShowDataTable={setShowDataTable} />

                                </div>

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
                                                value={displayValue}
                                                onChange={onFilter}
                                                placeholder="Global Search"
                                                className="p-ml-auto"

                                                style={{ width: '150px', height: '30px', fontSize: '12px' }}
                                            />
                                        </div>
                                        <div style={{ marginLeft: '8px' }} className="dropdown pe-1" id="action-items-dropdown">
                                            <button type="button" className="btn btn-light btn-sm dropdown-toggle p-ml-auto d-flex align-items-center" data-bs-toggle="dropdown" style={{ padding: '3px' }}>
                                                <i className="fa fa-gear" style={{ fontSize: '16px', color: '#065590' }}></i>
                                            </button>
                                            <ul className="dropdown-menu border border-light py-0">
                                                <li><a className="dropdown-item fw-bold" href="#" onClick={onButtonClick}>
                                                    <i class="fa-regular fa-eye-slash" style={{ color: 'blue' }} ></i> Column visibility</a></li>
                                                <li><a className="dropdown-item fw-bold" href="#" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS">
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
                                        rows={10}
                                        rowsPerPageOptions={[10, 25, 50, 100]}

                                        onRowClick={(event) => onRowClick(event)}
                                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                        currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                    >

                                        {columns
                                            .filter((col) => selectedColumns[col.field]?.checked) // Only include columns that are selected
                                            .map((col, index) => (
                                                <Column
                                                    key={col.field}
                                                    field={col.field}
                                                    //header={col.header}
                                                    header={
                                                        <span id={`tooltip_${index}`}>
                                                            {col.header}
                                                            <Tooltip target={`#tooltip_${index}`} content={col.tooltip || ''} />
                                                        </span>
                                                    }
                                                    sortable={col.sortable}
                                                    body={col.body}
                                                >
                                                </Column>
                                            ))}

                                    </DataTable>


                                </div>

                                <ToastContainer />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MessageTracing;