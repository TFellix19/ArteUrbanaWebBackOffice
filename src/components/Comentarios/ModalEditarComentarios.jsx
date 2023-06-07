import api from "../../api";
import { useState, useEffect } from "react"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function ModalEditarComentarios({ show, onHide, props }) {

  let [nome, setNome] = useState("");
  let [nomeartistico, setNomeartistico] = useState("");
  let [pais, setPais] = useState("");

  function editcomentarios() {
    let newcomentarios = {
      nome: nome == "" ? props?.nome : nome,
      nomeartistico: nomeartistico == "" ? props?.nomeartistico : nomeartistico,
      pais: pais == "" ? props?.pais : pais,
    }

      api.patch("/comentarioss/updatecomentarios/" + props.idcomentarios, newcomentarios).then((data) => {
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
    <div className="modal fade" id="ModalEditarComentarios" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">Editar Comentarios</h1>
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
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" className="btn btn-primary" onClick={editcomentarios}>Editar</button>
          </div>
        </div>
      </div>
    </div>
  );
}