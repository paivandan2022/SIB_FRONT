import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  SafetyCertificateFilled,
} from "@ant-design/icons";

import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Spin,
  Table,
  Tabs,
  Tooltip,
  Typography,
} from "antd";
import "moment/locale/th";
import { BsDropletHalf, BsXCircleFill } from "react-icons/bs";
import { GrScorecard } from "react-icons/gr";
import { MdEditNote } from "react-icons/md";
import { VscSaveAs } from "react-icons/vsc";
// import "../../styles/Patent_blood_request_lab_type_andScreen.css";
// import Image from "next/image/";
import React, { useEffect, useState } from "react";
import { FcOk, FcPrint, FcProcess } from "react-icons/fc";
import api from "../../lib/api";
// import img from "../../public/gifloading_sibsofe.gif";
// import imgs from "../../imgs/65021029AbsI1123718.bmp";

const { TextArea } = Input;
const { Text } = Typography;
const { Column, ColumnGroup } = Table;
const { TabPane } = Tabs;
const { Option } = Select;


const Patent_blood_request_blooddetil = ({
  OrderNumber,
  showModal_showall_crossmatching_onCancel,
  Date,
}) => {
  // console.log("Date",Date);
  const [Crossmat_form] = Form.useForm();
  const [confirm_sendgroup_cross] = Form.useForm();

  const [getformDataCrossmat_form, setgetformDataCrossmat_former] = useState();
  const [edit_crossinput, setedit_crossinput] = useState(false);
  const [TypeBlood, setTypeBlood] = useState();
  const [showbloodno_Detil, setshowbloodno_Detiler] = useState([]);
  const [CountTypeBlood, setCountTypeBlood] = useState();
  const [choi_ceoss, setchoi_ceoss] = useState();
  const [Result_csmshow, setResult_csmshow] = useState();
  const [UseonEditcross, setonEditcross] = useState([]);
  const [passwordSendcrossmatchs, setPasswordSendcrossmatchs] = useState();
  const [passwordSendcrossmatchs_ungroup, setPasswordSendcrossmatchs_ungroup] =
    useState();
  const [Crossmatching_Table, setCrossmatch_Type_Data] = useState([]);
  const [isModalconfirm_cross, setIsModalconfirm_cross] = useState(false);
  const [modalkey_edti_cross, setmodalkey_edti_cross] = useState(false);

  const [GR_Alrit, setGR_Alrit] = useState(false);
  const [doctor, setDoctor] = useState();
  const [setresultcheck, Setresultchecker] = useState();

  const [Data_BRQ, setData_BRQ] = useState([]);
  const [Datap_g, setDatap_g] = useState([]);
  const [DataABS, setDataABS] = useState([]);
  const [Data_DAT_ATC, setData_DAT_ATC] = useState([]);
  const [Data_ATG, setData_ATG] = useState([]);
  const [Data_ATB, setData_ATB] = useState([]);
  const [Datafrom_ungroup, setDatafrom_ungroup] = useState();
  const [password, setPassword] = useState();
  const [edti_cross, setedti_cross] = useState(0);
  const [key_edti_cross, setkey_edti_cross] = useState();
  const [staff_edti_cross, setstaff_edti_cross] = useState();

  // const [onCancel, setonCancel] = useState(showModal_showall_crossmatching_onCancel);
  const Modal_Editcross_value_con = async (value) => {
    setmodalkey_edti_cross(true);
    // console.log("value",value);
    setkey_edti_cross(value);
    // setIsModalVisible(true);
    setTimeout(() => {
      document.getElementById("id_edit_cross").focus();
    }, 50);
  };

  const Editcross_value_con = async (value) => {
    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });
    setmodalkey_edti_cross(false);
    setPassword();
    const staff_name = resultLogin.data.user_name;
    try {
      if (resultLogin.data.id_user) {
        setedti_cross(1);
        setstaff_edti_cross(staff_name);
      } else {
        Modal.error({
          title: "Password invalid",
          content: "กรุณากรอกรหัสผ่านให้ถูกต้อง!!",
        });
      }
      setmodalkey_edti_cross(false);
    } catch (error) {
      Modal.error({
        title: "Error",
        content: "กรุณากรอกข้อมูลให้ครบถ้วน!!",
      });
      setmodalkey_edti_cross(false);
    }
  };

  const Cancel_X = async () => {
    // window.location.reload();
  };

  // useEffect(async () => {

  //  });
  useEffect(async () => {
    if (OrderNumber && Date) {
      settrue();
      setgetformDataCrossmat_former("0");
      await LoadCrossmatchTypeBlood(OrderNumber);
      await Fetch_ward();
      await fletAllchoi();
      const resultcon = await api.get("/showChexkcon_pg", {
        params: {
          NUM_BT: OrderNumber,
        },
      });
      showsetFetch_ConfirmDataPG_detil(resultcon?.data[0]);
      await LoadCrossmatch_Type_Data(OrderNumber);
      await Data_bloodrequesresult_Form(OrderNumber);
    }
    setfalse();
  }, [OrderNumber && Date]);

  const Data_bloodrequesresult_Form = async (value) => {
    const result = await api.get("/Data_bloodrequesresult", {
      params: {
        NUM_BT: value,
      },
    });

    setData_DAT_ATC(result?.data[0]);
    setDataABS(result?.data[0]);
    setDatap_g(result?.data[0]);
    setData_BRQ(result?.data[0]);
  };

  const send_cross = async () => {
    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });
    setIsModalconfirm_cross(false);
    setPassword();
    const staff_name =
      resultLogin.data.pname +
      " " +
      resultLogin.data.fname +
      " " +
      resultLogin.data.lname;
    const frmData = Crossmat_form.getFieldsValue();

    const keyLists = Object.keys(frmData);
    const results = [];

    console.log("frmData", frmData);
    keyLists.forEach((key) => {
      if (frmData[key].checkbox_CSM_TABLE == true) {
        results.push(key);
      }
    });

    const result = await api.get("/Crossmatch_TB_API", {
      params: {
        TB: OrderNumber,
      },
    });
    const keytype = [];
    const keyList = result.data[0];
    let lastType = "";
    const data = {};
    keyList.forEach((item) => {
      if (item.s_name !== lastType) {
        keytype.push({
          bl_unit_no: (
            <b style={{ fontSize: "13px", textDecoration: "underline" }}>
              {item.s_name}
            </b>
          ),
        });
        lastType = item.s_name;
      }
      keytype.push(item);
      data[item.xm_id] = {
        xm_segment: item.xm_segment,

        xm_37c: item.xm_37c,
        xm_gel: item.xm_gel,
        xm_iat: item.xm_iat,
        xm_note: item.xm_note,
        xm_result: item.xm_result,
        xm_rt: item.xm_rt,
        xm_vol: item.xm_vol,
        xm_note: item.xm_note,
        xm_id: item.xm_id,
        blood_value: item.blood_value,
        checkbox_CSM_TABLE: "",
      };
    });
    setCrossmatch_Type_Data(keytype);
    try {
      if (resultLogin.data.id_user) {
        const result = await api.put(`/con_cross`, {
          order_num: OrderNumber,
          staff: staff_name,
          xm_id: results,
        });
        // window.close();
        Modal.success({
          title: "Successful confirmation",
          content: "ยืนยันสำเร็จ",
        });

        Crossmat_form.setFieldsValue({
          ...data,
        });
        await LoadCrossmatch_Type_Data(OrderNumber);
      } else {
        Modal.error({
          title: "Password invalid",
          content: "กรุณากรอกรหัสผ่านให้ถูกต้อง!!",
        });
      }
      setIsModalconfirm_cross(false);
    } catch (error) {
      Modal.error({
        title: "Error",
        content: "กรุณากรอกข้อมูลให้ครบถ้วน!!",
      });
      setIsModalconfirm_cross(false);
    }
  };

  const send_Crossungroup = async () => {
    const resultLogin = await api.post(`/Confirm_password`, {
      password: passwordSendcrossmatchs_ungroup,
    });
    const staff_name =
      resultLogin.data.pname +
      " " +
      resultLogin.data.fname +
      " " +
      resultLogin.data.lname;

    const formDataCrossmat_form = Crossmat_form.getFieldsValue();
    // console.log("formDataCrossmat_form ::", formDataCrossmat_form);
    const result = await api.post(`/Search_bloodNO_inmodal`, {
      ...formDataCrossmat_form,
    });

    // const Result_csm = await api.get("/Data_bloodrequesresult", {
    //   params: {
    //     NUM_BT: OrderNumber,
    //   },
    // });
    // const resultcross = await api.get("/Crossmatch_API", {
    //   params: {
    //     TB: OrderNumber,
    //     Unit_no_csm: formDataCrossmat_form.Unit_no_csm,
    //   },
    // });
    // console.log("result?.data[0]",result?.data[0]);
    // console.log("Result_csm?.data[0]",Result_csm?.data[0]);
    // console.log("resultcross?.data[0]",resultcross?.data[0]);
    try {
      if (resultLogin.data.id_user) {
        const formDataCross_unGroup = confirm_sendgroup_cross.getFieldsValue();
        // console.log("ดูค่าของฟอร์มส่งอพทย์มา",formDataCross_unGroup);
        setDatafrom_ungroup(formDataCross_unGroup);
        Modal.success({
          title: "ยืนยันสำเร็จ",
          onOk: (close) => {
            close();
            setGR_Alrit(false);

            setshowbloodno_Detiler(result?.data[0]);
            // Crossmat_form.setFieldsValue({
            //   Volume_csm: result.data[0].blood_value,
            // });
            document.getElementById("Volume_csm").focus();
          },
        });

        await LoadCrossmatch_Type_Data(OrderNumber);
      } else {
        Modal.error({
          title: "Password invalid",
          content: "กรุณากรอกรหัสผ่านให้ถูกต้อง!!",
        });
        setPasswordSendcrossmatchs_ungroup();
      }
    } catch (error) {
      Modal.error({ title: "Error", content: "!!!!!!!!!!!!!!!!!!!" });
    }
  };
  const handleOkGR_Alrit = () => {
    setGR_Alrit(false);
  };

  const handleCanceGR_Alritl = () => {
    setGR_Alrit(false);
    setshowbloodno_Detiler([]);
    setCountTypeBlood();
    Crossmat_form.resetFields();
    // document.getElementById("Unit_no_csm").focus();
    setgetformDataCrossmat_former("0");
  };
  const ward_next = async () => {
    document.getElementById("Note").focus();
  };
  const [ward, setWard] = useState([]);
  const Fetch_ward = async () => {
    const result = await api.get("/ward");
    setWard(result.data[0]);
  };
  const [spin, setspin] = useState(true);
  const showModal_firm_cross = () => {
    if (setresultcheck === null) {
    } else {
      setIsModalconfirm_cross(true);
      setTimeout(() => {
        document.getElementById("passcross_xm_id").focus();
      }, 50);
    }
  };
  const settrue = () => {
    setspin(true);
  };
  const setfalse = () => {
    setspin(false);
  };

  const [showFetch_ConfirmDataPG_detil, showsetFetch_ConfirmDataPG_detil] =
    useState([]);
  const showFetch_ConfirmDataPG_detils = async (value) => {
    const result = await api.get("/showChexkcon_pg", {
      params: {
        NUM_BT: value,
      },
    });

    showsetFetch_ConfirmDataPG_detil(result?.data[0]);
  };

  const sendUp_Crossmatch = async (record, value, type) => {
    console.log("type", type);

    const formData = Crossmat_form.getFieldsValue();
    // console.log("formData", formData);
    // console.log("formDatass", formData[record]);
    // console.log("formData", formData[record].xm_37c);
    // console.log("staff_edti_cross", staff_edti_cross);
    const result = await api.get(`/UP_Crossmatch`, {
      params: {
        // ... formData[record],
        xm_id: record,
        xm_37c:
          formData[record].xm_37c === undefined ? "" : formData[record].xm_37c,
        xm_gel:
          formData[record].xm_gel === undefined ? "" : formData[record].xm_gel,
        xm_iat:
          formData[record].xm_iat === undefined ? "" : formData[record].xm_iat,
        xm_note:
          formData[record].xm_note === undefined
            ? ""
            : formData[record].xm_note,
        xm_result:
          formData[record].xm_result === undefined
            ? ""
            : formData[record].xm_result,
        xm_rt:
          formData[record].xm_rt === undefined ? "" : formData[record].xm_rt,
        xm_segment:
          formData[record].xm_segment === undefined
            ? ""
            : formData[record].xm_segment,
        xm_vol:
          formData[record].xm_vol === undefined ? "" : formData[record].xm_vol ,
        blood_value :  formData[record].blood_value === undefined ? "" : formData[record].blood_value,

          
        staff: staff_edti_cross === undefined ? "" : staff_edti_cross,
        blood_no: value,
        type: type,
      },
    });

    setshowbloodno_Detiler([]);
    setCountTypeBlood();
    Crossmat_form.resetFields();
    setgetformDataCrossmat_former("0");
    setPasswordSendcrossmatchs();
    setedit_crossinput(false);
    setonEditcross([]);
    await LoadCrossmatch_Type_Data(OrderNumber);
    setedti_cross(0);
    setstaff_edti_cross();
  };
  const LoadCrossmatch_Type_Data = async (value) => {
    const result = await api.get("/Crossmatch_TB_API", {
      params: {
        TB: value,
      },
    });

    const keytype = [];
    const keyList = result.data[0];
    let lastType = "";
    const data = {};
    keyList.forEach((item) => {
      if (item.s_name !== lastType) {
        keytype.push({
          bl_unit_no: (
            <b style={{ fontSize: "13px", textDecoration: "underline" }}>
              {item.s_name}
            </b>
          ),
        });
        lastType = item.s_name;
      }
      keytype.push(item);
      data[item.xm_id] = {
        xm_segment: item.xm_segment,
        xm_37c: item.xm_37c,
        xm_gel: item.xm_gel,
        xm_iat: item.xm_iat,
        xm_note: item.xm_note,
        xm_result: item.xm_result,
        xm_rt: item.xm_rt,
        xm_vol: item.xm_vol,
        xm_note: item.xm_note,
        xm_id: item.xm_id,
        blood_value: item.blood_value,
        checkbox_CSM_TABLE: "",
      };
    });
    setCrossmatch_Type_Data(keytype);
    Crossmat_form.setFieldsValue({
      ...data,
    });
  };
  const columns = [
    {
      title: "",
      // dataIndex:"checkbox_CSM_TABLE",
      key: "checkbox_CSM_TABLE",
      align: "center",
      fixed: "left",
      width: "2%",
      // className:"Crossmatch_11",
      render: (text, record) => {
        return (
          <div>
            {record.xm_status_name && (
              // <Form.Item
              //   label=""
              //   // name="checkbox_CSM_TABLE"
              //   name={[record.xm_id, "checkbox_CSM_TABLE"]}
              //   style={{
              //     marginTop: "-15px",
              //     marginBottom: "-14px",
              //     marginLeft: "0.5px",
              //   }}
              // >
              //   <Checkbox value="1" defaultValue={1}></Checkbox>
              // </Form.Item>
              <Form.Item
                label=""
                name={[record.xm_id, "checkbox_CSM_TABLE"]}
                style={{
                  marginTop: "-15px",
                  marginBottom: "-14px",
                  marginLeft: "0.5px",
                }}
                valuePropName="checked"
                align="center"
              >
                <Checkbox
                  style={{
                    width: "100%",
                  }}
                  //  onChange={setResultATB}
                />
              </Form.Item>
            )}
          </div>
        );
      },
    },
    {
      title: "สถานะ",
      dataIndex: "xm_status_name",
      key: "xm_status_name",
      align: "center",
      fixed: "left",
      width: "6%",
      // className:"Crossmatchhover"
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: "",
      dataIndex: "xm_confirm",
      key: "xm_confirm",
      align: "center",
      fixed: "left",
      width: "2%",
      render: (text, record) => (
        <div>
          {text === "Y" ? (
            <p
              style={{
                marginBottom: "-10px",
                marginTop: "-3px",
              }}
            >
              {record.xm_status_name && <FcOk size={"20px"} />}
            </p>
          ) : (
            <p
              style={{
                marginBottom: "-10px",
                marginTop: "-3px",
              }}
            >
              {record.xm_status_name && <FcProcess size={"20px"} />}
            </p>
          )}
        </div>
      ),
    },

    {
      title: "",
      // dataIndex:"BT1_CSM_TABLE",
      key: "BT1_CSM_TABLE",
      align: "center",
      fixed: "left",
      width: "2%",
      render: (text, record) => {
        return (
          <div>
            {record.xm_status_name && (
              <Tooltip title="พิมพ์">
                <p
                  className="pointer"
                  style={{
                    marginBottom: "-8px",
                    marginTop: "-3px",
                  }}
                >
                  <FcPrint size={"20px"} />
                </p>
              </Tooltip>
            )}
          </div>
        );
      },
    },
    {
      title: "",
      // dataIndex:"BT1_CSM_TABLE",
      key: "BT1_CSM_TABLE",
      align: "center",
      fixed: "left",
      width: "2%",
      render: (text, record) => {
        return (
          <div>
            {record.xm_status_name && (
              <Tooltip title="แก้ไข">
                <p
                  onClick={() => Modal_Editcross_value_con(record.xm_id)}
                  className="pointer"
                  style={{
                    marginBottom: "-8px",
                    marginTop: "-3px",
                  }}
                >
                  <MdEditNote size={"20px"} />
                </p>
              </Tooltip>
            )}
          </div>
        );
      },
    },
    {
      title: "",
      // dataIndex:"BT1_CSM_TABLE",
      key: "BT1_CSM_TABLE",
      align: "center",
      fixed: "left",
      width: "2%",
      render: (text, record) => {
        return (
          <div>
            {record.xm_status_name && (
              <Tooltip title="Gel">
                <p
                  className="pointer"
                  style={{
                    marginBottom: "-8px",
                    marginTop: "-3px",
                  }}
                >
                  <GrScorecard size={"20px"} />
                </p>
              </Tooltip>
            )}
          </div>
        );
      },
    },

    {
      title: "Unit no.",
      dataIndex: "bl_unit_no",
      key: "bl_unit_no",
      fixed: "left",
      width: "9%",
      align: "center",
      render: (text, record) => <div>{text}</div>,
    },
    {
      title: "EXP",
      dataIndex: "exp",
      key: "exp",
      align: "center",
      width: "6%",
    },

    {
      title: "Segment",
      dataIndex: "xm_segment",
      key: "xm_segment",
      align: "center",
      width: "7%",
      render: (_, record, index, text) => (
        <div>
          {record.xm_confirm == "" ? (
            <Form.Item
              name={[record.xm_id, "xm_segment"]}
              className="fromitem-fromtable-type_sc"
              style={{ width: "100%", height: "1px", marginTop: "-6.65px" }}
            >
              <Input
                // placeholder={record.xm_segment}
                size="small"
                id={["xm_segment", index]}
                // value={record.xm_segment}
                className="Input-fromitem-fromtable-type_sc"
                onKeyDown={({ target: { value }, keyCode }) => {
                  if (keyCode === 13) {
                    // 13 คือ enter
                    //sendUp_Crossmatch(record, index);
                  }
                }}
                style={{ height: "24px", fontSize: "12px" }}
              />
            </Form.Item>
          ) : edti_cross == "1" &&
            record.xm_confirm == "Y" &&
            key_edti_cross == record.xm_id ? (
            <Form.Item
              name={[record.xm_id, "xm_segment"]}
              className="fromitem-fromtable-type_sc"
              style={{ width: "100%", height: "1px", marginTop: "-6.65px" }}
            >
              <Input
                // placeholder={record.xm_segment}
                size="small"
                id={["xm_segment", index]}
                // value={record.xm_segment}
                className="Input-fromitem-fromtable-type_sc"
                onKeyDown={({ target: { value }, keyCode }) => {
                  if (keyCode === 13) {
                    // 13 คือ enter
                    //sendUp_Crossmatch(record, index);
                  }
                }}
                style={{ height: "24px", fontSize: "12px" }}
              />
            </Form.Item>
          ) : record.xm_confirm == "Y" ? (
            <span style={{ fontSize: "11px" }}>{record.xm_segment}</span>
          ) : (
            ""
          )}
        </div>
      ),
    },
    {
      title: "Gr",
      dataIndex: "GR",
      key: "GR",
      align: "center",
      width: "3%",
      // render: (text, record) => <div>ABwD</div>,
    },
    {
      title: "ml",
      dataIndex: "xm_vol",
      key: "xm_vol",
      align: "center",
      width: "3.5%",
      render: (_, record, index, text) => (
        <div>
          {record.xm_confirm == "" ? (
            record.xm_vol == "" ? (
              <Form.Item
                name={[record.xm_id, "blood_value"]}
                className="fromitem-fromtable-type_sc"
                style={{ width: "100%", height: "1px", marginTop: "-6.65px" }}
              >
                <Input
                  size="small"
                  id={["blood_value", index]}
                  className="Input-fromitem-fromtable-type_sc"
                  onKeyDown={({ target: { value }, keyCode }) => {
                    if (keyCode === 13) {
                      // 13 คือ enter
                      //sendUp_Crossmatch(record, index);
                    }
                  }}
                  style={{ height: "24px", fontSize: "12px" }}
                />
              </Form.Item>
            ) : (
              <Form.Item
                name={[record.xm_id, "xm_vol"]}
                className="fromitem-fromtable-type_sc"
                style={{ width: "100%", height: "1px", marginTop: "-6.65px" }}
              >
                <Input
                  size="small"
                  id={["xm_vol", index]}
                  className="Input-fromitem-fromtable-type_sc"
                  onKeyDown={({ target: { value }, keyCode }) => {
                    if (keyCode === 13) {
                      // 13 คือ enter
                      //sendUp_Crossmatch(record, index);
                    }
                  }}
                  style={{ height: "24px", fontSize: "12px" }}
                />
              </Form.Item>
            )
          ) : edti_cross == "1" &&
            record.xm_confirm == "Y" &&
            key_edti_cross == record.xm_id ? (
            record.xm_vol == "" ? (
              <Form.Item
                name={[record.xm_id, "blood_value"]}
                className="fromitem-fromtable-type_sc"
                style={{ width: "100%", height: "1px", marginTop: "-6.65px" }}
              >
                <Input
                  size="small"
                  id={["blood_value", index]}
                  className="Input-fromitem-fromtable-type_sc"
                  onKeyDown={({ target: { value }, keyCode }) => {
                    if (keyCode === 13) {
                      // 13 คือ enter
                      //sendUp_Crossmatch(record, index);
                    }
                  }}
                  style={{ height: "24px", fontSize: "12px" }}
                />
              </Form.Item>
            ) : (
              <Form.Item
                name={[record.xm_id, "xm_vol"]}
                className="fromitem-fromtable-type_sc"
                style={{ width: "100%", height: "1px", marginTop: "-6.65px" }}
              >
                <Input
                  size="small"
                  id={["xm_vol", index]}
                  className="Input-fromitem-fromtable-type_sc"
                  onKeyDown={({ target: { value }, keyCode }) => {
                    if (keyCode === 13) {
                      // 13 คือ enter
                      //sendUp_Crossmatch(record, index);
                    }
                  }}
                  style={{ height: "24px", fontSize: "12px" }}
                />
              </Form.Item>
            )
          ) : record.xm_confirm == "Y" ? (
            <span style={{ fontSize: "11px" }}>{record.xm_vol}</span>
          ) : (
            ""
          )}
        </div>
      ),
    },
    {
      title: "RT",
      dataIndex: "xm_rt",
      key: "xm_rt",
      align: "center",
      width: "5.5%",
      render: (_, record, index, text) => (
        <div>
          {record.xm_confirm == "" ? (
            <Form.Item
              label=""
              name={[record.xm_id, "xm_rt"]}
              style={{ width: "100%", height: "1px", marginTop: "-6px" }}
            >
              <Select
                showArrow={false}
                dropdownMatchSelectWidth={false}
                placement={placement}
                className="select_crossmatch"
                //name={[record.xm_id,
                size="small"
                // placeholder="RT"
              >
                {choi_ceoss?.map((item) => (
                  <Option key={item.name} value={item.name}>
                    <b style={{ fontSize: "11px" }}>{item.name}</b>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ) : edti_cross == "1" &&
            record.xm_confirm == "Y" &&
            key_edti_cross == record.xm_id ? (
            <Form.Item
              label=""
              name={[record.xm_id, "xm_rt"]}
              style={{ width: "100%", height: "1px", marginTop: "-6px" }}
            >
              <Select
                showArrow={false}
                dropdownMatchSelectWidth={false}
                placement={placement}
                className="select_crossmatch"
                //name={[record.xm_id,
                size="small"
                // placeholder="RT"
              >
                {choi_ceoss?.map((item) => (
                  <Option key={item.name} value={item.name}>
                    <b style={{ fontSize: "11px" }}>{item.name}</b>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ) : record.xm_confirm == "Y" ? (
            <span style={{ fontSize: "11px" }}>{record.xm_rt}</span>
          ) : (
            ""
          )}
        </div>
      ),
    },
    {
      title: "37 ํC",
      dataIndex: "xm_37c",
      key: "xm_37c",
      align: "center",
      width: "5.5%",
      render: (_, record, index, text) => (
        <div>
          {record.xm_confirm == "" ? (
            <Form.Item
              label=""
              name={[record.xm_id, "xm_37c"]}
              style={{ width: "100%", height: "1px", marginTop: "-6px" }}
            >
              <Select
                showArrow={false}
                dropdownMatchSelectWidth={false}
                placement={placement}
                className="select_crossmatch"
                // onChange={detil_next}
                size="small"
                // placeholder="37 ํC"
              >
                {choi_ceoss?.map((item) => (
                  <Option key={item.name} value={item.name}>
                    <b style={{ fontSize: "11px" }}>{item.name}</b>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ) : edti_cross == "1" &&
            record.xm_confirm == "Y" &&
            key_edti_cross == record.xm_id ? (
            <Form.Item
              label=""
              name={[record.xm_id, "xm_37c"]}
              style={{ width: "100%", height: "1px", marginTop: "-6px" }}
            >
              <Select
                showArrow={false}
                dropdownMatchSelectWidth={false}
                placement={placement}
                className="select_crossmatch"
                // onChange={detil_next}
                size="small"
                // placeholder="37 ํC"
              >
                {choi_ceoss?.map((item) => (
                  <Option key={item.name} value={item.name}>
                    <b style={{ fontSize: "11px" }}>{item.name}</b>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ) : record.xm_confirm == "Y" ? (
            <span style={{ fontSize: "11px" }}>{record.xm_37c}</span>
          ) : (
            ""
          )}
        </div>
      ),
    },
    {
      title: "IAT",
      dataIndex: "xm_iat",
      key: "xm_iat",
      align: "center",
      width: "5.5%",
      render: (_, record, index, text) => (
        <div>
          {record.xm_confirm == "" ? (
            <Form.Item
              label=""
              name={[record.xm_id, "xm_iat"]}
              style={{ width: "100%", height: "1px", marginTop: "-6px" }}
            >
              <Select
                showArrow={false}
                dropdownMatchSelectWidth={false}
                placement={placement}
                className="select_crossmatch"
                // onChange={detil_next}
                size="small"
                // placeholder="IAT"
              >
                {choi_ceoss?.map((item) => (
                  <Option key={item.name} value={item.name}>
                    <b style={{ fontSize: "11px" }}>{item.name}</b>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ) : edti_cross == "1" &&
            record.xm_confirm == "Y" &&
            key_edti_cross == record.xm_id ? (
            <Form.Item
              label=""
              name={[record.xm_id, "xm_iat"]}
              style={{ width: "100%", height: "1px", marginTop: "-6px" }}
            >
              <Select
                showArrow={false}
                dropdownMatchSelectWidth={false}
                placement={placement}
                className="select_crossmatch"
                // onChange={detil_next}
                size="small"
                // placeholder="IAT"
              >
                {choi_ceoss?.map((item) => (
                  <Option key={item.name} value={item.name}>
                    <b style={{ fontSize: "11px" }}>{item.name}</b>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ) : record.xm_confirm == "Y" ? (
            <span style={{ fontSize: "11px" }}>{record.xm_iat}</span>
          ) : (
            ""
          )}
        </div>
      ),
    },
    {
      title: "Gel",
      dataIndex: "xm_gel",
      key: "xm_gel",
      align: "center",
      width: "5.5%",
      render: (_, record, index, text) => (
        <div>
          {record.xm_confirm == "" ? (
            <Form.Item
              label=""
              name={[record.xm_id, "xm_gel"]}
              style={{ width: "100%", height: "1px", marginTop: "-6px" }}
            >
              <Select
                showArrow={false}
                dropdownMatchSelectWidth={false}
                placement={placement}
                className="select_crossmatch"
                // onChange={detil_next}
                size="small"
                // placeholder="Gel"
              >
                {choi_ceoss?.map((item) => (
                  <Option key={item.name} value={item.name}>
                    <b style={{ fontSize: "11px" }}>{item.name}</b>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ) : edti_cross == "1" &&
            record.xm_confirm == "Y" &&
            key_edti_cross == record.xm_id ? (
            <Form.Item
              label=""
              name={[record.xm_id, "xm_gel"]}
              style={{ width: "100%", height: "1px", marginTop: "-6px" }}
            >
              <Select
                showArrow={false}
                dropdownMatchSelectWidth={false}
                placement={placement}
                className="select_crossmatch"
                // onChange={detil_next}
                size="small"
                // placeholder="Gel"
              >
                {choi_ceoss?.map((item) => (
                  <Option key={item.name} value={item.name}>
                    <b style={{ fontSize: "11px" }}>{item.name}</b>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ) : record.xm_confirm == "Y" ? (
            <span style={{ fontSize: "11px" }}>{record.xm_gel}</span>
          ) : (
            ""
          )}
        </div>
      ),
    },
    {
      title: "Result",
      dataIndex: "xm_result",
      key: "xm_result",
      align: "center",
      width: "8.5%",
      render: (_, record, index, text) => (
        <div>
          {record.xm_confirm == "" ? (
            <Form.Item
              label=""
              name={[record.xm_id, "xm_result"]}
              style={{ width: "100%", height: "1px", marginTop: "-6px" }}
            >
              <Select
                showArrow={false}
                dropdownMatchSelectWidth={false}
                placement={placement}
                className="select_crossmatch"
                // onChange={detil_next}
                size="small"
                // placeholder="Result"
              >
                {Result_csmshow?.map((item) => (
                  <Option key={item.name} value={item.name}>
                    <b style={{ fontSize: "11px" }}>{item.name}</b>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ) : edti_cross == "1" &&
            record.xm_confirm == "Y" &&
            key_edti_cross == record.xm_id ? (
            <Form.Item
              label=""
              name={[record.xm_id, "xm_result"]}
              style={{ width: "100%", height: "1px", marginTop: "-6px" }}
            >
              <Select
                showArrow={false}
                dropdownMatchSelectWidth={false}
                placement={placement}
                className="select_crossmatch"
                // onChange={detil_next}
                size="small"
                // placeholder="Result"
              >
                {Result_csmshow?.map((item) => (
                  <Option key={item.name} value={item.name}>
                    <b style={{ fontSize: "11px" }}>{item.name}</b>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ) : record.xm_confirm == "Y" ? (
            <span style={{ fontSize: "11px" }}>{record.xm_result}</span>
          ) : (
            ""
          )}
        </div>
      ),
    },
    {
      title: "",
      // dataIndex:"BT1_CSM_TABLE",
      key: "",
      align: "center",
      fixed: "left",
      width: "2%",
      render: (text, record) => {
        return (
          <div>
            {record.xm_confirm == "" ? (
              <Tooltip title="บันทึกข้อมูล">
                <p
                  onClick={() =>
                    sendUp_Crossmatch(
                      record.xm_id,
                      record.blood_no,
                      record.id_blood_ty
                    )
                  }
                  className="pointer"
                  style={{
                    marginBottom: "-8px",
                    marginTop: "-3px",
                  }}
                >
                  <VscSaveAs size={"20px"} />
                </p>
              </Tooltip>
            ) : edti_cross == "1" &&
              record.xm_confirm == "Y" &&
              key_edti_cross == record.xm_id ? (
              <Tooltip title="บันทึกข้อมูล">
                <p
                  onClick={() =>
                    sendUp_Crossmatch(
                      record.xm_id,
                      record.blood_no,
                      record.id_blood_ty
                    )
                  }
                  className="pointer"
                  style={{
                    marginBottom: "-8px",
                    marginTop: "-3px",
                  }}
                >
                  <VscSaveAs size={"20px"} />
                </p>
              </Tooltip>
            ) : record.xm_confirm == "Y" ? (
              ""
            ) : (
              ""
            )}
          </div>
        );
      },
    },
    {
      title: "Staff XM",
      dataIndex: "xm_staft",
      key: "xm_staft",
      align: "center",
      width: "4%",
    },
    {
      title: "Date XM",
      dataIndex: "xm_date_time",
      key: "xm_date_time",
      align: "center",
      width: "10%",
    },
    {
      title: "หมายเหตุ",
      dataIndex: "xm_note",
      key: "xm_note",
      width: "9%",
      align: "center",
      render: (_, record, index, text) => (
        <div>
          {record.xm_confirm == "" ? (
            <Form.Item
              name={[record.xm_id, "xm_note"]}
              className="fromitem-fromtable-type_sc"
              style={{ width: "100%", height: "1px", marginTop: "-9px" }}
            >
              <Input
                size="small"
                id={["xm_note", index]}
                className="Input-fromitem-fromtable-type_sc"
                onKeyDown={({ target: { value }, keyCode }) => {
                  if (keyCode === 13) {
                    // 13 คือ enter
                    //sendUp_Crossmatch(record, index);
                  }
                }}
                style={{ height: "20px", fontSize: "12px" }}
              />
            </Form.Item>
          ) : edti_cross == "1" &&
            record.xm_confirm == "Y" &&
            key_edti_cross == record.xm_id ? (
            <Form.Item
              name={[record.xm_id, "xm_note"]}
              className="fromitem-fromtable-type_sc"
              style={{ width: "100%", height: "1px", marginTop: "-9px" }}
            >
              <Input
                size="small"
                id={["xm_note", index]}
                className="Input-fromitem-fromtable-type_sc"
                onKeyDown={({ target: { value }, keyCode }) => {
                  if (keyCode === 13) {
                    // 13 คือ enter
                    //sendUp_Crossmatch(record, index);
                  }
                }}
                style={{ height: "20px", fontSize: "12px" }}
              />
            </Form.Item>
          ) : record.xm_confirm == "Y" ? (
            <span style={{ fontSize: "11px" }}>{record.xm_note}</span>
          ) : (
            ""
          )}
        </div>
      ),
    },
  ];

  const fletAllchoi = async () => {
    const result2 = await api.get("/Choiciall");
    setchoi_ceoss(result2.data[0]);
    const result5 = await api.get("/Crossmatching_Result");
    setResult_csmshow(result5.data[0]);
    const result6 = await api.get("/doctor");
    setDoctor(result6.data[0]);
  };

  const LoadCrossmatchTypeBlood = async (value) => {
    const result = await api.get("/TypeBlood_API", {
      params: {
        pid: value,
      },
    });
    setTypeBlood(result.data[0]);
  };

  const [placement, SetPlacement] = React.useState("bottomLeft");

  return (
    <Spin
      className="Loadstyle"
      tip="Loading..."
      spinning={spin}
      // indicator={antIcon}
      size="large"
      delay={0}
    >
      <div style={{ backgroundColor: "#ffffff" }}>
        <Row justify="center">
          <Row justify="center">
            <Col span={24} style={{ marginBottom: "5px" }}>
              <b style={{ fontSize: "20px" }}>Crossmatch</b>
            </Col>
          </Row>
          <Col span={24}>
            <Form
              form={Crossmat_form}
              initialValues={{
                xm_segment: "",
                xm_vol: "",
                xm_rt: "",
                xm_37c: "",
                xm_iat: "",
                xm_gel: "",
                xm_result: "",
                Unit_no_csm: "",
                Volume_csm: "",
                xm_note: "",
              }}
            >
              <Row>
                <Col
                  span={24}
                  // style={{ marginLeft: "-2px", marginTop: "-40px" }}
                >
                  <Table
                    dataSource={Crossmatching_Table}
                    columns={columns}
                    pagination={false}
                    bordered
                    size="small"
                    width="100%"
                    rowClassName={(record, index) => {
                      // return index % 2 === 0 ? "Crossmatchhover" : "";

                      return record.xm_status_name === "ปลดเลือด" ||
                        record.xm_status_name === "คืนเลือด" ||
                        (record.b_exp <= "0" &&
                          record.xm_status_name === "crossmatch")
                        ? "Crossmatchhover "
                        : " ";
                    }}
                    className="Crossmatch"
                    scroll={{
                      // x: 1700,
                      y: "62vh",
                    }}
                  ></Table>
                </Col>
              </Row>
              <Row justify="center" style={{ marginTop: "15px" }}>
                <Tooltip title="confirm">
                  <Button
                    style={{
                      border: "1px solid",
                      backgroundColor: "orange",
                    }}
                    type="primary"
                    // shape="round"

                    icon={<SafetyCertificateFilled style={{ color: "#fff" }} />}
                    onClick={showModal_firm_cross}
                  >
                    <span style={{ fontSize: "12px" }}>
                      {" "}
                      confirm Crossmatch
                    </span>
                  </Button>
                </Tooltip>
                <Tooltip title="ยกเลิก">
                  <Button
                    type="danger"
                    // shape="round"
                    // icon={<SaveFilled style={{ color: "#fff" }} />}

                    onClick={showModal_showall_crossmatching_onCancel}
                    style={{
                      paddingRight: "70px",
                      paddingLeft: "70px",
                      border: "1px solid",
                    }}
                  >
                    <span style={{ fontSize: "12px" }}>ยกเลิก</span>
                  </Button>
                </Tooltip>
              </Row>
            </Form>
          </Col>
        </Row>

        <Modal
          title=""
          visible={GR_Alrit}
          // onOk={handleOkGR_Alrit}
          // onCancel={handleCanceGR_Alritl}
          className="Modalwarning_conGR"
          footer={false}
        >
          <Row justify="start">
            <b style={{ fontSize: "24px" }}>ยืนยันการใช้เลือด</b>
          </Row>
          <Form form={confirm_sendgroup_cross}>
            <Row justify="center">
              <Col span={20}>
                <Row style={{ marginTop: "5px" }}>
                  <Form.Item
                    label="ชื่อแพทย์"
                    name="doctor_name"
                    style={{ width: "100%" }}
                  >
                    <Select
                      showSearch
                      showArrow={false}
                      dropdownMatchSelectWidth={false}
                      placement={placement}
                      style={{ width: "100%" }}
                      placeholder="ชื่อแพทย์"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {doctor?.map((item) => (
                        <Option key={item.code} value={item.code}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Row>
                <Row style={{ marginTop: "-20px" }}>
                  <Col span={24}>
                    <Form.Item
                      name="ward"
                      label="ward"
                      style={{ marginLeft: "17px" }}
                      //rules={[{ required: true }]}
                    >
                      <Select
                        onChange={ward_next}
                        showArrow={false}
                        dropdownMatchSelectWidth={false}
                        placement={placement}
                        placeholder="เลือกward"
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        style={{
                          width: "100%",
                          fontSize: "14px",
                          height: "32px",
                        }}
                      >
                        {ward?.map((item) => (
                          <Option key={item.ward} value={item.ward}>
                            {item.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="start">
                  <Col span={24}>
                    <Form.Item
                      label="Note"
                      name="note"
                      style={{ marginTop: "-20px", marginLeft: "17px" }}
                    >
                      <Input
                        id="Note"
                        placeholder="Note"
                        style={{ width: "100%" }}
                        onKeyDown={({ target: { value }, keyCode }) => {
                          if (keyCode === 13) {
                            // 13 คือ enter
                            pass_ungroup_next();
                          }
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="start">
                  <Col span={24}>
                    <Form.Item
                      label="Pass"
                      name=""
                      style={{ marginTop: "-20px", marginLeft: "20px" }}
                    >
                      {" "}
                      {/* <Input style={{ width: "90px" }} /> */}
                      <Input.Password
                        id="Pcrossmatch_un"
                        placeholder="กรุณากรอกรหัสผ่าน"
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                        style={{ width: "100%" }}
                        value={passwordSendcrossmatchs}
                        onChange={(e) =>
                          setPasswordSendcrossmatchs_ungroup(e.target.value)
                        }
                        onKeyDown={({ target: { value }, keyCode }) => {
                          if (keyCode === 13) {
                            // 13 คือ enter
                            send_Crossungroup();
                          }
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="center" style={{ marginTop: "10px" }}>
                  <Tooltip title="บันทึก">
                    <Button
                      style={{ border: "1px solid", backgroundColor: "green" }}
                      type="primary"
                      shape="round"
                      icon={<BsDropletHalf style={{ color: "#fff" }} />}
                      onClick={send_Crossungroup}
                    >
                      &nbsp;&nbsp;ยืนยันการจ่ายเลือด
                    </Button>
                  </Tooltip>{" "}
                  &nbsp;&nbsp;
                  <Tooltip title="ยกเลิก">
                    <Button
                      style={{ border: "1px solid", backgroundColor: "red" }}
                      type="primary"
                      shape="round"
                      icon={<BsXCircleFill style={{ color: "#fff" }} />}
                      onClick={handleCanceGR_Alritl}
                    >
                      &nbsp;&nbsp;ยกเลิก
                    </Button>
                  </Tooltip>{" "}
                </Row>
              </Col>
            </Row>
          </Form>
        </Modal>

        {/* --------------edit crosss------------------- */}
        <Modal
          // title="ยืนยันรหัสผ่าน"
          visible={modalkey_edti_cross}
          onOk={Editcross_value_con}
          onCancel={() => {
            setmodalkey_edti_cross(false), setPassword();
          }}
          okButtonProps={{
            disabled: !password,
          }}
          // okText="ยืนยัน"
          // cancelText="ยกเลิก"
          width={250}
          footer={false}
        >
          <Row>
            <h style={{ fontSize: "14px" }}>ยืนยันรหัสผ่าน</h>
          </Row>
          <Input.Password
            id="id_edit_cross"
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
                Editcross_value_con();
              }
            }}
          />
          <Row justify="end" style={{ marginTop: "10px" }}>
            <Button
              type="primary"
              danger
              onClick={() => {
                setmodalkey_edti_cross(false), setPassword();
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
              onClick={Editcross_value_con}
              disabled={!password}
            >
              ยืนยัน
            </Button>
          </Row>
        </Modal>
        {/* ------------------------ */}
        {/* --------------confirm crosss------------------- */}
        <Modal
          // title="ยืนยันรหัสผ่าน"
          visible={isModalconfirm_cross}
          onOk={send_cross}
          onCancel={() => {
            setIsModalconfirm_cross(false), setPassword();
          }}
          okButtonProps={{
            disabled: !password,
          }}
          // okText="ยืนยัน"
          // cancelText="ยกเลิก"
          width={250}
          footer={false}
        >
          <Row>
            <h style={{ fontSize: "14px" }}>ยืนยันรหัสผ่าน</h>
          </Row>
          <Input.Password
            id="passcross_xm_id"
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
                send_cross();
              }
            }}
          />
          <Row justify="end" style={{ marginTop: "10px" }}>
            <Button
              type="primary"
              danger
              onClick={() => {
                setIsModalconfirm_cross(false), setPassword();
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
              onClick={send_cross}
              disabled={!password}
            >
              ยืนยัน
            </Button>
          </Row>
        </Modal>
        {/* ------------------------ */}
      </div>
    </Spin>
  );
};
export default Patent_blood_request_blooddetil;
