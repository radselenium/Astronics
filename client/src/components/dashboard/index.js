import React, { useEffect, useState, useRef } from 'react';
import Header from "../Header"
import MessagingReport from "./MessagingReport";
import MessageSummary from "./MessageSummary";
import SearchFilter from "../Common/SearchFilter";
import CustomFilter from './CustomFilter';
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
	const [messages, setMessages] = useState(messageType);
	const [messagesPerDay, setmessagesPerDay] = useState([]);
	const [messagesPerType, setmessagesPerType] = useState([]);
	const [dateSelectValue, setDateSelectValue] = useState("Today");
	const [showDayChart, setShowDayChart] = useState(false);
	
	const [sourceselectValue, SourcesetSelectValue] = useState("All");
	const [productselectValue, setproductSelectValue] = useState("All");
	const [startDate, setStartDate] = useState(subMonths(new Date(), 1));
	const [endDate, setEndDate] = useState(new Date());
	const [isChartOpen, setChartOpen] = useState(true);

	useEffect(() => {
		
		
		
	  if (!messages.incomingMessage) {
		setChartOpen(false);
	  } else {
		setChartOpen(true);
	  }
      
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
								<div className='mt-mb-10 mt-xl-1 mt-md-5 mt-10'>
									<MessagingReport messages={messages} messagesPerType={messagesPerType} messagesPerDay={messagesPerDay} showDayChart={showDayChart} sourceselectValue={sourceselectValue} DateOption={dateSelectValue}/>
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