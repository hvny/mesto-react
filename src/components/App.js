import {useEffect, useState} from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from "./ImagePopup";
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    useEffect(()=>{     //получаем карточки и ифну юзера при монтировании
        Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cardsData])=>{
            setCurrentUser(userData);
            setCards(cardsData);
        })
        .catch(err => console.log(err));
    }, []);

    function handleEditProfileClick(){      //открываем попап изменения профиля
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    }

    function handleAddPlaceClick(){         //открываем попап добавления карточки
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    }

    function handleEditAvatarClick(){       //открываем попап изменения аватарки
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }

    function handleCardClick(card){         //открываем конкретной карточки
        setSelectedCard(card);
        setIsImagePopupOpen(!isImagePopupOpen);
    }
    
    function closeAllPopups(){              //закрываем попапы
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({});
        setIsImagePopupOpen(false);
    }

    function handleCardLike(card) {         //ставим и убираем лайки карточки 
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        api.changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err=>console.log(err));
    } 

    function handleCardDelete(card){        //удаляем карточку
        api.deleteCard(card._id)
        .then(()=>{
            setCards((state)=> state.filter((c)=> c._id !== card._id));
        })
        .catch(err=>console.log(err));
    }

    function handleUpdateUser(newInfo){        //обновляем инфу юзера
        api.setUserInfo(newInfo)
        .then((userData)=>{
            setCurrentUser(userData);
            closeAllPopups();
        })
        .catch(err=>console.log(err));
    }
    
    function handleUpdateAvatar(newAvatar){     //обновляем аватар
        api.setUserAvatar(newAvatar)
        .then((userData)=>{
            setCurrentUser(userData);
            closeAllPopups();
        })
        .catch(err=>console.log(err));
    }

    function handleAddPlaceSubmit(placeInfo){
        api.addCard(placeInfo)
        .then((cardData)=>{
            setCards([cardData, ...cards]);
            closeAllPopups();
        })
        .catch(err=>console.log(err));
    }

    return (
    <CurrentUserContext.Provider value ={currentUser}>
        <div className="page">
            <Header />
            <Main 
                cards = {cards}
                onEditProfile={handleEditProfileClick} 
                onAddPlace = {handleAddPlaceClick} 
                onEditAvatar = {handleEditAvatarClick} 
                onCardClick={handleCardClick} 
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
            />
            <Footer />

            <EditProfilePopup isOpen = {isEditProfilePopupOpen} onClose = {closeAllPopups} onUpdateUser = {handleUpdateUser} />

            <AddPlacePopup isOpen = {isAddPlacePopupOpen} onClose = {closeAllPopups} onAddPlace = {handleAddPlaceSubmit} />
            
            <EditAvatarPopup isOpen = {isEditAvatarPopupOpen} onClose = {closeAllPopups} onUpdateAvatar = {handleUpdateAvatar} /> 

            <PopupWithForm 
                name = "delete-card" 
                isOpen = {false}
                title = "Вы уверены?" 
                buttonText = "Да"
                onClose = {closeAllPopups}
            />  

            <ImagePopup 
                card = {selectedCard}
                onClose = {closeAllPopups}
                isOpen = {isImagePopupOpen}
            />
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
