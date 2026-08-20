import { existsSync, readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"
import { languages } from "@/constants/options"
import type { Language } from "@/types/lang"

const root = process.cwd()

const readMessages = (locale: string): Record<string, string> =>
    JSON.parse(readFileSync(`${root}/messages/${locale}.json`, "utf8"))

// `constants/options.ts` and `types/lang` must describe the same set of locales.
type LanguageValue = (typeof languages)[number]["value"]
type Equal<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false
type _LanguagesMatchUnion = Equal<Language, LanguageValue> extends true
    ? true
    : never

describe("i18n messages", () => {
    it("has a message file for every configured language", () => {
        for (const { value } of languages) {
            expect(
                existsSync(`${root}/messages/${value}.json`),
                `messages/${value}.json is missing`,
            ).toBe(true)
        }
    })

    it("keeps the same key set across all languages", () => {
        const [base, ...rest] = languages
        const baseKeys = Object.keys(readMessages(base.value)).sort()

        for (const { value } of rest) {
            const keys = Object.keys(readMessages(value)).sort()

            const missing = baseKeys.filter((k) => !keys.includes(k))
            const extra = keys.filter((k) => !baseKeys.includes(k))

            expect(
                missing,
                `keys missing from messages/${value}.json`,
            ).toEqual([])
            expect(extra, `extra keys in messages/${value}.json`).toEqual([])
        }
    })

    it("has no empty translation values", () => {
        for (const { value } of languages) {
            const messages = readMessages(value)

            const empty = Object.entries(messages)
                .filter(([, text]) => String(text).trim() === "")
                .map(([key]) => key)

            expect(empty, `empty values in messages/${value}.json`).toEqual([])
        }
    })

    it("ships the flag icon referenced by every language", () => {
        for (const { value, scr } of languages) {
            expect(
                existsSync(`${root}/public${scr}`),
                `${scr} for "${value}" is missing`,
            ).toBe(true)
        }
    })

    it("keeps uz as the first (default) language", () => {
        // i18n/request.ts falls back to languages[0] when no cookie is set
        expect(languages[0].value).toBe("uz")
    })
})
