import React, { useState } from 'react';

function Document() {
    const [inputValue, setValue] = useState("");
    const [msg, setMsg] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setMsg(prevMsg =>  inputValue + prevMsg);  
        setValue("");  
    };
 
    return (
        <div>
            <form>
                <textarea 
                    value={inputValue}
                    placeholder="Type something..."
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e)=>{
                        if(e.key=="Enter"){
                            handleSubmit(e);
                        }
                    }}
                />
            </form>

            <textarea 
                value={msg}
                placeholder="Messages will appear here..."
                readOnly 
            />
        </div>
    );
}

export default Document;
