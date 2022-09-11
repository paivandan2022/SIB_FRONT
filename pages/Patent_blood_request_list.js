import { EditFilled, RetweetOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  PageHeader,
  Row,
  Select,
  Table,
  Tooltip,
} from "antd";
import th_TH from "antd/lib/date-picker/locale/th_TH";
import moment from "moment";
import "moment/locale/th";
import React, { useEffect, useState } from "react";
import { Layout, Patient_blood_edit_modal } from "../components";
import api from "../lib/api";
import { useRouter } from "next/router";

const popup = (value) => {
  const scW = screen.width / 2;
  const scH = screen.height / 2;
  const appW = 1366;
  const appH = 786;
  const url = "/Patent_blood_request_list?order_number=" ;  const title = "TEST";
  const callW = appW / 2;
  const callH = appH / 2;

  const str =
    "width=" +
    appW +
    ",height=" +
    appH +
    ",top=" +
    (scH - callH) +
    ",left=" +
    (scW - callW);
  window.open(url, title, str);
};

const popup_eddit = (value) => {
  console.log("Valueeeeeeee", value);
  const scW = screen.width / 2;
  const scH = screen.height / 2;
  const appW = 1366;
  const appH = 786;
  const url = "/Patient_blood_request_edit?order_number=" + value;
  const title = "TEST";
  const callW = appW / 2;
  const callH = appH / 2;

  const str =
    "width=" +
    appW +
    ",height=" +
    appH +
    ",top=" +
    (scH - callH) +
    ",left=" +
    (scW - callW);
  window.open(url, title, str);
};

