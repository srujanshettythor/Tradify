import { Outlet } from "react-router-dom";
import vcImage from "@/assets/vc.jpg"; // Import the background image

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left Section with Background Image */}
      <div
        className="hidden lg:flex items-center justify-center w-1/2 px-12 bg-cover bg-center"
        style={{ backgroundImage: `url(${vcImage})` }} // Apply background image
      >
        <div className="max-w-md space-y-6 text-center text-white bg-black bg-opacity-50 p-6 rounded-lg">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Rhythm Threads: AI-Powered E-commerce
          </h1>
        </div>
      </div>

      {/* Right Section (Authentication Pages) */}
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
