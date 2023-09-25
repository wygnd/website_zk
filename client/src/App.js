import React, { useContext, useEffect, useState } from "react";
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

  useEffect(() => {
    fetchSlides().then(data => {
      mainBlockStore.setSlides(data);
    });
  }, [mainBlockStore.update]);

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
