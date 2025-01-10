"use client";

import { useBackLocation } from "@/hooks/useBackLocation";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function DashboardHeader() {
  const pathname = usePathname();
  const backLocation = useBackLocation();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const formattedTitle =
    pathname === "/admin"
      ? "Admin Dashboard"
      : pathname.replace("/admin/", "").replace(/\//g, "  ").replace(/-/g, " ");
  return (
    <div className="dashboard__main__header">
      {isCollapsed && (
        <div className="dashboard__sidebar__mobile">
          <Link href="/admin" className="dashboard__sidebar__mobile__logo">
            <img
              loading="lazy"
              src="/logoMe.png"
              alt="Logo"
              className="dashboard__sidebar__mobile__logo__img"
            />
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            className="dashboard__sidebar__mobile__menu"
            onClick={() => setIsCollapsed(false)}
          >
            <svg
              width="16"
              height="21"
              viewBox="0 0 16 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.57737 4.63092V7.14685C4.57737 7.45842 4.82958 7.71062 5.14115 7.71062C5.42406 7.71062 5.65852 7.50219 5.69881 7.2302L5.70493 7.14685V4.63092H10.8916V7.14685C10.8916 7.45842 11.1441 7.71062 11.4553 7.71062C11.7386 7.71062 11.9728 7.50219 12.013 7.2302L12.0191 7.14685V4.63092H13.7172C14.3732 4.63092 14.9332 5.11123 15.0446 5.74634L15.0608 5.87533L15.9204 16.7076C15.9873 17.5768 15.6862 18.4405 15.0951 19.0787C14.5493 19.6678 13.7932 20.0254 12.9957 20.0769L12.7956 20.0834H3.80091C2.93082 20.0834 2.0927 19.7169 1.50147 19.0788C0.955762 18.4897 0.657274 17.7084 0.666893 16.9092L0.675753 16.7091L1.53569 5.87383C1.5857 5.22093 2.1078 4.69982 2.74949 4.63723L2.87931 4.63092H4.57737ZM8.33403 8.27091C8.12625 8.26791 7.95491 8.43379 7.95187 8.64218V9.3348C6.58485 9.43201 5.65528 10.2765 5.65528 11.4005C5.65528 12.7797 6.82788 13.1625 7.95187 13.4662V15.8965C7.35888 15.8169 6.79993 15.5708 6.34182 15.1857C6.25555 15.117 6.1486 15.0787 6.03803 15.0763C5.75794 15.0957 5.54226 15.3303 5.54585 15.611C5.54529 15.7337 5.59329 15.8515 5.67955 15.939C6.30717 16.5041 7.11402 16.8291 7.95792 16.8565L7.95852 17.5375C7.96824 17.7453 8.14505 17.9057 8.35283 17.8954C8.55759 17.8954 8.72345 17.7295 8.72345 17.5248V16.8443C10.3821 16.735 11.0504 15.7264 11.0504 14.6571C11.0504 13.2232 9.84749 12.7858 8.72349 12.482V10.3434C9.18098 10.4205 9.61236 10.6083 9.98115 10.8902C10.0547 10.9406 10.1409 10.9679 10.2303 10.9691C10.5164 10.9691 10.7497 10.7389 10.7528 10.4527C10.7534 10.33 10.7054 10.2121 10.6191 10.1246C10.0863 9.66835 9.41794 9.39921 8.71741 9.35911V8.64218C8.71741 8.43742 8.55155 8.27156 8.3468 8.27156C8.34255 8.27091 8.33828 8.27091 8.33403 8.27091ZM8.72349 13.6971C9.41004 13.8915 9.94468 14.1528 9.93861 14.7907C9.93861 15.2525 9.62267 15.7993 8.72349 15.9086V13.6971ZM7.95796 10.3008V12.2876C7.29571 12.0931 6.77929 11.8927 6.77929 11.3276C6.77929 10.7626 7.24712 10.3555 7.95796 10.3008ZM8.29826 0.833374C10.35 0.833374 12.0192 2.50286 12.0192 4.5546V4.63089H10.8916V4.5546C10.8916 3.1245 9.7284 1.96089 8.2983 1.96089C6.8682 1.96089 5.70497 3.1245 5.70497 4.5546V4.63089H4.57741V4.5546C4.57741 2.50286 6.24652 0.833374 8.29826 0.833374Z"
                fill="#637381"
              />
            </svg>
          </button>
        </div>
      )}
      <div className="dashboard__main__header__title">
        {pathname.split("/").length > 3 && (
          <button
            type="button"
            onClick={() => router.back()}
            className="dashboard__main__header__title__back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-chevron-left"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}
        <div className="dashboard__main__header__title__text">
          {formattedTitle}
        </div>
      </div>
    </div>
  );
}
