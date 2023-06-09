import React from "react";

const SuccessSending = ({name}) => {
  return (
    <div className="bbp-success-message-container">
      <h3>Formulário enviado com sucesso, {name}!</h3>
      <p>Obrigado por enviar suas informações.</p>
      <br />
      <p>
        <b>Blessed Bytes Challenge</b>
      </p>
      <small>Igreja Presbiteriana de Boa Viagem</small>
    </div>
  );
};

export default SuccessSending;
