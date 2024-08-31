import SideNavbar from "./SideNavbar";
import TopNavbar from "./TopNavBar";
import { usePathname } from 'next/navigation';



const protectedLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div>
            <TopNavbar />
            <div className="flex static">
                <SideNavbar />
                {children}
            </div>
        </div>
    )
}

export default protectedLayout