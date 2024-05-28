import React from "react";
import logo from "./logo_Alpha.png"
import { NavLink } from 'react-router-dom'
import "./Navbar.css"
import { FormProfile } from "../Modales/OrganiserProfile/OrganiserProfile";
import {
    Navbar,
    Typography,
    IconButton,
    Collapse,
  } from "@material-tailwind/react";


export default function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);

 React.useEffect(() => {
   window.addEventListener(
     "resize",
     () => window.innerWidth >= 960 && setOpenNav(false),
   );
 }, []);

  const navList = (
    <nav>
      <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-10">
        <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "activeLink" : undefined)} >
        Evènements
        </NavLink>

        <NavLink
        to="/comments"
        className={({ isActive }) => (isActive ? "activeLink" : undefined)}>
        Commentaires
        </NavLink>

        <NavLink
        to="/volunteers"
        className={({ isActive }) => (isActive ? "activeLink" : undefined)}>
        Bénévoles
        </NavLink>

        <NavLink
        to="/pending_requests"
        className={({ isActive }) => (isActive ? "activeLink" : undefined)}>
        Requêtes en cours
        </NavLink>

        <NavLink
        to=""
        className={({ isActive }) => (isActive ? "activeLink" : undefined)}>
        Déconnexion
        </NavLink>

        <FormProfile/>
      </ul>
    </nav>
  );




  return (
    <div className="max-h-[768px] w-[calc(100%+48px)] navbar mb-2">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="/"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            <img
            alt="logo"
            className="max-h-[100px] max-w-[100px]"
            src= {logo}
          />
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 pl-4 hidden lg:block">{navList}</div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
            {/* <ProfileMenu /> */}
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
        </Collapse>
      </Navbar>
    </div>
  );
}
