// import React, { useState } from 'react';
// import { useAppSelector, useAppDispatch } from './hooks';
// import { addTask, removeTask } from './features/tasksSlice';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import MainWindow from './components/MainWindow/MainWindow';

import './styles/App.css'

function App() {

  return (
    <>
      <div className="relative flex flex-col w-screen h-screen bg-gray-900 z-0">
        <div className="announcement top-0 left-0 flex flex-col justify-center items-center w-screen min-h-5 bg-amber-50">
          <p className="text-black">Это не конечный фунционал портала. Портал будет еще наполняться.</p>
        </div>
        <Header />
        <div className="Main flex flex-row justify-between gap-x-2 w-1/1 h-90/100 p-2 bg-gray-900">
            <Navbar />
            <MainWindow />
        </div>
      </div>
    </>
  )
}

export default App
