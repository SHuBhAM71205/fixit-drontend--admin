// BigLineChart.jsx
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from 'recharts';
import { faker } from '@faker-js/faker';

const generateData = (num = 10) => {
  return Array.from({ length: num }, (_, i) => ({
    name: faker.date.recent(90).toLocaleDateString(), // or faker.word.words(2)
    value: faker.number.int({ min: 10, max: 100 }),
  }));
};

const data = generateData(100); // adjust length as needed

export default function BigLineChart() {
  return (
    <div className="overflow-x-auto w-full">
      <div style={{ width: `${data.length * 50}px`, height: 350, scrollbarWidth:1}}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={100} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#00bcd4" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