const Patent_blood_request_list = ({ id }) => {
  const router = useRouter();
  const { TextArea } = Input;
  const { Column, ColumnGroup } = Table;
  const { Option } = Select;
  const [placement, SetPlacement] = React.useState("bottomLeft");

  const [requireRequest_date, setrequireRequest_date] = useState(false);
  const [disabledRequest_date, setDisabledRequest_date] = useState(false);
  function onChangeCheckbox(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  const [user, setUser] = useState([]); // use in table
  const [frmSearch] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState(""); // value for search

  const showModalDataUeser = () => {
    setIsModalVisible(true);
    frmSearch.resetFields();
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChangeHN = async (e) => {
    console.log(e.target.value);

    if (e.target.value != " ") {
    } else {
      setUser();
      frmSearch.resetFields();
      setIsModalVisible(true);
    }
  };

  const onChangeSearch = async (e) => {
    const value = e.target.value;
    setValue(value);
    // console.log("eeeee", value);

    const params = {
      keyword: value,
    };

    const result = await api.get("/hn_user_search_modal", { params });
    setUser(result.data);
    // console.log(result.data);
  };
  // -------------------------------------------------------------------------
  //Search data form modal
  const columnDataUser = [
    {
      title: "HN",
      dataIndex: "hn",
      key: "hn",
      align: "center",
    },
    {
      title: "คำนำหน้า",
      dataIndex: "pname",
      key: "pname",
      align: "center",
    },
    {
      title: "ชื่อ",
      dataIndex: "fname",
      key: "fname",
    },
    {
      title: "นามสกุล",
      dataIndex: "lname",
      key: "lname",
    },
    {
      title: "วันเกิด",
      dataIndex: "bd_eng",
      key: "bd_eng",
      align: "center",
    },
    {
      title: "อายุ",
      dataIndex: "age",
      key: "age",
      align: "center",
    },
    {
      title: "เพศ",
      dataIndex: "sex",
      key: "sex",
      align: "center",
      render: (text, record) => (record.sex === 1 ? "ชาย" : "หญิง"),
    },
    {
      title: "หมู่เลือด",
      dataIndex: "bloodgrp",
      key: "bloodgrp",
    },
    {
      title: "RH",
      dataIndex: "bloodrh",
      key: "bloodrh",
    },
  ];
  const [strAge, setStrAge] = useState(); //fecth อายุ

  const doubbelRow = async (record) => {
    const params = {
      hn: record.hn,
    };
    frmImsearchdetil_blood.setFieldsValue({
      HN_search: record.hn,
    });

    setIsModalVisible(false);
  };

  function onChange(value) {
    // console.log(`selected ${value}`);
  }

  function onSearch(val) {
    // console.log("search:", val);
  }
  //----------หมู่เลือด---------
  const [requireGroup, setRequireGroup] = useState(false);
  const [disabledGr, setDisabledGr] = useState(false);
  const [blood_name, setBloodName] = useState();
  const LoadBloodName = async () => {
    const result = await api.get("/BloodGR_pc");
    setBloodName(result.data[0]);
  };
  // --------ENDหมู่เลือด-------

  //----------จุดที่ขอเลือด---------
  const [DEP_show, setDEP_show] = useState();
  const LoadDEP = async () => {
    const result = await api.get("/BB_kskdepartment");
    setDEP_show(result.data[0]);
    // console.log(result.data[0]);
  };
  // --------ENDจุดที่ขอเลือด-------
  //----------ชื่อสถานพยาบาล---------
  const [hos_station, sethos_station] = useState();
  const LoadHos = async () => {
    const result = await api.get("/Hospitals");
    sethos_station(result.data[0]);
    // console.log("โรง พยบ.", result.data[0]);
  };
  // --------ENDชื่อสถานพยาบาล-------
  //----------ชื่อสถาความต้องการ---------
  const [Bloodneed, setBloodneed] = useState();
  const LoadBloodneed = async () => {
    const result = await api.get("/Bloodneed_API");
    setBloodneed(result.data[0]);
    // console.log("ความต้องการ.", result.data[0]);
  };
  // --------ENDชื่อสถาความต้องการ-------
  //----------สถานะขอเลือด---------
  const [ST_RE, setST_RE] = useState();
  const LoadST_RE = async () => {
    const result = await api.get("/ST_RE_API");
    setST_RE(result.data[0]);
    // console.log("สถานะขอเลือด.", result.data[0]);
  };
  //-----------สถานะขอเลือด------------------
  //----------ward---------
  const [WARD, setWARD] = useState();
  const LoadWARD = async () => {
    const result = await api.get("/WARD_API");
    setWARD(result.data[0]);
    console.log("ward.", result.data[0]);
  };
  //-----------ward------------------

  useEffect(async () => {
    await LoadBloodName();
    // await Loadpatient();
    await LoadDEP();
    await LoadHos();
    await LoadBloodneed();
    await LoadST_RE();
    await LoadWARD();
  }, []);

  //----------หมู่ดึงข้อมูล patient---------
  const [Showpatient, setShowpatient] = useState();
  // const Loadpatient = async () => {
  //   const result = await api.get("/ShowINdexBlooddetil");
  //   setShowpatient(result.data[0]);
  //   // console.log("Loadpatient", result.data[0]);
  //   // console.log("Loadpatient", result.data[0]);
  // };

  // --------ENDหมู่ดึงข้อมูล patient-------
  const columns = [
    {
      title: "ลำดับ",
      align: "center",
      width: "1.7%",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "เลขที่ใบขอ",
      dataIndex: "order_number",
      key: "order_number",
      width: "3%",
      align: "center",
    },

    {
      title: "แก้ไข",
      // dataIndex: "",
      key: "",
      width: "2%",
      align: "center",
      render: (record) => {
        return (
          <>
            <Tooltip title="แก้ไขข้อมูล">
              <Button
              id="btnEdit"
                // type="link"
                icon={<EditFilled />}
                style={{ fontSize: "20px", color: "##FF4500" }}
                onClick={() => showModalEdit(record.order_number)}
              ></Button>
            </Tooltip>
          </>
        );
      },
    },

    {
      title: "HIS no.",
      dataIndex: "his_ln",
      key: "his_ln",
      width: "3.4%",
      align: "center",
    },

    {
      title: "HN",
      dataIndex: "hn",
      key: "hn",
      width: "3.5%",
      align: "center",
    },
    {
      title: "VN/AN",
      dataIndex: "VN/AN",
      key: "VN/AN",
      width: "4.2%",
      align: "center",
    },
    {
      title: "ชื่อ-สกุล",
      dataIndex: "patientname",
      key: "patientname",
      width: "7%",
    },
    {
      title: "หมู่เลือด",
      dataIndex: "ABO",
      key: "ABO",
      width: "2.4%",
      align: "center",
    },
    {
      title: "ชื่อสถานพยาบาลที่ขอ",
      dataIndex: "hos_long_name_th",
      key: "hos_long_name_th",
      width: "6.6%",
    },
    {
      title: "วันที่ขอ",
      dataIndex: "req_date",
      key: "req_date",
      width: "3.3%",
    },

    {
      title: "เวลาที่ขอ",
      dataIndex: "req_time",
      key: "req_time",
      width: "2.5%",
    },
    {
      title: "วันที่ใช้",
      dataIndex: "req_usedate",
      key: "req_usedate",
      width: "3.3%",
    },

    {
      title: "เวลาที่ใช้",
      dataIndex: "req_usetime",
      key: "req_usetime",
      width: "2.5%",
    },
    {
      title: "สถานะการขอ",
      dataIndex: "rq_stutus_name",
      key: "rq_stutus_name",
      width: "5%",
    },
    {
      title: "เหตุผลการ Reject",
      dataIndex: "cancel_detail",
      key: "cancel_detail",
      width: "5%",
    },
    {
      title: "ความต้องการ",
      dataIndex: "priority_name",
      key: "priority_name",
      width: "8%",
    },
    {
      title: "จุดที่ขอ",
      dataIndex: "dep_c",
      key: "dep_c",
      width: "6%",
    },
    {
      title: "ward",
      dataIndex: "wd_name",
      key: "wd_name",
      width: "6%",
    },

    {
      title: "ประเภทผู้ป่วย",
      dataIndex: "patient_type",
      key: "patient_type",
      width: "5%",
      align: "center",
    },
    {
      title: "ใช้ Tube เดิม",
      dataIndex: "request_old_tube",
      key: "request_old_tube",
      width: "5%",
    },
  ];
  const [loadingTable, setLoadingTable] = useState(false);

  const [testParams, setTestParams] = useState();

  const [frmImsearchdetil_blood] = Form.useForm();
  const onFinishSearch = async (value) => {
    const frmData = frmImsearchdetil_blood.getFieldsValue();
   
    // console.log("value------>", value);

    if (frmData.HN_search==""&&frmData.blood_request_number_search=="") {
 
      
    } else {
      try {
   
        const params = {
          ...value,
          Request_date_blood_search: moment(
            frmData.Request_date_blood_search
          ).format("YYYY-MM-DD"),
          Request_date_blood_to_search: moment(
            frmData.Request_date_blood_to_search
          ).format("YYYY-MM-DD"),
  
          date_of_use_search: `${
            frmData.date_of_use_search != ""
              ? moment(frmData.date_of_use_search).format("YYYY-MM-DD")
              : ""
          }`,
          date_of_use_to_search: `${
            frmData.date_of_use_to_search != ""
              ? moment(frmData.date_of_use_to_search).format("YYYY-MM-DD")
              : ""
          }`,
          // date_of_use_to_search: moment(frmData.date_of_use_to_search).format("YYYY-MM-DD"),
        };
  
        setTestParams(params);
  
        console.log("params", params);
  
        await User_list(params);
        
      } catch (error) {
        // Modal.error({ title: "Error" });
      }
    }
   
  };
  //-----------------------------------//
  const User_list = async (params) => {
    // console.log("params=>>>", params);
    if (params) {
      setLoadingTable(true);
      const result = await api.get("/Search_bloodDetil", { params });
      console.log("kk", result.data);
      setShowpatient(result.data);
      setLoadingTable(false);
    }
  };

  //------------------//
  const Refresh = async () => {
    frmImsearchdetil_blood.resetFields();

    await onFinishSearch(frmImsearchdetil_blood.resetFields());
  setShowpatient();
  };
 

  const [isModalEdit, setIsModalEdit] = useState(false);

  // console.log("12",isModalEdit);
 const [orderNum, setOrderNum] = useState();
  const showModalEdit = (value) => {
    setOrderNum(value);
    // console.log("=>>>>", orderNum);
    setIsModalEdit(true);
    losefocus()
  };

  const losefocus = () => {
    document.getElementById("btnEdit").blur();
    document.getElementById("btn_search").focus();
  
  
  };


  const handleOkEdit = () => {
    setIsModalEdit(false);
  
  };

  const handleCancelEdit = () => {
    setIsModalEdit(false);
 
  };

  return (
 
      <div>
        {/* <Col>
          <PageHeader
            className="site-page-header"
            // onBack={() => null}
            title="รายงานการขอเลือด"
          />
        </Col> */}

        <Row justify="center" style={{ marginTop: "-13px" }}>
          <Col span={24}>
            <Card
              bordered={false}
              style={{
                borderRadius: "10px",
                border: "1px solid",
                borderColor: "#C0C0C0",
                // paddingTop: "5px",
                backgroundColor: "#ecf5f8",
                boxShadow: "5px 5px 5px grey",
                // paddingBottom: "25px",
                
              }}
            >
              <Form
                form={frmImsearchdetil_blood}
                // labelCol={{ span: 8 }}
                // layout="horizontal"
                // onFinish={onFinishInsert}
                onFinish={onFinishSearch}
                initialValues={{
                  Request_date_blood_search: moment(),
                  // Request_date_blood_search: "",
                  Request_date_blood_to_search: moment(),
                  HN_search: "",
                  blood_request_number_search: "",
                  blood_request_point_search: "",
                  station_search: "",
                  date_of_use_search: "",
                  date_of_use_to_search: "",
                  // date_of_use_to_search: moment(),

                  blood_need_search: "",
                  blood_group_re_search: "",
                  blood_status_search: "",
                  CheckBox_search: "",
                  WARD_search: "",

                  // exp_time: moment("00:00:00", "HH:mm:ss"),
                }}
              >
                <Row justify="start" style={{ marginTop: "-10px" }}>
                  <Form.Item
                    label="วันที่ขอ"
                    name="Request_date_blood_search"
                    // style={{
                    //   marginTop: "-20px",
                    //   marginLeft: "-12px",
                    // }}
                    rules={[
                      {
                        required: requireRequest_date,
                        message: "โปรดระบุข้อมูล",
                      },
                    ]}
                    disabled={disabledRequest_date}
                  >
                    <DatePicker
                      style={{ width: "120px" }}
                      format="DD-MM-YYYY"
                      locale={th_TH}
                      // size="small"
                    />
                  </Form.Item>
                  <Form.Item
                    label="ถึง"
                    name="Request_date_blood_to_search"
                    // style={{
                    //   marginTop: "-20px",
                    //   marginLeft: "5px",
                    // }}
                    rules={[
                      {
                        required: requireRequest_date,
                        message: "โปรดระบุข้อมูล",
                      },
                    ]}
                    disabled={disabledRequest_date}
                  >
                    <DatePicker
                      style={{ width: "120px" }}
                      format="DD-MM-YYYY"
                      locale={th_TH}
                      // size="small"
                    />
                  </Form.Item>
    
                  <Form.Item
                    label="HN"
                    name="HN_search"
                    // style={{
                    //   marginTop: "-20px",
                    //   marginLeft: "8px",
                    // }}
                  >
                    <Input
                      placeholder="ระบุข้อมูลให้ครบ"
                      style={{ width: "120px" }}
                      onChange={onChangeHN}
                    />
                  </Form.Item>

                  <Form.Item
                    label="เลขที่ใบขอเลือด"
                    name="blood_request_number_search"
                    // style={{
                    //   marginTop: "-20px",
                    //   marginLeft: "8px",
                    // }}
                  >
                    <Input
                      
                      placeholder="ระบุข้อมูลให้ครบ"
                      style={{ width: "120px" }}
                    />
                  </Form.Item>
                 
                  <Form.Item
                    label="จุดที่ขอเลือด"
                    name="blood_request_point_search"
                    // style={{
                    //   marginTop: "-56px",
                    //   marginLeft: "880px",
                    // }}
                  >
                    <Select
                      showSearch
                      // showArrow={false}
                      dropdownMatchSelectWidth={false}
                      placement={placement}
                      style={{ width: "275px" }}
                      placeholder="ระบุจุดที่ขอเลือด"
                      onChange={onChange}
                      onSearch={onSearch}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {DEP_show?.map((item) => (
                        <Option key={item.depcode} value={item.depcode}>
                          {item.department}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                 
                </Row>
                <Row justify="start" style={{ marginTop: "-20px" }}>
                  <Form.Item
                    label="วันที่ใช้"
                    name="date_of_use_search"
                    // style={{
                    //   marginTop: "-19px",
                    //   marginLeft: "-10px",
                    // }}
                    rules={[
                      {
                        required: requireRequest_date,
                        message: "โปรดระบุข้อมูล",
                      },
                    ]}
                    disabled={disabledRequest_date}
                  >
                    <DatePicker
                      format="DD-MM-YYYY"
                      style={{ width: "120px" }}
                      locale={th_TH}
                    />
                  </Form.Item>
                 
                  <Form.Item
                    label="ถึง"
                    name="date_of_use_to_search"
                    // style={{
                    //   marginTop: "-19px",
                    //   marginLeft: "5px",
                    // }}
                    rules={[
                      {
                        required: requireRequest_date,
                        message: "โปรดระบุข้อมูล",
                      },
                    ]}
                    disabled={disabledRequest_date}
                  >
                    <DatePicker
                      format="DD-MM-YYYY"
                      style={{ width: "120px" }}
                      locale={th_TH}
                    />
                  </Form.Item>
                 
                  <Form.Item
                    label="ชื่อสถานพยาบาลที่ขอ"
                    name="station_search"
                    // style={{
                    //   marginTop: "-19px",
                    //   marginLeft: "12px",
                    // }}
                  >
                    <Select
                      showSearch
                      // showArrow={false}
                      dropdownMatchSelectWidth={false}
                      placement={placement}
                      style={{ width: "200px" }}
                      placeholder="ชื่อสถานพยาบาลที่ขอ"
                      onChange={onChange}
                      onSearch={onSearch}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {hos_station?.map((item) => (
                        <Option key={item.hos_id} value={item.hos_id}>
                          {item.hos_long_name_th}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                 
                  <Form.Item
                    label="ความต้องการ"
                    name="blood_need_search"
                    // style={{
                    //   marginTop: "-19px",
                    //   marginLeft: "12px",
                    // }}
                  >
                    <Select
                      showSearch
                      // showArrow={false}
                      dropdownMatchSelectWidth={false}
                      placement={placement}
                      style={{ width: "197px" }}
                      placeholder="ความต้องการ"
                      onChange={onChange}
                      onSearch={onSearch}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {Bloodneed?.map((item) => (
                        <Option key={item.priority_id} value={item.priority_id}>
                          {item.priority_name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                 
                  <Form.Item
                    label="หมู่เลือด"
                    name="blood_group_re_search"
                    rules={[
                      {
                        required: requireGroup,
                        message: "โปรดระบุหมู่เลือด",
                      },
                    ]}
                    // style={{
                    //   marginTop: "-19px",
                    //   marginLeft: "12px",
                    // }}
                  >
                    <Select
                      showSearch
                      // showArrow={false}
                      dropdownMatchSelectWidth={false}
                      placement={placement}
                      disabled={disabledGr}
                      style={{ width: "60px" }}
                      placeholder="Group"
                      onChange={onChange}
                      onSearch={onSearch}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {blood_name?.map((item) => (
                        <Option key={item.blood_name} value={item.blood_name}>
                          {item.blood_name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Row>
                <Row justify="start" style={{ marginTop: "-20px" }}>
                  <Form.Item
                    label="สถานะขอเลือด"
                    name="blood_status_search"
                    // style={{
                    //   marginTop: "-19px",
                    //   marginLeft: "-12px",
                    // }}
                  >
                    <Select
                      showSearch
                      // showArrow={false}
                      dropdownMatchSelectWidth={false}
                      placement={placement}
                      // disabled={disabledGr}
                      style={{ width: "250px" }}
                      placeholder="สถานะขอเลือด"
                      onChange={onChange}
                      onSearch={onSearch}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {ST_RE?.map((item) => (
                        <Option
                          key={item.rq_stutus_name}
                          value={item.rq_stutus_id}
                        >
                          {item.rq_stutus_name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>{" "}
                 
                  <Form.Item
                    label=""
                    name="CheckBox_search"
                    // style={{
                    //   marginTop: "-19px",
                    //   marginLeft: "8px",
                    // }}
                  >
                    <Checkbox.Group
                      style={{
                        marginTop: "-14px",
                        marginLeft: "12px",
                      }}
                      //   style={{ }}
                    >
                      <Row>
                        <Checkbox value="TRUE" onChange={onChangeCheckbox}>
                          ไม่ระบุสถานะขอเลือด
                        </Checkbox>
                      </Row>
                    </Checkbox.Group>
                  </Form.Item>{" "}
                 
                  <Form.Item
                    label="Ward"
                    name="WARD_search"
                    // style={{
                    //   marginTop: "-19px",
                    //   marginLeft: "8px",
                    // }}
                  >
                    <Select
                      showSearch
                      // showArrow={false}
                      dropdownMatchSelectWidth={false}
                      placement={placement}
                      // disabled={disabledGr}
                      style={{ width: "250px" }}
                      placeholder="WARD"
                      onChange={onChange}
                      onSearch={onSearch}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {WARD?.map((item) => (
                        <Option key={item.ward} value={item.ward}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>{" "}
                 
                  <Button
                    id="btn_search"
                    type="primary"
                    htmlType="submit"
                    //onClick={onFinishSearch}
                    shape="round"
                    // style={{ marginTop: "-20px", marginLeft: "18px" }}
                  >
                    <SearchOutlined /> ค้นหา
                  </Button>
                  <Button
                
                    type="primary"
                    htmlType="submit"
                    //   size="small"
                    shape="round"
                    danger
                    style={{
                      // marginTop: "-20px",
                      // backgroundColor: "#A9A9A9",
                      // color: "white",

                      marginLeft: "8px",
                    }}
                    onClick={Refresh}
                  >
                    <RetweetOutlined
                      style={{
                        fontWeight: "3px bold",
                        fontSize: "18px",
                        color: "white",
                      }}
                    />{" "}
                    Refresh
                  </Button>
                </Row>
              </Form>
              {/* <Row justify="end" style={{ marginBottom: "-15px" }}>
                
              </Row> */}
              <Row>
                <Table
                  columns={columns}
                  dataSource={Showpatient}
                  bordered
                  scroll={{ x: 2500, y: 1000 }}
                  rowClassName={(record, index) => {
                    return index % 2 === 0 ? "yellow1" : "";
                  }}
                  onRow={(record) => {
                    return {
                      onDoubleClick: () => {
                        popup(record.order_number);
                      },
                    };
                  }}
                  rowKey="MOBCODE"
                  loading={loadingTable}
                  onFinish={onFinishSearch}
                  size="small"
                  style={{
                    width: "100%",
                    // marginBottom: "-30px",
                    // marginTop: "-15px",
               
                  }}
                  className="Tablesearch"
                />
              </Row>
            </Card>

            {/* <Card
              bordered={false}
              style={{
                marginTop: "8px",
                borderRadius: "10px",
                border: "1px solid",
                borderColor: "#C0C0C0",
                // paddingTop: "8px",
                backgroundColor: "#ecf5f8",
                boxShadow: "5px 5px 5px grey",
              }}
            >
             
            </Card> */}
          </Col>
        </Row>
        <br />

        {/* modal  Search*/}
        <Modal
          title="ค้นหาข้อมูลผู้ขอเลือด"
          width={1200}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Row justify="center">
            <Col span={16}>
              <Form form={frmSearch}>
                <Form.Item label="ค้นหา" name="search_data">
                  <Input
                    placeholder="HN / ชื่อ-สกุล "
                    value={value}
                    style={{
                      width: "100%",
                      height: "40px",
                      fontSize: "18px",
                      textAlign: "center",
                    }}
                    onChange={onChangeSearch}
                  />
                </Form.Item>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col span={22} offset={1}>
              <Table
                rowClassName={(record, index) => {
                  return index % 2 === 0 ? "bg-tb-search" : "";
                }}
                columns={columnDataUser}
                dataSource={user}
                onRow={(record) => {
                  return {
                    onDoubleClick: () => {
                      doubbelRow(record);
                    },
                  };
                }}
              ></Table>
            </Col>
          </Row>
        </Modal>

        <Modal
          visible={isModalEdit}
          onOk={handleOkEdit}
          onCancel={handleCancelEdit}
          width={1200}
          footer={false}
        >
          <Patient_blood_edit_modal
            ordernum={orderNum}
            handleCancelEdit={handleCancelEdit}
            onFinishSearch={onFinishSearch}
            testParams={testParams}
          />

        </Modal>
      </div>
  
  );
};

export default Patent_blood_request_list;
