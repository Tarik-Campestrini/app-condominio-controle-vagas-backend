import Vaga from "../models/vagaModel.js";
import Morador from "../models/moradorModel.js";
import { sendTemplateMessageVaga } from "../services/whatsappService.js"; 

// Função para Criar uma vaga
export const createVaga = async (req, res) => {
  try {
    const { identificador } = req.body;
    const existingVaga = await Vaga.findOne({ identificador });
    if (existingVaga) {
      return res.status(400).json({ message: "Essa vaga já existe!" });
    }
    const vaga = new Vaga({ identificador });
    await vaga.save();
    res.status(201).json({ message: "Vaga criada com sucesso!", vaga });
  } catch (error) {
    console.error("Erro ao criar vaga:", error); 
    res.status(500).json({ message: "Erro ao criar vaga.", error: error.message });
  }
};

// Função para Listar todas as vagas
export const listarVagas = async (req, res) => {
  try {
    const vagas = await Vaga.find()
      .populate("morador") // Popula morador completo
      .populate("veiculo") // Popula veículo completo
      .sort({ identificador: 1 });
    res.status(200).json(vagas);
  } catch (error) {
    console.error("Erro ao listar vagas:", error); 
    res.status(500).json({ message: "Erro ao listar vagas.", error: error.message });
  }
};

