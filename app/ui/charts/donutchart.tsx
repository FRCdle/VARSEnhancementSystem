import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";

export default function DonutChart( props : { labels : string[], series : number[] } ) {
    const options: ApexOptions = {
    chart: {
        fontFamily: "Lexend, sans-serif",
        type: "donut",
    },
    colors: ["#3C50E0", "#8FD0EF", "#0FADCF"],
    labels: props.labels,
    legend: {
        show: false,
        position: "bottom",
    },

    plotOptions: {
        pie: {
        donut: {
            size: "60%",
            background: "transparent",
        },
        },
    },
    dataLabels: {
        enabled: true,
    },
    responsive: [
        {
        breakpoint: 2600,
        options: {
            chart: {
            width: 350,
            },
        },
        },
        {
        breakpoint: 640,
        options: {
            chart: {
            width: 250,
            },
        },
        },
    ],
    };

    return (
        <div className="mb-2">
            <div className="mx-auto flex justify-center">
                <ReactApexChart options={options} series={props.series} type="donut" />
            </div>
        </div>
    );
}
