 import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AppBar from '@mui/material/AppBar';
import { Typography } from '@mui/material';


const QuillEditor = () => {
  const [content, setContent] = useState('');

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      
    ]
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'color', 'background',
    'font',
    'align',
    'link', 'image', 'video'
  ];

  return (
    <>

         <AppBar>
          <Typography variant="h5" color="inherit" component="div">
            Rich Text Editor
          </Typography>
      </AppBar>
    <div className="h-screen p-4 mt-6">
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
        className="h-[400px] w-[500px] mb-12"
      /> 
      
      <div className='mt-2 p-5 ' dangerouslySetInnerHTML={{__html:content}}>

    </div>

 
</div>
</>

  );
};

export default QuillEditor;