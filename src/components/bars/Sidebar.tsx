import React, { useEffect, useState } from "react";
import SidebarButton from "@/components/buttons/SidebarButton";
import { IC_Image, IC_Message, IC_SignOut } from "@/assets/icons";
import { auth } from "@/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/authContext";
import api from "@/api/apiInstance";
import { fetchChats } from "@/api/chat";

const Sidebar = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const handleSignOut = async () => {
        await auth.signOut();
        navigate("/sign-in");
    };

    return (
        <div className="flex flex-col justify-between">
            <div className="flex flex-col">
                <SidebarButton Icon={IC_Message} />
                <SidebarButton Icon={IC_Image} />
            </div>
            <div className="flex flex-col">
                <SidebarButton
                    url={user?.photoURL}
                    buttonClassName="rounded-full"
                    onClick={handleSignOut}
                />
                <SidebarButton
                    Icon={IC_SignOut}
                    buttonClassName="rounded-full"
                    onClick={handleSignOut}
                />
            </div>
        </div>
    );
};

export default Sidebar;
