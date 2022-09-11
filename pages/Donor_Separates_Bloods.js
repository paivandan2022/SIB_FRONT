import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  SettingFilled,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
  Typography,
} from "antd";
import { internalIpV4 } from "internal-ip";
import JsBarcode from "jsbarcode";
import "moment/locale/th";
import Head from "next/head";
import os from "os";
import { useEffect, useRef, useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { MdManageSearch, MdRefresh } from "react-icons/md";
import { VscSaveAs } from "react-icons/vsc";

import Layout from "../components/layout";
import api from "../lib/api";
import user from "../lib/user";

const { Option } = Select;

const Setting = () => {
  const scW = screen.width / 2;
  const scH = screen.height / 2;
  const appW = 720;
  const appH = 420;
  const url = "/Setting_spin";
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
const useSSNFields = (form) => {
  const [ssnValues, setValue] = useState({
    ssn1: "",
    ssn2: "",
    ssn3: "",
    ssn4: "",
    ssn5: "",
    ssn6: "",
    ssn7: "",
  });
  return {
    handleChange: (e) => {
      const { maxLength, value, id } = e.target;
      const [fieldName, fieldIndex] = id.split("-");

      console.log(maxLength, value, id);

      // Check if they hit the max character length
      if (value.length >= maxLength) {
        // Check if it's not the last input field
        if (parseInt(fieldIndex, 10) < 8) {
          // Get the next input field
          const nextSibling = document.querySelector(
            `input[id=ssn-${parseInt(fieldIndex, 10) + 1}]`
          );
          // If found, focus the next field
          if (nextSibling !== null) {
            nextSibling.focus();

            if (parseInt(fieldIndex, 10) === 3) {
              //console.log("=====", nextSibling, value);
              nextSibling.value = value;
              form.setFieldsValue({
                set_4: value,
              });
            }
          }
        }
      }
      console.log("ssnValues", ssnValues);
      setValue({
        ...value,
        [`ssn${fieldIndex}`]: value,
        // ssn4: ssnValues?.ssn3,
      });
    },
  };
};
const Donor_Separates_Bloods = ({ computerName }) => {
  const [password, setPassword] = useState();
  const [isModalPassword, setIsModalPassword] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [frm_option_1] = Form.useForm();
  const [frm_option_2] = Form.useForm();
  const [frm_option_3] = Form.useForm();
  const [frm_option_4] = Form.useForm();

  const [frmsubmit] = Form.useForm();
  const [setting_data, setSetting_data] = useState();
  const [show_1, setShow_1] = useState();
  const [show_2, setShow_2] = useState();
  const { handleChange } = useSSNFields(frm_option_1);

  const printComponent = useRef(null);
  const { TextArea } = Input;

  const [choicebag, setChoicebag] = useState();
  const [cell_choice, setCell_choice] = useState();
  const [platelet_choice, setPlatelet_choice] = useState();
  const [pasma_choice, setPasma_choice] = useState();
  const [result_for_table, setResult_for_table] = useState([]);
  const [function_opt, setFunction_opt] = useState();
  const [bagtype_opt1, setBagtype_opt1] = useState();
  const [bagtype_opt2, setBagtype_opt2] = useState();
  const [bagtype_opt3, setBagtype_opt3] = useState();

  const Choice_bag = async () => {
    const result = await api.get("/bag_choice");
    setChoicebag(result.data);
    console.log("Choice_bag", result.data);
  };
  const Choice_cell = async () => {
    const result = await api.get("/spin_choice_cell");
    setCell_choice(result.data);
    console.log("Choice_cell", result.data);
  };
  const Choice_platelet = async () => {
    const result = await api.get("/spin_choice_platelet");
    setPlatelet_choice(result.data);
    console.log("Choice_platelet", result.data);
  };
  const Choice_pasma = async () => {
    const result = await api.get("/spin_choice_pasma");
    setPasma_choice(result.data);
    console.log("Choice_pasma", result.data);
  };
  const Setting_data = async () => {
    const result = await api.get("/setting_bag");
    setSetting_data(result.data);
    console.log("Setting_data", result.data);
  };
  const initstaffname = () => {
    const userDataTemp = user.getUser();
    frmsubmit.setFieldsValue({
      staff_name: `${userDataTemp.fname}  ${userDataTemp.lname}`,
    });
  };

  const Show_1 = async () => {
    const result = await api.get("/Show_1");
    setShow_1(result.data);
    console.log("Show_1", result.data);
  };
  const Show_2 = async () => {
    const result = await api.get("/Show_2");
    setShow_2(result.data);
    console.log("Show_2", result.data);
  };

  useEffect(async () => {
    await Choice_bag();
    await Choice_pasma();
    await Choice_platelet();
    await Choice_cell();
    await initstaffname();
    await Setting_data();
    await Show_1();
    await Show_2();
  }, []);

  //--------------------------------------//

  const Clear = async () => {
    await frm_option_1.resetFields();
    await frm_option_2.resetFields();
    await frm_option_3.resetFields();
    await frm_option_4.resetFields();
    await frmsubmit.resetFields();

    await setResult_for_table();
    await setFunction_opt();
    await setBagtype_opt1();
    await setBagtype_opt2();
    await setBagtype_opt3();
  };
  //---------onfinish_option_1----------//
  const onfinish_option_1 = async (value) => {
    //const ip_init = await internalIpV4();
    console.log("onfinish_option_1--->", value);

    const result = await api.get(`/get_bagblood`, {
      params: {
        unit_no_start: `${value.set_1}${value.set_2}${value.set_3}`,
        unit_no_end: `${value.set_1}${value.set_2}${value.set_4}`,
      },
    });
    let formData = {};
    const result_for_table = result.data?.map((item) => {
      formData[item.dn] = {
        blood_type: value.blood_type,
        sep_cell: value.sep_cell,
        sep_platelet: value.sep_platelet,
        sep_plasma: value.sep_plasma,
      };
      return {
        ...item,
      };
    });
    setResult_for_table(result_for_table);
    setTimeout(() => {
      //console.log("formData", formData);
      frmsubmit.setFieldsValue(formData);
    }, 1000);
    // console.log("result", result);
  };
  console.log(">>", result_for_table);

  //---------onfinish_option_2----------//
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    const frmData = frm_option_2.getFieldsValue();
    console.log("frm_option_all", frmData);
    const regex = / \t\n|\t\n|\n|\t| /g;
    // console.log(p.replace(regex, 'ferret'));
    const key_list = frmData.key.split(regex);
    console.log(key_list);
    const result = await api.get("/Search_unit_no_by_id_list", {
      params: {
        unit_no: key_list.join(","),
      },
    });
    let formData = {};
    const setting = setting_data.find(
      (item) => item.bagcode == frmData.bag_type
    );
    const result_for_table = result.data;

    result_for_table.forEach((item) => {
      formData[item.dn] = {
        blood_type: frmData.bag_type,
        sep_cell:
          setting?.b1_typecode == null || setting?.b1_typecode == " "
            ? ""
            : setting?.b1_typecode,
        sep_platelet:
          setting?.b2_typecode == null || setting?.b2_typecode == " "
            ? ""
            : setting?.b2_typecode,
        sep_plasma:
          setting?.b3_typecode == null || setting?.b3_typecode == " "
            ? ""
            : setting?.b3_typecode,
        // sep_cell: setting?.b1_typecode,
        // sep_platelet: setting?.b2_typecode,
        // sep_plasma: setting?.b3_typecode,
      };
    });
    setResult_for_table(result_for_table);
    setTimeout(() => {
      console.log("formData", formData);
      frmsubmit.setFieldsValue(formData);
    }, 1000);
  };
  //-----End----onfinish_option_2----------//
  //---------onfinish_option_3----------//
  const onfinish_option_3 = async () => {
    const frmData = frm_option_3.getFieldsValue();
    const result = await api.get("/Search_unit_no", {
      params: {
        unit_no: frmData.unit_no,
      },
    });
    let dn = result.data[0]?.dn;
    const setting = setting_data.find(
      (item) => item.bagcode == frmData.blood_type
    );
    frmsubmit.setFieldsValue({
      [dn]: {
        blood_type: frmData.blood_type,
        sep_cell:
          setting?.b1_typecode == null || setting?.b1_typecode == " "
            ? ""
            : setting?.b1_typecode,
        sep_platelet:
          setting?.b2_typecode == null || setting?.b2_typecode == " "
            ? ""
            : setting?.b2_typecode,
        sep_plasma:
          setting?.b3_typecode == null || setting?.b3_typecode == " "
            ? ""
            : setting?.b3_typecode,
        //sep_cell: setting?.b1_typecode,
        // sep_platelet: setting?.b2_typecode,
        // sep_plasma: setting?.b3_typecode,
      },
    });
    setResult_for_table(result?.data);
    //console.log("onfinish_option_3", result.data);
  };
  //---------onfinish_option_4----------//
  const onfinish_option_4_1 = async () => {
    const result = await api.get("/Search_all_unitno");
    console.log("result**", result.data);

    setResult_for_table(result.data);

    const dataUpdate = {};
    result.data.forEach((item) => {
      dataUpdate[item.dn] = {
        blood_type: item.donor_type,
      };
      key_bag(item.dn, item.donor_type);
    });
    console.log("value---Set_auto--->", dataUpdate);
    frmsubmit.setFieldsValue({
      ...dataUpdate,
    });
  };
  const onfinish_option_4_2 = async () => {
    const frmData = frm_option_4.getFieldsValue();
    const result = await api.get("/Search_unit_no_option4_2", {
      params: {
        unit_no: frmData.choice_6,
      },
    });
    setResult_for_table(result.data);
    const dataUpdate = {};
    result.data.forEach((item) => {
      dataUpdate[item.dn] = {
        blood_type: item.donor_type,
      };
      key_bag(item.dn, item.donor_type);
    });
    console.log("value---Set_auto--->", dataUpdate);
    frmsubmit.setFieldsValue({
      ...dataUpdate,
    });
  };
  //-----End----onfinish_option_4----------//
  const key_bag = (dn, value) => {
    const setting = setting_data.find((item) => item.bagcode == value);
    frmsubmit.setFieldsValue({
      [dn]: {
        sep_cell: setting?.b1_typecode,
        sep_platelet: setting?.b2_typecode,
        sep_plasma: setting?.b3_typecode,
      },
    });
  };
  //////////////////////////////////////////////
  // //Refresh ข้อมูลปุ่มหมู่เลือด ทุก 1000=1วิ วินาที
  // useEffect(() => {
  //   setInterval(() => {
  //     fetchABO();
  //   }, 1000 * 60);
  // }, []);
  /////////////////////////////////////////////////
  const showModalPassword = () => {
    setIsModalPassword(true);
    setTimeout(() => {
      document.getElementById("pass").focus();
    }, 500);
  };

  const handleOkPassword = async () => {
    const formData = frmsubmit.getFieldsValue();
    console.log("Set_SpinData--->", formData);
    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });
    const ip = await internalIpV4();
    console.log("resultLogin", resultLogin.data);
    try {
      if (resultLogin.data.id_user) {
        const alldata = [];
        Object.keys(formData).forEach((item) => {
          console.log("item", item);
          console.log("value item", formData[item]);
          const body = {
            dn: item,
            ...formData[item],
            ip_address: ip,
            comp_name: computerName,
            staff_name: resultLogin.data.fname + " " + resultLogin.data.lname,
          };
          console.log("data-body", body);
          console.log("ip_address", ip);
          console.log("ComputerName", computerName);
          console.log(
            "staff_name",
            resultLogin.data.fname + " " + resultLogin.data.lname
          );

          // if(value.every  !== undefine && ....)  {
          alldata.push(
            api.put(`/Submit_spin_list`, {
              ...body,
            })
          );
          // }
        });
        console.log("alldata", alldata);
        //const result = await Promise.all(alldata);

        // console.log("result55555555555555", result[0].data.numAll);

        Modal.success({
          content: <div>success</div>,
        });
        setResult_for_table();
        // frmsubmit.resetFields();
      } else {
        Modal.error({
          title: "Password invalid",
          content: "กรุณากรอกรหัสผ่านให้ถูกต้อง!!",
        });
      }
      //setIsModalPassword(false);
    } catch (error) {
      Modal.error({ title: "Error", content: "!!!!!!!!!!!!!" });
    }
    setIsModalPassword(false);
  };
  const onChange_radio = (value) => {
    console.log("onChange_radio", value);
    if (value === 1) {
      frm_option_2.resetFields();
      frm_option_3.resetFields();
      frm_option_4.resetFields();
      setBagtype_opt2();
      setBagtype_opt3();
    }
    if (value === 2) {
      frm_option_1.resetFields();
      frm_option_3.resetFields();
      frm_option_4.resetFields();
      setBagtype_opt1();
      setBagtype_opt3();
    }
    if (value === 3) {
      frm_option_1.resetFields();
      frm_option_2.resetFields();
      frm_option_4.resetFields();
      setBagtype_opt1();
      setBagtype_opt2();
    }
    if (value === 4) {
      frm_option_1.resetFields();
      frm_option_2.resetFields();
      frm_option_3.resetFields();
      setBagtype_opt1();
      setBagtype_opt2();
      setBagtype_opt3();
    }
    setFunction_opt(value);
  };
  const columns = [
    {
      title: "ลำดับ",
      align: "center",
      width: "10%",
      render: (text, record, index) => {
        return <b style={{ fontSize: "12px" }}>{index + 1}</b>;
      },
    },
    {
      title: "เลขที่ถุงเลือด",
      dataIndex: "unit_no",
      key: "unit_no",
      align: "center",
      width: "18%",
      render: (text, record) => <b style={{ fontSize: "14px" }}>{text}</b>,
    },
    {
      title: "ประเภทถุงเลือด",
      dataIndex: "donor_type",
      key: "donor_type",
      align: "center",
      width: "30%",
      render: (text, record) => (
        <Form.Item
          name={[record.dn, "blood_type"]}
          noStyle
          rules={[{ required: true }]}
        >
          <Select
            size="small"
            showArrow={false}
            style={{ width: "90%", fontSize: "14px" }}
            showSearch
            // filterOption={(input, option) => {
            //   return (
            //     option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
            //   );
            // }}
            onChange={(value) => key_bag(record.dn, value)}
          >
            {choicebag?.map((item) => (
              <Option key={item.bagcode} value={item.bagcode}>
                {item.bagtype}
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
    },
    {
      title: "CELL",
      dataIndex: "",
      key: "CELL",
      align: "center",
      render: (text, record) => (
        <Form.Item
          name={[record.dn, "sep_cell"]}
          noStyle
          rules={[{ required: true }]}
        >
          <Select
            size="small"
            showArrow={false}
            style={{ width: "100px", fontSize: "14px" }}
          >
            {cell_choice?.map((item) => (
              <Option key={item.id} value={item.type_code}>
                {item.s_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
    },
    {
      title: "Platelet",
      dataIndex: "",
      key: "Platelet",
      align: "center",
      render: (text, record) => (
        <Form.Item
          name={[record.dn, "sep_platelet"]}
          noStyle
          rules={[{ required: true }]}
        >
          <Select
            size="small"
            showArrow={false}
            style={{ width: "80px", fontSize: "14px" }}
          >
            {platelet_choice?.map((item) => (
              <Option key={item.id} value={item.type_code}>
                {item.s_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
    },
    {
      title: "Plasma",
      dataIndex: "",
      key: "Plasma",
      align: "center",
      render: (text, record) => (
        <Form.Item
          name={[record.dn, "sep_plasma"]}
          noStyle
          rules={[{ required: true }]}
        >
          <Select
            size="small"
            showArrow={false}
            style={{ width: "80px", fontSize: "14px" }}
          >
            {pasma_choice?.map((item) => (
              <Option key={item.id} value={item.type_code}>
                {item.s_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
    },
  ];
  const columns2 = [
    {
      title: "ประเภท",
      dataIndex: "component_name",
      key: "component_name",
      align: "center",
      width: 25,
      fixed: "left",
      render: (text, record) => (
        <>
          <p style={{ fontSize: "11px" }}>{text}</p>
        </>
      ),
    },
    {
      title: "รหัสถุง",
      dataIndex: "type_code",
      key: "type_code",
      align: "center",
      width: 20,
      fixed: "left",
      render: (text, record) => (
        <>
          <p style={{ fontSize: "11px" }}>{text}</p>
        </>
      ),
    },

    {
      title: "ประเภทถุง",
      dataIndex: "s_name",
      key: "s_name",
      align: "center",
      width: 20,
      render: (text, record) => (
        <>
          <p style={{ fontSize: "11px" }}>{text}</p>
        </>
      ),
    },
  ];
  const columns3 = [
    {
      title: "รหัสปั่นแยก",
      dataIndex: "bagtype",
      key: "bagtype",
      width: 50,
      // align: "center",
      render: (text, record) => (
        <>
          <p style={{ fontSize: "11px", marginLeft: "10px" }}> {text}</p>
        </>
      ),
    },
  ];

  return (
    <>
      <Layout keyTab="Donor_Separates_Bloods">
        <div>
          <Head>
            <title>SIBSOFT : รายการปั่นเเยก</title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
        </div>

        <Row justify="center" style={{ marginTop: "10px" }}>
          <Col
            span={23}
            //  style={{marginRight:"38px",}}
          >
            <Card>
              <Row justify="center">
                <Col
                  span={14}
                  style={{
                    marginTop: "-14px",
                    border: "1px solid",
                    paddingLeft: "20px",
                    paddingTop: "20px",
                    borderRadius: "5px",
                    marginRight: "10px",
                  }}
                >
                  <Form.Item>
                    <Radio.Group
                      onChange={(e) => onChange_radio(e.target.value)}
                      value={function_opt}
                    >
                      <Form
                        form={frm_option_1}
                        onFinish={onfinish_option_1}
                        layout="horizontal"
                      >
                        <Row>
                          <Form.Item style={{ marginTop: "5px" }}>
                            <Radio value={1}>
                              <p style={{ fontSize: "12px" }}>
                                ปั่นแยกตั้งแต่ถุงที่
                              </p>
                            </Radio>
                          </Form.Item>

                          <Form.Item
                            name="set_1"
                            style={{ marginLeft: "-12px" }}
                          >
                            <Input
                              size="small"
                              id="ssn-1"
                              maxLength="5"
                              style={{
                                width: "63px",
                                fontSize: "14px",
                              }}
                              required
                              onChange={handleChange}
                              disabled={function_opt != 1}
                            />
                          </Form.Item>

                          <Form.Item
                            name="set_2"
                            style={{ paddingLeft: "4px" }}
                          >
                            <Input
                              size="small"
                              id="ssn-2"
                              maxLength="1"
                              style={{
                                width: "35px",
                                fontSize: "14px",
                              }}
                              required
                              onChange={handleChange}
                              disabled={function_opt != 1}
                            />
                          </Form.Item>

                          <Form.Item
                            name="set_3"
                            style={{ paddingLeft: "4px" }}
                          >
                            <Input
                              size="small"
                              id="ssn-3"
                              maxLength="5"
                              style={{
                                width: "63px",
                                fontSize: "14px",
                              }}
                              required
                              onChange={handleChange}
                              disabled={function_opt != 1}
                            />
                          </Form.Item>

                          <Form.Item
                            style={{
                              paddingLeft: "4px",
                              marginTop: "5px",
                            }}
                          >
                            <p style={{ fontSize: "12px" }}>ถึง</p>
                          </Form.Item>

                          <Form.Item
                            name="set_4"
                            style={{ paddingLeft: "4px" }}
                          >
                            <Input
                              size="small"
                              id="ssn-4"
                              maxLength="5"
                              style={{
                                width: "63px",
                                fontSize: "14px",
                              }}
                              required
                              onChange={handleChange}
                              disabled={function_opt != 1}
                            />
                          </Form.Item>

                          <Form.Item
                            name="blood_type"
                            style={{
                              width: "30%",
                              paddingLeft: "4px",
                            }}
                          >
                            <Select
                              size="small"
                              placeholder="ประเภทถุงเลือด"
                              // size="large"
                              style={{
                                width: "90%",
                                fontSize: "12px",
                              }}
                              onChange={setBagtype_opt1}
                              disabled={function_opt != 1}
                            >
                              {choicebag?.map((item) => (
                                <Option
                                  style={{
                                    width: "90%",
                                    fontSize: "12px",
                                  }}
                                  key={item.bagcode}
                                  value={item.bagcode}
                                >
                                  {item.bagtype}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Row>

                        <Row
                          style={{
                            marginTop: "-38px",
                            paddingLeft: "180px",
                          }}
                        >
                          <Col>
                            <Space>
                              <Form.Item style={{ marginTop: "12px" }}>
                                <p style={{ fontSize: "12px" }}>
                                  รหัสปั่นแยก :
                                </p>
                              </Form.Item>

                              <Form.Item style={{ marginTop: "10px" }}>
                                <p style={{ fontSize: "12px" }}>ถุง 1</p>
                              </Form.Item>

                              <Form.Item name="sep_cell">
                                <Input
                                  size="small"
                                  id="ssn-5"
                                  maxLength="1"
                                  style={{
                                    width: "30px",
                                    fontSize: "14px",
                                  }}
                                  required
                                  onChange={handleChange}
                                  disabled={!bagtype_opt1 || function_opt != 1}
                                />
                              </Form.Item>

                              <Form.Item style={{ marginTop: "10px" }}>
                                <p style={{ fontSize: "12px" }}>ถุง 2</p>
                              </Form.Item>

                              <Form.Item name="sep_platelet">
                                <Input
                                  size="small"
                                  id="ssn-6"
                                  maxLength="1"
                                  style={{
                                    width: "30px",
                                    fontSize: "14px",
                                  }}
                                  required
                                  onChange={handleChange}
                                  disabled={!bagtype_opt1 || function_opt != 1}
                                />
                              </Form.Item>

                              <Form.Item style={{ marginTop: "10px" }}>
                                <p style={{ fontSize: "12px" }}>ถุง 3</p>
                              </Form.Item>

                              <Form.Item name="sep_plasma">
                                <Input
                                  size="small"
                                  id="ssn-7"
                                  maxLength="1"
                                  style={{
                                    width: "30px",
                                    fontSize: "14px",
                                  }}
                                  required
                                  onChange={handleChange}
                                  disabled={!bagtype_opt1 || function_opt != 1}
                                />
                              </Form.Item>

                              <Form.Item>
                                <Tooltip
                                  placement="top"
                                  title="กรุณากรอกข้อมูลให้ครบถ้วยก่อน"
                                >
                                  <Button
                                    style={{ fontSize: "12px" }}
                                    type="primary"
                                    size="small"
                                    // shape="round"
                                    htmlType="submit"
                                    disabled={
                                      !bagtype_opt1 || function_opt != 1
                                    }
                                  >
                                    ปั่นแยก
                                  </Button>
                                </Tooltip>
                              </Form.Item>
                            </Space>
                          </Col>
                        </Row>
                      </Form>

                      <hr style={{ marginTop: "-25px" }} />
                      <Form form={frm_option_2}>
                        <Row style={{ marginTop: "5px" }}>
                          <Form.Item>
                            <Radio value={2}>
                              <p style={{ fontSize: "12px" }}>
                                ปั่นแยกจากชุดข้อมูลถุงเลือด
                              </p>
                            </Radio>
                          </Form.Item>
                          <Form.Item name="bag_type">
                            <Select
                              size="small"
                              placeholder="ประเภทถุงเลือด"
                              style={{ width: "190px", fontSize: "12px" }}
                              // size="large"
                              disabled={function_opt != 2}
                              onChange={setBagtype_opt2}
                            >
                              {choicebag?.map((item) => (
                                <Option key={item.bagcode} value={item.bagcode}>
                                  {item.bagtype}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                          <Modal
                            title=""
                            visible={isModalVisible}
                            style={{ top: 60 }}
                            width={300}
                            footer={false}
                            onCancel={() => {
                              setIsModalVisible(false);
                            }}
                          >
                            <Row>
                              <p style={{ fontSize: "16px" }}>ชุดข้อมูล</p>
                            </Row>
                            <Form.Item name="key">
                              <TextArea
                                rows={10}
                                style={{ fontSize: "18px" }}
                              />
                            </Form.Item>
                            <Row justify="end" style={{ marginTop: "-18px" }}>
                              <Button
                                type="primary"
                                danger
                                onClick={() => {
                                  setIsModalVisible(false);
                                }}
                                style={{ fontSize: "12px", height: "28px" }}
                              >
                                ยกเลิก
                              </Button>
                              <Button
                                icon={
                                  <FiCheckCircle
                                    style={{
                                      fontSize: "14px",
                                      marginRight: "3px",
                                      marginBottom: "-2px",
                                    }}
                                  />
                                }
                                onClick={handleOk}
                                type="primary"
                                style={{
                                  fontSize: "12px",
                                  height: "28px",
                                  marginLeft: "5px",
                                }}
                              >
                                ยืนยัน
                              </Button>
                            </Row>
                          </Modal>
                          <Form.Item style={{ paddingLeft: "10px" }}>
                            <Tooltip
                              placement="top"
                              title="กรุณาเลือกประเภทถุงเลือดก่อน"
                            >
                              <Button
                                style={{ fontSize: "12px" }}
                                size="small"
                                type="primary"
                                onClick={showModal}
                                disabled={!bagtype_opt2 || function_opt != 2}
                              >
                                วางชุดข้อมูลถุงเลือด
                              </Button>
                            </Tooltip>
                          </Form.Item>
                        </Row>
                      </Form>
                      <hr style={{ marginTop: "-20px" }} />

                      <Form form={frm_option_3}>
                        <Row style={{ marginTop: "5px" }}>
                          <Form.Item>
                            <Radio value={3}>
                              <p style={{ fontSize: "12px" }}>
                                ปั่นแยกจากประเภทถุง
                              </p>
                            </Radio>
                          </Form.Item>
                          <Form.Item
                            name="blood_type"
                            style={{ marginLeft: "-13px" }}
                          >
                            <Select
                              placeholder="ประเภทถุงเลือด"
                              style={{ width: "180px", fontSize: "12px" }}
                              size="small"
                              onChange={setBagtype_opt3}
                              disabled={function_opt != 3}
                            >
                              {choicebag?.map((item) => (
                                <Option key={item.bagcode} value={item.bagcode}>
                                  {item.bagtype}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                          <Form.Item
                            style={{
                              paddingLeft: "4px",
                              marginTop: "4px",
                            }}
                          >
                            <p style={{ fontSize: "12px" }}>เลขที่ถุง</p>
                          </Form.Item>
                          <Form.Item
                            name="unit_no"
                            style={{ width: "21%", paddingLeft: "4px" }}
                          >
                            <Input
                              style={{
                                fontSize: "14px",
                              }}
                              size="small"
                              disabled={function_opt != 3}
                              maxLength={11}
                            />
                          </Form.Item>
                          <Form.Item style={{ paddingLeft: "4px" }}>
                            <Tooltip
                              placement="top"
                              title="กรุณาเลือกประเภทถุงเลือดก่อน"
                            >
                              <Button
                                style={{
                                  fontSize: "12px",
                                  height: "28px",
                                  marginLeft: "5px",
                                  backgroundColor:
                                    !bagtype_opt3 || function_opt != 3
                                      ? ""
                                      : "#17a2b8",
                                  color:
                                    !bagtype_opt3 || function_opt != 3
                                      ? ""
                                      : "white",
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
                                size="small"
                                onClick={onfinish_option_3}
                                disabled={!bagtype_opt3 || function_opt != 3}
                              >
                                ค้นหา
                              </Button>
                            </Tooltip>
                          </Form.Item>
                        </Row>
                      </Form>

                      <hr style={{ marginTop: "-20px" }} />
                      <Form form={frm_option_4}>
                        <Row style={{ marginTop: "3px" }}>
                          <Form.Item>
                            <Radio value={4}>
                              <p style={{ fontSize: "12px" }}>ค้นหาถุงเลือด</p>
                            </Radio>
                          </Form.Item>
                          <Form.Item>
                            <Button
                              style={{ fontSize: "12px" }}
                              type="primary"
                              onClick={onfinish_option_4_1}
                              disabled={function_opt != 4}
                              size="small"
                            >
                              ค้นหาถุงเลือดทั้งหมด
                            </Button>
                          </Form.Item>

                          <Form.Item
                            style={{
                              paddingLeft: "4px",
                              marginTop: "5px",
                            }}
                          >
                            <p style={{ fontSize: "12px" }}>ค้นหาถุงเลือดที่</p>
                          </Form.Item>

                          <Form.Item
                            name="choice_6"
                            style={{ width: "25%", paddingLeft: "10px" }}
                          >
                            <Input
                              size="small"
                              style={{ fontSize: "14px" }}
                              disabled={function_opt != 4}
                              maxLength={11}
                            />
                          </Form.Item>

                          <Form.Item style={{ marginLeft: "10px" }}>
                            <Button
                              style={{
                                fontSize: "12px",
                                height: "28px",
                                marginLeft: "5px",
                                backgroundColor:
                                  function_opt != 4 ? "" : "#17a2b8",
                                color: function_opt != 4 ? "" : "white",
                              }}
                              onClick={onfinish_option_4_2}
                              disabled={function_opt != 4}
                              size="small"
                              icon={
                                <MdManageSearch
                                  style={{
                                    fontSize: "16px",
                                    marginRight: "3px",
                                    marginBottom: "-3px",
                                  }}
                                />
                              }
                            >
                              ค้นหา
                            </Button>
                          </Form.Item>
                        </Row>
                      </Form>
                    </Radio.Group>
                  </Form.Item>
                  <Row
                    style={{
                      marginLeft: "330px",
                      marginBottom: "-40px",
                      marginTop: "-40px",
                    }}
                    // justify="end"
                  >
                    <Form.Item>
                      <Button
                        icon={
                          <MdRefresh
                            style={{
                              fontSize: "16px",
                              marginRight: "3px",
                              marginBottom: "-3px",
                            }}
                          />
                        }
                        onClick={Clear}
                        style={{
                          fontSize: "12px",
                          height: "28px",
                          backgroundColor: "orange",
                          color: "white",
                        }}
                        size="small"
                      >
                        เริ่มใหม่
                      </Button>
                      &nbsp;
                      <Button
                        type="primary"
                        size="small"
                        onClick={Setting}
                        icon={
                          <SettingFilled
                            style={{
                              fontSize: "12px",
                            }}
                          />
                        }
                        style={{
                          fontSize: "12px",
                          height: "28px",
                        }}
                      >
                        ตั้งค่าการปั่นเเยก
                      </Button>
                    </Form.Item>
                  </Row>
                </Col>

                <Col span={5} style={{ marginTop: "-15px", marginLeft: "1px" }}>
                  <Table
                    // style={{ width: 215 }}
                    className="donorS donorS_Row"
                    columns={columns2}
                    dataSource={show_1}
                    pagination={false}
                    size="small"
                    style={{ border: "1px solid" }}
                    // scroll={{
                    //   y: 335,
                    // }}
                  />
                </Col>

                <Col
                  span={4}
                  style={{ marginTop: "-15px", marginLeft: "15px" }}
                >
                  <Table
                    // style={{ width: 178 }}
                    className="donorS donorS_Row "
                    columns={columns3}
                    dataSource={show_2}
                    pagination={false}
                    size="small"
                    style={{ border: "1px solid" }}
                  />
                </Col>
              </Row>

              <Row justify="center">
                <Col span={24}>
                  <Form form={frmsubmit}>
                    <Row justify="center" style={{ marginTop: "5px" }}>
                      <Tooltip
                        placement="left"
                        title={
                          !result_for_table || result_for_table.length <= 0
                            ? "กรุณาเพิ่มข้อมูล"
                            : ""
                        }
                      >
                        <Button
                          disabled={
                            !result_for_table || result_for_table.length <= 0
                          }
                          size="small"
                          onClick={showModalPassword}
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
                            backgroundColor:
                              !result_for_table || result_for_table.length <= 0
                                ? ""
                                : "#3AB0FF",
                            color:
                              !result_for_table || result_for_table.length <= 0
                                ? ""
                                : "white",
                          }}
                        >
                          บันทึกข้อมูล
                        </Button>
                      </Tooltip>
                    </Row>
                    <Row style={{ marginTop: "15px" }}>
                      <Table
                        bordered
                        className="xm"
                        columns={columns}
                        dataSource={result_for_table}
                        pagination={false}
                        size="small"
                        style={{
                          width: "100%",
                          marginTop: "-12px",
                        }}
                        scroll={{
                          y: 600,
                        }}
                      />
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Layout>

      {/* /-----------------------/ */}

      <Modal
        visible={isModalPassword}
        onOk={handleOkPassword}
        onCancel={() => {
          setIsModalPassword(false), setPassword();
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
              handleOkPassword();
            }
          }}
        />
        <Row justify="end" style={{ marginTop: "10px" }}>
          <Button
            type="primary"
            danger
            onClick={() => {
              setIsModalPassword(false), setPassword();
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
            onClick={handleOkPassword}
            disabled={!password}
          >
            ยืนยัน
          </Button>
        </Row>
      </Modal>
    </>
  );
};

export default Donor_Separates_Bloods;
//////// print_sticker
const TestPrintComponent = ({ barcode, data }) => {
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
      Test Test {barcode}
      <img src={barcodeImage} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const computerName = os.hostname();
  return {
    props: { computerName }, // will be passed to the page component as props
  };
}
