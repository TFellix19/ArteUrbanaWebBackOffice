import { React} from "react";
export function CardCount(props) {

    const {titulo, nr, icon} = props

  return (
    <div>
      <div className="card me-4 my-3" whileHover={{
          scale: 1.05,
          boxShadow: "0 .5rem 1rem rgba(0,0,0,.15) ",
        }}
        style={{ width: "18rem", height: "12rem" }}
      >
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title text-muted fw-bold">
              {titulo}
            </h5>
            <img src={icon} alt="icon cartão" />
          </div>
          <p className="card-text h1 mt-3">{nr}</p>
        </div>
      </div>
    </div>
  );
}

export default CardCount;
