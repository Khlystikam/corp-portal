import React, { useState } from "react";
import PopUpWindow from "../../../features/PopUpWindow/PopUpWindow";
import { format, eachDayOfInterval, startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { ru } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react"; // стрелочки

const CalendarPage: React.FC = () => {
	const [activeDayButton, setActiveDayButton] = useState<{ id: number; name: string } | null>(null);
	const [indexCurrentMonth, setIndexCurrentMonth] = useState<number>(0);

	const today = new Date();

	const goPrevMonth = () => setIndexCurrentMonth((prev) => prev - 1);
	const goNextMonth = () => setIndexCurrentMonth((prev) => prev + 1);

	const currentDate = new Date(
		today.getFullYear(),
		today.getMonth() + indexCurrentMonth,
		1
	);

	const days = eachDayOfInterval({
		start: startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 }), // начало недели (Пн)
		end: endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 }),       // конец недели (Вс)
	});



	return (
		<div className="calendar-container flex flex-col justify-between items-center w-9/10 h-9/10 mt-4">

			<div className="flex flex-row items-center justify-center w-full relative">
				<button
					title="button prev month"
					className="absolute left-0 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:scale-105 transition cursor-pointer"
					type="button"
					onClick={goPrevMonth}
				>
					<ChevronLeft size={24} />
				</button>

				<div className="text-lg font-bold capitalize">
					{format(currentDate, "LLLL yyyy", { locale: ru })}
				</div>

				<button
					title="button next month"
					className="absolute right-0 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:scale-105 transition cursor-pointer"
					type="button"
					onClick={goNextMonth}
				>
				<ChevronRight size={24} />
				</button>
			</div>


			<div className="name-day grid grid-flow-row grid-cols-7 gap-4 w-75/100 text-base px-1 text-center font-semibold">
				<p>Пн</p>
				<p>Вт</p>
				<p>Ср</p>
				<p>Чт</p>
				<p>Пт</p>
				<p className="text-red-500">Сб</p>
				<p className="text-red-500">Вс</p>
			</div>


			<div className="calendar-buttons-container grid grid-flow-row grid-cols-7 place-items-center gap-2 w-8/10 h-8/10 min-h-8/10 text-base bg-neutral-200/30 rounded-lg p-3">
				{days.map((d) => {
					const isCurrentMonth = d.getMonth() === currentDate.getMonth();
					const isDayOff = d.getDay() === 0 || d.getDay() === 6;

					const isToday =
						d.getDate() === today.getDate() &&
						d.getMonth() === today.getMonth() &&
						d.getFullYear() === today.getFullYear();

					return (
						<button
							key={d.toISOString()}
							className={`w-6 h-6 flex items-center justify-center rounded p-4 cursor-pointer
								${isCurrentMonth
									? isToday
										? "bg-green-500 text-white hover:bg-green-600"
										: isDayOff
											? "bg-red-500 text-white hover:bg-red-600"
											: "bg-blue-500 text-white hover:bg-blue-600"
										: "text-gray-400 bg-gray-500/50"
								}`}

							onClick={() =>
								setActiveDayButton({
									id: d.getDate(),
									name: format(d, "d MMMM yyyy", { locale: ru }),
								})
							}
						>
							{format(d, "d", { locale: ru })}
						</button>
					);
				})}
			</div>

			{activeDayButton && (
				<PopUpWindow
					visible={true}
					fullText={{text: activeDayButton.name, author: "", date: ""}}
					onClose={() => setActiveDayButton(null)}
				/>
			)}
		</div>
	);
};

export default CalendarPage;
