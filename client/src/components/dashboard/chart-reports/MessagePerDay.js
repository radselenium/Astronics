import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer } from 'recharts';
import HttpClient from '../../config/HttpConfig';
import moment from 'moment';

const MessagePerDay = (props) => {
  const [messagesPerDay, setmessagesperDay] = useState(props.dataForMessagePerDay);
  console.log(messagesPerDay)
  return (
    <div className="text-center mx-auto">
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
  );
};

export default MessagePerDay;
