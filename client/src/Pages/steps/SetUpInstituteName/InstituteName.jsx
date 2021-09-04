import React from 'react';

function InstituteName({onNext}) {
    return (
        <div>
            Insitute name
            <br />
            <button onClick={onNext}>Next</button>
        </div>
    );
}

export default InstituteName;