import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  NotificationOutlined,
} from "@ant-design/icons";
import { Column, Pie } from "@ant-design/plots";
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Statistic,
  Table,
  Tooltip,
  Typography,
} from "antd";
import moment from "moment";
import "moment/locale/th";
import { useEffect, useState } from "react";
import { BiCommentAdd } from "react-icons/bi";
import { IoWater } from "react-icons/io5";
import { VscSaveAs } from "react-icons/vsc";

import { Layout } from "../components";
import api from "../lib/api";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const Home = () => {
  const [form] = Form.useForm();

  const [userList, setUserList] = useState([]);
  const [date, setDate] = useState([]);
  const [time, settime] = useState();

  const [dataStockBlood, setDataStockBlood] = useState();
  const [dataNews, setDataNews] = useState();
  const [typeNews, setTypeNews] = useState();
  const [hidCard, setHidCard] = useState(true);
  const [isModalPass, setIsModalPass] = useState(false);
  const [password, setPassword] = useState();

  const [frm_addNew] = Form.useForm();

  const setCrrentDate = () => {
    const dayNames = [
      "วันอาทิตย์ที่",
      "วันจันทร์ที่",
      "วันอังคารที่",
      "วันพุทธที่",
      "วันพฤหัสบดีที่",
      "วันศุกร์ที่",
      "วันเสาร์ที่",
    ];
    const monthNamesThai = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤษจิกายน",
      "ธันวาคม",
    ];
    const d = new Date();

    const years = moment().add(543, "years").format("YYYY");
    const months = moment().format("MM");
    const day = moment().format("DD");
    const date =
      dayNames[d.getDay()] +
      " " +
      day +
      " เดือน" +
      monthNamesThai[d.getMonth()] +
      " พ.ศ." +
      years;
    setDate(date);
    settime(moment().format("HH:mm:ss"));
  };


  const Get_stock_blood = async () => {
    const result = await api.get("/Get_stockBlood");
    console.log("=>>", result.data[0][0].sum_num);
    setDataStockBlood(result.data[0]);
  };


  const Get_DataNews = async () => {
    const result = await api.get("/Get_news");
    setDataNews(result.data);
  };
  const Get_DataTypeNews = async () => {
    const result = await api.get("/Get_newType");
    setTypeNews(result.data);
  };

  const Get_user = async () => {
    const result = await api.get("/user");
    setUserList(result.data);
  };


  useEffect(async () => {
    await setCrrentDate();
    await Get_stock_blood();
    await Get_user();
    await Get_DataNews();
    await Get_DataTypeNews();
  }, []);

  const onChange = () => {
    if (hidCard === false) {
      setHidCard(true);
    } else {
      setHidCard(false);
    }
    frm_addNew.resetFields();
  };

  const showModalPass = async () => {
    setIsModalPass(true);
    setTimeout(() => {
      document.getElementById("pass").focus();
    }, 0);
  };

  const AddNews = async () => {
    const frm = frm_addNew.getFieldsValue();
    if (frm.data_nw == "") {
      Modal.warning({
        title: "แจ้งเตือน",
        content: "กรุณกรอกข้อมูลให้ครบถ้วน",
      });
      setIsModalPass(false);
      setPassword();
    } else {
      const resultLogin = await api.post(`/Confirm_password`, {
        password: password,
      });
      const staff_name = resultLogin.data.user_name;
      const result = await api.put(`Add_News`, {
        nw_type_id: frm.type_nw,
        nw_data: frm.data_nw,
        nw_user: staff_name,
      });
      if (result.data.message == "success") {
        Modal.success({
          title: "เเจ้งเตือน",
          content: "บันทึกข้อมูลเรียบร้อยแล้ว",
        });
        setIsModalPass(false);
        setPassword();
        Get_DataNews();
        frm_addNew.resetFields();
        setHidCard(true);
      }
    }
  };
  const data = [
    {
      Group: "Group A",
      value: dataStockBlood?.[0].A,
    },
    {
      Group: "Group B",
      value: dataStockBlood?.[0].B,
    },
    {
      Group: "Group O",
      value: dataStockBlood?.[0].O,
    },
    {
      Group: "Group AB",
      value: dataStockBlood?.[0].AB,
    },
    {
      Group: "Cry O",
      value: dataStockBlood?.[0].CryO,
    },
  ];

  const config = {
    appendPadding: -10,
    data,
    angleField: "value",
    colorField: "Group",
    radius: 0.8,
    label: {
      type: "outer",
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };

  const configBar = {
    data,
    xField: "Group",
    yField: "value",
    seriesField: "Group",
    legend: {
      position: "top",
    },
    conversionTag: {},
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    color: ["#F6E3C5", "#3AB0FF", "#FFB562", "#F87474", "#d3d3d3"],
    // color: ["#3DB2FF", "#FFDFAF", "#FFB830", "#FFBCBC", "#d3d3d3"],

    minColumnWidth: 42,
    maxColumnWidth: 42,
  };

  const columns = [
    {
      title: "News",
      dataIndex: "data",
      key: "data",
      width: "70%",
      render: (text, record) => (
        <div>
          {record.data_date == moment().format("DD/MM/YYYY") ? (
            <>
              <Badge dot>
                <NotificationOutlined style={{ fontSize: 16 }} />
              </Badge>
              &nbsp;
              {record.data}
              <br />
              <h style={{ fontSize: "11px", color: "gray" }}>
                {" "}
                {record.data_date}
              </h>
            </>
          ) : (
            <>
              {record.data}
              <br />
              <h style={{ fontSize: "11px", color: "gray" }}>
                {" "}
                {record.data_date}
              </h>
            </>
          )}
        </div>
      ),
    },
    {
      title: " ",
      dataIndex: "data",
      key: "data",
      width: "3%",
      render: (text, record) => (
        <div>
          {record.data_date == moment().format("DD/MM/YYYY") ? (
            <>
              <Badge.Ribbon
                text="New"
                color="red"
                style={{ marginTop: "-25px" }}
              ></Badge.Ribbon>
            </>
          ) : (
            ""
          )}
        </div>
      ),
    },
  ];

  ////////////////////////////////////
  return (
    <>
      <Layout keyTab="home">
        {/* <Row justify="end" style={{ marginTop: 10 }}>
          <Col>
            {date} {moment().format("HH:mm:ss")}
          </Col>
        </Row> */}
        <Row>
          <Col span={16} style={{ padding: "10px" }}>
            <Card
              style={{
                borderRadius: "12px",
              }}
            >
              <Row>
                <p>Over view</p>
              </Row>
              <Row justify="center">
                <Col span={4} style={{ marginRight: "10px" }}>
                  <Card
                    style={{
                      height: "80px",
                      borderRadius: "12px",
                      boxShadow: "2px 2px 2px #73777B",
                      cursor: "pointer",
                      width: "140px",
                      backgroundColor:
                        Number(dataStockBlood?.[0].A) < 150
                          ? "#FA9494"
                          : "#D9F8C4",
                    }}
                  >
                    <Statistic
                      style={{ color: "white", marginTop: "-20px" }}
                      title="Group A"
                      value={dataStockBlood?.[0].A}
                      // precision={3}
                      valueStyle={{
                        color:
                          Number(dataStockBlood?.[0].A) < 150
                            ? "red"
                            : "#3f8600",
                        fontSize: "20px",
                      }}
                      prefix={
                        <IoWater
                          style={{
                            marginBottom: "-3px",
                            fontSize: "24px",
                            color: "red",
                          }}
                        />
                      }
                      suffix="ถุง"
                    />
                  </Card>
                </Col>

                <Col
                  span={4}
                  style={{
                    borderRadius: "12px",
                    marginRight: "10px",
                  }}
                >
                  <Card
                    style={{
                      height: "80px",
                      borderRadius: "12px",
                      boxShadow: "2px 2px 2px #73777B",
                      width: "140px",
                      backgroundColor:
                        Number(dataStockBlood?.[0].B) < 150
                          ? "#FA9494"
                          : "#D9F8C4",
                    }}
                  >
                    <Statistic
                      style={{ marginTop: "-20px" }}
                      title="Group B"
                      value={dataStockBlood?.[0].B}
                      // precision={3}
                      valueStyle={{
                        color:
                          Number(dataStockBlood?.[0].B) < 150
                            ? "red"
                            : "#3f8600",
                        fontSize: "20px",
                      }}
                      prefix={
                        <IoWater
                          style={{
                            marginBottom: "-3px",
                            fontSize: "24px",
                            color: "red",
                          }}
                        />
                      }
                      suffix="ถุง"
                    />
                  </Card>
                </Col>

                <Col
                  span={4}
                  style={{
                    borderRadius: "12px",
                    marginRight: "10px",
                  }}
                >
                  <Card
                    style={{
                      boxShadow: "2px 2px 2px #73777B",
                      height: "80px",
                      borderRadius: "12px",
                      width: "140px",
                      backgroundColor:
                        Number(dataStockBlood?.[0].O) < 150
                          ? "#FA9494"
                          : "#D9F8C4",
                    }}
                  >
                    <Statistic
                      style={{ marginTop: "-20px" }}
                      title="Group O"
                      value={dataStockBlood?.[0].O}
                      // precision={3}
                      valueStyle={{
                        color:
                          Number(dataStockBlood?.[0].O) < 150
                            ? "red"
                            : "#3f8600",
                        fontSize: "20px",
                      }}
                      prefix={
                        <IoWater
                          style={{
                            marginBottom: "-3px",
                            fontSize: "24px",
                            color: "red",
                          }}
                        />
                      }
                      suffix="ถุง"
                    />
                  </Card>
                </Col>

                <Col
                  span={4}
                  style={{
                    borderRadius: "12px",
                    marginRight: "10px",
                  }}
                >
                  <Card
                    style={{
                      boxShadow: "2px 2px 2px #73777B",
                      height: "80px",
                      borderRadius: "12px",
                      width: "140px",
                      backgroundColor:
                        Number(dataStockBlood?.[0].AB) < 150
                          ? "#FA9494"
                          : "#D9F8C4",
                    }}
                  >
                    <Statistic
                      style={{ marginTop: "-20px" }}
                      title="Group AB"
                      value={dataStockBlood?.[0].AB}
                      // precision={3}
                      valueStyle={{
                        color:
                          Number(dataStockBlood?.[0].AB) < 150
                            ? "red"
                            : "#3f8600",
                        fontSize: "20px",
                      }}
                      prefix={
                        <IoWater
                          style={{
                            marginBottom: "-3px",
                            fontSize: "24px",
                            color: "red",
                          }}
                        />
                      }
                      suffix="ถุง"
                    />
                  </Card>
                </Col>

                <Col
                  span={4}
                  style={{
                    borderRadius: "12px",
                  }}
                >
                  <Card
                    style={{
                      boxShadow: "2px 2px 2px #73777B",
                      height: "80px",
                      borderRadius: "12px",
                      width: "140px",
                      backgroundColor:
                        Number(dataStockBlood?.[0].CryO) < 150
                          ? "#FA9494"
                          : "#D9F8C4",
                    }}
                  >
                    <Statistic
                      style={{ marginTop: "-20px" }}
                      title="Cry O"
                      value={dataStockBlood?.[0].CryO}
                      // precision={3}
                      valueStyle={{
                        color:
                          Number(dataStockBlood?.[0].CryO) < 150
                            ? "red"
                            : "#3f8600",
                        fontSize: "20px",
                      }}
                      prefix={
                        <IoWater
                          style={{
                            marginBottom: "-3px",
                            fontSize: "24px",
                            color: "red",
                          }}
                        />
                      }
                      suffix="ถุง"
                    />
                  </Card>
                </Col>
              </Row>

              <Row style={{ marginTop: "30px" }}>
                <Col
                  span={14}
                  style={{
                    height: "280px",
                  }}
                >
                  <Column {...configBar} />
                </Col>
                <Col
                  style={{
                    height: "350px",
                  }}
                  span={5}
                  offset={3}
                >
                  <Pie {...config} />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={8} style={{ padding: "10px" }}>
            <Card
              style={{
                borderRadius: "12px",
              }}
            >
              <Row>
                <Col span={24}>
                  <Row>
                    <Col>
                      <p>News12</p>
                    </Col>
                    <Col offset={20}>
                      <Tooltip
                        placement="right"
                        title={hidCard === true ? "คลิกเพื่อเพิ่มข้อความ" : ""}
                      >
                        <BiCommentAdd
                          style={{
                            fontSize: "28px",
                            cursor: "pointer",
                            color: "#2EB086",
                          }}
                          onClick={onChange}
                        />
                      </Tooltip>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Card hidden={hidCard} bordered={false}>
                        <Form
                          form={frm_addNew}
                          initialValues={{
                            type_nw: 1,
                            data_nw: "",
                          }}
                          onFinish={showModalPass}
                        >
                          <Row style={{ marginTop: "-10px" }}>
                            <Col span={24}>
                              <Form.Item label="ประเภทข่าว" name="type_nw">
                                <Select
                                  placeholder="ประเภทข่าว"
                                  style={{
                                    width: "100%",
                                  }}
                                >
                                  {typeNews?.map((item) => (
                                    <Option
                                      key={item.nw_type_id}
                                      value={item.nw_type_id}
                                    >
                                      {item.nw_type_name}
                                    </Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row
                            style={{ marginTop: "-20px", marginLeft: "45px" }}
                          >
                            <Col span={24}>
                              <Form.Item label="ข่าว" name="data_nw">
                                <TextArea
                                  id="data_nw"
                                  placeholder="ข่าว"
                                  rows={3}
                                  // onKeyDown={(e) => {
                                  //   const value = e.target.value;
                                  //   if (e.keyCode === 13) {
                                  //     showModalPass();
                                  //   }
                                  // }}
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row justify="end" style={{ marginTop: "-20px" }}>
                            <Button
                              style={{
                                fontSize: "12px",
                                height: "28px",
                                backgroundColor: "#3AB0FF",
                                color: "white",
                              }}
                              icon={
                                <VscSaveAs
                                  style={{
                                    fontSize: "14px",
                                    marginRight: "3px",
                                    marginBottom: "-2px",
                                  }}
                                />
                              }
                              size="samll"
                              // onClick={showModalPass}
                              htmlType="submit"
                            >
                              บันทึกข้อมูล
                            </Button>
                          </Row>
                        </Form>
                      </Card>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: hidCard === true ? "" : "-22px" }}>
                    <Col span={24}>
                      <Table
                        columns={columns}
                        dataSource={dataNews}
                        size="small"
                        pagination={false}
                        scroll={{ y: "66vh" }}
                        showHeader={false}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Layout>

      <Modal
        visible={isModalPass}
        onCancel={() => {
          setIsModalPass(false), setPassword();
        }}
        width={250}
        footer={false}
      >
        <Row>
          <h style={{ fontSize: "14px" }}>ยืนยันรหัสผ่าน</h>
        </Row>
        <Input.Password
          id="pass"
          placeholder="กรุณากรอกรหัสผ่าน"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          style={{ width: "100%" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={({ target: { value }, keyCode }) => {
            if (keyCode === 13) {
              // 13 คือ enter
              AddNews();
            }
          }}
        />
        <Row justify="end" style={{ marginTop: "10px" }}>
          <Button
            type="primary"
            danger
            onClick={() => {
              setIsModalPass(false), setPassword();
            }}
            style={{
              fontSize: "12px",
              height: "28px",
            }}
          >
            ยกเลิก
          </Button>
          &nbsp;
          <Button
            type="primary"
            style={{
              fontSize: "12px",
              height: "28px",
            }}
            onClick={AddNews}
            disabled={!password}
          >
            ยืนยัน
          </Button>
        </Row>
      </Modal>
    </>
  );
};

export default Home;
