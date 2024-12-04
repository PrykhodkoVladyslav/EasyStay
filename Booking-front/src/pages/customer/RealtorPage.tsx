import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import RealtorHotels from "components/partials/customer/RealtorHotels.tsx";
import RealtorReviews from "components/partials/customer/RealtorReviews.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useGetRealtorDetailsQuery } from "services/user.ts";
import showToast from "utils/toastShow.ts";
import { useEffect, useState } from "react";
import { instantScrollToTop } from "utils/scrollToTop.ts";
import { API_URL } from "utils/getEnvData.ts";
import RealtorReviewModal from "components/partials/customer/RealtorReviewModal/RealtorReviewModal.tsx";

const RealtorPage = () => {
    useEffect(instantScrollToTop, []);

    const { id: stringId } = useParams();
    const id = Number(stringId);

    const navigate = useNavigate();
    const { data: realtorDetails, error, isLoading } = useGetRealtorDetailsQuery(stringId!);
    const [isOpenRealtorReviewModal, setIsOpenRealtorReviewModal] = useState(false);

    if (isLoading || !realtorDetails) return <p className="isLoading-error pt-20">Завантаження...</p>;
    if (error) {
        showToast("Помилка завантаження даних", "error");
        return null;
    }

    return (
        <div className="realtor-page-container">
            <RealtorReviewModal isOpen={isOpenRealtorReviewModal} setIsOpen={setIsOpenRealtorReviewModal}
                                realtorId={id} />

            <div className="realtor-card">
                <div className="realtor-card-info">
                    <div className="nameConteiner">
                        <h2 className="realtor-card-name">{realtorDetails.firstName} {realtorDetails.lastName}</h2>
                        <div className="stars-container">
                            <img
                                src={getPublicResourceUrl("account/star.svg")}
                                alt=""
                                className="star"
                            />
                            <p className="rating">{realtorDetails.rating.toFixed(1)}</p>
                        </div>
                    </div>
                    <p className="realtor-card-email">{realtorDetails.email}</p>

                    <div className="realtor-card-details">
                        <div className="form-group">
                            <p>Номер телефону</p>
                            <p>{realtorDetails.phoneNumber?.length ? realtorDetails.phoneNumber : "Не вказано"}</p>
                        </div>
                        <div className="form-group">
                            <p>Дата народження</p>
                            <p>{realtorDetails.dateOfBirth?.length ? realtorDetails.dateOfBirth : "Не вказано"}</p>
                        </div>
                        <div className="form-group">
                            <p>Стать</p>
                            <p>{realtorDetails.gender?.name?.length ? realtorDetails.gender.name : "Не вказано"}</p>
                        </div>
                    </div>

                    <div className="realtor-card-description">
                        <h3>Інформація про рієлтора</h3>
                        <p>{realtorDetails.description?.length ? realtorDetails.description : "Не вказано"}</p>
                    </div>
                </div>

                <div className="realtor-card-image">
                    {realtorDetails.photo ? (
                        <img
                            src={API_URL + `/images/1200_${realtorDetails.photo}`}
                            alt=""
                        />
                    ) : (
                        <img
                            src={getPublicResourceUrl("account/no_user_photo.png")}
                            alt="Немає фото"
                        />
                    )}

                    <div className="center">
                        <button
                            onClick={() => setIsOpenRealtorReviewModal(true)}
                            className="realtor-card-feedback-btn"
                        >
                            Написати відгук
                        </button>

                        <button
                            onClick={() => navigate(`/chat?interlocutorIdParam=${stringId}&avatarParam=${realtorDetails.photo}&fullNameParam=${realtorDetails.firstName}`)}
                            className="realtor-card-feedback-btn"
                        >
                            Написати в чат
                        </button>
                    </div>
                </div>
            </div>

            <div className="hotels-reviews">
                <RealtorHotels />
                <RealtorReviews />
            </div>
        </div>
    );
};

export default RealtorPage;