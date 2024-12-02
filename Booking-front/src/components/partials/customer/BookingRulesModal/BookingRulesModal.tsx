import ChildrenModalContent from "components/partials/customer/ChildrenModal/ChildrenModalContent.tsx";
import BookingModal from "components/partials/customer/BookingModal/BookingModal.tsx";
import PaymentModalContent from "components/partials/customer/PaymentModal/PaymentModalContent.tsx";
import VerticalPad from "components/ui/VerticalPad.tsx";

interface IBookingRulesModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const BookingRulesModal = (props: IBookingRulesModalProps) => {
    const { isOpen, setIsOpen } = props;

    return (
        <BookingModal isOpen={isOpen} setIsOpen={setIsOpen}>
            <PaymentModalContent />
            <VerticalPad heightPx={34} />
            <ChildrenModalContent />
        </BookingModal>
    );
};

export default BookingRulesModal;