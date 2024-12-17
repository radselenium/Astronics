import React, { useState, useEffect,useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import HttpClient from '../../config/HttpConfig';
import * as htmlToImage from 'html-to-image';
import { saveAs } from 'file-saver';

const MessagePerType = (props) => {
    const [data, setData] = useState(props.dataForMessagePerType);
  //  console.log(props)
	const chartRef = useRef();

	const downloadChart = () => {
	  htmlToImage.toPng(chartRef.current)
		.then((dataUrl) => {
		  saveAs(dataUrl, 'MessagePerType.png'); // saveAs from 'file-saver' for downloading
		})
		.catch((err) => {
		  console.error('Failed to download image:', err);
		});
	};


    return (
		<div>
		<span title='Download Chart' className="fas fa-download" onClick={downloadChart} style={{ cursor: 'pointer',position:'absolute',top:'33px',right:'18px',color:'rgb(6, 85, 144)' }}></span>
        <div ref={chartRef} className="text-center mx-auto">
             <ResponsiveContainer width="100%" height={300}>
				<BarChart width={400} height={300} data={props.dataForMessagePerType} barSize={60 / props.dataForMessagePerType.length}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="messageType"  tick={{ fontSize: 12, width: 60, wordWrap: 'break-word' }}  
   >

					</XAxis>
					<YAxis dataKey="count" />
					<Tooltip />

					<Bar dataKey="count" fill="#495d78" />
				</BarChart>
			</ResponsiveContainer> 
        </div>
		</div>
    );
};

export default MessagePerType;
