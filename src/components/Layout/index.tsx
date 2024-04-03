import React from "react";
import Sidebar from "../Sidebar";

export default function index({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full ">
      <div
        className="relative md:flex bg-[#F6FBF9]"
        data-dev-hint="container"
      >
        <Sidebar />
        {children}
      </div>
    </div>
  );
}