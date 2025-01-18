import React from "react";
import { LifeLine } from "react-loading-indicators";

export default function Index() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      
    <LifeLine color={["#33CCCC", "#33CC36", "#B8CC33", "#FCCA00"]} size="medium" text="Carregando..." textColor="#33CC36" />
    </div>
  );
}

