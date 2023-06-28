import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import api from "../../api";
import { Topnav } from "../../components/Topnav";
import { Menu } from "../../components/Menu";
import { ModalEditarMurais } from "../../components/Murais/ModalEditarMurais";
import { ModalCriarMurais } from "../../components/Murais/ModalCriarMurais";
import trash from "../../../public/ico-trash.svg";
import pen from "../../../public/ico-pen.svg";
import addMurais from "../../../public/ico-add-murais.svg";
import { ModalVerInfoMurais } from '../../components/Murais/ModalVerInfoMurais';

function MuraisManagement() {
  const [murais, setMurais] = useState([]);
  const [modalEditarMuraisShow, setModalEditarMuraisShow] = useState(false);
  const [selectedMural, setSelectedMural] = useState(null);
  const [modalConfirmacaoShow, setModalConfirmacaoShow] = useState(false);

  useEffect(() => {
    loadMurais();
  }, []);

  const loadMurais = () => {
    api.get("/murais/list")
      .then(({ data }) => {
        const muraisData = data.data;
        setMurais(muraisData);
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const deleteMural = (idMural) => {
    Swal.fire({
      title: 'Tens a certeza?',
      text: "Não vais conseguir reverter esta alteração",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, Apagar!'
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete("murais/deletemural/" + idMural)
          .then(() => {
            setModalConfirmacaoShow(false);
            loadMurais();
            toast.success('Deleted successfully', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          })
          .catch((error) => {
            toast.error(error.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
      }
    });
  };

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
                src={addMurais}
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
              {murais.map((mural, index) => (
                <tr key={index}>
                  <td>{mural.idmural}</td>
                  <td>{mural.titulo}</td>
                  <td>{mural.rua}</td>
                  <td>{mural.qrcode}</td>
                  <td>{mural.latitude}</td>
                  <td>{mural.longitude}</td>
                  <td>
                    <span
                      className="material-symbols-outlined"
                      onClick={() => {
                        setSelectedMural(mural);
                        setModalEditarMuraisShow(true);
                      }}
                    >
                      <button
                        style={{ border: "none", background: "none" }}
                        data-bs-toggle="modal"
                        data-bs-target="#ModalEditarMural"
                      >
                        <img src={pen} alt="editar" />
                      </button>
                    </span>

                    <span
                      id={mural?.idmural}
                      className="material-symbols-outlined"
                      onClick={() => deleteMural(mural?.idmural)}
                    >
                      <button style={{ border: "none", background: "none" }}>
                        <img src={trash} alt="apagar" />
                      </button>
                    </span>

                    <span
                      id={mural?.idmural}
                      className="material-symbols-outlined"
                      onClick={() => {
                        setSelectedMural(mural);
                        setModalConfirmacaoShow(true);
                      }}
                    >
                      <button 
                        data-bs-toggle="modal"
                        data-bs-target="#ModalVerInfoMural"
                        style={{ border: "none", background: "none", textDecoration:'underline' }}
                      >
                        ver detalhes
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ModalEditarMurais
          show={modalEditarMuraisShow}
          onHide={() => setModalEditarMuraisShow(false)}
          props={selectedMural}
        />
        <ModalCriarMurais />
        <ModalVerInfoMurais
          show={modalConfirmacaoShow}
          onHide={() => setModalConfirmacaoShow(false)}
          muralSelecionado={selectedMural}
        />
      </main>
    </div>
  );
}

export default MuraisManagement;
