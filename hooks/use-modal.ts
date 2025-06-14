import { useModalContext } from "@/app/_providers/modal-provider"

export const useModal = (key = "default") => {
    const { modals, openModal, closeModal } = useModalContext()

    return {
        isOpen: modals[key],
        openModal: () => openModal(key),
        closeModal: () => closeModal(key),
    }
}
