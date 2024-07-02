import { useState } from 'react';
import Logo from '../assets/logo4.png';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { User } from 'firebase/auth';
import { motion } from 'framer-motion';

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

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, user }) => {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();

  const handleNav = () => setNav(!nav);

  const handleLoginClick = () => {
    if (isAuthenticated) {
      navigate('/demo');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="sticky top-0 bg-white font-ubuntu z-10 px-10">
      <div className='flex h-24 lg:max-w-[1200px] xl:max-w-[1500px] mx-auto justify-between items-center p-4 my-4'>
        <div className='hidden md:flex w-full justify-between items-center'>
          <Link to="/"><img className='h-[70px] w-[350px]' src={Logo} alt="Simple Prep Logo" /></Link>
          <div className='flex gap-5 items-center'>
            {NavLinks.map((link, index) => (
              <div className='group transition' key={index}>
                <Link to={link.path} className='p-3 text-xl font-medium hover:text-blue-900'>
                  {link.title}
                </Link>
                <span className="block h-1 rounded bg-blue-900 transform translate-y-7 max-w-0 group-hover:max-w-full transition-all duration-300"></span>
              </div>
            ))}
          </div>
          <motion.button
            initial={{ "--x": "100%", scale: 1 } as any}
            animate={{ "--x": "-100%", } as any}
            whileTap={{ scale: 0.97 }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 1,
              type: "spring",
              stiffness: 20,
              damping: 15,
              mass: 2,
              scale: {
                type: "spring",
                stiffness: 10,
                damping: 5,
                mass: 0.1,
              },
            }}
            className="px-6 py-3 relative hover:bg-blue-900 rounded-3xl hover:text-white"
            onClick={handleLoginClick}
          >
            <span className="block absolute inset-0 rounded-3xl hover:bg-blue-900 border-[2px] border-blue-900 p-px linear-overlay" />
            <span className='text-xl font-medium tracking-wide h-full w-full block relative linear-mask'>
              {isAuthenticated ? 'Go to Demo' : 'Login'} →
            </span>
          </motion.button>
        </div>

        <div onClick={handleNav} className='block md:hidden'>
          {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
        </div>
        <div className={nav ? 'fixed left-0 top-24 w-[100%] h-full border-r border-r-gray-900 bg-white ease-in-out duration-500' : 'fixed hidden'}>
          <ul className='flex flex-col p-3 gap-4 text-md'>
            {NavLinks.map((link, index) => (
              <Link className='p-4 border-b border-gray-600' to={link.path} key={index} onClick={() => setNav(false)}>
                {link.title}
              </Link>
            ))}
            <button onClick={handleLoginClick} className='p-4 text-2xl font-medium bg-gray-100 rounded-lg'>
              {isAuthenticated ? 'Go to Demo' : 'Sign In'}
            </button>
            <Link to='/signup' className='p-4 text-2xl font-medium bg-[#00df9a] rounded-lg' onClick={() => setNav(false)}>
              Sign Up
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
