"use client";

import { getAllUsers } from "@/services/authService";
import Dashboard from "./pages/dashboard/page";
import { useEffect, useState } from "react";
import httpService from "@/services/httpService";
import { CONTROLLER, METHOD, OPERATION } from "@/constants/apiConstants";
import { uploadFileOnCloudinary } from "@/services/cloudinaryService";

export default function Home() {
  const [fileSelected, setFileSelected] = useState();
  const fileChanged = (event) => {
    setFileSelected(event.target.files[0]);
  };
  useEffect(() => {
    if (fileSelected) {
      editProfilePic();
    }
  }, [fileSelected]);

  const editProfilePic = () => {
    const formData = new FormData();
    if (fileSelected) {
      formData.append('file', fileSelected);
      formData.append('upload_preset', 'iiouvogj');
      uploadFileOnCloudinary(formData).then((src) => {
        if (src) {
          console.log(src)
          // if (src.url) {
          //   let payload = {
          //     ...userProfileData,
          //     image_url: src.url,
          //   };
          //   httpService(
          //     CONTROLLERS.addProfilePic,
          //     METHODS.post,
          //     payload,
          //     API
          //   ).then((src) => {
          //     if (src) {
          //       window.location.reload(false);
          //       alert('Profile pic updated');
          //     }
          //   });
          // } else {
          //   alert('Something went wrong please try again later');
          // }
        }
      });
    }
  };
  // useEffect(() => {
  //   // httpService(null, METHOD.GET, null, CONTROLLER.USER).then((user)=>{
  //   //   if(user){
  //   //     console.log(user)
  //   //   }
  //   // })
  //   httpService("testBakery", METHOD.GET, null, CONTROLLER.BAKERY).then(
  //     (bakery) => {
  //       if (bakery) {
  //         console.log(bakery);
  //       }
  //     }
  //   );
  // }, []);

  return (
    <>
      <input
        onChange={fileChanged}
        type="file"
      />
    </>
  );
}
