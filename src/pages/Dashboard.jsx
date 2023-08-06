import { useState } from "react";

// Data
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});

  const ordersWithData = mockData.results.map((order) => {
    const timestampEntry = timestamps.results.find((timestamp) => timestamp["&id"] === order["&id"]);
    const orderSubmitted = timestampEntry && timestampEntry.timestamps? timestampEntry.timestamps.orderSubmitted: "N/A";
    return {...order,orderSubmitted: orderSubmitted,};});

  const filteredOrders = ordersWithData.filter((order) =>
    order["&id"].toLowerCase().includes(searchText.toLowerCase()) );

  const totalOrders = filteredOrders.length;

  const handleOrderSelection = (orderId) => {
    const selectedOrder = filteredOrders.find((order) => order["&id"] === orderId);
    const timestampEntry = timestamps.results.find((timestamp) => timestamp["&id"] === orderId);

    const selectedOrderDetails = {
      buySellIndicator: selectedOrder.executionDetails.buySellIndicator,
      orderStatus: selectedOrder.executionDetails.orderStatus,
      orderType: selectedOrder.executionDetails.orderType,
    };

    const selectedOrderTimeStamps = {
      orderReceived: timestampEntry.timestamps ? timestampEntry.timestamps.orderReceived : "N/A",
      orderStatusUpdated: timestampEntry.timestamps ? timestampEntry.timestamps.orderStatusUpdated : "N/A",
      orderSubmitted: timestampEntry.timestamps ? timestampEntry.timestamps.orderSubmitted : "N/A",
    };

    setSelectedOrderDetails(selectedOrderDetails);
    setSelectedOrderTimeStamps(selectedOrderTimeStamps);
  };

  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle primaryTitle="Orders" secondaryTitle={`${totalOrders} orders`} />
        <div className={styles.actionBox}>
          <Search value={searchText} onChange={(e) => setSearchText(e.target.value)} />
          <Dropdown options={["GBP", "USD", "JPY", "EUR"]} onChange={(e) => setCurrency(e.target.value)} selectedItem={currency} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card cardData={selectedOrderDetails} title="Selected Order Details" />
          <Card cardData={selectedOrderTimeStamps} title="Selected Order Timestamps" />
        </div>
        <List rows={filteredOrders} currency={currency} onOrderSelect={handleOrderSelection} />
      </div>
    </div>
  );
};
export default Dashboard;
