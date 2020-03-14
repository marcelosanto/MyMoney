import Rest from '../utils/rest'

const baseUrl = 'https://mymoney-10de2.firebaseio.com/'
const { useGet, usePost, useDelete, usePatch } = Rest(baseUrl)

export const useMesApi = (data) => {
  const infoMes = useGet(`meses/${data}`)
  const [dataPatch, alterarMes] = usePatch(`meses/${data}`)
  return { infoMes, alterarMes }
}

export const useMovimentacaoApi = (data) => {
  const movimentacoes = useGet(`movimentacoes/${data}`)
  const [postData, salvarNovaMovimentacao] = usePost(`movimentacoes/${data}`)
  const [removeData, removerMovimentacao] = useDelete('')
  return { movimentacoes, salvarNovaMovimentacao, removerMovimentacao }
}

