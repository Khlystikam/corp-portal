import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../../store/store'; 
import { fetchCompletedTasks, toggleTodoAsync, removeTodoAsync } from '../../../store/TodoData';
import PopUpWindow from '../../../features/PopUpWindow/PopUpWindow';

const TodoForm: React.FC = () => { 
    const userId = useSelector((state: RootState) => state.user.data?.id);
    const todos = useSelector((state: RootState) => state.todo.todos || []);
    const loading = useSelector((state: RootState) => state.todo.loading);
    const dispatch = useDispatch<AppDispatch>();
    const [activeTask, setActiveTask] = useState<{ id: number; text: string } | null>(null);

    useEffect(() => {
        if (userId) {
            dispatch(fetchCompletedTasks(userId));
        }
    }, [userId, dispatch]);

    // const openPopUpFullTask = (task: { id: number; text: string }) => {
    //     setActiveTask(task);
    // };

    if (loading) {
        return <p>Загрузка задач...</p>;
    }

    return (
        <div className="todo-main flex flex-col justify-start items-center w-1/1 h-1/1 gap-3 rounded-xl">
            {todos.length === 0 ? (
                <p>Список задач пуст</p>
            ) : (
                todos.map((item, index) => (
                    <div
                        key={item.id ?? index}
                        className="todo-main flex flex-row justify-start items-center w-85/100 h-5 gap-3 p-5 bg-gray-700 rounded-md hover:shadow-md cursor-pointer"
                        // onClick={() => openPopUpFullTask(item)}
                    >
                        <input
                            placeholder="checkbox"
                            className="todo-text-checkbox size-4 cursor-pointer"
                            type="checkbox"
                            checked={item.status === 1}
                            onClick={(e) => e.stopPropagation()}
                            onChange={() => dispatch(toggleTodoAsync({ user_id: item.user_id, id: item.id }))}
                        />
                        <ul className="todo-box-value w-80/100 text-left">
                            <li className={item.status === 1 ? "todo-item-value w-1/1 line-through" : "todo-item-value w-1/1"}>
                                {(item.title ?? "").length > 30 ? (item.title ?? "").slice(0, 30) + "..." : item.title ?? ""}
                            </li>
                        </ul>
                        <button
                            type="button"
                            className="button-delete-todo size-6 rounded-md font-bold bg-rose-900/100 cursor-pointer hover:shadow-md shadow-rose-900/70 hover:scale-115 ease-in-out transition duration-150"
                            onClick={() => dispatch(removeTodoAsync({ user_id: item.user_id, id: item.id }))}
                        >
                            -
                        </button>
                    </div>
                ))
            )}

            {activeTask && (
                <PopUpWindow
                    visible={true}
                    fullText={{ text: activeTask.text, author: "", date: "" }}
                    onClose={() => setActiveTask(null)}
                />
            )}
        </div>
    );
};

export default TodoForm;
