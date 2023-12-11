"use client";

import React, { useEffect, useState, useReducer } from "react";
import styles from "./view.module.css";
import { useSelector } from "react-redux";
import { selectUserData } from "@/app/store/user/user.selector";
import {
  getVendorEventDetails,
  vendorPriceSubmit,
} from "@/app/utils/api/event";
import Modal from "react-modal";
import { BiEditAlt } from "react-icons/bi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const View = ({ data }) => {
  const userData = useSelector(selectUserData);
  const [eventDetails, setEventDetails] = useState(null);
  const [modalOneIsOpen, setModalOneIsOpen] = useState(false);
  const [modalTwoIsOpen, setModalTwoIsOpen] = useState(false);
  console.log("---> ed", eventDetails);

  const [productPriceData, updateProductPriceData] = useReducer(
    (prev, next) => {
      const updateProductData = { ...prev, ...next };
      return updateProductData;
    },
    { productId: "", vendorPrice: null }
  );
  console.log(productPriceData);

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

  const openModalOne = () => {
    setModalOneIsOpen(true);
  };

  const closeModalOne = () => {
    setModalOneIsOpen(false);
  };

  const openModalTwo = () => {
    setModalTwoIsOpen(true);
  };

  const closeModalTwo = () => {
    setModalTwoIsOpen(false);
  };

  const handleVendorPriceSubmit = async () => {
    if (productPriceData.vendorPrice) {
      const request = {
        vendorUserId: userData.userId,
        productId: productPriceData.productId,
        vendorPrice: Number(productPriceData.vendorPrice),
      };

      await vendorPriceSubmit(request);
      const response = await getVendorEventDetails(
        userData.userId,
        data.eventid
      );
      if (response?.data?.statusCode === 200) {
        setEventDetails(response.data.eventDetails);
      }
      closeModalOne();
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.first_section}>
          <h1>{data.eventname}</h1>
          {eventDetails && (
            <p>
              {eventDetails.eventAttributesStore.map((item) => {
                if (item.key === "AWARD_TYPE") {
                  return item.value == 1
                    ? "Note: Kindly provide the prices for all the items in this event."
                    : "Note: Kindly provide the price for the items which are available.";
                }
              })}
            </p>
          )}
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
                    className={
                      index % 2 === 0 ? styles.even_row : styles.odd_row
                    }
                  >
                    <td>{item.product}</td>
                    <td>{item.productvariant}</td>
                    <td>{item.quantity}</td>
                    <td>{item.deliverylocation}</td>
                    <td>
                      {item.productComparisions.length > 0 &&
                      item.productComparisions[0].vendorprice
                        ? item.productComparisions[0].vendorprice
                        : "-"}
                    </td>
                    <td>
                      {item.productComparisions.length > 0 &&
                      item.productComparisions[0].counterprice
                        ? item.productComparisions[0].counterprice
                        : "-"}
                    </td>
                    <td>
                      <BiEditAlt
                        className={styles.edit_icon}
                        onClick={() => {
                          openModalOne();
                          updateProductPriceData({
                            productId: item.productid,
                            vendorPrice:
                              item.productComparisions.length > 0
                                ? item.productComparisions[0].vendorprice
                                : null,
                          });
                        }}
                      />
                      <IoMdCheckmarkCircleOutline
                        className={styles.check_icon}
                        onClick={() => {
                          openModalTwo();
                          updateProductPriceData({
                            productId: item.productid,
                            vendorPrice:
                              item.productComparisions.length > 0
                                ? item.productComparisions[0].vendorprice
                                : null,
                          });
                        }}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        isOpen={modalOneIsOpen}
        onRequestClose={closeModalOne}
        preventScroll={true}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          },
          content: {
            padding: 0,
            border: "none",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
        ariaHideApp={false}
      >
        <div className={styles.modal_one_container}>
          <h1>Do you want to change or add your price?</h1>
          <div className={styles.product_form_section}>
            <label htmlFor="vendorPrice">Price per Qty:</label>
            <input
              type="text"
              className={styles.product_type_input}
              defaultValue={productPriceData.vendorPrice}
              onChange={(e) =>
                updateProductPriceData({ vendorPrice: e.target.value })
              }
              placeholder="Enter Offering Price"
              id="vendorPrice"
            />
          </div>
          <div className={styles.prd_btn_section}>
            <button
              className={styles.prd_cancel_button}
              onClick={() => {
                closeModalOne();
              }}
            >
              Close
            </button>
            <button
              className={styles.prd_add_button}
              onClick={handleVendorPriceSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={modalTwoIsOpen}
        onRequestClose={closeModalTwo}
        preventScroll={true}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          },
          content: {
            padding: 0,
            border: "none",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
        ariaHideApp={false}
      >
        <div>hi</div>
      </Modal>
    </>
  );
};

export default View;
