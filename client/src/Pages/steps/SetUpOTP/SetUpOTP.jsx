import React, { useState } from 'react';
import Card from "../../../components/shared/Card/Card"
import TextInput from "../../../components/shared/TextInput/TextInput"
import Button from "../../../components/shared/Button/Button"
import { FaLongArrowAltRight } from "react-icons/fa";
import style from "./SetUpOTP.module.css"
import {verifyOtp} from "../../../http/index"
import {useSelector,useDispatch} from "react-redux"
import {setAuth} from "../../../store/auth.Slice"


function SetUpOTP() {

    const [OTP, setOTP] = useState("")
    const {phone,hash} = useSelector((state) => state.auth.otp)
    const dispatch = useDispatch()

    const iconStyle = {
        fontSize: "20px",
    }

    const customBtnWidth = {
        width: "150px"
    }

    async function submit() {
        try {
            if(!OTP) {
                return alert("input field cannot be empty")
            }
            const {data} = await verifyOtp({otp: OTP,phone,hash})
            console.log(data)
            dispatch(setAuth(data))
        }
        catch(err){
            console.log(err.message)
        }
    }

    return (
        <>
            <div style={{marginTop: "7rem"}}>
                <Card title="Enter the code we just texted you" emoji="🔐">
                    <TextInput value={OTP} onChange={(e) => setOTP(e.target.value)} placeholder={"8---"} />
                    <div>
                        <Button onClick={submit} width={customBtnWidth} text="Next" icon={<FaLongArrowAltRight style={iconStyle} />}></Button>
                    </div>
                    <p className={style.bottomParagraph}>By entering your number, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!</p>
                </Card>
            </div>
        </>
    );
}

export default SetUpOTP;