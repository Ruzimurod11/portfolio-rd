import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { getReq } from "./getReq"

describe("getReq", () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it("resolves with the exact data it was given", async () => {
        const data = { id: 1, name: "Posts" }
        const promise = getReq(data)

        await vi.advanceTimersByTimeAsync(500)

        await expect(promise).resolves.toBe(data)
    })

    it("does not resolve before the default 500ms delay", async () => {
        const onResolve = vi.fn()
        getReq("response").then(onResolve)

        await vi.advanceTimersByTimeAsync(499)
        expect(onResolve).not.toHaveBeenCalled()

        await vi.advanceTimersByTimeAsync(1)
        expect(onResolve).toHaveBeenCalledWith("response")
    })

    it("honours a custom delay", async () => {
        const onResolve = vi.fn()
        getReq([1, 2, 3], 2000).then(onResolve)

        await vi.advanceTimersByTimeAsync(1999)
        expect(onResolve).not.toHaveBeenCalled()

        await vi.advanceTimersByTimeAsync(1)
        expect(onResolve).toHaveBeenCalledWith([1, 2, 3])
    })
})
