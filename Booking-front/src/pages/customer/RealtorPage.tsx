import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import RealtorHotels from "components/partials/customer/RealtorHotels.tsx";
import RealtorReviews from "components/partials/customer/RealtorReviews.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useGetRealtorDetailsQuery } from "services/user.ts";
import showToast from "utils/toastShow.ts";

const RealtorPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: realtorDetails, error, isLoading } = useGetRealtorDetailsQuery(id as string);

    if (isLoading || !realtorDetails) return <p className="isLoading-error pt-20">Завантаження...</p>;
    if (error) {
        showToast("Помилка завантаження даних", "error");
        return null;
    }

    return (
        <div className="all-conteiner-realtor">
            <div className="realtor-card">
                <div className="realtor-card-info">
                    <div className="nameConteiner">
                        <h2 className="realtor-card-name">Дмитро Романчук</h2>
                        <div className="stars-container">
                            <img
                                src={getPublicResourceUrl("account/star.svg")}
                                alt=""
                                className="star"
                            />
                            <p className="rating">{realtorDetails.rating}</p>
                        </div>
                    </div>
                    <p className="realtor-card-email">{realtorDetails.email}</p>

                    <div className="realtor-card-details">
                        <div className="form-group">
                            <p>Номер телефону</p>
                            <p>{realtorDetails.phoneNumber}</p>
                        </div>
                        <div className="form-group">
                            <p>Дата народження</p>
                            <p>{realtorDetails.dateOfBirth}</p>
                        </div>
                        <div className="form-group">
                            <p>Стать</p>
                            <p>{realtorDetails.gender?.name}</p>
                        </div>
                    </div>

                    <div className="realtor-card-description">
                        <h3>Інформація про рієлтора</h3>
                        <p>{realtorDetails.description}</p>
                    </div>
                </div>

                <div className="realtor-card-image">
                    <img src={getPublicResourceUrl("account/no_user_photo.png")} alt="star"/>

                    <div className="center">
                        <button
                            // onClick={() => }
                            className="realtor-card-feedback-btn"
                        >Написати відгук</button>

                        <button
                            onClick={() => navigate(`/chat?interlocutorIdParam=${id}&avatarParam=${realtorDetails.photo}&fullNameParam=${realtorDetails.firstName}`)}
                            className="realtor-card-feedback-btn"
                        >Написати в чат
                        </button>
                    </div>
                </div>
            </div>

            <div className="hotels-reviews">
                <RealtorHotels/>
                <RealtorReviews/>
            </div>
        </div>
    );
}

export default RealtorPage;