import {
  CloseCircleOutlined,
  CloseSquareOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  FileSearchOutlined,
  FormOutlined,
  PlusOutlined,
  PrinterOutlined,
  StopOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Layout,
  Modal,
  Popconfirm,
  Radio,
  Row,
  Select,
  Spin,
  Table,
  Tabs,
  Typography,
} from "antd";
import th_TH from "antd/lib/date-picker/locale/th_TH";
import moment from "moment";
import "moment/locale/th";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsDropletHalf } from "react-icons/bs";
import { MdOutlineAddLocationAlt, MdRefresh } from "react-icons/md";
import { RiEdit2Line, RiSave3Line } from "react-icons/ri";
import { VscSaveAs } from "react-icons/vsc";

import api from "../lib/api";
import img from "../public/gifloading_sibsofe.gif";

const Patient_blood_request = ({
  ordernum,
  handleCancelEdit,
  onFinishSearch,
  testParams,
}) => {
  const [placement, SetPlacement] = React.useState("bottomLeft");
  const [frmblood_request] = Form.useForm();
  const [frmAddHospital] = Form.useForm();
  const [frmSearch] = Form.useForm();
  const [frmCancel] = Form.useForm();
  const [frmDelete] = Form.useForm();
  const { TimePicker } = DatePicker;
  const { TabPane } = Tabs;
  const { Option } = Select;
  const { TextArea } = Input;
  const { Text } = Typography;

  const { Column, ColumnGroup } = Table;
  const router = useRouter();

  const [groupblood, setGroupblood] = useState();
  const [sex, setSex] = useState();
  const [rhname, setRhname] = useState();
  const [hospital, setHospital] = useState();
  const [newPname, setNewPname] = useState([]);
  const [doctor, setDoctor] = useState();
  const [blooddraw, setBloodDraw] = useState();
  const [bloodtype, setBloodType] = useState();
  const [department, setDepartment] = useState();
  const [ward, setWard] = useState([]);
  const [diag, setDiag] = useState([]);
  const [strAge, setStrAge] = useState(); //fecth อายุ
  const [newStrBirthday, setStrBirthday] = useState(); //วันเกิด
  const [dataSource, setDataSource] = useState([]); //TB blood request
  const [count, setCount] = useState(0);
  const [isModalAddHospital, setIsModalAddHospital] = useState(false);
  var [btnEdit, setBtnEdit] = useState(true);
  var [btnInsert, setBtnInsert] = useState(false);
  const [needPriority, setNeedPriority] = useState();
  const [needFast, setNeedFast] = useState();
  const [function_need, setFunction_need] = useState(true);
  const [PtGrouping, setPtGrouping] = useState();
  const [PtAntibody, setPtAntibody] = useState();
  const [PtDat, setPtDat] = useState();
  const [valueActive, setValueActive] = useState(false);
  const [patientNote, setPatientNote] = useState();
  const [receiveBloodList, setReceiveBloodList] = useState();
  const [reactionBloodList, setReactionBloodList] = useState();
  const [checkvalue, setCheckValue] = useState(true); // bt
  const [checkvaluenum, setCheckValueNum] = useState(true); // ipn
  const [numCount, setNumCount] = useState(0); //นับแถว
  const [password, setPassword] = useState();
  const [isModalPassword, setIsModalPassword] = useState(false);
  const [isModalPasswordCancel, setIsModalPasswordCancel] = useState(false);
  const [isModalPasswordDelete, setIsModalPasswordDelete] = useState(false);
  const [datatest, setDatatest] = useState();
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [detailCancel, setDetailCancel] = useState();
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [detailDelete, setDetailDelete] = useState();

  const [spin, setspin] = useState(true);
  const antIcon = (
    <>
      <Image src={img} alt="my gif" />
    </>
  );

  const onChange_need = () => {
    const frm = frmblood_request.getFieldValue();
    const frm_need = frm.priority_trans;
    const frm_priority_trans_emergency = frm.priority_trans_emergency;
    console.log("fast", frm_need, frm_priority_trans_emergency);

    if (frm_need === 5) {
      setFunction_need(false);
    } else {
      setFunction_need(true);
    }
  };

  const DataError = () => {
    Modal.error({
      content: "ไม่พบข้อมูลผู้ขอเลือด",
    });
  };

  const Fetch_detail_cancel = async () => {
    const result = await api.get("/Datail_cancel");
    setDetailCancel(result.data);
  };

  const Fetch_detail_delete = async () => {
    const result = await api.get("/Datail_delete");
    setDetailDelete(result.data);
  };

  const Fetch_bloodgroup = async () => {
    const result = await api.get("/Get_group");
    setGroupblood(result.data);
  };

  const Fetch_sex = async () => {
    const result = await api.get("/Get_sex");
    setSex(result.data);
  };

  const Fetch_bloodtype = async (value) => {
    const result = await api.get("/blood_type", {
      params: {
        type_id: value,
      },
    });
    setBloodType(result.data);
  };

  const Fetch_rh_name = async () => {
    const result = await api.get("/Get_Rh_Name");
    setRhname(result.data[0]);
  };

  const Fetch_hospital = async () => {
    const result = await api.get("/hospitals");
    setHospital(result.data[0]);
    console.log("hospital", result.data[0][0].hos_long_name_th);
    frmblood_request.setFieldsValue({
      hos_point: result.data[0][0].hos_long_name_th,
    });
  };

  const Fetch_doctor = async () => {
    const result = await api.get("/doctor");
    setDoctor(result.data[0]);
  };

  const Fetch_blood_draw = async () => {
    const result = await api.get("/blood_draw");
    setBloodDraw(result.data[0]);
  };

  const Fetch_department = async () => {
    const result = await api.get("/department");
    setDepartment(result.data[0]);
  };

  const Fetch_ward = async () => {
    const result = await api.get("/ward");
    setWard(result.data[0]);
  };

  const Fetch_diag = async () => {
    const result = await api.get("/diag");
    setDiag(result.data[0]);
    frmblood_request.setFieldsValue({
      diag_1: result.data[0][0].diag_name,
    });
  };

  const Fetch_needPriority = async () => {
    const result = await api.get("/need_priority");
    setNeedPriority(result.data[0]);
  };

  const Fetch_needFast = async () => {
    const result = await api.get("/need_fast");
    setNeedFast(result.data[0]);
  };

  const Fetch_pname = async () => {
    const result = await api.get("/pname_en_th");
    setNewPname(result.data);
  };

  const showModal = () => {
    setIsModalPassword(true);
    setTimeout(() => {
      document.getElementById("password").focus();
    }, 500);
  };

  const onChangeDateRequet = (e) => {
    const frm = frmblood_request.getFieldsValue();
    const ckeckYear = moment(frm.date_requet).year() - moment().year();
    let date = "";
    {
      ckeckYear > 542
        ? (date = moment(frm.date_requet))
        : (date = moment(frm.date_requet).add(543, "year"));
    }

    let date_requet_new = " ";
    {
      frm.date_requet === null
        ? (date_requet_new = moment().add(543, "year"))
        : (date_requet_new = moment(date));
    }

    frmblood_request.setFieldsValue({
      date_requet: date_requet_new,
    });
  };

  const onChangeDateUes = (e) => {
    const frm = frmblood_request.getFieldsValue();
    const ckeckYear = moment(frm.date_use).year() - moment().year();

    let date = "";
    {
      ckeckYear > 542
        ? (date = moment(frm.date_use))
        : (date = moment(frm.date_use).add(543, "year"));
    }

    let date_use_new = " ";
    {
      frm.date_use === null
        ? (date_use_new = moment().add(543, "year"))
        : (date_use_new = moment(date));
    }

    frmblood_request.setFieldsValue({
      date_use: date_use_new,
    });
  };

  const onChangeDatePunct = (e) => {
    const frm = frmblood_request.getFieldsValue();
    const ckeckYear = moment(frm.date_punct).year() - moment().year();

    let date = "";
    {
      ckeckYear > 542
        ? (date = moment(frm.date_punct))
        : (date = moment(frm.date_punct).add(543, "year"));
    }

    let date_punct_new = " ";
    {
      frm.date_punct === null
        ? (date_punct_new = moment().add(543, "year"))
        : (date_punct_new = moment(date));
    }

    frmblood_request.setFieldsValue({
      date_punct: date_punct_new,
    });
  };

  const updateData = async () => {
    // success();
    // ส่ง user_name and password
    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });
    console.log("resultLogin==>", resultLogin.data.user_name);
    const staff = resultLogin.data.user_name;
    //console.log("resultLogin==>", staff);

    setIsModalPassword(false);
    setPassword();
    try {
      if (resultLogin.data.id_user) {
        const frm = frmblood_request.getFieldsValue();

        const pt_emer = await api.get("/patient_request", {
          params: { order_number: frm.order_number },
        });

        let Blood_request_1 = "";
        const frm_Blood_request = frm.Blood_request;

        if (frm_Blood_request) {
          Blood_request_1 = frm_Blood_request.filter(
            (item) => item !== undefined
          );
        } else {
          Blood_request_1 = "ไม่มีข้อมูล";
        }

        if (frm.hos_point == "โรงพยาบาลสวรรค์ประชารักษ์") {
          frm.hos_point = 1;
        } else {
          frm.hos_point = frm.hos_point;
        }

        if (frm.priority_trans != 5) {
          frm.priority_trans_emergency = null;
        }
        if (frm.priority_trans === "Fast Track") {
          frm.priority_trans_emergency =
            pt_emer.data[0].priority_trans_emergency;
        }

        if (!frm.hn || !frm.priority_trans) {
          if (!frm.hn) {
            Modal.error({
              title: "Error",
              content: "กรุณากรอก HN!!",
            });
          } else {
            Modal.error({
              title: "Error",
              content: "กรุณากรอกเลือกความต้องการ!!",
            });
          }
        } else {
          let bb_code = "";
          {
            frm.bb_code === undefined
              ? (bb_code = "")
              : (bb_code = frm.bb_code);
          }
          let his_ln = "";
          {
            frm.his_ln === undefined ? (his_ln = "") : (his_ln = frm.his_ln);
          }
          let his_an = "";
          {
            frm.his_an === undefined ? (his_an = "") : (his_an = frm.his_an);
          }
          let his_vn = "";
          {
            frm.his_vn === undefined ? (his_vn = "") : (his_vn = frm.his_vn);
          }
          let diag_more = "";
          {
            frm.diag_more === undefined
              ? (diag_more = "")
              : (diag_more = frm.diag_more);
          }
          let lab_hgb = "";
          {
            frm.lab_hgb === undefined
              ? (lab_hgb = "")
              : (lab_hgb = frm.lab_hgb);
          }
          let lab_hct = "";
          {
            frm.lab_hct === undefined
              ? (lab_hct = "")
              : (lab_hct = frm.lab_hct);
          }
          let lab_plt = "";
          {
            frm.lab_plt === undefined
              ? (lab_plt = "")
              : (lab_plt = frm.lab_plt);
          }
          let note = "";
          {
            frm.note === undefined ? (note = "") : (note = frm.note);
          }
          let doctor_code = "";
          {
            frm.doctor_code === undefined
              ? (doctor_code = "")
              : (doctor_code = frm.doctor_code);
          }
          let punct_staff = "";
          {
            frm.punct_staff === undefined
              ? (punct_staff = "")
              : (punct_staff = frm.punct_staff);
          }
          let patient_type = "";
          {
            frm.patient_type === undefined
              ? (patient_type = "")
              : (patient_type = frm.patient_type);
          }
          let ward = "";
          {
            frm.ward === undefined ? (ward = "") : (ward = frm.ward);
          }
          let dep_code = "";
          {
            frm.depcode === undefined
              ? (dep_code = "")
              : (dep_code = frm.depcode);
          }
          console.log("frm=>>>", frm);
          const result = await api.post(`/edit_patient_request`, {
            ...frm,
            // ...Blood_request,
            date_requet: moment(frm.date_requet)
              .subtract(543, "years")
              .format("YYYY-MM-DD"),
            date_use: moment(frm.date_use)
              .subtract(543, "years")
              .format("YYYY-MM-DD"),
            time_request: moment(frm.time_request).format("HH:mm:ss"),
            time_use: moment(frm.time_use).format("HH:mm:ss"),
            date_punct: moment(frm.date_punct)
              .subtract(543, "years")
              .format("YYYY-MM-DD"),
            dob: moment(frm.dob).format("YYYY-MM-DD"),
            request_staff: staff,
            bb_code: bb_code,
            his_ln: his_ln,
            his_an: his_an,
            his_vn: his_vn,
            diag_more: diag_more,
            lab_hgb: lab_hgb,
            lab_hct: lab_hct,
            lab_plt: lab_plt,
            note: note,
            doctor_code: doctor_code,
            punct_staff: punct_staff,
            patient_type: patient_type,
            ward: ward,
            dep_code: dep_code,
            Blood_request_1: Blood_request_1,
          });

          console.log("result", result.data.message);

          const closeModal = () => {
            Modal.success({
              content: <div>บันทึกการแก้ไขรายการขอเลือดเรียบร้อยเเล้ว</div>,
              onCancel: (close) => {
                close();
              },
              onOk: (close) => {
                handleCancelEdit();
                onFinishSearch(testParams);
                close();
              },
              okButtonProps: { id: "ok" },
            });
          };

          if (result.data.message === "success") {
            closeModal();
            window.addEventListener("keydown", handleKeyDown);
          }
        }
      }
    } catch (error) {
      Modal.warning({
        content: <div>ไม่สามารถเเก้ไขข้อมูลสำเร็จ กรุณาตรวจสอบอีกครั้ง</div>,
      });
    }
  };

  const handleKeyDown = (event) => {
    // ย้าย logic มาไว้ตรงนี้
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();

      // Trigger the button element with a click
      const idOK = document.getElementById("ok");
      const idSave = document.getElementById("save");
      const idPassword = document.getElementById("password");

      if (idOK) {
        idOK.click();
        window.removeEventListener("keydown", handleKeyDown);
      }
    }
  };

  const onSelect = ([key, index]) => {
    const frm = frmblood_request.getFieldValue();
    const Blood_request = frm.Blood_request;

    const results = Blood_request.map((item) => item?.type_name);
    const resultsSelect = results.filter((item) => item !== undefined);
    const frm_Blood_request_key = frm.Blood_request[key]; //สามารถแก้ไขข้อมูลเดิมได้
    const type_name_key = frm_Blood_request_key.type_name; //เข้าถึงvalue ของ type_name ตาม key ที่ส่งเข้ามา

    let check_type = "";
    for (let i = 0; i < resultsSelect.length; i++) {
      if (check_type != "") {
        check_type = check_type + "," + resultsSelect[i];
      } else {
        check_type = resultsSelect[i];
      }
    }

    Fetch_bloodtype(check_type);

    if (frm_Blood_request_key.type_name != null) {
      setCheckValue(true);
    }
    if (!frm_Blood_request_key.count_unit) {
      setCheckValueNum(false);
    }
  };

  const onSelectNum = (key) => {
    const frm = frmblood_request.getFieldValue();
    const Blood_request = frm.Blood_request;
    const frm_Blood_request_key = frm.Blood_request[key]; //สามารถแก้ไขข้อมูลเดิมได้

    const results = Blood_request.map((item) => item?.count_unit); //เอาค่าทั้งหมด  []
    const resultsNull = Blood_request.map((item) => item?.count_unit !== null); //ถ้า != null แสดง true
    const resultsNullCheck = resultsNull.every((item) => item === true); //แสดง true  หมายถึง resultsNull ทุกอัน true
    const resultsNumber = results.every((item) => item !== "" && item != null); //เช็ค results ว่ามีค่าว่างไหม (every)  T = ไม่มี  F = มี
    // const checkResultNull = results.some((item) => item == null); // เช็ค results ทั้งหมดว่ามี null ไหม (some) T = มี   F = ไม่มี
    const checkResult = results.filter((item) => item !== undefined); //หาว่าทั้งหมดที่ไม่เป็น undefined []
    // const resultsCheck = checkResult.every((item) => item !== undefined); //เช็ค checkResult ว่ามี undefined ไหม  T = ไม่มี  F = มี

    console.log("results====>", results);
    console.log("Filter====>", resultsNumber);
    console.log("resultsNull", resultsNull);
    //console.log("-_-", resultsCheck);
    // console.log("dataSource", typeof(dataSource.length));

    if (resultsNumber == true) {
      //เช็ค ฟอร์มทั้งหมดว่างไหม
      console.log("มันเข้า if");
      if (
        frm_Blood_request_key.count_unit != null ||
        frm_Blood_request_key.count_unit != undefined ||
        frm_Blood_request_key.count_unit != ""
      ) {
        // เช็คตัวที่เข้ามา
        setCheckValueNum(true);
      } else {
        setCheckValueNum(false);
      }
    } else {
      //ติดตรงนี้หละ ถ้าเข้าเงื่อนไขนี้เพราะมันเจอ undefinedจากแถวที่ลบออกไป
      console.log("มันเข้า elseeeee");
      console.log("checkResultจำวนวน====>", checkResult.length);
      console.log("dataSourceจำนวน====>", dataSource.length);
      if (Number(checkResult.length) === Number(dataSource.length)) {
        //เช็คขนาดตัวที่ไม่ undefined กับ dataSource
        if (resultsNullCheck === true) {
          //เช็คค่า null ๗าก result
          setCheckValueNum(true);
        } else {
          setCheckValueNum(false);
        }
      } else {
        setCheckValueNum(false);
      }
    }
  };

  const handleDelete = (key) => {
    console.log("handleDelete", key);
    const frm = frmblood_request.getFieldsValue();

    const frm_type_name_key = frm.Blood_request[key];
    const list = [...dataSource];

    setNumCount(numCount - 1);

    const newDataSource = list.filter((item) => item.key !== key);
    setDataSource(newDataSource);

    const newFormValue = frm.Blood_request.map((item, index) =>
      index != key ? item : undefined
    );

    frmblood_request.setFieldsValue({ Blood_request: newFormValue });

    const results = newFormValue.map((item) => item?.type_name);
    const resultsDelete = results.filter((item) => item !== undefined);
    const resultsNull = newFormValue.map((item) => item?.count_unit !== null); //ถ้า != null แสดง true
    const resultsNullCheck = resultsNull.every((item) => item === true); //แสดง true  หมายถึง resultsNull ทุกอัน true
    console.log("resultsNullCheck", resultsNullCheck);

    if (
      frm_type_name_key.type_name === undefined ||
      frm_type_name_key.count_unit === undefined
    ) {
      if (resultsNullCheck === true) {
        //เช็คค่า null ๗าก result
        setCheckValueNum(true);
      } else {
        setCheckValueNum(false);
      }
      setCheckValue(true);
    }

    let check_type = "";
    for (let i = 0; i < resultsDelete.length; i++) {
      if (check_type != "") {
        check_type = check_type + "," + resultsDelete[i];
      } else {
        check_type = resultsDelete[i];
      }
    }

    Fetch_bloodtype(check_type);
  };

  const checkDelete = async (key) => {
    console.log("key", key.type_id);
    console.log("datatest", datatest.order_number);

    const checkResult = await api.get("/check_blood_request", {
      params: {
        order_number: datatest.order_number,
        type_id: key.type_id,
      },
    });

    const result = checkResult.data;
    console.log("checkResult", checkResult.data);

    if (result.length > 0) {
      Modal.warning({
        content: (
          <div>ลบข้อมูลไม่สำเร็จ เนื่องจากถุงเลือดถูก x-Match เเล้ว</div>
        ),
      });
    } else {
      console.log("else");
      handleDelete(key.key);
    }
  };

  const handleAdd = () => {
    const frm = frmblood_request.getFieldValue();
    const frm_type_name = frm.Blood_request; //ค่าจากฟอร์มตัวล่าสุดอ้างอิงจาก count-1
    //console.log("frm_type_name", frm_type_name);

    //Edit by piekky
    let check_type = "";
    if (frm_type_name) {
      const results = frm_type_name.map((item) => item?.type_name);
      const resultsAdd = results.filter((item) => item !== undefined);
      for (let i = 0; i < resultsAdd.length; i++) {
        if (check_type != "") {
          check_type = check_type + "," + resultsAdd[i];
        } else {
          check_type = resultsAdd[i];
        }
      }
    }

    Fetch_bloodtype(check_type);

    if (frm_type_name?.type_name != "" && frm_type_name?.number != "") {
      if (checkvalue === true && checkvaluenum === true) {
        const newData = {
          key: count,
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
        setCheckValue(false);
        setCheckValueNum(false);
        setNumCount(numCount + 1);
      } else {
        BloodRequestError();
      }
    } else {
      const newData = {
        key: count,
      };
      setDataSource([...dataSource, newData]);
      setCount(count + 1);
      setCheckValue(false);
      setCheckValueNum(false);
      setNumCount(numCount + 1);
    }
  };

  const columns = [
    {
      title: "ที่",
      dataIndex: "no",
      width: "10%",
      align: "center",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Blood Type",
      dataIndex: "type_name",
      align: "center",
      width: "45%",
      key: "type_name",
      render: (_, record, index) => (
        <Form.Item
          name={["Blood_request", record.key, "type_name"]}
          rules={[{ required: true, message: `กรุณาเลือกประเภทเลือด` }]}
        >
          <Select
            placeholder={`เลือก blood type '${record.key}'`}
            onChange={() => onSelect([record.key, index + 1])}
            size="small"
            style={{
              width: "90%",
              fontSize: "14px",
              // height: "32px",
              // marginBottom: "-50px",
            }}
          >
            {bloodtype?.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.s_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
    },
    {
      title: "จำนวน",
      dataIndex: "count_unit",
      align: "center",
      width: "50%",
      key: "count_unit",
      render: (_, record, index) => (
        <Form.Item
          name={["Blood_request", record.key, "count_unit"]}
          rules={[
            {
              required: true,
              message: `จำนวนที่ต้องการต้องเป็นตัวเลขเเละมากกว่า 0.`,
            },
          ]}
          style={{
            fontSize: "14px",
            width: "100%",
            // height: "25px",

            // marginBottom: "-50px",
          }}
        >
          <InputNumber
            value={null}
            min={1}
            pattern="[0-9]{1,}"
            type="number"
            style={{ width: "30%" }}
            onChange={() => onSelectNum(record.key)}
            size="small"
          />
        </Form.Item>
      ),
    },
    {
      title: "",
      dataIndex: "operation",
      width: "10%",
      align: "center",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="คุณต้องการบข้อมูลใช่หรือไม่ ?"
            onConfirm={() => checkDelete(record)}
          >
            <CloseCircleOutlined style={{ fontSize: "20px", color: "red" }} />
          </Popconfirm>
        ) : /*{ <Popconfirm
            title="ไม่สามารถลบประเภทเลือดได้ เนื่องจากมีการ X-Match แล้ว!"
            onConfirm={() => deletehospital(record.hos_id)}
          >
            <CloseCircleOutlined style={{ fontSize: "20px", color: "red" }} />
          </Popconfirm> }*/

        null,
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

  // gen age
  const setDOB = (dateValue) => {
    console.log("dateValue------------------>", dateValue);
    const a = moment();
    const b = moment(dateValue, "YYYY-MM-DD");

    setStrBirthday(b.toString());
    const age = moment.duration(a.diff(b));
    const years = age.years();
    const months = age.months();
    const day = age.days();
    const Age = years + " ปี " + months + " เดือน " + day + " วัน";
    setStrAge(Age);
  };
  const SetFrom = () => {
    frmblood_request.setFieldsValue({
      order_number: ordernum,
    });
    Search();
  };
  //Search data form hn
  const Search = async () => {
    console.log("------");

    const params = {
      order_number: ordernum,
    };
    try {
      const patientrequest = await api.get("/patient_request", { params });
      const result = await api.get("/hn_user", {
        params: { hn: patientrequest.data[0].hn },
      });
      console.log("patientrequest", patientrequest.data);
      // setDataPatientReq(patientrequest.data[0]);

      const BloodRequest = await api.get("/blood_request_list", { params });
      setDatatest(BloodRequest.data[0]);

      const pt_gr = await api.get("/hn_grouping", {
        params: { hn: patientrequest.data[0].hn },
      });
      const pt_abs = await api.get("/hn_antibody", {
        params: { hn: patientrequest.data[0].hn },
      });
      const pt_dat = await api.get("/hn_dat", {
        params: { hn: patientrequest.data[0].hn },
      });
      const reqBloodHis = await api.get("/request_blood_his", {
        params: { hn: patientrequest.data[0].hn },
      });
      const recBloodHis = await api.get("/receive_blood_his", {
        params: { hn: patientrequest.data[0].hn },
      });
      const patientNote = await api.get("/patient_note", {
        params: { hn: patientrequest.data[0].hn },
      });
      const recBloodList = await api.get("/receive_blood_list", {
        params: { hn: patientrequest.data[0].hn },
      });
      const reactBloodList = await api.get("/patient_react_list", {
        params: { hn: patientrequest.data[0].hn },
      });

      //set BloolRequest
      let dataBlood = [];
      for (let i = 0; i < BloodRequest.data.length; i++) {
        setCount(i + 1);
        dataBlood.push({
          key: i,
          type_name: BloodRequest.data[i].type_name,
          type_id: BloodRequest.data[i].type_id,
          count_unit: BloodRequest.data[i].count_unit,
        });
      }

      setDataSource(dataBlood);

      for (let i = 0; i < BloodRequest.data.length; i++) {
        const fields = frmblood_request.getFieldsValue();
        const { Blood_request } = fields;
        Object.assign(Blood_request[i], {
          type_name: BloodRequest.data[i].type_id,
          count_unit: BloodRequest.data[i].count_unit,
        });

        frmblood_request.setFieldsValue({ Blood_request });
      }

      if (patientrequest.data[0].priority_trans === 5) {
        setFunction_need(false);
      } else {
        setFunction_need(true);
      }

      //SET VALUE ที่เป็น null
      let bb_code_new = "";
      {
        patientrequest.data[0].bb_code === "null"
          ? (bb_code_new = "")
          : (bb_code_new = patientrequest.data[0].bb_code);
      }
      let his_ln_new = "";
      {
        patientrequest.data[0].his_ln === "null"
          ? (his_ln_new = "")
          : (his_ln_new = patientrequest.data[0].his_ln);
      }
      let his_an_new = "";
      {
        patientrequest.data[0].his_an === "null"
          ? (his_an_new = "")
          : (his_an_new = patientrequest.data[0].his_an);
      }
      let his_vn_new = "";
      {
        patientrequest.data[0].his_vn === "null"
          ? (his_vn_new = "")
          : (his_vn_new = patientrequest.data[0].his_vn);
      }
      let lab_hct_new = "";
      {
        patientrequest.data[0].lab_hct === "null"
          ? (lab_hct_new = "")
          : (lab_hct_new = patientrequest.data[0].lab_hct);
      }
      let lab_hgb_new = "";
      {
        patientrequest.data[0].lab_hgb === "null"
          ? (lab_hgb_new = "")
          : (lab_hgb_new = patientrequest.data[0].lab_hgb);
      }
      let labplt_new = "";
      {
        patientrequest.data[0].labplt === "null"
          ? (labplt_new = "")
          : (labplt_new = patientrequest.data[0].labplt);
      }
      let date_punct_new = "";
      {
        patientrequest.data[0].punct_date === null
          ? (date_punct_new = moment().add(543, "year"))
          : (date_punct_new = moment(patientrequest.data[0].punct_date));
      }
      let date_requet_new = "";
      {
        patientrequest.data[0].punct_date === null
          ? (date_requet_new = moment().add(543, "year"))
          : (date_requet_new = moment(patientrequest.data[0].date_request));
      }
      let date_use_new = "";
      {
        patientrequest.data[0].punct_date === null
          ? (date_use_new = moment().add(543, "year"))
          : (date_use_new = moment(patientrequest.data[0].date_use));
      }
      let diag_1_new = "";
      {
        patientrequest.data[0].diag_1 === "null"
          ? (diag_1_new = Fetch_diag())
          : (diag_1_new = patientrequest.data[0].diag_1);
      }
      let diag_more_new = "";
      {
        patientrequest.data[0].diag_more === "null"
          ? (diag_more_new = "")
          : (diag_more_new = patientrequest.data[0].diag_more);
      }
      let patient_type_new = "";
      {
        patientrequest.data[0].patient_type === "null"
          ? (patient_type_new = null)
          : (patient_type_new = patientrequest.data[0].patient_type);
      }
      let depcode_new = "";
      {
        patientrequest.data[0].dep_code === "null"
          ? (depcode_new = null)
          : (depcode_new = patientrequest.data[0].department);
      }
      let ward_new = "";
      {
        patientrequest.data[0].ward === "null"
          ? (ward_new = null)
          : (ward_new = patientrequest.data[0].ward_name);
      }
      let doctor_code_new = "";
      {
        patientrequest.data[0].doctor_code === "null"
          ? (doctor_code_new = null)
          : (doctor_code_new = patientrequest.data[0].doctor_name);
      }

      let punct_staff_new = "";
      {
        patientrequest.data[0].punct_staff === "null"
          ? (punct_staff_new = null)
          : (punct_staff_new = patientrequest.data[0].name);
      }

      await setStrAge(result.data[0].age);

      frmblood_request.setFieldsValue({
        order_number: ordernum,
        hos_point: patientrequest.data[0].hos_long_name_th,
        date_requet: date_requet_new,
        time_request: moment(patientrequest.data[0].date_request),
        date_use: date_use_new,
        time_use: moment(patientrequest.data[0].date_use),
        bb_code: bb_code_new,
        his_ln: his_ln_new,
        his_an: his_an_new,
        his_vn: his_vn_new,
        diag_1: diag_1_new,
        diag_more: diag_more_new,
        patient_type: patient_type_new,
        depcode: depcode_new,
        ward: ward_new,
        punct_staff: punct_staff_new,
        date_punct: date_punct_new,
        lab_hgb: lab_hgb_new,
        lab_hct: lab_hct_new,
        lab_plt: labplt_new,
        priority_trans: patientrequest.data[0].priority_name,
        priority_trans_emergency: patientrequest.data[0].emer_name,
        note: patientrequest.data[0].note,
        doctor_code: doctor_code_new,
        hn: result.data[0]?.hn,
        pname: result.data[0]?.pname,
        fname: result.data[0]?.fname,
        lname: result.data[0]?.lname,
        dob: moment(result.data[0].bd_eng),
        sex: result.data[0]?.sex,
        abo_group: result.data[0]?.bloodgrp,
        rhname: result.data[0]?.bloodrh,
        age: frmblood_request.strAge,
        request_datetime_format: reqBloodHis.data[0]?.request_datetime_format,
        receive_datetime_format: recBloodHis.data[0]?.receive_datetime_format,
      });
      //patientGR
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
      } else {
        setReactionBloodList(reactBloodList.data[0]);
      }
    } catch (error) {
      DataError();
    }
  };

  const UpCanceldetail = async (value) => {
    console.log("UpCanceldetail", value);

    frmCancel.setFieldsValue({
      cancel_detail: value
    })
  }

  //cancelOrder
  const cancelOrder = async () => {
    // ส่ง user_name and password
    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });
    console.log("resultLogin==>", resultLogin.data.user_name);
    const staff = resultLogin.data.user_name;
    //console.log("resultLogin==>", staff);

    setIsModalPasswordCancel(false);
    setPassword();
    setIsModalCancel(false);
    // window.close();
    try {
      const frm = frmCancel.getFieldValue();
      // const frm_cancel = frm.cancel_detail; //ค่าจากฟอร์มตัวล่าสุดอ้างอิงจาก count-1
      // const cancelDetail = frm_cancel.join(" ");
      // console.log("cancelDetail", cancelDetail);
      console.log("data", ordernum);

      const cancelOrder = await api.post("/cancel_order", {
        ...frm,
        cancel_staff: staff,
        cancel_detail: frm.cancel_detail,
        order_number: ordernum,
      });

      console.log("cancelOrder", cancelOrder.data.message);
      frmCancel.resetFields();

      const closeModalCancel = () => {
        Modal.success({
          content: <div>ยกเลิกรายการขอเลือดเรียบร้อยเเล้ว</div>,
          onCancel: (close) => {
            close();
          },
          onOk: (close) => {
            handleCancelEdit();
            onFinishSearch(testParams);
            close();
          },
          okButtonProps: { id: "ok" },
        });
      };

      if (cancelOrder.data.message === "success") {
        closeModalCancel();
        window.addEventListener("keydown", handleKeyDown);
      }
    } catch (error) {
      Modal.warning({
        content: (
          <div>ไม่สามารถยกเลิกรายการขอเลือดได้ กรุณาตรวจสอบอีกครั้ง</div>
        ),
      });
    }
  };

  const showModalCancel = () => {
    setIsModalCancel(true);
  };

  const handleCancelCancel = () => {
    setIsModalCancel(false);
  };

  const showModalConfrim = () => {
    setIsModalPasswordCancel(true);
    setTimeout(() => {
      document.getElementById("passCancel").focus();
    }, 500);
  };

  const UpDeletedetail = async (value) => {
    console.log("UpDeletedetail", value);

    frmDelete.setFieldsValue({
      delete_detail: value
    })
  }

  //DeleteOrder
  const deleteOrder = async () => {
    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });
    console.log("resultLogin==>", resultLogin.data.user_name);
    const staff = resultLogin.data.user_name;
    //console.log("resultLogin==>", staff);

    setIsModalPasswordDelete(false);
    setPassword();
    setIsModalDelete(false);

    try {
      const frm = frmDelete.getFieldValue();
      // const frm_delete = frm.delete_detail;
      // const deleteDetail = frm_delete.join(" ");
      // console.log("cancelDetail", deleteDetail);
      console.log("data", ordernum);

      const deleteOrder = await api.post("/delete_order", {
        ...frm,
        delete_staff: staff,
        delete_detail: frm.delete_detail,
        order_number: ordernum,
      });

      console.log("deleteOrder", deleteOrder.data.message);
      // frmDelete.resetFields();

      const closeModalDelete = () => {
        Modal.success({
          content: <div>ลบใบขอเลือดเรียบร้อยเเล้ว</div>,
          onCancel: (close) => {
            close();
          },
          onOk: (close) => {
            handleCancelEdit();
            onFinishSearch(testParams);
            close();
          },
          okButtonProps: { id: "ok" },
        });
      };

      if (deleteOrder.data.message === "success") {
        closeModalDelete();
        frmDelete.resetFields();
        window.addEventListener("keydown", handleKeyDown);
      } else if (deleteOrder.data.message === "warning") {
        Modal.warning({
          content: <div>ลบใบขอเลือดไม่สำเร็จ เนื่องจากถุงเลือดถูก x-Match</div>,
        });
        frmDelete.resetFields();
      }
    } catch (error) {
      Modal.warning({
        content: <div>ไม่สามารถลบใบขอเลือดได้ กรุณาตรวจสอบอีกครั้ง</div>,
      });
      frmDelete.resetFields();
    }
  };

  const showModalDelete = () => {
    setIsModalDelete(true);
  };

  const handleCancelDelete = () => {
    setIsModalDelete(false);
  };

  const showModalConfrimDelete = () => {
    setIsModalPasswordDelete(true);
    setTimeout(() => {
      document.getElementById("passDel").focus();
    }, 500);
  };

  // Insert hospiptal
  const showModalAddhospital = async () => {
    const HID = await api.get("/count_hid");
    console.log("hiddd", HID.data[0]);
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

    console.log("frmhos", hosSelected.hos_active);

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
    console.log("frmhos", Number(frm.hos_active));
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

  const settrue = () => {
    setspin(true);
  };
  const setfalse = () => {
    setspin(false);
  };

  useEffect(async () => {
    if (ordernum) {
      settrue();
      await Promise.all([
        // SetFrom(),
        Search(),
        Fetch_bloodgroup(),
        Fetch_sex(),
        Fetch_rh_name(),
        Fetch_pname(),
        Fetch_hospital(),
        Fetch_doctor(),
        Fetch_ward(),
        Fetch_department(),
        Fetch_diag(),
        Fetch_needPriority(),
        Fetch_needFast(),
        Fetch_blood_draw(),
        Fetch_bloodtype(),
        Fetch_detail_cancel(),
        Fetch_detail_delete(),
      ]);
      setfalse();
    }
  }, [ordernum]);

  return (
    <>
      <Spin
        className="LoadstylePatientReq"
        // tip="Loading..."
        spinning={spin}
        indicator={antIcon}
        size="large"
        delay={0}
      >
        <Layout keyTab="Patent_blood_request_list">
          <Card>
            <Row justify="center" style={{ display: "flex", padding: "10px" }}>
              <Col xs={24} lg={24}>
                <Form form={frmblood_request}>
                  {/*ส่วน 1  ข้อมูลผู้ขอเลือด */}
                  <Row style={{ marginTop: "-10px", height: "250px" }}>
                    <Col
                      xs={24}
                      xl={11}
                      lg={24}
                      style={{ paddingRight: "8px" }}
                    >
                      <Row>
                        <p style={{ marginTop: "-19px", fontSize: "14px" }}>
                          {/* <b>ข้อมูลผู้ขอเลือด</b> */}
                          ข้อมูลผู้ขอเลือด
                        </p>
                      </Row>
                      {/* Order number */}
                      <Row style={{ marginTop: "-10px" }}>
                        <Col xs={12} xl={12} lg={12}>
                          <Form.Item
                            name="order_number"
                            label="เลขที่ใบขอเลือด"
                            style={{ paddingRight: "6px" }}
                          >
                            <Input
                              placeholder="เลขที่ใบขอเลือด"
                              disabled
                              size="small"
                              style={{
                                width: "100%",
                                fontSize: "14px",
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={12} xl={12} lg={12}>
                          <Form.Item
                            name="hn"
                            label="HN"
                            //style={{ paddingRight: "6px" }}
                          >
                            <Input
                              placeholder="HN"
                              disabled
                              size="small"
                              style={{
                                width: "100%",
                                fontSize: "14px",
                              }}
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      {/* fullname */}
                      <Row style={{ marginTop: "-25px" }}>
                        <Col xs={8} xl={7} lg={7}>
                          <Form.Item
                            name="pname"
                            label="ชื่อ"
                            //rules={[{ required: true }]}
                            style={{
                              marginLeft: "5px",
                              marginRight: "15px",
                            }}
                          >
                            <Select
                              placeholder="คำนำหน้า"
                              size="small"
                              style={{ width: "100%", fontSize: "14px" }}
                              showArrow={false}
                              dropdownMatchSelectWidth={false}
                              placement={placement}
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

                        <Col xs={8} xl={8} lg={8}>
                          <Form.Item name="fname">
                            <Input
                              placeholder="ชื่อ"
                              size="small"
                              style={{
                                width: "100%",
                                fontSize: "14px",
                              }}
                            />
                          </Form.Item>
                        </Col>

                        <Col
                          xs={8}
                          xl={9}
                          lg={9}
                          style={{ paddingLeft: "10px" }}
                        >
                          <Form.Item name="lname" label="นามสกุล">
                            <Input
                              placeholder="นามสกุล"
                              size="small"
                              style={{
                                width: "100%",
                                fontSize: "14px",
                              }}
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      {/* age */}
                      <Row style={{ marginTop: "-18px" }}>
                        <Col xs={14} lg={14} xl={14}>
                          <Form.Item
                            name="dob"
                            label="วัน-เดือน-ปีเกิด"
                            style={{
                              marginRight: "15px",
                            }}
                          >
                            <DatePicker
                              onChange={setDOB}
                              format="DD-MM-YYYY"
                              size="small"
                              locale={th_TH}
                              style={{
                                width: "100%",
                                fontSize: "14px",
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={10} lg={10} xl={10}>
                          <Form.Item label="อายุ">
                            <Input
                              placeholder="อายุ"
                              style={{
                                width: "100%",
                                fontSize: "14px",
                              }}
                              value={strAge}
                              disabled
                              size="small"
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      {/* sex, abo group */}
                      <Row
                        style={{ marginTop: "-18px", marginBottom: "-35px" }}
                      >
                        <Col xs={8} lg={8} xl={8}>
                          <Form.Item
                            name="sex"
                            label="เพศ"
                            style={{ paddingRight: "12px" }}
                          >
                            <Select
                              size="small"
                              placeholder="เลือกเพศ"
                              style={{
                                width: "100%",
                                fontSize: "14px",
                              }}
                            >
                              {sex?.map((item) => (
                                <Option key={item.code} value={item.code}>
                                  {item.name}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>

                        <Col xs={8} lg={10} xl={10}>
                          <Form.Item
                            label="หมู่เลือด"
                            name="abo_group"
                            style={{ paddingRight: "12px" }}
                          >
                            <Select
                              placeholder="เลือกหมู่เลือด"
                              size="small"
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

                        <Col xs={8} lg={6} xl={6}>
                          <Form.Item label="RH" name="rhname">
                            <Select
                              placeholder="RH"
                              size="small"
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
                    </Col>
                    {/* tab history */}
                    <Col
                      xs={24}
                      xl={13}
                      lg={24}
                      style={{ paddingLeft: "10px" }}
                    >
                      <Row>
                        <p style={{ marginTop: "-19px", fontSize: "14px" }}>
                          {/* <b>ประวัติข้อมูลผู้ขอเลือด</b> */}
                          ประวัติข้อมูลผู้ขอเลือด
                        </p>
                      </Row>
                      <Tabs
                        style={{ marginTop: "-8px" }}
                        type="card"
                        tabBarStyle={{ height: "30px" }}
                      >
                        <TabPane tab="ประวัติการขอเลือด" key="1">
                          <Form.Item
                            name="request_datetime_format"
                            label="ขอเลือดล่าสุด"
                            style={{
                              width: "40%",
                              height: "32px",
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
                              scroll={{ y: 65 }}
                              size="small"
                              className="xm"
                            ></Table>
                          </Form.Item>
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
                                  className="xm"
                                  // rowClassName={() => "ant-table-thead1"}
                                  //dataSource={Patient_Grouping}
                                  pagination={false}
                                  size="small"
                                  scroll={{ x: 1300, y: 100 }}
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
                                  scroll={{ y: 100, x: 850 }}
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
                                  scroll={{ y: 100, x: 1150 }}
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

                        <TabPane tab="ประวัติการรับเลือด" key="3">
                          <Table
                            className="xm"
                            size="small"
                            dataSource={receiveBloodList}
                            columns={columnReceived}
                            pagination={false}
                            scroll={{ y: 100, x: 750 }}
                            style={{ width: "100%" }}
                          />
                        </TabPane>

                        <TabPane tab="ประวัติการเเพ้เลือด" key="4">
                          <Table
                            className="xm"
                            size="small"
                            dataSource={reactionBloodList}
                            columns={columnEffect}
                            pagination={false}
                            scroll={{ y: 100, x: 850 }}
                            style={{ width: "100%" }}
                          />
                        </TabPane>
                      </Tabs>
                    </Col>
                  </Row>
                  {/*ส่วน 2  ข้อมูลใบขอเลือด */}
                  <Row style={{ marginTop: "-28px" }}>
                    <Col xs={24} xl={15}>
                      <Row>
                        <p style={{ marginTop: "-40px", fontSize: "14px" }}>
                          {/* <b>ข้อมูลใบขอเลือด</b> */}
                          ข้อมูลใบขอเลือด
                        </p>
                      </Row>
                      <Row style={{ marginTop: "-15px" }}>
                        <Col xs={18} xl={18} lg={18}>
                          <Form.Item
                            name="hos_point"
                            label="โรงพยาบาล"
                            // rules={[{ required: true }]}
                            style={{
                              marginRight: "2px",
                            }}
                          >
                            <Select
                              showArrow={false}
                              dropdownMatchSelectWidth={false}
                              placement={placement}
                              placeholder="เลือกโรงพยาบาล"
                              style={{ fontSize: "14px", width: "100%" }}
                              size="small"
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

                        <Col xs={6} xl={6} lg={6}>
                          <Button
                            type="primary"
                            icon={
                              <MdOutlineAddLocationAlt
                                style={{
                                  fontSize: "15px",
                                  marginBottom: "-1px",
                                }}
                              />
                            }
                            style={{
                              fontSize: "14px",
                              width: "100%",
                              marginTop: "4px",
                            }}
                            onClick={showModalAddhospital}
                            size="small"
                          >
                            &nbsp;เพิ่มโรงพยาบาล
                          </Button>
                        </Col>
                      </Row>

                      <Row style={{ marginTop: "-28px" }}>
                        <Col xs={8} xl={8} lg={8}>
                          <Form.Item
                            name="date_requet"
                            label="วันที่รับใบขอ"
                            style={{
                              marginLeft: "-5px",
                            }}
                          >
                            <DatePicker
                              //    defaultValue={moment().format('MMMM Do YYYY')}
                              size="small"
                              style={{ width: "100%", fontSize: "14px" }}
                              defaultValue={moment().add(543, "year")}
                              format="DD-MM-YYYY"
                              locale={th_TH}
                              onChange={onChangeDateRequet}
                            />
                          </Form.Item>
                        </Col>

                        <Col xs={4} xl={4} lg={4}>
                          <Form.Item
                            name="time_request"
                            label=""
                            //style={{ marginLeft: "3px", paddingRight: "5px" }}
                          >
                            <TimePicker
                              style={{ width: "100%", fontSize: "14px" }}
                              //defaultValue={moment()}
                              //initialValue={moment()}
                              format="HH:mm:ss"
                              locale={th_TH}
                              size="small"
                            />
                          </Form.Item>
                        </Col>

                        <Col xs={8} xl={8} lg={8}>
                          <Form.Item
                            name="date_use"
                            label="วันที่ใช้โลหิต"
                            style={{ paddingLeft: "5px" }}
                          >
                            <DatePicker
                              size="small"
                              style={{
                                width: "100%",
                                fontSize: "14px",
                              }}
                              defaultValue={moment().add(543, "year")}
                              format="DD-MM-YYYY"
                              locale={th_TH}
                              onChange={onChangeDateUes}
                            />
                          </Form.Item>
                        </Col>

                        <Col xs={4} xl={4} lg={4}>
                          <Form.Item name="time_use" label="">
                            <TimePicker
                              defaultValue={moment()}
                              size="small"
                              style={{ width: "100%", fontSize: "14px" }}
                              //format="HH:mm:ss"
                              locale={th_TH}
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row style={{ marginTop: "-28px" }}>
                        <Col xs={8} xl={8} lg={8}>
                          <Form.Item
                            name="bb_code"
                            label="BB Code"
                            // rules={[{ required: true }]}
                            style={{
                              paddingRight: "10px",
                              paddingLeft: "17px",
                            }}
                          >
                            <Input
                              placeholder="BB Code"
                              size="small"
                              style={{ fontSize: "14px", width: "100%" }}
                            />
                          </Form.Item>
                        </Col>

                        <Col xs={6} xl={6} lg={6}>
                          <Form.Item
                            name="his_ln"
                            // rules={[{ required: true }]}
                            label="LN"
                            style={{ paddingRight: "7px", marginLeft: "-5px" }}
                          >
                            <Input
                              placeholder="LN"
                              size="small"
                              style={{ fontSize: "14px", width: "100%" }}
                            />
                          </Form.Item>
                        </Col>

                        <Col xs={5} xl={5} lg={5}>
                          <Form.Item
                            name="his_an"
                            label="AN"
                            // rules={[{ required: true }]}
                            style={{ paddingRight: "6px", marginLeft: "-5px" }}
                          >
                            <Input
                              placeholder="AN"
                              size="small"
                              style={{ fontSize: "14px", width: "100%" }}
                            />
                          </Form.Item>
                        </Col>

                        <Col xs={5} xl={5} lg={5}>
                          <Form.Item
                            name="his_vn"
                            label="VN"
                            // rules={[{ required: true }]}
                            style={{ marginLeft: "-5px" }}
                          >
                            <Input
                              placeholder="VN"
                              size="small"
                              style={{ fontSize: "14px", width: "100%" }}
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row style={{ marginTop: "-28px" }}>
                        <Col xs={8} xl={8} lg={8}>
                          <Form.Item
                            name="patient_type"
                            label="Patient Type"
                            // rules={[{ required: true }]}
                            style={{
                              paddingRight: "11px",
                              marginLeft: "-8px",
                            }}
                          >
                            <Select
                              placeholder="Patient Type"
                              size="small"
                              style={{ fontSize: "14px", width: "100%" }}
                            >
                              <Option key="OPD" value="OPD">
                                OPD
                              </Option>
                              <Option key="IPD" value="IPD">
                                IPD
                              </Option>
                            </Select>
                          </Form.Item>
                        </Col>

                        <Col xs={9} xl={9} lg={9}>
                          <Form.Item
                            name="doctor_code"
                            label="แพทย์ผู้สั่ง"
                            //   rules={[{ required: true }]}
                            style={{ paddingLeft: "12px", paddingRight: "4px" }}
                          >
                            <Select
                              showArrow={false}
                              dropdownMatchSelectWidth={false}
                              placement={placement}
                              placeholder="เลือกแพทย์"
                              showSearch
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                              size="small"
                              style={{ fontSize: "14px", width: "100%" }}
                            >
                              {doctor?.map((item) => (
                                <Option key={item.code} value={item.code}>
                                  {item.name}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>

                        <Col xs={7} xl={7} lg={7}>
                          <Form.Item name="depcode" label="แผนก">
                            <Select
                              showArrow={false}
                              dropdownMatchSelectWidth={false}
                              placement={placement}
                              placeholder="เลือกแผนก"
                              showSearch
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                              size="small"
                              style={{ fontSize: "14px", width: "100%" }}
                            >
                              {department?.map((item) => (
                                <Option key={item.depcode} value={item.depcode}>
                                  {item.department}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row style={{ marginTop: "-28px" }}>
                        <Col xs={8} xl={8} lg={8}>
                          <Form.Item
                            name="ward"
                            label="ward"
                            //rules={[{ required: true }]}
                            style={{
                              paddingLeft: "38px",
                            }}
                          >
                            <Select
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
                              size="small"
                              style={{ fontSize: "14px", width: "98%" }}
                            >
                              {ward?.map((item) => (
                                <Option key={item.ward} value={item.ward}>
                                  {item.name}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={8} xl={8} lg={8}>
                          <Form.Item
                            name="punct_staff"
                            label="ผู้เจาะ"
                            style={{ paddingRight: "3px" }}
                            //rules={[{ required: true }]}
                          >
                            <Select
                              showArrow={false}
                              dropdownMatchSelectWidth={false}
                              placement={placement}
                              placeholder="เลือกผู้เจาะ"
                              showSearch
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                              size="small"
                              style={{ fontSize: "14px", width: "100%" }}
                            >
                              {blooddraw?.map((item) => (
                                <Option key={item.code} value={item.code}>
                                  {item.name}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={8} xl={8} lg={8}>
                          <Form.Item
                            name="date_punct"
                            label="วันที่เจาะ"
                            style={{
                              paddingLeft: "8px",
                            }}
                          >
                            <DatePicker
                              size="small"
                              style={{ fontSize: "14px", width: "100%" }}
                              format="DD-MM-YYYY"
                              locale={th_TH}
                              onChange={onChangeDatePunct}
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row style={{ marginTop: "-28px" }}>
                        <Col xs={8} xl={8} lg={8}>
                          <Form.Item
                            name="lab_hgb"
                            label="Hb"
                            style={{ paddingLeft: "50px" }}
                          >
                            <Input
                              placeholder="Hb"
                              size="small"
                              style={{ fontSize: "14px", width: "98%" }}
                            />
                          </Form.Item>
                        </Col>

                        <Col xs={8} xl={8} lg={8}>
                          <Form.Item
                            name="lab_hct"
                            label="Hct"
                            style={{
                              paddingRight: "18px",
                              paddingLeft: "15px",
                            }}
                          >
                            <Input
                              placeholder="Hct"
                              size="small"
                              style={{ fontSize: "14px", width: "98%" }}
                            />
                          </Form.Item>
                        </Col>

                        <Col xs={8} xl={8} lg={8}>
                          <Form.Item
                            name="lab_plt"
                            label="PLT"
                            style={
                              {
                                //paddingLeft: "8px",
                              }
                            }
                          >
                            <Input
                              placeholder="PLT"
                              size="small"
                              style={{ fontSize: "14px", width: "98%" }}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      {/* ปรับใหม่ให้ช่องมันเล็กลง  */}
                      <Row style={{ marginTop: "-28px" }}>
                        <Col xs={12} xl={12} lg={12}>
                          <Form.Item
                            name="diag_1"
                            label="Diag"
                            style={{ paddingLeft: "40px" }}
                          >
                            <Select
                              showArrow={false}
                              dropdownMatchSelectWidth={false}
                              placement={placement}
                              placeholder="เลือก Diag"
                              showSearch
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                              size="small"
                              style={{ fontSize: "14px", width: "97%" }}
                            >
                              {diag?.map((item) => (
                                <Option
                                  key={item.diag_id}
                                  value={item.diag_name}
                                >
                                  {item.diag_name}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>

                        <Col xs={12} xl={12} lg={12}>
                          <Form.Item
                            name="diag_more"
                            label="อื่นๆ"
                            style={{ paddingLeft: "6px" }}
                          >
                            <Input
                              placeholder=""
                              size="small"
                              style={{ fontSize: "14px", width: "100%" }}
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row style={{ marginTop: "-28px" }}>
                        <Col xs={12} xl={12} lg={12}>
                          <Form.Item
                            name="priority_trans"
                            rules={[{ required: true }]}
                            label="ความต้องการ"
                            style={{ paddingRight: "8px", marginLeft: "-20px" }}
                          >
                            <Select
                              placeholder="เลือกความต้องการ"
                              onChange={onChange_need}
                              showSearch
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                              size="small"
                              style={{ fontSize: "14px", width: "100%" }}
                            >
                              {needPriority?.map((item) => (
                                <Option
                                  key={item.priority_id}
                                  value={item.priority_id}
                                >
                                  {item.priority_name}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>

                        <Col xs={12} xl={12} lg={12}>
                          <Form.Item
                            name="priority_trans_emergency"
                            label="ความต้องการเร่งด่วน"
                          >
                            <Select
                              placeholder="เลือกความต้องการเร่งด่วน"
                              disabled={function_need}
                              onChange={onChange_need}
                              //disabled={function_opt != 4}
                              size="small"
                              style={{ fontSize: "14px", width: "100%" }}
                            >
                              {needFast?.map((item) => (
                                <Option key={item.emer_id} value={item.emer_id}>
                                  {item.emer_name}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row style={{ marginTop: "-25px" }}>
                        <Form.Item
                          label="Note"
                          name="note"
                          style={{
                            width: "100% ",
                            paddingLeft: "35px",
                          }}
                        >
                          <TextArea
                            showCount
                            maxLength={250}
                            rows={1}
                            size="small"
                          />
                        </Form.Item>
                      </Row>
                    </Col>

                    <Col xs={24} xl={9} style={{ paddingLeft: "10px" }}>
                      <Row>
                        {/* tab */}
                        <Col
                          span={24}
                          style={{ marginTop: "-10px", paddingBottom: "10px" }}
                        >
                          <Tabs type="card" tabBarStyle={{ height: "25px" }}>
                            <TabPane
                              tab="Blood request"
                              key="1"
                              style={{ marginTop: "-10px" }}
                            >
                              {/* <TableBloodRequest /> */}
                              <Button
                                type="dashed"
                                onClick={handleAdd}
                                block
                                icon={<PlusOutlined />}
                                size="small"
                              >
                                Click here to add a new row
                              </Button>
                              <Table
                                //components={components}
                                className="xm"
                                rowClassName={() => "rowClassName1"}
                                dataSource={dataSource}
                                columns={columns}
                                pagination={false}
                                scroll={{ y: 220 }}
                                style={{ width: "100%", marginTop: "5px" }}
                                size="small"
                              />
                            </TabPane>
                            <TabPane tab="LAB Request" key="2" disabled>
                              <Col span={24}>
                                {/* checkbox */}
                                <br />
                                <Form.Item
                                  name="lab_request"
                                  style={{ marginTop: "-15px" }}
                                >
                                  <Checkbox.Group>
                                    <Checkbox
                                      value={1}
                                      style={{ marginRight: "25px" }}
                                    >
                                      ABO cell grouping
                                    </Checkbox>
                                    <br />
                                    <Checkbox
                                      value={2}
                                      style={{
                                        marginTop: "5px",
                                        marginRight: "25px",
                                      }}
                                    >
                                      Direct Antiglobulin test (DAT)
                                    </Checkbox>
                                    <br />
                                    <Checkbox
                                      value={3}
                                      style={{ marginTop: "5px" }}
                                    >
                                      ABO Serum grouping
                                    </Checkbox>
                                    <br />
                                    <Checkbox
                                      value={4}
                                      style={{
                                        marginTop: "5px",
                                        marginRight: "25px",
                                        marginLeft: "-1px",
                                      }}
                                    >
                                      Indirect Antiglobulin test (IAT)
                                    </Checkbox>
                                    <br />
                                    <Checkbox
                                      value={5}
                                      style={{
                                        marginTop: "5px",
                                        marginRight: "25px",
                                      }}
                                    >
                                      Rh[D] Typing
                                    </Checkbox>
                                    <br />
                                    <Checkbox
                                      value={6}
                                      style={{ marginTop: "5px" }}
                                    >
                                      Antibody Identification
                                    </Checkbox>
                                  </Checkbox.Group>
                                </Form.Item>
                                <Form.Item
                                  name="other2"
                                  label="OTHER"
                                  style={{
                                    width: "100%",
                                    marginTop: "-15px",
                                    marginBottom: "5px",
                                  }}
                                >
                                  <TextArea
                                    rows={1}
                                    showCount
                                    maxLength={150}
                                  />
                                </Form.Item>
                              </Col>
                            </TabPane>

                            <TabPane tab="LAB result" key="3" disabled>
                              <Row style={{ marginTop: "-18px" }}>
                                {" "}
                                <br />
                                <Col span={12}>
                                  <Form.Item
                                    label={<Text mark> ABO grouping </Text>}
                                    name="abo"
                                    style={{ display: "inline-block" }}
                                  >
                                    <Radio.Group>
                                      <Radio value="a">A</Radio>
                                      <Radio value="b">B</Radio>
                                      <Radio value="o">O</Radio>
                                      <Radio value="ab">AB</Radio>
                                    </Radio.Group>
                                  </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item
                                    label={<Text mark> Rh[D] Typing </Text>}
                                    name="rh"
                                    style={{ display: "inline-block" }}
                                  >
                                    <Radio.Group>
                                      <Radio value="+">Positive</Radio>
                                      <Radio value="-">Negative</Radio>
                                      <Radio value="wD">Weak D</Radio>
                                    </Radio.Group>
                                  </Form.Item>
                                </Col>
                              </Row>

                              <Row style={{ marginTop: "-25px" }}>
                                <Col span={12}>
                                  <Form.Item
                                    label={
                                      <Text mark>
                                        Direct Antiglobulin test (DAT){" "}
                                      </Text>
                                    }
                                    name="dat"
                                    style={{ display: "inline-block" }}
                                  >
                                    <Radio.Group>
                                      <Radio value="+">Positive</Radio>
                                      <Input
                                        style={{
                                          width: "10%",
                                          height: "32px",
                                          marginRight: "10px",
                                        }}
                                      />
                                      <Radio value="-">Negative</Radio>
                                    </Radio.Group>
                                  </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item
                                    label={
                                      <Text mark>
                                        Indirect Antiglobulin test (IAT){" "}
                                      </Text>
                                    }
                                    name="iat"
                                    style={{ display: "inline-block" }}
                                  >
                                    <Radio.Group>
                                      <Radio value="+">Positive</Radio>
                                      <Input
                                        style={{
                                          width: "10%",
                                          height: "32px",
                                          marginRight: "10px",
                                        }}
                                      />
                                      <Radio value="-">Negative</Radio>
                                    </Radio.Group>
                                  </Form.Item>
                                </Col>
                              </Row>

                              <Row style={{ marginTop: "-18px" }}>
                                <Col span={12}>
                                  <Form.Item
                                    label={
                                      <Text mark> Antibody Screening </Text>
                                    }
                                    name="antibody"
                                  >
                                    <Input
                                      style={{ width: "100%", height: "32px" }}
                                    />
                                  </Form.Item>
                                </Col>
                              </Row>

                              <Row style={{ marginTop: "-10px" }}>
                                <Col span={12}>
                                  <Form.Item
                                    label={<Text mark> ผู้ทำ </Text>}
                                    name="name"
                                  >
                                    <Select
                                      placeholder=""
                                      style={{
                                        width: "100%",
                                        height: "32px",
                                      }}
                                    >
                                      <Option key={1} value={1}>
                                        test 1
                                      </Option>
                                      <Option key={2} value={2}>
                                        test 2
                                      </Option>
                                      <Option key={3} value={3}>
                                        test 3
                                      </Option>
                                    </Select>
                                  </Form.Item>
                                </Col>

                                <Col span={12}>
                                  <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                    shape="round"
                                    style={{ marginLeft: "10px" }}
                                  >
                                    ใบผล
                                  </Button>
                                </Col>
                              </Row>

                              <Row style={{ marginTop: "-10px" }}>
                                <Col span={12}>
                                  <Form.Item
                                    label={<Text mark> Appv </Text>}
                                    name="appv"
                                  >
                                    <Select
                                      style={{
                                        width: "100%",
                                        height: "32px",
                                      }}
                                    >
                                      <Option key={1} value={1}>
                                        test 1
                                      </Option>
                                      <Option key={2} value={2}>
                                        test 2
                                      </Option>
                                      <Option key={3} value={3}>
                                        test 3
                                      </Option>
                                    </Select>
                                  </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item name="appv1">
                                    <Select
                                      style={{
                                        width: "50%",
                                        marginLeft: "10px",
                                        height: "32px",
                                      }}
                                    >
                                      <Option key={1} value={1}>
                                        test 1
                                      </Option>
                                      <Option key={2} value={2}>
                                        test 2
                                      </Option>
                                      <Option key={3} value={3}>
                                        test 3
                                      </Option>
                                    </Select>
                                  </Form.Item>
                                </Col>
                              </Row>
                            </TabPane>
                          </Tabs>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Form>
                {/* ส่วน 3  ปุ่ม */}
                <Row justify="center" style={{ marginTop: "-5px" }}>
                  <Col>
                    <Button
                      icon={<StopOutlined />}
                      size="small"
                      onClick={showModalCancel}
                      style={{
                        marginLeft: "10px",
                        backgroundColor: "#F7D716",
                        color: "#ffffff",
                        fontSize: "12px",
                      }}
                    >
                      ยกเลิกรายการขอเลือด
                    </Button>
                    <Button
                      icon={<DeleteOutlined />}
                      onClick={showModalDelete}
                      size="small"
                      style={{
                        marginLeft: "10px",
                        backgroundColor: "#ff0000",
                        color: "#ffffff",
                        fontSize: "12px",
                      }}
                    >
                      ลบใบขอเลือด
                    </Button>
                    <Button
                      icon={<FileSearchOutlined />}
                      size="small"
                      disabled
                      // onClick={connect}
                      style={{
                        marginLeft: "10px",
                        //  backgroundColor: "#0f7dff",
                        color: "#ffffff",
                      }}
                    >
                      ใบส่งตรวจ
                    </Button>
                    <Button
                      icon={<FormOutlined />}
                      size="small"
                      disabled
                      style={{
                        marginLeft: "10px",
                        // backgroundColor: "#0f7dff",
                        color: "#ffffff",
                        fontSize: "12px",
                      }}
                    >
                      ใบขอเลือด
                    </Button>
                    <Button
                      icon={<BsDropletHalf />}
                      size="small"
                      disabled
                      style={{
                        marginLeft: "10px",
                        //   backgroundColor: "#10d909",
                        color: "#ffffff",
                        fontSize: "12px",
                      }}
                    >
                      &nbsp;ใบรับเลือด
                    </Button>
                  </Col>
                </Row>

                <Row justify="center" style={{ marginTop: "5px" }}>
                  <Col>
                    <Button
                      icon={<PrinterOutlined />}
                      disabled
                      size="small"
                      style={{
                        marginLeft: "10px",
                        //  backgroundColor: "#0f7dff",
                        color: "#ffffff",
                        fontSize: "12px",
                      }}
                    >
                      พิมพ์ Bracode
                    </Button>
                    <Button
                      icon={<DownloadOutlined />}
                      size="small"
                      disabled
                      style={{
                        marginLeft: "10px",
                        //  backgroundColor: "#10d909",
                        color: "#ffffff",
                        fontSize: "12px",
                      }}
                    >
                      รับ
                    </Button>
                    <Button
                      onClick={showModal}
                      icon={
                        <VscSaveAs
                          style={{
                            fontSize: "14px",
                            marginRight: "3px",
                            marginBottom: "-2px",
                          }}
                        />
                      }
                      size="small"
                      id="save"
                      style={{
                        marginLeft: "10px",
                        backgroundColor: "#3AB0FF",
                        color: "white",
                        fontSize: "12px",
                      }}
                    >
                      บันทึกข้อมูล
                    </Button>
                    <Button
                      icon={<CloseSquareOutlined />}
                      size="small"
                      disabled
                      style={{
                        marginLeft: "10px",
                        //backgroundColor: "#ff0000",
                        color: "#ffffff",
                        fontSize: "12px",
                      }}
                    >
                      ปิด
                    </Button>
                  </Col>
                </Row>

                {/* modal  Add Hospital*/}
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
                  <Row style={{ marginTop: "20px" }}>
                    <Col span={22} offset={1}>
                      <Form form={frmAddHospital}>
                        <Row style={{ marginTop: "-20px" }}>
                          <Col offset={1}>
                            <Form.Item
                              label="HID"
                              name="hos_id"
                              style={{ paddingLeft: "34px" }}
                            >
                              <Input
                                disabled
                                value={12132131}
                                style={{
                                  width: "50%",
                                  fontSize: "12px",
                                  color: "black",
                                }}
                              />
                            </Form.Item>
                          </Col>
                        </Row>

                        <Row style={{ marginTop: "-18px" }}>
                          <Col span={10} offset={1}>
                            <Form.Item
                              label="ชื่อเต็ม TH"
                              name="hos_long_name_th"
                            >
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
                              style={{ paddingLeft: "94px" }}
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
                            <Form.Item
                              label="Short name eng "
                              name="hos_shot_name_en"
                            >
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
                                backgroundColor:
                                  btnInsert == false ? "#5db904" : "",
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
                                backgroundColor:
                                  btnEdit == true ? "" : "#2FA4FF",
                                color: btnEdit == true ? "" : "white",
                              }}
                            >
                              &nbsp; บันทึกการแก้ไขข้อมูล
                            </Button>
                          </Col>
                          <Col span={3}>
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
                              size="samll"
                              onClick={ClearHospital}
                              style={{
                                fontSize: "12px",
                                height: "28px",
                                marginLeft: "-5px",
                                backgroundColor: "orange",
                                color: "white",
                              }}
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
                      ></Table>
                    </Col>
                  </Row>
                </Modal>
              </Col>
            </Row>
          </Card>
          {/* modal  confrim password*/}
          <Modal
            visible={isModalPassword}
            onOk={updateData}
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
              id="password"
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
                  updateData();
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
                onClick={updateData}
                disabled={!password}
              >
                ยืนยัน
              </Button>
            </Row>
          </Modal>

          {/* modal  confrim password cancel*/}
          <Modal
            visible={isModalPasswordCancel}
            onOk={cancelOrder}
            onCancel={() => {
              setIsModalPasswordCancel(false), setPassword();
            }}
            width={250}
            footer={false}
          >
            <Row>
              <h style={{ fontSize: "14px" }}>ยืนยันรหัสผ่าน</h>
            </Row>
            <Input.Password
              id="passCancel"
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
                  cancelOrder();
                }
              }}
            />
            <Row justify="end" style={{ marginTop: "10px" }}>
              <Button
                type="primary"
                danger
                onClick={() => {
                  setIsModalPasswordCancel(false), setPassword();
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
                onClick={cancelOrder}
                disabled={!password}
              >
                ยืนยัน
              </Button>
            </Row>
          </Modal>

          {/* modal  confrim Cancel*/}
          <Modal
            visible={isModalCancel}
            onOk={showModalConfrim}
            onCancel={handleCancelCancel}
            footer={false}
          >
            <Row>
              <h style={{ fontSize: "14px" }}>ยกเลิกรายการขอเลือด</h>
            </Row>
            <Form form={frmCancel}>
              <Form.Item
                label="เลขที่ใบขอเลือด"
                style={{ paddingLeft: "20px" }}
              >
                <h2>{ordernum}</h2>{" "}
              </Form.Item>

              <Form.Item
                name="cancel_detail"
                label="เหตุผลการยกเลิก"
                //   rules={[{ required: true }]}
                style={{ paddingLeft: "12px", marginTop: "-30px" }}
              >
                <Select
                // mode="tags"
                  showArrow={false}
                  dropdownMatchSelectWidth={false}
                  placement={placement}
                  placeholder="เหตุผลการยกเลิก"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  onKeyDown={(e) => {
                    const value = e.target.value;
                    if (e.keyCode === 13) {
                      // 13 คือ enter
                      console.log("---", value);
                      UpCanceldetail(value);
                    }
                  }}
                  style={{
                    width: "100%",
                    fontSize: "14px",
                    height: "32px",

                    // marginRight:"-50px"
                  }}
                >
                  {detailCancel?.map((item) => (
                    <Option key={item.cancel_detail} value={item.cancel_detail}>
                      {item.cancel_detail}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Row justify="end" style={{ marginTop: "10px" }}>
                <Button
                  type="primary"
                  danger
                  onClick={handleCancelCancel}
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
                  onClick={showModalConfrim}
                >
                  ยืนยัน
                </Button>
              </Row>
            </Form>
          </Modal>

          {/* modal  confrim password delete*/}
          <Modal
            visible={isModalPasswordDelete}
            onOk={deleteOrder}
            onCancel={() => {
              setIsModalPasswordDelete(false), setPassword();
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
                  deleteOrder();
                }
              }}
            />
            <Row justify="end" style={{ marginTop: "10px" }}>
              <Button
                type="primary"
                danger
                onClick={() => {
                  setIsModalPasswordDelete(false), setPassword();
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
                onClick={deleteOrder}
                disabled={!password}
              >
                ยืนยัน
              </Button>
            </Row>
          </Modal>

          {/* modal  confrim delete*/}
          <Modal
            visible={isModalDelete}
            onOk={showModalConfrimDelete}
            onCancel={handleCancelDelete}
            footer={false}
          >
            <Row>
              <h style={{ fontSize: "14px" }}>ลบใบขอเลือด</h>
            </Row>
            <Form form={frmDelete}>
              <Form.Item
                label="เลขที่ใบขอเลือด"
                style={{ paddingLeft: "59px" }}
              >
                <h2>{ordernum}</h2>{" "}
              </Form.Item>

              <Form.Item
                name="delete_detail"
                label="เหตุผลการลบใบขอเลือด"
                //   rules={[{ required: true }]}
                style={{ paddingLeft: "12px", marginTop: "-30px" }}
              >
                <Select
                  showArrow={false}
                  dropdownMatchSelectWidth={false}
                  placement={placement}
                  placeholder="เหตุผลการลบใบขอเลือด"
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
                  onKeyDown={(e) => {
                    const value = e.target.value;
                    if (e.keyCode === 13) {
                      // 13 คือ enter
                      console.log("---", value);
                      UpDeletedetail(value);
                    }
                  }}
                >
                  {detailDelete?.map((item) => (
                    <Option key={item.delete_detail} value={item.delete_detail}>
                      {item.delete_detail}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Row justify="end" style={{ marginTop: "10px" }}>
                <Button
                  type="primary"
                  danger
                  onClick={handleCancelDelete}
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
                  onClick={showModalConfrimDelete}
                >
                  ยืนยัน
                </Button>
              </Row>
            </Form>
          </Modal>
        </Layout>
      </Spin>
    </>
  );
};
export default Patient_blood_request;
