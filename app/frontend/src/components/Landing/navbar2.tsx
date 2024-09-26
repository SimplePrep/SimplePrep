import { useState, useEffect } from 'react';
import Logo from '../assets/logo4.png';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { scrollToSection } from './smoothScroll';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { RxCross1 } from "react-icons/rx";
import { RiMenuFoldFill } from "react-icons/ri";

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

  useEffect(() => {
    if (nav) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [nav]);

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
      const section = document.getElementById(path);
      if (section) {
        scrollToSection(path);
      } else {
        navigate('/'); // Redirect to home page
        setTimeout(() => {
          scrollToSection(path); // Scroll to the section after navigating to the home page
        }, 300); // Adjust this timeout to match the page load time
      }
    }
    setNav(false); // Close the mobile menu after navigation
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
      className="fixed w-full top-5  z-20 px-6 md:px-10 font-opensans"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className='flex xl:max-w-[1000px] mx-auto justify-between items-center p-3 rounded-full border  bg-white'>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/"><img className='w-[160px] md:w-[200px]' src={Logo} alt="Simple Prep Logo" /></Link>
        </motion.div>

        <motion.div className='hidden md:flex gap-5 items-center' variants={linkVariants}>
          {NavLinks.map((link, index) => (
            <div className='group transition' key={index}>
              <button onClick={() => handleScroll(link.path)} className='p-1 md:p- text-lg md:text-xl font-medium hover:text-blue-600 text-black'>
                {link.title}
              </button>
              <span className="block h-1 rounded bg-blue-800 transform translate-y-3 max-w-0 group-hover:max-w-full transition-all duration-300"></span>
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
          className="hidden md:block text-white px-4 py-2 md:px-6 md:py-3 relative bg-blue-600 hover:bg-blue-700 rounded-3xl "
          onClick={handleLoginClick}
        >
          <span className="block absolute inset-0 rounded-3xl hover:bg-blue-900 border-blue-900  p-px linear-overlay" />
          <span className='text-lg md:text-xl font-medium tracking-wide h-full w-full block relative linear-mask'>
            Login →
          </span>
        </motion.button>

        {/* Mobile Menu Icon */}
        <div onClick={handleNav} className='block md:hidden'>
          {nav ? <RxCross1 size={25}/> : <RiMenuFoldFill size={25} />}
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`fixed top-18 left-0 w-full h-full bg-white md:hidden z-10 transition-transform duration-300 ${nav ? 'translate-x-0' : '-translate-x-full'}`}
        variants={mobileMenuVariants}
        initial="hidden"
        animate={nav ? "visible" : "hidden"}
      >
        <ul className='flex flex-col items-center py-10 h-full gap-8 text-xl'>
          {NavLinks.map((link, index) => (
            <li key={index} onClick={() => handleScroll(link.path)} className="flex flex-row items-center justify-between w-3/4">
              <span>{link.title}</span>
              <MdKeyboardArrowRight size={30}/>
            </li>
          ))}
          <li>
            <button onClick={() => { handleLoginClick(); setNav(false); }} className='p-3 bg-blue-600 text-xl text-white rounded-md '>
              {isAuthenticated ? 'Go to Demo' : 'Login'}
            </button>
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
}

export default Navbar;
