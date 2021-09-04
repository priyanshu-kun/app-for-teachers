import React from 'react';
import style from "./Home.module.css"
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom"
import Card from "../../components/shared/Card/Card"
import Button from "../../components/shared/Button/Button";

function Home() {
    const iconStyle = {
        fontSize: "20px",
    }

    const history = useHistory();

    function redirectToRegisterPage() {
        history.push("/authenticate")
    }

    return (
        <>
            <div className={style.cardWrapper}>
            <Card title="Welcome to our App!" emoji="👋">
                <p className={style.text}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo, nihil, debitis beatae quos possimus asperiores earum?Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                <div>
                    <Button onClick={redirectToRegisterPage} text="Let's move forward" icon={<FaLongArrowAltRight style={iconStyle} />}></Button>
                </div>
            </Card>
            </div>


        </>
    );
}

export default Home;