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
  const [navOpen, setNavOpen] = useState(false);
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
    document.body.style.overflow = navOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [navOpen]);

  const handleNavToggle = () => setNavOpen(!navOpen);

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
        navigate('/');
        setTimeout(() => {
          scrollToSection(path);
        }, 300);
      }
    }
    setNavOpen(false);
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.2, duration: 0.6 },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { delay: 0.5, duration: 0.6 },
    },
  };

  const mobileMenuVariants = {
    hidden: { x: "-100%" },
    visible: {
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.nav
      className="fixed w-full top-5 z-20 px-6 md:px-10 font-sans" 
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex xl:max-w-[1000px] mx-auto justify-between items-center p-3 rounded-full border bg-white shadow-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/">
            <img className="w-[160px] md:w-[200px]" src={Logo} alt="Simple Prep Logo" />
          </Link>
        </motion.div>

        {/* Desktop Links */}
        {!isMobile && (
          <motion.div className="hidden md:flex gap-6 items-center" variants={linkVariants}>
            {NavLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => handleScroll(link.path)}
                className="relative p-1 text-lg md:text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
              >
                {link.title}
                <span className="absolute left-0 bottom-[-2px] block h-1 bg-blue-600 scale-x-0 origin-left group-hover:scale-x-100 transition-transform"></span>
              </button>
            ))}
          </motion.div>
        )}

        {/* Desktop Login Button */}
        {!isMobile && (
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
            className="hidden md:block relative text-white px-4 py-2 md:px-6 md:py-3 rounded-3xl bg-indigo-600 hover:bg-indigo-800 transition-colors"
            onClick={handleLoginClick}
          >
            <span className='text-lg md:text-xl font-medium tracking-wide block relative'>
              {isAuthenticated ? 'Dashboard →' : 'Login →'}
            </span>
          </motion.button>
        )}

        {/* Mobile Menu Toggle */}
        {isMobile && (
          <button
            onClick={handleNavToggle}
            aria-label={navOpen ? 'Close menu' : 'Open menu'}
            className="block md:hidden text-gray-700 hover:text-gray-900"
          >
            {navOpen ? <RxCross1 size={25} /> : <RiMenuFoldFill size={25} />}
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && (
        <motion.div
          className={`fixed top-18 left-0 w-full h-full bg-white md:hidden z-10 ${navOpen ? 'translate-x-0' : '-translate-x-full'} shadow-lg`}
          variants={mobileMenuVariants}
          initial="hidden"
          animate={navOpen ? "visible" : "hidden"}
        >
          <ul className="flex flex-col items-center py-10 h-full gap-8 text-xl font-medium text-gray-800">
            {NavLinks.map((link, index) => (
              <li
                key={index}
                onClick={() => handleScroll(link.path)}
                className="flex flex-row items-center justify-between w-3/4 hover:text-blue-600 transition-colors"
              >
                <span>{link.title}</span>
                <MdKeyboardArrowRight size={30} />
              </li>
            ))}
            <li>
              <button
                onClick={() => { handleLoginClick(); setNavOpen(false); }}
                className="p-3 bg-blue-600 text-white text-xl rounded-md hover:bg-blue-700 transition-colors"
              >
                {isAuthenticated ? 'Go to Demo' : 'Login'}
              </button>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
