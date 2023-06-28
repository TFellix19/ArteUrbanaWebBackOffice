import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../api";

export function ModalCriarMurais({ show, onHide }) {
  let [mural, setMural] = useState("");
  let [titulo, setTitulo] = useState("");
  let [datainauguracao, setDatainauguracao] = useState("");
  let [rua, setRua] = useState("");
  let [latitude, setLatitude] = useState("");
  let [longitude, setLongitude] = useState("");
  let [qrcode, setQrcode] = useState("");
  let [descricao, setDescricao] = useState("");
  let [fotografia1, setFotografia1] = useState("");
  let [fotografia2, setFotografia2] = useState("");
  let [fotografia3, setFotografia3] = useState("");

  useEffect(() => {
    api.get("murais/list").then((data) => {
      let mural = data.data.data;
      setMural(mural);
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

  function criarMural() {
    let valid = true;
    console.log(1);
    if (titulo == "" || latitude == "" || longitude == "" || rua == "") {
      valid = false;
      sendError("Os campos não podem estar vazios");
    }
    if (valid) {
      let newMural = {
        titulo: titulo,
        datainauguracao: datainauguracao,
        rua: rua,
        latitude: latitude,
        longitude: longitude,
        descricao: descricao,
        qrcode: qrcode,
        fotografia1: fotografia1,
        fotografia2: fotografia2,
        fotografia3: fotografia3,
      };
      api.post("murais/create", newMural).then((data) => {
        if (data.status == "200") {
          toast.success("Mural criado com sucesso", {
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
        id="ModalCriarMural"
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
                Criar Mural
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
                  <label>Titulo</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setTitulo(e.target.value)}
                    aria-describedby="emailHelp"
                    placeholder="Insira o titulo da obra"
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Data Inauguração</label>
                  <input
                    type="date"
                    className="form-control"
                    onChange={(e) => setDatainauguracao(e.target.value)}
                    placeholder="Insira a data de inauguração"
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Rua</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setRua(e.target.value)}
                    placeholder="Insira a rua"
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Latitude</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder="Insira a latitude"
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Longitude</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder="Insira a longitude"
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Descrição</label>
                  <textarea
                    rows="5"
                    type="text"
                    className="form-control"
                    onChange={(e) => setDescricao(e.target.value)}
                    placeholder="insira uma descrição sobre o mural"
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Qrcode</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setQrcode(e.target.value)}
                    placeholder="Insira o link da imagem do Qr code"
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Fotografia 1</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setFotografia1(e.target.value)}
                    placeholder="link da imagem"
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Fotografia 2</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setFotografia2(e.target.value)}
                    placeholder="link da imagem"
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Fotografia 3</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setFotografia3(e.target.value)}
                    placeholder="link da imagem"
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
                onClick={criarMural}
              >
                Criar Mural
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
