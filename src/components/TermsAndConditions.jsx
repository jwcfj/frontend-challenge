import React from "react";
import Icons from "./Icons";

const TermsAndConditions = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="bbp-terms-and-conditions" id="bbp-terms-and-conditions">
      <div className="bbp-terms-and-conditions_content">
        <Icons
          typeIcon="close-modal"
          className="bbp-terms-and-conditions_content_close"
          onClick={onClose}
        />
        <div className="bbp-terms-and-conditions_content_text">
          <h1>
            <b>Termos de Uso</b>
          </h1>
          <h3>
            <em>
              Bem-vindo! Antes de prosseguir com o uso do nosso formulário,
              solicitamos que você leia atentamente os termos a seguir. Ao
              utilizar este formulário, você concorda com todos os termos e
              condições estabelecidos abaixo:
            </em>
          </h3>
          <br />

          <ol>
            <li>
              <b>Uso Responsável:</b> Ao utilizar este formulário, comprometa-se
              a fornecer informações verdadeiras, precisas e atualizadas. Você é
              responsável pela veracidade dos dados fornecidos e pelo uso
              adequado do formulário.
            </li>
            <li>
              <b>Privacidade:</b> Respeitamos sua privacidade e estamos
              empenhados em proteger suas informações pessoais. Os dados
              fornecidos neste formulário serão coletados e processados de
              acordo com a nossa Política de Privacidade. Não compartilharemos
              suas informações com terceiros, exceto quando necessário para o
              processamento e envio do formulário.
            </li>
            <li>
              <b>Propriedade Intelectual:</b> Todo o conteúdo presente neste
              formulário, incluindo textos, imagens, logotipos e outros
              elementos, é protegido por direitos autorais e outras leis de
              propriedade intelectual. É proibida a reprodução, distribuição ou
              uso não autorizado de qualquer conteúdo presente neste formulário.
            </li>
            <li>
              <b>Responsabilidade:</b> O uso deste formulário é por sua conta e
              risco. Não nos responsabilizamos por quaisquer danos diretos,
              indiretos, incidentais, consequenciais ou outros que possam surgir
              do uso deste formulário, incluindo perda de dados, interrupção do
              serviço ou qualquer outro tipo de prejuízo.
            </li>
            <li>
              <b>Alterações nos Termos:</b> Podemos modificar estes termos a
              qualquer momento, sem aviso prévio. Recomendamos que você revise
              periodicamente os termos para estar ciente de quaisquer
              alterações. O uso contínuo do formulário após a publicação das
              alterações constitui sua aceitação dos termos revisados.
            </li>
            <li>
              <b>Encerramento do Acesso:</b> Reservamo-nos o direito de encerrar
              seu acesso a este formulário a qualquer momento, por qualquer
              motivo, sem aviso prévio.
            </li>
          </ol>

          <p>
            <em>
              Ao utilizar este formulário, você concorda em cumprir todos os
              termos e condições aqui estabelecidos. Se você não concorda com
              algum desses termos, pedimos que não utilize o formulário. Caso
              tenha alguma dúvida ou precise de mais informações, entre em
              contato conosco.
            </em>
          </p>
          <p>
            <b>Obrigado por utilizar nosso formulário!</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
