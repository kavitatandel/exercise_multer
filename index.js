const express = require('express');
const path = require('path');
const upload = require('./file-upload-config.js');

const app = express();
const publicFolder = path.join(__dirname, 'public');

app.use(express.static(publicFolder));

app.get('/', (req, res) => {
    res.send('hello world')
});

app.get('/upload-profile-pic', (req, res) => {
    res.sendFile('index.html', { root: publicFolder })
});

app.post('/upload-profile-pic', upload.single('profile_pic'), (req, res, err) => {
    const { file, fileValidationError } = req;
    if (fileValidationError) {
        return res.status(500).send(fileValidationError);
    }

    if (!file) {
        return res.status(400).send('Please upload a file');
    }

    res.send(`<div>You have uploaded this image: <br/> <img src="http://localhost:3003/uploads/${req.file.filename}" width="500" /></div>`);
})

app.listen(3003, () => console.log('Server running on port 3003'));