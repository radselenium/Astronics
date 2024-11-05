import React, { useEffect, useState, useRef ,useCallback } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext'; // Import InputText
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
import { format, subMonths } from 'date-fns';
import HttpClient from '../config/HttpConfig';
import PO_Creation_Sample from '../../xmldata/PO_Creation_Sample.xml';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const MessageTracing = () => {
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [isAdvanced, setIsAdvanced] = useState(false);
    const [filterRows, setFilterRows] = useState([{ key: 0, value: '' }]);
    const [messagesummary, setmessagesummary] = useState([]);
    const [showDataTable, setShowDataTable] = useState(false);
    const [transHistory, settransHistory] = useState([]);

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

    const [formData, setFormData] = useState({
        status: 'RESOLVED',
        comments: '',
    });

    const [formErrors, setFormErrors] = useState({
        comments: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    
     // document.getElementById("myModal").classList.remove("show");
    const handleSave = () => {
        // Perform your save logic here
        // For now, just log the form data
        console.log('Form data:', formData);
        console.log('Row data:', (rowDataResolve));
        console.log('Row data:', (rowDataResolve._id));

        const formData_messageTracing = {
            status: "RESOLVED",
        }

        HttpClient.put("/api/updateMessageTracing?id=" + rowDataResolve._id,
            formData_messageTracing
        )
            .then(function (response) {
                console.log(response);
                console.log('Hi Updated the msg tracing');
                // formData.{ status: "Resolved", comments: "test" }

                const formDataActHistory = {
                    xmlMessageName: rowDataResolve.xmlMessageName,
                    timeStamp: new Date(),
                    statusFrom: "DONE W/ERRORS",
                    statusTo: formData.status,
                    actionedBy: username,
                    remarks: formData.comments
                }
                console.log(formDataActHistory);
                HttpClient.post('/api/insertTransHistory',
                    formDataActHistory
                )
                    .then(function (response) {
                        console.log(response);
                        toast.success("Status has been updated successfully.", {
                            position: toast.POSITION.TOP_RIGHT,
                            
                        });
                      //  setShowModalResolve(false);
                      
                        //     const modalInstance = new window.bootstrap.Modal(modalRef.current);
                        //   modalInstance.hide();
                         
                        
                        setFormData({
                            status: 'RESOLVED',
                            comments: '',
                        });
                      // window.location.reload();
                     
                      getMessageTracingData(); 
                    })
                
                    .catch(function (error) {
                        console.log(error);
                    });

            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const validateForm = () => {
        let isValid = true;
        const newFormErrors = { ...formErrors };

        // Validate comments
        if (formData.comments.trim() === '') {
            newFormErrors.comments = 'Comments cannot be empty';
            isValid = false;
        } else {
            newFormErrors.comments = '';
        }

        setFormErrors(newFormErrors);
        return isValid;
    };

    const handleSaveClick = () => {
        if (validateForm()) {
            handleSave();
            handleClose();
        }
    };

    const handleResolveClick = (rowData) => {
        console.log(rowData)
        setRowDataResolve(rowData);
    };
    const handleButtonClick = (rowData) => {
        setShowDataTable(true);
        console.log(rowData);

        const newFormData = {
            xmlMessageName: rowData.xmlMessageName
        };

        console.log(newFormData);
        HttpClient.post('/api/getAllTransHistorys',
            newFormData
        )
            .then(function (response) {
                console.log(response);
                settransHistory(response.data);
               

            })
            .catch(function (error) {
                console.log(error);
            });
        
    };
  
    const handleButtonDownloadClick = () => {
        // const url = window.url.createobjecturl(new blob([PO_Creation_Sample]));
        // const link = document.createelement('a');
        // link.href = url;
        // link.setattribute('download', 'file.pdf');
        // document.body.appendchild(link);
        // link.click();
    };
    

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
    // const onFilter = useCallback((e) => {
    //     setGlobalFilter(e.target.value);
    //     dt.current.filter(e.target.value, 'global', 'contains');
    //   }, [dt]);

    const [startDate, setStartDate] = useState(subMonths(new Date(), 3));
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
        //var d1 = (date.getDate() + addDate)
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + (date.getDate() + addDate),
            year = d.getFullYear();
        var d2 = new Date(year + "-" + month + "-" + day)
        console.log(d2)
        if(addDate==0){
        //     d2.setUTCHours(0, 0, 0, 0)
        // return d2.toISOString(); 
        return d2
        }
        else if(addDate==1)
        {
        // d2.setUTCHours(23, 59, 59, 999)
        // return d2.toISOString();
        return d2
        }
    }
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
    const handleSearch = () => {
        // Handle the search action with the selected dates
        // You can use the startDate and endDate values here
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


    const getMessageTracingData = () => {
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
        HttpClient.post('/api/getAllMessageTracing',
            newFormData
        )
            .then(function (response) {
                console.log(response);
                var result = response.data;
                // result.forEach(element => { 
                    
                //       if(element.receivedDate){                       
                //         element.receivedDate = moment(new Date(element.receivedDate)).format('DD-MMM-YYYY HH:mm:ss');
                //       }
                //       if(element.processedDate){
                       
                //         element.processedDate= moment(new Date(element.processedDate)).format('DD-MMM-YYYY HH:mm:ss');
                //        }
                  
                //     console.log(element.processedDate);
                //     console.log(element.receivedDate);
                // }); 
                setmessagesummary(result);

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const dateBodyTemplate = (data) => {
        console.log(data)
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
        // {
        //     field: 'xmlMessageName', header: 'XML Message Name', sortable: true, disabled: true, body: (rowData) => (
        //         <a href="#" onClick={() => handleLinkClick(rowData)} style={{ color: '#065590' }}>
        //             <b>{rowData.xmlMessageName}</b>
        //         </a>
        //     ),
        // },

        {
            field: '', header: '', sortable: false, disabled: true, body: (rowData) => (

                <div className="dropdown" id="action-items-dropdown">
                <button type="button" className="btn  btn-sm  p-ml-auto d-flex align-items-center" data-bs-toggle="dropdown" style={{ padding: '3px' }}>
                    <i className="fa fa-list" style={{ fontSize: '16px', color: '#065590' }}></i>
                </button>
                <ul className="dropdown-menu border border-light py-0">
                    <li>
                        <a className="dropdown-item fw-bold" download="download.xml" href={PO_Creation_Sample} target="_self" >
                            <i class="fa fa-download pe-1 " style={{ color: " rgb(6, 85, 144)" }}>
                            </i> Download XML Message
                        </a>

                    </li>
                    <li>
                        <a
                            className={`dropdown-item fw-bold ${rowData.status !== 'DONE W/ERRORS' ? 'disabled-link' : ''}`}
                            href="#"
                            icon="pi pi-file-excel"
                            severity="success"


                            onClick={(e) => {
                                // Prevent the default action if the status is not 'DONE WITH ERRORS'
                                if (rowData.status !== 'DONE W/ERRORS') {
                                    e.preventDefault();
                                } else {
                                    // Handle the click event for 'DONE WITH ERRORS' status
                                    // Add your logic here
                                    console.log('Link clicked!');
                                    handleResolveClick(rowData)
                                    // Open the Bootstrap modal using JavaScript
                                    const modalInstance = new window.bootstrap.Modal(modalRef.current);
                                    modalInstance.show();


                                }
                            }}
                        >
                            <i class="fa fa-pencil-square-o pe-1 " style={{ color: 'rgb(6, 85, 144)' }}> </i> Mark as Resolved
                        </a>
                    </li>
                </ul>
            </div>

            ),
        },
        // { field: '', header: '', sortable: true, disabled: true,  body: (rowData) => (
        //     <a href="#" onClick={() => handleButtonClick1(rowData)} style={{ color: '#065590' }}>
        //         <b></b>
        //     </a>
        // ),},
        {
            field: 'xmlMessageName', header: 'XML Message Name', sortable: true, disabled: true, body: (rowData) => (
                <a href="#" onClick={() => handleButtonClick(rowData)} style={{ color: '#065590' }}>
                    <b>{rowData.xmlMessageName}</b>
                </a>
            ),
        },
        { field: 'messageID', header: 'Message Id', sortable: true, disabled: true, },

        { field: 'xmlMessageSource', header: 'XML Message Source', sortable: true, disabled: true },
        { field: 'messageType', header: 'Message Type', sortable: true, disabled: true },
        { field: 'messageDirection', header: 'Message Direction', sortable: true, disabled: true },
        { field: 'receivedDate', header: 'Received Date(GMT)', sortable: true, disabled: true , body: (rowData) => dateBodyTemplate(rowData.receivedDate) },
        { field: 'status', header: 'Status', sortable: true, disabled: true },
        { field: 'documentID', header: 'Document ID', sortable: true, disabled: true },
        { field: 'processedDate', header: 'Processed Date(GMT)', sortable: true, disabled: true,  body: (rowData) => dateBodyTemplate(rowData.processedDate) },
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

    //const exportColumns = messagesummary.map((col) => ({ title: col.header, dataKey: col.field }));

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



    const customSortIcon = (
        <span style={{ fontSize: '1.2em', marginLeft: '0.5em' }}>
            <i className="pi pi-sort-up" style={{ fontSize: '1em', marginBottom: '-3px' }}></i>
            <i className="pi pi-sort-down" style={{ fontSize: '1em' }}></i>
        </span>
    );


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


                                    <SearchFilter showSaveButton={false} showSave={true} showSettings={true} showSearch={true} startDate={startDate} endDate={endDate} messageType={messageType} documentId={documentId} onStartDateChange={handleStartDateChange} onEndDateChange={handleEndDateChange} onMessageTypeChange={setMessageType} onDocumentIdChange={setDocumentId} setmessagesummary={setmessagesummary} Reset={Reset} getAllMessageData={getAllMessageData}  setShowDataTable={setShowDataTable}/>


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


                                {showDataTable && (
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1, backgroundColor: '#065590' }}>
                                            <span className='px-3 fs-3' style={{ margin: 3, color: 'white' }}>Action History</span>
                                        </div>
                                        <DataTable value={transHistory} className="custom-datatable">
                                            <Column field="xmlMessageName" header="Xml Message Name" sortable />
                                            <Column field="timeStamp" header="TimeStamp (GMT)" sortable body={(rowData) => dateBodyTemplate(rowData.timeStamp)}/>
                                            <Column field="statusFrom" header="Status From" sortable />
                                            <Column field="statusTo" header="Status To" sortable />
                                            <Column field="actionedBy" header="Actioned By" sortable />
                                            <Column field="remarks" header="Remarks" sortable />
                                            {/* Add more columns as needed */}
                                        </DataTable>
                                    </div>
                                )}

                                <ToastContainer />
                                {/* Modal for 'else' part */}
                                <div className="modal" id="resolveModal" ref={modalRef} show={show} onHide={handleClose}>
                                    <div className="modal-dialog modal-sm">
                                        <div className="modal-content">
                                            {/* Modal Header */}
                                            <form class="form-horizontal" name="addResolveForm" role="form">
                                                <div className="modal-header">
                                                    <h4 className="modal-title">Resolve</h4>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                                </div>

                                                <div className="modal-body">
                                                    {/* Add your modal content here */}
                                                    <div className="row mb-4">
                                                        <label htmlFor="status" className="col-sm-4 col-form-label">Status</label>
                                                        <div className="col-sm-8">
                                                            <input
                                                                type="text"
                                                                disabled
                                                                className="form-control"
                                                                id="status"
                                                                name="status"
                                                                value={formData.status}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="row mb-4">
                                                        <label htmlFor="comments" className="col-sm-4 col-form-label">Comments</label>
                                                        <div className="col-sm-8">
                                                            <textarea
                                                                className={`form-control ${formErrors.comments ? 'is-invalid' : ''}`}
                                                                id="comments"
                                                                name="comments"
                                                                value={formData.comments}
                                                                onChange={handleInputChange}
                                                            ></textarea>
                                                            <div className="invalid-feedback">{formErrors.comments}</div>
                                                        </div>
                                                    </div>

                                                    {/* Modal Footer */}
                                                    <div className="modal-footer">
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary btn-sm"
                                                            disabled={!formData.status.trim() || !formData.comments.trim()}
                                                            data-bs-dismiss="modal"
                                                            onClick={handleSaveClick}
                                                        
                                                        >
                                                            Save
                                                        </button>
                                                        <button type="button" className="btn btn-danger btn-sm" data-bs-dismiss="modal"  onClick={handleClose}>
                                                            Close
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
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