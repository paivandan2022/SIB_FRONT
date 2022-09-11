import {
  CloseCircleOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Table,
  Tabs,
} from "antd";
import moment from "moment";
import "moment/locale/th";
import Head from "next/head";
import { useEffect, useState } from "react";
import { BsDropletHalf } from "react-icons/bs";
import { MdManageSearch } from "react-icons/md";
import api from "../lib/api";

const Patient_trans_blood = ({ orderNumber, handleCancelTransBlood }) => {
  const [frmTransBlood] = Form.useForm();
  const [frmFingerTip] = Form.useForm();

  const { TabPane } = Tabs;
  const { Column, ColumnGroup } = Table;
  const { Option } = Select;
  const [placement, SetPlacement] = useState("bottomLeft");

  const [disabledBtn, setDisabledBtn] = useState(true);
  const [disabledXmId, setDisabledXmId] = useState(true);
  const [disabledBloodNo, setDisabledBloodNo] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [dataFingerTip, setDataFingerTip] = useState([]);
  const [patientNote, setPatientNote] = useState();
  const [reactionBloodList, setReactionBloodList] = useState();
  const [receiveBloodList, setReceiveBloodList] = useState();
  const [PtGrouping, setPtGrouping] = useState();
  const [PtAntibody, setPtAntibody] = useState();
  const [PtDat, setPtDat] = useState();
  const [thaiDate, setThaiDate] = useState();
  const [dataPatientReq, setDataPatientReq] = useState();
  const [dataPatient, setDataPatient] = useState();
  const [dataFingerTipShow, setDataFingerTipShow] = useState();
  const [dataRecBloodHis, setDataRecBloodHis] = useState();
  const [dataReqBloodHis, setDataReqBloodHis] = useState();
  const [modalfingerTip, setIsModalfingerTip] = useState(false);
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const [rhname, setRhname] = useState();
  const [groupblood, setGroupblood] = useState();
  const [department, setDepartment] = useState();
  const [ward, setWard] = useState([]);
  const [recivedStaff, setRecivedStaff] = useState([]);
  const [wardChange, setwardChange] = useState(); //tranblood
  const [password, setPassword] = useState(); //tranblood
  const [passwordfgt, setPasswordFgt] = useState(); //tranblood

  const Fetch_rh_name = async () => {
    const result = await api.get("/Get_Rh_Name");
    setRhname(result.data[0]);
  };

  const Fetch_bloodgroup = async () => {
    const result = await api.get("/Get_group");
    setGroupblood(result.data);
  };

  const Fetch_department = async () => {
    const result = await api.get("/department");
    setDepartment(result.data[0]);
  };

  const Fetch_ward = async () => {
    const result = await api.get("/ward");
    setWard(result.data[0]);
  };

  const Fetch_recivedStaff = async (e) => {
    const result = await api.get("/recived_staff", {
      params: { sr_ward: e },
    });
    setwardChange(e);
    setRecivedStaff(result.data[0]);
    frmTransBlood.setFieldsValue({
      received_staff: null
    })
  };

  const columnDataBlood = [
    {
      title: "#",
      dataIndex: "No",
      key: "no",
      align: "center",
      width: "7%",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Unit no",
      dataIndex: "unit_no_dot",
      key: "unit_no_dot",
      align: "center",
      width: "15%",
    },
    {
      title: "Group",
      dataIndex: "Gr",
      key: "Gr",
      align: "center",
      width: "10%",
    },
    {
      title: "Type",
      dataIndex: "l_name",
      key: "l_name",
      align: "center",
      width: "30%",
    },
    {
      title: "",
      dataIndex: "operation",
      align: "center",
      width: "7%",
      render: (_, record, index) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="คุณต้องการบข้อมูลใช่หรือไม่ ?"
            onConfirm={() => handleDelete(index)}
          >
            <CloseCircleOutlined style={{ fontSize: "20px", color: "red" }} />
          </Popconfirm>
        ) : null,
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
      align: "center",
      width: "30%",
    },
  ];

  const columnReceived = [
    {
      title: "Unit no.",
      dataIndex: "blood_no",
      key: "blood_no",
      align: "center",
      width: "17%",
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

  const DataFgt = [
    {
      key: "1",
      anti_a: (
        <Form.Item
          label=""
          name="fgt_anti_a"
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
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
      ),
      anti_b: (
        <Form.Item
          label=""
          name="fgt_anti_b"
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Input
            disabled
            bordered={false}
            size="small"
            style={{
              height: "28px",
              width: "90px",
              color: "black",
              textAlign: "center",
              fontSize: "18px",
            }}
          ></Input>
        </Form.Item>
      ),
      anti_ab: (
        <Form.Item
          label=""
          name="fgt_anti_ab"
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Input
            disabled
            bordered={false}
            size="small"
            style={{
              height: "28px",
              width: "90px",
              color: "black",
              textAlign: "center",
              fontSize: "18px",
            }}
          ></Input>
        </Form.Item>
      ),
      anti_d: (
        <Form.Item
          label=""
          name="fgt_anti_d"
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Input
            disabled
            bordered={false}
            size="small"
            style={{
              height: "28px",
              width: "90px",
              color: "black",
              textAlign: "center",
              fontSize: "18px",
            }}
          ></Input>
        </Form.Item>
      ),
    },
  ];

  const showModalFingerTip = () => {
    setIsModalfingerTip(true);
  };

  const handleOkFingerTip = () => {
    setIsModalfingerTip(false);
  };

  const handleCancelFingerTip = () => {
    setIsModalfingerTip(false);
  };

  const showModalConfirm = () => {
    setIsModalConfirm(true);
  };

  const handleOkConfirm = () => {
    setIsModalConfirm(false);
  };

  const handleCancelConfirm = () => {
    setIsModalConfirm(false);
  };

  const handleDelete = (key) => {
    const dataLast = dataSource[key];
    const newData = dataSource.filter((item) => item !== dataLast);
    setDataSource(newData);

    if (dataSource.length < 2) {
      setDisabledBtn(true);
    }
  };

  // ใช้ฟังก์ชันนี้ กรณีที่ส่งค่า ordernumber มาจากหน้ารายละเอียดขอเลือด
  const SetSearch = async (orderNumber) => {
    const frmOrderNum = frmTransBlood.getFieldValue();

    frmTransBlood.setFieldsValue({
      order_number: orderNumber,
    });
    const params = {
      order_number: orderNumber,
    };

    try {
      const resultPatientReq = await api.get("/patient_request", { params });
      const resultPatient = await api.get("/hn_user", {
        params: { hn: resultPatientReq.data[0].hn },
      });
      const resultReqBloodHis = await api.get("/request_blood_his", {
        params: { hn: resultPatientReq.data[0].hn },
      });
      const resultRecBloodHis = await api.get("/receive_blood_his", {
        params: { hn: resultPatientReq.data[0].hn },
      });
      const resultPatientNote = await api.get("/patient_note", {
        params: { hn: resultPatientReq.data[0].hn },
      });
      const resultreactBloodList = await api.get("/patient_react_list", {
        params: { hn: resultPatientReq.data[0].hn },
      });
      const resultrecBloodList = await api.get("/receive_blood_list", {
        params: { hn: resultPatientReq.data[0].hn },
      });
      const pt_gr = await api.get("/hn_grouping", {
        params: { hn: resultPatientReq.data[0].hn },
      });
      const pt_abs = await api.get("/hn_antibody", {
        params: { hn: resultPatientReq.data[0].hn },
      });
      const pt_dat = await api.get("/hn_dat", {
        params: { hn: resultPatientReq.data[0].hn },
      });
      const check_pucntfinger = await api.get("/check_fingerTip", {
        params: { hn: resultPatientReq.data[0].hn },
      });
      const show_pucntfinger = await api.get("/show_fingerTip", {
        params: { hn: resultPatientReq.data[0].hn },
      });
      console.log("112", show_pucntfinger.data[0]);
      const thai_date = moment(resultPatient.data[0].bd_eng)
        .add(543, "year")
        .format("LL");

      const Finger_date = moment(show_pucntfinger.data[0].fgt_datetime_save)
        .add(543, "year")
        .format("DD-MM-YYYY");
      console.log(Finger_date);

      setDataPatientReq(resultPatientReq.data[0]);
      setDataPatient(resultPatient.data[0]);
      setDataReqBloodHis(resultReqBloodHis.data.request_datetime_format);
      setDataRecBloodHis(resultRecBloodHis.data.receive_datetime_format);
      setThaiDate(thai_date);
      setDataFingerTip(check_pucntfinger.data);
      setDataFingerTipShow(show_pucntfinger.data[0]);

      if (check_pucntfinger.data.length > 0) {
        console.log("ยืนยันหมู่เลือดปลายนิ้วเเล้ว");
      } else {
        // เช็คตอนยิงข้อมูลเลขที่ใบขอเลือดเเล้วคนไข้ยังไม่มีข้อมูลเจาะเลือดปลายนิ้ว จะบังคับให้ไปเพิ่มข้อมูลก่อน
        Modal.warning({
          content: "ยังไม่ยืนยันหมู่เลือดปลายนิ้ว กรุณาตรวจสอบข้อมูล",
          onOk() {
            // document.getElementById("xm_id").focus();
            setIsModalfingerTip(true);
            setDisabledXmId(true);
          },
        });
      }

      if (resultPatientReq.data[0]) {
        setDisabledXmId(false);
        document.getElementById("xm_id").focus();
      }
      //patientNote
      if (
        resultPatientNote.data === null ||
        resultPatientNote.data === "" ||
        resultPatientNote.data === undefined
      ) {
        setPatientNote([]);
      } else {
        setPatientNote(resultPatientNote.data);
      }

      //reactBloodList
      if (
        resultreactBloodList.data === null ||
        resultreactBloodList.data === "" ||
        resultreactBloodList.data === undefined
      ) {
        setReactionBloodList([]);
      } else {
        setReactionBloodList(resultreactBloodList.data[0]);
      }

      // recBloodList
      if (
        resultrecBloodList.data === null ||
        resultrecBloodList.data === "" ||
        resultrecBloodList.data === undefined
      ) {
        setReceiveBloodList([]);
      } else {
        setReceiveBloodList(resultrecBloodList.data);
      }

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
    } catch (error) {
      //เช็คตอนยิงเลขที่ใบขอเลือดเเล้วเซตข้อมูล เเล้วไม่พบข้อมูล
      Modal.warning({
        content: <div>ไม่พบข้อมูลเลขที่ใบขอเลือดนี้ กรุณาตรวจสอบอีกครั้ง</div>,
        onOk() {
          frmTransBlood.setFieldsValue({ order_number: null });
          document.getElementById("order_number").focus();
        },
      });
    }
  };

  const Search = async () => {
    const frmOrderNum = frmTransBlood.getFieldValue();

    const params = {
      order_number: frmOrderNum.order_number,
    };

    try {
      const resultPatientReq = await api.get("/patient_request", { params });
      const resultPatient = await api.get("/hn_user", {
        params: { hn: resultPatientReq.data[0].hn },
      });
      const resultReqBloodHis = await api.get("/request_blood_his", {
        params: { hn: resultPatientReq.data[0].hn },
      });
      const resultRecBloodHis = await api.get("/receive_blood_his", {
        params: { hn: resultPatientReq.data[0].hn },
      });
      const resultPatientNote = await api.get("/patient_note", {
        params: { hn: resultPatientReq.data[0].hn },
      });
      const resultreactBloodList = await api.get("/patient_react_list", {
        params: { hn: resultPatientReq.data[0].hn },
      });
      const resultrecBloodList = await api.get("/receive_blood_list", {
        params: { hn: resultPatientReq.data[0].hn },
      });
      const pt_gr = await api.get("/hn_grouping", {
        params: { hn: resultPatientReq.data[0].hn },
      });
      const pt_abs = await api.get("/hn_antibody", {
        params: { hn: resultPatientReq.data[0].hn },
      });
      const pt_dat = await api.get("/hn_dat", {
        params: { hn: resultPatientReq.data[0].hn },
      });
      const check_pucntfinger = await api.get("/check_fingerTip", {
        params: { hn: resultPatientReq.data[0].hn },
      });
      const show_pucntfinger = await api.get("/show_fingerTip", {
        params: { hn: resultPatientReq.data[0].hn },
      });
      console.log("112", show_pucntfinger.data[0]);
      const thai_date = moment(resultPatient.data[0].bd_eng)
        .add(543, "year")
        .format("LL");

      const Finger_date = moment(show_pucntfinger.data[0].fgt_datetime_save)
        .add(543, "year")
        .format("DD-MM-YYYY");
      console.log(Finger_date);

      setDataPatientReq(resultPatientReq.data[0]);
      setDataPatient(resultPatient.data[0]);
      setDataReqBloodHis(resultReqBloodHis.data.request_datetime_format);
      setDataRecBloodHis(resultRecBloodHis.data.receive_datetime_format);
      setThaiDate(thai_date);
      setDataFingerTip(check_pucntfinger.data);
      setDataFingerTipShow(show_pucntfinger.data[0]);

      if (check_pucntfinger.data.length > 0) {
        console.log("ยืนยันหมู่เลือดปลายนิ้วเเล้ว");
      } else {
        //เช็คเมื่อใส่ข้อมูลถุงเลือดแบบเข้าที่เมนู navbar เเล้วไม่พบข้อมูลเจาะเลือดปลายนิ้ว
        Modal.warning({
          content: "ยังไม่ยืนยันหมู่เลือดปลายนิ้ว กรุณาตรวจสอบข้อมูล",
          onOk() {
            // document.getElementById("xm_id").focus();
            setIsModalfingerTip(true);
            setDisabledXmId(true);
          },
        });
      }

      if (resultPatientReq.data[0]) {
        setDisabledXmId(false);
        document.getElementById("xm_id").focus();
      }
      //patientNote
      if (
        resultPatientNote.data === null ||
        resultPatientNote.data === "" ||
        resultPatientNote.data === undefined
      ) {
        setPatientNote([]);
      } else {
        setPatientNote(resultPatientNote.data);
      }

      //reactBloodList
      if (
        resultreactBloodList.data === null ||
        resultreactBloodList.data === "" ||
        resultreactBloodList.data === undefined
      ) {
        setReactionBloodList([]);
      } else {
        setReactionBloodList(resultreactBloodList.data[0]);
      }

      // recBloodList
      if (
        resultrecBloodList.data === null ||
        resultrecBloodList.data === "" ||
        resultrecBloodList.data === undefined
      ) {
        setReceiveBloodList([]);
      } else {
        setReceiveBloodList(resultrecBloodList.data);
      }

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
    } catch (error) {
      //เช็คเมื่อใส่ข้อมูลถุงเลือดแบบเข้าที่เมนู navbar เเล้วไม่พบข้อมูล
      Modal.warning({
        content: <div>ไม่พบข้อมูลเลขที่ใบขอเลือดนี้ กรุณาตรวจสอบอีกครั้ง</div>,
        onOk() {
          frmTransBlood.setFieldsValue({ order_number: null });
          document.getElementById("order_number").focus();
        },
      });
    }
  };

  const SearchXmId = async () => {
    const frm = frmTransBlood.getFieldValue();
    console.log(frm);

    const params = {
      order_number: frm.order_number,
      xm_id: frm.xm_id,
    };
    try {
      const resultPatientCoss = await api.get("/check_xmId", { params });

      console.log("12", resultPatientCoss.data[0].b_exp);
      if (resultPatientCoss.data.length > 0) {
        if (resultPatientCoss.data[0].b_exp < 1) {
          //เช็ค xmID เมื่อถุงเลือดหมดอายุ
          Modal.error({
            content: (
              <>
                <h2>เตือนการใช้เลือด</h2>
                <p style={{ textAlign: "center", marginTop: "-18px" }}>
                  ถุงเลือด &nbsp;
                  <b style={{ fontSize: "20px" }}>
                    {resultPatientCoss.data[0].unit_no_dot}
                  </b>
                  &nbsp;หมดอายุเเล้ว
                </p>
                <p
                  style={{
                    textAlign: "center",
                    marginTop: "-15px",
                    marginBottom: "-20px",
                  }}
                >
                  แนะนำให้ปลดจากคลังโลหิต
                </p>
              </>
            ),
            onOk() {
              frmTransBlood.setFieldsValue({ xm_id: null });
              document.getElementById("xm_id").focus();
            },
          });
        } else {
          setDisabledBloodNo(false);
          document.getElementById("blood_no").focus();
        }
      } else {
        // เช็คเมื่อยิง xmID เเล้วไม่พบข้อมูล
        Modal.warning({
          content: "ไม่พบข้อมูลใบคล้องเลือดนี้ กรุณาตรวจสอบข้อมูลอีกครั้ง",
          onOk() {
            frmTransBlood.setFieldsValue({ xm_id: null });
            document.getElementById("xm_id").focus();
          },
        });
      }
    } catch (error) {
      // เช็คเมื่อยิง xmID เเล้วไม่พบข้อมูล อาจผิดที่ หลังบ้าน

      Modal.warning({
        content: "ไม่พบข้อมูลใบคล้องเลือดนี้ กรุณาตรวจสอบข้อมูลอีกครั้ง",
        onOk() {
          frmTransBlood.setFieldsValue({ xm_id: null });
          document.getElementById("xm_id").focus();
        },
      });
    }
  };

  const SearchBloodNo = async () => {
    const frm = frmTransBlood.getFieldValue();
    const params = {
      order_number: frm.order_number,
      xm_id: frm.xm_id,
    };

    try {
      const resultPatientCoss = await api.get("/check_xmId", { params });

      if (frm.blood_no == resultPatientCoss.data[0].blood_no) {
        if (dataSource.length > 0) {
          const result = dataSource.filter((item) => item.xm_id === frm.xm_id);
          if (result.length > 0) {
            // เช็คเมื่อยิงถุงเลือดเเล้ว ถุงเลือดซ้ำใน dataSource
            Modal.warning({
              content: "ถุงเลือดซ้ำ",
              onOk() {
                frmTransBlood.setFieldsValue({ xm_id: null, blood_no: null });
                setDisabledBloodNo(true);
                document.getElementById("xm_id").focus();
              },
            });
          } else {
            setDataSource([...dataSource, resultPatientCoss.data[0]]);
            frmTransBlood.setFieldsValue({ xm_id: null, blood_no: null });
            setDisabledBloodNo(true);
            document.getElementById("xm_id").focus();
          }
        } else {
          setDataSource([...dataSource, resultPatientCoss.data[0]]);
          frmTransBlood.setFieldsValue({ xm_id: null, blood_no: null });
          setDisabledBloodNo(true);
          document.getElementById("xm_id").focus();
          setDisabledBtn(false);
        }
      } else {
        // เช็คเมื่อยิงข้อมูลถุงเลือดเเล้วไม่พบข้อมูล
        Modal.warning({
          content: "ไม่พบข้อมูลใบคล้องเลือดนี้ กรุณาตรวจสอบข้อมูลอีกครั้ง",
          onOk() {
            frmTransBlood.setFieldsValue({ xm_id: null, blood_no: null });
            setDisabledBloodNo(true);
            document.getElementById("xm_id").focus();
          },
        });
      }
    } catch (error) {}
  };

  const upRceivedStaff = async (value) => {
    console.log("value=>", wardChange);
    const resultUpdate = await api.post("/update_RceivedStaff", {
      received_staff: value,
      ward: wardChange
    });

    if (resultUpdate.data.message == "duplicate") {
      Modal.warning({
        title: "เเจ้งเตือน",
        content: "มีเเล้ว",
      });
    }
   await Fetch_recivedStaff(wardChange);
   frmTransBlood.setFieldsValue({
    received_staff: value
  })
  }

  const updateDataTran = async () => {
    const frm = frmTransBlood.getFieldValue();

    const resultLogin = await api.post(`/Confirm_password`, {
      password: frm.password,
    });
    const staff = resultLogin.data.user_name;
    const XmId = dataSource.map((item) => item.xm_id);
    const BloodNo = dataSource.map((item) => item.blood_no);
    const IdBlood = dataSource.map((item) => item.id);

    console.log("frm=>", frm);
    console.log("received_staff=>", frm.received_staff);

    try {
      const resultUpdate = await api.post("/update_coss_trans", {
        ...frm,
        received_staff: frm.received_staff,
        xm_id: XmId,
        blood_no: BloodNo,
        staff: staff,
        id: IdBlood,
      });

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
          content: <div>จ่ายเลือดเรียบร้อย</div>,
          onCancel: (close) => {
            close();
          },
          onOk: (close) => {
            close();
            frmTransBlood.resetFields();
            setDisabledXmId(true);
            setDataSource([]);
            setDataFingerTip([]);
            setPatientNote([]);
            setReactionBloodList([]);
            setReceiveBloodList([]);
            setPtGrouping([]);
            setPtAntibody([]);
            setPtDat([]);
            setThaiDate();
            setDataReqBloodHis();
            setDataPatientReq();
            setDataPatient();
            setDataFingerTipShow();
            setDataRecBloodHis();
            if (handleCancelTransBlood) {
              handleCancelTransBlood();
            } else {
              window.close();
            }
          },
          okButtonProps: { id: "ok" },
        });
      };
      if (resultUpdate.data.message === "success") {
        setIsModalConfirm(false);
        setPassword();
        closeModal();
        window.addEventListener("keydown", handleKeyDown);
      }
    } catch (error) {
      Modal.warning({
        content: <div>ไม่สามารถจ่ายเลือดได้ กรุณาตรวจสอบอีกครั้ง</div>,
      });
    }
  };

  const AddFinger = async () => {
    const frm = frmFingerTip.getFieldValue();
    const resultLogin = await api.post(`/Confirm_password`, {
      password: frm.passwordFgt,
    });

    console.log(frm.abo_group);
    const staff = resultLogin.data.user_name;
    const hnUser = dataPatientReq?.hn;

    try {
      if (
        hnUser != undefined &&
        frm.abo_group != undefined &&
        frm.rh_name != undefined &&
        frm.passwordFgt != undefined
      ) {
        const resultAddFinger = await api.post("/Add_Finger", {
          ...frm,
          staff: staff,
          hn: hnUser,
        });

        const handleKeyDownFgt = (event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            const idOK = document.getElementById("ok");
            if (idOK) {
              idOK.click();
              window.removeEventListener("keydown", handleKeyDownFgt);
            }
          }
        };

        const closeModalFgt = () => {
          Modal.success({
            content: <div>บันทึกข้อมูลลหมู่เลือดปลายนิ้วสำเร็จ</div>,
            onCancel: (close) => {
              close();
            },
            onOk: (close) => {
              close();
              frmFingerTip.resetFields();
              Search();
            },
            okButtonProps: { id: "ok" },
          });
        };
        if (resultAddFinger.data.message === "success") {
          setIsModalfingerTip(false);
          setPasswordFgt();
          setDisabledXmId(false);
          closeModalFgt();
          window.addEventListener("keydown", handleKeyDownFgt);
        }
      } else {
        //เช็คเมื่อกรอกข้อมูลหมู่เลือดปลายนิ้วไม่สำเร็จเเล้วกดบันทึก
        Modal.warning({
          content: <div>กรุณาตรวจสอบอีกครั้ง</div>,
        });
      }
    } catch (error) {
      // เช็คเมื่อกดบันทึกข้อมูลหมู่เลือดปลายนิ้ว อาจผิดที่ หลังบ้าน
      Modal.warning({
        content: <div>ไม่สามารถบันทึกข้อมูลได้ กรุณาตรวจสอบอีกครั้ง</div>,
      });
    }
  };

  const SetantiABO = () => {
    const frm = frmFingerTip.getFieldValue();
    const SelectABO = frm.abo_group;
    console.log("SelectABO", SelectABO);

    if (SelectABO != dataPatient?.bloodgrp) {
      console.log("if");
      // เช็คตอน เซตข้อมูลเข้าฟอร์ม ตอนเลือดหมู๋เลือด
      Modal.warning({
        title: "แจ้งเตือน !!",
        content: "หมู่เลือดไม่ตรงกับข้อมูลครั้งก่อน กรุณาตรวจสอบอีกครั้ง",
      });
    }

    if (SelectABO == "A") {
      frmFingerTip.setFieldsValue({
        fgt_anti_a: "4+",
        fgt_anti_b: "Negative",
        fgt_anti_ab: "4+",
      });
    } else if (SelectABO == "B") {
      frmFingerTip.setFieldsValue({
        fgt_anti_a: "Negative",
        fgt_anti_b: "4+",
        fgt_anti_ab: "4+",
      });
    } else if (SelectABO == "AB") {
      frmFingerTip.setFieldsValue({
        fgt_anti_a: "4+",
        fgt_anti_b: "4+",
        fgt_anti_ab: "4+",
      });
    } else if (SelectABO == "O") {
      frmFingerTip.setFieldsValue({
        fgt_anti_a: "Negative",
        fgt_anti_b: "Negative",
        fgt_anti_ab: "Negative",
      });
    } else if (SelectABO == "") {
    }
  };

  const SetantiD = () => {
    const frm = frmFingerTip.getFieldValue();
    const SelectRh = frm.rh_name;

    if (SelectRh == "-") {
      frmFingerTip.setFieldsValue({
        fgt_anti_d: "Negative",
      });
    } else if (SelectRh == "+") {
      frmFingerTip.setFieldsValue({
        fgt_anti_d: "4+",
      });
    } else if (SelectRh != "+,-") {
      frmFingerTip.setFieldsValue({
        fgt_anti_d: "",
      });
    }
  };

  useEffect(async () => {
    if (orderNumber == undefined) {
    } else {
      SetSearch(orderNumber);
    }
    frmTransBlood.setFieldsValue({
      xm_id:"",
      blood_no:""
    })
    await Fetch_rh_name();
    await Fetch_bloodgroup();
    await Fetch_ward();
    await Fetch_department();
    await Fetch_recivedStaff();

    document.getElementById("order_number").focus();
  }, [orderNumber]);

  return (
    <>
      <div>
        <Head>
          <title>SIBSOFT : จ่ายเลือด</title>
          <meta property="og:title" content="My page title" key="title" />
        </Head>
      </div>
      <Form form={frmTransBlood}>
        <Card>
          {/* input order number */}
          {/* Order number */}
          <Row justify="center" style={{ marginTop: "-15px" }}>
            <Form.Item name="order_number" label="เลขที่ใบขอเลือด">
              <Input
                maxLength={8}
                id="order_number"
                onPressEnter={Search}
                placeholder="เลขที่ใบขอเลือด"
                style={{
                  width: "100%",
                  height: "32px",
                  fontSize: "16px",
                }}
              />
            </Form.Item>
          </Row>

          {/* Card ข้อมูลผู้ขอเลือด */}
          <Row
            style={{
              marginTop: "15px",
              border: "1px solid",
              padding: "10px",
              height: "80px",
              borderRadius: "5px",
            }}
          >
            <Col xs={24} lg={24} xl={24}>
              <Row style={{ marginTop: -30 }}>
                <Col>
                  <p
                    style={{
                      fontSize: "14px",
                      border: "1px solid",
                      borderRadius: "7px",
                      backgroundColor: "white",
                      paddingLeft: "8px",
                      paddingRight: "8px",
                    }}
                  >
                    ข้อมูลผู้ขอเลือด
                  </p>
                </Col>
                <Col style={{ marginLeft: 330 }}>
                  <p
                    style={{
                      fontSize: "14px",
                      border: "1px solid",
                      borderRadius: "7px",
                      backgroundColor: "white",
                      paddingLeft: "8px",
                      paddingRight: "8px",
                    }}
                  >
                    หมู่เลือด
                  </p>
                </Col>

                <Col style={{ marginLeft: 170 }}>
                  <p
                    style={{
                      fontSize: "14px",
                      border: "1px solid",
                      borderRadius: "7px",
                      backgroundColor: "white",
                      paddingLeft: "8px",
                      paddingRight: "8px",
                    }}
                  >
                    หมู่เลือดปลายนิ้ว
                  </p>
                </Col>
              </Row>

              <Row style={{ marginTop: -5 }}>
                <Col>
                  <Row>
                    <p style={{ fontSize: "12px" }}>
                      HN :&nbsp;
                      <b style={{ color: "blue" }}>{dataPatientReq?.hn}</b>
                    </p>
                    &nbsp;
                    <p style={{ fontSize: "12px" }}>
                      ชื่อสกุล :&nbsp;
                      <b style={{ color: "blue" }}>
                        {dataPatient?.pname.concat(
                          dataPatient?.fname,
                          " ",
                          dataPatient?.lname
                        )}
                      </b>
                    </p>
                    &nbsp;
                    <p style={{ fontSize: "12px" }}>
                      เพศ : &nbsp;
                      <b style={{ color: "blue" }}>
                        {" "}
                        {dataPatient?.sex == 1
                          ? "ชาย"
                          : dataPatient?.sex == 2
                          ? "หญิง"
                          : ""}
                      </b>
                    </p>
                  </Row>

                  <Row style={{ marginTop: "-10px" }}>
                    <p style={{ fontSize: "12px" }}>
                      วันเกิด :&nbsp;
                      <b style={{ color: "blue" }}> {thaiDate}</b>
                    </p>
                    &nbsp;
                    <p style={{ fontSize: "12px" }}>
                      อายุ : &nbsp;
                      <b style={{ color: "blue" }}>{dataPatient?.age}</b>
                    </p>
                  </Row>
                </Col>

                <Col>
                  {/* <p style={{fontSize:  "45px" ,marginTop: "-45px" ,marginLeft: "70px", backgroundColor: "#ffff00",}}> */}
                  <p
                    style={{
                      border: "1px solid",
                      borderRadius: "5px",
                      fontSize: "42px",
                      marginTop: "-7px",
                      backgroundColor:
                        dataPatient?.bloodgrp == "A"
                          ? "#ffff00"
                          : dataPatient?.bloodgrp == "B"
                          ? "#ffb3ef"
                          : dataPatient?.bloodgrp == "AB"
                          ? "#00ccff"
                          : dataPatient?.bloodgrp == "O"
                          ? "#f4fff8"
                          : " ",
                      marginLeft:
                        dataPatient?.bloodgrp == "AB" ? "140px" : "160px",
                      textAlign: "center",
                    }}
                  >
                    {dataPatient?.bloodgrp.concat(dataPatient?.bloodrh)}
                  </p>
                </Col>

                <Col>
                  <p
                    style={{
                      marginLeft:
                        dataPatient?.bloodgrp != "AB" ? "195px" : "165px",
                      marginTop: "-22px",
                      fontSize: "48px",
                    }}
                  >
                    <b> {dataFingerTipShow?.Gr}</b>
                  </p>
                  <p
                    style={{
                      marginLeft:
                        dataPatient?.bloodgrp != "AB" ? "155px" : "125px",
                      marginTop: "-62px",
                      fontSize: "10.5px",
                    }}
                  >
                    {dataFingerTipShow ? "บันทึกล่าสุด : " : ""}{" "}
                    {dataFingerTipShow?.datetime_save}
                  </p>
                </Col>

                {dataPatient && (
                  <Col style={{ marginLeft: "125px", marginTop: "10px" }}>
                    <Button
                      onClick={showModalFingerTip}
                      style={{
                        backgroundColor: "orange",
                        color: "#ffffff",
                      }}
                      icon={
                        <MdManageSearch
                          style={{
                            fontSize: "18px",
                            marginRight: "3px",
                            marginBottom: "-3px",
                          }}
                        />
                      }
                    >
                      การเจาะเลือดจากปลายนิ้ว
                    </Button>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>

          {/* Card ข้อมูลใบขอเลือด ประวัติขอเลือด */}
          <Row style={{ marginTop: "2px" }}>
            {/* Card ประวัติข้อมูลผู้ขอเลือด */}
            <Col xs={12} lg={12} xl={11} style={{ paddingRight: "12px" }}>
              <Row
                style={{
                  marginTop: "15px",
                  border: "1px solid",
                  padding: "10px",
                  height: "210px",
                  borderRadius: "5px",
                }}
              >
                <Row style={{ marginTop: -20 }}>
                  <Col>
                    <p
                      style={{
                        fontSize: "14px",
                        border: "1px solid",
                        borderRadius: "7px",
                        backgroundColor: "white",
                        paddingLeft: "8px",
                        paddingRight: "8px",
                      }}
                    >
                      ประวัติข้อมูลผู้ขอเลือด
                    </p>
                  </Col>
                </Row>

                <Tabs style={{ marginTop: "-20px" }} type="card">
                  <TabPane tab="ประวัติการขอเลือด" key="1">
                    <Row style={{ marginTop: "-10px" }}>
                      <p style={{ fontSize: "12px" }}>
                        ขอเลือดล่าสุด :&nbsp;
                        <b style={{ color: "blue" }}>{dataReqBloodHis}</b>
                      </p>
                      &nbsp;&nbsp;
                      <p style={{ fontSize: "12px" }}>
                        รับเลือดล่าสุด :&nbsp;
                        <b style={{ color: "blue" }}>{dataRecBloodHis}</b>
                      </p>
                    </Row>

                    <Row style={{ marginTop: "-15px" }}>
                      <p style={{ fontSize: "12px" }}>Patient Note :&nbsp;</p>
                      <Table
                        pagination={false}
                        bordered
                        dataSource={patientNote}
                        style={{ width: "100%", marginTop: "-12px" }}
                        columns={columnNote}
                        scroll={{ y: 60 }}
                        size="small"
                        className="xm"
                      ></Table>
                    </Row>
                  </TabPane>

                  <TabPane tab="Patient Grouping" key="2">
                    <div>
                      <Tabs
                        tabPosition="left"
                        size="small"
                        style={{ marginLeft: "-23px", fontSize: "12px" }}
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
                            scroll={{ x: 1300, y: 70 }}
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
                          style={{ marginLeft: "-19px", marginTop: "-7px" }}
                        >
                          <Table
                            pagination={false}
                            className="xm"
                            bordered
                            dataSource={PtAntibody}
                            scroll={{ y: 90, x: 850 }}
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
                            scroll={{ y: 70, x: 1150 }}
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
                      rowClassName={() => "rowClassName1"}
                      dataSource={receiveBloodList}
                      columns={columnReceived}
                      pagination={false}
                      scroll={{ y: 100, x: 750 }}
                      style={{ width: "100%" }}
                      size="small"
                    />
                  </TabPane>

                  <TabPane tab="ประวัติการเเพ้เลือด" key="4">
                    <Table
                      className="xm"
                      rowClassName={() => "rowClassName1"}
                      dataSource={reactionBloodList}
                      columns={columnEffect}
                      pagination={false}
                      scroll={{ y: 100, x: 850 }}
                      size="small"
                      style={{ width: "100%" }}
                    />
                  </TabPane>
                </Tabs>
              </Row>
            </Col>

            {/* Card ข้อมูลใบขอเลือด */}
            <Col xs={12} lg={12} xl={13}>
              <Row
                style={{
                  marginTop: "15px",
                  border: "1px solid",
                  padding: "10px",
                  height: "210px",
                  borderRadius: "5px",
                }}
              >
                <Col>
                  <Row style={{ marginTop: -20 }}>
                    <p
                      style={{
                        fontSize: "14px",
                        border: "1px solid",
                        borderRadius: "7px",
                        backgroundColor: "white",
                        paddingLeft: "8px",
                        paddingRight: "8px",
                      }}
                    >
                      ข้อมูลใบขอเลือด
                    </p>
                  </Row>
                  {dataPatientReq && (
                    <>
                      <Row style={{ marginTop: "-10px" }}>
                        <Col span={24}>
                          <p style={{ fontSize: "12px" }}>
                            โรงพยาบาล :&nbsp;{" "}
                            <b style={{ color: "blue" }}>
                              {dataPatientReq?.hos_long_name_th}
                            </b>
                          </p>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: "-10px" }}>
                        <Col>
                          <p style={{ fontSize: "12px" }}>
                            วันที่รับใบขอ :&nbsp;
                            <b style={{ color: "blue" }}>
                              {dataPatientReq?.date_request}
                            </b>
                          </p>
                        </Col>
                        &nbsp;&nbsp;
                        <Col>
                          <p style={{ fontSize: "12px" }}>
                            วันที่ใช้โลหิต :&nbsp;
                            <b style={{ color: "blue" }}>
                              {dataPatientReq?.date_use}
                            </b>
                          </p>
                        </Col>
                        &nbsp;&nbsp;
                        <Col>
                          <p style={{ fontSize: "12px" }}>
                            วันที่เจาะ :&nbsp;
                            <b style={{ color: "blue" }}>
                              {dataPatientReq?.punct_date}
                            </b>
                          </p>
                        </Col>
                      </Row>

                      <Row style={{ marginTop: "-10px" }}>
                        <Col>
                          <p style={{ fontSize: "12px" }}>
                            BB Code :&nbsp;
                            <b style={{ color: "blue" }}>
                              {dataPatientReq?.bb_code}
                            </b>
                          </p>
                        </Col>{" "}
                        &nbsp;&nbsp;
                        <Col>
                          <p style={{ fontSize: "12px" }}>
                            LN :&nbsp;{" "}
                            <b style={{ color: "blue" }}>
                              {dataPatientReq?.his_ln}
                            </b>
                          </p>
                        </Col>{" "}
                        &nbsp;&nbsp;
                        <Col>
                          <p style={{ fontSize: "12px" }}>
                            AN :&nbsp;
                            <b style={{ color: "blue" }}>
                              {dataPatientReq?.his_an}
                            </b>
                          </p>
                        </Col>{" "}
                        &nbsp;&nbsp;
                        <Col>
                          <p style={{ fontSize: "12px" }}>
                            VN :&nbsp;
                            <b style={{ color: "blue" }}>
                              {dataPatientReq?.his_vn}
                            </b>
                          </p>
                        </Col>
                      </Row>

                      <Row style={{ marginTop: "-10px" }}>
                        <Col>
                          <p style={{ fontSize: "12px" }}>
                            แพทย์ผู้สั่ง :&nbsp;
                            <b style={{ color: "blue" }}>
                              {dataPatientReq?.doctor_name}
                            </b>
                          </p>
                        </Col>{" "}
                        &nbsp;&nbsp;
                        <Col>
                          <p style={{ fontSize: "12px" }}>
                            แผนก :&nbsp;
                            <b style={{ color: "blue" }}>
                              {dataPatientReq?.department}
                            </b>
                          </p>
                        </Col>{" "}
                        &nbsp;&nbsp;
                        <Col>
                          <p style={{ fontSize: "12px" }}>
                            ward :&nbsp;
                            <b style={{ color: "blue" }}>
                              {dataPatientReq?.ward_name}
                            </b>
                          </p>
                        </Col>{" "}
                        &nbsp;&nbsp;
                        <Col>
                          <p style={{ fontSize: "12px" }}>
                            ผู้เจาะ :&nbsp;
                            <b style={{ color: "blue" }}>
                              {dataPatientReq?.name}
                            </b>
                          </p>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: "-10px" }}>
                        <Col>
                          <p style={{ fontSize: "12px" }}>
                            Hb :&nbsp;
                            <b style={{ color: "blue" }}>
                              {dataPatientReq?.lab_hgb}
                            </b>
                          </p>
                        </Col>{" "}
                        &nbsp;&nbsp;
                        <Col>
                          <p style={{ fontSize: "12px" }}>
                            Hct :&nbsp;
                            <b style={{ color: "blue" }}>
                              {dataPatientReq?.lab_hct}
                            </b>
                          </p>
                        </Col>{" "}
                        &nbsp;&nbsp;
                        <Col>
                          <p style={{ fontSize: "12px" }}>
                            PLT :&nbsp;
                            <b style={{ color: "blue" }}>
                              {dataPatientReq?.lab_plt}
                            </b>
                          </p>
                        </Col>{" "}
                        &nbsp;&nbsp;
                        <Col>
                          <p style={{ fontSize: "12px" }}>
                            Patient Type :&nbsp;
                            <b style={{ color: "blue" }}>
                              {dataPatientReq?.patient_type}
                            </b>
                          </p>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: "-10px" }}>
                        <Col>
                          <p style={{ fontSize: "12px" }}>
                            Diag :&nbsp;
                            <b style={{ color: "blue" }}>
                              {dataPatientReq?.diag_1}
                            </b>
                          </p>
                        </Col>{" "}
                        &nbsp;&nbsp;
                        <Col>
                          <p style={{ fontSize: "12px" }}>
                            อื่นๆ :&nbsp;
                            <b style={{ color: "blue" }}>
                              {dataPatientReq?.diag_more}
                            </b>
                          </p>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: "-10px" }}>
                        <Col>
                          <p style={{ fontSize: "12px" }}>
                            ความต้องการ :&nbsp;
                            <b style={{ color: "blue" }}>
                              {dataPatientReq?.priority_name}
                            </b>
                          </p>
                        </Col>{" "}
                        &nbsp;&nbsp;
                        <Col>
                          <p style={{ fontSize: "12px" }}>
                            ความต้องการเร่งด่วน :&nbsp;
                            <b style={{ color: "blue" }}>
                              {dataPatientReq?.emer_name}
                            </b>
                          </p>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: "-10px" }}>
                        <Col>
                          <p style={{ fontSize: "12px" }}>
                            Note :&nbsp;
                            <b style={{ color: "blue" }}>
                              {dataPatientReq?.note}
                            </b>
                          </p>
                        </Col>
                      </Row>
                    </>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Card ข้อมูลเลือด */}
          <Row style={{ marginTop: "-10px" }}>
            <Col xs={24} lg={24} xl={24} style={{ marginTop: "14px" }}>
              <Row
                style={{
                  marginTop: "15px",
                  border: "1px solid",
                  padding: "10px",
                  height: "190px",
                  borderRadius: "5px",
                }}
              >
                <Row style={{ marginTop: -20 }}>
                  <Col>
                    <p
                      style={{
                        fontSize: "14px",
                        border: "1px solid",
                        borderRadius: "7px",
                        backgroundColor: "white",
                        paddingLeft: "8px",
                        paddingRight: "8px",
                      }}
                    >
                      ข้อมูลเลือด
                    </p>
                  </Col>
                </Row>

                <Row style={{ marginTop: "-3px" }}>
                  <Col>
                    <Form.Item
                      name="xm_id"
                      label="ใบคล้องเลือด"
                      style={{ paddingRight: "6px" }}
                    >
                      <Input
                        maxLength={11}
                        id="xm_id"
                        onPressEnter={SearchXmId}
                        placeholder="ใบคล้องเลือด"
                        disabled={disabledXmId}
                        style={{
                          width: "100%",
                          height: "28px",
                          fontSize: "14px",
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col>
                    <Form.Item
                      name="blood_no"
                      label="เลขถุงเลือด"
                      style={{ paddingRight: "6px" }}
                    >
                      <Input
                        onPressEnter={SearchBloodNo}
                        id="blood_no"
                        placeholder="เลขถุงเลือด"
                        disabled={disabledBloodNo}
                        style={{
                          width: "100%",
                          height: "28px",
                          fontSize: "14px",
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col>
                    <Button
                      disabled={disabledBtn}
                      shape="round"
                      onClick={showModalConfirm}
                      icon={<BsDropletHalf />}
                      style={{
                        fontSize: "12px",
                        marginLeft: "490px",

                        backgroundColor:
                          disabledBtn === false ? "#10d909" : "#EEEEEE",
                        color: disabledBtn === false ? "#ffffff" : "black",
                      }}
                    >
                      &nbsp;จ่ายเลือด
                    </Button>
                  </Col>
                </Row>

                <Row justify="center">
                  <Col span={22} style={{ marginTop: -20 }}>
                    <Table
                      pagination={false}
                      className="xm"
                      bordered
                      columns={columnDataBlood}
                      dataSource={dataSource}
                      scroll={{ y: 100 }}
                      size="small"
                    ></Table>
                  </Col>
                </Row>
              </Row>
            </Col>
          </Row>
        </Card>

        {/* modal */}
        <Modal
          title=""
          width={850}
          visible={modalfingerTip}
          onOk={handleOkFingerTip}
          onCancel={handleCancelFingerTip}
          style={{ marginTop: "-60px" }}
          footer={false}
        >
          <Row style={{ marginLeft: "-8px", marginTop: "-15px" }}>
            <h style={{ fontSize: "14px" }}>การเจาะเลือดจากปลายนิ้ว</h>
          </Row>
          <Form form={frmFingerTip} layout="vertical">
            <Row justify="center">
              <Table
                dataSource={DataFgt}
                pagination={false}
                size="small"
                width="100%"
                className="NOHOVERfgt"
              >
                <Column
                  title="Anti-A"
                  dataIndex="anti_a"
                  key="anti_a"
                  align="center"
                  width="100px"
                />
                <Column
                  title="Anti-B"
                  dataIndex="anti_b"
                  key="anti_b"
                  align="center"
                  width="100px"
                />
                <Column
                  title="Anti-AB"
                  dataIndex="anti_ab"
                  key="anti_ab"
                  align="center"
                  width="100px"
                />
                <Column
                  title="Anti-D"
                  dataIndex="anti_d"
                  key="anti_d"
                  align="center"
                  width="100px"
                />
              </Table>
            </Row>
            <Row
              justify="center"
              style={{ marginLeft: "58px", marginTop: "5px" }}
            >
              <Col span={3}>
                <Form.Item
                  label="หมู่เลือด"
                  name="abo_group"
                  style={{ paddingRight: "12px" }}
                >
                  <Select
                    onChange={SetantiABO}
                    className="SelectGr"
                    placeholder="Gr"
                    size="large"
                    style={{
                      width: "100%",
                      fontSize: "16px",
                    }}
                  >
                    {groupblood?.map((item) => (
                      <Option
                        key={item.blood_id}
                        value={item.blood_name}
                        style={{
                          fontSize: "18px",
                          textAlign: "center",
                        }}
                      >
                        {item.blood_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item
                  label="Rh"
                  name="rh_name"
                  style={{ paddingRight: "12px" }}
                >
                  <Select
                    onChange={SetantiD}
                    className="SelectRh"
                    placeholder="Rh"
                    size="large"
                    style={{
                      width: "100%",
                    }}
                  >
                    {rhname?.map((item) => (
                      <Option
                        key={item.rh_id}
                        value={item.rh_shot_name}
                        style={{
                          fontSize: "18px",
                          textAlign: "center",
                        }}
                      >
                        {item.rh_shot_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  name="passwordFgt"
                  label="Password"
                  style={{ marginTop: "18px" }}
                  //rules={[{ required: true }]}
                >
                  <Input.Password
                    onChange={(e) => setPasswordFgt(e.target.value)}
                    placeholder="กรุณากรอกรหัสผ่าน"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    style={{ width: "80%" }}
                    onPressEnter={AddFinger}
                  />
                </Form.Item>
              </Col>
              <Col span={3}>
                <Button
                  disabled={!passwordfgt}
                  shape="round"
                  onClick={AddFinger}
                  style={{
                    marginLeft: "-35px",
                    backgroundColor: !passwordfgt ? "" : "#47B5FF",
                    color: !passwordfgt ? "" : "#ffffff",
                    marginTop: "49px",
                  }}
                >
                  &nbsp;ยืนยัน
                </Button>
              </Col>
            </Row>
          </Form>

          <Row style={{ marginLeft: "-8px", marginTop: "-15px" }}>
            <h style={{ fontSize: "14px" }}>ประวัติการเจาะเลือดจากปลายนิ้ว</h>
          </Row>

          <Row style={{ marginLeft: "-8px", marginTop: "5px" }}>
            <Table
              className="xm"
              size="small"
              bordered
              dataSource={dataFingerTip}
              columns={columnFingerTip}
              pagination={false}
              scroll={{ y: 100 }}
            ></Table>
          </Row>
        </Modal>

        <Modal
          visible={isModalConfirm}
          onCancel={handleCancelConfirm}
          footer={false}
          width={420}
        >
          <Row style={{ marginLeft: "-8px", marginTop: "-15px" }}>
            <h style={{ fontSize: "14px" }}>ยืนยันการจ่ายเลือด</h>
          </Row>
          <Row style={{ paddingLeft: "26px" }}>
            <p style={{ marginLeft: "-8px" }}>
              เลขที่สั่ง :
              <b style={{ marginLeft: "8px", fontSize: "20px" }}>
                {dataPatientReq?.order_number}
              </b>
            </p>
          </Row>

          <Row style={{ marginTop: "-12px" }}>
            <Col span={24}>
              <Form.Item
                name="ward"
                label="ward"
                style={{ paddingLeft: "33px" }}
                //rules={[{ required: true }]}
              >
                <Select
                  onChange={Fetch_recivedStaff}
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
                    width: "90%",
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

          <Row style={{ marginTop: "-19px" }}>
            <Col span={24}>
              <Form.Item
                name="depcode"
                label="จุดที่ขอ"
                style={{ paddingLeft: "20px" }}
              >
                <Select
                  showArrow={false}
                  dropdownMatchSelectWidth={false}
                  placement={placement}
                  placeholder="เลือกจุดที่ขอ"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  style={{
                    width: "90%",
                    fontSize: "14px",
                    height: "32px",
                  }}
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

          <Row style={{ marginTop: "-19px" }}>
            <Col span={24}>
              <Form.Item
                name="received_staff"
                label="ผู้มารับเลือด"
                style={{ marginLeft: "-6px" }}
                //rules={[{ required: true }]}
              >
                <Select
                  showArrow={false}
                  dropdownMatchSelectWidth={false}
                  placement={placement}
                  placeholder="เลือกผู้มารับเลือด"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  style={{
                    width: "90%",
                    fontSize: "14px",
                    height: "32px",
                  }}
                  onKeyDown={(e) => {
                    const value = e.target.value;
                    if (e.keyCode === 13) {
                      // 13 คือ enter
                      console.log("---", value);
                      upRceivedStaff(value)
                      // addGroup(value, record.qc_result_id, record.key);
                    }
                  }}
                >
                  {recivedStaff?.map((item) => (
                    <Option key={item.sr_name} value={item.sr_name}>
                      {item.sr_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ marginTop: "-19px" }}>
            <Col span={20}>
              <Form.Item
                name="password"
                label="Password"
                style={{ marginLeft: "6px" }}
                //rules={[{ required: true }]}
              >
                <Input.Password
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="กรุณากรอกรหัสผ่าน"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  style={{ width: "80%" }}
                  onPressEnter={updateDataTran}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Button
                disabled={!password}
                shape="round"
                onClick={updateDataTran}
                style={{
                  marginLeft: "-40px",
                  backgroundColor: !password ? "" : "#47B5FF",
                  color: !password ? "" : "#ffffff",
                }}
              >
                &nbsp;ยืนยัน
              </Button>
            </Col>
          </Row>
        </Modal>
      </Form>
    </>
  );
};
export default Patient_trans_blood;
