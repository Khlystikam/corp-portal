import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from "chartjs-plugin-datalabels";
import type { Context } from "chartjs-plugin-datalabels";
import PopUpWindow from '../PopUpWindow/PopUpWindow';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface Props {
    total: number;
    completed: number;
}

const TasksPieChart: React.FC<Props> = ({ completed, total }) => {
    const [activeTask, setActiveTask] = useState<{ id: string; text: string } | null>(null);

    const openPopUpFullTask = (completed: { id: string; text: string }) => {
        setActiveTask(completed);
    };

    const options = {
        cutout: "30%",
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 15,
                bottom: 15,
                left: 15,
                right: 15,
            }
        },
        plugins: {
            datalabels: {
                color: "#fff",
                formatter: (value: number, context: Context) => {
                    const dataset = context.chart.data.datasets[0].data;
                    const numbers = dataset.filter(
                        (d): d is number => typeof d === "number"
                    );
                    const totalSum = numbers.reduce((acc, cur) => acc + cur, 0);

                    const percentage = ((value / totalSum) * 100).toFixed(1);
                    return `${percentage}%`;
                },
            },
        },

        onHover: (event:any, elements:any) => {
            const target = event.native ? event.native.target : event?.target;
            if (target) {
                target.style.cursor = elements.length ? "pointer" : "default";
            }
        },

        onClick: (event: any, elements: any, chart: any) => {
            console.log(event);
            if (elements.length > 0) {
                const element = elements[0];
                const datasetIndex = element.datasetIndex;
                const index = element.index;

                // например: completed или total-completed
                const value = chart.data.datasets[datasetIndex].data[index];

                openPopUpFullTask({
                    id: String(index),
                    text: `Значение: ${value}`
                });
            }
        },
    }

    const data = {
        labels: [],
        datasets: [
            {
                label: "Задач",
                data: [completed, total - completed],
                backgroundColor: ["#00A63E", "#c98c3c"],
                borderWidth: 0.8,
                borderColor: "#fff",
                hoverOffset: 25,
            },
        ],
    };

    return (
        <div
            style={{
                width: "280px",
                height: "280px",
            }}
        >
            <Doughnut data={data} options={options} />

            {activeTask && (
                <PopUpWindow
                    visible={ true }
                    fuulText={ activeTask.text }
                    onClose={ () => setActiveTask(null) }
                />
            )}
        </div>
    );
};

export default TasksPieChart;
