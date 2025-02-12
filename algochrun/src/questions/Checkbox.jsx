import React, { useState } from 'react';

function Checkbox() {
    const checklist = {
        0: false,
        1: false,
        2: false,
        3: false
    };

    const [checkedState, setCheckedState] = useState(checklist);

    const list = [
        { id: 0, name: "apple" },
        { id: 1, name: "mango" },
        { id: 2, name: "banana" },
        { id: 3, name: "pineapple" }
    ];

     const handleCheckboxChange = (id) => {
        setCheckedState((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

     const handleAll = (e) => {
        const newState = e.target.checked;
        const updatedState = Object.keys(checkedState).reduce((acc, key) => {
            acc[key] = newState;
            return acc;
        }, {});
        setCheckedState(updatedState);
    };

     const isAllChecked = Object.values(checkedState).every(Boolean);

    return (
        <div>
             <input
                type="checkbox"
                checked={isAllChecked}
                onChange={handleAll}
            />
            <ul>
                {list.map((item) => (
                    <li key={item.id}>
                        <label>
                            <input
                                type="checkbox"
                                id={item.id}
                                checked={checkedState[item.id]}
                                onChange={() => handleCheckboxChange(item.id)}
                            />
                            {item.name}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Checkbox;
