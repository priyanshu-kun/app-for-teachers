import React, { useState } from 'react';
import style from "./SetUpPhoneEmail.module.css"
import {FaRegEnvelope,FaMobileAlt} from "react-icons/fa"
import Phone from "./Phone/Phone"
import Email from "./Email/Email"

const phoneEmailMaps = {
    phone: Phone,
    email: Email
}

function SetUpPhoneEmail({ onNext }) {

    const [type, setType] = useState('phone')

    const Component = phoneEmailMaps[type];
    return (
        <>
            <div className={style.cardWrapper}>
                <div>
                    <div className={style.btnWrap}>
                        <button className={`${style.taBtn} ${type === 'phone' && style.active}`} onClick={() => setType('phone')}><FaMobileAlt style={{color: "#fff",fontSize: "22px"}} /></button>
                        <button className={`${style.taBtn} ${type === 'email' && style.active}`} onClick={() => setType('email')}><FaRegEnvelope style={{color: "#fff",fontSize: "22px"}} /></button>
                    </div>
                    <Component onNext={onNext} />
                </div>
            </div>
        </>
    );
}

export default SetUpPhoneEmail;