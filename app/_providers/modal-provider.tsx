"use client"

import {
    createContext,
    FC,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
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
    const [mounted, setMounted] = useState(false)
    const [modals, setModals] = useState<Record<string, boolean>>({})
    const [currentPath, setCurrentPath] = useState<string>("")

    useEffect(() => {
        setMounted(true)
        setCurrentPath(window.location.pathname)
    }, [])

    useEffect(() => {
        if (mounted) {
            const pathname = window.location.pathname
            if (currentPath !== pathname) {
                setCurrentPath(pathname)
                setModals({})
            }
        }
    }, [mounted, currentPath])

    const openModal = useCallback((key: string) => {
        setModals((prev) => ({ ...prev, [key]: true }))
    }, [])

    const closeModal = useCallback((key: string) => {
        setModals((prev) => ({ ...prev, [key]: false }))
    }, [])

    if (!mounted) {
        return null
    }

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
