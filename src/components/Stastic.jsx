import React from 'react';
import { LineChart1, LineChart2 } from '../Chart/LineChart';
import BigLineChart from '../Chart/BigChart';
import SmallCircleChart from '../Chart/Smallchar';
export default function Stastic() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 m-5 auto-rows-auto">
      
      <div className="bg-gray-200 rounded-xl shadow-md p-5">
        <h4 className="text-lg font-semibold text-indigo-700">Total Requests</h4>
        <p className="text-3xl font-bold text-gray-800">124</p>
      </div>

      <div className="bg-gray-200 rounded-xl shadow-md p-5">
        <h4 className="text-lg font-semibold text-green-700">Total Taskmaster</h4>
        <p className="text-3xl font-bold text-gray-800">92</p>
      </div>

      <div className="bg-gray-200 rounded-xl shadow-md row-span-2 col-span-2 p-5 flex flex-col items-center">
  <h4 className="text-lg font-semibold text-blue-700 mb-2"></h4>
  <SmallCircleChart />
</div>

      <div className="bg-gray-200 rounded-xl shadow-md p-5">
        <h4 className="text-lg font-semibold text-red-600">Pending Tasks</h4>
        <p className="text-3xl font-bold text-gray-800">78</p>
      </div>

      <div className="bg-gray-200 rounded-xl shadow-md p-5">
        <h4 className="text-lg font-semibold text-yellow-600">Avg. Visit per hour</h4>
        <p className="text-3xl font-bold text-gray-800">2.3 hrs</p>
      </div>

      {/* LineChart1 */}
      <div className="bg-gray-200 rounded-xl shadow-md p-5 flex items-center justify-center sm:col-span-2 lg:col-span-2 lg:row-span-2">
        <div className="w-full h-96 sm:h-72 lg:h-80">
          <LineChart1 />
        </div>
      </div>

      {/* LineChart2 */}
      <div className="bg-gray-200 rounded-xl shadow-md p-5 flex items-center justify-center sm:col-span-2 lg:col-span-2 lg:row-span-2">
        <div className="w-full h-64 sm:h-72 lg:h-80">
          <LineChart2 />
        </div>
      </div>

      {/* BigLineChart */}
      <div className="bg-gray-200 rounded-xl shadow-md p-5 flex items-center justify-center col-span-1 sm:col-span-2 lg:col-span-4">
        <div className="w-full h-80 sm:h-96">
          <BigLineChart />
        </div>
      </div>
      
    </div>
  );
}
