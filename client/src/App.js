import React, { useContext, useEffect } from "react";
import { BrowserRouter } from 'react-router-dom';
import AppRouter from "./components/AppRouter";
import Header from './components/Header';
import { observer } from "mobx-react-lite";
import { ContextMain } from ".";
import { fetchSlides } from "./http/mainBlockAPI";
import { fetchItem, fetchLogo, fetchPhones, fetchSocials } from "./http/basicAPI";
import { fetchTours } from "./http/toursAPI";
import Footer from "./components/Footer/Footer";
import { getImageById } from "./http/galleryAPI";
import uuid from 'react-uuid';
import { fetchGallery } from "./http/galleryBlockAPI";

const App = observer(() => {

  const { userStore, mainBlockStore, basicStore, tourStore, collections, about, galleryBlock } = useContext(ContextMain);

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
      getImageById(data.metaValue)
        .then(res => {
          basicStore.setLogo(res.size);
        })
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
  }, [tourStore.update]);

  useEffect(() => {
    fetchItem('lastItemTour')
      .then(data => {
        const dataItem = {
          metaKey: data.metaKey,
          name: data.metaValue.split('+')[0],
          link: data.metaValue.split('+')[1],
          imageId: data.metaValue.split('+')[2],
        };
        tourStore.setLastItem(dataItem);
      })

  }, [tourStore.updateLastItem])

  useEffect(() => {
    fetchItem('lastItemTourVisible')
      .then(data => {
        if (data.metaValue === '0') {
          tourStore.setLastItemVisible(false);
        } else {
          tourStore.setLastItemVisible(true);
        }
      })
  }, [tourStore.lastItemVisible])

  useEffect(() => {
    fetchItem('collectionsDesc')
      .then(data => {
        collections.setDesc(data.metaValue);
      })

    fetchItem('collectionsImages')
      .then(data => {
        const arrayImages = data.metaValue.split('+');
        arrayImages.map(img => {
          getImageById(img)
            .then(response => {
              collections.setGallery([...collections.gallery, { imageId: response.id, size: response.size, uuId: uuid() }]);
            })
        })

        collections.setCountImages(data.metaValue.split('+').length);
      })
  }, [collections.update])

  useEffect(() => {
    fetchItem('aboutDesc')
      .then(data => {
        about.setDesc(data.metaValue);
      })

    fetchItem('aboutImage')
      .then(data => {
        getImageById(data.metaValue)
          .then(res => {
            about.setImage({ id: res.id, size: res.size });
          })
      })
  }, [about.update])

  useEffect(() => {
    fetchGallery()
      .then(res => {
        res.map(el => {
          getImageById(el?.galleryId)
            .then(res => {
              galleryBlock.setGallery([...galleryBlock.images, { id: el?.id, size: res?.size }])
            })
        })
      })
  }, [galleryBlock.update])


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
