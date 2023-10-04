
import {useState } from 'react';
import Logo from '../assets/logo2.png';
import {Link, Outlet} from 'react-router-dom';
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'
const NavLinks = [
    {
        title : 'Product',
        path : '#product'
    },
    {
        title: 'Our Vision',
        path: '/our-vision'
    },
    {
        title: 'Customers',
        path: '/customers'
    },
    {
        title: 'Pricing',
        path: '#pricing'
    },
    {
        title: 'Blog',
        path: '/blogs'
    },
    {
        title: 'Demo',
        path: '/Demo'
    }
];

const Navbar = () => {

    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav)
    }

    return (
        <div className="shadow-lg sticky top-0 bg-white">
            <div className='flex h-24 max-w-[1800px] mx-auto justify-between items-center p-4 my-4 sticky'>
            <Link to="/"><img src={Logo} className='md:hidden w-[300px] h-[100px]' alt="Simple Prep Logo" /></Link>
            <div className='w-full hidden md:flex justify-between items-center m-8'>
                <a href="/"><img className='h-[100px] w-[350px]' src={Logo} alt="Simple Prep Logo" /></a>
                <div className='flex justify-between gap-5'>
                    {NavLinks.map((link)=> (
                        <a href={link.path} className='p-3 text-2xl font-medium hover:text-[#00df9a]' key={link.path}>{link.title}</a>
                    ))}
                </div>
                <div className='flex items-center gap-4'>
                    
                    <button className='py-3 bg-gray-100 rounded-lg hover:text-white hover:bg-purple-400'><a href='/sign-in' className='p-5 text-2xl font-medium'>Sign In</a></button>
                    <button className='py-3 bg-[#00df9a] rounded-lg hover:text-white hover:bg-purple-400'><a href='/sign-up' className='p-5 text-2xl font-medium'>Sign Up</a></button>
                    
                </div>
            </div>

            <div onClick={handleNav} className='block md:hidden'>
                {nav ? <AiOutlineClose size = {25}/> : <AiOutlineMenu size={25}/>}
            </div>
            <div className={ nav ? 'fixed left-0 top-24 w-[100%] h-full border-r border-r-gray-900 ease-in-out duration-500 bg-white ' : 'fixed hidden'}>
                <ul className='flex mt-5 flex-col p-3 gap-4 text-xl'>
                    {NavLinks.map((link)=> (
                        <Link className='p-4 border-b border-gray-600' to={link.path}>{link.title}</Link>
                    ))}
                    <button className='p-4 bg-gray-100 rounded-lg'><a href='/sign-in' className='p-5 text-2xl font-medium'>Sign In</a></button>
                    <button className='p-4 bg-[#00df9a] rounded-lg'><a href='/sign-up' className='p-5 text-2xl font-medium'>Sign Up</a></button>
                </ul>
            </div>
            
            
        </div>
        
        </div>
    )    

}

export default Navbar;