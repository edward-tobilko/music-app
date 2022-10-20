import React from "react";
import { Spin } from "antd";
import "./loader.scss";

const Loader = ({ title }) => {
  return (
    <div className="loader">
      <Spin size="large" className="loader-spin" />
      <h2 className="loader-title"> {title || "Loading..."} </h2>
    </div>
  );
};

export default Loader;
