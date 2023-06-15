import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props){
    const cardNameRef = useRef();
    const cardLinkRef = useRef();

    function handleSubmit(evt){
        evt.preventDefault();

        props.onAddPlace({
            name: cardNameRef.current.value,
            link: cardLinkRef.current.value,
        });
    }

    return(
        <PopupWithForm name = "add-card" 
            isOpen = {props.isOpen} 
            title = "Новое место" 
            buttonText = "Создать"
            onClose = {props.onClose}
            onSubmit = {handleSubmit}
        >
            <input type="text" name="name" ref={cardNameRef} autoComplete="off" placeholder="Название" className="popup__input" id="placeNameInput" minLength="2" maxLength="30" required />
            <span className="placeNameInput-error popup__input-error"> </span>
            <input type="url" name="link" ref={cardLinkRef} autoComplete="off" placeholder="Ссылка на картинку" className="popup__input" id="placeLinkInput" required />
            <span className="placeLinkInput-error popup__input-error"> </span>  
        </PopupWithForm>
    );
}

export default AddPlacePopup;