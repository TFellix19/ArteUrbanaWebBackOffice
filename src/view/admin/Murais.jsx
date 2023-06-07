import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { Topnav } from "../../components/Topnav";
import { Menu } from "../../components/Menu";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import api from "../../api";
import { ModalEditarMurais } from "../../components/Murais/ModalEditarMurais";
import { ModalCriarMurais } from "../../components/Murais/ModalCriarMurais";


    let deleteMurais = (idmural) => {
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
                api.delete("murais/deletemural/" + idmural).then(() => {
                    onHide();
                  })
                  toast.success('apagado com sucesso', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
    }



function LoadFillData() {
  const [Murais, setMurais] = useState([]);
  const [modalEditarMuraisShow, setModalEditarMuraisShow] = useState(false);
  const [selectedMurais, setSelectedMurais] = useState(null);

  useEffect(() => {
    api
      .get("/murais/list")
      .then(({ data }) => {
        const dados = data.data;
        var newMurais = [];
        dados.map((Murais) => {
          newMurais.push({
            idmural: Murais.idmural,
            titulo: Murais.titulo,
            datainauguracao: Murais.datainauguracao,
            rua: Murais.rua,
            latitude: Murais.latitude,
            longitude: Murais.longitude,
            descricao: Murais.descricao,
            qrcode: Murais.qrcode,
            fotografia1: Murais.fotografia1,
            fotografia2: Murais.fotografia2,
            fotografia3: Murais.fotografia3
          });
        });
        setMurais(newMurais);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <>
      {Murais.map((data, index) => {
        return (
          <tr key={index}>
            <th>{data.idmural}</th>
            <th>{data.titulo}</th>
            <td>{data.rua}</td>
            <td>{data.qrcode}</td>
            <td>{data.latitude}</td>
            <td>{data.longitude}</td>
            <td>
              <span
                className="material-symbols-outlined"
                onClick={() => {
                  setSelectedMurais(data);
                  setModalEditarMuraisShow(true);
                }}
              >
                <button
                  style={{ border: "none", background: "none" }}
                  data-bs-toggle="modal"
                  data-bs-target="#ModalEditarMural"
                >
                  <img src="../assets/ico-pen.svg" alt="editar" />
                </button>
              </span>

              <span
                id={data?.idmural}
                className="material-symbols-outlined"
                onClick={() => deleteMurais(data?.idmural)}
              >
                <button style={{ border: "none", background: "none" }}>
                  <img src="../assets/ico-trash.svg" alt="apagar" />
                </button>
              </span>

              <span
                id={data?.idmural}
                className="material-symbols-outlined"
                onClick={() => {
                  setSelectedMurais(data);
                  setModalConfirmacaoShow(true);
                }}
              >
                <button 
                style={{ border: "none", background: "none", textDecoration:'underline' }}>
                 ver detalhes
                </button>
              </span>
            </td>
          </tr>
        );
      })}
      <ModalEditarMurais
        show={modalEditarMuraisShow}
        onHide={() => setModalEditarMuraisShow(false)}
        props={selectedMurais}
      />
    </>
  );
}

function MuraisManagement() {
  return (
    <div className="d-flex">
      <Menu />
      <main className="w-100">
        <Topnav role="Administrador" />
        <div className="container px-5 p-3">
          <div className=" w-100 d-flex justify-content-between">
            <h2 className="mt-5">Murais</h2>
            <button
              style={{ backgroundColor: "white", width: '80px', height:'80px' }}
              type="button"
              className="btn btn-primary d-inline float-end"
              data-bs-toggle="modal"
              data-bs-target="#ModalCriarMural"
            >
              <img
                style={{objectFit: 'contain'}}
                src="../../assets/ico-add-murais.svg"
                alt="adicionar Murais"
              ></img>
            </button>
          </div>
          <table className="table table-striped mt-5">
            <thead>
              <tr>
              <th scope="col">id</th>
                <th scope="col">Titulo</th>
                <th scope="col">Rua</th>
                <th scope="col">QRcode</th>
                <th scope="col">latitude</th>
                <th scope="col">longitude</th>
                <th scope="col">Ferramentas</th>
              </tr>
            </thead>
            <tbody>
              <LoadFillData />
            </tbody>
          </table>
        </div>
        <ModalEditarMurais />
        <ModalCriarMurais />
      </main>
    </div>
  );
}

export default MuraisManagement;
