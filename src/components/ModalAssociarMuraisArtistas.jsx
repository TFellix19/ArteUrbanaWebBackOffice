import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../api";

export function ModalAssociarMuraisArtistas({ show, onHide, props }) {
  const [muralSelecionado, setMuralSelecionado] = useState("");
  const [artistaSelecionado, setArtistaSelecionado] = useState("");
  const [murais, setMurais] = useState([]);
  const [artistas, setArtistas] = useState([]);

  useEffect(() => {
    api
      .get("/murais/list")
      .then(({ data }) => {
        const dados = data.data;
        var newMurais = [];
        Object.keys(dados).map((key) => {
          const mural = dados[key];
          newMurais.push({
            idmural: mural.idmural,
            titulo: mural.titulo,
          });
        });
        setMurais(newMurais);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  useEffect(() => {
    api
      .get("/artistas/list")
      .then(({ data }) => {
        const dados = data.data;
        var newArtistas = [];
        Object.keys(dados).map((key) => {
          const artistas = dados[key];
          newArtistas.push({
            idartista: artistas.idartista,
            nomeartistico: artistas.nomeartistico,
          });
        });
        setArtistas(newArtistas);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const handleMuralChange = (event) => {
    setMuralSelecionado(event.target.value);
  };

  const handleArtistaChange = (event) => {
    setArtistaSelecionado(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    criarrelacao();

    setMuralSelecionado("");
    setArtistaSelecionado("");
  };


    function criarrelacao() {
      let valid = true;
      console.log(1);
      if (artistaSelecionado == "" || muralSelecionado == "" ) {
        valid = false;
        sendError("Os campos não podem estar vazios");
      }
      if (valid) {
        let newMuralArtista = {
          idartista: artistaSelecionado,
          idmural: muralSelecionado
        };
        api.post("/muraisartistas/create", newMuralArtista).then((data) => {
          if (data.status == "200") {
            toast.success("MuralArtista criado com sucesso", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            sendError("Erro ao criar utilizador");
          }
        });
      }
    }

  return (
    <>
      <div
        className="modal fade"
        id="Modalassociar"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Criar associação entre Mural e Artista
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Murais</label>
                  <select
                  className="form-select"
                    id="mural"
                    value={muralSelecionado}
                    onChange={handleMuralChange}
                  >
                    <option className="form-control" value="">
                      Selecione um mural
                    </option>
                    {murais.map((mural, index) => (
                      <option key={index} value={mural.idmural}>
                        {mural.titulo}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mt-3">
                  <label>Artistas</label>
                  <select
                  className="form-select"
                    id="artista"
                    value={artistaSelecionado}
                    onChange={handleArtistaChange}
                  >
                    <option value="">Selecione um artista</option>
                    {/* Mapear os artistas para exibir as opções */}
                    {artistas.map((artistas) => (
                      <option key={artistas.idartista} value={artistas.idartista}>
                        {artistas.nomeartistico}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="submit"
                data-bs-dismiss="modal"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Criar associação
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
