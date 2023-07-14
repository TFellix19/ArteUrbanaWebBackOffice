import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import api from "../../api";
import { ToastContainer, toast } from 'react-toastify';

export function ModalVerInfoArtistas({ show, onHide, artistaSelecionado }) {
  const [artista, setArtista] = useState(null);

  useEffect(() => {
    setArtista(artistaSelecionado);
  }, [artistaSelecionado]);

  const deleteArtista = (idartista) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete("artistas/deleteartista/" + idartista)
          .then(() => {
            onHide();
            toast.success('Deleted successfully', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          })
          .catch((error) => {
            toast.error(error.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
      }
    });
  };

  return (
    <>
      <div
        className={`modal fade${show ? " show" : ""}`}
        id="ModalVerInfoArtista"
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
              {artista && (
                <div>
                  <div className="form-group">
                    <label>Nome:</label>
                    <p>{artista.nome}</p>
                  </div>
                  <div className="form-group mt-3">
                    <label>Nome Artístico:</label>
                    <p>{artista.nomeartistico}</p>
                  </div>
                  <div className="form-group mt-3">
                    <label>País:</label>
                    <p>{artista.pais}</p>
                  </div>
                  <div className="form-group mt-3">
                    <label>Email:</label>
                    <p>{artista.email}</p>
                  </div>
                  <div className="form-group mt-3">
                    <label>Contato:</label>
                    <p>{artista.contato}</p>
                  </div>
                  <div className="form-group mt-3">
                    <label>Site:</label>
                    <p>{artista.sitea}</p>
                  </div>
                  <div className="form-group mt-3">
                    <label>Rede Social 1:</label>
                    <p>{artista.redesocial1}</p>
                  </div>
                  <div className="form-group mt-3">
                    <label>Rede Social 2:</label>
                    <p>{artista.redesocial2}</p>
                  </div>
                  <div className="form-group mt-3">
                    <label>Descrição:</label>
                    <p>{artista.descricao}</p>
                  </div>
                  <div className="form-group mt-3">
                    <label>Fotografia:</label><br></br>
                    <img style={{ width: 'auto', height: '200px' }} src={artista.fotografia} alt="" />
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
