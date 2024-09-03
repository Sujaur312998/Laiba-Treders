'use client';
import { useSelector } from "react-redux";
import SideNavbar from "./SideNavbar";
import TopNavbar from "./TopNavBar";
import { usePathname } from 'next/navigation';
import { FaAngleRight, FaArrowCircleRight } from "react-icons/fa";
import type { RootState } from '@/app/store'
import { cn } from "@/lib/utils";
import { IoHome  } from "react-icons/io5";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {
    const pathname = usePathname();
    const pathSegments = pathname?.split("/") // Remove empty segments

    const toogle_top_navbar = useSelector((state: RootState) => state.navSlice.toogle_top_navbar)
    const toggle_side_navbar = useSelector((state: RootState) => state.navSlice.toggle_side_navbar)

    return (
        <div className="select-none relative">
            <TopNavbar />
            <div className="flex   ">
                <SideNavbar />


                <div className={
                    cn("flex-1 p-4 absolute top-20 transition-all duration-500", toogle_top_navbar ? "left-0" : toggle_side_navbar ? 'left-60' : 'left-20')
                }>
                    <div className="flex items-center space-x-2 mb-4 gap-10 ">
                        <span className="flex items-center text-rose-600 font-semibold capitalize">
                            <FaArrowCircleRight className="text-xl mr-2" />
                            {pathSegments && pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : "Home"}
                        </span>
                        <div className="flex text-gray-400 ">
                            <IoHome  className="m-auto" />
                            {pathSegments?.map((item, index) => (
                                <div key={index} className='flex items-center'>
                                    <span className="font-mono text-base capitalize ">
                                        {item}
                                    </span>
                                    {
                                        index < pathSegments.length - 1 && (
                                            <FaAngleRight className="m-auto" />
                                        )
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default ProtectedLayout;
