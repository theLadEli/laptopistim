// Dynamic rating component
export default function Rating(props) {
    const ratingRounded = Math.round(props.ratingValue);
  
    return (
      <div className={`cf-rating ${props.ratingName}`}>
        <img className='cfr-icon' src={props.ratingIcon} />
        <div className="cfr-content">
          <h5>{props.ratingName}</h5>
            {        
              props.ratingValue != null ?
                <div className="rating-circle-row">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div 
                      key={num} 
                      className={`rr-circle ${num === ratingRounded ? "rr-circle-active" : ""}`}
                    ></div>
                  ))}
                </div>
              : <p className='sd-subheading'>Not enough ratings.</p>
            }
        </div>
      </div>
    );
  }