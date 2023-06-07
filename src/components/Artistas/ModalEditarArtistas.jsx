import api from "../../api";
import { useState, useEffect } from "react"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function ModalEditarArtistas({ show, onHide, props }) {

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

  function editArtista() {
    let newArtista = {
      nome: nome == "" ? props?.nome : nome,
      nomeartistico: nomeartistico == "" ? props?.nomeartistico : nomeartistico,
      pais: pais == "" ? props?.pais : pais,
      contacto: contacto == "" ? props?.contacto : contacto,
      email: email == "" ? props?.email : email,
      sitea: sitea == "" ? props?.sitea : sitea,
      redesocial1: redesocial1 == "" ? props?.redesocial1 : redesocial1,
      redesocial2: redesocial2 == "" ? props?.redesocial2 : redesocial2,
      descricao: descricao == "" ? props?.descricao : descricao,
      fotografia: fotografia == "" ? props?.fotografia : fotografia,
    }

      api.patch("/artistas/updateartista/" + props.idartista, newArtista).then((data) => {
        if (data.status = "200") {
          toast.success('alterado com sucesso', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          sendError("Ocorreu um erro ")
        }
      })
        .catch((error) => {
          console.log(error);
        });
 }


  return (
    <div className="modal fade" id="ModalEditarArtista" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">Editar Artista</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          <form>
              <div className="form-group m-2">
                <label>Nome</label>
                <input type="text" className="form-control" aria-describedby="emailHelp" onChange={e => setNome(e.target.value)} value={nome== "" ? props?.nome:nome}></input>
              </div>
              <div className="form-group m-2 pt-2">
                <label>Nome artistico</label>
                <input type="text" className="form-control" aria-describedby="emailHelp" onChange={e => setNomeartistico(e.target.value)} value={nomeartistico == "" ? props?.nomeartistico:nomeartistico}></input>
              </div>
              <div className="form-group m-2 pt-2">
                <label>pais</label>
                <input type="text" className="form-control" onChange={e => setPais(e.target.value)} value={pais == "" ? props?.pais:pais}></input>
              </div>
              <div className="form-group m-2 pt-2">
                <label>Contacto</label>
                <input type="number" className="form-control" aria-describedby="emailHelp" onChange={e => setContacto(e.target.value)} value={contacto == "" ? props?.contacto:contacto}></input>
              </div>
              <div className="form-group m-2 pt-2">
                <label>Email</label>
                <input type="text" className="form-control" aria-describedby="emailHelp" onChange={e => setEmail(e.target.value)} value={email== "" ? props?.email:email}></input>
              </div>
              <div className="form-group m-2 pt-2">
                <label>Site do artista</label>
                <input type="text" className="form-control" aria-describedby="emailHelp" onChange={e => setSitea(e.target.value)} value={sitea == "" ? props?.sitea:sitea}></input>
              </div>
              <div className="form-group m-2 pt-2">
                <label>Rede Social 1</label>
                <input type="text" className="form-control" aria-describedby="emailHelp" onChange={e => setRedesocial1(e.target.value)} value={redesocial1 == "" ? props?.redesocial1:redesocial1}></input>
              </div>
              <div className="form-group m-2 pt-2">
                <label>Rede Social 2</label>
                <input type="text" className="form-control" aria-describedby="emailHelp" onChange={e => setRedesocial2(e.target.value)} value={redesocial2 == "" ? props?.redesocial2:redesocial2}></input>
              </div>
              <div className="form-group m-2 pt-2">
                <label>Fotografia</label>
                <input type="text" className="form-control" aria-describedby="emailHelp" onChange={e => setFotografia(e.target.value)} value={fotografia == "" ? props?.fotografia:fotografia}></input>
              </div>
              <div className="form-group m-2 pt-2">
                <label>Descrição</label>
                <textarea rows="6" type="text" className="form-control" aria-describedby="emailHelp" onChange={e => setDescricao(e.target.value)} value={descricao== "" ? props?.descricao:descricao}></textarea>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" className="btn btn-primary" onClick={editArtista}>Editar</button>
          </div>
        </div>
      </div>
    </div>
  );
}