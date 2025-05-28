import AboutMe from "./about-me"
import Banner from "./banner"
import Image from "next/image"
import WorksSwiper from "./works-swiper"

export default function Index() {
    return (
        <div>
            <Banner />

            <div className="w-full mx-auto bg-[#eff3ff] pb-[5.625rem] relative z-10 overflow-hidden max-lg:bg-[#f7f7f7] max-sm:pb-0">
                <Image
                    src="/icons/moon.svg"
                    className="absolute top-[5.25rem] right-0 z-5 max-lg:hidden"
                    width={250}
                    height={250}
                    alt="img"
                />
                <div className="absolute top-[5.188rem] -left-[6.313rem] w-[60.25rem] h-[32.938rem] opacity-10 bg-gradient-to-r from-[#ffc73a] via-[#ff008a] to-[#6100ff] blur-[62px] max-lg:hidden" />

                <div className="absolute top-[3.313rem] -right-[38.75rem] w-[92.5rem] h-[53.5rem] origin-top-left rotate-[7.81deg] opacity-10 bg-gradient-to-r from-[#0019ff] to-[#6ee5c2] blur-[49.50px] max-lg:hidden" />
                {/* <AttractionsDiscount /> */}
                <AboutMe />
            </div>
            <div className="bg-[#E0F0FF] pb-[3.75rem] max-sm:pb-0">
                {/* <ParksSwiper /> */}
                <WorksSwiper />
            </div>
        </div>
    )
}
