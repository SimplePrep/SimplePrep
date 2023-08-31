import { AiOutlineSetting } from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";
import { GiProgression } from "react-icons/gi";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { MdOutlineAssignment, MdOutlineContactSupport } from "react-icons/md";
import { PiSignOutFill } from "react-icons/pi";
import { TbLayoutDashboard } from "react-icons/tb";
import { VscBook } from "react-icons/vsc";

export const SideBarLinks = [
    {
        title : "Dashboard",
        path: 'dashboard',
        icon: <TbLayoutDashboard size={35} color='green' />
    },
    {
        title: "Notificattions",
        path: 'notifications',
        icon: <IoNotificationsCircleOutline size={35} color='green' />
    },
    {
        title: "Contents",
        path: 'contents',
        icon: <MdOutlineAssignment size={35} color='green' />
    },
    {
        title: "Tutorials",
        path: 'tutorials',
        icon: <VscBook size={35} color='green' />
    },
    {
        title: "Our Discord Channel",
        path: 'https://discord.gg/7c93kyfC',
        icon: <BsDiscord size={35} color='green' />
    },
    {
        title: "Track your progress",
        path: 'track',
        icon: <GiProgression size={35} color='green' />
    },
    {
        title: "Help",
        path: 'help',
        icon: <MdOutlineContactSupport size={35} color='green' />
    },
    {
        title: "Settings",
        path: 'settings',
        icon: <AiOutlineSetting size={35} color='green' />
    },
    {
        title: "Sign Out",
        path: 'sign-out',
        icon: <PiSignOutFill size={35} color='green' />
    }
]