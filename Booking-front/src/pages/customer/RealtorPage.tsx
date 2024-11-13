import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import RealtorHotels from "components/partials/customer/RealtorHotels.tsx";
import RealtorReviews from "components/partials/customer/RealtorReviews.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useGetRealtorsInformationQuery } from "services/user.ts";
import showToast from "utils/toastShow.ts";

const RealtorPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: realtorDetails, error, isLoading } = useGetRealtorsInformationQuery(id as string);
    console.log(realtorInfo);
    const realtorId = realtorDetails.data.id;
    const realtorPhoto = realtorDetails.data.photo;
    const realtorName = realtorDetails.data.name;

    if (isLoading) return <p className="isLoading-error">Завантаження...</p>;
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
                        <div className="starConteiner">
                            <img
                                src={getPublicResourceUrl("account/star.svg")}
                                alt=""
                                className="star1"
                            />
                            <p className="realtor-card-rating">
                                9.7
                            </p>
                        </div>

                    </div>
                    <p className="realtor-card-email">dmytro973@gmail.com</p>

                    <div className="realtor-card-details">
                        <div className="form-group">
                            <label htmlFor="phone">Номер телефону</label>
                            <input type="text" id="phone" ></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="birthdate">Дата народження</label>
                            <input type="text" id="birthdate" ></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">Стать</label>
                            <input type="text" id="gender" ></input>
                        </div>
                    </div>

                    <div className="realtor-card-description">
                        <h3>Інформація про рієлтора</h3>
                        <p>
                            З багаторічним досвідом у сфері нерухомості, я пропоную широкий вибір
                            комфортних апартаментів та будинків у найкращих локаціях. Незалежно від
                            того, чи шукаєте ви житло для відпочинку на узбережжі, чи прості
                            апартаменти для тривалого проживання в центрі міста, я допоможу
                            підібрати найкращий варіант, що відповідає вашим потребам і бюджету.
                        </p>
                    </div>
                </div>

                <div className="realtor-card-image">
                    <div className="realtor-conteiner-image"><img
                        src={getPublicResourceUrl("./account/no_user_photo.png")}></img></div>

                    <div className="center">
                        <button className="realtor-card-feedback-btn">Написати відгук</button>

                        <button
                            onClick={() => navigate(`/chat?interlocutorIdParam=${realtorId}&avatarParam=${realtorPhoto}&fullNameParam=${realtorName}`)}
                            className="realtor-card-feedback-btn"
                        >Написати в чат</button>
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