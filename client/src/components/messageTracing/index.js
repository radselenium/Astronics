import React, { useEffect, useState, useRef ,useCallback } from 'react';
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
import axios from 'axios';
import moment from 'moment';
import { Button } from 'primereact/button';
import { format, subMonths, parse, isValid } from 'date-fns';
import HttpClient from '../config/HttpConfig';
import PO_Creation_Sample from '../../xmldata/PO_Creation_Sample.xml';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from "react-router-dom";





const MessageTracing = () => {
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [isAdvanced, setIsAdvanced] = useState(false);
    const [filterRows, setFilterRows] = useState([{ key: 0, value: '' }]);
    const [messagesummary, setmessagesummary] = useState([]);
    const [showDataTable, setShowDataTable] = useState(false);
    const { state } = useLocation();
    const [displayValue, setDisplayValue] = useState("");

    const [show, setShow] = useState(false);
    const username = sessionStorage.getItem('userName');
    const handleClose = () => {
        if (modalRef.current) {
          try {
            const modalElement = modalRef.current;
            modalElement.classList.remove("show");
            setShow(false);
          } catch (error) {
            console.error("Error hiding modal:", error);
          }
        }
      };
    const handleShow = () => setShow(true);
    const modalRef = useRef(null);
    const [rowDataResolve, setRowDataResolve] = useState(null);

    

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
        console.log(rowData);
        console.log(rowData.url);
        console.log(rowData.status);
        if(rowData.status=='Archived'){
            
        }
   
    };
    

    const toggleFilterType = () => {
        setIsAdvanced(!isAdvanced);
        setFilterRows([{ key: 0, value: '' }]);
    };

    const dateBodyTemplateStatus=(status)=>{
        console.log(status);
        return status.replace('_', ' ')
                 .replace(/\b\w/g, char => char.toUpperCase()); // Capitalizes each word
    }

    const statusFormats = {
        "picked up": "Picked_up",
        "awaiting pickup": "Awaiting_pickup",
        // Add any additional status mappings as needed
      };
     
      const parseStatus = (value) => {
        // return statusFormats[value.toLowerCase()] || value;
     
        const trimmedValue = value.trim().toLowerCase();
        console.log(trimmedValue);
        // Look for a close match based on the beginning of the input
        for (const [key, dbValue] of Object.entries(statusFormats)) {
          if (key.startsWith(trimmedValue)) {
            console.log(dbValue);
            return dbValue;
          }
        }
        // Return the original value if no close match is found
        return value;
      };

    const [globalFilter, setGlobalFilter] = useState('');
    const dt = useRef(null);


    const onFilter = (e) => {
        const inputValue = e.target.value;
        setDisplayValue(inputValue);
        const standardizedStatus = parseStatus(inputValue);
        const standardizedDate = parseDate(inputValue);
        console.log(standardizedDate);
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
      //  e.setUTCHours(23, 59, 59, 999);
        setEndDate(e.target.value);
        console.log(endDate);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        var getStartDate = format_Date(startDate, 0);
        //console.log(getStartDate);
        var getEndDate = format_Date(endDate, 1);

        const newFormData = {
            startDate: getStartDate,
            endDate: getEndDate,
            messageType,
            documentId,
        };


        console.log('Form submitted:', newFormData);

        getAllMessageData(newFormData)
    };
   


    const format_Date = (date, addDate) => {
        const d2 = date;
        console.log(d2.toISOString());
        if (addDate) {
        
          d2.setUTCHours(23, 59, 59, 999);
          console.log(d2.toISOString());
         
          console.log("End Date Condition");
          console.log("Before adding one day" + d2.toISOString());
         
          const EndDate = d2.toISOString();
          d2.setDate(d2.getDate() - 1);
          console.log(d2.toISOString());
          setEndDate(new Date(d2));
          return EndDate;
        }
        d2.setUTCHours(0, 0, 0, 0);
       
     
        console.log(d2.toISOString());
        setStartDate(new Date(d2));
        return d2.toISOString();
      };

    const [first, setFirst] = useState(1); // To manage current page
    const rows = 5; // Number of rows per page



    const onRowClick = (event) => {
        const clickedColumn = event.originalEvent.target.cellIndex;
        const rowData = event.data;

        // Check if the clicked column is 'messageID'
        if (clickedColumn === 0) {
            // Open the dialog box
            //  handleLinkClick(rowData);
            setSelectedRowData(rowData);
            // setPopupVisible(true);
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
    

    const Reset = (e) => {
        e.preventDefault();
        setStartDate(subMonths(new Date(), 3));
        setEndDate((new Date()));
        setMessageType('All');
        setDocumentId('hello');
        console.log('hi')
        const newFormData = {
            startDate: startDate,
            endDate: endDate,
            messageType,
            documentId,
        };
        getAllMessageData(newFormData);
       setShowDataTable(false);
       console.log(showDataTable);
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


    const getMessageTracingData = () => {

        const isDirect = state?.isDirect ?? false;
        console.log(isDirect);
        if (isDirect) {
          // Setting the DatePicker in message Tracing
          setStartDate(state.startDate);
          const EndDate = new Date(state.endDate);
          EndDate.setUTCHours(23, 59, 59, 999);
          EndDate.setDate(EndDate.getDate() - 1);
          console.log(EndDate.toISOString());
          //   EndDate.setDate(EndDate.getDate() - 1);
          setEndDate(EndDate);
          console.log("Logging ", startDate);
          console.log(endDate);
          console.log("Initial render for dashboard");
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
    
          console.log(newFormData);
    
          getAllMessageData(newFormData);
          console.log(startDate);
          console.log(endDate);
          return;
        }

        var getStartDate = format_Date(startDate, 0);
        //console.log(getStartDate);
        var getEndDate = format_Date(endDate, 1);

        const newFormData = {
            startDate: getStartDate,
            endDate: getEndDate,
            messageType,
            documentId,
        };

        getAllMessageData(newFormData)
    }

    const getAllMessageData = (newFormData) => {
        // HttpClient.get('/api/getAllMessageTracing',{
        //    params: newFormData}
        // )
        HttpClient.get('/api/getAllMessageTracing/messageTracingWithQuery',{
            params: newFormData
          }
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
    const dateBodyTemplate = (data) => {
        console.log(data);
        if (!data) return ""; // Return empty string if data is null or undefined
        return moment(data).format("DD-MMM-YYYY HH:mm:ss");
    }

    

    const formatRowDate = (value) => {
        return value.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }
    useEffect(() => {
        getMessageTracingData();
        
    }, [rowDataResolve]);

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
       
        // { field: '', header: '', sortable: true, disabled: true,  body: (rowData) => (
        //     <a href="#" onClick={() => handleButtonClick1(rowData)} style={{ color: '#065590' }}>
        //         <b></b>
        //     </a>
        // ),},

        // {
        //     field: 'xmlMessageName', header: 'XML Message Name', sortable: true, disabled: true, body: (rowData) => (
        //         <a  download="download.xml" href={PO_Creation_Sample} target="_self" style={{ color: '#065590' }}>
        //             <b>{rowData.xmlMessageName}</b>
        //         </a>
        //     ),
        // },
        {
            field: 'productType', header: 'Product Type', sortable: true, disabled: true, tooltip: 'This is the Product Type column',
        },
        {
            field: 'xmlMessageName', header: 'Document Name', sortable: true, disabled: true, tooltip: 'This is the Document Name column',
        },
        { field: 'documentID', header: 'Document ID', sortable: true, disabled: false, tooltip: 'This is the Document ID column',
        },

        { field: 'xmlMessageSource', header: 'XML Message Source', sortable: true, disabled: true,tooltip: 'This is the XML Message Source column' },
        { field: 'messageType', header: 'Message Type', sortable: true, disabled: true ,tooltip: 'This is the Message Type column'},
        { field: 'messageDirection', header: 'Message Direction', sortable: true, disabled: true ,tooltip: 'This is the Message Direction column'},
        { field: 'receivedDate', header: 'Received Date', sortable: true, disabled: true , body: (rowData) => dateBodyTemplate(rowData.receivedDate) ,tooltip:  'The document received in the portal'},
        { field: 'status', header: 'Status', sortable: true, disabled: true, body: (rowData) => dateBodyTemplateStatus(rowData.status),tooltip: 'This is the Status column'},
        
        // { field: 'documentID', header: 'Document ID', sortable: true, disabled: true },
         { field: 'processedDate', header: 'Processed Date', sortable: true, disabled: false,  body: (rowData) => dateBodyTemplate(rowData.processedDate) },
       // { field: 'errorInfo', header: 'Error Info', sortable: true, disabled: false },
       {
        field: '',
        header: 'Download',
        sortable: true,
        disabled: true,
        tooltip: 'This is the Download column',
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
        // { field: '', header: 'Download', sortable: true, disabled: true, tooltip: 'This is the Download column',body: (rowData) => (
        //         <a href={rowData.url} target="_blank" onClick={() => handleButtonDownloadClick(rowData)} style={{ color: '#065590' }}>
        //              <i class="fa fa-download pe-1 " style={{ color: " rgb(6, 85, 144)" }}>
        //              </i> 
                  
        //         </a>
        //         ),
        //     },
            // { field: 'processedDate', header: 'processed Date(GMT)', sortable: true, disabled: true, tooltip: 'This is the Status column'},

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

    // const onModalButtonSubmit = (selectedColumns) => {
    //     setVisibleColumns(selectedColumns);
    //     setShowModal(false);
    // };
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
            <div style={{ position: "sticky",top:0,zIndex:1000 }}>
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


                                    <SearchFilter showSaveButton={false} showSave={true} showSettings={false} showSearch={true} startDate={startDate} endDate={endDate} messageType={messageType} documentId={documentId} onStartDateChange={handleStartDateChange} onEndDateChange={handleEndDateChange} onMessageTypeChange={setMessageType} onDocumentIdChange={setDocumentId} setmessagesummary={setmessagesummary} Reset={Reset} getAllMessageData={getAllMessageData}  setShowDataTable={setShowDataTable}/>


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
                                        rows={5}
                                        rowsPerPageOptions={[5, 10, 25, 50]}
                                       
                                        onRowClick={(event) => onRowClick(event)}
                                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                        currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                    >




                                        

                                        {columns
                                            .filter((col) => selectedColumns[col.field]?.checked) // Only include columns that are selected
                                            .map((col,index) => (
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

                                    {/* <p>Current Page {first} of {rows}. Total {messagesummary ? messagesummary.length : 0}records </p> */}
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