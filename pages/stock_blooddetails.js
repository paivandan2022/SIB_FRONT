import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  PrinterFilled,
} from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Descriptions,
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
} from "antd";
import JsBarcode from "jsbarcode";
import moment from "moment";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { MdManageSearch, MdRefresh } from "react-icons/md";
import { VscSaveAs } from "react-icons/vsc";

import ReactToPrint from "react-to-print";
import Layout from "../components/layout";
import api from "../lib/api";

const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const Stock_blooddetails = () => {
  const [bloodDetail, setBloodDetail] = useState();
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
  const [loadingModalEdit, setLoadingModalEdit] = useState(false);
  const [loadingModalView, setLoadingModalView] = useState(false);
  const [requireGroup, setRequireGroup] = useState(false);
  const [requireRh, setRequireRh] = useState(false);
  const [disabledGr, setDisabledGr] = useState(false);
  const [disabledRh, setDisabledRh] = useState(false);

  const [isSearch, setIsSearch] = useState(false);
  //**************--stock_blooddetails--*******************//
  const [countAllStatus, setCountAllStatus] = useState();
  const [countAllStatus2, setCountAllStatus2] = useState();

  const [compo_status, setCompo_status] = useState();
  const [statusSelect, setStatusSelect] = useState();
  const [statusSelect1, setStatusSelect1] = useState();

  const [stock_status_detail, setStock_status_detail] = useState();

  const [password, setPassword] = useState();

  const [frmEdit] = Form.useForm();
  const [frmEditRadio] = Form.useForm();
  const [frmSearch] = Form.useForm();
  const printComponent = useRef(null);

  //Modal
  const [isModalVisibleView, setisModalVisibleView] = useState(false);
  const [isModalVisibleEdit, setisModalVisibleEdit] = useState(false);
  const [isModalVisibleComment, setIsModalVisibleComment] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // Show modal

  const showModalView = async (value) => {
    console.log("value===", value);

    setLoadingModalView(true);
    setisModalVisibleView(true);

    // call api

    const result = await api.get(`/GetUnitDetail`, {
      params: {
        blood_id: value.id,
      },
    });
    // set state
    const bloodDetailView = result.data[0];
    console.log("bloodDetailView===", bloodDetailView);
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

  const handleOkEdit = () => {
    setisModalVisibleEdit(false);
  };
  const handleCancelEdit = () => {
    setisModalVisibleEdit(false);
    frmEdit.resetFields();
  };

  const showModalComment = () => {
    setIsModalVisibleComment(true);
  };

  const handleOkComment = () => {
    setIsModalVisibleComment(false);
  };

  const handleCancelComment = () => {
    setIsModalVisibleComment(false);
  };
  //--------------------------------------//
  const showModal = () => {
    setIsModalVisible(true);
    setTimeout(() => {
      document.getElementById("pass").focus();
    }, 500);
  };

  const handleOk = async () => {
    // ส่ง user_name and password
    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });
    console.log("resultLogin", resultLogin.data);

    try {
      if (resultLogin.data.id_user) {
        const formData = frmEdit.getFieldsValue();
        console.log("--------->", formData);
        const result1 = await api.put(`/Update_Stock`, {
          ...formData,
          date_received: moment(formData.date_received).format("YYYY-MM-DD"),
          date_collect: moment(formData.date_collect).format("YYYY-MM-DD"),
          date_exp: moment(formData.date_exp).format("YYYY-MM-DD"),
          exp_time: moment(formData.exp_time).format("HH:mm:ss"),
        });

        setisModalVisibleEdit(false);
        showModalView(formData.blood_id);
        setIsModalVisible(false);
        setPassword();
      } else {
        Modal.error({
          title: "Password invalid",
          content: "กรุณากรอกรหัสผ่านให้ถูกต้อง!!",
        });
      }
      setIsModalVisible(false);
    } catch (error) {
      Modal.error({
        title: "Error",
        content: "กรุณากรอกข้อมูลให้ครบถ้วน!!",
      });
    }
  };
  //--------------------------------------------------//
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

  //โหลดข้อมูลปุ่มหมู่เลือด
  useEffect(async () => {
    await CountStatus();
  }, []);

  //////////////////////////////////
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
      showModalComment();
    } else {
      // call api
    }
  };
  //**************--stock_blooddetails--*******************//
  const Reset_all = () => {
    setCompo_status();
    setStock_status_detail();
  };
  const ClearSearch = () => {
    frmSearch.resetFields();
    setCompo_status();
    setStock_status_detail();
    CountStatus();
    setIsSearch(false);
  };
  const CountStatus = async () => {
    setCompo_status();
    setStock_status_detail();
    const result = await api.get(`/Stock_Detail_status`);
    setCountAllStatus(result.data[0]);

    const result2 = await api.get(`/Stock_count_status`);
    setCountAllStatus2(result2.data[0]);
  };
  const GetCompo = async (value) => {
    setPage(1);
    console.log("valueiffff :", value);

    setStock_status_detail();
    setStatusSelect(value.status_id);
    setStatusSelect1(0);

    if (value.status_id === "7" || value.status_id === "10") {
      console.log("ifffffffffffffffffffffffffff :", value.status_id);
      const result = await api.get(`/Stock_Detail_Component2`, {
        params: {
          status_id: value.status_id,
        },
      });
      const Getcompo_status = result.data[0];
      console.log("data :", result.data[0]);

      setCompo_status(Getcompo_status);
      setTypeNum(
        value.status_id === "7"
          ? countAllStatus?.[0]?.A7
          : value.status_id === "10"
          ? countAllStatus?.[0]?.A10
          : ""
      );
      const result3 = await api.get(`/Stock_Detail_all_dorn`, {
        params: {
          status_id: value.status_id,
          page: 0,
        },
      });
      setStock_status_detail(result3.data[0]);
      console.log("bbbbbbbbbbb :", result3.data[0]);
    } else {
      const result = await api.get(`/Stock_Detail_Component`, {
        params: {
          status_id: value.status_id,
        },
      });
      const Getcompo_status = result.data[0];
      console.log("data :", result.data[0]);

      setCompo_status(Getcompo_status);
      setTypeNum(
        value.status_id === "4"
          ? countAllStatus?.[0]?.A4
          : value.status_id === "1"
          ? countAllStatus?.[0]?.A1
          : value.status_id === "3"
          ? countAllStatus?.[0]?.A3
          : value.status_id === "11"
          ? countAllStatus?.[0]?.A11
          : value.status_id === "14"
          ? countAllStatus?.[0]?.A14
          : value.status_id === "6"
          ? countAllStatus?.[0]?.A6
          : value.status_id === "9"
          ? countAllStatus?.[0]?.A9
          : ""
      );
      const result3 = await api.get(`/Stock_Detail_all`, {
        params: {
          status_id: value.status_id,
          page: 0,
        },
      });
      setStock_status_detail(result3.data[0]);
      console.log("bbbbbbbbbbb :", result3.data[0]);
    }
  };
  //-------------------------------------------//
  const onClickRow = async (record) => {
    setStock_status_detail();
    setTypeID(record.type_id);
    setTypeNum(record.type_num);

    setStatusSelect1(1);

    setPage(1);
    console.log("record-----12", record);
    let params = {};

    const formValue = frmSearch.getFieldsValue();
    if (formValue?.unit_no || formValue.date_type || formValue?.antibody) {
      params = {
        ...formValue,
        date_start: moment(formValue.date_Search[0]).format("YYYY-MM-DD"),
        date_end: moment(formValue.date_Search[1]).format("YYYY-MM-DD"),
        status_id: statusSelect,
      };
      delete params.date_Search;
    }
    try {
      let result;
      if (statusSelect) {
        if (statusSelect === "7" || statusSelect === "10") {
          result = await api.get(`/Stock_Detail_unit_dorn`, {
            params: {
              type_id: record.type_id,
              status_id: statusSelect,
              page: 0,
              ...params,
            },
          });
          console.log("777777", result.data);
        } else {
          result = await api.get(`/Stock_Detail_unit`, {
            params: {
              type_id: record.type_id,
              status_id: statusSelect,
              page: 0,
              ...params,
            },
          });
        }
      } else {
        result = await api.get(`/Stock_Detail_unit`, {
          params: {
            type_id: record.type_id,
            page: 0,
            ...params,
          },
        });
      }
      const Stock_status_all = result.data[0];
      setStock_status_detail(Stock_status_all);
      console.log("Stock_status_all----->", Stock_status_all);
    } catch (error) {
      Modal.error({ title: "Error", error: error.message });
    }
  };
  //-------------------------------------------//
  const onChangePagination = async (page) => {
    setPage(page);
    console.log("ppppp", page);
    let params = {};

    const formValue = frmSearch.getFieldsValue();
    if (formValue?.unit_no || formValue.date_type || formValue?.antibody) {
      params = {
        ...formValue,
        date_start: moment(formValue.date_Search[0]).format("YYYY-MM-DD"),
        date_end: moment(formValue.date_Search[1]).format("YYYY-MM-DD"),
        status_id: statusSelect,
      };
      delete params.date_Search;
    }
    try {
      let result;
      if (statusSelect1 == 1) {
        console.log("jjjjjjj");
        if (statusSelect) {
          result = await api.get("/Stock_Detail_unit", {
            params: {
              type_id: typeID,
              status_id: statusSelect,
              page: (page - 1) * 10,
              ...params,
            },
          });
        } else {
          result = await api.get("/Stock_Detail_unit", {
            params: {
              type_id: typeID,
              page: (page - 1) * 10,
              ...params,
            },
          });
        }
        const Stock_status_all = result.data[0];
        setStock_status_detail(Stock_status_all);
      } else if (statusSelect1 == 0) {
        console.log("kkkkkkk");

        result = await api.get("/Stock_Detail_all", {
          params: {
            status_id: statusSelect,
            page: (page - 1) * 10,
          },
        });
      }

      console.log("555555", result.data);
      const Stock_status_all = result.data[0];
      setStock_status_detail(Stock_status_all);
    } catch (error) {
      Modal.error({ title: "Error" });
    }
  };
  //-------------------------------------------//
  const onFinishSearch = async (value) => {
    try {
      const params = {
        ...value,
        date_start: moment(value.date_Search[0]).format("YYYY-MM-DD"),
        date_end: moment(value.date_Search[1]).format("YYYY-MM-DD"),
      };
      delete params.date_Search;

      const result1 = await api.get(`/Stock_Detail_status`, { params });
      setCountAllStatus(result1.data[0]);

      const result2 = await api.get(`/Stock_count_status`, { params });
      setCountAllStatus2(result2.data[0]);

      if (!(value?.date_type || value?.unit_no || value?.antibody)) {
        const result2 = await api.get(`/Stock_Detail_Component`, {
          params,
        });
        setCompo_status(result2.data[0]);

        const result3 = await api.get(`/Stock_Detail_unit`, {
          params,
        });
        setStock_status_detail(result3.data[0]);
      } else {
        setCompo_status(null);
        setStock_status_detail(null);
      }

      setIsSearch(true);
    } catch (error) {
      Modal.error({ title: "Error" });
    }
  };
  const onClickSearch = async (value) => {
    console.log("---- กดปุ่ม 2 --------->", isSearch);
    setStatusSelect(value.status_id);
    try {
      const params = {
        ...value,
        date_start: moment(value.date_Search[0]).format("YYYY-MM-DD"),
        date_end: moment(value.date_Search[1]).format("YYYY-MM-DD"),
      };
      console.log("---- กดปุ่ม 2 params--------->", params);

      delete params.date_Search;

      if (value.status_id == "7") {
        console.log("---- ifffffffffff--------->", params);
      } else {
        console.log("---- กดปุ่ม 2 value--------->", typeof value.status_id);

        const result2 = await api.get(`/Stock_Detail_Component`, {
          params,
          // params: { status_id: 1 },
        });
        console.log("---- กดปุ่ม 2 result2.data[0]--------->", result2.data[0]);

        setCompo_status(result2.data[0]);
        const result3 = await api.get(`/Stock_Detail_unit`, {
          params: {
            // type_id: record.type_id,
            // status_id: statusSelect,
            page: 0,
            ...params,
          },
        });
        setStock_status_detail(result3.data[0]);
        console.log("---- กดปุ่ม 2 result3.data[0]--------->", result3.data[0]);
      }
    } catch (error) {
      Modal.error({ title: "Error", error: error.message });
    }
  };
  //**************--stock_blooddetails--*******************//

  const columnComponent = [
    {
      title: "",
      dataIndex: "",
      key: "view",
      align: "center",
      render: (text, record) => (
        <MdManageSearch
          style={{ fontSize: "18px", cursor: "pointer" }}
          onClick={() => showModalView(record)}
        />
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
      title: "วันที่เจาะ",
      dataIndex: "date_collect",
      key: "date_collect",
      align: "center",
    },
    {
      title: "วันหมดอายุ",
      dataIndex: "date_exp",
      key: "date_exp",
      align: "center",
    },
    {
      title: "จำนวนวันหมดอายุ",
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
    },
    {
      title: "HN",
      dataIndex: "hn",
      key: "hn",
      align: "center",
    },
    {
      title: "ชื่อ - นามสกุล",
      dataIndex: "patient",
      key: "patient",
      align: "center",
    },
    {
      title: "ผู้ทำ",
      dataIndex: "xm_staft",
      key: "xm_staft",
      align: "center",
    },
    {
      title: "วันที่",
      dataIndex: "date_xm",
      key: "date_xm",
      align: "center",
    },
    {
      title: "สถานะ",
      dataIndex: "xm_status_name",
      key: "xm_status_name",
      align: "center",
    },
  ];
  return (
    <>
      <Layout keyTab="stock_blooddetails">
        <div>
          <Head>
            <title>SIBSOFT : รายละเอียดเลือด</title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
        </div>

        <Row justify="center">
          <Col style={{ marginTop: "15px" }}>
            <Form
              form={frmSearch}
              layout="inline"
              onFinish={onFinishSearch}
              initialValues={{
                date_Search: [moment(), moment()],
              }}
            >
              <Form.Item name="date_type">
                <Radio.Group>
                  <Radio value="date_collect">วันที่เจาะ</Radio>
                  <Radio value="date_receive">วันที่รับ</Radio>
                  <Radio value="date_expired">วันหมดอายุ</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item name="date_Search">
                <RangePicker
                  size="small"
                  placeholder={["วันเริ่ม", "วันสุดท้าย"]}
                  format="DD-MM-YYYY"
                />
              </Form.Item>
              <Form.Item name="unit_no">
                <Input
                  placeholder="เลขที่ถุงเลือด"
                  size="small"
                  style={{ width: 150 }}
                />
              </Form.Item>
              <Form.Item name="antibody">
                <Input
                  size="small"
                  placeholder="Antibody / Antigen"
                  style={{ width: 150 }}
                  disabled
                />
              </Form.Item>
              <Form.Item>
                <Button
                  style={{
                    fontSize: "12px",
                    height: "28px",
                    marginLeft: "5px",
                    backgroundColor: "#17a2b8",
                    color: "white",
                  }}
                  icon={
                    <MdManageSearch
                      style={{
                        fontSize: "16px",
                        marginRight: "3px",
                        marginBottom: "-3px",
                      }}
                    />
                  }
                  htmlType="submit"
                >
                  ค้นหา
                </Button>
              </Form.Item>
              <Form.Item>
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
                  onClick={ClearSearch}
                >
                  เริ่มใหม่
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row justify="center">
          <Col span={22}>
            <hr />
          </Col>
        </Row>

        <Row>
          <Col
            span={4}
            style={{
              width: "10%",
              padding: "10px",
              marginLeft: 15,
              marginTop: 20,
              borderRadius: "7px",
              border: "1px solid",
            }}
          >
            {/* <Card
              className="card-stock_blooddetails-all"
              style={{ width: "240px" }}
            > */}
            <Row justify="center" style={{ marginTop: -20 }}>
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
                สถานะ
              </p>
            </Row>
            <Row justify="center" style={{ marginLeft: -1, marginTop: -10 }}>
              <Form>
                <Button
                  className={`btn-stock_blooddetails ${
                    countAllStatus?.[0]?.A1 && isSearch ? "active" : ""
                  }`}
                  onClick={
                    isSearch === true
                      ? () =>
                          onClickSearch({
                            status_id: "1",
                            date_type: frmSearch.getFieldValue(
                              "date_type" || ""
                            ),
                            date_Search: frmSearch.getFieldValue("date_Search"),
                            unit_no: frmSearch.getFieldValue("unit_no" || ""),
                            antibody: frmSearch.getFieldValue("antibody" || ""),
                          })
                      : () =>
                          GetCompo({
                            status_id: "1",
                          })
                  }
                >
                  ปกติ ({countAllStatus?.[0]?.A1 || 0})
                </Button>
                <Button
                  style={{ marginTop: "4px" }}
                  className={`btn-stock_blooddetails ${
                    countAllStatus?.[0]?.A3 && isSearch ? "active" : ""
                  }`}
                  size="large"
                  onClick={
                    isSearch === true
                      ? () =>
                          onClickSearch({
                            status_id: "3",
                            date_type: frmSearch.getFieldValue(
                              "date_type" || ""
                            ),
                            date_Search: frmSearch.getFieldValue("date_Search"),
                            unit_no: frmSearch.getFieldValue("unit_no" || ""),
                            antibody: frmSearch.getFieldValue("antibody" || ""),
                          })
                      : () =>
                          GetCompo({
                            status_id: "3",
                          })
                  }
                >
                  Crossmatch ({countAllStatus?.[0]?.A3 || 0})
                </Button>

                <Button
                  style={{ marginTop: "4px" }}
                  className={`btn-stock_blooddetails ${
                    countAllStatus?.[0]?.A4 && isSearch ? "active" : ""
                  }`}
                  size="large"
                  onClick={
                    isSearch === true
                      ? () =>
                          onClickSearch({
                            status_id: "4",
                            date_type: frmSearch.getFieldValue(
                              "date_type" || ""
                            ),
                            date_Search: frmSearch.getFieldValue("date_Search"),
                            unit_no: frmSearch.getFieldValue("unit_no" || ""),
                            antibody: frmSearch.getFieldValue("antibody" || ""),
                          })
                      : () =>
                          GetCompo({
                            status_id: "4",
                          })
                  }
                >
                  จ่าย ({countAllStatus?.[0]?.A4 || 0})
                </Button>

                <Button
                  style={{ marginTop: "4px" }}
                  className={`btn-stock_blooddetails ${
                    countAllStatus?.[0]?.A11 && isSearch ? "active" : ""
                  }`}
                  size="large"
                  onClick={
                    isSearch === true
                      ? () =>
                          onClickSearch({
                            status_id: "11",
                            date_type: frmSearch.getFieldValue(
                              "date_type" || ""
                            ),
                            date_Search: frmSearch.getFieldValue("date_Search"),
                            unit_no: frmSearch.getFieldValue("unit_no" || ""),
                            antibody: frmSearch.getFieldValue("antibody" || ""),
                          })
                      : () =>
                          GetCompo({
                            status_id: "11",
                          })
                  }
                >
                  ฝากเลือด ({countAllStatus?.[0]?.A11 || 0})
                </Button>

                <Button
                  style={{ marginTop: "4px" }}
                  className={`btn-stock_blooddetails ${
                    countAllStatus?.[0]?.A14 && isSearch ? "active" : ""
                  }`}
                  size="large"
                  onClick={
                    isSearch === true
                      ? () =>
                          onClickSearch({
                            status_id: "14",
                            date_type: frmSearch.getFieldValue(
                              "date_type" || ""
                            ),
                            date_Search: frmSearch.getFieldValue("date_Search"),
                            unit_no: frmSearch.getFieldValue("unit_no" || ""),
                            antibody: frmSearch.getFieldValue("antibody" || ""),
                          })
                      : () =>
                          GetCompo({
                            status_id: "14",
                          })
                  }
                >
                  จำหน่าย ({countAllStatus?.[0]?.A14 || 0})
                </Button>

                <Button
                  style={{ marginTop: "4px" }}
                  className={`btn-stock_blooddetails ${
                    countAllStatus?.[0]?.A6 && isSearch ? "active" : ""
                  }`}
                  size="large"
                  onClick={
                    isSearch === true
                      ? () =>
                          onClickSearch({
                            status_id: "6",
                            date_type: frmSearch.getFieldValue(
                              "date_type" || ""
                            ),
                            date_Search: frmSearch.getFieldValue("date_Search"),
                            unit_no: frmSearch.getFieldValue("unit_no" || ""),
                            antibody: frmSearch.getFieldValue("antibody" || ""),
                          })
                      : () =>
                          GetCompo({
                            status_id: "6",
                          })
                  }
                >
                  หมดอายุ ({countAllStatus?.[0]?.A6 || 0})
                </Button>

                <Button
                  style={{ marginTop: "4px" }}
                  className={`btn-stock_blooddetails ${
                    countAllStatus?.[0]?.A9 && isSearch ? "active" : ""
                  }`}
                  size="large"
                  onClick={
                    isSearch === true
                      ? () =>
                          onClickSearch({
                            status_id: "9",
                            date_type: frmSearch.getFieldValue(
                              "date_type" || ""
                            ),
                            date_Search: frmSearch.getFieldValue("date_Search"),
                            unit_no: frmSearch.getFieldValue("unit_no" || ""),
                            antibody: frmSearch.getFieldValue("antibody" || ""),
                          })
                      : () =>
                          GetCompo({
                            status_id: "9",
                          })
                  }
                >
                  แบ่งถุง ({countAllStatus?.[0]?.A9 || 0})
                </Button>
                <br />
                <br />
                <Button
                  disabled
                  onClick={() => ""}
                  className="btn-stock_blooddetails"
                  size="large"
                >
                  ยังไม่ผ่านกาตรวจ (0000)
                </Button>
                <Button
                  style={{ marginTop: "4px" }}
                  className="btn-stock_blooddetails"
                  size="large"
                  onClick={
                    isSearch === true
                      ? () =>
                          onClickSearch({
                            status_id: "7",
                            date_type: frmSearch.getFieldValue(
                              "date_type" || ""
                            ),
                            date_Search: frmSearch.getFieldValue("date_Search"),
                            unit_no: frmSearch.getFieldValue("unit_no" || ""),
                            antibody: frmSearch.getFieldValue("antibody" || ""),
                          })
                      : () =>
                          GetCompo({
                            status_id: "7",
                          })
                  }
                >
                  ติดเชื้อ ({countAllStatus2?.[0]?.A7 || 0})
                </Button>
                <Button
                  style={{ marginTop: "4px" }}
                  onClick={
                    isSearch === true
                      ? () =>
                          onClickSearch({
                            status_id: "10",
                            date_type: frmSearch.getFieldValue(
                              "date_type" || ""
                            ),
                            date_Search: frmSearch.getFieldValue("date_Search"),
                            unit_no: frmSearch.getFieldValue("unit_no" || ""),
                            antibody: frmSearch.getFieldValue("antibody" || ""),
                          })
                      : () =>
                          GetCompo({
                            status_id: "10",
                          })
                  }
                  className="btn-stock_blooddetails"
                  size="large"
                >
                  รอปั่นแยกประเภท ({countAllStatus2?.[0]?.A10 || 0})
                </Button>
              </Form>
            </Row>
            {/* </Card> */}
          </Col>
          {compo_status && (
            <Col
              span={19}
              style={{
                height: "100%",
                padding: "10px",
                marginLeft: 15,
                marginTop: 20,
                borderRadius: "7px",
                border: "1px solid",
              }}
            >
              <Row justify="start" style={{ marginTop: -28 }}>
                {compo_status && (
                  <Button
                    onClick={Reset_all}
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
                  >
                    เริ่มใหม่
                  </Button>
                )}
              </Row>
              <br />
              {compo_status && (
                <Row style={{ width: "fit-content", marginTop: "-15px" }}>
                  <Descriptions
                    size="small"
                    bordered
                    column={compo_status?.length + 1}
                  >
                    <Descriptions.Item
                      size="small"
                      style={{ margin: "100px" }}
                      label={<h style={{ fontSize: "14px" }}>ชนิด</h>}
                    />
                    {compo_status?.map((item, index) => (
                      <Descriptions.Item
                        key={item.type_id}
                        //className={index % 2 === 0 ? "bg-gray" : ""}
                        span={1}
                      >
                        <div
                          className="descriptions-click"
                          onClick={() => onClickRow(item)}
                          style={{ height: 20, marginTop: "-4px" }}
                        >
                          <h style={{ fontSize: "14px" }}>{item.type_name}</h>
                        </div>
                      </Descriptions.Item>
                    ))}
                    <Descriptions.Item
                      label={<h style={{ fontSize: "14px" }}>จำนวน</h>}
                    />
                    {compo_status?.map((item, index) => (
                      <Descriptions.Item
                        key={item.type_id}
                        //className={index % 2 === 0 ? "bg-gray" : ""}
                        span={1}
                      >
                        <div
                          className="descriptions-click"
                          onClick={() => onClickRow(item)}
                          style={{ marginTop: "-4px" }}
                        >
                          {/* {console.log(
                          "item.type_num+++",
                          (item.type_num = 0 ? 0 : item.type_num)
                        )} */}
                          <h style={{ fontSize: "14px" }}>{item.type_num}</h>
                        </div>
                      </Descriptions.Item>
                    ))}
                  </Descriptions>
                </Row>
              )}
              <Row justify="center" style={{ marginTop: 10 }}>
                <Col span={24}>
                  {stock_status_detail && (
                    <Table
                      bordered
                      rowClassName={(record, index) => {
                        return index % 2 === 0 ? "bg-gray" : "";
                      }}
                      className="xm"
                      rowKey="id"
                      size="small"
                      columns={columnComponent}
                      dataSource={stock_status_detail}
                      pagination={{
                        current: page,
                        total: Number(typeNum || 0),
                        onChange: onChangePagination,
                        hideOnSinglePage: true,
                        showSizeChanger: false,
                      }}
                    />
                  )}
                </Col>
              </Row>
            </Col>
          )}
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
                <p style={{ fontSize: "12px" }}>
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
                <p
                  style={{
                    fontSize: "12px",
                    fontSize: "12px",
                    marginTop: "-15px",
                  }}
                >
                  วันรับ : {bloodDetail?.[0]?.date_received}
                </p>
                <p style={{ fontSize: "12px", marginTop: "-15px" }}>
                  วันเจาะ : {bloodDetail?.[0]?.date_collect}
                </p>
                <p style={{ fontSize: "12px", marginTop: "-15px" }}>
                  {" "}
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
              <Col span={12} style={{ border: "1px solid ", padding: "10px" }}>
                <Form.Item name="id" hidden={true}></Form.Item>
                <Form.Item name="chkProcess" label={<h4>เลือกการทำงาน</h4>}>
                  {/* <h4>เลือกการทำงาน</h4> */}
                  <Radio.Group>
                    <Space direction="vertical">
                      <Radio style={{ fontSize: "12px" }} value={1}>
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
                        marginBottom: "-10px",
                        marginTop: "3px",
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
                    type="primary"
                    danger
                    size="large"
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
                  className="xm"
                  bordered
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
                <TestPrintComponent
                  barcode={bloodDetail?.[0]?.unit_no}
                  data={bloodDetail}
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
        onOk={handleOkEdit}
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
            //onFinish={onFinishEdit}
          >
            <Row>
              <Col span={12}>
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
                        return Promise.reject(
                          new Error(`กรุณาตรวจสอบประเภทถุงเลือด`)
                        );
                      },
                    }),
                  ]}
                >
                  <Select onChange={onChangeTypeID}>
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
                  <Select>
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
                  <Select>
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
                      <Option value={item.rh_shot_name} key={item.rh_shot_name}>
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
                        return Promise.reject(
                          new Error("เลขที่ถุงเลือดซ้ำ !!!")
                        );
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
                <Form.Item
                  label="ผู้แก้ไข"
                  name="staff_name"
                  style={{ marginTop: "-20px" }}
                >
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
                icon={
                  <VscSaveAs
                    style={{
                      fontSize: "14px",
                      marginRight: "3px",
                      marginBottom: "-2px",
                    }}
                  />
                }
                style={{
                  fontSize: "12px",
                  height: "28px",
                  backgroundColor: "#3AB0FF",
                  color: "white",
                }}
                onClick={showModal}
              >
                บันทึกข้อมูล
              </Button>
            </Row>
          </Form>
        </Spin>
      </Modal>
      {/* /-----------------------/ */}
      <Modal
        visible={isModalVisibleComment}
        onOk={handleOkComment}
        onCancel={handleCancelComment}
        footer={false}
        width={450}
      >
        <Row style={{ marginTop: "-15px" }}>
          <h style={{ fontSize: "14px" }}>เหตุผลการยกเลิก</h>
        </Row>
        <Row justify="center" style={{ marginLeft: " 15px", marginTop: "5px" }}>
          <Col span={22}>
            <TextArea rows={4} />
          </Col>
        </Row>
        <Row justify="end" style={{ marginTop: "10px" }}>
          <Button onAuxClick={handleOkComment} type="primary">
            ยืนยัน
          </Button>
        </Row>
      </Modal>
      {/* /-----------------------/ */}
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => {
          setIsModalVisible(false), setPassword();
        }}
        okButtonProps={{
          disabled: !password,
        }}
        okText="ยืนยัน"
        cancelText="ยกเลิก"
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
              handleOk();
            }
          }}
        />
        <Row justify="end" style={{ marginTop: "10px" }}>
          <Button
            type="primary"
            danger
            onClick={() => {
              setIsModalVisible(false), setPassword();
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
            onClick={handleOk}
            disabled={!password}
          >
            ยืนยัน
          </Button>
        </Row>
      </Modal>
    </>
  );
};

export default Stock_blooddetails;
//////// print_sticker
const TestPrintComponent = ({ barcode, data }) => {
  console.log("data====>", data);
  const [barcodeImage, setBarcodeImage] = useState();

  const onClickGenBarcode = (input) => {
    var canvas = document.createElement("canvas");
    JsBarcode(canvas, input, { format: "CODE128", fontSize: 14 });
    const barcodeBase64 = canvas.toDataURL("image/png");
    setBarcodeImage(barcodeBase64);
  };

  useEffect(() => {
    if (barcode) {
      onClickGenBarcode(barcode);
    }
  }, [barcode]);

  return (
    <div className="print">
      <h1>Test Test {barcode}</h1>
      <img src={barcodeImage} />
    </div>
  );
};
