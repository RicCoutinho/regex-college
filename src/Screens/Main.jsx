import React, {useState} from 'react'

function Main() {
  const [text, setText] = useState('')
  const [textB, setTextB] = useState('')
  const [isSystem, setIsSystem] = useState(true)

  let showFileQuestionA = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      handleRegexOperationA(e)
    };
    reader.readAsText(e.target.files[0])
    e.target.value = ""
  }
  
  const handleRegexOperationA = (e) => {
    const logText = e.target.result;
    const regex = /(.+?) (.+?) (.+?) (.+?) (.+?) (.+?) (.+?) (.+?) (.+?)(?: (.+))?$/gm
    const result = logText.replace(regex, `COMMAND: $1\nPID: $2\nUSER: $3\nFD: $4\nTYPE: $5\nDEVICE: $6\nSIZE/OFF: $7\nNODE:$8\nNAME: $9 $10\n---------`)

    setText(result)
  }

  let showFileQuestionB = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      handleRegexOperationB(e)
    };
    reader.readAsText(e.target.files[0])
    e.target.value = ""
  }
  
  const handleRegexOperationB = (e) => {
    const logText = e.target.result;
    const regex = /(.+?) (\d.+?) (.+)$/gm
    const result = logText.replace(regex, `MATRÍCULA: $2 | COLABOROU: $3 | NOME: $1`)

    setTextB(result)
  }

  const handleValueChange = (value) => {
    if(value === 'Sistema'){
      setTextB("")
      setIsSystem(true)
    }else{
      setText("")
      setIsSystem(false)
    }
  }

  return (
    <React.Fragment>
      <div className="flex bg-gray-200 flex-col min-h-screen w-full text-gray-700 py-2 pb-8">
        <div className="flex justify-center">
          <h1 className="text-6xl font-thin tracking-wider">Regex Operator</h1>
        </div>
        <div className="mt-8 flex justify-center">
          <input type="radio" className="mr-2" value="Sistema"name="gender" checked={isSystem} onChange={(e) => handleValueChange(e.target.value)} /> Sistema
          <input type="radio" className="ml-4 mr-2" value="Aluno" name="gender" onChange={(e) => handleValueChange(e.target.value)} /> Aluno
        </div>
        <div className="flex justify-center h-3/4">
        {isSystem ? (
          <div className="flex flex-col items-center rounded shadow-sm mt-8 bg-white p-14 px-20">
            <div className ="flex flex-col align-baseline">  
              <div className="mr-4 mb-2">
                Selecione seu arquivo de log do sistema
              </div>
              <input type="file" onChange={(e) => showFileQuestionA(e)} />
            </div>
            {text && (
              <pre className="w-full mt-8 p-2 items-stretch border-2 rounded border-gray-900">
                {text}
              </pre>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center rounded shadow-sm mt-8 bg-white py-14 px-20">
            <div className ="flex flex-col align-baseline">  
              <div className="mr-4 mb-2">
                Selecione o arquivo de log do Aluno
              </div>
              <input type="file" onChange={(e) => showFileQuestionB(e)} />
            </div>
            {textB && (
              <pre className="w-full mt-8 p-2 items-stretch border-2 rounded border-gray-900">
                {textB}
              </pre>
            )}
          </div>
        )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Main
