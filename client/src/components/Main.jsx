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

    function handleChange({ target: { value, name } }) {
        setValues({ ...value, [name]: value });
    }

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
                            placeholder="Введите никнейм"
                            className={st.input}
                            onChange={handleChange}
                            autoComplete="off"
                            required
                        ></input>
                    </div>
                    <div className={st.group}>
                        <input
                            type="text"
                            name="room"
                            value={values[ROOM]}
                            placeholder="Введите название комнаты"
                            className={st.input}
                            onChange={handleChange}
                            autoComplete="off"
                            required
                        ></input>
                    </div>

                    <Link
                        className={st.group}
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
