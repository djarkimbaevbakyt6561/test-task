import "./CardItem.css";
import { ReactComponent as HeartIcon } from "../../assets/icons/heart.svg";
import { ReactComponent as StyledHeartIcon } from "../../assets/icons/styled-heart.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete-icon.svg";
import { CardItemStructure } from "../../types/interface";
import { useNavigate } from "react-router-dom";

const CardItem = ({
  name,
  location,
  species,
  image,
  status,
  isLiked,
  deleteItemHandler,
  likeChangeHandler,
  id,
}: CardItemStructure) => {
  const navigate = useNavigate();
  const stopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      className="card_item_container"
      onClick={() => navigate(`/character/${id}`)}
    >
      <img src={image} className="card_item_image" alt={name} />
      <div className="card_item_name_container">
        <p>{name.length > 24 ? `${name.slice(0, 20)}...` : name}</p>
      </div>
      <div className="card_item_status_container">
        <p data-status={status}>
          <span className="card_item_first-letter">{status.charAt(0)}</span>
          {status.slice(1)} - {species}{" "}
        </p>
      </div>
      <div className="card_item_location_container">
        <p className="card_item_location_title">Location: </p>
        <p>
          {location.name.length > 24
            ? `${location.name.slice(0, 20)}...`
            : location.name}
        </p>
      </div>
      <div className="card_item_button_container">
        <DeleteIcon
          onClick={(event: React.MouseEvent) => {
            stopPropagation(event);
            deleteItemHandler(id);
          }}
        />
        {isLiked ? (
          <StyledHeartIcon
            onClick={(event: React.MouseEvent) => {
              stopPropagation(event);
              likeChangeHandler(id);
            }}
          />
        ) : (
          <HeartIcon
            onClick={(event: React.MouseEvent) => {
              stopPropagation(event);
              likeChangeHandler(id);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CardItem;
