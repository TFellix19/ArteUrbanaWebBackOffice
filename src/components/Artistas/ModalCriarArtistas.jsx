import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../api";

export function ModalCriarArtistas({ show, onHide }) {
  let [artista, setArtista] = useState("");
  let [nome, setNome] = useState("");
  let [nomeartistico, setNomeartistico] = useState("");
  let [pais, setPais] = useState("");
  let [contacto, setContacto] = useState("");
  let [email, setEmail] = useState("");
  let [sitea, setSitea] = useState("");
  let [redesocial1, setRedesocial1] = useState("");
  let [redesocial2, setRedesocial2] = useState("");
  let [descricao, setDescricao] = useState("");
  let [fotografia, setFotografia] = useState("");

  useEffect(() => {
    api.get("artistas/list").then((data) => {
      let artista = data.data.data;
      setArtista(artista);
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

  function criarArtista() {
    let valid = true;
    console.log(1);
    if (nome == "" || nomeartistico == "" || contacto == "" || pais == "") {
      valid = false;
      sendError("Os campos não podem estar vazios");
    }
    if (valid) {
      let newArtista = {
        nome: nome,
        nomeartistico: nomeartistico,
        pais: pais,
        contacto: contacto,
        email: email,
        sitea: sitea,
        redesocial1: redesocial1,
        redesocial2: redesocial2,
        descricao: descricao,
        fotografia: fotografia,
      };
      api.post("artistas/create", newArtista).then((data) => {
        if (data.status == "200") {
          toast.success("Artista criado com sucesso", {
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
        id="ModalCriarArtistas"
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
                Criar Artista
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
                    placeholder="Insira o nome do artista"
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Nome Artistico</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setNomeartistico(e.target.value)}
                    placeholder="Insira o nome artistico"
                  />
                </div>
                <div className="form-group mt-3">
                  <label>País</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setPais(e.target.value)}
                    placeholder="Insira o pais de origem"
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Contacto</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setContacto(e.target.value)}
                    placeholder="Insira o contacto"
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Insira o email"
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Site do Artista</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setSitea(e.target.value)}
                    placeholder="insira o site do artista"
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Rede Social 1</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setRedesocial1(e.target.value)}
                    placeholder="Insira uma rede social"
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Rede Social 2</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setRedesocial2(e.target.value)}
                    placeholder="Insira uma rede social"
                  />
                </div>
                <div className="form-group mt-3">
                  <label>descricao</label>
                  <textarea
                    rows="5"
                    type="text"
                    className="form-control"
                    onChange={(e) => setDescricao(e.target.value)}
                    placeholder="Descreva o artista"
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Fotografia</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setFotografia(e.target.value)}
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
                onClick={criarArtista}
              >
                Criar artista
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
