import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const HeroCard = ({ hero }) => {
  const { id, superhero, alter_ego, first_appereance, characters } = hero;

  const heroImageUrl = `/assets/heroes/${id}.jpg`;

  return (
    <div className="col-12 col-md-8 col-lg-4 animate__animated animate__fadeIn">
      <div className="card">
        <div className="row no-gutters">
          <div className="col-4">
            <img src={heroImageUrl} className="card-img" alt={superhero} />
          </div>
          <div className="col-8 ">
            <div className="card-body">
              <h5 className="card-title">{superhero}</h5>
              <p className="card-text"> {alter_ego}</p>
              {alter_ego !== characters && <p>{characters}</p>}
              <p className="card-text">
                <small className="text-muted">{first_appereance}</small>
              </p>

              <Link
                to={`/hero/${id}`}
                className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
              >
                More...
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HeroCard.propTypes = {
  hero: PropTypes.object.isRequired,
};
