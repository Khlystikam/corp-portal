import { useState } from 'react';
// import { useAppSelector, useAppDispatch } from './hooks';
// import { addTask, removeTask } from './features/tasksSlice';
import Header from './pages/Header/Header';
import Navbar from './pages/Navbar/Navbar';
import MainWindow from './pages/MainWindow/MainWindow';

import './styles/App.css'

function App() {
	const [hideNotification, setHideNotification] = useState(false);

	const closeHideNotification = () => {
		setHideNotification(true);
	}

	return (
		<>
			<div className="relative flex flex-col w-screen h-screen bg-gray-900 z-0">
				<div className={`${hideNotification ? "hidden" : "flex"} "announcement top-0 left-0 flex-row justify-center items-center gap-30 w-screen h-10 min-h-10 bg-white "`}>
					<p className="text-black">Это не конечный фунционал портала. Портал будет еще наполняться.</p>
					<button
						className="w-20 h-4 flex items-center justify-center rounded p-4 cursor-pointer bg-blue-500 text-white hover:bg-blue-600"
						type="button"
						onClick={ closeHideNotification }
					>
						Закрыть
					</button>
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
