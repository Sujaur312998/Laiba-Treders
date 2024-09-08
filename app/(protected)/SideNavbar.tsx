'use client';

import { useState } from 'react';
import { cn } from "@/lib/utils";
import Link from "next/link";
import { TiShoppingCart } from "react-icons/ti";
import { PiWarehouseFill } from "react-icons/pi";
import { MdContactPhone, MdKeyboardArrowRight, MdOutlineSettings } from "react-icons/md";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { SiMaterialformkdocs } from "react-icons/si";
import { usePathname } from 'next/navigation';
import { FaCashRegister } from "react-icons/fa6";
import { GiFarmer } from "react-icons/gi";
import { BiNotepad } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "@/Redux/store";
import { togleSideNavbar } from '@/Redux/slice/navSlice'

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
        title: "Product",
        sublist: [
            { href: '/product/addProduct', title: 'Add Product' },
            { href: '/product/search ', title: 'Search Prooduct' },
        ]
    },
    {
        icon: <FaCashRegister className="m-auto" />,
        href: "/invoice",
        title: "Invoice",
        sublist: [
            { href: '/invoice/new', title: "Create new" },
            { href: '/invoice/search', title: "Search Invoice" },
            { href: "/invoice/update", title: 'Update Invoice' }
        ]
    },
    {
        icon: <GiFarmer className="m-auto" />,
        href: "/customer",
        title: "Customer",
        sublist: [
            { href: "/new", title: "New Customer" },
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
    const dispatch = useAppDispatch()
    const pathname = usePathname();
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

    const handleToggle = (href: string) => {
        setExpanded(prev => ({
            ...prev,
            [href]: !prev[href]
        }));
    };
    const toggle_side_navbar = useAppSelector((state) => state.navState.toggle_side_navbar);
    const toogle_top_navbar = useAppSelector((state) => state.navState.toogle_top_navbar);

    return (
        <div className={
            cn(
                'fixed top-20 h-screen bg-gray-100 transition-all duration-300 ease-in-out z-50  ',
                toogle_top_navbar ? "w-0 " : toggle_side_navbar ? 'translate-x-0 w-60' : 'translate-x-0 md:w-16 w-0'
            )
        }>
            <div className=' p-3 flex-grow h-[90%] overflow-y-auto flex flex-col' >
                <ul className="" >
                    {
                        sideNavData.map((item, index) => (
                            <li key={index} className="my-2">
                                <div
                                    className={
                                        cn(
                                            "relative flex items-center p-3 rounded-lg transition-colors duration-300 ease-in-out hover:bg-gray-200 hover:text-rose-600 cursor-pointer",
                                            pathname === item.href && toggle_side_navbar ? "bg-gray-200 text-rose-600 border-l-4 border-rose-600" : ""
                                        )
                                    }
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        item.sublist && handleToggle(item.href)
                                        dispatch(togleSideNavbar(true))
                                    }} // Ensure toggle happens on click 
                                >
                                    <Link href={item.href} className="flex w-full items-center">
                                        <span className={
                                            cn(
                                                "flex-shrink-0 transition-all duration-300", // Ensure smooth icon size transition
                                                toggle_side_navbar ? "w-8" : "w-0"
                                            )
                                        }>
                                            {item.icon}
                                        </span>
                                        {
                                            toggle_side_navbar && (
                                                <span
                                                    className={cn(
                                                        "ml-2 transition-all duration-300 text-md",
                                                        toggle_side_navbar ? "opacity-100" : "opacity-0" // Adjusted opacity transition
                                                    )}
                                                >
                                                    {item.title}
                                                </span>
                                            )
                                        }
                                    </Link>

                                    {
                                        item.sublist && toggle_side_navbar && (
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
                                                <MdKeyboardArrowRight className="hover:text-rose-600 transition-transform duration-300 ease-in-out" />
                                            </button>
                                        )
                                    }
                                </div>
                                {
                                    toggle_side_navbar && item.sublist && expanded[item.href] && (
                                        <ul className="pl-10 mt-1 ">
                                            {
                                                item.sublist.map((subItem, subIndex) => (
                                                    <li key={subIndex}>
                                                        <Link
                                                            href={subItem.href}
                                                            className={cn(
                                                                "flex items-center space-x-4 p-2 rounded-lg transition-colors duration-300 ease-in-out hover:bg-white my-1 hover:text-rose-800",
                                                                pathname === subItem.href ? "bg-white text-rose-800" : "text-gray-600"
                                                            )}
                                                        >
                                                            <span className="text-sm"> &bull; {subItem.title}</span>
                                                        </Link>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    )
                                }
                            </li>
                        ))
                    }
                </ul>
            </div>

        </div>

    );
};

export default SideNavbar;
