import React from 'react'
import Image from 'next/image'
import { Raleway} from "next/font/google";
const raleway = Raleway({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

function index({title, svg = false, qtForm} : {title: string, svg?: string | boolean, qtForm?: number}) {
  return (
    <div className={`bg-gray w-[200px] h-[200px] rounded-[10px] gap-y-4 flex flex-col items-center`}>
            <span className={`${raleway.className} mt-5 text-lg font-normal text-black`}>{title}</span>

            {svg ? (
              <Image src={`/${svg}.svg`} width={96} height={96} alt='user' />
            ): (
              <span className={`${raleway.className} text-5xl font-normal text-black mt-4`}>{qtForm}</span>
            )}

    </div>
  )
}

export default index