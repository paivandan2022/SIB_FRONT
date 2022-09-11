import { CloseCircleOutlined, RetweetOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Spin,
  Table,
  Typography,
} from "antd";
import "moment/locale/th";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { AiFillSetting } from "react-icons/ai";
import api from "../lib/api";

import { MdEditNote, MdLibraryAdd } from "react-icons/md";
import { VscSaveAs } from "react-icons/vsc";
import Layout from "../components/layout";

const { TextArea } = Input;
const { Option } = Select;

const { Text } = Typography;

const Setting_lab_item = () => {
  const [placement, SetPlacement] = React.useState("bottomLeft");
  const [Spinloading, setSpinLoading] = useState(false);

  const [modal_additem, setmodal_additem] = useState(false);
  const [modal_mapcode, setmodal_mapcode] = useState(false);

  const [Disitems_name, setDisitems_name] = useState(true);
  const [Disitems_display, setDisitems_display] = useState(true);
  const [Disitems_save_mapcode, setDisitems_save_mapcode] = useState(true);

  const [edit_data, setedit_data] = useState();
  const [edit_data_setting, setedit_data_setting] = useState();
  const [data_opencheckbnox_mapcode, setdata_opencheckbnox_mapcode] =
    useState();

  const [fromAddItem] = Form.useForm();
  const [fromMapcode] = Form.useForm();
  const [form_datasetting] = Form.useForm();

  const [data_setting, setdata_setting] = useState([]);
  const [data_additem_table, setdata_additem_table] = useState([]);
  const [ata_map_code_modal, setdata_map_code_modal] = useState([]);

  const Mapcodedata = async () => {
    const result = await api.get("/dataSetting_Mapcode");
    setdata_setting(result.data);
    let datas = result.data;
    const data = datas.map((item) => item.mi_name);

    const dataUpdate = {};

    for (let s = 0; s < datas.length; s++) {
      if (datas[s].bb_status == "1") {
        dataUpdate[datas[s].id] = {
          status: true,
        };
      }
    }

    form_datasetting.setFieldsValue({
      ...dataUpdate,
    });
  };

  const data_ITEM = async () => {
    const result = await api.get("/item_api");
    setdata_additem_table(result.data);
  };
  const open_checkboxMapcode = async () => {
    setdata_opencheckbnox_mapcode("1");
    setDisitems_save_mapcode(false);
    const result = await api.get("/bb_items_api");
    setdata_map_code_modal(result.data);
  };
  const data_mapcode_modal = async () => {
    const result = await api.get("/bb_items_api");
    setdata_map_code_modal(result.data);
    fromMapcode.resetFields();
  };
  const Open_modal_additem = async (value) => {
    setmodal_additem(true);
    setedit_data();
    fromAddItem.resetFields();
    setTimeout(() => {
      document.getElementById("items_code").focus();
    }, 100);
    await data_ITEM();
  };
  const focus_items_name = async (value) => {
    setDisitems_name(false);
    setTimeout(() => {
      document.getElementById("items_name").focus();
    }, 100);
  };
  const focus_items_display = async (value) => {
    setDisitems_display(false);
    setTimeout(() => {
      document.getElementById("items_display").focus();
    }, 100);
  };
  const save_additems = async () => {
    const formData = fromAddItem.getFieldsValue();
    // setmodal_additem(false);
    // console.log("formData", formData);
    const result = await api.get("/item_api");
    let modal_alert = {};
    for (let i = 0; i < result.data.length; i++) {
      console.log("result.data[i]", result.data[i]);
      if (result.data[i].items_code == formData.items_code) {
        modal_alert = "1";
      } else if (result.data[i].items_name == formData.items_name) {
        modal_alert = "2";
      } else if (result.data[i].items_display == formData.items_display) {
        modal_alert = "3";
      }
    }

    try {
      if (modal_alert == "1") {
        Modal.warning({
          title: "Item Code ซ้ำ!!",
          content: "กรุณากรอกข้อมูลอีกครั้ง!!",
          onOk: (close) => {
            close();
            fromAddItem.resetFields();
            setedit_data();
            data_ITEM();
            ref_additems();
            setTimeout(() => {
              document.getElementById("items_code").focus();
            }, 100);
          },
        });
      } else if (modal_alert == "2") {
        Modal.warning({
          title: "Item Name ซ้ำ!!",
          content: "กรุณากรอกข้อมูลอีกครั้ง!!",

          onOk: (close) => {
            close();
            fromAddItem.resetFields();
            setedit_data();
            data_ITEM();
            ref_additems();
            setTimeout(() => {
              document.getElementById("items_code").focus();
            }, 100);
          },
        });
      } else if (modal_alert == "3") {
        Modal.warning({
          title: "Item Display ซ้ำ!!",
          content: "กรุณากรอกข้อมูลอีกครั้ง!!",

          onOk: (close) => {
            close();
            fromAddItem.resetFields();
            setedit_data();
            data_ITEM();
            ref_additems();
            setTimeout(() => {
              document.getElementById("items_code").focus();
            }, 100);
          },
        });
      } else {
        const resultLogin = await api.post(`/save_itemdata`, {
          ...formData,
        });
        Modal.success({
          title: "บันทึกสำเร็จ",
          onOk: (close) => {
            close();
            fromAddItem.resetFields();
            setedit_data();
            data_ITEM();
            ref_additems();
            setTimeout(() => {
              document.getElementById("items_code").focus();
            }, 100);
          },
        });
      }
    } catch (error) {
      Modal.error({
        title: "Error",
        content: "กรุณากรอกข้อมูลให้ครบถ้วน!!",
        onOk: (close) => {
          close();
          fromAddItem.resetFields();
          setedit_data();
          data_ITEM();
          ref_additems();
          setTimeout(() => {
            document.getElementById("items_code").focus();
          }, 100);
        },
      });
      //   setmodal_additem(false);
    }
  };
  const save_mapcode = async () => {
    const frmData = fromMapcode.getFieldsValue();
    setmodal_mapcode(false);
    fromMapcode.resetFields();
    setdata_opencheckbnox_mapcode();
    const keyList = Object.keys(frmData);
    const result = [];
    keyList.forEach((key) => {
      if (frmData[key].mi_code == true) {
        result.push(key);
      }
    });
    try {
      for (let i = 0; i < result.length; i++) {
        const resultapi = await api.post(`/save_mapcode`, {
          items_code: frmData.itemcode_select,
          map: result,
        });
      }

      Modal.success({
        title: "Successful confirmation",
        content: "บันทึกสำเร็จ",
      });
      await Mapcodedata();
    } catch (error) {
      Modal.error({
        title: "Error",
        content: "กรุณากรอกข้อมูลให้ครบถ้วน!!",
      });
      //   setmodal_additem(false);
    }
  };
  const ref_additems = async () => {
    fromAddItem.resetFields();
    setDisitems_name(true);
    setDisitems_display(true);
    setedit_data();
    setTimeout(() => {
      document.getElementById("items_code").focus();
    }, 100);
  };

  const ref_mapcode = async () => {
    fromMapcode.resetFields();
    setdata_opencheckbnox_mapcode();
  };

  const Open_modal_mapcode = async (value) => {
    setmodal_mapcode(true);
    setdata_opencheckbnox_mapcode();
    await data_ITEM();
    await data_mapcode_modal();
    setedit_data_setting();
  };

  const columns = [
    {
      title: "",
      dataIndex: "n",
      key: "n",
      align: "center",
      width: "4%",
      render: (text, record, index) => {
        return (
          <div>
            <p
              onClick={() => Editdata_Setting(record.items_code)}
              className="pointer"
              style={{
                marginBottom: "-8px",
                marginTop: "-3px",
              }}
            >
              <MdEditNote size={"20px"} />
            </p>
          </div>
        );
      },
    },
    {
      title: "Item Code",
      dataIndex: "items_code",
      key: "items_code",
      align: "center",
      width: "10%",
    },
    {
      title: "Item Name",
      dataIndex: "items_name",
      key: "items_name",
      align: "center",
      width: "30%",
    },
    {
      title: "BB Code",
      dataIndex: "bb_items",
      key: "bb_items",
      align: "center",
      width: "10%",
    },
    {
      title: "BB Name",
      dataIndex: "mi_name",
      key: "mi_name",
      align: "center",
      width: "30%",
    },
  ];
  const columns_additem = [
    {
      title: "",
      dataIndex: "no",
      key: "no",
      align: "center",
      width: "1%",
      render: (text, record) => {
        return (
          <div>
            <p
              onClick={() => Edit_Item(record.items_code)}
              className="pointer"
              style={{
                marginBottom: "-8px",
                marginTop: "-3px",
              }}
            >
              <MdEditNote size={"20px"} />
            </p>
          </div>
        );
      },
    },
    {
      title: "Item Code",
      dataIndex: "items_code",
      key: "items_code",
      align: "center",
      width: "10%",
      render: (_, record, index, text) => (
        <div>
          {edit_data == record.items_code ? (
            <Form.Item
              name={[record.items_code, "items_code"]}
              className="fromitem-fromtable-type_sc"
              style={{ width: "100%", height: "1px", marginTop: "-6.65px" }}
            >
              <Input
                size="small"
                id={["items_codes", record.items_code]}
                className="Input-fromitem-fromtable-type_sc"
                onKeyDown={({ target: { value }, keyCode }) => {
                  if (keyCode === 13) {
                    // 13 คือ enter
                    focus_items_name_table(record.items_code);
                  }
                }}
                style={{ height: "18px", fontSize: "12px" }}
              />
            </Form.Item>
          ) : (
            <span style={{ fontSize: "11px" }}>{record.items_code}</span>
          )}
        </div>
      ),
    },
    {
      title: "Item Name",
      dataIndex: "items_name",
      key: "items_name",
      align: "center",
      width: "40%",
      render: (_, record, index, text) => (
        <div>
          {edit_data == record.items_code ? (
            <Form.Item
              name={[record.items_code, "items_name"]}
              className="fromitem-fromtable-type_sc"
              style={{ width: "100%", height: "1px", marginTop: "-6.65px" }}
            >
              <Input
                size="small"
                id={["items_name", record.items_code]}
                className="Input-fromitem-fromtable-type_sc"
                onKeyDown={({ target: { value }, keyCode }) => {
                  if (keyCode === 13) {
                    // 13 คือ enter
                    focus_items_displays_table(record.items_code);
                  }
                }}
                style={{ height: "18px", fontSize: "12px" }}
              />
            </Form.Item>
          ) : (
            <span style={{ fontSize: "11px" }}>{record.items_name}</span>
          )}
        </div>
      ),
    },
    {
      title: "Items Display",
      dataIndex: "items_display",
      key: "items_display",
      align: "center",
      width: "10%",
      render: (_, record, index, text) => (
        <div>
          {edit_data == record.items_code ? (
            <Form.Item
              name={[record.items_code, "items_display"]}
              className="fromitem-fromtable-type_sc"
              style={{ width: "100%", height: "1px", marginTop: "-6.65px" }}
            >
              <Input
                size="small"
                id={["items_displays", record.items_code]}
                className="Input-fromitem-fromtable-type_sc"
                onKeyDown={({ target: { value }, keyCode }) => {
                  if (keyCode === 13) {
                    // 13 คือ enter
                    update_additems(record.items_code);
                  }
                }}
                style={{ height: "18px", fontSize: "12px" }}
              />
            </Form.Item>
          ) : (
            <span style={{ fontSize: "11px" }}>{record.items_display}</span>
          )}
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "operation",
      width: "2%",
      align: "center",
      render: (_, record, dataIndex, key) => (
        <div>
          {/* {record.xm_status_name && ( */}
          <Popconfirm
            title="คุณต้องการบข้อมูลใช่หรือไม่ ?"
            onConfirm={() => handleDelete_Item(record.items_code)}
          >
            <CloseCircleOutlined
              className="BTN-DELETE"
              style={{ fontSize: "12px", color: "red" }}
            />
          </Popconfirm>
          {/* )} */}
        </div>
      ),
    },
  ];
  const columns_mapcode = [
    {
      title: "#",
      // dataIndex:"items_name",
      align: "center",
      width: "3%",
      render: (text, record, index) => {
        return (
          <div>
            {data_opencheckbnox_mapcode == "1" ? (
              <Form.Item
                label=""
                name={[record.mi_code, "mi_code"]}
                style={{
                  marginTop: "-8px",
                  marginBottom: "-6px",
                  marginLeft: "0.5px",
                }}
                valuePropName="checked"
              >
                <Checkbox />
              </Form.Item>
            ) : (
              <Checkbox disabled />
            )}
          </div>
        );
      },
    },
    {
      title: "Item Code",
      dataIndex: "mi_code",
      key: "mi_code",
      align: "center",
      width: "10%",
    },
    {
      title: "Name",
      dataIndex: "mi_name",
      key: "mi_name",
      align: "center",
      width: "50%",
      render: (text, record, index) => {
        return (
          <div>
            <span style={{ float: "left" }}>&nbsp;&nbsp;{text}</span>
          </div>
        );
      },
    },
  ];
  const Editdata_Setting = async (value) => {
    setmodal_mapcode(true);
    setdata_opencheckbnox_mapcode();
    await data_ITEM();
    await data_mapcode_modal();
    setedit_data_setting("1");
    setDisitems_save_mapcode(false);
    const result = await api.get("/showdata_edit_mapcode", {
      params: {
        lab_code: value,
      },
    });
    let datas = result.data;
    const data = datas.map((item) => item.mi_code);
    const dataUpdate = {};
    for (let i = 0; i <= datas.length; i++) {
      dataUpdate[data[i]] = {
        mi_code: true,
      };
    }
    setdata_opencheckbnox_mapcode("1");
    fromMapcode.setFieldsValue({
      itemcode_select: result.data[0].lab_code,
      ...dataUpdate,
    });
  };

  const save_Editdata_Setting = async () => {
    const frmData = fromMapcode.getFieldsValue();
    setmodal_mapcode(false);
    fromMapcode.resetFields();
    setdata_opencheckbnox_mapcode();
    const keyList = Object.keys(frmData);
    const result = [];
    keyList.forEach((key) => {
      if (frmData[key].mi_code == true) {
        result.push(key);
      }
    });

    const resultapis = await api.get(`/save_mapcode_dataedit`, {
      params: {
        items_code: frmData.itemcode_select,
      },
    });

    try {
      for (let i = 0; i < result.length; i++) {
        const resultapi = await api.post(`/save_mapcode`, {
          items_code: frmData.itemcode_select,
          map: result,
        });
      }

      Modal.success({
        title: "Successful confirmation",
        content: "บันทึกสำเร็จ",
      });
      await Mapcodedata();
    } catch (error) {
      Modal.error({
        title: "Error",
        content: "กรุณากรอกข้อมูลให้ครบถ้วน!!",
      });
      //   setmodal_additem(false);
    }
  };
  const Edit_Item = async (items_code) => {
    setTimeout(() => {
      document.getElementById(["items_codes", items_code]).focus();
    }, 100);

    // console.log("items_code", items_code);
    const result = await api.get("/item_api");

    for (let i = 0; i < result.data.length; i++) {
      if (items_code == result.data[i].items_code) {
        setedit_data(result.data[i].items_code);
      }
    }

    const keytype = [];
    const keyList = result.data;
    let lastType = "";
    const data = {};
    keyList.forEach((item) => {
      keytype.push(item);
      data[item.items_code] = {
        items_code: item.items_code,

        items_name: item.items_name,
        items_display: item.items_display,
      };
    });
    setdata_additem_table(keytype);
    fromAddItem.setFieldsValue({
      ...data,
    });
  };
  const focus_items_name_table = async (value) => {
    setTimeout(() => {
      document.getElementById(["items_name", value]).focus();
    }, 100);
  };
  const focus_items_displays_table = async (value) => {
    setTimeout(() => {
      document.getElementById(["items_displays", value]).focus();
    }, 100);
  };
  const update_additems = async (value) => {
    const formData = fromAddItem.getFieldsValue();
    try {
      const result = await api.get(`/UP_itemdata`, {
        params: {
          items_code:
            formData[value].items_code === undefined
              ? ""
              : formData[value].items_code,
          items_name:
            formData[value].items_name === undefined
              ? ""
              : formData[value].items_name,
          items_display:
            formData[value].items_display === undefined
              ? ""
              : formData[value].items_display,
        },
      });
      Modal.success({
        title: "แก้ไขสำเร็จ",
        onOk: (close) => {
          close();
          fromAddItem.resetFields();
          setedit_data();
          data_ITEM();
          setTimeout(() => {
            document.getElementById("items_code").focus();
          }, 100);
        },
      });
    } catch (error) {
      Modal.error({
        title: "Error",
        content: "กรุณากรอกข้อมูลให้ครบถ้วน!!",
      });
    }
  };

  const handleDelete_Item = async (items_code) => {
    const newData = data_additem_table.filter(
      (item) => item.items_code !== items_code
    );
    const deleteData = data_additem_table.filter(
      (item) => item.items_code === items_code
    );
    const result = await api.put("/delete_itemdata", {
      items_code: deleteData[0].items_code,
    });
    setdata_additem_table(newData);
  };

  useEffect(async () => {
    await Mapcodedata();
  }, []);
  return (
    <>
      <Layout keyTab="setting_lab_item">
        <Spin tip="Loading..." spinning={Spinloading} size="large">
          <div>
            <Head>
              <title>SIBSOFT : ตั้งค่า Map Code</title>
              <meta property="og:title" content="My page title" key="title" />
            </Head>
          </div>
          <Row
            style={{
              marginTop: "10px",
              backgroundColor: "white",
              padding: "10px",
            }}
          >
            <Col span={24}>
              <Row
                justify="start"
                style={{ marginLeft: "15px", paddingBottom: "10px" }}
              >
                <AiFillSetting
                  style={{ fontSize: "30px", marginTop: "-1px" }}
                />{" "}
                &nbsp;&nbsp;&nbsp;
                <b style={{ fontSize: "18px" }}> ตั้งค่า Map Code</b>
              </Row>
              <Row>
                <Col span={4}>
                  <Button
                    style={{
                      paddingLeft: "30px",
                      paddingRight: "30px",
                    }}
                    onClick={Open_modal_additem}
                  >
                    <Row>
                      <MdLibraryAdd
                        style={{
                          color: "green",
                          fontSize: "25px",
                        }}
                      />
                      &nbsp;&nbsp;
                      <b>Add Item</b>
                    </Row>
                  </Button>
                  <br />
                  <Button
                    style={{
                      paddingLeft: "27px",
                      paddingRight: "27px",
                    }}
                    onClick={Open_modal_mapcode}
                  >
                    <Row>
                      <MdLibraryAdd
                        style={{ color: "green", fontSize: "25px" }}
                      />
                      &nbsp;&nbsp;
                      <b>Map Code</b>
                    </Row>
                  </Button>
                </Col>
                <Col span={20}>
                  <Row justify="end" style={{ marginBottom: "10px" }}>
                    <span>
                      <Row>
                        <VscSaveAs size={"20px"} /> : บันทึก
                      </Row>
                    </span>
                    <span style={{ marginLeft: "20px" }}>
                      <Row>
                        <MdEditNote size={"25px"} /> : แก้ไข
                      </Row>
                    </span>
                    <span style={{ marginLeft: "20px" }}>
                      <Row>
                        <CloseCircleOutlined
                          style={{ fontSize: "20px", color: "red" }}
                        />{" "}
                        : ลบข้อมูล
                      </Row>
                    </span>
                  </Row>
                  <Form form={form_datasetting}>
                    <Table
                      className="table_report_stock_tackblood"
                      columns={columns}
                      dataSource={data_setting}
                      pagination={false}
                      size="small"
                      scroll={{ y: 450 }}
                    />
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </Spin>
        <Modal
          visible={modal_additem}
          onOk={save_additems}
          onCancel={() => {
            setmodal_additem(false);
            Mapcodedata();
          }}
          // okText="ยืนยัน"
          // cancelText="ยกเลิก"
          width={"60%"}
          footer={false}
          style={{ top: 12 }}
        >
          <Row>
            <h style={{ fontSize: "20px" }}>
              <b>Add Item</b>
            </h>
          </Row>
          <Form form={fromAddItem}>
            <Row style={{ marginTop: "10px" }}>
              <Row justify="start">
                <Col span={24}>
                  <Row style={{ marginBottom: "-20px" }}>
                    <Form.Item
                      label={<span>Item Code &nbsp;&nbsp;</span>}
                      name="items_code"
                      className="fromitem-fromtable-type_sc"
                      style={{
                        width: "100%",
                      }}
                    >
                      <Input
                        size="small"
                        id="items_code"
                        className="Input-fromitem-fromtable-type_sc"
                        onKeyDown={({ target: { value }, keyCode }) => {
                          if (keyCode === 13) {
                            // 13 คือ enter
                            focus_items_name();
                          }
                        }}
                      />
                    </Form.Item>
                  </Row>
                  <Row style={{ marginBottom: "-20px" }}>
                    <Form.Item
                      label={<span>Item Name &nbsp;</span>}
                      name="items_name"
                      className="fromitem-fromtable-type_sc"
                      style={{
                        width: "100%",
                      }}
                    >
                      <Input
                        size="small"
                        id="items_name"
                        disabled={Disitems_name}
                        className="Input-fromitem-fromtable-type_sc"
                        onKeyDown={({ target: { value }, keyCode }) => {
                          if (keyCode === 13) {
                            // 13 คือ enter
                            focus_items_display();
                          }
                        }}
                      />
                    </Form.Item>
                  </Row>
                  <Row style={{ marginBottom: "-20px" }}>
                    <Form.Item
                      label="Item Display"
                      name="items_display"
                      className="fromitem-fromtable-type_sc"
                      style={{
                        width: "100%",
                      }}
                    >
                      <Input
                        disabled={Disitems_display}
                        size="small"
                        id="items_display"
                        className="Input-fromitem-fromtable-type_sc"
                        onKeyDown={({ target: { value }, keyCode }) => {
                          if (keyCode === 13) {
                            // 13 คือ enter
                            save_additems();
                          }
                        }}
                      />
                    </Form.Item>
                  </Row>
                </Col>
              </Row>
            </Row>
            <Row justify="center" style={{ paddingBottom: "20px" }}>
              <Button
                type="primary"
                style={{
                  fontSize: "12px",
                  height: "28px",
                }}
                onClick={save_additems}
                disabled={Disitems_display}
              >
                <Row>
                  <VscSaveAs size={"20px"} />
                  &nbsp; บันทึก
                </Row>
              </Button>
              &nbsp;
              <Button
                type="primary"
                style={{
                  fontSize: "12px",
                  height: "28px",
                }}
                onClick={ref_additems}
                danger
              >
                <Row>
                  <RetweetOutlined
                    style={{
                      fontWeight: "3px bold",
                      fontSize: "18px",
                      color: "white",
                    }}
                  />
                  &nbsp; Refresh
                </Row>
              </Button>
            </Row>
            <Row justify="center">
              <Col span={24}>
                <Table
                  className="table_report_stock_tackblood"
                  columns={columns_additem}
                  dataSource={data_additem_table}
                  pagination={false}
                  size="small"
                />
              </Col>
            </Row>
          </Form>
        </Modal>
        <Modal
          // title="ยืนยันรหัสผ่าน"
          visible={modal_mapcode}
          onOk={save_mapcode}
          onCancel={() => {
            setmodal_mapcode(false);
            Mapcodedata();
          }}
          // okText="ยืนยัน"
          // cancelText="ยกเลิก"
          width={"40%"}
          footer={false}
          style={{ top: 12 }}
        >
          <Row>
            <h style={{ fontSize: "20px" }}>
              <b>Map Code</b>
            </h>
          </Row>{" "}
          <Form form={fromMapcode}>
            <Row style={{ marginTop: "10px" }}>
              <Row justify="start">
                <Col span={24}>
                  <Row style={{ marginBottom: "-10px" }}>
                    {edit_data_setting == "1" ? (
                      <Form.Item label="Item Code" name="itemcode_select">
                        <Select
                          // showArrow={false}
                          dropdownMatchSelectWidth={false}
                          placement={placement}
                          // size="small"
                          placeholder="Search"
                          // defaultValue="hn"
                          style={{ width: 300 }}
                          onChange={open_checkboxMapcode}
                          disabled
                        >
                          {data_additem_table?.map((item) => (
                            <Option
                              key={item.items_code}
                              value={item.items_code}
                            >
                              <b style={{ color: "black" }}>
                                {item.items_code}
                              </b>
                              :
                              <span style={{ color: "black" }}>
                                {item.items_name}
                              </span>
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    ) : (
                      <Form.Item label="Item Code" name="itemcode_select">
                        <Select
                          // showArrow={false}
                          dropdownMatchSelectWidth={false}
                          placement={placement}
                          // size="small"
                          placeholder="Search"
                          // defaultValue="hn"
                          style={{ width: 300 }}
                          onChange={open_checkboxMapcode}
                        >
                          {data_additem_table?.map((item) => (
                            <Option
                              key={item.items_code}
                              value={item.items_code}
                            >
                              <b>{item.items_code}</b>:{item.items_name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    )}
                  </Row>
                </Col>
              </Row>
            </Row>
            <Row justify="center" style={{ paddingBottom: "20px" }}>
              {edit_data_setting == "1" ? (
                <Button
                  type="primary"
                  style={{
                    fontSize: "12px",
                    height: "28px",
                  }}
                  onClick={save_Editdata_Setting}
                  disabled={Disitems_save_mapcode}
                >
                  <Row>
                    <VscSaveAs size={"20px"} />
                    &nbsp; บันทึก
                  </Row>
                </Button>
              ) : (
                <Button
                  type="primary"
                  style={{
                    fontSize: "12px",
                    height: "28px",
                  }}
                  onClick={save_mapcode}
                  disabled={Disitems_save_mapcode}
                >
                  <Row>
                    <VscSaveAs size={"20px"} />
                    &nbsp; บันทึก
                  </Row>
                </Button>
              )}
              &nbsp;
              {edit_data_setting == "1" ? (
                <Button
                  type="primary"
                  style={{
                    fontSize: "12px",
                    height: "28px",
                  }}
                  onClick={ref_mapcode}
                  danger
                >
                  <Row>
                    <RetweetOutlined
                      style={{
                        fontWeight: "3px bold",
                        fontSize: "18px",
                        color: "white",
                      }}
                    />
                    &nbsp; Refresh
                  </Row>
                </Button>
              ) : (
                <Button
                  type="primary"
                  style={{
                    fontSize: "12px",
                    height: "28px",
                  }}
                  onClick={ref_mapcode}
                  danger
                >
                  <Row>
                    <RetweetOutlined
                      style={{
                        fontWeight: "3px bold",
                        fontSize: "18px",
                        color: "white",
                      }}
                    />
                    &nbsp; Refresh
                  </Row>
                </Button>
              )}
            </Row>
            <Row justify="center">
              <Col span={24}>
                <Table
                  className="table_report_stock_tackblood"
                  columns={columns_mapcode}
                  dataSource={ata_map_code_modal}
                  pagination={false}
                  size="small"
                  scroll={{ y: 300 }}
                />
              </Col>
            </Row>
          </Form>
        </Modal>
      </Layout>
    </>
  );
};

export default Setting_lab_item;
