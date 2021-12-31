import React, { useState } from "react";
import axios from "axios";

export default ({ postId }) => {

    const [content, setContent] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();

        await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
            content
        });
        setContent('');
    }

    return(
        <div>
            <form onSubmit={onSubmit}> 
                <div className="form-group" style={{marginBottom: '5px'}}>
                    <label style={{marginBottom: '5px'}}>New Comment</label>
                    <input value={content} onChange={e => setContent(e.target.value)} className="form-control" style={{marginBottom: '5px'}}/>
                </div>
                <button className="btn btn-primary" style={{marginBottom: '5px'}}>Submit</button>

            </form>
        </div>
    )
}