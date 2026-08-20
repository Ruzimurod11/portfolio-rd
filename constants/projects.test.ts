import { existsSync } from "node:fs"
import { describe, expect, it } from "vitest"
import uz from "@/messages/uz.json"
import { featuredProjects, projects } from "./projects"

const root = process.cwd()

describe("projects", () => {
    it("ships the screenshot referenced by every project", () => {
        for (const { slug, image } of projects) {
            expect(
                existsSync(`${root}/public${image}`),
                `${image} for "${slug}" is missing`,
            ).toBe(true)
        }
    })

    it("has a translation for every description key", () => {
        for (const { slug, descriptionKey } of projects) {
            expect(
                Object.keys(uz),
                `${descriptionKey} for "${slug}" is missing from messages`,
            ).toContain(descriptionKey)
        }
    })

    it("points every project at a repo and a live demo", () => {
        for (const { slug, repo, demo } of projects) {
            expect(repo, slug).toMatch(/^https:\/\/github\.com\/Ruzimurod11\//)
            expect(demo, slug).toMatch(/^https:\/\//)
        }
    })

    it("uses unique slugs", () => {
        const slugs = projects.map((project) => project.slug)
        expect(new Set(slugs).size).toBe(slugs.length)
    })

    it("features exactly the projects flagged as featured", () => {
        expect(featuredProjects).toEqual(
            projects.filter((project) => project.featured),
        )
        expect(featuredProjects.length).toBeGreaterThan(0)
    })
})
