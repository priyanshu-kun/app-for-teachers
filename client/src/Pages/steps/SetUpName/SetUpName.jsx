import React,{useState} from 'react';
import Card from "../../../components/shared/Card/Card"
import Button from "../../../components/shared/Button/Button"
import TextInput from "../../../components/shared/TextInput/TextInput"
import {useDispatch,useSelector} from "react-redux"
import { setName } from "../../../store/activate.Slice"
import style from "./StepUpName.module.css"
import { FaLongArrowAltRight } from "react-icons/fa";


function SetUpName({onNext}) {

    const {name} = useSelector(state => state.activate)
    const dispatch = useDispatch()
    const [fullName,setFullName] = useState(name)

    const iconStyle = {
        fontSize: "20px",
    }

    const customBtnWidth = {
        width: "150px"
    }

    function nextStep() {
        if(!fullName) {
            return alert("input field cannot be empty")
        }
        dispatch(setName(fullName))
        onNext()
    }

    return (
        <>
            <div style={{marginTop: "7rem"}}>
                <Card title="What is your full name?" emoji="😎">
                    <TextInput value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder={"jhon doe"} />
                    <p className={style.bottomParagraph}>People use real names at classroom :D</p>
                    <div>
                        <Button onClick={nextStep} width={customBtnWidth} text="Next" icon={<FaLongArrowAltRight style={iconStyle} />}></Button>
                    </div>
                    
                </Card>
            </div>
        </>
    );
}

export default SetUpName;