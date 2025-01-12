import { useLocation } from "react-router-dom";

import { brainwave, codeclash } from "../assets";
import { navigation } from "../constants";

import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
    } else {
      setOpenNavigation(true);
    }
  };

  const handleClick = () => {
    setOpenNavigation(false);
  };

  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 bg-n-8/90 backdrop-blur-sm border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="block w-[12rem] xl:mr-8" href="#hero">
          {/* <img src={brainwave} width={190} height={40} alt="Codeclash" /> */}
          <img src={codeclash} width={190} height={40} alt="Codeclash" />
        </a>

        {/* 
        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } hidden fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  item.url === pathname.hash
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </a>
            ))}
            <HamburgerMenu />
          </div>
        </nav>
        */}
        <a
          href="#signup"
          className="button-hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
        ></a>

        {/* 
        <Button className="hidden lg:flex" href="#login">
          Sign in
        </Button>
        */}
        {/* Conditionally render Login or Logout button */}
        <div className="flex items-center">
          {isAuthenticated ? (
            <>
              <h1 className="text-n-1">Welcome, {user.name}!</h1>
              <Button
                className="hidden lg:flex"
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <h1 className="text-n-1 mr-4">Welcome, Guest!</h1>
              <Button className="hidden lg:flex" onClick={loginWithRedirect}>
                Sign in
              </Button>
            </>
          )}
        </div>

        {/* 
        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
        */}
      </div>
    </div>
  );
};

export default Header;
