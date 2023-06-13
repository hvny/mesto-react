import {useEffect, useState} from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
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

    useEffect(()=>{
        Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cardsData])=>{
            setCurrentUser(userData);
            setCards(cardsData);
        })
        .catch(err => console.log(err));
    }, []);

    function handleEditProfileClick(){
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    }

    function handleAddPlaceClick(){
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    }

    function handleEditAvatarClick(){
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }

    function handleCardClick(card){
        setSelectedCard(card);
        setIsImagePopupOpen(!isImagePopupOpen);
    }
    
    function closeAllPopups(){
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({});
        setIsImagePopupOpen(false);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        api.changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    } 
    

    function handleCardDelete(card){

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

            <PopupWithForm 
                name = "edit-profile" 
                isOpen = {isEditProfilePopupOpen} 
                title = "Редактировать профиль" 
                onClose = {closeAllPopups}
            >
                <input type="text" name="name" autoComplete="off" placeholder="Имя" className="popup__input" id="profileNameInput" minLength="2" maxLength="40" required />
                <span className="profileNameInput-error popup__input-error"> </span>
                <input type="text" name="about" autoComplete="off" placeholder="О себе" className="popup__input" id="profileInfoInput" minLength="2" maxLength="200" required />
                <span className="profileInfoInput-error popup__input-error"> </span>
            </PopupWithForm>
        
            <PopupWithForm name = "add-card" 
                isOpen = {isAddPlacePopupOpen} 
                title = "Новое место" 
                buttonText = "Создать"
                onClose = {closeAllPopups}
            >
                <input type="text" name="name" autoComplete="off" placeholder="Название" className="popup__input" id="placeNameInput" minLength="2" maxLength="30" required />
                <span className="placeNameInput-error popup__input-error"> </span>
                <input type="url" name="link"  autoComplete="off" placeholder="Ссылка на картинку" className="popup__input" id="placeLinkInput" required />
                <span className="placeLinkInput-error popup__input-error"> </span>  
            </PopupWithForm>

            <PopupWithForm 
                name = "edit-avatar" 
                isOpen = {isEditAvatarPopupOpen} 
                title = "Обновить автар" 
                onClose = {closeAllPopups}
            >
                <input type="url" name="avatar" autoComplete="off" placeholder="Ссылка на картинку" className="popup__input" id="avatarInput" required />
                <span className="avatarInput-error popup__input-error"> </span>
            </PopupWithForm>

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
