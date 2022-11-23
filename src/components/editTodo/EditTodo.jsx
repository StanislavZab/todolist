import { useState, useEffect } from "react";
import InputFile from "../buttons/inputFile/InputFile";
import './editTodo.css';

/**
 * EditTodo component
 * компонент позволяет отредактировать задачу
 * принимает задачу, функцию которая нужна для отображения этого компонента и функцию которая меняе параметры задачи.
 */
const EditTodo = ({todo, setEdit, handleEdit}) => {
    const [selectFile, setSelectFile] = useState(null);
    const [file, setFile] = useState(todo.file);
    const [title, setTitle] = useState(todo.title);
    const [text, setText] = useState(todo.text);
    const [date, setDate] = useState(todo.date);

    /**
     * handler для удаления файла, но только локально
     */
    const handleDeleteFile = () => {
        setFile('');
    }

    useEffect(() => {
        if(selectFile){
            setFile(selectFile.name);
        }
    }, [selectFile])

    return(
        <div className='todo'>
            <div className="todo__wrap-edit">
                <div className="todo__div">
                    <label>Заголовок:</label>
                    <input type='taxt' value={title} onChange={e => setTitle(e.target.value)} name='edit'/>
                </div>
                <div className="todo__div">
                    <label>Описание задачи:</label>
                    <textarea  value={text} onChange={e => setText(e.target.value)} name='edit'></textarea>
                </div>
                <div className="todo__div">
                    <label>Дата завершения:</label>
                    <input type='date' value={date} onChange={e => setDate(e.target.value)} name='edit'/>
                </div>
                <div className="todo__div">
                    <div><label>Прикрепленный файл:</label></div>
                    <div>{file}</div>
                    <div>
                        {file !== '' ?
                            <button onClick={() => {handleDeleteFile()}}>Удалить</button>:
                            <InputFile file={selectFile?.name} setFile={setSelectFile} />
                        }
                    </div>  
                </div>
                <div className="todo__div">
                    <button onClick={() => setEdit(null)} style={{width: '100px'}}>Закрыть</button>
                    <button  style={{width: '100px'}} onClick={() => {handleEdit(todo,{title, text, date, selectFile, file}); setEdit(null)}}>Сохранить</button>
                </div>
            </div>
        </div>
    )
}

export default EditTodo;