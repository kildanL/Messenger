import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useLocation, useNavigate } from "react-router-dom";
import st from "../styles/Chat.module.css";
import iconEmoj from "../images/emoji.svg";
import EmojiPicker from "emoji-picker-react";
import { Messages } from "./Messages";

const socket = io.connect("http://localhost:5000");

export const Chat = () => {
    const { search } = useLocation();
    const navigate = useNavigate();
    const [params, setParams] = useState({ room: "", user: "" });
    const [state, setState] = useState([]);
    const [message, setMessage] = useState("");
    const [isOpen, setOpen] = useState(false);
    const [users, setUsers] = useState(0);

    useEffect(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(search));
        setParams(searchParams);
        socket.emit("join", searchParams);
    }, [search]);

    useEffect(() => {
        socket.on("message", ({ data }) => {
            setState((_state) => [..._state, data]);
        });
    }, []);

    useEffect(() => {
        socket.on("room", ({ data: { users } }) => {
            setUsers(users.length);
        });
    }, []);

    const leftRoom = () => {
        socket.emit("leftRoom", { params });
        navigate("/");
    };

    const handleChange = ({ target: { value } }) => setMessage(value);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!message) return;

        socket.emit("sendMessage", { message, params });

        setMessage("");
    };

    const onEmojiClick = ({ emoji }) => setMessage(`${message} ${emoji}`);

    return (
        <div className={st.wrap}>
            <div className={st.header}>
                <div className={st.title}>{params.room}</div>
                <div className={st.users}>{users} пользователей в комнате</div>
                <button className={st.left} onClick={leftRoom}>
                    Покинуть комнату
                </button>
            </div>

            <div className={st.messages}>
                <Messages messages={state} name={params.name} />
            </div>

            <form className={st.form} onSubmit={handleSubmit}>
                <div className={st.input}>
                    <input
                        type="text"
                        name="message"
                        placeholder="Напиши что-нибудь..."
                        value={message}
                        onChange={handleChange}
                        autoComplete="off"
                        required
                    />
                </div>
                <div className={st.emoji}>
                    <img
                        src={iconEmoj}
                        alt=""
                        onClick={() => setOpen(!isOpen)}
                    />

                    {isOpen && (
                        <div className={st.emojies}>
                            <EmojiPicker onEmojiClick={onEmojiClick} />
                        </div>
                    )}
                </div>

                <div className={st.button}>
                    <input
                        type="submit"
                        onSubmit={handleSubmit}
                        value="Отправить сообщение"
                    />
                </div>
            </form>
        </div>
    );
};
