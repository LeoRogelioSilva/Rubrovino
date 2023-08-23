import http from 'components/http/http'
import {
  Messages
} from '@tbjs/util'
const formataData = dataBrasil => {
  const splitted = dataBrasil.split('/')
  const dia = splitted[0]
  const mes = splitted[1]
  const ano = splitted[2]

  return `${ano}-${mes}-${dia}`
}

const performService = (idAgendamento, codigoAtendimento, nomeCliente, nomeProfissional) => new Promise((resolve, reject) => {
  const url = `/agendamento/realization/${idAgendamento}`
  http
    .put(url, { codigoAtendimento, nomeCliente, nomeProfissional })
    .then(response => resolve(response.data.data))
    .catch(errors => reject(errors.response.data))
})

const confirmation = (idAgendamento, hashPagamento, status) => new Promise((resolve, reject) => {
  const url = `/agendamento/confirmation/${idAgendamento}/${hashPagamento}/${status}`
  http
    .put(url)
    .then(response => {
      Messages.notifySuccess("Reagendamento Feito com Sucesso!")
      resolve(response.data.data)
    })
    .catch(errors => reject(errors.response.data))
})

const cancelAppointment = paymentHash => new Promise((resolve, reject) => {
  const url = `/agendamento/cancelarPagamento/${paymentHash}/web`
  http
    .put(url)
    .then(response => resolve(response.data.data))
    .catch(errors => reject(errors.response.data))
})

const getDoctorNextWeekSchedule = (idProfissional, idEspecialidade, idEndereco, dataPrimeiroDiaSemana) => {
  return new Promise((resolve, reject) => {
    const url = `/profissional/agenda/paginacao/${idProfissional}/${idEspecialidade}/${idEndereco}/${dataPrimeiroDiaSemana}`
    http.get(url)
      .then(response => resolve(response.data.data))
      .catch(error => reject(error.response.data))
  })
}

const findMeusAgendamentos = profissionalId => new Promise((resolve, reject) => {
  const url = `agendamento/meusAgendamentos/`

  http
    .get(url, { params: { profissionalId } })
    .then(response => {
      return resolve(response.data.data)
    })
    .catch(error => reject(error.response.data))
})

// const findAgendasAutomatizados = filtros => new Promise((resolve, reject) => {
//   if (!filtros.dataInicial || !filtros.dataFinal) {
//     return reject()
//   }

//   const url = `agendamento/findAgendasAutomaizadas/`

//   const filtrosAPI = {
//     dataInicial: formataData(filtros.dataInicial),
//     dataFinal: formataData(filtros.dataFinal)
//   }

//   http
//     .get(url, { params: { ...filtrosAPI } })
//     .then(response => {
//       return resolve(response.data.data)
//     })
//     .catch(error => reject(error.response.data))
// })

const find = filtros => new Promise((resolve, reject) => {
  try{
  if (!filtros.dataInicial || !filtros.dataFinal || !filtros.enderecoId) {
    return reject()
  }

  const url = `agendamento/`

  const filtrosAPI = {
    dataInicial: formataData(filtros.dataInicial),
    dataFinal: formataData(filtros.dataFinal),
    enderecoId: filtros.enderecoId,
    profissionalId: filtros.profissional ? filtros.profissional.profissionalId : null,
    clienteId: filtros.cliente ? filtros.cliente.pessoaId : null,
    status: null
  }

  http
    .get(url, { params: { ...filtrosAPI } })
    .then(response => {
      return resolve(response.data.data)
    })
    .catch(error => reject(error.response.data))
  }catch(e){
    console.log("ERRO service:" + e)
  }
})

const fetchProfessionalsByAddress = idEndereco => new Promise((resolve, reject) => {
  const url = `agendamento/${idEndereco}`
  http
    .get(url)
    .then(response => resolve(response.data.data))
    .catch(error => reject(error.response.data))
})

const fetchEventsByProfessional = (idEndereco, idProfissional, firstDayOfWeek, type) => new Promise((resolve, reject) => {
  const url = `agendamento/${idEndereco}/${idProfissional}/${firstDayOfWeek}/${type}`
  http
    .get(url)
    .then(response => resolve(response.data.data || []))
    .catch(error => reject(error.response.data))
})

