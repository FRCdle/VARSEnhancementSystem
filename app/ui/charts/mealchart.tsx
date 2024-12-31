import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";

export default function MealChart() {
    const options: ApexOptions = {
    chart: {
        fontFamily: "Satoshi, sans-serif",
        type: "donut",
    },
    colors: ["#3C50E0", "#6577F3", "#8FD0EF", "#0FADCF"],
    labels: ["Desktop", "Tablet", "Mobile", "Unknown"],
    legend: {
        show: false,
        position: "bottom",
    },

    plotOptions: {
        pie: {
        donut: {
            size: "65%",
            background: "transparent",
        },
        },
    },
    dataLabels: {
        enabled: false,
    },
    responsive: [
        {
        breakpoint: 2600,
        options: {
            chart: {
            width: 380,
            },
        },
        },
        {
        breakpoint: 640,
        options: {
            chart: {
            width: 200,
            },
        },
        },
    ],
    };

    const series = [65, 34, 12, 56];

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
            <div className="mb-2">
                <div className="mx-auto flex justify-center">
                    <ReactApexChart options={options} series={series} type="donut" />
                </div>
            </div>
        </div>
    );
}
