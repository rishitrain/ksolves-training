import React, { useState, useRef, useEffect } from "react";

function TextEffect() {
  const [content, setContent] = useState("");
  const [text, setText] = useState("");
  const timeouts = useRef([]); 

  useEffect(() => {
    fetch("/statictext.txt")   
      .then((response) => response.text())
      .then((data) => setContent(data))
      .catch((error) => console.error("Error loading file:", error));
  }, []);

  const startGenerating = () => {
    setText("");  
    timeouts.current = [];  
    const characters = content.split("");  

    characters.forEach((item, i) => {
      const timeout = setTimeout(() => {
        setText((prevText) => prevText + item);  
      }, i * 100);  
      timeouts.current.push(timeout);  
    });
  };

  const reset = () => {
    setText("");  
    timeouts.current.forEach(clearTimeout);  
    timeouts.current = [];  
  };

  return (
    <>
      <button onClick={startGenerating}>Click me</button>
      <button onClick={reset}>Reset</button>

      <textarea placeholder="Text will appear here" value={text} readOnly />
    </>
  );
}

export default TextEffect;
