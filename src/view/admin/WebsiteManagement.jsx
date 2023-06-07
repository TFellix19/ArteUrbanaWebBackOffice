import { Topnav } from "../../components/Topnav";
// import { motion as m } from "framer-motion";
import { Menu } from "../../components/Menu";
import { React, useState, useEffect } from "react";
import api from "../../api";
import { toast } from 'react-toastify';

function WebsiteManagement() {
  
    const sendError = (erro) => {
      toast.error(erro, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    };

  const [heroiDesc, setHeroiDesc] = useState('');
  const [objD, setObjD] = useState('');
  const [podescT, setPodescT] = useState('');
  const [podescD, setPodescD] = useState('');
  const [muraisDC, setmuraisDC] = useState('');
  const [artistasDC, setArtistasDC] = useState('');
  const [eventosDC, setEventosDC] = useState('');
  const [mapaDC, setMapaDC] = useState('');
  const [sobreD, setSobreD] = useState('');
  const [muraisD, setMuraisD] = useState('');
  const [artistasD, setArtistasD] = useState('');


    function SendUpdate() {
      const datawebsitepost = {
        heroiDesc:heroiDesc,
        objD:objD,
        podescT:podescT,
        podescD:podescD,
        muraisDC:muraisDC,
        artistasDC:artistasDC,
        eventosDC:eventosDC,
        mapaDC:mapaDC,
        sobreD:sobreD,
        muraisD:muraisD,
        artistasD:artistasD,
      };
      console.log(datawebsitepost);
    
      api
        .patch("/infowebsite/update", datawebsitepost)
        .then((data) => {
          if ((data.status = "200")) {
            toast.success("Website alterado com sucesso", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            console.log("Pedido enviado com sucesso");
          } else {
            sendError("Ocorreu um erro ao tentar alterar o website");
            console.log("Erro ao enviar o pedido");
          }
        })
        .catch((error) => {
          alert(error);
        });
    }

  useEffect(() => {
    api
      .get('/infowebsite/list')
      .then(({ data }) => {
        const dados = data.data
        setHeroiDesc(dados[0].descricao2);
        setObjD(dados[1].descricao2);
        setPodescT(dados[2].titulo);
        setPodescD(dados[2].descricao2);
        setmuraisDC(dados[3].descricao2);
        setArtistasDC(dados[4].descricao2);
        setEventosDC(dados[5].descricao2);
        setMapaDC(dados[6].descricao2);
        setSobreD(dados[7].descricao2);
        setMuraisD(dados[8].descricao2);
        setArtistasD(dados[9].descricao2);
      })
      .catch((error) => {
        alert(error)
      })
  }, [])

  return (
    <>
      <div className="d-flex">
        <Menu />
        <div className="w-100">
        <Topnav role="Administrador" nome="Nome do administrador" />
        <div className="container px-5">
        <h2 className="mt-5">Editar conteúdos do website</h2>
        <form>
          <div className="row d-flex justify-content-between">
            <div className="col-lg-5 mt-5">
              <div className="mb-5">
                <label className="form-label h4 fw-bold mt-md-3">
                  Descrição da secção herói
                </label>
                <textarea
                  className="form-control mt-md-4"
                  id="exampleFormControlTextarea1"
                  rows="5"
                  maxLength="200"
                  value={heroiDesc}
                  onChange={(e) => {
                  setHeroiDesc(e.target.value)
                  }}
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label h4 fw-bold mt-md-3">
                  Descrição da secção “Objetivo”
                </label>
                <textarea
                  className="form-control mt-md-3"
                  id="exampleFormControlTextarea1"
                  rows="5"
                  maxLength="200"
                  value={objD}
                  onChange={(e) => {
                  setObjD(e.target.value)
                  }}
                ></textarea>
              </div>
            </div>
            <div className="col-lg-5 mt-5">
              <div className="mb-5">
                <label className="form-label h4 fw-bold">
                  Titulo da secção dos cartões
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="5"
                  maxLength="200"
                  value={podescT}
                  onChange={(e) => {
                  setPodescT(e.target.value)
                  }}
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label h4 fw-bold">
                Descrição da secção dos cartões
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="5"
                  maxLength="200"
                  value={podescD}
                  onChange={(e) => {
                  setPodescD(e.target.value)
                  }}
                ></textarea>
              </div>
            </div>
            <hr className="my-5" />
            <div className="col-lg-5 mt-2">
              <div className="mb-5">
                <label className="form-label h4 fw-bold">
                  Texto do cartão “Murais”
                </label>
                <textarea
                  className="form-control mt-md-3"
                  id="exampleFormControlTextarea1"
                  rows="5"
                  maxLength="200"
                  value={muraisDC}
                  onChange={(e) => {
                  setmuraisDC(e.target.value);
                  }}
                ></textarea>
              </div>
              <div className="mb-5">
                <label className="form-label h4 fw-bold">
                  Texto do cartão “artistas”
                </label>
                <textarea
                  className="form-control mt-md-3"
                  id="exampleFormControlTextarea1"
                  rows="5"
                  maxLength="200"
                  value={artistasDC}
                  onChange={(e) => {
                  setArtistasDC(e.target.value);
                  }}
                ></textarea>
              </div>
            </div>
            <div className="col-lg-5 mt-2">
              <div className="mb-5">
                <label className="form-label h4 fw-bold">
                  Texto do cartão “Eventos”
                </label>
                <textarea
                  className="form-control mt-md-3"
                  id="exampleFormControlTextarea1"
                  rows="5"
                  maxLength="200"
                  value={eventosDC}
                  onChange={(e) => {
                  setEventosDC(e.target.value);
                  }}
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label h4 fw-bold">
                  Texto do cartão “Mapa”
                </label>
                <textarea
                  className="form-control mt-md-3"
                  id="exampleFormControlTextarea1"
                  rows="5"
                  maxLength="200"
                  value={mapaDC}
                  onChange={(e) => {
                  setMapaDC(e.target.value);
                  }}
                ></textarea>
              </div>
            </div>
            <hr className="my-5" />
  
            <div className="col-lg-5 mt-2">
              <div className="mb-5">
                <label className="form-label h4 fw-bold">
                  Texto sobre a Wool-Festival
                </label>
                <textarea
                  className="form-control mt-md-3"
                  id="exampleFormControlTextarea1"
                  rows="5"
                  maxLength="200"
                  value={sobreD}
                  onChange={(e) => {
                  setSobreD(e.target.value);
                  }}
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label h4 fw-bold">
                  Texto sobre Murais
                </label>
                <textarea
                  className="form-control mt-md-3"
                  id="exampleFormControlTextarea1"
                  rows="5"
                  maxLength="200"
                  value={muraisD}
                  onChange={(e) => {
                  setMuraisD(e.target.value);
                  }}
                ></textarea>
              </div>
            </div>
            <div className="col-lg-5 mt-2">
              <div className="mb-5">
                <label className="form-label h4 fw-bold">
                  Texto sobre Artistas
                </label>
                <textarea
                  className="form-control mt-md-3"
                  id="exampleFormControlTextarea1"
                  rows="5"
                  maxLength="200"
                  value={artistasD}
                  onChange={(e) => {
                  setArtistasD(e.target.value);
                  }}
                ></textarea>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary px-5 text-white d-block ms-auto mt-4 mb-4"
            onClick={SendUpdate}
          >
            Guardar
          </button>
        </form>
        </div>
      </div>
      </div>
    </>
  );
}
export default WebsiteManagement;
