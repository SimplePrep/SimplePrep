import { useState } from 'react';
import Logo from '../assets/logo2.png';
import { Link } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import {User} from 'firebase/auth';
const NavLinks = [
    { title: 'Product', path: '#product' },
    { title: 'Our Vision', path: '/our-vision' },
    { title: 'Customers', path: '/customers' },
    { title: 'Pricing', path: '#pricing' },
    { title: 'Blog', path: '/blogs' },
    { title: 'Demo', path: '/demo' }
];

interface NavbarProps {
    isAuthenticated: boolean;
    user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({isAuthenticated, user}) => {
    const [nav, setNav] = useState(false);
    const handleNav = () => setNav(!nav);

    return (
        <div className="shadow-lg sticky top-0 bg-white font-ubuntu z-10">
            <div className='flex h-24 lg:max-w-[1200px] xl:max-w-[1500px] mx-auto justify-between items-center p-4 my-4'>
                <div className='hidden md:flex w-full justify-between items-center'>
                    <Link to="/"><img className='h-[100px] w-[350px]' src={Logo} alt="Simple Prep Logo" /></Link>
                    <div className='flex gap-5 items-center'>
                        {NavLinks.map((link, index) => (
                            <div className='group transition' key={index}>
                                <Link to={link.path} className='p-3 text-xl font-medium hover:text-[#00df9a]'>
                                    {link.title}
                                </Link>
                                <span className="block h-1 rounded bg-green-500 transform translate-y-7 max-w-0 group-hover:max-w-full transition-all duration-300"></span>
                            </div>
                        ))}
                    </div>
                    <div className='flex items-center gap-4'>
                        <Link to='/login' className='py-4 px-5 text-xl font-medium bg-gray-100 rounded-lg hover:text-white hover:bg-[#00df9a]'>Log In →</Link>
                    </div>
                </div>

                <div onClick={handleNav} className='block md:hidden'>
                    {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
                </div>
                <div className={nav ? 'fixed left-0 top-24 w-[100%] h-full border-r border-r-gray-900 bg-white ease-in-out duration-500' : 'fixed hidden'}>
                    <ul className='flex flex-col p-3 gap-4 text-md'>
                        {NavLinks.map((link, index) => (
                            <Link className='p-4 border-b border-gray-600' to={link.path} key={index}>
                                {link.title}
                            </Link>
                        ))}
                        <Link to='/login' className='p-4 text-2xl font-medium bg-gray-100 rounded-lg'>Sign In</Link>
                        <Link to='/signup' className='p-4 text-2xl font-medium bg-[#00df9a] rounded-lg'>Sign Up</Link>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;