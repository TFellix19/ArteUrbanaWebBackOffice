import React, { useState, useEffect } from "react";

export function ModalVerInfoMurais({ show, onHide, muralSelecionado }) {
  const [mural, setMural] = useState(null);

  useEffect(() => {
    if (muralSelecionado) {
      setMural(muralSelecionado);
    }
  }, [muralSelecionado]);

  return (
    <>
      <div
        className={`modal fade${show ? " show" : ""}`}
        id="ModalVerInfoMural"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden={!show}
      >
        <div className="modal-dialog  modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Ver Informações relevantes
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={onHide}
              ></button>
            </div>
            <div className="modal-body">
              {mural && (
                <div>
                  <div className="form-group">
                    <label>Titulo:</label>
                    <p>{mural.titulo}</p>
                  </div>
                  <div className="form-group mt-3">
                    <label>Data Inauguração:</label>
                    <p>{mural.datainauguracao}</p>
                  </div>
                  <div className="form-group mt-3">
                    <label>Rua:</label>
                    <p>{mural.rua}</p>
                  </div>
                  <div className="form-group mt-3">
                    <label>Latitude:</label>
                    <p>{mural.latitude}</p>
                  </div>
                  <div className="form-group mt-3">
                    <label>Longitude:</label>
                    <p>{mural.longitude}</p>
                  </div>
                  <div className="form-group mt-3">
                    <label>Descrição:</label>
                    <p>{mural.descricao}</p>
                  </div>
                  <div className="form-group mt-3">
                    <label>Qrcode:</label>
                    <p>{mural.qrcode}</p>
                  </div>
                  <div className="form-group mt-3">
                    <label>Fotografia:</label><br></br>
                    <img style={{width: 'auto', height: '200px'}} src={mural.fotografia1} alt="" />
                    <p>{mural.fotografia1}</p>
                  </div>
                  <div className="form-group mt-3">
                    <label>Fotografia 2:</label><br></br>
                    <img style={{width: 'auto', height: '200px'}} src={mural.fotografia2} alt="" />
                    <p>{mural.fotografia2}</p>
                  </div>
                  <div className="form-group mt-3">
                    <label>Fotografia 3:</label><br></br>
                    <img style={{width: 'auto', height: '200px'}} src={mural.fotografia3} alt="" />
                    <p>{mural.fotografia3}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={onHide}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
