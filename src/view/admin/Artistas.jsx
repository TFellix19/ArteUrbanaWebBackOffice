import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { Topnav } from "../../components/Topnav";
import { Menu } from "../../components/Menu";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import api from "../../api";
import { ModalEditarArtistas } from "../../components/Artistas/ModalEditarArtistas";
import { ModalCriarArtistas } from "../../components/Artistas/ModalCriarArtistas";


    let deleteArtista = (idartista) => {
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
                api.delete("artistas/deleteartista/" + idartista).then(() => {
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
  const [artista, setArtista] = useState([]);
  const [modalEditarArtistasShow, setModalEditarArtistasShow] = useState(false);
  const [selectedArtista, setSelectedArtista] = useState(null);

  useEffect(() => {
    api
      .get("/artistas/list")
      .then(({ data }) => {
        const dados = data.data;
        var newArtista = [];
        dados.map((artista) => {
          newArtista.push({
            idartista: artista.idartista,
            nome: artista.nome,
            nomeartistico: artista.nomeartistico,
            pais: artista.pais,
            contacto: artista.contacto,
            email: artista.email,
            sitea: artista.sitea,
            redesocial1: artista.redesocial1,
            redesocial2: artista.redesocial2,
            descricao: artista.descricao,
            fotografia: artista.fotografia
          });
        });
        setArtista(newArtista);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <>
      {artista.map((data, index) => {
        return (
          <tr key={index}>
            <th>{data.idartista}</th>
            <th>{data.nome}</th>
            <td>{data.nomeartistico}</td>
            <td>{data.pais}</td>
            <td>{data.email}</td>
            <td>{data.contacto}</td>
            <td>
              <span
                className="material-symbols-outlined"
                onClick={() => {
                  setSelectedArtista(data);
                  setModalEditarArtistasShow(true);
                }}
              >
                <button
                  style={{ border: "none", background: "none" }}
                  data-bs-toggle="modal"
                  data-bs-target="#ModalEditarArtista"
                >
                  <img src="../assets/ico-pen.svg" alt="editar" />
                </button>
              </span>

              <span
                id={data?.idartista}
                className="material-symbols-outlined"
                onClick={() => deleteArtista(data?.idartista)}
              >
                <button style={{ border: "none", background: "none" }}>
                  <img src="../assets/ico-trash.svg" alt="apagar" />
                </button>
              </span>

              <span
                id={data?.idartista}
                className="material-symbols-outlined"
                onClick={() => {
                  setSelectedArtista(data);
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
      <ModalEditarArtistas
        show={modalEditarArtistasShow}
        onHide={() => setModalEditarArtistasShow(false)}
        props={selectedArtista}
      />
    </>
  );
}

function ArtistasManagement() {
  return (
    <div className="d-flex">
      {/* Colocar aqui o componente da sidebar */}
      <Menu />
      <main className="w-100">
        <Topnav role="Administrador" nome="ROBERTO" />
        <div className="container px-5 p-3">
          <div className=" w-100 d-flex justify-content-between">
            <h2 className="mt-5">Artistas</h2>
            <button
              style={{ backgroundColor: "white", width: '80px', height:'80px' }}
              type="button"
              className="btn btn-primary d-inline float-end"
              data-bs-toggle="modal"
              data-bs-target="#ModalCriarArtistas"
            >
              <img
                style={{objectFit: 'contain'}}
                src="../../assets/ico-add-artistas.svg"
                alt="adicionar artistas"
              ></img>
            </button>
          </div>
          <table className="table table-striped mt-5">
            <thead>
              <tr>
              <th scope="col">id</th>
                <th scope="col">Nome completo</th>
                <th scope="col">Nome artistico</th>
                <th scope="col">País</th>
                <th scope="col">Email</th>
                <th scope="col">telemovel</th>
                <th scope="col">Ferramentas</th>
              </tr>
            </thead>
            <tbody>
              <LoadFillData />
            </tbody>
          </table>
        </div>
        <ModalEditarArtistas />
        <ModalCriarArtistas />
      </main>
    </div>
  );
}

export default ArtistasManagement;
