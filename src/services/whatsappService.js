// services/whatsappService.js

import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

export const sendTemplateMessageVaga = async (phoneNumber, nome, vaga, dataHora) => {
  // Verificações iniciais
  if (!phoneNumber) {
    console.error("[WhatsApp Service] Erro: Número de telefone não fornecido.");
    throw new Error("Número de telefone não fornecido.");
  }
  if (!WHATSAPP_API_URL || !ACCESS_TOKEN) {
    console.error("[WhatsApp Service] Erro: Variáveis de ambiente WHATSAPP_API_URL ou ACCESS_TOKEN não configuradas.");
    throw new Error("Configuração da API do WhatsApp incompleta no servidor.");
  }

  try {
    let cleanPhoneNumber = phoneNumber.replace(/\D/g, "");
    if (!cleanPhoneNumber.startsWith("55")) {
      cleanPhoneNumber = `55${cleanPhoneNumber}`;
    }

    const payload = {
      messaging_product: "whatsapp",
      to: cleanPhoneNumber,
      type: "template",
      template: {
        name: "vaga", // NOME DO TEMPLATE! criado no meta business manager
        language: { code: "pt_BR" },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", parameter_name: "nome", text: nome || "Morador" },
              { type: "text", parameter_name: "vaga", text: vaga || "N/D" },
              { type: "text", parameter_name: "data", text: dataHora || "N/D" },
            ],
          },
        ],
      },
    };

    // Chamada à API
    const response = await axios.post(WHATSAPP_API_URL, payload, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    // Log de sucesso (útil manter)
    console.log(`✅ [WhatsApp Service] Mensagem para ${phoneNumber} enviada. Status: ${response.data?.messages?.[0]?.message_status}`);
    return response.data;

  } catch (error) {
    // Log de erro detalhado (importante manter)
    const errorMsg = error.response?.data?.error?.message || error.response?.data || error.message;
    const errorCode = error.response?.data?.error?.code;
    const errorDetails = error.response?.data?.error?.error_data?.details;
    console.error(`❌ [WhatsApp Service] Erro ao enviar mensagem para ${phoneNumber}: ${errorMsg} (Code: ${errorCode})`, errorDetails ? `Details: ${errorDetails}` : '');
    throw new Error(`Falha ao enviar WhatsApp: ${errorMsg}`);
  }
};