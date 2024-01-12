import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Header from "./components/Header";
import { observer } from "mobx-react-lite";
import { ContextMain } from ".";
import { fetchSlides } from "./http/mainBlockAPI";
import { fetchItem, fetchItems } from "./http/basicAPI";
import { fetchTours } from "./http/toursAPI";
import Footer from "./components/Footer/Footer";
import { getImageById } from "./http/galleryAPI";
import uuid from "react-uuid";
import { fetchGallery } from "./http/galleryBlockAPI";

const App = observer(() => {
  const {
    userStore,
    mainBlockStore,
    basicStore,
    tourStore,
    collections,
    about,
    galleryBlock,
    contactsStore,
  } = useContext(ContextMain);
  const [siteTitle, setSiteTitle] = useState("");
  const [siteDesc, setSiteDesc] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      userStore.checkAuth();
    }
  }, []);

  useEffect(() => {
    fetchSlides().then((data) => {
      mainBlockStore.setSlides(data);
    });
  }, [mainBlockStore.update]);

  useEffect(() => {
    fetchItem("logo").then((data) => {
      getImageById(data.metaValue).then((res) => {
        basicStore.setLogo(res.size);
      });
    });
    fetchItems("phone").then((data) => {
      basicStore.setPhones(data);
    });
    fetchItems("soc").then((data) => {
      const dataRequest = [];
      data.forEach((soc) => {
        const dataSoc = {
          metaKey: soc.metaKey,
          metaValue: soc.metaValue.split("+")[0],
          iconId: soc.metaValue.split("+")[1],
        };

        dataRequest.push(dataSoc);
      });
      basicStore.setSocials(dataRequest);
    });
  }, [basicStore.update]);

  useEffect(() => {
    fetchTours().then((data) => {
      tourStore.setTours(data);
    });
  }, [tourStore.update]);

  useEffect(() => {
    fetchItem("lastItemTour").then((data) => {
      const dataItem = {
        metaKey: data.metaKey,
        name: data.metaValue.split("+")[0],
        link: data.metaValue.split("+")[1],
        imageId: data.metaValue.split("+")[2],
      };
      tourStore.setLastItem(dataItem);
    });
  }, [tourStore.updateLastItem]);

  useEffect(() => {
    fetchItem("lastItemTourVisible").then((data) => {
      if (data.metaValue === "0") {
        tourStore.setLastItemVisible(false);
      } else {
        tourStore.setLastItemVisible(true);
      }
    });
  }, [tourStore.lastItemVisible]);

  useEffect(() => {
    fetchItem("collectionsDesc").then((data) => {
      collections.setDesc(data.metaValue);
    });

    fetchItem("collectionsImages").then((data) => {
      const arrayImages = data.metaValue.split("+");
      arrayImages.map((img) => {
        getImageById(img).then((response) => {
          collections.setGallery([
            ...collections.gallery,
            { imageId: response.id, size: response.size, uuId: uuid() },
          ]);
        });
      });

      collections.setCountImages(data.metaValue.split("+").length);
    });
  }, [collections.update]);

  useEffect(() => {
    fetchItem("aboutDesc").then((data) => {
      about.setDesc(data.metaValue);
    });

    fetchItem("aboutImage").then((data) => {
      getImageById(data.metaValue).then((res) => {
        about.setImage({ id: res.id, size: res.size });
      });
    });
  }, [about.update]);

  useEffect(() => {
    fetchGallery().then((res) => {
      res.map((el) => {
        getImageById(el?.galleryId).then((res) => {
          galleryBlock.setGallery([
            ...galleryBlock.images,
            { id: el?.id, size: res?.size },
          ]);
        });
      });
    });
  }, [galleryBlock.update]);

  useEffect(() => {
    fetchItem("map").then((res) => {
      contactsStore.setMap([
        res.metaValue.split("+")[0],
        res.metaValue.split("+")[1],
      ]);
    });
  }, []);

  useEffect(() => {
    fetchItems("email").then((data) => {
      basicStore.setEmails(data);
    });
  }, [basicStore.update]);

  useEffect(() => {
    fetchItem("siteTitle").then((data) => {
      basicStore.setSiteTitle(data);
      setSiteTitle(data.metaValue);
    });

    fetchItem("siteDesc").then((data) => {
      basicStore.setSiteDesc(data);
      setSiteDesc(data.metaValue);
    });
  }, []);

  if (userStore.isLoading) {
    return <h1>Загрузка...</h1>;
  }

  return (
    <>
      <Helmet>
        <title>{siteTitle}</title>
        <html lang="ru" />
        <meta name="author" content="Denis Nekrasov" />
        <meta name="description" content={siteDesc} />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <meta
          property="og:image"
          content="https://developer.mozilla.org/mdn-social-share.png"
        />
        <meta
          property="og:description"
          content="Экспозиция «В бутылочку» - пролог современного музейного пространства, посвященного гастрокультуре Русского Севера."
        />
        <meta property="og:title" content="Заречный квартал" />
      </Helmet>
      <BrowserRouter>
        <Header />
        <AppRouter />
        <Footer />
      </BrowserRouter>
    </>
  );
});

export default App;
