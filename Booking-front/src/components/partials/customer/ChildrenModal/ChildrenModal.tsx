import BookingModal from "components/partials/customer/BookingModal/BookingModal.tsx";
import ChildrenModalContent from "components/partials/customer/ChildrenModal/ChildrenModalContent.tsx";

interface IChildrenModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const ChildrenModal = (props: IChildrenModalProps) => {
    const { isOpen, setIsOpen } = props;

    return (
        <BookingModal isOpen={isOpen} setIsOpen={setIsOpen}>
            <ChildrenModalContent />
        </BookingModal>
    );
};

export default ChildrenModal;