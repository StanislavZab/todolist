import { useState } from "react";
import InputFile from "../buttons/inputFile/InputFile";
import './addTodo.css';

/**
 * AddTodo component
 * Компонент позволяет создать новую задачу.
 * Принимает пропсом функцию в которую передает созданную задачу
 */
const AddTodo = ({onSubmit}) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [date, setDate] = useState('');

    /**
     * handler для формы
     * @param {*} e 
     */
    const handleSubmitAndReset = (e) => {
        e.preventDefault();
        e.target[2].value = "";
        if(title !== ''){
            onSubmit({title, text, date, file});
            setFile('');
            setTitle('');
            setText('');
            setDate('');
        }
    }

    return(
        <div className="add-todo">
            <form action="/#" onSubmit={handleSubmitAndReset}>
                <div className="add-todo__top-row">
                    <input type='text' name='title' placeholder='Заголовок' value={title} onChange={e => setTitle(e.target.value)}></input>
                    <input type='date' name='date' value={date} onChange={e => setDate(e.target.value)}></input>
                    <InputFile file={file?.name} setFile={setFile} />
                </div>
                <div className="add-todo__bottom-row">
                    <textarea  placeholder="Описание задачи" value={text} onChange={e => setText(e.target.value)}></textarea>
                    <div>
                        <input type='submit' name='button' value='Добавить задачу'></input>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddTodo;