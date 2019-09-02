import React from 'react'
import useGet from './useGet'
import usePost from './usePost'


const url = 'https://mymoney-10de2.firebaseio.com/movimentacoes/2019-08.json'


function App() {
  const data = useGet(url)
  const [postData, post] = usePost(url)
  

  const saveNew = () => {
    post({ valor: 25, descricao: 'funfou mano' })
  }

  return (
    <div>

      <h1>My Money</h1>
      { JSON.stringify(data) }
      { data.loading && <p>Loading...</p> }
      <button onClick={saveNew}>Salvar</button>
      <pre>{JSON.stringify(postData)}</pre>

    </div>
  )
}

export default App;
