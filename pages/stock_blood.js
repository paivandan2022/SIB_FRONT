import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  PrinterFilled,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Spin,
  Table,
  TimePicker,
  Tooltip,
  Typography,
} from "antd";
import { VscSaveAs } from "react-icons/vsc";

import JsBarcode from "jsbarcode";
import moment from "moment";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdManageSearch, MdRefresh } from "react-icons/md";
import ReactToPrint from "react-to-print";
import { Layout } from "../components";
import api from "../lib/api";

const { Title } = Typography;
const { Meta } = Card;
const { Search, TextArea } = Input;
const { Option } = Select;

const Stock_blood = () => {
  const [groupSelect, setGroupSelect] = useState("");
  const [ABOCountAll, setABOCountAll] = useState();
  const [bloodtypeAll, setbloodtypeAll] = useState();
  const [bloodDetail, setBloodDetail] = useState();
  const [bloodComponent, setbloodComponent] = useState([]);
  const [typeID, setTypeID] = useState();
  const [typeNum, setTypeNum] = useState();
  const [page, setPage] = useState(1);
  const [opttype, setOptType] = useState();
  const [senderBlood, setSenderBlood] = useState();
  const [bagType, setBagType] = useState();
  const [blood_name, setBloodName] = useState();
  const [rh_name, setRhName] = useState();
  const [staff_name, setStaffName] = useState();
  const [blood_liquid, setBloodLiquid] = useState();
  const [componentsUpdate, setComponentsUpdate] = useState();
  const [onChangeDatetypeID, setOnChangeDatetypeID] = useState();
  const [loadingModalEdit, setLoadingModalEdit] = useState(false);
  const [loadingModalView, setLoadingModalView] = useState(false);
  const [requireGroup, setRequireGroup] = useState(false);
  const [requireRh, setRequireRh] = useState(false);
  const [disabledGr, setDisabledGr] = useState(false);
  const [disabledRh, setDisabledRh] = useState(false);
  const [eject_choice, setEject_choice] = useState();
  const [eject_staff, setEject_staff] = useState();

  const [frmEdit] = Form.useForm();
  const [frmEditRadio] = Form.useForm();
  const [frmEject] = Form.useForm();
  const printComponent = useRef(null);
  const [password, setPassword] = useState();
  const [group, setGroup] = useState();
  const [selectGroup, setSelectGroup] = useState("all");

  //Modal
  const [isModalVisibleView, setisModalVisibleView] = useState(false);
  const [isModalVisibleEdit, setisModalVisibleEdit] = useState(false);
  const [isModalVisibleEject_blood, setIsModalVisibleEject_blood] =
    useState(false);
  const [isModalVisiblePassword, setisModalVisiblePassword] = useState(false);

  // Show modal
  const showModalpassword = () => {
    setisModalVisiblePassword(true);
    setTimeout(() => {
      document.getElementById("pass").focus();
    }, 500);
  };
  const handleOkpassword = async () => {
    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });
    console.log("resultLogin", resultLogin.data);

    try {
      if (resultLogin.data.id_user) {
        const frmData = frmEdit.getFieldsValue();
        console.log("value_frmData", frmData);
        const result = await api.put(`/Update_Stock`, {
          blood_id: frmData.blood_id,
          type_id: frmData.type_id,
          hos_id: frmData.hos_id,
          bag_type_id: frmData.bag_type_id,
          liquid_id: frmData.liquid_id,
          date_received: moment(frmData.date_received).format("YYYY-MM-DD"),
          date_collect: moment(frmData.date_collect).format("YYYY-MM-DD"),
          date_exp: moment(frmData.date_exp).format("YYYY-MM-DD"),
          exp_time: moment(frmData.exp_time).format("HH:mm:ss"),
          blood_group: frmData.blood_group,
          blood_rh: frmData.blood_rh,
          volume: frmData.volume,
          unit_no: frmData.unit_no,
          note: frmData.note,
          staff_name: frmData.staff_name,
        });
        //state
        setisModalVisibleEdit(false);
        showModalView(frmData.blood_id);
        setPassword();
      } else {
        Modal.error({
          title: "Password invalid",
          content: "กรุณากรอกรหัสผ่านให้ถูกต้อง!!",
        });
      }
      setisModalVisiblePassword(false);
    } catch (error) {
      Modal.error({
        title: "Error",
        content: "กรุณากรอกข้อมูลให้ครบถ้วน!!",
      });
    }
  };
  const showModalView = async (value) => {
    setLoadingModalView(true);
    setisModalVisibleView(true);

    // call api

    const result = await api.get(`/GetUnitDetail`, {
      params: {
        blood_id: value,
      },
    });
    // set state
    const bloodDetailView = result.data[0];
    console.log("bloodDetailView ===>", bloodDetailView);
    setBloodDetail(bloodDetailView);

    setLoadingModalView(false);
  };

  const handleOkView = () => {
    setisModalVisibleView(false);
  };

  const handleCancelView = () => {
    setisModalVisibleView(false);
  };
  //--------------------------------//
  const showModalEdit = async (value) => {
    setLoadingModalEdit(true);
    setisModalVisibleEdit(true);

    await Promise.all([
      LoadOptType(),
      LoadSender(),
      LoadBagType(),
      LoadBloodName(),
      LoadRhName(),
      LoadStaffName(),
      LoadBloodLiquid(),
    ]);
    await GetUnitUpdateDetail(value);
    setLoadingModalEdit(false);
  };

  const handleCancelEdit = () => {
    setisModalVisibleEdit(false);
    frmEdit.resetFields();
  };
  //---------------------------------------//
  const showModalEject_blood = async () => {
    setIsModalVisibleEject_blood(true);
    const result1 = await api.get("/Eject_choice");
    setEject_choice(result1.data);
    const result2 = await api.get("/Eject_staff");
    setEject_staff(result2.data);
  };

  const handleCancelEject_blood = () => {
    setIsModalVisibleEject_blood(false);
    frmEject.resetFields();
  };
  const onFinishEject = async (value) => {
    const result = await api.put(`/UpdateEject`, {
      blood_id: bloodDetail?.[0]?.id,
      unit_no: bloodDetail?.[0]?.unit_no, //778899
      eject_note: value.eject_note,
      eject_staff: value.eject_staff,
    });

    //state
    setIsModalVisibleEject_blood(false);
  };
  //--------------------------------------//
  const LoadOptType = async () => {
    const result = await api.get("/OptionType");
    setOptType(result.data);
  };
  const LoadSender = async () => {
    const result = await api.get("/SenderBlood");
    setSenderBlood(result.data);
  };
  const LoadBagType = async () => {
    const result = await api.get("/BagType");
    setBagType(result.data);
  };
  const LoadBloodName = async () => {
    const result = await api.get("/Blood_Name");
    setBloodName(result.data);
  };
  const LoadRhName = async () => {
    const result = await api.get("/Rh_Name");
    setRhName(result.data[0]);
  };
  const LoadStaffName = async () => {
    const result = await api.get("/Staff_Name");
    setStaffName(result.data);
  };
  const LoadBloodLiquid = async () => {
    const result = await api.get("/Blood_Liquid");
    setBloodLiquid(result.data);
  };
  const onFinishEdit = async (value) => {
    const result = await api.put(`/Update_Stock`, {
      blood_id: value.blood_id,
      type_id: value.type_id,
      hos_id: value.hos_id,
      bag_type_id: value.bag_type_id,
      liquid_id: value.liquid_id,
      date_received: moment(value.date_received).format("YYYY-MM-DD"),
      date_collect: moment(value.date_collect).format("YYYY-MM-DD"),
      date_exp: moment(value.date_exp).format("YYYY-MM-DD"),
      exp_time: moment(value.exp_time).format("HH:mm:ss"),
      blood_group: value.blood_group,
      blood_rh: value.blood_rh,
      volume: value.volume,
      unit_no: value.unit_no,
      note: value.note,
      staff_name: value.staff_name,
    });
    //state
    // setisModalVisibleEdit(false);
    showModalView(value.blood_id);
  };
  const fetchABO = async () => {
    const result = await api.get("/Getabocountall");
    const groupblooball = result.data?.[0]?.[0];
    setABOCountAll(groupblooball);
    // console.log(groupblooball);
  };
  //โหลดข้อมูลปุ่มหมู่เลือด
  useEffect(async () => {
    await fetchABO();
  }, []);

  ///////////
  const getbloodtype = async () => {
    setbloodComponent();
    setGroupSelect();
    setPage(1);
    setGroup("All");

    const result = await api.get("/GetComponentCountAll");
    const resultClick = await api.get(`/click_All`, {
      params: {
        page: 0,
      },
    });
    const getbloodtypeall = result.data[0];
    console.log(resultClick.data);
    setbloodtypeAll(getbloodtypeall);
    setbloodComponent(resultClick.data);
  };
  // useEffect(async () => {
  //   await getbloodtype();
  // }, []);
  /////////////////////////
  const getbloodtypegroup = async (group) => {
    setGroup(group);
    setbloodComponent();
    setGroupSelect(group);
    const result = await api.get(`/GetComponentCountGroup`, {
      params: {
        group: group,
      },
    });

    const resultClick = await api.get(`/click_Group`, {
      params: {
        group: group,
      },
    });
    const bloodtypesubgroup = result.data[0];
    const dataClick = resultClick.data;

    console.log("=>>>", dataClick);
    setbloodtypeAll(bloodtypesubgroup);
    setbloodComponent(dataClick);
  };

  const onClickRow = async (record, rowIndex) => {
    setTypeID(record.type_id);
    setTypeNum(record.type_num);
    setPage(1);
    try {
      let result;
      if (groupSelect) {
        result = await api.get(`/GetUnitReadyTypeGroup`, {
          params: {
            type_id: record.type_id,
            blood_group: groupSelect,
            //  page: 0,
          },
        });
      } else {
        result = await api.get(`/GetUnitReadyType`, {
          params: {
            type_id: record.type_id,
            //  page: 0,
          },
        });
      }

      const componentAll = result.data[0];
      setbloodComponent(componentAll);
    } catch (error) {
      Modal.error({ title: "Error" });
    }
  };

  //Refresh ข้อมูลปุ่มหมู่เลือด ทุก 1000=1วิ วินาที
  // useEffect(() => {
  //   setInterval(() => {
  //     fetchABO();
  //   }, 1000 * 5);
  // }, []);
  /////////////////////////////////////////////////
  const handleChange = (value) => {
    console.log(`Selected: ${value}`);
    setSelectGroup(value);
  };

  const onSearch = async (value) => {
    console.log(`Selected=>>`, selectGroup);
    try {
      let result;
      result = await api.get("/search_All", {
        params: {
          value_search: selectGroup,
          blood_no: value,
        },
      });
      console.log("**", result.data);

      if (result.data.length < 1) {
        Modal.warning({
          content: "กรุณากรอกข้อมูลถุงเลือด",
        });
      }
      setbloodComponent(result.data);
    } catch (error) {
      Modal.error({
        title: "Error",
      });
    }
  };

  const onSearch1 = async (value) => {
    try {
      let result;
      if (groupSelect) {
        result = await api.get("/GetUnitReadyTypeGroup", {
          params: {
            type_id: typeID,
            blood_group: groupSelect,
            page: (page - 1) * 10,
            value_search: value,
          },
        });
      } else {
        result = await api.get("/GetUnitReadyType", {
          params: {
            type_id: typeID,
            value_search: value,
            page: (page - 1) * 10,
          },
        });
      }

      const componentAll = result.data[0];
      setbloodComponent(result.data[0]);
    } catch (error) {
      Modal.error({ title: "Error" });
    }
  };
  //////////////////////////////////
  const onChangePagination = async (page, pageSize) => {
    setPage(page);
    try {
      let result;

      if (groupSelect) {
        result = await api.get("/GetUnitReadyTypeGroup", {
          params: {
            type_id: typeID,
            blood_group: groupSelect,
            page: (page - 1) * 10,
          },
        });
      } else {
        result = await api.get("/GetUnitReadyType", {
          params: {
            type_id: typeID,
            page: (page - 1) * 10,
          },
        });
      }

      const componentAll = result.data[0];
      setbloodComponent(result.data?.[0]);
    } catch (error) {
      Modal.error({ title: "Error" });
    }
  };
  ////////////////////////////
  const GetUnitUpdateDetail = async (value) => {
    const result = await api.get(`/GetUnitUpdateDetail`, {
      params: {
        id: value,
      },
    });
    const Compo_update = result.data[0][0];
    setComponentsUpdate(Compo_update);

    frmEdit.setFieldsValue({
      ...Compo_update,
      type_id: Number(Compo_update.type_id),
      liquid_id: Number(Compo_update.liquid_id),
      hos_id: Number(Compo_update.hos_id),
      date_received: moment(Compo_update.date_received),
      date_collect: moment(Compo_update.date_collect),
      date_exp: moment(Compo_update.date_received),
      exp_time: moment(Compo_update.exp_time, "HH:mm:ss"),
      volume: Number(Compo_update.volume),
    });
  };

  const onChangeTypeID = async (value) => {
    // call api
    const result = await api.get(`/GetDateTypeExp`, {
      params: { type_id: value },
    });
    const DateTypeExp = result.data[0];

    setOnChangeDatetypeID(DateTypeExp);

    const call_exp = moment(frmEdit.getFieldValue("date_collect")).add(
      DateTypeExp.date_expri,
      "days"
    );

    switch (DateTypeExp.component_type) {
      case 1: //มี group , rh
        setRequireGroup(true);
        setRequireRh(true);
        setDisabledGr(false);
        setDisabledRh(false);
        frmEdit.setFields([
          {
            name: "blood_group",
            value: componentsUpdate.blood_group,
            errors: [],
          },
          {
            name: "blood_rh",
            errors: [],
            value: componentsUpdate.blood_rh,
          },
        ]);
        break;
      case 2: //มี group
        setRequireGroup(true);
        setRequireRh(false);
        setDisabledGr(false);
        setDisabledRh(true);
        frmEdit.setFields([
          {
            name: "blood_group",
            errors: [],
            value: componentsUpdate.blood_group,
          },
          {
            name: "blood_rh",
            value: "",
            errors: [],
          },
        ]);
        break;
      case 3: //มี group
        setRequireGroup(true);
        setRequireRh(false);
        setDisabledGr(false);
        setDisabledRh(true);
        frmEdit.setFields([
          {
            name: "blood_group",
            errors: [],
            value: componentsUpdate.blood_group,
          },
          {
            name: "blood_rh",
            value: "",
            errors: [],
          },
        ]);
        break;
      case 4: //ไม่มี group , rh
        // setSetGr("");
        setRequireGroup(false);
        setRequireRh(false);
        setDisabledGr(true);
        setDisabledRh(true);

        frmEdit.setFields([
          {
            name: "blood_group",
            value: "",
            errors: [],
          },
          {
            name: "blood_rh",
            value: "",
            errors: [],
          },
        ]);
        break;

      default:
        setRequireGroup(false);
        setRequireRh(false);
        setDisabledGr(false);
        setDisabledRh(false);
        break;
    }

    frmEdit.setFieldsValue({
      ...DateTypeExp,
      time_exp: DateTypeExp.date_expri,
      date_exp: call_exp,
    });
  };

  const CalExpdate = (value) => {
    const collect = frmEdit.getFieldValue("time_exp");
    const call_exp = moment(value._d).add(collect, "days");

    frmEdit.setFieldsValue({
      date_exp: call_exp,
    });
  };

  const SetProcess = (str) => {
    const valueForm = frmEditRadio.getFieldsValue();
    if (valueForm.chkProcess === 5) {
      // show modal
      showModalEject_blood();
    } else {
      // call api
    }
  };

  const columnAll = [
    {
      title: "ประเภท",
      dataIndex: "type_name",
      key: "type_name",
    },
    {
      title: "จำนวน",
      dataIndex: "type_num",
      key: "type_num",
    },
  ];

  const columnComponent = [
    {
      title: "",
      dataIndex: "",
      key: "view",
      align: "center",

      render: (text, record) => (
        <Tooltip title="ตรวจสอบรายละเอียด">
          {/* <Button
            type="link"
           size="small"
            icon={<AiOutlineFileSearch />}
            style={{ fontSize: "18px",color: "#FF6633" }}
            onClick={() => showModalView(record.id)}
          /> */}
          <MdManageSearch
            style={{
              fontSize: "18px",
              cursor: "pointer",
            }}
            onClick={() => showModalView(record.id)}
          />
        </Tooltip>
      ),
    },
    {
      title: "เลขที่ถุงเลือด",
      dataIndex: "unit_no",
      key: "unit_no",
      align: "center",
    },
    {
      title: "หมู่เลือด",
      dataIndex: "abo",
      key: "abo",
      align: "center",
    },
    {
      title: "ประเภท",
      dataIndex: "component_type",
      key: "component_type",
      align: "center",
    },
    {
      title: "วันที่รับ",
      dataIndex: "date_received",
      key: "date_received",
      align: "center",
    },
    {
      title: "วันที่เจาะเก็บ",
      dataIndex: "date_collect",
      key: "date_collect",
      align: "center",
    },
    {
      title: "วันที่หมดอายุ",
      dataIndex: "date_exp",
      key: "date_exp",
      align: "center",
    },
    {
      title: "วันคงเหลือ",
      dataIndex: "num_exp",
      key: "num_exp",
      align: "center",
    },
  ];
  const columnBloodDetail = [
    {
      title: "Order no.",
      dataIndex: "bb_number",
      key: "bb_number",
      align: "center",
      width: 65
    },
    {
      title: "HN",
      dataIndex: "hn",
      key: "hn",
      align: "center",
      width: 90
    },
    {
      title: "ชื่อ - นามสกุล",
      dataIndex: "patient",
      key: "patient",
      align: "center"
    },
    {
      title: "ผู้ทำ",
      dataIndex: "xm_staft",
      key: "xm_staft",
      align: "center",
      width: 150
    },
    {
      title: "วันที่",
      dataIndex: "date_xm",
      key: "date_xm",
      align: "center",
      width: 70
    },
    {
      title: "สถานะ",
      dataIndex: "xm_status_name",
      key: "xm_status_name",
      align: "center"
    },
  ];
  return (
    <>
      <Layout keyTab="stock_blood">
        <div>
          <Head>
            <title>SIBSOFT : คลังเลือด</title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
        </div>

        <Row>
          <Col
            span={4}
            style={{
              marginLeft: "15px",
              marginTop: 15,
              border: "1px solid",
              borderRadius: "7px",
              height: "600px",
            }}
          >
            <Row justify="center" style={{ marginTop: -10 }}>
              <p
                style={{
                  fontSize: "14px",
                  border: "1px solid",
                  borderRadius: "7px",
                  backgroundColor: "white",
                  paddingLeft: "8px",
                  paddingRight: "8px",
                }}
              >
                หมู่เลือด
              </p>
            </Row>
            <Row justify="center">
              <Button
                style={{ marginBottom: "5px" }}
                onClick={() => getbloodtype()}
                className="btn-stock "
              >
                ทั้งหมด
              </Button>

              <Button
                onClick={() => getbloodtypegroup("A")}
                className="btn-stock "
                style={{ marginBottom: "5px" }}
              >
                Group A : ({ABOCountAll?.A})
              </Button>

              <Button
                onClick={() => getbloodtypegroup("B")}
                className="btn-stock "
                style={{ marginBottom: "5px" }}
              >
                Group B : ({ABOCountAll?.B})
              </Button>

              <Button
                onClick={() => getbloodtypegroup("O")}
                className="btn-stock"
                style={{ marginBottom: "5px" }}
              >
                Group O : ({ABOCountAll?.O})
              </Button>

              <Button
                onClick={() => getbloodtypegroup("AB")}
                className="btn-stock"
                style={{ marginBottom: "5px" }}
              >
                Group AB : ({ABOCountAll?.AB})
              </Button>

              <Button
                onClick={() => getbloodtypegroup(" ")}
                className="btn-stock"
                size="large"
              >
                ไม่ระบุ : (
                {ABOCountAll?.CryO === null ? "0" : ABOCountAll?.CryO})
              </Button>
            </Row>

            <Row justify="center" style={{ marginTop: 18 }}>
              {/* <p>{group === "A"?"Group A" : "" || group === "B"?"Group B": "" } </p> */}
              {/* <p style={{ fontSize: "18px" }}>
                <b>{group != " " ? `Group ${group}` : "ไม่ระบุ" : group == undefined ? " " : `Group ${group}`} </b>
              </p> */}

              <p style={{ fontSize: "18px" }}>
                <b style={{ display: group === undefined ? "none" : "block" }}>
                  {group != " "
                    ? `Group ${group}`
                    : group === " "
                    ? "ไม่ระบุ"
                    : group === "undefined"
                    ? ""
                    : `Group ${group}`}
                </b>
              </p>
            </Row>

            <Row justify="center" style={{ marginTop: 5 }}>
              <Table
                bordered
                rowClassName={(record, index) => {
                  return index % 2 === 0
                    ? "bg-row"
                    : "" || index % 2 != 0
                    ? "bg-row_"
                    : "";
                }}
                size="small"
                className="xm"
                style={{ width: 190 }}
                columns={columnAll}
                dataSource={bloodtypeAll} // dataSource = useState ของข้อมูล
                onRow={(record, rowIndex) => {
                  return {
                    onClick: () => onClickRow(record, rowIndex), // click row
                  };
                }}
                pagination={false}
              />
            </Row>
          </Col>
          {bloodComponent && (
            <Col
              span={19}
              style={{
                marginLeft: "15px",
                border: "1px solid",
                borderRadius: "7px",
                height: "600px",
                marginTop: 15,
              }}
            >
              <Row style={{ margin: 15 }}>
                <Col>
                  <Select
                    defaultValue="ทั้งหมด"
                    style={{ width: 90, height: "30px" }}
                    onChange={handleChange}
                  >
                    <Option key="all" value="all">
                      ทั้งหมด
                    </Option>
                    <Option key="A" value="A">
                      A
                    </Option>
                    <Option key="B" value="B">
                      B
                    </Option>
                    <Option key="O" value="O">
                      O
                    </Option>
                    <Option key="AB" value="AB">
                      AB
                    </Option>
                    <Option key="cryo" value=" ">
                      ไม่ระบุ
                    </Option>
                  </Select>
                </Col>
                <Col style={{ marginLeft: 5 }}>
                  {bloodComponent && (
                    <Search
                      placeholder="Search Unit No."
                      allowClear
                      size="small"
                      // enterButton="Search"
                      onSearch={onSearch}
                    />
                  )}
                </Col>
                <Col style={{ marginLeft: 10 }}>
                  {bloodComponent && (
                    <Button
                      style={{
                        fontSize: "12px",
                        height: "28px",
                        marginLeft: "5px",
                        backgroundColor: "orange",
                        color: "white",
                      }}
                      icon={
                        <MdRefresh
                          style={{
                            fontSize: "16px",
                            marginRight: "3px",
                            marginBottom: "-3px",
                          }}
                        />
                      }
                      onClick={getbloodtype}
                    >
                      เริ่มใหม่
                    </Button>
                  )}
                </Col>
              </Row>

              <Table
                rowClassName={(record, index) => {
                  return index % 2 === 0
                    ? "bg-row"
                    : "" || index % 2 != 0
                    ? "bg-row_"
                    : "";
                }}
                rowKey="id"
                size="small"
                className="stockComponent xm"
                columns={columnComponent}
                dataSource={bloodComponent}
                bordered
                // pagination={{
                //   current: page,
                //   total: Number(typeNum || 0),
                //   onChange: onChangePagination,
                // }}
              />
            </Col>
          )}
        </Row>
        <Row justify="center">
          <Space></Space>
        </Row>
      </Layout>
      <Modal
        visible={isModalVisibleView}
        onOk={handleOkView}
        onCancel={handleCancelView}
        width={700}
        footer={false}
        style={{ top: 20 }}
      >
        <Spin spinning={loadingModalView}>
          <Row>
            <p style={{ fontSize: "16px" }}>จัดการข้อมูลถุงเลือด</p>
          </Row>
          <Form
            form={frmEditRadio}
            layout="vertical"
            colon={false}
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 15 }}
          >
            <Row justify="center" style={{ marginTop: "-18px" }}>
              <h style={{ fontSize: "18px" }}>
                เลขที่ถุงเลือด : {bloodDetail?.[0]?.unit_no_dot}
              </h>
            </Row>
            <Row>
              <Col
                span={10}
                offset={1}
                style={{ border: "1px solid ", padding: "10px" }}
              >
                <p style={{ fontSize: "12px", marginTop: "-5px" }}>
                  ประเภท : {bloodDetail?.[0]?.component_type}
                </p>
                <p style={{ fontSize: "12px", marginTop: "-15px" }}>
                  ผู้บริจาค : {bloodDetail?.[0]?.hos_long_name_th}
                </p>
                <p style={{ fontSize: "12px", marginTop: "-15px" }}>
                  หมู่เลือด : {bloodDetail?.[0]?.abo}
                </p>
                <p style={{ fontSize: "12px", marginTop: "-15px" }}>
                  ปริมาณ : {bloodDetail?.[0]?.blood_volume} ml.
                </p>
                <p style={{ fontSize: "12px", marginTop: "-15px" }}>
                  วันรับ : {bloodDetail?.[0]?.date_received}
                </p>
                <p style={{ fontSize: "12px", marginTop: "-15px" }}>
                  วันเจาะ : {bloodDetail?.[0]?.date_collect}
                </p>
                <p style={{ fontSize: "12px", marginTop: "-15px" }}>
                  วันหมดอายุ : {bloodDetail?.[0]?.date_exp}
                </p>
                <Row justify="end" style={{ marginTop: "47px" }}>
                  <Col span={6}>
                    <Button
                      style={{
                        backgroundColor: "#FFCC1D",
                        marginBottom: "-5px",
                        marginTop: "-5px",
                        fontSize: "12px",
                        height: "26px",
                      }}
                      onClick={() => showModalEdit(bloodDetail?.[0]?.id)}
                    >
                      แก้ไข
                    </Button>
                  </Col>
                </Row>
              </Col>
              &nbsp;&nbsp;
              <Col
                span={12}
                style={{ border: "1px solid ", padding: "10px" }}
              >
                <Form.Item name="id" hidden={true}></Form.Item>
                <Form.Item name="chkProcess" label={<h4>เลือกการทำงาน</h4>}>
                  <Radio.Group>
                    <Space direction="vertical">
                      <Radio
                        style={{ fontSize: "12px", marginTop: "-15px" }}
                        value={1}
                      >
                        ตั้งค่าให้เลือดหมดอายุ
                      </Radio>
                      <Radio
                        style={{ fontSize: "12px", marginTop: "-12px" }}
                        value={2}
                      >
                        ยกเลิกการหมดอายุของเลือด
                      </Radio>
                      <Radio
                        style={{ fontSize: "12px", marginTop: "-12px" }}
                        value={3}
                      >
                        ลบข้อมูลถุงเลือด
                      </Radio>
                      <Radio
                        style={{ fontSize: "12px", marginTop: "-12px" }}
                        value={4}
                      >
                        ตั้งค่าให้เป็นจ่ายแล้ว
                      </Radio>
                      <Radio
                        style={{ fontSize: "12px", marginTop: "-12px" }}
                        value={5}
                      >
                        ยกเลิกการใช้เลือดถุงนี้
                      </Radio>
                      <Radio
                        style={{ fontSize: "12px", marginTop: "-12px" }}
                        value={6}
                      >
                        ยกเลิกการปลดเลือด/คืนเลือด
                      </Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>
                <Row justify="end">
                  <Col span={6} style={{ marginTop: "-12px" }}>
                    <Button
                      type="primary"
                      style={{
                        // backgroundColor: "#B4FF9F",
                        marginBottom: "-10px",
                        marginTop: "-13px",
                        fontSize: "12px",
                        height: "26px",
                      }}
                      onClick={() => SetProcess()}
                    >
                     ยืนยัน
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <br />
            <Row justify="center " style={{ marginTop: "-12px" }}>
              <Col span={12}>
                <div
                  className="site-card-border-less-wrapper"
                  style={{ textAlign: "center" }}
                >
                  <Button
                    className="ant-btnStatus"
                    size="large"
                    type="primary"
                    danger
                  >
                    <h3 style={{ marginTop: "2px" }}>
                      {bloodDetail?.[0]?.bl_status_name}
                    </h3>
                  </Button>
                </div>
              </Col>
            </Row>
            <br />
            <Row style={{ marginTop: "-12px" }}>
              <Col span={24}>
                <Table
                  bordered
                  className="xm"
                  size="small"
                  columns={columnBloodDetail}
                  dataSource={bloodDetail}
                  rowClassName={(record, index) =>
                    index % 2 === 2 ? "bg-gray" : ""
                  }
                  pagination={false}
                />
              </Col>
            </Row>
            <br />
            <Row justify="end" style={{ marginTop: "-12px" }}>
              <div ref={(el) => (printComponent = el)}>
                <Print_Sticker
                  barcode={bloodDetail?.[0]?.unit_no_dot}
                  unit_no_dot={bloodDetail?.[0]?.unit_no_dot}
                  unit_no={bloodDetail?.[0]?.unit_no}
                  component_type={bloodDetail?.[0]?.component_type}
                  component_type_long={bloodDetail?.[0]?.component_type_long}
                  blood_volume={bloodDetail?.[0]?.blood_volume}
                  date_collect={bloodDetail?.[0]?.date_collect}
                  date_exp={bloodDetail?.[0]?.date_exp}
                  gr={bloodDetail?.[0]?.gr}
                  rh_long_name={bloodDetail?.[0]?.rh_long_name}
                  rh={bloodDetail?.[0]?.rh}
                />
              </div>
              <ReactToPrint
                trigger={() => (
                  <Button
                    type="primary"
                    style={{
                      fontSize: "12px",
                      height: "28px",
                    }}
                    icon={
                      <PrinterFilled
                        style={{
                          fontSize: "12px",
                          marginTop: "3px",
                        }}
                      />
                    }
                  >
                    พิมพ์สติกเกอร์
                  </Button>
                )}
                content={() => printComponent}
              />
            </Row>
          </Form>
        </Spin>
      </Modal>
      {/* /////////////////////////////////////// */}
      <Modal
        visible={isModalVisibleEdit}
        onCancel={handleCancelEdit}
        width={800}
        footer={false}
        style={{ top: 20 }}
      >
        <Spin spinning={loadingModalEdit}>
          <Row style={{ marginTop: "-15px" }}>
            <h style={{ fontSize: "14px" }}>แก้ไขข้อมูลถุงเลือด</h>
          </Row>
          <Form
            form={frmEdit}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
          >
            <Row justify="start">
              <Col span={11} offset={1}>
                <Form.Item name="blood_id" hidden={true}></Form.Item>

                <Form.Item
                  label="ชนิด"
                  name="type_id"
                  rules={[
                    ({ getFieldValue }) => ({
                      async validator(_, value) {
                        const result = await api.get("/CheckUnitEdit", {
                          params: {
                            unit_no: getFieldValue("unit_no"),
                            type_id: value,
                            blood_id: getFieldValue("blood_id"),
                          },
                        });
                        if (result.data?.message === "pass") {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("Type Error !!!!"));
                      },
                    }),
                  ]}
                >
                  <Select
                    onChange={onChangeTypeID}
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    {opttype?.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.s_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="รับเลือดจาก"
                  name="hos_id"
                  style={{ marginTop: "-20px" }}
                >
                  <Select
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    {senderBlood?.map((item) => (
                      <Option key={item.hos_id} value={item.hos_id}>
                        {item.hos_shot_name_th}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="ประเภทถุง"
                  name="bag_type_id"
                  style={{ marginTop: "-20px" }}
                >
                  <Select
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    {bagType?.map((item) => (
                      <Option key={item.bagcode} value={item.bagcode}>
                        {item.bagtype}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="น้ำยา"
                  name="liquid_id"
                  style={{ marginTop: "-20px" }}
                >
                  <Select>
                    {blood_liquid?.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <br />
                <Form.Item
                  label="วันรับ"
                  name="date_received"
                  style={{ marginTop: "-20px" }}
                >
                  <DatePicker style={{ width: "100%" }} format="DD-MM-YYYY" />
                </Form.Item>
                <Form.Item
                  label="วันเจาะ"
                  name="date_collect"
                  style={{ marginTop: "-20px" }}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    format="DD-MM-YYYY"
                    onChange={CalExpdate}
                  />
                </Form.Item>
                <Form.Item
                  label="จำนวนวันหมดอายุ"
                  name="time_exp"
                  style={{ marginTop: "-20px" }}
                >
                  <Input disabled />
                </Form.Item>
                <Form.Item
                  label="วันหมดอายุ"
                  name="date_exp"
                  style={{ marginTop: "-20px" }}
                >
                  <DatePicker style={{ width: "100%" }} format="DD-MM-YYYY" />
                </Form.Item>
                <Form.Item
                  label="เวลาหมดอายุ"
                  name="exp_time"
                  style={{ marginTop: "-20px" }}
                >
                  <TimePicker format="HH-mm-ss" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Group"
                  name="blood_group"
                  rules={[
                    {
                      required: requireGroup,
                      message: "โปรดระบุหมู่เลือด",
                    },
                  ]}
                >
                  <Select
                    className="select-group"
                    dropdownClassName="select-group-option"
                    disabled={disabledGr}
                  >
                    {blood_name?.map((item) => (
                      <Option key={item.blood_name} value={item.blood_name}>
                        {item.blood_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="rh"
                  name="blood_rh"
                  rules={[
                    {
                      required: requireRh,
                      message: "โปรดระบุ Rh.",
                    },
                  ]}
                  style={{ marginTop: "-20px" }}
                >
                  <Select
                    className="select-groupRh"
                    dropdownClassName="select-group-optionRh"
                    disabled={disabledRh}
                  >
                    {rh_name?.map((item) => (
                      <Option key={item.rh_shot_name} value={item.rh_shot_name}>
                        {item.rh_shot_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="ปริมาณ"
                  name="volume"
                  style={{ marginTop: "-20px" }}
                >
                  <Input suffix="ml." />
                </Form.Item>
                <Form.Item
                  label={<h2>Unit_no </h2>}
                  name="unit_no"
                  rules={[
                    ({ getFieldValue }) => ({
                      async validator(_, value) {
                        const result = await api.get("/CheckUnitEdit", {
                          params: {
                            unit_no: value,
                            type_id: getFieldValue("type_id"),
                            blood_id: getFieldValue("blood_id"),
                          },
                        });
                        if (result.data?.message === "pass") {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("Unit No. Dupicate"));
                      },
                    }),
                  ]}
                  style={{ marginTop: "-20px" }}
                >
                  <Input className="ant-input-lg" size="large" />
                </Form.Item>
                <Form.Item
                  label="หมายเหตุ"
                  name="note"
                  style={{ marginTop: "-20px" }}
                >
                  <TextArea showCount maxLength={250} />
                </Form.Item>
                <Form.Item label="ผู้แก้ไข" name="staff_name">
                  <Select style={{ width: "100%" }}>
                    {staff_name?.map((item) => (
                      <Option key={item.staff} value={item.staff}>
                        {item.staff}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row justify="end" style={{ marginTop: "-25px" }}>
              <Button
                onClick={showModalpassword}
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
              >
                บันทึกข้อมูล
              </Button>
            </Row>
          </Form>
        </Spin>
      </Modal>
      {/* /-----------------------/ */}
      <Modal
        title=""
        visible={isModalVisibleEject_blood}
        onCancel={handleCancelEject_blood}
        footer={false}
        width={450}
      >
        <Row style={{ marginTop: "-15px" }}>
          <h style={{ fontSize: "14px" }}>เหตุผลการยกเลิก</h>
        </Row>
        <Row justify="center" style={{ marginLeft: " 15px" }}>
          <Col span={22}>
            <Form form={frmEject} layout="vertical" onFinish={onFinishEject}>
              <Row>
                <Col span={12}>
                  <Form.Item label="เหตุผล" name="eject_note">
                    <Select>
                      {eject_choice?.map((item) => (
                        <Option key={item.ejc_name} value={item.ejc_name}>
                          {item.ejc_name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={11} offset={1}>
                  <Form.Item label="เจ้าหน้าที่" name="eject_staff">
                    <Select>
                      {eject_staff?.map((item) => (
                        <Option key={item.id_user} value={item.full_name}>
                          {item.full_name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="end" style={{ marginTop: "-15px" }}>
                <Button htmlType="submit" type="primary">
                  ยืนยัน
                </Button>
              </Row>
            </Form>
          </Col>
        </Row>
      </Modal>

      {/* Modal ยืนยันรหัสผ่าน */}
      <Modal
        visible={isModalVisiblePassword}
        onCancel={() => {
          setisModalVisiblePassword(false), setPassword();
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
              handleOkpassword();
            }
          }}
        />
        <Row justify="end" style={{ marginTop: "10px" }}>
          <Button
            type="primary"
            danger
            onClick={() => {
              setisModalVisiblePassword(false), setPassword();
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
            onClick={handleOkpassword}
            disabled={!password}
          >
            ยืนยัน
          </Button>
        </Row>
      </Modal>
    </>
  );
};

export default Stock_blood;

//////// print_sticker
const Print_Sticker = ({
  barcode,
  unit_no_dot,
  unit_no,
  component_type,
  component_type_long,
  blood_volume,
  date_collect,
  date_exp,
  gr,
  rh_long_name,
  rh,
  detail1,
}) => {
  // console.log(data);
  // console.log(detail1,detail2,detail3,detail4,detail5,detail6,detail7,detail8 );
  const [barcodeImage, setBarcodeImage] = useState();
  const [BarcodeComponent, setBarcodeComponent] = useState();
  const [BarcodeGr, setBarcodeGr] = useState();

  const onClickGenBarcode = (input) => {
    var canvas = document.createElement("canvas");
    JsBarcode(canvas, input, {
      format: "CODE128",
      fontSize: 12,
      displayValue: false,
    });
    const barcodeBase64 = canvas.toDataURL("image/png");
    setBarcodeImage(barcodeBase64);
  };
  const onClickGenBarcodeComponent = (input) => {
    var canvas = document.createElement("canvas");
    JsBarcode(canvas, input, {
      format: "CODE128",
      fontSize: 12,
      displayValue: false,
    });
    const barcodeBase64 = canvas.toDataURL("image/png");
    setBarcodeComponent(barcodeBase64);
  };
  const onClickGenBarcodeGr = (input) => {
    var canvas = document.createElement("canvas");
    JsBarcode(canvas, input, {
      format: "CODE128",
      fontSize: 12,
      displayValue: false,
    });
    const barcodeBase64 = canvas.toDataURL("image/png");
    setBarcodeGr(barcodeBase64);
  };

  useEffect(() => {
    if (unit_no) {
      onClickGenBarcode(unit_no);
      onClickGenBarcodeComponent(component_type);
      onClickGenBarcodeGr(gr + rh);
    }
  }, [unit_no]);

  return (
    <div
      className="print"
      style={{
        width: "378px",
        height: "	260px",
        border: "1px solid",
        margin: "3px",
      }}
    >
      <Row justify="end">
        <Col span={16}>
          <p style={{ marginTop: "1px" }}>
            <img src={barcodeImage} height={30} width={250} />
          </p>
          <p style={{ marginTop: "-17px" }}>
            <b style={{ fontSize: "14px" }}>
              &nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {unit_no_dot}
            </b>
          </p>
        </Col>
        <Col span={1}></Col>
      </Row>
      <hr style={{ marginTop: "-17px", border: "1px solid" }}></hr>
      <Row style={{ marginTop: "-8px" }}>
        <Col span={15}>
          <p style={{ fontSize: "14px" }}>
            <b>
              {" "}
              {component_type_long}&nbsp;({component_type})
            </b>
          </p>
        </Col>
        <Col span={9}>
          <img src={BarcodeComponent} height={30} width={120} />
          <p style={{ marginTop: "-7px" }}>
            <b style={{ fontSize: "14px" }}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {component_type}
            </b>
          </p>
        </Col>
      </Row>
      <hr style={{ marginTop: "-17px", border: "1px solid" }}></hr>
      <Row style={{ marginTop: "-8px" }}>
        <Col span={16}>
          <p style={{ marginTop: "-5px" }}>
            volume : <b style={{ fontSize: "16px" }}>{blood_volume}</b> ml.
          </p>
          <p style={{ marginTop: "-17px" }}>
            Collection : <b style={{ fontSize: "16px" }}>{date_collect}</b>
          </p>
          <p style={{ marginTop: "-17px" }}>
            Use before : <b style={{ fontSize: "16px" }}>{date_exp}</b>
          </p>
          <p style={{ marginTop: "-17px" }}>Confirmatory phenotyping :</p>
        </Col>
        <Col span={8}>
          <img src={BarcodeGr} height={30} width={120} />
          <p style={{ marginTop: "-17px" }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <b style={{ fontSize: "45px" }}>{gr}</b>
          </p>
          <p style={{ marginTop: "-30px", marginLeft: "-15px" }}>
            <b style={{ fontSize: "18px" }}>Rh :&nbsp;{rh_long_name}</b>
          </p>
        </Col>
      </Row>
      <Row style={{ marginTop: "-20px" }}>
        <Col span={20}>
          <p style={{ fontSize: "14px" }}>
            Negative for : &nbsp;
            <b>
              Syphilis, HBsAg, Anti-HCV, HIV, Ag/Ab, HIV RNA, HCV RNA HBV DNA
            </b>
          </p>
        </Col>
      </Row>
      <hr style={{ marginTop: "-13px", border: "1px solid" }}></hr>
      <Row
        justify="center"
        style={{ backgroundColor: "black", marginTop: "-8px" }}
      >
        <Col span={24}>
          <p style={{ fontSize: "12px" }}>
            <center>
              <b style={{ color: "white" }}>
                AFF-Bloodbank by AFFINITECH.CO,.TH
              </b>
            </center>
          </p>
        </Col>
      </Row>
    </div>
  );
};
