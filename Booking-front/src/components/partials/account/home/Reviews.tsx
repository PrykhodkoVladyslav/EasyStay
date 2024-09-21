import {getPublicResourceUrl} from "utils/publicAccessor.ts";
import { UA } from 'country-flag-icons/react/1x1'

const Reviews = () => {

    return (
        <div className="reviews-container">
            <div className="container7">
                <p className="title">Відгуки</p>
                <div className="reviews">
                    <div className="review">
                        <div className="author">
                            <div className="image">
                                <img
                                    src={getPublicResourceUrl('account/no_user_photo.png')}
                                    alt="realtor name"
                                />
                            </div>
                            <div className="container9">
                                <div className="name-and-country">
                                    <p>Марія</p>
                                    <UA
                                        title="Україна"
                                        className="country"
                                    />
                                </div>
                                <div className="stars-container">
                                    <img
                                        src={getPublicResourceUrl("account/home/star.svg")}
                                        alt=""
                                        className="star"
                                    />
                                    <p className="rating">
                                        9.7
                                    </p>
                                </div>
                            </div>

                        </div>

                        <p className="description">
                            Розташування було дуже близько до центру міста. Господар був дуже добрим. Квартира була дуже
                            чистою та дуже добре мебльованою. Ціна була дуже хорошою.
                        </p>
                    </div>
                    <div className="review">
                        <div className="author">
                            <div className="image">
                                <img
                                    src={getPublicResourceUrl('account/no_user_photo.png')}
                                    alt="realtor name"
                                />
                            </div>
                            <div className="container9">
                                <div className="name-and-country">
                                    <p>Олександра dsad as d asd  dad s </p>
                                    <UA
                                        title="Україна"
                                        className="country"
                                    />
                                </div>
                                <div className="stars-container">
                                    <img
                                        src={getPublicResourceUrl("account/home/star.svg")}
                                        alt=""
                                        className="star"
                                    />
                                    <p className="rating">
                                        9.7
                                    </p>
                                </div>
                            </div>

                        </div>

                        <p className="description">
                            Розташування було дуже близько до центру міста. Господар був дуже добрим. Квартира була дуже
                            чистою та дуже добре мебльованою. Ціна була дуже хорошою.
                        </p>
                    </div>
                    <div className="review">
                        <div className="author">
                            <div className="image">
                                <img
                                    src={getPublicResourceUrl('account/no_user_photo.png')}
                                    alt="realtor name"
                                />
                            </div>
                            <div className="container9">
                                <div className="name-and-country">
                                    <p>Даніела</p>
                                    <UA
                                        title="Україна"
                                        className="country"
                                    />
                                </div>
                                <div className="stars-container">
                                    <img
                                        src={getPublicResourceUrl("account/home/star.svg")}
                                        alt=""
                                        className="star"
                                    />
                                    <p className="rating">
                                        9.7
                                    </p>
                                </div>
                            </div>

                        </div>

                        <p className="description">
                            Розташування було дуже близько до центру міста. Господар був дуже добрим. Квартира була дуже
                            чистою та дуже добре мебльованою. Ціна була дуже хорошою.
                        </p>
                    </div>
                </div>

            </div>

            <div className="container8">
                <button>
                    Більше
                </button>
            </div>
        </div>
    )
}

export default Reviews;