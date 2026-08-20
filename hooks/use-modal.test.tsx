import { act, renderHook } from "@testing-library/react"
import type { ReactNode } from "react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { ModalProvider, useModalContext } from "@/app/_providers/modal-provider"
import { LOGIN_MODAL } from "@/constants/modal-keys"
import { useLoginModal } from "./use-login-modal"
import { useModal } from "./use-modal"

// ModalProvider derives the current route from usePathname()
const { route } = vi.hoisted(() => ({ route: { current: "/" } }))

vi.mock("next/navigation", () => ({
    usePathname: () => route.current,
}))

const wrapper = ({ children }: { children: ReactNode }) => (
    <ModalProvider>{children}</ModalProvider>
)

beforeEach(() => {
    route.current = "/"
})

describe("useModal", () => {
    it("starts closed", () => {
        const { result } = renderHook(() => useModal("profile"), { wrapper })

        expect(result.current.isOpen).toBeFalsy()
    })

    it("opens and closes the modal for its key", () => {
        const { result } = renderHook(() => useModal("profile"), { wrapper })

        act(() => result.current.openModal())
        expect(result.current.isOpen).toBe(true)

        act(() => result.current.closeModal())
        expect(result.current.isOpen).toBe(false)
    })

    it("keeps different keys independent", () => {
        const { result } = renderHook(
            () => ({
                first: useModal("first"),
                second: useModal("second"),
            }),
            { wrapper },
        )

        act(() => result.current.first.openModal())

        expect(result.current.first.isOpen).toBe(true)
        expect(result.current.second.isOpen).toBeFalsy()
    })

    it("falls back to the \"default\" key", () => {
        const { result } = renderHook(
            () => ({
                implicit: useModal(),
                explicit: useModal("default"),
            }),
            { wrapper },
        )

        act(() => result.current.implicit.openModal())

        expect(result.current.explicit.isOpen).toBe(true)
    })
})

describe("route changes", () => {
    it("closes every open modal when the pathname changes", () => {
        const { result, rerender } = renderHook(() => useModal("profile"), {
            wrapper,
        })

        act(() => result.current.openModal())
        expect(result.current.isOpen).toBe(true)

        route.current = "/works"
        rerender()

        expect(result.current.isOpen).toBeFalsy()
    })
})

describe("useModalContext", () => {
    it("throws when used outside of ModalProvider", () => {
        expect(() => renderHook(() => useModalContext())).toThrow(
            "useModalContext must be used within a ModalProvider",
        )
    })
})

describe("useLoginModal", () => {
    it("is backed by the LOGIN_MODAL key", () => {
        const { result } = renderHook(
            () => ({
                login: useLoginModal(),
                raw: useModal(LOGIN_MODAL),
            }),
            { wrapper },
        )

        act(() => result.current.login.openLoginModal())
        expect(result.current.raw.isOpen).toBe(true)

        act(() => result.current.login.closeLoginModal())
        expect(result.current.login.isLoginOpen).toBe(false)
    })
})
