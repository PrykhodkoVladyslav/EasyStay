import BookingModal from "components/partials/customer/BookingModal/BookingModal.tsx";
import PaymentModalContent from "components/partials/customer/PaymentModal/PaymentModalContent.tsx";

interface IPaymentModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const PaymentModal = (props: IPaymentModalProps) => {
    const { isOpen, setIsOpen } = props;

    return (
        <BookingModal isOpen={isOpen} setIsOpen={setIsOpen}>
            <PaymentModalContent />
        </BookingModal>
    );
};

export default PaymentModal;