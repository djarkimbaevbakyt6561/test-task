import { useNavigate, useParams } from "react-router-dom";
import { DataStructure } from "../../types/interface";
import "./CharacterDetails.css";

const CharacterDetails = ({ arrayList }: { arrayList: DataStructure[] }) => {
  const params = useParams<{ charId?: string }>();
  const navigate = useNavigate();
  const findedProducts = arrayList.find(
    (el: DataStructure) => el.id === parseInt(params.charId!)
  );
  return (
    <div className="character_details_button_container">
      <button onClick={() => navigate(-1)}>Go Back</button>
      <div className="character_details_container">
        <img src={findedProducts?.image} alt="" />
        <div className="character_details_text_container">
          <p>
            Full Name: <span>{findedProducts?.name}</span>
          </p>
          <p>
            Gender: <span>{findedProducts?.gender}</span>
          </p>
          <div className="character_details_status_container">
            <p>
              Status: <span>{findedProducts?.status}</span>
            </p>
          </div>
          <p>
            Species: <span>{findedProducts?.species}</span>
          </p>
          <p>
            Last Appearance: <span>{findedProducts?.location.name}</span>
          </p>
          <p>
            First Appearance: <span>{findedProducts?.origin.name}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
