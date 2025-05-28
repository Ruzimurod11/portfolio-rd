"use client"

import Image from "next/image"
import { useState, useEffect, useRef, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"

const banners = [
    {
        id: 1,
        name: "Professional IT Specialist",
        image: "https://www.run-it.com.ua/wp-content/uploads/2024/11/maxresdefault-15-1024x576.jpg",
        link: "https://example.com/1",
    },
    {
        id: 2,
        name: "Creative Workspace",
        image: "https://miro.medium.com/v2/resize:fit:1400/1*LwZpgio326_WbRR15mVm8Q.png",
        link: "https://example.com/2",
    },
    {
        id: 3,
        name: "Creative Workspace",
        image: "https://media.geeksforgeeks.org/wp-content/uploads/20240423152334/front-end-developer-skill-copy.webp",
        link: "https://example.com/2",
    },
]

const HeroSwiper = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
    const [selectedIndex, setSelectedIndex] = useState(0)

    const autoplayRef = useRef<NodeJS.Timeout | null>(null)

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    // Auto-play every 3 seconds
    useEffect(() => {
        autoplayRef.current = setInterval(() => {
            scrollNext()
        }, 4000)

        return () => {
            if (autoplayRef.current) clearInterval(autoplayRef.current)
        }
    }, [scrollNext])

    // Update selected index
    useEffect(() => {
        if (!emblaApi) return

        const onSelect = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap())
        }

        emblaApi.on("select", onSelect)
        onSelect()
    }, [emblaApi])

    return (
        <div className="relative w-full h-[clamp(343px,45vw,688px)]">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {banners.map((item) => (
                        <div
                            className="flex-[0_0_100%] relative h-[clamp(343px,45vw,688px)]"
                            key={item.id}
                        >
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            {/* Slide controls */}
            <div className="absolute top-1/2 transform -translate-y-1/2 left-0 right-0 flex justify-between px-6 text-white max-lg:hidden">
                <button
                    onClick={scrollPrev}
                    className="text-[#526882] p-2.5 bg-white rounded-full hover:opacity-80 transition"
                >
                    <FaAngleLeft size={20} />
                </button>
                <button
                    onClick={scrollNext}
                    className="text-[#526882] p-2.5 bg-white rounded-full hover:opacity-80 transition"
                >
                    <FaAngleRight size={20} />
                </button>
            </div>

            {/* Slide indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-lg font-medium">
                {selectedIndex + 1} / {banners.length}
            </div>
        </div>
    )
}

export default HeroSwiper
