import styles from "./styles.module.scss";
import VerticalPad from "components/ui/VerticalPad.tsx";

const WithoutBankCardModalContent = () => {
    return (
        <div className={styles.withoutBankCardModal}>
            <h2 className={styles.modalHeader}>У мене немає кредитної картки. Чи можу я забронювати номер?</h2>

            <VerticalPad heightPx={16} />

            <p className={styles.description}>Дійсна картка необхідна для гарантії бронювання в більшості помешкань. Ми
                також пропонуємо деякі помешкання, у яких бронювання підтверджують без надання даних картки. Ви також
                можете оформити бронювання за допомогою картки іншої особи (з її дозволу). У такому випадку під час
                бронювання необхідно вказати ім'я та прізвище власника картки в полі "Коментарі" і зазначити, що у вас є
                дозвіл на її використання.</p>
        </div>
    );
};

export default WithoutBankCardModalContent;