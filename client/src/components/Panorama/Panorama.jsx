import React, { useEffect } from "react";
import * as PANOLENS from "panolens";
import * as THREE from "three";
import "./Panorama.css";
import image1 from "./images/image_1.jpg";
import image2 from "./images/image_2.jpg";
import image3 from "./images/image_3.jpg";

const Panorama = () => {
  useEffect(() => {
    const panorama = new PANOLENS.ImagePanorama(image1);
    const panorama2 = new PANOLENS.ImagePanorama(image2);
    const panorama3 = new PANOLENS.ImagePanorama(image3);
    let imageContainer = document.querySelector(".image-container");

    var infospotPositions = [
      new THREE.Vector3(-1536.06, -1006.3, 2890.14),
      new THREE.Vector3(2360.06, -506.3, 2890.14),
      new THREE.Vector3(1760.06, -506.3, 2890.14),
      new THREE.Vector3(3760.06, -506.3, 2890.14),
    ];

    const viewer = new PANOLENS.Viewer({
      container: imageContainer,
      autoRotate: false,
      autoRotateSpeed: 0.3,
      controlBar: true,
    });

    panorama.link(panorama2, infospotPositions[0]);

    panorama2.link(panorama, infospotPositions[1]);
    panorama2.link(panorama3, infospotPositions[2]);

    panorama3.link(panorama2, infospotPositions[3]);

    viewer.add(panorama, panorama2, panorama3);
  }, []);

  return (
    <div className="tour">
      <div className="container">
        <div className="image-container"></div>
      </div>
    </div>
  );
};

export default Panorama;
