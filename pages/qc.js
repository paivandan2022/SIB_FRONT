import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import {
  Affix,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
  Tabs,
  TimePicker,
  Tooltip,
} from "antd";
import ExcelJS from "exceljs";
import moment from "moment";
import "moment/locale/th";
import Head from "next/head";
import os from "os";
import React, { useEffect, useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { GoSettings } from "react-icons/go";
import { TiDeleteOutline } from "react-icons/ti";

import {
  MdManageSearch,
  MdOutlineCheckCircle,
  MdOutlineDeleteSweep,
  MdOutlinePlaylistAdd,
  MdRefresh,
} from "react-icons/md";
import { Layout } from "../components";
import api from "../lib/api";

let index = 0;

const { Option } = Select;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const Stock_return_blood = ({ computerName }) => {
  const [items, setItems] = useState();
  const [name, setName] = useState();
  const [newInst, setNewInst] = useState();

  const inputRef = useRef(null);

  const [items_2, setItems_2] = useState();
  const [name_2, setName_2] = useState("");
  const inputRef_2 = useRef(null);

  const [opt_type, setOpt_type] = useState();
  const [password, setPassword] = useState();
  const [isModalPassword, setIsModalPassword] = useState(false); //pass save qc
  const [bag_condition, setCheckbag_condition] = useState();
  const [bag_temp, setCheckbag_temp] = useState();

  const [data_show, setData_show] = useState([]);
  const [data_table, setData_table] = useState([]);
  const [count, setCount] = useState(0);

  const [res_choice, setRes_choice] = useState();
  const [res_choice_action, setRes_choice_action] = useState();
  const [res_choice_group, setRes_choice_group] = useState([]);
  const [res_choice_inst, setRes_choice_inst] = useState();
  const [dataRecord, setDataRecord] = useState(); //dataRecord ที่เลือก
  const [checkAdd, setCheckAdd] = useState(true); //เช็ค btn add
  const [isModalSetting, setIsModalSetting] = useState(false);
  const [isModalAction, setIsModalAction] = useState(false);
  const [isModalPassAction, setIsModalPassAction] = useState(false); //pass add act, comment
  const [isModalPassDel, setIsModalPassDel] = useState(false); //pass del set lot
  const [isModalPassAdd, setIsModalPasAdd] = useState(false); //pass add set lot
  const [isModalPassRev, setIsModalPasRev] = useState(false); //pass review
  const [isModalPassAprv, setIsModalPasAprv] = useState(false); //pass approve
  const [isModalPassInst, setIsModalPasInst] = useState(false); //pass inst

  const [dataSetting, setDataSetting] = useState([]); //data settinglot  all
  const [dataSetDel, setDataSetDel] = useState(); //data ID lot for del
  const [dataLot, setDataLot] = useState([]); //data settinglot check
  const [dataQcId, setDataQcId] = useState();

  const [frm_save_setting] = Form.useForm();
  const [frm_save_action] = Form.useForm();
  const [frm_search_his] = Form.useForm();
  const [frm_save_qc] = Form.useForm();

  const showModalSetting = async () => {
    setIsModalSetting(true);
    const result = await api.get("/Get_setting");
    setDataSetting(result.data);
  };

  const showModalPassReview = async (record) => {
    setIsModalPasRev(true);
    setDataRecord(record);
    setTimeout(() => {
      document.getElementById("passRev").focus();
    }, 0);
  };

  const showModalPassInst = async (value, id, key) => {
    let setData = [];
    setData.push({
      value: value,
      id: id,
      key: key,
    });
    setNewInst(setData);
    console.log(setData);

    setIsModalPasInst(true);
    setTimeout(() => {
      document.getElementById("passInst").focus();
    }, 0);
  };

  const showModalPassApprove = async (record) => {
    setIsModalPasAprv(true);
    setDataRecord(record);
    setTimeout(() => {
      document.getElementById("passAprv").focus();
    }, 0);
  };

  const showModalPassAct = async () => {
    setIsModalPassAction(true);
    setTimeout(() => {
      document.getElementById("passAct").focus();
    }, 0);
  };

  const showModalPassDel = async (record) => {
    setIsModalPassDel(true);
    setDataSetDel(record);
    setTimeout(() => {
      document.getElementById("passDel").focus();
    }, 0);
  };

  const showModalPassAdd = async () => {
    setIsModalPasAdd(true);
    setTimeout(() => {
      document.getElementById("passAdd").focus();
    }, 0);
  };

  const showModalAction = async (record) => {
    setIsModalAction(true);
    console.log("record", record);
    setDataRecord(record);
    record.qc_action || record.qc_comment
      ? frm_save_action.setFieldsValue({
          qc_action: record.qc_action,
          qc_comment: record.qc_comment,
        })
      : "";
  };

  const handlerClickDownloadButton = async (format) => {
    const workbook = new ExcelJS.Workbook();
    workbook.addWorksheet("รายงาน Qc");
    const worksheet = workbook.getWorksheet("รายงาน Qc");

    worksheet.columns = [
      { header: "", key: "c1", width: 4 },
      { header: "", key: "c2", width: 10 },
      { header: "", key: "c3" },
      { header: "", key: "c4" },
      { header: "", key: "c5" },
      { header: "", key: "c6" },
      { header: "", key: "c7" },
      { header: "", key: "c8" },
      { header: "", key: "c9" },
      { header: "", key: "c10" },
      { header: "", key: "c11" },
      { header: "", key: "c12" },
      { header: "", key: "c13" },
      { header: "", key: "c14" },
      { header: "", key: "c15" },
      { header: "", key: "c16" },
      { header: "", key: "c17" },
      { header: "", key: "c18", width: 30 },
      { header: "", key: "c19", width: 20 },
      { header: "", key: "c20", width: 25 },
      { header: "", key: "c21", width: 25 },
    ];
    worksheet.addRows([
      { c11: "รายงาน Qc" },
      // { c6: "ประจำวันที่" + date },
      { c7: " " },
      {
        c1: "#",
        c2: "Date",
        c3: "Time",
        c4: "Lot",
        c5: "Instrument",
        c6: "QC No.",
        c7: "Anti-A	",
        c8: "Anti-B",
        c9: "A Cell",
        c10: "B Cell",
        c11: "Anti-D",
        c12: "Group",
        c13: "O1",
        c14: "O2",
        c15: "ABS",
        c16: "DAT",
        c17: "Ag",
        c18: "Action",
        c19: "Comment",
        c20: "Reviewed",
        c21: "Approve",
      },
    ]);

    let dataTest = [];
    for (let i = 0; i < data_table.length; i++) {
      dataTest[i] = {
        c1: i + 1,
        c2: data_table[i].date,
        c3: data_table[i].qc_time,
        c4: data_table[i].qc_lot,
        c5: data_table[i].qc_instrument,
        c6: data_table[i].qc_count,
        c7: data_table[i].qc_anti_a,
        c8: data_table[i].qc_anti_b,
        c9: data_table[i].qc_a_cell,
        c10: data_table[i].qc_b_cell,
        c11: data_table[i].qc_anti_d,
        c12: data_table[i].qc_group,
        c13: data_table[i].qc_o1,
        c14: data_table[i].qc_o2,
        c15: data_table[i].qc_abs,
        c16: data_table[i].qc_dat,
        c17: data_table[i].qc_ag,
        c18: data_table[i].qc_action_code
          ? "A" + data_table[i].qc_action_code + " " + data_table[i].qc_action
          : "",
        c19: data_table[i].qc_comment,
        c20: data_table[i].qc_review_staff
          ? data_table[i].qc_review_staff +
            " " +
            moment(data_table[i].qc_review_datetime).format(
              "DD-MM-YYYY HH:mm:ss"
            )
          : "",
        c21: data_table[i].qc_approve_staff
          ? data_table[i].qc_approve_staff +
            " " +
            moment(data_table[i].qc_approve_datetime).format(
              "DD-MM-YYYY HH:mm:ss"
            )
          : "",
      };
    }
    worksheet.addRows(dataTest);

    console.log("***s", data_table);

    const uint8Array = await workbook.xlsx.writeBuffer();
    const blob = new Blob([uint8Array], {
      type: "application/octet-binary",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "รายงาน Qc" + moment().format("HH:mm:ss") + "." + format;
    a.click();
    a.remove();
  };

  const loadChoice = async () => {
    const result = await api.get("/Get_choice_qc");
    setRes_choice(result.data);
    console.log(result.data);
  };

  const loadChoiceAction = async () => {
    const result = await api.get("/Get_action_qc");
    setRes_choice_action(result.data);
  };

  const loadChoiceGroup = async () => {
    const result = await api.get("/Get_group_qc");
    setRes_choice_group(result.data);
    console.log("GR", result.data);
  };

  const loadChoiceInst = async () => {
    const result = await api.get("/Get_inst_qc");
    setRes_choice_inst(result.data);
  };

  const addGroup = async (value, id, key) => {
    console.log("Addid", id);
    console.log("Addkey", key);

    const result = await api.put(`Add_group_qc`, {
      qc_group_name: value,
    });

    if (result.data.message == "duplicate") {
      Modal.warning({
        title: "เเจ้งเตือน",
        content: "มีเเล้ว",
      });
    }
    await loadChoiceGroup();

    if (id == undefined) {
      //add row
      frm_save_qc.setFieldsValue({
        [id]: {
          [key]: { qc_group: value },
        },
      });
    } else if (key == undefined) {
      frm_save_qc.setFieldsValue({
        [id]: {
          [key]: { qc_group: value },
        },
      });
    } else if (key == "set" && id == "set") {
      frm_save_setting.setFieldsValue({
        qc_lot_abo: value,
      });
    }
  };

  const addInst = async () => {
    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });
    const staff_name = resultLogin.data.user_name;
    const value = newInst.find((item) => item);

    console.log("Addid", value.id);
    console.log("Addkey", value.key);

    const result = await api.put(`Add_inst_qc`, {
      qc_inst_name: value.value,
      qc_inst_staff: staff_name,
    });
    console.log("result---name22", result.data);
    if (result.data.message == "duplicate") {
      Modal.warning({
        title: "เเจ้งเตือน",
        content: "มีเเล้ว",
      });
    }
    await loadChoiceInst();
    setIsModalPasInst(false);
    setPassword();

    if (value.id == undefined) {
      //add row
      frm_save_qc.setFieldsValue({
        [value.id]: {
          [value.key]: { qc_instrument: value.value },
        },
      });
    } else if (value.key == undefined) {
      frm_save_qc.setFieldsValue({
        [value.id]: {
          [value.key]: { qc_instrument: value.value },
        },
      });
    } else if (value.key == "set" && value.id == "set") {
      frm_save_setting.setFieldsValue({
        qc_instrument: value.value,
      });
    }
  };

  //------------------------------------//
  useEffect(async () => {
    // await check();
    await Load_get_blood_reverse_condition();
    await Load_get_blood_reverse_choice();
    await loadChoice();
    await loadChoiceAction();
    await loadChoiceGroup();
    await loadChoiceInst();
    await Load_check_qc_not_review();
  }, []);
  //----------------------------------//

  const Load_get_blood_reverse_condition = async () => {
    const result = await api.get("/get_blood_reverse_condition");

    setItems(result.data);
  };
  const Load_get_blood_reverse_choice = async () => {
    const result = await api.get("/get_blood_reverse_choice");

    setItems_2(result.data);
  };

  const onChange = (key) => {
    // console.log(key);
    if (key === "1") {
      // console.log("1");
    }
    if (key === "2") {
      // console.log("2");
    }
  };
  const Fetch_data = async (value) => {
    console.log("val", value);
    const result = await api.get(`/search_blood_retrun`, {
      params: {
        keyword: value.unit_no,
        keyword_type: value.bag_type_id,
      },
    });
    if (result.data == "") {
      Modal.warning({
        title: "แจ้งเตือน !!",
        content: "ไม่พบข้อมูล...",
      });
    }
    setData_show(result.data);
    console.log("result", result.data);
  };
  const showModalPass = (record) => {
    setDataRecord(record);

    setPassword();
    setTimeout(() => {
      document.getElementById("pass").focus();
    }, 0);
    setIsModalPassword(true);
  };

  const SaerchHis = async () => {
    const frmData = frm_search_his.getFieldValue();
    try {
      const params = {
        qc_instrument: frmData.qc_instrument || "",
        qc_lot: frmData.qc_lot || "",
      };
      // console.log("params", params);

      await Fetch_his_list(params);
    } catch (error) {
      Modal.error({ title: "แจ้งเตือน", content: "กรุณาตรวจสอบ !!!" });
    }
  };

  const Fetch_his_list = async (params) => {
    const frmData = frm_search_his.getFieldValue();
    console.log("frmData=====>", frmData.qc_lot);

    console.log("=====>", params);
    const result = await api.get("/Get_result_qc", { params });
    const resultSetting = await api.get("/Get_action", { params });

    const keytype = [];
    const keyList = resultSetting.data;
    let lastType = "";
    keyList.forEach((item) => {
      if (item.qc_lot !== lastType) {
        keytype.push({
          qc_lot_no: (
            <b style={{ fontSize: "13px", textDecoration: "underline" }}>
              Lot No : {item.qc_lot}
            </b>
          ),
        });
        lastType = item.qc_lot;
      }
      keytype.push(item);
    });
    setDataLot(keytype);

    frm_search_his.setFieldsValue({
      qc_exp:
        result.data[0].qc_lot_exp == null || frmData.qc_lot === undefined
          ? ""
          : frmData.qc_lot !== undefined
          ? moment(result.data[0].qc_lot_exp)
              .add(543, "years")
              .format("DD-MM-YYYY")
          : "",
    });
    console.log("ราย...........", result.data);
    console.log("lot...........", resultSetting.data);
    setData_table(result.data);

    if (result.data == "") {
      Modal.warning({
        title: "แจ้งเตือน !!",
        content: "ไม่พบข้อมูล...",
      });
    }
    setCheckAdd(true);

    const dataUpdate = {};
    result.data.forEach((item) => {
      dataUpdate[item.qc_result_id] = {
        [item.key]: {
          qc_count: item.qc_count,
          qc_anti_a: item.qc_anti_a,
          qc_anti_b: item.qc_anti_b,
          qc_anti_d: item.qc_anti_d,
          qc_a_cell: item.qc_a_cell,
          qc_b_cell: item.qc_b_cell,
          qc_o1: item.qc_o1,
          qc_o2: item.qc_o2,
          qc_abs: item.qc_abs,
          qc_dat: item.qc_dat,
          qc_ag: item.qc_ag,
          qc_group: item.qc_group,
          qc_status_id: item.qc_status_id,
          qc_action: item.qc_action_name,
          qc_comment: item.qc_comment,
          qc_lot: item.qc_lot,
          qc_instrument: item.qc_instrument,
        },
      };
    });
    console.log("value---Set_auto--->", dataUpdate);
    frm_save_qc.setFieldsValue({
      ...dataUpdate,
    });
  };
  const Load_check_qc_not_review = async () => {
    const result = await api.get("/Get_result_not_review");
    // setQc_not_review(result.data);
    // console.log("--------", result.data);
    const resultSetting = await api.get("/Get_action_not_review");

    const keytype = [];
    const keyList = resultSetting.data;
    let lastType = "";
    keyList.forEach((item) => {
      if (item.qc_lot !== lastType) {
        keytype.push({
          qc_lot_no: (
            <b style={{ fontSize: "13px", textDecoration: "underline" }}>
              Lot No : {item.qc_lot}
            </b>
          ),
        });
        lastType = item.qc_lot;
      }
      keytype.push(item);
    });
    setDataLot(keytype);

    setData_table(result.data);
    if (result.data == "") {
      Modal.warning({
        title: "แจ้งเตือน !!",
        content: "ไม่พบข้อมูล...",
      });
    }
    setCheckAdd(true);
    const dataUpdate = {};
    result.data.forEach((item) => {
      dataUpdate[item.qc_result_id] = {
        [item.key]: {
          qc_count: item.qc_count,
          qc_anti_a: item.qc_anti_a,
          qc_anti_b: item.qc_anti_b,
          qc_anti_d: item.qc_anti_d,
          qc_a_cell: item.qc_a_cell,
          qc_b_cell: item.qc_b_cell,
          qc_o1: item.qc_o1,
          qc_o2: item.qc_o2,
          qc_abs: item.qc_abs,
          qc_dat: item.qc_dat,
          qc_ag: item.qc_ag,
          qc_group: item.qc_group,
          qc_status_id: item.qc_status_id,
          qc_action: item.qc_action_name,
          qc_comment: item.qc_comment,
          qc_lot: item.qc_lot,
          qc_instrument: item.qc_instrument,
        },
      };
    });
    console.log("value---Set_auto--->", dataUpdate);
    frm_save_qc.setFieldsValue({
      ...dataUpdate,
    });
  };

  const save = async () => {
    console.log("dataRecord**//", dataRecord);
    console.log("date**", moment().add(543, "years").format("DD/MM/YYYY"));

    const frmData = frm_save_qc.getFieldsValue();
    console.log("frmData**", frmData[dataRecord.qc_result_id]);

    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });
    const staff_name = resultLogin.data.user_name;
    let query;
    try {
      if (resultLogin.data.id_user) {
        if (!dataRecord.qc_result_id) {
          const dataInsert = frmData[dataRecord.qc_result_id]?.filter(
            (item, index) => index == dataRecord.key
          );
          const result = await api.put("/Save_qc", {
            ...dataInsert[0],
            qc_date: moment(dataInsert[0].qc_date).format("YYYY-MM-DD"),
            qc_time: moment(dataInsert[0].qc_time).format("HH:00:00"),
            qc_staff: staff_name,
          });
          console.log("result", result.data[0]);
          SaerchHis();
          // Load_check_qc_not_review();
          if (result.data.message == "success") {
            Modal.success({
              title: "แจ้งเตือน",
              content: "บันทึกสำเร็จ",
            });
          }
          setIsModalPassword(false);
          setPassword();
          setCheckAdd(true);
        } else {
          // เช็ค update วันปัจจุบัน
          let result;
          if (
            moment(dataRecord.qc_date).format("YYYY-MM-DD") ==
            moment().format("YYYY-MM-DD")
          ) {
            console.log("if");
            result = await api.put("/Save_qc", {
              ...frmData[dataRecord.qc_result_id]["undefined"],
              qc_result_id: dataRecord.qc_result_id,
              qc_staff: staff_name,
            });
          } else {
            console.log("else");
            result = await api.put("/Save_qc", {
              ...dataRecord,
              qc_result_id: dataRecord.qc_result_id,
              qc_comment:
                frmData[dataRecord.qc_result_id]["undefined"]?.qc_comment,
              qc_action:
                frmData[dataRecord.qc_result_id]["undefined"]?.qc_action,
              qc_staff: staff_name,
            });
          }

          if (result.data.message == "success") {
            Modal.success({
              title: "แจ้งเตือน",
              content: "บันทึกสำเร็จ",
            });
            setCheckAdd(true);
          }
          setIsModalPassword(false);
          setPassword();
          SaerchHis();
          // Load_check_qc_not_review();
        }
      } else {
        Modal.error({
          title: "Password invalid",
          content: "กรุณากรอกรหัสผ่านให้ถูกต้อง!!",
        });
      }
      setPassword();
    } catch (error) {
      Modal.error({
        title: "Error",
        content: "กรุณากรอกข้อมูลให้ครบถ้วน!!",
      });
    }
  };

  const saveAction = async () => {
    const frmData = frm_save_action.getFieldsValue();
    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });
    const staff_name = resultLogin.data.user_name;
    let addResult;

    if (typeof frmData.qc_action == "string") {
      addResult = await api.put(`Update_qc`, {
        // ...frmData,
        qc_action: frmData.qc_action,
        qc_comment: frmData.qc_comment,
        qc_staff: staff_name,
        qc_result_id: dataRecord?.qc_result_id,
        qc_lot: dataRecord?.qc_lot,
        qc_action_code: dataRecord?.qc_action_code,
      });
    } else {
      const check = frmData?.qc_action?.map((item) => item);

      for (let index = 0; index < check?.length; index++) {
        const result = await api.put(`Add_action_qc`, {
          qc_action_name: check[index],
        });
      }
      const actionDetail = frmData?.qc_action?.join(",");

      addResult = await api.put(`Update_qc`, {
        // ...frmData,
        qc_action: actionDetail,
        qc_comment: frmData.qc_comment,
        qc_staff: staff_name,
        qc_result_id: dataRecord?.qc_result_id,
        qc_lot: dataRecord?.qc_lot,
        qc_action_code: dataRecord?.qc_action_code,
      });
    }

    if (addResult.data.message == "success") {
      Modal.success({
        title: "แจ้งเตือน",
        content: "บันทึกสำเร็จ",
      });
    }
    await setIsModalPassAction(false);
    await setIsModalAction(false);
    setPassword();
    // SaerchHis();
    Load_check_qc_not_review();
  };

  const saveSetDel = async () => {
    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });
    const staff_name = resultLogin.data.user_name;

    const result = await api.put(`Add_setting_log`, {
      ...dataSetDel,
      qc_lot_staff_del: staff_name,
      qc_lot_exp: moment(dataSetDel?.qc_lot_exp).format("YYYY-MM-DD"),
      qc_lot_datetime: moment(dataSetDel?.qc_lot_datetime).format("YYYY-MM-DD"),
    });
    if (result.data.message == "success") {
      Modal.success({
        title: "แจ้งเตือน",
        content: "บันทึกสำเร็จ",
      });
      setIsModalPassDel(false);
      setPassword();
      const resultDel = await api.put(`Del_setting`, {
        qc_lot_id: dataSetDel.qc_lot_id,
      });
      showModalSetting();
    }
  };

  const saveSetAdd = async () => {
    const frmData = frm_save_setting.getFieldsValue();
    console.log("frm*", frmData);
    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });
    const staff_name = resultLogin.data.user_name;

    const result = await api.put(`Add_setting`, {
      ...frmData,
      qc_lot_staff: staff_name,
      qc_lot_exp:
        frmData.qc_lot_exp == undefined
          ? moment(frmData.qc_lot_exp).format("YYYY-MM-DD")
          : moment(frmData.qc_lot_exp)
              .subtract(543, "years")
              .format("YYYY-MM-DD"),
    });

    if (result.data.message == "success") {
      Modal.success({
        title: "แจ้งเตือน",
        content: "บันทึกสำเร็จ",
      });
      setIsModalPasAdd(false);
      setPassword();
      showModalSetting();
      frm_save_setting.resetFields();
    } else if (result.data.message == "duplicate") {
      Modal.warning({
        title: "เเจ้งเตือน",
        content: "มีเเล้ว",
      });
      setIsModalPasAdd(false);
      setPassword();
    }
  };

  const saveReview = async () => {
    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });
    const staff_name = resultLogin.data.user_name;

    const result = await api.put(`Up_review_staff`, {
      qc_review_staff: staff_name,
      qc_result_id: dataRecord?.qc_result_id,
    });

    if (result.data.message == "success") {
      Modal.success({
        title: "แจ้งเตือน",
        content: "บันทึกสำเร็จ",
      });
      setIsModalPasRev(false);
      setPassword();
      // SaerchHis();
      Load_check_qc_not_review();
    }
  };

  const saveApprove = async () => {
    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });
    const staff_name = resultLogin.data.user_name;

    const result = await api.put(`Up_approve_staff`, {
      qc_approve_staff: staff_name,
      qc_result_id: dataRecord?.qc_result_id,
    });

    if (result.data.message == "success") {
      Modal.success({
        title: "แจ้งเตือน",
        content: "บันทึกสำเร็จ",
      });
      setIsModalPasAprv(false);
      setPassword();
      // SaerchHis();
      Load_check_qc_not_review();
    }
  };

  const clearSearch = () => {
    setData_table([]);
    frm_search_his.resetFields();
    setCheckAdd(true);
    setDataLot([]);
  };
  // -------------------------------------------------------------------------------
  const ClickRow = (record) => {
    setDataQcId(record.qc_result_id);
    // const checkData = dataReaction.some(
    //   (item) => item.blood_no == record.blood_no
    // );
  };

  const columnsHis = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      fixed: "left",
      align: "center",
      render: (text, record) => (
        <div>
          {record.date ? (
            `${record.date}`
          ) : (
            <>
              <Form.Item
                name={[record.qc_result_id, record.key, "qc_date"]}
                noStyle
              >
                <DatePicker
                  defaultValue={moment().add(543, "years")}
                  format="DD-MM-YYYY"
                  size="small"
                  suffixIcon={false}
                />
              </Form.Item>
            </>
          )}
        </div>
      ),
      onCell: (record, index) => ({
        rowSpan: record.rowSpan,
      }),
    },
    {
      title: "Time",
      dataIndex: "qc_time",
      key: "qc_time",
      align: "center",
      fixed: "left",
      render: (text, record) => (
        <div>
          {record.qc_time ? (
            `${record.qc_time}`
          ) : (
            <>
              <Form.Item
                name={[record.qc_result_id, record.key, "qc_time"]}
                noStyle
              >
                <TimePicker
                  size="small"
                  defaultValue={moment()}
                  format="HH:mm:ss"
                  suffixIcon={false}
                  placeholder="เวลา"
                />
              </Form.Item>
            </>
          )}
        </div>
      ),
    },
    {
      title: "Lot",
      dataIndex: "qc_lot",
      key: "qc_lot",
      align: "center",
      fixed: "left",
      render: (text, record) =>
        record.qc_result_id &&
        moment(record.qc_date).format("YYYY-MM-DD") !==
          moment().format("YYYY-MM-DD") ? (
          record.qc_lot
        ) : record.qc_result_id && record.qc_approve_staff ? (
          record.qc_lot
        ) : (
          <Form.Item name={[record.qc_result_id, record.key, "qc_lot"]} noStyle>
            <Input
              id="qc_count"
              style={{ fontSize: "12px", textAlign: "center" }}
            />
          </Form.Item>
        ),
      onCell: (record, index) => ({
        className: record.className,
      }),
    },
    {
      title: "Instrument",
      dataIndex: "qc_instrument",
      key: "qc_instrument",
      align: "center",
      render: (text, record) =>
        record.qc_result_id &&
        moment(record.qc_date).format("YYYY-MM-DD") !==
          moment().format("YYYY-MM-DD") ? (
          record.qc_instrument
        ) : record.qc_result_id && record.qc_approve_staff ? (
          record.qc_instrument
        ) : (
          <Form.Item
            name={[record.qc_result_id, record.key, "qc_instrument"]}
            noStyle
          >
            <Select
              showSearch
              showArrow={false}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option?.children?.toLowerCase()?.includes(input?.toLowerCase())
              }
              onKeyDown={(e) => {
                const value = e.target.value;
                if (e.keyCode === 13) {
                  // 13 คือ enter
                  console.log("---", value);
                  showModalPassInst(value, record.qc_result_id, record.key);
                }
              }}
              style={{ width: "100%" }}
            >
              {res_choice_inst?.map((item) => (
                <Option
                  key={item.qc_inst_id}
                  value={item.qc_inst_name}
                  style={{ textAlign: "center", fontSize: "12px" }}
                >
                  {item.qc_inst_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        ),
      onCell: (record, index) => ({
        className: record.className,
      }),
    },
    {
      title: "QC",
      dataIndex: "qc_count",
      key: "qc_count",
      align: "center",
      render: (text, record) =>
        record.qc_result_id &&
        moment(record.qc_date).format("YYYY-MM-DD") !==
          moment().format("YYYY-MM-DD") ? (
          record.qc_count
        ) : record.qc_result_id && record.qc_approve_staff ? (
          record.qc_count
        ) : (
          <Form.Item
            name={[record.qc_result_id, record.key, "qc_count"]}
            noStyle
          >
            <Input id="qc_count" style={{ textAlign: "center" }} />
          </Form.Item>
        ),
      onCell: (record, index) => ({
        className: record.className,
      }),
    },
    {
      title: "Anti-A",
      dataIndex: "qc_anti_a",
      key: "qc_anti_a",
      align: "center",
      render: (text, record) =>
        record.qc_result_id &&
        moment(record.qc_date).format("YYYY-MM-DD") !==
          moment().format("YYYY-MM-DD") ? (
          <div
            className={
              record.qc_anti_a !== record.qc_lot_anti_a ? "fixedRow" : ""
            }
          >
            {record.qc_anti_a}
          </div>
        ) : record.qc_result_id && record.qc_approve_staff ? (
          <div
            className={
              record.qc_anti_a !== record.qc_lot_anti_a ? "fixedRow" : ""
            }
          >
            {record.qc_anti_a}
          </div>
        ) : (
          <Form.Item
            name={[record.qc_result_id, record.key, "qc_anti_a"]}
            noStyle
          >
            <Select
              showArrow={false}
              style={{
                width: "50px",
                fontSize: "12px",
                // color: result_Choice === "0" ? "red" : "",
              }}
            >
              {res_choice?.map((item) => (
                <Option
                  key={item.qc_ch_id}
                  value={item.qc_ch_short_name}
                  style={{ fontSize: "12px" }}
                >
                  {item.qc_ch_short_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        ),
      onCell: (record, index) => ({
        className: record.className,
      }),
    },
    {
      title: "Anti-B",
      dataIndex: "qc_anti_b",
      key: "qc_anti_b",
      align: "center",
      render: (text, record) =>
        record.qc_result_id &&
        moment(record.qc_date).format("YYYY-MM-DD") !==
          moment().format("YYYY-MM-DD") ? (
          <div
            className={
              record.qc_anti_b !== record.qc_lot_anti_b ? "fixedRow" : ""
            }
          >
            {record.qc_anti_b}
          </div>
        ) : record.qc_result_id && record.qc_approve_staff ? (
          <div
            className={
              record.qc_anti_b !== record.qc_lot_anti_b ? "fixedRow" : ""
            }
          >
            {record.qc_anti_b}
          </div>
        ) : (
          <Form.Item
            name={[record.qc_result_id, record.key, "qc_anti_b"]}
            noStyle
          >
            <Select
              showArrow={false}
              style={{
                width: "50px",
                fontSize: "12px",
                // color: result_Choice === "0" ? "red" : "",
              }}
            >
              {res_choice?.map((item) => (
                <Option
                  key={item.qc_ch_id}
                  value={item.qc_ch_short_name}
                  style={{ fontSize: "12px" }}
                >
                  {item.qc_ch_short_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        ),
      onCell: (record, index) => ({
        className: record.className,
      }),
    },
    {
      title: "A Cell",
      dataIndex: "qc_a_cell",
      key: "qc_a_cell",
      align: "center",
      render: (text, record) =>
        record.qc_result_id &&
        moment(record.qc_date).format("YYYY-MM-DD") !==
          moment().format("YYYY-MM-DD") ? (
          <div
            className={
              record.qc_a_cell !== record.qc_lot_cell_a ? "fixedRow" : ""
            }
          >
            {record.qc_a_cell}
          </div>
        ) : record.qc_result_id && record.qc_approve_staff ? (
          <div
            className={
              record.qc_a_cell !== record.qc_lot_cell_a ? "fixedRow" : ""
            }
          >
            {record.qc_a_cell}
          </div>
        ) : (
          <Form.Item
            name={[record.qc_result_id, record.key, "qc_a_cell"]}
            noStyle
          >
            <Select
              showArrow={false}
              style={{
                width: "50px",
                fontSize: "12px",
                // color: result_Choice === "0" ? "red" : "",
              }}
            >
              {res_choice?.map((item) => (
                <Option
                  key={item.qc_ch_id}
                  value={item.qc_ch_short_name}
                  style={{ fontSize: "12px" }}
                >
                  {item.qc_ch_short_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        ),
      onCell: (record, index) => ({
        className: record.className,
      }),
    },
    {
      title: "B Cell",
      dataIndex: "qc_b_cell",
      key: "qc_b_cell",
      align: "center",
      render: (text, record) =>
        record.qc_result_id &&
        moment(record.qc_date).format("YYYY-MM-DD") !==
          moment().format("YYYY-MM-DD") ? (
          <div
            className={
              record.qc_b_cell !== record.qc_lot_cell_b ? "fixedRow" : ""
            }
          >
            {record.qc_b_cell}
          </div>
        ) : record.qc_result_id && record.qc_approve_staff ? (
          <div
            className={
              record.qc_b_cell !== record.qc_lot_cell_b ? "fixedRow" : ""
            }
          >
            {record.qc_b_cell}
          </div>
        ) : (
          <Form.Item
            name={[record.qc_result_id, record.key, "qc_b_cell"]}
            noStyle
          >
            <Select
              showArrow={false}
              style={{
                width: "50px",
                fontSize: "12px",
                // color: result_Choice === "0" ? "red" : "",
              }}
            >
              {res_choice?.map((item) => (
                <Option
                  key={item.qc_ch_id}
                  value={item.qc_ch_short_name}
                  style={{ fontSize: "12px" }}
                >
                  {item.qc_ch_short_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        ),
      onCell: (record, index) => ({
        className: record.className,
      }),
    },
    {
      title: "Anti-D",
      dataIndex: "qc_anti_d",
      key: "qc_anti_d",
      align: "center",
      render: (text, record) =>
        record.qc_result_id &&
        moment(record.qc_date).format("YYYY-MM-DD") !==
          moment().format("YYYY-MM-DD") ? (
          <div
            className={
              record.qc_anti_d !== record.qc_lot_anti_d ? "fixedRow" : ""
            }
          >
            {record.qc_anti_d}
          </div>
        ) : record.qc_result_id && record.qc_approve_staff ? (
          <div
            className={
              record.qc_anti_d !== record.qc_lot_anti_d ? "fixedRow" : ""
            }
          >
            {record.qc_anti_d}
          </div>
        ) : (
          <Form.Item
            name={[record.qc_result_id, record.key, "qc_anti_d"]}
            noStyle
          >
            <Select
              showArrow={false}
              style={{
                width: "50px",
                fontSize: "12px",
                // color: result_Choice === "0" ? "red" : "",
              }}
            >
              {res_choice?.map((item) => (
                <Option
                  key={item.qc_ch_id}
                  value={item.qc_ch_short_name}
                  style={{ fontSize: "12px" }}
                >
                  {item.qc_ch_short_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        ),
      onCell: (record, index) => ({
        className: record.className,
      }),
    },
    {
      title: "Gr",
      dataIndex: "qc_group",
      key: "qc_group",
      align: "center",
      render: (text, record) =>
        record.qc_result_id &&
        moment(record.qc_date).format("YYYY-MM-DD") !==
          moment().format("YYYY-MM-DD") ? (
          <div
            className={record.qc_group !== record.qc_lot_abo ? "fixedRow" : ""}
          >
            {record.qc_group}
          </div>
        ) : record.qc_result_id && record.qc_approve_staff ? (
          <div
            className={record.qc_group !== record.qc_lot_abo ? "fixedRow" : ""}
          >
            {record.qc_group}
          </div>
        ) : (
          <Form.Item
            name={[record.qc_result_id, record.key, "qc_group"]}
            noStyle
            style={{
              fontSize: "10px",
            }}
          >
            <Select
              showSearch
              showArrow={false}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option?.children?.toLowerCase()?.includes(input?.toLowerCase())
              }
              onKeyDown={(e) => {
                const value = e.target.value;
                if (e.keyCode === 13) {
                  // 13 คือ enter
                  console.log("---", value);
                  addGroup(value, record.qc_result_id, record.key);
                }
              }}
              style={{ width: "100%" }}
            >
              {res_choice_group.map((item) => (
                <Option key={item.qc_group_id} value={item.qc_group_name}>
                  {item.qc_group_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        ),
      onCell: (record, index) => ({
        className: record.className,
      }),
    },
    {
      title: "O1",
      dataIndex: "qc_o1",
      key: "qc_o1",
      align: "center",
      render: (text, record) =>
        record.qc_result_id &&
        moment(record.qc_date).format("YYYY-MM-DD") !==
          moment().format("YYYY-MM-DD") ? (
          <div className={record.qc_o1 !== record.qc_lot_o1 ? "fixedRow" : ""}>
            {record.qc_o1}
          </div>
        ) : record.qc_result_id && record.qc_approve_staff ? (
          <div className={record.qc_o1 !== record.qc_lot_o1 ? "fixedRow" : ""}>
            {record.qc_o1}
          </div>
        ) : (
          <Form.Item name={[record.qc_result_id, record.key, "qc_o1"]} noStyle>
            <Select
              showArrow={false}
              style={{
                width: "50px",
                fontSize: "12px",
                // color: result_Choice === "0" ? "red" : "",
              }}
            >
              {res_choice?.map((item) => (
                <Option
                  key={item.qc_ch_id}
                  value={item.qc_ch_short_name}
                  style={{ fontSize: "12px" }}
                >
                  {item.qc_ch_short_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        ),
      onCell: (record, index) => ({
        className: record.className,
      }),
    },
    {
      title: "O2",
      dataIndex: "qc_o2",
      key: "qc_o2",
      align: "center",
      render: (text, record) =>
        record.qc_result_id &&
        moment(record.qc_date).format("YYYY-MM-DD") !==
          moment().format("YYYY-MM-DD") ? (
          <div className={record.qc_o2 !== record.qc_lot_o2 ? "fixedRow" : ""}>
            {record.qc_o2}
          </div>
        ) : record.qc_result_id && record.qc_approve_staff ? (
          <div className={record.qc_o2 !== record.qc_lot_o2 ? "fixedRow" : ""}>
            {record.qc_o2}
          </div>
        ) : (
          <Form.Item name={[record.qc_result_id, record.key, "qc_o2"]} noStyle>
            <Select
              showArrow={false}
              style={{
                width: "50px",
                fontSize: "12px",
                // color: result_Choice === "0" ? "red" : "",
              }}
            >
              {res_choice?.map((item) => (
                <Option
                  key={item.qc_ch_id}
                  value={item.qc_ch_short_name}
                  style={{ fontSize: "12px" }}
                >
                  {item.qc_ch_short_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        ),
      onCell: (record, index) => ({
        className: record.className,
      }),
    },
    {
      title: "ABS",
      dataIndex: "qc_abs",
      key: "qc_abs",
      align: "center",
      render: (text, record) =>
        record.qc_result_id &&
        moment(record.qc_date).format("YYYY-MM-DD") !==
          moment().format("YYYY-MM-DD") ? (
          <div
            className={record.qc_abs !== record.qc_lot_abs ? "fixedRow" : ""}
          >
            {record.qc_abs}
          </div>
        ) : record.qc_result_id && record.qc_approve_staff ? (
          <div
            className={record.qc_abs !== record.qc_lot_abs ? "fixedRow" : ""}
          >
            {record.qc_abs}
          </div>
        ) : (
          <Form.Item name={[record.qc_result_id, record.key, "qc_abs"]} noStyle>
            <Select
              showArrow={false}
              style={{
                width: "50px",
                fontSize: "12px",
                // color: result_Choice === "0" ? "red" : "",
              }}
            >
              {res_choice?.map((item) => (
                <Option
                  key={item.qc_ch_id}
                  value={item.qc_ch_short_name}
                  style={{ fontSize: "12px" }}
                >
                  {item.qc_ch_short_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        ),
      onCell: (record, index) => ({
        className: record.className,
      }),
    },
    {
      title: "DAT",
      dataIndex: "qc_dat",
      key: "qc_dat",
      align: "center",
      render: (text, record) =>
        record.qc_result_id &&
        moment(record.qc_date).format("YYYY-MM-DD") !==
          moment().format("YYYY-MM-DD") ? (
          <div
            className={record.qc_dat !== record.qc_lot_dat ? "fixedRow" : ""}
          >
            {record.qc_dat}
          </div>
        ) : record.qc_result_id && record.qc_approve_staff ? (
          <div
            className={record.qc_dat !== record.qc_lot_dat ? "fixedRow" : ""}
          >
            {record.qc_dat}
          </div>
        ) : (
          <Form.Item name={[record.qc_result_id, record.key, "qc_dat"]} noStyle>
            <Select
              showArrow={false}
              style={{
                width: "50px",
                fontSize: "12px",
                // color: result_Choice === "0" ? "red" : "",
              }}
            >
              {res_choice?.map((item) => (
                <Option
                  key={item.qc_ch_id}
                  value={item.qc_ch_short_name}
                  style={{ fontSize: "12px" }}
                >
                  {item.qc_ch_short_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        ),
      onCell: (record, index) => ({
        className: record.className,
      }),
    },
    {
      title: "Ag",
      dataIndex: "qc_ag",
      key: "qc_ag",
      width: "5%",
      align: "center",
      render: (text, record) =>
        record.qc_result_id &&
        moment(record.qc_date).format("YYYY-MM-DD") !==
          moment().format("YYYY-MM-DD") ? (
          <div className={record.qc_ag !== record.qc_lot_ag ? "fixedRow" : ""}>
            {record.qc_ag}
          </div>
        ) : record.qc_result_id && record.qc_approve_staff ? (
          <div className={record.qc_ag !== record.qc_lot_ag ? "fixedRow" : ""}>
            {record.qc_ag}
          </div>
        ) : (
          <>
            <Form.Item
              name={[record.qc_result_id, record.key, "qc_ag"]}
              noStyle
            >
              <Select
                showArrow={false}
                style={{
                  width: "50px",
                  fontSize: "12px",
                  marginRight: "5px",
                  // color: result_Choice === "0" ? "red" : "",
                }}
              >
                {res_choice?.map((item) => (
                  <Option
                    key={item.qc_ch_id}
                    value={item.qc_ch_short_name}
                    style={{ fontSize: "12px" }}
                  >
                    {item.qc_ch_short_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {record.qc_result_id && (
              <Tooltip placement="right" title="คลิกเพื่อยืนยันการแก้ไขข้อมูล">
                <FiEdit
                  hidden={record.qc_approve_staff}
                  className="pointer"
                  style={{ fontSize: "17px", marginBottom: "-2px" }}
                  onClick={() => showModalPass(record)}
                />
              </Tooltip>
            )}
          </>
        ),
      onCell: (record, index) => ({
        className: record.className,
      }),
    },

    {
      title: "Action",
      dataIndex: "qc_action",
      key: "qc_action",
      align: "center",
      render: (text, record) =>
        record.qc_result_id && !record.qc_approve_staff ? (
          <Button
            type="primary"
            size="small"
            onClick={() => showModalAction(record)}
          >
            A{record.qc_action_code}
          </Button>
        ) : record.qc_approve_staff ? (
          <Button disabled size="small">
            A{record.qc_action_code}
          </Button>
        ) : (
          <Button
            disabled
            type="primary"
            size="small"
            onClick={() => showModalAction(record)}
          >
            A
          </Button>
        ),
      onCell: (record, index) => ({
        className: record.className,
      }),
    },
    {
      title: "Review",
      dataIndex: "qc_review_staff",
      key: "qc_review_staff",
      align: "center",
      render: (text, record) =>
        record.qc_result_id && !record.qc_review_staff ? (
          <Button
            type="primary"
            size="small"
            onClick={() => showModalPassReview(record)}
          >
            Rev
          </Button>
        ) : record.qc_review_staff ? (
          <MdOutlineCheckCircle
            style={{ fontSize: "20px", color: "green", marginBottom: "-4px" }}
          />
        ) : (
          <Button
            type="primary"
            size="small"
            onClick={() => showModalPass(record)}
          >
            Save
          </Button>
        ),
      onCell: (record, index) => ({
        className: record.className,
      }),
    },
    {
      title: "Review By",
      dataIndex: "qc_review_staff",
      key: "qc_review_staff",
      width: "8%",
      align: "center",
      render: (text, record) =>
        record.qc_review_staff ? (
          <h>
            {record.qc_review_staff}
            {moment(record.qc_review_datetime)
              .add(543, "years")
              .format("DD-MM-YYYY HH:mm:ss")}
          </h>
        ) : (
          ""
        ),
      onCell: (record, index) => ({
        className: record.className,
      }),
    },
    {
      title: "Approve",
      dataIndex: "qc_review_staff",
      key: "qc_review_staff",
      align: "center",
      render: (text, record) =>
        record.qc_review_staff && !record.qc_approve_staff ? (
          <Button
            type="primary"
            size="small"
            // icon={<PlusOutlined style={{ fontSize: "12px" }} />}
            // onClick={addItem_2}
            onClick={() => showModalPassApprove(record)}
          >
            Aprv
          </Button>
        ) : record.qc_approve_staff ? (
          <MdOutlineCheckCircle
            style={{ fontSize: "20px", color: "green", marginBottom: "-4px" }}
          />
        ) : (
          <Button
            disabled
            type="primary"
            size="small"
            onClick={() => showModalAction(record)}

            // icon={<PlusOutlined style={{ fontSize: "12px" }} />}
          >
            Aprv
          </Button>
        ),

      onCell: (record, index) => ({
        className: record.className,
      }),
    },
    {
      title: "Approve By",
      dataIndex: "qc_approve_staff",
      key: "qc_approve_staff",
      align: "center",
      width: "8%",
      render: (text, record) =>
        record.qc_approve_staff ? (
          <h>
            {record.qc_approve_staff}
            {moment(record.qc_approve_datetime)
              .add(543, "years")
              .format("DD-MM-YYYY HH:mm:ss")}
          </h>
        ) : (
          ""
        ),
      onCell: (record, index) => ({
        className: record.className,
      }),
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      align: "center",
      render: (text, record) =>
        record.qc_result_id ? (
          ""
        ) : (
          <Tooltip placement="right" title="คลิกเพื่อลบข้อมูล">
            <MdOutlineDeleteSweep
              className="pointer"
              style={{ fontSize: "16px", color: "red" }}
              onClick={() => handleDelete(record.key)}
            />
          </Tooltip>
        ),
      onCell: (record, index) => ({
        className: record.className,
      }),
    },
  ];

  const columnsSetting = [
    {
      title: "Lot",
      dataIndex: "qc_lot_id",
      key: "qc_lot_id",
      align: "center",
      width: "4%",
    },
    {
      title: "Exp",
      dataIndex: "qc_date_exp",
      key: "qc_date_exp",
      align: "center",
      width: "4%",
    },
    {
      title: "Instrument",
      dataIndex: "qc_instrument",
      key: "qc_instrument",
      align: "center",
      width: "4%",
    },
    {
      title: "Anti-A",
      dataIndex: "qc_lot_anti_a",
      key: "qc_lot_anti_a",
      align: "center",
      width: "4%",
    },
    {
      title: "Anti-B",
      dataIndex: "qc_lot_anti_b",
      key: "qc_lot_anti_b",
      align: "center",
      width: "4%",
    },
    {
      title: "A Cell",
      dataIndex: "qc_lot_cell_a",
      key: "qc_lot_cell_a",
      align: "center",
      width: "4%",
    },
    {
      title: "B Cell",
      dataIndex: "qc_lot_cell_b",
      key: "qc_lot_cell_b",
      align: "center",
      width: "4%",
    },
    {
      title: "Anti-D",
      dataIndex: "qc_lot_anti_d",
      key: "qc_lot_anti_d",
      align: "center",
      width: "4%",
    },
    {
      title: "Gr",
      dataIndex: "qc_lot_abo",
      key: "qc_lot_abo",
      align: "center",
      width: "6%",
    },
    {
      title: "O1",
      dataIndex: "qc_lot_o1",
      key: "qc_lot_o1",
      align: "center",
      width: "4%",
    },
    {
      title: "O2",
      dataIndex: "qc_lot_o2",
      key: "qc_lot_o2",
      align: "center",
      width: "4%",
    },
    {
      title: "ABS",
      dataIndex: "qc_lot_abs",
      key: "qc_lot_abs",
      align: "center",
      width: "4%",
    },
    {
      title: "DAT",
      dataIndex: "qc_lot_dat",
      key: "qc_lot_dat",
      align: "center",
      width: "4%",
    },
    {
      title: "Ag",
      dataIndex: "qc_lot_ag",
      key: "qc_lot_ag",
      align: "center",
      width: "4%",
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      align: "center",
      width: "3%",
      render: (text, record) => (
        <TiDeleteOutline
          onClick={() => showModalPassDel(record)}
          style={{ color: "red", fontSize: "22px" }}
        />
      ),
    },
  ];

  const columnsAction = [
    {
      title: "Action",
      dataIndex: "qc_lot_no",
      key: "qc_lot_no",
      width: "4%",
      render: (text, record) => <div>{text}</div>,
    },
  ];

  const handleAdd = () => {
    console.log("check_add1212", checkAdd);
    const frm = frm_save_qc.getFieldsValue();

    // window.scrollTo(0, 1000);
    setTimeout(() => {
      document.getElementById("qc_count").focus();
      window.scrollTo({
        top: 1000,
        left: 100,
        behavior: "smooth",
      });
    }, 0);

    console.log("**", frm);
    if (checkAdd == false) {
      Modal.warning({
        title: "แจ้งเตือน!!!",
        content: "ไม่สามารถเพิ่มข้อมูลได้ กรุณาตรวจสอบอีกครั้ง",
      });
    } else {
      const newData = {
        key: count,
      };
      setData_table([...data_table, newData]);
      setCount(count + 1);

      setCheckAdd(false);
    }

    console.log("=>>**", newData);
    console.log("Add=>>**", dataSource);

    // console.log("every=>>**",dataSource.every((item)=>item.qc_result_id));
  };

  const handleDelete = (key) => {
    console.log("delete", key);
    const newData = data_table.filter((item) => item.key !== key);
    setData_table(newData);
    setCheckAdd(true);
  };

  const dataSource = [];

  let temCount = 1;
  let temIndex = 0;
  data_table.forEach((item, index) => {
    const dateTime = `${item.date}`;
    if (dataSource[index - 1]?.dateTime === dateTime) {
      temCount += 1;
      dataSource.push({
        ...item,
        rowSpan: 0,
        dateTime,
        //className: item.qc_anti_a !== 'Neg' ? "fixedRow":item.qc_anti_b !== 'Neg'?"fixedRow":""
      });
      if (index + 1 === data_table.length) {
        dataSource[temIndex].rowSpan = temCount;
      }
    } else {
      dataSource.push({
        ...item,
        rowSpan: 1,
        dateTime,
        // className: item.qc_anti_a !== 'Neg' ? "fixedRow":item.qc_anti_b !== 'Neg'?"fixedRow":""
      });

      if (dataSource[temIndex]) {
        dataSource[temIndex].rowSpan = temCount;
      }
      temIndex = index;
      temCount = 1;
    }
  });

  return (
    <>
      <Layout keyTab="qc">
        <div>
          <Head>
            <title>SIBSOFT : QC</title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
        </div>

        <Row justify="center" style={{ padding: "10px" }}>
          <Col span={24}>
            <Card>
              <Tabs onChange={onChange} type="card" style={{ marginTop: -20 }}>
                <TabPane tab="QC" key="1">
                  <Form form={frm_search_his}>
                    <Row justify="center" style={{ marginTop: -10 }}>
                      <Col span={2}>
                        <Form.Item
                          label="Lot"
                          name="qc_lot"
                          // style={{
                          //   width: "130px",
                          // }}
                        >
                          <Input
                            style={{
                              textAlign: "center",
                              fontSize: "14px",
                            }}
                            onPressEnter={SaerchHis}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={3} style={{ marginLeft: "5px" }}>
                        <Form.Item label="Exp" name="qc_exp">
                          <Input
                            disabled
                            format="DD-MM-YYYY"
                            style={{ color: "black", textAlign: "center" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={3} style={{ marginLeft: "5px" }}>
                        <Form.Item label="Instrument" name="qc_instrument">
                          <Select
                            onChange={SaerchHis}
                            showArrow={false}
                            style={{
                              fontSize: "12px",
                              // color: result_Choice === "0" ? "red" : "",
                            }}
                          >
                            {res_choice_inst?.map((item) => (
                              <Option
                                key={item.qc_inst_id}
                                value={item.qc_inst_name}
                                style={{
                                  textAlign: "center",
                                  fontSize: "12px",
                                }}
                              >
                                {item.qc_inst_name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>

                      {/* <Col span={6}>
                        <Form.Item label="วันที่" name="date_Search">
                          <RangePicker
                            placeholder={["วันเริ่ม", "วันสุดท้าย"]}
                            format="DD-MM-YYYY"
                            locale={th_TH}
                          />
                        </Form.Item>
                      </Col> */}
                      <Col span={6}>
                        <Button
                          style={{
                            fontSize: "12px",
                            height: "32px",
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
                          onClick={SaerchHis}
                        >
                          ค้นหา
                        </Button>

                        <Button
                          style={{
                            fontSize: "12px",
                            height: "32px",
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
                      <Form.Item
                        label=""
                        name="fgt_anti_a"
                        style={{
                          width: "65px",
                          margin: "-8px",
                          marginLeft: "-1px",
                        }}
                      >
                        <Input
                          disabled
                          bordered={false}
                          size="small"
                          style={{
                            color: "black",
                            textAlign: "center",
                            fontSize: "18px",
                            height: "28px",
                            width: "90px",
                          }}
                        ></Input>
                      </Form.Item>
                    </Row>
                  </Form>
                  <Row justify="center">
                    <Col span={12}>
                      <Table
                        dataSource={dataLot}
                        columns={columnsAction}
                        size="small"
                        scroll={{ y: 200 }}
                        pagination={false}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: -15 }}>
                    <Col span={24}>
                      <Affix offsetTop={50}>
                        <Button
                          icon={
                            <MdOutlinePlaylistAdd
                              style={{
                                fontSize: "18px",
                                marginBottom: "-4px",
                                marginLeft: "-5px",
                              }}
                            />
                          }
                          onClick={handleAdd}
                          type="primary"
                          style={{
                            marginBottom: 16,
                          }}
                        >
                          &nbsp; เพิ่มข้อมูล
                        </Button>
                      </Affix>
                      <Row justify="end" style={{ marginTop: "-50px" }}>
                        <Button
                          type="primary"
                          onClick={() => handlerClickDownloadButton("xlsx")}
                        >
                          Export
                        </Button>
                        <Button
                          icon={
                            <GoSettings
                              style={{
                                fontSize: "18px",
                                marginBottom: "-4px",
                                marginLeft: "-5px",
                              }}
                            />
                          }
                          onClick={showModalSetting}
                          style={{
                            marginBottom: 16,
                            backgroundColor: "#7F8487",
                            color: "white",
                          }}
                        >
                          &nbsp; ตั้งค่า QC
                        </Button>
                      </Row>

                      <Form form={frm_save_qc}>
                        <Table
                          rowClassName={(record, index) => {
                            return moment(record.qc_date).format(
                              "YYYY-MM-DD"
                            ) == moment().format("YYYY-MM-DD")
                              ? "fixedRowQc"
                              : record.qc_result_id === dataQcId
                              ? "clickRowQc"
                              : "pointer RowQc";
                          }}
                          onRow={(record) => {
                            return {
                              onClick: () => {
                                ClickRow(record);
                              },
                            };
                          }}
                          className="xm "
                          bordered
                          columns={columnsHis}
                          dataSource={dataSource}
                          pagination={{
                            hideOnSinglePage: true,
                            showSizeChanger: false,
                            pageSize: 30,
                          }}
                          scroll={{ x: 1800 }}
                        />
                      </Form>
                    </Col>
                  </Row>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </Layout>
      {/* modal password */}
      <Modal
        visible={isModalPassword}
        onOk={save}
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
              save();
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
            onClick={save}
            disabled={!password}
          >
            ยืนยัน
          </Button>
        </Row>
      </Modal>

      {/* modal setting */}
      <Modal
        visible={isModalSetting}
        onOk={save}
        onCancel={() => {
          setIsModalSetting(false);
        }}
        width={1230}
        footer={false}
        style={{ top: 20 }}
      >
        <Row>
          <h style={{ fontSize: "14px" }}>ตั้งค่า QC</h>
        </Row>

        <Row style={{ marginTop: "15px" }}>
          <Col span={24}>
            <Table
              size="small"
              columns={columnsSetting}
              dataSource={dataSetting}
              className="xm"
            />
          </Col>
        </Row>

        <Form form={frm_save_setting} layout="vertical">
          <Row style={{ padding: "10px" }}>
            <Col span={3}>
              <Form.Item
                name="qc_lot_id"
                label="Lot"
                style={{ marginRight: "5px" }}
              >
                <Input style={{ fontSize: "14px" }} />
              </Form.Item>
            </Col>

            <Col span={3}>
              <Form.Item
                name="qc_lot_exp"
                label="Exp"
                style={{ marginRight: "5px" }}
              >
                <DatePicker
                  defaultValue={moment().add(543, "years")}
                  format="DD-MM-YYYY"
                />
              </Form.Item>
            </Col>

            <Col span={3}>
              <Form.Item
                name="qc_instrument"
                label="Instrument"
                style={{ marginRight: "5px" }}
              >
                <Select
                  showSearch
                  showArrow={false}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option?.children
                      ?.toLowerCase()
                      ?.includes(input?.toLowerCase())
                  }
                  onKeyDown={(e) => {
                    const value = e.target.value;
                    if (e.keyCode === 13) {
                      // 13 คือ enter
                      console.log("---", value);
                      showModalPassInst(value, "set", "set");
                    }
                  }}
                  style={{ width: "100%" }}
                >
                  {res_choice_inst?.map((item) => (
                    <Option
                      key={item.qc_inst_id}
                      value={item.qc_inst_name}
                      style={{ textAlign: "center", fontSize: "12px" }}
                    >
                      {item.qc_inst_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Form.Item name="qc_lot_anti_a" label="Anti-A">
              <Select
                showArrow={false}
                style={{
                  width: "60px",
                  fontSize: "12px",
                  marginRight: "5px",
                  // color: result_Choice === "0" ? "red" : "",
                }}
              >
                {res_choice?.map((item) => (
                  <Option
                    key={item.qc_ch_id}
                    value={item.qc_ch_short_name}
                    style={{ fontSize: "12px" }}
                  >
                    {item.qc_ch_short_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="qc_lot_anti_b" label="Anti-B">
              <Select
                showArrow={false}
                style={{
                  width: "60px",
                  fontSize: "12px",
                  marginRight: "5px",
                  // color: result_Choice === "0" ? "red" : "",
                }}
              >
                {res_choice?.map((item) => (
                  <Option
                    key={item.qc_ch_id}
                    value={item.qc_ch_short_name}
                    style={{ fontSize: "12px" }}
                  >
                    {item.qc_ch_short_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="qc_lot_anti_d" label="Anti-D">
              <Select
                showArrow={false}
                style={{
                  width: "60px",
                  fontSize: "12px",
                  marginRight: "5px",
                  // color: result_Choice === "0" ? "red" : "",
                }}
              >
                {res_choice?.map((item) => (
                  <Option
                    key={item.qc_ch_id}
                    value={item.qc_ch_short_name}
                    style={{ fontSize: "12px" }}
                  >
                    {item.qc_ch_short_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="qc_lot_cell_a" label="A Cell">
              <Select
                showArrow={false}
                style={{
                  width: "60px",
                  fontSize: "12px",
                  marginRight: "5px",
                  // color: result_Choice === "0" ? "red" : "",
                }}
              >
                {res_choice?.map((item) => (
                  <Option
                    key={item.qc_ch_id}
                    value={item.qc_ch_short_name}
                    style={{ fontSize: "12px" }}
                  >
                    {item.qc_ch_short_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="qc_lot_cell_b" label="B Cell">
              <Select
                showArrow={false}
                style={{
                  width: "60px",
                  fontSize: "12px",
                  marginRight: "5px",
                  // color: result_Choice === "0" ? "red" : "",
                }}
              >
                {res_choice?.map((item) => (
                  <Option
                    key={item.qc_ch_id}
                    value={item.qc_ch_short_name}
                    style={{ fontSize: "12px" }}
                  >
                    {item.qc_ch_short_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="qc_lot_abo" label="Gr">
              <Select
                showSearch
                showArrow={false}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option?.children
                    ?.toLowerCase()
                    ?.includes(input?.toLowerCase())
                }
                onKeyDown={(e) => {
                  const value = e.target.value;
                  if (e.keyCode === 13) {
                    // 13 คือ enter
                    console.log("---", value);
                    addGroup(value, "set", "set");
                  }
                }}
                style={{ width: 100 }}
              >
                {res_choice_group.map((item) => (
                  <Option key={item.qc_group_id} value={item.qc_group_name}>
                    {item.qc_group_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="qc_lot_o1" label="O1">
              <Select
                showArrow={false}
                style={{
                  width: "50px",
                  fontSize: "12px",
                  marginRight: "5px",
                  // color: result_Choice === "0" ? "red" : "",
                }}
              >
                {res_choice?.map((item) => (
                  <Option
                    key={item.qc_ch_id}
                    value={item.qc_ch_short_name}
                    style={{ fontSize: "12px" }}
                  >
                    {item.qc_ch_short_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="qc_lot_o2" label="O2">
              <Select
                showArrow={false}
                style={{
                  width: "50px",
                  fontSize: "12px",
                  marginRight: "5px",
                  // color: result_Choice === "0" ? "red" : "",
                }}
              >
                {res_choice?.map((item) => (
                  <Option
                    key={item.qc_ch_id}
                    value={item.qc_ch_short_name}
                    style={{ fontSize: "12px" }}
                  >
                    {item.qc_ch_short_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="qc_lot_abs" label="ABS">
              <Select
                showArrow={false}
                style={{
                  width: "50px",
                  fontSize: "12px",
                  marginRight: "5px",
                  // color: result_Choice === "0" ? "red" : "",
                }}
              >
                {res_choice?.map((item) => (
                  <Option
                    key={item.qc_ch_id}
                    value={item.qc_ch_short_name}
                    style={{ fontSize: "12px" }}
                  >
                    {item.qc_ch_short_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="qc_lot_dat" label="DAT">
              <Select
                showArrow={false}
                style={{
                  width: "50px",
                  fontSize: "12px",
                  marginRight: "5px",
                  // color: result_Choice === "0" ? "red" : "",
                }}
              >
                {res_choice?.map((item) => (
                  <Option
                    key={item.qc_ch_id}
                    value={item.qc_ch_short_name}
                    style={{ fontSize: "12px" }}
                  >
                    {item.qc_ch_short_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="qc_lot_ag" label="Ag">
              <Select
                showArrow={false}
                style={{
                  width: "50px",
                  fontSize: "12px",
                  marginRight: "5px",
                  // color: result_Choice === "0" ? "red" : "",
                }}
              >
                {res_choice?.map((item) => (
                  <Option
                    key={item.qc_ch_id}
                    value={item.qc_ch_short_name}
                    style={{ fontSize: "12px" }}
                  >
                    {item.qc_ch_short_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Row>
        </Form>

        <Row justify="end" style={{ marginTop: "10px" }}>
          <Button
            onClick={() => {
              frm_save_setting.resetFields();
            }}
            style={{
              fontSize: "12px",
              height: "28px",
              marginLeft: "5px",
              backgroundColor: "orange",
              color: "white",
            }}
          >
            เริ่มใหม่
          </Button>
          &nbsp;
          <Button
            type="primary"
            danger
            onClick={() => {
              setIsModalSetting(false);
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
            onClick={showModalPassAdd}
          >
            ยืนยัน
          </Button>
        </Row>
      </Modal>

      {/* modal action */}
      <Modal
        visible={isModalAction}
        onOk={save}
        onCancel={() => {
          setIsModalAction(false);
        }}
        width={550}
        footer={false}
      >
        <Row>
          <h style={{ fontSize: "14px" }}>Action</h>
        </Row>
        <Form form={frm_save_action}>
          <Row>
            <Col span={24}>
              <Form.Item label="Action" name="qc_action">
                <Select
                  mode="tags"
                  showArrow={false}
                  dropdownMatchSelectWidth={false}
                  placeholder="Action"
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

                    // marginRight:"-50px"
                  }}
                >
                  {res_choice_action?.map((item) => (
                    <Option key={item.qc_action_id} value={item.qc_action_name}>
                      {item.qc_action_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item label="Comment" name="qc_comment">
                <TextArea showCount maxLength={250} rows={1} size="small" />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="end" style={{ marginTop: "10px" }}>
            <Button
              type="primary"
              danger
              onClick={() => {
                setIsModalAction(false);
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
              onClick={showModalPassAct}
            >
              ยืนยัน
            </Button>
          </Row>
        </Form>
      </Modal>

      {/* modal password action*/}
      <Modal
        visible={isModalPassAction}
        onOk={saveAction}
        onCancel={() => {
          setIsModalPassAction(false), setPassword();
        }}
        width={250}
        footer={false}
      >
        <Row>
          <h style={{ fontSize: "14px" }}>ยืนยันรหัสผ่าน</h>
        </Row>
        <Input.Password
          id="passAct"
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
              saveAction();
            }
          }}
        />
        <Row justify="end" style={{ marginTop: "10px" }}>
          <Button
            type="primary"
            danger
            onClick={() => {
              setIsModalPassAction(false), setPassword();
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
            onClick={saveAction}
            disabled={!password}
          >
            ยืนยัน
          </Button>
        </Row>
      </Modal>

      {/* modal password delete setting*/}
      <Modal
        visible={isModalPassDel}
        onOk={saveSetDel}
        onCancel={() => {
          setIsModalPassDel(false), setPassword();
        }}
        width={250}
        footer={false}
      >
        <Row>
          <h style={{ fontSize: "14px" }}>ยืนยันรหัสผ่าน</h>
        </Row>
        <Input.Password
          id="passDel"
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
              saveSetDel();
            }
          }}
        />
        <Row justify="end" style={{ marginTop: "10px" }}>
          <Button
            type="primary"
            danger
            onClick={() => {
              setIsModalPassDel(false), setPassword();
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
            onClick={saveSetDel}
            disabled={!password}
          >
            ยืนยัน
          </Button>
        </Row>
      </Modal>

      {/* modal password Add setting*/}
      <Modal
        visible={isModalPassAdd}
        onOk={saveSetAdd}
        onCancel={() => {
          setIsModalPasAdd(false), setPassword();
        }}
        width={250}
        footer={false}
      >
        <Row>
          <h style={{ fontSize: "14px" }}>ยืนยันรหัสผ่าน</h>
        </Row>
        <Input.Password
          id="passAdd"
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
              saveSetAdd();
            }
          }}
        />
        <Row justify="end" style={{ marginTop: "10px" }}>
          <Button
            type="primary"
            danger
            onClick={() => {
              setIsModalPasAdd(false), setPassword();
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
            onClick={saveSetAdd}
            disabled={!password}
          >
            ยืนยัน
          </Button>
        </Row>
      </Modal>

      {/* modal password review*/}
      <Modal
        visible={isModalPassRev}
        onOk={saveReview}
        onCancel={() => {
          setIsModalPasRev(false), setPassword();
        }}
        width={250}
        footer={false}
      >
        <Row>
          <h style={{ fontSize: "14px" }}>ยืนยันรหัสผ่าน</h>
        </Row>
        <Input.Password
          id="passRev"
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
              saveReview();
            }
          }}
        />
        <Row justify="end" style={{ marginTop: "10px" }}>
          <Button
            type="primary"
            danger
            onClick={() => {
              setIsModalPasRev(false), setPassword();
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
            onClick={saveReview}
            disabled={!password}
          >
            ยืนยัน
          </Button>
        </Row>
      </Modal>

      {/* modal password approve*/}
      <Modal
        visible={isModalPassAprv}
        onOk={saveApprove}
        onCancel={() => {
          setIsModalPasAprv(false), setPassword();
        }}
        width={250}
        footer={false}
      >
        <Row>
          <h style={{ fontSize: "14px" }}>ยืนยันรหัสผ่าน</h>
        </Row>
        <Input.Password
          id="passAprv"
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
              saveApprove();
            }
          }}
        />
        <Row justify="end" style={{ marginTop: "10px" }}>
          <Button
            type="primary"
            danger
            onClick={() => {
              setIsModalPasAprv(false), setPassword();
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
            onClick={saveApprove}
            disabled={!password}
          >
            ยืนยัน
          </Button>
        </Row>
      </Modal>

      {/* modal password inst*/}
      <Modal
        visible={isModalPassInst}
        onOk={addInst}
        onCancel={() => {
          setIsModalPasInst(false), setPassword();
        }}
        width={250}
        footer={false}
      >
        <Row>
          <h style={{ fontSize: "14px" }}>ยืนยันรหัสผ่าน</h>
        </Row>
        <Input.Password
          id="passInst"
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
              addInst();
            }
          }}
        />
        <Row justify="end" style={{ marginTop: "10px" }}>
          <Button
            type="primary"
            danger
            onClick={() => {
              setIsModalPasInst(false), setPassword();
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
            onClick={addInst}
            disabled={!password}
          >
            ยืนยัน
          </Button>
        </Row>
      </Modal>
    </>
  );
};

export default Stock_return_blood;

export async function getServerSideProps(context) {
  const computerName = os.hostname();
  return {
    props: { computerName }, // will be passed to the page component as props
  };
}
