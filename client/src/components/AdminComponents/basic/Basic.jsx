import React from "react";
import cl from "./Basic.module.scss";
import LogoInput from "../LogoInput/LogoInput";
import Meta from "../Meta/Meta";

const Basic = () => {
  return (
    <div className={cl.basicHolder}>
      <div className={cl.basicWrapper}>
        <LogoInput />
        <Meta />
      </div>
    </div>
  );
};

export default Basic;
