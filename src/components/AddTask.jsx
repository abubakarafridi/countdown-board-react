import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Adjust the path to where your firebase configuration is located
import { collection, addDoc, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import './AddTask.css';

const AddTask = () => {
    const [task, setTask] = useState('');
    const [status, setStatus] = useState('To Do');
    const [tasks, setTasks] = useState({ todo: [], inProgress: [], completed: [] });

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
            const todo = [];
            const inProgress = [];
            const completed = [];
            
            snapshot.forEach((doc) => {
                const data = doc.data();
                if (data.type === 'To Do') todo.push({ id: doc.id, ...data });
                else if (data.type === 'In Progress') inProgress.push({ id: doc.id, ...data });
                else if (data.type === 'Completed') completed.push({ id: doc.id, ...data });
            });

            setTasks({ todo, inProgress, completed });
        });

        return () => unsubscribe();
    }, []);

    const handleAddTask = async () => {
        if (task.trim() === '') return;

        try {
            await addDoc(collection(db, 'tasks'), {
                content: task,
                type: status,
            });

            setTask(''); // Clear the input after adding the task
        } catch (error) {
            console.error('Error adding task: ', error);
        }
    };

    const handleChangeStatus = async (taskId, currentType) => {
        const newType = currentType === 'To Do' ? 'In Progress' :
                         currentType === 'In Progress' ? 'Completed' : 'To Do';

        try {
            await updateDoc(doc(db, 'tasks', taskId), { type: newType });
        } catch (error) {
            console.error('Error updating task status: ', error);
        }
    };

    return (
        <div>
            <div className="TaskAddition">
                <input
                    type="text"
                    placeholder="Enter your task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="To Do">To do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <button onClick={handleAddTask}>
                    Add
                </button>
            </div>

            <div className="TaskSections">
                <div className="TaskSection">
                    <h2>To Do</h2>
                    <ul>
                        {tasks.todo.map((task) => (
                            <li key={task.id}>
                                {task.content}
                                <button onClick={() => handleChangeStatus(task.id, task.type)}>
                                    Move to {task.type === 'To Do' ? 'In Progress' : task.type === 'In Progress' ? 'Completed' : 'To Do'}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="TaskSection">
                    <h2>In Progress</h2>
                    <ul>
                        {tasks.inProgress.map((task) => (
                            <li key={task.id}>
                                {task.content}
                                <button onClick={() => handleChangeStatus(task.id, task.type)}>
                                    Move to {task.type === 'To Do' ? 'In Progress' : task.type === 'In Progress' ? 'Completed' : 'To Do'}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="TaskSection">
                    <h2>Completed</h2>
                    <ul>
                        {tasks.completed.map((task) => (
                            <li key={task.id}>
                                {task.content}
                                <button onClick={() => handleChangeStatus(task.id, task.type)}>
                                    Move to {task.type === 'To Do' ? 'In Progress' : task.type === 'In Progress' ? 'Completed' : 'To Do'}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AddTask;
