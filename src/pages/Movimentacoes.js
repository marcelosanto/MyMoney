import React, { useState } from 'react'
import Rest from '../utils/rest'

const baseUrl = 'https://mymoney-10de2.firebaseio.com/'
const { useGet, usePost, useDelete, usePatch } = Rest(baseUrl)

const Movimentacoes = ({ match }) => {
  const data = useGet(`movimentacoes/${match.params.data}`)
  const dataMeses = useGet(`meses/${match.params.data}`)
  const [dataPatch, patch] = usePatch()
  const [postData, salvar] = usePost(`movimentacoes/${match.params.data}`)
  const [removeData, remover] = useDelete('')
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')

  const onChangeDescricao = evt => {
    setDescricao(evt.target.value)
  }

  const onChangeValor = evt => {
    setValor(evt.target.value)
  }

  const sleep = time => new Promise(resolve => setTimeout(resolve, time))

  const salvarMovimentacao = async () => {
    if (!isNaN(valor) && valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0) {
      await salvar({
        descricao,
        valor: parseFloat(valor)
      })
      setDescricao('')
      setValor(0)
      data.refetch()
      await sleep(5000)
      dataMeses.refetch()
    }
  }

  const removerMovimentacao = async (id) => {
    await remover((`movimentacoes/${match.params.data}/${id}`))
    data.refetch()
    await sleep(5000)
    dataMeses.refetch()
  }

  const alterarPrevisaoEntrada = (evt) => {
    patch(`meses/${match.params.data}`, { 
      previsao_entrada: evt.target.value })
  }

  const alterarPrevisaoSaida = (evt) => {
    patch(`meses/${match.params.data}`, { 
      previsao_saida: evt.target.value })
  }

  return (
    <div className='container'>
      <h1>Movimentaçoes</h1>
      {
        !dataMeses.loading && dataMeses.data && <div>
          <span>Previsão Entrada: {dataMeses.data.previsao_entrada}</span> <input type='text' onBlur={alterarPrevisaoEntrada} /> 
          &nbsp;&nbsp;&nbsp;Previsão saida: {dataMeses.data.previsao_saida} <input type='text' onBlur={alterarPrevisaoSaida} /><br/>
          Entrada: {dataMeses.data.entradas}
          &nbsp;&nbsp;&nbsp;Saidas: {dataMeses.data.saidas}
        </div>
      }
      <table className='container table table-striped'>
        <thead className='thead-dark'>
          <tr className='text-center'>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {data.data &&
            Object
              .keys(data.data)
              .map(movimentacao => {
                return (
                  <tr className='text-center' key={movimentacao}>
                    <td>{data.data[movimentacao].descricao}</td>
                    <td >
                      {data.data[movimentacao].valor} {'  '}
                    </td>
                    <td>
                    <button className='btn btn-danger' onClick={() => removerMovimentacao(movimentacao)}>excluir</button>
                    </td>
                  </tr>
                )
              })
          }
          <tr className='text-center'>
            <td>
              <input type='text' value={descricao} onChange={onChangeDescricao} />
            </td>
            <td>
              <input type='text' value={valor} onChange={onChangeValor} />
            </td>
            <td><button className='btn btn-success' onClick={salvarMovimentacao}>Adicionar</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Movimentacoes