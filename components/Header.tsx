"use client";

import React, { useEffect, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import "@/style/header.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import SearchInput from "./SearchInput";

export default function Header({ token }: { token: string | null }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  function checkNavOpen() {
    if (window.innerWidth <= 950) {
      setIsOpenMenu(false);
    } else {
      setIsOpenMenu(true);
    }
  }
  useEffect(() => {
    checkNavOpen();

    window.addEventListener("resize", checkNavOpen);
  }, []);

  return (
    <>
      <ClickAwayListener
        onClickAway={() => {
          if (window.innerWidth <= 950) {
            setIsOpenMenu(false);
          }
        }}
      >
        <div className="nav__bar__container">
          <button onClick={() => router.push("/")} className="nav__log">
            <Image
              width={100}
              height={100}
              className="nav__log__image"
              src="/logoMe.png"
              alt="logo"
            />
          </button>

          <button
            onClick={() => setIsOpenMenu(!isOpenMenu)}
            className="header__container__menu__icon"
          >
            <svg
              width="24"
              height="22"
              viewBox="0 0 14 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line y1="0.5" x2="7" y2="0.5" stroke="#C4C4C4" />
              <line y1="3.5" x2="11" y2="3.5" stroke="#C4C4C4" />
              <line y1="6.5" x2="14" y2="6.5" stroke="#C4C4C4" />
            </svg>
          </button>
          <button onClick={() => router.push("/")} className="nav__log__mobile">
            <Image
              width={100}
              height={100}
              className="nav__log__image"
              src="/logoMe.png"
              alt="logo"
            />
          </button>

          <div className="nav__register">
            <div className="nav__register__btns">
              <SearchInput />
              <button
                onClick={() => router.push("/cart")}
                className="nav__register__cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Filled"
                  viewBox="0 0 24 24"
                  width="28"
                  height="30"
                  fill="currentColor"
                >
                  <path d="M18,12a5.993,5.993,0,0,1-5.191-9H4.242L4.2,2.648A3,3,0,0,0,1.222,0H1A1,1,0,0,0,1,2h.222a1,1,0,0,1,.993.883l1.376,11.7A5,5,0,0,0,8.557,19H19a1,1,0,0,0,0-2H8.557a3,3,0,0,1-2.821-2H17.657a5,5,0,0,0,4.921-4.113l.238-1.319A5.984,5.984,0,0,1,18,12Z" />
                  <circle cx="7" cy="22" r="2" />
                  <circle cx="17" cy="22" r="2" />
                  <path d="M15,7h2V9a1,1,0,0,0,2,0V7h2a1,1,0,0,0,0-2H19V3a1,1,0,0,0-2,0V5H15a1,1,0,0,0,0,2Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </ClickAwayListener>
    </>
  );
}
