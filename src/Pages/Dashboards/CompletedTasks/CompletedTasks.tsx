import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../store/store';
import type { CompletedTask } from '../../../store/CompletedTasksData';
import { togglecompletedTaskSlice } from '../../../store/CompletedTasksData';
import PopUpWindow from '../../../features/PopUpWindow/PopUpWindow';
import TasksPieChart from './TasksPieChart/TasksPieChart';
import { Check } from 'lucide-react';

import "./CompletedTasks.css";


const CompletedTasks: React.FC = () => {
    const completedTasks = useSelector((state: RootState) => state.completedTask.completedTasks);
    const dispatch = useDispatch();
    const [activeTask, setActiveTask] = useState<CompletedTask | null>(null);


    // классы для отображения задач
    const generalClass = "completed-task-item flex flex-row justify-start items-center w-1/1 h-5 gap-3 p-5 ";
    const classTaskElementsMade = generalClass + "bg-green-700 rounded-md hover:shadow-md cursor-pointer";
    const classTaskElementsNoMade = generalClass + "rounded-md hover:shadow-md bg-red-900/50 cursor-pointer";


    const openPopUpFullTask = (task: CompletedTask) => {
        setActiveTask(task);
    };


    // функция вывода данных для диаграммы
    const progressBarCounts = () => {
        const completedTrueCount = completedTasks.filter(task => task.completed).length;
        const completedFalseCount = completedTasks.filter(task => !task.completed).length;
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
        };

        return(
            <>
                { completedPieChart() }
            </>
        );
    };


    // функция вывода списка задач с возможностью отмечать их выполнения
    const taskElements = () => {
        return(
            <div className="completed-task-elements flex flex-col justify-start items-center w-9/10 h-1/1 gap-3 rounded-xl">
                {completedTasks.map((task: CompletedTask) => {
                    const { id, completed, text  } = task;

                    return (
                        <div
                            key={id}
                            className={completed ? classTaskElementsMade : classTaskElementsNoMade}
                            onClick={() => openPopUpFullTask(task)}
                        >
                            <input
                                className="completed-task-checkbox size-4 cursor-pointer"
                                title="checkbox"
                                type="checkbox"
                                checked={completed}
                                onClick={(e) => e.stopPropagation()}
                                onChange={() => dispatch(togglecompletedTaskSlice(id))}
                            />
                            <ul className="completed-task-box-value w-1/1 text-left">
                                <li className="completed-task-item-value w-1/1">
                                    {text.length > 35 ? `${text.slice(0, 35)}...` : text}
                                </li>
                            </ul>
                        </div>
                    );
                })}

                {activeTask && (
                    <PopUpWindow
                        visible={!!activeTask}
                        fullText={{
                            text: activeTask?.text || "",
                            author: activeTask?.author || "",
                            date: activeTask?.date || ""
                        }}
                        onClose={() => setActiveTask(null)}
                    />
                )}
            </div>
        );
    };


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
