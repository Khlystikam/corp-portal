import React from 'react';
import CalendarPage from './Calendar/Calendar';
import TodoMainComponent from './Todo/TodoMainComponent';
import CompletedTasks from './CompletedTasks/CompletedTasks';
import LineGraphic from './LineGraphic/LineGraphic';

const Dashboards: React.FC = () => {
    return (
        <div className="dashboards flex flex-col justify-between gap-5 items-center w-1/1 h-auto">
            <div className="dashboards-line-one flex xl:flex-row w-1/1 xl:h-90 justify-around items-center gap-3 lg:flex-col lg:auto">
                <div className="flex flex-row xl:w-2/3 xl:h-1/1 justify-center items-center rounded-xl bg-gray-900/50 lg:w-1/1 lg:h-[500px]">
                    <CompletedTasks />
                </div>
                <div className="flex flex-row xl:w-2/4 xl:h-1/1 justify-center items-start rounded-xl bg-gray-900/50 lg:w-1/1 lg:h-[500px]">
                    <CalendarPage />
                </div>
            </div>
            <div className="dashboards-line-two flex xl:flex-row w-1/1 h-100 justify-around items-center gap-3 lg:flex-col">
                <div className="flex flex-row xl:w-1/3 h-1/1 justify-around items-center rounded-xl bg-gray-900/50 lg:w-1/1">
                    <TodoMainComponent />
                </div>
                <div className="flex flex-row xl:w-2/3 h-1/1 justify-around items-center rounded-xl bg-gray-900/50 lg:w-1/1">
                    <LineGraphic />
                </div>
            </div>
        </div>
    );
};

export default Dashboards;