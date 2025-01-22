"use client";
import { ILinks } from "@/interface";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import ClickAwayListener from "react-click-away-listener";
import MoonLoader from "react-spinners/MoonLoader";
export default function DashboardSidebar({ links }: { links: ILinks[] }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (window.innerWidth < 768) setIsCollapsed(true);
  }, [pathname]);

  if (isCollapsed) return null;

  return (
    <motion.div
      className="dashboard__sidebar__wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <ClickAwayListener
        onClickAway={() => {
          if (window.innerWidth <= 768) {
            setIsCollapsed(true);
          }
        }}
      >
        <motion.div
          initial={{
            opacity: 0,
            x: -300,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="dashboard__sidebar"
        >
          <div className="dashboard__sidebar__header">
            <Link href="/admin" className="dashboard__sidebar__header__logo">
              <img
                className="dashboard__sidebar__header__logo__img"
                loading="lazy"
                src="/logoMe.png"
                alt="Logo"
                width={109}
                height={25}
              />
            </Link>
            <button
              type="button"
              aria-label="Toggle menu"
              className="dashboard__sidebar__header__menu"
              onClick={() => setIsCollapsed(true)}
            >
              <svg
                width="16"
                height="21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.577 4.63v2.517A.564.564 0 0 0 5.7 7.23l.006-.083V4.63h5.187v2.516a.564.564 0 0 0 1.121.083l.006-.083V4.63h1.698c.656 0 1.216.48 1.328 1.115l.016.13.86 10.832a3.144 3.144 0 0 1-.826 2.37 3.146 3.146 0 0 1-2.1.999l-.2.006H3.802c-.87 0-1.708-.366-2.3-1.004a3.145 3.145 0 0 1-.834-2.17l.009-.2.86-10.835a1.354 1.354 0 0 1 1.213-1.237l.13-.006h1.698Zm3.757 3.64a.377.377 0 0 0-.382.372v.693c-1.367.097-2.297.941-2.297 2.065 0 1.38 1.173 1.762 2.297 2.066v2.43a3.154 3.154 0 0 1-1.61-.71.505.505 0 0 0-.304-.11.529.529 0 0 0-.492.535c0 .123.047.24.134.328.627.565 1.434.89 2.278.918v.68c.01.208.187.369.395.358a.37.37 0 0 0 .37-.37v-.68c1.66-.11 2.327-1.119 2.327-2.188 0-1.434-1.203-1.871-2.327-2.175v-2.139a2.85 2.85 0 0 1 1.258.547.45.45 0 0 0 .25.08c.285 0 .519-.231.522-.517a.464.464 0 0 0-.134-.328 3.206 3.206 0 0 0-1.902-.766v-.717a.37.37 0 0 0-.37-.37l-.013-.001Zm.39 5.427c.686.195 1.22.456 1.215 1.094 0 .461-.316 1.008-1.216 1.118v-2.212Zm-.766-3.396v1.987c-.662-.195-1.179-.395-1.179-.96s.468-.973 1.179-1.027Zm.34-9.468c2.052 0 3.721 1.67 3.721 3.722v.076h-1.127v-.076A2.596 2.596 0 0 0 8.298 1.96a2.596 2.596 0 0 0-2.593 2.594v.076H4.577v-.076A3.725 3.725 0 0 1 8.298.833Z"
                  fill="#637381"
                />
              </svg>
            </button>
          </div>
          <div className="container__sidebar__content">
            {links?.length > 0 ? (
              links.map((link) => (
                <SideBarEntry key={link.label} entryLink={link} />
              ))
            ) : (
              <p>No links available</p>
            )}
          </div>
        </motion.div>
      </ClickAwayListener>
    </motion.div>
  );
}

function SideBarEntry({ entryLink }: { entryLink: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const [isLoading, startTransition] = useTransition();
  const [activeLoadingEntry, setActiveLoadingEntry] = useState<string | null>(
    null
  );

  return (
    <>
      <div className="sidebar__nav__warper__header">
        <Link
          href={entryLink.href}
          onClick={() => setIsOpen(!isOpen)}
          className={`sidebar__category__btn ${isOpen ? "active" : ""}`}
        >
          <div className="sidebar__category__btn__icon">{entryLink.icon}</div>
          <div className="sidebar__category__btn__name">{entryLink.label}</div>
        </Link>
      </div>
      {isOpen && (
        <div className="sidebar__nav__warper">
          {entryLink?.children?.map((subEntry: any) => (
            <button
              key={subEntry.name}
              onClick={() => {
                startTransition(() => {
                  router.push(subEntry.href);
                });
              }}
              className={`sidebar__nav__entry ${
                pathname.startsWith(subEntry.href) ? "active" : ""
              }`}
            >
              {subEntry.icon && (
                <span className="sidebar__nav__icon">
                  {isLoading ? (
                    <MoonLoader size={15} color="#fff" />
                  ) : (
                    subEntry.icon
                  )}
                </span>
              )}

              <span className="sidebar__nav__text">{subEntry.label}</span>
            </button>
          ))}
        </div>
      )}
    </>
  );
}
