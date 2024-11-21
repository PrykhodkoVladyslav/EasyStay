import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import styles from "./Styles.module.scss";

const OrderByButton = (props: { orderName: string, onNextOrder: () => void }) => {
    const { orderName, onNextOrder } = props;

    return (
        <button className={styles.OrderByButton} onClick={onNextOrder}>
            <img src={getPublicResourceUrl("icons/order.svg")} alt="order" />
            <p className={styles.OrderTitle}>Сортувати за: <span
                className={styles.OrderName}>{orderName}</span></p>
        </button>
    );
};

export default OrderByButton;