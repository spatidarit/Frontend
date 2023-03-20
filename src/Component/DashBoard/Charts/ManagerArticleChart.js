import React from "react";
import { Chart } from "react-google-charts";

const ManagerArticleChart = () => {
  const data = [
    ["Days", "Raj", "Sid"],
    [1, 1, 8],
    [2, 1, 6],
    [3, 3, 5],
    [4, 6, 7],
    [5, 1, 9],
    [6, 4, 3],
    [7, 6, 3],
    [8, 2, 9],
    [9, 10, 2],
    [10, 5, 8],
    [11, 14, 3],
    [12, 7, 1],
    [13, 4, 6],
    [14, 4, 6],
  ];

  const options = {
    chart: {
      title: "Manager Overview",
      subtitle: "Article per day",
      vAxis: { gridlines: { count: 4 } },
    },
  };
  return (
    <Chart
      chartType="Line"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
};
export default ManagerArticleChart;
