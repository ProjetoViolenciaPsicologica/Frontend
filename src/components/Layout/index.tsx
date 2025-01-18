import React, { useState } from "react";
import { Quicksand } from "next/font/google";
import Sidebar from "@/components/Sidebar";
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
      <Sidebar />
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
<div className="">  {/* Garantir que o conteúdo rola */}
    <div className="w-ful">
      <div
        className={`flex w-full flex-col items-center justify-center pl-4 ${
          trigger && op && "md:w-[85%]"
        }`}
      >
        {children}
      </div>
    </div>
  
</div>
</div>

    </div>
  </SidebarProvider>
  );
}