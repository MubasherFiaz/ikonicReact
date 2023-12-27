import React from "react";
import { Form, Input, Button, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { useState } from "react";
import axios from "axios";
const order = {
  //   po_number: "",
  order_id: "",
  items: [
    // {
    //   item_code: "dnh75n",
    //   quantity: "10",
    //   special_requirements: "Add picture of happy dog",
    // },
    // {
    //   item_code: "456def",
    //   quantity: "4",
    //   special_requirements: "Do not include lids",
    // },
  ],
};

const onFinish = (values) => {
  //   e.preventDefault();
  const login_info = localStorage.getItem("login_token");

  console.log(login_info);
  return;
  axios
    .post(`http://localhost:8000/api/dynamic-items`, values, {
      headers: {
        "Content-Type": "multipart/form-data",
        // Authorization: `Bearer ${login_info}`,
      },
    })
    .then(({ data }) => {
      //    / navigate("/");
    })
    .catch(({ response }) => {
      if (response.status === 422) {
        //  setValidationError(response.data.errors);
      } else {
      }
    });
  console.log("formData", values);
};
const itemInputs = order.items.map((item) => {
  return {
    item_code: item.item_code,
    quantity: item.quantity,
    special_requirements: item.special_requirements,
    img: item.img,
  };
});
export default function Data() {
  const [fileList, setFileList] = useState([
    // {
    //   uid: "-1",
    //   name: "image.png",
    //   status: "done",
    //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },
  ]);
  const [inputFields, setInputFields] = useState([
    { title: "", description: "", image: null },
  ]);
  //   const handleImageChange = (index, event) => {
  //     let data = [...inputFields];

  //     data[index][event.target.name] = event.target.files[0];
  //     JSON.stringify(data[index].image);
  //     setInputFields(data);
  //     //    console.log(inputFields);return;
  //   };
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  return (
    <>
      <div>
        <Form onFinish={onFinish}>
          <b>{"Order " + order.po_number}</b>

          <Form.Item
            name="order_id"
            label="Order Id"
            initialValue={order.carrier}
          >
            <Input style={{ width: "500px" }} />
          </Form.Item>
          {/* <Form.Item
            name="po_number"
            label="PO number"
            initialValue={order.po_number}
            hidden
          >
            <Input />
          </Form.Item> */}

          <b>Order Items</b>

          <Form.List name="items" initialValue={itemInputs}>
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Space
                    key={field.key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...field}
                      name={[field.name, "item_code"]}
                      fieldKey={[field.fieldKey, "item_code"]}
                    >
                      <Input placeholder="Item Code" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "quantity"]}
                      fieldKey={[field.fieldKey, "quantity"]}
                    >
                      <Input placeholder="Quantity" />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      name={[field.name, "img"]}
                      fieldKey={[field.fieldKey, "img"]}
                    >
                      <Upload
                        key={field.key}
                        listType="picture-card"
                        fileList={fileList}
                        onChange={onChange}
                        onPreview={onPreview}
                      >
                        {fileList.length < 1 && "+ Upload"}
                      </Upload>
                    </Form.Item>
                    <input
                      name="image"
                      type="file"
                      placeholder="Image"
                      required
                      className="form-control "
                      //   onChange={(event) => handleImageChange(field.key, event)}
                    />
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add item
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {" "}
              Change Details{" "}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
