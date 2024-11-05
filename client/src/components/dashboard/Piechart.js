import React from "react";

const Piechart = ()=>{
    var ctx = document.getElementById('kt_chartjs_3');

// Define colors
var primaryColor = KTUtil.getCssVariableValue('--kt-primary');
var dangerColor = KTUtil.getCssVariableValue('--kt-danger');
var successColor = KTUtil.getCssVariableValue('--kt-success');
var warningColor = KTUtil.getCssVariableValue('--kt-warning');
var infoColor = KTUtil.getCssVariableValue('--kt-info');

// Define fonts
var fontFamily = KTUtil.getCssVariableValue('--bs-font-sans-serif');

// Chart labels
const labels = ['January', 'February', 'March', 'April', 'May'];

// Chart data
// const data = {
//     labels: labels,
//     datasets: [
//         ...
//     ]
// };

// Chart config
const config = {
    type: 'pie',
    data: data,
    options: {
        plugins: {
            title: {
                display: false,
            }
        },
        responsive: true,
    },
    defaults:{
        global: {
            defaultFont: fontFamily
        }
    }
};

// Init ChartJS -- for more info, please visit: https://www.chartjs.org/docs/latest/
var myChart = new Chart(ctx, config);

 return(
    <canvas id="kt_chartjs_3" class="mh-400px"></canvas>
 )
}