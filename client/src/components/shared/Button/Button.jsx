import React from 'react';
import style from "./Button.module.css"

function Button({text,icon,onClick,width}) {
    
    return (
        <>
            <button style={width} onClick={onClick} className={style.btn}>
                <span>{text}</span>
                {icon}
            </button>
        </>
    );
}

export default Button;