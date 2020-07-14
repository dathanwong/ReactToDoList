import React, { useState, useEffect } from 'react';

const ToDoList = (props) => {

    var store = require('store');
    const [newTask, setNewTask] = useState("");
    const [tasks, setTasks] = useState([]);

    useEffect(() =>{
        if(store.get("tasks")!=null) setTasks(store.get("tasks"));
    }, [])

    const addTask = (e) =>{
        e.preventDefault();
        const temp = [
            ...tasks,
            {name: newTask, completed: false}
        ]
        setTasks(temp);
        store.set("tasks", temp);
        setNewTask("");
    }

    function toggleState(index){
        const temp = [...tasks.slice(0, index), {name: tasks[index].name, completed: !tasks[index].completed}, ...tasks.slice(index+1)];
        store.set("tasks", temp);
        setTasks([...temp]);
        console.log(tasks);
    }

    function deleteTask(index){
        const temp = tasks.filter((_, i) => index != i);
        setTasks(temp);
        store.set("tasks", temp);
    }

    return ( 
        <div className="container">
            <form onSubmit={addTask}>      
                <div className="row my-2 justify-content-center">
                    <input className="col-6" onChange={e => setNewTask(e.target.value)} placeholder="Add task here" type="text" value={newTask}/>
                    <div className="col-1">
                        <button className="btn btn-primary" type="submit">Add</button>
                    </div>
                </div>
            </form>
            { tasks.map((task, index) => 
                <div key={index} className="row my-2 justify-content-center">
                    <div className="col-3">
                        {task.completed ? <del>{task.name}</del> : <div>{task.name}</div> }
                    </div>
                    <div className="col-1">
                        <input onChange={e => toggleState(index)} type="checkbox" className="form-check-input"/>
                    </div>
                    <div className="col-1">
                        <button onClick={e => deleteTask(index)} className="btn btn-danger">Delete</button>
                    </div>
                </div>
            )
            }
        </div>
     );
}
 
export default ToDoList;