import React, { useEffect, useState } from 'react'

function Counter() {

    const [num, setnum] = useState(5000)

    const [run, setrun] = useState(false)

useEffect(()=>{
    let interval
    if(run){
    interval = setInterval(()=>{
        setnum(prev=>prev-100);
    },100)
}

    return ()=>{
        clearInterval(interval);
    }
})

const start = ()=>{
    setrun(true);
}
const increse = ()=>{
        setnum(num+1);
    } 


const decrse = ()=>{
    setnum(num-1);
}

const reset =()=>{
    setnum(0)
    setrun(false)
}

const stop =()=>{
     setrun(false)
}
 

  return (
   <>
   <div>
        {num}
   </div>
    <button onClick={increse}>
        increase
    </button>


    <button onClick={decrse}>
         dec
    </button>

    <button onClick={reset}>
         reset
    </button>



    <button onClick={start}>
          start
    </button>

    <button onClick={stop}>
          stop
    </button>
   </>
  )
}

export default Counter