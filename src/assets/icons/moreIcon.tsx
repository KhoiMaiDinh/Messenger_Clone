import React from "react";

export default function MoreIcon({ color }: { color: string }) {
    return (
        <svg
            fill="var(--mwp-header-button-color)"
            height="28px"
            role="presentation"
            viewBox="0 0 36 36"
            width="28px"
        >
            <path
                d="M12.5 18C12.5 19.2426 11.4926 20.25 10.25 20.25C9.00736 20.25 8 19.2426 8 18C8 16.7574 9.00736 15.75 10.25 15.75C11.4926 15.75 12.5 16.7574 12.5 18Z"
                fill={color ? color : "#000000"}
            ></path>
            <path
                d="M20.25 18C20.25 19.2426 19.2426 20.25 18 20.25C16.7574 20.25 15.75 19.2426 15.75 18C15.75 16.7574 16.7574 15.75 18 15.75C19.2426 15.75 20.25 16.7574 20.25 18Z"
                fill={color ? color : "#000000"}
            ></path>
            <path
                d="M25.75 20.25C26.9926 20.25 28 19.2426 28 18C28 16.7574 26.9926 15.75 25.75 15.75C24.5074 15.75 23.5 16.7574 23.5 18C23.5 19.2426 24.5074 20.25 25.75 20.25Z"
                fill={color ? color : "#000000"}
            ></path>
        </svg>
    );
}
