import {
  BgColorsOutlined,
  ClockCircleFilled,
  CloseCircleOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  FileTextFilled,
  LayoutFilled,
  RetweetOutlined,
  SafetyCertificateFilled,
  SaveFilled,
  SnippetsFilled
} from "@ant-design/icons";
import {
  Affix,
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
  Typography
} from "antd";
import "moment/locale/th";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsDropletHalf, BsXCircleFill } from "react-icons/bs";
import { FcOk, FcPrint, FcProcess } from "react-icons/fc";

import api from "../lib/api";
import img from "../public/gifloading_sibsofe.gif";
import Patient_add_reaction from "./Patient_add_reaction";
import Patient_trans_blood from "./Patient_trans_blood";

const { TextArea } = Input;
const { Text } = Typography;
const { Column, ColumnGroup } = Table;
const { TabPane } = Tabs;

const Patent_blood_request_blooddetil = () => {
  const [isModalTransBlood, setIsModalTransBlood] = useState(false);
  const [passwordPatientGrouping, setPasswordPatientGrouping] = useState();
  const [passwordAntibodyScreening, setPasswordAntibodyScreening] = useState();
  const [passwordDATandAutocontrol, setPasswordDATandAutocontrol] = useState();
  const [passwordSendIdentification, setPasswordSendIdentification] =
    useState();
  const [passwordSendcrossmatchs, setPasswordSendcrossmatchs] = useState();
  const [passwordSendcrossmatchs_ungroup, setPasswordSendcrossmatchs_ungroup] =
    useState();
  const router = useRouter();

  const showModalTransBlood = () => {
    setIsModalTransBlood(true);
  };

  const handleOkTransBlood = () => {
    setIsModalTransBlood(false);
  };

  const handleCancelTransBlood = () => {
    setIsModalTransBlood(false);
  };

  const [GR_Alrit, setGR_Alrit] = useState(false);
  const [top, setTop] = useState(0);
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
  function onSearch(val) {}
  // --- end เกี่ยวกับ select

  //  ตาราง Blod_Request
  const columns_Blod_Request = [
    {
      title: "ลำดับที่",
      dataIndex: "key",
      key: "key",
      fixed: "left",
      width: "25%",
      align: "center",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Blood Type",
      dataIndex: "s_name",
      key: "s_name",
      width: "50%",
      render: (text) => <>&nbsp;{text}</>,
    },
    {
      title: "จำนวน",
      dataIndex: "count_unit",
      key: "count_unit",
      width: "25%",
      align: "center",
    },
  ];
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
  const antIcon = (
    <>
      {" "}
      <Image src={img} alt="my gif" />
    </>
  );

  const columnNote = [
    {
      title: "วันที่บันทึก",
      dataIndex: "note_datetime_format",
      key: "note_datetime",
      align: "center",
      width: "20%",
    },
    {
      title: "รายละเอียด",
      dataIndex: "note_detail",
      key: "note_detail",
      width: "30%",
    },
  ];
  const columnReceived = [
    {
      title: "Unit no.",
      dataIndex: "blood_no",
      key: "blood_no",
      align: "center",
      width: "15%",
    },
    {
      title: "Gr.",
      dataIndex: "gr",
      key: "gr",
      align: "center",
      width: "8%",
    },
    {
      title: "Component.",
      dataIndex: "component",
      key: "component",
      align: "center",
      width: "15%",
    },
    {
      title: "ผู้จ่าย",
      dataIndex: "trans_staft",
      key: "trans_staft",
      align: "center",
    },

    {
      title: "วันที่จ่าย",
      dataIndex: "trans_date_time_format",
      key: "trans_date_time_format",
      align: "center",
    },
  ];

  const columnEffect = [
    {
      title: "ลำดับ",
      dataIndex: "no",
      key: "no",
      align: "center",
      width: "10%",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "วันที่บันทึก",
      dataIndex: "ac_save_datetime_format",
      key: "ac_save_datetime_format",
      align: "center",
      width: "20%",
    },
    {
      title: "วันที่มีอาการ",
      dataIndex: "ac_action_datetime_format",
      key: "ac_action_datetime_format",
      align: "center",
      width: "20%",
    },
    {
      title: "ชนิดที่แพ้.",
      dataIndex: "component",
      key: "component",
      align: "center",
    },
    {
      title: "อาการ",
      dataIndex: "ac_action_detail",
      key: "ac_action_detail",
      align: "center",
    },
    {
      title: "ผู้บันทึก",
      dataIndex: "ac_save_staff",
      key: "ac_save_staff",
      align: "center",
    },
  ];

  // END ของ เอิร์น

  const data_Blod_Request = [];

  //---

  const [rh_name, setRhName] = useState();
  const [blood_name, setBloodName] = useState();
  const [Choice_Anti_A, setChoice_Anti_A] = useState();
  const [Choice_Anti_B, setChoice_Anti_B] = useState();
  const [Choice_Anti_AB, setChoice_Anti_AB] = useState();
  const [Choice_Anti_D, setChoice_Anti_D] = useState();
  const [Choice_Anti_A1, setChoice_Anti_A1] = useState();
  const [Choice_Anti_H, setChoice_Anti_H] = useState();
  const [Choice_A_Cell, setChoice_A_Cell] = useState();
  const [Choice_B_Cell, setChoice_B_Cell] = useState();
  const [Choice_O_Cell, setChoice_O_Cell] = useState();
  const [Choice_Ctl, setChoice_Ctl] = useState();
  const [RT_ABS_O1, setRT_ABS_O1] = useState();
  const [temperature_room_ABS_O1, settemperature_room_ABS_O1] = useState();
  const [IAT_ABS_O1, setIAT_ABS_O1] = useState();
  const [RT_ABS_O2, setRT_ABS_O2] = useState();
  const [temperature_room_ABS_O2, settemperature_room_ABS_O2] = useState();
  const [IAT_ABS_O2, setIAT_ABS_O2] = useState();
  const [RT_ABS_O3, setRT_ABS_O3] = useState();
  const [temperature_room_ABS_O3, settemperature_room_ABS_O3] = useState();
  const [IAT_ABS_O3, setIAT_ABS_O3] = useState();
  const [RT_DAT, setRT_DAT] = useState();
  const [temperature_room_DAT, settemperature_room_DAT] = useState();
  const [IAT_DAT, setIAT_DAT] = useState();
  const [RT_ATC, setRT_ATC] = useState();
  const [temperature_room_ATC, settemperature_room_ATC] = useState();
  const [IAT_ATC, setIAT_ATC] = useState();
  const [Choice_RT, setChoice_RT] = useState();
  const [temperature_room, setChoice_temperature_room] = useState();
  const [Choice_IAT, setChoice_IAT] = useState();
  const [blood_group_subgroup, setblood_group_subgroup] = useState();
  const [LoadABSshow, setLoadABS] = useState();
  const [Result_DATshow, setResult_DATshow] = useState();
  const [Result_ATCshow, setResult_ATCshow] = useState();
  const [RT_csm, setRT_csm] = useState();
  const [temperature_room_csm, settemperature_room_csm] = useState();
  const [IAT_csm, setIAT_csm] = useState();
  const [Gel_csm, setGel_csm] = useState();
  const [Result_csmshow, setResult_csmshow] = useState();
  const [password, setPassword] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalsaveall, setIsModalsaveall] = useState(false);
  const [isModalconfirm_cross, setIsModalconfirm_cross] = useState(false);
  const [Datafrom_ungroup, setDatafrom_ungroup] = useState();

  const showModal = () => {
    if (setresultcheck === null) {
    } else {
      setIsModalVisible(true);
    }
  };
  const showModalsaveall = () => {
    if (setresultcheck === null) {
    } else {
      setIsModalsaveall(true);
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
                    <p style={{ fontSize: "18px" }}>
                      หมู่เลือดครั้งก่อนคือ&nbsp;
                    </p>
                    <b style={{ fontSize: "24px", marginTop: "-5px" }}>
                      {Datap_g[0].blood_gr}
                    </b>
                  </Row>
                  <Row style={{ marginTop: "-15px" }}>
                    <p style={{ fontSize: "18px" }}>
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
                    <p style={{ fontSize: "18px" }}>
                      หมู่เลือดครั้งก่อนคือ&nbsp;
                    </p>
                    <b style={{ fontSize: "24px", marginTop: "-5px" }}>
                      {Datap_g[0].blood_gr}
                    </b>
                  </Row>
                  <Row style={{ marginTop: "-15px" }}>
                    <p style={{ fontSize: "18px" }}>
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
                    <p style={{ fontSize: "18px" }}>
                      หมู่เลือดครั้งก่อนคือ&nbsp;
                    </p>
                    <b style={{ fontSize: "24px", marginTop: "-5px" }}>
                      {Datap_g[0].blood_gr}
                    </b>
                  </Row>
                  <Row style={{ marginTop: "-15px" }}>
                    <p style={{ fontSize: "18px" }}>
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
                    <p style={{ fontSize: "18px" }}>
                      หมู่เลือดครั้งก่อนคือ&nbsp;
                    </p>
                    <b style={{ fontSize: "24px", marginTop: "-5px" }}>
                      {Datap_g[0].blood_gr}
                    </b>
                  </Row>
                  <Row style={{ marginTop: "-15px" }}>
                    <p style={{ fontSize: "18px" }}>
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
                  <p style={{ fontSize: "18px" }}>
                    หมู่เลือดครั้งก่อนคือ&nbsp;
                  </p>
                  <b style={{ fontSize: "24px", marginTop: "-5px" }}>
                    {Datap_g[0].blood_rh}
                  </b>
                </Row>
                <Row style={{ marginTop: "-15px" }}>
                  <p style={{ fontSize: "18px" }}>หมู่เลือดปัจจุบันคือ&nbsp;</p>
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
                  <p style={{ fontSize: "18px" }}>
                    หมู่เลือดครั้งก่อนคือ&nbsp;
                  </p>
                  <b style={{ fontSize: "24px", marginTop: "-5px" }}>
                    {Datap_g[0].blood_rh}
                  </b>
                </Row>
                <Row style={{ marginTop: "-15px" }}>
                  <p style={{ fontSize: "18px" }}>หมู่เลือดปัจจุบันคือ&nbsp;</p>
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
                  <p style={{ fontSize: "18px" }}>
                    หมู่เลือดครั้งก่อนคือ&nbsp;
                  </p>
                  <b style={{ fontSize: "24px", marginTop: "-5px" }}>
                    {Datap_g[0].blood_rh}
                  </b>
                </Row>
                <Row style={{ marginTop: "-15px" }}>
                  <p style={{ fontSize: "18px" }}>หมู่เลือดปัจจุบันคือ&nbsp;</p>
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
    const result1 = await api.get("/Rh_Name");
    setRhName(result1.data[0]);
    const result2 = await api.get("/Choiciall");
    setChoice_Anti_A(result2.data[0]);
    setChoice_Anti_B(result2.data[0]);
    setChoice_Anti_AB(result2.data[0]);
    setChoice_Anti_D(result2.data[0]);
    setChoice_Anti_A1(result2.data[0]);
    setChoice_Anti_H(result2.data[0]);
    setChoice_A_Cell(result2.data[0]);
    setChoice_B_Cell(result2.data[0]);
    setChoice_O_Cell(result2.data[0]);
    setChoice_Ctl(result2.data[0]);
    setChoice_RT(result2.data[0]);
    setChoice_temperature_room(result2.data[0]);
    setChoice_IAT(result2.data[0]);
    setRT_ABS_O1(result2.data[0]);
    settemperature_room_ABS_O1(result2.data[0]);
    setIAT_ABS_O1(result2.data[0]);
    setRT_ABS_O2(result2.data[0]);
    settemperature_room_ABS_O2(result2.data[0]);
    setIAT_ABS_O2(result2.data[0]);
    setRT_ABS_O3(result2.data[0]);
    settemperature_room_ABS_O3(result2.data[0]);
    setIAT_ABS_O3(result2.data[0]);
    setRT_DAT(result2.data[0]);
    settemperature_room_DAT(result2.data[0]);
    setIAT_DAT(result2.data[0]);
    setRT_ATC(result2.data[0]);
    settemperature_room_ATC(result2.data[0]);
    setIAT_ATC(result2.data[0]);
    setRT_csm(result2.data[0]);
    settemperature_room_csm(result2.data[0]);
    setIAT_csm(result2.data[0]);
    setGel_csm(result2.data[0]);
    const result3 = await api.get("/blood_group_subgroup");
    setblood_group_subgroup(result3.data[0]);
    const result4 = await api.get("/Antibody_Screening");
    setLoadABS(result4.data[0]);
    setResult_DATshow(result4.data[0]);
    setResult_ATCshow(result4.data[0]);
    const result5 = await api.get("/Crossmatching_Result");
    setResult_csmshow(result5.data[0]);
    const result6 = await api.get("/doctor");
    setDoctor(result6.data[0]);
  };
  const LoadBloodName = async () => {
    const result = await api.get("/Blood_Name");

    setBloodName(result.data);
  };
  const LoadRhName = async () => {
    const result = await api.get("/Rh_Name");
    setRhName(result.data[0]);
  };

  const Loadchoice = async () => {
    const result = await api.get("/Choiciall");
    setChoice_Anti_A(result.data[0]);
    setChoice_Anti_B(result.data[0]);
    setChoice_Anti_AB(result.data[0]);
    setChoice_Anti_D(result.data[0]);
    setChoice_Anti_A1(result.data[0]);
    setChoice_Anti_H(result.data[0]);
    setChoice_A_Cell(result.data[0]);
    setChoice_B_Cell(result.data[0]);
    setChoice_O_Cell(result.data[0]);
    setChoice_Ctl(result.data[0]);
    setChoice_RT(result.data[0]);
    setChoice_temperature_room(result.data[0]);
    setChoice_IAT(result.data[0]);
    setRT_ABS_O1(result.data[0]);
    settemperature_room_ABS_O1(result.data[0]);
    setIAT_ABS_O1(result.data[0]);
    setRT_ABS_O2(result.data[0]);
    settemperature_room_ABS_O2(result.data[0]);
    setIAT_ABS_O2(result.data[0]);
    setRT_ABS_O3(result.data[0]);
    settemperature_room_ABS_O3(result.data[0]);
    setIAT_ABS_O3(result.data[0]);
    setRT_DAT(result.data[0]);
    settemperature_room_DAT(result.data[0]);
    setIAT_DAT(result.data[0]);
    setRT_ATC(result.data[0]);
    settemperature_room_ATC(result.data[0]);
    setIAT_ATC(result.data[0]);
    setRT_csm(result.data[0]);
    settemperature_room_csm(result.data[0]);
    setIAT_csm(result.data[0]);
    setGel_csm(result.data[0]);
  };

  const Loadbloodgroupsubgroup = async () => {
    const result = await api.get("/blood_group_subgroup");
    setblood_group_subgroup(result.data[0]);
  };

  const Loadresult = async () => {
    const result = await api.get("/Antibody_Screening");
    setLoadABS(result.data[0]);
    setResult_DATshow(result.data[0]);
    setResult_ATCshow(result.data[0]);
  };

  //----------result2---------
  const LoadresultType = async () => {
    const result = await api.get("/Crossmatching_Result");
    setResult_csmshow(result.data[0]);
  };

  //----------result2---------

  //----------=ชนิดเลือด---------
  const [TypeBlood, setTypeBlood] = useState();

  const LoadCrossmatchTypeBlood = async (value) => {
    const result = await api.get("/TypeBlood_API", {
      params: {
        pid: value,
      },
    });
    setTypeBlood(result.data[0]);
  };

  const [CountTypeBlood, setCountTypeBlood] = useState();
  const [getformDataCrossmat_form, setgetformDataCrossmat_former] = useState();

  const CountLoadCrossmatchTypeBlood = async (id) => {
    const result = await api.get("/Count_TypeBlood_API", {
      params: {
        counttype: id,
        od: router?.query?.order_number,
      },
    });
    document.getElementById("Unit_no_csm").focus();
    setshowbloodno_Detiler([]);
    setCountTypeBlood();
    Crossmat_form.setFieldsValue({
      Unit_no_csm: "",
      Segment_csm: "",
      Volume_csm: "",
    });

    // setshowbloodno_Detiler();
    if (id == "1") {
      setgetformDataCrossmat_former(id);
    } else if (id == "2") {
      setgetformDataCrossmat_former(id);
    } else if (id == "13") {
      setgetformDataCrossmat_former(id);
    } else if (id == "6") {
      setgetformDataCrossmat_former(id);
    } else {
      setgetformDataCrossmat_former("0");
    }

    setCountTypeBlood(result.data[0][0].count_unit);
  };
  //-----------ชนิดเลือด------------------

  //----------crossmatch---------

  const [Crossmatching_Table, setCrossmatch_Type_Data] = useState([]);
  const [showcrossstaff, setshowcrossstaff] = useState();
  const [date_expUSE, setdate_expUSE] = useState();

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
          order_num: router?.query?.order_number,
          staff: staff_name,
        });
        // window.close();
        Modal.success({
          title: "Successful confirmation",
          content: "ยืนยันสำเร็จ",
        });
        await LoadCrossmatch_Type_Data(router?.query?.order_number);
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

  const LoadCrossmatch_Type_Data = async (value) => {
    const result = await api.get("/Crossmatch_TB_API", {
      params: {
        TB: value,
      },
    });

    const keytype = [];
    const keyList = result.data[0];
    let lastType = "";
    keyList.forEach((item) => {
      if (item.s_name !== lastType) {
        keytype.push({
          bl_unit_no: (
            <b style={{ fontSize: "17px", textDecoration: "underline" }}>
              {item.s_name}
            </b>
          ),
        });
        lastType = item.s_name;
      }
      keytype.push(item);
    });
    setCrossmatch_Type_Data(keytype);
  };

  //----------crossmatch_Type------------------

  const [Blood_Request, setBlood_Request] = useState();
  const LoadBlood_Request = async (value) => {
    const result = await api.get("/Blood_Request_Table", {
      params: {
        NUM_BT: value,
      },
    });
    setBlood_Request(result.data[0]);
  };
  const [Blood_Request_cross, setBlood_Request_cross] = useState();
  const LoadBlood_Request_cross = async (value) => {
    const result = await api.get("/Blood_Request_Crossmatch", {
      params: {
        order_number: value,
      },
    });
    

    // console.log("1", result1.data);
    // console.log("2", result1.data[0]);

    const keytype = [];
    const keyList = result.data;


    let lastType = "";
    keyList.forEach((item) => {
      console.log("ITEM", item);
      // for (let i = 0; i < keyList2.length; i++) {
      if (item.type_id !== lastType) {
        // console.log("result2.data", result2.data[i].count_status);

        keytype.push({
          s_name: item.s_name,
          count_unit: item.count_unit,
          // num_status1: `${
          //   item.type_id == result2.data[i].type_id
          //     ? (result2.data[i].num_status=='3'?(result2.data[i].count_status):"")
          //     : ""
          // }`,
          // num_status2: `${
          //   item.type_id == result2.data[i].type_id
          //     ? (result2.data[i].num_status=='4'?(result2.data[i].count_status):"")
          //     : ""
          // }`,
          // num_status3: `${
          //   item.type_id == result2.data[i].type_id
          //     ? (result2.data[i].num_status=='13'?(result2.data[i].count_status):"")
          //     : ""
          // }`,
          // num_status4: `${
          //   item.type_id == result2.data[i].type_id
          //     ? (result2.data[i].num_status=='8'?(result2.data[i].count_status):"")
          //     : ""
          // }`,
          // num_status5: `${
          //   item.type_id == result2.data[i].type_id
          //     ? (result2.data[i].num_status=='11'?(result2.data[i].count_status):"")
          //     : ""
          // }`,
          num_status1: `${item.num_status == "3" ? item.count_status : ""}`,
          num_status2: `${item.num_status == "4" ? item.count_status : ""}`,
          num_status3: `${item.num_status == "13" ? item.count_status : ""}`,
          num_status4: `${item.num_status == "8" ? item.count_status : ""}`,
          num_status5: `${item.num_status == "11" ? item.count_status : ""}`,

          //   num_status1: `${result1.data[0].count_status!=""?(result1.data[0].count_status):""}`,
          // num_status2:`${result2.data[0].count_status!=""?(result2.data[0].count_status):""}`,
          // num_status3: `${item.type_id ==item.type_id?(item.s_name ==item.s_name?(result3.data[0].count_status==""||result3.data[0].count_status==null||result3.data[0].count_status==undefined?"":(result3.data[0].count_status)):""):""}`,
          // num_status4:`${item.type_id ==item.type_id?(item.s_name ==item.s_name?(result4.data[0].count_status!=""?(result4.data[0].count_status):""):""):""}`,
          // num_status5: `${item.type_id ==item.type_id?(item.s_name ==item.s_name?(result4.data[0].count_status!=""?(result4.data[0].count_status):""):""):""}`,
        });
        // lastType = item.type_id;
      

        // }
      }
    });
    setBlood_Request_cross(keytype);
    // setBlood_Request_cross(keyList);
  };

  //----------crossmatch------------------

  // ----------Data_bloodrequesresult--------
  const [checksaveall, setchecksaveall] = useState([]);
  const [checksavealls, setchecksavealls] = useState([]);

  const [Data_BRQ, setData_BRQ] = useState([]);
  const [Datap_g, setDatap_g] = useState([]);
  const [DataABS, setDataABS] = useState([]);

  const [reshowData, setreshowData] = useState([]);
  const Data_bloodrequesresult_Form = async (value) => {
    const result = await api.get("/Data_bloodrequesresult", {
      params: {
        NUM_BT: value,
      },
    });
    frmblood_request.setFieldsValue({
      ...result.data[0],
      bb_code: String(result.data[0][0]?.bb_code),
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
    setData_DAT_ATC(result?.data[0]);
    setDataABS(result?.data[0]);
    setDatap_g(result?.data[0]);
    setData_BRQ(result?.data[0]);
    setchecksaveall(result?.data[0][0].blood_gr);
    setchecksavealls(result?.data[0][0].blood_rh);

    TabdataHis(result?.data[0][0]?.hn);
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
  // ----------AntibodyResult-----------------
  const [ReQdate, setReQdate] = useState([]);
  const [ReCdate, setReCdate] = useState([]);
  const [Data_Tab, setData_Tab] = useState([]);
  const [PtGrouping, setPtGrouping] = useState();
  const [PtAntibody, setPtAntibody] = useState();
  const [PtDat, setPtDat] = useState();
  const [receive, setreceive] = useState();
  const [react, setreact] = useState();
  const TabdataHis = async (hn) => {
    const result = await api.get("/request_blood_hisINTap", {
      params: {
        pid: hn,
        order_number: router?.query.order_number,
      },
    });
    const result2 = await api.get("/receive_blood_hisINTap", {
      params: {
        pid: hn,
        order_number: router?.query.order_number,
      },
    });
    const result3 = await api.get("/patient_note", {
      params: {
        hn: hn,
      },
    });
    const result4 = await api.get("/hn_grouping", {
      params: {
        hn: hn,
      },
    });
    const result5 = await api.get("/hn_antibody", {
      params: {
        hn: hn,
      },
    });
    const result6 = await api.get("/hn_dat", {
      params: {
        hn: hn,
      },
    });
    const result7 = await api.get("/receive_blood_list", {
      params: {
        hn: hn,
      },
    });
    const result8 = await api.get("/patient_react_list", {
      params: {
        hn: hn,
      },
    });
    fromTabshow_data.setFieldsValue({
      ...result.data[0],
      request_datetime_format: String(result.data[0]?.request_datetime_format),
      ...result2.data[0],
      receive_datetime_format: String(result2.data[0]?.receive_datetime_format),
    });
    setReQdate(result.data);
    setReCdate(result2.data);
    setData_Tab(result3.data);
    setPtGrouping(result4.data);
    setPtAntibody(result5.data);
    setPtDat(result6.data);
    setreceive(result7.data);
    setreact(result8?.data[0]);

    // console.log("loGดูค่า------****88888", result8.data);
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
        order_num: router?.query?.order_number,
      },
    });
    const resultX = await api.get("/Data_bloodrequesresult", {
      params: {
        NUM_BT: router?.query?.order_number,
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
    settrue();
    // await LoadBloodName();
    // await LoadRhName();
    // await Loadchoice();
    // await Loadbloodgroupsubgroup();
    // await Loadresult();
    // await LoadresultType();
    // await HNSelect(router?.query?.order_number);
    await Fetch_ward();
    setgetformDataCrossmat_former("0");
    if (router?.query?.order_number) {
      await fletAllchoi();
      await Data_bloodrequesresult_Form(router?.query?.order_number);

      const result = await api.get("/Data_bloodrequesresult", {
        params: {
          NUM_BT: router?.query?.order_number,
        },
      });
      setDatap_g(result?.data[0]);
      setDataABS(result?.data[0]);
      setData_DAT_ATC(result?.data[0]);

      const resultX = await api.get("/Data_bloodrequesresult", {
        params: {
          NUM_BT: router?.query?.order_number,
        },
      });
      const resultcon = await api.get("/showChexkcon_pg", {
        params: {
          NUM_BT: router?.query?.order_number,
        },
      });

      const resultAntigenResult = await api.get("/AntigenResult", {
        params: {
          NUM_BT: router?.query?.order_number,
        },
      });
      setData_ATG(resultAntigenResult?.data[0]);
      const resultAntibodyResult = await api.get("/AntibodyResult", {
        params: {
          NUM_BT: router?.query?.order_number,
        },
      });
      setData_ATB(resultAntibodyResult?.data[0]);

      showsetFetch_ConfirmDataPG_detil(resultcon?.data[0]);

      await LoadBlood_Request_cross(router?.query?.order_number);
      await AntibodyResult_Form(router?.query?.order_number);

      await AntigenResult_Form(router?.query?.order_number);

      await LoadBlood_Request(router?.query?.order_number);

      await Fetch_ConfirmDataPG();
      await showFetch_ConfirmDataPG_detils(router?.query?.order_number);

      await LoadCrossmatch_Type_Data(router?.query?.order_number);
      await LoadCrossmatchTypeBlood(router?.query?.order_number);
    }
    setfalse();
  }, [router?.query?.order_number]);

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
        NUM_BT: router?.query?.order_number,
      },
    });
    const resultcross = await api.get("/Crossmatch_API", {
      params: {
        TB: router?.query?.order_number,
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
                      <p style={{ fontSize: "18px" }}>ถุงเลือด : &nbsp;</p>
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
                              <p style={{ fontSize: "18px" }}>
                                หมู่เลือดคนไข้ คือ <b>{Data_BRQ[0]?.ABO}</b>
                              </p>
                            </Row>
                            <Row style={{ marginTop: "-20px" }}>
                              <p style={{ fontSize: "18px" }}>
                                หมู่เลือดถุงเลือด คือ{" "}
                                <b>{result?.data[0].gr}</b>
                              </p>
                            </Row>
                            <Row
                              style={{
                                marginTop: "-15px",
                                marginLeft: "-10px",
                              }}
                            >
                              <b style={{ fontSize: "18px" }}>
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
                            <p style={{ fontSize: "18px" }}>
                              หมู่เลือดคนไข้ คือ <b>{Data_BRQ[0]?.ABO}</b>
                            </p>
                          </Row>
                          <Row style={{ marginTop: "-20px" }}>
                            <p style={{ fontSize: "18px" }}>
                              หมู่เลือดถุงเลือด คือ <b>{result?.data[0].gr}</b>
                            </p>
                          </Row>
                          <Row
                            style={{ marginTop: "-15px", marginLeft: "-10px" }}
                          >
                            <b style={{ fontSize: "18px" }}>
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
                            <p style={{ fontSize: "18px" }}>
                              หมู่เลือดคนไข้ คือ <b>{Data_BRQ[0]?.ABO}</b>
                            </p>
                          </Row>
                          <Row style={{ marginTop: "-20px" }}>
                            <p style={{ fontSize: "18px" }}>
                              หมู่เลือดถุงเลือด คือ <b>{result?.data[0].gr}</b>
                            </p>
                          </Row>
                          <Row
                            style={{ marginTop: "-15px", marginLeft: "-10px" }}
                          >
                            <b style={{ fontSize: "18px" }}>
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
                            <p style={{ fontSize: "18px" }}>
                              หมู่เลือดคนไข้ คือ <b>{Data_BRQ[0]?.ABO}</b>
                            </p>
                          </Row>
                          <Row style={{ marginTop: "-20px" }}>
                            <p style={{ fontSize: "18px" }}>
                              หมู่เลือดถุงเลือด คือ <b>{result?.data[0].gr}</b>
                            </p>
                          </Row>
                          <Row
                            style={{ marginTop: "-15px", marginLeft: "-10px" }}
                          >
                            <b style={{ fontSize: "18px" }}>
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
                        <p style={{ fontSize: "18px" }}>ถุงเลือด : &nbsp;</p>
                        <b style={{ fontSize: "24px", marginTop: "-5px" }}>
                          {result?.data[0].blood_no}
                        </b>
                      </Row>
                      <Row style={{ marginTop: "-15px" }}>
                        <p style={{ fontSize: "18px" }}>
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
                    <p style={{ fontSize: "18px" }}>
                      Unit no : <b>{resultcross?.data[0][0].bl_unit_no}</b>
                    </p>
                  </Row>
                  <Row style={{ marginTop: "-15px" }}>
                    <p style={{ fontSize: "18px" }}>
                      Type : <b>{result?.data[0].blood_type}</b> Group :{" "}
                      <b>{result?.data[0].gr}</b>
                    </p>
                  </Row>
                  <Row style={{ marginTop: "-15px" }}>
                    <p style={{ fontSize: "18px" }}>
                      สถานะ : <b>{result?.data[0].bl_status_name}</b>
                    </p>
                  </Row>
                  <Row style={{ marginTop: "-15px" }}>
                    <p style={{ fontSize: "18px" }}>
                      การทำงาน :{" "}
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
      order_num: router?.query?.order_number,
    });
    Modal.success({
      title: "บันทึกสำเร็จ",
    });
    await Data_bloodrequesresult_Form(router?.query?.order_number);
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
        od: router?.query?.order_number,
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
    const result = await api.post(`/Search_bloodNO`, {
      ...formDataCrossmat_form,
    });

    const Result_csm = await api.get("/Data_bloodrequesresult", {
      params: {
        NUM_BT: router?.query?.order_number,
      },
    });
    const resultcross = await api.get("/Crossmatch_API", {
      params: {
        TB: router?.query?.order_number,
        Unit_no_csm: formDataCrossmat_form.Unit_no_csm,
      },
    });
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
            Crossmat_form.setFieldsValue({
              Volume_csm: result.data[0].blood_value,
            });
            document.getElementById("Volume_csm").focus();
          },
        });
        await LoadBlood_Request_cross(router?.query?.order_number);
        await LoadCrossmatch_Type_Data(router?.query?.order_number);
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
  const sendUp_Crossmatch = async () => {
    // ส่ง user_name and password
    const resultLogin = await api.post(`/Confirm_password`, {
      password: passwordSendcrossmatchs,
    });
    const staff_name =
      resultLogin.data.pname +
      " " +
      resultLogin.data.fname +
      " " +
      resultLogin.data.lname;

    try {
      if (resultLogin.data.id_user) {
        const formData = Crossmat_form.getFieldsValue();
        const result = await api.get(`/UP_Crossmatch`, {
          params: {
            ...formData,
            staff: staff_name,
            order_num: router?.query?.order_number,
          },
        });
        Modal.success({
          title: "บันทึกสำเร็จ",
          onOk: (close) => {
            close();
            setshowbloodno_Detiler([]);
            setCountTypeBlood();
            Crossmat_form.resetFields();
            // document.getElementById("Unit_no_csm").focus();
            setgetformDataCrossmat_former("0");
            setPasswordSendcrossmatchs();
            setedit_crossinput(false);
            setonEditcross([]);
          },
        });
        await LoadBlood_Request_cross(router?.query?.order_number);
        await LoadCrossmatch_Type_Data(router?.query?.order_number);
      } else {
        Modal.error({
          title: "Password invalid",
          content: "กรุณากรอกรหัสผ่านให้ถูกต้อง!!",
        });
        setPasswordSendcrossmatchs();
      }
    } catch (error) {
      Modal.error({ title: "Error", content: "!!!!!!!!!!!!!!!!!!!" });
    }
  };
  const Send_saveCross = async () => {
    // ส่ง user_name and password
    const resultLogin = await api.post(`/Confirm_password`, {
      password: passwordSendcrossmatchs,
    });
    const staff_name =
      resultLogin.data.pname +
      " " +
      resultLogin.data.fname +
      " " +
      resultLogin.data.lname;

    const formData = Crossmat_form.getFieldsValue();
    const resultblood = await api.post(`/Search_bloodNO`, {
      ...formData,
    });
    try {
      if (resultLogin.data.id_user) {
        const result = await api.post(`/insert_crossmatch`, {
          ...formData,
          staff: staff_name,
          order_num: router?.query?.order_number,
          id: resultblood?.data[0].id,
          doctor_name: Datafrom_ungroup.doctor_name,
          note: Datafrom_ungroup.note,
          ward: Datafrom_ungroup.ward,
        });
        Modal.success({
          title: "บันทึกสำเร็จ",
          onOk: (close) => {
            close();
            setshowbloodno_Detiler([]);
            setCountTypeBlood();
            Crossmat_form.resetFields();
            confirm_sendgroup_cross.resetFields();
            setgetformDataCrossmat_former("0");
            setPasswordSendcrossmatchs();
          },
        });
        await LoadBlood_Request_cross(router?.query?.order_number);
        await LoadCrossmatch_Type_Data(router?.query?.order_number);
      } else {
        Modal.error({
          title: "Password invalid",
          content: "กรุณากรอกรหัสผ่านให้ถูกต้อง!!",
        });
        setPasswordSendcrossmatchs();
      }
    } catch (error) {
      Modal.error({ title: "Error", content: "!!!!!!!!!!!!!!!!!!!" });
    }
  };

  const SendPatientGrouping = async () => {
    // ส่ง user_name and password
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
          order_num: router?.query?.order_number,
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
        await Data_bloodrequesresult_Form(router?.query?.order_number);

        await Fetch_ConfirmDataPG();
        setPasswordPatientGrouping();
        // window.location.reload();
      } else {
        Modal.error({
          title: "Password invalid",
          content: "กรุณากรอกรหัสผ่านให้ถูกต้อง!!",
        });
        setPasswordPatientGrouping();
      }
    } catch (error) {
      Modal.error({ title: "Error", content: "!!!!!!!!!!!!!!!!!!!" });
    }
  };

  const SendAntibodyScreening = async () => {
    // ส่ง user_name and password
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
          order_num: router?.query?.order_number,
        });

        await Data_bloodrequesresult_Form(router?.query?.order_number);
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
          order_num: router?.query?.order_number,
        });
        await Data_bloodrequesresult_Form(router?.query?.order_number);
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

    try {
      if (resultLogin.data.id_user) {
        const formData_PG = Identification_formAntibody.getFieldsValue();
        // console.log("formData_PGIdentification_formAntibody", formData_PG);
        const resultshowdata = await api.get("/Data_bloodrequesresult", {
          params: {
            NUM_BT: router?.query?.order_number,
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
        // console.log("0000000000000000****", formData_PG2);
        const results = await api.post(`/UP_antigeniden`, {
          ...formData_PG2,
          staff: staff_name,
          hn: resultshowdata?.data[0][0].hn,
        });
        await Data_bloodrequesresult_Form(router?.query?.order_number);
        await AntigenResult_Form(router?.query?.order_number);
        await AntibodyResult_Form(router?.query?.order_number);
        Modal.success({
          title: "บันทึกสำเร็จ",
        });
        setPasswordSendIdentification();
      } else {
        Modal.error({
          title: "Password invalid",
          content: "กรุณากรอกรหัสผ่านให้ถูกต้อง!!",
        });
        setPasswordSendIdentification();
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
              order_num: router?.query?.order_number,
            });
          }
        }
        if (AntibodyScreening.abs_result != "") {
          const formData_PG = AntibodyScreeningForm.getFieldsValue();
          // console.log("SSSSS", formData_PG);
          const result2 = await api.post(`/UP_AntibodyScreening`, {
            ...formData_PG,
            staff: staff_name,
            order_num: router?.query?.order_number,
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
            order_num: router?.query?.order_number,
          });
        }
        if (Antibody.resultATB != "") {
          const formData_PG = Identification_formAntibody.getFieldsValue();
          // console.log("formData_Identification_formAntibody", formData_PG);
          const resultshowdata = await api.get("/Data_bloodrequesresult", {
            params: {
              NUM_BT: router?.query?.order_number,
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
              NUM_BT: router?.query?.order_number,
            },
          });
          const results5 = await api.post(`/UP_antigeniden`, {
            ...formData_Identification_formAntibody,
            staff: staff_name,
            hn: resultshowdata?.data[0][0].hn,
          });
        }
        Modal.success({
          title: "Successful confirmation",
          content: "ยืนยันสำเร็จ",
        });
        await Data_bloodrequesresult_Form(router?.query?.order_number);
        await AntigenResult_Form(router?.query?.order_number);
        await AntibodyResult_Form(router?.query?.order_number);
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
    setIsModalVisible(false);
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
          order_num: router?.query?.order_number,
          staff: staff_name,
        });
        // window.close();
        Modal.success({
          title: "Successful confirmation",
          content: "ยืนยันสำเร็จ",
        });
        Fetch_ConfirmDataPG();
        await showFetch_ConfirmDataPG_detils(router?.query?.order_number);
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
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "5px" }}
            placeholder="Anti_A"
            // style={{ width: 120 }}
          >
            {Choice_Anti_A?.map((item) => (
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
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "5px" }}
            placeholder="Anti_B"
          >
            {Choice_Anti_B?.map((item) => (
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
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "5px" }}
            placeholder="Anti_AB"
          >
            {Choice_Anti_AB?.map((item) => (
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
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "5px" }}
            placeholder="Anti_D"
          >
            {Choice_Anti_D?.map((item) => (
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
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "5px" }}
            placeholder="Anti_A1"
          >
            {Choice_Anti_A1?.map((item) => (
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
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "5px" }}
            placeholder="Anti_H"
          >
            {Choice_Anti_H?.map((item) => (
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
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "5px" }}
            placeholder="A_Cell"
          >
            {Choice_A_Cell?.map((item) => (
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
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "5px" }}
            placeholder="B_Cell"
          >
            {Choice_B_Cell?.map((item) => (
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
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "5px" }}
            placeholder="O_Cell"
          >
            {Choice_O_Cell?.map((item) => (
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
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "5px" }}
            placeholder="Ctl"
          >
            {Choice_Ctl?.map((item) => (
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
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
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
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
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
            width: "50px",
            margin: "-8px",
            marginLeft: "-2px",
          }}
          textAlign="center"
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "5px", textAlign: "center" }}
            placeholder="RT"
          >
            {Choice_RT?.map((item) => (
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
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "5px" }}
            placeholder=" ํC"
          >
            {temperature_room?.map((item) => (
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
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "5px" }}
            placeholder="IAT"
          >
            {Choice_IAT?.map((item) => (
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
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
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
              <Option key={item.rh_shot_name} value={item.rh_shot_name}>
                <b style={{ fontSize: "18px" }}>{item.rh_shot_name}</b>
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
        <Form.Item label="" name="abs_o1_rt" style={{ margin: "-17px" }}>
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            //
            size="small"
            style={{ width: "150px", fontSize: "5px", marginTop: "-200px" }}
            placeholder="RT"
            // style={{ width: 120 }}
          >
            {RT_ABS_O1?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      abs_37c: (
        <Form.Item label="" name="abs_o1_37c" style={{ margin: "-17px" }}>
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            //
            size="small"
            style={{ width: "150px", fontSize: "5px" }}
            placeholder=" ํC"
            // style={{ width: 120 }}
          >
            {temperature_room_ABS_O1?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      abs_iat: (
        <Form.Item label="" name="abs_o1_iat" style={{ margin: "-17px" }}>
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            //
            size="small"
            style={{ width: "150px", fontSize: "5px" }}
            placeholder="IAT"
            // style={{ width: 120 }}
          >
            {IAT_ABS_O1?.map((item) => (
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
        <Form.Item label="" name="abs_o2_rt" style={{ margin: "-17px" }}>
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            //
            size="small"
            style={{ width: "150px", fontSize: "5px", marginTop: "-200px" }}
            placeholder="RT"
            // style={{ width: 120 }}
          >
            {RT_ABS_O2?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      abs_37c: (
        <Form.Item label="" name="abs_o2_37c" style={{ margin: "-17px" }}>
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            //
            size="small"
            style={{ width: "150px", fontSize: "5px" }}
            placeholder=" ํC"
            // style={{ width: 120 }}
          >
            {temperature_room_ABS_O2?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      abs_iat: (
        <Form.Item label="" name="abs_o2_iat" style={{ margin: "-17px" }}>
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            //
            size="small"
            style={{ width: "150px", fontSize: "5px" }}
            placeholder="IAT"
            // style={{ width: 120 }}
          >
            {IAT_ABS_O2?.map((item) => (
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
        <Form.Item label="" name="abs_o3_rt" style={{ margin: "-17px" }}>
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            //
            size="small"
            style={{ width: "150px", fontSize: "5px", marginTop: "-200px" }}
            placeholder="RT"
            // style={{ width: 120 }}
          >
            {RT_ABS_O3?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      abs_37c: (
        <Form.Item label="" name="abs_o3_37c" style={{ margin: "-17px" }}>
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            //
            size="small"
            style={{ width: "150px", fontSize: "5px" }}
            placeholder=" ํC"
            // style={{ width: 120 }}
          >
            {temperature_room_ABS_O3?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      abs_iat: (
        <Form.Item label="" name="abs_o3_iat" style={{ margin: "-17px" }}>
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            //
            size="small"
            style={{ width: "150px", fontSize: "5px" }}
            placeholder="IAT"
            // style={{ width: 120 }}
          >
            {IAT_ABS_O3?.map((item) => (
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
          style={{ marginTop: "-10px", margin: "-8px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            //
            size="small"
            style={{ width: "130px", fontSize: "5px" }}
            placeholder="RT"
            // style={{ width: 120 }}
          >
            {RT_DAT?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      dat_37c: (
        <Form.Item label="" name="dat_37c" style={{ margin: "-17px" }}>
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            //
            size="small"
            style={{ width: "130px", fontSize: "5px", marginTop: "-200px" }}
            placeholder=" ํC"
            // style={{ width: 120 }}
          >
            {temperature_room_DAT?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      dat_iat: (
        <Form.Item label="" name="dat_iat" style={{ margin: "-17px" }}>
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            //
            size="small"
            style={{ width: "130px", fontSize: "5px", marginTop: "-200px" }}
            placeholder="IAT"
            // style={{ width: 120 }}
          >
            {IAT_DAT?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      dat_result: (
        <Form.Item label="" name="dat_result" style={{ margin: "-17px" }}>
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            //
            size="small"
            style={{ width: "130px", fontSize: "5px", marginTop: "-200px" }}
            placeholder="Result"
            // style={{ width: 120 }}
            onChange={onchangeDATAutocontroldat_result}
          >
            {Result_DATshow?.map((item) => (
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
          style={{ marginTop: "-10px", margin: "-8px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            //
            size="small"
            style={{ width: "130px", fontSize: "5px" }}
            placeholder="RT"
            // style={{ width: 120 }}
          >
            {RT_ATC?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      autologous_37c: (
        <Form.Item label="" name="autologous_37c" style={{ margin: "-17px" }}>
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            //
            size="small"
            style={{ width: "130px", fontSize: "5px", marginTop: "-200px" }}
            placeholder=" ํC"
            // style={{ width: 120 }}
          >
            {temperature_room_ATC?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      autologous_iat: (
        <Form.Item label="" name="autologous_iat" style={{ margin: "-17px" }}>
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            //
            size="small"
            style={{ width: "130px", fontSize: "5px", marginTop: "-200px" }}
            placeholder="IAT"
            // style={{ width: 120 }}
          >
            {IAT_ATC?.map((item) => (
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
          style={{ margin: "-17px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            //
            size="small"
            style={{ width: "130px", fontSize: "5px", marginTop: "-200px" }}
            placeholder="Result"
            // style={{ width: 120 }}
            onChange={onchangeDATAutocontrolautologous_result}
          >
            {Result_ATCshow?.map((item) => (
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
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
            }}
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
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
            }}
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      D_IDC: (
        <Form.Item
          label=""
          name="D"
          style={{
            marginTop: "-9px",
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
            }}
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      C_IDC: (
        <Form.Item
          label=""
          name="c1"
          style={{
            marginTop: "-9px",
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
            }}
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      E_IDC: (
        <Form.Item
          label=""
          name="e1"
          style={{
            marginTop: "-9px",
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
            }}
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      c_IDC: (
        <Form.Item
          label=""
          name="c2"
          style={{
            marginTop: "-9px",
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
            }}
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      e_IDC: (
        <Form.Item
          label=""
          name="e2"
          style={{
            marginTop: "-9px",
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
            }}
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      Cw_IDC: (
        <Form.Item
          label=""
          name="cw"
          style={{
            marginTop: "-9px",
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
            }}
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      K_IDC: (
        <Form.Item
          label=""
          name="k1"
          style={{
            marginTop: "-9px",
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
            }}
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      k_IDC: (
        <Form.Item
          label=""
          name="k2"
          style={{
            marginTop: "-9px",
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
            }}
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      Kpa_IDC: (
        <Form.Item
          label=""
          name="kpa"
          style={{
            marginTop: "-9px",
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
            }}
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      Kpb_IDC: (
        <Form.Item
          label=""
          name="kpb"
          style={{
            marginTop: "-9px",
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
            }}
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      Jsa_IDC: (
        <Form.Item
          label=""
          name="jsa"
          style={{
            marginTop: "-9px",
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
            }}
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      Jsb_IDC: (
        <Form.Item
          label=""
          name="jsb"
          style={{
            marginTop: "-9px",
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
            }}
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      Jka_IDC: (
        <Form.Item
          label=""
          name="jka"
          style={{
            marginTop: "-9px",
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
            }}
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      Jkb_IDC: (
        <Form.Item
          label=""
          name="jkb"
          style={{
            marginTop: "-9px",
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
            }}
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      Jk3_IDC: (
        <Form.Item
          label=""
          name="jk3"
          style={{
            marginTop: "-9px",
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
            }}
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      M_IDC: (
        <Form.Item
          label=""
          name="m"
          style={{
            marginTop: "-9px",
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
            }}
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      N_IDC: (
        <Form.Item
          label=""
          name="n"
          style={{
            marginTop: "-9px",
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
            }}
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      S_IDC: (
        <Form.Item
          label=""
          name="s1"
          style={{
            marginTop: "-9px",
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
            }}
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      s_IDC: (
        <Form.Item
          label=""
          name="s2"
          style={{
            marginTop: "-9px",
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
            }}
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      Mia_IDC: (
        <Form.Item
          label=""
          name="mia"
          style={{
            marginTop: "-9px",
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
            }}
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      Lea_IDC: (
        <Form.Item
          label=""
          name="lea"
          style={{
            marginTop: "-9px",
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
            }}
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      Leb_IDC: (
        <Form.Item
          label=""
          name="leb"
          style={{
            marginTop: "-9px",
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
            }}
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      Fya_IDC: (
        <Form.Item
          label=""
          name="fya"
          style={{
            marginTop: "-9px",
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
            }}
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      Fyb_IDC: (
        <Form.Item
          label=""
          name="fyb"
          style={{
            marginTop: "-9px",
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
            }}
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      Fy3_IDC: (
        <Form.Item
          label=""
          name="fy3"
          style={{
            marginTop: "-9px",
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
            }}
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      Dia_IDC: (
        <Form.Item
          label=""
          name="dia"
          style={{
            marginTop: "-9px",
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
            }}
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      Dib_IDC: (
        <Form.Item
          label=""
          name="dib"
          style={{
            marginTop: "-9px",
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
            }}
            onChange={setResultATB}
          />
        </Form.Item>
      ),
      I_IDC: (
        <Form.Item
          label=""
          name="i1"
          style={{
            marginTop: "-9px",
            marginBottom: "-14px",
            // ,marginRight:"-45px"
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
              // center,
              paddingLeft: "10px",
              marginRight: "-9px",
            }}
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
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
              paddingLeft: "10px",
              marginRight: "-9px",
            }}
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
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
              paddingLeft: "10px",
              marginRight: "-10px",
            }}
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
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
              paddingLeft: "10px",
              marginRight: "-13px",
            }}
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
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
              paddingLeft: "10px",
              marginRight: "-10px",
            }}
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
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
              paddingLeft: "10px",
              marginRight: "-10px",
            }}
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
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
              paddingLeft: "55px",
              marginRight: "-10px",
            }}
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
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
              paddingLeft: "15px",
              marginRight: "-10px",
            }}
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
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
              paddingLeft: "15px",
              marginRight: "-10px",
            }}
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
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
              paddingLeft: "15px",
              marginRight: "-10px",
            }}
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
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
              paddingLeft: "15px",
              marginRight: "-10px",
            }}
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
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
              paddingLeft: "35px",
              marginRight: "-10px",
            }}
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
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
              paddingLeft: "15px",
              marginRight: "-10px",
            }}
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
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
              paddingLeft: "15px",
              marginRight: "-10px",
            }}
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
            marginBottom: "-14px",
            marginLeft: "5px",
          }}
          valuePropName="checked"
          align="center"
        >
          <Checkbox
            style={{
              width: "100%",
              paddingLeft: "8px",
              marginRight: "-10px",
            }}
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
          style={{ margin: "-21px", marginLeft: "-20px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{ marginLeft: "5px", marginBottom: "8px" }}
            value={value}
          >
            <Radio value="+" style={{ fontSize: "25px", marginLeft: "8px" }}>
              +
            </Radio>
            <br />{" "}
            <Radio
              value="-"
              style={{
                fontSize: "25px",
                marginTop: "-20px",
                marginLeft: "8px",
              }}
            >
              -
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      H_ATJ: (
        <Form.Item
          label=""
          name="H"
          style={{ margin: "-21px", marginLeft: "-20px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{ marginLeft: "5px", marginBottom: "8px" }}
            value={value}
          >
            <Radio value="+" style={{ fontSize: "25px", marginLeft: "8px" }}>
              +
            </Radio>
            <br />{" "}
            <Radio
              value="-"
              style={{
                fontSize: "25px",
                marginTop: "-20px",
                marginLeft: "8px",
              }}
            >
              -
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      D_ATJ: (
        <Form.Item
          label=""
          name="D"
          style={{ margin: "-21px", marginLeft: "-20px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{ marginLeft: "5px", marginBottom: "8px" }}
            value={value}
          >
            <Radio value="+" style={{ fontSize: "25px", marginLeft: "8px" }}>
              +
            </Radio>
            <br />{" "}
            <Radio
              value="-"
              style={{
                fontSize: "25px",
                marginTop: "-20px",
                marginLeft: "8px",
              }}
            >
              -
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      C_ATJ: (
        <Form.Item
          label=""
          name="c1"
          style={{ margin: "-21px", marginLeft: "-20px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{ marginLeft: "5px", marginBottom: "8px" }}
            value={value}
          >
            <Radio value="+" style={{ fontSize: "25px", marginLeft: "8px" }}>
              +
            </Radio>
            <br />{" "}
            <Radio
              value="-"
              style={{
                fontSize: "25px",
                marginTop: "-20px",
                marginLeft: "8px",
              }}
            >
              -
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      c_ATJ: (
        <Form.Item
          label=""
          name="c2"
          style={{ margin: "-21px", marginLeft: "-20px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{ marginLeft: "5px", marginBottom: "8px" }}
            value={value}
          >
            <Radio value="+" style={{ fontSize: "25px", marginLeft: "8px" }}>
              +
            </Radio>
            <br />{" "}
            <Radio
              value="-"
              style={{
                fontSize: "25px",
                marginTop: "-20px",
                marginLeft: "8px",
              }}
            >
              -
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      E_ATJ: (
        <Form.Item
          label=""
          name="e1"
          style={{ margin: "-21px", marginLeft: "-20px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{ marginLeft: "5px", marginBottom: "8px" }}
            value={value}
          >
            <Radio value="+" style={{ fontSize: "25px", marginLeft: "8px" }}>
              +
            </Radio>
            <br />{" "}
            <Radio
              value="-"
              style={{
                fontSize: "25px",
                marginTop: "-20px",
                marginLeft: "8px",
              }}
            >
              -
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      e_ATJ: (
        <Form.Item
          label=""
          name="e2"
          style={{ margin: "-21px", marginLeft: "-20px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{ marginLeft: "5px", marginBottom: "8px" }}
            value={value}
          >
            <Radio value="+" style={{ fontSize: "25px", marginLeft: "8px" }}>
              +
            </Radio>
            <br />{" "}
            <Radio
              value="-"
              style={{
                fontSize: "25px",
                marginTop: "-20px",
                marginLeft: "8px",
              }}
            >
              -
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      K_ATJ: (
        <Form.Item
          label=""
          name="k1"
          style={{ margin: "-21px", marginLeft: "-20px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{ marginLeft: "5px", marginBottom: "8px" }}
            value={value}
          >
            <Radio value="+" style={{ fontSize: "25px", marginLeft: "8px" }}>
              +
            </Radio>
            <br />{" "}
            <Radio
              value="-"
              style={{
                fontSize: "25px",
                marginTop: "-20px",
                marginLeft: "8px",
              }}
            >
              -
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      k_ATJ: (
        <Form.Item
          label=""
          name="k2"
          style={{ margin: "-21px", marginLeft: "-20px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{ marginLeft: "5px", marginBottom: "8px" }}
            value={value}
          >
            <Radio value="+" style={{ fontSize: "25px", marginLeft: "8px" }}>
              +
            </Radio>
            <br />{" "}
            <Radio
              value="-"
              style={{
                fontSize: "25px",
                marginTop: "-20px",
                marginLeft: "8px",
              }}
            >
              -
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      Dia_ATJ: (
        <Form.Item
          label=""
          name="dia"
          style={{ margin: "-21px", marginLeft: "-20px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{ marginLeft: "5px", marginBottom: "8px" }}
            value={value}
          >
            <Radio value="+" style={{ fontSize: "25px", marginLeft: "8px" }}>
              +
            </Radio>
            <br />{" "}
            <Radio
              value="-"
              style={{
                fontSize: "25px",
                marginTop: "-20px",
                marginLeft: "8px",
              }}
            >
              -
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      Dib_ATJ: (
        <Form.Item
          label=""
          name="dib"
          style={{ margin: "-21px", marginLeft: "-20px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{ marginLeft: "5px", marginBottom: "8px" }}
            value={value}
          >
            <Radio value="+" style={{ fontSize: "25px", marginLeft: "8px" }}>
              +
            </Radio>
            <br />{" "}
            <Radio
              value="-"
              style={{
                fontSize: "25px",
                marginTop: "-20px",
                marginLeft: "8px",
              }}
            >
              -
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      M_ATJ: (
        <Form.Item
          label=""
          name="m"
          style={{ margin: "-21px", marginLeft: "-20px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{ marginLeft: "5px", marginBottom: "8px" }}
            value={value}
          >
            <Radio value="+" style={{ fontSize: "25px", marginLeft: "8px" }}>
              +
            </Radio>
            <br />{" "}
            <Radio
              value="-"
              style={{
                fontSize: "25px",
                marginTop: "-20px",
                marginLeft: "8px",
              }}
            >
              -
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      N_ATJ: (
        <Form.Item
          label=""
          name="n"
          style={{ margin: "-21px", marginLeft: "-20px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{ marginLeft: "5px", marginBottom: "8px" }}
            value={value}
          >
            <Radio value="+" style={{ fontSize: "25px", marginLeft: "8px" }}>
              +
            </Radio>
            <br />{" "}
            <Radio
              value="-"
              style={{
                fontSize: "25px",
                marginTop: "-20px",
                marginLeft: "8px",
              }}
            >
              -
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      S_ATJ: (
        <Form.Item
          label=""
          name="s1"
          style={{ margin: "-21px", marginLeft: "-20px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{ marginLeft: "5px", marginBottom: "8px" }}
            value={value}
          >
            <Radio value="+" style={{ fontSize: "25px", marginLeft: "8px" }}>
              +
            </Radio>
            <br />{" "}
            <Radio
              value="-"
              style={{
                fontSize: "25px",
                marginTop: "-20px",
                marginLeft: "8px",
              }}
            >
              -
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      s_ATJ: (
        <Form.Item
          label=""
          name="s2"
          style={{ margin: "-21px", marginLeft: "-20px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{ marginLeft: "5px", marginBottom: "8px" }}
            value={value}
          >
            <Radio value="+" style={{ fontSize: "25px", marginLeft: "8px" }}>
              +
            </Radio>
            <br />{" "}
            <Radio
              value="-"
              style={{
                fontSize: "25px",
                marginTop: "-20px",
                marginLeft: "8px",
              }}
            >
              -
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      Mia_ATJ: (
        <Form.Item
          label=""
          name="mia"
          style={{ margin: "-21px", marginLeft: "-20px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{ marginLeft: "5px", marginBottom: "8px" }}
            value={value}
          >
            <Radio value="+" style={{ fontSize: "25px", marginLeft: "8px" }}>
              +
            </Radio>
            <br />{" "}
            <Radio
              value="-"
              style={{
                fontSize: "25px",
                marginTop: "-20px",
                marginLeft: "8px",
              }}
            >
              -
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      Lea_ATJ: (
        <Form.Item
          label=""
          name="lea"
          style={{ margin: "-21px", marginLeft: "-20px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{ marginLeft: "5px", marginBottom: "8px" }}
            value={value}
          >
            <Radio value="+" style={{ fontSize: "25px", marginLeft: "8px" }}>
              +
            </Radio>
            <br />{" "}
            <Radio
              value="-"
              style={{
                fontSize: "25px",
                marginTop: "-20px",
                marginLeft: "8px",
              }}
            >
              -
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      Leb_ATJ: (
        <Form.Item
          label=""
          name="leb"
          style={{ margin: "-21px", marginLeft: "-20px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{ marginLeft: "5px", marginBottom: "8px" }}
            value={value}
          >
            <Radio value="+" style={{ fontSize: "25px", marginLeft: "8px" }}>
              +
            </Radio>
            <br />{" "}
            <Radio
              value="-"
              style={{
                fontSize: "25px",
                marginTop: "-20px",
                marginLeft: "8px",
              }}
            >
              -
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      Coa_ATJ: (
        <Form.Item
          label=""
          name="coa"
          style={{ margin: "-21px", marginLeft: "-20px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{ marginLeft: "5px", marginBottom: "8px" }}
            value={value}
          >
            <Radio value="+" style={{ fontSize: "25px", marginLeft: "8px" }}>
              +
            </Radio>
            <br />{" "}
            <Radio
              value="-"
              style={{
                fontSize: "25px",
                marginTop: "-20px",
                marginLeft: "8px",
              }}
            >
              -
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      Cob_ATJ: (
        <Form.Item
          label=""
          name="cob"
          style={{ margin: "-21px", marginLeft: "-20px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{ marginLeft: "5px", marginBottom: "8px" }}
            value={value}
          >
            <Radio value="+" style={{ fontSize: "25px", marginLeft: "8px" }}>
              +
            </Radio>
            <br />{" "}
            <Radio
              value="-"
              style={{
                fontSize: "25px",
                marginTop: "-20px",
                marginLeft: "8px",
              }}
            >
              -
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      Jka_ATJ: (
        <Form.Item
          label=""
          name="jka"
          style={{ margin: "-21px", marginLeft: "-20px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{ marginLeft: "5px", marginBottom: "8px" }}
            value={value}
          >
            <Radio value="+" style={{ fontSize: "25px", marginLeft: "8px" }}>
              +
            </Radio>
            <br />{" "}
            <Radio
              value="-"
              style={{
                fontSize: "25px",
                marginTop: "-20px",
                marginLeft: "8px",
              }}
            >
              -
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      Jkb_ATJ: (
        <Form.Item
          label=""
          name="jkb"
          style={{ margin: "-21px", marginLeft: "-20px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{ marginLeft: "5px", marginBottom: "8px" }}
            value={value}
          >
            <Radio value="+" style={{ fontSize: "25px", marginLeft: "8px" }}>
              +
            </Radio>
            <br />{" "}
            <Radio
              value="-"
              style={{
                fontSize: "25px",
                marginTop: "-20px",
                marginLeft: "8px",
              }}
            >
              -
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      I_ATJ: (
        <Form.Item
          label=""
          name="i1"
          style={{ margin: "-21px", marginLeft: "-20px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{ marginLeft: "5px", marginBottom: "8px" }}
            value={value}
          >
            <Radio value="+" style={{ fontSize: "25px", marginLeft: "8px" }}>
              +
            </Radio>
            <br />{" "}
            <Radio
              value="-"
              style={{
                fontSize: "25px",
                marginTop: "-20px",
                marginLeft: "8px",
              }}
            >
              -
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      i_ATJ: (
        <Form.Item
          label=""
          name="i2"
          style={{ margin: "-21px", marginLeft: "-20px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{ marginLeft: "5px", marginBottom: "8px" }}
            value={value}
          >
            <Radio value="+" style={{ fontSize: "25px", marginLeft: "8px" }}>
              +
            </Radio>
            <br />{" "}
            <Radio
              value="-"
              style={{
                fontSize: "25px",
                marginTop: "-20px",
                marginLeft: "8px",
              }}
            >
              -
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      P1_ATJ: (
        <Form.Item
          label=""
          name="p1"
          style={{ margin: "-21px", marginLeft: "-20px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{ marginLeft: "5px", marginBottom: "8px" }}
            value={value}
          >
            <Radio value="+" style={{ fontSize: "25px", marginLeft: "8px" }}>
              +
            </Radio>
            <br />{" "}
            <Radio
              value="-"
              style={{
                fontSize: "25px",
                marginTop: "-20px",
                marginLeft: "8px",
              }}
            >
              -
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      p_ATJ: (
        <Form.Item
          label=""
          name="p"
          style={{ margin: "-21px", marginLeft: "-20px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{ marginLeft: "5px", marginBottom: "8px" }}
            value={value}
          >
            <Radio value="+" style={{ fontSize: "25px", marginLeft: "8px" }}>
              +
            </Radio>
            <br />{" "}
            <Radio
              value="-"
              style={{
                fontSize: "25px",
                marginTop: "-20px",
                marginLeft: "8px",
              }}
            >
              -
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      Lua_ATJ: (
        <Form.Item
          label=""
          name="lua"
          style={{ margin: "-21px", marginLeft: "-20px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{ marginLeft: "5px", marginBottom: "8px" }}
            value={value}
          >
            <Radio value="+" style={{ fontSize: "25px", marginLeft: "8px" }}>
              +
            </Radio>
            <br />{" "}
            <Radio
              value="-"
              style={{
                fontSize: "25px",
                marginTop: "-20px",
                marginLeft: "8px",
              }}
            >
              -
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      Lub_ATJ: (
        <Form.Item
          label=""
          name="lub"
          style={{ margin: "-21px", marginLeft: "-20px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{ marginLeft: "5px", marginBottom: "8px" }}
            value={value}
          >
            <Radio value="+" style={{ fontSize: "25px", marginLeft: "8px" }}>
              +
            </Radio>
            <br />{" "}
            <Radio
              value="-"
              style={{
                fontSize: "25px",
                marginTop: "-20px",
                marginLeft: "8px",
              }}
            >
              -
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      Fya_ATJ: (
        <Form.Item
          label=""
          name="fya"
          style={{ margin: "-21px", marginLeft: "-20px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{ marginLeft: "5px", marginBottom: "8px" }}
            value={value}
          >
            <Radio value="+" style={{ fontSize: "25px", marginLeft: "8px" }}>
              +
            </Radio>
            <br />{" "}
            <Radio
              value="-"
              style={{
                fontSize: "25px",
                marginTop: "-20px",
                marginLeft: "8px",
              }}
            >
              -
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      Fyb_ATJ: (
        <Form.Item
          label=""
          name="fyb"
          style={{ margin: "-21px", marginLeft: "-20px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{ marginLeft: "5px", marginBottom: "8px" }}
            value={value}
          >
            <Radio value="+" style={{ fontSize: "25px", marginLeft: "8px" }}>
              +
            </Radio>
            <br />{" "}
            <Radio
              value="-"
              style={{
                fontSize: "25px",
                marginTop: "-20px",
                marginLeft: "8px",
              }}
            >
              -
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
      Xga_ATJ: (
        <Form.Item
          label=""
          name="xga"
          style={{ margin: "-21px", marginLeft: "-20px" }}
        >
          <Radio.Group
            onChange={onChange}
            style={{ marginLeft: "5px", marginBottom: "8px" }}
            value={value}
          >
            <Radio value="+" style={{ fontSize: "25px", marginLeft: "8px" }}>
              +
            </Radio>
            <br />{" "}
            <Radio
              value="-"
              style={{
                fontSize: "25px",
                marginTop: "-20px",
                marginLeft: "8px",
              }}
            >
              -
            </Radio>
          </Radio.Group>
        </Form.Item>
      ),
    },
  ];

  const Crossmatching_Result = [
    {
      // Cell Grouping
      key: "1",

      RT_csm: (
        <Form.Item
          label=""
          name="RT_csm"
          style={{ marginTop: "-8px", marginBottom: "-8px", width: "100px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            //
            onChange={detil_next}
            size="small"
            // style={{ width: "130px", fontSize: "5px" }}
            placeholder="RT"
            // style={{ width: 120 }}
          >
            {RT_csm?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      temperature_room_csm: (
        <Form.Item
          label=""
          name="temperature_room_csm"
          style={{ marginTop: "-8px", marginBottom: "-8px", width: "100px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            onChange={detil_next}
            size="small"
            // style={{ width: "130px", fontSize: "5px", marginTop: "-201x" }}
            placeholder=" ํC"
            // style={{ width: 120 }}
          >
            {temperature_room_csm?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      IAT_csm: (
        <Form.Item
          label=""
          name="IAT_csm"
          style={{ marginTop: "-8px", marginBottom: "-8px", width: "100px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            onChange={detil_next}
            size="small"
            // style={{ width: "130px", fontSize: "5px", marginTop: "-10px" }}
            placeholder="IAT"
            // style={{ width: 120 }}
          >
            {IAT_csm?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      Gel_csm: (
        <Form.Item
          label=""
          name="Gel_csm"
          style={{ marginTop: "-8px", marginBottom: "-8px", width: "100px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            onChange={detil_next}
            size="small"
            // style={{ width: "130px", fontSize: "5px", marginTop: "-10px" }}
            placeholder="Gel"
            // style={{ width: 120 }}
          >
            {Gel_csm?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      result_csm: (
        <Form.Item
          label=""
          name="Result_csm"
          style={{ marginTop: "-8px", marginBottom: "-8px", width: "100px" }}
        >
          <Select
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            onChange={detil_next}
            size="small"
            // style={{ width: "130px", fontSize: "5px", marginTop: "-10px" }}
            placeholder="Result"
            // style={{ width: 120 }}
          >
            {Result_csmshow?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
    },
  ];
  // let current_time =  moment().add(543, "year").format("DD-MM-YYYY");
  // console.log("current_time",current_time);
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
              <Form.Item
                label=""
                name="checkbox_CSM_TABLE"
                c
                style={{
                  marginTop: "-9px",
                  marginBottom: "-14px",
                  marginLeft: "0.5px",
                }}
              >
                <Checkbox value="1" defaultValue={1}></Checkbox>
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
      width: "8%",
      // className:"Crossmatchhover"
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: "Confirm",
      dataIndex: "xm_confirm",
      key: "xm_confirm",
      align: "center",
      fixed: "left",
      width: "5%",
      render: (text, record) => (
        <div>
          {text === "Y" ? (
            <p
              style={{
                marginBottom: "-11px",
                marginTop: "-3px",
              }}
            >
              {record.xm_status_name && <FcOk size={"30px"} />}
            </p>
          ) : (
            <p
              style={{
                marginBottom: "-11px",
                marginTop: "-3px",
              }}
            >
              {record.xm_status_name && <FcProcess size={"30px"} />}
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
      width: "3%",
      render: (text, record) => {
        return (
          <div>
            {record.xm_status_name && (
              <Tooltip title="พิมพ์">
                <Button
                  style={{ marginLeft: "-5px", border: "0px" }}
                  // type="primary"
                  // shape="round"
                  type="link"
                  size="small"
                  // icon={<FcPrint style={{ color: "#fff",fontSize:"25px" }} />}
                  // onClick={Sendblooddetil}
                >
                  <FcPrint style={{ fontSize: "25px" }} />
                </Button>
              </Tooltip>
            )}
          </div>
        );
      },
    },
    {
      title: "",
      // dataIndex:"BT2_CSM_TABLE",
      key: "BT2_CSM_TABLE",
      align: "center",
      fixed: "left",
      width: "5%",
      render: (text, record) => {
        return (
          <div>
            {record.xm_status_name && (
              <Tooltip title="แก้ไข">
                <Button
                  style={{ border: "1px solid", marginLeft: "-1px" }}
                  // type="primary"
                  shape="round"
                  size="small"
                  // icon={<SaveFilled style={{ color: "#fff" }} />}
                  // onClick={Sendblooddetil}
                  type="link"
                  // icon={<BsFillGearFill />}
                  onClick={() => onEditcross(record.xm_id)}
                >
                  แก้ไข
                </Button>
              </Tooltip>
            )}
          </div>
        );
      },
    },
    {
      title: "",
      // dataIndex:"BT3_CSM_TABLE",
      key: "BT3_CSM_TABLE",
      align: "center",
      fixed: "left",
      width: "3.4%",
      className: "CrossmatchTable",
      // render: (text, record) => {
      //   return (
      //     <div>
      // //            {record.xm_status_name &&
      // //       <Tooltip title="Test">
      // //         <Button
      // //           style={{ border: "1px solid", marginLeft: "-8px" }}
      // //           type="primary"
      // //           shape="round"
      // //           size="small"
      // //           // icon={<SaveFilled style={{ color: "#fff" }} />}
      // //           // onClick={Sendblooddetil}
      // //         >
      // //           Test
      // //         </Button>
      // //       </Tooltip>
      // // }
      //     </div>
      //   );
      // },
    },
    {
      title: "Unit no.",
      dataIndex: "bl_unit_no",
      key: "bl_unit_no",
      fixed: "left",
      width: "11%",
      align: "center",
      render: (text, record) => <div>{text}</div>,
    },
    {
      title: "EXP",
      dataIndex: "exp",
      key: "exp",
      align: "center",
      width: "9%",
    },

    {
      title: "Segment",
      dataIndex: "xm_segment",
      key: "xm_segment",
      align: "center",
      width: "6%",
    },
    {
      title: "Gr",
      dataIndex: "GR",
      key: "GR",
      align: "center",
      width: "4%",
    },
    {
      title: "ml",
      dataIndex: "xm_vol",
      key: "xm_vol",
      align: "center",
      width: "7%",
    },
    {
      title: "RT",
      dataIndex: "xm_rt",
      key: "xm_rt",
      align: "center",
      width: "7%",
    },
    {
      title: "37 ํC",
      dataIndex: "xm_37c",
      key: "xm_37c",
      align: "center",
      width: "7%",
    },
    {
      title: "IAT",
      dataIndex: "xm_iat",
      key: "xm_iat",
      align: "center",
      width: "7%",
    },
    {
      title: "Gel",
      dataIndex: "xm_gel",
      key: "xm_gel",
      align: "center",
      width: "7%",
    },
    {
      title: "Result",
      dataIndex: "xm_result",
      key: "xm_result",
      align: "center",
      width: "15%",
    },
    {
      title: "Staff XM",
      dataIndex: "xm_staft",
      key: "xm_staft",
      align: "center",
      width: "15%",
    },
    {
      title: "Date XM",
      dataIndex: "xm_date_time",
      key: "xm_date_time",
      align: "center",
      width: "15%",
    },
    {
      title: "หมายเหตุ",
      dataIndex: "xm_note",
      key: "xm_note",
      width: "16%",
    },
  ];

  const blood_request_list = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      fixed: "left",
      width: "10%",
      align: "center",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Blood Type",
      dataIndex: "s_name",
      key: "s_name",
      width: "50%",
    },
    {
      title: "จำนวน",
      dataIndex: "count_unit",
      key: "count_unit",
      width: "15%",
      align: "center",
    },
    {
      title: "XM",
      dataIndex: "num_status1",
      key: "num_status1",
      width: "10%",
      align: "center",
      // render: (text) => {
      //   return (
      //     <div>{text == "3" ? Blood_Request_cross[0].count_status : ""}</div>
      //   );
      // },
    },
    {
      title: "จ่าย",
      dataIndex: "num_status2",
      key: "num_status2",
      width: "10%",
      align: "center",
      // render: (text) => {
      //   return (
      //     <div>{text == "4" ? Blood_Request_cross[0].count_status : ""}</div>
      //   );
      // },
    },
    {
      title: "ปลด",
      dataIndex: "num_status3",
      key: "num_status3",
      width: "10%",
      align: "center",
      // render: (text) => {
      //   return (
      //     <div>{text == "13" ? Blood_Request_cross[0].count_status : ""}</div>
      //   );
      // },
    },
    {
      title: "คืน",
      dataIndex: "num_status4",
      key: "num_status4",
      width: "10%",
      align: "center",
      // render: (text) => {
      //   return (
      //     <div>{text == "8" ? Blood_Request_cross[0].count_status : ""}</div>
      //   );
      // },
    },
    {
      title: "ฝาก",
      dataIndex: "num_status5",
      key: "num_status5",
      width: "10%",
      align: "center",
      // render: (text) => {
      //   return (
      //     <div>{text == "11" ? Blood_Request_cross[0].count_status : ""}</div>
      //   );
      // },
    },
  ];

  return (
    <Spin
      className="Loadstyle"
      // tip="Loading..."
      spinning={spin}
      indicator={antIcon}
      size="large"
      delay={0}
    >
      <div>
        <Row justify="center">
          <Col span={24}>
            <Row justify="center" style={{ display: "flex" }}>
              <Col xs={24} lg={24} xl={24}>
                <Affix offsetTop={top}>
                  <Card
                    title=""
                    className="cadfrom"
                    bordered={false}
                    style={{
                      // height: "100%",
                      marginTop: "2px",
                      borderRadius: "10px",
                      border: "1px solid",

                      boxShadow: "5px 5px 5px grey",
                      backgroundColor: "#ecf5f8",
                    }}
                  >
                    <Row style={{ marginTop: "-23px" }}>
                      <b style={{ fontSize: "17px" }}>ข้อมูลผู้ขอเลือด</b>
                    </Row>
                    <Row style={{ marginBottom: "-31px" }}>
                      <Col xs={19} xl={19} lg={19}>
                        <Row>
                          <Col xs={5} xl={5} lg={5}>
                            <Row>
                              {" "}
                              <p>HN :</p>&nbsp;
                              <b style={{ fontSize: "14px", color: "blue" }}>
                                {Data_BRQ[0]?.hn}
                              </b>
                            </Row>
                          </Col>
                          <Col xs={5} xl={5} lg={5}>
                            <Row>
                              <p>ชื่อ-สกุล :</p>&nbsp;
                              <b style={{ fontSize: "14px", color: "blue" }}>
                                {" "}
                                {Data_BRQ[0]?.patientname}
                              </b>
                            </Row>
                          </Col>
                          <Col xs={6} xl={6} lg={6}>
                            <Row>
                              {" "}
                              <p>อายุ :</p>&nbsp;
                              <b style={{ fontSize: "14px", color: "blue" }}>
                                {" "}
                                {Data_BRQ[0]?.age}
                              </b>
                            </Row>
                          </Col>
                          <Col xs={2} xl={2} lg={2}>
                            <Row>
                              <p>เพศ :</p>&nbsp;
                              <b style={{ fontSize: "14px", color: "blue" }}>
                                {" "}
                                {Data_BRQ[0]?.sex === "1" ? "ชาย" : "หญิง"}
                              </b>
                            </Row>
                          </Col>
                        </Row>
                        <Row style={{ marginTop: "-15px" }}>
                          <Col xs={5} xl={5} lg={5}>
                            <Row>
                              <p>ward:</p>&nbsp;
                              <b style={{ fontSize: "14px", color: "blue" }}>
                                {" "}
                                {Data_BRQ[0]?.wd_name}
                              </b>
                            </Row>
                          </Col>
                          <Col xs={3} xl={3} lg={3}>
                            <Row>
                              <p>Patient Type:</p>&nbsp;
                              <b style={{ fontSize: "14px", color: "blue" }}>
                                {" "}
                                {Data_BRQ[0]?.patient_type}
                              </b>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={5} xl={5} lg={5}>
                        <Row justify="end" style={{ marginTop: "-7px" }}>
                          <p>Group :</p>&nbsp;&nbsp;
                          {Data_BRQ[0]?.bloodgrp === "A" ? (
                            <b
                              style={{
                                fontSize: "45px",
                                marginTop: "-17.5px",
                                backgroundColor: "#ffff00",
                                border: "1px solid",
                              }}
                            >
                              &nbsp; {Data_BRQ[0]?.ABO} &nbsp;
                            </b>
                          ) : (
                            ""
                          )}
                          {Data_BRQ[0]?.bloodgrp === "B" ? (
                            <b
                              style={{
                                fontSize: "45px",
                                marginTop: "-17.5px",
                                backgroundColor: "#ffb6c1",
                                border: "1px solid",
                              }}
                            >
                              &nbsp; {Data_BRQ[0]?.ABO} &nbsp;
                            </b>
                          ) : (
                            ""
                          )}
                          {Data_BRQ[0]?.bloodgrp === "AB" ? (
                            <b
                              style={{
                                fontSize: "45px",
                                marginTop: "-17.5px",
                                backgroundColor: "#ffffff",
                                border: "1px solid",
                              }}
                            >
                              &nbsp; {Data_BRQ[0]?.ABO} &nbsp;
                            </b>
                          ) : (
                            ""
                          )}
                          {Data_BRQ[0]?.bloodgrp === "O" ? (
                            <b
                              style={{
                                fontSize: "45px",
                                marginTop: "-17.5px",
                                backgroundColor: "#4dadff",
                                border: "1px solid",
                              }}
                            >
                              &nbsp; {Data_BRQ[0]?.ABO} &nbsp;
                            </b>
                          ) : (
                            ""
                          )}
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                </Affix>
              </Col>
            </Row>
            <Row justify="center" style={{ display: "flex" }}>
              <Col xs={24} lg={24} xl={24}>
                <br />
                {/*ส่วน 2  ข้อมูลใบขอเลือด */}
                <Row style={{ marginTop: "-8px" }}>
                  <Col xs={24} xl={19}>
                    <Card
                      title=""
                      // className="cadfrom"
                      bordered={false}
                      style={{
                        height: "260px",
                        marginTop: "-10px",
                        borderRadius: "-10px",
                        border: "1px solid",

                        boxShadow: "5px 5px 5px grey",
                        backgroundColor: "#a1cae2",
                      }}
                    >
                      <div className="card-container">
                        <Tabs
                          defaultActiveKey="1"
                          // onChange={onChangetab}
                          type="card"
                          //   className="DataHisTap"
                          style={{
                            marginTop: "-21px",
                            marginLeft: "-23px",
                            marginRight: "-24px",
                          }}
                        >
                          <TabPane tab="ข้อมูลใบขอเลือด" key="3">
                            <Row style={{ marginTop: "5px" }}>
                              <Col style={{ marginLeft: "15px" }} span={24}>
                                <Row>
                                  <Col xs={6} xl={6} lg={6}>
                                    <b>โรงพยาบาล:</b>
                                    <b
                                      style={{
                                        fontSize: "14px",
                                        color: "blue",
                                      }}
                                    >
                                      {" "}
                                      {Data_BRQ[0]?.hos_long_name_th}
                                    </b>
                                  </Col>
                                  <Col xs={4} xl={4} lg={4}>
                                    <b>วันที่รับใบขอ:</b>
                                    <b
                                      style={{
                                        fontSize: "14px",
                                        color: "blue",
                                      }}
                                    >
                                      {" "}
                                      {Data_BRQ[0]?.req_date}
                                    </b>
                                  </Col>
                                  <Col xs={3} xl={3} lg={3}>
                                    <b>เวลา:</b>
                                    <b
                                      style={{
                                        fontSize: "14px",
                                        color: "blue",
                                      }}
                                    >
                                      {" "}
                                      {Data_BRQ[0]?.req_time}
                                    </b>
                                  </Col>
                                  <Col xs={6} xl={6} lg={6}>
                                    <b>แพทย์ผู้สั่ง:</b>
                                    <b
                                      style={{
                                        fontSize: "14px",
                                        color: "blue",
                                      }}
                                    >
                                      {" "}
                                      {Data_BRQ[0]?.doctor_name}
                                    </b>
                                  </Col>
                                  <Col xs={3} xl={3} lg={3}>
                                    <b>Patient Type:</b>
                                    <b
                                      style={{
                                        fontSize: "14px",
                                        color: "blue",
                                      }}
                                    >
                                      {" "}
                                      {Data_BRQ[0]?.patient_type}
                                    </b>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col xs={6} xl={6} lg={6}>
                                    <Row>
                                      <b>เลขที่ใบขอ:</b>&nbsp;
                                      <b
                                        style={{
                                          fontSize: "14px",
                                          color: "blue",
                                        }}
                                      >
                                        {" "}
                                        {Data_BRQ[0]?.order_number}
                                      </b>
                                    </Row>
                                  </Col>
                                  <Col
                                    xs={4}
                                    xl={4}
                                    lg={4}
                                    // style={{ marginLeft: "26px" }}
                                  >
                                    <b>วันที่ใช้โลหิต:</b>
                                    <b
                                      style={{
                                        fontSize: "14px",
                                        color: "blue",
                                      }}
                                    >
                                      {" "}
                                      {Data_BRQ[0]?.req_usedate}
                                    </b>
                                  </Col>
                                  <Col xs={3} xl={3} lg={3}>
                                    <b>เวลา:</b>
                                    <b
                                      style={{
                                        fontSize: "14px",
                                        color: "blue",
                                      }}
                                    >
                                      {" "}
                                      {Data_BRQ[0]?.req_usetime}
                                    </b>
                                  </Col>
                                  <Col xs={6} xl={6} lg={6}>
                                    <b>แผนก:</b>
                                    <b
                                      style={{
                                        fontSize: "14px",
                                        color: "blue",
                                      }}
                                    >
                                      {" "}
                                      {Data_BRQ[0]?.depaetment}
                                    </b>
                                  </Col>
                                  <Col xs={5} xl={5} lg={5}>
                                    <Row>
                                      <b>ward:</b>&nbsp;
                                      <b
                                        style={{
                                          fontSize: "14px",
                                          color: "blue",
                                        }}
                                      >
                                        {" "}
                                        {Data_BRQ[0]?.wd_name}
                                      </b>
                                    </Row>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col xs={6} xl={6} lg={6}>
                                    <b>HIS no:</b>
                                    <b
                                      style={{
                                        fontSize: "14px",
                                        color: "blue",
                                      }}
                                    >
                                      {" "}
                                      {Data_BRQ[0]?.his_ln}
                                    </b>
                                  </Col>
                                  <Col xs={7} xl={7} lg={7}>
                                    <b>วันที่เจาะ:</b>
                                    <b
                                      style={{
                                        fontSize: "14px",
                                        color: "blue",
                                      }}
                                    >
                                      {" "}
                                      {Data_BRQ[0]?.punct_date}
                                    </b>
                                  </Col>
                                  <Col xs={5} xl={5} lg={5}>
                                    <b>ผู้เจาะ:</b>
                                    <b
                                      style={{
                                        fontSize: "14px",
                                        color: "blue",
                                      }}
                                    >
                                      {" "}
                                      {Data_BRQ[0]?.Doc}
                                    </b>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col xs={6} xl={6} lg={6}>
                                    <b>AN:</b>
                                    <b
                                      style={{
                                        fontSize: "14px",
                                        color: "blue",
                                      }}
                                    >
                                      {" "}
                                      {Data_BRQ[0]?.his_an}
                                    </b>
                                  </Col>

                                  <Col xs={7} xl={7} lg={7}>
                                    <b>ความต้องการ:</b>
                                    <b
                                      style={{
                                        fontSize: "14px",
                                        color: "blue",
                                      }}
                                    >
                                      {" "}
                                      {Data_BRQ[0]?.priority_name}
                                    </b>
                                  </Col>
                                  <Col xs={8} xl={8} lg={8}>
                                    <b>ความต้องการเร่งด่วน:</b>
                                    <b
                                      style={{
                                        fontSize: "14px",
                                        color: "red",
                                      }}
                                    >
                                      {" "}
                                      {Data_BRQ[0]?.priority_trans_emergency}
                                    </b>
                                  </Col>
                                </Row>

                                <Row>
                                  <Col xs={6} xl={6} lg={6}>
                                    <Row>
                                      {" "}
                                      <b>VN:</b>
                                      <b
                                        style={{
                                          fontSize: "14px",
                                          color: "blue",
                                        }}
                                      >
                                        {" "}
                                        {Data_BRQ[0]?.his_vn}
                                      </b>
                                    </Row>
                                    <Row>
                                      {" "}
                                      <b>Hb:</b>
                                      <b
                                        style={{
                                          fontSize: "14px",
                                          color: "blue",
                                        }}
                                      >
                                        {" "}
                                        {Data_BRQ[0]?.lab_hgb}
                                      </b>{" "}
                                    </Row>
                                    <Row>
                                      <b>Hct:</b>
                                      <b
                                        style={{
                                          fontSize: "14px",
                                          color: "blue",
                                        }}
                                      >
                                        {" "}
                                        {Data_BRQ[0]?.lab_hct}
                                      </b>
                                    </Row>
                                    <Row>
                                      <b>PLT:</b>
                                      <b
                                        style={{
                                          fontSize: "14px",
                                          color: "blue",
                                        }}
                                      >
                                        {" "}
                                        {Data_BRQ[0]?.lab_plt}
                                      </b>
                                    </Row>
                                  </Col>
                                  <Col xs={7} xl={7} lg={7}>
                                    <Row>
                                      {" "}
                                      <b>Diag:</b>
                                      <b
                                        style={{
                                          fontSize: "14px",
                                          color: "blue",
                                        }}
                                      >
                                        {" "}
                                        {Data_BRQ[0]?.diag_name}
                                      </b>
                                    </Row>

                                    <Row>
                                      <b>Note:</b>
                                      <b
                                        style={{
                                          fontSize: "14px",
                                          color: "blue",
                                        }}
                                      >
                                        {Data_BRQ[0]?.note}
                                      </b>
                                    </Row>
                                  </Col>
                                  <Col xs={8} xl={8} lg={8}>
                                    <Row>
                                      {" "}
                                      <b>อื่นๆ:</b>
                                      <b
                                        style={{
                                          fontSize: "14px",
                                          color: "blue",
                                        }}
                                      >
                                        {" "}
                                        {Data_BRQ[0]?.diag_more}
                                      </b>
                                    </Row>
                                    <Row></Row>

                                    <Row></Row>
                                  </Col>
                                </Row>

                                <Row>
                                  <Col span={19}>
                                    <Row>
                                      <Form form={frmblood_request}>
                                        <Form.Item
                                          label="BB Code"
                                          name="bb_code"
                                          style={{
                                            marginTop: "-5px",
                                            marginLeft: "-2px",
                                            fontWeighteight: "bold",
                                          }}
                                        >
                                          <Input
                                            style={{
                                              width: "100px",
                                              // fontSize: "35px",
                                              // height: "40px",
                                            }}
                                            id="bb_code"
                                            onPressEnter={send_bbcode}
                                          />
                                        </Form.Item>
                                      </Form>
                                      &nbsp;
                                      <Tooltip title="บันทึก">
                                        <Button
                                          style={{
                                            border: "1px solid",
                                            marginTop: "-5px",
                                          }}
                                          type="primary"
                                          // shape="round"
                                          icon={
                                            <SaveFilled
                                              style={{ color: "#fff" }}
                                            />
                                          }
                                          onClick={send_bbcode}
                                        >
                                          บันทึก
                                        </Button>
                                      </Tooltip>
                                    </Row>
                                  </Col>
                                  <Col span={5}>
                                    <Row style={{ marginTop: "-45px" }}>
                                      <b
                                        style={{
                                          marginTop: "-15px",
                                          marginLeft: "20px",
                                        }}
                                      >
                                        ประวัติการเจาะเลือดปลายนิ้ว :
                                      </b>{" "}
                                      &nbsp;&nbsp;
                                      {Data_BRQ[0]?.finger === "" ||
                                      Data_BRQ[0]?.finger === null ? (
                                        ""
                                      ) : (
                                        <b
                                          style={{
                                            fontSize: "45px",
                                            marginTop: "-17.5px",
                                            marginLeft: "40px",
                                            // backgroundColor: "#ffff00",
                                            border: "1px solid",
                                          }}
                                        >
                                          &nbsp; {Data_BRQ[0]?.finger} &nbsp;
                                        </b>
                                      )}
                                    </Row>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </TabPane>
                          <TabPane tab="ประวัติการขอเลือด" key="4">
                            <Row style={{ marginTop: "15px" }}>
                              <Col span={10} offset={1}>
                                <Row>
                                  <b>ขอเลือดล่าสุด:</b>
                                  <b
                                    style={{
                                      fontSize: "14px",
                                      color: "blue",
                                    }}
                                  >
                                    {" "}
                                    {ReQdate[0]?.request_datetime_format}
                                  </b>
                                </Row>
                                <Row>
                                  <b>รับเลือดล่าสุด:</b>
                                  <b
                                    style={{
                                      fontSize: "14px",
                                      color: "blue",
                                    }}
                                  >
                                    {" "}
                                    {ReCdate[0]?.receive_datetime_format}
                                  </b>
                                </Row>
                              </Col>
                              <Col span={5}></Col>
                            </Row>
                            <Row>
                              <Form.Item
                                name=""
                                label="Patient Note"
                                style={{
                                  width: "100%",
                                  marginTop: "-10px",
                                  paddingLeft: "40px",
                                }}
                              >
                                <Table
                                  pagination={false}
                                  dataSource={Data_Tab}
                                  style={{ width: "80%" }}
                                  columns={columnNote}
                                  scroll={{ y: 90 }}
                                  size="small"
                                  className="hisreques"
                                ></Table>
                              </Form.Item>
                            </Row>
                          </TabPane>
                          <TabPane tab="ประวัติ Patient Grouping" key="5">
                            <Row>
                              <Col span={24}>
                                <Tabs
                                  tabPosition="left"
                                  size="small"
                                  style={{ marginTop: "8px" }}
                                  className="hispatGrouping"
                                >
                                  <TabPane
                                    tab="Grouping"
                                    key="1"
                                    style={{ marginLeft: "-23px" }}
                                  >
                                    <Table
                                      style={{
                                        marginTop: "15px",
                                        marginRight: "-25px",
                                        marginBottom: "-100px",
                                      }}
                                      dataSource={PtGrouping}
                                      bordered
                                      className="hisGrouping"
                                      // rowClassName={() => "ant-table-thead1"}
                                      //dataSource={Data_Tab}
                                      pagination={false}
                                      size="small"
                                      scroll={{ x: 1300, y: 124 }}
                                      // height="600px"
                                      width="100%"
                                    >
                                      <Column
                                        title="เลขที่ใบขอ"
                                        dataIndex="order_number"
                                        key="order_number"
                                        align="center"
                                        width="70px"
                                        fixed="left"
                                        className="hisGrouping"
                                      />
                                      <ColumnGroup title="Cell Grouping">
                                        <Column
                                          title="Anti-A"
                                          dataIndex="anti_a"
                                          key="anti_a"
                                          align="center"
                                          width="70px"
                                        />
                                        <Column
                                          title="Anti-B"
                                          dataIndex="anti_b"
                                          key="anti_b"
                                          align="center"
                                          width="70px"
                                        />
                                        <Column
                                          title="Anti-AB"
                                          dataIndex="anti_ab"
                                          key="anti_ab"
                                          align="center"
                                          width="70px"
                                        />
                                        <Column
                                          title="Anti-D"
                                          dataIndex="anti_d"
                                          key="anti_d"
                                          align="center"
                                          width="70px"
                                        />

                                        <Column
                                          title="Anti-A1"
                                          dataIndex="anti_a1"
                                          key="anti_a1"
                                          align="center"
                                          width="70px"
                                        />
                                        <Column
                                          title="Anti-H"
                                          dataIndex="anti_h"
                                          key="anti_h"
                                          align="center"
                                          width="70px"
                                        />
                                      </ColumnGroup>

                                      <ColumnGroup title="Serum Grouping">
                                        <Column
                                          align="center"
                                          width="70px"
                                          title="A-Cell"
                                          dataIndex="cell_a"
                                          key="cell_a"
                                        />
                                        <Column
                                          align="center"
                                          width="70px"
                                          title="B-Cell"
                                          dataIndex="cell_b"
                                          key="cell_b"
                                        />
                                        <Column
                                          align="center"
                                          width="70px"
                                          title="O-Cell"
                                          dataIndex="cell_o"
                                          key="cell_o"
                                        />
                                        <Column
                                          align="center"
                                          width="70px"
                                          title="Ctrl"
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
                                          width="70px"
                                        />
                                        <Column
                                          title="Subgroup"
                                          dataIndex="blood_sub_gr"
                                          key="blood_sub_gr"
                                          align="center"
                                          width="70px"
                                        />
                                      </ColumnGroup>

                                      <ColumnGroup title="Rh (D) Typing">
                                        <Column
                                          title="RT"
                                          dataIndex="rhd_rt"
                                          key="rhd_rt"
                                          align="center"
                                          width="70px"
                                        />
                                        <Column
                                          title="37 ํC"
                                          dataIndex="rhd_37c"
                                          key="rhd_37c"
                                          align="center"
                                          width="70px"
                                        />
                                        <Column
                                          title="IAT"
                                          dataIndex="rhd_iat"
                                          key="rhd_iat"
                                          align="center"
                                          width="70px"
                                        />
                                      </ColumnGroup>

                                      <Column
                                        title="Rh"
                                        dataIndex="blood_rh"
                                        key="blood_rh"
                                        align="center"
                                        width="70px"
                                      />
                                      <Column
                                        title="ผู้บันทึก"
                                        dataIndex="grouping_staff"
                                        key="grouping_staff"
                                        align="center"
                                        width="200px"
                                      />

                                      <Column
                                        title="วันที่บันทึก"
                                        dataIndex="date_pg"
                                        key="date_pg"
                                        align="center"
                                        width="155px"
                                      />

                                      <Column
                                        title="Note"
                                        dataIndex="request_note"
                                        key="request_note"
                                        align="center"
                                        width="70px"
                                      />
                                    </Table>
                                  </TabPane>

                                  <TabPane
                                    tab="Antibody Screening"
                                    key="2"
                                    style={{ marginLeft: "-23px" }}
                                  >
                                    <Table
                                      pagination={false}
                                      className="hisabs"
                                      bordered
                                      dataSource={PtAntibody}
                                      scroll={{ y: 124, x: 850 }}
                                      // style={{ width: "100%", color: "red" }}
                                      style={{
                                        marginTop: "15px",
                                        marginRight: "-25px",
                                        marginBottom: "-100px",
                                        width: "100%",
                                        color: "red",
                                      }}
                                      size="small"
                                    >
                                      <Column
                                        title="เลขที่ใบขอ"
                                        dataIndex="order_number"
                                        key="order_number"
                                        align="center"
                                        width="70px"
                                        fixed="left"
                                        className="antthead"
                                      />
                                      <ColumnGroup title="O1">
                                        <Column
                                          title="RT"
                                          dataIndex="abs_o1_rt"
                                          key="abs_o1_rt"
                                          align="center"
                                          width="70px"
                                        />
                                        <Column
                                          title="37 ํC"
                                          dataIndex="abs_o1_37c"
                                          key="abs_o1_37c"
                                          align="center"
                                          width="70px"
                                        />
                                        <Column
                                          title="IAT"
                                          dataIndex="abs_o1_iat"
                                          key="abs_o1_iat"
                                          align="center"
                                          width="70px"
                                        />
                                      </ColumnGroup>
                                      <ColumnGroup title="O2">
                                        <Column
                                          title="RT"
                                          dataIndex="abs_o2_rt"
                                          key="abs_o2_rt"
                                          align="center"
                                          width="70px"
                                        />
                                        <Column
                                          title="37 ํC"
                                          dataIndex="abs_o2_37c"
                                          key="abs_o2_37c"
                                          align="center"
                                          width="70px"
                                        />
                                        <Column
                                          title="IAT"
                                          dataIndex="abs_o2_iat"
                                          key="abs_o2_iat"
                                          align="center"
                                          width="70px"
                                        />
                                      </ColumnGroup>
                                      <Column
                                        title="Result"
                                        dataIndex="abs_result"
                                        key="abs_result"
                                        align="center"
                                        width="70px"
                                      />
                                      <Column
                                        title="ผู้บันทึก"
                                        dataIndex="abs_staff"
                                        key="abs_staff"
                                        align="center"
                                        width="160px"
                                      />
                                      <Column
                                        title="วันที่บันทึก"
                                        dataIndex="abs_date_time_format"
                                        key="abs_date_time_format"
                                        align="center"
                                        width="160px"
                                      />
                                    </Table>
                                  </TabPane>

                                  <TabPane
                                    tab="DAT and Autocontrol"
                                    key="3"
                                    style={{ marginLeft: "-23px" }}
                                  >
                                    <Table
                                      className="hisdat"
                                      bordered
                                      dataSource={PtDat}
                                      // columns={columnDAT}
                                      pagination={false}
                                      scroll={{ y: 124, x: 1150 }}
                                      style={{
                                        width: "100%",
                                        marginTop: "15px",
                                        marginRight: "-25px",
                                        marginBottom: "-100px",
                                      }}
                                      size="small"
                                    >
                                      <Column
                                        title="เลขที่ใบขอ"
                                        dataIndex="order_number"
                                        key="order_number"
                                        align="center"
                                        width="70px"
                                        fixed="left"
                                        className="antthead"
                                      />
                                      <ColumnGroup title="DAT">
                                        <Column
                                          title="RT"
                                          dataIndex="dat_rt"
                                          key="dat_rt"
                                          align="center"
                                          width="70px"
                                        />
                                        <Column
                                          title="37 ํC"
                                          dataIndex="dat_37c"
                                          key="dat_37c"
                                          align="center"
                                          width="70px"
                                        />
                                        <Column
                                          title="IAT"
                                          dataIndex="dat_iat"
                                          key="dat_iat"
                                          align="center"
                                          width="70px"
                                        />
                                        <Column
                                          title="Result"
                                          dataIndex="dat_result"
                                          key="dat_result"
                                          align="center"
                                          width="70px"
                                        />
                                        <Column
                                          title="ผู้บันทึก"
                                          dataIndex="dat_staff"
                                          key="dat_staff"
                                          align="center"
                                          width="170px"
                                        />
                                        <Column
                                          title="วันที่บันทึก"
                                          dataIndex="dat_datetime_format"
                                          key="dat_datetime"
                                          align="center"
                                          width="170px"
                                        />
                                      </ColumnGroup>

                                      <ColumnGroup title="Autocontrol">
                                        <Column
                                          title="RT"
                                          dataIndex="autologous_rt"
                                          key="autologous_rt"
                                          align="center"
                                          width="70px"
                                        />
                                        <Column
                                          title="37 ํC"
                                          dataIndex="autologous_37c"
                                          key="autologous_37c"
                                          align="center"
                                          width="70px"
                                        />
                                        <Column
                                          title="IAT"
                                          dataIndex="autologous_iat"
                                          key="autologous_iat"
                                          align="center"
                                          width="70px"
                                        />
                                        <Column
                                          title="Result"
                                          dataIndex="autologous_result"
                                          key="autologous_result"
                                          align="center"
                                          width="70px"
                                        />
                                        <Column
                                          title="ผู้บันทึก"
                                          dataIndex="autologous_staff"
                                          key="autologous_staff"
                                          align="center"
                                          width="170px"
                                        />
                                        <Column
                                          title="วันที่บันทึก"
                                          dataIndex="autologous_datetime_format"
                                          key="autologous_datetime"
                                          align="center"
                                          width="170px"
                                        />
                                      </ColumnGroup>

                                      <Column
                                        title="Note"
                                        dataIndex="Note"
                                        key="Note"
                                        align="center"
                                        width="70px"
                                      />
                                    </Table>
                                  </TabPane>
                                </Tabs>
                              </Col>
                            </Row>
                          </TabPane>
                          <TabPane tab="ประวัติการรับเลือด" key="6">
                            <Table
                              className="hisgetblood"
                              dataSource={receive}
                              columns={columnReceived}
                              size="small"
                              pagination={false}
                              scroll={{ y: 165, x: 750 }}
                              style={{ width: "100%", marginTop: "5px" }}
                            />
                          </TabPane>

                          <TabPane tab="ประวัติการเเพ้เลือด" key="7">
                            <Table
                              className="hisloseblood"
                              dataSource={react}
                              columns={columnEffect}
                              pagination={false}
                              scroll={{ y: 165, x: 850 }}
                              style={{ width: "100%", marginTop: "5px" }}
                              size="small"
                            />
                          </TabPane>
                        </Tabs>
                      </div>
                    </Card>
                  </Col>
                  <Col xs={24} xl={5}>
                    <Card
                      bordered={false}
                      className="cadfrom"
                      style={{
                        // marginTop: "8px",

                        // padding: "3px",
                        borderRadius: "10px",
                        border: "1px solid",
                        marginLeft: "10px",
                        boxShadow: "5px 5px 5px grey",
                        backgroundColor: "#ecf5f8",
                        height: "260px",
                        // marginTop: "-14px",
                      }}
                    >
                      <Row style={{ marginTop: "-20px" }}>
                        <b
                          style={{
                            color: "black",
                            fontSize: "24px",
                          }}
                        >
                          Blood Request
                        </b>
                        <br />
                        <Table
                          columns={columns_Blod_Request}
                          dataSource={Blood_Request}
                          bordered
                          className="columns_Blod_Request1"
                          size="small"
                          style={{ width: "100%" }}
                          pagination={false}
                          scroll={{ y: 111 }}
                        />
                      </Row>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
            <br />
            <Form form={PatientGroupingForm} onFinish={SendPatientGrouping}>
              <Card
                className="cadfrom"
                bordered={false}
                style={{
                  // height: "100%",
                  marginTop: "-12px",
                  borderRadius: "10px",
                  border: "1px solid",

                  boxShadow: "5px 5px 5px grey",
                  backgroundColor: "#ecf5f8",
                }}
              >
                <Row
                  justify="start"
                  style={{ marginTop: "-20px", marginLeft: "-20px" }}
                >
                  <Col span={24} offset={0}>
                    <b style={{ fontSize: "20px" }}>Patient Grouping</b>
                  </Col>
                </Row>
                <br />
                <Row
                  style={{
                    margin: "-20px",
                  }}
                >
                  <Col span={24}>
                    <Table
                      dataSource={Patient_Grouping}
                      pagination={false}
                      bordered
                      size="small"
                      width="100%"
                      className="NOHOVERPatient_Grouping"
                    >
                      <ColumnGroup title="Cell Grouping">
                        <Column
                          title="Anti-A"
                          dataIndex="anti_a"
                          key="anti_a"
                          align="center"
                          width="70px"
                        />
                        <Column
                          title="Anti-B"
                          dataIndex="anti_b"
                          key="anti_b"
                          align="center"
                          width="70px"
                        />
                        <Column
                          title="Anti-AB"
                          dataIndex="anti_ab"
                          key="anti_ab"
                          align="center"
                          width="70px"
                        />
                        <Column
                          title="Anti-D"
                          dataIndex="anti_d"
                          key="anti_d"
                          align="center"
                          width="70px"
                        />

                        <Column
                          title="Anti-A1"
                          dataIndex="anti_a1"
                          key="anti_a1"
                          align="center"
                          width="70px"
                        />
                        <Column
                          title="Anti-H"
                          dataIndex="anti_h"
                          key="anti_h"
                          align="center"
                          width="70px"
                        />
                      </ColumnGroup>

                      <ColumnGroup title="Serum Grouping">
                        <Column
                          align="center"
                          width="70px"
                          title="A-Cell"
                          dataIndex="cell_a"
                          key="cell_a"
                        />
                        <Column
                          align="center"
                          width="70px"
                          title="B-Cell"
                          dataIndex="cell_b"
                          key="cell_b"
                        />
                        <Column
                          align="center"
                          width="70px"
                          title="O-Cell"
                          dataIndex="cell_o"
                          key="cell_o"
                        />
                        <Column
                          align="center"
                          width="70px"
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
                          width="70px"
                        />
                        <Column
                          title="Subgroup"
                          dataIndex="blood_sub_gr"
                          key="blood_sub_gr"
                          align="center"
                          width="70px"
                        />
                      </ColumnGroup>
                      <ColumnGroup title="Rh (D) Typing">
                        <Column
                          title="RT"
                          dataIndex="rhd_rt"
                          key="rhd_rt"
                          align="center"
                          width="70px"
                        />
                        <Column
                          title="37 ํC"
                          dataIndex="rhd_37c"
                          key="rhd_37c"
                          align="center"
                          width="70px"
                        />
                        <Column
                          title="IAT"
                          dataIndex="rhd_iat"
                          key="rhd_iat"
                          align="center"
                          width="70px"
                        />
                      </ColumnGroup>

                      <Column
                        title="Rh"
                        dataIndex="blood_rh"
                        key="blood_rh"
                        align="center"
                        width="70px"
                      />
                    </Table>
                  </Col>
                </Row>
                <br />

                <Row style={{ marginTop: "10px", marginBottom: "-60px" }}>
                  <Col>
                    <Row>
                      <Form.Item label="หมายเหตุ" name="note_Grouping">
                        <TextArea
                          rows={1}
                          placeholder="ระบุหมายเหตุ"
                          style={{ width: "250px" }}
                        />
                      </Form.Item>
                      <b style={{ marginLeft: "5px" }}>
                        &nbsp;&nbsp; บันทึกล่าสุด{" "}
                        <span style={{ color: "blue" }}>
                          {" "}
                          {Datap_g[0]?.grouping_staff}&nbsp;&nbsp;
                          {Datap_g[0]?.pg_savedate}&nbsp;
                          {Datap_g[0]?.pg_savetime}{" "}
                        </span>
                      </b>
                      &nbsp;&nbsp;
                    </Row>
                  </Col>

                  <Col offset={7}>
                    <Row justify="end">
                      <Form.Item
                        label="Pass"
                        name="passwordPatientGrouping"
                        // style={{ marginLeft: "580px" }}
                      >
                        {" "}
                        {/* <Input style={{ width: "90px" }} /> */}
                        <Input.Password
                          placeholder="กรุณากรอกรหัสผ่าน"
                          iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
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
                <br />
              </Card>
            </Form>
            <br /> <br />
            <Row
              style={{
                // height: "100%",
                marginTop: "-15px",
              }}
            >
              <Col span={12}>
                <Form
                  form={AntibodyScreeningForm}
                  onFinish={SendAntibodyScreening}
                >
                  <Card
                    className="cadfrom"
                    bordered={false}
                    style={{
                      // height: "100%",
                      marginTop: "-18px",
                      borderRadius: "10px",
                      border: "1px solid",

                      boxShadow: "5px 5px 5px grey",
                      backgroundColor: "#ecf5f8",
                    }}
                  >
                    <Row
                      justify="start"
                      style={{ marginTop: "-20px", marginLeft: "-20px" }}
                    >
                      <Col span={24} offset={0}>
                        <b style={{ fontSize: "20px" }}>Antibody Screening</b>
                      </Col>
                    </Row>
                    <Row style={{ marginLeft: "-20px" }}>
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
                              width={"30px"}
                            />
                            <Column
                              title="RT"
                              dataIndex="abs_rt"
                              key="abs_rt"
                              align="center"
                              width={"80px"}
                            />
                            <Column
                              title="37 ํC"
                              dataIndex="abs_37c"
                              key="abs_37c"
                              align="center"
                              width={"80px"}
                            />
                            <Column
                              title="IAT"
                              dataIndex="abs_iat"
                              key="abs_iat"
                              align="center"
                              width={"80px"}
                            />
                          </ColumnGroup>
                        </Table>
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Form.Item
                        label="Antibody Screening result"
                        name="abs_result"
                        style={{ margin: "-17px" }}
                      >
                        <Select
                          showArrow={false}
                          dropdownMatchSelectWidth={false}
                          // placement={placement}
                          //
                          size="small"
                          style={{ width: "160px", fontSize: "18px" }}
                          placeholder="Result"
                          // style={{ width: 120 }}
                          onChange={CheckResultAntibodyScreening}
                        >
                          {LoadABSshow?.map((item) => (
                            <Option key={item.name} value={item.name}>
                              <b style={{ fontSize: "18px" }}>{item.name}</b>
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        label="หมายเหตุ"
                        name="note_ABS"
                        size="small"
                        style={{
                          marginLeft: "380px",
                          marginTop: "-16px",
                        }}
                      >
                        <TextArea
                          rows={1}
                          placeholder="ระบุหมายเหตุ"
                          size="small"
                          style={{ width: "190px" }}
                        />
                      </Form.Item>
                    </Row>

                    <Row
                      style={{
                        marginTop: "-20px",
                        marginLeft: "-15px",
                        marginBottom: "-65px",
                      }}
                    >
                      <Col span={15}>
                        <Row>
                          <b>
                            บันทึกล่าสุด{" "}
                            <span style={{ color: "blue" }}>
                              {DataABS[0]?.abs_staff}&nbsp;&nbsp;
                              {DataABS[0]?.abs_savedate}&nbsp;
                              {DataABS[0]?.abs_savetime}{" "}
                            </span>
                          </b>
                        </Row>
                      </Col>
                      <Col span={9}>
                        <Row justify="end">
                          <Form.Item
                            label="Pass"
                            name="passSendAntibodyScreening"
                            // style={{ marginLeft: "580px" }}
                          >
                            {" "}
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
                                setPasswordAntibodyScreening(e.target.value)
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
                              htmlType="submit"
                              // onClick={SendAntibodyScreening}
                            >
                              บันทึก
                            </Button>
                          </Tooltip>
                        </Row>
                      </Col>
                    </Row>

                    <br />
                  </Card>
                </Form>
              </Col>
              <Col span={12}>
                <Form
                  form={DATandAutocontrolForm}
                  onFinish={SendDATandAutocontrol}
                >
                  <Card
                    className="cadfrom"
                    bordered={false}
                    style={{
                      // height: "100%",
                      marginTop: "-18px",
                      borderRadius: "10px",
                      border: "1px solid",
                      marginLeft: "10px",
                      boxShadow: "5px 5px 5px grey",
                      backgroundColor: "#ecf5f8",
                    }}
                  >
                    <Row
                      justify="start"
                      style={{ marginTop: "-20px", marginLeft: "-20px" }}
                    >
                      <Col span={24} offset={0}>
                        <b style={{ fontSize: "20px" }}>DAT and Autocontrol</b>
                      </Col>
                    </Row>
                    <br />
                    <Row
                      style={{
                        margin: "-20px",
                      }}
                    >
                      <Col span={24} style={{ paddingBottom: "5px" }}>
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
                              width="50px"
                            />
                            <Column
                              title="37 ํC"
                              dataIndex="dat_37c"
                              key="dat_37c"
                              align="center"
                              width="50px"
                            />
                            <Column
                              title="IAT"
                              dataIndex="dat_iat"
                              key="dat_iat"
                              align="center"
                              width="50px"
                            />
                            <Column
                              title="Result"
                              dataIndex="dat_result"
                              key="dat_result"
                              align="center"
                              width="50px"
                            />
                          </ColumnGroup>
                        </Table>
                        <Table
                          dataSource={DAT_Autocontrol}
                          pagination={false}
                          bordered
                          size="small"
                          width="100%"
                          className="NOHOVERDAT_Autocontrol"
                        >
                          <ColumnGroup title="Autocontrol">
                            <Column
                              title="RT"
                              dataIndex="autologous_rt"
                              key="autologous_rt"
                              align="center"
                              width="50px"
                            />
                            <Column
                              title="37 ํC"
                              dataIndex="autologous_37c"
                              key="autologous_37c"
                              align="center"
                              width="50px"
                            />
                            <Column
                              title="IAT"
                              dataIndex="autologous_iat"
                              key="autologous_iat"
                              align="center"
                              width="50px"
                            />
                            <Column
                              title="Result"
                              dataIndex="autologous_result"
                              key="autologous_result"
                              align="center"
                              width="50px"
                            />
                          </ColumnGroup>
                        </Table>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "25px", marginBottom: "-40px" }}>
                      <Col>
                        <Form.Item
                          label="หมายเหตุ"
                          name="note_Dat_Autocontrol"
                          style={{ marginLeft: "-20px" }}
                        >
                          <TextArea
                            rows={1}
                            placeholder="ระบุหมายเหตุ"
                            style={{ width: "200px" }}
                          />
                        </Form.Item>
                      </Col>
                      &nbsp;
                      <Col offset={5}>
                        <Row justify="end">
                          <Form.Item
                            label="Pass"
                            name="passSendDATandAutocontrol"
                            // style={{ marginLeft: "580px" }}
                          >
                            {" "}
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
                              // onClick={SendDATandAutocontrol}
                              htmlType="submit"
                            >
                              บันทึก
                            </Button>
                          </Tooltip>
                        </Row>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "15px", marginBottom: "-15px" }}>
                      <Col>
                        <Row>
                          <b style={{ marginLeft: "-20px" }}>
                            บันทึกล่าสุด
                            <span style={{ color: "blue" }}>
                              {" "}
                              {Data_DAT_ATC[0]?.dat_staff}&nbsp;&nbsp;
                              {Data_DAT_ATC[0]?.dat_savedate}&nbsp;
                              {Data_DAT_ATC[0]?.dat_savetime}{" "}
                            </span>
                          </b>
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                </Form>
              </Col>
            </Row>
            <br />
            <Row
              justify="center"
              style={{
                marginTop: "-15px",
              }}
            >
              <Col span={24}>
                <Card
                  // width={900}
                  // className="cadfrom"
                  bordered={false}
                  style={{
                    width: "100%",
                    marginTop: "2px",
                    borderRadius: "10px",
                    border: "1px solid",
                    marginLeft: "-2px",
                    boxShadow: "5px 5px 5px grey",
                    backgroundColor: "#f8c7b2",
                  }}
                >
                  <Row
                    justify="center"
                    style={{
                      marginTop: "-23px",
                      marginLeft: "-23.5px",
                      marginRight: "-23.5px",
                      marginBottom: "-45px",
                      backgroundColor: "#f8c7b2",
                      borderRadius: "10px",
                      paddingBottom: "5px",
                    }}
                  >
                    <b style={{ fontSize: "24px", marginTop: "5px" }}>
                      Identification
                    </b>
                  </Row>
                  <Row
                    justify="center"
                    style={{
                      marginTop: "100px",
                      marginLeft: "-23.5px",
                      marginRight: "-23.5px",
                      marginTop: "5px",

                      backgroundColor: "#f8c7b2",
                      // borderRadius: "10px",
                      paddingBottom: "20px",
                    }}
                  >
                    &nbsp;
                  </Row>
                  <Col span={24} style={{ marginTop: "-38px" }}>
                    <div className="card-container-iden">
                      <Tabs defaultActiveKey="1" type="card" className="ss">
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
                                  // width={8000}
                                  // style={{marginLeft:"80px",paddingRight:"60px",}}
                                >
                                  <ColumnGroup title="ABO">
                                    <Column
                                      title="A1"
                                      dataIndex="A1_IDC"
                                      key="A1_IDC"
                                      align="center"
                                    />
                                    <Column
                                      title="H"
                                      dataIndex="H_IDC"
                                      key="H_IDC"
                                      align="center"
                                    />
                                  </ColumnGroup>
                                  <ColumnGroup title="Rh">
                                    <Column
                                      title="D"
                                      dataIndex="D_IDC"
                                      key="D_IDC"
                                      align="center"
                                    />
                                    <Column
                                      title="C"
                                      dataIndex="C_IDC"
                                      key="C_IDC"
                                      align="center"
                                    />
                                    <Column
                                      title="E"
                                      dataIndex="E_IDC"
                                      key="E_IDC"
                                      align="center"
                                    />
                                    <Column
                                      title="c"
                                      dataIndex="c_IDC"
                                      key="c_IDC"
                                      align="center"
                                    />
                                    <Column
                                      title="e"
                                      dataIndex="e_IDC"
                                      key="e_IDC"
                                      align="center"
                                    />
                                    <Column
                                      title="Cw"
                                      dataIndex="Cw_IDC"
                                      key="Cw_IDC"
                                      align="center"
                                    />
                                  </ColumnGroup>
                                  <ColumnGroup title="Kell">
                                    <Column
                                      title="K"
                                      dataIndex="K_IDC"
                                      key="K_IDC"
                                      align="center"
                                    />
                                    <Column
                                      title="k"
                                      dataIndex="k_IDC"
                                      key="k_IDC"
                                      align="center"
                                    />
                                    <Column
                                      title="Kpa"
                                      dataIndex="Kpa_IDC"
                                      key="Kpa_IDC"
                                      align="center"
                                    />
                                    <Column
                                      title="Kpb"
                                      dataIndex="Kpb_IDC"
                                      key="Kpb_IDC"
                                      align="center"
                                    />
                                    <Column
                                      title="Jsa"
                                      dataIndex="Jsa_IDC"
                                      key="Jsa_IDC"
                                      align="center"
                                    />
                                    <Column
                                      title="Jsb"
                                      dataIndex="Jsb_IDC"
                                      key="Jsb_IDC"
                                      align="center"
                                    />
                                  </ColumnGroup>
                                  <ColumnGroup title="Kidd">
                                    <Column
                                      title="Jka"
                                      dataIndex="Jka_IDC"
                                      key="Jka_IDC"
                                      align="center"
                                    />
                                    <Column
                                      title="Jkb"
                                      dataIndex="Jkb_IDC"
                                      key="Jkb_IDC"
                                      align="center"
                                    />
                                    <Column
                                      title="Jk3"
                                      dataIndex="Jk3_IDC"
                                      key="Jk3_IDC"
                                      align="center"
                                    />
                                  </ColumnGroup>
                                  <ColumnGroup title="MNSs">
                                    <Column
                                      title="M"
                                      dataIndex="M_IDC"
                                      key="M_IDC"
                                      align="center"
                                    />
                                    <Column
                                      title="N"
                                      dataIndex="N_IDC"
                                      key="N_IDC"
                                      align="center"
                                    />
                                    <Column
                                      title="S"
                                      dataIndex="S_IDC"
                                      key="S_IDC"
                                      align="center"
                                    />
                                    <Column
                                      title="s"
                                      dataIndex="s_IDC"
                                      key="s_IDC"
                                      align="center"
                                    />
                                    <Column
                                      title="Mia"
                                      dataIndex="Mia_IDC"
                                      key="Mia_IDC"
                                      align="center"
                                    />
                                  </ColumnGroup>
                                  <ColumnGroup title="Lewis">
                                    <Column
                                      title="Lea"
                                      dataIndex="Lea_IDC"
                                      key="Lea_IDC"
                                      align="center"
                                    />
                                    <Column
                                      title="Leb"
                                      dataIndex="Leb_IDC"
                                      key="Leb_IDC"
                                      align="center"
                                    />
                                  </ColumnGroup>
                                  <ColumnGroup title="DUffy">
                                    <Column
                                      title="Fya"
                                      dataIndex="Fya_IDC"
                                      key="Fya_IDC"
                                      align="center"
                                    />
                                    <Column
                                      title="Fyb"
                                      dataIndex="Fyb_IDC"
                                      key="Fyb_IDC"
                                      align="center"
                                    />
                                    <Column
                                      title="Fy3"
                                      dataIndex="Fy3_IDC"
                                      key="Fy3_IDC"
                                      align="center"
                                    />
                                  </ColumnGroup>
                                  <ColumnGroup title="Diego">
                                    <Column
                                      title="Dia"
                                      dataIndex="Dia_IDC"
                                      key="Dia_IDC"
                                      align="center"
                                    />
                                    <Column
                                      title="Dib"
                                      dataIndex="Dib_IDC"
                                      key="Dib_IDC"
                                      align="center"
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
                                >
                                  <ColumnGroup title="I">
                                    <Column
                                      title="I"
                                      dataIndex="I_IDC"
                                      key="I_IDC"
                                      align="center"
                                    />
                                    <Column
                                      title="IH"
                                      dataIndex="IH_IDC"
                                      key="IH_IDC"
                                      align="center"
                                    />
                                  </ColumnGroup>
                                  <ColumnGroup title="Coton">
                                    <Column
                                      title="Coa"
                                      dataIndex="Coa_IDC"
                                      key="Coa_IDC"
                                      align="center"
                                    />
                                    <Column
                                      title="Cob"
                                      dataIndex="Cob_IDC"
                                      key="Cob_IDC"
                                      align="center"
                                    />
                                  </ColumnGroup>
                                  <ColumnGroup title="Autoantibody">
                                    <Column
                                      title="CT"
                                      dataIndex="CT_IDC"
                                      key="CT_IDC"
                                      align="center"
                                    />
                                    <Column
                                      title="WT"
                                      dataIndex="WT_IDC"
                                      key="WT_IDC"
                                      align="center"
                                    />
                                    <Column
                                      title="Hemolysis"
                                      dataIndex="Hemolysis_IDC"
                                      key="Hemolysis_IDC"
                                      align="center"
                                    />
                                  </ColumnGroup>
                                  <ColumnGroup title="Xg">
                                    <Column
                                      title="Xga"
                                      dataIndex="Xga_IDC"
                                      key="Xga_IDC"
                                      align="center"
                                    />
                                    <Column
                                      title="F/M"
                                      dataIndex="F_M_IDC"
                                      key="F_M_IDC"
                                      align="center"
                                    />
                                  </ColumnGroup>
                                  <ColumnGroup title="P">
                                    <Column
                                      title="P1"
                                      dataIndex="P1_IDC"
                                      key="P1_IDC"
                                      align="center"
                                    />
                                    <Column
                                      title="Tja"
                                      dataIndex="Tja_IDC"
                                      key="Tja_IDC"
                                      align="center"
                                    />
                                  </ColumnGroup>

                                  <Column
                                    title="Uniden"
                                    dataIndex="Uniden_IDC"
                                    key="Uniden_IDC"
                                    align="center"
                                    backgroundColor="red"
                                  />

                                  <ColumnGroup title="Luthearn">
                                    <Column
                                      title="Lua"
                                      dataIndex="Lua_IDC"
                                      key="Lua_IDC"
                                      align="center"
                                    />
                                    <Column
                                      title="Lub"
                                      dataIndex="Lub_IDC"
                                      key="Lub_IDC"
                                      align="center"
                                    />
                                  </ColumnGroup>

                                  <Column
                                    title="RF"
                                    dataIndex="RF_IDC"
                                    key="RF_IDC"
                                    align="center"
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
                            >
                              <ColumnGroup title="ABO">
                                <Column
                                  title="A1"
                                  dataIndex="A1_ATJ"
                                  key="A1_ATJ"
                                  align="center"
                                />
                                <Column
                                  title="H"
                                  dataIndex="H_ATJ"
                                  key="H_ATJ"
                                  align="center"
                                />
                              </ColumnGroup>
                              <ColumnGroup title="RH">
                                <Column
                                  title="D"
                                  dataIndex="D_ATJ"
                                  key="D_ATJ"
                                  align="center"
                                />
                                <Column
                                  title="C"
                                  dataIndex="C_ATJ"
                                  key="C_ATJ"
                                  align="center"
                                />
                                <Column
                                  title="c"
                                  dataIndex="c_ATJ"
                                  key="c_ATJ"
                                  align="center"
                                />
                                <Column
                                  title="E"
                                  dataIndex="E_ATJ"
                                  key="E_ATJ"
                                  align="center"
                                />
                                <Column
                                  title="e"
                                  dataIndex="e_ATJ"
                                  key="e_ATJ"
                                  align="center"
                                />
                              </ColumnGroup>
                              <ColumnGroup title="Kell">
                                <Column
                                  title="K"
                                  dataIndex="K_ATJ"
                                  key="K_ATJ"
                                  align="center"
                                />
                                <Column
                                  title="k"
                                  dataIndex="k_ATJ"
                                  key="k_ATJ"
                                  align="center"
                                />
                              </ColumnGroup>
                              <ColumnGroup title="Diego">
                                <Column
                                  title="Dia"
                                  dataIndex="Dia_ATJ"
                                  key="Dia_ATJ"
                                  align="center"
                                />
                                <Column
                                  title="Dib"
                                  dataIndex="Dib_ATJ"
                                  key="Dib_ATJ"
                                  align="center"
                                />
                              </ColumnGroup>
                              <ColumnGroup title="MNSs">
                                <Column
                                  title="M"
                                  dataIndex="M_ATJ"
                                  key="M_ATJ"
                                  align="center"
                                />
                                <Column
                                  title="N"
                                  dataIndex="N_ATJ"
                                  key="N_ATJ"
                                  align="center"
                                />
                                <Column
                                  title="S"
                                  dataIndex="S_ATJ"
                                  key="S_ATJ"
                                  align="center"
                                />
                                <Column
                                  title="s"
                                  dataIndex="s_ATJ"
                                  key="s_ATJ"
                                  align="center"
                                />
                                <Column
                                  title="Mia"
                                  dataIndex="Mia_ATJ"
                                  key="Mia_ATJ"
                                  align="center"
                                />
                              </ColumnGroup>
                              <ColumnGroup title="Lewis">
                                <Column
                                  title="Lea"
                                  dataIndex="Lea_ATJ"
                                  key="Lea_ATJ"
                                  align="center"
                                />
                                <Column
                                  title="Leb"
                                  dataIndex="Leb_ATJ"
                                  key="Leb_ATJ"
                                  align="center"
                                />
                              </ColumnGroup>
                              <ColumnGroup title="Conton">
                                <Column
                                  title="Coa"
                                  dataIndex="Coa_ATJ"
                                  key="Coa_ATJ"
                                  align="center"
                                />
                                <Column
                                  title="Cob"
                                  dataIndex="Cob_ATJ"
                                  key="Cob_ATJ"
                                  align="center"
                                />
                              </ColumnGroup>
                              <ColumnGroup title="Kidd">
                                <Column
                                  title="Jka"
                                  dataIndex="Jka_ATJ"
                                  key="Jka_ATJ"
                                  align="center"
                                />
                                <Column
                                  title="Jkb"
                                  dataIndex="Jkb_ATJ"
                                  key="Jkb_ATJ"
                                  align="center"
                                />
                              </ColumnGroup>
                              <ColumnGroup title="I">
                                <Column
                                  title="I"
                                  dataIndex="I_ATJ"
                                  key="I_ATJ"
                                  align="center"
                                />
                                <Column
                                  title="i"
                                  dataIndex="i_ATJ"
                                  key="i_ATJ"
                                  align="center"
                                />
                              </ColumnGroup>

                              <ColumnGroup title="P">
                                <Column
                                  title="P1"
                                  dataIndex="P1_ATJ"
                                  key="P1_ATJ"
                                  align="center"
                                />
                                <Column
                                  title="p"
                                  dataIndex="p_ATJ"
                                  key="p_ATJ"
                                  align="center"
                                />
                              </ColumnGroup>

                              <ColumnGroup title="Lutherean">
                                <Column
                                  title="Lua"
                                  dataIndex="Lua_ATJ"
                                  key="Lua_ATJ"
                                  align="center"
                                />
                                <Column
                                  title="Lub"
                                  dataIndex="Lub_ATJ"
                                  key="Lub_ATJ"
                                  align="center"
                                />
                              </ColumnGroup>

                              <ColumnGroup title="Duffy">
                                <Column
                                  title="Fya"
                                  dataIndex="Fya_ATJ"
                                  key="Fya_ATJ"
                                  align="center"
                                />
                                <Column
                                  title="Fyb"
                                  dataIndex="Fyb_ATJ"
                                  key="Fyb_ATJ"
                                  align="center"
                                />
                              </ColumnGroup>

                              <Column
                                title="Xga"
                                dataIndex="Xga_ATJ"
                                key="Xga_ATJ"
                                align="center"
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
                                />{" "}
                                Refresh
                              </Button>
                            </Row>
                          </Form>
                        </TabPane>
                      </Tabs>
                    </div>
                  </Col>
                  <Row style={{ marginTop: "-12px" }}>
                    <Col span={12}>
                      {" "}
                      <Form form={Identification_formAntibody}>
                        <Form.Item
                          label="Antibody"
                          name="resultATB"
                          style={{ marginLeft: "15px", fontWeight: "bold" }}
                        >
                          <TextArea
                            rows={1}
                            placeholder="Antibody"
                            style={{ width: "700px" }}
                          >
                            <br />
                          </TextArea>
                        </Form.Item>
                      </Form>
                    </Col>
                    <Col span={12}>
                      {" "}
                      <Form form={Identification_formAntigen}>
                        <Form.Item
                          label="Antigen"
                          name="resultATG"
                          style={{ marginLeft: "20px", fontWeight: "bold" }}
                        >
                          <TextArea
                            rows={1}
                            placeholder="Antigen"
                            style={{ width: "700px" }}
                          />
                        </Form.Item>
                      </Form>
                    </Col>
                  </Row>{" "}
                  <Row style={{ marginTop: "-20px" }}>
                    <Col xs={12} xl={12} lg={12}>
                      <Row>
                        <Form form={Identification_formAntibody}>
                          <Form.Item
                            label="หมายเหตุ"
                            name="note_antibody"
                            style={{ marginLeft: "23.5px" }}
                          >
                            <TextArea
                              rows={1}
                              placeholder="ระบุหมายเหตุ"
                              style={{ width: "580px" }}
                            />
                          </Form.Item>
                        </Form>
                      </Row>
                    </Col>
                    <Col xs={12} xl={12} lg={12}>
                      <Row>
                        {" "}
                        <Form form={Identification_formAntigen}>
                          <Form.Item
                            label="หมายเหตุ"
                            name="note_antigen"
                            style={{ marginLeft: "23.5px" }}
                          >
                            <TextArea
                              rows={1}
                              placeholder="ระบุหมายเหตุ"
                              style={{ width: "580px" }}
                            />
                          </Form.Item>
                        </Form>
                      </Row>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "-21px" }}>
                    <Col style={{ marginLeft: "12px" }} xs={10} xl={10} lg={10}>
                      <b
                      // style={{ marginLeft: "85px" ,marginTop:"-20px"}}
                      >
                        บันทึกล่าสุด:
                        {/* <span style={{ color: "blue" }}>(Antibody )</span> */}
                        <span style={{ color: "blue" }}>
                          {" "}
                          {Data_ATB[0]?.save_staff}&nbsp;&nbsp;
                          {Data_ATB[0]?.ATB_savedate}&nbsp;
                          {Data_ATB[0]?.ATB_savetime}{" "}
                        </span>
                      </b>
                    </Col>
                    <Col
                      style={{ marginLeft: "107px" }}
                      xs={10}
                      xl={10}
                      lg={10}
                    >
                      <b
                      // style={{ marginLeft: "485px" ,marginTop:"-20px"}}
                      >
                        บันทึกล่าสุด:
                        {/* <span style={{ color: "blue" }}>(Antigen )</span> */}
                        <span style={{ color: "blue" }}>
                          {" "}
                          {Data_ATG[0]?.save_staff}&nbsp;&nbsp;
                          {Data_ATG[0]?.ATG_savedate}&nbsp;
                          {Data_ATG[0]?.ATG_savetime}{" "}
                        </span>
                      </b>
                    </Col>
                  </Row>
                  {/* <Form
                    form={Identification_formAntigen}
                    // onFinish={SendIdentificationDATA}
                  > */}
                  <Row
                    style={{ marginTop: "3px", marginBottom: "-40px" }}
                    justify="end"
                  >
                    <Form.Item
                      label="Pass"
                      name="passSendIdentification"
                      // style={{ marginLeft: "580px" }}
                    >
                      {" "}
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
                </Card>
              </Col>
            </Row>
            {/* ปุ่ม confirm */}
            <Card
              style={{
                // height: "290px",
                marginTop: "10px",
                padding: "1px",
                borderRadius: "10px",
                border: "1px solid",

                boxShadow: "5px 5px 5px grey",
                backgroundColor: "#c1dcc8",
              }}
            >
              {checksaveall === "" || checksavealls === "" ? (
                <Row justify="center">
                  <b style={{ color: "red" }}>
                    กรุณากรอกข้อมูลที่ Patient Grouping ให้ครบถ้วน
                  </b>
                </Row>
              ) : (
                <Row justify="center" style={{ marginTop: "-15px" }}>
                  <Tooltip title="บันทึก ALL">
                    <Button
                      style={{ border: "1px solid", marginRight: "5px" }}
                      type="primary"
                      // shape="round"
                      icon={<SaveFilled style={{ color: "#fff" }} />}
                      onClick={showModalsaveall}
                    >
                      บันทึก ALL
                    </Button>
                  </Tooltip>

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
                style={{ marginTop: "5px", marginBottom: "-15px" }}
              >
                <b>
                  confirm Patient Grouping ล่าสุด:
                  {/* <span style={{ color: "blue" }}>(Antibody )</span> */}
                  <span style={{ color: "blue" }}>
                    {" "}
                    {
                      showFetch_ConfirmDataPG_detil[0]
                        ?.staff_cross_confirm_update
                    }
                    &nbsp;&nbsp;
                    {showFetch_ConfirmDataPG_detil[0]?.cross_savedate}&nbsp;
                    {showFetch_ConfirmDataPG_detil[0]?.cross_savetime}
                  </span>
                </b>
              </Row>
            </Card>
            {/* ----- */}
            {/* --------------------------Crossmatch------------------------- */}
            {showFetch_ConfirmDataPG === "Y" ? (
              <Form
                form={Crossmat_form}
                initialValues={{
                  RT_csm: "",
                  temperature_room_csm: "",
                  Gel_csm: "",
                  IAT_csm: "",
                  RT_csm: "",
                  Result_csm: "",
                  Segment_csm: "",
                  Unit_no_csm: "",
                  Volume_csm: "",
                  checkbox_CSM_TABLE: "",
                  temperature_room_csm: "",
                  xm_note: "",
                }}
              >
                <Card
                  className="cadfrom"
                  bordered={false}
                  style={{
                    // height: "100%",
                    marginTop: "12px",
                    borderRadius: "10px",
                    border: "1px solid",

                    boxShadow: "5px 5px 5px grey",
                    backgroundColor: "#ecf5f8",
                  }}
                >
                  <Row
                    justify="center"
                    style={{
                      marginTop: "-23px",
                      marginLeft: "-20px",
                      // marginBottom: "-10px",
                    }}
                  >
                    <b style={{ fontSize: "24px" }}>Crossmatch</b>
                  </Row>

                  <Row justify="center" style={{ display: "flex" }}>
                    <Col
                      xs={24}
                      lg={24}
                      xl={12}
                      //  style={{ marginLeft: "-8px" }}
                    >
                      <Row justify="center">
                        {getformDataCrossmat_form == "1" ? (
                          <Col
                            span={24}
                            style={{
                              backgroundColor: "red",
                              color: "white",
                              borderRadius: "2px",
                              // marginLeft: "-8px",
                            }}
                          >
                            {" "}
                            <b style={{ fontSize: "20px" }}>
                              &nbsp;Crossmatching
                            </b>
                          </Col>
                        ) : (
                          ""
                        )}
                        {getformDataCrossmat_form == "2" ? (
                          <Col
                            span={24}
                            style={{
                              backgroundColor: "#00bfff",
                              color: "white",
                              borderRadius: "2px",
                              // marginLeft: "-8px",
                            }}
                          >
                            {" "}
                            <b style={{ fontSize: "20px" }}>
                              &nbsp;Crossmatching
                            </b>
                          </Col>
                        ) : (
                          ""
                        )}
                        {getformDataCrossmat_form == "13" ? (
                          <Col
                            span={24}
                            style={{
                              backgroundColor: "#ffee52",
                              color: "black",
                              borderRadius: "2px",
                              // marginLeft: "-8px",
                            }}
                          >
                            {" "}
                            <b style={{ fontSize: "20px" }}>
                              &nbsp;Crossmatching
                            </b>
                          </Col>
                        ) : (
                          ""
                        )}
                        {getformDataCrossmat_form == "6" ? (
                          <Col
                            span={24}
                            style={{
                              backgroundColor: "green",
                              color: "white",
                              borderRadius: "2px",
                              // marginLeft: "-8px",
                            }}
                          >
                            {" "}
                            <b style={{ fontSize: "20px" }}>
                              &nbsp;Crossmatching
                            </b>
                          </Col>
                        ) : (
                          ""
                        )}
                        {getformDataCrossmat_form == "0" ? (
                          <Col
                            span={24}
                            style={{
                              backgroundColor: "#65adc0",
                              color: "white",
                              borderRadius: "2px",
                              // marginLeft: "-8px",
                            }}
                          >
                            {" "}
                            <b style={{ fontSize: "20px" }}>
                              &nbsp;Crossmatching
                            </b>
                          </Col>
                        ) : (
                          ""
                        )}
                      </Row>
                      <Card bordered={false}>
                        <Row style={{ marginTop: "-15px" }}>
                          <Col xs={24} lg={24} xl={16}>
                            <Row>
                              {edit_crossinput === true ? (
                                <Form.Item
                                  label="Component"
                                  name="blood_status_search"
                                  style={{ width: "100%" }}
                                >
                                  <Select
                                    showSearch
                                    // showArrow={false}
                                    dropdownMatchSelectWidth={false}
                                    placement={placement}
                                    //
                                    style={{ width: "100%" }}
                                    placeholder="เลือกประเภท"
                                    // onChange={onChange}
                                    onChange={CountLoadCrossmatchTypeBlood}
                                    onSearch={onSearch}
                                    filterOption={(input, option) =>
                                      option.children
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                    }
                                    disabled
                                  >
                                    {TypeBlood?.map((item) => (
                                      <Option key={item.s_name} value={item.id}>
                                        {item.s_name}
                                      </Option>
                                    ))}
                                  </Select>
                                </Form.Item>
                              ) : (
                                <Form.Item
                                  label="Component"
                                  name="blood_status_search"
                                  style={{ width: "100%" }}
                                >
                                  <Select
                                    showSearch
                                    // showArrow={false}
                                    dropdownMatchSelectWidth={false}
                                    placement={placement}
                                    //
                                    style={{ width: "100%" }}
                                    placeholder="เลือกประเภท"
                                    // onChange={onChange}
                                    onChange={CountLoadCrossmatchTypeBlood}
                                    onSearch={onSearch}
                                    filterOption={(input, option) =>
                                      option.children
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                    }
                                  >
                                    {TypeBlood?.map((item) => (
                                      <Option key={item.s_name} value={item.id}>
                                        {item.s_name}
                                      </Option>
                                    ))}
                                  </Select>
                                </Form.Item>
                              )}
                            </Row>
                          </Col>
                          <Col offset={1}>
                            <Row>
                              <p>จำนวน :</p>
                              <b
                                style={{ fontSize: "20px", marginTop: "-5px" }}
                              >
                                &nbsp;
                                {CountTypeBlood}
                              </b>
                              &nbsp;&nbsp;&nbsp;
                              <p>Unit</p>{" "}
                            </Row>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={24} lg={24} xl={16}>
                            {edit_crossinput === true ? (
                              <Form.Item
                                label="Unit no"
                                name="Unit_no_csm"
                                style={{
                                  marginTop: "-19px",
                                  marginLeft: "25.5px",
                                }}
                              >
                                <Input
                                  style={{
                                    width: "100%",
                                    fontSize: "35px",
                                    height: "40px",
                                  }}
                                  id="Unit_no_csm"
                                  onPressEnter={send_bloodno_Crossmatch}
                                  disabled
                                />
                              </Form.Item>
                            ) : (
                              <Form.Item
                                label="Unit no"
                                name="Unit_no_csm"
                                style={{
                                  marginTop: "-19px",
                                  marginLeft: "25.5px",
                                }}
                              >
                                <Input
                                  style={{
                                    width: "100%",
                                    fontSize: "35px",
                                    height: "40px",
                                  }}
                                  id="Unit_no_csm"
                                  onPressEnter={send_bloodno_Crossmatch}
                                />
                              </Form.Item>
                            )}
                          </Col>
                          <Col xs={24} lg={24} xl={3}>
                            <Tooltip title="แบ่งถุง">
                              <Button
                                style={{
                                  border: "1px solid",
                                  top: "-18px",
                                  marginLeft: "20px",
                                }}
                                type="primary"
                                shape="round"
                                icon={
                                  <BgColorsOutlined style={{ color: "#fff" }} />
                                }
                                size={"large"}
                                // onClick={SendIdentification}
                              >
                                แบ่งถุง
                              </Button>
                            </Tooltip>
                          </Col>
                        </Row>
                        <Row style={{ marginTop: "1px" }}>
                          <Col span={16}>
                            <Row style={{ marginLeft: "32.5px" }}>
                              <p>Group :</p>&nbsp;&nbsp;
                              {showbloodno_Detil.blood_group === "A" ? (
                                <b
                                  style={{
                                    fontSize: "35px",
                                    marginTop: "-20px",
                                    backgroundColor: "#ffff00",
                                  }}
                                >
                                  &nbsp; {showbloodno_Detil.gr} &nbsp;
                                </b>
                              ) : (
                                ""
                              )}
                              {showbloodno_Detil.blood_group === "B" ? (
                                <b
                                  style={{
                                    fontSize: "35px",
                                    marginTop: "-20px",
                                    backgroundColor: "#ffb6c1",
                                  }}
                                >
                                  &nbsp; {showbloodno_Detil.gr} &nbsp;
                                </b>
                              ) : (
                                ""
                              )}
                              {showbloodno_Detil.blood_group === "AB" ? (
                                <b
                                  style={{
                                    fontSize: "35px",
                                    marginTop: "-20px",
                                    backgroundColor: "#ffffff",
                                  }}
                                >
                                  &nbsp; {showbloodno_Detil.gr} &nbsp;
                                </b>
                              ) : (
                                ""
                              )}
                              {showbloodno_Detil.blood_group === "O" ? (
                                <b
                                  style={{
                                    fontSize: "35px",
                                    marginTop: "-20px",
                                    backgroundColor: "#4dadff",
                                  }}
                                >
                                  &nbsp; {showbloodno_Detil.gr} &nbsp;
                                </b>
                              ) : (
                                ""
                              )}
                              {showbloodno_Detil.blood_group === "" ||
                              showbloodno_Detil.blood_group === null ||
                              showbloodno_Detil.blood_group === undefined
                                ? ""
                                : ""}
                              <p>&nbsp;Blood Type :</p>&nbsp;
                              {showbloodno_Detil.component_name === "" ||
                              showbloodno_Detil.component_name === null ||
                              showbloodno_Detil.component_name === undefined ? (
                                ""
                              ) : (
                                <b
                                  style={{
                                    fontSize: "30px",
                                    marginTop: "-20px",
                                    backgroundColor: "#C0FFF6",
                                  }}
                                >
                                  &nbsp;{showbloodno_Detil.component_name}&nbsp;
                                </b>
                              )}
                            </Row>
                          </Col>
                          <Col span={8}>
                            <Row style={{ marginTop: "-15px" }}>
                              <b>Collect :</b>
                              <p>{showbloodno_Detil.collectdate}</p>
                            </Row>
                            <Row style={{ marginTop: "-10px" }}>
                              <b>Expire : </b>
                              <p>{showbloodno_Detil.expiry_date}</p>
                            </Row>
                          </Col>
                        </Row>
                        <Row
                          style={{
                            marginLeft: "26px",
                          }}
                        >
                          <Col span={8}>
                            <Row>
                              {" "}
                              <Form.Item label="Volume" name="Volume_csm">
                                <Input
                                  style={{ width: "90px" }}
                                  onPressEnter={Volume_next}
                                />
                              </Form.Item>{" "}
                              &nbsp;{" "}
                              <p
                                style={{
                                  marginTop: "5px",
                                }}
                              >
                                ml.
                              </p>{" "}
                              &nbsp;{" "}
                            </Row>
                          </Col>
                          <Col span={8}>
                            {" "}
                            <Form.Item
                              label="Segment"
                              name="Segment_csm"
                              // style={{
                              //   marginTop: "-19px",
                              //   marginLeft: "-12px",
                              // }}
                            >
                              <Input
                                style={{ width: "120px" }}
                                onPressEnter={Segment_next}
                              />
                            </Form.Item>{" "}
                            &nbsp;{" "}
                          </Col>
                        </Row>
                      </Card>

                      {getformDataCrossmat_form === "0" ? (
                        <Col
                          span={24}
                          style={{
                            backgroundColor: "#8ebc9a",
                            color: "white",
                            borderRadius: "2px",
                            marginLeft: "0px",
                            marginTop: "-65px",
                          }}
                        >
                          {" "}
                          <b style={{ fontSize: "20px" }}>
                            &nbsp;Crossmatching Result
                          </b>
                        </Col>
                      ) : (
                        ""
                      )}

                      {getformDataCrossmat_form == "1" ? (
                        <Col
                          span={24}
                          style={{
                            backgroundColor: "red",
                            color: "white",
                            borderRadius: "2px",
                            marginLeft: "0px",
                            marginTop: "-65px",
                          }}
                        >
                          {" "}
                          <b style={{ fontSize: "20px" }}>
                            &nbsp;Crossmatching Result
                          </b>
                        </Col>
                      ) : (
                        ""
                      )}

                      {getformDataCrossmat_form == "2" ? (
                        <Col
                          span={24}
                          style={{
                            backgroundColor: "#00bfff",
                            color: "white",
                            borderRadius: "2px",
                            marginLeft: "0px",
                            marginTop: "-65px",
                          }}
                        >
                          {" "}
                          <b style={{ fontSize: "20px" }}>
                            &nbsp;Crossmatching Result
                          </b>
                        </Col>
                      ) : (
                        ""
                      )}

                      {getformDataCrossmat_form == "6" ? (
                        <Col
                          span={24}
                          style={{
                            backgroundColor: "green",
                            color: "white",
                            borderRadius: "2px",
                            marginLeft: "0px",
                            marginTop: "-65px",
                          }}
                        >
                          {" "}
                          <b style={{ fontSize: "20px" }}>
                            &nbsp;Crossmatching Result
                          </b>
                        </Col>
                      ) : (
                        ""
                      )}

                      {getformDataCrossmat_form == "13" ? (
                        <Col
                          span={24}
                          style={{
                            backgroundColor: "#ffee52",
                            color: "black",
                            borderRadius: "2px",
                            marginLeft: "0px",
                            marginTop: "-65px",
                          }}
                        >
                          {" "}
                          <b style={{ fontSize: "20px" }}>
                            &nbsp;Crossmatching Result
                          </b>
                        </Col>
                      ) : (
                        ""
                      )}

                      {/* ----------------------------------------------------- */}
                      <Card bordered={false} style={{}}>
                        <Row>
                          <Col
                            span={24}
                            style={{ marginLeft: "-2px", marginTop: "-18px" }}
                          >
                            <Table
                              className="Crossmatching_Result"
                              dataSource={Crossmatching_Result}
                              pagination={false}
                              bordered
                              size="small"
                              width="100%"
                              // style={{ marginBottom: "-8px" }}
                            >
                              {/* <ColumnGroup title="Crossmatching Result"> */}
                              <Column
                                title="RT"
                                dataIndex="RT_csm"
                                key="RT_csm"
                                align="center"
                              />
                              <Column
                                title="37 ํC"
                                dataIndex="temperature_room_csm"
                                key="temperature_room_csm"
                                align="center"
                              />
                              <Column
                                title="IAT"
                                dataIndex="IAT_csm"
                                key="IAT_csm"
                                align="center"
                              />
                              <Column
                                title="Gel"
                                dataIndex="Gel_csm"
                                key="Gel_csm"
                                align="center"
                              />
                              <Column
                                title="Result"
                                dataIndex="result_csm"
                                key="result_csm"
                                align="center"
                              />
                              {/* </ColumnGroup> */}
                            </Table>
                          </Col>
                        </Row>
                        <Row style={{ marginTop: "10px" }}>
                          <Col span={24}>
                            <Form.Item label="หมายเหตุ" name="xm_note">
                              <TextArea
                                rows={1}
                                placeholder="ระบุหมายเหตุ"
                                style={{ width: "100%" }}
                                onPressEnter={detil_next}
                              />
                            </Form.Item>{" "}
                          </Col>
                        </Row>
                        <Row>
                          <b
                            style={{ marginLeft: "-10px", marginTop: "-20px" }}
                          >
                            บันทึกล่าสุด:
                            {/* <span style={{ color: "blue" }}>(Antibody )</span> */}
                            <span style={{ color: "blue" }}>
                              {" "}
                              {UseonEditcross.xm_edit_staff != ""
                                ? UseonEditcross?.xm_edit_staff
                                : UseonEditcross?.xm_staft}
                              &nbsp;
                              {UseonEditcross.xm_edit_staff != ""
                                ? UseonEditcross?.xm_edit_date_time_savedate
                                : UseonEditcross?.xm_savedate}
                              &nbsp;&nbsp;
                              {UseonEditcross.xm_edit_staff != ""
                                ? UseonEditcross?.xm_edit_date_time_savetime
                                : UseonEditcross?.xm_savetime}
                            </span>
                          </b>
                        </Row>
                        {edit_crossinput === true ? (
                          <Row justify="end">
                            <Form.Item label="" name="xm_id">
                              <Input style={{ width: "120px" }} type="hidden" />
                            </Form.Item>
                            <Col>
                              <Row>
                                <Form.Item
                                  label=""
                                  name="print_auto"
                                  valuePropName="checked"
                                  align="center"
                                >
                                  <Checkbox
                                    style={{
                                      width: "100%",
                                    }}
                                    // onChange={setResultATB}
                                  />
                                </Form.Item>
                                &nbsp;&nbsp;
                                <FcPrint style={{ fontSize: "30px" }} />
                                &nbsp;&nbsp;
                              </Row>
                            </Col>
                            <Form.Item label="Pass" name="Pcrossmatch">
                              <Input.Password
                                id="Pcrossmatch"
                                placeholder="กรุณากรอกรหัสผ่าน"
                                iconRender={(visible) =>
                                  visible ? (
                                    <EyeTwoTone />
                                  ) : (
                                    <EyeInvisibleOutlined />
                                  )
                                }
                                style={{ width: "90px" }}
                                value={passwordSendcrossmatchs}
                                onChange={(e) =>
                                  setPasswordSendcrossmatchs(e.target.value)
                                }
                                onKeyDown={({ target: { value }, keyCode }) => {
                                  if (keyCode === 13) {
                                    // 13 คือ enter
                                    sendUp_Crossmatch();
                                  }
                                }}
                              />
                            </Form.Item>
                            &nbsp;
                            <Tooltip title="บันทึก">
                              <Button
                                style={{ border: "1px solid" }}
                                type="primary"
                                shape="round"
                                icon={<SaveFilled style={{ color: "#fff" }} />}
                                onClick={sendUp_Crossmatch}
                              >
                                บันทึก
                              </Button>
                            </Tooltip>
                            &nbsp;
                            <Tooltip title="ยกเลิก">
                              <Button
                                style={{
                                  border: "1px solid",
                                  backgroundColor: "red",
                                }}
                                type="primary"
                                shape="round"
                                icon={
                                  <CloseCircleOutlined
                                    style={{ color: "#fff", marginTop: "1px" }}
                                  />
                                }
                                onClick={NOUp_Crossmatch}
                              >
                                &nbsp;ยกเลิก
                              </Button>
                            </Tooltip>
                          </Row>
                        ) : (
                          <Row justify="end">
                            <Col>
                              <Row
                                style={
                                  {
                                    //  marginButtom: "59px",
                                  }
                                }
                              >
                                <Form.Item
                                  label=""
                                  name="print_auto"
                                  style={
                                    {
                                      // marginTop: "-9px",
                                    }
                                  }
                                  valuePropName="checked"
                                  align="center"
                                >
                                  <Checkbox
                                    style={{
                                      width: "100%",
                                    }}
                                    // onChange={setResultATB}
                                  />
                                </Form.Item>
                                &nbsp;&nbsp;
                                <FcPrint style={{ fontSize: "30px" }} />
                                &nbsp;&nbsp;
                              </Row>
                            </Col>
                            <Form.Item
                              label="Pass"
                              name="Pcrossmatch"
                              // style={{ marginLeft: "580px" }}
                            >
                              {" "}
                              {/* <Input style={{ width: "90px" }} /> */}
                              <Input.Password
                                id="Pcrossmatch"
                                placeholder="กรุณากรอกรหัสผ่าน"
                                iconRender={(visible) =>
                                  visible ? (
                                    <EyeTwoTone />
                                  ) : (
                                    <EyeInvisibleOutlined />
                                  )
                                }
                                style={{ width: "90px" }}
                                value={passwordSendcrossmatchs}
                                onChange={(e) =>
                                  setPasswordSendcrossmatchs(e.target.value)
                                }
                                onKeyDown={({ target: { value }, keyCode }) => {
                                  if (keyCode === 13) {
                                    // 13 คือ enter
                                    Send_saveCross();
                                  }
                                }}
                              />
                            </Form.Item>
                            &nbsp;
                            <Tooltip title="บันทึก">
                              <Button
                                style={{ border: "1px solid" }}
                                type="primary"
                                shape="round"
                                icon={<SaveFilled style={{ color: "#fff" }} />}
                                onClick={Send_saveCross}
                              >
                                บันทึก
                              </Button>
                            </Tooltip>
                          </Row>
                        )}
                      </Card>
                    </Col>

                    <Col xs={24} lg={24} xl={11} offset={1}>
                      <Row justify="center">
                        <Col
                          span={24}
                          style={{
                            backgroundColor: "#795548",
                            color: "white",
                            borderRadius: "2px",
                            // marginLeft: "-8px",
                          }}
                        >
                          {" "}
                          <b style={{ fontSize: "20px" }}>
                            &nbsp;Blood Request
                          </b>
                        </Col>
                      </Row>
                      <Card
                        bordered={false}
                        style={{
                          height: "400px",
                        }}
                      >
                        <Row
                          style={{ marginTop: "-20px", marginBottom: "5px" }}
                        >
                          <Table
                            className="Blood_Request_Crossmatch"
                            columns={blood_request_list}
                            style={{ width: "100%" }}
                            dataSource={Blood_Request_cross}
                            bordered
                            size="small"
                            pagination={false}
                            scroll={{ y: 312 }}
                          ></Table>
                        </Row>
                      </Card>
                    </Col>
                  </Row>

                  <Row>
                    <Col
                      span={24}
                      style={{ marginLeft: "-2px", marginTop: "-40px" }}
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
                            ? index % 2 === 0
                              ? "Crossmatchhover Crossmatchhoverfix Crossmatchhover2 Crossmatchhoverfix2"
                              : "Crossmatchhover Crossmatchhoverfix Crossmatchhover3 Crossmatchhoverfix3"
                            : index % 2 === 0
                            ? "Crossmatchhover2 Crossmatchhoverfix2"
                            : "Crossmatchhover3 Crossmatchhoverfix3";
                        }}
                        className="Crossmatch"
                        scroll={{
                          x: 1700,
                          y: 740,
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
                        icon={
                          <SafetyCertificateFilled style={{ color: "#fff" }} />
                        }
                        onClick={showModal_firm_cross}
                      >
                        confirm Crossmatch
                      </Button>
                    </Tooltip>
                  </Row>
                </Card>
              </Form>
            ) : (
              ""
            )}
            {/* --------------------------------------------------- */}
            <br />
            {/* ปุ่ม footer */}
            <Card
              style={{
                // height: "290px",
                padding: "3px",
                borderRadius: "10px",
                border: "1px solid",

                boxShadow: "5px 5px 5px grey",
                backgroundColor: "#ecf5f8",
              }}
            >
              <Row justify="start">
                <Col span={12}>
                  <Row justify="start">
                    <Col span={4} offset={0}>
                      <Tooltip title="เบิกจ่าย">
                        <Button
                          style={{ border: "1px solid" }}
                          // type="primary"
                          shape="round"
                          icon={<SnippetsFilled style={{ color: "red" }} />}
                          onClick={showModalTransBlood}
                        >
                          เบิกจ่าย
                        </Button>
                      </Tooltip>
                    </Col>
                    &nbsp;
                    <Col span={4} offset={0}>
                      <Tooltip title="History">
                        <Button
                          style={{ border: "1px solid" }}
                          // type="primary"
                          shape="round"
                          icon={
                            <ClockCircleFilled style={{ color: "#9254de" }} />
                          }
                        >
                          History
                        </Button>
                      </Tooltip>
                    </Col>
                    <Col span={4} offset={0}>
                      <Tooltip title="บันทึกแพ้เลือด">
                        <Button
                          style={{ border: "1px solid" }}
                          // type="primary"
                          shape="round"
                          onClick={showModalReactBlood}
                          icon={
                            <ClockCircleFilled style={{ color: "#9254de" }} />
                          }
                        >
                          บันทึกแพ้เลือด
                        </Button>
                      </Tooltip>
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row justify="start">
                    <Col span={5} offset={0}>
                      {" "}
                      <Tooltip title="พิมพ์รายการ">
                        <Checkbox onChange={onChange}>พิมพ์รายการ</Checkbox>{" "}
                      </Tooltip>
                    </Col>
                    <Col span={4} offset={0}>
                      <Tooltip title="ใบแจ้งญาติ">
                        <Button
                          style={{ border: "1px solid" }}
                          // type="primary"
                          shape="round"
                          icon={<FileTextFilled style={{ color: "#8c8c8c" }} />}
                        >
                          ใบแจ้งญาติ
                        </Button>
                      </Tooltip>
                    </Col>
                    <Col span={4} offset={1}>
                      <Tooltip title="Sticker">
                        <Button
                          style={{ border: "1px solid" }}
                          // type="primary"
                          shape="round"
                          icon={<LayoutFilled style={{ color: "#8c8c8c" }} />}
                        >
                          Sticker
                        </Button>
                      </Tooltip>
                    </Col>
                    <Col span={3} offset={1}>
                      {" "}
                      <Tooltip title="การเงิน">
                        <Checkbox onChange={onChange}>การเงิน</Checkbox>{" "}
                      </Tooltip>
                    </Col>
                    <Col span={4} offset={1}>
                      {/* <Tooltip title="บันทึก">
                      <Button
                        style={{ border: "1px solid" }}
                        type="primary"
                        shape="round"
                        icon={<SaveFilled style={{ color: "#fff" }} />}
                        // onClick={Sendblooddetil}
                      >
                        บันทึก
                      </Button>
                    </Tooltip> */}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
            {/* ----- */}
          </Col>
        </Row>
        <br />
        {/* --------------------------------- */}
        <Modal
          title="ยืนยันรหัสผ่าน"
          visible={isModalVisible}
          onOk={Sendconfirm_grouping}
          onCancel={() => {
            setIsModalVisible(false), setPassword();
          }}
          okButtonProps={{
            disabled: !password,
          }}
          okText="ยืนยัน"
          cancelText="ยกเลิก"
          width={250}
        >
          <Input.Password
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
          {/* <Input value={password} onChange={(e) => setPassword(e.target.value)} /> */}
        </Modal>
        {/* ------------------------ */}
        {/* modal TransBlood */}
        <Modal
          width={1200}
          style={{ marginTop: "-90px" }}
          footer={false}
          title="จ่ายเลือด"
          visible={isModalTransBlood}
          onOk={handleOkTransBlood}
          onCancel={handleCancelTransBlood}
        >
          <Patient_trans_blood
            handleCancelTransBlood={handleCancelTransBlood}
            orderNumber={Data_BRQ[0]?.order_number}
          />
        </Modal>

        {/* --------------------------------- */}
        <Modal
          title="ยืนยันรหัสผ่าน"
          visible={isModalsaveall}
          onOk={Send_SAVEALL}
          onCancel={() => {
            setIsModalsaveall(false), setPassword();
          }}
          okButtonProps={{
            disabled: !password,
          }}
          okText="ยืนยัน"
          cancelText="ยกเลิก"
          width={250}
        >
          <Input.Password
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
        </Modal>
        {/* ------------------------ */}
        {/* --------------confirm crosss------------------- */}
        <Modal
          title="ยืนยันรหัสผ่าน"
          visible={isModalconfirm_cross}
          onOk={send_cross}
          onCancel={() => {
            setIsModalconfirm_cross(false), setPassword();
          }}
          okButtonProps={{
            disabled: !password,
          }}
          okText="ยืนยัน"
          cancelText="ยกเลิก"
          width={250}
        >
          <Input.Password
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
        </Modal>
        {/* ------------------------ */}
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
                      onSearch={onSearch}
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

        {/* -- */}
          {/* modal ReactBlood */}
          <Modal
          width={1400}
          style={{ marginTop: "-90px" }}
          footer={false}
          title="บันทึกแพ้เลือด"
          visible={isModalReactBlood}
          onOk={handleOkReactBlood}
          onCancel={handleCancelReactBlood}
        >
          <Patient_add_reaction
            orderNumber={Data_BRQ[0]?.order_number}
            hn = {Data_BRQ[0]?.hn}
          />
        </Modal>
        
      </div>
    </Spin>
  );
};
export default Patent_blood_request_blooddetil;
