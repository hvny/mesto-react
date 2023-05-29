import React from "react";
import { api } from "../utils/Api"; 
import Card from "./Card";

function Main(props){
    const [userName, setUserName] = React.useState("");
    const [userDescription, setUserDescription] = React.useState("");
    const [userAvatar, setUserAvatar] = React.useState("");    
    const [cards, setCards] = React.useState([]);

    React.useEffect(()=>{
        Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cardData])=>{
            setUserName(userData.name);
            setUserDescription(userData.about);
            setUserAvatar(userData.avatar);
            setCards(cardData);
        })
        .catch(err => console.log(err));       
    }, [userName, userDescription, userAvatar, cards]);
    
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
                        key = {card._id}
                        link = {card.link}
                        name = {card.name}
                        likes = {card.likes.length}
                    />
                ))}
            </section>
        </main>
        
    )
}

export default Main;