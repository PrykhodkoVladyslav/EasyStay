import { getIconUrl } from "utils/publicAccessor.ts";
import { useDeleteBankCardMutation, useGetAllBankCardsQuery } from "services/bankCard.ts";
import { format } from "date-fns";
import showToast from "utils/toastShow.ts";

const PaymentDataPage = () => {
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
        if (/^3(?:6|8|9)/.test(bin)) return "Diners Club";
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

    return (
        <div className="payment-conteiner">
            <p className="pre-title">Платіжні дані</p>
            <h1 className="pre-info">Безпечно додайте або видаліть способи оплати, щоб спростити процес бронювання.</h1>

            <div className="card-conteiner">
                {bankCardsData?.map(card => <div key={card.id} className="card-information">
                    <p className="payment-card-p">Платіжні карти</p>
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
                    <button className="add-card-btn">Додати карту</button>
                </div>
            </div>

        </div>
    );
};

export default PaymentDataPage;