"use client"

import Title from "@/components/common/title"
import WorkCard from "./work-card"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { useCallback, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export interface IPark {
    id: string
    name: string
    description: string
    image: string
    href: string
}

const staticWorks: IPark[] = [
    {
        id: "1",
        name: "Posts",
        description: "A ",
        image: "/portfolio2.png",
        href: "https://github.com/Ruzimurod11/react-posts",
    },
    {
        id: "2",
        name: "Pokemon",
        description: "Famous for its stunning sunset views and picnic spots.",
        image: "/portfolio3.png",
        href: "https://github.com/Ruzimurod11/GamePokemon",
    },
    {
        id: "3",
        name: "Users",
        description: "A serene lake with crystal clear water and boat rides.",
        image: "/portfolio4.png",
        href: "https://github.com/Ruzimurod11/random-user",
    },
    {
        id: "4",
        name: "Weather",
        description: "A hilltop park offering hiking trails and scenic views.",
        image: "/portfolio5.png",
        href: "https://github.com/Ruzimurod11/weather",
    },
    {
        id: "5",
        name: "Create users",
        description:
            "A peaceful valley with lush green landscapes and walking trails.",
        image: "/portfolio6.png",
        href: "https://github.com/Ruzimurod11/create-users",
    },
    {
        id: "6",
        name: "Learn english",
        description: "Famous for its stunning sunset views and picnic spots.",
        image: "/portfolio7.png",
        href: "https://github.com/Ruzimurod11/my-little-website",
    },
    {
        id: "7",
        name: "CRUD api",
        description: "A serene lake with crystal clear water and boat rides.",
        image: "/portfolio8.png",
        href: "https://github.com/Ruzimurod11/dummyjson",
    },
    {
        id: "8",
        name: "Flowers",
        description: "A hilltop park offering hiking trails and scenic views.",
        image: "/portfolio9.png",
        href: "https://github.com/Ruzimurod11/Flowers",
    },
    {
        id: "9",
        name: "Cakes",
        description: "A hilltop park offering hiking trails and scenic views.",
        image: "/portfolio1.png",
        href: "https://github.com/Ruzimurod11/tortlar",
    },
]

const Content = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: "start",
            slidesToScroll: 1,
        },
        [Autoplay({ delay: 3000, stopOnInteraction: false })],
    )

    const [selectedIndex, setSelectedIndex] = useState(0)

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        emblaApi.on("select", onSelect)
        onSelect()
    }, [emblaApi, onSelect])
    return (
        <div>
            <div className="relative flex justify-center items-center mb-8 max-sm:mb-6">
                <div className="absolute left-4 text-transparent text-lg font-bold max-lg:text-[#212121]">
                    Ishlarim
                </div>
                <Title title="Ishlarim" />
            </div>

            <div className="overflow-hidden mt-6" ref={emblaRef}>
                <div className="flex">
                    {staticWorks.map((item) => (
                        <div
                            key={item.id}
                            className="flex-[0_0_25%] pr-4 max-lg:flex-[0_0_33%] max-md:flex-[0_0_50%] max-sm:flex-[0_0_75%]"
                        >
                            <WorkCard key={item.id} item={item} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center gap-2 mt-10 max-md:hidden">
                {staticWorks.map((_, index) => (
                    <div
                        key={index}
                        className={cn(
                            "w-[26px] h-[26px] flex items-center justify-center border border-transparent rounded-full",
                            index === selectedIndex && "border-[#810e9d]",
                        )}
                    >
                        <button
                            className={cn(
                                "w-[9px] h-[9px] rounded-full",
                                index === selectedIndex
                                    ? "bg-[#810e9d]"
                                    : "bg-[#e0cae4]",
                            )}
                            onClick={() => emblaApi?.scrollTo(index)}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Content
