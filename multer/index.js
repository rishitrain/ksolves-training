const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
 

 const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  
  }
});

const upload = multer({ storage: storage });

 app.use(express.static('public'));

//  app.post('/upload', upload.array('file',2), (req, res) => {
//   if (!req.files || req.files.length==0) {
//     return res.status(400).send('No file uploaded');
//   }
//   const filenames = req.files.map(file => file.filename);
//   res.send({ filenames });
// });

app.post('/upload', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'document', maxCount: 1 }
]), (req, res) => {
   if (!req.files || !req.files.image || !req.files.document) {
    return res.status(400).send('No files uploaded for one or more fields');
  }

   const imageFilename = req.files.image[0].filename;
  const documentFilename = req.files.document[0].filename;

  res.send({
    image: imageFilename,
    document: documentFilename
  });
});


 app.listen(3000, () => {
  console.log('Server running on port 3000');
});
