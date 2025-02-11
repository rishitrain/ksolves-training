import React, { useEffect, useState } from 'react';

function Traffic() {
    const [color, setColor] = useState('red');

    useEffect(() => {
        const interval = setInterval(() => {
            if (color === 'red') {
                setColor('yellow');
            } else if (color === 'yellow') {
                setColor('green');
            } else {
                setColor('red');
            }
        },  2000);

        return () => clearInterval(interval);  
    }, [color]);

    return (
        <><div style={{alignItems:'center' ,justifyContent:'center'}}> 
            <div style={{ height: "100px", width: "100px", backgroundColor: color === 'red' ? 'red' : 'grey', borderRadius: '50%' }}>
            </div>
            <div style={{ height: "100px", width: "100px", backgroundColor: color === 'yellow' ? 'yellow' : 'grey', borderRadius: '50%' }}>
            </div>
            <div style={{ height: "100px", width: "100px", backgroundColor: color === 'green' ? 'green' : 'grey', borderRadius: '50%' }}>
            </div>
        </div>
        </>
    );
}

export default Traffic;
