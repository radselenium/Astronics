import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip, Cell, ResponsiveContainer, Label } from 'recharts';
import MessagePerType from './chart-reports/MessagePerType';
import MessagePerDay from './chart-reports/MessagePerDay';
import { useMediaQuery } from "@mui/material";
import * as htmlToImage from 'html-to-image';
import { saveAs } from 'file-saver';


function ChartDimension() {
	const isUltraSmallScreen = useMediaQuery("(max-width: 380px)");
	const isSmallScreen = useMediaQuery("(max-width: 768px)");
	const isMediumScreen = useMediaQuery("(max-width: 1024px)");
	let width, height;
	if (isSmallScreen) {
		width = "68%";
		height = "55%";
	} else if (isUltraSmallScreen) {
		width = "78%";
		height = "55%";
	} else if (isMediumScreen) {
		width = "68%";
		height = "55%";
	} else {
		width = "58%";
		height = "50%";
	}

	return { width, height };
}

const SimplePieChart = (props) => {
	

	const chartRef = useRef();

	const downloadChart = () => {
		htmlToImage.toPng(chartRef.current)
			.then((dataUrl) => {
				saveAs(dataUrl, 'Piechart.png'); // saveAs from 'file-saver' for downloading
			})
			.catch((err) => {
				console.error('Failed to download image:', err);
			});
	};
	const pieChartData = [
		
		
		{
			name: 'Processed',
			value: (() => {
				let processedValue = 0;
	
				if (props.sourceselectValue === "All") {
					if (props.DateOption === "Custom") {
						// Include all messages for "Custom" date option
						processedValue =
							Number(props.messages.processedMessages || 0) +
							Number(props.messages.dispatchedMessages || 0) +
							Number(props.messages.deletedMessages || 0);
					} else {
						// Exclude deleted messages for non-"Custom" date option
						processedValue =
							Number(props.messages.processedMessages || 0) +
							Number(props.messages.dispatchedMessages || 0);
					}
				} else if (props.sourceselectValue === "ASTRONICS") {
					if (props.DateOption === "Custom") {
						// Include only dispatched and deleted messages for "Custom" date option
						processedValue =
							Number(props.messages.dispatchedMessages || 0) +
							Number(props.messages.deletedMessages || 0);
					} else {
						// Include only dispatched messages for non-"Custom" date option
						processedValue =
							Number(props.messages.dispatchedMessages || 0);
					}
				} else {
					if (props.DateOption === "Custom") {
						// Include processed and deleted messages for "Custom" date option
						processedValue =
							Number(props.messages.processedMessages || 0) +
							Number(props.messages.deletedMessages || 0);
					} else {
						// Include only processed messages for non-"Custom" date option
						processedValue =
							Number(props.messages.processedMessages || 0);
					}
				}
	
				return processedValue;
			})(),
			
		},
		{ name: 'Awaiting Processing', value: props.messages.inQueue != 0 ? props.messages.inQueue : '' },
		{ name: 'Failed ', value: props.messages.failedProcessing != 0 ? props.messages.failedProcessing : '' },
		
	];

	const COLORS = ['#50cd89', '#ffc700', '#f1416c', '#50cd89', '#495d78'];

	const RADIAN = Math.PI / 180;

	const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, payload }) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);
		return (
			<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
				{`${payload.value}`} {/* Display the actual value instead of the percentage */}
			</text>
		);
	};

	const { width, height } = ChartDimension();

	return (

		<div>
			{/* <p className="d-flex justify-content-end"> */}
			<span title='Download Chart' className="fas fa-download" onClick={downloadChart} style={{ cursor: 'pointer', position: 'absolute', top: '33px', right: '18px', color: 'rgb(6, 85, 144)' }}></span>
			{/* </p> */}
			<div ref={chartRef} style={{ width: '100%', height: 300 }}>
				{/* Set height and width for the capture area */}

				<ResponsiveContainer height="100%" width="100%" >
					<PieChart width={400} height={300}> {/* Increased width to accommodate the legend */}
						<Pie
							data={pieChartData}
							dataKey="value"
							cx={width}
							cy={height}
							outerRadius={100}
							fill="#8884d8"
							labelLine={false}
							label={renderCustomizedLabel}
						>
							{pieChartData.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
						<Tooltip />
						<Legend align="right" verticalAlign="top" layout="vertical" />

					</PieChart>

				</ResponsiveContainer>
			</div>
		</div>
	);
};



