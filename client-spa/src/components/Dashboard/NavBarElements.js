import { AiOutlineSetting } from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";
import { GiProgression } from "react-icons/gi";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { MdOutlineAssignment, MdOutlineContactSupport } from "react-icons/md";
import { TbLayoutDashboard } from "react-icons/tb";
import { VscBook } from "react-icons/vsc";

export const SideBarLinks = [
    {
        title : "Dashboard",
        path: 'dashboard',
        icon: <TbLayoutDashboard size={25} color='green' />
    },
    {
        title: "Tutorials",
        path: 'tutorials',
        icon: <VscBook size={25} color='green' />
    },
    {
        title: "Discord",
        path: 'https://discord.gg/7c93kyfC',
        icon: <BsDiscord size={25} color='green' />
    },
    {
        title: "Analytics",
        path: 'analytics',
        icon: <GiProgression size={25} color='green' />
    },
    {
        title: "AI Support",
        path: 'help',
        icon: <MdOutlineContactSupport size={25} color='green' />
    },
    {
        title: "",
        path: 'settings',
        icon: <AiOutlineSetting size={25} color='green' />
    }
]