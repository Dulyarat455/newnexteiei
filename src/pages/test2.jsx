import React from "react";
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';


const test =  () => {

    let temp = 1
    const handleSearch = async () => {
        fetch(`/api/gettransactionsfillter?trans_type=${temp}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiYjhjYzdjYjYtNTFlMi00ZDdkLTk0NzktNjRmNzk0MzZmZjVkIiwiZW1haWwiOiJEdWx5YXJhdC40NTZAZ21haWwuY29tOTgiLCJpYXQiOjE2ODc3NzQxODEsImV4cCI6MTY4Nzc3Nzc4MX0.hNm9DrR4yavxkgDuNpPMteEFEzQyQANQ4DCCKtqnt1M",
            },
          }
        ).then((res) => res.json())
        .then((data) => {
          console.log(data)
        }
        );
      }

      handleSearch()



      return (<h1> hello </h1>)


}

export default test;
