import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";
  

const BarChartJs = () => {
  // Data in Array Of Objects Form
    const data = [
        {
          name: "Support",
          male: 4000,
          female: 2400,
          amt: 2400
        },
        {
          name: "HR",
          male: 3000,
          female: 1398,
          amt: 2210
        },
        {
          name: "DevOps",
          male: 2780,
          female: 3908,
          amt: 2000
        },
        {
          name: "QA",
          male: 1890,
          female: 4800,
          amt: 2181
        },
        {
          name: "Calling",
          male: 2390,
          female: 3800,
          amt: 2500
        }
      ];
    return (
        <BarChart
          width={350}
          height={250}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="female" fill="#8884d8" />
          <Bar dataKey="male" fill="#82ca9d" />
        </BarChart>
      );
}

export default BarChartJs
