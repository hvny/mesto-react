import {useEffect, useState} from 'react';
import { api } from "../utils/Api"; 
import Card from "./Card";

function Main(props){
    const [userName, setUserName] = useState("");
    const [userDescription, setUserDescription] = useState("");
    const [userAvatar, setUserAvatar] = useState("");    
    const [cards, setCards] = useState([]);

    useEffect(()=>{
        Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cardData])=>{
            setUserName(userData.name);
            setUserDescription(userData.about);
            setUserAvatar(userData.avatar);
            setCards(cardData);
        })
        .catch(err => console.log(err));       
    }, []);

    return(
        <main>
            <section className="profile">
                <div className="profile__avatar-container">
                    <div style={{backgroundImage: `url(${userAvatar})`}} className="profile__avatar" onClick={props.onEditAvatar}></div>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <button type="button" className="profile__button_type_edit profile__button" onClick={props.onEditProfile}></button>
                    <h2 className="profile__status">{userDescription}</h2>
                </div>
                <button type="button" className="profile__button_type_add profile__button" onClick={props.onAddPlace}></button>
            </section>

            <section className="elements">
                {cards.map((card)=>(
                    <Card 
                        card = {card}
                        onCardClick = {props.onCardClick}
                        key = {card._id}
                    />
                ))}
            </section>
        </main>
    )
}

export default Main;