import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import type { ChartEvent, ActiveElement, Chart  } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import type { Context } from "chartjs-plugin-datalabels";
import PopUpWindow from '../../../../features/PopUpWindow/PopUpWindow';
import type { CompletedTask } from '../../../../store/CompletedTasksData';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface Props {
    total: number;
    completed: number;
}

const TasksPieChart: React.FC<Props> = ({ completed, total }) => {
    const [activeTask, setActiveTask] = useState<CompletedTask | null>(null);

    const openPopUpFullTask = (item:any) => {
        setActiveTask(item);
    };

    // стили для кругового графика выполнения задач
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

        onHover: (event: ChartEvent, elements: ActiveElement[]) => {
            const mouseEvent = event.native as MouseEvent;
            if (mouseEvent?.target instanceof HTMLElement) {
                mouseEvent.target.style.cursor = elements.length ? "pointer" : "default";
            }
        },

        onClick: (event: ChartEvent, elements: ActiveElement[], chart: Chart) => {
            console.log(event);
            
            if (elements.length > 0) {
                const element = elements[0];
                console.log(element);
                const datasetIndex = element.datasetIndex;
                const index = element.index;
                const value = chart.data.datasets[datasetIndex].data[index];
                console.log(value)

                openPopUpFullTask(element);
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
                    fullText={{ text: activeTask.text, author: "", date: "" }}
                    onClose={ () => setActiveTask(null) }
                />
            )}
        </div>
    );
};

export default TasksPieChart;
