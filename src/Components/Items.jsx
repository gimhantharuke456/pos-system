import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import {
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
} from "../api/itemController";

const Items = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchItems();
  }, []);

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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (isEditMode) {
        await updateItem(currentItem.id, values);
        message.success("Item updated successfully!");
      } else {
        await createItem(values);
        message.success("Item created successfully!");
      }
      fetchItems();
      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to save item.");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setCurrentItem(null);
    setIsEditMode(false);
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsEditMode(true);
    form.setFieldsValue(item);
    showModal();
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      message.success("Item deleted successfully!");
      fetchItems();
    } catch (error) {
      message.error("Failed to delete item.");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: ["category", "name"],
      key: "category",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button
            style={{ marginLeft: "8px" }}
            type="dashed"
            danger
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Items</h1>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Add Item
      </Button>
      <Table
        columns={columns}
        dataSource={items}
        loading={loading}
        rowKey="id"
      />

      <Modal
        title={isEditMode ? "Edit Item" : "Add Item"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={isEditMode ? "Update" : "Create"}
      >
        <Form form={form} layout="vertical" name="itemForm">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name={["category", "name"]}
            label="Category"
            rules={[{ required: true, message: "Please input the category!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Items;
