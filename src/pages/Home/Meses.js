import React from 'react'
import { Link, Redirect} from 'react-router-dom'
import Rest from '../../utils/rest'

const baseUrl = 'https://mymoney-10de2.firebaseio.com/'
const { useGet } = Rest(baseUrl)

const Meses = () => {
  const data = useGet('meses')

  if (data.loading) {
    return <span>Carregando...</span>
  }
  if (data.error == 'Permission denied') {
    return <Redirect to='/login' />
  }
  if (Object.keys(data.data).length > 0) {
    return (
      <table className='table table-striped'>
        <thead className='table thead-dark'>
          <tr className="text-center">
            <th>Mês</th>
            <th>Previsão entrada</th>
            <th>Entrada</th>
            <th>Previsão saída</th>
            <th>Saída</th>
          </tr>
        </thead>
        <tbody>
          {
            Object
              .keys(data.data)
              .map(mes => {
                return (
                  <tr  className="text-center" key={mes}>
                    <td><Link to={`/movimentacoes/${mes}`}>{mes}</Link></td>
                    <td>{data.data[mes].previsao_entrada}</td>
                    <td>{data.data[mes].entradas}</td>
                    <td>{data.data[mes].previsao_saida}</td>
                    <td>{data.data[mes].saidas}</td>
                  </tr>
                )
              })
          }
        </tbody>
      </table>
    )
  }
  return null
}

export default Meses