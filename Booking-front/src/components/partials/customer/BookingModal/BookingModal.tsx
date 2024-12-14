import React from "react";
import { getIconUrl } from "utils/publicAccessor.ts";
import Modal from "react-modal";
import styles from "./styles.module.scss";

const modalStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        padding: "24px 26px",
        borderRadius: "22px",
        boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.25)",
        background: "rgb(255, 255, 255)",
    },
};

interface IBookingModalProps {
    children?: React.ReactNode;

    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const BookingModal = (props: IBookingModalProps) => {
    const { children, isOpen, setIsOpen } = props;

    const close = () => setIsOpen(false);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={close}
            style={modalStyles}
            ariaHideApp={false}
        >
            <img src={getIconUrl("cross/cross.svg")} alt="cross" className={`pointer ${styles.cross}`}
                 onClick={close} />
            <div className={styles.contentContainer}>
                {children}
            </div>
        </Modal>
    );
};

export default BookingModal;