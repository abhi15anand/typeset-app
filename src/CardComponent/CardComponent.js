import React from "react";

const Card = ({
  className,
  heading,
  pricing = "",
  isOffer = false,
  onClick,
}) => {
  const renderOffers = () => {
    return (
      <ul>
        {heading.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    );
  };
  return (
    <div
      className={`${className} card-container`}
      style={{ width: isOffer ? "540px" : "270px" }}
      onClick={onClick}
    >
      <div className="card-heading">
        {!Array.isArray(heading) ? heading : renderOffers()}
      </div>
      <div className="card-pricing">{pricing}</div>
    </div>
  );
};

export default Card;
