import React,{useState} from 'react';
import StepName  from "../steps/SetUpName/SetUpName"
import StepAvatar from "../steps/SetUpAvatar/SetUpAvatar"

const steps = {
    1: StepName,
    2: StepAvatar,
}

function Activate(props) {
    const [step,setStep] = useState(1);
    const Step = steps[step]

    function onNext() {
        setStep(step+1)
    }

    return (
        <div>
            <Step onNext={onNext}></Step>
        </div>
    );
}

export default Activate;