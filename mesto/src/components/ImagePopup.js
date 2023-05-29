function ImagePopup(props){
    return(
        <div className="popup popup_type_image">
            <div className="popup__container">
                <button type="button" className="popup__button_type_close popup__button"></button>
                <img src="src" alt="фото" className="popup__image" />
                <p className="popup__image-title"></p>
            </div>
        </div>
    );
}