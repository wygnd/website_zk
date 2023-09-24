import React, { useContext, useEffect, useMemo } from "react";
import { BrowserRouter } from 'react-router-dom';
import AppRouter from "./components/AppRouter";
import Header from './components/Header';
import { observer } from "mobx-react-lite";
import { ContextMain } from ".";
import { fetchSlides } from "./http/mainBlockAPI";

const App = observer(() => {

  const { userStore, mainBlockStore } = useContext(ContextMain);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      userStore.checkAuth();
    }
  }, [])

  useMemo(() => {
    console.log('memo');
    fetchSlides().then(data => {
      mainBlockStore.setSlides(data);
    });
  });

  if (userStore.isLoading) {
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
