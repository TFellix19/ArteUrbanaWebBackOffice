import api from "../../api";
import { useState, useEffect } from "react"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function ModalEditarEventos({ show, onHide, props }) {

  let [nome, setNome] = useState("");
  let [datainicio, setdataInicio] = useState("");
  let [datafim, setdatafim] = useState("");
  let [descricao, setdescricao] = useState("");

  function editEvento() {
    let newEvento = {
      nome: nome == "" ? props?.nome : nome,
      datainicio: datainicio == "" ? props?.datainicio : datainicio,
      datafim: datafim == "" ? props?.datafim : datafim,
      descricao: descricao == "" ? props?.descricao : descricao,
    }

      api.patch("/eventos/updateevento/" + props.idevento, newEvento).then((data) => {
        console.log(data);
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
          //console.log("asd");
        }
      })
        .catch((error) => {
          console.log(error);
        });
 }

  return (
    <div className="modal fade" id="ModalEditarEvento" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">Editar Evento</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          <form>
              <div className="form-group m-2">
                <label>nome</label>
                <input type="text" className="form-control" aria-describedby="descricaoHelp" onChange={e => setNome(e.target.value)} value={nome== "" ? props?.nome:nome}></input>
              </div>
              <div className="form-group m-2 pt-2">
                <label>Data de Inauguração</label>
                <input type="date" className="form-control" aria-describedby="descricaoHelp" onChange={e => setdataInicio(e.target.value)} value={datainicio == "" ? props?.datainicio:datainicio}></input>
              </div>
              <div className="form-group m-2 pt-2">
                <label>datafim</label>
                <input type="date" className="form-control" aria-describedby="descricaoHelp" onChange={e => setdatafim(e.target.value)} value={datafim == "" ? props?.datafim:datafim}></input>
              </div>
              <div className="form-group m-2 pt-2">
                <label>descricao</label>
                <textarea rows="6" type="text" className="form-control" aria-describedby="descricaoHelp" onChange={e => setdescricao(e.target.value)} value={descricao== "" ? props?.descricao:descricao}></textarea>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" className="btn btn-primary" onClick={editEvento}>Editar</button>
          </div>
        </div>
      </div>
    </div>
  );
}