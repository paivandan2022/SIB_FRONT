import {
  CloseCircleOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Table,
  Tabs,
} from "antd";
import th_TH from "antd/lib/date-picker/locale/th_TH";
import moment from "moment";
import "moment/locale/th";
import Head from "next/head";

import { useEffect, useRef, useState } from "react";
import { BsDropletHalf } from "react-icons/bs";
import { FcPrint } from "react-icons/fc";
import {
  MdManageSearch,
  MdOutlineAddLocationAlt,
  MdRefresh,
} from "react-icons/md";
import { RiEdit2Line, RiSave3Line } from "react-icons/ri";
import ReactToPrint from "react-to-print";
import { Layout } from "../components";
import api from "../lib/api";

const Trans_blood_hospital = () => {
  const [frmTransBloodHos] = Form.useForm();
  const [frmAddHospital] = Form.useForm();
  const printComponent = useRef(null);

  const { Option } = Select;
  const { TextArea } = Input;
  const [placement, SetPlacement] = useState("bottomLeft");
  const { TabPane } = Tabs;
  const { RangePicker } = DatePicker;

  const [dataMap, setDataMap] = useState([]);

  const [hospital, setHospital] = useState();
  const [bloodtype, setBloodType] = useState();
  var [btnEdit, setBtnEdit] = useState(true);
  var [btnInsert, setBtnInsert] = useState(false);
  const [valueActive, setValueActive] = useState(false);
  const [isModalAddHospital, setIsModalAddHospital] = useState(false);
  const [autoSave, setAutoSave] = useState(false);
  const [autoPrint, setAutoPrint] = useState(false);
  const [dataBlood, setDataBlood] = useState();
  const [dataSource, setDataSource] = useState([]);
  const [dataHisTrans, setDataHisTrans] = useState([]);
  const [disabledBtn, setDisabledBtn] = useState(true);

  const Fetch_hospital = async () => {
    const result = await api.get("/hospitals");
    setHospital(result.data[0]);
    frmTransBloodHos.setFieldsValue({
      hos_point: result.data[0][0].hos_long_name_th,
    });
  };

  const Fetch_bloodtype = async () => {
    const result = await api.get("/blood_type");
    setBloodType(result.data);
  };

  const showModalAddhospital = async () => {
    const HID = await api.get("/count_hid");
    frmAddHospital.setFieldsValue({
      hos_id: HID.data[0]?.hos_id,
    });
    setIsModalAddHospital(true);
  };

  const handleOkAddhospital = () => {
    setIsModalAddHospital(false);
  };

  const handleCancelAddhospital = () => {
    setIsModalAddHospital(false);
  };

  const columnHospital = [
    {
      title: "ID",
      dataIndex: "hos_id",
      key: "hos_id",
      align: "center",
      width: "7%",
    },
    {
      title: "ชื่อโรงพยาบาล",
      dataIndex: "hos_long_name_th",
      key: "hos_long_name_th",
      width: "30%",
    },
    {
      title: "ชื่อย่อ",
      dataIndex: "hos_shot_name_th",
      key: "hos_shot_name_th",
    },
    {
      title: "NAME ENG",
      dataIndex: "hos_long_name_en",
      key: "hos_long_name_en",
    },
    {
      title: "SName eng",
      dataIndex: "hos_shot_name_en",
      key: "hos_shot_name_en",
    },
    {
      title: "แก้ไข",
      dataIndex: "edit_hospital",
      key: "edit_hospital",
      align: "center",
      width: "6%",
      render: (_, record) => (
        <Button
          type="link"
          icon={<RiEdit2Line />}
          style={{ fontSize: "14px", color: "#FF8D29" }}
          onClick={() => EditHos(record.hos_id)}
        />
      ),
    },
    {
      title: "ลบ",
      dataIndex: "dalata_hospital",
      key: "dalata_hospital",
      align: "center",
      width: "6%",
      render: (_, record) => (
        <Popconfirm
          title="คุณต้องการบข้อมูลใช่หรือไม่ ?"
          onConfirm={() => deletehospital(record.hos_id)}
        >
          <CloseCircleOutlined style={{ fontSize: "14px", color: "red" }} />
        </Popconfirm>
      ),
    },
  ];

  const deletehospital = async (key) => {
    const result = await api.delete(`/DeleteHospital`, {
      params: { hos_id: key },
    });
    Fetch_hospital();
    ClearHospital();
  };

  const EditHos = async (id) => {
    const hosSelected = hospital.find((item) => item.hos_id === id);

    if (hosSelected.hos_active === 1) {
      setValueActive(true);
    } else {
      setValueActive(false);
    }

    frmAddHospital.setFieldsValue({
      ...hosSelected,
    });
    setBtnEdit(false);
    setBtnInsert(true);
  };

  const addHospital = async () => {
    const frm = frmAddHospital.getFieldValue();
    frm.hos_active = valueActive;
    const result = await api.post(`/addHospital`, {
      hos_id: frm.hos_id,
      hos_long_name_th: frm.hos_long_name_th,
      hos_shot_name_th: frm.hos_shot_name_th,
      hos_long_name_en: frm.hos_long_name_en,
      hos_shot_name_en: frm.hos_shot_name_en,
      hos_display: frm.hos_display,
      hos_active: Number(frm.hos_active),
    });
    await Fetch_hospital();
    ClearHospital();
  };

  const updateHospital = async () => {
    const frm = frmAddHospital.getFieldValue();
    frm.hos_active = valueActive;
    console.log("frmีย", frm);
    const result = await api.post(`/uqHospital`, {
      hos_id: frm.hos_id,
      hos_long_name_th: frm.hos_long_name_th,
      hos_shot_name_th: frm.hos_shot_name_th,
      hos_long_name_en: frm.hos_long_name_en,
      hos_shot_name_en: frm.hos_shot_name_en,
      hos_display: frm.hos_display,
      hos_active: Number(frm.hos_active),
    });
    await Fetch_hospital();
    ClearHospital();
  };

  const onChangeCB = (e) => {
    setValueActive(e.target.checked);
    console.log("checked =", e.target.checked);
  };

  const ClearHospital = async () => {
    frmAddHospital.resetFields();
    const HID = await api.get("/count_hid");
    console.log("hiddd", HID.data[0]);
    frmAddHospital.setFieldsValue({
      hos_id: HID.data[0]?.hos_id,
    });

    setBtnEdit(true);
    setBtnInsert(false);
    setValueActive(false);
  };

  const checkAutoSave = (e) => {
    setAutoSave(e.target.checked);
    console.log("checkedAutoSave =", e.target.checked);
    document.getElementById("blood_no").focus();
  };

  // เซตข้อมูลblood ถ้า autoSave = true เซต dataSource  ถ้า false เซตข้อมูลblood เฉยๆ
  const SearchBloodNo = async () => {
    const frm = frmTransBloodHos.getFieldValue();

    const params = {
      ...frm,
    };

    try {
      const resultDataBlood = await api.get("/check_data_blood", { params });
      setDataBlood(resultDataBlood.data[0]);

      if (resultDataBlood.data.length > 0) {
        if (autoSave === true) {
          if (dataSource.length > 0) {
            const result = dataSource.filter(
              (item) => item.blood_no === frm.blood_no
            );
            if (result.length > 0) {
              // เช็คตอนเซตข้อมูลถุงเลือดลงในตาราง
              Modal.warning({
                content: "ถุงเลือดซ้ำ",
                onOk() {
                  setDataBlood();
                  frmTransBloodHos.setFieldsValue({ blood_no: null });
                  document.getElementById("blood_no").focus();
                },
              });
            } else {
              setDataSource([...dataSource, resultDataBlood.data[0]]);
              frmTransBloodHos.setFieldsValue({
                blood_no: null,
              });
              setDataBlood();
              document.getElementById("blood_no").focus();
              if (
                frm.staff_save != undefined &&
                dataSource.length > 0 &&
                frm.staff_save != ""
              ) {
                setDisabledBtn(false);
              } else {
                setDisabledBtn(true);
              }
            }
          } else {
            setDataSource([...dataSource, resultDataBlood.data[0]]);
            frmTransBloodHos.setFieldsValue({
              blood_no: null,
            });
            setDataBlood();
            document.getElementById("blood_no").focus();
            if (
              frm.staff_save != undefined &&
              dataSource.length >= 0 &&
              frm.staff_save != ""
            ) {
              setDisabledBtn(false);
            } else {
              setDisabledBtn(true);
            }
          }
        }
      } else {
        // เช็คตอนไม่พบข้อมูลถุงเลือด lenght<0
        Modal.error({
          content: <div>ไม่พบข้อมูลถุงเลือดนี้ กรุณาตรวจสอบอีกครั้ง</div>,
          onOk() {
            frmTransBloodHos.setFieldsValue({
              blood_no: null,
            });
            document.getElementById("blood_no").focus();
          },
        });
      }
    } catch (error) {
      // เช็คตอนไม่พบข้อมูลถุงเลือด หลังบ้าน
      Modal.error({
        content: <div>ไม่พบข้อมูลถุงเลือดนี้ กรุณาตรวจสอบอีกครั้ง</div>,
        onOk() {
          frmTransBloodHos.setFieldsValue({
            blood_no: null,
          });
          document.getElementById("blood_no").focus();
        },
      });
    }
  };

  const columnDataBlood = [
    {
      title: "#",
      dataIndex: "No",
      key: "no",
      align: "center",
      width: "4%",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Unit No.",
      dataIndex: "unit_no_dot",
      key: "unit_no_dot",
      align: "center",
      width: "12%",
    },
    {
      title: "Group",
      dataIndex: "blood_group",
      key: "blood_group",
      align: "center",
      width: "6%",
    },
    {
      title: "Rh",
      dataIndex: "blood_rh",
      key: "blood_rh",
      align: "center",
      width: "4%",
    },
    {
      title: "ml",
      dataIndex: "blood_value",
      key: "blood_value",
      align: "center",
      width: "6%",
    },
    {
      title: "Type",
      dataIndex: "component_name",
      key: "component_name",
      align: "center",
      width: "15%",
    },
    {
      title: "Expiry Date",
      dataIndex: "expiry_date",
      key: "expiry_date",
      align: "center",
      width: "10%",
    },
    {
      title: "",
      dataIndex: "delete_datablood",
      key: "delete_datablood",
      align: "center",
      width: "5%",
      render: (_, record, index) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="คุณต้องการลบข้อมูลใช่หรือไม่ ?"
            onConfirm={() => handleDelete(index)}
          >
            <CloseCircleOutlined style={{ fontSize: "20px", color: "red" }} />
          </Popconfirm>
        ) : null,
    },
  ];

  const handleDelete = (key) => {
    const frm = frmTransBloodHos.getFieldValue();
    const dataLast = dataSource[key];
    const newData = dataSource.filter((item) => item !== dataLast);
    setDataSource(newData);

    console.log("handleDelete", dataSource.length);

    if (
      frm.staff_save != undefined &&
      dataSource.length > 1 &&
      frm.staff_save != ""
    ) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  };

  // ถ้ามีการกดปุ่มเพิ่มเลือด จะเซต dataSource หรือ ในกรณีที่ autoSave = false
  const setDataBloodTable = () => {
    const frm = frmTransBloodHos.getFieldValue();
    console.log("setdata", dataSource.length);
    if (dataBlood != undefined) {
      if (dataSource.length > 0) {
        const result = dataSource.filter(
          (item) => item.blood_no === frm.blood_no
        );
        if (result.length > 0) {
          console.log("ซ้ำ ถุงเลือดซ้ำ");
          Modal.warning({
            content: "ถุงเลือดซ้ำ",
            onOk() {
              setDataBlood();
              frmTransBloodHos.setFieldsValue({ blood_no: null });
              document.getElementById("blood_no").focus();
            },
          });
        } else {
          console.log("1", dataSource.length);
          setDataSource([...dataSource, dataBlood]);
          frmTransBloodHos.setFieldsValue({
            blood_no: null,
          });
          setDataBlood();
          document.getElementById("blood_no").focus();
          if (
            frm.staff_save != undefined &&
            dataSource.length > 0 &&
            frm.staff_save != ""
          ) {
            setDisabledBtn(false);
          } else {
            setDisabledBtn(true);
          }
        }
      } else {
        console.log("2", dataSource.length);
        setDataSource([...dataSource, dataBlood]);
        frmTransBloodHos.setFieldsValue({
          blood_no: null,
        });
        setDataBlood();
        document.getElementById("blood_no").focus();
        if (
          frm.staff_save != undefined &&
          dataSource.length >= 0 &&
          frm.staff_save != ""
        ) {
          setDisabledBtn(false);
        } else {
          setDisabledBtn(true);
        }
      }
    } else {
      Modal.warning({
        content: <div>กรุณาตรวจสอบข้อมูลอีกครั้ง</div>,
        onOk() {
          frmTransBloodHos.setFieldsValue({
            blood_no: null,
          });
          document.getElementById("blood_no").focus();
        },
      });
    }
  };

  const checkAutoPrint = (e) => {
    setAutoPrint(e.target.checked);
    console.log("checkedAutooPrint =", e.target.checked);
    console.log("dataSource =", dataSource);
  };

  const onChangeDateTrans = (e) => {
    const frm = frmTransBloodHos.getFieldsValue();
    const ckeckYear = moment(frm.date_trans).year() - moment().year();

    let date = "";
    {
      ckeckYear > 542
        ? (date = moment(frm.date_trans))
        : (date = moment(frm.date_trans).add(543, "year"));
    }

    let date_trans_new = " ";
    {
      frm.date_trans === null
        ? (date_trans_new = moment().add(543, "year"))
        : (date_trans_new = moment(date));
    }

    frmTransBloodHos.setFieldsValue({
      date_trans: date_trans_new,
    });
  };

  const onChangeSearchDate = (e) => {
    const frm = frmTransBloodHos.getFieldsValue();
    const ckeckYear = moment(frm.date_start).year() - moment().year();
    console.log("ckeckYear", ckeckYear);
    let date = "";
    {
      ckeckYear > 0
        ? (date = moment(frm.date_start))
        : (date = moment(frm.date_start).add(543, "year"));
    }

    let date_start_new = " ";
    {
      frm.date_start === null
        ? (date_start_new = moment().add(543, "year"))
        : (date_start_new = moment(date));
    }

    console.log("date", moment(date_start_new).year());

    frmTransBloodHos.setFieldsValue({
      date_start: date_start_new,
    });
  };

  const onChangeSearchDateLast = (e) => {
    const frm = frmTransBloodHos.getFieldsValue();
    const ckeckYear = moment(frm.date_last).year() - moment().year();
    let date = "";
    {
      ckeckYear > 0
        ? (date = moment(frm.date_last))
        : (date = moment(frm.date_last).add(543, "year"));
    }

    let date_last_new = " ";
    {
      frm.date_last === null
        ? (date_last_new = moment().add(543, "year"))
        : (date_last_new = moment(date));
    }

    frmTransBloodHos.setFieldsValue({
      date_last: date_last_new,
    });
  };

  const columnsHisTrans = [
    {
      title: "#",
      dataIndex: "No",
      key: "no",
      align: "center",
      width: "3%",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "พิมพ์",
      dataIndex: "payment",
      key: "",
      align: "center",
      width: "6%",
      render: (_, record) => (
        <Button
          type="link"
          icon={<FcPrint />}
          style={{ color: "#FF8D29" }}
          onClick={() => hisTransPrint(record.payment)}
        />
      ),
    },

    {
      title: "Unit No.",
      dataIndex: "unit_no_dot",
      key: "unit_no_dot",
      align: "center",
      width: "8%",
    },
    {
      title: "Group",
      dataIndex: "Gr",
      key: "Gr",
      align: "center",
      width: "4%",
    },
    {
      title: "Type",
      dataIndex: "s_name",
      key: "s_name",
      align: "center",
      width: "5%",
    },
    {
      title: "Expire Date",
      dataIndex: "expiry_date",
      key: "expiry_date",
      align: "center",
      width: "7%",
    },
    {
      title: "จ่ายไปยัง",
      dataIndex: "hos_long_name_th",
      key: "hos_long_name_th",
      align: "center",
      width: "12%",
    },
    {
      title: "วันที่จ่าย",
      dataIndex: "trans_date",
      key: "trans_date",
      align: "center",
      width: "7%",
    },
    {
      title: "ผู้จ่าย",
      dataIndex: "Pname",
      key: "Pname",
      align: "center",
      width: "12%",
    },
    {
      title: "ผู้รับเลือด",
      dataIndex: "recipient",
      key: "recipient",
      align: "center",
      width: "10%",
    },
  ];

  const SearchHisTrans = async () => {
    const frm = frmTransBloodHos.getFieldsValue();
    console.log("femSearch", frm);
   

    const params = {
      date_start: moment(frm.date_Search[0]).subtract(543, "years").format("YYYY-MM-DD"),
      date_last: moment(frm.date_Search[1]).subtract(543, "years").format("YYYY-MM-DD"),
      hos_id: frm.hos_id,
      unit_no: frm.unit_no,
    };
    delete params.date_Search;

    try {
      const resultHisTrans = await api.get("/search_his_trans", { params });

      if (resultHisTrans.data.length < 1) {
        Modal.warning({
          content: <div>ไม่พบข้อมูล กรุณาตรวจสอบข้อมูลอีกครั้ง</div>,
          onOk() {
            clearSearch();
          },
        });
      } else {
        setDataHisTrans(resultHisTrans.data);
      }
    } catch (error) {}

    console.log("params", params);
  };

  const clearSearch = () => {
    setDataHisTrans([]);
    frmTransBloodHos.resetFields();
  };

  const AddDataTrans = async () => {
    const frm = frmTransBloodHos.getFieldValue();
    // console.log("addTransBlood", frm.date_trans);
    // console.log("dataSource", dataSource);

    const resultLogin = await api.post(`/Confirm_password`, {
      password: frm.staff_save,
    });
    const staff = resultLogin.data.user_name;
    const BloodNo = dataSource.map((item) => item.blood_no);
    const TypeId = dataSource.map((item) => item.type_id);
    const BlId = dataSource.map((item) => item.bl_id);

    if (frm.hos_point == "โรงพยาบาลสวรรค์ประชารักษ์") {
      frm.hos_point = 1;
    } else {
      frm.hos_point = frm.hos_point;
    }

    if (frm.note == undefined) {
      frm.note = "";
    } else {
      frm.note = frm.note;
    }

    if (frm.recipient == undefined) {
      frm.recipient = "";
    } else {
      frm.recipient = frm.recipient;
    }

    if (frm.date_trans == undefined) {
      frm.date_trans = moment(frm.date_trans).format("YYYY-MM-DD");
    } else {
      frm.date_trans = moment(frm.date_trans)
        .subtract(543, "years")
        .format("YYYY-MM-DD");
    }

    try {
      const resultAddTrans = await api.post("/add_trans_blood", {
        unit_no: BloodNo,
        type: TypeId,
        hos_id: frm.hos_point,
        date: frm.date_trans,
        recipient: frm.recipient,
        note: frm.note,
        Pname: staff,
        date: frm.date_trans,
        bl_id: BlId,
      });

      const resultTransBloodPrint = await api.get("/dataTransBlood");
      // setDataTransBlood(resultTransBloodPrint?.data[0]);
      console.log("ไม่มีpayment", resultTransBloodPrint?.data);

      const handleKeyDown = (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          const idOK = document.getElementById("ok");
          if (idOK) {
            idOK.click();
            window.removeEventListener("keydown", handleKeyDown);
          }
        }
      };

      const closeModal = () => {
        Modal.success({
          content: <div>บันทึกข้อมูลจ่ายเลือดเรียบร้อยเเล้ว</div>,
          onCancel: (close) => {
            close();
          },
          onOk: (close) => {
            close();
            frmTransBloodHos.resetFields();
            setDataSource([]);
            Fetch_hospital();
            setDisabledBtn(true);
            setAutoSave(false);
            setAutoPrint(false);

            if (autoPrint === true) {
              const dataPrint = [];
              btnPrint.click();
              dataPrint.push(resultTransBloodPrint?.data);
              setDataMap(dataPrint);
            }
          },
          okButtonProps: { id: "ok" },
        });
      };

      if (resultAddTrans.data.message === "success") {
        closeModal();
        window.addEventListener("keydown", handleKeyDown);
      }
    } catch (error) {
      Modal.error();
    }
  };

  const checkBtnAdd = () => {
    const frm = frmTransBloodHos.getFieldValue();
    // console.log("checkBtnAdd", dataSource.length);
    // console.log("password", frm.staff_save);
    if (
      frm.staff_save != undefined &&
      dataSource.length > 0 &&
      frm.staff_save != ""
    ) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  };

  const hisTransPrint = async (value) => {
    console.log("hisTransPrint", value);
    PrintData(value);
  };

  const PrintData = async (value) => {
    const dataPrint = [];
    const params = {
      payment: value,
    };
    const resultTransBloodPrint = await api.get("/dataTransBlood", { params });
    console.log("มีpayment", resultTransBloodPrint?.data);
    dataPrint.push(resultTransBloodPrint?.data);

    setDataMap(dataPrint);
    btnPrint.click();

    //setDataMap(value);
  };

  console.log("dataMap", dataMap);
  useEffect(async () => {
    await Fetch_hospital();
    await Fetch_bloodtype();
    // await PrintData();
  }, []);

  return (
    <>
      <Layout keyTab="trans_blood_hospital">
        <div>
          <Head>
            <title>SIBSOFT : จ่ายเลือด</title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
        </div>
        <Form
          form={frmTransBloodHos}
          initialValues={{
            date_Search: [moment().add(543, "year"), moment().add(543, "year")],
          }}
        >
          <Row style={{ padding: "10px" }}>
            <Col span={22} offset={1}>
              <Card>
                <Tabs defaultActiveKey="1" type="card">
                  <TabPane tab="จ่ายเลือด" key="1">
                    <Row style={{ marginTop: "-12px" }}>
                      <Col span={7}>
                        <Form.Item
                          name="hos_point"
                          label="เลือกที่จ่าย"
                          // rules={[{ required: true }]}
                          style={{
                            marginRight: "2px",
                          }}
                        >
                          <Select
                            size="small"
                            showArrow={false}
                            dropdownMatchSelectWidth={false}
                            placement={placement}
                            placeholder="เลือกที่จ่าย"
                            style={{ width: "100%" }}
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {hospital?.map((item) => (
                              <Option key={item.hos_id} value={item.hos_id}>
                                {item.hos_long_name_th}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col span={3}>
                        <Button
                          icon={
                            <MdOutlineAddLocationAlt
                              style={{ fontSize: "14px" }}
                            />
                          }
                          type="primary"
                          style={{
                            paddingLeft: "12px",
                            fontSize: "12px",
                            marginTop: "4px",
                          }}
                          size="small"
                          onClick={showModalAddhospital}
                        >
                          &nbsp; เพิ่มโรงพยาบาล
                        </Button>
                      </Col>
                    </Row>

                    <Row style={{ marginTop: "-15px" }}>
                      <Col
                        span={6}
                        style={{
                          border: "1px solid #C4DDFF",
                          paddingTop: "20px",
                          paddingLeft: "10px",
                          paddingBottom: "10px",
                        }}
                      >
                        <Row style={{ marginTop: "-12px" }}>
                          <Col span={24}>
                            <Form.Item
                              label="ประเภทเลือด"
                              name="blood_type"
                              style={{ paddingRight: "12px" }}
                            >
                              <Select
                                onChange={() => {
                                  document.getElementById("blood_no").focus();
                                }}
                                placeholder="ประเภทเลือด"
                                size="small"
                                style={{
                                  width: "100%",
                                }}
                              >
                                {bloodtype?.map((item) => (
                                  <Option key={item.id} value={item.id}>
                                    {item.s_name}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Col>
                        </Row>

                        <Row style={{ marginTop: "-25px" }}>
                          <Col span={24}>
                            <Form.Item
                              label="เลขที่ถุงเลือด"
                              name="blood_no"
                              style={{ paddingRight: "12px" }}
                            >
                              <Input
                                onPressEnter={SearchBloodNo}
                                id="blood_no"
                                size="small"
                                placeholder="เลขถุงเลือด"
                                style={{
                                  width: "100%",
                                  fontSize: "14px",
                                }}
                              />
                            </Form.Item>
                          </Col>
                        </Row>

                        <Row style={{ marginTop: "-25px" }}>
                          <Col span={8}>
                            <p style={{ fontSize: "14px" }}>
                              Group :&nbsp;
                              <b style={{ color: "blue" }}>
                                {dataBlood?.blood_group}
                              </b>
                            </p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontSize: "14px" }}>
                              Rh :&nbsp;
                              <b style={{ color: "blue" }}>
                                {dataBlood?.blood_rh}
                              </b>
                            </p>
                          </Col>
                          <Col span={10}>
                            <p style={{ fontSize: "14px" }}>
                              Volume :&nbsp;
                              <b style={{ color: "blue" }}>
                                {dataBlood?.blood_value === null
                                  ? "0"
                                  : dataBlood?.blood_value}
                              </b>
                              &nbsp;ml
                            </p>
                          </Col>
                        </Row>

                        <Row style={{ marginTop: "-12px" }}>
                          <Col span={24}>
                            <p style={{ fontSize: "14px" }}>
                              ชนิดเลือด :&nbsp;{" "}
                              <b style={{ color: "blue" }}>
                                {dataBlood?.component_name}
                              </b>
                            </p>
                          </Col>
                        </Row>

                        <Row style={{ marginTop: "-8px" }}>
                          <Col span={24}>
                            <p style={{ fontSize: "14px" }}>
                              วันที่เจาะ :&nbsp;
                              <b style={{ color: "blue" }}>
                                {dataBlood?.punct_date}
                              </b>
                            </p>
                          </Col>
                        </Row>

                        <Row style={{ marginTop: "-12px" }}>
                          <Col span={24}>
                            <p style={{ fontSize: "14px" }}>
                              วันที่รับ :&nbsp;
                              <b style={{ color: "blue" }}>
                                {dataBlood?.receive_date}
                              </b>
                            </p>
                          </Col>
                        </Row>

                        <Row style={{ marginTop: "-12px" }}>
                          <Col span={24}>
                            <p style={{ fontSize: "14px" }}>
                              วันที่หมดอายุ :&nbsp;
                              <b style={{ color: "blue" }}>
                                {dataBlood?.expiry_date}
                              </b>
                            </p>
                          </Col>
                        </Row>

                        <Row style={{ marginTop: "-12px" }}>
                          <Col
                            offset={1}
                            style={{
                              //   marginLeft: "10px",
                              marginBottom: "10px",
                            }}
                          >
                            <Checkbox
                              onChange={checkAutoSave}
                              checked={autoSave}
                              style={{
                                fontSize: "14px",
                                paddingTop: "5px",
                              }}
                            >
                              Save Auto
                            </Checkbox>
                          </Col>
                          <Col>
                            <Button
                              size="small"
                              type="primary"
                              onClick={setDataBloodTable}
                              style={{
                                fontSize: "12px",
                                height: "28px",
                                marginLeft: "10px",
                              }}
                            >
                              เพิ่มเลือด
                            </Button>
                          </Col>
                        </Row>
                      </Col>

                      <Col span={18}>
                        <Row>
                          <Col span={22} offset={1}>
                            <Table
                              bordered
                              className="xm"
                              style={{ border: "1px solid" }}
                              columns={columnDataBlood}
                              dataSource={dataSource}
                              pagination={false}
                              scroll={{ y: 200 }}
                              size="small"
                            ></Table>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <Row justify="center" style={{ marginTop: "12px" }}>
                      <Col span={7}>
                        <Form.Item
                          label="หมายเหตุ"
                          name="note"
                          style={{ paddingRight: "12px" }}
                        >
                          <TextArea rows={1}></TextArea>
                        </Form.Item>
                      </Col>

                      <Col span={5}>
                        <Form.Item
                          name="date_trans"
                          label="วันที่จ่าย"
                          style={{
                            paddingLeft: "8px",
                          }}
                        >
                          <DatePicker
                            defaultValue={moment().add(543, "year")}
                            style={{
                              width: "100%",
                              fontSize: "14px",
                            }}
                            format="DD-MM-YYYY"
                            locale={th_TH}
                            onChange={onChangeDateTrans}
                            size="small"
                          />
                        </Form.Item>
                      </Col>

                      <Col span={6}>
                        <Form.Item
                          name="recipient"
                          label="ผู้รับเลือด"
                          style={{
                            paddingLeft: "8px",
                          }}
                        >
                          <Input
                            placeholder="ผู้รับเลือด"
                            style={{
                              width: "100%",
                              fontSize: "14px",
                            }}
                            size="small"
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row
                      justify="center"
                      style={{
                        paddingLeft: "18px",
                        marginBottom: "-25px",
                        marginTop: "-15px",
                      }}
                    >
                      <Col>
                        <Checkbox
                          onChange={checkAutoPrint}
                          checked={autoPrint}
                          style={{
                            fontSize: "14px",
                            marginTop: "4px",
                            marginRight: "2px",
                          }}
                        ></Checkbox>
                      </Col>

                      <Col>
                        <FcPrint
                          style={{
                            fontSize: "28px",
                            marginTop: "2px",
                          }}
                        />
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          name="staff_save"
                          label="Password"
                          style={{
                            paddingLeft: "8px",
                          }}
                        >
                          <Input.Password
                            onChange={checkBtnAdd}
                            placeholder="กรุณากรอกรหัสผ่าน"
                            iconRender={(visible) =>
                              visible ? (
                                <EyeTwoTone />
                              ) : (
                                <EyeInvisibleOutlined />
                              )
                            }
                            style={{ width: "100%" }}
                            size="small"
                            onPressEnter={AddDataTrans}
                          />
                        </Form.Item>
                      </Col>
                      <Col>
                        <Button
                          disabled={disabledBtn}
                          onClick={AddDataTrans}
                          icon={<BsDropletHalf />}
                          style={{
                            fontSize: "12px",
                            height: "28px",
                            marginLeft: "10px",
                            backgroundColor:
                              disabledBtn === false ? "#17a2b8" : "",
                            color: disabledBtn === false ? "white" : "",
                            marginTop: "1px",
                          }}
                        >
                          &nbsp;จ่ายเลือด
                        </Button>
                      </Col>
                      <Col>
                        <div ref={(el) => (printComponent = el)}>
                          {dataMap?.map((item) => (
                            <div key={item.id}>
                              <PrintDetail data={item} />
                            </div>
                          ))}
                        </div>

                        <ReactToPrint
                          trigger={() => (
                            <Button id="btnPrint" type="text"></Button>
                          )}
                          content={() => printComponent}
                        />
                      </Col>
                    </Row>
                  </TabPane>

                  <TabPane tab="ประวัติจ่ายเลือด" key="2">
                    <Row justify="center">
                      <Col span={6}>
                        <Form.Item name="date_Search" label="วันที่จ่าย">
                          <RangePicker
                            size="small"
                            placeholder={["วันเริ่ม", "วันสุดท้าย"]}
                            format="DD-MM-YYYY"
                            locale={th_TH}
                          />
                        </Form.Item>
                      </Col>

                      <Col span={4} style={{ marginLeft: "3px" }}>
                        <Form.Item
                          name="hos_id"
                          // rules={[{ required: true }]}
                          style={{
                            marginRight: "2px",
                          }}
                        >
                          <Select
                            size="small"
                            showArrow={false}
                            dropdownMatchSelectWidth={false}
                            placement={placement}
                            placeholder="เลือกโรงพยาบาล"
                            style={{ width: "100%" }}
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {hospital?.map((item) => (
                              <Option key={item.hos_id} value={item.hos_id}>
                                {item.hos_long_name_th}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col span={3} style={{ marginLeft: "3px" }}>
                        <Form.Item
                          name="unit_no"
                          style={{ paddingRight: "12px" }}
                        >
                          <Input
                            size="small"
                            placeholder="เลขที่ถุงเลือด"
                            style={{
                              width: "100%",

                              fontSize: "14px",
                            }}
                          />
                        </Form.Item>
                      </Col>

                      <Col span={2}>
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
                          onClick={SearchHisTrans}
                        >
                          ค้นหา
                        </Button>
                      </Col>

                      <Col span={2}>
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
                          onClick={clearSearch}
                        >
                          เริ่มใหม่
                        </Button>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={24}>
                        <Table
                          bordered
                          className="xm"
                          size="small"
                          dataSource={dataHisTrans}
                          columns={columnsHisTrans}
                        ></Table>
                      </Col>
                    </Row>
                  </TabPane>
                </Tabs>
              </Card>
            </Col>
          </Row>
        </Form>

        <Modal
          style={{ top: 10 }}
          width={850}
          visible={isModalAddHospital}
          onOk={handleOkAddhospital}
          onCancel={handleCancelAddhospital}
          footer={false}
        >
          <Row style={{ marginTop: "-10px" }}>
            <h style={{ fontSize: "14px" }}>เพิ่มข้อมูลโรงพยาบาล</h>
          </Row>

          <Row>
            <Col span={22} offset={1}>
              <Form form={frmAddHospital}>
                <Row>
                  <Col offset={1}>
                    <Form.Item
                      label="HID"
                      name="hos_id"
                      style={{ paddingLeft: "34px" }}
                    >
                      <Input
                        disabled
                        style={{
                          width: "50%",
                          fontSize: "12px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row style={{ marginTop: "-18px" }}>
                  <Col span={10} offset={1}>
                    <Form.Item label="ชื่อเต็ม TH" name="hos_long_name_th">
                      <Input
                        placeholder="ชื่อเต็ม TH"
                        style={{
                          width: "100%",
                          fontSize: "12px",
                          marginLeft: "-4px",
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={10}>
                    <Form.Item
                      label="ชื่อย่อ "
                      name="hos_shot_name_th"
                      style={{ marginLeft: "94px" }}
                    >
                      <Input
                        placeholder="ชื่อย่อ "
                        style={{
                          width: "100%",
                          fontSize: "12px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row style={{ marginTop: "-18px" }}>
                  <Col span={10} offset={1}>
                    <Form.Item
                      label="Name Eng"
                      name="hos_long_name_en"
                      style={{ marginLeft: "-9px" }}
                    >
                      <Input
                        placeholder="Name Eng"
                        style={{
                          width: "100%",
                          fontSize: "12px",
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={10} offset={1}>
                    <Form.Item label="Short name eng " name="hos_shot_name_en">
                      <Input
                        placeholder="Short name eng "
                        style={{
                          width: "85%",
                          fontSize: "12px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row style={{ marginTop: "-18px" }}>
                  <Col span={10} offset={1}>
                    <Form.Item
                      label="Display"
                      name="hos_display"
                      style={{ paddingLeft: "10px" }}
                    >
                      <Input
                        placeholder="Display"
                        style={{
                          width: "30%",
                          fontSize: "12px",
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={10} offset={1}>
                    <Form.Item
                      label="Active "
                      name="hos_active"
                      style={{ paddingLeft: "63px" }}
                    >
                      <Checkbox
                        onChange={onChangeCB}
                        checked={valueActive}
                        style={{
                          fontSize: "14px",
                          paddingTop: "5px",
                        }}
                      ></Checkbox>
                    </Form.Item>
                  </Col>
                </Row>

                <Row
                  justify="center"
                  style={{ marginTop: "-22px", marginBottom: "-10px" }}
                >
                  <Col span={3}>
                    <Button
                      size="small"
                      onClick={addHospital}
                      disabled={btnInsert}
                      icon={<MdOutlineAddLocationAlt />}
                      style={{
                        fontSize: "12px",
                        height: "28px",
                        backgroundColor: btnInsert == false ? "#5db904" : "",
                        color: btnInsert == false ? "white" : "",
                      }}
                    >
                      &nbsp; เพิ่มข้อมูล
                    </Button>
                  </Col>
                  <Col span={5}>
                    <Button
                      size="small"
                      onClick={updateHospital}
                      disabled={btnEdit}
                      icon={<RiSave3Line />}
                      style={{
                        fontSize: "12px",
                        height: "28px",
                        backgroundColor: btnEdit == true ? "" : "#2FA4FF",
                        color: btnEdit == true ? "" : "white",
                      }}
                    >
                      &nbsp; บันทึกการแก้ไขข้อมูล
                    </Button>
                  </Col>
                  <Col span={3}>
                    <Button
                      style={{
                        fontSize: "12px",
                        height: "28px",
                        marginLeft: "-5px",
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
                      size="samll"
                      onClick={ClearHospital}
                    >
                      เริ่มใหม่
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          <Row style={{ marginTop: "18px" }}>
            <Col span={22} offset={1}>
              <Table
                bordered
                className="xm"
                columns={columnHospital}
                dataSource={hospital}
                scroll={{ y: 300 }}
                size="small"
              />
            </Col>
          </Row>
        </Modal>
      </Layout>
    </>
  );
};

export default Trans_blood_hospital;

const PrintDetail = ({ data }) => {
  const [bloodNo, setBloodNo] = useState();
  console.log("paymentPrint", data);

  // const checkBloodNo = (value) => {
  //   setBloodNo(value.map((item, index) => <p key={index}>{item.blood_no}</p>));
  // };

  // useEffect(async () => {
  //   if (payment) {
  //     checkBloodNo(payment);
  //   }
  //   console.log("pr", payment);
  // }, [payment]);

  return (
    <div className="print">
      <p>
        {data.map((item, index) => (
          <p key={index}>{item.blood_no}</p>
        ))}
      </p>
    </div>
  );
};
