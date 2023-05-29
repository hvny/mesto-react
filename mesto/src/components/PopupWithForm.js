function PopupWithForm(props){

    return(
        <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <form name={`${props.name}_form`} className={`popup__form popup__form_type_${props.name}`}>
                    <button type="button" className="popup__button_type_close popup__button"></button>
                    <h2 className="popup__title">{props.title}</h2>
                    {props.children}
                    <button type="submit" className="popup__button_type_save popup__button">{props.buttonText}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;