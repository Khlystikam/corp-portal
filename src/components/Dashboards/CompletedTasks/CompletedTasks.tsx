import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../store/store';
import { togglecompletedTaskSlice } from '../../../store/CompletedTasksData';
import PopUpWindow from '../../PopUpWindow/PopUpWindow';
import TasksPieChart from '../../TasksPieChart/TasksPieChart';
import { Check } from 'lucide-react';

import "./CompletedTasks.css";


const CompletedTasks: React.FC = () => {
    const completedTaskSlices = useSelector((state: RootState) => state.completedTask.completedTasks);
    const dispatch = useDispatch();
    const [activeTask, setActiveTask] = useState<{ id: string; text: string } | null>(null);


    // классы для отображения задач
    const generalClass = "completed-task-item flex flex-row justify-start items-center w-1/1 h-5 gap-3 p-5 ";
    const classTaskElementsMade = generalClass + "bg-green-700 rounded-md hover:shadow-md cursor-pointer";
    const classTaskElementsNoMade = generalClass + "rounded-md hover:shadow-md bg-red-900/50 cursor-pointer";

    const openPopUpFullTask = (task: { id: string; text: string }) => {
        setActiveTask(task);
    };


    // функция вывода данных для диаграммы
    const progressBarCounts = () => {
        const completedTrueCount = completedTaskSlices.filter(task => task.completed).length;
        const completedFalseCount = completedTaskSlices.filter(task => !task.completed).length;
        const sumCompletedCount = completedTrueCount + completedFalseCount;

        // функция показа completed при выполнении всех задач
        const completedPieChart = () => {
            if (completedTrueCount === sumCompletedCount) {
				return(
					<div className="round-completed flex flex-col justify-center items-center gap-4">
						<Check className="w-15 h-15 font-bold text-amber-50" />
						<p className="round-completed-title text-amber-50 font-bold text-xl">
							Completed!
						</p>
					</div>
				);
            } else {
                return (
                    <TasksPieChart completed={ completedTrueCount } total={ sumCompletedCount } />
                );
            }
        }

        return(
            <>
                { completedPieChart() }
            </>
        );
    }


    // функция вывода списка задач с возможностью отмечать их выполнения
    const taskElements = () => {
        return(
            <div className="completed-task-elements flex flex-col justify-start items-center w-9/10 h-1/1 gap-3 rounded-xl">
                {completedTaskSlices.map((item) => (
                    <div
                        key={item.id}
                        className={item.completed ? classTaskElementsMade : classTaskElementsNoMade}
                        onClick={() => openPopUpFullTask(item)}
                    >
                        <input
                            className="completed-task-checkbox size-4 cursor-pointer"
                            type="checkbox"
                            placeholder="checkbox"
                            checked={item.completed}
                            onClick={(e) => e.stopPropagation()}
                            onChange={() => dispatch(togglecompletedTaskSlice(item.id))}
                        />
                        <ul className="completed-task-box-value w-1/1 text-left">
                            <li className="completed-task-item-value w-1/1">
                                {item.text.length > 35 ? item.text.slice(0, 35) + "..." : item.text}
                            </li>
                        </ul>
                    </div>
                ))}

                {activeTask && (
                    <PopUpWindow
                        visible={ true }
                        fuulText={ activeTask.text }
                        onClose={ () => setActiveTask(null) }
                    />
                )}
            </div>
        );
    }


    // вывод диаграммы и задач на месяц
    return (
        <div className="completed-task-main flex flex-row justify-between items-start w-1/1 h-1/1 rounded-xl p-4">
            <div className="progress-bar-graphics flex flex-col justify-center items-center w-50/100">
                <p className="completed-task-main-title flex flex-col justify-center items-center w-1/1 h-15/100 text-orange-200 font-bold mb-2">
                    Прогресс выполнения задач:
                </p>
                { progressBarCounts() }
            </div>

            <div className="completed-task-wrapper w-50/100 h-1/1 overflow-y-auto">
                <p className="completed-task-main-title flex flex-col justify-center items-center w-9/10 h-15/100 text-orange-200 font-bold m-2">
                    Текущие задачи месяца:
                </p>
                { taskElements() }
            </div>
        </div>
    );
};

export default CompletedTasks;
