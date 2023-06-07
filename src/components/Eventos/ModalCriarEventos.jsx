import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../api";

export function ModalCriarEventos({ show, onHide }) {
  let [evento, setEvento] = useState("");
  let [nome, setNome] = useState("");
  let [datainicio, setdataInicio] = useState("");
  let [datafim, setdatafim] = useState("");
  let [descricao, setDescricao] = useState("");


  useEffect(() => {
    api.get("eventos/list").then((data) => {
      let evento = data.data.data;
      setEvento(evento);
    });
  }, []);

  const sendError = (erro) => {
    toast.error(erro, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  function criarEvento() {
    let valid = true;
    console.log(1);
    if (titulo == "" || latitude == "" || longitude == "" || rua == "") {
      valid = false;
      sendError("Os campos não podem estar vazios");
    }
    if (valid) {
      let newEvento = {
        nome: nome,
        datainicio: datainicio,
        datafim: datafim,
        descricao: descricao,
      };
      api.post("eventos/create", newEvento).then((data) => {
        if (data.status == "200") {
          toast.success("Evento criado com sucesso", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          sendError("Erro ao criar Evento");
        }
      });
    }
  }

  return (
    <>
      <div
        className="modal fade"
        id="ModalCriarEvento"
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
                Criar Evento
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
                  <label>Nome</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setNome(e.target.value)}
                    aria-describedby="emailHelp"
                    placeholder="Insira o nome do Evento"
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Data Inicio</label>
                  <input
                    type="date"
                    className="form-control"
                    onChange={(e) => setdataInicio(e.target.value)}
                    placeholder="Insira a data de inauguração"
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Data Fim</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setdatafim(e.target.value)}
                    placeholder="Insira a rua"
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Descrição</label>
                  <textarea
                    rows="6"
                    type="text"
                    className="form-control"
                    onChange={(e) => setDescricao(e.target.value)}
                    placeholder="Insira a descrição"
                  />
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
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-primary"
                onClick={criarEvento}
              >
                Criar Evento
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
