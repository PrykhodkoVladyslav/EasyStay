import HotelCard from "components/partials/customer/HotelCard.tsx";
import { useEffect, useState } from "react";
import { useGetHotelsPageQuery } from "services/hotel.ts";
import { getToken } from "store/slice/userSlice.ts";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IHotelsPageQuery from "interfaces/hotel/IHotelsPageQuery.ts";
import { RootState } from "store/index.ts";

const MyHotels = () => {
    // const token = useSelector((state: RootState) => getToken(state));
    // const payload = token ? JSON.parse(atob(token.split('.')[1])) : null;
    // const realtorId = payload ? payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] : null;
    const navigate = useNavigate();

    const { data: hotelsData, error, isLoading } = useGetHotelsPageQuery({pageIndex: 0, RealtorId: 3});
    // const [hotels, setHotels] = useState(hotelsData?.data ?? []);

    console.log(hotelsData);
    // useEffect(() => {
    //     if (hotelsData) {
    //         console.log(hotelsData);
    //         setHotels(hotelsData || []);
    //     }
    // }, [hotelsData]);

    if (isLoading) { return <p>Loading...</p>; }
    if (error) { return <p>Error loading hotels.</p>; }

    return (
        <div className="hotels-container">
            <div className="container1">
                <p className="title">Мої готелі</p>
                    <div className="hotels">
                        {hotels.map(item => <HotelCard key={item.id} item={item}/>)}
                    </div>
            </div>

            <div className="main-button">
                <button onClick={() => navigate("/realtor/hotels")}>
                    Більше
                </button>
            </div>
        </div>
    )
}

export default MyHotels;

{/*<div className="bottom">*/}
{/*    <p>2 ночі, 1 дорослий</p>*/}
{/*    <div className="container5">*/}
{/*        <div className="prices-container">*/}
{/*            <p className="price"><span>Від </span>6999₴</p>*/}
{/*            <p className="old-price">13399₴</p>*/}
{/*        </div>*/}
{/*        <div className="container6">*/}
{/*            <p className="no-any-of-left">Залишилось лише 2 варіанти</p>*/}
{/*        </div>*/}
{/*    </div>*/}
{/*</div>*/}
// <div className="hotel">
//     <div className="images-container">
//         <img className="image"
//              src="https://hotel-mir-rivne.hotelmix.com.ua/data/Photos/OriginalPhoto/1381/138197/138197871/Hotel-Mir-Rivne-Exterior.JPEG"
//              alt=""
//         />
//
//         <div className="slides">
//             <div className="container2">
//                 <div className="slide"></div>
//                 <div className="slide"></div>
//                 <div className="active-slide"></div>
//                 <div className="slide"></div>
//                 <div className="slide"></div>
//             </div>
//         </div>
//     </div>
//
//     <div className="info">
//         <div className="top">
//             <div className="container3">
//                 <p className="name">Costtac Costata Costa</p>
//                 <div className="stars-container">
//                     <div className="container4">
//                         <img
//                             src={getPublicResourceUrl("account/star.svg")}
//                             alt="Зірки"
//                             className="star"
//                         />
//                         <p className="rating">
//                             9.7
//                         </p>
//
//                     </div>
//                 </div>
//             </div>
//             <p className="location">Рівне, Україна</p>
//             <p className="description">Люкс з гідромасажною ванною, вигляд на центр міста,
//                 балкон</p>
//             <div className="realtor">
//                 <p>Рієлтор:</p>
//                 <p>Оксана</p>
//             </div>
//         </div>
//
//         <div className="bottom">
//             <p>2 ночі, 1 дорослий</p>
//             <div className="container5">
//                 <div className="prices-container">
//                     <p className="price">6999₴</p>
//                     <p className="old-price">13399₴</p>
//                 </div>
//                 <div className="container6">
//                     <p className="any-of-left">Сезонна пропозиція</p>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
// <div className="hotel">
//     <div className="images-container">
//         <img className="image"
//              src="https://hotel-mir-rivne.hotelmix.com.ua/data/Photos/OriginalPhoto/1381/138197/138197871/Hotel-Mir-Rivne-Exterior.JPEG"
//              alt=""
//         />
//
//         <div className="slides">
//             <div className="container2">
//                 <div className="slide"></div>
//                 <div className="slide"></div>
//                 <div className="slide"></div>
//                 <div className="slide"></div>
//                 <div className="active-slide"></div>
//             </div>
//         </div>
//     </div>
//
//     <div className="info">
//         <div className="top">
//             <div className="container3">
//                 <p className="name">Hotel Mir Rivne</p>
//                 <div className="stars-container">
//                     <div className="container4">
//                         <img
//                             src={getPublicResourceUrl("account/star.svg")}
//                             alt="Зірки"
//                             className="star"
//                         />
//                         <p className="rating">
//                             9.7
//                         </p>
//
//                     </div>
//                 </div>
//             </div>
//             <p className="location">Рівне, Україна</p>
//             <p className="description">Люкс з гідромасажною ванною, вигляд на центр міста,
//                 балкон</p>
//             <div className="realtor">
//                 <p>Рієлтор:</p>
//                 <p>Оксана</p>
//             </div>
//         </div>
//
//         <div className="bottom">
//             <p>2 ночі, 1 дорослий</p>
//             <div className="container5">
//                 <div className="prices-container">
//                     <p className="price">6999₴</p>
//                     <p className="old-price">13399₴</p>
//                 </div>
//                 <div className="container6">
//                     <p className="no-any-of-left">Залишилось лише 2 варіанти</p>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>