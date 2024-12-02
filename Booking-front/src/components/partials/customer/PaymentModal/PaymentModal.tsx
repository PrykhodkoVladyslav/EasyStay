import BookingModal from "components/partials/customer/BookingModal/BookingModal.tsx";
import styles from "./styles.module.scss";
import VerticalPad from "components/ui/VerticalPad.tsx";
import { getIconUrl } from "utils/publicAccessor.ts";

interface IPaymentModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const PaymentModal = (props: IPaymentModalProps) => {
    const { isOpen, setIsOpen } = props;

    return (
        <BookingModal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className={styles.paymentModal}>
                <h2 className={styles.modalHeader}>Скасування бронювання</h2>

                <VerticalPad heightPx={16} />

                <div className={styles.returnContainer}>
                    <div className={styles.returnItem}>
                        <img src={getIconUrl("dot/dot.svg")} alt="dot" className={styles.dot} />
                        <p className={styles.returnText}>Вартість не повертається</p>
                    </div>

                    <p className={styles.returnDescription}>Зверніть увагу: при скасуванні або зміні бронювання, а також
                        у випадку незаїзду, стягується повна вартість бронювання.</p>
                </div>

                <VerticalPad heightPx={22} />

                <h2 className={styles.prepayment}>Передоплата</h2>

                <VerticalPad heightPx={8} />

                <p className={styles.prepaymentDescription}>Передоплату в розмірі повної вартості бронювання буде
                    списано в будь-який час.</p>
            </div>
        </BookingModal>
    );
};

export default PaymentModal;