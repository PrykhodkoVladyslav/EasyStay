import styles from "./styles.module.scss";
import VerticalPad from "components/ui/VerticalPad.tsx";

const ChildrenModalContent = () => {
    return (
        <div className={styles.childrenModal}>
            <h2 className={styles.modalHeader}>Діти та додаткові ліжка</h2>

            <VerticalPad heightPx={16} />

            <h3 className={styles.childrenRules}>Правила розміщення дітей</h3>

            <VerticalPad heightPx={12} />

            <p className={styles.description}>Дозволене проживання для дітей будь-якого віку.</p>

            <VerticalPad heightPx={8} />

            <p className={styles.description}>Це ціна для тієї кількості дорослих, яку ви вибрали під час
                пошуку. Якщо ви подорожуєте з дітьми, додайте їх, щоб побачити точні ціни й інформацію про наявність
                місць.</p>

            <VerticalPad heightPx={22} />

            <h3 className={styles.childrenBedsRules}>Правила про додаткові ліжка й дитячі ліжечка</h3>

            <VerticalPad heightPx={12} />

            <p className={styles.description}>1 дитяче ліжечко доступне за запитом.</p>
        </div>
    );
};

export default ChildrenModalContent;