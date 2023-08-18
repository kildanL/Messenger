import React from "react";
import st from "../styles/Messages.module.css";

export const Messages = ({ messages, name }) => {
    return (
        <div className={st.messages}>
            {messages.map(({ user, message }, index) => {
                const itsMe =
                    user.name.trim().toLowerCase() ===
                    name.trim().toLowerCase();

                const className = itsMe ? st.me : st.user;

                return (
                    <div key={index} className={`${st.message} ${className}`}>
                        <span className={st.user}>{user.name}</span>
                        <div className={st.text}>{message}</div>
                    </div>
                );
            })}
        </div>
    );
};
