import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../api";

export function ModalAssociarEventosMurais({ show, onHide, props }) {
  const [eventoSelecionado, seteventoSelecionado] = useState("");
  const [muralSelecionado, setMuralSelecionado] = useState("");
  const [eventos, setEventos] = useState([]);
  const [murais, setMurais] = useState([]);

  useEffect(() => {
    api
      .get("/eventos/list")
      .then(({ data }) => {
        const dados = data.data;
        var newMurais = [];
        Object.keys(dados).map((key) => {
          const evento = dados[key];
          newMurais.push({
            idevento: evento.idevento,
            nome: evento.nome,
          });
        });
        setEventos(newMurais);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

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

  const handleeventoChange = (event) => {
    seteventoSelecionado(event.target.value);
  };

  const handleMuralChange = (event) => {
    setMuralSelecionado(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    criarrelacao();

    seteventoSelecionado("");
    setMuralSelecionado("");
  };


    function criarrelacao() {
      let valid = true;
      console.log(1);
      if (muralSelecionado == "" || eventoSelecionado == "" ) {
        valid = false;
        sendError("Os campos não podem estar vazios");
      }
      if (valid) {
        let neweventomurais = {
          idmural: muralSelecionado,
          idevento: eventoSelecionado
        };
        api.post("/eventosmurais/create", neweventomurais).then((data) => {
          if (data.status == "200") {
            toast.success("eventomurais criado com sucesso", {
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
        id="ModalassociarEM"
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
                Criar associação entre Eventos e Murais
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
                  <label>Eventos</label>
                  <select
                  className="form-select"
                    id="evento"
                    value={eventoSelecionado}
                    onChange={handleeventoChange}
                  >
                    <option className="form-control" value="">
                      Selecione um evento
                    </option>
                    {eventos.map((eventos, index) => (
                      <option key={index} value={eventos.idevento}>
                        {eventos.nome}
                      </option>
                    ))}
                  </select>
                </div>
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
