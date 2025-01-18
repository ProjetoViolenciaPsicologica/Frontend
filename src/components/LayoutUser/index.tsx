import React, { useState } from "react";
import { Quicksand } from "next/font/google";
import SidebarUser from "../SiderbarUser";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";

const quicksand = Quicksand({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

export type TitleType = {
  title: string;
  description?: string;
  children?: React.ReactNode;
  rollback?: boolean;
  op?: boolean;
};

export default function Index({
  children,
  title,
  description,
  op = false,
}: TitleType) {
  const [trigger, setTrigger] = useState(true);
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <SidebarUser />
        <div className="w-full flex-1">
  <div className="bg-white top-0 w-full border-b border-[#E0D8C5]">
    <div className="flex items-center px-4 py-1 bg-gray md:bg-white text-black">
      <SidebarTrigger
        className="text-gray-100 md:text-green-bg"
        setTriggered={setTrigger}
        triggered={trigger}
      />
      <div className="ml-6">
        <h1
          className={`${quicksand.className} text-xl font-semibold leading-[37.57px] text-gray-100 md:text-green-bg `}
        >
          {title}
        </h1>
        {description && <p className="text-sm text-[#7F8C8D]">{description}</p>}
      </div>
    </div>
  </div>
  <div className="overflow-y-auto flex-1">  {/* Garantir que o conteúdo rola */}
    {!op && (
      <div className="w-full">
        <div
          className={`flex h-full w-full flex-col items-center justify-center pl-4 ${
            trigger && op && "md:w-[85%]"
          } md:pl-10`}
        >
          {children}
        </div>
      </div>
    )}
    {op && (
      <div className={`${trigger ? "w-full" : "w-screen"}`}>
        <div
          className={`flex h-full w-full flex-col items-center justify-center pl-4 ${
            trigger && op && "md:w-[85%]"
          } md:pl-10`}
        >
          {children}
        </div>
      </div>
    )}
  </div>
</div>

      </div>
    </SidebarProvider>
  );
}