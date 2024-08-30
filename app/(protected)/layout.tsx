import type { Metadata } from "next";
import SideNavbar from "./SideNavbar";
import TopNavbar from "./TopNavBar";

export const metadata: Metadata = {
    title: "Dashboard"
};


const AuthLayout = ({
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

export default AuthLayout