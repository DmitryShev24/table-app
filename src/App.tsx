// @ts-nocheck
import './App.css';
import {TableNew} from './Components/Table/TableNew';
import {useState, useEffect, useCallback} from "react";
import {Button, TextField, CircularProgress} from '@material-ui/core';
import InputMask from "react-input-mask";
import MaterialInput from '@material-ui/core/Input';
import axios from "axios";
import {useDropzone} from 'react-dropzone'

function App() {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [displayAdd, setDisplayAdd] = useState(false);
  const [newId, setnewId] = useState<any>("");
  const [firstName, setfirstName] = useState<any>("");
  const [lastName, setlastName] = useState<any>("");
  const [email, setemail] = useState<any>("");
  const [phone, setphone] = useState<any>("");
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  useEffect(() => {
    //fetch("http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D")
    axios.get("http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}")
      //.then(res => res.json())
      .then(
        (result) => {
          setData(result);
        },
        (error) => {
          setError(error);
        }
      ).finally(() => setIsLoaded(true))
  }, []);

  const addNewRow = () => {
    let newData = data;
    newData!.unshift({newId, firstName, lastName, email, phone})
    setData(newData);
  }

  const disableButton = () => {
    if (newId === "" || firstName === "" || lastName === "" || email === "" || phone === "") {
      return true
    }
    return false
  }

  if (error) {
    return (
      <div>Ошибка</div>)
  } else if (!isLoaded) {
    return <CircularProgress className="spinner" />
  }
  return (
    <div className="App">
      <body className="App-body">
        <div>
          {isLoaded && <Button onClick={() => setDisplayAdd(!displayAdd)}> Добавить</Button>}
          {displayAdd &&
            <div>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {
                  isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
                }
              </div>
              <form>
                <TextField id="id" type="number" label="id" value={newId} onChange={(e) => setnewId(e.target.value)} />
                <TextField inputProps={{pattern: "[a-z]{1,15}"}} id="firstName" label="firstName" value={firstName} onChange={(e) => setfirstName(e.target.value)} />
                <TextField id="lastName" label="lastName" value={lastName} onChange={(e) => setlastName(e.target.value)} />
                <TextField id="email" label="email" value={email} onChange={(e) => setemail(e.target.value)} />
                <InputMask className="mask" mask="(999)999-9999" value={phone} onChange={(e) => setphone(e.target.value)}>
                  <MaterialInput type="tel" />
                </InputMask>
                <Button disabled={disableButton()} onClick={addNewRow}>Добавить в таблицу</Button>
              </form>
            </div>
          }
          <TableNew data={data} error={error} isLoaded={isLoaded} />
        </div>
      </body>
    </div>
  );
}

export default App;
