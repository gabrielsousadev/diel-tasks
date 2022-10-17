import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import fireDb from "../firebase";
import "./Search.css";

const Search = () => {
  const [data, setData] = useState({});
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  let search = query.get("task");
  console.log("search", search);

  useEffect(() => {
    searchData();
  }, [search]);

  const searchData = () => {
    fireDb
      .child("tasks")
      .orderByChild("title")
      .equalTo(search)
      .on("value", (snapshot) => {
        if (snapshot.val()) 
        {
          const data = snapshot.val();
          setData(data);
        }
      });
  };

  return (
    <>
      <div className="content">
        <table className="styledTable">
          <thead>
            <tr>
              <th>Número</th>
              <th>Título</th>
              <th>Descrição</th>
              <th>Descrição completa</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((id, index) => {
              return (
                <tr key={id}>
                  <th scope="row">{index + 1}</th>
                  <td>{data[id].title}</td>
                  <td>{data[id].description}</td>
                  <td>{data[id].fullDescription}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Search;