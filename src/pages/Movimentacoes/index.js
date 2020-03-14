import React from 'react'
import { Redirect } from 'react-router-dom'
import { useMovimentacaoApi } from '../../api'
import InfoMes from './InfoMes'
import AdicionarMovimentacao from './AdicionarMovimentacao'

const Movimentacoes = ({ match }) => {
  const { movimentacoes, salvarNovaMovimentacao, removerMovimentacao } = useMovimentacaoApi(match.params.data)

  const salvarMovimentacao = async (dados) => {
    await salvarNovaMovimentacao(dados)
    movimentacoes.refetch()
    await sleep(5000)
    //infoMes.refetch()

  }
  const sleep = time => new Promise(resolve => setTimeout(resolve, time))
  const remover = async (id) => {
    await removerMovimentacao((`movimentacoes/${match.params.data}/${id}`))
    movimentacoes.refetch()
    await sleep(5000)
    //infoMes.refetch()
  }

  if (movimentacoes.error == 'Permission denied') {
    return <Redirect to='/login' />
  }

  return (
    <div className='container'>
      <h1>Movimentaçoes</h1>
      <InfoMes data={match.params.data} />
      <table className='container table table-striped'>
        <thead className='thead-dark'>
          <tr className='text-center'>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {movimentacoes.data &&
            Object
              .keys(movimentacoes.data)
              .map(movimentacao => {
                return (
                  <tr className='text-center' key={movimentacao}>
                    <td>{movimentacoes.data[movimentacao].descricao}</td>
                    <td >
                      {movimentacoes.data[movimentacao].valor} {'  '}
                    </td>
                    <td>
                      <button className='btn btn-danger' onClick={() => remover(movimentacao)}>excluir</button>
                    </td>
                  </tr>
                )
              })
          }
          <AdicionarMovimentacao salvarNovaMovimentacao={salvarMovimentacao} />
        </tbody>
      </table>
    </div>
  )
}

export default Movimentacoes