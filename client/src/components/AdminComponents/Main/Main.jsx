import { observer } from "mobx-react-lite";
import React, {useContext} from "react";
import cl from "./Main.module.scss";
import { ContextMain } from "../../..";
import CreateMainBlockPost from "./CreateMainBlockPost/CreateMainBlockPost";
import MainPostHolder from "./MainPostHolder/MainPostHolder";

const Main = observer(({className}) => {
  const {mainBlockStore} = useContext(ContextMain);

  return (
    <div className={`${className} d-flex flex-column`}>
      {!mainBlockStore.slides ? (
        <div className={cl.notFound}>Записей не найдено</div>
      ) : (
        <MainPostHolder/>
      )}
      <CreateMainBlockPost/>
    </div>
  );
});

export default Main;
