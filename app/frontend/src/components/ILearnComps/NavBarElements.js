import { BsDiscord } from "react-icons/bs";
import { RiBookOpenFill } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { SiProgress } from "react-icons/si";
import { TbTargetArrow } from "react-icons/tb";

export const SideBarLinks = [
    {
        title : "Dashboard",
        path: 'dashboard',
        icon: <RxDashboard size={25} />

    },
    {
        title: "My Learning",
        path: 'tutorials',
        icon: <RiBookOpenFill  size={25}/>
    },
    {
        title: "Analytics",
        path: 'analytics',
        icon: <SiProgress size={25} />
    },
    {
        title: "Practice",
        path: 'practice',
        icon: <TbTargetArrow size={30}/>
    }
]