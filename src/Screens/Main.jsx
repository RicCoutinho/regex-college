import React, {useState} from 'react'

function Main() {
  const [text, setText] = useState('')

  let showFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      setText(e.target.result)
    };
    reader.readAsText(e.target.files[0]) 
  }


  return (
    <>
      <div className="flex-col h-screen w-screen bg-gray-200 text-gray-700 py-4">
        <div className="flex justify-center">
          <h1 className="text-6xl font-thin tracking-wider">Regex Operator</h1>
        </div>
        <div className="flex justify-center h-3/4">
          <div className="flex flex-col items-center rounded shadow-sm mt-8 bg-white p-20 w-1/2 ">
            <div className ="flex flex-row">
              <div className="mr-4">
                Enter with yout txt file
              </div>
              <input type="file" onChange={(e) => showFile(e)} />
            </div>
            {text && (
              <div className="w-full mt-8 p-2 items-stretch border-2 rounded border-gray-900">
                {text}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main
