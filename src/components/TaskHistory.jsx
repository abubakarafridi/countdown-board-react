import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Adjust the path as needed
import { collection, onSnapshot } from 'firebase/firestore';
import './TaskHistory.css';

const TaskHistory = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
            const taskList = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                taskList.push({ id: doc.id, ...data });
            });

            setTasks(taskList);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="TaskHistory">
            <h1>Task History</h1>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <strong>{task.type}:</strong> {task.content}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskHistory;
