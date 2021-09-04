import React from 'react';

function SetUpName({onNext}) {
    return (
        <div>
            set up full name
            <br />
            <button onClick={onNext}>Next</button>
        </div>
    );
}

export default SetUpName;