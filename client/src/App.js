import React, { useContext, useEffect } from "react";
import { BrowserRouter } from 'react-router-dom';
import AppRouter from "./components/AppRouter";
import Header from './components/Header';
import { observer } from "mobx-react-lite";
import { ContextMain } from ".";
import { fetchSlides } from "./http/mainBlockAPI";
import { fetchLogo, fetchPhones } from "./http/basicAPI";

const App = observer(() => {

  const { userStore, mainBlockStore, basicStore } = useContext(ContextMain);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      userStore.checkAuth();
    }
    fetchPhones()
      .then(data => {
        basicStore.setPhones(data);
      })
  }, [])

  useEffect(() => {
    fetchSlides().then(data => {
      mainBlockStore.setSlides(data);
    });
  }, [mainBlockStore.update]);

  useEffect(() => {
    fetchLogo().then(data => {
      basicStore.setLogo(data[0]);
    })
  }, [basicStore.update]);

  useEffect(() => {
      
  }, []);

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
