import React, { useState } from "react";
import { Chart } from "react-google-charts";

const EmployeeArticleChart = () => {
  const data = [
    ["Users", "Articles"],
    ["Raj", 15],
    ["Shubham", 6],
    ["Dhyan", 12],
    ["Raj", 24],
  ];

  const options = {
    backgroundColor: "#f1f8e9",
    chart: {
      title: "Employee Overview",
      subtitle: "Article per month",
    },
    series: {
      0: { color: "#B84A4A" },
    },
  };

  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
};
export default EmployeeArticleChart;
