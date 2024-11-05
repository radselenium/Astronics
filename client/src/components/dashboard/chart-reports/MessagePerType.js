import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import HttpClient from '../../config/HttpConfig';

const MessagePerType = (props) => {
    const [data, setData] = useState(props.dataForMessagePerType);
    console.log(props)
  


    return (
        <div className="text-center mx-auto">
             <ResponsiveContainer width="100%" height={300}>
				<BarChart width={300} height={300} data={props.dataForMessagePerType} barSize={60 / props.dataForMessagePerType.length}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="messageType">

					</XAxis>
					<YAxis dataKey="count" />
					<Tooltip />

					<Bar dataKey="count" fill="#495d78" />
				</BarChart>
			</ResponsiveContainer> 
        </div>
    );
};

export default MessagePerType;
