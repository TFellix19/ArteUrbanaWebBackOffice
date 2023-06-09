import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { Topnav } from "../../components/Topnav";
import { Menu } from "../../components/Menu";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import api from "../../api";
import { ModalEditarComentarios } from "../../components/Comentarios/ModalEditarComentarios";
import trash from "../../../public/ico-trash.svg";
import pen from "../../../public/ico-pen.svg";

    let deleteComentario = (idcomentario) => {
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
                api.delete("comentarios/deletecomentarios/" + idcomentario).then(() => {
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
  const [comentario, setComentario] = useState([]);
  const [modalEditarComentariosShow, setModalEditarComentariosShow] = useState(false);
  const [selectedComentario, setSelectedComentario] = useState(null);

  useEffect(() => {
    api
      .get("/comentarios/list")
      .then(({ data }) => {
        const dados = data.data;
        var newComentario = [];
        dados.map((comentario) => {
          newComentario.push({
            idcomentario: comentario.idcomentario,
            idmural: comentario.idmural,
            comentario: comentario.comentario,
          });
        });
        setComentario(newComentario);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <>
      {comentario.map((data, index) => {
        return (
          <tr key={index}>
            <th>{data.idcomentario}</th>
            <th>{data.idmural}</th>
            <td>{data.comentario}</td>
            <td>
              <span
                id={data?.idcomentario}
                className="material-symbols-outlined"
                onClick={() => deleteComentario(data?.idcomentario)}
              >
                <button style={{ border: "none", background: "none" }}>
                  <img src={trash} alt="apagar" />
                </button>
              </span>
            </td>
          </tr>
        );
      })}
      <ModalEditarComentarios
        show={modalEditarComentariosShow}
        onHide={() => setModalEditarComentariosShow(false)}
        props={selectedComentario}
      />
    </>
  );
}

function comentariosManagement() {
  return (
    <div className="d-flex">
      {/* Colocar aqui o componente da sidebar */}
      <Menu />
      <main className="w-100">
        <Topnav role="Administrador" nome="ROBERTO" />
        <div className="container px-5 p-3">
          <div className=" w-100 d-flex justify-content-between">
            <h2 className="mt-5">comentarios</h2>
          </div>
          <table className="table table-striped mt-5">
            <thead>
              <tr>
              <th scope="col">id</th>
                <th scope="col">id Mural</th>
                <th scope="col">comentario</th>
                <th scope="col">Ferramentas</th>
              </tr>
            </thead>
            <tbody>
              <LoadFillData /> 
            </tbody>
          </table>
        </div>
        <ModalEditarComentarios />
      </main>
    </div>
  );
}

export default comentariosManagement;
