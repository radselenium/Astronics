import React, { useEffect, useState,useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer } from 'recharts';
import HttpClient from '../../config/HttpConfig';
import moment from 'moment';
import * as htmlToImage from 'html-to-image';
import { saveAs } from 'file-saver';

const MessagePerDay = (props) => {
  const [messagesPerDay, setmessagesperDay] = useState(props.dataForMessagePerDay);
  console.log(messagesPerDay)
  const chartRef = useRef();

  const downloadChart = () => {
    htmlToImage.toPng(chartRef.current)
      .then((dataUrl) => {
        saveAs(dataUrl, 'MessagePerDay.png'); // saveAs from 'file-saver' for downloading
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
				<BarChart width={300} height={300} data={props.dataForMessagePerDay} >
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="_id">

					</XAxis>
					<YAxis dataKey="count" />
					<Tooltip />

					<Bar dataKey="count" fill="#594d96" />
				</BarChart>
			</ResponsiveContainer>
        </div>
		</div>
  );
};

export default MessagePerDay;
