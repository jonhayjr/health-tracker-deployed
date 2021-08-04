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

    const noteElements = notes ?
    notes.map((note, index) => 
        ( 
            <div className="card" key={index}>
                <div className="card-header">
                    <p>{Moment(note.date).format('MMMM Do YYYY')}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Diet: {note.diet}</li>
                    <li className="list-group-item">Mood: {note.mood}</li>
                    <li className="list-group-item">Symptoms: {note.symptoms}</li>
                    <li className="list-group-item">Exercise: {note.exercise}</li>
                </ul>
            </div>
        )
    )
    : '';

    return (
        <div className="note-container">
          {
             noteElements
          }
        </div>
    )
}

export default NoteDetail
