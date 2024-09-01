'use client';

import { useState } from 'react';
import { cn } from "@/lib/utils";
import Link from "next/link";
import { TiShoppingCart } from "react-icons/ti";
import { PiWarehouseFill } from "react-icons/pi";
import { MdContactPhone, MdKeyboardArrowRight } from "react-icons/md";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { SiMaterialformkdocs } from "react-icons/si";
import { usePathname } from 'next/navigation';
import { FaCashRegister } from "react-icons/fa6";
import { GiFarmer } from "react-icons/gi";
import { BiNotepad } from "react-icons/bi";
import type { RootState } from '@/app/store'
import { useSelector } from "react-redux"


interface SublistItem {
    href: string;
    title: string;
}

interface SideNavItem {
    icon: JSX.Element;
    href: string;
    title: string;
    sublist?: SublistItem[];
}

const sideNavData: SideNavItem[] = [
    {
        icon: <TbLayoutDashboardFilled className="m-auto" />,
        href: "/dashboard",
        title: "Dashboard",
        sublist: [
            { href: "/dashboard/overview", title: "Overview" },
            { href: "/dashboard/salesreports", title: "Sales Reports" },
            { href: "/dashboard/analytics", title: "Analytics" },
        ]
    },
    {
        icon: <PiWarehouseFill className="m-auto" />,
        href: "/warehouse",
        title: "Ware House",
        sublist: [
            { href: '/warehouse/fertilizer', title: 'Fertilizer' },
            { href: '/warehouse/pesticides', title: 'Pesticides' },
            { href: '/warehouse/hardware', title: 'Hardware' },
        ]
    },
    {
        icon: <SiMaterialformkdocs className="m-auto" />,
        href: "/product",
        title: "Product"
    },
    {
        icon: <FaCashRegister className="m-auto" />,
        href: "/cashmemo",
        title: "Cash Memo",
        sublist: [
            { href: '/newmemo', title: "Create new" },
            { href: '/searchmemo', title: "Search Cash Memo" },
            { href: "/updatememo", title: 'Update memo' }
        ]
    },
    {
        icon: <GiFarmer className="m-auto" />,
        href: "/customer",
        title: "Customer",
        sublist: [
            { href: "/newCustomer", title: "New Customer" },
            { href: "/customer/list", title: "List" }
        ]
    },
    {
        icon: <BiNotepad className="m-auto" />,
        href: "/tile",
        title: "Tile Ledger"
    },
    {
        icon: <TiShoppingCart className="m-auto" />,
        href: "/order",
        title: "Order",
        sublist: [
            { href: "/order/history", title: "Order History" },
            { href: "/order/status", title: "Order Status" },
            { href: "/order/newOrder", title: "New Order" },
            { href: "/order/newOrder", title: "Order Management" },
        ]
    },
    {
        icon: <MdContactPhone className="m-auto" />,
        href: "/contact",
        title: "Contact"
    },
];

const SideNavbar: React.FC = () => {
    const pathname = usePathname();
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

    const handleToggle = (href: string) => {
        setExpanded(prev => ({
            ...prev,
            [href]: !prev[href]
        }));
    };

    const toogle_top_navbar = useSelector((state: RootState) => state.navSlice.toogle_top_navbar)
    const toggle_side_navbar = useSelector((state: RootState) => state.navSlice.toggle_side_navbar)

    return (
        <div
            className={cn(
                "h-screen bg-gray-100 shadow-sm overflow-auto flex flex-col transition-all duration-200 ease-in-out",
                toogle_top_navbar ? "w-0" : toggle_side_navbar ? "w-64" : "w-20", // Use fixed width values for smooth transitions
            )}
        >
            <div className="space-y-2 p-3 flex-grow">
                <ul>
                    {sideNavData.map((item, index) => (
                        <li key={index} className='my-2'>
                            <div
                                className={cn(
                                    "relative flex items-center space-x-1 p-3 rounded-lg transition-colors duration-300 ease-in-out hover:bg-gray-200 hover:text-rose-600 cursor-pointer",
                                    pathname === item.href && "bg-gray-200 text-rose-600 border-l-4 border-rose-600"
                                )}
                                onClick={() => item.sublist && handleToggle(item.href)} // Ensure toggle happens on click
                            >
                                <Link href={item.href} className="flex w-full items-center">
                                    <span className={cn(
                                        "flex-shrink-0 transition-all duration-300", // Ensure smooth icon size transition
                                        toggle_side_navbar ? "w-8" : "w-6"
                                    )}>
                                        {item.icon}
                                    </span>
                                    {toggle_side_navbar && (
                                        <span
                                            className={cn(
                                                "ml-3 transition-all duration-300 text-md",
                                                toggle_side_navbar ? "opacity-100" : "opacity-100"
                                            )}
                                        >
                                            {item.title}
                                        </span>
                                    )}
                                </Link>

                                {item.sublist && toggle_side_navbar && (
                                    <button
                                        className={cn(
                                            "ml-auto transition-transform duration-300 ease-in-out",
                                            expanded[item.href] ? "rotate-90" : "rotate-0"
                                        )}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleToggle(item.href);
                                        }}
                                    >
                                        <MdKeyboardArrowRight className="hover:text-xl" />
                                    </button>
                                )}
                            </div>
                            {toggle_side_navbar && item.sublist && expanded[item.href] && (
                                <ul className="pl-8 mt-2 space-y-1">
                                    {item.sublist.map((subItem, subIndex) => (
                                        <li key={subIndex}>
                                            <Link
                                                href={subItem.href}
                                                className={cn(
                                                    "flex items-center space-x-4 p-2 rounded-lg transition-colors duration-300 ease-in-out hover:bg-gray-100 hover:text-rose-600",
                                                    pathname === subItem.href ? "bg-gray-100 text-rose-600" : "text-gray-600"
                                                )}
                                            >
                                                <span className="text-sm"> &bull; {subItem.title}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-gray-100 text-rose-600 flex items-center justify-center h-16 mt-auto border-t border-gray-200">
                <span className="text-lg font-semibold">Laiba Treders</span>
            </div>
        </div>
    );
};

export default SideNavbar;
