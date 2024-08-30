"use client";
import type { RootState } from '@/app/store'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { FaChevronRight } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { RiNotification4Line } from "react-icons/ri";
import { togleSideNavbar, toggleTopNavBar } from '@/Redux/navSlice'
import { useSelector, useDispatch } from "react-redux"

const topNavbarData = [
    {
        href: "/",
        title: "Home"
    },
    {
        href: "/service",
        title: "Service"
    },
    {
        href: "/product",
        title: "Products",
        section: [
            {
                href: '/product/agri_product',
                title: "Agriculture"
            },
            {
                href: '/product/hardware_product',
                title: "Hardware "
            },
        ]
    },
    {
        href: "/about",
        title: "About"
    },
]

const TopNavbar = () => {
    const dispatch = useDispatch()
    const toogle_top_navbar = useSelector((state: RootState) => state.navSlice.toogle_top_navbar)
    const toggle_side_navbar = useSelector((state: RootState) => state.navSlice.toggle_side_navbar)

    return (
        <nav className='flex items-center justify-between w-full h-20 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-sky-200 to-gray-100'>
            
            {/* 1st section */}
            <div className='flex'>
                <button
                    className={cn(
                        'text-2xl mx-3 transition duration-150 ease-out',
                        toggle_side_navbar ? "rotate-180" : "rotate-0"
                    )}
                    onClick={() => { dispatch(togleSideNavbar(!toggle_side_navbar)) }}
                    aria-label={toggle_side_navbar ? "Close side navigation" : "Open side navigation"}
                >
                    <FaChevronRight />
                </button>
                <div className="font-mono text-rose-800 text-3xl font-extrabold">
                    Laiba Treders
                </div>
            </div>

            {/* 2nd section */}
            <div className={cn(
                'absolute md:static w-full justify-end text-center min-h-auto left-0 md:justify md:justify-center md:items-center p-3 md:rounded-full rounded-br-lg rounded-bl-lg md:w-auto bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-sky-200 to-gray-100',
                toogle_top_navbar ? 'top-[75px] animate-slideIn' : 'top-[-750px] animate-slideOut'
            )}>
                <ul className='flex md:flex-row flex-col font-mono font-bold gap-3 text-xl'>
                    {topNavbarData.map((item, index) => (
                        <li key={index} className="relative group transition-all duration-300 ease-in-out">
                            <Link className="hover:text-rose-600 group-hover:text-rose-600 uppercase font-light" href={item.href}>
                                {item.title}
                            </Link>
                            {item.section && (
                                <div className="md:absolute left-0 hidden group-hover:block bg-white p-2 rounded-lg shadow-lg">
                                    {item.section.map((subitem, index) => (
                                        <div className="text-sm hover:text-rose-800 p-2" key={index}>
                                            <Link href={subitem.href}>{subitem.title}</Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {/* 3rd section */}
            <div className='flex items-center'>
                <button className="m-2 text-2xl hover:text-rose-700" onClick={() => console.log("clicked")} aria-label="Notifications">
                    <RiNotification4Line />
                </button>
                <button className="m-2 w-10 h-10" onClick={() => console.log("clicked")}>
                    <img
                        src="https://ui-avatars.com/api/?name=Sujaur+Rahaman"
                        alt="User avatar"
                        className="rounded-full w-10 h-10 text-rounded-md"
                    />
                </button>
                <button className="hover:text-rose-700 text-3xl md:hidden" onClick={() => dispatch(toggleTopNavBar(!toogle_top_navbar))}>
                    <HiOutlineMenu />
                </button>
            </div>
        </nav>
    )
}

export default TopNavbar