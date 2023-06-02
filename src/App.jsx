import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const Formulario = () => {
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState("");
  const [cidadeSelecionada, setCidadeSelecionada] = useState("");

  useEffect(() => {
    const carregarEstados = async () => {
      try {
        const response = await axios.get(
          "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
        );
        setEstados(response.data);
        console.log("api estados:", response.data);
      } catch (error) {
        console.error("Erro ao carregar estados:", error);
      }
    };

    carregarEstados();
  }, []);

  useEffect(() => {
    const carregarCidades = async () => {
      if (estadoSelecionado) {
        try {
          const response = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/PE/municipios`
          );
          setCidades(response.data);
          console.log("api cidades:", response);
        } catch (error) {
          console.error("Erro ao carregar cidades:", error);
        }
      } else {
        setCidades([]);
      }
    };

    carregarCidades();
  }, [estadoSelecionado]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para enviar os dados do formulário
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <div className="campo">
        <label htmlFor="nome">Nome</label>
        <input type="text" id="nome" name="nome" required />
      </div>

      <div className="campo">
        <label htmlFor="sobrenome">Sobrenome</label>
        <input type="text" id="sobrenome" name="sobrenome" required />
      </div>

      <div className="campo">
        <label htmlFor="idade">Idade</label>
        <input type="number" id="idade" name="idade" required />
      </div>

      <div className="campo">
        <label htmlFor="profissao">Profissão</label>
        <input type="text" id="profissao" name="profissao" required />
      </div>

      <div className="campo">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>

      <div className="campo">
        <label htmlFor="senha">Senha</label>
        <input type="password" id="senha" name="senha" required />
      </div>

      <div className="campo">
        <label htmlFor="confirmacaoSenha">Confirmação de Senha</label>
        <div className="senha-container">
          <input
            type="password"
            id="confirmacaoSenha"
            name="confirmacaoSenha"
            required
          />
          <i className="eye-icon"></i>
        </div>
      </div>

      <div className="campo">
        <label>Gênero</label>
        <div>
          <label htmlFor="sexoMasculino">
            <input
              type="radio"
              id="sexoMasculino"
              name="sexo"
              value="masculino"
              required
            />
            Masculino
          </label>
          <label htmlFor="sexoFeminino">
            <input
              type="radio"
              id="sexoFeminino"
              name="sexo"
              value="feminino"
              required
            />
            Feminino
          </label>
        </div>
      </div>

      <div className="campo">
        <label htmlFor="dataNascimento">Data de Nascimento</label>
        <input type="date" id="dataNascimento" name="dataNascimento" required />
      </div>

      <div className="campo">
        <label htmlFor="informacoesAdicionais">
          Campo de informações adicionais
        </label>
        <textarea id="informacoesAdicionais" name="informacoesAdicionais" />
      </div>

      <div className="campo">
        <label htmlFor="endereco">Endereço</label>
        <input type="text" id="endereco" name="endereco" />
      </div>

      <div className="campo">
        <label htmlFor="estado">Estado</label>
        <select
          id="estado"
          name="estado"
          value={estadoSelecionado}
          onChange={(e) => setEstadoSelecionado(e.target.value)}
          required
        >
          <option value="">Selecione um estado</option>
          {estados.map((estado) => (
            <option key={estado.id} value={estado.id}>
              {estado.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="campo">
        <label htmlFor="cidade">Cidade</label>
        <select
          id="cidade"
          name="cidade"
          value={cidadeSelecionada}
          onChange={(e) => setCidadeSelecionada(e.target.value)}
          required
        >
          <option value="">Selecione uma cidade</option>
          {cidades.map((cidade) => (
            <option key={cidade.id} value={cidade.id}>
              {cidade.nome}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
};

export default Formulario;
