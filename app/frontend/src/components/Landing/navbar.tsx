import { useState, useEffect } from 'react';
import Logo from '../assets/logo4.png';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { scrollToSection } from './smoothScroll';

const NavLinks = [
  { title: 'Product', path: 'product' },
  { title: 'Our Vision', path: 'our-vision' },
  { title: 'Customers', path: 'testimonials' },
  { title: 'Blog', path: '/blogs' },
];

interface NavbarProps {
  isAuthenticated: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated }) => {
  const [nav, setNav] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNav = () => setNav(!nav);

  const handleLoginClick = () => {
    if (isAuthenticated) {
      navigate('/demo');
    } else {
      navigate('/login');
    }
  };

  const handleScroll = (path: string) => {
    if (path.startsWith('/')) {
      navigate(path);
    } else {
      scrollToSection(path);
    }
    setNav(false);
  };
  
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.6,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.5,
        duration: 0.6,
      },
    },
  };

  const mobileMenuVariants = {
    hidden: { x: "-100%" },
    visible: {
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      className="sticky top-0 bg-white font-ubuntu z-20 px-10"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className='flex  lg:max-w-[1200px] xl:max-w-[1500px] mx-auto justify-between items-center p-4'>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/"><img className='w-[200px]' src={Logo} alt="Simple Prep Logo" /></Link>
        </motion.div>

        <motion.div className='hidden md:flex gap-5 items-center' variants={linkVariants}>
          {NavLinks.map((link, index) => (
            <div className='group transition' key={index}>
              <button onClick={() => handleScroll(link.path)} className='p-3 text-xl font-medium hover:text-blue-900'>
                {link.title}
              </button>
              <span className="block h-1 rounded bg-blue-900 transform translate-y-3 max-w-0 group-hover:max-w-full transition-all duration-300"></span>
            </div>
          ))}
        </motion.div>

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
          className="hidden md:block px-6 py-3 relative hover:bg-blue-900 rounded-3xl hover:text-white"
          onClick={handleLoginClick}
        >
          <span className="block absolute inset-0 rounded-3xl hover:bg-blue-900 border-[2px] border-blue-900 p-px linear-overlay" />
          <span className='text-xl font-medium tracking-wide h-full w-full block relative linear-mask'>
            {isAuthenticated ? 'Go to Demo' : 'Login'} →
          </span>
        </motion.button>

        {/* Mobile Menu Icon */}
        <div onClick={handleNav} className='block md:hidden'>
          {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className='fixed left-0 top-24 w-full h-full border-r border-r-gray-900 bg-white ease-in-out duration-500 md:hidden'
        variants={mobileMenuVariants}
        initial="hidden"
        animate={nav ? "visible" : "hidden"}
      >
        <ul className='flex flex-col p-3 gap-4 text-md max-w-sm'>
          {NavLinks.map((link, index) => (
            <Link className='p-2 border-b border-gray-600 text-lg' to={link.path} key={index} onClick={() => setNav(false)}>
              {link.title}
            </Link>
          ))}
          <button onClick={() => { handleLoginClick(); setNav(false); }} className='p-2 max-w-sm text-lg font-medium bg-gray-100 rounded-lg'>
            {isAuthenticated ? 'Go to Demo' : 'Login'}
          </button>
        </ul>
      </motion.div>
    </motion.div>
  );
}

export default Navbar;
