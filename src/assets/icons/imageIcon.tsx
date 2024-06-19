import React from "react";

export default function ImageIcon() {
    return (
        <svg height="28px" viewBox="0 0 36 36" width="28px">
            <path
                d="M13.5 16.5a2 2 0 100-4 2 2 0 000 4z"
                // fill="var(--chat-composer-button-color)"
                fill="black"
            ></path>
            <path
                clipRule="evenodd"
                d="M7 12v12a4 4 0 004 4h14a4 4 0 004-4V12a4 4 0 00-4-4H11a4 4 0 00-4 4zm18-1.5H11A1.5 1.5 0 009.5 12v9.546a.25.25 0 00.375.217L15 18.803a6 6 0 016 0l5.125 2.96a.25.25 0 00.375-.217V12a1.5 1.5 0 00-1.5-1.5z"
                fill="var(--chat-composer-button-color)"
                fillRule="evenodd"
            ></path>
        </svg>
    );
}
