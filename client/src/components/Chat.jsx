import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";
import st from "../styles/Chat.module.css";
import iconEmoj from "../images/emoji.svg";
import EmojiPicker from "emoji-picker-react";
import { Messages } from "./Messages";

const socket = io.connect("http://localhost:5000");

export const Chat = () => {
    const { search } = useLocation();
    const [params, setParams] = useState({ room: "", name: "" });
    const [state, setState] = useState([]);
    const [message, setMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(search));
        setParams(searchParams);
        socket.emit("join", searchParams);
    }, [search]);

    useEffect(() => {
        socket.on("message", ({ data }) => {
            setState((_state) => [..._state, data]);
            console.log(data);
        });
    }, []);

    const leftRoom = () => {};
    const writeMessage = ({ target: { value } }) => {
        setMessage(value);
    };
    const onEmojiClick = ({ emoji }) => {
        setMessage(`${message} ${emoji}`);
    };
    const sendMessage = (e) => {
        e.preventDefault();

        if (!message) return;
        socket.emit("sendMessage", { message, params });

        setMessage("");
    };

    return (
        <div className={st.wrap}>
            <div className={st.header}>
                <div className={st.title}>{params.room}</div>
                <div className={st.users}>0 users in this room</div>
                <button className={st.left} onClick={leftRoom}>
                    left the room
                </button>
            </div>
            <div className={st.messages}>
                <Messages messages={state} name={params.name} />
            </div>

            <form className={st.form}>
                <div className={st.input}>
                    <input
                        type="text"
                        name="message"
                        value={message}
                        placeholder="Напиши что-нибудь"
                        onChange={writeMessage}
                        autoComplete="off"
                        required
                    />
                </div>
                <div className={st.emoji}>
                    <img
                        src={iconEmoj}
                        alt="icon emoji"
                        onClick={() => setIsOpen((prev) => !prev)}
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
                        onSubmit={sendMessage}
                        value="Отправить сообщение"
                    ></input>
                </div>
            </form>
        </div>
    );
};
