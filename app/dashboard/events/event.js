"use client";

import React, { useEffect, useState } from "react";
import styles from "./event.module.css";
import { GiPlainCircle } from "react-icons/gi";
import { useSelector } from "react-redux";
import { selectUserData } from "@/app/store/user/user.selector";
import { getEvents } from "@/app/utils/api/event";
import EndCountdown from "../endCountDown/endCountDown";

const Event = () => {
  const userData = useSelector(selectUserData);
  const [eventData, setEventData] = useState([]);
  const [status, setStatus] = useState("LIVE");

  const handleStatusChange = async (status) => {
    setStatus(status);
    const data = await getEvents(userData.userId, status);
    if (data?.data) {
      setEventData(data.data.events);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEvents(userData.userId, status);
      if (data?.data) {
        setEventData(data.data.events);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.event_section}>
        <div className={styles.event_headers_section}>
          <div
            className={`${styles.live_btn} ${
              status === "LIVE" && styles.live_active
            }`}
            onClick={() => handleStatusChange("LIVE")}
          >
            Live
            {status === "LIVE" && (
              <GiPlainCircle className={styles.circle_icon} />
            )}
          </div>
          <div
            className={`${styles.closed_btn} ${
              status === "CLOSED" && styles.closed_active
            }`}
            onClick={() => handleStatusChange("CLOSED")}
          >
            Closed
            {status === "CLOSED" && (
              <GiPlainCircle className={styles.circle_icon} />
            )}
          </div>
        </div>
      </div>
      <div>
        {eventData.length > 0 ? (
          <div className={styles.event_card_section}>
            {eventData.map((event) => (
              <div key={event.eventid} className={styles.event_card}>
                <h1 className={styles.event_heading}>{event.eventname}</h1>
                <div className={styles.event_rfq_section}>
                  <h1>RFQ</h1>
                  <p>
                    {JSON.parse(event.eventAttributesStore[0].value).length}
                    {JSON.parse(event.eventAttributesStore[0].value).length > 1
                      ? " Products"
                      : " Product"}
                  </p>
                </div>
                <div className={styles.live_counter_section}>
                  <EndCountdown
                    eventStartTime={event.eventstarttime}
                    eventDuration={event.eventduration}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.no_event}>No Events!</div>
        )}
      </div>
    </div>
  );
};

export default Event;
