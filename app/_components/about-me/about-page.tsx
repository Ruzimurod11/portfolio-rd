import Title from "@/components/common/title"
import Image from "next/image"
import Link from "next/link"
import { FaAngleRight } from "react-icons/fa"

export default function AboutPage() {
    return (
        <>
            {/* Title */}
            <div className="relative flex justify-center items-center mb-8 max-sm:mb-6">
                <div className="absolute left-4 text-transparent text-lg font-bold max-lg:text-[#212121]">
                    Men haqimda
                </div>
                <Title title="Men haqimda" />
            </div>

            {/* Content: rasm va matn yonma-yon bo‘lishi uchun bitta flex konteyner ichida bo‘lishi kerak */}
            <div className="flex flex-col md:flex-row items-center gap-10">
                {/* Profile Image */}
                <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg mx-auto md:mx-0">
                    {/* Fire background GIF */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/stars.gif"
                            alt="Fire background"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Profile Image */}
                    <Image
                        src="https://avatars.githubusercontent.com/u/148287289?v=4"
                        alt="Frontend Developer"
                        fill
                        className="object-cover relative z-10 mix-blend-lighten"
                    />
                </div>

                {/* Description */}
                <div className="flex-1 space-y-6">
                    <p className="text-gray-700 text-lg leading-7">
                        Salom! Men{" "}
                        <span className="font-semibold text-purple-600">
                            Frontend Dasturchiman
                        </span>{" "}
                        — foydalanuvchilar uchun qulay, zamonaviy va estetik
                        interfeyslar yaratishga ixtisoslashganman.
                    </p>

                    <p className="text-gray-700 text-lg leading-7">
                        <strong className="text-purple-600">
                            Mening texnologiyalarim:
                        </strong>{" "}
                        React, Next.js, TypeScript, Tailwind CSS, Framer Motion
                    </p>

                    <p className="text-gray-700 text-lg leading-7">
                        Har bir loyiha uchun minimalistik dizayn va maksimal
                        foydalanuvchi tajribasiga e'tibor beraman.
                    </p>

                    {/* Resume & Contact */}
                    <div className="mt-6 flex gap-4 flex-wrap">
                        <Link
                            href="/cv.pdf"
                            target="_blank"
                            className="px-5 py-2.5 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
                        >
                            CV-ni yuklab olish
                        </Link>
                        <Link
                            href="#contact"
                            className="px-5 py-2.5 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition"
                        >
                            Bog‘lanish
                        </Link>
                    </div>
                </div>
            </div>

            {/* Qo‘shimcha ko‘nikmalar — alohida bo‘lim */}
            <div className="bg-purple-50 p-5 rounded-lg shadow-inner mt-16 max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold text-purple-700 mb-3">
                    Qo‘shimcha ko‘nikmalarim
                </h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>
                        <strong>Responsive sayt yaratish:</strong> Har qanday
                        qurilmada mukammal ko‘rinish va ishlash uchun mobil va
                        desktop dizaynlarni yarataman.
                    </li>
                    <li>
                        <strong>Jamoaviy ishlash:</strong> Git va GitHub orqali
                        kodni boshqarish, code review jarayonlarida ishtirok
                        etish, va samarali hamkorlik qilish.
                    </li>
                    <li>
                        <strong>UI/UX dizayn tushunchalari:</strong>{" "}
                        Foydalanuvchi ehtiyojlarini tushunib, qulay va intuitiv
                        interfeyslar yarataman.
                    </li>
                    <li>
                        <strong>Performance optimizatsiyasi:</strong> Sayt
                        tezligini oshirish va resurslarni samarali boshqarishga
                        e'tibor beraman.
                    </li>
                </ul>
            </div>
        </>
    )
}
