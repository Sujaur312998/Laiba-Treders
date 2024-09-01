'use client';
import SideNavbar from "./SideNavbar";
import TopNavbar from "./TopNavBar";
import { usePathname } from 'next/navigation';
import { FaAngleRight, FaArrowCircleRight } from "react-icons/fa";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {
    const pathname = usePathname();
    const pathSegments = pathname?.split("/").filter(Boolean); // Remove empty segments

    return (
        <div className="select-none">
            <TopNavbar />
            <div className="flex">
                <SideNavbar />
                <div className="flex-1 p-4">
                    <div className="flex items-center space-x-2 mb-4 gap-10">
                        <span className="flex items-center text-rose-600 font-semibold capitalize">
                            <FaArrowCircleRight className="text-xl mr-2" />
                            {pathSegments && pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : "Home"}
                        </span>
                        <div className="flex text-gray-400 ">
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
