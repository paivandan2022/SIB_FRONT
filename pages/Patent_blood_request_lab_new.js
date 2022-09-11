import {
  CloseCircleOutlined,
  EditFilled,
  EyeInvisibleOutlined,
  EyeTwoTone,
  RetweetOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { MdOutlineAddBox, MdOutlineAddToPhotos } from "react-icons/md";

import {
  Avatar,
  Button,
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
  Tooltip,
  Typography,
} from "antd";
import th_TH from "antd/lib/date-picker/locale/th_TH";
import moment from "moment";
import "moment/locale/th";
import { BsDropletHalf, BsXCircleFill } from "react-icons/bs";
import { FcOk, FcProcess } from "react-icons/fc";
import env from "../env.json";

import Head from "next/head";
import {
  Layout,
  Modal_cross,
  Modal_type_andScreen,
  Patient_blood_edit_modal,
} from "../components";
import api from "../lib/api";
import Patient_trans_blood from "./Patient_trans_blood";

import React, { useEffect, useState } from "react";

const { Option } = Select;
const { TextArea } = Input;
const { Text } = Typography;
const { Column, ColumnGroup } = Table;
const { TabPane } = Tabs;

const Patent_blood_request_lab_new = ({ id }) => {
  const [frm_searchdata] = Form.useForm();
  const [frmImsearchdetil_blood] = Form.useForm();
  const [patient_data] = Form.useForm();
  const [frm_type_screen] = Form.useForm();
  const [frm_Crossmatch] = Form.useForm();
  const [frm_labcode_modal] = Form.useForm();
  const [confirm_sendgroup_cross] = Form.useForm();
  const [frmblood_request] = Form.useForm();
  const [frm_patientNote] = Form.useForm();

  const [placement, SetPlacement] = React.useState("bottomLeft");
  const [loading, setLoading] = useState(false);

  const [Datafrom_ungroup, setDatafrom_ungroup] = useState();
  const [isModalPassword_munti, setisModalPassword_munti] = useState(false);
  const [crosspass, setcrosspass] = useState(false);
  const [Modal_stack_typescreen, setModal_stack_typescreen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalsaveall_crossmatch, setmodalsaveall_crossmatch] = useState(false);
  const [GR_Alrit, setGR_Alrit] = useState(false);
  const [modaltyp_sc, setmodaltyp_sc] = useState(false);
  const [modal_cross_show, setmodal_cross_show] = useState(false);
  const [modal_Save_XMstatus, setmodal_Save_XMstatus] = useState(false);
  const [isModalconfirm_cross, setIsModalconfirm_cross] = useState(false);
  const [Modalcon_typeSc, SetModalcon_typeSc] = useState(false);
  const [ModalHis, SetModalHis] = useState(false);
  const [isModalTransBlood, setIsModalTransBlood] = useState(false);
  const [modal_ptNote, setmodal_ptNote] = useState(false);

  const [password, setPassword] = useState();
  const [password_saveallcross, setPassword_saveallcross] = useState();
  const [pass_XM, setPass_XM] = useState();

  const [Showpatient, setShowpatient] = useState();
  const [Showpatientmodal, setShowpatientmodal] = useState([]);
  const [choice_show, setchoice_show] = useState();
  const [data_ptNote, setdata_ptNote] = useState();

  const [check_data, setcheck_data] = useState(0);
  const [check_dataclick, setcheck_dataclick] = useState(0);
  const [check_datacrossclick, setcheck_dataccrosslick] = useState(0);

  const [isModalVisible_Search, setIsModalVisible_Search] = useState(false);

  const [DEP_show, setDEP_show] = useState();
  const [hos_station, sethos_station] = useState();
  const [Bloodneed, setBloodneed] = useState();
  const [blood_name, setBloodName] = useState();
  const [ST_RE, setST_RE] = useState();
  const [WARD, setWARD] = useState();
  const [SetChexkonrow, setSetChexkonrow] = useState();
  const [Data_record, setData_record] = useState([]);
  const [Data_finger, setData_finger] = useState([]);
  const [Datafhenotype, setDatafhenotype] = useState([]);
  const [bloood_req, setbloood_req] = useState([]);
  const [select_bloood_req_TB, setselect_bloood_req_TB] = useState([]);
  const [check_dis, setcheck_dis] = useState(0);
  const [showLabCode_table, setshowLabCode_table] = useState([]);
  const [pt_note_table, setpt_note_table] = useState([]);
  const [doctor, setDoctor] = useState();
  // const [passwordSendcrossmatchs, setPasswordSendcrossmatchs] = useState();
  const [passwordSendcrossmatchs_ungroup, setPasswordSendcrossmatchs_ungroup] =
    useState();
  const [Staff_typeSC, setStaff_typeSC] = useState();
  const [Staff_cross, setStaff_cross] = useState();
  const [Checkpadding_cross, setCheckpadding_cross] = useState("0");
  const [use_ativeTable, setuse_ativeTable] = useState();
  const [patientNote, setPatientNote] = useState();
  const [PtGrouping, setPtGrouping] = useState();
  const [PtAntibody, setPtAntibody] = useState();
  const [PtDat, setPtDat] = useState();
  const [receiveBloodList, setReceiveBloodList] = useState();
  const [reactionBloodList, setReactionBloodList] = useState();

  const [DataResltATG, setDataResltATG] = useState([]);

  // ------------------EARN---------------------

  // const [testParams, setTestParams] = useState();
  const [isModalEdit, setIsModalEdit] = useState(false);

  // console.log("12",isModalEdit);
  const [orderNum, setOrderNum] = useState();
  const showModalEdit = (value) => {
    setOrderNum(value);
    // console.log("=>>>>", orderNum);
    setIsModalEdit(true);
    losefocus();
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

  const showModalTransBlood = () => {
    setIsModalTransBlood(true);
  };

  const handleOkTransBlood = () => {
    setIsModalTransBlood(false);
  };

  const handleCancelTransBlood = () => {
    setIsModalTransBlood(false);
  };

  const showModal_ptN = () => {
    setmodal_ptNote(true);
    setTimeout(() => {
      document.getElementById("passcross_ptnote").focus();
    }, 100);
  };

  const okshowModal_ptN = () => {
    setmodal_ptNote(false);
  };

  const cancelshowModal_ptN = () => {
    setmodal_ptNote(false);
  };
  // -------------------------------------------------

  const LoadDoctor = async () => {
    const result6 = await api.get("/doctor");
    setDoctor(result6.data[0]);
  };
  const LoadWARD = async () => {
    const result = await api.get("/WARD_API");
    setWARD(result.data[0]);
  };
  const LoadST_RE = async () => {
    const result = await api.get("/ST_RE_API");
    setST_RE(result.data[0]);
  };
  const LoadBloodName = async () => {
    const result = await api.get("/BloodGR_pc");
    setBloodName(result.data[0]);
  };
  const LoadBloodneed = async () => {
    const result = await api.get("/Bloodneed_API");
    setBloodneed(result.data[0]);
  };
  const LoadHos = async () => {
    const result = await api.get("/Hospitals");
    sethos_station(result.data[0]);
  };
  const LoadDEP = async () => {
    const result = await api.get("/BB_kskdepartment");
    setDEP_show(result.data[0]);
  };
  const Fetch_choice_show = async () => {
    const result = await api.get("/bb_choice_patient_reqSearch");
    setchoice_show(result.data[0]);
    // console.log("result.data[0]", result.data);
  };
  const PatientNote_choice = async (value) => {
    const result = await api.get("/patient_note_api_all");
    setdata_ptNote(result.data[0]);
    const resultx = await api.post("/patient_note_api", {
      // params: {
      // hn: Data_record.hn,
      hn: value,
      // },
    });

    // console.log("ดู", resultx.data[0]);
    setpt_note_table(resultx.data[0]);
  };
  const showModal_Search = async () => {
    setIsModalVisible_Search(true);
    setShowpatientmodal([]);
    await LoadDEP();
    await LoadHos();
    await LoadBloodneed();
    await LoadBloodName();
    await LoadST_RE();

    frmImsearchdetil_blood.resetFields();
  };

  const OpenModal_HIS = async () => {
    SetModalHis(true);
  };

  const CloseModal_HIS = () => {
    SetModalHis(false);
  };
  const showModal_firm_Tyoescreen = () => {
    SetModalcon_typeSc(true);
    setTimeout(() => {
      document.getElementById("passcon_type_id").focus();
    }, 100);
  };
  const modal_save_crossstatus = async () => {
    setTimeout(() => {
      document.getElementById("showModal_idcrossmatch").blur();
    }, 10);
    setmodal_Save_XMstatus(true);
    setTimeout(() => {
      document.getElementById("passcross_xm").focus();
    }, 100);
    setTimeout(() => {
      document.getElementById("showModal_idcrossmatch").blur();
    }, 10);
  };

  const type_munitpass_modal = async () => {
    setisModalPassword_munti(true);
    setTimeout(() => {
      document.getElementById("pass").focus();
    }, 100);
  };

  const handleCanceGR_Alritl = () => {
    setGR_Alrit(false);
    let x = dataSourceCross.length - 1;
    setTimeout(() => {
      document.getElementById(["bl_unit_no", x]).focus();
    }, 200);
    frm_Crossmatch.resetFields();
  };
  const ward_next = async () => {
    document.getElementById("Note").focus();
  };

  const handleCancel = async () => {
    setIsModalVisible_Search(false);
    setuse_ativeTable(1);
  };
  const showModal_showall_tysc = async () => {
    setmodaltyp_sc(true);
  };
  const showModal_showall_tysc_onCancel = async () => {
    setmodaltyp_sc(false);
    await ClickRow(Data_record);
  };
  const showModal_showall_crossmatching = async () => {
    setmodal_cross_show(true);
  };
  const showModal_showall_crossmatching_onCancel = async () => {
    setmodal_cross_show(false);

    await ClickRow(Data_record);
  };
  const save_petient_note = async () => {
    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });
    const staff = resultLogin.data.user_name;
    setPassword();
    console.log("resultLogin.data.id_user", resultLogin.data.id_user);
    try {
      if (resultLogin.data.id_user) {
        const formData_PG = frm_patientNote.getFieldsValue();

        console.log("formData_PG", formData_PG);
        const result = await api.post(`/insert_pt_note_api`, {
          ...formData_PG,
          staff: staff,
          hn: Data_record.hn,
        });
        Modal.success({
          title: "บันทึกสำเร็จ",
        });
        setmodal_ptNote(false);
        await PatientNote_choice(Data_record.hn);
        frm_patientNote.resetFields();
      } else {
        Modal.error({
          title: "Password invalid",
          content: "กรุณากรอกรหัสผ่านให้ถูกต้อง!!",
        });
        setmodal_ptNote(false);
      }
    } catch (error) {
      Modal.error({ title: "Error", content: "!!!!!!!!!!!!!!!!!!!" });
      setmodal_ptNote(false);
    }
  };
  const Cross_save_status = async () => {
    const resultLogin = await api.post(`/Confirm_password`, {
      password: pass_XM,
    });
    setPass_XM();
    const staff = resultLogin.data.user_name;

    if (resultLogin.data.id_user) {
      const result = await api.get("/up_status_cross_api", {
        params: {
          order_number: Data_record.order_number,
          // staff: staff,
        },
      });

      Modal.success({
        title: "บันทึกสำเร็จ",

        onOk: (close) => {
          close();
          setmodal_Save_XMstatus(false);
        },
      });
      await ClickRow(Data_record);
    } else {
      Modal.error({
        title: "Password invalid",
        content: "กรุณากรอกรหัสผ่านให้ถูกต้อง!!",
        onOk: (close) => {
          close();
          setmodal_Save_XMstatus(false);
        },
      });
      await ClickRow(Data_record);
    }
  };
  const showModal_stackt_ysc = async () => {
    setTimeout(() => {
      document.getElementById("showModal_stack_tysc_id").blur();
    }, 10);

    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });

    const staff = resultLogin.data.user_name;
    setPassword();
    setStaff_typeSC(staff);
    if (resultLogin.data.id_user) {
      setModal_stack_typescreen(true);

      const result = await api.get("/lab_order_api", {
        params: {
          order_number: Data_record.order_number,
        },
      });
      let datas = result.data;
      const data = datas.map((item) => item.items_code);
      const data_codetable = showLabCode_table.map((item) => item.items_code);
      const dataUpdate = {};
      for (let i = 0; i <= data.length; i++) {
        dataUpdate[data[i]] = {
          checkbox_labcode: true,
        };
      }
      frm_labcode_modal.setFieldsValue({
        ...dataUpdate,
      });
      setIsModalVisible(false);
    } else {
      Modal.error({
        title: "Password invalid",
        content: "กรุณากรอกรหัสผ่านให้ถูกต้อง!!",
        onOk: (close) => {
          close();
          setIsModalVisible(false);
          setStaff_typeSC();
        },
      });
      await ClickRow(Data_record);
    }
    setTimeout(() => {
      document.getElementById("showModal_stack_tysc_id").blur();
    }, 10);
  };

  const showModal_stackt_ysc_nopass = async () => {
    setModal_stack_typescreen(true);
    setTimeout(() => {
      document.getElementById("showModal_stack_tysc_id").blur();
    }, 10);

    const result = await api.get("/lab_order_api", {
      params: {
        order_number: Data_record.order_number,
      },
    });
    let datas = result.data;
    const data = datas.map((item) => item.items_code);
    const data_codetable = showLabCode_table.map((item) => item.items_code);
    const dataUpdate = {};
    for (let i = 0; i <= data.length; i++) {
      dataUpdate[data[i]] = {
        checkbox_labcode: true,
      };
    }
    frm_labcode_modal.setFieldsValue({
      ...dataUpdate,
    });
    document.getElementById("showModal_stack_tysc_id").blur();
  };
  const showModal_stack_tysc_close = async () => {
    setModal_stack_typescreen(false);
    frm_labcode_modal.resetFields();
    await close();
  };
  const close = async () => {
    setTimeout(() => {
      document.getElementById("showModal_stack_tysc_id").blur();
    }, 200);
  };
  // useEffect(async () => {
  //   if (SETFC == "1") {
  //     for (let i = 1; i < dataSource.length; i++) {
  //       await send_Type(i);
  //     }
  //
  //   }
  //   if (CROSS == "1") {
  //     for (let i = 0; i < dataSourceCross.length; i++) {
  //       await send_cross(i);
  //     }
  //     setCROSS(0);
  //   }
  // });
  useEffect(async () => {
    setuse_ativeTable(1);
    setCheckpadding_cross("0");
    await Fetch_choice_show();
    await show_dataLabcode_inmodal();
    await LoadDoctor();
    await LoadWARD();
  }, []);

  const [dataSource, setDataSource] = useState([]);
  const [dataSourceCross, setdataSourceCross] = useState([]);

  const show_dataLabcode_inmodal = async () => {
    const result = await api.get("/show_labcodeAll", {});
    setshowLabCode_table(result.data);
  };
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
      title: "Received Date.",
      dataIndex: "trans_date_time_format",
      key: "trans_date_time_format",
      align: "center",
    },
  ];

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

  const columns_labcode = [
    {
      title: "#",
      // dataIndex:"items_name",
      // align: "center",
      width: "1.7%",
      render: (text, record, index) => {
        return (
          <div>
            <Form.Item
              label=""
              name={[record.items_code, "checkbox_labcode"]}
              style={{
                marginTop: "-9px",
                marginBottom: "-14px",
                marginLeft: "0.5px",
              }}
              valuePropName="checked"
            >
              <Checkbox
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
          </div>
        );
      },
    },
    {
      title: "Lab",
      dataIndex: "items_code",
      // align: "center",
      width: "4%",
    },
    {
      title: "Lab Name",
      dataIndex: "items_name",
      // align: "center",
      width: "20%",
    },
  ];

  const ClickRow = async (record) => {
    setCheckpadding_cross("0");
    // console.log("record", record);

    setSetChexkonrow(record.order_number);
    await PatientNote_choice(record.hn);
    const results = await api.get("/Search_bloodDetil_newlab", {
      params: {
        Type_choice: "req",
        Search_value: record.order_number,
        CheckBox_search: "true",
      },
    });

    const params = {
      hn: record.hn,
    };
    const result_HIS = await api.get("/hn_user", { params });
    const pt_gr = await api.get("/hn_grouping", { params });
    const pt_abs = await api.get("/hn_antibody", { params });
    const pt_dat = await api.get("/hn_dat", { params });
    const reqBloodHis = await api.get("/request_blood_his", { params });
    const recBloodHis = await api.get("/receive_blood_his", { params });
    const patientNote = await api.get("/patient_note", { params });
    const recBloodList = await api.get("/receive_blood_list", { params });
    const reactBloodList = await api.get("/patient_react_list", { params });

    // console.log("มาๆๆๆ", result_HIS.data[0]);

    frmblood_request.setFieldsValue({
      hn: result_HIS.data[0]?.hn,
      pname: result_HIS.data[0]?.pname,
      fname: result_HIS.data[0]?.fname,
      lname: result_HIS.data[0]?.lname,
      dob: moment(result_HIS.data[0].bd_eng),
      sex: result_HIS.data[0]?.sex,
      abo_group: result_HIS.data[0]?.bloodgrp,
      rhname: result_HIS.data[0]?.bloodrh,
      age: frmblood_request.strAge,
      request_datetime_format: reqBloodHis.data[0]?.request_datetime_format,
      receive_datetime_format: recBloodHis.data[0]?.receive_datetime_format,
    });
    //patientGR
    if (pt_gr.data === null || pt_gr.data === "" || pt_gr.data === undefined) {
      setPtGrouping([]);
    } else {
      setPtGrouping(pt_gr.data);
    }
    //patientabs
    if (
      pt_abs.data === null ||
      pt_abs.data === "" ||
      pt_abs.data === undefined
    ) {
      setPtAntibody([]);
    } else {
      setPtAntibody(pt_abs.data);
    }
    //patientdat
    if (
      pt_dat.data === null ||
      pt_dat.data === "" ||
      pt_dat.data === undefined
    ) {
      setPtDat([]);
    } else {
      setPtDat(pt_dat.data);
    }
    //patientNote
    if (
      patientNote.data === null ||
      patientNote.data === "" ||
      patientNote.data === undefined
    ) {
      setPatientNote([]);
    } else {
      setPatientNote(patientNote.data);
    }
    // recBloodList
    if (
      recBloodList.data === null ||
      recBloodList.data === "" ||
      recBloodList.data === undefined
    ) {
      setReceiveBloodList([]);
    } else {
      setReceiveBloodList(recBloodList.data);
    }
    //reactBloodList
    if (
      reactBloodList.data === null ||
      reactBloodList.data === "" ||
      reactBloodList.data === undefined
    ) {
      setReactionBloodList([]);
    }
    setData_record(results.data[0]);
    patient_data.setFieldsValue({
      note: results.data[0].note,
    });
    const result_lab_or = await api.get("/lab_order_api", {
      params: {
        order_number: record.order_number,
      },
    });

    // setDataSource(result_lab_or.data);
    let dataLab_or = [];
    for (let i = 0; i < result_lab_or.data.length; i++) {
      setCount(i + 1);
      dataLab_or.push({
        key: i,
        items_code: result_lab_or.data[i].items_code,
        items_name: result_lab_or.data[i].items_name,
        lab_result: result_lab_or.data[i].lab_result,
        create_staff: result_lab_or.data[i].create_staff,
      });
    }
    setDataSource(dataLab_or);
    if (
      dataLab_or == "" ||
      dataLab_or == null ||
      dataLab_or == undefined ||
      dataLab_or == []
    ) {
      setcheck_dis(1);
      setcheck_dataclick(0);
    } else {
      setcheck_dataclick(1);
      setcheck_dis(1);
    }

    const result = await api.get("/finger", {
      params: {
        hn: record.hn,
      },
    });
    const result_ph = await api.get("/Phenotype_API", {
      params: {
        hn: record.hn,
      },
    });
    const result_cross_bloodreq = await api.get("/Blood_Request_Crossmatch", {
      params: {
        order_number: record.order_number,
      },
    });

    setbloood_req(result_cross_bloodreq.data[0]);
    setselect_bloood_req_TB(
      result_cross_bloodreq.data[0].map((item) => item.type_name)
    );

    const result_C = await api.get("/Crossmatch_TB_API", {
      params: {
        TB: record.order_number,
      },
    });
    let data_cross = [];
    for (let i = 0; i < result_C.data[0].length; i++) {
      if (result_C.data[0][i].xm_status_name == "Pedding") {
        setCheckpadding_cross("1");
      }
      setCount(i + 1);
      data_cross.push({
        key: i,
        bl_unit_no: result_C.data[0][i].bl_unit_no,
        s_name: result_C.data[0][i].s_name,
        GR: result_C.data[0][i].GR,
        exp: result_C.data[0][i].exp,
        xm_result: result_C.data[0][i].xm_result,
        xm_confirm: result_C.data[0][i].xm_confirm,
        xm_status_name: result_C.data[0][i].xm_status_name,
        xm_staft: result_C.data[0][i].xm_staft,
      });
    }
    setdataSourceCross(data_cross);
    if (
      data_cross == "" ||
      data_cross == null ||
      data_cross == undefined ||
      data_cross == []
    ) {
      setcheck_dataccrosslick(0);
    } else {
      setcheck_dataccrosslick(1);
    }

    if (
      result_ph.data == [] ||
      result_ph.data == "" ||
      result_ph.data == null ||
      result_ph.data == undefined
    ) {
      setDatafhenotype([]);
    } else {
      setDatafhenotype(result_ph?.data[0].result);

      const items = [result_ph?.data[0].result];
      let data;
      let dataNew = [];
      items.forEach((item) => {
        data = item.split(", ");
      });

      data.forEach((item) => {
        dataNew.push({
          value: item,
          color:
            item.split("").filter((item2) => item2 == "+").length > 0
              ? "green"
              : "red",

          num: data.length,
        });
        setDataResltATG(dataNew);
      });
    }

    if (
      result.data == [] ||
      result.data == "" ||
      result.data == null ||
      result.data == undefined
    ) {
      setData_finger([]);
    } else {
      setData_finger(result.data[0]);
    }
  };
  const onFinishSearch = async (value) => {
    const frmData = frmImsearchdetil_blood.getFieldsValue();

    if (frmData.HN_search == "" && frmData.blood_request_number_search == "") {
    } else {
      try {
        const result = await api.get("/Search_bloodDetil", {
          params: {
            ...frmData,
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
          },
        });
        setShowpatientmodal(result.data);
      } catch (error) {
        Modal.error({ title: "Error" });
      }
    }
  };
  //-----------------------------------//
  const Refresh = async () => {
    frmImsearchdetil_blood.resetFields();

    await onFinishSearch(frmImsearchdetil_blood.resetFields());
    setShowpatientmodal([]);
  };

  const Refresh_selectsearch = async () => {
    setLoading(false);
    setTimeout(() => {
      document.getElementById("Refresh_selectsearch_id").blur();
    }, 100);
    frm_searchdata.resetFields();
    setcheck_dataclick(0);
    setcheck_dataccrosslick(0);
    setCheckpadding_cross("0");
    setcheck_data(0);
    setShowpatient();

    setSetChexkonrow();
    setData_record([]);
    setDatafhenotype([]);
    setData_finger([]);
    setbloood_req([]);
    setdataSourceCross([]);
    setDataSource([]);
    setDataResltATG([]);
    setTimeout(() => {
      document.getElementById("Refresh_selectsearch_id").blur();
    }, 100);
  };
  const columns_madal_Search = [
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

  const GetPTRequestformmodal = async (value) => {
    setLoading(true);

    setIsModalVisible_Search(false);
    frm_searchdata.setFieldsValue({
      Request_blood_search: value,
      Search_select: "req",
    });
    const frmData = frm_searchdata.getFieldValue();
    console.log("frmData", frmData);
    const result = await api.get("/Search_bloodDetil_newlab", {
      params: {
        Type_choice: "req",
        Search_value: frmData.Request_blood_search,
        CheckBox_search: "true",
      },
    });
    if (result.data == "" || result.data == null || result.data == undefined) {
      setcheck_data(0);
      setShowpatient();
      Modal.warning({
        title: "ไม่พบข้อมูล",
        onOk: (close) => {
          close();
          document.getElementById("Request_blood_search").focus();
        },
      });

      frm_searchdata.setFieldsValue({
        Request_blood_search: "",
      });
    } else {
      setShowpatient(result.data);
      setcheck_data(1);
      setuse_ativeTable(result.data[0].order_number);
      setSetChexkonrow(result.data[0].order_number);
      await ClickRow(result.data[0]);
    }
    setLoading(false);
  };

  const GetPTRequest = async (value) => {
    setuse_ativeTable(1);
    setcheck_dataclick(0);
    setcheck_dataccrosslick(0);
    setCheckpadding_cross("0");
    setcheck_data(0);
    setShowpatient();

    setSetChexkonrow();
    setData_record([]);
    setDatafhenotype([]);
    setData_finger([]);
    setbloood_req([]);
    setdataSourceCross([]);
    setDataSource([]);
    setLoading(true);

    const frmData = frm_searchdata.getFieldValue();

    const result = await api.get("/Search_bloodDetil_newlab", {
      params: {
        Type_choice: frmData.Search_select,
        Search_value: frmData.Request_blood_search,
        CheckBox_search: frmData.CheckBox_search,
        // CheckBox_search: frmData.CheckBox_search == true ? "true" : "false",
        Request_date_blood_search: moment(frmData.Request_date_blood_search)
          .subtract(543, "year")
          .format("YYYY-MM-DD"),
        Request_date_blood_to_search: moment(
          frmData.Request_date_blood_to_search
        )
          .subtract(543, "year")
          .format("YYYY-MM-DD"),
      },
    });

    if (
      result.data == "" ||
      result.data == [] ||
      result.data == null ||
      result.data == undefined
    ) {
      setcheck_data(0);
      setShowpatient();
      setuse_ativeTable(1);
      setLoading(false);
    } else {
      setcheck_data(1);
      setuse_ativeTable(1);
      let keyCode = [];
      let A = 19;
      for (let i = 0; i < result.data.length; i++) {
        keyCode.push({
          key: i,
          order_number: result.data[i].order_number,
          hn: result.data[i].hn,
          patientname: result.data[i].patientname,
        });
      }
      setShowpatient(keyCode);
      setLoading(false);
    }
  };
  const Lab_request = [
    {
      title: "Req No.",
      dataIndex: "order_number",
      key: "order_number",
      align: "center",
      width: "15%",
    },
    {
      title: "HN",
      dataIndex: "hn",
      key: "hn",
      align: "center",
      width: "15%",
    },
    {
      title: (
        <Row justify="start">
          <b>ชื่อ-สกุล</b>
        </Row>
      ),
      dataIndex: "patientname",
      key: "patientname",
      width: "50%",
      render: (text, record) => {
        return (
          <div>
            <span>&nbsp;&nbsp;{text}</span>
          </div>
        );
      },
    },
  ];
  const columns_ptNote = [
    {
      title: "ลำดับ",
      dataIndex: "number",
      key: "number",
      align: "center",
      width: "1%",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "วันที่",
      dataIndex: "datetime",
      key: "datetime",
      align: "center",
      width: "2%",
    },
    {
      title: "ผู้บันทึก",
      dataIndex: "note_staff",
      key: "note_staff",
      align: "center",
      width: "1%",
    },
    {
      title: "รายการ",
      dataIndex: "note_detail",
      key: "note_detail",
      align: "center",
      width: "15%",
      render: (text, record) => {
        return (
          <div>
            <span style={{ float: "left" }}>&nbsp;&nbsp;{text}</span>
          </div>
        );
      },
    },
    {
      title: "",
      dataIndex: "operation",
      width: "1%",
      align: "center",
      render: (_, record, index) =>
        data_ptNote.length >= 1 ? (
          <Popconfirm
            title="คุณต้องการบข้อมูลใช่หรือไม่ ?"
            onConfirm={() => Delete_ptNote(record.key, index)}
          >
            <CloseCircleOutlined
              className="BTN-DELETE"
              style={{ fontSize: "12px", color: "red" }}
            />
          </Popconfirm>
        ) : null,
    },
  ];
  const bloood_request = [
    {
      title: "ประเภท",
      dataIndex: "type_name",
      key: "type_name",
      align: "center",
      width: "25%",
    },
    {
      title: "จำนวน",
      dataIndex: "req_num",
      key: "req_num",
      align: "center",
      width: "15%",
    },
    {
      title: "XM",
      dataIndex: "xm_num",
      key: "xm_num",
      width: "15%",
      align: "center",
    },
    {
      title: "จ่าย",
      dataIndex: "trns_num",
      key: "trns_num",
      width: "15%",
      align: "center",
    },
  ];
  const handleAdd = async () => {
    if (dataSource.length == "0") {
      let x = dataSource.length;
      setcheck_dataclick(1);
      setcheck_dis(1);

      const newData = {
        key: count,
        items_code: "",
      };
      setDataSource([...dataSource, newData]);
      setCount(count + 1);
      setTimeout(() => {
        document.getElementById(["items_code", x]).focus();
      }, 200);
    } else {
      const A = dataSource.length - 1;
      const B = dataSource.length;
      let key = dataSource;
      let max = key[0];
      for (let i = 0; i < dataSource.length; i++) {
        if (dataSource[i].key == dataSource[A].key) {
          if (
            dataSource[i].items_name == "" ||
            dataSource[i].items_name == [] ||
            dataSource[i].items_name == null ||
            dataSource[i].items_name == undefined
          ) {
            let C = dataSource.length - 1;
            Modal.warning({
              title: "กรุณาระบุข้อมูลให้ครบถ้วน",
              onOk: (close) => {
                close();
                setTimeout(() => {
                  document.getElementById(["items_code", C]).focus();
                }, 200);
              },
            });
          } else {
            setcheck_dataccrosslick(1);
            let x = dataSource.length;

            const newData = {
              key: B,
              items_code: "",
            };

            setDataSource([...dataSource, newData]);
            setTimeout(() => {
              document.getElementById(["items_code", x]).focus();
            }, 200);
          }
        }
      }
    }
  };

  const enteradd = async () => {
    const result_lab_or = await api.get("/lab_order_api", {
      params: {
        order_number: Data_record.order_number,
      },
    });
    if (result_lab_or.data.length > 0) {
      const newData = {
        key: result_lab_or.data.length,
        items_code: "",
      };
      let dataLab_or = [];
      for (let i = 0; i < result_lab_or.data.length; i++) {
        setCount(i + 1);
        dataLab_or.push({
          key: i,
          items_code: result_lab_or.data[i].items_code,
          items_name: result_lab_or.data[i].items_name,
          lab_result: result_lab_or.data[i].lab_result,
          create_staff: result_lab_or.data[i].create_staff,
        });
      }
      setcheck_dataclick(1);
      setcheck_dis(1);
      setDataSource(dataLab_or);
      setDataSource([...dataLab_or, newData]);
      setTimeout(() => {
        document.getElementById(["items_code", dataLab_or.length]).focus();
      }, 200);
    }
  };
  const handleAddCross = async (value) => {
    frm_Crossmatch.resetFields();
    if (dataSourceCross.length == "0") {
      let x = dataSourceCross.length;

      const newData = {
        key: count,
        bl_unit_no: "",
      };
      setdataSourceCross([...dataSourceCross, newData]);
      setCount(count + 1);
      setcheck_dataccrosslick(1);

      setTimeout(() => {
        document.getElementById(["bl_unit_no", x]).focus();
      }, 200);
    } else {
      const A = dataSourceCross.length - 1;
      const B = dataSourceCross.length;
      let key = dataSourceCross;
      let max = key[0];
      for (let i = 0; i < dataSourceCross.length; i++) {
        if (dataSourceCross[i].key == dataSourceCross[A].key) {
          if (
            dataSourceCross[i].GR == "" ||
            dataSourceCross[i].GR == [] ||
            dataSourceCross[i].GR == null ||
            dataSourceCross[i].GR == undefined
          ) {
            let C = dataSourceCross.length - 1;
            Modal.warning({
              title: "กรุณาระบุข้อมูลให้ครบถ้วน",
              onOk: (close) => {
                close();
                setTimeout(() => {
                  document.getElementById(["bl_unit_no", C]).focus();
                }, 200);
              },
            });
          } else {
            let x = dataSourceCross.length;

            const newData = {
              key: B,
              bl_unit_no: "",
            };
            setcheck_dataccrosslick(1);
            setdataSourceCross([...dataSourceCross, newData]);
            setTimeout(() => {
              document.getElementById(["bl_unit_no", x]).focus();
            }, 200);
          }
        }
      }
    }
  };

  const focus_typeblood = async () => {
    let x = dataSourceCross.length - 1;
    setTimeout(() => {
      document.getElementById(["s_name", x]).focus();
    }, 200);
  };
  const send_bloodno_Crossmatch = async () => {
    const formData = frm_Crossmatch.getFieldsValue();
    let datiitem_bloodNO = "";
    if (formData.bl_unit_no != null) {
      datiitem_bloodNO = formData.bl_unit_no.filter((item) => item !== null);
    } else {
      datiitem_bloodNO[0] = "";
    }
    let datiitem_sName = "";
    if (formData.s_name != null) {
      datiitem_sName = formData.s_name.filter((item) => item !== null);
    } else {
      datiitem_sName[0] = "";
    }
    const result = await api.post(`/Search_bloodNO`, {
      Unit_no_csm: datiitem_bloodNO[0],
      blood_status_search: datiitem_sName[0],
    });
    console.log(
      "results.data[0]results.data[0]results.data[0]0",
      result.data[0]
    );
    const Result_csm = await api.get("/Data_bloodrequesresult", {
      params: {
        NUM_BT: Data_record.order_number,
      },
    });
    const resultcross = await api.get("/Crossmatch_API", {
      params: {
        TB: Data_record.order_number,
        Unit_no_csm: datiitem_bloodNO[0],
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
          let x = dataSourceCross.length - 1;
          setTimeout(() => {
            document.getElementById(["bl_unit_no", x]).focus();
          }, 200);
          frm_Crossmatch.resetFields();
        },
      });
    } else {
      if (result?.data[0].component_name == datiitem_sName[0]) {
        if (
          resultcross?.data[0] == "" ||
          resultcross?.data[0] == null ||
          resultcross?.data[0] == undefined ||
          resultcross?.data[0][0].s_name != datiitem_sName[0]
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
                let x = dataSourceCross.length - 1;
                setTimeout(() => {
                  document.getElementById(["bl_unit_no", x]).focus();
                }, 200);
                frm_Crossmatch.resetFields();
              },
            });
          } else {
            if (result?.data[0].status == 1) {
              if (result?.data[0].component_type == 1) {
                if (Result_csm?.data[0][0].blood_gr == result?.data[0].bl_gr) {
                  if (
                    Result_csm?.data[0][0].blood_rh == result?.data[0].bl_rh
                  ) {
                    await save_crossmatch();
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
                                หมู่เลือดคนไข้ คือ{" "}
                                <b>
                                  {Data_record.bloodgrp}
                                  {Data_record.bloodrh}
                                </b>
                              </p>
                            </Row>
                            <Row style={{ marginTop: "-20px" }}>
                              <p style={{ fontSize: "18px" }}>
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
                        let x = dataSourceCross.length - 1;
                        setTimeout(() => {
                          document.getElementById(["bl_unit_no", x]).focus();
                        }, 200);
                        frm_Crossmatch.resetFields();
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
                              หมู่เลือดคนไข้ คือ{" "}
                              <b>
                                {Data_record.bloodgrp}
                                {Data_record.bloodrh}
                              </b>
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
                      let x = dataSourceCross.length - 1;
                      setTimeout(() => {
                        document.getElementById(["bl_unit_no", x]).focus();
                      }, 200);
                      frm_Crossmatch.resetFields();
                    },
                    onOk: (close) => {
                      close();
                      setGR_Alrit(true);
                    },
                  });
                }
              } else if (result?.data[0].component_type == 2) {
                if (Result_csm?.data[0][0].blood_gr == result?.data[0].bl_gr) {
                  await save_crossmatch();
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
                              หมู่เลือดคนไข้ คือ{" "}
                              <b>
                                {Data_record.bloodgrp}
                                {Data_record.bloodrh}
                              </b>
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
                            </b>
                          </Row>
                        </Col>
                      </Row>
                    ),
                    onCancel: (close) => {
                      close();
                      let x = dataSourceCross.length - 1;
                      setTimeout(() => {
                        document.getElementById(["bl_unit_no", x]).focus();
                      }, 200);
                      frm_Crossmatch.resetFields();
                    },
                    onOk: (close) => {
                      close();
                      setGR_Alrit(true);
                    },
                  });
                }
              } else if (result?.data[0].component_type == 3) {
                if (Result_csm?.data[0][0].blood_gr == result?.data[0].bl_gr) {
                  await save_crossmatch();
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
                              หมู่เลือดคนไข้ คือ{" "}
                              <b>
                                {Data_record.bloodgrp}
                                {Data_record.bloodrh}
                              </b>
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
                      let x = dataSourceCross.length - 1;
                      setTimeout(() => {
                        document.getElementById(["bl_unit_no", x]).focus();
                      }, 200);
                      frm_Crossmatch.resetFields();
                    },
                    onOk: (close) => {
                      close();
                      setGR_Alrit(true);
                    },
                  });
                }
              } else if (result?.data[0].component_type == 4) {
                await save_crossmatch();
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
                  let x = dataSourceCross.length - 1;
                  setTimeout(() => {
                    document.getElementById(["bl_unit_no", x]).focus();
                  }, 200);
                  frm_Crossmatch.resetFields();
                },
              });
            }
          }
        } else if (resultcross?.data[0][0].s_name == datiitem_sName[0]) {
          //  if (resultcross?.data[0].blood_no == datiitem_bloodNO) {
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
                      Type : <b>{result?.data[0].component_name}</b> Group :
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
              let x = dataSourceCross.length - 1;
              setTimeout(() => {
                document.getElementById(["bl_unit_no", x]).focus();
              }, 200);
              frm_Crossmatch.resetFields();
            },
            onCancel: (close) => {
              close();
              let x = dataSourceCross.length - 1;
              setTimeout(() => {
                document.getElementById(["bl_unit_no", x]).focus();
              }, 200);
              frm_Crossmatch.resetFields();
            },
          });
          //  }
        }
      } else {
        Modal.error({
          title: "ERROR!!",
          content: "ไม่พบข้อมูล",
          onOk: (close) => {
            close();
            let x = dataSourceCross.length - 1;
            setTimeout(() => {
              document.getElementById(["bl_unit_no", x]).focus();
            }, 200);
            frm_Crossmatch.resetFields();
          },
        });
      }
    }
  };
  const save_crossmatch = async (value) => {
    const formData = frm_Crossmatch.getFieldsValue();
    let datiitem_bloodNO = "";
    if (formData.bl_unit_no != null) {
      datiitem_bloodNO = formData.bl_unit_no.filter((item) => item !== null);
    } else {
      datiitem_bloodNO[0] = "";
    }
    let datiitem_sName = "";
    if (formData.s_name != null) {
      datiitem_sName = formData.s_name.filter((item) => item !== null);
    } else {
      datiitem_sName[0] = "";
    }
    const resultblood = await api.post(`/Search_bloodNO`, {
      Unit_no_csm: datiitem_bloodNO[0],
      blood_status_search: datiitem_sName[0],
    });

    const result = await api.get(`/insert_crossmatch`, {
      params: {
        order_num: Data_record.order_number,
        id: resultblood?.data[0].id,
        blood_status_search: datiitem_sName[0],
        staff: Staff_cross,
      },
    });
    const result_C = await api.get("/Crossmatch_TB_API", {
      params: {
        TB: Data_record.order_number,
      },
    });
    if (result_C.data.length > 0) {
      const newData = {
        key: result_C.data.length,
        bl_unit_no: "",
      };
      let data_cross = [];
      for (let i = 0; i < result_C.data[0].length; i++) {
        if (result_C.data[0][i].xm_status_name == "Pedding") {
          setCheckpadding_cross("1");
        }
        setCount(i + 1);
        data_cross.push({
          key: i,
          bl_unit_no: result_C.data[0][i].bl_unit_no,
          s_name: result_C.data[0][i].s_name,
          GR: result_C.data[0][i].GR,
          exp: result_C.data[0][i].exp,
          xm_result: result_C.data[0][i].xm_result,
          xm_confirm: result_C.data[0][i].xm_confirm,
          xm_status_name: result_C.data[0][i].xm_status_name,
          xm_staft: result_C.data[0][i].xm_staft,
        });
      }
      setdataSourceCross(data_cross);
      setdataSourceCross([...data_cross, newData]);
      frm_Crossmatch.resetFields();
      setTimeout(() => {
        document.getElementById(["bl_unit_no", data_cross.length]).focus();
      }, 200);
    }
  };
  const save_crossmatch_UN = async (value) => {
    const resultLogin = await api.post(`/Confirm_password`, {
      password: passwordSendcrossmatchs_ungroup,
    });
    const staff_name = resultLogin.data.user_name;

    try {
      if (resultLogin.data.id_user) {
        const formData = frm_Crossmatch.getFieldsValue();
        const formDataUn = confirm_sendgroup_cross.getFieldsValue();
        let datiitem_bloodNO = "";
        if (formData.bl_unit_no != null) {
          datiitem_bloodNO = formData.bl_unit_no.filter(
            (item) => item !== null
          );
        } else {
          datiitem_bloodNO[0] = "";
        }
        let datiitem_sName = "";
        if (formData.s_name != null) {
          datiitem_sName = formData.s_name.filter((item) => item !== null);
        } else {
          datiitem_sName[0] = "";
        }
        const resultblood = await api.post(`/Search_bloodNO`, {
          Unit_no_csm: datiitem_bloodNO[0],
          blood_status_search: datiitem_sName[0],
        });

        const result = await api.post(`/insert_crossmatch_UnGR`, {
          order_num: Data_record.order_number,
          id: resultblood?.data[0].id,
          blood_status_search: datiitem_sName[0],
          doctor_name: formDataUn.doctor_name,
          note: formDataUn.note,
          ward: formDataUn.ward,
          staff: staff_name,
        });
        const result_C = await api.get("/Crossmatch_TB_API", {
          params: {
            TB: Data_record.order_number,
          },
        });
        if (result_C.data.length > 0) {
          const newData = {
            key: result_C.data.length,
            bl_unit_no: "",
          };
          let data_cross = [];
          for (let i = 0; i < result_C.data[0].length; i++) {
            if (result_C.data[0][i].xm_status_name == "Pedding") {
              setCheckpadding_cross("1");
            }
            setCount(i + 1);
            data_cross.push({
              key: i,
              bl_unit_no: result_C.data[0][i].bl_unit_no,
              s_name: result_C.data[0][i].s_name,
              GR: result_C.data[0][i].GR,
              exp: result_C.data[0][i].exp,
              xm_result: result_C.data[0][i].xm_result,
              xm_confirm: result_C.data[0][i].xm_confirm,
              xm_status_name: result_C.data[0][i].xm_status_name,
              xm_staft: result_C.data[0][i].xm_staft,
            });
          }

          setdataSourceCross(data_cross);
          setdataSourceCross([...data_cross, newData]);
          confirm_sendgroup_cross.resetFields();
          setTimeout(() => {
            document.getElementById(["bl_unit_no", data_cross.length]).focus();
          }, 200);
        }

        setPasswordSendcrossmatchs_ungroup();
        setGR_Alrit(false);
        frm_Crossmatch.resetFields();
      } else {
        Modal.error({
          title: "Password invalid",
          content: "กรุณากรอกรหัสผ่านให้ถูกต้อง!!",
        });
        setPasswordSendcrossmatchs_ungroup();
        confirm_sendgroup_cross.resetFields();
        frm_Crossmatch.resetFields();
        frm_Crossmatch.resetFields();
      }
    } catch (error) {
      Modal.error({ title: "Error", content: "!!!!!!!!!!!!!!!!!!!" });
      confirm_sendgroup_cross.resetFields();
      frm_Crossmatch.resetFields();
    }
  };

  const Fo_inputsearch = async () => {
    frm_searchdata.setFieldsValue({ Request_blood_search: "" });
    document.getElementById("Request_blood_search").focus();
    setcheck_data(0);
    setShowpatient();
    setcheck_dataclick(0);
    setcheck_dataccrosslick(0);
    setCheckpadding_cross("0");
    setcheck_data(0);
    setShowpatient();

    setSetChexkonrow();
    setData_record([]);
    setDatafhenotype([]);
    setData_finger([]);
    setbloood_req([]);
    setdataSourceCross([]);
    setDataSource([]);
  };
  const [count, setCount] = useState(1);

  const Delete_ptNote = async (record, index, key) => {
    const newData = pt_note_table.filter((item) => item.index != index);
    const data_delete = newData[index];
    const result = await api.put("/delete_paitentnote", {
      hn: Data_record.hn,
      note_detail: data_delete.note_detail,
      note_staff: data_delete.note_staff,
    });
    await PatientNote_choice(Data_record.hn);
  };

  const handleDelete = async (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    const deleteData = dataSource.filter((item) => item.key === key);
    const result = await api.put("/delete_lab_order", {
      order_number: Data_record.order_number,
      items_code: deleteData[0].items_code,
    });
    setDataSource(newData);
    if (dataSource.length <= 1) {
      setcheck_dis(0);
      setcheck_dataclick(0);
    } else {
      setcheck_dataclick(1);
      setcheck_dis(1);
    }
  };
  const handleDeleteCross = async (key) => {
    const newData = dataSourceCross.filter((item) => item.key !== key);
    const deleteData = dataSourceCross.filter((item) => item.key === key);
    const result_C = await api.get("/Crossmatch_TB_API", {
      params: {
        TB: Data_record.order_number,
      },
    });

    let delete_xm_id = "";
    for (let i = 0; i < result_C.data[0].length; i++) {
      if (result_C.data[0][i].bl_unit_no == deleteData[0].bl_unit_no) {
        console.log("data_cross", result_C.data[0][i]);
        delete_xm_id = result_C.data[0][i];
      }
    }
    console.log("delete_xm_id", delete_xm_id.xm_id);
    const result = await api.put("/delete_crossmatch", {
      order_number: Data_record.order_number,
      xm_id: delete_xm_id.xm_id,
    });

    setdataSourceCross(newData);
    if (dataSourceCross.length <= 1) {
      setcheck_dataccrosslick(0);
    } else {
      setcheck_dataccrosslick(1);
    }
  };

  const showModal = async () => {
    setTimeout(() => {
      document.getElementById("typescreen_single").blur();
    }, 10);

    setIsModalVisible(true);
    setTimeout(() => {
      document.getElementById("passsave_all_typescreen").focus();
    }, 50);

    setTimeout(() => {
      document.getElementById("typescreen_single").blur();
    }, 10);
  };

  const pass_crossmatching = async () => {
    setTimeout(() => {
      document.getElementById("pass_crossmatching_id").blur();
    }, 200);
    setmodalsaveall_crossmatch(true);
    setTimeout(() => {
      document.getElementById("passcross").focus();
    }, 500);

    setTimeout(() => {
      document.getElementById("pass_crossmatching_id").blur();
    }, 200);
  };

  const save_all_typescreen = async () => {
    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });
    const staff = resultLogin.data.user_name;
    setPassword();

    if (resultLogin.data.id_user) {
      setIsModalVisible(false);
      setStaff_typeSC(staff);
      await handleAdd();
    } else {
      Modal.error({
        title: "Password invalid",
        content: "กรุณากรอกรหัสผ่านให้ถูกต้อง!!",
        onOk: (close) => {
          close();
          setIsModalVisible(false);
          setStaff_typeSC();
        },
      });
      await ClickRow(Data_record);
    }
  };
  const save_all_CS = async () => {
    setTimeout(() => {
      document.getElementById("showModal_id").blur();
    }, 200);
    const resultLogin = await api.post(`/Confirm_password`, {
      password: password_saveallcross,
    });
    const staff = resultLogin.data.user_name;

    setPassword_saveallcross();
    if (resultLogin.data.id_user) {
      setmodalsaveall_crossmatch(false);
      setStaff_cross(staff);
      await handleAddCross();
    } else {
      Modal.error({
        title: "Password invalid",
        content: "กรุณากรอกรหัสผ่านให้ถูกต้อง!!",
        onOk: (close) => {
          close();
          setmodalsaveall_crossmatch(false);
          setStaff_cross();
        },
      });
      await ClickRow(Data_record);
    }
    setTimeout(() => {
      document.getElementById("showModal_id").blur();
    }, 200);
  };
  const save_type_sc_munti = async (value) => {
    setisModalPassword_munti(false);
    const frmData = frm_labcode_modal.getFieldsValue();
    setModal_stack_typescreen(false);
    frm_labcode_modal.resetFields();
    const keyList = Object.keys(frmData);
    const result = [];
    keyList.forEach((key) => {
      if (frmData[key].checkbox_labcode == true) {
        result.push(key);
      }
    });
    for (let i = 0; i < result.length; i++) {
      const item = result[i];
      const resultapi = await api.post(`/save_lab_order_munti_api`, {
        order_number: Data_record.order_number,
        items_code: result,
        staff: Staff_typeSC,
      });
      const result_lab_or = await api.get("/lab_order_api", {
        params: {
          order_number: Data_record.order_number,
        },
      });
      let dataLab_or = [];
      for (let x = 0; x < result_lab_or.data.length; x++) {
        dataLab_or.push({
          key: x,
          items_code: result_lab_or.data[x].items_code,
          items_name: result_lab_or.data[x].items_name,
          lab_result: result_lab_or.data[x].lab_result,
          create_staff: result_lab_or.data[x].create_staff,
        });
      }
      setDataSource(dataLab_or);
      if (
        dataLab_or == "" ||
        dataLab_or == null ||
        dataLab_or == undefined ||
        dataLab_or == []
      ) {
        setcheck_dis(0);
        setcheck_dataclick(0);
      } else {
        setcheck_dataclick(1);
        setcheck_dis(1);
      }
    }
  };
  const save_type_sc = async (value) => {
    const frmData = frm_type_screen.getFieldsValue();
    let datiitem = "";
    if (frmData.items_code != null) {
      datiitem = frmData.items_code.filter((item) => item !== null);
    } else {
      datiitem[0] = "";
    }
    const result = await api.post(`/save_lab_order_api`, {
      // ...frmData,
      order_number: Data_record.order_number,
      items_code: datiitem[0],
      staff: Staff_typeSC,
    });
    let count = dataSource.length - 1;
    if (result.data == "No_Lab") {
      Modal.warning({
        title: "ไม่พบข้อมูล Lab item",
        onOk: (close) => {
          close();
          frm_type_screen.resetFields();
          setTimeout(() => {
            document.getElementById(["items_code", count]).focus();
          }, 200);
        },
      });
    } else if (result.data == "Lab_Haveinformation") {
      Modal.warning({
        title: "มีข้อมูล Lab item อยู่แล้ว ",
        onOk: (close) => {
          close();
          frm_type_screen.resetFields();
          setTimeout(() => {
            document.getElementById(["items_code", count]).focus();
          }, 200);
        },
      });
    } else {
      frm_type_screen.resetFields();
      await enteradd();
    }
  };
  const Type_and_screenColumns = [
    {
      title: "",
      // dataIndex:"items_name",
      align: "center",
      width: "5%",
      render: (text, record, index) => {
        return (
          <div>
            <Form.Item
              label=""
              // name="checkbox_labcode"
              // name={["checkbox_labcode", record.items_code]}
              // name={[index, "checkbox_labcode"]}
              name={[record.items_code, "checkbox_labcode"]}
              style={{
                marginTop: "-15.5px",
                marginBottom: "-14px",
                marginLeft: "0.5px",
              }}
              valuePropName="checked"
            >
              <Checkbox
                style={{
                  width: "100%",
                }}
                // onChange={setResultATB}
              />
            </Form.Item>
          </div>
        );
      },
    },
    {
      title: "#Lab",
      align: "center",
      dataIndex: "items_code",
      width: "10%",
      render: (_, record, index, text) => (
        <div>
          {record.items_code == "" ||
          record.items_code == [] ||
          record.items_code == null ||
          record.items_code == undefined ? (
            <Form.Item
              name={["items_code", index]}
              // name={["items_code", record.index]}
              // rules={[
              //   { required: true, message: `กรุณาเลือกระบุข้อมูลให้คบถ้วน` },
              // ]}
              className="fromitem-fromtable-type_sc"
              style={{ width: "100%", height: "1px", marginTop: "-6px" }}
            >
              <Input
                size="small"
                // id={["items_code",record.key]}
                // id={`items_code${index}`}
                id={["items_code", index]}
                className="Input-fromitem-fromtable-type_sc"
                onKeyDown={({ target: { value }, keyCode }) => {
                  if (keyCode === 13) {
                    // 13 คือ enter
                    // handleAdd(index + 1);
                    save_type_sc();
                  }
                }}
                style={{ height: "20px", fontSize: "12px" }}
              />
            </Form.Item>
          ) : (
            record.items_code
          )}
        </div>
      ),
    },
    {
      title: "Lab Name",
      dataIndex: "items_name",
      width: "20%",
      align: "center",
      render: (text, record) => {
          return (
            <div>
              <span style={{ float:"left" }}>&nbsp;&nbsp;{text}</span>
            </div>
          );
        },
    },
    {
      title: "Result",
      dataIndex: "lab_result",
      width: "36%",
      align: "center",
      // render: (text, record) => {
      //   return (
      //     <div>
      //       <span style={{ float:"left" }}>&nbsp;&nbsp;{text}</span>
      //     </div>
      //   );
      // },
    },
    // {
    //   title: "",
    //   dataIndex: "show_detil",
    //   align: "center",
    //   width: "6%",
    //   render: (_, record, index) => (
    //     <BiShowAlt className="BTN-SHOWDETIL" style={{ fontSize: "12px" }} />
    //   ),
    // },
    {
      title: "",
      dataIndex: "operation",
      width: "6%",
      align: "center",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="คุณต้องการบข้อมูลใช่หรือไม่ ?"
            onConfirm={() => handleDelete(record.key)}
          >
            <CloseCircleOutlined
              className="BTN-DELETE"
              style={{ fontSize: "12px", color: "red" }}
            />
          </Popconfirm>
        ) : null,
    },
    {
      title: "Staff",
      dataIndex: "create_staff",
      width: "16%",
      align: "center",
    },
  ];

  const CrossmatchingColumnss = [
    {
      title: "",
      // dataIndex:"checkbox_CSM_TABLE",
      key: "checkbox_CSM_TABLE",
      align: "center",
      fixed: "left",
      width: "5%",
      // className:"Crossmatch_11",
      render: (text, record) => {
        return (
          <div>
            <Form.Item
              label=""
              name="checkbox_CSM_TABLE"
              style={{
                marginTop: "-15px",
                marginBottom: "-14px",
                marginLeft: "0.5px",
              }}
            >
              <Checkbox value="1" defaultValue={1}></Checkbox>
            </Form.Item>
          </div>
        );
      },
    },
    {
      title: "Blood Number",
      dataIndex: "bl_unit_no",
      width: "25%",
      render: (_, record, index, text) => (
        <div>
          {record.bl_unit_no == "" ||
          record.bl_unit_no == [] ||
          record.bl_unit_no == null ||
          record.bl_unit_no == undefined ? (
            <Form.Item
              name={["bl_unit_no", index]}
              className="fromitem-fromtable-type_sc"
              style={{ width: "100%", height: "1px", marginTop: "-9px" }}
            >
              <Input
                size="small"
                id={["bl_unit_no", index]}
                className="Input-fromitem-fromtable-type_sc"
                onKeyDown={({ target: { value }, keyCode }) => {
                  if (keyCode === 13) {
                    // 13 คือ enter
                    focus_typeblood();
                  }
                }}
                style={{ height: "18px", fontSize: "12px" }}
              />
            </Form.Item>
          ) : (
            <span style={{ fontSize: "13px" }}>&nbsp;{record.bl_unit_no}</span>
          )}
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "s_name",
      // filters: [
      //   // select_bloood_req_TB.map(item=>({
      //   //   text:item.type_name,
      //   //   value:item.type_name
      //   // }))

      //   select_bloood_req_TB[0],
      // ],
      filters: select_bloood_req_TB.map((item) => ({
        text: item,
        value: item,
      })),

      width: "15%",
      align: "center",
      render: (_, record, index, text) => (
        <div>
          {record.s_name == "" ||
          record.s_name == null ||
          record.s_name == undefined ? (
            <Form.Item
              name={["s_name", record.key]}
              className="fromitem-fromtable-type_sc"
              style={{ width: "100%", height: "1px", marginTop: "-9px" }}
            >
              <Input
                size="small"
                id={["s_name", index]}
                // id={["s_name_input",record.key]}
                // id={`s_name,${index}`}
                className="Input-fromitem-fromtable-type_sc"
                onKeyDown={({ target: { value }, keyCode }) => {
                  if (keyCode === 13) {
                    // 13 คือ enter
                    // handleAddCross(index + 1);
                    send_bloodno_Crossmatch();
                  }
                }}
                style={{ height: "18px", fontSize: "12px" }}
              />
            </Form.Item>
          ) : (
            <span>&nbsp;{record.s_name}</span>
          )}
        </div>
      ),
      onFilter: (value, record) => record.s_name.indexOf(value) === 0,
    },
    {
      title: "ABO",
      dataIndex: "GR",
      width: "8%",
      align: "center",
      render: (text, record) => {
        return (
          <div>
            <span style={{ fontSize: "12px" }}>{text}</span>
          </div>
        );
      },
    },
    {
      title: "Exp.",
      dataIndex: "exp",
      width: "17%",
      align: "center",
      render: (text, record) => {
        return (
          <div>
            <span style={{ fontSize: "12px" }}>{text}</span>
          </div>
        );
      },
    },
    {
      title: "Result",
      dataIndex: "xm_result",
      width: "30%",
      align: "center",

      render: (text, record) => {
        return (
          <div>
            <span style={{ fontSize: "12px" }}>{text}</span>
          </div>
        );
      },
    },
    {
      title: "",
      dataIndex: "xm_confirm",
      key: "xm_confirm",
      align: "center",
      width: "6%",
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
      dataIndex: "operation",
      width: "6%",
      align: "center",
      render: (_, record) => (
        <div>
          {/* {record.xm_status_name && ( */}
          <Popconfirm
            title="คุณต้องการบข้อมูลใช่หรือไม่ ?"
            onConfirm={() => handleDeleteCross(record.key)}
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
    {
      title: "Status",
      dataIndex: "xm_status_name",
      width: "20%",
      align: "center",
      render: (text, record) => {
        return (
          <div>
            {record.xm_status_name && (
              <span style={{ fontSize: "12px" }}>{text}</span>
            )}
          </div>
        );
      },
    },
    {
      title: "Staff",
      dataIndex: "xm_staft",
      width: "16%",
      align: "center",
    },
  ];

  const showModal_firm_cross = () => {
    setTimeout(() => {
      document.getElementById("passcross_xm_con").focus();
    }, 50);
    setIsModalconfirm_cross(true);
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
    try {
      if (resultLogin.data.id_user) {
        const result = await api.put(`/con_cross`, {
          order_num: Data_record.order_number,
          staff: staff_name,
        });
        // window.close();
        Modal.success({
          title: "Successful confirmation",
          content: "ยืนยันสำเร็จ",
        });
        await ClickRow(Data_record);
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
  const send_contype = async () => {
    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });
    SetModalcon_typeSc(false);
    setPassword();
    const staff_name =
      resultLogin.data.pname +
      " " +
      resultLogin.data.fname +
      " " +
      resultLogin.data.lname;
    try {
      if (resultLogin.data.id_user) {
        const result = await api.put(`/con_type_andscreen`, {
          order_num: Data_record.order_number,
          staff: staff_name,
        });
        // window.close();
        Modal.success({
          title: "Successful confirmation",
          content: "ยืนยันสำเร็จ",
        });
        await ClickRow(Data_record);
      } else {
        Modal.error({
          title: "Password invalid",
          content: "กรุณากรอกรหัสผ่านให้ถูกต้อง!!",
        });
      }
      SetModalcon_typeSc(false);
    } catch (error) {
      Modal.error({
        title: "Error",
        content: "กรุณากรอกข้อมูลให้ครบถ้วน!!",
      });
      SetModalcon_typeSc(false);
    }
  };
  return (
    <>
      <Layout keyTab={Patent_blood_request_lab_new}>
        <div>
          <Head>
            <title>SIBSOFT : รายการขอเลือด</title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
        </div>
        <div
          style={{
            backgroundColor: "#ffff",
            height: "100%",
            position: "fixed",
            paddingRight: "10px",
            paddingLeft: "10px",
            left: "0px",
          }}
        >
          <Row justify="start">
            <Col
              span={24}
              flex="auto"
              offset={0}
              style={{
                marginLeft: "1px",
                marginRight: "1px",
                // border: "1px solid",
                backgroundColor: "#ffff",
              }}
            >
              <Row justify="start" style={{}}>
                <Col xs={5} lg={5} xl={5}>
                  <Form
                    form={frm_searchdata}
                    initialValues={{
                      Request_date_blood_search: moment().add(543, "year"),
                      Request_date_blood_to_search: moment().add(543, "year"),
                      Search_select: "hn",
                      Request_blood_search: "",
                      // CheckBox_search: 'false',
                    }}
                  >
                    <Row
                      justify="start"
                      style={{
                        marginBottom: "-30px",
                      }}
                    >
                      <Col span={11}>
                        <Form.Item label="" name="Request_date_blood_search">
                          <DatePicker
                            style={{ width: "100%" }}
                            format="DD-MM-YYYY"
                            locale={th_TH}
                            size="small"
                            onChange={GetPTRequest}
                            onKeyDown={({ target: { value }, keyCode }) => {
                              if (keyCode === 13) {
                                // 13 คือ enter
                                Fo_inputsearch();
                              }
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={2}>
                        <Row justify="center">
                          <p
                            style={
                              {
                                // marginTop: "5px",
                                // marginLeft: "5px",
                                // marginRight: "5px",
                              }
                            }
                          >
                            -
                          </p>
                        </Row>
                      </Col>
                      <Col span={11}>
                        <Form.Item label="" name="Request_date_blood_to_search">
                          <DatePicker
                            style={{ width: "100%" }}
                            format="DD-MM-YYYY"
                            locale={th_TH}
                            size="small"
                            onChange={GetPTRequest}
                            onKeyDown={({ target: { value }, keyCode }) => {
                              if (keyCode === 13) {
                                // 13 คือ enter
                                Fo_inputsearch();
                              }
                            }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row
                      justify="start"
                      style={{
                        marginBottom: "-30px",
                      }}
                    >
                      <Col span={8}>
                        <Form.Item label="" name="Search_select">
                          <Select
                            // showArrow={false}
                            dropdownMatchSelectWidth={false}
                            placement={placement}
                            size="small"
                            placeholder="Search"
                            defaultValue="hn"
                            // style={{ width: 120 }}
                            onChange={Fo_inputsearch}
                          >
                            {choice_show?.map((item) => (
                              <Option key={item.ch_id} value={item.ch_keys}>
                                {item.ch_name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={16}>
                        <Form.Item label="" name="Request_blood_search">
                          <Input
                            style={{
                              width: "100%",
                            }}
                            size="small"
                            id="Request_blood_search"
                            onKeyDown={({ target: { value }, keyCode }) => {
                              if (keyCode === 32) {
                                // 32 คือ spacebar
                                showModal_Search();
                              }
                              if (keyCode === 13) {
                                // 13 คือ enter
                                GetPTRequest();
                              }
                            }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row
                      justify="start"
                      style={{
                        marginBottom: "-25px",
                        fontSize: "12px",
                      }}
                    >
                      <Col xs={12} lg={12} xl={12}>
                        <Form.Item
                          label=""
                          name="CheckBox_search"
                          valuePropName="checked"
                        >
                          <Checkbox
                            style={{ fontSize: "12px" }}
                            onChange={GetPTRequest}
                          >
                            ไม่ระบุสถานะขอเลือด
                          </Checkbox>
                        </Form.Item>
                      </Col>
                      <Col xs={12} lg={12} xl={12}>
                        <Row>
                          <Button
                            type="primary"
                            // htmlType="submit"
                            shape="round"
                            danger
                            style={{
                              marginTop: "4.5px",
                            }}
                            id="Refresh_selectsearch_id"
                            onClick={Refresh_selectsearch}
                            size="small"
                          >
                            <Row>
                              <RetweetOutlined
                                style={{
                                  fontWeight: "3px bold",
                                  fontSize: "18px",
                                  color: "white",
                                  marginTop: "1px",
                                }}
                              />
                              &nbsp;
                              <span
                                style={{
                                  fontWeight: "3px bold",
                                  fontSize: "12px",
                                  color: "white",
                                  marginTop: "1px",
                                }}
                              >
                                Refresh
                              </span>
                            </Row>
                          </Button>
                        </Row>
                      </Col>
                    </Row>
                    <Row
                      justify="center"
                      style={
                        {
                          // marginTop: "-26px",
                          // marginLeft: "-21px",
                          // marginRight: "-20px",
                        }
                      }
                    >
                      <Col span={24}>
                        <Table
                          className="Lab_requestTable"
                          dataSource={Showpatient}
                          columns={Lab_request}
                          size="small"
                          pagination={false}
                          scroll={{
                            x: "calc(300px + 50%)",
                            y: "75vh",
                          }}
                          rowClassName={(record, index) => {
                            return record.order_number === SetChexkonrow
                              ? "clickRow"
                              : use_ativeTable === SetChexkonrow
                              ? "clickRow"
                              : "";
                          }}
                          onRow={(record) => {
                            return {
                              onClick: () => {
                                ClickRow(record);
                              },
                            };
                          }}
                          loading={loading}
                        />
                      </Col>
                    </Row>
                  </Form>
                </Col>

                <Col style={{ paddingLeft: "5px" }} xs={19} lg={19} xl={19}>
                  <Row>
                    <Col xs={21} lg={21} xl={15}>
                      <Row
                        justify="start"
                        // style={{
                        //   marginTop: "-22px",
                        //   marginLeft: "-17px",
                        //   marginRight: "5px",
                        // }}
                      >
                        <Col span={16}>
                          <b style={{ fontSize: "14px" }}>Patient Data</b>
                        </Col>
                        <Col span={8}>
                          <Row>
                            <b style={{ fontSize: "12px" }}>Req No. :</b>&nbsp;
                            <b style={{ fontSize: "12px", color: "blue" }}>
                              {Data_record.order_number}
                            </b>
                          </Row>
                        </Col>
                      </Row>
                      <Row
                      // style={{  marginRight: "1px" }}
                      >
                        <Col span={8}>
                          <Row>
                            <b style={{ fontSize: "12px" }}>HN :</b>&nbsp;
                            <b style={{ fontSize: "12px", color: "blue" }}>
                              {Data_record.hn}
                            </b>
                          </Row>
                          <Row>
                            <b style={{ fontSize: "12px" }}>Name :</b>&nbsp;
                            <b style={{ fontSize: "12px", color: "blue" }}>
                              {Data_record.patientname}
                            </b>
                          </Row>
                          <Row>
                            <b style={{ fontSize: "12px" }}>Hospitals :</b>
                            &nbsp;
                            <b style={{ fontSize: "12px", color: "blue" }}>
                              {Data_record.hos_long_name_th}
                            </b>
                          </Row>
                          <Row>
                            <b style={{ fontSize: "12px" }}>Ward :</b>&nbsp;
                            <b style={{ fontSize: "12px", color: "blue" }}>
                              {Data_record.wd_name}
                            </b>
                          </Row>
                          <Row
                            style={{
                              marginBottom: "3px",
                            }}
                          >
                            <b style={{ fontSize: "12px" }}>Patient Type :</b>
                            &nbsp;
                            <b style={{ fontSize: "12px", color: "blue" }}>
                              {Data_record.patient_type}
                            </b>
                          </Row>
                          <Row>
                            <Col sapn={12}>
                              <Row>
                                <b style={{ fontSize: "12px" }}>Hb :</b>&nbsp;
                                <b style={{ fontSize: "12px", color: "blue" }}>
                                  {Data_record.lab_hgb}
                                </b>
                              </Row>
                              <Row>
                                <b style={{ fontSize: "12px" }}>MCV :</b>&nbsp;
                                <b style={{ fontSize: "12px", color: "blue" }}>
                                  {Data_record.req_mvc}
                                </b>
                              </Row>
                            </Col>
                            <Col sapn={12} style={{ marginLeft: "10px" }}>
                              <Row>
                                <b style={{ fontSize: "12px" }}>Hct :</b>&nbsp;
                                <b style={{ fontSize: "12px", color: "blue" }}>
                                  {Data_record.lab_hct}
                                </b>
                              </Row>
                              <Row>
                                <b style={{ fontSize: "12px" }}>MCH :</b>&nbsp;
                                <b style={{ fontSize: "12px", color: "blue" }}>
                                  {Data_record.req_mch}
                                </b>
                              </Row>
                            </Col>
                          </Row>
                          <Row
                            style={{
                              marginRight: "-500px",
                              marginBottom: "3px",
                            }}
                            // className="Phenotype"
                          >
                            <b style={{ fontSize: "12px" }}>Phenotype :</b>
                            &nbsp; &nbsp;
                            {DataResltATG?.map((item, index) => (
                              <b
                                key={item.value}
                                style={{
                                  fontSize: "12px",
                                  color: item.color,
                                  fontWeight: "bold",
                                  marginTop: "0px",
                                }}
                              >
                                {item.value}
                                <h style={{ color: "black" }}>
                                  {item.num == index + 1 ? "" : ","}&nbsp;&nbsp;
                                </h>
                              </b>
                            ))}
                            {/* <b
                              style={{
                                fontSize: "12px",
                                color: "red",
                                fontWeight: "bold",
                                marginTop: "0px",
                              }}
                            >
                              {Datafhenotype}
                            </b> */}
                          </Row>
                          {/* <Row style={{ marginBottom: "1.5px" }}>
                              <span style={{ fontSize: "12px" }}>&nbsp;</span>
                            </Row>
                            <Row style={{ marginBottom: "-5px" }}>
                              <span style={{ fontSize: "12px" }}>&nbsp;</span>
                            </Row> */}
                        </Col>
                        <Col span={8}>
                          <Row>
                            <b style={{ fontSize: "12px" }}>AN/VN :</b>&nbsp;
                            <b style={{ fontSize: "12px", color: "blue" }}>
                              {Data_record.VN_AN}
                            </b>
                          </Row>
                          <Row>
                            <b style={{ fontSize: "12px" }}>DOB :</b>&nbsp;
                            <b style={{ fontSize: "12px", color: "blue" }}>
                              {Data_record.birthday}&nbsp;
                              {Data_record.age == "" ? "" : Data_record.age}
                            </b>
                          </Row>
                          <Row>
                            <br />
                          </Row>
                          <Row>
                            <b style={{ fontSize: "12px" }}>Depaetment :</b>
                            &nbsp;
                            <b style={{ fontSize: "12px", color: "blue" }}>
                              {Data_record.dep_c}
                            </b>
                          </Row>
                          <Row>
                            <b style={{ fontSize: "12px" }}>Diag :</b>&nbsp;
                            <b style={{ fontSize: "12px", color: "blue" }}>
                              {Data_record.diag_name}
                            </b>
                          </Row>
                          <Row>
                            <b style={{ fontSize: "12px" }}>Plt :</b>&nbsp;
                            <b style={{ fontSize: "12px", color: "blue" }}>
                              {Data_record.lab_plt}
                            </b>
                          </Row>
                          <Row>
                            <b style={{ fontSize: "12px" }}>MCHC :</b>&nbsp;
                            <b style={{ fontSize: "12px", color: "blue" }}>
                              {Data_record.req_mchc}
                            </b>
                          </Row>
                        </Col>
                        <Col span={7}>
                          <Row>
                            <Col span={24}>
                              <Row>
                                <b style={{ fontSize: "12px" }}>LN :</b>&nbsp;
                                <b style={{ fontSize: "12px", color: "blue" }}>
                                  {Data_record.req_ln}
                                </b>
                              </Row>
                              <Row>
                                <b style={{ fontSize: "12px" }}>Gender :</b>
                                &nbsp;
                                <b style={{ fontSize: "12px", color: "blue" }}>
                                  {Data_record.sex == "1"
                                    ? "ชาย"
                                    : Data_record.sex == "" ||
                                      Data_record.sex == null ||
                                      Data_record.sex == undefined
                                    ? ""
                                    : "หญิง"}
                                </b>
                              </Row>
                              <Row style={{ marginTop: "5px" }}>
                                <Col span={22}>
                                  <b style={{ fontSize: "12px" }}>Note :</b>
                                  &nbsp;
                                  <Form form={patient_data}>
                                    <Form.Item label="" name="note">
                                      <TextArea
                                        rows={3}
                                        style={{
                                          fontSize: "12px",
                                          color: "black",
                                        }}
                                        disabled
                                      />
                                    </Form.Item>
                                  </Form>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      xs={2}
                      lg={2}
                      xl={2}
                      offset={0}
                      // style={{ marginLeft: "-1px" }}
                    >
                      <Row
                        style={{
                          // marginTop: "-33px",
                          marginLeft:
                            Data_record.bloodgrp == "AB" ? "8px" : "15px",
                        }}
                        justify="start"
                      >
                        <b style={{ fontSize: "32px" }}>
                          {Data_record.bloodgrp == "" ||
                          Data_record.bloodgrp == null ||
                          Data_record.bloodgrp == undefined ? (
                            <span>&nbsp;</span>
                          ) : (
                            Data_record.bloodgrp
                          )}
                        </b>
                      </Row>
                      <Row
                        justify="start"
                        style={{
                          // marginTop: "-12px",
                          marginLeft: "5px",
                          // marginLeft: "-35px",
                        }}
                      >
                        <b style={{ fontSize: "12px" }}>
                          {Data_record.bloodrh == "+" ? (
                            "Positive"
                          ) : Data_record.bloodrh == "-" ? (
                            "Negative"
                          ) : Data_record.bloodrh == "wD" ? (
                            "Week D"
                          ) : Data_record.bloodrh == "" ||
                            Data_record.bloodrh == null ||
                            Data_record.bloodrh == undefined ? (
                            <span>&nbsp;</span>
                          ) : (
                            ""
                          )}
                        </b>
                      </Row>
                      <Row
                        style={{
                          // marginLeft: "9.5px",
                          marginLeft: "-4px",
                        }}
                        justify="start"
                      >
                        <Button
                          className="HistoryBTN_data"
                          onClick={OpenModal_HIS}
                        >
                          History
                        </Button>
                      </Row>
                      <Row
                        justify="center"
                        style={{
                          marginTop: "3px",
                          marginLeft: "-8px",
                          border: "1px solid",
                          paddingLeft: "33px",
                          paddingRight: "35px",
                          paddingTop: "20px",
                          paddingBottom: "1px",
                          width: "50px",
                        }}
                      >
                        <Row style={{ marginTop: "-25px" }} justify="center">
                          <b style={{ fontSize: "28px" }}>
                            {Data_finger.fgt_blood_gr}
                          </b>
                        </Row>
                        <Row style={{ marginTop: "-12px" }} justify="center">
                          <b style={{ fontSize: "12px" }}>
                            {Data_finger.fgt_blood_rh == "+" ? (
                              "Positive"
                            ) : Data_finger.fgt_blood_rh == "-" ? (
                              "Negative"
                            ) : Data_finger.fgt_blood_rh == "wD" ? (
                              "Week D"
                            ) : Data_finger.fgt_blood_rh == "" ||
                              Data_finger.fgt_blood_rh == null ||
                              Data_finger.fgt_blood_rh == undefined ? (
                              <span>
                                <br />
                                &nbsp;
                              </span>
                            ) : (
                              ""
                            )}
                          </b>
                          <Row className="Slide_Method">
                            <p>
                              Slide
                              <span style={{ marginLeft: "2px" }}>Method</span>
                            </p>
                          </Row>
                        </Row>
                      </Row>
                    </Col>
                    <Col xs={24} lg={24} xl={7}>
                      <Row
                        justify="start"
                        style={
                          {
                            // marginTop: "-22px",
                            //  marginLeft:"-48px"
                            // ,marginRight:"10px"
                          }
                        }
                      >
                        <Col
                          xs={19}
                          lg={19}
                          xl={15}
                          // style={{ marginLeft: "-38px", marginRight: "10px" }}
                        >
                          <Row>
                            <b style={{ fontSize: "14px" }}>Blood Request</b>
                          </Row>

                          <Row>
                            <Col span={24}>
                              <Table
                                className="bloood_requestTable"
                                dataSource={bloood_req}
                                columns={bloood_request}
                                size="small"
                                pagination={false}
                                scroll={{
                                  x: 100,
                                  y: 105,
                                }}
                              />
                            </Col>
                          </Row>
                        </Col>

                        <Col
                          span={4}
                          style={{
                            marginLeft: "8px",
                            // ,marginRight:"-5px"
                          }}
                        >
                          <Row style={{ marginTop: "2px" }}>
                            <Button
                              className="HistoryBTN_labnew"
                              style={{
                                paddingLeft: "20px",
                                paddingRight: "20px",
                              }}
                            >
                              Barcode
                            </Button>
                          </Row>
                          <Row style={{ marginTop: "2px" }}>
                            <Button
                              className="HistoryBTN_labnew"
                              style={{
                                paddingLeft: "22.5px",
                                paddingRight: "22.5px",
                              }}
                            >
                              ใบคล้อง
                            </Button>
                          </Row>
                          <Row style={{ marginTop: "2px" }}>
                            <Button
                              className="HistoryBTN_labnew"
                              style={{
                                paddingLeft: "26.5px",
                                paddingRight: "26.5px",
                              }}
                            >
                              ใบจ่าย
                            </Button>
                          </Row>
                          <Row style={{ marginTop: "2px" }}>
                            <Button
                              className="HistoryBTN_labnew"
                              style={{
                                paddingLeft: "19px",
                                paddingRight: "19px",
                              }}
                              onClick={showModalTransBlood}
                            >
                              จ่ายเลือด
                            </Button>
                          </Row>
                          <Row style={{ marginTop: "2px" }}>
                            <Button
                              className="HistoryBTN_labnew"
                              style={{
                                paddingLeft: "20px",
                                paddingRight: "20px",
                              }}
                            >
                              Apporve
                            </Button>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={21} lg={21} xl={15}>
                      <Row justify="start">
                        <Col span={9}>
                          <Row style={{ marginTop: "0px" }}>
                            <b style={{ fontSize: "12px" }}>Request Date :</b>
                            &nbsp;
                            <b style={{ fontSize: "12px", color: "blue" }}>
                              {Data_record.req_usedate}
                            </b>
                          </Row>
                        </Col>
                        <Col span={7}>
                          <Row style={{ marginTop: "1px" }}>
                            <b style={{ fontSize: "12px" }}>Use Date :</b>&nbsp;
                            <b style={{ fontSize: "12px", color: "blue" }}>
                              {Data_record.req_usedate}
                            </b>
                          </Row>
                        </Col>
                        <Col span={6}>
                          <Row style={{ marginTop: "3.5px" }}>
                            <b style={{ fontSize: "12px" }}>
                              Expiration Date :
                            </b>
                            &nbsp;
                            <b style={{ fontSize: "12px", color: "blue" }}>
                              {Data_record.req_usedate}
                              {/* 12/03/2564 */}
                            </b>
                          </Row>
                        </Col>
                      </Row>
                    </Col>

                    <Col xs={21} lg={21} xl={9}>
                      <Row
                        className="Alarm"
                        justify="center"
                        style={{ height: "35px" }}
                      >
                        <Avatar
                          width={100}
                          src={`${env.PATH_IMG}/image/icon1.png?pathType=3`}
                        />
                        <Avatar
                          width={100}
                          src={`${env.PATH_IMG}/image/icon2.png?pathType=3`}
                        />{" "}
                        <Avatar
                          width={100}
                          src={`${env.PATH_IMG}/image/icon3.png?pathType=3`}
                        />{" "}
                        <Avatar
                          width={100}
                          src={`${env.PATH_IMG}/image/icon4.png?pathType=3`}
                        />{" "}
                        <Avatar
                          width={100}
                          src={`${env.PATH_IMG}/image/icon5.png?pathType=3`}
                        />{" "}
                        <Avatar
                          width={100}
                          src={`${env.PATH_IMG}/image/icon6.png?pathType=3`}
                        />{" "}
                        <Avatar
                          width={100}
                          src={`${env.PATH_IMG}/image/icon7.gif?pathType=3`}
                        />{" "}
                        <Avatar
                          width={100}
                          src={`${env.PATH_IMG}/image/icon1.png?pathType=3`}
                        />{" "}
                        <Avatar
                          width={100}
                          src={`${env.PATH_IMG}/image/icon1.png?pathType=3`}
                        />{" "}
                        <Avatar
                          width={100}
                          src={`${env.PATH_IMG}/image/icon1.png?pathType=3`}
                        />{" "}
                        <Avatar
                          width={100}
                          src={`${env.PATH_IMG}/image/icon1.png?pathType=3`}
                        />{" "}
                        <Avatar
                          width={100}
                          src={`${env.PATH_IMG}/image/icon1.png?pathType=3`}
                        />
                      </Row>
                    </Col>
                  </Row>

                  <Row justify="center" style={{ marginTop: "9px" }}>
                    <Col span={24}>
                      <hr />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Row>
                        <Col span={12}>
                          <Row
                            style={{ marginTop: "-20px", marginLeft: "10px" }}
                            justify="start"
                          >
                            <Col span={5}>
                              <Row>
                                {check_dis == "1" ? (
                                  <Button
                                    className="btn-addsingle-typescreen"
                                    // type="primary"
                                    // onClick={handleAdd}
                                    onClick={showModal}
                                    id="typescreen_single"
                                  >
                                    <MdOutlineAddBox />
                                  </Button>
                                ) : (
                                  <Button
                                    className="btn-addsingle-typescreen"
                                    // type="primary"
                                    // onClick={handleAdd}
                                    // onClick={showModal}
                                    id="typescreen_single"
                                    disabled
                                  >
                                    <MdOutlineAddBox />
                                  </Button>
                                )}
                                &nbsp;&nbsp;
                                {check_dis == "1" ? (
                                  <Button
                                    className="btn-muntiple-typescreen"
                                    id="showModal_stack_tysc_id"
                                    // type="primary"
                                    // onClick={showModal_stack_tysc}
                                    onClick={type_munitpass_modal}
                                  >
                                    <MdOutlineAddToPhotos />
                                  </Button>
                                ) : (
                                  <Button
                                    className="btn-muntiple-typescreen"
                                    id="showModal_stack_tysc_id"
                                    // type="primary"
                                    // onClick={showModal_stack_tysc}
                                    // onClick={type_munitpass_modal}
                                    disabled
                                  >
                                    <MdOutlineAddToPhotos />
                                  </Button>
                                )}
                              </Row>
                            </Col>
                            <Col span={7}>
                              <b
                                style={{
                                  backgroundColor: "white",
                                  fontSize: "16px",
                                  paddingLeft: "10px",
                                  paddingRight: "10px",
                                }}
                              >
                                Type and screen
                              </b>
                            </Col>
                            <Col span={11} offset={1}>
                              <Row justify="end">
                                {check_dis == "1" ? (
                                  <Button
                                    className="btn-showall-typescreen"
                                    onClick={showModal_showall_tysc}
                                  >
                                    Show All
                                  </Button>
                                ) : (
                                  <Button
                                    className="btn-showall-typescreen"
                                    // onClick={showModal_showall_tysc}
                                    disabled
                                  >
                                    Show All
                                  </Button>
                                )}
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                        <Col span={12}>
                          <Row
                            style={{ marginTop: "-20px", marginLeft: "13px" }}
                            justify="start"
                          >
                            <Col span={3}>
                              {check_dis == "1" ? (
                                <Button
                                  // className="HistoryBTN_labnew"
                                  className="btn-addsingle-typescreen"
                                  onClick={pass_crossmatching}
                                  id="pass_crossmatching_id"
                                >
                                  <MdOutlineAddBox />
                                </Button>
                              ) : (
                                <Button
                                  // className="HistoryBTN_labnew"
                                  className="btn-addsingle-typescreen"
                                  //  onClick={pass_crossmatching}
                                  id="pass_crossmatching_id"
                                  disabled
                                >
                                  <MdOutlineAddBox />
                                </Button>
                              )}
                            </Col>
                            <Col span={8}>
                              <b
                                style={{
                                  backgroundColor: "white",
                                  fontSize: "16px",
                                  paddingLeft: "15px",
                                  paddingRight: "15px",
                                }}
                              >
                                Crossmatching
                              </b>
                            </Col>
                            <Col span={11} offset={2}>
                              <Row justify="end">
                                {check_dis == "1" ? (
                                  <Button
                                    className="btn-showall-typescreen"
                                    onClick={showModal_showall_crossmatching}
                                  >
                                    Show All
                                  </Button>
                                ) : (
                                  <Button
                                    className="btn-showall-typescreen"
                                    // onClick={showModal_showall_crossmatching}
                                    disabled
                                  >
                                    Show All
                                  </Button>
                                )}
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "5px" }}>
                    <Row>
                      <Col span={12}>
                        <Row>
                          <Col xs={24} lg={24} xl={24}>
                            {/* <Card className="card_type_sc"> */}
                            <Form form={frm_type_screen}>
                              {check_dataclick == "0" ? (
                                <Table
                                  rowClassName={() => "editable-row"}
                                  bordered
                                  size="small"
                                  dataSource={dataSource}
                                  columns={Type_and_screenColumns}
                                  className="table_type_scNodata"
                                  pagination={false}
                                  scroll={{ y: "40vh" }}
                                  width={"100%"}
                                  // showHeader={false}
                                />
                              ) : (
                                <Table
                                  rowClassName={() => "editable-row"}
                                  bordered
                                  size="small"
                                  dataSource={dataSource}
                                  columns={Type_and_screenColumns}
                                  className="table_type_sc"
                                  pagination={false}
                                  scroll={{ y: "calc(100vh - 370px) ", x: 375 }}
                                  width={"100%"}
                                  // showHeader={false}
                                />
                              )}
                            </Form>
                            {/* </Card> */}
                          </Col>
                        </Row>
                      </Col>
                      <Col span={12}>
                        <Row>
                          <Col xs={24} lg={24} xl={24}>
                            <Form form={frm_Crossmatch}>
                              {check_datacrossclick == "0" ? (
                                <Table
                                  // rowClassName={() => "editable-row"}
                                  bordered
                                  size="small"
                                  dataSource={dataSourceCross}
                                  columns={CrossmatchingColumnss}
                                  className="table_crossNodata"
                                  pagination={false}
                                  scroll={{
                                    x: "calc(330px + 60%)",
                                    y: "40vh",
                                  }}
                                  width={"100%"}

                                  // showHeader={false}
                                />
                              ) : (
                                <Table
                                  // rowClassName={() => "editable-row"}
                                  bordered
                                  size="small"
                                  dataSource={dataSourceCross}
                                  columns={CrossmatchingColumnss}
                                  className="table_cross"
                                  pagination={false}
                                  scroll={{
                                    x: "calc(330px + 60%)",
                                    y: "40vh",
                                  }}
                                  width={"100%"}

                                  // showHeader={false}
                                />
                              )}
                            </Form>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Row>
                  <Row
                    justify="center"
                    style={{ marginTop: "10px", marginBottom: "-20px" }}
                  >
                    <Col span={24}>
                      <hr />
                    </Col>
                  </Row>

                  <Row>
                    <Col span={24}>
                      <Row>
                        <Col span={12}>
                          <Row justify="end">
                            {/* {check_dis == "1" ? (
                              <Button
                                className="btn-saveall-typescreen"
                                // type="primary"
                                onClick={showModal_firm_Tyoescreen}
                                id="showModal_id"
                              >
                                Confirm T/S
                              </Button>
                            ) : (
                              <Button
                                className="btn-saveall-typescreen"
                                // type="primary"
                                disabled
                              >
                               Confirm T/S
                              </Button>
                            )} */}

                            {check_dis == "1" &&
                            Data_record.confirm_status === "Y" ? (
                              <Button
                                className="btn-saveall-typescreen-con"
                                // type="primary"
                                onClick={showModal_firm_Tyoescreen}
                                id="showModal_id"
                              >
                                Confirm T/S
                              </Button>
                            ) : check_dis == "1" &&
                              (Data_record.confirm_status == "" ||
                                Data_record.confirm_status == null ||
                                Data_record.confirm_status == undefined ||
                                Data_record.confirm_status == [] ||
                                Data_record.confirm_status == {}) ? (
                              <Button
                                className="btn-saveall-typescreen"
                                // type="primary"
                                onClick={showModal_firm_Tyoescreen}
                                id="showModal_id"
                              >
                                Confirm T/S
                              </Button>
                            ) : check_dis == "0" ? (
                              <Button
                                className="btn-saveall-typescreen"
                                // type="primary"
                                disabled
                              >
                                Confirm T/S
                              </Button>
                            ) : (
                              ""
                            )}
                          </Row>
                        </Col>
                        <Col span={12}>
                          <Row justify="end">
                            {Checkpadding_cross === "0" ? (
                              <span></span>
                            ) : (
                              <Button
                                className="btn-saveall-typescreen"
                                onClick={modal_save_crossstatus}
                                id="showModal_idcrossmatch"
                              >
                                บันทึกถุงเลือด
                              </Button>
                            )}
                            &nbsp;
                            {check_dis == "1" ? (
                              <Button
                                className="btn-saveall-typescreen"
                                // type="primary"
                                // disabled
                                onClick={showModal_firm_cross}
                              >
                                confirm XM
                              </Button>
                            ) : (
                              <Button
                                className="btn-saveall-typescreen"
                                // type="primary"
                                // disabled
                                // onClick={showModal_firm_cross}
                                disabled
                              >
                                confirm XM
                              </Button>
                            )}
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Layout>

      {/* modal  Search*/}
      <Modal
        // title="ค้นหาข้อมูลผู้ขอเลือด"
        width={1200}
        visible={isModalVisible_Search}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        style={{ top: 12 }}
      >
        <Row justify="center">
          <Col span={24}>
            <Form
              form={frmImsearchdetil_blood}
              onFinish={onFinishSearch}
              initialValues={{
                Request_date_blood_search: moment(),
                Request_date_blood_to_search: moment(),
                HN_search: "",
                blood_request_number_search: "",
                blood_request_point_search: "",
                station_search: "",
                date_of_use_search: "",
                date_of_use_to_search: "",
                blood_need_search: "",
                blood_group_re_search: "",
                blood_status_search: "",
                CheckBox_search: "",
                WARD_search: "",
                name_search: "",
              }}
            >
              <Row>
                <Col span={24}>
                  <b style={{ fontSize: "20px" }}>ค้นหาข้อมูลผู้ขอเลือด</b>
                </Col>
              </Row>
              <Row justify="start" style={{ marginTop: "5px" }}>
                <Col span={24}>
                  <Row>
                    <Form.Item
                      label="วันที่ขอ"
                      name="Request_date_blood_search"
                    >
                      <DatePicker
                        style={{ width: "120px" }}
                        format="DD-MM-YYYY"
                        locale={th_TH}
                      />
                    </Form.Item>
                    &nbsp;
                    <Form.Item label="ถึง" name="Request_date_blood_to_search">
                      <DatePicker
                        style={{ width: "120px" }}
                        format="DD-MM-YYYY"
                        locale={th_TH}
                      />
                    </Form.Item>
                    &nbsp;
                    <Form.Item label="HN" name="HN_search">
                      <Input
                        placeholder="ระบุข้อมูลให้ครบ"
                        style={{ width: "150px" }}
                      />
                    </Form.Item>
                    &nbsp;
                    <Form.Item
                      label="เลขที่ใบขอเลือด"
                      name="blood_request_number_search"
                    >
                      <Input
                        placeholder="ระบุข้อมูลให้ครบ"
                        style={{ width: "150px" }}
                      />
                    </Form.Item>
                    &nbsp;
                    <Form.Item label="ชื่อ-สกุล" name="name_search">
                      <Input
                        placeholder="ชื่อ-สกุล"
                        style={{ width: "169%" }}
                      />
                    </Form.Item>
                    &nbsp;
                  </Row>
                </Col>
              </Row>
              <Row justify="start" style={{ marginTop: "-20px" }}>
                <Form.Item label="วันที่ใช้" name="date_of_use_search">
                  <DatePicker
                    format="DD-MM-YYYY"
                    style={{ width: "120px" }}
                    locale={th_TH}
                  />
                </Form.Item>
                &nbsp;
                <Form.Item label="ถึง" name="date_of_use_to_search">
                  <DatePicker
                    format="DD-MM-YYYY"
                    style={{ width: "120px" }}
                    locale={th_TH}
                  />
                </Form.Item>
                &nbsp;
                <Form.Item label="ชื่อสถานพยาบาลที่ขอ" name="station_search">
                  <Select
                    showSearch
                    dropdownMatchSelectWidth={false}
                    placement={placement}
                    style={{ width: "250px" }}
                    placeholder="ชื่อสถานพยาบาลที่ขอ"
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
                &nbsp;
                <Form.Item label="ความต้องการ" name="blood_need_search">
                  <Select
                    showSearch
                    // showArrow={false}
                    dropdownMatchSelectWidth={false}
                    placement={placement}
                    style={{ width: "212px" }}
                    placeholder="ความต้องการ"
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
                &nbsp;
                <Form.Item label="หมู่เลือด" name="blood_group_re_search">
                  <Select
                    showSearch
                    dropdownMatchSelectWidth={false}
                    placement={placement}
                    style={{ width: "60px" }}
                    placeholder="Group"
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
                &nbsp;
              </Row>
              <Row justify="start" style={{ marginTop: "-20px" }}>
                <Col span={6}>
                  <Form.Item
                    label="จุดที่ขอเลือด"
                    name="blood_request_point_search"
                    style={{ width: "100%" }}
                  >
                    <Select
                      showSearch
                      dropdownMatchSelectWidth={false}
                      placement={placement}
                      style={{ width: "100%" }}
                      placeholder="ระบุจุดที่ขอเลือด"
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
                </Col>
                <Col span={5} style={{ paddingLeft: "5px" }}>
                  <Form.Item
                    label="สถานะขอเลือด"
                    name="blood_status_search"
                    style={{ width: "100%" }}
                  >
                    <Select
                      showSearch
                      dropdownMatchSelectWidth={false}
                      placement={placement}
                      style={{ width: "100%" }}
                      placeholder="สถานะขอเลือด"
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
                  </Form.Item>
                </Col>
                <Col span={5} style={{ paddingLeft: "5px" }}>
                  <Form.Item
                    label="Ward"
                    name="WARD_search"
                    style={{ width: "100%" }}
                  >
                    <Select
                      showSearch
                      dropdownMatchSelectWidth={false}
                      placement={placement}
                      //
                      style={{ width: "100%" }}
                      placeholder="WARD"
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
                  </Form.Item>
                </Col>

                <Col span={8}>
                  {" "}
                  <Row>
                    <Form.Item label="" name="CheckBox_search">
                      <Checkbox.Group
                        style={{
                          marginTop: "-14px",
                          marginLeft: "12px",
                        }}
                      >
                        <Row>
                          <Checkbox value="TRUE">ไม่ระบุสถานะขอเลือด</Checkbox>
                        </Row>
                      </Checkbox.Group>
                    </Form.Item>
                    &nbsp; &nbsp;
                    <Button
                      id="btn_search"
                      type="primary"
                      htmlType="submit"
                      shape="round"
                    >
                      <SearchOutlined /> ค้นหา
                    </Button>
                    <Button
                      type="primary"
                      // htmlType="submit"
                      shape="round"
                      danger
                      style={{
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
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Row justify="center">
          <Col span={24} offset={0}>
            <Table
              columns={columns_madal_Search}
              dataSource={Showpatientmodal}
              bordered
              scroll={{ x: 2500, y: 1000 }}
              // rowClassName={(record, index) => {
              //   return index % 2 === 0 ? "yellow1" : "";
              // }}
              onRow={(record) => {
                return {
                  onDoubleClick: () => {
                    GetPTRequestformmodal(record.order_number);
                  },
                };
              }}
              rowKey="MOBCODE"
              loading={loading}
              onFinish={onFinishSearch}
              size="small"
              style={{
                width: "100%",
                // marginBottom: "-30px",
                // marginTop: "-15px",
              }}
              className="Tablesearch"
            />
          </Col>
        </Row>
      </Modal>

      {/* stack modal*/}
      <Modal
        title="Lab Code Data"
        width={600}
        visible={Modal_stack_typescreen}
        // onOk={handleOk}
        onCancel={showModal_stack_tysc_close}
        footer={false}
      >
        <Form form={frm_labcode_modal}>
          <Row justify="center">
            <Col span={2010} offset={1}>
              <Table
                columns={columns_labcode}
                dataSource={showLabCode_table}
                // bordered
                // showHeader={false}
                pagination={false}
                size="small"
                className="Labcod_modal"
                // scroll={{ x: 2500, y: 1000 }}
              />
            </Col>
          </Row>

          <Row justify="center" style={{ marginTop: "15px" }}>
            <Button
              className="btn-save"
              type="primary"
              onClick={save_type_sc_munti}
            >
              บันทึก
            </Button>
          </Row>
        </Form>
      </Modal>
      {/* stack passl type screen */}
      <Modal
        // title="ยืนยันรหัสผ่าน"
        visible={isModalPassword_munti}
        onOk={showModal_stackt_ysc}
        onCancel={() => {
          setisModalPassword_munti(false), setPassword();
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
              showModal_stackt_ysc();
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
            onClick={showModal_stackt_ysc}
            disabled={!password}
          >
            ยืนยัน
          </Button>
        </Row>
      </Modal>
      {/* save all type screen */}
      <Modal
        // title="ยืนยันรหัสผ่าน"
        visible={isModalVisible}
        onOk={save_all_typescreen}
        onCancel={() => {
          setIsModalVisible(false), setPassword();
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
          id="passsave_all_typescreen"
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
              save_all_typescreen();
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
            onClick={save_all_typescreen}
            disabled={!password}
          >
            ยืนยัน
          </Button>
        </Row>
      </Modal>
      {/* save all crossmatch */}

      <Modal
        // title="ยืนยันรหัสผ่าน"
        visible={modalsaveall_crossmatch}
        onOk={save_all_CS}
        onCancel={() => {
          setmodalsaveall_crossmatch(false), setPassword_saveallcross();
        }}
        okButtonProps={{
          disabled: !password_saveallcross,
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
          id="passcross"
          placeholder="กรุณากรอกรหัสผ่าน"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          style={{ width: "100%" }}
          value={password_saveallcross}
          onChange={(e) => setPassword_saveallcross(e.target.value)}
          onKeyDown={({ target: { value }, keyCode }) => {
            if (keyCode === 13) {
              // 13 คือ enter
              save_all_CS();
            }
          }}
        />
        <Row justify="end" style={{ marginTop: "10px" }}>
          <Button
            type="primary"
            danger
            onClick={() => {
              setmodalsaveall_crossmatch(false), setPassword_saveallcross();
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
            onClick={save_all_CS}
            disabled={!password_saveallcross}
          >
            ยืนยัน
          </Button>
        </Row>
      </Modal>
      {/* savestatus crossmatch ->XM_status */}

      <Modal
        // title="ยืนยันรหัสผ่าน"
        visible={modal_Save_XMstatus}
        onOk={Cross_save_status}
        onCancel={() => {
          setmodal_Save_XMstatus(false), setPass_XM();
        }}
        okButtonProps={{
          disabled: !pass_XM,
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
          id="passcross_xm"
          placeholder="กรุณากรอกรหัสผ่าน"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          style={{ width: "100%" }}
          value={pass_XM}
          onChange={(e) => setPass_XM(e.target.value)}
          onKeyDown={({ target: { value }, keyCode }) => {
            if (keyCode === 13) {
              // 13 คือ enter
              Cross_save_status();
            }
          }}
        />
        <Row justify="end" style={{ marginTop: "10px" }}>
          <Button
            type="primary"
            danger
            onClick={() => {
              setmodal_Save_XMstatus(false), setPass_XM();
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
            onClick={Cross_save_status}
            disabled={!pass_XM}
          >
            ยืนยัน
          </Button>
        </Row>
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
              <Row style={{ marginTop: "1px" }}>
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
                    // onSearch={onSearch}
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
                    style={{ marginLeft: "23px" }}
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
                      {WARD?.map((item) => (
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
                    style={{ marginTop: "-20px", marginLeft: "23px" }}
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
                    style={{ marginTop: "-20px", marginLeft: "26px" }}
                  >
                    {/* <Input style={{ width: "90px" }} /> */}
                    <Input.Password
                      id="Pcrossmatch_un"
                      placeholder="กรุณากรอกรหัสผ่าน"
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                      style={{ width: "100%" }}
                      value={passwordSendcrossmatchs_ungroup}
                      onChange={(e) =>
                        setPasswordSendcrossmatchs_ungroup(e.target.value)
                      }
                      onKeyDown={({ target: { value }, keyCode }) => {
                        if (keyCode === 13) {
                          // 13 คือ enter
                          save_crossmatch_UN();
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
                    onClick={save_crossmatch_UN}
                  >
                    &nbsp;&nbsp;ยืนยันการจ่ายเลือด
                  </Button>
                </Tooltip>
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
                </Tooltip>
              </Row>
            </Col>
          </Row>
        </Form>
      </Modal>

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
          id="passcross_xm_con"
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

      {/* --------------Pietent Note------------------- */}
      <Modal
        // title="ยืนยันรหัสผ่าน"
        visible={modal_ptNote}
        onOk={save_petient_note}
        onCancel={() => {
          setmodal_ptNote(false), setPassword();
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
          id="passcross_ptnote"
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
              save_petient_note();
            }
          }}
        />
        <Row justify="end" style={{ marginTop: "10px" }}>
          <Button
            type="primary"
            danger
            onClick={() => {
              setmodal_ptNote(false), setPassword();
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
            onClick={save_petient_note}
            disabled={!password}
          >
            ยืนยัน
          </Button>
        </Row>
      </Modal>
      {/* ------------------------ */}

      {/* modal showall typeSC */}
      <Modal
        title=""
        visible={modaltyp_sc}
        // onOk={handleOkGR_Alrit}
        onCancel={showModal_showall_tysc_onCancel}
        // className="Modalwarning_conGR"
        footer={false}
        width={3000}
        style={{ top: 12 }}
      >
        <Modal_type_andScreen
          showModal_showall_tysc_onCancel={showModal_showall_tysc_onCancel}
          OrderNumber={Data_record.order_number}
          Date={moment()}
        />
      </Modal>

      <Modal
        title=""
        visible={modal_cross_show}
        // onOk={handleOkGR_Alrit}
        onCancel={showModal_showall_crossmatching_onCancel}
        // className="noclose"
        footer={false}
        width={3000}
        style={{ top: 12 }}
        // onCancel={false}
      >
        <Modal_cross
          showModal_showall_crossmatching_onCancel={
            showModal_showall_crossmatching_onCancel
          }
          OrderNumber={Data_record.order_number}
          Date={moment()}
        />
      </Modal>

      {/* edit patient */}
      <Modal
        visible={isModalEdit}
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
        width={1200}
        footer={false}
        style={{ top: 12 }}
      >
        <Patient_blood_edit_modal
          ordernum={orderNum}
          handleCancelEdit={handleCancelEdit}
          onFinishSearch={onFinishSearch}
          // testParams={testParams}
        />
      </Modal>

      {/* --------------confirm Type screen------------------- */}
      <Modal
        // title="ยืนยันรหัสผ่าน"
        visible={Modalcon_typeSc}
        onOk={send_contype}
        onCancel={() => {
          SetModalcon_typeSc(false), setPassword();
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
          id="passcon_type_id"
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
              send_contype();
            }
          }}
        />
        <Row justify="end" style={{ marginTop: "10px" }}>
          <Button
            type="primary"
            danger
            onClick={() => {
              setIsModalcoSetModalcon_typeScnfirm_cross(false), setPassword();
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
            onClick={send_contype}
            disabled={!password}
          >
            ยืนยัน
          </Button>
        </Row>
      </Modal>
      {/* ------------------------ */}

      {/* --------------History------------------- */}
      <Modal
        // title="ยืนยันรหัสผ่าน"
        visible={ModalHis}
        onOk={send_contype}
        onCancel={CloseModal_HIS}
        width={1500}
        footer={false}
        style={{ top: 12 }}
      >
        <Row>
          <Col xs={24} xl={24} lg={24} style={{ paddingLeft: "10px" }}>
            <Row>
              <p style={{ marginTop: "-19px", fontSize: "14px" }}>
                {/* <b>ประวัติข้อมูลผู้ขอเลือด</b> */}
                ประวัติข้อมูลผู้ขอเลือด
              </p>
            </Row>
            <Tabs
              style={{ marginTop: "-8px" }}
              type="card"
              // tabBarStyle={{ height: "30px" }}
            >
              <TabPane tab="ประวัติการขอเลือด" key="1">
                <Form form={frmblood_request}>
                  <Form.Item
                    name="request_datetime_format"
                    label="ขอเลือดล่าสุด"
                    style={{
                      width: "40%",
                      // height: "32px",
                      marginTop: "-10px",
                      paddingLeft: "15px",
                    }}
                  >
                    <Input disabled size="small" />
                  </Form.Item>

                  <Form.Item
                    name="receive_datetime_format"
                    label="รับเลือดล่าสุด"
                    style={{
                      width: "40%",
                      marginTop: "-28px",
                      paddingLeft: "15px",
                    }}
                  >
                    <Input disabled size="small" />
                  </Form.Item>

                  <Form.Item
                    name=""
                    label="Patient Note"
                    style={{
                      width: "100%",
                      marginTop: "-22px",
                      paddingLeft: "15px",
                    }}
                  >
                    <Table
                      pagination={false}
                      dataSource={patientNote}
                      style={{ width: "80%" }}
                      columns={columnNote}
                      scroll={{ y: "60vh" }}
                      size="small"
                      className="His_req"
                    ></Table>
                  </Form.Item>
                </Form>
              </TabPane>

              <TabPane tab="Patient Grouping" key="2">
                <div>
                  <Tabs
                    tabPosition="left"
                    size="small"
                    style={{ marginLeft: "-23px" }}
                  >
                    <TabPane
                      tab="Grouping"
                      key="1"
                      style={{ marginLeft: "-19px" }}
                    >
                      <Table
                        dataSource={PtGrouping}
                        bordered
                        className="GroupingHis_req"
                        // rowClassName={() => "ant-table-thead1"}
                        //dataSource={Patient_Grouping}
                        pagination={false}
                        size="small"
                        scroll={{ x: 1300, y: "70vh" }}
                        width="100%"
                      >
                        <Column
                          title="เลขที่ใบขอ"
                          dataIndex="order_number"
                          key="order_number"
                          align="center"
                          width="70px"
                          fixed="left"
                          // className="antthead"
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
                          title="Note"
                          dataIndex="request_note"
                          key="request_note"
                          align="center"
                          width="200px"
                        />
                      </Table>
                    </TabPane>

                    <TabPane
                      tab="Antibody Screening"
                      key="2"
                      style={{ marginLeft: "-19px" }}
                    >
                      <Table
                        pagination={false}
                        className="GroupingHis_req"
                        bordered
                        dataSource={PtAntibody}
                        scroll={{ y: "70vh", x: 850 }}
                        style={{ width: "100%", color: "red" }}
                        size="small"
                      >
                        <Column
                          title="เลขที่ใบขอ"
                          dataIndex="order_number"
                          key="order_number"
                          align="center"
                          width="10%"
                          fixed="left"
                          // className="antthead"
                        />
                        <ColumnGroup title="O1">
                          <Column
                            title="RT"
                            dataIndex="abs_o1_rt"
                            key="abs_o1_rt"
                            align="center"
                            width="7%"
                          />
                          <Column
                            title="37 ํC"
                            dataIndex="abs_o1_37c"
                            key="abs_o1_37c"
                            align="center"
                            width="7%"
                          />
                          <Column
                            title="IAT"
                            dataIndex="abs_o1_iat"
                            key="abs_o1_iat"
                            align="center"
                            width="7%"
                          />
                        </ColumnGroup>
                        <ColumnGroup title="O2">
                          <Column
                            title="RT"
                            dataIndex="abs_o2_rt"
                            key="abs_o2_rt"
                            align="center"
                            width="7%"
                          />
                          <Column
                            title="37 ํC"
                            dataIndex="abs_o2_37c"
                            key="abs_o2_37c"
                            align="center"
                            width="7%"
                          />
                          <Column
                            title="IAT"
                            dataIndex="abs_o2_iat"
                            key="abs_o2_iat"
                            align="center"
                            width="7%"
                          />
                        </ColumnGroup>
                        <Column
                          title="Result"
                          dataIndex="abs_result"
                          key="abs_result"
                          align="center"
                          width="13%"
                        />
                        <Column
                          title="ผู้บันทึก"
                          dataIndex="abs_staff"
                          key="abs_staff"
                          align="center"
                          width="20%"
                        />
                        <Column
                          title="วันที่บันทึก"
                          dataIndex="abs_date_time_format"
                          key="abs_date_time_format"
                          align="center"
                          width="20%"
                        />
                      </Table>
                    </TabPane>

                    <TabPane
                      tab="DAT and Autocontrol"
                      key="3"
                      style={{ marginLeft: "-19px" }}
                    >
                      <Table
                        className="GroupingHis_req"
                        bordered
                        dataSource={PtDat}
                        // columns={columnDAT}
                        pagination={false}
                        scroll={{ y: "70vh", x: 1150 }}
                        style={{ width: "100%" }}
                        size="small"
                      >
                        <Column
                          title="เลขที่ใบขอ"
                          dataIndex="order_number"
                          key="order_number"
                          align="center"
                          width="7%"
                          fixed="left"
                          // className="antthead"
                        />
                        <ColumnGroup title="DAT">
                          <Column
                            title="RT"
                            dataIndex="dat_rt"
                            key="dat_rt"
                            align="center"
                            width="7%"
                          />
                          <Column
                            title="37 ํC"
                            dataIndex="dat_37c"
                            key="dat_37c"
                            align="center"
                            width="7%"
                          />
                          <Column
                            title="IAT"
                            dataIndex="dat_iat"
                            key="dat_iat"
                            align="center"
                            width="7%"
                          />
                          <Column
                            title="Result"
                            dataIndex="dat_result"
                            key="dat_result"
                            align="center"
                            width="7%"
                          />
                          <Column
                            title="ผู้บันทึก"
                            dataIndex="dat_staff"
                            key="dat_staff"
                            align="center"
                            width="15%"
                          />
                          <Column
                            title="วันที่บันทึก"
                            dataIndex="dat_datetime_format"
                            key="dat_datetime"
                            align="center"
                            width="15%"
                          />
                        </ColumnGroup>

                        <ColumnGroup title="Autocontrol">
                          <Column
                            title="RT"
                            dataIndex="autologous_rt"
                            key="autologous_rt"
                            align="center"
                            width="7%"
                          />
                          <Column
                            title="37 ํC"
                            dataIndex="autologous_37c"
                            key="autologous_37c"
                            align="center"
                            width="7%"
                          />
                          <Column
                            title="IAT"
                            dataIndex="autologous_iat"
                            key="autologous_iat"
                            align="center"
                            width="7%"
                          />
                          <Column
                            title="Result"
                            dataIndex="autologous_result"
                            key="autologous_result"
                            align="center"
                            width="7%"
                          />
                          <Column
                            title="ผู้บันทึก"
                            dataIndex="autologous_staff"
                            key="autologous_staff"
                            align="center"
                            width="15%"
                          />
                          <Column
                            title="วันที่บันทึก"
                            dataIndex="autologous_datetime_format"
                            key="autologous_datetime"
                            align="center"
                            width="15%"
                          />
                        </ColumnGroup>

                        <Column
                          title="Note"
                          dataIndex="Note"
                          key="Note"
                          align="center"
                          width="20%"
                        />
                      </Table>
                    </TabPane>
                  </Tabs>
                </div>
              </TabPane>
              <TabPane tab="Patient Note" Key="3">
                <Form form={frm_patientNote}>
                  <Row>
                    <Col span={22}>
                      <Form.Item
                        label="Patient Note"
                        name="pt_note_select"
                        style={{ width: "100%" }}
                      >
                        <Select
                          showSearch
                          mode="tags"
                          placeholder="Search to Select"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children.includes(input)
                          }
                          filterSort={(optionA, optionB) =>
                            optionA.children
                              .toLowerCase()
                              .localeCompare(optionB.children.toLowerCase())
                          }
                          // onKeyDown={({ target: { value }, keyCode }) => {
                          //   if (keyCode === 13) {
                          //     // 13 คือ enter
                          //     showModal_ptN();
                          //   }
                          // }}
                        >
                          {data_ptNote?.map((item) => (
                            <Option key={item.note_id} value={item.note_detail}>
                              {item.note_detail}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={1} style={{ paddingLeft: "10px" }}>
                      <Button
                        className="btn-showall-typescreen"
                        onClick={showModal_ptN}
                      >
                        บันทึก
                      </Button>
                    </Col>
                  </Row>
                </Form>
                <Row>
                  <Table
                    className="GroupingHis_req"
                    dataSource={pt_note_table}
                    columns={columns_ptNote}
                    size="small"
                    pagination={false}
                    // scroll={{ y: 310 }}
                    scroll={{
                      x: 100,
                      y: 460,
                    }}
                  />
                </Row>
              </TabPane>
              <TabPane tab="ประวัติการรับเลือด" key="4">
                <Table
                  className="GroupingHis_req"
                  size="small"
                  dataSource={receiveBloodList}
                  columns={columnReceived}
                  pagination={false}
                  scroll={{ y: "70vh", x: 750 }}
                  style={{ width: "100%" }}
                />
              </TabPane>

              <TabPane tab="ประวัติการเเพ้เลือด" key="5">
                <Table
                  className="GroupingHis_req"
                  size="small"
                  dataSource={reactionBloodList}
                  columns={columnEffect}
                  pagination={false}
                  scroll={{ y: "70vh", x: 850 }}
                  style={{ width: "100%" }}
                />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Modal>
      {/* ------------------------ */}
      {/* จ่ายลเลือด */}
      <Modal
        width={1500}
        style={{ top: "5px" }}
        footer={false}
        // title="จ่ายเลือด"
        visible={isModalTransBlood}
        onOk={handleOkTransBlood}
        onCancel={handleCancelTransBlood}
        bodyStyle={{ borderRadius: "20px" }}
      >
        <Row style={{ marginTop: "-18px" }}>
          <Patient_trans_blood
            handleCancelTransBlood={handleCancelTransBlood}
            orderNumber={Data_record.order_number}
          />
        </Row>
      </Modal>
    </>
  );
};
export default Patent_blood_request_lab_new;
