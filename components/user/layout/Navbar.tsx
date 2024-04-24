"use client";

import IMAGES from "@/config/images";
import Link from "next/link";
import { useState, useEffect } from "react";
import { RiMenuFoldLine } from "react-icons/ri";
import { ImCancelCircle } from "react-icons/im";
import Image from "next/image";
import { Button } from "@components/ui/button";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [showDiv, setShowDiv] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (currentScrollPos > prevScrollPos) {
        if (showDiv) setShowDiv(false);
      } else {
        if (currentScrollPos < prevScrollPos - 30 || currentScrollPos < 10)
          if (!showDiv) setShowDiv(true);
      }
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
    document.body.style.overflow = open ? "auto" : "hidden";
  };

  const links = [
    { name: "الرئيسية", href: "/" },
    { name: "عروض الإستعمال", href: "/" },
    { name: "محرك البحث", href: "/search" },
    { name: "الإشعارات", href: "/" },
    { name: "مساعد جي بي تي", href: "/" },
  ];

  return (
    <>
      {(showDiv || open) && (
        <nav
          className={`fixed  ${
            prevScrollPos > 10 || open ? "bg-white" : "bg-transparent"
          } z-50 w-full transition-all shadow-md  duration-300  top-0`}
        >
          <div
            className={`px-4 py-10 h-20   hidden items-center justify-around lg:flex w-full`}
          >
            <Link className={`w-[15%] flex items-center   `} href="/">
              <Image
                src={IMAGES.LOGO_DARK}
                width={292}
                height={48}
                className="h-16 w-auto"
                alt=""
              />
            </Link>
            <div className={`flex    items-center gap-10`}>
              <div className={`flex    items-center gap-10 font-semibold`}>
                {links.map((link, index) => (
                  <Link key={index} href={link.href}>
                    <p className={`primary-gradient text-primary text-lg`}>
                      {link.name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/">
              <Button className="text-white transition-all duration-300 border-[1px] bg-primary hover:border-primary hover:text-primary hover:bg-white">
                تسجيل الدخول
              </Button>
            </Link>
          </div>

          <div
            className={`  lg:hidden  relative flex w-full h-20  items-center justify-between px-6`}
          >
            <Link className={`w-1/2 md:w-1/4 flex items-center   `} href="/">
              <Image
                src={IMAGES.LOGO_DARK}
                width={292}
                height={48}
                className="h-14 w-auto"
                alt=""
              />
            </Link>
            <div className={`flex  items-center gap-8`}>
              <div className="flex items-center gap-4"></div>
              {open ? (
                <ImCancelCircle
                  onClick={toggleMenu}
                  size={25}
                  className="font-semibold cursor-pointer"
                />
              ) : (
                <RiMenuFoldLine
                  onClick={toggleMenu}
                  size={25}
                  className="font-semibold cursor-pointer"
                />
              )}
            </div>
            <div
              className={` absolute gap-6 py-12 transition-all duration-300 top-20  bg-white w-full min-h-screen h-10 overflow-auto left-0 ${
                open ? "flex  flex-col " : "translate-x-full"
              } `}
            >
              <div
                className={`flex  px-8   flex-col text-xl justify-around gap-4  font-semibold`}
              >
                {links.map((link, index) => (
                  <Link key={index} onClick={toggleMenu} href={link.href}>
                    <p className={`primary-gradient w-fit`}>{link.name}</p>
                  </Link>
                ))}
              </div>
              <div className="flex  my-4 gap-4 items-center justify-center">
                <Link href="/">
                  <Button className="text-white transition-all duration-300 border-[1px] bg-primary hover:border-primary hover:text-primary hover:bg-white">
                    تسجيل الدخول
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
