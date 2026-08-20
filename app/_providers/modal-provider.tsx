"use client"

import { usePathname } from "next/navigation"
import {
    createContext,
    FC,
    ReactNode,
    useCallback,
    useContext,
    useState,
} from "react"

// Define the context interface
interface ModalContextType {
    modals: Record<string, boolean>
    openModal: (key: string) => void
    closeModal: (key: string) => void
}

// Create the context
const ModalContext = createContext<ModalContextType | undefined>(undefined)

// Client-side modal content component
const ModalProviderContent: FC<{ children: ReactNode }> = ({ children }) => {
    const pathname = usePathname()
    const [modals, setModals] = useState<Record<string, boolean>>({})
    const [currentPath, setCurrentPath] = useState(pathname)

    // Close every modal when the route changes. Adjusting the state during
    // render (instead of in an effect) keeps this off the cascading-render
    // path and, unlike reading window.location, actually reacts to navigation.
    if (currentPath !== pathname) {
        setCurrentPath(pathname)
        setModals({})
    }

    const openModal = useCallback((key: string) => {
        setModals((prev) => ({ ...prev, [key]: true }))
    }, [])

    const closeModal = useCallback((key: string) => {
        setModals((prev) => ({ ...prev, [key]: false }))
    }, [])

    return (
        <ModalContext.Provider value={{ modals, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    )
}

// Main provider component
export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return <ModalProviderContent>{children}</ModalProviderContent>
}

export const useModalContext = () => {
    const context = useContext(ModalContext)
    if (!context) {
        throw new Error("useModalContext must be used within a ModalProvider")
    }
    return context
}
