import React, { useState } from 'react';
import {  useSelector, useDispatch  } from 'react-redux';
import type {  RootState  } from '../../../store/store'; 
import {  toggleTodo, removeTodo  } from '../../../store/TodoData';
import PopUpWindow from '../../PopUpWindow/PopUpWindow';

const TodoForm: React.FC = () => { 
    const todos = useSelector((state: RootState) => state.todo.todos);
    const dispatch = useDispatch();
    const [activeTask, setActiveTask] = useState<{ id: string; text: string } | null>(null);

    const openPopUpFullTask = (task: { id: string; text: string }) => {
        setActiveTask(task);
    };

    return (
        <div className="todo-main flex flex-col justify-start items-center w-1/1 h-1/1 gap-3 rounded-xl">
            { todos.map((item) => (
                <div
                    key={ item.id }
                    className="todo-main flex flex-row justify-start items-center w-85/100 h-5 gap-3 p-5 bg-gray-700 rounded-md hover:shadow-md cursor-pointer"
                    onClick={() => openPopUpFullTask(item)}
                >
                    <input
                        className="todo-text-checkbox size-4 cursor-pointer"
                        type="checkbox"
                        placeholder="checkbox"
                        checked={ item.completed }
                        onClick={ (e) => e.stopPropagation() }
                        onChange={ () => dispatch(toggleTodo(item.id)) }
                    />
                    <ul className="todo-box-value w-80/100 text-left">
                        <li className={  item.completed ? "todo-item-value w-1/1 line-through" : "todo-item-value w-1/1"  }>
                            { item.text.length > 30
                                ? item.text.slice(0, 30) + "..."
                                : item.text }
                        </li>
                    </ul>
                    <button
                        type="button"
                        className="button-delete-todo size-6 rounded-md font-bold bg-rose-900/100 cursor-pointer hover:shadow-md shadow-rose-900/70 hover:scale-115 ease-in-out transition duration-150"
                        onClick={ () => dispatch(removeTodo(item.id)) }
                    >
                        -
                    </button>
                </div>
            ))}

            {activeTask && (
                <PopUpWindow
                    visible={true}
                    fuulText={activeTask.text}
                    onClose={() => setActiveTask(null)}
                />
            )}
        </div>
    );
};

export default TodoForm;
