
import { Fragment } from 'react';
import Logo from '../assets/logo2.png';
import {Link} from 'react-router-dom';

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
        title: 'Support',
        path: '/support'
    },
    {
        title: 'Demo',
        path: '/Demo'
    }
];

const AuthLinks = [
    {
        title: 'Sign in',
        path: '/sign-in'
    },
    {
        title: 'Sign up',
        path: '/sign-up'
    }
]

const Navbar = () => {

    return (
        <div className='p-5'>
            <div className='flex items-center'>
                <Link to='/'>
                    <img src={Logo} alt='Logo' className='w-[340px] h-[120px] cursor-pointer'/>
                </Link>
                <div className='flex flex-row items-center justify-between gap-10'>
                    {NavLinks.map((link) => (
                        <Link to = {link.path}>{link.title}</Link>
                    ))}
                </div>
            </div>
        </div>
    )    

}

export default Navbar;