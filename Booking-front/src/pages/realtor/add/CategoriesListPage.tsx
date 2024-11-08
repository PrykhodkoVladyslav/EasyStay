import {Link} from "react-router-dom";
import {getPublicResourceUrl} from "utils/publicAccessor.ts";

const CategoriesListPage = () => {

    return (
        <div className="categories-container">
            <div className="top">
                <p className="title">Додайте своє помешкання і готуйтеся приймати гостей!</p>
                <p className="description">Щоб почати, виберіть тип помешкання, який хочете зареєструвати на
                    EasyStay</p>
            </div>

            <div className="categories">
                <div className="category">
                    <div className="info">
                        <div className="top">
                            <img
                                src={getPublicResourceUrl("account/hotel.svg")}
                                alt=""
                            />
                            <p>Готель</p>
                        </div>
                        <p>Помешкання, як-от готелі, готелі, хостели, апарт-готелі тощо.</p>
                    </div>
                    <Link
                        to="/add/hotel"
                        className="btn-add"
                    >
                        Зареєструвати помешкання
                    </Link>
                </div>

                <div className="category">
                    <div className="info">
                        <div className="top">
                            <img
                                src={getPublicResourceUrl("account/apartment.svg")}
                                alt=""
                            />
                            <p>Апартаменти</p>
                        </div>
                        <p>Помешкання з меблями і кухнею, яке гості бронюють цілком.</p>
                    </div>
                    <Link
                        to=""
                        className="btn-add cursor-not-allowed"
                    >
                        Зареєструвати помешкання
                    </Link>
                </div>

                <div className="category">
                    <div className="info">
                        <div className="top">
                            <img
                                src={getPublicResourceUrl("account/house.svg")}
                                alt=""
                            />
                            <p>Будинок</p>
                        </div>
                        <p>Апартаменти, будинки для відпочинку вілли та ін.</p>
                    </div>
                    <Link
                        to=""
                        className="btn-add cursor-not-allowed"
                    >
                        Зареєструвати помешкання
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CategoriesListPage;