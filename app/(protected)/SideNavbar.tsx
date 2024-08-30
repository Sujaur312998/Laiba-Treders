'use client';

import { cn } from "@/lib/utils"
import Link from "next/link"
import { TiShoppingCart } from "react-icons/ti";
import { PiWarehouseFill } from "react-icons/pi";
import { MdContactPhone } from "react-icons/md";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { SiMaterialformkdocs } from "react-icons/si";
import { usePathname } from 'next/navigation'
import { FaCashRegister } from "react-icons/fa6";
import { GiFarmer } from "react-icons/gi";
import { BiNotepad } from "react-icons/bi";

const sideNavData = [
    {
        icon: <TbLayoutDashboardFilled className="m-auto " />,
        href: "/dashboard",
        title: "Dashboard",
        sublist: [
            {
                href: "/dashboard/overview",
                title: "Overview"
            },
            {
                href: "/dashboard/salesreports",
                title: "Sales Reports"
            },
            {
                href: "/dashboard/analytics",
                title: "Analytics"
            },
        ]
    },
    {
        icon: <PiWarehouseFill className="m-auto " />,
        href: "/warehouse",
        title: "Ware House",
        sublist: [
            {
                href: '/warehouse/fertilizer',
                title: 'Fertilizer'
            },
            {
                href: '/warehouse/pesticides',
                title: 'Pesticides'
            },
            {
                href: '/warehouse/hardware',
                title: 'hardware'
            },
        ]
    },

    {
        icon: <SiMaterialformkdocs className="m-auto " />,
        href: "/product",
        title: "Product"
    },
    {
        icon: <FaCashRegister className="m-auto " />,
        href: "/cashmemo",
        title: "Cash Memo",
        sublist: [
            {
                href: '/newmemo',
                title: "Create new"
            },
            {
                href: '/searchmemo',
                title: "Search Cash Memo"
            },
            {
                href: "/updatememo",
                title: 'Update memo'
            }

        ]
    },
    {
        icon: <GiFarmer className="m-auto " />,
        href: "/customer",
        title: "Customer",
        sublist: [
            {
                href: "/newCustomer",
                title: "New Customer"
            },
            {
                href: "/customer/list",
                title: " List"
            }
        ]
    },
    {
        icon: <BiNotepad  className="m-auto " />,
        href: "/contact",
        title: "Tile Ledger"
    },
    {
        icon: <TiShoppingCart className="m-auto " />,
        href: "/order",
        title: "Order",
        sublist: [
            {
                href: "/order/history ",
                title: "Order History"
            },
            {
                href: "/order/status ",
                title: "Order Status"
            },
            {
                href: "/order/newOrder ",
                title: "New Order"
            },
            {
                href: "/order/newOrder ",
                title: "Order Managemen"
            },
        ]
    },
    {
        icon: <MdContactPhone className="m-auto " />,
        href: "/contact",
        title: "Contact"
    },
]

const SideNavbar = () => {
    const pathname = usePathname()

    const toggle_side_navbar = !true
    return (
        <div
            className={cn(
                "h-screen bg-gray-100 transition-all duration-200 ease-in-out flex flex-col",
                toggle_side_navbar ? "w-44 overflow-auto" : "w-16"
            )}
        >
            <div className=" space-y-2 p-2 flex-grow">
                {
                    sideNavData.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className={cn(
                                "relative flex items-center space-x-4 p-2 rounded-lg transition-colors duration-200 ease-in-out hover:bg-gray-300 hover:text-rose-800",
                                {
                                    "bg-gray-200 text-rose-900": pathname === item.href,
                                    "hover:bg-gray-300 hover:text-rose-800": pathname !== item.href,
                                },
                                toggle_side_navbar ? "text-base" : "text-lg" // Adjust text size based on sidebar state
                            )}
                        >
                            <div className={
                                cn("flex-shrink-0", toggle_side_navbar ? "w-4" : "w-8")
                            }>
                                {item.icon}
                            </div>
                            <span
                                className={cn(
                                    "transition-opacity duration-200 opacity-100",
                                    toggle_side_navbar ? "opacity-100" : "opacity-0",
                                    !toggle_side_navbar && "group-hover:opacity-100 absolute left-full ml-2 whitespace-nowrap"
                                )}
                            >
                                {item.title}
                            </span>
                        </Link>
                    ))}
            </div>

            <div className=" bg-slate-500 h-40 ">

            </div>
        </div>
    )
}


export default SideNavbar

