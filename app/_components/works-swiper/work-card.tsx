import Rating from "@/components/common/rating"
import Image from "next/image"
import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"

export interface IWork {
    id: string
    name: string
    description: string
    image: string
    href: string
}

export default function WorkCard({ item }: { item: IWork }) {
    return (
        <Link
            href={item.href}
            className="p-3 flex bg-[#ffffff] flex-col items-center w-[clamp(164px,20vw,auto)] rounded-3xl shadow-[0px_3px_10px_0px_#D5D5D540] max-md:p-2.5"
        >
            <div className="relative w-[clamp(18rem,18vw,19rem)] h-[clamp(15rem,16vw,18rem)] bg-white flex items-center justify-center rounded-t-[10px] overflow-hidden">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-[10px]"
                />
            </div>

            <div className="w-full px-[clamp(8px,2vw,16px)] py-[clamp(12px,2vw,24px)] bg-[#ffffff] rounded-b-[10px] border-t border-[#f1f2f4]">
                <p className="self-stretch justify-start text-[#212121] text-2xl font-semibold  leading-9 max-sm:font-medium max-sm:text-[15px] lg:hidden">
                    {item.name}
                </p>
                <div className="flex gap-2.5 items-center">
                    <Rating value={0} size={"small"} readOnly={true} max={5} />
                    <p className="text-[#33373e] text-base font-semibold  leading-normal">
                        {0} ({0})
                    </p>
                </div>
                <p className="mt-4 self-stretch justify-start text-[#212121] text-2xl font-semibold  leading-9 max-sm:font-medium max-sm:text-[15px] max-lg:hidden">
                    {item.name}
                </p>
                <div className="mt-6 flex items-center justify-between max-sm:mt-4">
                    <div>
                        <p className="justify-start text-[#53575e] text-[15px] font-medium  leading-snug max-sm:text-xs max-sm:leading-[18px]">
                            34
                        </p>
                    </div>
                    <button className="p-[9px] bg-[#83109f] rounded-full">
                        <FiArrowUpRight size={24} color="#ffffff" />
                    </button>
                </div>
            </div>
        </Link>
    )
}
