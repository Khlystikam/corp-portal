import React from 'react';
import { Routes, Route } from "react-router";
import Dashboards from '../Dashboards/Dashboards';
import Documents from '../Documents/Documents';
import Ecommerce from '../Ecommerce/Ecommerce';
import Colleagues from '../Colleagues/Colleagues';
import Projects from '../Projects/Projects';
import Calls from '../Calls/Calls';
import Mailing from '../Mailing/Mailing';
import Support from '../Support/Support';


const MainWindow: React.FC = () => {
    return (
        <div className="main-window flex flex-col justify-start items-center w-1/1 h-full overflow-y-auto p-5 bg-gray-800 rounded-2xl">
            <Routes>
                <Route index element={<Dashboards />} />
                <Route path="/projects/project-1/" element={<Dashboards />} />
                <Route path="/projects/project-1/dashboards" element={<Dashboards />} />
                <Route path="/projects/project-1/documents" element={<Documents />} />
                <Route path="/projects/project-1/e-commerce" element={<Ecommerce />} />
                <Route path="/projects/project-1/colleagues" element={<Colleagues />} />
                <Route path="/projects/project-1/projects" element={<Projects />} />
                <Route path="/projects/project-1/calls" element={<Calls />} />
                <Route path="/projects/project-1/mailing" element={<Mailing />} />
                <Route path="/projects/project-1/support" element={<Support />} />
            </Routes>
        </div>
    );
};

export default MainWindow;