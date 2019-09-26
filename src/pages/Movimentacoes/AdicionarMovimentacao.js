import React, { useState } from 'react'

const AdicionarMovimentacao = ({ salvarNovaMovimentacao }) => {
  // Gestão do Formulario
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const onChangeDescricao = evt => { setDescricao(evt.target.value) }
  const onChangeValor = evt => { setValor(evt.target.value) }
  const salvarMovimentacao = async () => {
    if (!isNaN(valor) && valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0) {
      await salvarNovaMovimentacao({
        descricao,
        valor: parseFloat(valor)
      })
      setDescricao('')
      setValor(0)
    }
  }
  return (
    <tr className='text-center'>
      <td>
        <input className='text-center' placeholder="Adicionar Descrição" type='text' value={descricao} onChange={onChangeDescricao} />
      </td>
      <td>
        <input className='text-center' placeholder="Adicionar Valor" type='text' value={valor} onChange={onChangeValor} />
      </td>
      <td><button className='btn btn-success' onClick={salvarMovimentacao}>Adicionar</button></td>
    </tr>
  )

}

export default AdicionarMovimentacao
