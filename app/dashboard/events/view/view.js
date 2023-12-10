"use client";

import React, { useEffect, useState } from "react";
import styles from "./view.module.css";
import { useSelector } from "react-redux";
import { selectUserData } from "@/app/store/user/user.selector";
import { getVendorEventDetails } from "@/app/utils/api/event";

const View = ({ data }) => {
  const userData = useSelector(selectUserData);
  const [eventDetails, setEventDetails] = useState(null);
  console.log("---> data", data);
  console.log("---> ed", eventDetails);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getVendorEventDetails(
        userData.userId,
        data.eventid
      );
      if (response?.data?.statusCode === 200) {
        setEventDetails(response.data.eventDetails);
      }
    };

    fetchData();
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.first_section}>
        <h1>{data.eventname}</h1>
      </div>
      <div className={styles.second_section}>
        <table className={styles.table_main}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Product Variant</th>
              <th>Quantity</th>
              <th>Delivery Location</th>
              <th>Price per Qty</th>
              <th>Counter Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {eventDetails &&
              eventDetails.productDetails.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? styles.even_row : styles.odd_row}
                >
                  <td>{item.product}</td>
                  <td>{item.productvariant}</td>
                  <td>{item.quantity}</td>
                  <td>{item.deliverylocation}</td>
                  <td>{item.productComparisions.length > 0 ? 123 : "null"}</td>
                  <td>{item.productComparisions.length > 0 ? 123 : "null"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default View;
