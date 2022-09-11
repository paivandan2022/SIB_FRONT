import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  RetweetOutlined,
  SafetyCertificateFilled,
  SaveFilled,
} from "@ant-design/icons";
import {
  // Avatar,
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Spin,
  Table,
  Tabs,
  Tooltip,
  Typography,
} from "antd";
import moment from "moment";
import "moment/locale/th";

import { GrScorecard } from "react-icons/gr";
import env from "../../env.json";
// import "../../styles/Patent_blood_request_lab_type_andScreen.css";
// import Image from "next/image/";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import api from "../../lib/api";
// import img from "../../public/gifloading_sibsofe.gif";
// import imgs from "../../imgs/65021029AbsI1123718.bmp";

const { TextArea } = Input;
const { Text } = Typography;
const { Column, ColumnGroup } = Table;
const { TabPane } = Tabs;

const Patent_blood_request_blooddetil = ({
  OrderNumber,
  showModal_showall_tysc_onCancel,
  Date,
}) => {
  const [showModal_imagelab, setshowModal_imagelab] = useState(false);
  const [passwordPatientGrouping, setPasswordPatientGrouping] = useState();
  const [passwordAntibodyScreening, setPasswordAntibodyScreening] = useState();
  const [passwordDATandAutocontrol, setPasswordDATandAutocontrol] = useState();
  const [passwordSendIdentification, setPasswordSendIdentification] =
    useState();
  const [passwordSendcrossmatchs, setPasswordSendcrossmatchs] = useState();
  const [passwordSendcrossmatchs_ungroup, setPasswordSendcrossmatchs_ungroup] =
    useState();
  const router = useRouter();
  const [data_ordernumber, setdata_ordernumber] = useState();
  const showModal_Labimg = async () => {
    setshowModal_imagelab(true);
    setDOB();
  };

  const okshowModal_Labimg = () => {
    setshowModal_imagelab(false);
  };

  const CancelshowModal_Labimg = () => {
    setshowModal_imagelab(false);
  };

  const [GR_Alrit, setGR_Alrit] = useState(false);
  const [top, setTop] = useState(0);
  const handleOkGR_Alrit = () => {
    setGR_Alrit(false);
  };
  const [confrim_pt, setconfrim_pt] = useState(false);
  const showModal = () => {
    if (setresultcheck === null) {
    } else {
      setconfrim_pt(true);
      setTimeout(() => {
        document.getElementById("passcross_xm_Sendconfirm_grouping").focus();
      }, 50);
    }
  };
  const handleCanceGR_Alritl = () => {
    setGR_Alrit(false);
    setshowbloodno_Detiler([]);
    setCountTypeBlood();
    Crossmat_form.resetFields();
    // document.getElementById("Unit_no_csm").focus();
    setgetformDataCrossmat_former("0");
  };

  const [RH_Alrit, setRH_Alrit] = useState(false);
  // radio
  const [value, setValue] = useState(1);

  // เกี่ยวกับ select
  const { Option } = Select;
  function onChange(value) {
    const frmData = Identification_formAntigen.getFieldsValue();
    const keyList = Object.keys(frmData);
    const result = [];
    keyList.forEach((itemKey) => {
      const itemValue = frmData[itemKey];
      if (itemValue === "+") {
        if (itemKey === "a1") {
          result.push("A+");
        } else if (itemKey === "H") {
          result.push(" H+");
        } else if (itemKey === "D") {
          result.push(" D+");
        } else if (itemKey === "c1") {
          result.push(" C+");
        } else if (itemKey === "c2") {
          result.push(" c+");
        } else if (itemKey === "e1") {
          result.push(" E+");
        } else if (itemKey === "e2") {
          result.push(" e+");
        } else if (itemKey === "k1") {
          result.push(" K+");
        } else if (itemKey === "k2") {
          result.push(" k+");
        } else if (itemKey === "dia") {
          result.push(" Dia+");
        } else if (itemKey === "dib") {
          result.push(" Dib+");
        } else if (itemKey === "m") {
          result.push(" M+");
        } else if (itemKey === "n") {
          result.push(" N+");
        } else if (itemKey === "s1") {
          result.push(" S+");
        } else if (itemKey === "s2") {
          result.push(" s+");
        } else if (itemKey === "mia") {
          result.push(" Mia+");
        } else if (itemKey === "lea") {
          result.push(" Lea+");
        } else if (itemKey === "leb") {
          result.push(" Leb+");
        } else if (itemKey === "coa") {
          result.push(" Coa+");
        } else if (itemKey === "cob") {
          result.push(" Cob+");
        } else if (itemKey === "jka") {
          result.push(" Jka+");
        } else if (itemKey === "jkb") {
          result.push(" Jkb+");
        } else if (itemKey === "i1") {
          result.push(" I+");
        } else if (itemKey === "i2") {
          result.push(" i+");
        } else if (itemKey === "p1") {
          result.push(" P1+");
        } else if (itemKey === "p") {
          result.push(" p+");
        } else if (itemKey === "lua") {
          result.push(" Lua+");
        } else if (itemKey === "lub") {
          result.push(" Lub+");
        } else if (itemKey === "fya") {
          result.push(" Fya+");
        } else if (itemKey === "fyb") {
          result.push(" Fyb+");
        } else if (itemKey === "xga") {
          result.push(" Xga+");
        }
      } else if (itemValue === "-") {
        if (itemKey === "a1") {
          result.push("A-");
        } else if (itemKey === "H") {
          result.push(" H-");
        } else if (itemKey === "D") {
          result.push(" D-");
        } else if (itemKey === "c1") {
          result.push(" C-");
        } else if (itemKey === "c2") {
          result.push(" c-");
        } else if (itemKey === "e1") {
          result.push(" E-");
        } else if (itemKey === "e2") {
          result.push(" e-");
        } else if (itemKey === "k1") {
          result.push(" K-");
        } else if (itemKey === "k2") {
          result.push(" k-");
        } else if (itemKey === "dia") {
          result.push(" Dia-");
        } else if (itemKey === "dib") {
          result.push(" Dib-");
        } else if (itemKey === "m") {
          result.push(" M-");
        } else if (itemKey === "n") {
          result.push(" N-");
        } else if (itemKey === "s1") {
          result.push(" S-");
        } else if (itemKey === "s2") {
          result.push(" s-");
        } else if (itemKey === "mia") {
          result.push(" Mia-");
        } else if (itemKey === "lea") {
          result.push(" Lea-");
        } else if (itemKey === "leb") {
          result.push(" Leb-");
        } else if (itemKey === "coa") {
          result.push(" Coa-");
        } else if (itemKey === "cob") {
          result.push(" Cob-");
        } else if (itemKey === "jka") {
          result.push(" Jka-");
        } else if (itemKey === "jkb") {
          result.push(" Jkb-");
        } else if (itemKey === "i1") {
          result.push(" I-");
        } else if (itemKey === "i2") {
          result.push(" i-");
        } else if (itemKey === "p1") {
          result.push(" P1-");
        } else if (itemKey === "p") {
          result.push(" p-");
        } else if (itemKey === "lua") {
          result.push(" Lua-");
        } else if (itemKey === "lub") {
          result.push(" Lub-");
        } else if (itemKey === "fya") {
          result.push(" Fya-");
        } else if (itemKey === "fyb") {
          result.push(" Fyb-");
        } else if (itemKey === "xga") {
          result.push(" Xga-");
        }
      }
    });

    Identification_formAntigen.setFieldsValue({
      resultATG: result.join(","),
    });
  }

  // --- end เกี่ยวกับ select
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
    try {
      if (resultLogin.data.id_user) {
        const result = await api.put(`/con_cross`, {
          order_num: Ordernumber,
          staff: staff_name,
        });
        // window.close();
        Modal.success({
          title: "Successful confirmation",
          content: "ยืนยันสำเร็จ",
        });
        await LoadCrossmatch_Type_Data(Ordernumber);
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

  // ของ เอิร์น
  const [ward, setWard] = useState([]);
  const Fetch_ward = async () => {
    const result = await api.get("/ward");
    setWard(result.data[0]);
  };
  const [frmblood_request] = Form.useForm();
  const [fromTabshow_data] = Form.useForm();
  // add Reaction Blood
  const [isModalReactBlood, setIsModalReactBlood] = useState(false);
  const showModalReactBlood = () => {
    setIsModalReactBlood(true);
  };

  const handleOkReactBlood = () => {
    setIsModalReactBlood(false);
  };

  const handleCancelReactBlood = () => {
    setIsModalReactBlood(false);
  };

  const [spin, setspin] = useState(true);
  const antIcon = <>{/* <Image src={img}  /> */}</>;

  // END ของ เอิร์น

  //---

  const [rh_name, setRhName] = useState();
  const [blood_name, setBloodName] = useState();
  const [Choice_data_type_1, setChoice_data_type_1] = useState();

  const [LoadABSshow, setLoadABS] = useState();

  const [Result_choicetype_3, setResult_choicetype_3] = useState();
  const [password, setPassword] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalsaveall, setIsModalsaveall] = useState(false);
  const [isModalconfirm_cross, setIsModalconfirm_cross] = useState(false);

  const [blood_group_subgroup, setblood_group_subgroup] = useState();

  const showModalsaveall = () => {
    if (setresultcheck === null) {
    } else {
      setIsModalsaveall(true);
      setTimeout(() => {
        document.getElementById("id_saveall").focus();
      }, 50);
    }
  };
  const showModal_firm_cross = () => {
    if (setresultcheck === null) {
    } else {
      setIsModalconfirm_cross(true);
    }
  };

  const onChangeAlests_GR = async (value) => {
    const data = PatientGroupingForm.getFieldValue();
    if (data.blood_gr === "A") {
      if (data.blood_gr != Datap_g[0].blood_gr) {
        if (Datap_g[0].blood_gr === null) {
        } else if (Datap_g[0].blood_gr === "") {
        } else {
          Modal.warning({
            title: (
              <b style={{ fontSize: "22px", color: "black" }}>
                แจ้งเตือนประวัติหมู่เลือด
              </b>
            ),
            // icon: ,
            className: "ModalwarningGR",
            content: (
              <Row justify="center">
                <Col span={20}>
                  <Row style={{ marginTop: "5px" }}>
                    <p style={{ fontSize: "14px" }}>
                      หมู่เลือดครั้งก่อนคือ&nbsp;
                    </p>
                    <b style={{ fontSize: "24px", marginTop: "-5px" }}>
                      {Datap_g[0].blood_gr}
                    </b>
                  </Row>
                  <Row style={{ marginTop: "-15px" }}>
                    <p style={{ fontSize: "14px" }}>
                      หมู่เลือดปัจจุบันคือ&nbsp;
                    </p>
                    <b style={{ fontSize: "24px", marginTop: "-5px" }}>
                      {data.blood_gr}
                    </b>
                  </Row>
                </Col>
              </Row>
            ),
          });
        }
      }
      PatientGroupingForm.setFieldsValue({
        anti_a: "4+",
        anti_b: "Negative",
        anti_ab: "4+",
        cell_a: "Negative",
        cell_b: "4+",
      });
    } else if (data.blood_gr === "B") {
      PatientGroupingForm.setFieldsValue({
        anti_a: "Negative",
        anti_b: "4+",
        anti_ab: "4+",
        cell_a: "4+",
        cell_b: "Negative",
      });
      if (data.blood_gr != Datap_g[0].blood_gr) {
        if (Datap_g[0].blood_gr === null) {
        } else if (Datap_g[0].blood_gr === "") {
        } else {
          Modal.warning({
            title: (
              <b style={{ fontSize: "22px", color: "black" }}>
                แจ้งเตือนประวัติหมู่เลือด
              </b>
            ),
            // icon: ,
            className: "ModalwarningGR",
            content: (
              <Row justify="center">
                <Col span={20}>
                  <Row style={{ marginTop: "5px" }}>
                    <p style={{ fontSize: "14px" }}>
                      หมู่เลือดครั้งก่อนคือ&nbsp;
                    </p>
                    <b style={{ fontSize: "24px", marginTop: "-5px" }}>
                      {Datap_g[0].blood_gr}
                    </b>
                  </Row>
                  <Row style={{ marginTop: "-15px" }}>
                    <p style={{ fontSize: "14px" }}>
                      หมู่เลือดปัจจุบันคือ&nbsp;
                    </p>
                    <b style={{ fontSize: "24px", marginTop: "-5px" }}>
                      {data.blood_gr}
                    </b>
                  </Row>
                </Col>
              </Row>
            ),
          });
        }
      }
    } else if (data.blood_gr === "AB") {
      if (data.blood_gr != Datap_g[0].blood_gr) {
        if (Datap_g[0].blood_gr === null) {
        } else if (Datap_g[0].blood_gr === "") {
        } else {
          Modal.warning({
            title: (
              <b style={{ fontSize: "22px", color: "black" }}>
                แจ้งเตือนประวัติหมู่เลือด
              </b>
            ),
            // icon: ,
            className: "ModalwarningGR",
            content: (
              <Row justify="center">
                <Col span={20}>
                  <Row style={{ marginTop: "5px" }}>
                    <p style={{ fontSize: "14px" }}>
                      หมู่เลือดครั้งก่อนคือ&nbsp;
                    </p>
                    <b style={{ fontSize: "24px", marginTop: "-5px" }}>
                      {Datap_g[0].blood_gr}
                    </b>
                  </Row>
                  <Row style={{ marginTop: "-15px" }}>
                    <p style={{ fontSize: "14px" }}>
                      หมู่เลือดปัจจุบันคือ&nbsp;
                    </p>
                    <b style={{ fontSize: "24px", marginTop: "-5px" }}>
                      {data.blood_gr}
                    </b>
                  </Row>
                </Col>
              </Row>
            ),
          });
        }
      }
      PatientGroupingForm.setFieldsValue({
        anti_a: "4+",
        anti_b: "4+",
        anti_ab: "4+",
        cell_a: "Negative",
        cell_b: "Negative",
      });
    } else if (data.blood_gr === "O") {
      if (data.blood_gr != Datap_g[0].blood_gr) {
        if (Datap_g[0].blood_gr === null) {
        } else if (Datap_g[0].blood_gr === "") {
        } else {
          Modal.warning({
            title: (
              <b style={{ fontSize: "22px", color: "black" }}>
                แจ้งเตือนประวัติหมู่เลือด
              </b>
            ),
            // icon: ,
            className: "ModalwarningGR",
            content: (
              <Row justify="center">
                <Col span={20}>
                  <Row style={{ marginTop: "5px" }}>
                    <p style={{ fontSize: "14px" }}>
                      หมู่เลือดครั้งก่อนคือ&nbsp;
                    </p>
                    <b style={{ fontSize: "24px", marginTop: "-5px" }}>
                      {Datap_g[0].blood_gr}
                    </b>
                  </Row>
                  <Row style={{ marginTop: "-15px" }}>
                    <p style={{ fontSize: "14px" }}>
                      หมู่เลือดปัจจุบันคือ&nbsp;
                    </p>
                    <b style={{ fontSize: "24px", marginTop: "-5px" }}>
                      {data.blood_gr}
                    </b>
                  </Row>
                </Col>
              </Row>
            ),
          });
        }
      }
      PatientGroupingForm.setFieldsValue({
        anti_a: "Negative",
        anti_b: "Negative",
        anti_ab: "Negative",
        cell_a: "4+",
        cell_b: "4+",
      });
    } else if (data.blood_gr === " ") {
    }
  };
  const onChangeRH = async (value) => {
    const data = PatientGroupingForm.getFieldValue();
    if (data.blood_rh === "-") {
      if (Datap_g[0].blood_rh === null) {
      } else if (Datap_g[0].blood_rh === "") {
      } else {
        Modal.warning({
          title: (
            <b style={{ fontSize: "22px", color: "black" }}>
              แจ้งเตือนประวัติหมู่เลือด
            </b>
          ),
          // icon: ,
          className: "Modalwarning",
          content: (
            <Row justify="center">
              <Col span={20}>
                <Row style={{ marginTop: "5px" }}>
                  <p style={{ fontSize: "14px" }}>
                    หมู่เลือดครั้งก่อนคือ&nbsp;
                  </p>
                  <b style={{ fontSize: "24px", marginTop: "-5px" }}>
                    {Datap_g[0].blood_rh}
                  </b>
                </Row>
                <Row style={{ marginTop: "-15px" }}>
                  <p style={{ fontSize: "14px" }}>หมู่เลือดปัจจุบันคือ&nbsp;</p>
                  <b style={{ fontSize: "24px", marginTop: "-5px" }}>
                    {data.blood_rh}
                  </b>
                </Row>
              </Col>
            </Row>
          ),
        });
      }
      PatientGroupingForm.setFieldsValue({
        anti_d: "Negative",
      });
    } else if (data.blood_rh === "+") {
      if (Datap_g[0].blood_rh === null) {
      } else if (Datap_g[0].blood_rh === "") {
      } else {
        Modal.warning({
          title: (
            <b style={{ fontSize: "22px", color: "black" }}>
              แจ้งเตือนประวัติหมู่เลือด
            </b>
          ),
          // icon: ,
          className: "Modalwarning",
          content: (
            <Row justify="center">
              <Col span={20}>
                <Row style={{ marginTop: "5px" }}>
                  <p style={{ fontSize: "14px" }}>
                    หมู่เลือดครั้งก่อนคือ&nbsp;
                  </p>
                  <b style={{ fontSize: "24px", marginTop: "-5px" }}>
                    {Datap_g[0].blood_rh}
                  </b>
                </Row>
                <Row style={{ marginTop: "-15px" }}>
                  <p style={{ fontSize: "14px" }}>หมู่เลือดปัจจุบันคือ&nbsp;</p>
                  <b style={{ fontSize: "24px", marginTop: "-5px" }}>
                    {data.blood_rh}
                  </b>
                </Row>
              </Col>
            </Row>
          ),
        });
      }
      PatientGroupingForm.setFieldsValue({
        anti_d: "4+",
      });
    } else if (data.blood_rh != "+,-") {
      if (Datap_g[0].blood_rh === null) {
      } else if (Datap_g[0].blood_rh === "") {
      } else {
        Modal.warning({
          title: (
            <b style={{ fontSize: "22px", color: "black" }}>
              แจ้งเตือนประวัติหมู่เลือด
            </b>
          ),
          // icon: ,
          className: "Modalwarning",
          content: (
            <Row justify="center">
              <Col span={20}>
                <Row style={{ marginTop: "5px" }}>
                  <p style={{ fontSize: "14px" }}>
                    หมู่เลือดครั้งก่อนคือ&nbsp;
                  </p>
                  <b style={{ fontSize: "24px", marginTop: "-5px" }}>
                    {Datap_g[0].blood_rh}
                  </b>
                </Row>
                <Row style={{ marginTop: "-15px" }}>
                  <p style={{ fontSize: "14px" }}>หมู่เลือดปัจจุบันคือ&nbsp;</p>
                  <b style={{ fontSize: "24px", marginTop: "-5px" }}>
                    {data.blood_rh}
                  </b>
                </Row>
              </Col>
            </Row>
          ),
        });
      }
      PatientGroupingForm.setFieldsValue({
        anti_d: "",
      });
    }
  };

  const CheckResultAntibodyScreening = async (value) => {
    const Dataresult = AntibodyScreeningForm.getFieldValue();
    if (Dataresult.abs_result === "Negative") {
      AntibodyScreeningForm.setFieldsValue({
        abs_o1_iat: "Negative",
        abs_o2_iat: "Negative",
        abs_o3_iat: "Negative",
      });
    } else if (Dataresult.abs_result != "Negative") {
      AntibodyScreeningForm.setFieldsValue({
        abs_o1_rt: "",
        abs_o1_37c: "",
        abs_o1_iat: "",
        abs_o2_rt: "",
        abs_o2_37c: "",
        abs_o2_iat: "",
        abs_o3_rt: "",
        abs_o3_37c: "",
        abs_o3_iat: "",
      });
    }
  };

  const onchangeDATAutocontroldat_result = async (value) => {
    const Dataresult = DATandAutocontrolForm.getFieldValue();
    if (Dataresult.dat_result === "Negative") {
      DATandAutocontrolForm.setFieldsValue({
        dat_iat: "Negative",
      });
    } else if (Dataresult.dat_result != "Negative") {
      DATandAutocontrolForm.setFieldsValue({
        dat_iat: "",
      });
    }
  };
  const onchangeDATAutocontrolautologous_result = async (value) => {
    const Dataresult = DATandAutocontrolForm.getFieldValue();
    if (Dataresult.autologous_result === "Negative") {
      DATandAutocontrolForm.setFieldsValue({
        autologous_iat: "Negative",
      });
    } else if (Dataresult.autologous_result != "Negative") {
      DATandAutocontrolForm.setFieldsValue({
        autologous_iat: "",
      });
    }
  };

  const setResultATB = (e) => {
    const frmData = Identification_formAntibody.getFieldsValue();
    const keyList = Object.keys(frmData);
    const result = [];

    const result_value = Object.values(frmData);

    keyList.forEach((itemKey) => {
      const itemValue = frmData[itemKey];
      if (itemValue === true) {
        if (itemKey === "fm") {
          result.push("F/M");
        } else if (itemKey === "c1") {
          result.push("C");
        } else if (itemKey === "c2") {
          result.push("c");
        } else if (itemKey === "e1") {
          result.push("E");
        } else if (itemKey === "e2") {
          result.push("e");
        } else if (itemKey === "A1") {
          result.push(" A1 ");
        } else if (itemKey === "H") {
          result.push(" H ");
        } else if (itemKey === "D") {
          result.push(" D ");
        } else if (itemKey === "cw") {
          result.push(" Cw ");
        } else if (itemKey === "k1") {
          result.push(" K ");
        } else if (itemKey === "k2") {
          result.push(" k ");
        } else if (itemKey === "kpa") {
          result.push(" Kpa ");
        } else if (itemKey === "kpb") {
          result.push(" Kpb ");
        } else if (itemKey === "jsa") {
          result.push(" Jsa ");
        } else if (itemKey === "jsb") {
          result.push(" Jsb ");
        } else if (itemKey === "jka") {
          result.push(" Jka ");
        } else if (itemKey === "jkb") {
          result.push(" Jkb ");
        } else if (itemKey === "jk3") {
          result.push(" Jk3 ");
        } else if (itemKey === "m") {
          result.push(" M ");
        } else if (itemKey === "n") {
          result.push(" N ");
        } else if (itemKey === "s1") {
          result.push(" S ");
        } else if (itemKey === "s2") {
          result.push(" s ");
        } else if (itemKey === "mia") {
          result.push(" Mia ");
        } else if (itemKey === "lea") {
          result.push(" Lea ");
        } else if (itemKey === "leb") {
          result.push(" Leb ");
        } else if (itemKey === "fya") {
          result.push(" Fya ");
        } else if (itemKey === "fyb") {
          result.push(" Fyb ");
        } else if (itemKey === "fy3") {
          result.push(" Fy3 ");
        } else if (itemKey === "dia") {
          result.push(" Dia ");
        } else if (itemKey === "dib") {
          result.push(" Dib ");
        } else if (itemKey === "i1") {
          result.push(" I ");
        } else if (itemKey === "i2") {
          result.push(" IH ");
        } else if (itemKey === "coa") {
          result.push(" Coa ");
        } else if (itemKey === "cob") {
          result.push(" Cob ");
        } else if (itemKey === "ct") {
          result.push(" CT ");
        } else if (itemKey === "wt") {
          result.push(" WT ");
        } else if (itemKey === "hemolysis") {
          result.push(" Hemolysis ");
        } else if (itemKey === "xga") {
          result.push(" Xga ");
        } else if (itemKey === "p1") {
          result.push(" P1 ");
        } else if (itemKey === "tja") {
          result.push(" Tja ");
        } else if (itemKey === "uniden") {
          result.push(" Uniden ");
        } else if (itemKey === "lua") {
          result.push(" Lua ");
        } else if (itemKey === "lub") {
          result.push(" Lub ");
        } else if (itemKey === "rf") {
          result.push(" RF ");
        } else {
          result.push(itemKey);
        }
      }
    });

    Identification_formAntibody.setFieldsValue({
      resultATB: result.join(","),
    });
  };
  const [doctor, setDoctor] = useState();
  const fletAllchoi = async () => {
    const result = await api.get("/Blood_Name");
    setBloodName(result.data);
    const result1 = await api.get("/Rh_Name_PREQ");
    setRhName(result1.data[0]);
    const result2 = await api.get("/Choiciall");
    setChoice_data_type_1(result2.data[0]);
    const result3 = await api.get("/blood_group_subgroup");
    setblood_group_subgroup(result3.data[0]);
    const result4 = await api.get("/Antibody_Screening");
    setLoadABS(result4.data[0]);
    const result5 = await api.get("/Crossmatching_Result");
    setResult_choicetype_3(result5.data[0]);
    const result6 = await api.get("/doctor");
    setDoctor(result6.data[0]);
  };

  // ----------Data_bloodrequesresult--------
  const [checksaveall, setchecksaveall] = useState([]);
  const [checksavealls, setchecksavealls] = useState([]);

  const [Data_BRQ, setData_BRQ] = useState([]);
  const [Datap_g, setDatap_g] = useState([]);
  const [DataABS, setDataABS] = useState([]);

  const Data_bloodrequesresult_Form = async (value) => {
    console.log("value", value);
    const result = await api.get("/Data_bloodrequesresult", {
      params: {
        NUM_BT: value,
      },
    });

    PatientGroupingForm.setFieldsValue({
      ...result.data[0],
      anti_a: String(result.data[0][0]?.anti_a),
      anti_b: String(result.data[0][0]?.anti_b),
      anti_ab: String(result.data[0][0]?.anti_ab),
      anti_d: String(result.data[0][0]?.anti_d),
      anti_a1: String(result.data[0][0]?.anti_a1),
      anti_h: String(result.data[0][0]?.anti_h),
      cell_a: String(result.data[0][0]?.cell_a),
      cell_b: String(result.data[0][0]?.cell_b),
      cell_o: String(result.data[0][0]?.cell_o),
      cell_ctrl: String(result.data[0][0]?.cell_ctrl),
      blood_gr: String(result.data[0][0]?.blood_gr),
      blood_sub_gr: String(result.data[0][0]?.blood_sub_gr),
      rhd_rt: String(result.data[0][0]?.rhd_rt),
      rhd_37c: String(result.data[0][0]?.rhd_37c),
      rhd_iat: String(result.data[0][0]?.rhd_iat),
      blood_rh: String(result.data[0][0]?.blood_rh),
      grouping_staff: String(result.data[0][0]?.grouping_staff),
      note_Grouping: String(result.data[0][0]?.note_Grouping),

      pg_savedate: String(result.data[0][0]?.pg_savedate),
      pg_savetime: String(result.data[0][0]?.pg_savetime),
    });
    AntibodyScreeningForm.setFieldsValue({
      ...result.data[0],
      abs_o1_rt: String(result.data[0][0]?.abs_o1_rt),
      abs_o1_37c: String(result.data[0][0]?.abs_o1_37c),
      abs_o1_iat: String(result.data[0][0]?.abs_o1_iat),
      abs_o2_rt: String(result.data[0][0]?.abs_o2_rt),
      abs_o2_37c: String(result.data[0][0]?.abs_o2_37c),
      abs_o2_iat: String(result.data[0][0]?.abs_o2_iat),
      abs_o3_rt: String(result.data[0][0]?.abs_o3_rt),
      abs_o3_37c: String(result.data[0][0]?.abs_o3_37c),
      abs_o3_iat: String(result.data[0][0]?.abs_o3_iat),
      abs_result: String(result.data[0][0]?.abs_result),
      abs_staff: String(result.data[0][0]?.abs_staff),
      at_savedate: String(result.data[0][0]?.at_savedate),
      at_savetime: String(result.data[0][0]?.at_savetime),
      note_ABS: String(result.data[0][0]?.note_ABS),
    });
    DATandAutocontrolForm.setFieldsValue({
      ...result.data[0],
      dat_rt: String(result.data[0][0]?.dat_rt),
      dat_37c: String(result.data[0][0]?.dat_37c),
      dat_iat: String(result.data[0][0]?.dat_iat),
      dat_result: String(result.data[0][0]?.dat_result),
      dat_staff: String(result.data[0][0]?.dat_staff),
      dat_savedate: String(result.data[0][0]?.dat_savedate),
      dat_savetime: String(result.data[0][0]?.dat_savetime),
      autologous_rt: String(result.data[0][0]?.autologous_rt),
      autologous_37c: String(result.data[0][0]?.autologous_37c),
      autologous_iat: String(result.data[0][0]?.autologous_iat),
      autologous_result: String(result.data[0][0]?.autologous_result),
      autologous_staff: String(result.data[0][0]?.autologous_staff),
      at_savedate: String(result.data[0][0]?.at_savedate),
      at_savetime: String(result.data[0][0]?.at_savetime),
      note_Dat_Autocontrol: String(result.data[0][0]?.note_Dat_Autocontrol),
    });
    setDatap_g(result?.data[0]);
    setData_BRQ(result?.data[0]);
    setchecksaveall(result?.data[0][0].blood_gr);
    setchecksavealls(result?.data[0][0].blood_rh);

    setHn(result?.data[0][0]?.hn);
  };
  const [Data_DAT_ATC, setData_DAT_ATC] = useState([]);
  const [Hn, setHn] = useState([]);
  // const getHN = async (value) => ({

  // });
  // ----------AntibodyResult--------
  const [Data_ATB, setData_ATB] = useState([]);
  const AntibodyResult_Form = async (value) => {
    const result = await api.get("/AntibodyResult", {
      params: {
        NUM_BT: value,
      },
    });

    Identification_formAntibody.setFieldsValue({
      ...result.data[0],
      A1: result.data[0][0]?.A1 === "1" ? true : false,
      H: result.data[0][0]?.H === "1" ? true : false,
      D: result.data[0][0]?.D === "1" ? true : false,
      c1: result.data[0][0]?.c1 === "1" ? true : false,
      e1: result.data[0][0]?.e1 === "1" ? true : false,
      c2: result.data[0][0]?.c2 === "1" ? true : false,
      e2: result.data[0][0]?.e2 === "1" ? true : false,
      cw: result.data[0][0]?.cw === "1" ? true : false,
      k1: result.data[0][0]?.k1 === "1" ? true : false,
      k2: result.data[0][0]?.k2 === "1" ? true : false,
      kpa: result.data[0][0]?.kpa === "1" ? true : false,
      kpb: result.data[0][0]?.kpb === "1" ? true : false,
      jsa: result.data[0][0]?.jsa === "1" ? true : false,
      jsb: result.data[0][0]?.jsb === "1" ? true : false,
      jka: result.data[0][0]?.jka === "1" ? true : false,
      jkb: result.data[0][0]?.jkb === "1" ? true : false,
      jk3: result.data[0][0]?.jk3 === "1" ? true : false,
      m: result.data[0][0]?.m === "1" ? true : false,
      n: result.data[0][0]?.n === "1" ? true : false,
      s1: result.data[0][0]?.s1 === "1" ? true : false,
      s2: result.data[0][0]?.s2 === "1" ? true : false,
      mia: result.data[0][0]?.mia === "1" ? true : false,
      lea: result.data[0][0]?.lea === "1" ? true : false,
      leb: result.data[0][0]?.leb === "1" ? true : false,
      fya: result.data[0][0]?.fya === "1" ? true : false,
      fyb: result.data[0][0]?.fyb === "1" ? true : false,
      fy3: result.data[0][0]?.fy3 === "1" ? true : false,
      dia: result.data[0][0]?.dia === "1" ? true : false,
      dib: result.data[0][0]?.dib === "1" ? true : false,
      i1: result.data[0][0]?.i1 === "1" ? true : false,
      i2: result.data[0][0]?.i2 === "1" ? true : false,
      coa: result.data[0][0]?.coa === "1" ? true : false,
      cob: result.data[0][0]?.cob === "1" ? true : false,
      ct: result.data[0][0]?.ct === "1" ? true : false,
      wt: result.data[0][0]?.wt === "1" ? true : false,
      hemolysis: result.data[0][0]?.hemolysis === "1" ? true : false,
      xga: result.data[0][0]?.xga === "1" ? true : false,
      fm: result.data[0][0]?.fm === "1" ? true : false,
      p1: result.data[0][0]?.p1 === "1" ? true : false,
      tja: result.data[0][0]?.tja === "1" ? true : false,
      uniden: result.data[0][0]?.uniden === "1" ? true : false,
      lua: result.data[0][0]?.lua === "1" ? true : false,
      lub: result.data[0][0]?.lub === "1" ? true : false,
      rf: result.data[0][0]?.rf === "1" ? true : false,
      save_staff: result.data[0][0]?.save_staff === "1" ? true : false,
      ATB_savedate: result.data[0][0]?.ATB_savedate === "1" ? true : false,
      ATB_savetime: result.data[0][0]?.ATB_savetime === "1" ? true : false,
      note_antibody: String(result.data[0][0]?.note_antibody),
    });
    setResultATB();
    setData_ATB(result?.data[0]);
  };

  const Refresh = async () => {
    Identification_formAntigen.resetFields();
  };
  // ----------AntigenResult--------
  const [Data_ATG, setData_ATG] = useState([]);
  const AntigenResult_Form = async (value) => {
    const result = await api.get("/AntigenResult", {
      params: {
        NUM_BT: value,
      },
    });
    Identification_formAntigen.setFieldsValue({
      ...result.data[0],
      a1: String(result.data[0][0]?.a1),
      H: String(result.data[0][0]?.H),
      D: String(result.data[0][0]?.D),
      c1: String(result.data[0][0]?.c1),
      c2: String(result.data[0][0]?.c2),
      e1: String(result.data[0][0]?.e1),
      e2: String(result.data[0][0]?.e2),
      k1: String(result.data[0][0]?.k1),
      k2: String(result.data[0][0]?.k2),
      dia: String(result.data[0][0]?.dia),
      dib: String(result.data[0][0]?.dib),
      m: String(result.data[0][0]?.m),
      n: String(result.data[0][0]?.n),
      s1: String(result.data[0][0]?.s1),
      s2: String(result.data[0][0]?.s2),
      mia: String(result.data[0][0]?.mia),
      lea: String(result.data[0][0]?.lea),
      leb: String(result.data[0][0]?.leb),
      coa: String(result.data[0][0]?.coa),
      cob: String(result.data[0][0]?.cob),
      jka: String(result.data[0][0]?.jka),
      jkb: String(result.data[0][0]?.jkb),
      i1: String(result.data[0][0]?.i1),
      i2: String(result.data[0][0]?.i2),
      p1: String(result.data[0][0]?.p1),
      p: String(result.data[0][0]?.p),
      lua: String(result.data[0][0]?.lua),
      lub: String(result.data[0][0]?.lub),
      fya: String(result.data[0][0]?.fya),
      fyb: String(result.data[0][0]?.fyb),
      xga: String(result.data[0][0]?.xga),
      result: String(result.data[0][0]?.result),
      save_staff: String(result.data[0][0]?.save_staff),
      ATB_savedate: String(result.data[0][0]?.ATB_savedate),
      ATB_savetime: String(result.data[0][0]?.ATB_savetime),
      xga: String(result.data[0][0]?.xga),
      fm: String(result.data[0][0]?.fm),
      p1: String(result.data[0][0]?.p1),
      tja: String(result.data[0][0]?.tja),
      uniden: String(result.data[0][0]?.uniden),
      lua: String(result.data[0][0]?.lua),
      lub: String(result.data[0][0]?.lub),
      rf: String(result.data[0][0]?.rf),
      note_antigen: String(result.data[0][0]?.note_antigen),

      // resultATG: String(result.data[0][0]?.resultATG),

      save_staff: String(result.data[0][0]?.save_staff),
      ATJ_savedate: String(result.data[0][0]?.ATJ_savedate),
      ATJ_savetime: String(result.data[0][0]?.ATJ_savetime),
    });
    onChange();
    setData_ATG(result?.data[0]);
    // console.log("ค่าที่แสดงในAntigenResult_Form", result.data[0]);
  };
  const [Truedatacheck, setTruedatachecker] = useState();

  const [showFetch_ConfirmDataPG, showsetFetch_ConfirmDataPG] = useState();
  const [setresultcheck, Setresultchecker] = useState();
  const Fetch_ConfirmDataPG = async () => {
    const result = await api.get("/Chexkcon_pg", {
      params: {
        order_num: OrderNumber,
      },
    });
    const resultX = await api.get("/Data_bloodrequesresult", {
      params: {
        NUM_BT: OrderNumber,
      },
    });
    showsetFetch_ConfirmDataPG(result?.data[0].cross_confirm);
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
  const settrue = () => {
    setspin(true);
  };
  const setfalse = () => {
    setspin(false);
  };

  useEffect(async () => {
    if (OrderNumber && Date) {
      settrue();
      await fletAllchoi();
      await Fetch_ConfirmDataPG(OrderNumber);
      await Data_bloodrequesresult_Form(OrderNumber);
      await showFetch_ConfirmDataPG_detils(OrderNumber);
      await AntibodyResult_Form(OrderNumber);
      await AntigenResult_Form(OrderNumber);

      setdata_ordernumber(OrderNumber);
      setshowresult_onclick_Title();
      setshowresult_onclick();
      setshowresult_onclickimage();
      setfalse();
    }
  }, [OrderNumber && Date]);

  // ฟอร์ม insert
  const [register_blood_detil] = Form.useForm();
  const [PatientGroupingForm] = Form.useForm();
  const [AntibodyScreeningForm] = Form.useForm();
  const [DATandAutocontrolForm] = Form.useForm();
  const [Identification_formAntibody] = Form.useForm();
  const [Identification_formAntigen] = Form.useForm();
  const [Crossmat_form] = Form.useForm();
  const [PatientNote_form] = Form.useForm();
  const [confirm_sendgroup_cross] = Form.useForm();

  const [showbloodno_Detil, setshowbloodno_Detiler] = useState([]);

  const send_bloodno_Crossmatch = async () => {
    const formDataCrossmat_form = Crossmat_form.getFieldsValue();
    const result = await api.post(`/Search_bloodNO`, {
      ...formDataCrossmat_form,
    });

    const Result_csm = await api.get("/Data_bloodrequesresult", {
      params: {
        NUM_BT: OrderNumber,
      },
    });
    const resultcross = await api.get("/Crossmatch_API", {
      params: {
        TB: OrderNumber,
        Unit_no_csm: formDataCrossmat_form.Unit_no_csm,
      },
    });

    if (
      result.data[0] === "" ||
      result.data[0] === null ||
      result.data[0] === undefined
    ) {
      Modal.error({
        title: "ERROR!!",
        content: "ไม่พบข้อมูล",
        onOk: (close) => {
          close();
          setshowbloodno_Detiler([]);
          setCountTypeBlood();
          Crossmat_form.resetFields();
          setgetformDataCrossmat_former("0");
        },
      });
    } else {
      if (
        result?.data[0].blood_type == formDataCrossmat_form.blood_status_search
      ) {
        if (
          resultcross?.data[0] == "" ||
          resultcross?.data[0] == null ||
          resultcross?.data[0] == undefined
        ) {
          if (result?.data[0].status == 6) {
            Modal.error({
              title: (
                <b style={{ fontSize: "22px", color: "black" }}>
                  เตือนการใช้เลือด
                </b>
              ),
              className: "Modalwarning_EXpire",
              content: (
                <Row justify="center">
                  <Col span={23}>
                    <Row style={{ marginTop: "5px" }}>
                      <p style={{ fontSize: "14px" }}>ถุงเลือด : &nbsp;</p>
                      <b style={{ fontSize: "24px", marginTop: "-5px" }}>
                        {result?.data[0].blood_no}
                      </b>
                    </Row>
                    <Row style={{ marginTop: "-15px", marginLeft: "70px" }}>
                      <b style={{ fontSize: "24px", marginTop: "-5px" }}>
                        หมดอายุแล้ว!!
                      </b>
                    </Row>
                    <Row style={{ marginTop: "1px" }}>
                      <b style={{ fontSize: "24px", marginTop: "-5px" }}>
                        แนะนำให้ปลดจากคลังโลหิต
                      </b>
                    </Row>
                  </Col>
                </Row>
              ),
              onOk: (close) => {
                close();
                setshowbloodno_Detiler([]);
                setCountTypeBlood();
                Crossmat_form.resetFields();
                document.getElementById("Unit_no_csm").focus();
                setgetformDataCrossmat_former("0");
              },
            });
          } else {
            if (result?.data[0].status == 1) {
              // console.log("---------------status",result?.data[0].status);
              if (result?.data[0].component_type == 1) {
                if (Result_csm?.data[0][0].blood_gr == result?.data[0].bl_gr) {
                  if (
                    Result_csm?.data[0][0].blood_rh == result?.data[0].bl_rh
                  ) {
                    setshowbloodno_Detiler(result?.data[0]);
                    Crossmat_form.setFieldsValue({
                      Volume_csm: result.data[0].blood_value,
                      // Segment_csm: result.data[0].collectdate,
                    });
                    document.getElementById("Volume_csm").focus();
                  } else {
                    Modal.confirm({
                      title: (
                        <b style={{ fontSize: "22px", color: "black" }}>
                          เตือนการใช้เลือด
                        </b>
                      ),
                      className: "Modalwarning_noGR",
                      content: (
                        <Row justify="center">
                          <Col span={20}>
                            <Row style={{ marginTop: "1px" }}>
                              <p style={{ fontSize: "14px" }}>
                                หมู่เลือดคนไข้ คือ <b>{Data_BRQ[0]?.ABO}</b>
                              </p>
                            </Row>
                            <Row style={{ marginTop: "-20px" }}>
                              <p style={{ fontSize: "14px" }}>
                                หมู่เลือดถุงเลือด คือ
                                <b>{result?.data[0].gr}</b>
                              </p>
                            </Row>
                            <Row
                              style={{
                                marginTop: "-15px",
                                marginLeft: "-10px",
                              }}
                            >
                              <b style={{ fontSize: "14px" }}>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;หมู่เลือดอาร์เอชไม่ตรงกัน!!
                                <br />
                                ท่านต้องการทำรายการต่อไปหรือไม่
                              </b>
                            </Row>
                          </Col>
                        </Row>
                      ),
                      onCancel: (close) => {
                        close();
                        setshowbloodno_Detiler([]);
                        setCountTypeBlood();
                        Crossmat_form.resetFields();
                        // document.getElementById("Unit_no_csm").focus();
                        setgetformDataCrossmat_former("0");
                      },
                      onOk: (close) => {
                        close();
                        setGR_Alrit(true);
                        confirm_sendgroup_cross.resetFields();
                      },
                    });
                  }
                } else {
                  Modal.confirm({
                    title: (
                      <b style={{ fontSize: "22px", color: "black" }}>
                        เตือนการใช้เลือด
                      </b>
                    ),
                    className: "Modalwarning_noGR",
                    content: (
                      <Row justify="center">
                        <Col span={20}>
                          <Row style={{ marginTop: "1px" }}>
                            <p style={{ fontSize: "14px" }}>
                              หมู่เลือดคนไข้ คือ <b>{Data_BRQ[0]?.ABO}</b>
                            </p>
                          </Row>
                          <Row style={{ marginTop: "-20px" }}>
                            <p style={{ fontSize: "14px" }}>
                              หมู่เลือดถุงเลือด คือ <b>{result?.data[0].gr}</b>
                            </p>
                          </Row>
                          <Row
                            style={{ marginTop: "-15px", marginLeft: "-10px" }}
                          >
                            <b style={{ fontSize: "14px" }}>
                              &nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;หมู่เลือดไม่ตรงกัน!!
                              <br />
                              ท่านต้องการทำรายการต่อไปหรือไม่
                            </b>
                          </Row>
                        </Col>
                      </Row>
                    ),
                    onCancel: (close) => {
                      close();
                      setshowbloodno_Detiler([]);
                      setCountTypeBlood();
                      Crossmat_form.resetFields();
                      // document.getElementById("Unit_no_csm").focus();
                      setgetformDataCrossmat_former("0");
                    },
                    onOk: (close) => {
                      close();
                      setGR_Alrit(true);
                    },
                  });
                }
              } else if (result?.data[0].component_type == 2) {
                if (Result_csm?.data[0][0].blood_gr == result?.data[0].bl_gr) {
                  setshowbloodno_Detiler(result?.data[0]);
                  Crossmat_form.setFieldsValue({
                    Volume_csm: result.data[0].blood_value,
                    // Segment_csm: result.data[0].collectdate,
                  });
                  document.getElementById("Volume_csm").focus();
                } else {
                  Modal.confirm({
                    title: (
                      <b style={{ fontSize: "22px", color: "black" }}>
                        เตือนการใช้เลือด
                      </b>
                    ),
                    className: "Modalwarning_noGR",
                    content: (
                      <Row justify="center">
                        <Col span={20}>
                          <Row style={{ marginTop: "1px" }}>
                            <p style={{ fontSize: "14px" }}>
                              หมู่เลือดคนไข้ คือ <b>{Data_BRQ[0]?.ABO}</b>
                            </p>
                          </Row>
                          <Row style={{ marginTop: "-20px" }}>
                            <p style={{ fontSize: "14px" }}>
                              หมู่เลือดถุงเลือด คือ <b>{result?.data[0].gr}</b>
                            </p>
                          </Row>
                          <Row
                            style={{ marginTop: "-15px", marginLeft: "-10px" }}
                          >
                            <b style={{ fontSize: "14px" }}>
                              &nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;หมู่เลือดไม่ตรงกัน!!
                              <br />
                              ท่านต้องการทำรายการต่อไปหรือไม่
                            </b>
                          </Row>
                        </Col>
                      </Row>
                    ),
                    onCancel: (close) => {
                      close();
                      setshowbloodno_Detiler([]);
                      setCountTypeBlood();
                      Crossmat_form.resetFields();
                      // document.getElementById("Unit_no_csm").focus();
                      setgetformDataCrossmat_former("0");
                    },
                    onOk: (close) => {
                      close();
                      setGR_Alrit(true);
                    },
                  });
                }
              } else if (result?.data[0].component_type == 3) {
                if (Result_csm?.data[0][0].blood_gr == result?.data[0].bl_gr) {
                  setshowbloodno_Detiler(result?.data[0]);
                  Crossmat_form.setFieldsValue({
                    Volume_csm: result.data[0].blood_value,
                    // Segment_csm: result.data[0].collectdate,
                  });
                  document.getElementById("Volume_csm").focus();
                } else {
                  Modal.confirm({
                    title: (
                      <b style={{ fontSize: "22px", color: "black" }}>
                        เตือนการใช้เลือด
                      </b>
                    ),
                    className: "Modalwarning_noGR",
                    content: (
                      <Row justify="center">
                        <Col span={20}>
                          <Row style={{ marginTop: "1px" }}>
                            <p style={{ fontSize: "14px" }}>
                              หมู่เลือดคนไข้ คือ <b>{Data_BRQ[0]?.ABO}</b>
                            </p>
                          </Row>
                          <Row style={{ marginTop: "-20px" }}>
                            <p style={{ fontSize: "14px" }}>
                              หมู่เลือดถุงเลือด คือ <b>{result?.data[0].gr}</b>
                            </p>
                          </Row>
                          <Row
                            style={{ marginTop: "-15px", marginLeft: "-10px" }}
                          >
                            <b style={{ fontSize: "14px" }}>
                              &nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;หมู่เลือดไม่ตรงกัน!!
                              <br />
                              ท่านต้องการทำรายการต่อไปหรือไม่
                            </b>
                          </Row>
                        </Col>
                      </Row>
                    ),
                    onCancel: (close) => {
                      close();
                      setshowbloodno_Detiler([]);
                      setCountTypeBlood();
                      Crossmat_form.resetFields();
                      // document.getElementById("Unit_no_csm").focus();
                      setgetformDataCrossmat_former("0");
                    },
                    onOk: (close) => {
                      close();
                      setGR_Alrit(true);
                    },
                  });
                }
              } else if (result?.data[0].component_type == 4) {
                setshowbloodno_Detiler(result?.data[0]);
                Crossmat_form.setFieldsValue({
                  Volume_csm: result.data[0].blood_value,
                  // Segment_csm: result.data[0].collectdate,
                });
                document.getElementById("Volume_csm").focus();
              }
            } else {
              Modal.error({
                title: (
                  <b style={{ fontSize: "22px", color: "black" }}>
                    เตือนการใช้เลือด
                  </b>
                ),
                className: "ModalwarningGR",
                content: (
                  <Row justify="center">
                    <Col span={20}>
                      <Row style={{ marginTop: "5px" }}>
                        <p style={{ fontSize: "14px" }}>ถุงเลือด : &nbsp;</p>
                        <b style={{ fontSize: "24px", marginTop: "-5px" }}>
                          {result?.data[0].blood_no}
                        </b>
                      </Row>
                      <Row style={{ marginTop: "-15px" }}>
                        <p style={{ fontSize: "14px" }}>
                          อยู่ในขั้นตอนการ &nbsp;
                        </p>
                        <b style={{ fontSize: "24px", marginTop: "-5px" }}>
                          {result?.data[0].bl_status_name}
                        </b>
                      </Row>
                    </Col>
                  </Row>
                ),
                onOk: (close) => {
                  close();
                  setshowbloodno_Detiler([]);
                  setCountTypeBlood();
                  Crossmat_form.resetFields();
                  document.getElementById("Unit_no_csm").focus();
                  setgetformDataCrossmat_former("0");
                },
              });
            }
          }
        } else {
          Modal.error({
            title: (
              <b style={{ fontSize: "22px", color: "black" }}>
                เตือนถุงเลือดซ้ำ
              </b>
            ),
            className: "Modalwarningcross_again",
            content: (
              <Row justify="center">
                <Col span={20}>
                  <Row style={{ marginTop: "5px" }}>
                    <p style={{ fontSize: "14px" }}>
                      Unit no : <b>{resultcross?.data[0][0].bl_unit_no}</b>
                    </p>
                  </Row>
                  <Row style={{ marginTop: "-15px" }}>
                    <p style={{ fontSize: "14px" }}>
                      Type : <b>{result?.data[0].blood_type}</b> Group :
                      <b>{result?.data[0].gr}</b>
                    </p>
                  </Row>
                  <Row style={{ marginTop: "-15px" }}>
                    <p style={{ fontSize: "14px" }}>
                      สถานะ : <b>{result?.data[0].bl_status_name}</b>
                    </p>
                  </Row>
                  <Row style={{ marginTop: "-15px" }}>
                    <p style={{ fontSize: "14px" }}>
                      การทำงาน :
                      <span>
                        <b> พร้อมที่จะจ่ายเลือด</b>
                      </span>
                    </p>
                  </Row>
                </Col>
              </Row>
            ),
            onOk: (close) => {
              close();
              setshowbloodno_Detiler([]);
              setCountTypeBlood();
              Crossmat_form.resetFields();
              document.getElementById("Unit_no_csm").focus();
              setgetformDataCrossmat_former("0");
            },
            onCancel: (close) => {
              close();
              setshowbloodno_Detiler([]);
              setCountTypeBlood();
              Crossmat_form.resetFields();
              document.getElementById("Unit_no_csm").focus();
              setgetformDataCrossmat_former("0");
            },
          });
        }
      } else {
        Modal.error({
          title: "ERROR!!",
          content: "ไม่พบข้อมูล",
          onOk: (close) => {
            close();
            setshowbloodno_Detiler([]);
            setCountTypeBlood();
            Crossmat_form.resetFields();
            setgetformDataCrossmat_former("0");
          },
        });
      }
    }
  };
  const Volume_next = async () => {
    const formData = Crossmat_form.getFieldsValue();
    document.getElementById("Segment_csm").focus();
  };
  const ward_next = async () => {
    document.getElementById("Note").focus();
  };
  const pass_ungroup_next = async () => {
    document.getElementById("Pcrossmatch_un").focus();
  };
  const Segment_next = async () => {
    const formData = Crossmat_form.getFieldsValue();
    document.getElementById("Pcrossmatch").focus();
    Crossmat_form.setFieldsValue({
      Result_csm: "Compatible",
      Gel_csm: "Negative",
    });
  };
  const detil_next = async () => {
    document.getElementById("Pcrossmatch").focus();
  };
  const send_bbcode = async () => {
    const formData = frmblood_request.getFieldsValue();
    const result = await api.post(`/UP_BBCODE`, {
      ...formData,
      order_num: OrderNumber,
    });
    Modal.success({
      title: "บันทึกสำเร็จ",
    });
    await Data_bloodrequesresult_Form(OrderNumber);
  };
  const [UseonEditcross, setonEditcross] = useState([]);
  const [edit_crossinput, setedit_crossinput] = useState(false);

  const onEditcross = async (xm_id) => {
    document.getElementById("Segment_csm").focus();
    const result = await api.get("/Crossmatch_EDIT", {
      params: {
        xm_id: xm_id,
      },
    });
    const result2 = await api.get("/Count_TypeBlood_API", {
      params: {
        counttype: result.data[0][0]?.id_typeblood,
        od: OrderNumber,
      },
    });
    const resultSearch_bloodNO = await api.post(`/Search_bloodNO`, {
      Unit_no_csm: result.data[0][0]?.blood_no,

      blood_status_search: result.data[0][0]?.id_typeblood,
    });
    Modal.confirm({
      title: (
        <b style={{ fontSize: "22px", color: "black" }}>
          ยืนยันการแก้ไขข้อมูล การcrossmatch
        </b>
      ),
      className: "Modalwarningcross_Edit",

      onOk: (close) => {
        close();

        Crossmat_form.setFieldsValue({
          ...result.data[0],
          RT_csm: String(result.data[0][0]?.xm_rt),
          temperature_room_csm: String(result.data[0][0]?.xm_37c),
          Gel_csm: String(result.data[0][0]?.xm_gel),
          IAT_csm: String(result.data[0][0]?.xm_iat),
          blood_status_search: String(result.data[0][0]?.s_name),
          Result_csm: String(result.data[0][0]?.xm_result),
          Segment_csm: String(result.data[0][0]?.xm_segment),
          Unit_no_csm: String(result.data[0][0]?.blood_no),
          Volume_csm: String(result.data[0][0]?.xm_vol),
          xm_note: String(result.data[0][0]?.xm_note),
          xm_id: xm_id,
        });
        setonEditcross(result.data[0][0]);
        setCountTypeBlood(result2.data[0][0].count_unit);
        setedit_crossinput(true);

        // console.log("resultSearch_bloodNO",resultSearch_bloodNO?.data[0]);
        setshowbloodno_Detiler(resultSearch_bloodNO?.data[0]);
        if (
          result.data[0][0]?.id_typeblood == "1" ||
          result.data[0][0]?.id_typeblood == "2" ||
          result.data[0][0]?.id_typeblood == "6" ||
          result.data[0][0]?.id_typeblood == "13"
        ) {
          setgetformDataCrossmat_former(result.data[0][0]?.id_typeblood);
        } else {
          setgetformDataCrossmat_former("0");
        }
      },
      onCancel: (close) => {
        close();
        setshowbloodno_Detiler([]);
        setCountTypeBlood();
        Crossmat_form.resetFields();
        setgetformDataCrossmat_former("0");
        setedit_crossinput(false);
      },
    });
  };
  const NOUp_Crossmatch = async () => {
    Modal.confirm({
      title: (
        <b style={{ fontSize: "22px", color: "black" }}>
          ท่าต้องการยกเลิกการแก้ไขข้อมูล การcrossmatch
        </b>
      ),
      className: "Modalwarningcross_Edit",

      onOk: (close) => {
        close();
        setshowbloodno_Detiler([]);
        setCountTypeBlood();
        Crossmat_form.resetFields();
        setgetformDataCrossmat_former("0");
        setedit_crossinput(false);
        setonEditcross([]);
      },
      onCancel: (close) => {
        close();
      },
    });
  };

  const SendPatientGrouping = async () => {
    // ส่ง user_name and password
    PatientGroupingForm.setFieldsValue({
      passwordPatientGrouping: "",
    });
    const resultLogin = await api.post(`/Confirm_password`, {
      password: passwordPatientGrouping,
    });

    const staff_name =
      resultLogin.data.pname +
      " " +
      resultLogin.data.fname +
      " " +
      resultLogin.data.lname;
    try {
      if (resultLogin.data.id_user) {
        const formData_PG = PatientGroupingForm.getFieldsValue();
        const result = await api.post(`/UP_Patient_Grouping`, {
          // ...formData_PG,
          staff: staff_name,
          order_num: OrderNumber,
          anti_a: formData_PG.anti_a,
          anti_b: formData_PG.anti_b,
          anti_ab: formData_PG.anti_ab,
          anti_d: formData_PG.anti_d,
          anti_a1: formData_PG.anti_a1,
          anti_h: formData_PG.anti_h,
          cell_a: formData_PG.cell_a,
          cell_b: formData_PG.cell_b,
          cell_o: formData_PG.cell_o,
          cell_ctrl: formData_PG.cell_ctrl,
          blood_gr: formData_PG.blood_gr,
          blood_sub_gr: formData_PG.blood_sub_gr,
          rhd_rt: formData_PG.rhd_rt,
          rhd_37c: formData_PG.rhd_37c,
          rhd_iat: formData_PG.rhd_iat,
          blood_rh: formData_PG.blood_rh,
          grouping_staff: formData_PG.grouping_staff,
          note_Grouping: formData_PG.note_Grouping,
        });
        // console.log("result-----**-*-*-*-*-*",result);

        Modal.success({
          title: "บันทึกสำเร็จ",
        });
        await Data_bloodrequesresult_Form(OrderNumber);

        await Fetch_ConfirmDataPG();

        // window.location.reload();
      } else {
        Modal.error({
          title: "Password invalid",
          content: "กรุณากรอกรหัสผ่านให้ถูกต้อง!!",
        });
      }
    } catch (error) {
      Modal.error({ title: "Error", content: "!!!!!!!!!!!!!!!!!!!" });
    }
  };

  const SendAntibodyScreening = async () => {
    // ส่ง user_name and password
    AntibodyScreeningForm.setFieldsValue({
      passSendAntibodyScreening: "",
    });
    const resultLogin = await api.post(`/Confirm_password`, {
      password: passwordAntibodyScreening,
    });
    const staff_name =
      resultLogin.data.pname +
      " " +
      resultLogin.data.fname +
      " " +
      resultLogin.data.lname;
    // console.log("resultLogin", resultLogin.data);
    try {
      if (resultLogin.data.id_user) {
        const formData_PG = AntibodyScreeningForm.getFieldsValue();
        const result = await api.post(`/UP_AntibodyScreening`, {
          ...formData_PG,
          staff: staff_name,
          order_num: OrderNumber,
        });

        await Data_bloodrequesresult_Form(OrderNumber);
        Modal.success({
          title: "บันทึกสำเร็จ",
        });
        setPasswordAntibodyScreening();
      } else {
        Modal.error({
          title: "Password invalid",
          content: "กรุณากรอกรหัสผ่านให้ถูกต้อง!!",
        });
        setPasswordAntibodyScreening();
      }
    } catch (error) {
      Modal.error({ title: "Error", content: "!!!!!!!!!!!!!!!!!!!" });
    }
  };

  const SendDATandAutocontrol = async () => {
    // ส่ง user_name and password
    DATandAutocontrolForm.setFieldsValue({
      passSendDATandAutocontrol: "",
    });
    const resultLogin = await api.post(`/Confirm_password`, {
      password: passwordDATandAutocontrol,
    });
    const staff_name =
      resultLogin.data.pname +
      " " +
      resultLogin.data.fname +
      " " +
      resultLogin.data.lname;
    try {
      if (resultLogin.data.id_user) {
        const formData_PG = DATandAutocontrolForm.getFieldsValue();
        // console.log("formData_PG.....................", formData_PG);
        const result = await api.post(`/UP_DATandAutocontrol`, {
          ...formData_PG,
          staff: staff_name,
          order_num: OrderNumber,
        });
        await Data_bloodrequesresult_Form(OrderNumber);
        Modal.success({
          title: "บันทึกสำเร็จ",
        });
        setPasswordDATandAutocontrol();
      } else {
        Modal.error({
          title: "Password invalid",
          content: "กรุณากรอกรหัสผ่านให้ถูกต้อง!!",
        });
        setPasswordDATandAutocontrol();
      }
    } catch (error) {
      Modal.error({ title: "Error", content: "!!!!!!!!!!!!!!!!!!!" });
    }
  };

  const SendIdentificationDATA = async () => {
    // ส่ง user_name and password

    const resultLogin = await api.post(`/Confirm_password`, {
      password: passwordSendIdentification,
    });
    // console.log("resultLogin", resultLogin.data);
    const staff_name =
      resultLogin.data.pname +
      " " +
      resultLogin.data.fname +
      " " +
      resultLogin.data.lname;
    // Identification_formAntibody.setFieldsValue({
    //   passSendIdentifications: "",
    // });
    try {
      if (resultLogin.data.id_user) {
        const formData_PG = Identification_formAntibody.getFieldsValue();
        // console.log("formData_PGIdentification_formAntibody", formData_PG);
        const resultshowdata = await api.get("/Data_bloodrequesresult", {
          params: {
            NUM_BT: OrderNumber,
          },
        });
        const result = await api.post(`/UP_antibodyiden`, {
          ...formData_PG,
          A1: formData_PG.A1 === true ? "1" : "0",
          H: formData_PG.H === true ? "1" : "0",
          D: formData_PG.D === true ? "1" : "0",
          c1: formData_PG.c1 === true ? "1" : "0",
          e1: formData_PG.e1 === true ? "1" : "0",
          c2: formData_PG.c2 === true ? "1" : "0",
          e2: formData_PG.e2 === true ? "1" : "0",
          cw: formData_PG.cw === true ? "1" : "0",
          k1: formData_PG.k1 === true ? "1" : "0",
          k2: formData_PG.k2 === true ? "1" : "0",
          kpa: formData_PG.kpa === true ? "1" : "0",
          kpb: formData_PG.kpb === true ? "1" : "0",
          jsa: formData_PG.jsa === true ? "1" : "0",
          jsb: formData_PG.jsb === true ? "1" : "0",
          jka: formData_PG.jka === true ? "1" : "0",
          jkb: formData_PG.jkb === true ? "1" : "0",
          jk3: formData_PG.jk3 === true ? "1" : "0",
          m: formData_PG.m === true ? "1" : "0",
          n: formData_PG.n === true ? "1" : "0",
          s1: formData_PG.s1 === true ? "1" : "0",
          s2: formData_PG.s2 === true ? "1" : "0",
          mia: formData_PG.mia === true ? "1" : "0",
          lea: formData_PG.lea === true ? "1" : "0",
          leb: formData_PG.leb === true ? "1" : "0",
          fya: formData_PG.fya === true ? "1" : "0",
          fyb: formData_PG.fyb === true ? "1" : "0",
          fy3: formData_PG.fy3 === true ? "1" : "0",
          dia: formData_PG.dia === true ? "1" : "0",
          dib: formData_PG.dib === true ? "1" : "0",
          i1: formData_PG.i1 === true ? "1" : "0",
          i2: formData_PG.i2 === true ? "1" : "0",
          coa: formData_PG.coa === true ? "1" : "0",
          cob: formData_PG.cob === true ? "1" : "0",
          ct: formData_PG.ct === true ? "1" : "0",
          wt: formData_PG.wt === true ? "1" : "0",
          hemolysis: formData_PG.hemolysis === true ? "1" : "0",
          xga: formData_PG.xga === true ? "1" : "0",
          fm: formData_PG.fm === true ? "1" : "0",
          p1: formData_PG.p1 === true ? "1" : "0",
          tja: formData_PG.tja === true ? "1" : "0",
          uniden: formData_PG.uniden === true ? "1" : "0",
          lua: formData_PG.lua === true ? "1" : "0",
          lub: formData_PG.lub === true ? "1" : "0",
          rf: formData_PG.rf === true ? "1" : "0",
          staff: staff_name,
          hn: resultshowdata?.data[0][0].hn,
          note_antibody: formData_PG.note_antibody,
          // resultATB:resultATB,
        });
        const formData_PG2 = Identification_formAntigen.getFieldsValue();
        console.log("0000000000000000****", formData_PG2);
        const results = await api.post(`/UP_antigeniden`, {
          // ...formData_PG2,
          D : formData_PG2.D == undefined?"":formData_PG2.D,
          H : formData_PG2.H == undefined?"":formData_PG2.H,
          a1 : formData_PG2.a1 == undefined?"":formData_PG2.a1,
          c1 : formData_PG2.c1 == undefined?"":formData_PG2.c1,
          c2 : formData_PG2.c2 == undefined?"":formData_PG2.c2,
          coa : formData_PG2.coa == undefined?"":formData_PG2.coa,
          cob : formData_PG2.cob == undefined?"":formData_PG2.cob,
          dia : formData_PG2.dia == undefined?"":formData_PG2.dia,
          dib : formData_PG2.dib == undefined?"":formData_PG2.dib,
          e1 : formData_PG2.e1 == undefined?"":formData_PG2.e1,
          e2 : formData_PG2.e2 == undefined?"":formData_PG2.e2,
          fya : formData_PG2.fya == undefined?"":formData_PG2.fya,
          fyb : formData_PG2.fyb == undefined?"":formData_PG2.fyb,
          i1 : formData_PG2.i1 == undefined?"":formData_PG2.i1,
          i2 : formData_PG2.i2 == undefined?"":formData_PG2.i2,
          jka : formData_PG2.jka == undefined?"":formData_PG2.jka,
          jkb : formData_PG2.jkb == undefined?"":formData_PG2.jkb,
          k1 : formData_PG2.k1 == undefined?"":formData_PG2.k1,
          k2 : formData_PG2.k2 == undefined?"":formData_PG2.k2,
          lea : formData_PG2.lea == undefined?"":formData_PG2.lea,
          leb : formData_PG2.leb == undefined?"":formData_PG2.leb,
          lua : formData_PG2.lua == undefined?"":formData_PG2.lua,
          lub : formData_PG2.lub == undefined?"":formData_PG2.lub,
          m : formData_PG2.m == undefined?"":formData_PG2.m,
          mia : formData_PG2.mia == undefined?"":formData_PG2.mia,
          n : formData_PG2.n == undefined?"":formData_PG2.n,
          note_antigen : formData_PG2.note_antigen == undefined?"":formData_PG2.note_antigen,
          p : formData_PG2.p == undefined?"":formData_PG2.p,
          p1 : formData_PG2.p1 == undefined?"":formData_PG2.p1,
          resultATG : formData_PG2.resultATG == undefined?"":formData_PG2.resultATG,
          s1 : formData_PG2.s1 == undefined?"":formData_PG2.s1,
          s2 : formData_PG2.s2 == undefined?"":formData_PG2.s2,
          xga : formData_PG2.xga == undefined?"":formData_PG2.xga,

          staff: staff_name,
          hn: resultshowdata?.data[0][0].hn,
        });
        await Data_bloodrequesresult_Form(OrderNumber);
        await AntigenResult_Form(OrderNumber);
        await AntibodyResult_Form(OrderNumber);
        Modal.success({
          title: "บันทึกสำเร็จ",
          onOk: (close) => {
            close();
            setPasswordSendIdentification();
          },
        });
      } else {
        Modal.error({
          title: "Password invalid",
          content: "กรุณากรอกรหัสผ่านให้ถูกต้อง!!",
          onOk: (close) => {
            close();
            setPasswordSendIdentification();
          },
        });
        // setPasswordSendIdentification();
      }
    } catch (error) {
      Modal.error({ title: "Error", content: "!!!!!!!!!!!!!!!!!!!" });
    }
  };

  const Send_SAVEALL = async () => {
    // ส่ง user_name and password
    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });
    setIsModalsaveall(false);
    setPassword();
    const staff_name =
      resultLogin.data.pname +
      " " +
      resultLogin.data.fname +
      " " +
      resultLogin.data.lname;
    const Antigen = Identification_formAntigen.getFieldsValue();
    const Antibody = Identification_formAntibody.getFieldsValue();
    const DATandAutocontrol = DATandAutocontrolForm.getFieldsValue();
    const AntibodyScreening = AntibodyScreeningForm.getFieldsValue();
    const PatientGrouping = PatientGroupingForm.getFieldsValue();
    try {
      if (resultLogin.data.id_user) {
        if (PatientGrouping.blood_rh != " ") {
          if (PatientGrouping.blood_gr != "") {
            const formDataPatientGroupingForm =
              PatientGroupingForm.getFieldsValue();
            // console.log(
            //   // "formData_PGPatientGroupingForm.....................",
            //   formDataPatientGroupingForm
            // );
            const result1 = await api.post(`/UP_Patient_Grouping`, {
              ...formDataPatientGroupingForm,
              staff: staff_name,
              order_num: OrderNumber,
            });
          }
        }
        if (AntibodyScreening.abs_result != "") {
          const formData_PG = AntibodyScreeningForm.getFieldsValue();
          // console.log("SSSSS", formData_PG);
          const result2 = await api.post(`/UP_AntibodyScreening`, {
            ...formData_PG,
            staff: staff_name,
            order_num: OrderNumber,
          });
        }
        if (DATandAutocontrol.dat_result != "") {
          const formData_PGDATandAutocontrolForm =
            DATandAutocontrolForm.getFieldsValue();
          // console.log(
          //   "formData_PGDATandAutocontrolForm.....................",
          //   formData_PGDATandAutocontrolForm
          // );
          const result3 = await api.post(`/UP_DATandAutocontrol`, {
            ...formData_PGDATandAutocontrolForm,
            staff: staff_name,
            order_num: OrderNumber,
          });
        }
        if (Antibody.resultATB != "") {
          const formData_PG = Identification_formAntibody.getFieldsValue();
          // console.log("formData_Identification_formAntibody", formData_PG);
          const resultshowdata = await api.get("/Data_bloodrequesresult", {
            params: {
              NUM_BT: OrderNumber,
            },
          });
          const result4 = await api.post(`/UP_antibodyiden`, {
            ...formData_PG,
            A1: formData_PG.A1 === true ? "1" : "0",
            H: formData_PG.H === true ? "1" : "0",
            D: formData_PG.D === true ? "1" : "0",
            c1: formData_PG.c1 === true ? "1" : "0",
            e1: formData_PG.e1 === true ? "1" : "0",
            c2: formData_PG.c2 === true ? "1" : "0",
            e2: formData_PG.e2 === true ? "1" : "0",
            cw: formData_PG.cw === true ? "1" : "0",
            k1: formData_PG.k1 === true ? "1" : "0",
            k2: formData_PG.k2 === true ? "1" : "0",
            kpa: formData_PG.kpa === true ? "1" : "0",
            kpb: formData_PG.kpb === true ? "1" : "0",
            jsa: formData_PG.jsa === true ? "1" : "0",
            jsb: formData_PG.jsb === true ? "1" : "0",
            jka: formData_PG.jka === true ? "1" : "0",
            jkb: formData_PG.jkb === true ? "1" : "0",
            jk3: formData_PG.jk3 === true ? "1" : "0",
            m: formData_PG.m === true ? "1" : "0",
            n: formData_PG.n === true ? "1" : "0",
            s1: formData_PG.s1 === true ? "1" : "0",
            s2: formData_PG.s2 === true ? "1" : "0",
            mia: formData_PG.mia === true ? "1" : "0",
            lea: formData_PG.lea === true ? "1" : "0",
            leb: formData_PG.leb === true ? "1" : "0",
            fya: formData_PG.fya === true ? "1" : "0",
            fyb: formData_PG.fyb === true ? "1" : "0",
            fy3: formData_PG.fy3 === true ? "1" : "0",
            dia: formData_PG.dia === true ? "1" : "0",
            dib: formData_PG.dib === true ? "1" : "0",
            i1: formData_PG.i1 === true ? "1" : "0",
            i2: formData_PG.i2 === true ? "1" : "0",
            coa: formData_PG.coa === true ? "1" : "0",
            cob: formData_PG.cob === true ? "1" : "0",
            ct: formData_PG.ct === true ? "1" : "0",
            wt: formData_PG.wt === true ? "1" : "0",
            hemolysis: formData_PG.hemolysis === true ? "1" : "0",
            xga: formData_PG.xga === true ? "1" : "0",
            fm: formData_PG.fm === true ? "1" : "0",
            p1: formData_PG.p1 === true ? "1" : "0",
            tja: formData_PG.tja === true ? "1" : "0",
            uniden: formData_PG.uniden === true ? "1" : "0",
            lua: formData_PG.lua === true ? "1" : "0",
            lub: formData_PG.lub === true ? "1" : "0",
            rf: formData_PG.rf === true ? "1" : "0",
            staff: staff_name,
            hn: resultshowdata?.data[0][0].hn,
            // note_antibody:note_antibody,
            // resultATB:resultATB,
          });
        }
        if (Antigen.resultATG != "") {
          const formData_Identification_formAntibody =
            Identification_formAntigen.getFieldsValue();
          // console.log("formData_Identification_formAntibody", formData_Identification_formAntibody);
          const resultshowdata = await api.get("/Data_bloodrequesresult", {
            params: {
              NUM_BT: OrderNumber,
            },
          });
          const results5 = await api.post(`/UP_antigeniden`, {
            // ...formData_Identification_formAntibody,
            D : formData_Identification_formAntibody.D == undefined?"":formData_Identification_formAntibody.D,
            H : formData_Identification_formAntibody.H == undefined?"":formData_Identification_formAntibody.H,
            a1 : formData_Identification_formAntibody.a1 == undefined?"":formData_Identification_formAntibody.a1,
            c1 : formData_Identification_formAntibody.c1 == undefined?"":formData_Identification_formAntibody.c1,
            c2 : formData_Identification_formAntibody.c2 == undefined?"":formData_Identification_formAntibody.c2,
            coa : formData_Identification_formAntibody.coa == undefined?"":formData_Identification_formAntibody.coa,
            cob : formData_Identification_formAntibody.cob == undefined?"":formData_Identification_formAntibody.cob,
            dia : formData_Identification_formAntibody.dia == undefined?"":formData_Identification_formAntibody.dia,
            dib : formData_Identification_formAntibody.dib == undefined?"":formData_Identification_formAntibody.dib,
            e1 : formData_Identification_formAntibody.e1 == undefined?"":formData_Identification_formAntibody.e1,
            e2 : formData_Identification_formAntibody.e2 == undefined?"":formData_Identification_formAntibody.e2,
            fya : formData_Identification_formAntibody.fya == undefined?"":formData_Identification_formAntibody.fya,
            fyb : formData_Identification_formAntibody.fyb == undefined?"":formData_Identification_formAntibody.fyb,
            i1 : formData_Identification_formAntibody.i1 == undefined?"":formData_Identification_formAntibody.i1,
            i2 : formData_Identification_formAntibody.i2 == undefined?"":formData_Identification_formAntibody.i2,
            jka : formData_Identification_formAntibody.jka == undefined?"":formData_Identification_formAntibody.jka,
            jkb : formData_Identification_formAntibody.jkb == undefined?"":formData_Identification_formAntibody.jkb,
            k1 : formData_Identification_formAntibody.k1 == undefined?"":formData_Identification_formAntibody.k1,
            k2 : formData_Identification_formAntibody.k2 == undefined?"":formData_Identification_formAntibody.k2,
            lea : formData_Identification_formAntibody.lea == undefined?"":formData_Identification_formAntibody.lea,
            leb : formData_Identification_formAntibody.leb == undefined?"":formData_Identification_formAntibody.leb,
            lua : formData_Identification_formAntibody.lua == undefined?"":formData_Identification_formAntibody.lua,
            lub : formData_Identification_formAntibody.lub == undefined?"":formData_Identification_formAntibody.lub,
            m : formData_Identification_formAntibody.m == undefined?"":formData_Identification_formAntibody.m,
            mia : formData_Identification_formAntibody.mia == undefined?"":formData_Identification_formAntibody.mia,
            n : formData_Identification_formAntibody.n == undefined?"":formData_Identification_formAntibody.n,
            note_antigen : formData_Identification_formAntibody.note_antigen == undefined?"":formData_Identification_formAntibody.note_antigen,
            p : formData_Identification_formAntibody.p == undefined?"":formData_Identification_formAntibody.p,
            p1 : formData_Identification_formAntibody.p1 == undefined?"":formData_Identification_formAntibody.p1,
            resultATG : formData_Identification_formAntibody.resultATG == undefined?"":formData_Identification_formAntibody.resultATG,
            s1 : formData_Identification_formAntibody.s1 == undefined?"":formData_Identification_formAntibody.s1,
            s2 : formData_Identification_formAntibody.s2 == undefined?"":formData_Identification_formAntibody.s2,
            xga : formData_Identification_formAntibody.xga == undefined?"":formData_Identification_formAntibody.xga,
            staff: staff_name,
            hn: resultshowdata?.data[0][0].hn,
          });
        }
        Modal.success({
          title: "Successful confirmation",
          content: "ยืนยันสำเร็จ",
        });
        await Data_bloodrequesresult_Form(OrderNumber);
        await AntigenResult_Form(OrderNumber);
        await AntibodyResult_Form(OrderNumber);
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

  const Sendconfirm_grouping = async () => {
    // ส่ง user_name and password
    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });

    setPassword();
    const staff_name =
      resultLogin.data.pname +
      " " +
      resultLogin.data.fname +
      " " +
      resultLogin.data.lname;

    try {
      if (resultLogin.data.id_user) {
        const result1 = await api.put(`/con_pg`, {
          confirm: "Y",
          order_num: OrderNumber,
          staff: staff_name,
        });
        // window.close();
        Modal.success({
          title: "Successful confirmation",
          content: "ยืนยันสำเร็จ",
          onOk: (close) => {
            close();
            Fetch_ConfirmDataPG();
            setconfrim_pt(false);
          },
        });
        await showFetch_ConfirmDataPG_detils(OrderNumber);
      } else {
        Modal.error({
          title: "Password invalid",
          content: "กรุณากรอกรหัสผ่านให้ถูกต้อง!!",
          onOk: (close) => {
            close();
            setconfrim_pt(false);
          },
        });
      }
      // setconfrim_pt(false);
    } catch (error) {
      Modal.error({
        title: "Error",
        content: "กรุณากรอกข้อมูลให้ครบถ้วน!!",
      });
    }
  };
  //

  const [placement, SetPlacement] = React.useState("bottomLeft");

  const Patient_Grouping = [
    {
      // Cell Grouping
      key: "1",
      anti_a: (
        <Form.Item
          label=""
          name="anti_a"
          style={{
            margin: "-8px",
            marginLeft: "-8px",
            marginTop: "-12px",
            marginBottom: "-10px",
          }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ fontSize: "5px" }}
            placeholder="Anti_A"
            // style={{ width: 120 }}
          >
            {Choice_data_type_1?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      anti_b: (
        <Form.Item
          label=""
          name="anti_b"
          style={{
            margin: "-8px",
            marginLeft: "-8px",
            marginTop: "-12px",
            marginBottom: "-10px",
          }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ fontSize: "5px" }}
            placeholder="Anti_B"
          >
            {Choice_data_type_1?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      anti_ab: (
        <Form.Item
          label=""
          name="anti_ab"
          style={{
            margin: "-8px",
            marginLeft: "-8px",
            marginTop: "-12px",
            marginBottom: "-10px",
          }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ fontSize: "5px" }}
            placeholder="Anti_AB"
          >
            {Choice_data_type_1?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      anti_d: (
        <Form.Item
          label=""
          name="anti_d"
          style={{
            margin: "-8px",
            marginLeft: "-8px",
            marginTop: "-12px",
            marginBottom: "-10px",
          }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ fontSize: "5px" }}
            placeholder="Anti_D"
          >
            {Choice_data_type_1?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      anti_a1: (
        <Form.Item
          label=""
          name="anti_a1"
          style={{
            margin: "-8px",
            marginLeft: "-8px",
            marginTop: "-12px",
            marginBottom: "-10px",
          }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ fontSize: "5px" }}
            placeholder="Anti_A1"
          >
            {Choice_data_type_1?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      anti_h: (
        <Form.Item
          label=""
          name="anti_h"
          style={{
            margin: "-8px",
            marginLeft: "-8px",
            marginTop: "-12px",
            marginBottom: "-10px",
          }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ fontSize: "5px" }}
            placeholder="Anti_H"
          >
            {Choice_data_type_1?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      //   -------
      //  Serum Grouping
      cell_a: (
        <Form.Item
          label=""
          name="cell_a"
          style={{
            margin: "-8px",
            marginLeft: "-8px",
            marginTop: "-12px",
            marginBottom: "-10px",
          }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ fontSize: "5px" }}
            placeholder="A_Cell"
          >
            {Choice_data_type_1?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      cell_b: (
        <Form.Item
          label=""
          name="cell_b"
          style={{
            margin: "-8px",
            marginLeft: "-8px",
            marginTop: "-12px",
            marginBottom: "-10px",
          }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ fontSize: "5px" }}
            placeholder="B_Cell"
          >
            {Choice_data_type_1?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      cell_o: (
        <Form.Item
          label=""
          name="cell_o"
          style={{
            margin: "-8px",
            marginLeft: "-8px",
            marginTop: "-12px",
            marginBottom: "-10px",
          }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ fontSize: "5px" }}
            placeholder="O_Cell"
          >
            {Choice_data_type_1?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      cell_ctrl: (
        <Form.Item
          label=""
          name="cell_ctrl"
          style={{
            margin: "-8px",
            marginLeft: "-8px",
            marginTop: "-12px",
            marginBottom: "-10px",
          }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ fontSize: "5px" }}
            placeholder="Ctl"
          >
            {Choice_data_type_1?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      //   -------
      // group
      blood_gr: (
        <Form.Item
          label=""
          name="blood_gr"
          style={{
            margin: "-8px",
            marginLeft: "-8px",
            marginTop: "-12px",
            marginBottom: "-10px",
          }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "40px", fontSize: "5px" }}
            placeholder="Group"
            onChange={onChangeAlests_GR}
          >
            {blood_name?.map((item) => (
              <Option key={item.blood_name} value={item.blood_name}>
                <b style={{ fontSize: "12px" }}> {item.blood_name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      blood_sub_gr: (
        <Form.Item
          label=""
          name="blood_sub_gr"
          style={{
            margin: "-8px",
            marginLeft: "-8px",
            marginTop: "-12px",
            marginBottom: "-10px",
          }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            //
            size="small"
            style={{ width: "50px", fontSize: "5px" }}
            placeholder="Subgroup"
          >
            {blood_group_subgroup?.map((item) => (
              <Option
                key={item.subgroup_short_name}
                value={item.subgroup_short_name}
              >
                <b style={{ fontSize: "12px" }}> {item.subgroup_short_name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      //---
      //   Rh(D) Typing

      rhd_rt: (
        <Form.Item
          name="rhd_rt"
          style={{
            margin: "-8px",
            marginLeft: "-8px",
            marginTop: "-12px",
            marginBottom: "-10px",
          }}
          textAlign="center"
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ fontSize: "5px", textAlign: "center" }}
            placeholder="RT"
          >
            {Choice_data_type_1?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      rhd_37c: (
        <Form.Item
          label=""
          name="rhd_37c"
          style={{
            margin: "-8px",
            marginLeft: "-8px",
            marginTop: "-12px",
            marginBottom: "-10px",
          }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ fontSize: "5px" }}
            placeholder=" ํC"
          >
            {Choice_data_type_1?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      rhd_iat: (
        <Form.Item
          label=""
          name="rhd_iat"
          style={{
            margin: "-8px",
            marginLeft: "-8px",
            marginTop: "-12px",
            marginBottom: "-10px",
          }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ fontSize: "5px" }}
            placeholder="IAT"
          >
            {Choice_data_type_1?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      // ----
      //   RH
      blood_rh: (
        <Form.Item
          label=""
          name="blood_rh"
          style={{
            margin: "-8px",
            marginLeft: "-8px",
            marginTop: "-11px",
            marginBottom: "-10px",
          }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            onChange={onChangeRH}
            size="small"
            style={{ width: "50px", fontSize: "5px" }}
            placeholder="rh"
          >
            {rh_name?.map((item) => (
              <Option key={item.rh_midle_name} value={item.rh_midle_name}>
                <b style={{ fontSize: "14px" }}>{item.rh_midle_name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      //   ---------
    },
  ];
  const Antibody_Screening = [
    {
      // Cell Grouping
      key: "1",
      num_o: <b style={{ fontSize: "12px" }}>O1</b>,
      abs_rt: (
        <Form.Item
          label=""
          name="abs_o1_rt"
          style={{ marginTop: "-10px", margin: "-2px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            //
            size="small"
            style={{ fontSize: "5px" }}
            placeholder="RT"
            // style={{ width: 120 }}
          >
            {Choice_data_type_1?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      abs_37c: (
        <Form.Item
          label=""
          name="abs_o1_37c"
          style={{ marginTop: "-10px", margin: "-2px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            //
            size="small"
            style={{ fontSize: "5px" }}
            placeholder=" ํC"
            // style={{ width: 120 }}
          >
            {Choice_data_type_1?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      abs_iat: (
        <Form.Item
          label=""
          name="abs_o1_iat"
          style={{ marginTop: "-10px", margin: "-2px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            //
            size="small"
            style={{ fontSize: "5px" }}
            placeholder="IAT"
            // style={{ width: 120 }}
          >
            {Choice_data_type_1?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
    },
    {
      key: "2",
      num_o: <b style={{ fontSize: "12px" }}>O2</b>,
      abs_rt: (
        <Form.Item
          label=""
          name="abs_o2_rt"
          style={{ marginTop: "-10px", margin: "-2px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            //
            size="small"
            style={{ fontSize: "5px" }}
            placeholder="RT"
            // style={{ width: 120 }}
          >
            {Choice_data_type_1?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      abs_37c: (
        <Form.Item
          label=""
          name="abs_o2_37c"
          style={{ marginTop: "-10px", margin: "-2px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            //
            size="small"
            style={{ fontSize: "5px" }}
            placeholder=" ํC"
            // style={{ width: 120 }}
          >
            {Choice_data_type_1?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      abs_iat: (
        <Form.Item
          label=""
          name="abs_o2_iat"
          style={{ marginTop: "-10px", margin: "-2px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            //
            size="small"
            style={{ fontSize: "5px" }}
            placeholder="IAT"
            // style={{ width: 120 }}
          >
            {Choice_data_type_1?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
    },
    {
      key: "3",
      num_o: <b style={{ fontSize: "12px" }}>O3</b>,
      abs_rt: (
        <Form.Item
          label=""
          name="abs_o3_rt"
          style={{ marginTop: "-10px", margin: "-2px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            //
            size="small"
            style={{ fontSize: "5px" }}
            placeholder="RT"
            // style={{ width: 120 }}
          >
            {Choice_data_type_1?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      abs_37c: (
        <Form.Item
          label=""
          name="abs_o3_37c"
          style={{ marginTop: "-10px", margin: "-2px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            //
            size="small"
            style={{ fontSize: "5px" }}
            placeholder=" ํC"
            // style={{ width: 120 }}
          >
            {Choice_data_type_1?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      abs_iat: (
        <Form.Item
          label=""
          name="abs_o3_iat"
          style={{ marginTop: "-10px", margin: "-2px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            //
            size="small"
            style={{ fontSize: "5px" }}
            placeholder="IAT"
            // style={{ width: 120 }}
          >
            {Choice_data_type_1?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
    },
  ];

  const DAT_Autocontrol = [
    {
      // Cell Grouping
      key: "1",

      dat_rt: (
        <Form.Item
          label=""
          name="dat_rt"
          style={{ marginTop: "-12px", margin: "-8px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            //
            size="small"
            style={{ fontSize: "5px" }}
            placeholder="RT"
            // style={{ width: 120 }}
          >
            {Choice_data_type_1?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      dat_37c: (
        <Form.Item
          label=""
          name="dat_37c"
          style={{ marginTop: "-12px", margin: "-8px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            //
            size="small"
            style={{ fontSize: "5px" }}
            placeholder=" ํC"
            // style={{ width: 120 }}
          >
            {Choice_data_type_1?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      dat_iat: (
        <Form.Item
          label=""
          name="dat_iat"
          style={{ marginTop: "-12px", margin: "-8px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            //
            size="small"
            style={{ fontSize: "5px" }}
            placeholder="IAT"
            // style={{ width: 120 }}
          >
            {Choice_data_type_1?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      dat_result: (
        <Form.Item
          label=""
          name="dat_result"
          style={{ marginTop: "-12px", margin: "-8px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            //
            size="small"
            style={{ fontSize: "5px" }}
            placeholder="Result"
            // style={{ width: 120 }}
            onChange={onchangeDATAutocontroldat_result}
          >
            {LoadABSshow?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      // ---------------------------
      autologous_rt: (
        <Form.Item
          label=""
          name="autologous_rt"
          style={{ marginTop: "-12px", margin: "-8px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            //
            size="small"
            style={{ fontSize: "5px" }}
            placeholder="RT"
            // style={{ width: 120 }}
          >
            {Choice_data_type_1?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      autologous_37c: (
        <Form.Item
          label=""
          name="autologous_37c"
          style={{ marginTop: "-12px", margin: "-8px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            //
            size="small"
            style={{ fontSize: "5px" }}
            placeholder=" ํC"
            // style={{ width: 120 }}
          >
            {Choice_data_type_1?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      autologous_iat: (
        <Form.Item
          label=""
          name="autologous_iat"
          style={{ marginTop: "-12px", margin: "-8px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            //
            size="small"
            style={{ fontSize: "5px" }}
            placeholder="IAT"
            // style={{ width: 120 }}
          >
            {Choice_data_type_1?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      autologous_result: (
        <Form.Item
          label=""
          name="autologous_result"
          style={{ marginTop: "-12px", margin: "-8px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            //
            size="small"
            style={{ fontSize: "5px" }}
            placeholder="Result"
            // style={{ width: 120 }}
            onChange={onchangeDATAutocontrolautologous_result}
          >
            {LoadABSshow?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
    },
  ];

  const Identification_data = [
    {
      key: "1",
      A1_IDC: (
        <Form.Item
          label=""
          name="A1"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "-15px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            // style={{
            //   width: "100%",
            // }}
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      H_IDC: (
        <Form.Item
          label=""
          name="H"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox onChange={setResultATB} />
        </Form.Item>
      ),
      D_IDC: (
        <Form.Item
          label=""
          name="D"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox onChange={setResultATB} />
        </Form.Item>
      ),
      C_IDC: (
        <Form.Item
          label=""
          name="c1"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox onChange={setResultATB} />
        </Form.Item>
      ),
      E_IDC: (
        <Form.Item
          label=""
          name="e1"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox onChange={setResultATB} />
        </Form.Item>
      ),
      c_IDC: (
        <Form.Item
          label=""
          name="c2"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox onChange={setResultATB} />
        </Form.Item>
      ),
      e_IDC: (
        <Form.Item
          label=""
          name="e2"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox onChange={setResultATB} />
        </Form.Item>
      ),
      Cw_IDC: (
        <Form.Item
          label=""
          name="cw"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox onChange={setResultATB} />
        </Form.Item>
      ),
      K_IDC: (
        <Form.Item
          label=""
          name="k1"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox onChange={setResultATB} />
        </Form.Item>
      ),
      k_IDC: (
        <Form.Item
          label=""
          name="k2"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox onChange={setResultATB} />
        </Form.Item>
      ),
      Kpa_IDC: (
        <Form.Item
          label=""
          name="kpa"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox onChange={setResultATB} />
        </Form.Item>
      ),
      Kpb_IDC: (
        <Form.Item
          label=""
          name="kpb"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox onChange={setResultATB} />
        </Form.Item>
      ),
      Jsa_IDC: (
        <Form.Item
          label=""
          name="jsa"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox onChange={setResultATB} />
        </Form.Item>
      ),
      Jsb_IDC: (
        <Form.Item
          label=""
          name="jsb"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox onChange={setResultATB} />
        </Form.Item>
      ),
      Jka_IDC: (
        <Form.Item
          label=""
          name="jka"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox onChange={setResultATB} />
        </Form.Item>
      ),
      Jkb_IDC: (
        <Form.Item
          label=""
          name="jkb"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox onChange={setResultATB} />
        </Form.Item>
      ),
      Jk3_IDC: (
        <Form.Item
          label=""
          name="jk3"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox onChange={setResultATB} />
        </Form.Item>
      ),
      M_IDC: (
        <Form.Item
          label=""
          name="m"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox onChange={setResultATB} />
        </Form.Item>
      ),
      N_IDC: (
        <Form.Item
          label=""
          name="n"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox onChange={setResultATB} />
        </Form.Item>
      ),
      S_IDC: (
        <Form.Item
          label=""
          name="s1"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox onChange={setResultATB} />
        </Form.Item>
      ),
      s_IDC: (
        <Form.Item
          label=""
          name="s2"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox onChange={setResultATB} />
        </Form.Item>
      ),
      Mia_IDC: (
        <Form.Item
          label=""
          name="mia"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox onChange={setResultATB} />
        </Form.Item>
      ),
      Lea_IDC: (
        <Form.Item
          label=""
          name="lea"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox onChange={setResultATB} />
        </Form.Item>
      ),
      Leb_IDC: (
        <Form.Item
          label=""
          name="leb"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox onChange={setResultATB} />
        </Form.Item>
      ),
      Fya_IDC: (
        <Form.Item
          label=""
          name="fya"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox onChange={setResultATB} />
        </Form.Item>
      ),
      Fyb_IDC: (
        <Form.Item
          label=""
          name="fyb"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox onChange={setResultATB} />
        </Form.Item>
      ),
      Fy3_IDC: (
        <Form.Item
          label=""
          name="fy3"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox onChange={setResultATB} />
        </Form.Item>
      ),
      Dia_IDC: (
        <Form.Item
          label=""
          name="dia"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox onChange={setResultATB} />
        </Form.Item>
      ),
      Dib_IDC: (
        <Form.Item
          label=""
          name="dib"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox onChange={setResultATB} />
        </Form.Item>
      ),
      I_IDC: (
        <Form.Item
          label=""
          name="i1"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={
              {
                //   width: "100%",
                //   textAlign:"center"
                //   paddingLeft: "10px",
                //   marginRight: "-9px",
              }
            }
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      IH_IDC: (
        <Form.Item
          label=""
          name="i2"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={
              {
                //   width: "100%",
                //   paddingLeft: "10px",
                //   marginRight: "-9px",
              }
            }
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      Coa_IDC: (
        <Form.Item
          label=""
          name="coa"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={
              {
                //   width: "100%",
                //   paddingLeft: "10px",
                //   marginRight: "-10px",
              }
            }
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      Cob_IDC: (
        <Form.Item
          label=""
          name="cob"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={
              {
                //   width: "100%",
                //   paddingLeft: "10px",
                //   marginRight: "-13px",
              }
            }
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      CT_IDC: (
        <Form.Item
          label=""
          name="ct"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={
              {
                //   width: "100%",
                //   paddingLeft: "10px",
                //   marginRight: "-10px",
              }
            }
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      WT_IDC: (
        <Form.Item
          label=""
          name="wt"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={
              {
                //   width: "100%",
                //   paddingLeft: "10px",
                //   marginRight: "-10px",
              }
            }
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      Hemolysis_IDC: (
        <Form.Item
          label=""
          name="hemolysis"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={
              {
                //   width: "100%",
                //   paddingLeft: "55px",
                //   marginRight: "-10px",
              }
            }
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      Xga_IDC: (
        <Form.Item
          label=""
          name="xga"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={
              {
                //   width: "100%",
                //   paddingLeft: "15px",
                //   marginRight: "-10px",
              }
            }
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      F_M_IDC: (
        <Form.Item
          label=""
          name="fm"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={
              {
                //   width: "100%",
                //   paddingLeft: "15px",
                //   marginRight: "-10px",
              }
            }
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      P1_IDC: (
        <Form.Item
          label=""
          name="p1"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={
              {
                //   width: "100%",
                //   paddingLeft: "15px",
                //   marginRight: "-10px",
              }
            }
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      Tja_IDC: (
        <Form.Item
          label=""
          name="tja"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={
              {
                //   width: "100%",
                //   paddingLeft: "15px",
                //   marginRight: "-10px",
              }
            }
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      Uniden_IDC: (
        <Form.Item
          label=""
          name="uniden"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={
              {
                //   width: "100%",
                //   paddingLeft: "15px",
                //   marginRight: "-10px",
              }
            }
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      Lua_IDC: (
        <Form.Item
          label=""
          name="lua"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={
              {
                //   width: "100%",
                //   paddingLeft: "15px",
                //   marginRight: "-10px",
              }
            }
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      Lub_IDC: (
        <Form.Item
          label=""
          name="lub"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={
              {
                //   width: "100%",
                //   paddingLeft: "15px",
                //   marginRight: "-10px",
              }
            }
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      RF_IDC: (
        <Form.Item
          label=""
          name="rf"
          style={{
            marginTop: "-9px",
            marginBottom: "-13px",
            marginLeft: "1px",
            margin: "-15px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={
              {
                //   width: "100%",
                //   paddingLeft: "8px",
                //   marginRight: "-10px",
              }
            }
            onChange={setResultATB}
          />
        </Form.Item>
      ),
    },
  ];
  const Antigen_data = [
    {
      key: "1",
      A1_ATJ: (
        <Form.Item
          label=""
          name="a1"
          style={{ margin: "-7px", marginTop: "-5px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{
              marginLeft: "-4px",
              marginBottom: "5px",
              marginRight: "-20px",
            }}
            value={value}
          >
            <Radio
              value="+"
              // style={{  marginLeft: "9px",marginRight:"-5px" }}
            >
              <span style={{ marginLeft: "-10px" }}>+</span>
            </Radio>
            <br />
            <Radio
              value="-"
              style={{
                marginTop: "-5px",
                marginLeft: "1px",
              }}
            >
              <span style={{ marginLeft: "-10px" }}>-</span>
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      H_ATJ: (
        <Form.Item
          label=""
          name="H"
          style={{ margin: "-7px", marginTop: "-5px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{
              marginLeft: "-2px",
              marginBottom: "5px",
              marginRight: "-20px",
            }}
            value={value}
          >
            <Radio
              value="+"
              // style={{  marginLeft: "9px",marginRight:"-5px" }}
            >
              <span style={{ marginLeft: "-10px" }}>+</span>
            </Radio>
            <br />
            <Radio
              value="-"
              style={{
                marginTop: "-5px",
                marginLeft: "1px",
              }}
            >
              <span style={{ marginLeft: "-10px" }}>-</span>
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      D_ATJ: (
        <Form.Item
          label=""
          name="D"
          style={{ margin: "-7px", marginTop: "-5px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{
              marginLeft: "-2px",
              marginBottom: "5px",
              marginRight: "-20px",
            }}
            value={value}
          >
            <Radio
              value="+"
              // style={{  marginLeft: "9px",marginRight:"-5px" }}
            >
              <span style={{ marginLeft: "-10px" }}>+</span>
            </Radio>
            <br />
            <Radio
              value="-"
              style={{
                marginTop: "-5px",
                marginLeft: "1px",
              }}
            >
              <span style={{ marginLeft: "-10px" }}>-</span>
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      C_ATJ: (
        <Form.Item
          label=""
          name="c1"
          style={{ margin: "-7px", marginTop: "-5px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{
              marginLeft: "-1px",
              marginBottom: "5px",
              marginRight: "-20px",
            }}
            value={value}
          >
            <Radio
              value="+"
              // style={{  marginLeft: "9px",marginRight:"-5px" }}
            >
              <span style={{ marginLeft: "-10px" }}>+</span>
            </Radio>
            <br />
            <Radio
              value="-"
              style={{
                marginTop: "-5px",
                marginLeft: "1px",
              }}
            >
              <span style={{ marginLeft: "-10px" }}>-</span>
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      c_ATJ: (
        <Form.Item
          label=""
          name="c2"
          style={{ margin: "-7px", marginTop: "-5px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{
              marginLeft: "-1px",
              marginBottom: "5px",
              marginRight: "-20px",
            }}
            value={value}
          >
            <Radio
              value="+"
              // style={{  marginLeft: "9px",marginRight:"-5px" }}
            >
              <span style={{ marginLeft: "-10px" }}>+</span>
            </Radio>
            <br />
            <Radio
              value="-"
              style={{
                marginTop: "-5px",
                marginLeft: "1px",
              }}
            >
              <span style={{ marginLeft: "-10px" }}>-</span>
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      E_ATJ: (
        <Form.Item
          label=""
          name="e1"
          style={{ margin: "-7px", marginTop: "-5px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{
              marginLeft: "-1px",
              marginBottom: "5px",
              marginRight: "-20px",
            }}
            value={value}
          >
            <Radio
              value="+"
              // style={{  marginLeft: "9px",marginRight:"-5px" }}
            >
              <span style={{ marginLeft: "-10px" }}>+</span>
            </Radio>
            <br />
            <Radio
              value="-"
              style={{
                marginTop: "-5px",
                marginLeft: "1px",
              }}
            >
              <span style={{ marginLeft: "-10px" }}>-</span>
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      e_ATJ: (
        <Form.Item
          label=""
          name="e2"
          style={{ margin: "-7px", marginTop: "-5px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{
              marginLeft: "-1px",
              marginBottom: "5px",
              marginRight: "-20px",
            }}
            value={value}
          >
            <Radio
              value="+"
              // style={{  marginLeft: "9px",marginRight:"-5px" }}
            >
              <span style={{ marginLeft: "-10px" }}>+</span>
            </Radio>
            <br />
            <Radio
              value="-"
              style={{
                marginTop: "-5px",
                marginLeft: "1px",
              }}
            >
              <span style={{ marginLeft: "-10px" }}>-</span>
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      K_ATJ: (
        <Form.Item
          label=""
          name="k1"
          style={{ margin: "-7px", marginTop: "-5px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{
              marginLeft: "-1px",
              marginBottom: "5px",
              marginRight: "-20px",
            }}
            value={value}
          >
            <Radio
              value="+"
              // style={{  marginLeft: "9px",marginRight:"-5px" }}
            >
              <span style={{ marginLeft: "-10px" }}>+</span>
            </Radio>
            <br />
            <Radio
              value="-"
              style={{
                marginTop: "-5px",
                marginLeft: "1px",
              }}
            >
              <span style={{ marginLeft: "-10px" }}>-</span>
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      k_ATJ: (
        <Form.Item
          label=""
          name="k2"
          style={{ margin: "-7px", marginTop: "-5px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{
              marginLeft: "-1px",
              marginBottom: "5px",
              marginRight: "-20px",
            }}
            value={value}
          >
            <Radio
              value="+"
              // style={{  marginLeft: "9px",marginRight:"-5px" }}
            >
              <span style={{ marginLeft: "-10px" }}>+</span>
            </Radio>
            <br />
            <Radio
              value="-"
              style={{
                marginTop: "-5px",
                marginLeft: "1px",
              }}
            >
              <span style={{ marginLeft: "-10px" }}>-</span>
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      Dia_ATJ: (
        <Form.Item
          label=""
          name="dia"
          style={{ margin: "-7px", marginTop: "-5px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{
              marginLeft: "-6px",
              marginBottom: "5px",
              marginRight: "-20px",
            }}
            value={value}
          >
            <Radio
              value="+"
              // style={{  marginLeft: "9px",marginRight:"-5px" }}
            >
              <span style={{ marginLeft: "-10px" }}>+</span>
            </Radio>
            <br />
            <Radio
              value="-"
              style={{
                marginTop: "-5px",
                marginLeft: "1px",
              }}
            >
              <span style={{ marginLeft: "-10px" }}>-</span>
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      Dib_ATJ: (
        <Form.Item
          label=""
          name="dib"
          style={{ margin: "-7px", marginTop: "-5px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{
              marginLeft: "-6px",
              marginBottom: "5px",
              marginRight: "-20px",
            }}
            value={value}
          >
            <Radio
              value="+"
              // style={{  marginLeft: "9px",marginRight:"-5px" }}
            >
              <span style={{ marginLeft: "-10px" }}>+</span>
            </Radio>
            <br />
            <Radio
              value="-"
              style={{
                marginTop: "-5px",
                marginLeft: "1px",
              }}
            >
              <span style={{ marginLeft: "-10px" }}>-</span>
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      M_ATJ: (
        <Form.Item
          label=""
          name="m"
          style={{ margin: "-7px", marginTop: "-5px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{
              marginLeft: "-6px",
              marginBottom: "5px",
              marginRight: "-20px",
            }}
            value={value}
          >
            <Radio
              value="+"
              // style={{  marginLeft: "9px",marginRight:"-5px" }}
            >
              <span style={{ marginLeft: "-10px" }}>+</span>
            </Radio>
            <br />
            <Radio
              value="-"
              style={{
                marginTop: "-5px",
                marginLeft: "1px",
              }}
            >
              <span style={{ marginLeft: "-10px" }}>-</span>
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      N_ATJ: (
        <Form.Item
          label=""
          name="n"
          style={{ margin: "-7px", marginTop: "-5px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{
              marginLeft: "-6px",
              marginBottom: "5px",
              marginRight: "-20px",
            }}
            value={value}
          >
            <Radio
              value="+"
              // style={{  marginLeft: "9px",marginRight:"-5px" }}
            >
              <span style={{ marginLeft: "-10px" }}>+</span>
            </Radio>
            <br />
            <Radio
              value="-"
              style={{
                marginTop: "-5px",
                marginLeft: "1px",
              }}
            >
              <span style={{ marginLeft: "-10px" }}>-</span>
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      S_ATJ: (
        <Form.Item
          label=""
          name="s1"
          style={{ margin: "-7px", marginTop: "-5px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{
              marginLeft: "-6px",
              marginBottom: "5px",
              marginRight: "-20px",
            }}
            value={value}
          >
            <Radio
              value="+"
              // style={{  marginLeft: "9px",marginRight:"-5px" }}
            >
              <span style={{ marginLeft: "-10px" }}>+</span>
            </Radio>
            <br />
            <Radio
              value="-"
              style={{
                marginTop: "-5px",
                marginLeft: "1px",
              }}
            >
              <span style={{ marginLeft: "-10px" }}>-</span>
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      s_ATJ: (
        <Form.Item
          label=""
          name="s2"
          style={{ margin: "-7px", marginTop: "-5px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{
              marginLeft: "-6px",
              marginBottom: "5px",
              marginRight: "-20px",
            }}
            value={value}
          >
            <Radio
              value="+"
              // style={{  marginLeft: "9px",marginRight:"-5px" }}
            >
              <span style={{ marginLeft: "-10px" }}>+</span>
            </Radio>
            <br />
            <Radio
              value="-"
              style={{
                marginTop: "-5px",
                marginLeft: "1px",
              }}
            >
              <span style={{ marginLeft: "-10px" }}>-</span>
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      Mia_ATJ: (
        <Form.Item
          label=""
          name="mia"
          style={{ margin: "-7px", marginTop: "-5px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{
              marginLeft: "-6px",
              marginBottom: "5px",
              marginRight: "-20px",
            }}
            value={value}
          >
            <Radio
              value="+"
              // style={{  marginLeft: "9px",marginRight:"-5px" }}
            >
              <span style={{ marginLeft: "-10px" }}>+</span>
            </Radio>
            <br />
            <Radio
              value="-"
              style={{
                marginTop: "-5px",
                marginLeft: "1px",
              }}
            >
              <span style={{ marginLeft: "-10px" }}>-</span>
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      Lea_ATJ: (
        <Form.Item
          label=""
          name="lea"
          style={{ margin: "-7px", marginTop: "-5px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{
              marginLeft: "-6px",
              marginBottom: "5px",
              marginRight: "-20px",
            }}
            value={value}
          >
            <Radio
              value="+"
              // style={{  marginLeft: "9px",marginRight:"-5px" }}
            >
              <span style={{ marginLeft: "-10px" }}>+</span>
            </Radio>
            <br />
            <Radio
              value="-"
              style={{
                marginTop: "-5px",
                marginLeft: "1px",
              }}
            >
              <span style={{ marginLeft: "-10px" }}>-</span>
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      Leb_ATJ: (
        <Form.Item
          label=""
          name="leb"
          style={{ margin: "-7px", marginTop: "-5px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{
              marginLeft: "-6px",
              marginBottom: "5px",
              marginRight: "-20px",
            }}
            value={value}
          >
            <Radio
              value="+"
              // style={{  marginLeft: "9px",marginRight:"-5px" }}
            >
              <span style={{ marginLeft: "-10px" }}>+</span>
            </Radio>
            <br />
            <Radio
              value="-"
              style={{
                marginTop: "-5px",
                marginLeft: "1px",
              }}
            >
              <span style={{ marginLeft: "-10px" }}>-</span>
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      Coa_ATJ: (
        <Form.Item
          label=""
          name="coa"
          style={{ margin: "-7px", marginTop: "-5px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{
              marginLeft: "-6px",
              marginBottom: "5px",
              marginRight: "-20px",
            }}
            value={value}
          >
            <Radio
              value="+"
              // style={{  marginLeft: "9px",marginRight:"-5px" }}
            >
              <span style={{ marginLeft: "-10px" }}>+</span>
            </Radio>
            <br />
            <Radio
              value="-"
              style={{
                marginTop: "-5px",
                marginLeft: "1px",
              }}
            >
              <span style={{ marginLeft: "-10px" }}>-</span>
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      Cob_ATJ: (
        <Form.Item
          label=""
          name="cob"
          style={{ margin: "-7px", marginTop: "-5px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{
              marginLeft: "-6px",
              marginBottom: "5px",
              marginRight: "-20px",
            }}
            value={value}
          >
            <Radio
              value="+"
              // style={{  marginLeft: "9px",marginRight:"-5px" }}
            >
              <span style={{ marginLeft: "-10px" }}>+</span>
            </Radio>
            <br />
            <Radio
              value="-"
              style={{
                marginTop: "-5px",
                marginLeft: "1px",
              }}
            >
              <span style={{ marginLeft: "-10px" }}>-</span>
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      Jka_ATJ: (
        <Form.Item
          label=""
          name="jka"
          style={{ margin: "-7px", marginTop: "-5px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{
              marginLeft: "-6px",
              marginBottom: "5px",
              marginRight: "-20px",
            }}
            value={value}
          >
            <Radio
              value="+"
              // style={{  marginLeft: "9px",marginRight:"-5px" }}
            >
              <span style={{ marginLeft: "-10px" }}>+</span>
            </Radio>
            <br />
            <Radio
              value="-"
              style={{
                marginTop: "-5px",
                marginLeft: "1px",
              }}
            >
              <span style={{ marginLeft: "-10px" }}>-</span>
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      Jkb_ATJ: (
        <Form.Item
          label=""
          name="jkb"
          style={{ margin: "-7px", marginTop: "-5px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{
              marginLeft: "-6px",
              marginBottom: "5px",
              marginRight: "-20px",
            }}
            value={value}
          >
            <Radio
              value="+"
              // style={{  marginLeft: "9px",marginRight:"-5px" }}
            >
              <span style={{ marginLeft: "-10px" }}>+</span>
            </Radio>
            <br />
            <Radio
              value="-"
              style={{
                marginTop: "-5px",
                marginLeft: "1px",
              }}
            >
              <span style={{ marginLeft: "-10px" }}>-</span>
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      I_ATJ: (
        <Form.Item
          label=""
          name="i1"
          style={{ margin: "-7px", marginTop: "-5px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{
              marginLeft: "-6px",
              marginBottom: "5px",
              marginRight: "-20px",
            }}
            value={value}
          >
            <Radio
              value="+"
              // style={{  marginLeft: "9px",marginRight:"-5px" }}
            >
              <span style={{ marginLeft: "-10px" }}>+</span>
            </Radio>
            <br />
            <Radio
              value="-"
              style={{
                marginTop: "-5px",
                marginLeft: "1px",
              }}
            >
              <span style={{ marginLeft: "-10px" }}>-</span>
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      i_ATJ: (
        <Form.Item
          label=""
          name="i2"
          style={{ margin: "-7px", marginTop: "-5px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{
              marginLeft: "-6px",
              marginBottom: "5px",
              marginRight: "-20px",
            }}
            value={value}
          >
            <Radio
              value="+"
              // style={{  marginLeft: "9px",marginRight:"-5px" }}
            >
              <span style={{ marginLeft: "-10px" }}>+</span>
            </Radio>
            <br />
            <Radio
              value="-"
              style={{
                marginTop: "-5px",
                marginLeft: "1px",
              }}
            >
              <span style={{ marginLeft: "-10px" }}>-</span>
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      P1_ATJ: (
        <Form.Item
          label=""
          name="p1"
          style={{ margin: "-7px", marginTop: "-5px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{
              marginLeft: "-6px",
              marginBottom: "5px",
              marginRight: "-20px",
            }}
            value={value}
          >
            <Radio
              value="+"
              // style={{  marginLeft: "9px",marginRight:"-5px" }}
            >
              <span style={{ marginLeft: "-10px" }}>+</span>
            </Radio>
            <br />
            <Radio
              value="-"
              style={{
                marginTop: "-5px",
                marginLeft: "1px",
              }}
            >
              <span style={{ marginLeft: "-10px" }}>-</span>
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      p_ATJ: (
        <Form.Item
          label=""
          name="p"
          style={{ margin: "-7px", marginTop: "-5px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{
              marginLeft: "-6px",
              marginBottom: "5px",
              marginRight: "-20px",
            }}
            value={value}
          >
            <Radio
              value="+"
              // style={{  marginLeft: "9px",marginRight:"-5px" }}
            >
              <span style={{ marginLeft: "-10px" }}>+</span>
            </Radio>
            <br />
            <Radio
              value="-"
              style={{
                marginTop: "-5px",
                marginLeft: "1px",
              }}
            >
              <span style={{ marginLeft: "-10px" }}>-</span>
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      Lua_ATJ: (
        <Form.Item
          label=""
          name="lua"
          style={{ margin: "-7px", marginTop: "-5px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{
              marginLeft: "-18px",
              marginBottom: "5px",
              marginRight: "-35px",
            }}
            value={value}
          >
            <Radio
              value="+"
              // style={{  marginLeft: "9px",marginRight:"-5px" }}
            >
              <span style={{ marginLeft: "-10px" }}>+</span>
            </Radio>
            <br />
            <Radio
              value="-"
              style={{
                marginTop: "-5px",
                marginLeft: "1px",
              }}
            >
              <span style={{ marginLeft: "-10px" }}>-</span>
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      Lub_ATJ: (
        <Form.Item
          label=""
          name="lub"
          style={{ margin: "-7px", marginTop: "-5px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{
              marginLeft: "-6px",
              marginBottom: "5px",
              marginRight: "-20px",
            }}
            value={value}
          >
            <Radio
              value="+"
              // style={{  marginLeft: "9px",marginRight:"-5px" }}
            >
              <span style={{ marginLeft: "-10px" }}>+</span>
            </Radio>
            <br />
            <Radio
              value="-"
              style={{
                marginTop: "-5px",
                marginLeft: "1px",
              }}
            >
              <span style={{ marginLeft: "-10px" }}>-</span>
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      Fya_ATJ: (
        <Form.Item
          label=""
          name="fya"
          style={{ margin: "-7px", marginTop: "-5px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{
              marginLeft: "-6px",
              marginBottom: "5px",
              marginRight: "-20px",
            }}
            value={value}
          >
            <Radio
              value="+"
              // style={{  marginLeft: "9px",marginRight:"-5px" }}
            >
              <span style={{ marginLeft: "-10px" }}>+</span>
            </Radio>
            <br />
            <Radio
              value="-"
              style={{
                marginTop: "-5px",
                marginLeft: "1px",
              }}
            >
              <span style={{ marginLeft: "-10px" }}>-</span>
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      Fyb_ATJ: (
        <Form.Item
          label=""
          name="fyb"
          style={{ margin: "-7px", marginTop: "-5px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{
              marginLeft: "-6px",
              marginBottom: "5px",
              marginRight: "-20px",
            }}
            value={value}
          >
            <Radio
              value="+"
              // style={{  marginLeft: "9px",marginRight:"-5px" }}
            >
              <span style={{ marginLeft: "-10px" }}>+</span>
            </Radio>
            <br />
            <Radio
              value="-"
              style={{
                marginTop: "-5px",
                marginLeft: "1px",
              }}
            >
              <span style={{ marginLeft: "-10px" }}>-</span>
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      Xga_ATJ: (
        <Form.Item
          label=""
          name="xga"
          style={{ margin: "-7px", marginTop: "-5px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{
              marginLeft: "-6px",
              marginBottom: "5px",
              marginRight: "-20px",
            }}
            value={value}
          >
            <Radio
              value="+"
              // style={{  marginLeft: "9px",marginRight:"-5px" }}
            >
              <span style={{ marginLeft: "-10px" }}>+</span>
            </Radio>
            <br />
            <Radio
              value="-"
              style={{
                marginTop: "-5px",
                marginLeft: "1px",
              }}
            >
              <span style={{ marginLeft: "-10px" }}>-</span>
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
    },
  ];

  const ClickRow = async (value) => {
    console.log("value", value);
    const result = await api.get("/Data_bloodrequesresult", {
      params: {
        NUM_BT: OrderNumber,
      },
    });

    if (value == "anti_a") {
      setshowresult_onclick_Title("Anti-A");
      setshowresult_onclick(result?.data[0][0]?.anti_a);
      setshowresult_onclickimage(result?.data[0][0]?.anti_a_pic);
    } else if (value == "anti_b") {
      setshowresult_onclick_Title("Anti-B");
      setshowresult_onclick(result?.data[0][0]?.anti_b);
      setshowresult_onclickimage(result?.data[0][0]?.anti_b_pic);
    } else if (value == "anti_d") {
      setshowresult_onclick_Title("Anti-D");
      setshowresult_onclick(result?.data[0][0]?.anti_d);
      setshowresult_onclickimage(result?.data[0][0]?.anti_d_pic);
    } else if (value == "cell_ctrl") {
      setshowresult_onclick_Title("Ctl");
      setshowresult_onclick(result?.data[0][0]?.cell_ctrl);
      setshowresult_onclickimage(result?.data[0][0]?.cell_ctrl_pic);
    } else if (value == "cell_a") {
      setshowresult_onclick_Title("A-Cell");
      setshowresult_onclick(result?.data[0][0]?.cell_a);
      setshowresult_onclickimage(result?.data[0][0]?.cell_a_pic);
    } else if (value == "cell_b") {
      setshowresult_onclick_Title("B-Cell");
      setshowresult_onclick(result?.data[0][0]?.cell_b);
      setshowresult_onclickimage(result?.data[0][0]?.cell_b_pic);
    } else if (value == "o1") {
      setshowresult_onclick_Title("I");
      setshowresult_onclick(result?.data[0][0]?.abs_o1_iat);
      setshowresult_onclickimage(result?.data[0][0]?.abs_o1_iat_pic);
    } else if (value == "o2") {
      setshowresult_onclick_Title("II");
      setshowresult_onclick(result?.data[0][0]?.abs_o2_iat);
      setshowresult_onclickimage(result?.data[0][0]?.abs_o2_iat_pic);
    } else if (value == "dat") {
      setshowresult_onclick_Title("DAT");
      setshowresult_onclick(result?.data[0][0]?.dat_result);
      setshowresult_onclickimage(result?.data[0][0]?.dat_iat_pic);
    } else if (value == "ac") {
      setshowresult_onclick_Title("AC");
      setshowresult_onclick(result?.data[0][0]?.autologous_result);
      setshowresult_onclickimage(result?.data[0][0]?.autologous_iat_pic);
    } else if (value == "anti_a_mom") {
      setshowresult_onclick_Title("Anti-A");
      setshowresult_onclick(result?.data[0][0]?.anti_a_mom);
      setshowresult_onclickimage(result?.data[0][0]?.anti_a_pic_mom);
    } else if (value == "anti_b_mom") {
      setshowresult_onclick_Title("Anti-B");
      setshowresult_onclick(result?.data[0][0]?.anti_b_mom);
      setshowresult_onclickimage(result?.data[0][0]?.anti_b_pic_mom);
    } else if (value == "anti_d_mom") {
      setshowresult_onclick_Title("Anti-D");
      setshowresult_onclick(result?.data[0][0]?.anti_d_mom);
      setshowresult_onclickimage(result?.data[0][0]?.anti_d_pic_mom);
    } else if (value == "cell_ctrl_mom") {
      setshowresult_onclick_Title("Ctl");
      setshowresult_onclick(result?.data[0][0]?.cell_ctrl_mom);
      setshowresult_onclickimage(result?.data[0][0]?.cell_ctrl_pic_mom);
    } else if (value == "cell_a_mom") {
      setshowresult_onclick_Title("A-Cell");
      setshowresult_onclick(result?.data[0][0]?.cell_a_mom);
      setshowresult_onclickimage(result?.data[0][0]?.cell_a_pic_mom);
    } else if (value == "cell_b_mom") {
      setshowresult_onclick_Title("B-Cell");
      setshowresult_onclick(result?.data[0][0]?.cell_b_mom);
      setshowresult_onclickimage(result?.data[0][0]?.cell_b_pic_mom);
    } else if (value == "o1_mom") {
      setshowresult_onclick_Title("I");
      setshowresult_onclick(result?.data[0][0]?.abs_o1_iat_mom);
      setshowresult_onclickimage(result?.data[0][0]?.abs_o1_iat_pic_mom);
    } else if (value == "o2_mom") {
      setshowresult_onclick_Title("II");
      setshowresult_onclick(result?.data[0][0]?.abs_o2_iat_mom);
      setshowresult_onclickimage(result?.data[0][0]?.abs_o2_iat_pic_mom);
    } else if (value == "dat_mom") {
      setshowresult_onclick_Title("DAT");
      setshowresult_onclick(result?.data[0][0]?.dat_result_mom);
      setshowresult_onclickimage(result?.data[0][0]?.dat_iat_pic_mom);
    } else if (value == "ac_mom") {
      setshowresult_onclick_Title("AC");
      setshowresult_onclick(result?.data[0][0]?.autologous_result_mom);
      setshowresult_onclickimage(result?.data[0][0]?.autologous_iat_pic_mom);
    }

    // await Data_bloodrequesresult_Form(OrderNumber);
  };

  const [showresult_onclick_Title, setshowresult_onclick_Title] = useState();
  const [showresult_onclick, setshowresult_onclick] = useState();
  const [showresult_onclickimage, setshowresult_onclickimage] = useState();
  const [Date_path, setDate_path] = useState();

  const setDOB = () => {
    const a = moment().format("YYYY-MM-DD");

    const years = moment().add(543, "years").format("YY");
    const months = moment().format("MM");
    const day = moment().format("DD");
    const Date = years + months;
    // console.log("f^%=======>>>>>>>>>>",Date);
    console.log(
      "====1",
      `${env.PATH_IMG}/image/${Date_path}/${Data_BRQ[0]?.anti_a_pic}?pathType=3`
    );
    console.log(
      "2222",
      `${env.PATH_IMG}/image/${Data_BRQ[0]?.anti_b_pic}?pathType=3`
    );
    setDate_path(Date);
  };

  const Labresult_ABO_anti_a_mom = [
    {
      key: "0",
      anti_a:
        Data_BRQ[0]?.anti_a_pic_mom == "" ||
        Data_BRQ[0]?.anti_a_pic_mom == null ||
        Data_BRQ[0]?.anti_a_pic_mom == undefined ||
        Data_BRQ[0]?.anti_a_pic_mom == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "121px",
            }}
          ></p>
        ) : (
          <img
            width={50}
            src={`${env.PATH_IMG}/image_typescreen/${Data_BRQ[0]?.anti_a_pic_mom}?pathType=99`}
          />
        ),
    },
    {
      key: "1",
      anti_a:
        Data_BRQ[0]?.anti_a_mom == "" ||
        Data_BRQ[0]?.anti_a_mom == null ||
        Data_BRQ[0]?.anti_a_mom == undefined ||
        Data_BRQ[0]?.anti_a_mom == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "7px",
            }}
          ></p>
        ) : (
          <b>{Data_BRQ[0]?.anti_a_mom}</b>
        ),
    },
  ];
  const Labresult_ABO_anti_b_mom = [
    {
      key: "0",
      anti_b:
        Data_BRQ[0]?.anti_b_pic_mom == "" ||
        Data_BRQ[0]?.anti_b_pic_mom == null ||
        Data_BRQ[0]?.anti_b_pic_mom == undefined ||
        Data_BRQ[0]?.anti_b_pic_mom == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "121px",
            }}
          ></p>
        ) : (
          <img
            width={50}
            src={`${env.PATH_IMG}/image_typescreen/${Data_BRQ[0]?.anti_b_pic_mom}?pathType=99`}
          />
        ),
    },
    {
      key: "1",
      anti_b:
        Data_BRQ[0]?.anti_b_mom == "" ||
        Data_BRQ[0]?.anti_b_mom == null ||
        Data_BRQ[0]?.anti_b_mom == undefined ||
        Data_BRQ[0]?.anti_b_mom == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "7px",
            }}
          ></p>
        ) : (
          <b>{Data_BRQ[0]?.anti_b_mom}</b>
        ),
    },
  ];
  const Labresult_ABO_anti_d_mom = [
    {
      key: "0",
      anti_d:
        Data_BRQ[0]?.anti_d_pic_mom == "" ||
        Data_BRQ[0]?.anti_d_pic_mom == null ||
        Data_BRQ[0]?.anti_d_pic_mom == undefined ||
        Data_BRQ[0]?.anti_d_pic_mom == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "121px",
            }}
          ></p>
        ) : (
          <img
            width={50}
            src={`${env.PATH_IMG}/image_typescreen/${Data_BRQ[0]?.anti_d_pic_mom}?pathType=99`}
          />
        ),
    },
    {
      key: "1",
      anti_d:
        Data_BRQ[0]?.anti_d_mom == "" ||
        Data_BRQ[0]?.anti_d_mom == null ||
        Data_BRQ[0]?.anti_d_mom == undefined ||
        Data_BRQ[0]?.anti_d_mom == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "7px",
            }}
          ></p>
        ) : (
          <b>{Data_BRQ[0]?.anti_d_mom}</b>
        ),
    },
  ];
  const Labresult_ABO_cell_ctrl_mom = [
    {
      key: "0",
      cell_ctrl:
        Data_BRQ[0]?.cell_ctrl_pic_mom == "" ||
        Data_BRQ[0]?.cell_ctrl_pic_mom == null ||
        Data_BRQ[0]?.cell_ctrl_pic_mom == undefined ||
        Data_BRQ[0]?.cell_ctrl_pic_mom == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "121px",
            }}
          ></p>
        ) : (
          <img
            width={50}
            src={`${env.PATH_IMG}/image_typescreen/${Data_BRQ[0]?.cell_ctrl_pic_mom}?pathType=99`}
          />
        ),
    },
    {
      key: "1",
      cell_ctrl:
        Data_BRQ[0]?.cell_ctrl_mom == "" ||
        Data_BRQ[0]?.cell_ctrl_mom == null ||
        Data_BRQ[0]?.cell_ctrl_mom == undefined ||
        Data_BRQ[0]?.cell_ctrl_mom == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "7px",
            }}
          ></p>
        ) : (
          <b>{Data_BRQ[0]?.cell_ctrl_mom}</b>
        ),
    },
  ];
  const Labresult_ABO_cell_a_pic_mom = [
    {
      key: "0",
      cell_a:
        Data_BRQ[0]?.cell_a_pic_mom == "" ||
        Data_BRQ[0]?.cell_a_pic_mom == null ||
        Data_BRQ[0]?.cell_a_pic_mom == undefined ||
        Data_BRQ[0]?.cell_a_pic_mom == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "121px",
            }}
          ></p>
        ) : (
          <img
            width={50}
            src={`${env.PATH_IMG}/image_typescreen/${Data_BRQ[0]?.cell_a_pic_mom}?pathType=99`}
          />
        ),
    },
    {
      key: "1",
      cell_a:
        Data_BRQ[0]?.cell_a_mom == "" ||
        Data_BRQ[0]?.cell_a_mom == null ||
        Data_BRQ[0]?.cell_a_mom == undefined ||
        Data_BRQ[0]?.cell_a_mom == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "7px",
            }}
          ></p>
        ) : (
          <b>{Data_BRQ[0]?.cell_a_mom}</b>
        ),
    },
  ];
  const Labresult_ABO_cell_b_pic_mom = [
    {
      key: "0",
      cell_b:
        Data_BRQ[0]?.cell_b_pic_mom == "" ||
        Data_BRQ[0]?.cell_b_pic_mom == null ||
        Data_BRQ[0]?.cell_b_pic_mom == undefined ||
        Data_BRQ[0]?.cell_b_pic_mom == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "121px",
            }}
          ></p>
        ) : (
          <img
            width={50}
            src={`${env.PATH_IMG}/image_typescreen/${Data_BRQ[0]?.cell_b_pic_mom}?pathType=99`}
          />
        ),
    },
    {
      key: "1",
      cell_b:
        Data_BRQ[0]?.cell_b_mom == "" ||
        Data_BRQ[0]?.cell_b_mom == null ||
        Data_BRQ[0]?.cell_b_mom == undefined ||
        Data_BRQ[0]?.cell_b_mom == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "7px",
            }}
          ></p>
        ) : (
          <b>{Data_BRQ[0]?.cell_b_mom}</b>
        ),
    },
  ];
  const Labresult_abs_01_mom = [
    {
      key: "0",
      o1:
        Data_BRQ[0]?.abs_o1_iat_pic_mom == "" ||
        Data_BRQ[0]?.abs_o1_iat_pic_mom == null ||
        Data_BRQ[0]?.abs_o1_iat_pic_mom == undefined ||
        Data_BRQ[0]?.abs_o1_iat_pic_mom == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "121px",
            }}
          ></p>
        ) : (
          <img
            width={50}
            src={`${env.PATH_IMG}/image_typescreen/${Data_BRQ[0]?.abs_o1_iat_pic_mom}?pathType=99`}
          />
        ),
    },
    {
      key: "1",
      o1:
        Data_BRQ[0]?.abs_o1_iat_mom == "" ||
        Data_BRQ[0]?.abs_o1_iat_mom == null ||
        Data_BRQ[0]?.abs_o1_iat_mom == undefined ||
        Data_BRQ[0]?.abs_o1_iat_mom == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "7px",
            }}
          ></p>
        ) : (
          <b>{Data_BRQ[0]?.abs_o1_iat_mom}</b>
        ),
    },
  ];
  const Labresult_abs_02_mom = [
    {
      key: "0",
      o2:
        Data_BRQ[0]?.abs_o2_iat_pic_mom == "" ||
        Data_BRQ[0]?.abs_o2_iat_pic_mom == null ||
        Data_BRQ[0]?.abs_o2_iat_pic_mom == undefined ||
        Data_BRQ[0]?.abs_o2_iat_pic_mom == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "121px",
            }}
          ></p>
        ) : (
          <img
            width={50}
            src={`${env.PATH_IMG}/image_typescreen/${Data_BRQ[0]?.abs_o2_iat_pic_mom}?pathType=99`}
          />
        ),
    },
    {
      key: "1",
      o2:
        Data_BRQ[0]?.abs_o2_iat_mom == "" ||
        Data_BRQ[0]?.abs_o2_iat_mom == null ||
        Data_BRQ[0]?.abs_o2_iat_mom == undefined ||
        Data_BRQ[0]?.abs_o2_iat_mom == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "7px",
            }}
          ></p>
        ) : (
          <b>{Data_BRQ[0]?.abs_o2_iat_mom}</b>
        ),
    },
  ];
  const DAT_mom = [
    {
      key: "0",
      dat:
        Data_BRQ[0]?.dat_iat_pic_mom == "" ||
        Data_BRQ[0]?.dat_iat_pic_mom == null ||
        Data_BRQ[0]?.dat_iat_pic_mom == undefined ||
        Data_BRQ[0]?.dat_iat_pic_mom == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "121px",
            }}
          ></p>
        ) : (
          <img
            width={50}
            src={`${env.PATH_IMG}/image_typescreen/${Data_BRQ[0]?.dat_iat_pic_mom}?pathType=99`}
          />
        ),
    },
    {
      key: "1",
      dat:
        Data_BRQ[0]?.dat_result_mom == "" ||
        Data_BRQ[0]?.dat_result_mom == null ||
        Data_BRQ[0]?.dat_result_mom == undefined ||
        Data_BRQ[0]?.dat_result_mom == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "7px",
            }}
          ></p>
        ) : (
          <b>{Data_BRQ[0]?.dat_result_mom}</b>
        ),
    },
  ];
  const AC_mom = [
    {
      key: "0",
      ac:
        Data_BRQ[0]?.autologous_iat_pic_mom == "" ||
        Data_BRQ[0]?.autologous_iat_pic_mom == null ||
        Data_BRQ[0]?.autologous_iat_pic_mom == undefined ||
        Data_BRQ[0]?.autologous_iat_pic_mom == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "121px",
            }}
          ></p>
        ) : (
          <img
            width={50}
            src={`${env.PATH_IMG}/image_typescreen/${Data_BRQ[0]?.autologous_iat_pic_mom}?pathType=99`}
          />
        ),
    },
    {
      key: "1",
      ac:
        Data_BRQ[0]?.autologous_result_mom == "" ||
        Data_BRQ[0]?.autologous_result_mom == null ||
        Data_BRQ[0]?.autologous_result_mom == undefined ||
        Data_BRQ[0]?.autologous_result_mom == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "7px",
            }}
          ></p>
        ) : (
          <b>{Data_BRQ[0]?.autologous_result_mom}</b>
        ),
    },
  ];

  const Labresult_ABO_anti_a = [
    {
      key: "0",
      anti_a:
        Data_BRQ[0]?.anti_a_pic == "" ||
        Data_BRQ[0]?.anti_a_pic == null ||
        Data_BRQ[0]?.anti_a_pic == undefined ||
        Data_BRQ[0]?.anti_a_pic == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "121px",
            }}
          ></p>
        ) : (
          <img
            width={50}
            src={`${env.PATH_IMG}/image_typescreen/${Data_BRQ[0]?.anti_a_pic}?pathType=99`}
          />
        ),
    },
    {
      key: "1",
      anti_a:
        Data_BRQ[0]?.anti_a == "" ||
        Data_BRQ[0]?.anti_a == null ||
        Data_BRQ[0]?.anti_a == undefined ||
        Data_BRQ[0]?.anti_a == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "7px",
            }}
          ></p>
        ) : (
          <b>{Data_BRQ[0]?.anti_a}</b>
        ),
    },
  ];
  const Labresult_ABO_anti_b = [
    {
      key: "0",
      anti_b:
        Data_BRQ[0]?.anti_b_pic == "" ||
        Data_BRQ[0]?.anti_b_pic == null ||
        Data_BRQ[0]?.anti_b_pic == undefined ||
        Data_BRQ[0]?.anti_b_pic == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "121px",
            }}
          ></p>
        ) : (
          <img
            width={50}
            src={`${env.PATH_IMG}/image_typescreen/${Data_BRQ[0]?.anti_b_pic}?pathType=99`}
          />
        ),
    },
    {
      key: "1",
      anti_b:
        Data_BRQ[0]?.anti_b == "" ||
        Data_BRQ[0]?.anti_b == null ||
        Data_BRQ[0]?.anti_b == undefined ||
        Data_BRQ[0]?.anti_b == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "7px",
            }}
          ></p>
        ) : (
          <b>{Data_BRQ[0]?.anti_b}</b>
        ),
    },
  ];

  const Labresult_ABO_anti_d = [
    {
      key: "0",
      anti_d:
        Data_BRQ[0]?.anti_d_pic == "" ||
        Data_BRQ[0]?.anti_d_pic == null ||
        Data_BRQ[0]?.anti_d_pic == undefined ||
        Data_BRQ[0]?.anti_d_pic == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "121px",
            }}
          ></p>
        ) : (
          <img
            width={50}
            src={`${env.PATH_IMG}/image_typescreen/${Data_BRQ[0]?.anti_d_pic}?pathType=99`}
          />
    
        ),
    },
    {
      key: "1",
      anti_d:
        Data_BRQ[0]?.anti_d == "" ||
        Data_BRQ[0]?.anti_d == null ||
        Data_BRQ[0]?.anti_d == undefined ||
        Data_BRQ[0]?.anti_d == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "7px",
            }}
          ></p>
        ) : (
          <b>{Data_BRQ[0]?.anti_d}</b>
        ),
    },
  ];
  const Labresult_ABO_cell_ctrl = [
    {
      key: "0",
      cell_ctrl:
        Data_BRQ[0]?.cell_ctrl_pic == "" ||
        Data_BRQ[0]?.cell_ctrl_pic == null ||
        Data_BRQ[0]?.cell_ctrl_pic == undefined ||
        Data_BRQ[0]?.cell_ctrl_pic == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "121px",
            }}
          ></p>
        ) : (
          <img
            width={50}
            src={`${env.PATH_IMG}/image_typescreen/${Data_BRQ[0]?.cell_ctrl_pic}?pathType=99`}
          />
        ),
    },
    {
      key: "1",
      cell_ctrl:
        Data_BRQ[0]?.cell_ctrl == "" ||
        Data_BRQ[0]?.cell_ctrl == null ||
        Data_BRQ[0]?.cell_ctrl == undefined ||
        Data_BRQ[0]?.cell_ctrl == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "7px",
            }}
          ></p>
        ) : (
          <b>{Data_BRQ[0]?.cell_ctrl}</b>
        ),
    },
  ];
  const Labresult_ABO_cell_a_pic = [
    {
      key: "0",
      cell_a:
        Data_BRQ[0]?.cell_a_pic == "" ||
        Data_BRQ[0]?.cell_a_pic == null ||
        Data_BRQ[0]?.cell_a_pic == undefined ||
        Data_BRQ[0]?.cell_a_pic == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "121px",
            }}
          ></p>
        ) : (
          <img
            width={50}
            src={`${env.PATH_IMG}/image_typescreen/${Data_BRQ[0]?.cell_a_pic}?pathType=99`}
          />
        ),
    },
    {
      key: "1",
      cell_a:
        Data_BRQ[0]?.cell_a == "" ||
        Data_BRQ[0]?.cell_a == null ||
        Data_BRQ[0]?.cell_a == undefined ||
        Data_BRQ[0]?.cell_a == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "7px",
            }}
          ></p>
        ) : (
          <b>{Data_BRQ[0]?.cell_a}</b>
        ),
    },
  ];
  const Labresult_ABO_cell_b_pic = [
    {
      key: "0",
      cell_b:
        Data_BRQ[0]?.cell_b_pic == "" ||
        Data_BRQ[0]?.cell_b_pic == null ||
        Data_BRQ[0]?.cell_b_pic == undefined ||
        Data_BRQ[0]?.cell_b_pic == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "121px",
            }}
          ></p>
        ) : (
          <img
            width={50}
            src={`${env.PATH_IMG}/image_typescreen/${Data_BRQ[0]?.cell_b_pic}?pathType=99`}
          />
        ),
    },
    {
      key: "1",
      cell_b:
        Data_BRQ[0]?.cell_b == "" ||
        Data_BRQ[0]?.cell_b == null ||
        Data_BRQ[0]?.cell_b == undefined ||
        Data_BRQ[0]?.cell_b == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "7px",
            }}
          ></p>
        ) : (
          <b>{Data_BRQ[0]?.cell_b}</b>
        ),
    },
  ];
  const Labresult_abs_01 = [
    {
      key: "0",
      o1:
        Data_BRQ[0]?.abs_o1_iat_pic == "" ||
        Data_BRQ[0]?.abs_o1_iat_pic == null ||
        Data_BRQ[0]?.abs_o1_iat_pic == undefined ||
        Data_BRQ[0]?.abs_o1_iat_pic == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "121px",
            }}
          ></p>
        ) : (
          <img
            width={50}
            src={`${env.PATH_IMG}/image_typescreen/${Data_BRQ[0]?.abs_o1_iat_pic}?pathType=99`}
          />
        ),
    },
    {
      key: "1",
      o1:
        Data_BRQ[0]?.abs_o1_iat == "" ||
        Data_BRQ[0]?.abs_o1_iat == null ||
        Data_BRQ[0]?.abs_o1_iat == undefined ||
        Data_BRQ[0]?.abs_o1_iat == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "7px",
            }}
          ></p>
        ) : (
          <b>{Data_BRQ[0]?.abs_o1_iat}</b>
        ),
    },
  ];
  const Labresult_abs_02 = [
    {
      key: "0",
      o2:
        Data_BRQ[0]?.abs_o2_iat_pic == "" ||
        Data_BRQ[0]?.abs_o2_iat_pic == null ||
        Data_BRQ[0]?.abs_o2_iat_pic == undefined ||
        Data_BRQ[0]?.abs_o2_iat_pic == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "121px",
            }}
          ></p>
        ) : (
          <img
            width={50}
            src={`${env.PATH_IMG}/image_typescreen/${Data_BRQ[0]?.abs_o2_iat_pic}?pathType=99`}
          />
        ),
    },
    {
      key: "1",
      o2:
        Data_BRQ[0]?.abs_o2_iat == "" ||
        Data_BRQ[0]?.abs_o2_iat == null ||
        Data_BRQ[0]?.abs_o2_iat == undefined ||
        Data_BRQ[0]?.abs_o2_iat == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "7px",
            }}
          ></p>
        ) : (
          <b>{Data_BRQ[0]?.abs_o2_iat}</b>
        ),
    },
  ];
  const DAT = [
    {
      key: "0",
      dat:
        Data_BRQ[0]?.dat_iat_pic == "" ||
        Data_BRQ[0]?.dat_iat_pic == null ||
        Data_BRQ[0]?.dat_iat_pic == undefined ||
        Data_BRQ[0]?.dat_iat_pic == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "121px",
            }}
          ></p>
        ) : (
          <img
            width={50}
            src={`${env.PATH_IMG}/image_typescreen/${Data_BRQ[0]?.dat_iat_pic}?pathType=99`}
          />
        ),
    },
    {
      key: "1",
      dat:
        Data_BRQ[0]?.dat_result == "" ||
        Data_BRQ[0]?.dat_result == null ||
        Data_BRQ[0]?.dat_result == undefined ||
        Data_BRQ[0]?.dat_result == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "7px",
            }}
          ></p>
        ) : (
          <b>{Data_BRQ[0]?.dat_result}</b>
        ),
    },
  ];
  const AC = [
    {
      key: "0",
      ac:
        Data_BRQ[0]?.autologous_iat_pic == "" ||
        Data_BRQ[0]?.autologous_iat_pic == null ||
        Data_BRQ[0]?.autologous_iat_pic == undefined ||
        Data_BRQ[0]?.autologous_iat_pic == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "121px",
            }}
          ></p>
        ) : (
          <img
            width={50}
            src={`${env.PATH_IMG}/image_typescreen/${Data_BRQ[0]?.autologous_iat_pic}?pathType=99`}
          />
        ),
    },
    {
      key: "1",
      ac:
        Data_BRQ[0]?.autologous_result == "" ||
        Data_BRQ[0]?.autologous_result == null ||
        Data_BRQ[0]?.autologous_result == undefined ||
        Data_BRQ[0]?.autologous_result == [] ? (
          <p
            style={{
              paddingLeft: "27px",
              paddingRight: "27px",
              paddingBottom: "7px",
            }}
          ></p>
        ) : (
          <b>{Data_BRQ[0]?.autologous_result}</b>
        ),
    },
  ];
  // const Labresult_ABO_anti_a = [
  //   {
  //     key: "0",
  //     anti_a: (
  //       <img
  //         width={50}
  //         src={`${env.PATH_IMG}/image_typescreen/${Data_BRQ[0]?.anti_a_pic}?pathType=99`}
  //       />
  //     ),
  //   },
  //   {
  //     key: "1",
  //     anti_a: <b>{Data_BRQ[0]?.anti_a}</b>,
  //   },
  // ];
  // const Labresult_ABO_anti_b = [
  //   {
  //     key: "0",
  //     anti_b: (
  //       <img
  //         width={50}
  //         src={`${env.PATH_IMG}/image_typescreen/${Data_BRQ[0]?.anti_b_pic}?pathType=99`}
  //       />
  //     ),
  //   },
  //   {
  //     key: "1",
  //     anti_b: <b>{Data_BRQ[0]?.anti_b}</b>,
  //   },
  // ];
  // const Labresult_ABO_anti_d = [
  //   {
  //     key: "0",
  //     anti_d: (
  //       <img
  //         width={50}
  //         src={`${env.PATH_IMG}/image_typescreen/${Data_BRQ[0]?.anti_d_pic}?pathType=99`}
  //       />
  //     ),
  //   },
  //   {
  //     key: "1",
  //     anti_d: <b>{Data_BRQ[0]?.anti_d}</b>,
  //   },
  // ];
  // const Labresult_ABO_cell_ctrl = [
  //   {
  //     key: "0",
  //     cell_ctrl: (
  //       <img
  //         width={50}
  //         src={`${env.PATH_IMG}/image_typescreen/${Data_BRQ[0]?.cell_ctrl_pic}?pathType=99`}
  //       />
  //     ),
  //   },
  //   {
  //     key: "1",
  //     cell_ctrl: <b>{Data_BRQ[0]?.cell_ctrl}</b>,
  //   },
  // ];
  // const Labresult_ABO_cell_a_pic = [
  //   {
  //     key: "0",
  //     cell_a: (
  //       <img
  //         width={50}
  //         src={`${env.PATH_IMG}/image_typescreen/${Data_BRQ[0]?.cell_a_pic}?pathType=99`}
  //       />
  //     ),
  //   },
  //   {
  //     key: "1",
  //     cell_a: <b>{Data_BRQ[0]?.cell_a}</b>,
  //   },
  // ];
  // const Labresult_ABO_cell_b_pic = [
  //   {
  //     key: "0",
  //     cell_b: (
  //       <img
  //         width={50}
  //         src={`${env.PATH_IMG}/image_typescreen/${Data_BRQ[0]?.cell_b_pic}?pathType=99`}
  //       />
  //     ),
  //   },
  //   {
  //     key: "1",
  //     cell_b: <b>{Data_BRQ[0]?.cell_b}</b>,
  //   },
  // ];
  // const Labresult_abs_01 = [
  //   {
  //     key: "0",
  //     o1: (
  //       <img
  //         width={50}
  //         src={`${env.PATH_IMG}/image_typescreen/${Data_BRQ[0]?.abs_o1_iat_pic}?pathType=99`}
  //       />
  //     ),
  //   },
  //   {
  //     key: "1",
  //     o1: <b>{Data_BRQ[0]?.abs_o1_iat}</b>,
  //   },
  // ];
  // const Labresult_abs_02 = [
  //   {
  //     key: "0",

  //     o2: (
  //       <img
  //         width={50}
  //         src={`${env.PATH_IMG}/image_typescreen/${Data_BRQ[0]?.abs_o2_iat_pic}?pathType=99`}
  //       />
  //     ),
  //   },
  //   {
  //     key: "1",

  //     o2: <b>{Data_BRQ[0]?.abs_o2_iat}</b>,
  //   },
  // ];
  // const DAT = [
  //   {
  //     key: "0",
  //     dat: (
  //       <img
  //         width={50}
  //         src={`${env.PATH_IMG}/image_typescreen/${Data_BRQ[0]?.dat_iat_pic}?pathType=99`}
  //       />
  //     ),
  //   },
  //   {
  //     key: "1",
  //     dat: <b>{Data_BRQ[0]?.dat_result}</b>,
  //   },
  // ];
  // const AC = [
  //   {
  //     key: "0",
  //     ac: (
  //       <img
  //         width={50}
  //         src={`${env.PATH_IMG}/image_typescreen/${Data_BRQ[0]?.autologous_iat_pic}?pathType=99`}
  //       />
  //     ),
  //   },
  //   {
  //     key: "1",
  //     ac: <b>{Data_BRQ[0]?.autologous_result}</b>,
  //   },
  // ];
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
          <Col span={24}>
            <Row
              justify="center"
              style={{ display: "flex", backgroundColor: "#ffffff" }}
            >
              <Col xs={23} lg={23} xl={23}>
                <Row>
                  <b style={{ fontSize: "14px" }}>ข้อมูลผู้ขอเลือด</b>
                </Row>
                <Row>
                  <Col xs={19} xl={19} lg={19}>
                    <Row>
                      <Col xs={5} xl={5} lg={5}>
                        <Row>
                          <b style={{ fontSize: "12px" }}>HN :</b>&nbsp;
                          <span style={{ fontSize: "12px" }}>
                            {Data_BRQ[0]?.hn}
                          </span>
                        </Row>
                      </Col>
                      <Col xs={5} xl={5} lg={5}>
                        <Row>
                          <b style={{ fontSize: "12px" }}>ชื่อ-สกุล :</b>&nbsp;
                          <span style={{ fontSize: "12px" }}>
                            {Data_BRQ[0]?.patientname}
                          </span>
                        </Row>
                      </Col>
                      <Col xs={6} xl={6} lg={6}>
                        <Row>
                          <b style={{ fontSize: "12px" }}>อายุ :</b>&nbsp;
                          <span style={{ fontSize: "12px" }}>
                            {Data_BRQ[0]?.age}
                          </span>
                        </Row>
                      </Col>
                      <Col xs={2} xl={2} lg={2}>
                        <Row>
                          <b style={{ fontSize: "12px" }}>เพศ :</b>&nbsp;
                          <span style={{ fontSize: "12px" }}>
                            {Data_BRQ[0]?.sex === "1" ? "ชาย" : "หญิง"}
                          </span>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={5} xl={5} lg={5}>
                        <Row>
                          <b style={{ fontSize: "12px" }}>เลขที่ใบขอเลือด:</b>
                          &nbsp;
                          <span style={{ fontSize: "12px" }}>
                            {Data_BRQ[0]?.order_number}
                          </span>
                        </Row>
                      </Col>
                      <Col xs={5} xl={5} lg={5}>
                        <Row>
                          <b style={{ fontSize: "12px" }}>ward:</b>&nbsp;
                          <span style={{ fontSize: "12px" }}>
                            {Data_BRQ[0]?.wd_name}
                          </span>
                        </Row>
                      </Col>
                      <Col xs={3} xl={3} lg={3}>
                        <Row>
                          <b style={{ fontSize: "12px" }}>Patient Type:</b>
                          &nbsp;
                          <span style={{ fontSize: "12px" }}>
                            {Data_BRQ[0]?.patient_type}
                          </span>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={5} xl={5} lg={5}>
                    <Row justify="end" style={{ marginTop: "-7px" }}>
                      {/* &nbsp;&nbsp; */}
                      {Data_BRQ[0]?.bloodgrp === "A" ? (
                        <b
                          style={{
                            fontSize: "20px",
                            marginTop: "-17.5px",
                            backgroundColor: "#ffff00",
                            border: "1px solid",
                          }}
                        >
  <Row>
  {" "}
                          &nbsp;
                          <b style={{ writingMode: "vertical-rl",textAlign:"center" }}>&nbsp;Group</b>
                          <span style={{ fontSize: "50px" ,paddingLeft:"15px",paddingRight:"15px"}}>
                            {" "}
                            {Data_BRQ[0]?.ABO}{" "}
                          </span>
                          &nbsp;
  </Row>
                        </b>
                      ) : (
                        ""
                      )}
                      {Data_BRQ[0]?.bloodgrp === "B" ? (
                        <b
                          style={{
                            fontSize: "20px",
                            marginTop: "-17.5px",
                            backgroundColor: "#ffb6c1",
                            border: "1px solid",
                          }}
                        >
              <Row>
  {" "}
                          &nbsp;
                          <b style={{ writingMode: "vertical-rl",textAlign:"center" }}>&nbsp;Group</b>
                          <span style={{ fontSize: "50px" ,paddingLeft:"15px",paddingRight:"15px"}}>
                            {" "}
                            {Data_BRQ[0]?.ABO}{" "}
                          </span>
                          &nbsp;
  </Row>
                        </b>
                      ) : (
                        ""
                      )}
                      {Data_BRQ[0]?.bloodgrp === "AB" ? (
                        <b
                          style={{
                            fontSize: "20px",
                            marginTop: "-17.5px",
                            backgroundColor: "#ffffff",
                            border: "1px solid",
                          }}
                        >
                          <Row>
  {" "}
                          &nbsp;
                          <b style={{ writingMode: "vertical-rl",textAlign:"center" }}>&nbsp;Group</b>
                          <span style={{ fontSize: "50px" ,paddingLeft:"15px",paddingRight:"15px"}}>
                            {" "}
                            {Data_BRQ[0]?.ABO}{" "}
                          </span>
                          &nbsp;
  </Row>
                        </b>
                      ) : (
                        ""
                      )}
                      {Data_BRQ[0]?.bloodgrp === "O" ? (
                        <b
                          style={{
                            fontSize: "20px",
                            marginTop: "-17.5px",
                            backgroundColor: "#4dadff",
                            border: "1px solid",
                          }}
                        >
                            <Row>
  {" "}
                          &nbsp;
                          <b style={{ writingMode: "vertical-rl",textAlign:"center" }}>&nbsp;Group</b>
                          <span style={{ fontSize: "50px" ,paddingLeft:"15px",paddingRight:"15px"}}>
                            {" "}
                            {Data_BRQ[0]?.ABO}{" "}
                          </span>
                          &nbsp;
  </Row>
                        </b>
                      ) : (
                        ""
                      )}
                    </Row>
                  </Col>
                </Row>
                <Row justify="center">
                  <Col span={24}>
                    <hr />
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row justify="center" style={{ marginBottom: "-5px" }}>
              <Col xs={23} xl={23} lg={23}>
                <Form form={PatientGroupingForm} onFinish={SendPatientGrouping}>
                  <Row>
                    <Col span={24} offset={0}>
                      <b style={{ fontSize: "14px" }}>Patient Grouping</b>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={24}>
                      <Table
                        dataSource={Patient_Grouping}
                        pagination={false}
                        bordered
                        size="small"
                        className="NOHOVERPatient_Grouping"
                      >
                        <ColumnGroup title="Cell Grouping">
                          <Column
                            title="Anti-A"
                            dataIndex="anti_a"
                            key="anti_a"
                            align="center"
                            width="6%"
                          />
                          <Column
                            title="Anti-B"
                            dataIndex="anti_b"
                            key="anti_b"
                            align="center"
                            width="6%"
                          />
                          <Column
                            title="Anti-AB"
                            dataIndex="anti_ab"
                            key="anti_ab"
                            align="center"
                            width="6%"
                          />
                          <Column
                            title="Anti-D"
                            dataIndex="anti_d"
                            key="anti_d"
                            align="center"
                            width="6%"
                          />

                          <Column
                            title="Anti-A1"
                            dataIndex="anti_a1"
                            key="anti_a1"
                            align="center"
                            width="6%"
                          />
                          <Column
                            title="Anti-H"
                            dataIndex="anti_h"
                            key="anti_h"
                            align="center"
                            width="6%"
                          />
                        </ColumnGroup>

                        <ColumnGroup title="Serum Grouping">
                          <Column
                            align="center"
                            width="6%"
                            title="A-Cell"
                            dataIndex="cell_a"
                            key="cell_a"
                          />
                          <Column
                            align="center"
                            width="6%"
                            title="B-Cell"
                            dataIndex="cell_b"
                            key="cell_b"
                          />
                          <Column
                            align="center"
                            width="6%"
                            title="O-Cell"
                            dataIndex="cell_o"
                            key="cell_o"
                          />
                          <Column
                            align="center"
                            width="6%"
                            title="Ctl"
                            dataIndex="cell_ctrl"
                            key="cell_ctrl"
                          />
                        </ColumnGroup>
                        <ColumnGroup title="Group">
                          <Column
                            title="Group"
                            dataIndex="blood_gr"
                            key="blood_gr"
                            align="center"
                            width="6%"
                          />
                          <Column
                            title="Subgroup"
                            dataIndex="blood_sub_gr"
                            key="blood_sub_gr"
                            align="center"
                            width="6%"
                          />
                        </ColumnGroup>
                        <ColumnGroup title="Rh (D) Typing">
                          <Column
                            title="RT"
                            dataIndex="rhd_rt"
                            key="rhd_rt"
                            align="center"
                            width="6%"
                          />
                          <Column
                            title="37 ํC"
                            dataIndex="rhd_37c"
                            key="rhd_37c"
                            align="center"
                            width="6%"
                          />
                          <Column
                            title="IAT"
                            dataIndex="rhd_iat"
                            key="rhd_iat"
                            align="center"
                            width="6%"
                          />
                        </ColumnGroup>

                        <Column
                          title="Rh"
                          dataIndex="blood_rh"
                          key="blood_rh"
                          align="center"
                          width="6%"
                        />
                      </Table>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "8px", marginBottom: "-21px" }}>
                    <Col xs={24} xl={16} lg={16}>
                      <Row>
                        <Form.Item label="หมายเหตุ" name="note_Grouping">
                          <TextArea
                            rows={1}
                            placeholder="ระบุหมายเหตุ"
                            style={{ width: "250px" }}
                          />
                        </Form.Item>
                        {/* <b style={{ marginLeft: "5px", fontSize: "12px" }}>
                          &nbsp; บันทึกล่าสุด&nbsp;:&nbsp;&nbsp;
                          <span style={{ color: "blue" }}>
                            {Data_BRQ[0]?.grouping_staff}&nbsp;
                            {Data_BRQ[0]?.pg_savedate}&nbsp;
                            {Data_BRQ[0]?.pg_savetime}&nbsp;
                          </span>
                        </b>
                        &nbsp;&nbsp; */}
                      </Row>
                    </Col>
                    <Col xs={24} xl={8} lg={8}>
                      <Row justify="end">
                        {Data_BRQ[0]?.instru_datetime == "" ? (
                          ""
                        ) : (
                          <Button onClick={showModal_Labimg}>
                            <GrScorecard style={{ fontSize: "20px" }} />
                          </Button>
                        )}
                        &nbsp;
                        <Form.Item
                          label="Pass"
                          name="passwordPatientGrouping"
                          // style={{ marginLeft: "580px" }}
                        >
                          {/* <Input style={{ width: "90px" }} /> */}
                          <Input.Password
                            id="passwordPatientGrouping_id"
                            placeholder="กรุณากรอกรหัสผ่าน"
                            iconRender={(visible) =>
                              visible ? (
                                <EyeTwoTone />
                              ) : (
                                <EyeInvisibleOutlined />
                              )
                            }
                            style={{ width: "90px" }}
                            value={passwordPatientGrouping}
                            onChange={(e) =>
                              setPasswordPatientGrouping(e.target.value)
                            }
                          />
                        </Form.Item>
                        &nbsp;
                        <Tooltip title="บันทึก">
                          <Button
                            style={{
                              border: "1px solid",
                              // marginLeft: "12px",
                            }}
                            type="primary"
                            shape="round"
                            icon={<SaveFilled style={{ color: "#fff" }} />}
                            // onClick={SendPatientGrouping}

                            htmlType="submit"
                          >
                            บันทึก
                          </Button>
                        </Tooltip>
                      </Row>
                    </Col>
                  </Row>
                  <Row justify="start">
                    <b style={{ marginLeft: "-5px", fontSize: "12px" }}>
                      &nbsp; บันทึกล่าสุด&nbsp;:&nbsp;&nbsp;
                      <span style={{ color: "blue" }}>
                        {Data_BRQ[0]?.grouping_staff}&nbsp;
                        {Data_BRQ[0]?.pg_savedate}&nbsp;
                        {Data_BRQ[0]?.pg_savetime}&nbsp;
                      </span>
                    </b>
                    &nbsp;&nbsp;{" "}
                  </Row>
                </Form>
              </Col>
            </Row>
            <Row justify="center" style={{ marginTop: "0px" }}>
              <Col span={23}>
                <hr />
              </Col>
            </Row>
            <Row justify="center">
              <Col xs={23} lg={23} xl={23}>
                <Row justify="center">
                  <Col span={11}>
                    <Form
                      form={AntibodyScreeningForm}
                      onFinish={SendAntibodyScreening}
                    >
                      {/* <Row
                        justify="start"
                        //   style={{ marginTop: "-20px", marginLeft: "-20px" }}
                      >
                        <Col span={24} offset={0}>
                          <b style={{ fontSize: "14px" }}>Antibody Screening</b>
                        </Col>
                      </Row> */}
                      <Row
                      // style={{ marginLeft: "-20px" }}
                      >
                        <Col span={24}>
                          <Table
                            className="NOHOVERAntibody_Screening"
                            dataSource={Antibody_Screening}
                            pagination={false}
                            bordered
                            size="small"
                            // width="100%"
                          >
                            <ColumnGroup title="Antibody Screening">
                              <Column
                                title=" "
                                dataIndex="num_o"
                                key="num_o"
                                align="center"
                                width={"10%"}
                              />
                              <Column
                                title="RT"
                                dataIndex="abs_rt"
                                key="abs_rt"
                                align="center"
                                width={"30%"}
                              />
                              <Column
                                title="37 ํC"
                                dataIndex="abs_37c"
                                key="abs_37c"
                                align="center"
                                width={"30%"}
                              />
                              <Column
                                title="IAT"
                                dataIndex="abs_iat"
                                key="abs_iat"
                                align="center"
                                width={"30%"}
                              />
                            </ColumnGroup>
                          </Table>
                        </Col>
                      </Row>
                      {/* <br /> */}
                      <Row style={{ marginTop: "7px" }}>
                        <Col span={24}>
                          <Row
                            justify="start"
                            style={{ marginBottom: "-20px" }}
                          >
                            <Col
                              xs={24}
                              xl={12}
                              lg={24}
                              style={{ marginBottom: "-17px" }}
                            >
                              <Form.Item
                                label="Antibody Screening result"
                                name="abs_result"
                              >
                                <Select
                                  showArrow={false}
                                  dropdownMatchSelectWidth={false}
                                  // placement={placement}
                                  //
                                  //   size="small"
                                  style={{ fontSize: "14px" }}
                                  placeholder="Result"
                                  // style={{ width: 120 }}
                                  onChange={CheckResultAntibodyScreening}
                                >
                                  {LoadABSshow?.map((item) => (
                                    <Option key={item.name} value={item.name}>
                                      <b style={{ fontSize: "14px" }}>
                                        {item.name}
                                      </b>
                                    </Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col xs={24} xl={12} lg={24}>
                              <Row justify="end">
                                <Col span={24}>
                                  <Form.Item
                                    label="หมายเหตุ"
                                    name="note_ABS"
                                    size="small"
                                    // style={{
                                    //   marginLeft: "380px",
                                    //   marginTop: "-16px",
                                    // }}
                                  >
                                    <TextArea
                                      rows={1}
                                      placeholder="ระบุหมายเหตุ"
                                      size="small"
                                      style={{ width: "100%" }}
                                    />
                                  </Form.Item>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                          <Row justify="start" style={{}}>
                            <Col xs={24} xl={12} lg={24}>
                              <b style={{ fontSize: "12px" }}>
                                บันทึกล่าสุด&nbsp;:&nbsp;&nbsp;
                                <span style={{ color: "blue" }}>
                                  {Data_BRQ[0]?.abs_staff}&nbsp;&nbsp;
                                  {Data_BRQ[0]?.abs_savedate}&nbsp;
                                  {Data_BRQ[0]?.abs_savetime}
                                </span>
                              </b>
                            </Col>
                            <Col xs={24} xl={12} lg={24}>
                              <Row justify="end">
                                {Data_BRQ[0]?.instru_datetime == "" ? (
                                  ""
                                ) : (
                                  <Button onClick={showModal_Labimg}>
                                    <GrScorecard style={{ fontSize: "20px" }} />
                                  </Button>
                                )}
                                &nbsp;
                                <Form.Item
                                  label="Pass"
                                  name="passSendAntibodyScreening"
                                  // style={{ marginLeft: "580px" }}
                                >
                                  {/* <Input style={{ width: "90px" }} /> */}
                                  <Input.Password
                                    placeholder="กรุณากรอกรหัสผ่าน"
                                    iconRender={(visible) =>
                                      visible ? (
                                        <EyeTwoTone />
                                      ) : (
                                        <EyeInvisibleOutlined />
                                      )
                                    }
                                    style={{ width: "90px" }}
                                    value={passwordAntibodyScreening}
                                    onChange={(e) =>
                                      setPasswordAntibodyScreening(
                                        e.target.value
                                      )
                                    }
                                  />
                                </Form.Item>
                                {/* &nbsp; */}
                                <Tooltip title="บันทึก">
                                  <Button
                                    style={{
                                      border: "1px solid",
                                      // marginLeft: "12px",
                                    }}
                                    type="primary"
                                    shape="round"
                                    icon={
                                      <SaveFilled style={{ color: "#fff" }} />
                                    }
                                    htmlType="submit"
                                    // onClick={SendAntibodyScreening}
                                  >
                                    บันทึก
                                  </Button>
                                </Tooltip>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                  <Col span={11} offset={1}>
                    <Form
                      form={DATandAutocontrolForm}
                      onFinish={SendDATandAutocontrol}
                    >
                      {/* <Row justify="start">
                        <Col span={24} offset={0}>
                          <b style={{ fontSize: "14px" }}>
                            DAT and Autocontrol
                          </b>
                        </Col>
                      </Row> */}
                      <Row>
                        <Col span={24}>
                          <Table
                            dataSource={DAT_Autocontrol}
                            pagination={false}
                            bordered
                            size="small"
                            width="100%"
                            className="NOHOVERDAT_Autocontrol"
                          >
                            <ColumnGroup title="DAT">
                              <Column
                                title="RT"
                                dataIndex="dat_rt"
                                key="dat_rt"
                                align="center"
                                width="25%"
                              />
                              <Column
                                title="37 ํC"
                                dataIndex="dat_37c"
                                key="dat_37c"
                                align="center"
                                width="25%"
                              />
                              <Column
                                title="IAT"
                                dataIndex="dat_iat"
                                key="dat_iat"
                                align="center"
                                width="25%"
                              />
                              <Column
                                title="Result"
                                dataIndex="dat_result"
                                key="dat_result"
                                align="center"
                                width="25%"
                              />
                            </ColumnGroup>
                          </Table>
                          <Table
                            dataSource={DAT_Autocontrol}
                            pagination={false}
                            bordered
                            size="small"
                            //   width="100%"

                            className="NOHOVERDAT_Autocontrol"
                          >
                            <ColumnGroup title="Autocontrol">
                              <Column
                                title="RT"
                                dataIndex="autologous_rt"
                                key="autologous_rt"
                                align="center"
                                width="25%"
                              />
                              <Column
                                title="37 ํC"
                                dataIndex="autologous_37c"
                                key="autologous_37c"
                                align="center"
                                width="25%"
                              />
                              <Column
                                title="IAT"
                                dataIndex="autologous_iat"
                                key="autologous_iat"
                                align="center"
                                width="25%"
                              />
                              <Column
                                title="Result"
                                dataIndex="autologous_result"
                                key="autologous_result"
                                align="center"
                                width="25%"
                              />
                            </ColumnGroup>
                          </Table>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: "7px", marginBottom: "-17px" }}>
                        <Col
                          xs={24}
                          xl={12}
                          lg={24}
                          style={{ marginBottom: "-17px" }}
                        >
                          <Row>
                            <Col span={24}>
                              {" "}
                              <Form.Item
                                label="หมายเหตุ"
                                name="note_Dat_Autocontrol"
                              >
                                <TextArea
                                  rows={1}
                                  placeholder="ระบุหมายเหตุ"
                                  style={{ width: "100%" }}
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={24} xl={12} lg={24}>
                          <Row justify="end">
                            {Data_BRQ[0]?.instru_datetime == "" ? (
                              ""
                            ) : (
                              <Button onClick={showModal_Labimg}>
                                <GrScorecard style={{ fontSize: "20px" }} />
                              </Button>
                            )}
                            &nbsp;
                            <Form.Item
                              label="Pass"
                              name="passSendDATandAutocontrol"
                              // style={{ marginLeft: "580px" }}
                            >
                              {/* <Input style={{ width: "90px" }} /> */}
                              <Input.Password
                                placeholder="กรุณากรอกรหัสผ่าน"
                                iconRender={(visible) =>
                                  visible ? (
                                    <EyeTwoTone />
                                  ) : (
                                    <EyeInvisibleOutlined />
                                  )
                                }
                                style={{ width: "90px" }}
                                value={passwordDATandAutocontrol}
                                onChange={(e) =>
                                  setPasswordDATandAutocontrol(e.target.value)
                                }
                              />
                            </Form.Item>
                            {/* &nbsp; */}
                            <Tooltip title="บันทึก">
                              <Button
                                style={{
                                  border: "1px solid",
                                  // marginLeft: "12px",
                                }}
                                type="primary"
                                shape="round"
                                icon={<SaveFilled style={{ color: "#fff" }} />}
                                // onClick={SendDATandAutocontrol}
                                htmlType="submit"
                              >
                                บันทึก
                              </Button>
                            </Tooltip>
                          </Row>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={24} xl={24} lg={24}>
                          <Row>
                            <b>
                              บันทึกล่าสุด&nbsp;:&nbsp;&nbsp;
                              <span style={{ color: "blue" }}>
                                {Data_BRQ[0]?.dat_staff}&nbsp;&nbsp;
                                {Data_BRQ[0]?.dat_savedate}&nbsp;
                                {Data_BRQ[0]?.dat_savetime}
                              </span>
                            </b>
                          </Row>
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row justify="center">
              <Col span={23}>
                <hr />
              </Col>
            </Row>
            <Row justify="center">
              <b
                style={{
                  fontSize: "16px",
                  marginTop: "5px",
                  marginBottom: "-15px",
                }}
              >
                Identification
              </b>
            </Row>
            <Row justify="center">
              <Col span={23}>
                <div>
                  <Tabs defaultActiveKey="1" type="card">
                    <TabPane tab="Antibody" key="1" forceRender={true}>
                      <Row justify="center">
                        <Col span={24}>
                          <Form form={Identification_formAntibody}>
                            <Table
                              className="NOHOVERformAntibody"
                              dataSource={Identification_data}
                              pagination={false}
                              bordered
                              size="small"
                              //   scroll={{
                              //     x: "calc(300px + 50%)",
                              //     // y: "460",
                              //   }}
                              // width={8000}
                              // style={{marginLeft:"80px",paddingRight:"60px",}}
                            >
                              <ColumnGroup title="ABO">
                                <Column
                                  title="A1"
                                  dataIndex="A1_IDC"
                                  key="A1_IDC"
                                  align="center"
                                  width={"3%"}
                                />
                                <Column
                                  title="H"
                                  dataIndex="H_IDC"
                                  key="H_IDC"
                                  align="center"
                                  width={"3%"}
                                />
                              </ColumnGroup>
                              <ColumnGroup title="Rh">
                                <Column
                                  title="D"
                                  dataIndex="D_IDC"
                                  key="D_IDC"
                                  align="center"
                                  width={"3%"}
                                />
                                <Column
                                  title="C"
                                  dataIndex="C_IDC"
                                  key="C_IDC"
                                  align="center"
                                  width={"3%"}
                                />
                                <Column
                                  title="E"
                                  dataIndex="E_IDC"
                                  key="E_IDC"
                                  align="center"
                                  width={"3%"}
                                />
                                <Column
                                  title="c"
                                  dataIndex="c_IDC"
                                  key="c_IDC"
                                  align="center"
                                  width={"3%"}
                                />
                                <Column
                                  title="e"
                                  dataIndex="e_IDC"
                                  key="e_IDC"
                                  align="center"
                                  width={"3%"}
                                />
                                <Column
                                  title="Cw"
                                  dataIndex="Cw_IDC"
                                  key="Cw_IDC"
                                  align="center"
                                  width={"3%"}
                                />
                              </ColumnGroup>
                              <ColumnGroup title="Kell">
                                <Column
                                  title="K"
                                  dataIndex="K_IDC"
                                  key="K_IDC"
                                  align="center"
                                  width={"3%"}
                                />
                                <Column
                                  title="k"
                                  dataIndex="k_IDC"
                                  key="k_IDC"
                                  align="center"
                                  width={"3%"}
                                />
                                <Column
                                  title="Kpa"
                                  dataIndex="Kpa_IDC"
                                  key="Kpa_IDC"
                                  align="center"
                                  width={"3%"}
                                />
                                <Column
                                  title="Kpb"
                                  dataIndex="Kpb_IDC"
                                  key="Kpb_IDC"
                                  align="center"
                                  width={"3%"}
                                />
                                <Column
                                  title="Jsa"
                                  dataIndex="Jsa_IDC"
                                  key="Jsa_IDC"
                                  align="center"
                                  width={"3%"}
                                />
                                <Column
                                  title="Jsb"
                                  dataIndex="Jsb_IDC"
                                  key="Jsb_IDC"
                                  align="center"
                                  width={"3%"}
                                />
                              </ColumnGroup>
                              <ColumnGroup title="Kidd">
                                <Column
                                  title="Jka"
                                  dataIndex="Jka_IDC"
                                  key="Jka_IDC"
                                  align="center"
                                  width={"3%"}
                                />
                                <Column
                                  title="Jkb"
                                  dataIndex="Jkb_IDC"
                                  key="Jkb_IDC"
                                  align="center"
                                  width={"3%"}
                                />
                                <Column
                                  title="Jk3"
                                  dataIndex="Jk3_IDC"
                                  key="Jk3_IDC"
                                  align="center"
                                  width={"3%"}
                                />
                              </ColumnGroup>
                              <ColumnGroup title="MNSs">
                                <Column
                                  title="M"
                                  dataIndex="M_IDC"
                                  key="M_IDC"
                                  align="center"
                                  width={"3%"}
                                />
                                <Column
                                  title="N"
                                  dataIndex="N_IDC"
                                  key="N_IDC"
                                  align="center"
                                  width={"3%"}
                                />
                                <Column
                                  title="S"
                                  dataIndex="S_IDC"
                                  key="S_IDC"
                                  align="center"
                                  width={"3%"}
                                />
                                <Column
                                  title="s"
                                  dataIndex="s_IDC"
                                  key="s_IDC"
                                  align="center"
                                  width={"3%"}
                                />
                                <Column
                                  title="Mia"
                                  dataIndex="Mia_IDC"
                                  key="Mia_IDC"
                                  align="center"
                                  width={"3%"}
                                />
                              </ColumnGroup>
                              <ColumnGroup title="Lewis">
                                <Column
                                  title="Lea"
                                  dataIndex="Lea_IDC"
                                  key="Lea_IDC"
                                  align="center"
                                  width={"3%"}
                                />
                                <Column
                                  title="Leb"
                                  dataIndex="Leb_IDC"
                                  key="Leb_IDC"
                                  align="center"
                                  width={"3%"}
                                />
                              </ColumnGroup>
                              <ColumnGroup title="DUffy">
                                <Column
                                  title="Fya"
                                  dataIndex="Fya_IDC"
                                  key="Fya_IDC"
                                  align="center"
                                  width={"3%"}
                                />
                                <Column
                                  title="Fyb"
                                  dataIndex="Fyb_IDC"
                                  key="Fyb_IDC"
                                  align="center"
                                  width={"3%"}
                                />
                                <Column
                                  title="Fy3"
                                  dataIndex="Fy3_IDC"
                                  key="Fy3_IDC"
                                  align="center"
                                  width={"3%"}
                                />
                              </ColumnGroup>
                              <ColumnGroup title="Diego">
                                <Column
                                  title="Dia"
                                  dataIndex="Dia_IDC"
                                  key="Dia_IDC"
                                  align="center"
                                  width={"3%"}
                                />
                                <Column
                                  title="Dib"
                                  dataIndex="Dib_IDC"
                                  key="Dib_IDC"
                                  align="center"
                                  width={"3%"}
                                />
                              </ColumnGroup>
                            </Table>
                            <Table
                              className="NOHOVERformAntibody"
                              dataSource={Identification_data}
                              pagination={false}
                              bordered
                              size="small"
                              width="100%"
                              style={{
                                marginTop: "-1px",
                                // ,marginLeft:"80px",paddingRight:"60px"
                              }}
                              //   scroll={{
                              //     x: "calc(300px + 50%)",
                              //     // y: "460",
                              //   }}
                            >
                              <ColumnGroup title="I">
                                <Column
                                  title="I"
                                  dataIndex="I_IDC"
                                  key="I_IDC"
                                  align="center"
                                  width={"6%"}
                                />
                                <Column
                                  title="IH"
                                  dataIndex="IH_IDC"
                                  key="IH_IDC"
                                  align="center"
                                  width={"6%"}
                                />
                              </ColumnGroup>
                              <ColumnGroup title="Coton">
                                <Column
                                  title="Coa"
                                  dataIndex="Coa_IDC"
                                  key="Coa_IDC"
                                  align="center"
                                  width={"6%"}
                                />
                                <Column
                                  title="Cob"
                                  dataIndex="Cob_IDC"
                                  key="Cob_IDC"
                                  align="center"
                                  width={"6%"}
                                />
                              </ColumnGroup>
                              <ColumnGroup title="Autoantibody">
                                <Column
                                  title="CT"
                                  dataIndex="CT_IDC"
                                  key="CT_IDC"
                                  align="center"
                                  width={"6%"}
                                />
                                <Column
                                  title="WT"
                                  dataIndex="WT_IDC"
                                  key="WT_IDC"
                                  align="center"
                                  width={"6%"}
                                />
                                <Column
                                  title="Hemolysis"
                                  dataIndex="Hemolysis_IDC"
                                  key="Hemolysis_IDC"
                                  align="center"
                                  width={"6%"}
                                />
                              </ColumnGroup>
                              <ColumnGroup title="Xg">
                                <Column
                                  title="Xga"
                                  dataIndex="Xga_IDC"
                                  key="Xga_IDC"
                                  align="center"
                                  width={"6%"}
                                />
                                <Column
                                  title="F/M"
                                  dataIndex="F_M_IDC"
                                  key="F_M_IDC"
                                  align="center"
                                  width={"6%"}
                                />
                              </ColumnGroup>
                              <ColumnGroup title="P">
                                <Column
                                  title="P1"
                                  dataIndex="P1_IDC"
                                  key="P1_IDC"
                                  align="center"
                                  width={"6%"}
                                />
                                <Column
                                  title="Tja"
                                  dataIndex="Tja_IDC"
                                  key="Tja_IDC"
                                  align="center"
                                  width={"6%"}
                                />
                              </ColumnGroup>

                              <Column
                                title="Uniden"
                                dataIndex="Uniden_IDC"
                                key="Uniden_IDC"
                                align="center"
                                width={"6%"}
                                backgroundColor="red"
                              />

                              <ColumnGroup title="Luthearn">
                                <Column
                                  title="Lua"
                                  dataIndex="Lua_IDC"
                                  key="Lua_IDC"
                                  align="center"
                                  width={"6%"}
                                />
                                <Column
                                  title="Lub"
                                  dataIndex="Lub_IDC"
                                  key="Lub_IDC"
                                  align="center"
                                  width={"6%"}
                                />
                              </ColumnGroup>

                              <Column
                                title="RF"
                                dataIndex="RF_IDC"
                                key="RF_IDC"
                                align="center"
                                width={"6%"}
                              />
                            </Table>
                          </Form>
                        </Col>
                      </Row>
                    </TabPane>

                    <TabPane tab="Antigen" key="2" forceRender={true}>
                      <Form form={Identification_formAntigen}>
                        <Table
                          className="NOHOVERAntigen"
                          dataSource={Antigen_data}
                          pagination={false}
                          bordered
                          size="small"
                          width="100%"
                          //   scroll={{
                          //     x: "calc(400px + 40%)",
                          //     // y: "460",
                          //     // x:"50px"
                          //   }}
                        >
                          <ColumnGroup title="ABO">
                            <Column
                              title="A1"
                              dataIndex="A1_ATJ"
                              key="A1_ATJ"
                              align="center"
                              width={"3%"}
                            />
                            <Column
                              title="H"
                              dataIndex="H_ATJ"
                              key="H_ATJ"
                              align="center"
                              width={"3%"}
                            />
                          </ColumnGroup>
                          <ColumnGroup title="RH">
                            <Column
                              title="D"
                              dataIndex="D_ATJ"
                              key="D_ATJ"
                              align="center"
                              width={"3%"}
                            />
                            <Column
                              title="C"
                              dataIndex="C_ATJ"
                              key="C_ATJ"
                              align="center"
                              width={"3%"}
                            />
                            <Column
                              title="c"
                              dataIndex="c_ATJ"
                              key="c_ATJ"
                              align="center"
                              width={"3%"}
                            />
                            <Column
                              title="E"
                              dataIndex="E_ATJ"
                              key="E_ATJ"
                              align="center"
                              width={"3%"}
                            />
                            <Column
                              title="e"
                              dataIndex="e_ATJ"
                              key="e_ATJ"
                              align="center"
                              width={"3%"}
                            />
                          </ColumnGroup>
                          <ColumnGroup title="Kell">
                            <Column
                              title="K"
                              dataIndex="K_ATJ"
                              key="K_ATJ"
                              align="center"
                              width={"3%"}
                            />
                            <Column
                              title="k"
                              dataIndex="k_ATJ"
                              key="k_ATJ"
                              align="center"
                              width={"3%"}
                            />
                          </ColumnGroup>
                          <ColumnGroup title="Diego">
                            <Column
                              title="Dia"
                              dataIndex="Dia_ATJ"
                              key="Dia_ATJ"
                              align="center"
                              width={"3%"}
                            />
                            <Column
                              title="Dib"
                              dataIndex="Dib_ATJ"
                              key="Dib_ATJ"
                              align="center"
                              width={"3%"}
                            />
                          </ColumnGroup>
                          <ColumnGroup title="MNSs">
                            <Column
                              title="M"
                              dataIndex="M_ATJ"
                              key="M_ATJ"
                              align="center"
                              width={"3%"}
                            />
                            <Column
                              title="N"
                              dataIndex="N_ATJ"
                              key="N_ATJ"
                              align="center"
                              width={"3%"}
                            />
                            <Column
                              title="S"
                              dataIndex="S_ATJ"
                              key="S_ATJ"
                              align="center"
                              width={"3%"}
                            />
                            <Column
                              title="s"
                              dataIndex="s_ATJ"
                              key="s_ATJ"
                              align="center"
                              width={"3%"}
                            />
                            <Column
                              title="Mia"
                              dataIndex="Mia_ATJ"
                              key="Mia_ATJ"
                              align="center"
                              width={"3%"}
                            />
                          </ColumnGroup>
                          <ColumnGroup title="Lewis">
                            <Column
                              title="Lea"
                              dataIndex="Lea_ATJ"
                              key="Lea_ATJ"
                              align="center"
                              width={"3%"}
                            />
                            <Column
                              title="Leb"
                              dataIndex="Leb_ATJ"
                              key="Leb_ATJ"
                              align="center"
                              width={"3%"}
                            />
                          </ColumnGroup>
                          <ColumnGroup title="Conton">
                            <Column
                              title="Coa"
                              dataIndex="Coa_ATJ"
                              key="Coa_ATJ"
                              align="center"
                              width={"3%"}
                            />
                            <Column
                              title="Cob"
                              dataIndex="Cob_ATJ"
                              key="Cob_ATJ"
                              align="center"
                              width={"3%"}
                            />
                          </ColumnGroup>
                          <ColumnGroup title="Kidd">
                            <Column
                              title="Jka"
                              dataIndex="Jka_ATJ"
                              key="Jka_ATJ"
                              align="center"
                              width={"3%"}
                            />
                            <Column
                              title="Jkb"
                              dataIndex="Jkb_ATJ"
                              key="Jkb_ATJ"
                              align="center"
                              width={"3%"}
                            />
                          </ColumnGroup>
                          <ColumnGroup title="I">
                            <Column
                              title="I"
                              dataIndex="I_ATJ"
                              key="I_ATJ"
                              align="center"
                              width={"3%"}
                            />
                            <Column
                              title="i"
                              dataIndex="i_ATJ"
                              key="i_ATJ"
                              align="center"
                              width={"3%"}
                            />
                          </ColumnGroup>

                          <ColumnGroup title="P">
                            <Column
                              title="P1"
                              dataIndex="P1_ATJ"
                              key="P1_ATJ"
                              align="center"
                              width={"3%"}
                            />
                            <Column
                              title="p"
                              dataIndex="p_ATJ"
                              key="p_ATJ"
                              align="center"
                              width={"3%"}
                            />
                          </ColumnGroup>

                          <ColumnGroup title="Lutherean">
                            <Column
                              title="Lua"
                              dataIndex="Lua_ATJ"
                              key="Lua_ATJ"
                              align="center"
                              width={"3%"}
                            />
                            <Column
                              title="Lub"
                              dataIndex="Lub_ATJ"
                              key="Lub_ATJ"
                              align="center"
                              width={"3%"}
                            />
                          </ColumnGroup>

                          <ColumnGroup title="Duffy">
                            <Column
                              title="Fya"
                              dataIndex="Fya_ATJ"
                              key="Fya_ATJ"
                              align="center"
                              width={"3%"}
                            />
                            <Column
                              title="Fyb"
                              dataIndex="Fyb_ATJ"
                              key="Fyb_ATJ"
                              align="center"
                              width={"3%"}
                            />
                          </ColumnGroup>

                          <Column
                            title="Xga"
                            dataIndex="Xga_ATJ"
                            key="Xga_ATJ"
                            align="center"
                            width={"3%"}
                          />
                        </Table>
                        <Row justify="end" style={{ marginTop: "10px" }}>
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
                            />
                            Refresh
                          </Button>
                        </Row>
                      </Form>
                    </TabPane>
                  </Tabs>
                </div>
              </Col>
            </Row>
            <Row
              style={{ marginTop: "6px", marginBottom: "-20px" }}
              justify="center"
            >
              <Col xs={23} lg={23} xl={23}>
                <Row justify="start">
                  <Col span={12}>
                    <Form form={Identification_formAntibody}>
                      <Form.Item
                        label="Antibody"
                        name="resultATB"
                        style={{ fontWeight: "bold" }}
                      >
                        <TextArea
                          rows={1}
                          placeholder="Antibody"
                          // style={{ width: "700px" }}
                        ></TextArea>
                      </Form.Item>
                    </Form>
                  </Col>
                  <Col span={12}>
                    <Form form={Identification_formAntigen}>
                      <Form.Item
                        label="Antigen"
                        name="resultATG"
                        style={{ marginLeft: "20px", fontWeight: "bold" }}
                      >
                        <TextArea
                          rows={1}
                          placeholder="Antigen"
                          // style={{ width: "700px" }}
                        />
                      </Form.Item>
                    </Form>
                  </Col>
                </Row>
              </Col>
              <Col xs={23} lg={23} xl={23}>
                <Row style={{ marginTop: "-20px" }}>
                  <Col xs={12} xl={12} lg={12}>
                    <Form form={Identification_formAntibody}>
                      <Form.Item label="หมายเหตุ" name="note_antibody">
                        <TextArea
                          rows={1}
                          placeholder="ระบุหมายเหตุ"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Form>
                  </Col>
                  <Col xs={12} xl={12} lg={12} style={{ paddingLeft: "13px" }}>
                    <Form form={Identification_formAntigen}>
                      <Form.Item label="หมายเหตุ" name="note_antigen">
                        <TextArea
                          rows={1}
                          placeholder="ระบุหมายเหตุ"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Form>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row>
              <Col style={{ paddingLeft: "30px" }} xs={12} xl={12} lg={12}>
                <b style={{ fontSize: "12px" }}>
                  บันทึกล่าสุด&nbsp;:&nbsp;&nbsp;:&nbsp;&nbsp;
                  {/* <span style={{ color: "blue" }}>(Antibody )</span> */}
                  <span style={{ color: "blue", fontSize: "12px" }}>
                    {Data_ATB[0]?.save_staff}&nbsp;&nbsp;
                    {Data_ATB[0]?.ATB_savedate}&nbsp;
                    {Data_ATB[0]?.ATB_savetime}
                  </span>
                </b>
              </Col>
              <Col xs={10} xl={10} lg={10} style={{ paddingLeft: "15px" }}>
                <b style={{ fontSize: "12px" }}>
                  บันทึกล่าสุด&nbsp;:&nbsp;&nbsp;:&nbsp;&nbsp;
                  {/* <span style={{ color: "blue" }}>(Antigen )</span> */}
                  <span style={{ color: "blue", fontSize: "12px" }}>
                    {Data_ATG[0]?.save_staff}&nbsp;&nbsp;
                    {Data_ATG[0]?.ATG_savedate}&nbsp;
                    {Data_ATG[0]?.ATG_savetime}
                  </span>
                </b>
              </Col>
            </Row>
            {/* <Form form={Identification_formAntibody}> */}
            <Row justify="end" style={{ marginBottom: "-10px" }}>
              <Form.Item
                label="Pass"
                // name="passSendIdentifications"
                // style={{ marginLeft: "580px" }}
              >
                {/* <Input style={{ width: "90px" }} /> */}
                <Input.Password
                  placeholder="กรุณากรอกรหัสผ่าน"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  style={{ width: "90px" }}
                  value={passwordSendIdentification}
                  onChange={(e) =>
                    setPasswordSendIdentification(e.target.value)
                  }
                  onKeyDown={({ target: { value }, keyCode }) => {
                    if (keyCode === 13) {
                      // 13 คือ enter
                      SendIdentificationDATA();
                    }
                  }}
                />
              </Form.Item>
              &nbsp;
              <Tooltip title="บันทึก">
                <Button
                  style={{
                    border: "1px solid",
                    // marginLeft: "12px",
                  }}
                  type="primary"
                  shape="round"
                  icon={<SaveFilled style={{ color: "#fff" }} />}
                  // htmlType="submit"
                  onClick={SendIdentificationDATA}
                >
                  บันทึก
                </Button>
              </Tooltip>
            </Row>
            {/* </Form> */}
            {checksaveall === "" || checksavealls === "" ? (
              <Row justify="center">
                <b style={{ color: "red" }}>
                  กรุณากรอกข้อมูลที่ Patient Grouping ให้ครบถ้วน
                </b>
              </Row>
            ) : (
              <Row justify="center">
                {showFetch_ConfirmDataPG === "Y" ? (
                  <Tooltip title="confirm">
                    <Button
                      style={{
                        border: "1px solid",
                        backgroundColor: "green",
                      }}
                      type="primary"
                      // shape="round"
                      icon={
                        <SafetyCertificateFilled style={{ color: "#fff" }} />
                      }
                      onClick={showModal}
                    >
                      confirm Patient Grouping
                    </Button>
                  </Tooltip>
                ) : (
                  <Tooltip title="confirm">
                    <Button
                      style={{
                        border: "1px solid",
                        backgroundColor: "orange",
                      }}
                      type="primary"
                      // shape="round"
                      icon={
                        <SafetyCertificateFilled style={{ color: "#fff" }} />
                      }
                      onClick={showModal}
                    >
                      confirm Patient Grouping
                    </Button>
                  </Tooltip>
                )}
              </Row>
            )}

            <Row
              justify="center"
              style={{ marginTop: "5px", marginBottom: "1px" }}
            >
              <b style={{ fontSize: "12px" }}>
                confirm Patient Grouping ล่าสุด:
                {/* <span style={{ color: "blue" }}>(Antibody )</span> */}
                <span style={{ color: "blue" }}>
                  {" "}
                  {showFetch_ConfirmDataPG_detil[0]?.staff_cross_confirm_update}
                  &nbsp;&nbsp;
                  {showFetch_ConfirmDataPG_detil[0]?.cross_savedate}&nbsp;
                  {showFetch_ConfirmDataPG_detil[0]?.cross_savetime}
                </span>
              </b>
            </Row>
            <Row justify="center" style={{ marginBottom: "0px" }}>
              <Col span={24}>
                <hr />
              </Col>
            </Row>
            <Row justify="center">
              <Tooltip title="บันทึก ALL">
                <Button
                  type="primary"
                  // shape="round"
                  icon={<SaveFilled style={{ color: "#fff" }} />}
                  onClick={showModalsaveall}
                  style={{ paddingRight: "100px", paddingLeft: "100px" }}
                >
                  บันทึก ALL
                </Button>
              </Tooltip>
              &nbsp;
              <Tooltip title="ยกเลิก">
                <Button
                  type="danger"
                  // shape="round"
                  // icon={<SaveFilled style={{ color: "#fff" }} />}
                  onClick={showModal_showall_tysc_onCancel}
                  style={{ paddingRight: "100px", paddingLeft: "100px" }}
                >
                  ยกเลิก
                </Button>
              </Tooltip>
            </Row>
          </Col>
        </Row>
        <br />

        {/* --------------------------------- */}

        <Modal
          title=""
          visible={showModal_imagelab}
          // onOk={handleOkGR_Alrit}
          onCancel={CancelshowModal_Labimg}
          // className="Modalwarning_conGR"
          footer={false}
          width={800}
          style={{ top: 10 }}
        >
          <Row justify="start">
            <Col span={24}>
              <Row style={{ marginTop: "-20px", marginBottom: "-6px" }}>
                <Col span={13}>
                  <Row>
                    <b style={{ fontSize: "16px" }}>ผลการตรวจ</b>
                  </Row>
                  <Row>
                    <b style={{ fontSize: "12px" }}>Result</b>
                  </Row>
                  <b style={{ fontSize: "12px" }}>Barcode :</b>
                  <span style={{ fontSize: "12px" }}>
                    &nbsp;{Data_BRQ[0]?.order_number}
                  </span>
                  <Row>
                    <Col span={12}>
                      <b style={{ fontSize: "12px" }}>ABO :</b>
                      <span style={{ fontSize: "12px" }}>
                        &nbsp;{Data_BRQ[0]?.blood_gr}
                      </span>
                    </Col>
                    <Col span={12}>
                      <b style={{ fontSize: "12px" }}>Rh D :</b>
                      <span style={{ fontSize: "12px" }}>
                        &nbsp;{Data_BRQ[0]?.blood_rh}
                      </span>
                    </Col>
                    <Col>
                      <Row>
                        <b style={{ fontSize: "12px" }}>ABS :</b>
                        <span style={{ fontSize: "12px" }}>
                          &nbsp;{Data_BRQ[0]?.abs_result}
                        </span>
                      </Row>
                      <Row>
                        <b style={{ fontSize: "12px" }}>DAT :</b>
                        <span style={{ fontSize: "12px" }}>
                          &nbsp;{Data_BRQ[0]?.dat_result}
                        </span>
                      </Row>

                      <Row>
                        <b style={{ fontSize: "12px" }}>Auto Ctrl :</b>
                        <span style={{ fontSize: "12px" }}>
                          &nbsp;{Data_BRQ[0]?.autologous_result}
                        </span>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col span={11}>
                  <Row style={{ marginBottom: "15px" }}>
                    <b style={{ fontSize: "12px" }}>Test Date time :</b>
                  </Row>

                  <Row>
                    <Col span={24}>
                      <Card
                        style={{
                          border: "1px solid",
                          borderColor: "GrayText",
                          borderRadius: "0px",
                          // paddingBottom:"-15px"
                        }}
                      >
                        <Row style={{ marginTop: "-15px" }}>
                          <b style={{ fontSize: "12px" }}>Barcode :</b>
                          <span style={{ fontSize: "12px" }}>
                            &nbsp;{Data_BRQ[0]?.barcode_mom}
                          </span>
                        </Row>
                        <Row style={{ marginTop: "-3px" }}>
                          <Col span={12}>
                            <b style={{ fontSize: "12px" }}>ABO :</b>
                            <span style={{ fontSize: "12px" }}>
                              &nbsp;{Data_BRQ[0]?.blood_gr_mom}
                            </span>
                          </Col>
                          <Col span={12}>
                            <b style={{ fontSize: "12px" }}>Rh D :</b>
                            <span style={{ fontSize: "12px" }}>
                              &nbsp;{Data_BRQ[0]?.blood_rh_mom}
                            </span>
                          </Col>
                        </Row>
                        <Row style={{ marginTop: "-3px" }}>
                          <b style={{ fontSize: "12px" }}>ABS :</b>
                          <span style={{ fontSize: "12px" }}>
                            &nbsp;{Data_BRQ[0]?.abs_result_mom}
                          </span>
                        </Row>
                        <Row
                          justify="start"
                          style={{ marginTop: "-3px", marginBottom: "-10px" }}
                        >
                          <Col span={12}>
                            <b style={{ fontSize: "12px" }}>DAT :</b>
                            <span style={{ fontSize: "12px" }}>
                              &nbsp;{Data_BRQ[0]?.dat_result_mom}
                            </span>
                          </Col>
                          <Col span={12}>
                            <b style={{ fontSize: "12px" }}>Auto Ctrl :</b>
                            <span style={{ fontSize: "12px" }}>
                              &nbsp;{Data_BRQ[0]?.autologous_result_mom}
                            </span>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                  <Row
                    style={{ marginTop: "-110px", marginLeft: "10px" }}
                    className="Phenotype"
                  >
                    <b
                      style={{
                        backgroundColor: "white",
                        fontSize: "14px",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                      }}
                    >
                      ผลตรวจแม่
                    </b>
                  </Row>
                </Col>
              </Row>
              <Row justify="center" style={{ marginBottom: "-6px" }}>
                <Col span={24}>
                  <hr />
                </Col>
              </Row>
              <Row>
                <Col xs={7} xl={7} lg={7}>
                  <Row>
                    <b style={{ fontSize: "12px" }}>Test :</b>{" "}
                    <b style={{ fontSize: "18px", marginTop: "-4px" }}>
                      &nbsp;&nbsp;{showresult_onclick_Title}
                    </b>
                  </Row>
                  <Row>
                    <b style={{ fontSize: "14px" }}>Result :</b>
                    <b
                      style={{
                        fontSize: "20px",
                        color: "blue",
                        marginTop: "-4px",
                      }}
                    >
                      &nbsp;&nbsp;{showresult_onclick}
                    </b>
                  </Row>
                  <Row justify="center" style={{ marginBottom: "-20px" }}>
                    {showresult_onclickimage == "" ||
                    showresult_onclickimage == null ||
                    showresult_onclickimage == undefined ||
                    showresult_onclickimage == [] ? (
                      ""
                    ) : (
                      <img
                        width={140}
                        src={`${env.PATH_IMG}/image_typescreen/${showresult_onclickimage}?pathType=99`}
                      />
                    )}
                  </Row>
                </Col>
                <Col xs={17} xl={17} lg={17} style={{ marginBottom: "-18px" }}>
                  <Row>
                    <Col span={24}>
                      <Tabs defaultActiveKey="3" type="card">
                        <TabPane tab="รายการผลตรวจ" key="3" forceRender={true}>
                          <Row
                            style={{ marginTop: "-14px", marginBottom: "3px" }}
                          >
                            <Col span={24}>
                              <Row>
                                <Table
                                  className="NOHOVERAntibody_Screening"
                                  dataSource={Labresult_ABO_anti_a}
                                  pagination={false}
                                  bordered
                                  size="small"
                                  // width="100%"
                                  onRow={(record, rowIndex, text) => {
                                    return {
                                      onClick: () => {
                                        ClickRow("anti_a");
                                      },
                                    };
                                  }}
                                  rowClassName="pointer"
                                >
                                  <Column
                                    title="Anti-A"
                                    dataIndex="anti_a"
                                    key="anti_a"
                                    align="center"
                                    width="6%"
                                    height="100%"
                                  />
                                </Table>
                                <Table
                                  className="NOHOVERAntibody_Screening"
                                  rowClassName="pointer"
                                  dataSource={Labresult_ABO_anti_b}
                                  pagination={false}
                                  bordered
                                  size="small"
                                  // width="100%"
                                  onRow={(record, rowIndex, text) => {
                                    return {
                                      onClick: () => {
                                        ClickRow("anti_b");
                                      },
                                    };
                                  }}
                                >
                                  <Column
                                    title="Anti-B"
                                    dataIndex="anti_b"
                                    key="anti_b"
                                    align="center"
                                    width="6%"
                                  />
                                </Table>
                                <Table
                                  className="NOHOVERAntibody_Screening"
                                  rowClassName="pointer"
                                  dataSource={Labresult_ABO_anti_d}
                                  pagination={false}
                                  bordered
                                  size="small"
                                  // width="100%"
                                  onRow={(record, rowIndex, text) => {
                                    return {
                                      onClick: () => {
                                        ClickRow("anti_d");
                                      },
                                    };
                                  }}
                                >
                                  <Column
                                    title="Anti-D"
                                    dataIndex="anti_d"
                                    key="anti_d"
                                    align="center"
                                    width="6%"
                                  />
                                </Table>
                                <Table
                                  className="NOHOVERAntibody_Screening"
                                  rowClassName="pointer"
                                  dataSource={Labresult_ABO_cell_ctrl}
                                  pagination={false}
                                  bordered
                                  size="small"
                                  // width="100%"
                                  onRow={(record, rowIndex, text) => {
                                    return {
                                      onClick: () => {
                                        ClickRow("cell_ctrl");
                                      },
                                    };
                                  }}
                                >
                                  <Column
                                    align="center"
                                    width="6%"
                                    title="Ctl"
                                    dataIndex="cell_ctrl"
                                    key="cell_ctrl"
                                  />
                                </Table>
                                <Table
                                  className="NOHOVERAntibody_Screening"
                                  rowClassName="pointer"
                                  dataSource={Labresult_ABO_cell_a_pic}
                                  pagination={false}
                                  bordered
                                  size="small"
                                  // width="100%"
                                  onRow={(record, rowIndex, text) => {
                                    return {
                                      onClick: () => {
                                        ClickRow("cell_a");
                                      },
                                    };
                                  }}
                                >
                                  <Column
                                    align="center"
                                    width="6%"
                                    title="A-Cell"
                                    dataIndex="cell_a"
                                    key="cell_a"
                                  />
                                </Table>
                                <Table
                                  className="NOHOVERAntibody_Screening"
                                  rowClassName="pointer"
                                  dataSource={Labresult_ABO_cell_b_pic}
                                  pagination={false}
                                  bordered
                                  size="small"
                                  // width="100%"
                                  onRow={(record, rowIndex, text) => {
                                    return {
                                      onClick: () => {
                                        ClickRow("cell_b");
                                      },
                                    };
                                  }}
                                >
                                  <Column
                                    align="center"
                                    width="6%"
                                    title="B-Cell"
                                    dataIndex="cell_b"
                                    key="cell_b"
                                  />
                                </Table>
                              </Row>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={8}>
                              <Row>
                                <Table
                                  className="NOHOVERAntibody_Screening"
                                  rowClassName="pointer"
                                  dataSource={Labresult_abs_01}
                                  pagination={false}
                                  bordered
                                  size="small"
                                  // width="100%"
                                  onRow={(record, rowIndex, text) => {
                                    return {
                                      onClick: () => {
                                        ClickRow("o1");
                                      },
                                    };
                                  }}
                                >
                                  <Column
                                    title="I"
                                    dataIndex="o1"
                                    key="o1"
                                    align="center"
                                    width="6%"
                                  />
                                </Table>
                                <Table
                                  className="NOHOVERAntibody_Screening"
                                  rowClassName="pointer"
                                  dataSource={Labresult_abs_02}
                                  pagination={false}
                                  bordered
                                  size="small"
                                  // width="100%"
                                  onRow={(record, rowIndex, text) => {
                                    return {
                                      onClick: () => {
                                        ClickRow("o2");
                                      },
                                    };
                                  }}
                                >
                                  <Column
                                    title="II"
                                    dataIndex="o2"
                                    key="o2"
                                    align="center"
                                    width="6%"
                                  />
                                </Table>
                              </Row>
                            </Col>
                            <Col span={4} offset={3}>
                              <Row>
                                <Table
                                  className="NOHOVERAntibody_Screening"
                                  rowClassName="pointer"
                                  dataSource={DAT}
                                  pagination={false}
                                  bordered
                                  size="small"
                                  // width="100%"
                                  onRow={(record, rowIndex, text) => {
                                    return {
                                      onClick: () => {
                                        ClickRow("dat");
                                      },
                                    };
                                  }}
                                >
                                  <Column
                                    title="DAT"
                                    dataIndex="dat"
                                    key="dat"
                                    align="center"
                                    width="6%"
                                  />
                                </Table>
                              </Row>
                            </Col>
                            <Col span={4} offset={3}>
                              <Row>
                                <Table
                                  className="NOHOVERAntibody_Screening"
                                  rowClassName="pointer"
                                  dataSource={AC}
                                  pagination={false}
                                  bordered
                                  size="small"
                                  onRow={(record, rowIndex, text) => {
                                    return {
                                      onClick: () => {
                                        ClickRow("ac");
                                      },
                                    };
                                  }}
                                  // width="100%"
                                >
                                  <Column
                                    title="AC"
                                    dataIndex="ac"
                                    key="ac"
                                    align="center"
                                    width="6%"
                                  />
                                </Table>
                              </Row>
                            </Col>
                          </Row>
                        </TabPane>
                        <TabPane
                          tab="รายการผลตรวจแม่"
                          key="4"
                          forceRender={true}
                        >
                          <Row
                            style={{ marginTop: "-14px", marginBottom: "3px" }}
                          >
                            <Col span={24}>
                              <Row>
                                <Table
                                  className="NOHOVERAntibody_Screening"
                                  rowClassName="pointer"
                                  dataSource={Labresult_ABO_anti_a_mom}
                                  pagination={false}
                                  bordered
                                  size="small"
                                  // width="100%"
                                  onRow={(record, rowIndex, text) => {
                                    return {
                                      onClick: () => {
                                        ClickRow("anti_a_mom");
                                      },
                                    };
                                  }}
                                >
                                  <Column
                                    title="Anti-A"
                                    dataIndex="anti_a"
                                    key="anti_a"
                                    align="center"
                                    width="6%"
                                    height="100%"
                                  />
                                </Table>
                                <Table
                                  className="NOHOVERAntibody_Screening"
                                  rowClassName="pointer"
                                  dataSource={Labresult_ABO_anti_b_mom}
                                  pagination={false}
                                  bordered
                                  size="small"
                                  // width="100%"
                                  onRow={(record, rowIndex, text) => {
                                    return {
                                      onClick: () => {
                                        ClickRow("anti_b_mom");
                                      },
                                    };
                                  }}
                                >
                                  <Column
                                    title="Anti-B"
                                    dataIndex="anti_b"
                                    key="anti_b"
                                    align="center"
                                    width="6%"
                                  />
                                </Table>
                                <Table
                                  className="NOHOVERAntibody_Screening"
                                  rowClassName="pointer"
                                  dataSource={Labresult_ABO_anti_d_mom}
                                  pagination={false}
                                  bordered
                                  size="small"
                                  // width="100%"
                                  onRow={(record, rowIndex, text) => {
                                    return {
                                      onClick: () => {
                                        ClickRow("anti_d_mom");
                                      },
                                    };
                                  }}
                                >
                                  <Column
                                    title="Anti-D"
                                    dataIndex="anti_d"
                                    key="anti_d"
                                    align="center"
                                    width="6%"
                                  />
                                </Table>
                                <Table
                                  className="NOHOVERAntibody_Screening"
                                  rowClassName="pointer"
                                  dataSource={Labresult_ABO_cell_ctrl_mom}
                                  pagination={false}
                                  bordered
                                  size="small"
                                  // width="100%"
                                  onRow={(record, rowIndex, text) => {
                                    return {
                                      onClick: () => {
                                        ClickRow("cell_ctrl_mom");
                                      },
                                    };
                                  }}
                                >
                                  <Column
                                    align="center"
                                    width="6%"
                                    title="Ctl"
                                    dataIndex="cell_ctrl"
                                    key="cell_ctrl"
                                  />
                                </Table>
                                <Table
                                  className="NOHOVERAntibody_Screening"
                                  rowClassName="pointer"
                                  dataSource={Labresult_ABO_cell_a_pic_mom}
                                  pagination={false}
                                  bordered
                                  size="small"
                                  // width="100%"
                                  onRow={(record, rowIndex, text) => {
                                    return {
                                      onClick: () => {
                                        ClickRow("cell_a_mom");
                                      },
                                    };
                                  }}
                                >
                                  <Column
                                    align="center"
                                    width="6%"
                                    title="A-Cell"
                                    dataIndex="cell_a"
                                    key="cell_a"
                                  />
                                </Table>
                                <Table
                                  className="NOHOVERAntibody_Screening"
                                  rowClassName="pointer"
                                  dataSource={Labresult_ABO_cell_b_pic_mom}
                                  pagination={false}
                                  bordered
                                  size="small"
                                  // width="100%"
                                  onRow={(record, rowIndex, text) => {
                                    return {
                                      onClick: () => {
                                        ClickRow("cell_b_mom");
                                      },
                                    };
                                  }}
                                >
                                  <Column
                                    align="center"
                                    width="6%"
                                    title="B-Cell"
                                    dataIndex="cell_b"
                                    key="cell_b"
                                  />
                                </Table>
                              </Row>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={8}>
                              <Row>
                                <Table
                                  className="NOHOVERAntibody_Screening"
                                  rowClassName="pointer"
                                  dataSource={Labresult_abs_01_mom}
                                  pagination={false}
                                  bordered
                                  size="small"
                                  // width="100%"
                                  onRow={(record, rowIndex, text) => {
                                    return {
                                      onClick: () => {
                                        ClickRow("o1_mom");
                                      },
                                    };
                                  }}
                                >
                                  <Column
                                    title="I"
                                    dataIndex="o1"
                                    key="o1"
                                    align="center"
                                    width="6%"
                                  />
                                </Table>
                                <Table
                                  className="NOHOVERAntibody_Screening"
                                  rowClassName="pointer"
                                  dataSource={Labresult_abs_02_mom}
                                  pagination={false}
                                  bordered
                                  size="small"
                                  // width="100%"
                                  onRow={(record, rowIndex, text) => {
                                    return {
                                      onClick: () => {
                                        ClickRow("o2_mom");
                                      },
                                    };
                                  }}
                                >
                                  <Column
                                    title="II"
                                    dataIndex="o2"
                                    key="o2"
                                    align="center"
                                    width="6%"
                                  />
                                </Table>
                              </Row>
                            </Col>
                            <Col span={4} offset={3}>
                              <Row>
                                <Table
                                  className="NOHOVERAntibody_Screening"
                                  rowClassName="pointer"
                                  dataSource={DAT_mom}
                                  pagination={false}
                                  bordered
                                  size="small"
                                  // width="100%"
                                  onRow={(record, rowIndex, text) => {
                                    return {
                                      onClick: () => {
                                        ClickRow("dat_mom");
                                      },
                                    };
                                  }}
                                >
                                  <Column
                                    title="DAT"
                                    dataIndex="dat"
                                    key="dat"
                                    align="center"
                                    width="6%"
                                  />
                                </Table>
                              </Row>
                            </Col>
                            <Col span={4} offset={3}>
                              <Row>
                                <Table
                                  className="NOHOVERAntibody_Screening"
                                  rowClassName="pointer"
                                  dataSource={AC_mom}
                                  pagination={false}
                                  bordered
                                  size="small"
                                  onRow={(record, rowIndex, text) => {
                                    return {
                                      onClick: () => {
                                        ClickRow("ac_mom");
                                      },
                                    };
                                  }}
                                  // width="100%"
                                >
                                  <Column
                                    title="AC"
                                    dataIndex="ac"
                                    key="ac"
                                    align="center"
                                    width="6%"
                                  />
                                </Table>
                              </Row>
                            </Col>
                          </Row>
                        </TabPane>
                      </Tabs>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal>
        {/* --------------------------------- */}

        {/* --------------------------------- */}
        <Modal
          // title="ยืนยันรหัสผ่าน"
          visible={confrim_pt}
          onOk={Sendconfirm_grouping}
          onCancel={() => {
            setconfrim_pt(false), setPassword();
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
            id="passcross_xm_Sendconfirm_grouping"
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
                Sendconfirm_grouping();
              }
            }}
          />
          <Row justify="end" style={{ marginTop: "10px" }}>
            <Button
              type="primary"
              danger
              onClick={() => {
                setconfrim_pt(false), setPassword();
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
              onClick={Sendconfirm_grouping}
              disabled={!password}
            >
              ยืนยัน
            </Button>
          </Row>
        </Modal>
        {/* --------save all------------ */}
        <Modal
          // title="ยืนยันรหัสผ่าน"
          visible={isModalsaveall}
          onOk={Send_SAVEALL}
          onCancel={() => {
            setIsModalsaveall(false), setPassword();
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
            id="id_saveall"
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
                Send_SAVEALL();
              }
            }}
          />
          <Row justify="end" style={{ marginTop: "10px" }}>
            <Button
              type="primary"
              danger
              onClick={() => {
                setIsModalsaveall(false), setPassword();
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
              onClick={Send_SAVEALL}
              disabled={!password}
            >
              ยืนยัน
            </Button>
          </Row>
        </Modal>
      </div>
    </Spin>
  );
};
export default Patent_blood_request_blooddetil;
