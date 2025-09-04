import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../../store/store';
import { fetchCompletedTasks, addTodoAsync } from '../../../store/TodoData';
import TodoForm from './TodoForm';

const TodoMainComponent: React.FC = () => {
    const userId = useSelector((state: RootState) => state.user.data?.id);
    const [text, setText] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (userId) {
            dispatch(fetchCompletedTasks(userId));
        }
    }, [userId, dispatch]);

    
    const handleAdd = () => {
        if (!userId || text.trim() === '') return;

        dispatch(addTodoAsync({
            user_id: userId,
            title: text,
            description: '',
            status: 0
        }));

        setText('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAdd();
        }
    };

    return (
        <div className="todo-main flex flex-col justify-start items-center w-95/100 h-95/100 rounded-xl overflow-y-auto">
            <p className="todo-main-title flex flex-col justify-center items-center w-1/1 h-15/100 text-orange-200 font-bold mb-2">
                Мой список задач
            </p>
            <div className="flex gap-2 w-9/10 mb-4">
                <input
                    className="todo-input-text flex-1 h-8 rounded-md bg-fuchsia-50 text-black p-2"
                    type="text"
                    placeholder="Новая запись ..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button
                    className="px-4 py-1 bg-green-600 text-white rounded-lg hover:bg-green-500 transition"
                    onClick={handleAdd}
                >
                    +
                </button>
            </div>

            <TodoForm />
        </div>
    );
};

export default TodoMainComponent;
