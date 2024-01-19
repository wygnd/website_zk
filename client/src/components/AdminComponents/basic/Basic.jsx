import React from "react";
import cl from "./Basic.module.scss";
import LogoInput from "../LogoInput/LogoInput";
import Meta from "../Meta/Meta";
// import PhonesHolder from "../PhonesHolder/PhonesHolder";
// import SocialsHolder from "../SocialsHolder/SocialsHolder";
// import MapHolder from "../MapHolder/MapHolder";
// import EmailsHolder from "../EmailsHolder/EmailsHolder";

const Basic = () => {
  return (
    <div className={cl.basicHolder}>
      <div className={cl.basicWrapper}>
        <LogoInput />
        <Meta />
        {/* <PhonesHolder /> */}
        {/* <SocialsHolder /> */}
        {/* <EmailsHolder /> */}
        {/* <MapHolder /> */}
      </div>
    </div>
  );
};

export default Basic;
