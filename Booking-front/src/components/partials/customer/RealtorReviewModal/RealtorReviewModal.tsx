import Modal from "react-modal";
import styles from "./styles.module.scss";
import VerticalPad from "components/ui/VerticalPad.tsx";
import { useState } from "react";
import { getIconUrl } from "utils/publicAccessor.ts";
import showToast from "utils/toastShow.ts";
import { useCreateRealtorReviewMutation } from "services/realtorReview.ts";

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
    overlay: {
        zIndex: 1000,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
};

interface IRealtorReviewModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;

    realtorId: number;
}

const RealtorReviewModal = (props: IRealtorReviewModalProps) => {
    const { isOpen, setIsOpen, realtorId } = props;

    const close = () => setIsOpen(false);

    const [stars, setStars] = useState<number | undefined>(undefined);
    const [description, setDescription] = useState<string>("");
    const [createRealtorReview, { isLoading }] = useCreateRealtorReviewMutation();

    const setStarByIndex = (index: number) => {
        const newStars = index + 1;

        setStars(stars === newStars ? undefined : newStars);
    };

    const submit = async () => {
        if (!description) {
            showToast("Напишіть коментар", "info");
            return;
        }

        try {
            await createRealtorReview({
                description,
                score: stars,
                realtorId,
            }).unwrap();

            showToast("Відгук успішно надіслано", "success");

            setStars(undefined);
            setDescription("");

            setIsOpen(false);
        } catch (error) {
            showToast("Помилка відправки відгуку", "error");
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={close}
            style={modalStyles}
            ariaHideApp={false}
        >
            <div className={styles.realtorReviewModal}>
                <h2 className={styles.modalHeader}>Поділіться враженнями</h2>

                <VerticalPad heightPx={16} />

                <h3 className={styles.inputTitle}>Рейтинг</h3>
                <div className={styles.starsContainer}>
                    {Array.from({ length: 10 }, (_, i) =>
                        <img key={i} src={getIconUrl(`star/star-${(i < (stars ?? -1)) ? "filled" : "unfilled"}.svg`)}
                             alt="star" onClick={() => setStarByIndex(i)} className="pointer" />)}
                </div>

                <VerticalPad heightPx={16} />

                <h3 className={styles.inputTitle}>Коментар</h3>
                <div className={styles.descriptionInput}>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Текст"
                        maxLength={4000}
                    />
                    <p className={styles.counter}>{description.length}/4000</p>
                </div>

                <VerticalPad heightPx={16} />

                <button className={styles.submitButton} onClick={submit} disabled={isLoading}>Надіслати відгук</button>
            </div>
        </Modal>
    );
};

export default RealtorReviewModal;