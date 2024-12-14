import BookingModal from "components/partials/customer/BookingModal/BookingModal.tsx";
import WithoutBankCardModalContent
    from "components/partials/customer/WithoutBankCardModal/WithoutBankCardModalContent.tsx";

interface IWithoutBankCardModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const WithoutBankCardModal = (props: IWithoutBankCardModalProps) => {
    const { isOpen, setIsOpen } = props;

    return (
        <BookingModal isOpen={isOpen} setIsOpen={setIsOpen}>
            <WithoutBankCardModalContent />
        </BookingModal>
    );
};

export default WithoutBankCardModal;