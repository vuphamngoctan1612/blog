import React from 'react';

export default ({ comments }) => {

    console.log(comments)
    const renderedComments = comments.map((comment, index) => {

        let content;

        if (comment.status === 'approved') {
            content = comment.content;
        }

        if (comment.status === 'pending') {
            content = 'This comment is awaiting moderation';
        }

        if (comment.status === 'rejected') {
            content = 'This comment has been rejected';
        }

        return <li key={index}>{content}</li>
    })

    return(
        <ul>{renderedComments}</ul>
    )
}
