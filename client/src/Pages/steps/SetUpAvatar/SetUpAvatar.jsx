import React,{useState} from 'react';
import Card from "../../../components/shared/Card/Card"
import Button from "../../../components/shared/Button/Button"
import {useDispatch,useSelector} from "react-redux"
import { setAvatar } from "../../../store/activate.Slice"
import { setAuth } from "../../../store/auth.Slice"
import style from "./StepUpAvatar.module.css"
import { FaLongArrowAltRight } from "react-icons/fa";
import {activate} from "../../../http/index"

function SetUpAvatar({onNext}) {

    const {name,avatar} = useSelector(state => state.activate)
    const dispatch = useDispatch()
    const [image,setImage] = useState('/logo192.png')

    async function submit() {
        try {
            const {data} = await activate({name,avatar})
            console.log(data)
            if(data.auth) {
                dispatch(setAuth(data))
            }
        }
        catch(e) {
            console.log(e)
        }
    }


    const iconStyle = {
        fontSize: "20px",
    }

    const customBtnWidth = {
        width: "150px"
    }

    return (
       <>
       <div style={{marginTop: "7rem"}}>
                <Card title={`Okey, ${name}`} emoji="🦉">
                    <p className={style.subHeading}>How's this photo?</p>
                    <div className={style.avatarRapper}>
                        <img src={image} alt="avatar" />
                    </div>
                    <div>
                        <input type="file" id="avatarInput" onChange={(e) => {
                            const file = e.target.files[0]
                            const reader = new FileReader()
                            reader.readAsDataURL(file)
                            reader.onloadend = function () {
                                setImage(reader.result)
                                dispatch(setAvatar(reader.result))
                            }
                        }} className={style.avatarInput} />
                        <label htmlFor="avatarInput">Choose a different photo.</label>
                    </div>
                    <div>
                        <Button onClick={submit} width={customBtnWidth} text="Next" icon={<FaLongArrowAltRight style={iconStyle} />}></Button>
                    </div>
                    
                </Card>
            </div>
       </>
    );
}

export default SetUpAvatar;