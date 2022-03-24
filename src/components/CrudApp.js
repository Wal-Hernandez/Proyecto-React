
import CrudFrom from "./CrudForm";
import React, { useState } from 'react';
import CrudTable from "./CrudTable"
const initialDb = [
    {
        id: 1,
        name: "Seiya",
        constellation: "Pegaso",
      },
      {
        id: 2,
        name: "Shiryu",
        constellation: "Dragón",
      },
      {
        id: 3,
        name: "Hyoga",
        constellation: "Cisne",
      },
      {
        id: 4,
        name: "Shun",
        constellation: "Andrómeda",
      },
      {
        id: 5,
        name: "Ikki",
        constellation: "Fénix",
    },
];



const CrudApp = () => {
    const [db, setDb] = useState(initialDb);
    const [dataToEdit, setDataToEdit] = useState(null)
    const createData = (data) => {
      data.id = Date.now()
      setDb([...db, data])
    }
    const updateData = (data) => {
      let newData = db.map((obj) => obj.id === data.id ? data : obj )
      setDb(newData);
    }
    const deleteData = (id) =>{
      let isDelete = window.confirm(`Are you sure to this delete ${id}`)
      if(isDelete){let newData = db.filter((obj) => obj.id !== id)
      setDb(newData);}else{
        return
      }
    };

    return (
        <div>
            <h2>CRUD APP</h2>
            <article className="grid-1-2">
            <CrudFrom createData={createData} 
            updateData={updateData} 
            dataToEdit={dataToEdit} 
            setDataToEdit={setDataToEdit}/>
            <CrudTable data={db}
            setDataToEdit={setDataToEdit}
            deleteData={deleteData}/>
            </article>
        </div>
    )
}

export default CrudApp;