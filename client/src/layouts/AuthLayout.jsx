import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="flex h-screen">
            <div className="w-full">
                <div className="h-full flex-center">
                    <Outlet />
                </div>
            </div>

            <div className="hidden lg:flex lg:w-4/3 bg-black text-white">
                <h1 className="text-4xl font-bold">Left Panel</h1>
            </div>

        </div>
    )
}