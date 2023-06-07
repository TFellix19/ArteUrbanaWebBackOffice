import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { Topnav } from "../../components/Topnav";
// import { motion as m } from "framer-motion";
import { Menu } from "../../components/Menu";
import { React, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import api from "../../api";
import CardCount from "../../components/CardCounts";
import { ModalAssociarMuraisArtistas } from "../../components/ModalAssociarMuraisArtistas";
import { ModalAssociarEventosMurais } from '../../components/ModalAssociarEventosMurais';
import cardArtistas from "../../../public/ico-card-artistas.svg";
import cardMurais from "../../../public/ico-card-murais.svg";
import cardEventos from "../../../public/ico-card-eventos.svg";
import trash from "../../../public/ico-trash.svg";

let deleteEventosmurais = (idevento) => {
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
          api.delete("/eventosmurais/delete/" + idevento).then(() => {
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

let deleteMuraisartista = (idmural) => {
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
          api.delete("/muraisartistas/delete/" + idmural).then(() => {
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

function LoadFillDataMA() {
  const [muraisartistas, setMuraisArtistas] = useState([]);

  useEffect(() => {
    api
      .get("/muraisartistas/getallmuraisartistas")
      .then(({ data }) => {
        const dados = data.data;
        var newMuraisArtistas = [];
        Object.keys(dados).map((key) => {
          const muraisartistas = dados[key];
          newMuraisArtistas.push({
            idmural: muraisartistas.idmural,
            idartista: muraisartistas.idartista,
          });
          setMuraisArtistas(newMuraisArtistas);
        });
        
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <>
      {muraisartistas.map((data) => (
        <tr key={data.idmural}>
          <th>{data.idmural}</th>
          <td>{data.idartista}</td>
          <td>
            <span
              id={data?.idmural}
              className="material-symbols-outlined"
              onClick={() => deleteMuraisartista(data.idmural)}
            >
              <button style={{ border: "none", background: "none" }}>
                <img src={trash} alt="apagar" />
              </button>
            </span>
          </td>
        </tr>
      ))}
    </>
  );
}

function LoadFillDataEM() {
  const [eventosmurais, setEventosMurais] = useState([]);

  useEffect(() => {
    api
      .get("/eventosmurais/getalleventosmurais")
      .then(({ data }) => {
        const dados = data.data;
        var newEventosMurais = [];
        Object.keys(dados).map((key) => {
          const eventosmurais = dados[key];
          newEventosMurais.push({
            idmural: eventosmurais.idmural,
            idevento: eventosmurais.idevento,
          });
          setEventosMurais(newEventosMurais);
        });
        
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <>
      {eventosmurais.map((data) => (
        <tr key={data.idevento}>
          <th>{data.idevento}</th>
          <td>{data.idmural}</td>
          <td>
            <span
              id={data?.idevento}
              className="material-symbols-outlined"
              onClick={() => deleteEventosmurais(data.idevento)}
            >
              <button style={{ border: "none", background: "none" }}>
                <img src={trash} alt="apagar" />
              </button>
            </span>
          </td>
        </tr>
      ))}
    </>
  );
}

function DashboardAdmin() {
  const [infoAdmin, setInfoAdmin] = useState([]);
  const [infoMurais, setInfoMurais] = useState([]);
  const [infoEventos, setInfoEventos] = useState([]);

  useEffect(() => {
      api
          .get("artistas/countdashboardadmin")
          .then(({ data }) => {
              const dados = data.artistascount;
              const dadosm = data.muraiscount;
              const dadose = data.eventoscount;
              setInfoAdmin(dados);
              setInfoMurais(dadosm);
              setInfoEventos(dadose);
          })
          .catch((error) => {
              alert(error);
          });
  }, []);

  return (
    <>
      <div className="d-flex">
        <Menu />
        <div className="w-100">
          <Topnav role="Administrador" nome="Nome do administrador" />
          <div className="container px-5">
            <h2 className="mt-4">Dashboard</h2>
            <div className="col col-md-10">
              <div className="d-flex flex-wrap mt-3">
                <CardCount titulo="nrº artistas" icon={cardArtistas} nr={infoAdmin} />
                <CardCount titulo="nrº Murais"  icon={cardMurais} nr={infoMurais} />
                <CardCount titulo="nrº Eventos"  icon={cardEventos} nr={infoEventos} />
               
              </div>
              <div className="d-flex justify-content-between">
              <h2 className='mt-3'>Associação entre murais e artistas</h2>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#Modalassociar"
                >
                  Associar murais a artistas
                </button>
                </div>
                <table className="table table-striped mt-5">
                  <thead>
                    <tr>
                      <th scope="col">idmural</th>
                      <th scope="col">idartista</th>
                      <th scope="col">Ferramentas</th>
                    </tr>
                  </thead>
                  <tbody>
                    <LoadFillDataMA />
                  </tbody>
                </table>
                <div className="d-flex justify-content-between">
              <h2 className='mt-3'>Associação entre eventos e murais</h2>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#ModalassociarEM"
                >
                  Associar eventos a murais
                </button>
                </div>
                <table className="table table-striped mt-5">
                  <thead>
                    <tr>
                      <th scope="col">idevento</th>
                      <th scope="col">idmural</th>
                      <th scope="col">Ferramentas</th>
                    </tr>
                  </thead>
                  <tbody>
                    <LoadFillDataEM />
                  </tbody>
                </table>
            </div>
          </div>
        </div>
        <ModalAssociarMuraisArtistas />
        <ModalAssociarEventosMurais />
      </div>
    </>
  );
}

export default DashboardAdmin;
