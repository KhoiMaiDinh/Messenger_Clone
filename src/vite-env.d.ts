/// <reference types="vite/client" />
import * as React from "react";
declare global {
    namespace JSX {
        interface IntrinsicElements {
            ["em-emoji"]: React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement,
                native
            >;
        }
    }
}

type native = string;