// Função para Ocupar uma vaga
export const ocuparVaga = async (req, res) => {

  // Variáveis para rastrear status da notificação
  let notificationAttempted = false;
  let notificationSuccess = true;
  let notificationErrorMsg = null;

  try {
    const { id } = req.params;
    const { morador, veiculo, visitante, dataSaida, notificationOption, notificationRecipientId } = req.body;

    //  Validações sobre a vaga
    const vagaExistente = await Vaga.findById(id);
    if (!vagaExistente) return res.status(404).json({ error: "Vaga não encontrada." });
    if (vagaExistente.status === "Ocupada") return res.status(409).json({ error: "Esta vaga já está ocupada." });

    // Preparação dos Dados para Atualização
    const updateData = {
      status: "Ocupada",
      dataEntrada: new Date(),
      dataSaida: dataSaida ? new Date(dataSaida) : null,
    };
    if (morador) {
        updateData.morador = morador;
        updateData.veiculo = veiculo;
        updateData.visitante = null;
    } else if (visitante) {
        updateData.visitante = visitante;
        updateData.morador = null;
        updateData.veiculo = null;
    } else {
        return res.status(400).json({ error: "É necessário informar um morador ou um visitante." });
    }

    //  Atualização e Populate 
    const vagaAtualizada = await Vaga.findByIdAndUpdate(id, updateData, { new: true })
      .populate("morador", "nome telefone") // Popula ocupante (nome e telefone)
      .populate("veiculo", "placa modelo"); // Popula veículo (placa e modelo)

    // LÓGICA DE NOTIFICAÇÃO (SE FOR MORADOR OCUPANDO) ---
    if (vagaAtualizada.morador) { // Apenas se um morador ocupou
      const moradorOcupante = vagaAtualizada.morador;
      const veiculoOcupante = vagaAtualizada.veiculo;
      const vagaId = vagaAtualizada.identificador;
      let dataSaidaFormatada = "sem previsão";
      if (vagaAtualizada.dataSaida) {
        try {
          dataSaidaFormatada = vagaAtualizada.dataSaida.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false });
        } catch (formatError) { console.error("Erro ao formatar data de saída:", formatError); }
      }

      // Prepara dados base para o template
      const templateNomeOcupante = moradorOcupante.nome;
      const templateVagaInfo = vagaId + (veiculoOcupante ? ` (Veículo: ${veiculoOcupante.placa})` : '');
      const templateDataSaida = dataSaidaFormatada;

      const notificationPromises = [];
      notificationAttempted = true; // (o ocupante sempre recebera a menssagem por default)

      // Adiciona promessa para notificação PADRÃO do ocupante (se tiver telefone cadastrado)
      if (moradorOcupante.telefone) {
        notificationPromises.push(
          sendTemplateMessageVaga(moradorOcupante.telefone, templateNomeOcupante, templateVagaInfo, templateDataSaida)
        );
      } else {
        console.log(`ℹ️ Morador ocupante ${moradorOcupante.nome} não possui telefone para notificação padrão.`);
      }

      //  Adiciona promessas para notificações ADICIONAIS
      if (notificationOption === 'all') {
        const outrosMoradores = await Morador.find({ _id: { $ne: moradorOcupante._id }, telefone: { $ne: null } }, 'nome telefone');
        outrosMoradores.forEach(m => {
          notificationPromises.push(
            sendTemplateMessageVaga(m.telefone, templateNomeOcupante, templateVagaInfo, templateDataSaida)
          );
        });
      } else if (notificationOption === 'specific' && notificationRecipientId) {
        if (moradorOcupante._id.toString() !== notificationRecipientId) {
            const destinatarioEspecifico = await Morador.findOne({ _id: notificationRecipientId, telefone: { $ne: null } }, 'nome telefone');
            if (destinatarioEspecifico) {
              notificationPromises.push(
                sendTemplateMessageVaga(destinatarioEspecifico.telefone, templateNomeOcupante, templateVagaInfo, templateDataSaida)
              );
            } else { console.log(`⚠️ Destinatário específico (ID: ${notificationRecipientId}) não encontrado ou sem telefone.`); }
        } else { console.log(`ℹ️ Destinatário específico é o próprio ocupante, notificação padrão já será enviada.`); }
      }

      //  Envia todas as notificações preparadas (se houver alguma)
      if (notificationPromises.length > 0) {
        console.log(`🚀 Tentando enviar ${notificationPromises.length} notificações...`); 
        try {
          const results = await Promise.allSettled(notificationPromises);
          const failedCount = results.filter(r => r.status === 'rejected').length;
          if (failedCount > 0) {
            notificationSuccess = false;
            const firstError = results.find(r => r.status === 'rejected');
            notificationErrorMsg = firstError.reason?.message || "Falha no envio de uma ou mais notificações.";
            console.error(`⚠️ ${failedCount} notificação(ões) falharam. Primeiro erro: ${notificationErrorMsg}`); 
          } else {
            console.log(`✅ ${notificationPromises.length} notificação(ões) enviadas com sucesso.`);
          }
        } catch (groupError) {
          notificationSuccess = false;
          notificationErrorMsg = groupError.message || "Erro inesperado ao processar envios.";
          console.error("⚠️ Erro inesperado durante Promise.allSettled:", groupError); 
        }
      } else {
         notificationAttempted = false; // Nenhuma notificação foi realmente tentada
         console.log("ℹ️ Nenhuma notificação a ser enviada (sem destinatários válidos)."); 
      }
    } else {
      // Log informativo se não for morador ou opção 'none' (já coberto no frontend, mas bom ter)
      console.log("ℹ️ Notificação pulada (Visitante ou opção 'none').");
    }
    

    // Inclui status da notificação na resposta JSON
    res.status(200).json({
      message: "Vaga ocupada com sucesso!",
      vaga: vagaAtualizada,
      notification: {
        attempted: notificationAttempted,
        success: notificationSuccess,
        error: notificationErrorMsg
      }
    });

  } catch (error) {
     if (error.code === 11000) {
       return res.status(409).json({ error: "Conflito: Veículo ou morador já pode estar associado a outra vaga.", details: error.message });
     }
     console.error("❌ Erro geral ao ocupar vaga:", error); 
     return res.status(500).json({ error: "Erro interno no servidor ao tentar ocupar a vaga.", details: error.message });
  }
};

//  Liberar vaga
export const liberarVaga = async (req, res) => {
  try {
    const { id } = req.params;
    const vaga = await Vaga.findByIdAndUpdate(
      id,
      {
        status: "Livre",
        morador: null,
        veiculo: null,
        visitante: null,
        dataEntrada: null,
        dataSaida: null,
      },
      { new: true }
    );
    res.status(200).json({ message: "Vaga liberada com sucesso!", vaga });
  } catch (error) {
    console.error("Erro ao liberar vaga:", error); 
    res.status(500).json({ message: "Erro ao liberar vaga.", error: error.message });
  }
};

//  Deletar vaga
export const deletarVaga = async (req, res) => {
  try {
    const { id } = req.params;
    await Vaga.findByIdAndDelete(id);
    res.status(200).json({ message: "Vaga deletada com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar vaga:", error); 
    res.status(500).json({ message: "Erro ao deletar vaga.", error: error.message });
  }
};