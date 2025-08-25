import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface Props {
    labels: string[];
    values: number[];
}

const LineChart: React.FC<Props> = ({ labels, values }) => {
    const data = {
        labels,
        datasets: [
            {
                label: "",
                data: values,
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.5,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            
            title: {
                display: true,
                text: "График прдаж",
            },
        },
    };

    return (
        <div
            style={{
                width: "650px",
                height: "450px",
            }}
        >
            <Line data={data} options={options} />
        </div>
    );
};

export default LineChart;
