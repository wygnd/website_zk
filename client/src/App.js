import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from 'react-router-dom';
import AppRouter from "./components/AppRouter";
import Header from './components/Header';
import { observer } from "mobx-react-lite";
import { ContextMain } from ".";
import { check } from "./http/userAPI";

const App = observer(() => {

  const { user } = useContext(ContextMain);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check().then(data => {
      user.setUser(true);
      user.setIsAuth(true);
    })
    .catch((e) => console.log(e.message))
    .finally(() => setLoading(false))
  }, [])

  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
