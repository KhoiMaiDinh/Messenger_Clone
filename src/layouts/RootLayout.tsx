import React from "react";
import { Outlet } from "react-router-dom";

function RootLayout() {
    return (
        <div className="bg-[#f5f5f5]">
            <Outlet />
        </div>
    );
}

export default RootLayout;
