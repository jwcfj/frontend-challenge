import React, { useState, useEffect, useRef } from "react";
import InputMask from "react-input-mask";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import TermsAndConditions from "./TermsAndConditions";
import SuccessSending from "./SuccessSending";
import Icons from "./Icons";

const ChallengeForm = () => {
  const [name, setName] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showFormSent, setShowFormSent] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [formSentSuccess, setFormSentSuccess] = useState(false);
  const campoRef = useRef(null);

  // Verificar se icone de senha foi clicado
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Verificar se icone de confirmação de senha foi clicado
  const handleShowConfirmationPassword = () => {
    setShowConfirmationPassword(!showConfirmationPassword);
  };

  // Abrir e fechar modal de termos e condições
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Verificar se chekcbox de termos e condições foi marcado
  const handleTermsChange = (event) => {
    setTermsAccepted(event.target.checked);
  };

  // Limpar localStorage (nosso "banco de dados" fake)
  const handleReset = () => {
    localStorage.removeItem("formsData");
    const storedData = JSON.parse(localStorage.getItem("formsData")) || [];
    console.log("BD Limpo: ", storedData);
  };

  // API retorna estados do Brasil
  useEffect(() => {
    const listAllStates = async () => {
      try {
        const response = await axios.get(
          "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
        );
        const sortStates = response.data.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );
        setStates(sortStates);
      } catch (error) {
        console.error("Erro ao carregar estados: ", error);
      }
    };

    listAllStates();
  }, []);

  // API retorna cidades do Brasil baseado no estado selecionado
  useEffect(() => {
    const listAllCities = async () => {
      try {
        if (selectedState) {
          const response = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios`
          );
          setCities(response.data);
        } else {
          setCities([]);
        }
      } catch (error) {
        console.error("Erro ao carregar cidades: ", error);
      }
    };
    listAllCities();
  }, [selectedState]);

  useEffect(() => {
    // Verificar se o modal está aberto e fechar ao clicar fora
    const closeModalOnOutsideClick = (event) => {
      if (event.target.id === "bbp-terms-and-conditions" && modalOpen) {
        closeModal();
      }
    };

    // Verificar se o modal está aberto e fechar ao clicar ESC
    const closeModalOnEscape = (event) => {
      if (event.keyCode === 27 && modalOpen) {
        closeModal();
      }
    };

    document.addEventListener("click", closeModalOnOutsideClick);
    document.addEventListener("keydown", closeModalOnEscape);

    return () => {
      document.removeEventListener("click", closeModalOnOutsideClick);
      document.removeEventListener("keydown", closeModalOnEscape);
    };
  }, [modalOpen]);

  // Deixar primeiro campo do formulário focado ao abrir tela
  useEffect(() => {
    campoRef.current.focus();
  }, []);

  // Função chamada ao submeter o formulário
  const handleSubmit = (event) => {
    event.preventDefault();

    // Verificar se o CPF digitado atende ao que é solicitado
    const cpf = event.target.cpf.value.replace(/[^0-9]+/g, "");
    if (cpf.length !== 11) {
      setErrorMessage("Digite um CPF válido!");
      return;
    } else {
      setErrorMessage("");
    }

    // Verificar a data de nascimento e o dia atual
    const birthday = new Date(event.target.birthday.value);
    const currentDate = new Date();

    // Verificar se a data de nascimento é um dia válido
    if (birthday >= currentDate) {
      setErrorMessage(
        "Data de nascimento inválida. Selecione uma data válida!"
      );
      return;
    } else {
      setErrorMessage("");
    }

    // Verificar se o número de telefone digitado atende ao que é solicitado
    const cellphoneNumber = event.target.cellphoneNumber.value.replace(
      /[^0-9]+/g,
      ""
    );
    if (cellphoneNumber.length !== 11) {
      setErrorMessage("Digite um número de telefone válido!");
      return;
    } else {
      setErrorMessage("");
    }

    const password = event.target.password.value;
    const confirmationPassword = event.target.confirmationPassword.value;

    // Verificar se a senha digitado atende ao que é solicitado
    if (password.length > 50) {
      setErrorMessage("A senha deve ter no máximo 50 caracteres.");
      return;
    }

    if (password.length < 5) {
      setErrorMessage("A senha deve ter no mínimo 5 caracteres.");
      return;
    }

    // Cria validações de senha
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).*$/;

    // Verificar se a senha digitado atende ao que é solicitado
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "A senha deve conter pelo menos um número, um caractere especial e uma letra maiúscula."
      );
      return;
    }

    // Verificar se as senhas digitadas são iguais
    if (password !== confirmationPassword) {
      setErrorMessage("As senhas não são iguais!");
      return;
    } else {
      setErrorMessage("");
    }

    // Verificar se o checkbox do termos e condições foi marcado
    if (!termsAccepted) {
      setErrorMessage("Você deve aceitar os termos e condições!");
      return;
    }

    // Verificar se o nome digitado atende ao que é solicitado
    const name = event.target.name.value;
    if (name.length > 30) {
      setErrorMessage("O nome deve ter no máximo 30 caracteres.");
      return;
    }

    // Verificar se o sobrenome digitado atende ao que é solicitado
    const surname = event.target.surname.value;
    if (surname.length > 30) {
      setErrorMessage("O sobrenome deve ter no máximo 30 caracteres.");
      return;
    }

    // Verificar se o email digitado atende ao que é solicitado
    const email = event.target.email.value;
    if (email.length > 50) {
      setErrorMessage("O email deve ter no máximo 50 caracteres.");
      return;
    }

    // Verificar se o endereço digitado atende ao que é solicitado
    const address = event.target.address.value;
    if (address.length > 50) {
      setErrorMessage("O endereço deve ter no máximo 50 caracteres.");
      return;
    }

    // Verificar se a profissão digitado atende ao que é solicitado
    const profession = event.target.profession.value;
    if (profession.length > 50) {
      setErrorMessage("A profissão deve ter no máximo 50 caracteres.");
      return;
    }

    // Verificar se a informação adicional digitado atende ao que é solicitado
    const additionalInformation = event.target.additionalInformation.value;
    if (additionalInformation.length > 500) {
      setErrorMessage(
        "As informações adicionais devem ter no máximo 500 caracteres."
      );
      return;
    }

    // Cria array de objetos para validar campos marcados
    const requiredFields = [
      { name: "name", label: "Nome" },
      { name: "surname", label: "Sobrenome" },
      { name: "email", label: "Email" },
      { name: "cpf", label: "CPF" },
      { name: "gender", label: "Gênero" },
      { name: "birthday", label: "Data de Nascimento" },
      { name: "cellphoneNumber", label: "Número de Telefone" },
      { name: "profession", label: "Profissão" },
      { name: "state", label: "Estado" },
      { name: "city", label: "Cidade" },
      { name: "password", label: "Senha" },
      { name: "confirmationPassword", label: "Confirmação de Senha" },
      { name: "validateTermsAndConditions", label: "Termos e Condições" },
    ];

    // Verificar se os campos foram marcados
    for (const field of requiredFields) {
      if (!event.target[field.name].value) {
        setErrorMessage(`O campo ${field.label} é obrigatório!`);
        return;
      }
    }

    // Cria objeto com valores dos inputs
    const jsonData = {
      name: event.target.name.value,
      surname: event.target.surname.value,
      email: event.target.email.value,
      cpf: event.target.cpf.value,
      profession: event.target.profession.value,
      gender: event.target.gender.value,
      birthday: event.target.birthday.value,
      address: event.target.address.value,
      cellphoneNumber: event.target.cellphoneNumber.value,
      state: selectedState,
      city: selectedCity,
      additionalInformation: event.target.additionalInformation.value,
      password: event.target.password.value,
      validateTermsAndConditions: event.target.validateTermsAndConditions.value,
      confirmationPassword: event.target.confirmationPassword.value,
    };
    console.log("Enviado com sucesso: ", jsonData);

    // Envia objeto dos inputs para localStorage
    const storedData = JSON.parse(localStorage.getItem("formsData")) || [];
    storedData.push(jsonData);
    localStorage.setItem("formsData", JSON.stringify(storedData));
    console.log("Envios anteriores: ", storedData);

    // Define visualização do componente de enviado com sucesso para verdadeiro
    setShowFormSent(true);

    // Define nome com o nome do objeto de inputs para enviar pro componente de enviado com sucesso
    setName(jsonData.name);

    // Define para verdadeiro que visualização de componente de enviado com sucesso foi visualizado
    setFormSentSuccess(true);
  };

  return (
    <div
      className={`bbp-container ${
        formSentSuccess ? "bbp-successful-container-height" : ""
      }`}
    >
      {showFormSent ? (
        <SuccessSending name={name} />
      ) : (
        <>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <h1 className="bbp-header">Formulário Genérico</h1>
          <form className="bbp-forms" onSubmit={handleSubmit}>
            <div className="bbp-wrapper">
              <label htmlFor="name">Nome:</label>
              <input type="text" id="name" name="name" ref={campoRef} />
            </div>
            <div className="bbp-wrapper">
              <label htmlFor="surname">Sobrenome:</label>
              <input type="text" id="surname" name="surname" />
            </div>
            <div className="bbp-wrapper">
              <label htmlFor="email">Email:</label>
              <input type="email" autoComplete="on" id="email" name="email" />
            </div>
            <div className="bbp-wrapper">
              <label htmlFor="cpf">CPF:</label>
              <InputMask
                mask="999.999.999-99"
                id="cpf"
                name="cpf"
                placeholder="000.000000-00"
              />
            </div>
            <div className="bbp-wrapper">
              <label>Gênero:</label>
              <div className="bbp-gender-align">
                <label htmlFor="male">
                  <input type="radio" id="male" name="gender" value="male" />
                  &nbsp;Masculino
                </label>
                <label htmlFor="female">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                  />
                  &nbsp;Feminino
                </label>
              </div>
            </div>
            <div className="bbp-wrapper icon-position">
              <label htmlFor="birthday">Data de Nascimento:</label>
              <DatePicker
                autoComplete="off"
                className="bbp-birthday"
                dateFormat="dd/MM/yyyy"
                id="birthday"
                name="birthday"
                onChange={(date) => setSelectedDate(date)}
                placeholderText="dd/mm/aaaa"
                selected={selectedDate}
              />
              <Icons
                typeIcon="calendar"
                className="calendar-icon"
                iconSize={"24"}
                fill="#a626a6"
              />
            </div>
            <div className="bbp-wrapper">
              <label htmlFor="address">Endereço:</label>
              <input type="text" id="address" name="address" />
            </div>
            <div className="bbp-wrapper">
              <label htmlFor="cellphoneNumber">Número de Telefone:</label>
              <InputMask
                mask="(99) 99999-9999"
                id="cellphoneNumber"
                name="cellphoneNumber"
                placeholder="(00) 00000-0000"
              />
            </div>
            <div className="bbp-wrapper">
              <label htmlFor="profession">Profissão:</label>
              <input type="text" id="profession" name="profession" />
            </div>
            <div className="bbp-wrapper">
              <label htmlFor="additionalInformation">
                Informações adicionais:
              </label>
              <textarea
                id="additionalInformation"
                name="additionalInformation"
                maxLength="500"
                placeholder="Se você tiver algo a acrescentar, preencha aqui."
              />
            </div>
            <div className="bbp-wrapper icon-position">
              <label htmlFor="state">Estado:</label>
              <select
                id="state"
                name="state"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
              >
                <option value="">Selecione um estado</option>
                {states.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.nome}
                  </option>
                ))}
              </select>
              <Icons
                typeIcon="arrow-down-double"
                className="down-arrow-icon"
                iconSize={"20"}
                fill="#a626a6"
              />
            </div>
            <div className="bbp-wrapper icon-position">
              <label htmlFor="city">Cidade</label>
              <select
                id="city"
                name="city"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">Selecione uma cidade</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.nome}
                  </option>
                ))}
              </select>
              <Icons
                typeIcon="arrow-down-double"
                className="down-arrow-icon"
                iconSize={"20"}
                fill="#a626a6"
              />
            </div>

            <div className="bbp-wrapper">
              <label htmlFor="password">Senha</label>
              <div className="bbp-password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  className="bbp-password-wrapper_entries"
                  id="password"
                  name="password"
                  title="A senha deve conter:
                  ➣ no mínimo 5 dígitos 
                  ➣ no máximo 30 dígitos 
                  ➣ ao menos um caractere especial
                  ➣ ao menos um uma letra maiúscula
                  ➣ ao menos um um número"
                />
                <Icons
                  typeIcon={
                    showPassword ? "visible-password" : "hidden-password"
                  }
                  onClick={handleShowPassword}
                />
              </div>
            </div>
            <div className="bbp-wrapper">
              <label htmlFor="confirmationPassword">
                Confirmação de Senha:
              </label>
              <div className="bbp-password-wrapper">
                <input
                  type={showConfirmationPassword ? "text" : "password"}
                  autoComplete="new-password"
                  className="bbp-password-wrapper_entries"
                  id="confirmationPassword"
                  name="confirmationPassword"
                  title="A senha deve conter:
                  ➣ no mínimo 5 dígitos 
                  ➣ no máximo 30 dígitos 
                  ➣ ao menos um caractere especial
                  ➣ ao menos um uma letra maiúscula
                  ➣ ao menos um um número"
                />
                <Icons
                  typeIcon={
                    showConfirmationPassword
                      ? "visible-password"
                      : "hidden-password"
                  }
                  onClick={handleShowConfirmationPassword}
                />
              </div>
            </div>
            <div className="bbp-wrapper">
              <label htmlFor="termsAndConditions">
                Leia e concorde com os{" "}
                <a href="#" onClick={openModal}>
                  termos e condições
                </a>
                &nbsp;antes de prosseguir.
              </label>

              {modalOpen && (
                <TermsAndConditions isOpen={modalOpen} onClose={closeModal} />
              )}
            </div>
            <div className="bbp-wrapper">
              <label
                className="bbp-validate-terms-and-conditions"
                htmlFor="validateTermsAndConditions"
              >
                Termos e condições:
                <label className="bbp-validate-terms-and-conditions_label">
                  <input
                    type="checkbox"
                    id="validateTermsAndConditions"
                    name="validateTermsAndConditions"
                    onChange={handleTermsChange}
                  />
                  &nbsp;Aceito os termos e condições
                </label>
              </label>
            </div>
            <div className="bbp-wrapper btn-bd">
              <button
                type="reset"
                className="bbp-btn-reset-bd"
                onClick={handleReset}
              >
                Resetar BD
              </button>
            </div>
            <div className="bbp-wrapper btn-align">
              <div className="bbp-buttons-wrapper">
                <button type="reset" className="bbp-btn-reset">
                  Limpar
                </button>

                <button
                  type="submit"
                  className="bbp-btn-submit"
                  disabled={!termsAccepted}
                >
                  Enviar
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ChallengeForm;
