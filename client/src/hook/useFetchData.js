import { useEffect, useState, useRef } from "react";
import { useForceUpdate } from "./useForceUpdate";
import { notify } from "../helper/notify";

export const useFetchData = (url = "", keyParam, setEditingKey) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [shouldUpdate, forceUpdate] = useForceUpdate();
  const deletiveArray = useRef([]);

  useEffect(() => {
    fetchData();
  }, [currentPage, shouldUpdate]);

  const fetchData = () => {
    setSpinning(true);
    fetch(`${url}?currentPage=${currentPage}`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        const dataArray = result[keyParam.name].map((element) => {
          return {
            key: element[keyParam.id],
            id: element[keyParam.id],
            value: element[keyParam.value],
          };
        });
        setData(dataArray);
        setTotalPage(result.TotalPage);
        setSpinning(false);
      })
      .catch(() => {
        setSpinning(false);
        notify(
          "LOAD FAILED",
          "Something went wrong :( Please try again.",
          "error"
        );
      });
  };

  const updateReq = (type, value, id = 0, extra) => {
    const dataReq = {};
    dataReq[keyParam.id] = id;
    dataReq[keyParam.value] = value;
    setLoading(true);
    fetch(url, {
      method: type,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataReq),
    })
      .then((response) => {
        if (response.ok && type === "POST") {
          notify(
            `${type === "POST" ? "ADD" : "EDIT"} SUCCESS`,
            `You have already ${type === "POST" ? "added" : "edited"} a ${
              type === "POST" && "new"
            } item.`,
            "success"
          );
          setLoading(false);
          forceUpdate();
        } else if (response.ok && type === "PUT") {
          extra.newData.splice(extra.index, 1, {
            ...extra.newData[extra.index],
            ...extra.row,
          });
          setData(extra.newData);
          setEditingKey("");
          setLoading(false);
        } else {
          return new Promise.reject();
        }
      })
      .catch(() => {
        setLoading(false);
        notify(
          `${type === "POST" ? "ADD" : "EDIT"} FAILED`,
          "Something went wrong :( Please try again.",
          "error"
        );
      });
  };

  const deleteReq = () => {
    setSpinning(true);
    fetch(`${url}/Delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deletiveArray.current),
    })
      .then((response) => {
        if (response.ok) {
          notify(
            "DELETE SUCCESS",
            "You have already deleted water resistances.",
            "success"
          );
          setSpinning(false);
          setCurrentPage(1);
          forceUpdate();
        } else {
          return Promise.reject();
        }
      })
      .catch(() => {
        setSpinning(false);
        notify(
          "DELETE FAILED",
          "Something went wrong :( Please try again.",
          "error"
        );
      });
  };

  return [
    data,
    currentPage,
    setCurrentPage,
    totalPage,
    loading,
    spinning,
    updateReq,
    deleteReq,
    deletiveArray
  ];
};
