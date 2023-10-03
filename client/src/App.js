import React, { useContext, useEffect } from "react";
import { BrowserRouter } from 'react-router-dom';
import AppRouter from "./components/AppRouter";
import Header from './components/Header';
import { observer } from "mobx-react-lite";
import { ContextMain } from ".";
import { fetchSlides } from "./http/mainBlockAPI";
import { fetchLogo, fetchPhones, fetchSocials } from "./http/basicAPI";
import { fetchLastItem, fetchTours } from "./http/toursAPI";
import Footer from "./components/Footer/Footer";

const App = observer(() => {

  const { userStore, mainBlockStore, basicStore, tourStore } = useContext(ContextMain);

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

  useEffect(() => {
    fetchLogo().then(data => {
      basicStore.setLogo(data[0]);
    })
    fetchPhones()
      .then(data => {
        basicStore.setPhones(data);
      })
    fetchSocials()
      .then(data => {
        const dataRequest = [];
        data.forEach(soc => {
          const dataSoc = {
            metaKey: soc.metaKey,
            metaValue: soc.metaValue.split('+')[0],
            iconId: soc.metaValue.split('+')[1],
          }

          dataRequest.push(dataSoc);
        });
        basicStore.setSocials(dataRequest);
      })
  }, [basicStore.update]);

  useEffect(() => {
    fetchTours()
      .then(data => {
        tourStore.setTours(data);
      })
    fetchLastItem('lastItemTour')
      .then(data => {
        const dataItem = {
          metaKey: data.metaKey,
          name: data.metaValue.split('+')[0],
          link: data.metaValue.split('+')[1],
          imageId: data.metaValue.split('+')[2],
        };
        tourStore.setLastItem(dataItem);
      })
  }, [tourStore.update]);

  if (userStore.isLoading) {
    return <h1>Загрузка...</h1>
  }

  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
      <Footer />
    </BrowserRouter>
  );
});

export default App;
