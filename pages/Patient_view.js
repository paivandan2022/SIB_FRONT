import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  RetweetOutlined,
  SaveFilled,
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
  Radio,
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
import Head from "next/head";
import { useEffect, useState } from "react";
import { MdManageSearch, MdRefresh } from "react-icons/md";
import { VscSaveAs } from "react-icons/vsc";
import { Layout } from "../components";
import api from "../lib/api";

const { Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;
const { Column, ColumnGroup } = Table;

const Viewpopup = (value) => {
  const scW = screen.width / 2;
  const scH = screen.height / 2;
  const appW = 1280;
  const appH = 600;
  const url = "/Donor_Search_donor_view?pid=" + value;
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
const Patient_view = () => {
  const [datadonor, setDatadonor] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [groupblood, setGroupblood] = useState();
  const [sex, setSex] = useState();
  const [rhname, setRhname] = useState();
  const [newPname, setNewPname] = useState([]);
  const [strAge, setStrAge] = useState(); //fecth อายุ
  const [newStrBirthday, setStrBirthday] = useState();
  const [checkData, setCheckData] = useState();
  const [dataHn, setDataHn] = useState();
  const [PtGrouping, setPtGrouping] = useState();
  const [PtAntibody, setPtAntibody] = useState();
  const [PtDat, setPtDat] = useState();
  const [patientNote, setPatientNote] = useState();
  const [receiveBloodList, setReceiveBloodList] = useState();
  const [reactionBloodList, setReactionBloodList] = useState();

  const [password, setPassword] = useState();
  const [isModalPassword, setIsModalPassword] = useState(false);
  const [keysTab, seKeysTab] = useState();

  const [dataFingerTip, setDataFingerTip] = useState([]);
  const [value, setValue] = useState(1);
  const [Data_ATB, setData_ATB] = useState([]);
  const [Data_ATG, setData_ATG] = useState([]);
  const [passwordSendIdentification, setPasswordSendIdentification] =
    useState();

  const [frmSearch] = Form.useForm();
  const [frmUpdate] = Form.useForm();
  const [frmblood_request] = Form.useForm();
  const [Identification_formAntibody] = Form.useForm();
  const [Identification_formAntigen] = Form.useForm();

  const Fetch_bloodgroup = async () => {
    const result = await api.get("/Get_group");
    setGroupblood(result.data);
  };

  const Fetch_sex = async () => {
    const result = await api.get("/Get_sex");
    setSex(result.data);
  };

  const Fetch_rh_name = async () => {
    const result = await api.get("/Get_Rh_Name");
    setRhname(result.data[0]);
  };

  const Fetch_pname = async () => {
    const result = await api.get("/pname_en_th");
    setNewPname(result.data);
  };

  const setDOB = (dateValue) => {
    console.log("dateValue------------------>", dateValue);
    const a = moment();
    const b = moment(dateValue, "YYYY-MM-DD").subtract(543, "years");

    setStrBirthday(b.toString());
    const age = moment.duration(a.diff(b));
    const years = age.years();
    const months = age.months();
    const day = age.days();
    const Age = years + " ปี " + months + " เดือน " + day + " วัน";
    setStrAge(Age);
  };

  //-----------------------------------//
  const onFinishSearch = async (value) => {
    console.log("value------>", value);
    try {
      const params = {
        ...value,
      };

      console.log("params", params);

      await Fetch_Donor_list(params);
    } catch (error) {
      // Modal.error({ title: "Error" });
    }
  };

  const Fetch_Donor_list = async (params) => {
    setLoadingTable(true);
    const result = await api.get("/Search_patient", { params });
    console.log("รายชื่อผู้บริจาค", result.data);
    setDatadonor(result.data);
    setLoadingTable(false);
  };

  //-----------------------------------//
  const Update_patient = async () => {
    const frm = frmUpdate.getFieldValue();
    console.log("frm", frm);

    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });
    console.log("resultLogin==>", resultLogin.data.user_name);
    const staff = resultLogin.data.user_name;
    const birthday = moment(frm.dob)
      .subtract(543, "years")
      .format("YYYY-MM-DD");
    console.log("birthday", birthday);

    const result = await api.put("/update_data_patient", {
      ...frm,
      dob: birthday,
      staff: staff,
    });

    console.log(frm.hn);
    const params = {
      keyword: frm.hn,
    };

    if (result.data.message == "success") {
      Modal.success({
        title: "แจ้งเตือน",
        content: "บันทีกข้อมูลเรียบร้อย",
      });
      setIsModalPassword(false);
      setPassword();
      frmUpdate.resetFields();
      setCheckData();
      setStrAge();
      Fetch_Donor_list(params);
    }
  };

  const showModal = () => {
    setIsModalPassword(true);
    setTimeout(() => {
      document.getElementById("pass").focus();
    }, 500);
  };

  const ClickRow = async (record) => {
    console.log("record", record);
    await changeTab("3", record.hn);
    seKeysTab("3");
    setCheckData(record);
    setDataHn(record.hn);
    setStrAge(record.cal_age);
    frmUpdate.setFieldsValue({
      ...record,
      dob: moment(record.birthday).add(543, "years"),
    });
  };

  //------------------//
  const Clear = () => {
    setDatadonor();
    setKeyword("");
    frmSearch.resetFields();
    frmUpdate.resetFields();
    setStrAge();
    setCheckData();
    setPtGrouping([]);
    setPtAntibody([]);
    setPtDat([]);
    setPatientNote([]);
    setReceiveBloodList([]);
    setReactionBloodList([]);
    setDataHn();
  };
  //-------------------------//
  const columns = [
    {
      title: "HN",
      dataIndex: "hn",
      key: "hn",
      align: "center",
    },
    {
      title: "ชื่อ-นามสกุล",
      dataIndex: "",
      key: "",
      align: "center",
      render: (text, record) =>
        `${record.pname}${record.fname} ${record.lname}`,
    },
  ];

  const changeTab = async (key, hn) => {
    seKeysTab();

    const params = {
      hn: hn,
    };

    if (key === "3") {
      const reqBloodHis = await api.get("/request_blood_his", { params });
      const recBloodHis = await api.get("/receive_blood_his", { params });
      frmblood_request.setFieldsValue({
        request_datetime_format: reqBloodHis.data?.request_datetime_format,
        receive_datetime_format: recBloodHis.data?.receive_datetime_format,
      });

      console.log("*", reqBloodHis.data?.request_datetime_format);
    }
    if (key === "4") {
      const pt_gr = await api.get("/hn_grouping", { params });
      const pt_abs = await api.get("/hn_antibody", { params });
      const pt_dat = await api.get("/hn_dat", { params });

      if (
        pt_gr.data === null ||
        pt_gr.data === "" ||
        pt_gr.data === undefined
      ) {
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
    }
    if (key === "5") {
      const recBloodList = await api.get("/receive_blood_list", { params });

      if (
        recBloodList.data === null ||
        recBloodList.data === "" ||
        recBloodList.data === undefined
      ) {
        setReceiveBloodList([]);
      } else {
        setReceiveBloodList(recBloodList.data);
      }
    }
    if (key === "6") {
      const reactBloodList = await api.get("/patient_react_list", { params });
      if (
        reactBloodList.data === null ||
        reactBloodList.data === "" ||
        reactBloodList.data === undefined
      ) {
        setReactionBloodList([]);
      } else {
        setReactionBloodList(reactBloodList.data[0]);
      }
    }
    if (key === "7") {
      const check_pucntfinger = await api.get("/check_fingerTip", { params });
      if (
        check_pucntfinger.data === null ||
        check_pucntfinger.data === "" ||
        check_pucntfinger.data === undefined
      ) {
        setDataFingerTip([]);
      } else {
        setDataFingerTip(check_pucntfinger.data);
      }
    }
    if (key === "8") {
      const patientNote = await api.get("/patient_note", { params });
      if (
        patientNote.data === null ||
        patientNote.data === "" ||
        patientNote.data === undefined
      ) {
        setPatientNote([]);
      } else {
        setPatientNote(patientNote.data);
      }
    }
    if (key === "9") {
      const result = await api.get("/GetAntibodyResult", {
        params,
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
      await setResultATB();
      setData_ATB(result?.data[0]);

      const result_atg = await api.get("/GetAntigenResult", {
        params,
      });
      console.log("=>>", result_atg.data);
      Identification_formAntigen.setFieldsValue({
        ...result_atg.data[0],
        a1: String(result_atg.data[0][0]?.a1),
        H: String(result_atg.data[0][0]?.H),
        D: String(result_atg.data[0][0]?.D),
        c1: String(result_atg.data[0][0]?.c1),
        c2: String(result_atg.data[0][0]?.c2),
        e1: String(result_atg.data[0][0]?.e1),
        e2: String(result_atg.data[0][0]?.e2),
        k1: String(result_atg.data[0][0]?.k1),
        k2: String(result_atg.data[0][0]?.k2),
        dia: String(result_atg.data[0][0]?.dia),
        dib: String(result_atg.data[0][0]?.dib),
        m: String(result_atg.data[0][0]?.m),
        n: String(result_atg.data[0][0]?.n),
        s1: String(result_atg.data[0][0]?.s1),
        s2: String(result_atg.data[0][0]?.s2),
        mia: String(result_atg.data[0][0]?.mia),
        lea: String(result_atg.data[0][0]?.lea),
        leb: String(result_atg.data[0][0]?.leb),
        coa: String(result_atg.data[0][0]?.coa),
        cob: String(result_atg.data[0][0]?.cob),
        jka: String(result_atg.data[0][0]?.jka),
        jkb: String(result_atg.data[0][0]?.jkb),
        i1: String(result_atg.data[0][0]?.i1),
        i2: String(result_atg.data[0][0]?.i2),
        p1: String(result_atg.data[0][0]?.p1),
        p: String(result_atg.data[0][0]?.p),
        lua: String(result_atg.data[0][0]?.lua),
        lub: String(result_atg.data[0][0]?.lub),
        fya: String(result_atg.data[0][0]?.fya),
        fyb: String(result_atg.data[0][0]?.fyb),
        xga: String(result_atg.data[0][0]?.xga),
        result: String(result_atg.data[0][0]?.result),
        save_staff: String(result_atg.data[0][0]?.save_staff),
        ATB_savedate: String(result_atg.data[0][0]?.ATB_savedate),
        ATB_savetime: String(result_atg.data[0][0]?.ATB_savetime),
        xga: String(result_atg.data[0][0]?.xga),
        fm: String(result_atg.data[0][0]?.fm),
        p1: String(result_atg.data[0][0]?.p1),
        tja: String(result_atg.data[0][0]?.tja),
        uniden: String(result_atg.data[0][0]?.uniden),
        lua: String(result_atg.data[0][0]?.lua),
        lub: String(result_atg.data[0][0]?.lub),
        rf: String(result_atg.data[0][0]?.rf),
        note_antigen: String(result_atg.data[0][0]?.note_antigen),

        // resultATG: String(result.data[0][0]?.resultATG),

        save_staff: String(result_atg.data[0][0]?.save_staff),
        ATJ_savedate: String(result_atg.data[0][0]?.ATJ_savedate),
        ATJ_savetime: String(result_atg.data[0][0]?.ATJ_savetime),
      });
      onChange();
      setData_ATG(result_atg?.data[0]);
    }
  };

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
      title: "Received Date.",
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

  const columnFingerTip = [
    {
      title: "วันที่",
      dataIndex: "fgt_datetime_save_format",
      key: "fgt_datetime_save_format",
      align: "center",
      width: "20%",
    },
    {
      title: "AntiA",
      dataIndex: "fgt_anti_a",
      key: "fgt_anti_a",
      width: "10%",
      align: "center",
    },
    {
      title: "AntiB",
      dataIndex: "fgt_anti_b",
      key: "fgt_anti_b",
      width: "10%",
      align: "center",
    },
    {
      title: "AntiA,B",
      dataIndex: "fgt_anti_ab",
      key: "fgt_anti_ab",
      width: "10%",
      align: "center",
    },
    {
      title: "Anti-D",
      dataIndex: "fgt_anti_d",
      key: "fgt_anti_d",
      width: "10%",
      align: "center",
    },
    {
      title: "Group",
      dataIndex: "fgt_blood_gr",
      key: "fgt_blood_gr",
      width: "10%",
      align: "center",
    },
    {
      title: "Rh",
      dataIndex: "fgt_blood_rh",
      key: "fgt_blood_rh",
      width: "10%",
      align: "center",
    },
    {
      title: "ผู้บันทึก",
      dataIndex: "fgt_staff",
      key: "fgt_staff",
      width: "30%",
      align: "center",
    },
  ];

  const setResultATB = (e, frm) => {
    const frmData = Identification_formAntibody.getFieldsValue();
    const keyList = Object.keys(frmData);
    const result = [];

    console.log("****", keyList);

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

  const Refresh = async () => {
    Identification_formAntigen.resetFields();
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
        console.log("formData_PGIdentification_formAntibody", formData_PG);

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
          hn: checkData.hn,
          note_antibody: formData_PG.note_antibody,
          // resultATB:resultATB,
        });
        const formData_PG2 = Identification_formAntigen.getFieldsValue();
        console.log("0000000000000000****", formData_PG2);
        const results = await api.post(`/UP_antigeniden`, {
          ...formData_PG2,
          staff: staff_name,
          hn: checkData.hn,
        });
        await changeTab("9",checkData.hn);

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



  useEffect(async () => {
    await Fetch_bloodgroup();
    await Fetch_sex();
    await Fetch_rh_name();
    await Fetch_pname();
    await changeTab();
  }, []);

  return (
    <>
      <Layout keyTab="Patient_view">
        <div>
          <Head>
            <title>SIBSOFT : แฟ้มข้อมูลผู้ป่วย</title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
        </div>
        <Row justify="center">
          <Col span={24}>
            <Card>
              <Tabs type="card" style={{ marginTop: -20 }}>
                <TabPane tab="แฟ้มข้อมูลผู้ป่วย" key="1">
                  <Row>
                    <Col
                      span={7}
                      style={{
                        // minheight: "90vh",
                        border: "1px solid",
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                    >
                      <Row justify="center" style={{ marginTop: "-2px" }}>
                        <Form
                          form={frmSearch}
                          layout="inline"
                          onFinish={onFinishSearch}
                        >
                          <Form.Item name="keyword" label="ค้นหา">
                            <Input
                              onChange={(e) => setKeyword(e.target.value)}
                              placeholder="ชื่อ-สกุล / เลขประจำตัวประชาชน"
                              style={{
                                width: "100%",
                                fontSize: "14px",
                              }}
                            />
                          </Form.Item>
                          <Form.Item>
                            <Tooltip
                              placement="right"
                              title={
                                !keyword || keyword === ""
                                  ? "กรุณากรอกข้อมูล"
                                  : ""
                              }
                            >
                              <Button
                                style={{
                                  fontSize: "12px",
                                  height: "28px",
                                  marginLeft: "5px",
                                  backgroundColor:
                                    !keyword || keyword === "" ? "" : "#17a2b8",
                                  color:
                                    !keyword || keyword === "" ? "" : "white",
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
                                disabled={!keyword || keyword === ""}
                              >
                                ค้นหา
                              </Button>
                            </Tooltip>
                          </Form.Item>
                        </Form>
                      </Row>

                      <Row justify="center" style={{ marginTop: "5px" }}>
                        <Col span={24}>
                          {/* <Card> */}
                          <Table
                            columns={columns}
                            dataSource={datadonor}
                            loading={loadingTable}
                            size="small"
                            className="xm colorPointer table_fixed"
                            bordered
                            pagination={false}
                            scroll={{ y: "100vh" }}
                            rowClassName={(record, index) => {
                              return record.hn === dataHn ? "clickFocus" : "";
                            }}
                            onRow={(record) => {
                              return {
                                onClick: () => {
                                  ClickRow(record);
                                },
                              };
                            }}
                          />
                          {/* </Card> */}
                        </Col>
                      </Row>
                    </Col>

                    <Col span={17} style={{ paddingLeft: "10px" }}>
                      <Row
                        style={{
                          border: "1px solid",
                          borderRadius: "5px",
                          padding: "10px",
                        }}
                      >
                        <Form form={frmUpdate}>
                          <Tabs onChange={onChange} type="card">
                            <TabPane tab="ข้อมูลผู้ป่วย" key="1">
                              <Row style={{ marginLeft: "10px" }}>
                                <Col>
                                  <Form.Item label="HN" name="hn">
                                    <Input
                                      disabled
                                      style={{ color: "black", width: "100px" }}
                                    ></Input>
                                  </Form.Item>
                                </Col>

                                <Col style={{ marginLeft: "15px" }}>
                                  <Form.Item label="คำนำหน้า" name="pname">
                                    <Select
                                      placeholder="คำนำหน้า"
                                      style={{
                                        fontSize: "14px",
                                        width: "120px",
                                      }}
                                      dropdownMatchSelectWidth={false}
                                    >
                                      {newPname.map((item) => (
                                        <Option
                                          key={item.prefix_id_th}
                                          value={item.pname_th}
                                        >
                                          {item.pname_th}
                                        </Option>
                                      ))}
                                    </Select>
                                  </Form.Item>
                                </Col>

                                <Col style={{ marginLeft: "15px" }}>
                                  <Form.Item label="ชื่อ" name="fname">
                                    <Input style={{ width: "150px" }}></Input>
                                  </Form.Item>
                                </Col>

                                <Col style={{ marginLeft: "10px" }}>
                                  <Form.Item label="นามสกุล" name="lname">
                                    <Input style={{ width: "150px" }}></Input>
                                  </Form.Item>
                                </Col>
                              </Row>

                              <Row style={{ marginTop: "-15px" }}>
                                <Col style={{ marginLeft: "5px" }}>
                                  <Form.Item label="เพศ" name="sex">
                                    <Select
                                      placeholder="เลือกเพศ"
                                      style={{
                                        width: "100%",
                                        fontSize: "14px",
                                      }}
                                    >
                                      {sex?.map((item) => (
                                        <Option
                                          key={item.code}
                                          value={item.code}
                                        >
                                          {item.name}
                                        </Option>
                                      ))}
                                    </Select>
                                  </Form.Item>
                                </Col>

                                <Col style={{ marginLeft: "17px" }}>
                                  <Form.Item
                                    name="dob"
                                    label="วัน-เดือน-ปีเกิด"
                                  >
                                    <DatePicker
                                      onChange={setDOB}
                                      format="DD-MM-YYYY"
                                      locale={th_TH}
                                      style={{
                                        width: "120px",
                                        fontSize: "14px",
                                      }}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col style={{ marginLeft: "10px" }}>
                                  <Form.Item label="อายุ">
                                    <Input
                                      placeholder="อายุ"
                                      style={{
                                        width: "145px",
                                        fontSize: "14px",
                                        color: "black",
                                      }}
                                      value={strAge}
                                      disabled
                                    />
                                  </Form.Item>
                                </Col>

                                <Col style={{ marginLeft: "17px" }}>
                                  <Form.Item label="หมู่เลือด" name="bloodgrp">
                                    <Select
                                      placeholder="เลือกหมู่เลือด"
                                      style={{
                                        width: "100%",
                                        fontSize: "14px",
                                      }}
                                    >
                                      {groupblood?.map((item) => (
                                        <Option
                                          key={item.blood_id}
                                          value={item.blood_name}
                                        >
                                          {item.blood_name}
                                        </Option>
                                      ))}
                                    </Select>
                                  </Form.Item>
                                </Col>
                                <Col style={{ marginLeft: "10px" }}>
                                  <Form.Item label="Rh" name="bloodrh">
                                    <Select
                                      placeholder="RH"
                                      style={{
                                        width: "100%",
                                        fontSize: "14px",
                                      }}
                                    >
                                      {rhname?.map((item) => (
                                        <Option
                                          key={item.rh_id}
                                          value={item.rh_shot_name}
                                        >
                                          {item.rh_shot_name}
                                        </Option>
                                      ))}
                                    </Select>
                                  </Form.Item>
                                </Col>
                              </Row>

                              <Row justify="end">
                                <Col>
                                  <Button
                                    disabled={
                                      !checkData || checkData.length <= 0
                                    }
                                    style={{
                                      fontSize: "12px",
                                      height: "28px",
                                      marginLeft: "-5px",
                                      backgroundColor:
                                        !checkData || checkData.length <= 0
                                          ? ""
                                          : "#3AB0FF",
                                      color:
                                        !checkData || checkData.length <= 0
                                          ? ""
                                          : "white",
                                    }}
                                    icon={
                                      <VscSaveAs
                                        style={{
                                          fontSize: "16px",
                                          marginRight: "3px",
                                          marginBottom: "-3px",
                                        }}
                                      />
                                    }
                                    onClick={showModal}
                                  >
                                    บันทึกข้อมูล
                                  </Button>
                                </Col>

                                <Col style={{ marginLeft: "10px" }}>
                                  <Button
                                    disabled={
                                      !datadonor || datadonor.length <= 0
                                    }
                                    style={{
                                      fontSize: "12px",
                                      height: "28px",
                                      marginLeft: "-5px",
                                      backgroundColor:
                                        !datadonor || datadonor.length <= 0
                                          ? ""
                                          : "orange",
                                      color:
                                        !datadonor || datadonor.length <= 0
                                          ? ""
                                          : "white",
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
                                    onClick={Clear}
                                  >
                                    เริ่มใหม่
                                  </Button>
                                </Col>
                              </Row>
                            </TabPane>
                            <TabPane tab="ข้อมูลครอบครัว" key="2">
                              <Row>
                                <Col></Col>
                              </Row>
                            </TabPane>
                          </Tabs>
                        </Form>
                      </Row>

                      <Row>
                        <Tabs
                          style={{ marginTop: "10px" }}
                          type="card"
                          tabBarStyle={{ height: "30px" }}
                          onChange={(key) => changeTab(key, dataHn)}
                          defaultActiveKey="3"
                          activeKey={keysTab}
                        >
                          <TabPane tab="ประวัติการขอเลือด" key="3">
                            <Form form={frmblood_request}>
                              <Form.Item
                                name="request_datetime_format"
                                label="ขอเลือดล่าสุด"
                                style={{
                                  width: "50%",
                                  height: "32px",
                                  marginTop: "-10px",
                                  paddingLeft: "15px",
                                }}
                              >
                                <Input
                                  disabled
                                  size="small"
                                  style={{
                                    color: "black",
                                    textAlign: "center",
                                  }}
                                />
                              </Form.Item>

                              <Form.Item
                                name="receive_datetime_format"
                                label="รับเลือดล่าสุด"
                                style={{
                                  width: "50%",
                                  marginTop: "-28px",
                                  paddingLeft: "15px",
                                }}
                              >
                                <Input
                                  disabled
                                  size="small"
                                  style={{
                                    color: "black",
                                    textAlign: "center",
                                  }}
                                />
                              </Form.Item>
                            </Form>
                          </TabPane>

                          <TabPane tab="Patient Grouping" key="4">
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
                                    className="xm"
                                    // rowClassName={() => "ant-table-thead1"}
                                    //dataSource={Patient_Grouping}
                                    pagination={false}
                                    size="small"
                                    scroll={{ x: 1300, y: 200 }}
                                    width="100%"
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
                                      width="70px"
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
                                    className="xm"
                                    bordered
                                    dataSource={PtAntibody}
                                    scroll={{ y: 200, x: 850 }}
                                    style={{ width: "100%", color: "red" }}
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
                                      width="70px"
                                    />
                                    <Column
                                      title="วันที่บันทึก"
                                      dataIndex="abs_date_time_format"
                                      key="abs_date_time_format"
                                      align="center"
                                      width="70px"
                                    />
                                  </Table>
                                </TabPane>

                                <TabPane
                                  tab="DAT and Autocontrol"
                                  key="3"
                                  style={{ marginLeft: "-19px" }}
                                >
                                  <Table
                                    className="xm"
                                    bordered
                                    dataSource={PtDat}
                                    // columns={columnDAT}
                                    pagination={false}
                                    scroll={{ y: 200, x: 1150 }}
                                    style={{ width: "100%" }}
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
                                        width="70px"
                                      />
                                      <Column
                                        title="วันที่บันทึก"
                                        dataIndex="dat_datetime_format"
                                        key="dat_datetime"
                                        align="center"
                                        width="70px"
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
                                        width="70px"
                                      />
                                      <Column
                                        title="วันที่บันทึก"
                                        dataIndex="autologous_datetime_format"
                                        key="autologous_datetime"
                                        align="center"
                                        width="70px"
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
                            </div>
                          </TabPane>

                          <TabPane tab="ประวัติการรับเลือด" key="5">
                            <Table
                              className="xm"
                              size="small"
                              dataSource={receiveBloodList}
                              columns={columnReceived}
                              pagination={false}
                              scroll={{ y: 200, x: 750 }}
                              style={{ width: "100%" }}
                            />
                          </TabPane>

                          <TabPane tab="ประวัติการเเพ้เลือด" key="6">
                            <Table
                              className="xm"
                              size="small"
                              dataSource={reactionBloodList}
                              columns={columnEffect}
                              pagination={false}
                              scroll={{ y: 200, x: 850 }}
                              style={{ width: "100%" }}
                            />
                          </TabPane>

                          <TabPane tab="ประวัติเจาะเลือดปลายนิ้ว" key="7">
                            <Table
                              className="xm"
                              size="small"
                              bordered
                              dataSource={dataFingerTip}
                              columns={columnFingerTip}
                              pagination={false}
                              scroll={{ y: 200 }}
                            ></Table>
                          </TabPane>

                          <TabPane tab="Patient Note" key="8">
                            <Row>
                              <Col span={24}>
                                <Table
                                  pagination={false}
                                  dataSource={patientNote}
                                  columns={columnNote}
                                  // scroll={{ y: 65 }}
                                  size="small"
                                  className="xm"
                                ></Table>
                              </Col>
                            </Row>
                          </TabPane>

                          <TabPane tab="Antibody/Antigen" key="9">
                            <Row justify="center">
                              <Col span={23}>
                                <div>
                                  <Tabs defaultActiveKey="1" type="card">
                                    <TabPane
                                      tab="Antibody"
                                      key="1"
                                      forceRender={true}
                                    >
                                      <Row justify="center">
                                        <Col span={24}>
                                          <Form
                                            form={Identification_formAntibody}
                                          >
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

                                    <TabPane
                                      tab="Antigen"
                                      key="2"
                                      forceRender={true}
                                    >
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
                                        <Row
                                          justify="end"
                                          style={{ marginTop: "10px" }}
                                        >
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
                              style={{
                                marginTop: "6px",
                                marginBottom: "-20px",
                              }}
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
                                        style={{
                                          marginLeft: "20px",
                                          fontWeight: "bold",
                                        }}
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
                                      <Form.Item
                                        label="หมายเหตุ"
                                        name="note_antibody"
                                      >
                                        <TextArea
                                          rows={1}
                                          placeholder="ระบุหมายเหตุ"
                                          style={{ width: "100%" }}
                                        />
                                      </Form.Item>
                                    </Form>
                                  </Col>
                                  <Col
                                    xs={12}
                                    xl={12}
                                    lg={12}
                                    style={{ paddingLeft: "13px" }}
                                  >
                                    <Form form={Identification_formAntigen}>
                                      <Form.Item
                                        label="หมายเหตุ"
                                        name="note_antigen"
                                      >
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
                              <Col
                                style={{ paddingLeft: "30px" }}
                                xs={12}
                                xl={12}
                                lg={12}
                              >
                                <b style={{ fontSize: "12px" }}>
                                  บันทึกล่าสุด:
                                  {/* <span style={{ color: "blue" }}>(Antibody )</span> */}
                                  <span
                                    style={{ color: "blue", fontSize: "12px" }}
                                  >
                                    {Data_ATB[0]?.save_staff}&nbsp;&nbsp;
                                    {Data_ATB[0]?.ATB_savedate}&nbsp;
                                    {Data_ATB[0]?.ATB_savetime}
                                  </span>
                                </b>
                              </Col>
                              <Col
                                xs={10}
                                xl={10}
                                lg={10}
                                style={{ paddingLeft: "15px" }}
                              >
                                <b style={{ fontSize: "12px" }}>
                                  บันทึกล่าสุด:
                                  {/* <span style={{ color: "blue" }}>(Antigen )</span> */}
                                  <span
                                    style={{ color: "blue", fontSize: "12px" }}
                                  >
                                    {Data_ATG[0]?.save_staff}&nbsp;&nbsp;
                                    {Data_ATG[0]?.ATG_savedate}&nbsp;
                                    {Data_ATG[0]?.ATG_savetime}
                                  </span>
                                </b>
                              </Col>
                            </Row>
                            {/* <Form form={Identification_formAntibody}> */}
                            <Row
                              justify="end"
                              style={{ marginBottom: "-10px" }}
                            >
                              <Form.Item
                                label="Pass"
                                // name="passSendIdentifications"
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
                                  value={passwordSendIdentification}
                                  onChange={(e) =>
                                    setPasswordSendIdentification(
                                      e.target.value
                                    )
                                  }
                                  onKeyDown={({
                                    target: { value },
                                    keyCode,
                                  }) => {
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
                                  icon={
                                    <SaveFilled style={{ color: "#fff" }} />
                                  }
                                  // htmlType="submit"
                                  onClick={SendIdentificationDATA}
                                >
                                  บันทึก
                                </Button>
                              </Tooltip>
                            </Row>
                          </TabPane>
                        </Tabs>
                      </Row>
                    </Col>
                  </Row>
                  <br />
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </Layout>
      {/* ------------------------ */}

      {/* modal  confrim password*/}
      <Modal
        visible={isModalPassword}
        onOk={Update_patient}
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
              Update_patient();
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
            onClick={Update_patient}
            disabled={!password}
          >
            ยืนยัน
          </Button>
        </Row>
      </Modal>
    </>
  );
};

export default Patient_view;
