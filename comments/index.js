const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = []

app.get('/posts/:id/comments', function (req, res) {

    // const existId = commentsByPostId.findIndex((comment) => {
    //     return comment.commentsByPostId === req.params.id 
    // })
    // if(existId === -1) {
    //     res.send([]);
    // } else {
    //     res.status(201).send(commentsByPostId[existId]);
    // }
    res.send(commentsByPostId[req.params.id] || []);
}) 

app.post('/posts/:id/comments', async function (req, res) {
    const commentId = randomBytes.toString('hex');
    const { content } = req.body;

    // const existId = commentsByPostId.findIndex((comment) => {
    //     return comment.commentsByPostId === req.params.id 
    // })
    // console.log(existId)
    // if(existId === -1) {
    //     commentsByPostId.push({
    //         commentsByPostId: req.params.id,
    //         comment: [
    //             {id: commentId, content: content}
    //         ]
    //     }) 
    //     console.log(commentsByPostId)
    // } else {
    //     commentsByPostId[existId].comment.push({ id: commentId, content: content})
    // }
    // res.status(201).send(commentsByPostId[existId]);
    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content: content, status: pending });
    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending',
        }
    })

    res.status(201).send(comments);
    
}) 

app.post('/events', async (req, res) => {
    console.log('Received Event:', req.body.type);

    const { type, data } = req.body;

    if (type === 'CommentModerated') {
        const { postId, id, status } = data;
        const comments = commentsByPostId[postId];

        const comment = comments.find(comment => {
            return comment.id === id;
        })
        comment.status = status;

        await axios.post('http://localhost:4005', {
            type: 'CommentUpdated',
            data: {
                id,
                status,
                postId,
                content,
            }
        })
    }

    res.send({});
})

app.listen(4001, () => {
    console.log('Listening on 4001')
})