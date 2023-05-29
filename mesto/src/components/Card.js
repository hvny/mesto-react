function Card(props){


    return(
        <article className = "element">
            <button className="element__button element__button_type_close"></button>
            <img src={props.link} alt="фото" className="element__image" />
            <h2 className="element__title">{props.name}</h2>
            <div className = "element__likes-container">
                <button type="button" className="element__button element__button_type_like"></button>                               
                <p className = "element__likes-counter">{props.likes}</p>
            </div>
        </article>
    );
}

export default Card;