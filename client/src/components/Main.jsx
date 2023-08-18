import React, { useState } from "react";
import st from "../styles/Main.module.css";
import { Link } from "react-router-dom";

const FIELDS = {
    NAME: "name",
    ROOM: "room",
};

export const Main = () => {
    const { NAME, ROOM } = FIELDS;

    const [values, setValues] = useState({ [NAME]: "", [ROOM]: "" });

    const handleChange = ({ target: { value, name } }) => {
        setValues({ ...values, [name]: value });
    };

    const handleClick = (e) => {
        const isDisabled = Object.values(values).some((v) => !v);

        if (isDisabled) e.preventDefault();
    };

    return (
        <div className={st.wrap}>
            <div className={st.container}>
                <h1 className={st.heading}>Join</h1>

                <form className={st.form}>
                    <div className={st.group}>
                        <input
                            type="text"
                            name="name"
                            value={values[NAME]}
                            placeholder="Имя"
                            className={st.input}
                            onChange={handleChange}
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div className={st.group}>
                        <input
                            type="text"
                            name="room"
                            placeholder="Введите имя комнаты"
                            value={values[ROOM]}
                            className={st.input}
                            onChange={handleChange}
                            autoComplete="off"
                            required
                        />
                    </div>

                    <Link
                        className={st.group}
                        onClick={handleClick}
                        to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}
                    >
                        <button type="submit" className={st.button}>
                            Войти
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
};
