const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');


var path = require('path');
var dir = path.join(__dirname, 'public');
app.use(express.static(dir));


app.use(cors());
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname)
    }

})


app.post('/img-upload', async (req, res) => {

    const upload = await multer({ storage: storage }).array('file', 4);

    upload(req, res, (err) => {
        console.log("files", req.files)
        console.log("upload", JSON.stringify(req.body))
        if (!req.files) {
            res.send('Please Select a file')
        } else if (err instanceof multer.MulterError) {
            res.send(err)
        } else if (err) {
            res.send(err)
        } else {
            res.send({ status: true, data: req.files })
        }
    })



})


app.listen(5000, () => {
    console.log('server started!')
})