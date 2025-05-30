import { LOGIN_MODAL } from "@/constants/modal-keys"
import { useModal } from "./use-modal"

export const useLoginModal = () => {
    const { openModal, closeModal, isOpen } = useModal(LOGIN_MODAL)
    return {
        openLoginModal: openModal,
        closeLoginModal: closeModal,
        isLoginOpen: isOpen,
    }
}
