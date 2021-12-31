import React, {useState} from "react";
import axios from "axios";

export default () => {
    
    const [title, setTitle] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();

        await axios.post('http://localhost:4000/posts', {
            title
        });

        setTitle('');
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group" style={{marginBottom: '5px'}}>
                    <label style={{marginBottom: '5px'}}>Title</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} className="form-control" style={{marginBottom: '5px'}}/>
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}