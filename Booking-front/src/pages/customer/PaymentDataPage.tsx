import { getPublicResourceUrl } from "utils/publicAccessor.ts";
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

    return (
        <div className="payment-conteiner">
            <p className="pre-title">Платіжні дані</p>
            <h1 className="pre-info">Безпечно додайте або видаліть способи оплати, щоб спростити процес бронювання.</h1>

            <div className="card-conteiner">
                {bankCardsData?.map(card => <div key={card.id} className="card-information">
                    <p className="payment-card-p">Платіжні карти</p>
                    <div className="card-num-cont">
                        <div className="card-type-img">
                            <img src={getPublicResourceUrl("icons/visa.svg")} alt="card" />
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