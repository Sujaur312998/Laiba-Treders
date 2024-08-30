import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
      absolute:"",
      default:"Laiba Treders",
      template:"%s | Laiba Treders"
    }
  };

const AuthLayout = ({
    children
}: {
    children: React.ReactNode
}) => {

    return (
        <div className="w-full h-screen bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-sky-500 to-indigo-800">
            <div className="h-full flex items-center justify-center">
                {children}
            </div>
        </div>
    )
}

export default AuthLayout