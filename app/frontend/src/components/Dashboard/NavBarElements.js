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
        icon: <TbLayoutDashboard size={25} color='blue' />
    },
    {
        title: "Tutorials",
        path: 'tutorials',
        icon: <VscBook size={25} color='blue' />
    },
    {
        title: "Discord",
        path: 'https://discord.gg/HgKAgAhZZq',
        icon: <BsDiscord size={25} color='blue' />
    },
    {
        title: "Analytics",
        path: 'analytics',
        icon: <GiProgression size={25} color='blue' />
    },
]