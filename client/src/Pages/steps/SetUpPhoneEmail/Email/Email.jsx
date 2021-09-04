import React, { useState } from 'react';
import Card from "../../../../components/shared/Card/Card"
import Button from "../../../../components/shared/Button/Button"
import { FaLongArrowAltRight } from "react-icons/fa";
import TextInput from "../../../../components/shared/TextInput/TextInput"
import style from "./Email.module.css"

function Email({onNext}) {

    const [email, setEmail] = useState("")

    const iconStyle = {
        fontSize: "20px",
    }

    const customBtnWidth = {
        width: "150px"
    }

    return (
        <>
            <Card title="Enter a email address" emoji="✉️">
                <TextInput value={email} onChange={(e) => setEmail(e.target.value)} placeholder={"example@gmail.com"} />
                <div>
                    <Button width={customBtnWidth} onClick={onNext} text="Next" icon={<FaLongArrowAltRight style={iconStyle} />}></Button>
                </div>
                <p className={style.bottomParagraph}>By entering your number, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!</p>

            </Card>
        </>
    );
}

export default Email;