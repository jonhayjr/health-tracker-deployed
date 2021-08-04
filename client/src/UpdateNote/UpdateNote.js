import {useState, useEffect} from 'react';
import '../Form/Form.css';
import axios from 'axios';
import Moment from 'moment';

//Import config
import Config from '../config';

const UpdateNote = (props) => {

    const [date, setDate] = useState('');
    const [diet, setDiet] = useState('');
    const [mood, setMood] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [exercise, setExercise] = useState('');

    useEffect(() => {
        const id = props.match.params.id;
        axios.get(`${Config.apiBaseUrl}/notes/${id}`)
        .then(res => { 
            setDate(res.data.date)
            setDiet(res.data.diet)
            setMood(res.data.mood)
            setSymptoms(res.data.symptoms)
            setExercise(res.data.exercise)
        })
    }, [])

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
         if (name === 'date') {
             setDate(value);
         } else if (name === 'diet') {
             setDiet(value);
         } else if (name === 'mood') {
             setMood(value);
         } else if (name === 'symptoms') {
             setSymptoms(value);
         } else if (name === 'exercise') {
             setExercise(value);
         }
    }

    const handleSubmit = (e) => {
        //Prevent Default Form Behavior
        e.preventDefault();

        const id = props.match.params.id;

        //Create object with form values
        const note = {
            date,
            diet,
            mood,
            symptoms,
            exercise
        }
        
        //Post Note using API
        axios.put(`${Config.apiBaseUrl}/notes/${id}`, note)
    }

    return (
        <div className="form">
            <h2>Update Note</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input type="text" className="form-control" id="date" name="date" value={date} onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="diet" className="form-label">Diet</label>
                    <textarea className="form-control" id="diet" name="diet" rows="3" onChange={handleChange} value={diet} required></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="mood" className="form-label">Mood</label>
                    <textarea className="form-control" id="mood" name="mood" rows="3" onChange={handleChange} value={mood} required></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="symptoms" className="form-label">Symptoms</label>
                    <textarea className="form-control" id="symptoms" name="symptoms" rows="3" onChange={handleChange} value={symptoms}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="exercise" className="form-label">Exercise</label>
                    <textarea className="form-control" id="exercise" name="exercise" rows="3" onChange={handleChange} value={exercise}></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-75">Submit</button>
            </form>
            <a className="btn w-50 mt-2 btn-secondary mt-5" href={`/`}>Go Home</a>
        </div>
    )
}

export default UpdateNote
