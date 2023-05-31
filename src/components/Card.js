function Card(props){
    function handleClick(){
        props.onCardClick(props.card);
    }

    return(
        <article className = "element">
            <button className="element__button element__button_type_close"></button>
            <img src={props.card.link} alt="фото" className="element__image" onClick={handleClick} />
            <h2 className="element__title">{props.card.name}</h2>
            <div className = "element__likes-container">
                <button type="button" className="element__button element__button_type_like"></button>                               
                <p className = "element__likes-counter">{props.card.likes.length}</p>
            </div>
        </article>
    );
}

export default Card;