
import './filme-info.css';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../service/api';

export default function Filme(){
  const { id } = useParams();
  const history = useHistory(); //Função que mexe com a parte de history do navegador
  const [filme, setFilme] = useState([]);
  const [loading, setLoading] = useState(true); // Mensagem "Carregando o filme" para o usuário

  useEffect(() => {
    async function loadFilme() {
      const response = await api.get(`/r-api/?api=filmes/${id}`);

      if (response.data.length === 0) { //Para checar se o site existe
        history.replace('/'); //Redireciona para a Home
        return;
      }

      setFilme(response.data);
      setLoading(false); //Tira o Loading quando o filme é carregado
    }

    loadFilme();

    return() => {
      console.log('Componente Desmontado')
    }

  }, [history, id]);

  if (loading) { // Se o Loading estiver "true" cai dentro desse "if"
    return(
      <div className="filme-info">
        <h1>Carregando o filme...</h1>
      </div>
    );
  }

  return(
    <div className="filme-info">
      <h1>{filme.nome}</h1>
      <img src={filme.foto} alt={filme.nome} />
      <h3>Sinopse</h3>
      {filme.sinopse}

      <div className="botoes">
        <button onclick={() => {}}>Salvar</button>
        <button>
          <a href={`https://www.youtube.com/results?search_query=${filme.nome} Trailer`} target="_blank">
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}