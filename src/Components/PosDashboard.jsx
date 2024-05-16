import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";
import { getAllItems } from "../api/itemController";
import { getAllCategories } from "../api/categoryController";
import { getAllStocks } from "../api/stockController";
import { Col, Row, message } from "antd";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const PosDashboard = () => {
  const [items, setItems] = useState([]);
  const [itemCategories, setCategories] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories().then(() => {
      fetchItems();
      fetchStocks();
    });
  }, []);

  const fetchCategories = async () => {
    try {
      setCategories([]);
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      message.error("Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  };

  const fetchItems = async () => {
    try {
      const data = await getAllItems();
      setItems(data);
    } catch (error) {
      message.error("Failed to fetch items.");
    } finally {
      setLoading(false);
    }
  };

  const fetchStocks = async () => {
    try {
      const data = await getAllStocks();
      setStocks(data);
    } catch (error) {
      message.error("Failed to fetch stocks.");
    } finally {
      setLoading(false);
    }
  };

  const pieData = {
    labels: itemCategories.map((category) => category.name),
    datasets: [
      {
        data: itemCategories.map(
          (category) =>
            items.filter((item) => item.categoryId === category.id).length
        ),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const barData = {
    labels: items.map((item) => item.name),
    datasets: [
      {
        label: "Price",
        data: items.map((item) => item.price),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: items.map((item) => item.name),
    datasets: [
      {
        label: "Stock Quantity",
        data: items.map((item) => {
          const stock = stocks.find((stock) => stock.itemId === item.id);
          return stock ? stock.quantity : 0;
        }),
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Row>
        <Col span={8}>
          <h2>Item Categories Distribution</h2>
          <Pie data={pieData} />
        </Col>
        <Col span={8}>
          <h2>Item Prices</h2>
          <Bar data={barData} />
        </Col>
        <Col span={8}>
          <h2>Stock Quantities</h2>
          <Line data={lineData} />
        </Col>
      </Row>
    </div>
  );
};

export default PosDashboard;
