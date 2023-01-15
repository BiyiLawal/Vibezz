import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";
import { logo } from "../assets";
import { links } from "../assets/constants";

const NavLinks = ({ handleClick }) => (
  <div className="mt-10">
    {links.map((link) => (
      <NavLink
        key={link.name}
        to={link.to}
        onClick={() => handleClick && handleClick()}
        className="flex flex-row justify-start items-center my-7 text-sm font-medium text-gray-400 hover:text-green-400"
      >
        <link.icon className="w-6 h-6 mr-2" />
        {link.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <>
      <div className="md:flex hidden flex-col w-[210px] py-10 px-4 bg-[#014d0f]">
        <img src={logo} alt="logo" className="w-full h-45 object-contain" />
        <NavLinks />
      </div>

      <div className="absolute md:hidden block top-2 right-3">
        {mobileMenu ? (
          <RiCloseLine
            onClick={() => setMobileMenu(false)}
            className="w-6 h-7 text-white mr-2 mt-4"
          />
        ) : (
          <HiOutlineMenu
            onClick={() => setMobileMenu(true)}
            className="w-6 h-8 text-white mr-2 mt-5"
          />
        )}
      </div>
      <div
        className={`absolute top-0 h-screen w-1/3  bg-gradient-to-tl from-white/10 to-[#012c04] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenu ? "left-0" : "-left-full"
        }`}
      >
        <img src={logo} alt="logo" className="w-full h-45 object-contain" />
        <NavLinks handleClick={() => setMobileMenu(false)} />
      </div>
    </>
  );
};

export default Sidebar;
