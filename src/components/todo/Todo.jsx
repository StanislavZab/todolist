import { useState } from 'react';
import EditTodo from '../editTodo/EditTodo';

/**
 * Todo component
 */
const Todo = ({todo, isEdit, handleDelete, toggleCompleted, handleEdit, setIdTodoEdit}) => {
    const [wrap, setWrap] = useState(true);

    if(isEdit){
        return(
            <EditTodo todo={todo} setEdit={setIdTodoEdit} handleEdit={handleEdit} />
        )
        
    }
    
    return(
        <div className={todo.completed ? 'todo todo__green' : 'todo'} onClick={() => setWrap(!wrap)}>
            <div className='todo__wraper' >
                <h3 className="todo__title">{todo.title}</h3> 
                <div className="todo__date">{todo.date !== '' ? `Дата завершения ${todo.date}` : 'Дата завершения не указана'}</div>
                <div className="todo__action">
                    <div className={todo.completed ? 'todo__completed' : ''} onClick={e => toggleCompleted(todo)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M24 44q-4.25 0-7.9-1.525-3.65-1.525-6.35-4.225-2.7-2.7-4.225-6.35Q4 28.25 4 24q0-4.2 1.525-7.85Q7.05 12.5 9.75 9.8q2.7-2.7 6.35-4.25Q19.75 4 24 4q3.75 0 7 1.2t5.85 3.3l-2.15 2.15q-2.2-1.75-4.9-2.7Q27.1 7 24 7q-7.25 0-12.125 4.875T7 24q0 7.25 4.875 12.125T24 41q7.25 0 12.125-4.875T41 24q0-1.5-.225-2.925-.225-1.425-.675-2.775l2.3-2.3q.8 1.85 1.2 3.85.4 2 .4 4.15 0 4.25-1.55 7.9-1.55 3.65-4.25 6.35-2.7 2.7-6.35 4.225Q28.2 44 24 44Zm-2.95-10.9-8.25-8.3 2.25-2.25 6 6 20.7-20.7 2.3 2.25Z"/></svg>
                    </div>
                    <div onClick={() => setIdTodoEdit(todo.id)} >
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M9 47.4q-1.2 0-2.1-.9-.9-.9-.9-2.1v-30q0-1.2.9-2.1.9-.9 2.1-.9h20.25l-3 3H9v30h30V27l3-3v20.4q0 1.2-.9 2.1-.9.9-2.1.9Zm15-18Zm9.1-17.6 2.15 2.1L21 28.1v4.3h4.25l14.3-14.3 2.1 2.1L26.5 35.4H18v-8.5Zm8.55 8.4-8.55-8.4 5-5q.85-.85 2.125-.85t2.125.9l4.2 4.25q.85.9.85 2.125t-.9 2.075Z"/></svg>
                    </div>
                    <div className='todo__delete' onClick={e => handleDelete(todo)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M13.05 42q-1.25 0-2.125-.875T10.05 39V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-16.6 24.2h3V14.75h-3Zm8.3 0h3V14.75h-3Zm-13.6-24.2V39Z"/></svg>
                    </div>
                    <div onClick={() => setWrap(!wrap)} className='todo__arrow' title={wrap ? 'Раскрыть' : 'Свернуть'}>
                        {
                            wrap ? 
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m12 15.725-6.3-6.3 1.775-1.75L12 12.2l4.525-4.525 1.775 1.75Z"/></svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7.475 15.725 5.7 13.975l6.3-6.3 6.3 6.3-1.775 1.75L12 11.2Z"/></svg>
                        }
                    </div>
                </div>
            </div>
            {
                !wrap &&
                <div className='todo__text-todo'>
                    <div>
                        <h4>Описание задачи:</h4>
                        <p>{todo.text}</p>
                    </div>
                    <div>
                        <h4>Прикреплённый файл:</h4>
                        {
                            todo.file !== '' && <a href={todo.href} download="" target="_blank">{todo.file}</a>
                        }
                    </div>
                </div>
            }   
        </div>
    )
}

export default Todo;