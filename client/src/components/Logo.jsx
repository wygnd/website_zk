import React, { useContext } from "react";
import { Link } from "react-router-dom";
import headerClasses from "../styles/Header.module.scss";
import { observer } from "mobx-react-lite";
import { ContextMain } from "..";
import { SERVER_URL } from "../utils/consts";

const Logo = observer(() => {
  const { basicStore } = useContext(ContextMain);

  return (
    <Link to="/" className={headerClasses.logo_holder}>
      {basicStore?.logo?.file_name && (
        <img
          src={`${SERVER_URL}/${basicStore?.logo?.file_name}`}
          alt={`${basicStore?.logo?.fileName}`}
        />
      )}
    </Link>
  );
});

export default Logo;
