import "@testing-library/jest-dom/vitest"

import { cleanup } from "@testing-library/react"
import { afterEach, vi } from "vitest"

afterEach(() => {
    cleanup()
})

// jsdom does not implement these, but framer-motion (whileInView), embla-carousel
// and the radix dropdown all blow up on render without them.
class NoopObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
        return []
    }
}

vi.stubGlobal("IntersectionObserver", NoopObserver)
vi.stubGlobal("ResizeObserver", NoopObserver)

Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
    }),
})

// @smastrom/react-rating measures its star SVG on mount; jsdom has no SVG layout.
Object.defineProperty(SVGElement.prototype, "getBBox", {
    writable: true,
    value: () => ({ x: 0, y: 0, width: 0, height: 0 }),
})

// next/image forwards next-only props such as `fill` / `priority` to the DOM in
// jsdom and warns about them — a plain <img> is enough for tests.
vi.mock("next/image", () => ({
    __esModule: true,
    default: ({
        src,
        alt,
        // next-only props that must not reach the DOM
        fill: _fill,
        priority: _priority,
        quality: _quality,
        placeholder: _placeholder,
        blurDataURL: _blurDataURL,
        loader: _loader,
        unoptimized: _unoptimized,
        ...rest
    }: Record<string, unknown> & { src: string; alt: string }) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} {...rest} />
    ),
}))
