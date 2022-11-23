import './inputFile.css';

/**
 * InputFile component
 * Компонент принимает имя выбранного файла и функцию принимаемую объукт выбранного файла из input
 */
const InputFile = ({file, setFile}) => {

    return(
        <div className="field">
            <label className="field__file-wrapper">
                <input type='file' name='file' onChange={e => setFile(e.target.files[0])} accept=".jpg, .jpeg, .png, .txt, .docx"></input>
                <div className="field__file-fake">{!file ? 'Прикрепить файл' : file}</div>
                <div className="field__file-button">Выбрать</div>
            </label>
        </div>
    )
}

export default InputFile;