const MessagingReport = (props) => {

	return (

		<div class="row gx-5 gx-xl-10">


			{/*begin::Col*/}
			<div class={props.showDayChart ? ("col-xxl-12 col-md-12 col-xl-12 mb-5 mb-xl-10") : ("col-xxl-12 col-md-12 col-xl-12 mb-5 mb-xl-10")}>
				{/*begin::Chart widget 28*/}
				<div class="card card-flush h-xl-100 shadow-sm">
					{/*begin::Header*/}
					<div class="card-header py-7 justify-content-center">
						{/*begin::Statistics*/}
						<div class="m-0">
							{/*begin::Heading*/}
							<div class="d-flex align-items-center mb-2">
								{/*begin::Title*/}
								<span class="fs-2qx fw-normal text-gray-800 me-2 lh-1 ls-n2">Messages by Category</span>

							</div>

						</div>


					</div>

					<div class="card-body d-flex align-items-center justify-content-center ps-4 pe-4 pb-5">
						{/*begin::Chart*/}
						<div id="kt_charts_widget_28" class="h-300px w-100 min-h-auto">
							<MessagePerType dataForMessagePerType={props.messagesPerType} />
						</div>
						{/*end::Chart*/}
					</div>
					{/*end::Body*/}
				</div>
				{/*end::Chart widget 28*/}
			</div>
			{/*end::Col*/}


			{/*begin::Col*/}
			<div class={props.showDayChart ? ("col-xxl-6 col-md-6 col-xl-6 mb-5 mb-xl-10") : ("col-xxl-12 col-md-6 col-xl-12 mb-5 mb-xl-10")}>
				{/*begin::Chart widget 27*/}
				<div class="card card-flush h-xl-100 shadow-sm">
					{/*begin::Header*/}
					<div class="card-header py-7 justify-content-center">
						{/*begin::Statistics*/}
						<div class="m-0">
							{/*begin::Heading*/}
							<div class="d-flex align-items-center mb-2">
								{/*begin::Title*/}
								<span class="fs-2qx fw-normal text-gray-800 me-2 lh-1 ls-n2">Message Summary</span>



							</div>



						</div>

					</div>
					{/*end::Header*/}
					{/*begin::Body*/}
					<div class="card-body  pe-3 ps-3 pb-3">
						<div id="kt_charts_widget_28" class="h-300px w-100 min-h-auto mx-auto my-auto"  >
							<SimplePieChart messages={props.messages} sourceselectValue={props.sourceselectValue} DateOption={props.DateOption} />
						</div>
					</div>
					{/*end::Body*/}
				</div>
				{/*end::Chart widget 27*/}
			</div>
			{/*end::Col*/}
			{/*begin::Col*/}
			{props.showDayChart ? <>
				<div class="col-xxl-6 col-md-6 col-xl-6 mb-5 mb-xl-10">
					{/*begin::Chart widget 28*/}
					<div class="card card-flush h-xl-100 shadow-sm">
						{/*begin::Header*/}
						<div class="card-header py-7 justify-content-center">
							{/*begin::Statistics*/}
							<div class="m-0">
								{/*begin::Heading*/}
								<div class="d-flex align-items-center mb-2">
									{/*begin::Title*/}
									<span class="fs-2qx fw-normal text-gray-800 me-2 lh-1 ls-n2">Messages per Day</span>


								</div>


							</div>
							{/*end::Statistics*/}

						</div>
						{/*end::Header*/}
						{/*begin::Body*/}
						<div class="card-body flex-d-row align-items-center justify-content-center ps-4 pe-4 pb-5 col-md-12 ">
							{/*begin::Chart*/}
							<div id="kt_charts_widget_28" class="h-300px w-100 min-h-auto col-md-12 "  >
								{/* <SimpleBarChart1 /> */}
								<MessagePerDay dataForMessagePerDay={props.messagesPerDay} />
							</div>
							{/* <div className='col-md-12 row'>
							<span class="fs-2 fw-normal  me-2 lh-1 ls-n2 text-dark">Last 7 Days</span>  
							</div> */}
							{/*end::Chart*/}
						</div>
						{/*end::Body*/}
					</div>
					{/*end::Chart widget 28*/}
				</div>
			</> : <></>}
			{/*end::Col*/}



		</div>

	)
}



export default MessagingReport