import { useEffect, useState } from 'react';
import './App.css';
import AddTodo from './components/addTodo/AddTodo';
import Header from './components/Header';
import Todo from './components/todo/Todo';
import dayjs from 'dayjs';
import {db, storage} from './firebase_config';
import { collection, addDoc, query, onSnapshot, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

/**
 * App component
 * компонент в котором отрисовываются все компоненты.
 * 
 */
function App() {
    const [todos, setTodos] = useState([]);
    const [idTodoEdit, setIdTodoEdit] = useState(null);
    
    /**
     * Hook useEffect
     * отрабатывает только при монтировании компонента
     * используется для загрузки из BackEnd-а списка задач
     * также подписывается на получение изменненых данных
     */
    useEffect(() => {
        const q = query(collection(db, 'todolist'));
        const unsubscribe = onSnapshot(q, snapshot => {
            const todosArray = [];
            snapshot.forEach(doc => {
                const completed = dayjs(doc.data().date).isBefore(dayjs());
                todosArray.push({...doc.data(), id: doc.id, completed: completed ? completed : doc.data().completed});
            })
            setTodos(todosArray);
        })
        return () => unsubscribe();
    }, [])

    /**
     * handleEdit
     * handler который изменяет свойства задачи
     * вызывается из компонента EditTodo
     * @param {*} todo - задача
     * @param {*} param1 - объект со свойствами задачи
     */
    const handleEdit = async(todo, {title, text, date, selectFile, file}) => {
        if(todo.file !== file){
            if(todo.file !== ''){
                let count = 0;
                for(let todoItem of todos){
                    if(todoItem.file === todo.file){
                        count ++;
                    }
                }
                if(count === 1){
                    const desertRef = ref(storage, todo.file);
                    await deleteObject(desertRef);
                }
            }
            if(file !== ''){
                const storageRef = ref(storage, selectFile.name);
                await uploadBytes(storageRef, selectFile);
                todo.href = await getDownloadURL(storageRef);
            }
        }
        await updateDoc(doc(db,'todolist', todo.id), {title, text, date, file: file, href: todo.href || ''});
    }

    /**
     * toggleCompleted
     * Функция меняет состояние задачи
     * @param {*} todo - задача
     */
    const toggleCompleted = async(todo) => {
        await updateDoc(doc(db,'todolist', todo.id), {completed: !todo.completed});
    }

    /**
     * handleDelete
     * Функция удаляет задачу 
     * @param {*} todo - id задачи
     */
    const handleDelete = async(todo) => {
        if(todo.file !== ''){
            let count = 0;
            for(let todoItem of todos){
                if(todoItem.file === todo.file){
                    count ++;
                }
            }
            if(count === 1){
                const desertRef = ref(storage, todo.file);
                await deleteObject(desertRef);
            }
        }
        
        await deleteDoc(doc(db,'todolist',todo.id));
    }

    /**
     * handleSubmit
     */
    const handleSubmit = async ({title, text, date, file}) => {
        let href = '';
        if(file){
            const storageRef = ref(storage, file.name);
            await uploadBytes(storageRef, file);

            href = await getDownloadURL(storageRef);
        }
        
        await addDoc(collection(db, 'todolist'), {
            title: title,
            text: text,
            date: date,
            file: file?.name || '',
            href: href,
            completed: false,
        })
    }

    return (
        <div className="App">
            <Header />
            <AddTodo onSubmit={handleSubmit}/>
            <div className="todolist">
                {todos && todos.map((todo) => 
                    <Todo 
                        key={todo.id} 
                        todo={todo}
                        isEdit={idTodoEdit === todo.id}
                        handleDelete={handleDelete}
                        toggleCompleted={toggleCompleted}
                        handleEdit={handleEdit}
                        setIdTodoEdit={setIdTodoEdit}
                    />
                )}
            </div>
        </div>
    );
}

export default App;
