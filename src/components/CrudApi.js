import CrudFrom from "./CrudForm";
import React, { useEffect, useState } from "react";
import CrudTable from "./CrudTable";
import { helpHttp } from "../helpers/helpHttp";
import Loader from "./Loader";
import Message from "./Message";

const CrudApi = () => {
  const [db, setDb] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let api = helpHttp();
  let url = "http://localhost:5000/santos";

  useEffect(() => {
    setLoading(true);
    api.get(url).then((res) => {
      if (!res.err) {
        setDb(res);
        setError(null);
      } else {
        setDb(null);
        setError(res);
      }
      setLoading(false);
    });
  }, []);

  const createData = (data) => {
    data.id = Date.now();
    const options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.post(url, options).then((obj) => {
      if (!obj.err) {
        setDb(...db, obj);
      } else {
        setError(obj);
      }
    });
  };
  const updateData = (data) => {
    let endpoint = `${url}/${data.id}`;
    const options = {
      body: data,
      headers: { "content-type": "application/json" },
    };
    api.put(endpoint, options).then((obj) => {
      if (!obj.err) {
        let newData = db.map((obj) => (obj.id === data.id ? data : obj));
        setDb(newData);
      } else {
        setError(obj);
      }
    });
  };
  const deleteData = (id) => {
    console.log(id);
    let isDelete = window.confirm(`Are you sure to this delete ${id}`);
    if (isDelete) {
      let endpoint = `${url}/${id}.`;
      const options = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
          "Access-Control-Allow-Headers":
            "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
        },
      };
      api.del(endpoint, options).then((obj) => {
        if (!obj.err) {
          let newData = db.filter((obj) => obj.id !== id);
          setDb(newData);
        } else {
          setError(obj);
        }
      });
    }
  };
  return (
    <div>
      <h2>CRUD API</h2>
      <article className="grid-1-2">
        <CrudFrom
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
        {loading && <Loader />}
        {error && (
          <Message
            msg={`Error ${error.status}: ${error.statusText}`}
            bgColor="#dc3545"
          />
        )}
        {db && (
          <CrudTable
            data={db}
            setDataToEdit={setDataToEdit}
            deleteData={deleteData}
          />
        )}
      </article>
    </div>
  );
};

export default CrudApi;
