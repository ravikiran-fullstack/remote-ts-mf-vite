import React from "react";
import LineChartComponent from "./LineChartComponent";
import BarChartComponent from "./BarChartComponent";

const ProcessesAndCharts: React.FC = () => {
  return (
    <>
      <div>
        <h1>Processes And Charts</h1>
      </div>
      <BarChartComponent/>
      <LineChartComponent />
      
    </>
  );
};

export default ProcessesAndCharts;
