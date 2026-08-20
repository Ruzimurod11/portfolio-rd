import { describe, expect, it } from "vitest"
import { cn } from "./utils"

describe("cn", () => {
    it("joins multiple class names into one string", () => {
        expect(cn("flex", "items-center")).toBe("flex items-center")
    })

    it("keeps the last of conflicting tailwind classes", () => {
        expect(cn("px-2", "px-4")).toBe("px-4")
        expect(cn("text-sm text-red-500", "text-lg")).toBe(
            "text-red-500 text-lg",
        )
    })

    it("drops falsy values", () => {
        expect(cn("flex", false, null, undefined, "", "gap-2")).toBe(
            "flex gap-2",
        )
    })

    it("supports array and conditional object syntax", () => {
        const isActive = true
        const isDisabled = false

        expect(
            cn(["rounded", "border"], {
                "bg-accent": isActive,
                "opacity-50": isDisabled,
            }),
        ).toBe("rounded border bg-accent")
    })

    it("returns an empty string when given nothing", () => {
        expect(cn()).toBe("")
    })
})
