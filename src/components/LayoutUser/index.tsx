import React from "react";
import Sidebar from "../SiderbarUser";

export default function index({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <div
        className="relative md:flex h-full bg-[#F6FBF9]"
        data-dev-hint="container"
      >
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
