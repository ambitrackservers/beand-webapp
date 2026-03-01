"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

const Navigation = [
  {
    label: "Inicio",
    href: "/",
  },
  {
    label: "Nosotros",
    href: "/nosotros",
  },
  {
    label: "Inventario",
    href: "/inventario",
  },
  {
    label: "Cafe",
    href: "/cafe",
  },
  {
    label: "Juegos",
    href: "/juegos",
  },
];

export default function Header() {
  const Pathname = usePathname();
  const [Scrolled, SetScrolled] = useState(false);
  const { data: session } = useSession();
  const [Modal, SetModal] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        SetScrolled(true);
      } else {
        SetScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 h-20 transition-all duration-200 ease-linear ${Scrolled && "bg-black/55 backdrop-blur-3xl saturate-150"}`}
    >
      <nav className="w-full h-full flex justify-baseline items-center">
        <div className="flex-1 h-full flex items-center justify-start pl-8">
          <Link href="/">
            <Image
              src="/images/logo_beand.png"
              loading="eager"
              alt="logo"
              width={60}
              height={60}
            />
          </Link>
        </div>
        <ol className="flex-1 h-full flex items-center gap-2 justify-center px-3">
          {Navigation.map(({ label, href }) => (
            <li key={href}>
              <Link
                aria-label={`ir a ${label}`}
                className={`px-5 py-2 transition-all duration-200 rounded ease-linear ${Pathname === href ? "bg-red-600" : "hover:bg-red-600"}`}
                href={href}
              >
                {label}
              </Link>
            </li>
          ))}
        </ol>
        <div className="flex-1 h-full flex items-center justify-end pr-8">
          {session?.user?.image ? (
            <>
              <button
                title={`hola ${session.user.name}`}
                className="cursor-pointer rounded-full"
                onClick={() => SetModal(true)}
              >
                <Image
                  src={session.user.image}
                  alt="Logo"
                  width={35}
                  height={35}
                  className="rounded-full"
                />
              </button>
              {Modal && (
                <div
                  onClick={() => SetModal(false)}
                  className="fixed inset-0 w-full h-full bg-black/40 flex items-center justify-center backdrop-blur-3xl saturate-100"
                >
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="max-w-xl bg-[#282a2c] rounded-3xl w-full"
                  >
                    <div className="w-full flex flex-col pt-5">
                      <div className="w-full flex justify-center">
                        <p>{session.user.email}</p>
                      </div>
                      <div className="w-full flex pt-9 justify-center">
                        <Image
                          src={session.user.image}
                          alt={`avatar de ${session.user.name}`}
                          width={80}
                          height={80}
                          className="rounded-full"
                        />
                      </div>
                      <div className="w-full flex pt-3 justify-center">
                        <h1 className="">{session.user.name}</h1>
                      </div>
                    </div>
                    <div className="w-full flex pt-8 justify-center">
                      <button
                        onClick={() => signOut()}
                        className="cursor-pointer w-full max-w-[280px] hover:bg-[#36383a] transition-all duration-200 ease-linear h-[56px] rounded-3xl bg-[#1b1b1b]"
                      >
                        <span className="pl-4 gap-5 flex">
                          <span>
                            <svg
                              height="24"
                              viewBox="0 0 24 24"
                              width="24"
                              focusable="false"
                              fill="currentcolor"
                            >
                              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"></path>
                              <path d="M0 0h24v24H0z" fill="none"></path>
                            </svg>
                          </span>
                          <span className="">Cerrar sesión</span>
                        </span>
                      </button>
                    </div>
                    <div className="w-full justify-center flex font-light text-sm pt-8 pb-5">
                      <span>Gracis por confiar en nosotros</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <Link
              href="/acceder"
              className="flex gap-2 hover:text-red-600 transition-all duration-200 ease-linear"
              aria-label="Acceder a tu cuenta"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="Currentcolor"
              >
                <path d="M367-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q560-607 560-640t-23.5-56.5Q513-720 480-720t-56.5 23.5Q400-673 400-640t23.5 56.5Q447-560 480-560t56.5-23.5ZM480-640Zm0 400Z" />
              </svg>
              <h1>Acceder</h1>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
