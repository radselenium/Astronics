import React, { useEffect, useState, useRef } from 'react';
import Header from "../Header"
import MessagingReport from "./MessagingReport";
import MessageSummary from "./MessageSummary";
import SearchFilter from "../Common/SearchFilter";
import CustomFilter from './CustomFilter';
import HttpClient from '../config/HttpConfig';
import { subMonths } from "date-fns";
const Dashboard = () => {
	
	const messageType = {
		incomingMessage: 0,
		recievedMessages: 0,
		processedMessages: 0,
		inQueue: 0,
		failedProcessing: 0,
		resolvedMessages: 0,
	}
	//const [sourceselectValue, SourcesetSelectValue] = useState();
	const [messages, setMessages] = useState(messageType);
	const [messagesPerDay, setmessagesPerDay] = useState([]);
	const [messagesPerType, setmessagesPerType] = useState([]);
	//const [sourceselectValue, SourcesetSelectValue] = useState([]);
	//const [query, setQuery] = useState({})
	const [dateSelectValue, setDateSelectValue] = useState("Today");
	const [showDayChart, setShowDayChart] = useState(false);
	// const [incomingMessage, setIncomingMessage] = useState('');
    // const [recievedMessages, setrecievedMessages] = useState('');
    // const [processedMessages, setProcessedMessages] = useState('');
    // const [inQueue, setInQueue] = useState('');
    // const [failedProcessing, setfailedProcessing] = useState('');
    // const [resolvedMessages, setResolvedMessages] = useState('');
	const [sourceselectValue, SourcesetSelectValue] = useState("All");
	const [productselectValue, setproductSelectValue] = useState("All");
	const [startDate, setStartDate] = useState(subMonths(new Date(), 1));
	const [endDate, setEndDate] = useState(new Date());
	//const [sourceselectValue, SourcesetSelectValue] = useState("ASTRONICS");
	//const [DateOption, setDateOption] = useState("Today");
	const [isChartOpen, setChartOpen] = useState(true);

	useEffect(() => {
		
		
		
	  if (!messages.incomingMessage) {
		setChartOpen(false);
	  } else {
		setChartOpen(true);
	  }
        // HttpClient.get('/incomingmessage/count').then(function (response) {

        //     setIncomingMessage(response.data.data);
        //     console.log(response);
        // })
        // HttpClient.get('/recievedmessage/count').then(function (response) {

        //     setrecievedMessages(response.data.data);
        //     console.log(response);
        // })
        // HttpClient.get('/processedMessages/count').then(function (response) {

        //     setProcessedMessages(response.data.data);
        //     console.log(response);
        // })
        // HttpClient.get('/inQueue/count').then(function (response) {

        //     setInQueue(response.data.data);
        //     console.log(response);
        // })
        // HttpClient.get('/failedProcessing/count').then(function (response) {

        //     setfailedProcessing(response.data.data);
        //     console.log(response);
        // })
		// HttpClient.post(
		// 	'/api/getAllStatusCount', 
		// 	{
		// 	  receivedDate: {
		// 		$gte: '2023-12-05T13:06:38.000Z',
		// 		$lte: '2023-12-15T13:06:38.000Z',
		// 	  },
		// 	  xmlMessageSource: 'AEX',
		// 	}
		//   ).then(function (response){
		// 	console.log('Status Counts:', statusCounts);
		// 	console.log('Overall Count:', overallCount);
		   
		// 	messageType.incomingMessage = overallCount;
		// 	if (Array.isArray(statusCounts)) {
		// 		statusCounts.forEach(statusCount => {
		// 		  const { _id, count } = statusCount;
		// 		  switch (_id.status) {
		// 			case "DONE":
		// 				messageType.processedMessages = count;
		// 				break;
		// 			case "QUEUED":
		// 				messageType.inQueue = count;
		// 				break;
		// 			case "DONE W/ERRORS":
		// 				messageType.failedProcessing = count;
		// 				break;
		// 			case "RESOLVED":
		// 				messageType.resolvedMessages = count;
		// 				break;												
		// 			case "RECEIVED":
		// 				messageType.recievedMessages = count;
		// 				break;						
		// 			default:
		// 				break;
		// 		  }                   
		// 		});
		// 	  }
		// 	  setMessages({...messages})
		//     })
        // HttpClient.get('/api/getAllStatusCount',query).then(function (response) {
        //     const { statusCounts, overallCount } = response.data[0];

        //         // Log the counts
        //         console.log('Status Counts:', statusCounts);
        //         console.log('Overall Count:', overallCount);
               
		// 		messageType.incomingMessage = overallCount;
        //         if (Array.isArray(statusCounts)) {
        //             statusCounts.forEach(statusCount => {
        //               const { _id, count } = statusCount;
        //               switch (_id.status) {
		// 				case "DONE":
		// 					messageType.processedMessages = count;
		// 					break;
		// 				case "QUEUED":
		// 					messageType.inQueue = count;
		// 					break;
		// 				case "DONE W/ERRORS":
		// 					messageType.failedProcessing = count;
		// 					break;
		// 				case "RESOLVED":
		// 					messageType.resolvedMessages = count;
		// 					break;												
		// 				case "RECEIVED":
		// 					messageType.recievedMessages = count;
		// 					break;						
		// 				default:
		// 					break;
		// 			  }                   
        //             });
        //           }
		// 		  setMessages({...messages})
        //     })
    },[isChartOpen, messages]);


	return (
		<div class="d-flex flex-column flex-root app-root" id="kt_app_root">
			{/*begin::Page  */}
			<div class="app-page flex-column flex-column-fluid" id="kt_app_page">
				<div style={{ position: "sticky",top:0,zIndex:1000 }}>
					<Header activeMenuItem="dashboard" />
				</div>
				<div class="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
					{/*begin::Wrapper container*/}
					<div class="app-container container-xxl d-flex flex-row flex-column-fluid px-md-5">
						{/*begin::Main*/}
						<div class="app-main flex-column flex-row-fluid" id="kt_app_main">
							{/*begin::Content wrapper*/}
							<div class="d-flex flex-column flex-column-fluid card card-custom-border pt-5 px-md-5 pb-0 my-md-5">
								{/*begin::Content*/}
								{/* begin the filter search */}
								<div>
									<SearchFilter showSaveButton={false} showSave={false} showSettings={false} showSearch={false} />

								</div>
								{/* Ending the Filter search */}
								<div>
									<CustomFilter messages={messages} setMessages={setMessages} setmessagesPerType={setmessagesPerType} setmessagesPerDay={setmessagesPerDay} dateSelectValue={dateSelectValue} setDateSelectValue={setDateSelectValue} setShowDayChart={setShowDayChart}    SourcesetSelectValue={SourcesetSelectValue} setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    setDateOption={setDateSelectValue} setproductSelectValue={setproductSelectValue}/>

								</div>
								<div>
									<MessageSummary messages={messages}  sourceselectValue={sourceselectValue} startDate={startDate} endDate={endDate}  DateOption={dateSelectValue} productselectValue={productselectValue} />
								</div>
								{isChartOpen && (
								<div className='mt-mb-10 mt-xl-10 mt-10'>
									<MessagingReport messages={messages} messagesPerType={messagesPerType} messagesPerDay={messagesPerDay} showDayChart={showDayChart} sourceselectValue={sourceselectValue}/>
								</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default Dashboard