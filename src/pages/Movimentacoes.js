import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Rest from '../utils/rest'

const baseUrl = 'https://mymoney-10de2.firebaseio.com/'
const { useGet, usePost, useDelete, usePatch } = Rest(baseUrl)

const Movimentacoes = ({ match }) => {  
  const infoMes = useGet(`meses/${match.params.data}`)
  const [dataPatch, alterarMes] = usePatch(`meses/${match.params.data}`)

  const movimentacoes = useGet(`movimentacoes/${match.params.data}`)
  const [postData, salvarNovaMovimentacao] = usePost(`movimentacoes/${match.params.data}`)
  const [removeData, removerMovimentacao] = useDelete('')

  // Gestão do Formulario
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
      await salvarNovaMovimentacao({
        descricao,
        valor: parseFloat(valor)
      })
      setDescricao('')
      setValor(0)
      movimentacoes.refetch()
      await sleep(5000)
      infoMes.refetch()
    }
  }

  const remover = async (id) => {
    await removerMovimentacao((`movimentacoes/${match.params.data}/${id}`))
    movimentacoes.refetch()
    await sleep(5000)
    infoMes.refetch()
  }

  const alterarPrevisaoEntrada = (evt) => {
    alterarMes({ previsao_entrada: evt.target.value })
  }

  const alterarPrevisaoSaida = (evt) => {
    alterarMes({ previsao_saida: evt.target.value })
  }

  if(movimentacoes.error == 'Permission denied') {
    return <Redirect to='/login' />
  }

  return (
    <div className='container'>
      <h1>Movimentaçoes</h1>
      {
        !infoMes.loading && infoMes.data && <div>
          <span>Previsão Entrada: {infoMes.data.previsao_entrada}</span> <input type='text' onBlur={alterarPrevisaoEntrada} /> 
          &nbsp;&nbsp;&nbsp;Previsão saida: {infoMes.data.previsao_saida} <input type='text' onBlur={alterarPrevisaoSaida} />
          &nbsp;&nbsp;&nbsp;Entrada: {infoMes.data.entradas}
          &nbsp;&nbsp;&nbsp;Saidas: {infoMes.data.saidas}
        </div>
      }<br/>
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
          <tr className='text-center'>
            <td>
              <input className='text-center' placeholder="Adicionar Descrição" type='text' value={descricao} onChange={onChangeDescricao} />
            </td>
            <td>
              <input className='text-center' placeholder="Adicionar Valor" type='text' value={valor} onChange={onChangeValor} />
            </td>
            <td><button className='btn btn-success' onClick={salvarMovimentacao}>Adicionar</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Movimentacoes