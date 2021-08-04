import {useState, useEffect} from 'react';

//Import modules
import axios from 'axios';
import Moment from 'moment';

//import CSS
import './NoteDetail.css';

//Import config
import Config from '../config';

const NoteDetail = () => {
    const [notes, setNotes] = useState('');

    useEffect(() => {
        axios.get(`${Config.apiBaseUrl}/notes`)
        .then(res => 
            setNotes(res.data)
        )
    }, [notes])

    const handleDelete = (e) => {
        //Prevent default behavior
        e.preventDefault();

        //Get id
        const id = e.target.getAttribute('data-index');

        //Send delete request to api
        axios.delete(`${Config.apiBaseUrl}/notes/${id}`);
    }

    const noteElements = notes ?
    notes.map((note, index) => 
        ( 
            <div className="card" key={note.id}>
                <div className="card-header">
                    <p>{Moment(note.date).format('MMMM Do YYYY')}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item" value={note.diet}></li>
                    <li className="list-group-item">Mood: {note.mood}</li>
                    <li className="list-group-item">Symptoms: {note.symptoms}</li>
                    <li className="list-group-item">Exercise: {note.exercise}</li>
                </ul>

                <button data-index={note.id} type="submit" className="btn btn-primary w-50 mt-2" onClick={handleDelete}>Delete</button>
            </div>
        )
    )
    : '';

    return (
        <div className="note-container mb-5">
          {
             noteElements
          }
        </div>
    )
}

export default NoteDetail