const fetchAvailableSlotsByDate = (idProfissional, idEspecialidade, idEndereco, data) => new Promise((resolve, reject) => {
  const url = `agendamento/paginacao/${idProfissional}/${idEspecialidade}/${idEndereco}/${data}`
  http
    .get(url)
    .then(response => resolve(response.data.data))
    .catch(error => reject(error.response.data))
})

const fetchClientsByName = keyword => new Promise((resolve, reject) => {
  const url = `servico/buscar-cliente-por-nome-ou-documento/${keyword}`
  http
    .get(url)
    .then(response => resolve(response.data.data))
    .catch(error => reject(error.response.data))
})

const fetchEspecialidadesByProfessional = idProfissional => new Promise((resolve, reject) => {
  const url = `especialidade/expediente/${idProfissional}`
  http
    .get(url)
    .then(response => resolve(response.data.data))
    .catch(error => reject(error.response.data))
})

const fetchProcedimentosByEspecialidade = (idProfissional, idEspecialidade, keyword) => new Promise((resolve, reject) => {
  const url = `procedimento/expediente/${idProfissional}/${idEspecialidade}/${keyword}`
  http
    .get(url)
    .then(response => resolve(response.data.data))
    .catch(error => reject(error.response.data))
})

const saveSchedule = schedule => new Promise((resolve, reject) => {
  const url = `agendamento/${schedule.agendaId ? '' : 'salvar'}`
  const method = schedule.agendaId ? 'put' : 'post'
  http[method](url, schedule)
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      console.log(error)
      reject(error.response.data)
    })
})

const updateStatusSchedule = schedule => new Promise((resolve, reject) => {
  const url = `agendamento/alterar-status`
  const method = 'put'
  http[method](url, schedule)
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      console.log(error)
      reject(error.response.data)
    })
})

const findByScheduleId = id => new Promise((resolve, reject) => {
  const url = `agendamento/detail/${id}`
  http
    .get(url)
    .then(response => resolve(response.data.data))
    .catch(error => reject(error.response.data))
})

const findNotaFiscalById = id => new Promise((resolve, reject) => {
  const url = `agendamento/notafiscalinfos/${id}`
  http
    .get(url)
    .then(response => resolve(response.data.data))
    .catch(error => reject(error.response.data))
})

const deleteSchedule = idAgenda => new Promise((resolve, reject) => {
  const url = `agendamento/${idAgenda}`
  http
    .delete(url)
    .then(response => resolve(response.data.data))
    .catch(error => reject(error.response.data))
})

const verificarReagendamentos = () => new Promise(async (resolve, reject) => {
  try {
    const url = '/agendamento/verificaReagendamentos'
    const response = await http.get(url)
    resolve(response.data.data)
  } catch (e) {
    reject(e.response.data)
  }
})

export default {
  getDoctorNextWeekSchedule,
  find,
  performService,
  confirmation,
  cancelAppointment,
  fetchProfessionalsByAddress,
  fetchEventsByProfessional,
  fetchAvailableSlotsByDate,
  fetchClientsByName,
  fetchEspecialidadesByProfessional,
  fetchProcedimentosByEspecialidade,
  saveSchedule,
  updateStatusSchedule,
  findByScheduleId,
  findNotaFiscalById,
  deleteSchedule,
  verificarReagendamentos,
  findMeusAgendamentos,
  findAgendasAutomatizados(filtros) {
    return new Promise(function(resolve, reject) {
      if (!filtros.dataInicial || !filtros.dataFinal) {
        return reject()
      }

      const url = `agendamento/findAgendasAutomaizadas/`

      const filtrosAPI = {
        dataInicial: formataData(filtros.dataInicial),
        dataFinal: formataData(filtros.dataFinal)
      }

      http
        .get(url, { params: { ...filtrosAPI } })
        .then(response => {
          resolve(response.data.data)
        })
        .catch(error => reject(error.response.data))
    })
  }
}
