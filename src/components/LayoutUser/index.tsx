import React from "react";
import Sidebar from "../SiderbarUser";

export default function index({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen">
      <div
        className="relative min-h-screen w-full md:flex"
        data-dev-hint="container"
      >
        <Sidebar />
        {children}
      </div>
    </div>
  );
}