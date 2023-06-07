import api from "../../api";
import { useState, useEffect } from "react"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function ModalEditarMurais({ show, onHide, props }) {

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

  function editMural() {
    let newMural = {
      titulo: titulo == "" ? props?.titulo : titulo,
      datainauguracao: datainauguracao == "" ? props?.datainauguracao : datainauguracao,
      rua: rua == "" ? props?.rua : rua,
      latitude: latitude == "" ? props?.latitude : latitude,
      longitude: longitude == "" ? props?.longitude : longitude,
      descricao: descricao == "" ? props?.descricao : descricao,
      qrcode: qrcode == "" ? props?.qrcode : qrcode,
      fotografia1: fotografia1 == "" ? props?.fotografia1 : fotografia1,
      fotografia2: fotografia2 == "" ? props?.fotografia2 : fotografia2,
      fotografia3: fotografia3 == "" ? props?.fotografia3 : fotografia3,
    }

      api.patch("/murais/updatemural/" + props.idmural, newMural).then((data) => {
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
    <div className="modal fade" id="ModalEditarMural" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">Editar Mural</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          <form>
              <div className="form-group m-2">
                <label>Titulo</label>
                <input type="text" className="form-control" aria-describedby="latitudeHelp" onChange={e => setTitulo(e.target.value)} value={titulo== "" ? props?.titulo:titulo}></input>
              </div>
              <div className="form-group m-2 pt-2">
                <label>Data de Inauguração</label>
                <input type="date" className="form-control" aria-describedby="latitudeHelp" onChange={e => setDatainauguracao(e.target.value)} value={datainauguracao == "" ? props?.datainauguracao:datainauguracao}></input>
              </div>
              <div className="form-group m-2 pt-2">
                <label>rua</label>
                <textarea rows="3" type="text" className="form-control" aria-describedby="latitudeHelp" onChange={e => setRua(e.target.value)} value={rua == "" ? props?.rua:rua}></textarea>
              </div>
              <div className="form-group m-2 pt-2">
                <label>latitude</label>
                <input type="text" className="form-control" aria-describedby="latitudeHelp" onChange={e => setLatitude(e.target.value)} value={latitude== "" ? props?.latitude:latitude}></input>
              </div>
              <div className="form-group m-2 pt-2">
                <label>Longitude</label>
                <input type="text" className="form-control" aria-describedby="latitudeHelp" onChange={e => setLongitude(e.target.value)} value={longitude == "" ? props?.longitude:longitude}></input>
              </div>
              <div className="form-group m-2 pt-2">
                <label>Descrição</label>
                <textarea rows="6" type="text" className="form-control" aria-describedby="latitudeHelp" onChange={e => setDescricao(e.target.value)} value={descricao== "" ? props?.descricao:descricao}></textarea>
              </div>
              <div className="form-group m-2 pt-2">
                <label>QrCode</label>
                <input type="text" className="form-control" aria-describedby="latitudeHelp" onChange={e => setQrcode(e.target.value)} value={qrcode == "" ? props?.qrcode:qrcode}></input>
              </div>
              <div className="form-group m-2 pt-2">
                <label>Rede Social 2</label>
                <input type="text" className="form-control" aria-describedby="latitudeHelp" onChange={e => setFotografia1(e.target.value)} value={fotografia1 == "" ? props?.fotografia1:fotografia1}></input>
              </div>
              <div className="form-group m-2 pt-2">
                <label>Fotografia</label>
                <input type="text" className="form-control" aria-describedby="latitudeHelp" onChange={e => setFotografia2(e.target.value)} value={fotografia2 == "" ? props?.fotografia2:fotografia2}></input>
              </div>
              <div className="form-group m-2 pt-2">
                <label>Fotografia</label>
                <input type="text" className="form-control" aria-describedby="latitudeHelp" onChange={e => setFotografia3(e.target.value)} value={fotografia3 == "" ? props?.fotografia3:fotografia3}></input>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" className="btn btn-primary" onClick={editMural}>Editar</button>
          </div>
        </div>
      </div>
    </div>
  );
}