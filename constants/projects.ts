export interface IProject {
    slug: string
    name: string
    /** key in messages/*.json */
    descriptionKey: string
    image: string
    repo: string
    demo: string
    /** languages/libraries the repo actually uses */
    tech: string[]
    featured?: boolean
}

export const projects: IProject[] = [
    {
        slug: "west-burger",
        name: "West Burger",
        descriptionKey: "projectWestBurgerDesc",
        image: "/west-burger.png",
        repo: "https://github.com/Ruzimurod11/west-burger",
        demo: "https://westburger.uz",
        tech: [
            "Next.js",
            "TypeScript",
            "next-intl",
            "TanStack Query",
            "Tailwind",
        ],
        featured: true,
    },
    {
        slug: "inexlynk",
        name: "iNEXLYNK",
        descriptionKey: "projectInexlynkDesc",
        image: "/inexlynk.png",
        repo: "https://github.com/Ruzimurod11/inexlynk",
        demo: "https://inexlynk.com",
        tech: [
            "Next.js",
            "TypeScript",
            "next-intl",
            "TanStack Query",
            "Tailwind",
        ],
        featured: true,
    },
    {
        slug: "bright-gallery",
        name: "Bright Gallery",
        descriptionKey: "projectBrightGalleryDesc",
        image: "/bright-gallery.png",
        repo: "https://github.com/Ruzimurod11/bright-gallery-front",
        demo: "https://brightgalleryuz.com/ru",
        tech: [
            "Next.js",
            "TypeScript",
            "next-intl",
            "Swiper",
            "Framer Motion",
            "Tailwind",
        ],
        featured: true,
    },
    {
        slug: "my-cargo",
        name: "MyCargo",
        descriptionKey: "projectMyCargoDesc",
        image: "/my-cargo.png",
        repo: "https://github.com/Ruzimurod11/upgrow-my_cargo",
        demo: "https://my-cargo.uz",
        tech: ["React", "TypeScript", "Vite", "TanStack Query", "Tailwind"],
        featured: true,
    },
    {
        slug: "donatone",
        name: "Donatone",
        descriptionKey: "projectDonatoneDesc",
        image: "/donatone.png",
        repo: "https://github.com/Ruzimurod11/donatone-front",
        demo: "https://donatone.uz",
        tech: [
            "React",
            "TypeScript",
            "Vite",
            "TanStack Router",
            "TanStack Query",
            "Tailwind",
        ],
        featured: true,
    },
    {
        slug: "genfin",
        name: "GenFin",
        descriptionKey: "projectGenfinDesc",
        image: "/genfin.png",
        repo: "https://github.com/Ruzimurod11/upgrow-genFin",
        demo: "https://genfin.uz",
        tech: [
            "React",
            "TypeScript",
            "Vite",
            "TanStack Router",
            "TanStack Query",
            "i18next",
            "Tailwind",
        ],
        featured: true,
    },
    {
        slug: "dummyjson",
        name: "CRUD API",
        descriptionKey: "projectCrudDesc",
        image: "/portfolio8.png",
        repo: "https://github.com/Ruzimurod11/dummyjson",
        demo: "https://dummy-rd.netlify.app/",
        tech: ["React", "TypeScript", "TanStack Query", "Tailwind", "Zustand"],
    },
    {
        slug: "tortlar",
        name: "Cakes",
        descriptionKey: "projectCakesDesc",
        image: "/portfolio1.png",
        repo: "https://github.com/Ruzimurod11/tortlar",
        demo: "https://tortchi.netlify.app/",
        tech: ["React", "TypeScript", "Redux Toolkit", "Sass"],
    },
    {
        slug: "game-pokemon",
        name: "Pokemon",
        descriptionKey: "projectPokemonDesc",
        image: "/portfolio3.png",
        repo: "https://github.com/Ruzimurod11/GamePokemon",
        demo: "https://gamepokemon-rd.netlify.app/",
        tech: ["JavaScript", "CSS", "HTML"],
    },
    {
        slug: "learn-english",
        name: "Learn English",
        descriptionKey: "projectLearnEnglishDesc",
        image: "/portfolio7.png",
        repo: "https://github.com/Ruzimurod11/my-little-website",
        demo: "https://learn-words-rd.netlify.app/",
        tech: ["JavaScript", "SCSS", "HTML"],
    },
    {
        slug: "weather",
        name: "Weather",
        descriptionKey: "projectWeatherDesc",
        image: "/portfolio5.png",
        repo: "https://github.com/Ruzimurod11/weather",
        demo: "https://ruzimurod11.github.io/weather/",
        tech: ["JavaScript", "CSS", "HTML"],
    },
]

export const featuredProjects = projects.filter((project) => project.featured)
