import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});

    function handleEditProfileClick(){
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    }

    function handleAddPlaceClick(){
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    }

    function handleEditAvatarClick(){
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }

    function handleCardClick(){
        setSelectedCard({selectedCard});
    }
    
    function closeAllPopups(){
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
    }
    
    return (
    <div className="page">
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace = {handleAddPlaceClick} onEditAvatar = {handleEditAvatarClick} />
        <Footer />

        <PopupWithForm 
            name = "edit-profile" 
            isOpen = {isEditProfilePopupOpen} 
            title = "Редактировать профиль" 
            children = {(
                <input type="text" name="name" defaultValue="" autoComplete="off" placeholder="Имя" className="popup__input" id="profileNameInput" minLength="2" maxLength="40" required />,
                <span className="profileNameInput-error popup__input-error"> </span>,
                <input type="text" name="about" defaultValue="" autoComplete="off" placeholder="О себе" className="popup__input" id="profileInfoInput" minLength="2" maxLength="200" required />,
                <span className="profileInfoInput-error popup__input-error"> </span>
            )}  
            buttonText = "Сохранить"
            //onClose = {closeAllPopups}
        />
        <PopupWithForm 
            name = "add-card" 
            isOpen = {isAddPlacePopupOpen} 
            title = "Новое место" 
            children = {(
                <input type="text" name="name" defaultValue="" autoComplete="off" placeholder="Название" className="popup__input" id="placeNameInput" minLength="2" maxLength="30" required />,
                <span className="placeNameInput-error popup__input-error"> </span>,
                <input type="url" name="link" defaultValue="" autoComplete="off" placeholder="Ссылка на картинку" className="popup__input" id="placeLinkInput" required />,
                <span className="placeLinkInput-error popup__input-error"> </span>
            )}  
            buttonText = "Создать"
            //onClose = {closeAllPopups}
        />
        <PopupWithForm 
            name = "edit-avatar" 
            isOpen = {isEditAvatarPopupOpen} 
            title = "Обновить автар" 
            children = {(
                <input type="url" name="avatar" defaultValue="" autoComplete="off" placeholder="Ссылка на картинку" className="popup__input" id="avatarInput" required />,
                <span className="avatarInput-error popup__input-error"> </span>
            )}
            buttonText = "Сохранить"  
            //onClose = {closeAllPopups}
        />
        <PopupWithForm 
            name = "delete-card" 
            isOpen = {false}
            title = "Вы уверены?" 
            children = ""  
            buttonText = "Да"
            //onClose = {closeAllPopups}
        />  
        <ImagePopup 
            card = {selectedCard}
            //onClose = {closeAllPopups}
        />

    </div>
  );
}

export default App;
