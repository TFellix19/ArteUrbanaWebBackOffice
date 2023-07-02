import {useState } from 'react'
import {useNavigate} from 'react-router-dom'
import '../css/App.css'

function Login() {

  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (email === 'admin' && pwd === 'admin321') {
      navigate('/Dashboard'); // Redireciona para a página de dashboard
    } else {
      alert('Dados inválidos. Tente novamente.');
    }
  };

  return (
    <main className="bg-image vw-100 vh-100 d-flex align-items-center">
      <div className="container">
        <div className="d-flex mx-auto justify-content-center flex-column" style={{ maxWidth: '24rem' }}
        >
          <div className="px-4 pb-5 pt-4 bg-card  shadow mt-4 rounded-3">
            <div className="card-header text-center fw-bold h5">
              Painel de administradores
            </div>
            <div className="card-body px-4">
              <form onSubmit={handleLogin}>
                <div className="row g-3 mt-2">
                  <div className="col-md-12">
                    <label htmlFor="inputEmail" className="col-form-label">
                      Utilizador
                    </label>
                    <input
                      type="text"
                      id="inputText"
                      className="form-control"
                      autoComplete="off"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                    />
                    <div className="form-outline mb-4">
                      <label
                        htmlFor="inputPassword"
                        className="col-form-label mt-3"
                      >
                        Palavra passe
                      </label>
                      <input
                        type="password"
                        id="inputPassword"
                        className="form-control"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id='persist'
                        />
                        <label
                          className="form-check-label"
                          htmlFor="persist"
                          
                        >
                          Lembrar a palavra-passe
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary w-100 text-white" >Entrar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login
