import { getIconUrl } from "utils/publicAccessor.ts";
import { useCreateBankCardMutation, useDeleteBankCardMutation, useGetAllBankCardsQuery } from "services/bankCard.ts";
import { format } from "date-fns";
import showToast from "utils/toastShow.ts";
import { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import "./../../css/bank-card-info-container.scss";
import ICreateBankCardRequest from "interfaces/bankCard/ICreateBankCardRequest.ts";
import { instantScrollToTop } from "utils/scrollToTop.ts";
import {
    ActivePageOnHeaderContext,
} from "components/contexts/ActivePageOnHeaderProvider/ActivePageOnHeaderProvider.tsx";

const modalStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "12px",
        borderColor: "rgb(229, 231, 235)",
    },
};

const PaymentDataPage = () => {
    useEffect(instantScrollToTop, []);

    const activeMenuItemContext = useContext(ActivePageOnHeaderContext);
    useEffect(() => {
        activeMenuItemContext?.setActivePage("payment");
    }, []);

    const [isOpenAddCardModal, setIsOpenAddCardModal] = useState(false);

    const { data: bankCardsData } = useGetAllBankCardsQuery();
    const [deleteCard, { isLoading }] = useDeleteBankCardMutation();

    const deleteCardHandler = (id: number) => {
        deleteCard(id).unwrap()
            .then(() => showToast("Успішно видалено!", "success"))
            .catch(e => console.log(e));
    };

    function getPaymentSystem(cardNumber: string) {
        const bin = cardNumber.slice(0, 6);

        if (/^4/.test(bin)) return "Visa";
        if (/^5[1-5]/.test(bin) || /^2[2-7]/.test(bin)) return "MasterCard";
        if (/^3[47]/.test(bin)) return "American Express";
        if (/^6(?:011|5|4[4-9]|22)/.test(bin)) return "Discover";
        if (/^3[689]/.test(bin)) return "Diners Club";
        if (/^35(2[89]|[3-8])/.test(bin)) return "JCB";
        if (/^62/.test(bin)) return "UnionPay";

        return "Unknown";
    }

    function getCardIconPath(cardNumber: string) {
        switch (getPaymentSystem(cardNumber)) {
            case "Visa":
                return "bankCard/visa.svg";
            case "MasterCard":
                return "bankCard/mastercard.svg";
            default:
                return "bankCard/other.svg";
        }
    }

    function getCardIcon(cardNumber: string) {
        return getIconUrl(getCardIconPath(cardNumber));
    }

    const [holderName, setHolderName] = useState<string>("");
    const [cardNumber, setCardNumber] = useState<string>("");
    const [expiryDate, setExpiryDate] = useState<string>("");
    const [cvc, setCvc] = useState<string>("");

    const [createBankCard, { isLoading: isCreating }] = useCreateBankCardMutation();

    const onAddCardClick = () => {
        if (!holderName) {
            showToast("Введіть повне ім'я власника банківської карти", "warning");
            return;
        }

        if (cardNumber.length !== 16) {
            showToast("Введіть номер картки", "warning");
            return;
        }

        if (expiryDate.length !== 5) {
            showToast("Введіть термін дії картки", "warning");
            return;
        }

        if (cvc.length !== 3) {
            showToast("Введіть CVC код", "warning");
            return;
        }

        const [month, year] = expiryDate.split("/");

        const createCardRequest = {
            ownerFullName: holderName,
            number: cardNumber,
            cvv: cvc,
            expirationDate: `20${year.padStart(2, "0")}-${month.padStart(2, "0")}-01`,
        } as ICreateBankCardRequest;

        createBankCard(createCardRequest).unwrap()
            .then(() => {
                setHolderName("");
                setCardNumber("");
                setExpiryDate("");
                setCvc("");

                setIsOpenAddCardModal(false);
                showToast("Успішно додано!", "success");
            })
            .catch(() => {
                showToast("Некоректні дані картки", "error");
            });
    };

    return (
        <div className="payment-container">
            <Modal
                style={modalStyles}
                isOpen={isOpenAddCardModal}
                onRequestClose={() => setIsOpenAddCardModal(false)}
            >
                <div className="bank-card-info-container">
                    <div className="input-container">
                        <p className="input-title">Імʼя власника картки <sup>*</sup></p>
                        <input className="input-input"
                               placeholder="Іваненко Іван Іванович"
                               type="text"
                               value={holderName}
                               onChange={e => setHolderName(e.target.value)}
                               maxLength={100}
                        />
                    </div>

                    <div className="input-container">
                        <p className="input-title">Номер картки <sup>*</sup></p>
                        <input className="input-input"
                               placeholder="5555555555554444"
                               type="text"
                               value={cardNumber}
                               onChange={e => setCardNumber(e.target.value)}
                               maxLength={16}
                        />
                    </div>

                    <div className="left-right-part">
                        <div className="input-container">
                            <p className="input-title">Термін дії <sup>*</sup></p>
                            <input className="input-input"
                                   placeholder="01/26"
                                   type="text"
                                   value={expiryDate}
                                   onChange={e => setExpiryDate(e.target.value)}
                                   maxLength={5}
                            />
                        </div>

                        <div className="input-container">
                            <div className="on-sides">
                                <p className="input-title">CVC - код <sup>*</sup></p>
                            </div>
                            <input className="input-input"
                                   placeholder="000"
                                   type="text"
                                   value={cvc}
                                   onChange={e => setCvc(e.target.value)}
                                   maxLength={3}
                            />
                        </div>
                    </div>
                    <button className="add-button" onClick={onAddCardClick} disabled={isCreating}>Додати карту</button>
                </div>
            </Modal>

            <p className="pre-title">Платіжні дані</p>
            <h1 className="pre-info">Безпечно додайте або видаліть способи оплати, щоб спростити процес бронювання.</h1>

            <div className="card-conteiner">
                {bankCardsData?.map(card => <div key={card.id} className="card-information">
                    <p className="payment-card-p">Картка {getPaymentSystem(card.number)}</p>
                    <div className="card-num-cont">
                        <div className="card-type-img">
                            <img src={getCardIcon(card.number)} alt="card" />
                        </div>
                        <p className="card-number">···· {card.number.substring(12)}</p>
                    </div>
                    <p className="payment-card-p">{format(card.expirationDate, "MM-yyyy")}</p>
                    <button className="delete-card-btn" disabled={isLoading}
                            onClick={() => deleteCardHandler(card.id)}>Видалити
                    </button>
                </div>)}

                <div className="add-card-div">
                    <p className="new-card-p">Нова карта</p>
                    <button className="add-card-btn" onClick={() => setIsOpenAddCardModal(true)}>Додати карту</button>
                </div>
            </div>

        </div>
    );
};

export default PaymentDataPage;