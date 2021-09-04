import React,{useState} from 'react';
import SetUpPhoneEmail from "../steps/SetUpPhoneEmail/SetUpPhoneEmail"
import SetUpOTP from "../steps/SetUpOTP/SetUpOTP"

// hashmap for randring different components
const steps = {
    1: SetUpPhoneEmail,
    2: SetUpOTP
}


function Authenticate() {
    const [step,setStap] = useState(1)

    function onNext() {
        setStap(step + 1)
    }

    const Step = steps[step]; 
    return (
        <>
            <Step onNext={onNext} />
        </>
    );
}

export default Authenticate;