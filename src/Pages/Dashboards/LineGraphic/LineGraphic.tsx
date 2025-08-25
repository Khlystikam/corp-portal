import React, { useEffect, useState, useMemo } from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { ChevronLeft, ChevronRight } from "lucide-react"; 
import "./LineGraphic.css";

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import type { ChartOptions, ChartData } from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ChartDataLabels
);

const LineGraphic: React.FC = () => {
	const [chartData, setChartData] = useState<ChartData<"line"> | null>(null);
	const [pointDataBase, setPointDataBase] = useState<number>(0);

	const urlDataFetchRange = useMemo(
		() => [
			{range: "Месяц", urlBase: "https://dev-magick-api.ru/my-projects/data-api/prodazhi-mesyatsa.php"},
			{range: "Квартал", urlBase: "https://dev-magick-api.ru/my-projects/data-api/prodazhi-kvartal.php"},
			{range: "Год", urlBase: "https://dev-magick-api.ru/my-projects/data-api/prodazhi-goda.php"},
		], []
	);


    const switchPointDataBase = (step:string) => {
		if (step === "next") {
			if (pointDataBase === urlDataFetchRange.length - 1) {
				setPointDataBase(0);
			} else {
				setPointDataBase(pointDataBase + 1);
			}
		} else {
			if (pointDataBase === 0) {
				setPointDataBase(urlDataFetchRange.length - 1);
			} else {
				setPointDataBase(pointDataBase - 1);
			}
		}
    };

	useEffect(() => {
		fetch(urlDataFetchRange[pointDataBase].urlBase)

		.then((res) => res.json())
		.then((json) => {
			const data = {
				labels: json.data.labels,
				datasets: [
					{
						label: "Сумма продаж (руб)",
						data: json.data.datasets[0].data,
						borderColor: "rgba(54, 162, 235, 1)",
						tension: 0.4,
						borderWidth: 1,
						fill: true,
					},
				],
			};

		setChartData(data);

		})

		.catch((err) => console.error("Ошибка загрузки данных:", err));
	}, [pointDataBase, urlDataFetchRange]);

	if (!chartData) return <div className="text-center p-4">Загрузка графика...</div>;

	const options: ChartOptions<"line"> = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: "top",
				align: "start",
				labels: {
					color: "#fff",
					font: {
						family: "system-ui, Avenir, Helvetica, Arial, sans-serif",
						size: 14,
					},
				},
			},
			title: {
				display: true,
				text: "Продажи за " + urlDataFetchRange[pointDataBase].range,
				color: "#fff",
				font: {
					family: "system-ui, Avenir, Helvetica, Arial, sans-serif",
					size: 14,
				},
			},
			datalabels: {
				color: "#ffcc00", // цвет текста суммы
				anchor: "end",    // куда "привязывать" (start, center, end)
				align: "top",     // где показывать (top, bottom, left, right)
				offset: 8,        // отступ от точки
				font: {
					family: "system-ui, Avenir, Helvetica, Arial, sans-serif",
					size: 12,
					weight: "normal",
				},
			},
			tooltip: {
				enabled: true,
				titleColor: "#fff",
				bodyColor: "#ffcc00",  // цвет текста (сумма продаж)
				backgroundColor: "#4A5565", // фон самого тултипа
			},
		},
		scales: {
			x: {
				ticks: {
					color: "#fff",
					font: {
						family: "system-ui, Avenir, Helvetica, Arial, sans-serif",
						size: 12,
					},
				},

				grid: { color: "rgba(255,255,255,0.1)" },
				offset: true,
			},
			y: {
				ticks: {
					color: "#fff",
					font: {
						family: "system-ui, Avenir, Helvetica, Arial, sans-serif",
						size: 12,
					},
				},
				
				grid: { color: "rgba(255,255,255,0.1)" },
				offset: true,
			},
		},
	};

	return (
		<div
			className="linear-graphic-wrapper font-mono w-full h-100 p-4 rounded-xl shadow-lg"
		>
			<div className="buttons-array flex flex-row w-1/1 justify-end gap-4">
				<button
					title="button"
					className="rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:scale-105 transition cursor-pointer"
					onClick={ ()=> switchPointDataBase("prev") }
				>
					<ChevronLeft size={24} />
				</button>

				<button
					title="button"
					className="rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:scale-105 transition cursor-pointer"
					onClick={ ()=> switchPointDataBase("next") }
				>
					<ChevronRight size={24} />
				</button>
			</div>

			<Line data={chartData} options={options} />
		</div>
	);
};

export default LineGraphic;
