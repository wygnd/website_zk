import React, { useContext, useEffect } from "react";
import { BrowserRouter } from 'react-router-dom';
import AppRouter from "./components/AppRouter";
import Header from './components/Header';
import { observer } from "mobx-react-lite";
import { ContextMain } from ".";

const App = observer(() => {

  const { userStore } = useContext(ContextMain);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      userStore.checkAuth();
    }
  }, [])

  if(userStore.isLoading) {
    return <h1>Загрузка...</h1>
  }
  
  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
