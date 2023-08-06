import React from "react";
import { storiesOf } from "@storybook/react";
import ListHeader from "../ListHeader";

storiesOf("ListHeader", module)
  .add("Default", () => (
    <ListHeader>
      <th>Order ID</th>
      <th>Buy/Sell</th>
      <th>Country</th>
      <th>Order Submitted</th>
      <th>Order Volume / EUR</th>     
    </ListHeader>
  ))
  .add("With Custom Headers", () => (
    <ListHeader>
      <th>Custom Header 1</th>
      <th>Custom Header 2</th>
      <th>Custom Header 3</th>
      <th>Custom Header 4</th>
      <th>Custom Header 5</th>      
    </ListHeader>
  ));
