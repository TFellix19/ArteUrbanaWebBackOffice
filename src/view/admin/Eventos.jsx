import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { Topnav } from "../../components/Topnav";
import { Menu } from "../../components/Menu";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import api from "../../api";
import { ModalEditarEventos } from "../../components/Eventos/ModalEditarEventos";
import { ModalCriarEventos } from "../../components/Eventos/ModalCriarEventos";


    let deleteEventos = (idevento) => {
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
                api.delete("Eventos/deleteevento/" + idevento).then(() => {
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
  const [Eventos, setEventos] = useState([]);
  const [modalEditarEventosShow, setModalEditarEventosShow] = useState(false);
  const [selectedEventos, setSelectedEventos] = useState(null);

  useEffect(() => {
    api
      .get("/eventos/list")
      .then(({ data }) => {
        const dados = data.data;
        var newEventos = [];
        dados.map((Eventos) => {
          newEventos.push({
            idevento: Eventos.idevento,
            nome: Eventos.nome,
            datainicio: Eventos.datainicio,
            datafim: Eventos.datafim,
            descricao: Eventos.descricao,
          });
        });
        setEventos(newEventos);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <>
      {Eventos.map((data, index) => {
        return (
          <tr key={index}>
            <th>{data.idevento}</th>
            <th>{data.nome}</th>
            <td>{data.datainicio}</td>
            <td>{data.datafim}</td>
            <td>{data.descricao}</td>
            <td>
              <span
                className="material-symbols-outlined"
                onClick={() => {
                  setSelectedEventos(data);
                  setModalEditarEventosShow(true);
                }}
              >
                <button
                  style={{ border: "none", background: "none" }}
                  data-bs-toggle="modal"
                  data-bs-target="#ModalEditarEvento"
                >
                  <img src="../assets/ico-pen.svg" alt="editar" />
                </button>
              </span>

              <span
                id={data?.idevento}
                className="material-symbols-outlined"
                onClick={() => deleteEventos(data?.idevento)}
              >
                <button style={{ border: "none", background: "none" }}>
                  <img src="../assets/ico-trash.svg" alt="apagar" />
                </button>
              </span>

              <span
                id={data?.idevento}
                className="material-symbols-outlined"
                onClick={() => {
                  setSelectedEventos(data);
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
      <ModalEditarEventos
        show={modalEditarEventosShow}
        onHide={() => setModalEditarEventosShow(false)}
        props={selectedEventos}
      />
    </>
  );
}

function EventosManagement() {
  return (
    <div className="d-flex">
      <Menu />
      <main className="w-100">
        <Topnav role="Administrador" />
        <div className="container px-5 p-3">
          <div className=" w-100 d-flex justify-content-between">
            <h2 className="mt-5">Eventos</h2>
            <button
              style={{ backgroundColor: "white", width: '80px', height:'80px' }}
              type="button"
              className="btn btn-primary d-inline float-end"
              data-bs-toggle="modal"
              data-bs-target="#ModalCriarEvento"
            >
              <img
                style={{objectFit: 'contain'}}
                src="../../assets/ico-add-eventos.svg"
                alt="adicionar Eventos"
              ></img>
            </button>
          </div>
          <table className="table table-striped mt-5">
            <thead>
              <tr>
              <th scope="col">Id</th>
                <th scope="col">Nome</th>
                <th scope="col">Data Inicio</th>
                <th scope="col">Data Fim</th>
                <th scope="col">Descrição</th>
                <th scope="col">Ferramentas</th>
              </tr>
            </thead>
            <tbody>
              <LoadFillData />
            </tbody>
          </table>
        </div>
        <ModalEditarEventos />
        <ModalCriarEventos />
      </main>
    </div>
  );
}

export default EventosManagement;
