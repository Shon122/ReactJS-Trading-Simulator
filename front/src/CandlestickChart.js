import React from "react";
import ReactApexChart from "react-apexcharts";
import "./CandlestickChart.css"; // Import the CSS file

const CandlestickChart = ({ data, width, height, endGame }) => {
  // Calculate the position of the pointer
  var pointerPosition = {
    x: 800,
    y: 40, // Adjust the Y-coordinate as needed
  };
  if (endGame) {
    pointerPosition = {
      x: 640,
      y: 40, // Adjust the Y-coordinate as needed
    };
  }

  const options = {
    plotOptions: {
      candlestick: {
        colors: {
          upward: "rgba(11, 218, 81, 1)", // Color for upward (bullish) candlesticks
          downward: "rgba(255, 90, 55, 1)", // Color for downward (bearish) candlesticks
        },
      },
    },
    grid: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
    chart: {
      type: "candlestick",
      height: height,
      zoom: {
        enabled: true,
      },
      background: "#3b3b3b", // Set the background color to black
    },
    title: {
      text: "",
    },
    xaxis: {
      type: "datetime",
      tickPlacement: "on",
      show: false,
      tooltip: {
        enabled: false,
      },
      labels: {
        show: false,
      },
    },
    yaxis: {
      tooltip: {
        enabled: false,
      },
      labels: {
        show: false, // Hide the y-axis labels
      },
    },
  };

  return (
    <div className="candlestick-chart">
      <div className="chart-style">
        <ReactApexChart
          options={options}
          series={[{ data }]}
          type="candlestick"
          height={height}
          width={width}
        />
      </div>
      {/* Render the pointer */}
      {endGame && (
        <>
          <p className="pEnd1">Given Data</p>
          <p className="pEnd2">Result</p>
          <div className="pointer" style={{ left: 25, top: 475 }}></div>
          <div className="pointer2" style={{ left: 25, top: 452 }}></div>
          <div className="pointer2" style={{ left: 1315, top: 452 }}></div>
          <div className="pointer2" style={{ left: 1640, top: 452 }}></div>
        </>
      )}
    </div>
  );
};

export default CandlestickChart;
