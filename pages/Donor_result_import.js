import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Switch,
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

const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const Setting = (value) => {
  const scW = screen.width / 2;
  const scH = screen.height / 2;
  const appW = 600;
  const appH = 370;
  const url = "/Setting_Inf";
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

const Donor_result_import = () => {
  const [mobile, setMobile] = useState();
  const [result_list, setResult_list] = useState();
  const [result_Group, setResult_Group] = useState();
  const [result_Rh, setResult_Rh] = useState();
  const [result_Choice, setResult_Choice] = useState();
  const [result_inf, setResult_inf] = useState();
  const [valueResult, setValueResult] = useState({}); //{ 123: { Saline: '1',Papian: ''  }, 234:  { Saline: '1',Papian: ''  } }

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [Loanding_table, setLoanding_table] = useState(false);

  const [isModalSetting, setIsModalSetting] = useState(false);
  const [isModalPasswordSetting, setIsModalPasswordSetting] = useState(false);
  const [passwordSetting, setPasswordSetting] = useState();
  const [result_inf_setting, setResult_inf_setting] = useState();

  const [password, setPassword] = useState();

  const [frmSearch] = Form.useForm();
  const [frmAdd_result] = Form.useForm();
  const [frmSetting_Inf] = Form.useForm();

  // setting
  const showModalSetting = () => {
    setIsModalSetting(true);
  };

  const showModalPassSetting = async () => {
    setIsModalPasswordSetting(true);
    setTimeout(() => {
      document.getElementById("passSetting").focus();
    }, 500);
  };

  const fecth_inf_setting = async () => {
    const result = await api.get("/Check_inf");
    setResult_inf_setting(result.data[0]);

    console.log("fecth_inf", result.data[0]);
    frmSetting_Inf.setFieldsValue({
      // Saline: true,
      // Papian: true,
      Saline: result.data[0]?.Saline === "1" ? true : false,
      Papian: result.data[0]?.Papian === "1" ? true : false,
      Coombs: result.data[0]?.Coombs === "1" ? true : false,
      AntiA: result.data[0]?.AntiA === "1" ? true : false,
      AntiB: result.data[0]?.AntiB === "1" ? true : false,
      TPHA: result.data[0]?.TPHA === "1" ? true : false,
      HBsAg: result.data[0]?.HBsAg === "1" ? true : false,
      HIV: result.data[0]?.HIV === "1" ? true : false,
      HBV_NAT: result.data[0]?.HBVNAT === "1" ? true : false,
      HCV_NAT: result.data[0]?.HCVNAT === "1" ? true : false,
      HIV_NAT: result.data[0]?.HIVNAT === "1" ? true : false,
      ALT: result.data[0]?.ALT === "1" ? true : false,
      HCV: result.data[0]?.HCV === "1" ? true : false,
      HIVAg: result.data[0]?.HIVAg === "1" ? true : false,
    });
  };

  const Ok = async (value) => {
    const frmData = frmSetting_Inf.getFieldsValue();
    const Saline = frmData.Saline;
    const Papian = frmData.Papian;
    const Coombs = frmData.Coombs;
    const AntiA = frmData.AntiA;
    const AntiB = frmData.AntiB;
    const TPHA = frmData.TPHA;
    const HBsAg = frmData.HBsAg;
    const HIV = frmData.HIV;
    const HBV_NAT = frmData.HBV_NAT;
    const HCV_NAT = frmData.HCV_NAT;
    const HIV_NAT = frmData.HIV_NAT;
    const ALT = frmData.ALT;
    const HCV = frmData.HCV;
    const HIVAg = frmData.HIVAg;
    ///-----------------------//
    if (Saline === true) {
      Saline = "1";
    } else {
      Saline = "0";
    }
    if (Papian === true) {
      Papian = "1";
    } else {
      Papian = "0";
    }
    if (Coombs === true) {
      Coombs = "1";
    } else {
      Coombs = "0";
    }
    if (AntiA === true) {
      AntiA = "1";
    } else {
      AntiA = "0";
    }
    if (AntiB === true) {
      AntiB = "1";
    } else {
      AntiB = "0";
    }
    if (TPHA === true) {
      TPHA = "1";
    } else {
      TPHA = "0";
    }
    if (HBsAg === true) {
      HBsAg = "1";
    } else {
      HBsAg = "0";
    }
    if (HIV === true) {
      HIV = "1";
    } else {
      HIV = "0";
    }
    if (HBV_NAT === true) {
      HBV_NAT = "1";
    } else {
      HBV_NAT = "0";
    }
    if (HCV_NAT === true) {
      HCV_NAT = "1";
    } else {
      HCV_NAT = "0";
    }
    if (HIV_NAT === true) {
      HIV_NAT = "1";
    } else {
      HIV_NAT = "0";
    }
    if (ALT === true) {
      ALT = "1";
    } else {
      ALT = "0";
    }
    if (HCV === true) {
      HCV = "1";
    } else {
      HCV = "0";
    }
    if (HIVAg === true) {
      HIVAg = "1";
    } else {
      HIVAg = "0";
    }
    const result = await api.put("/setting_inf", {
      Saline: Saline,
      Papian: Papian,
      Coombs: Coombs,
      AntiA: AntiA,
      AntiB: AntiB,
      TPHA: TPHA,
      HBsAg: HBsAg,
      HIV: HIV,
      HBV_NAT: HBV_NAT,
      HCV_NAT: HCV_NAT,
      HIV_NAT: HIV_NAT,
      ALT: ALT,
      HCV: HCV,
      HIVAg: HIVAg,
    });
    fecth_inf_setting();
    setIsModalPasswordSetting(false);
    setPasswordSetting();
    fecth_inf();
  };

  // ------------------------------------------------ //
  const fetch_Mobile = async () => {
    const result = await api.get("/Get_Mobile");
    setMobile(result.data);
  };
  const fecth_Group = async () => {
    const result = await api.get("/Get_Group");
    setResult_Group(result.data);
  };
  const fecth_Rh = async () => {
    const result = await api.get("/Get_RH");
    setResult_Rh(result.data);
  };

  //// Choice ////
  const fecth_Choice = async () => {
    const result = await api.get("/Get_Choice", { result });
    setResult_Choice(result.data);
    console.log("setResult_Choice", result.data);

    // const frmData = frmAdd_result.getFieldsValue();
    // const dataUpdate = {};
    // Object.keys(frmData).forEach((id) => {
    //   dataUpdate[id] = {
    //     Saline: result.name === "1" && result.name === " " ? "xxxx" : " ",
    //   };
    // });
    // console.log("value---Set_auto--->", dataUpdate);
    // frmAdd_result.setFieldsValue({
    //   ...dataUpdate,
    // });
  };

  const fecth_inf = async () => {
    const result = await api.get("/Get_Inf");
    setResult_inf(result.data);
  };

  const Clear_value = async () => {
    frmSearch.resetFields("");
    setResult_list([]);
  };
  //โหลดข้อมูลปุ่มหมู่เลือด
  useEffect(async () => {
    await fetch_Mobile();
    await fecth_Group();
    await fecth_Rh();
    await fecth_Choice();
    await fecth_inf();
    await fecth_inf_setting();
  }, []);
  const onSearch = async (value) => {
    let date_start;
    let date_end;

    if (value.date_Search?.length > 0) {
      date_start = moment(value.date_Search[0]).format("YYYY-MM-DD");
      date_end = moment(value.date_Search[1]).format("YYYY-MM-DD");
    }
    try {
      setLoanding_table(true);
      const params = {
        ...value,
        date_start: date_start,
        date_end: date_end,
      };
      delete params.date_Search;
      await Fetch_result_list(params);
      // frmAdd_result.resetFields();
      // setValueResult();
    } catch (error) {
      Modal.error({ title: "Error" });
    }
    setLoanding_table(false);
  };

  const Fetch_result_list = async (params) => {
    console.log("params", params);
    const allValue = Object.values(params);
    console.log("allValue", allValue);
    if (allValue.every((item) => !item)) {
      Modal.error({
        title: "แจ้งเตือน !! ",
        content: "ไม่พบข้อมูล กรุณาตรวจสอบการค้นหาอีกครั้ง",
      });
      return true;
    }
    const result = await api.get("/Getdata", { params });
    console.log("รายชื่อผู้บริจาค", result.data);

    setResult_list(result.data || []);
    const dataUpdate = {};
    result.data.forEach((item) => {
      console.log("item", item);
      dataUpdate[item.dn] = {
        ...item,
        Saline: "",
        Papian: "",
        Coombs: "",
        Anti_A: "",
        Anti_B: "",
        TPHA: "",
        HBsAg: "",
        HIV: "",
        HBV_NAT: "",
        HCV_NAT: "",
        HIV_NAT: "",
        ALT: "",
        HCV: "",
        HIVAg: "",
        Gr: item.dorngro,
        RH: item.dornrh,
      };
    });
    const frm = frmAdd_result.getFieldsValue();
    console.log("value---Set--->", frm);
    console.log("dataUpdate--->", dataUpdate);

    frmAdd_result.setFieldsValue({
      ...dataUpdate,
    });
  };
  useEffect(async () => {
    await Fetch_result_list({
      date_start: moment().format("YYYY-MM-DD"),
      date_end: moment().format("YYYY-MM-DD"),
    });
  }, []);

  const Set_auto = async (value) => {
    const frmData = frmAdd_result.getFieldsValue();
    console.log("-------------frmData", frmData);

    const dataUpdate = {};
    Object.keys(frmData).forEach((id) => {
      dataUpdate[id] = {
        Saline: result_inf[0].Saline === "1" ? "0" : " ",
        Papian: result_inf[0].Papian === "1" ? "0" : " ",
        Coombs: result_inf[0].Coombs === "1" ? "0" : " ",
        Anti_A: result_inf[0].AntiA === "1" ? "0" : " ",
        Anti_B: result_inf[0].AntiB === "1" ? "0" : " ",
        TPHA: result_inf[0].TPHA === "1" ? "0" : " ",
        HBsAg: result_inf[0].HBsAg === "1" ? "0" : " ",
        HIV: result_inf[0].HIV === "1" ? "0" : " ",
        HBV_NAT: result_inf[0].HBVNAT === "1" ? "0" : " ",
        HCV_NAT: result_inf[0].HCVNAT === "1" ? "0" : " ",
        HIV_NAT: result_inf[0].HIVNAT === "1" ? "0" : " ",
        ALT: result_inf[0].ALT === "1" ? "0" : " ",
        HCV: result_inf[0].HCV === "1" ? "0" : " ",
        HIVAg: result_inf[0].HIVAg === "1" ? "0" : " ",
        Result: "PASS",
      };
    });
    console.log("value---Set_auto--->", dataUpdate);
    frmAdd_result.setFieldsValue({
      ...dataUpdate,
    });
  };

  //-----------------------//

  const showModal = () => {
    setIsModalVisible(true);
    setTimeout(() => {
      document.getElementById("pass").focus();
    }, 500);
  };
  const Set_Result = async (value) => {
    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });
    // console.log("resultLogin", resultLogin.data);
    let totalPass = 0;
    let totalFail = 0;

    try {
      if (resultLogin.data.id_user) {
        const formData = frmAdd_result.getFieldsValue();
        console.log("Set_Result", formData);

        const staff =
          resultLogin.data.pname +
          " " +
          resultLogin.data.fname +
          " " +
          resultLogin.data.lname;
        const allUpdate = [];

        Object.keys(formData).forEach((item) => {
          console.log("value item", formData[item]);
          if (formData[item].Result === "PASS") {
            totalPass++;
          }
          if (formData[item].Result === "FAIL") {
            totalFail++;
          }

          const body = {
            dn: item,
            ...formData[item],
            staff: staff,
          };
          // if(value.every  !== undefine && ....)  {
          allUpdate.push(api.put(`/Update_result`, { ...body }));
          // }
        });

        const result = await Promise.all(allUpdate);
        Modal.success({
          content: (
            <div>
              pass: {totalPass}, fail: {totalFail}
            </div>
          ),
        });
        frmAdd_result.resetFields();
      } else {
        Modal.error({
          title: "Password invalid",
          content: "กรุณากรอกรหัสผ่านให้ถูกต้อง!!",
        });
      }
      setIsModalVisible(false);
      setPassword();
      setResult_list();
    } catch (error) {
      Modal.error({ title: "Error", content: "!!!!!!!!!!!!!" });
    }
    setIsModalVisible(false);
    setPassword();
  };
  const Set_Color = (value, dn, key) => {
    // const frmData = frmAdd_result.getFieldValue();
    console.log("9999frmData", value, dn, key);
    console.log("===", valueResult);
    setValueResult({
      ...valueResult,
      [dn]: {
        ...valueResult?.[dn],
        [key]: value,
      },
    });
  };
  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "",
      key: "dn",
      align: "center",
      width: 70,
      fixed: "left",
      render: (text, record, index) => {
        <Form.Item name={[record.dn, "dn"]} noStyle />;
        return index + 1;
      },
    },
    {
      title: "เลขที่ถุงเลือด",
      dataIndex: "unit_no",
      key: "unit_no",
      align: "center",
      width: 130,
      fixed: "left",
      render: (text, record) => (
        <Form.Item
          name={[record.dn, "unit_no"]}
          noStyle
          rules={[{ required: true }]}
        >
          {record.unit_no}
        </Form.Item>
      ),
    },
    {
      title: "วันที่บริจาคเลือด",
      dataIndex: "donor_date",
      key: "donor_date",
      align: "center",
      width: 130,
      fixed: "left",
    },
    {
      title: "Gr",
      dataIndex: "dorngro",
      key: "dorngro",
      align: "center",
      width: 90,

      render: (text, record) => (
        <Form.Item
          name={[record.dn, "Gr"]}
          noStyle
          rules={[{ required: true }]}
        >
          <Select
            placeholder="กรุ๊ป"
            showArrow={false}
            style={{ width: "50px" }}
          >
            {result_Group?.map((item) => (
              <Option key={item.blood_id} value={item.blood_name}>
                {item.blood_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
    },
    {
      title: "Rh",
      dataIndex: "dornrh",
      key: "dornrh",
      align: "center",
      width: 90,
      render: (text, record) => (
        <Form.Item
          name={[record.dn, "RH"]}
          noStyle
          rules={[{ required: true }]}
        >
          <Select placeholder="RH" showArrow={false} style={{ width: "45px" }}>
            {result_Rh?.map((item) => (
              <Option key={item.rh_id} value={item.rh_shot_name}>
                {item.rh_shot_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
    },
    {
      title: "ลงผลตรวจ",
      children: [
        {
          title: "Saline",
          dataIndex: "",
          key: "saline",
          align: "center",
          width: 80,

          render: (text, record) => (
            <Form.Item name={[record.dn, "Saline"]} noStyle>
              <Select
                showArrow={false}
                style={{
                  width: "45px",
                  color: result_Choice === "0" ? "red" : "",
                }}
                className={
                  valueResult?.[record.dn]?.["Saline"] != undefined &&
                  valueResult?.[record.dn]?.["Saline"] != " " &&
                  valueResult?.[record.dn]?.["Saline"] != "0"
                    ? "select-result-1 ant-select-selector"
                    : ""
                }
                onChange={(value) => Set_Color(value, record.dn, "Saline")}
              >
                {result_Choice?.map((item) => (
                  <Option key={item.id} value={item.name}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ),
        },
        {
          title: "Papian",
          key: "papian",
          align: "center",
          width: 80,
          render: (text, record) => (
            <Form.Item name={[record.dn, "Papian"]} noStyle>
              <Select
                showArrow={false}
                style={{ width: "45px" }}
                className={
                  valueResult?.[record.dn]?.["Papian"] != undefined &&
                  valueResult?.[record.dn]?.["Papian"] != " " &&
                  valueResult?.[record.dn]?.["Papian"] != "0"
                    ? "select-result-1 ant-select-selector"
                    : ""
                }
                onChange={(value) => Set_Color(value, record.dn, "Papian")}
              >
                {result_Choice?.map((item) => (
                  <Option key={item.id} value={item.name}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ),
        },
        {
          title: "Coomb",
          dataIndex: "",
          key: "coombs",
          align: "center",
          width: 80,
          render: (text, record) => (
            <Form.Item name={[record.dn, "Coombs"]} noStyle>
              <Select
                showArrow={false}
                style={{ width: "45px" }}
                className={
                  valueResult?.[record.dn]?.["Coombs"] != undefined &&
                  valueResult?.[record.dn]?.["Coombs"] != " " &&
                  valueResult?.[record.dn]?.["Coombs"] != "0"
                    ? "select-result-1 ant-select-selector"
                    : ""
                }
                onChange={(value) => Set_Color(value, record.dn, "Coombs")}
              >
                {result_Choice?.map((item) => (
                  <Option key={item.id} value={item.name}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ),
        },
        {
          title: "Anti-A",
          dataIndex: "",
          key: "anti_a",
          align: "center",
          width: 80,
          render: (text, record) => (
            <Form.Item name={[record.dn, "Anti_A"]} noStyle>
              <Select
                showArrow={false}
                style={{ width: "45px" }}
                className={
                  valueResult?.[record.dn]?.["Anti_A"] != undefined &&
                  valueResult?.[record.dn]?.["Anti_A"] != " " &&
                  valueResult?.[record.dn]?.["Anti_A"] != "0"
                    ? "select-result-2 ant-select-selector"
                    : ""
                }
                onChange={(value) => Set_Color(value, record.dn, "Anti_A")}
              >
                {result_Choice?.map((item) => (
                  <Option key={item.id} value={item.name}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ),
        },
        {
          title: "Anti-B",
          dataIndex: "",
          key: "anti_b",
          align: "center",
          width: 80,
          render: (text, record) => (
            <Form.Item name={[record.dn, "Anti_B"]} noStyle>
              <Select
                showArrow={false}
                style={{ width: "45px" }}
                className={
                  valueResult?.[record.dn]?.["Anti_B"] != undefined &&
                  valueResult?.[record.dn]?.["Anti_B"] != " " &&
                  valueResult?.[record.dn]?.["Anti_B"] != "0"
                    ? "select-result-2 ant-select-selector"
                    : ""
                }
                onChange={(value) => Set_Color(value, record.dn, "Anti_B")}
              >
                {result_Choice?.map((item) => (
                  <Option key={item.id} value={item.name}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ),
        },
        {
          title: "TPHA",
          dataIndex: "",
          key: "tpha",
          align: "center",
          width: 80,
          render: (text, record) => (
            <Form.Item name={[record.dn, "TPHA"]} noStyle>
              <Select
                showArrow={false}
                style={{ width: "45px" }}
                className={
                  valueResult?.[record.dn]?.["TPHA"] != undefined &&
                  valueResult?.[record.dn]?.["TPHA"] != " " &&
                  valueResult?.[record.dn]?.["TPHA"] != "0"
                    ? "select-result-2 ant-select-selector"
                    : ""
                }
                onChange={(value) => Set_Color(value, record.dn, "TPHA")}
              >
                {result_Choice?.map((item) => (
                  <Option key={item.id} value={item.name}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ),
        },
        {
          title: "HBsAg",
          dataIndex: "",
          key: "hbsag",
          align: "center",
          width: 80,
          render: (text, record) => (
            <Form.Item name={[record.dn, "HBsAg"]} noStyle>
              <Select
                showArrow={false}
                style={{ width: "45px" }}
                className={
                  valueResult?.[record.dn]?.["HBsAg"] != undefined &&
                  valueResult?.[record.dn]?.["HBsAg"] != " " &&
                  valueResult?.[record.dn]?.["HBsAg"] != "0"
                    ? "select-result-2 ant-select-selector"
                    : ""
                }
                onChange={(value) => Set_Color(value, record.dn, "HBsAg")}
              >
                {result_Choice?.map((item) => (
                  <Option key={item.id} value={item.name}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ),
        },
        {
          title: "HIV",
          dataIndex: "",
          key: "hiv",
          align: "center",
          width: 80,
          render: (text, record) => (
            <Form.Item name={[record.dn, "HIV"]} noStyle>
              <Select
                showArrow={false}
                style={{ width: "45px" }}
                className={
                  valueResult?.[record.dn]?.["HIV"] != undefined &&
                  valueResult?.[record.dn]?.["HIV"] != " " &&
                  valueResult?.[record.dn]?.["HIV"] != "0"
                    ? "select-result-2 ant-select-selector"
                    : ""
                }
                onChange={(value) => Set_Color(value, record.dn, "HIV")}
              >
                {result_Choice?.map((item) => (
                  <Option key={item.id} value={item.name}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ),
        },
        {
          title: <h5>HBVNAT</h5>,
          dataIndex: "",
          key: "hbnvat",
          align: "center",
          width: 80,
          render: (text, record) => (
            <Form.Item name={[record.dn, "HBV_NAT"]} noStyle>
              <Select
                showArrow={false}
                style={{ width: "45px" }}
                className={
                  valueResult?.[record.dn]?.["HBV_NAT"] != undefined &&
                  valueResult?.[record.dn]?.["HBV_NAT"] != " " &&
                  valueResult?.[record.dn]?.["HBV_NAT"] != "0"
                    ? "select-result-2 ant-select-selector"
                    : ""
                }
                onChange={(value) => Set_Color(value, record.dn, "HBV_NAT")}
              >
                {result_Choice?.map((item) => (
                  <Option key={item.id} value={item.name}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ),
        },
        {
          title: <h5>HCVNAT</h5>,
          dataIndex: "",
          key: "hcvnat",
          align: "center",
          width: 80,
          render: (text, record) => (
            <Form.Item name={[record.dn, "HCV_NAT"]} noStyle>
              <Select
                showArrow={false}
                style={{ width: "45px" }}
                className={
                  valueResult?.[record.dn]?.["HCV_NAT"] != undefined &&
                  valueResult?.[record.dn]?.["HCV_NAT"] != " " &&
                  valueResult?.[record.dn]?.["HCV_NAT"] != "0"
                    ? "select-result-2 ant-select-selector"
                    : ""
                }
                onChange={(value) => Set_Color(value, record.dn, "HCV_NAT")}
              >
                {result_Choice?.map((item) => (
                  <Option key={item.id} value={item.name}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ),
        },
        {
          title: <h5>HIVNAT</h5>,
          dataIndex: "",
          key: "hivnat",
          align: "center",
          width: 80,
          render: (text, record) => (
            <Form.Item name={[record.dn, "HIV_NAT"]} noStyle>
              <Select
                showArrow={false}
                style={{ width: "45px" }}
                className={
                  valueResult?.[record.dn]?.["HIV_NAT"] != undefined &&
                  valueResult?.[record.dn]?.["HIV_NAT"] != " " &&
                  valueResult?.[record.dn]?.["HIV_NAT"] != "0"
                    ? "select-result-2 ant-select-selector"
                    : ""
                }
                onChange={(value) => Set_Color(value, record.dn, "HIV_NAT")}
              >
                {result_Choice?.map((item) => (
                  <Option key={item.id} value={item.name}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ),
        },
        {
          title: "ALT",
          dataIndex: "",
          key: "alt",
          align: "center",
          width: 80,
          render: (text, record) => (
            <Form.Item name={[record.dn, "ALT"]} noStyle>
              <Select
                showArrow={false}
                style={{ width: "45px" }}
                className={
                  valueResult?.[record.dn]?.["ALT"] != undefined &&
                  valueResult?.[record.dn]?.["ALT"] != " " &&
                  valueResult?.[record.dn]?.["ALT"] != "0"
                    ? "select-result-2 ant-select-selector"
                    : ""
                }
                onChange={(value) => Set_Color(value, record.dn, "ALT")}
              >
                {result_Choice?.map((item) => (
                  <Option key={item.id} value={item.name}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ),
        },
        {
          title: "HCV",
          dataIndex: "",
          key: "hcv",
          align: "center",
          width: 80,
          render: (text, record) => (
            <Form.Item name={[record.dn, "HCV"]} noStyle>
              <Select
                showArrow={false}
                style={{ width: "45px" }}
                className={
                  valueResult?.[record.dn]?.["HCV"] != undefined &&
                  valueResult?.[record.dn]?.["HCV"] != " " &&
                  valueResult?.[record.dn]?.["HCV"] != "0"
                    ? "select-result-2 ant-select-selector"
                    : ""
                }
                onChange={(value) => Set_Color(value, record.dn, "HCV")}
              >
                {result_Choice?.map((item) => (
                  <Option key={item.id} value={item.name}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ),
        },
        {
          title: "HIVAg",
          dataIndex: "",
          key: "hivag",
          align: "center",
          width: 80,
          render: (text, record) => (
            <Form.Item name={[record.dn, "HIVAg"]} noStyle>
              <Select
                showArrow={false}
                style={{ width: "45px" }}
                className={
                  valueResult?.[record.dn]?.["HIVAg"] != undefined &&
                  valueResult?.[record.dn]?.["HIVAg"] != " " &&
                  valueResult?.[record.dn]?.["HIVAg"] != "0"
                    ? "select-result-2 ant-select-selector"
                    : ""
                }
                onChange={(value) => Set_Color(value, record.dn, "HIVAg")}
              >
                {result_Choice?.map((item) => (
                  <Option key={item.id} value={item.name}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ),
        },
        {
          title: "Result",
          dataIndex: "",
          key: "result",
          align: "center",
          width: 80,
          render: (text, record) => (
            <Form.Item name={[record.dn, "Result"]} noStyle>
              <Select showArrow={false} style={{ width: "60px" }}>
                <Option value="PASS">PASS</Option>
                <Option value="FAIL">FAIL</Option>
              </Select>
            </Form.Item>
          ),
        },
      ],
    },
  ];

  return (
    <>
      <Layout keyTab="Donor_result_import">
        <div>
          <Head>
            <title>SIBSOFT : ลงผลตรวจเลือด</title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
        </div>

        <Row justify="center" style={{ padding: "10px" }}>
          <Col span={24}>
            <Card>
              <Tabs type="card" style={{ marginTop: -20 }}>
                <TabPane tab="ลงผลตรวจเลือด" key="1">
                  <Row>
                    <Col span={24}>
                      <Form
                        form={frmSearch}
                        layout="inline"
                        onFinish={onSearch}
                        // set เป็นวันปัจจุบัน
                        // initialValues={{
                        //   date_Search: [moment(), moment()],
                        // }}
                      >
                        <Form.Item name="date_Search" label="ค้นหาจากวันที่">
                          <RangePicker
                            placeholder={["วันเริ่ม", "วันสุดท้าย"]}
                            format="DD-MM-YYYY"
                            locale={th_TH}
                          />
                        </Form.Item>
                        <Form.Item name="unit_no" label="Unit No.">
                          <Input placeholder="Unit No." />
                        </Form.Item>
                        <Form.Item name="mobile" label="หน่วยรับบริจาค">
                          <Select
                            placeholder="ค้นหาจากหน่วยรับบริจาค"
                            style={{ width: "200px" }}
                          >
                            {mobile?.map((item) => (
                              <Option key={item.MOBCODE} value={item.MOBCODE}>
                                {item.MOBNAME}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item>
                          <Button
                            icon={
                              <MdManageSearch
                                style={{
                                  fontSize: "16px",
                                  marginRight: "3px",
                                  marginBottom: "-3px",
                                }}
                              />
                            }
                            style={{
                              fontSize: "12px",
                              height: "28px",
                              marginLeft: "5px",
                              backgroundColor: "#17a2b8",
                              color: "white",
                            }}
                            htmlType="submit"
                          >
                            ค้นหา
                          </Button>
                          &nbsp;
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
                            onClick={Clear_value}
                          >
                            เริ่มใหม่
                          </Button>
                        </Form.Item>
                      </Form>
                    </Col>
                  </Row>

                  <Form form={frmAdd_result} onFinish={Set_Result}>
                    {/* <Card> */}
                    <Row justify="end" style={{ marginTop: "10px" }}>
                      <Col>
                        <Tooltip
                          placement="left"
                          title={
                            !result_list || result_list.length <= 0
                              ? "กรุณากรอกข้อมูล"
                              : ""
                          }
                        >
                          <Button
                            disabled={!result_list || result_list.length <= 0}
                            type="primary"
                            onClick={Set_auto}
                          >
                            ลงผลอัตโนมัติ
                          </Button>
                        </Tooltip>
                        &nbsp;
                        <Button type="primary" onClick={showModalSetting}>
                          ตั้งค่าลงผลตรวจอัตโนมัติ
                        </Button>
                      </Col>
                    </Row>
                    <Row justify="center" style={{ marginTop: "10px" }}>
                      <Col>
                        <Table
                          bordered
                          pagination={false}
                          scroll={{ y: 700 }}
                          columns={columns}
                          dataSource={result_list}
                          loading={Loanding_table}
                          className="xm"
                          size="small"
                          style={{ border: "1px solid" }}
                        />
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <br />
                    <Row justify="end">
                      <Tooltip
                        placement="right"
                        title={
                          !result_list || result_list.length <= 0
                            ? "กรุณากรอกข้อมูล"
                            : ""
                        }
                      >
                        <Button
                          disabled={!result_list || result_list.length <= 0}
                          style={{
                            fontSize: "12px",
                            height: "28px",
                            backgroundColor:
                              !result_list || result_list.length <= 0
                                ? ""
                                : "#3AB0FF",
                            color:
                              !result_list || result_list.length <= 0
                                ? ""
                                : "white",
                          }}
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
                        >
                          บันทึกข้อมูล
                        </Button>
                      </Tooltip>
                    </Row>
                    {/* </Card> */}
                  </Form>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </Layout>
      <Modal
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false), setPassword();
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
              Set_Result();
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
            onClick={Set_Result}
            disabled={!password}
          >
            ยืนยัน
          </Button>
        </Row>
      </Modal>

      {/* modal setting */}
      <Modal
        visible={isModalSetting}
        onCancel={() => {
          setIsModalSetting(false);
        }}
        footer={false}
      >
        <Row justify="center">
          <Card
            title="Setting Auto Result Imports Inf"
            style={{ width: 600, height: "100%" }}
          >
            <Form
              form={frmSetting_Inf}
              layout="horizontal"
              // onFinish={onSearch}
              // set เป็นวันปัจจุบัน
              //   //initialValues={{
              //     date_Search: [moment(), moment()],
              //   }}
            >
              <Row justify="center">
                <Col span={10} offset={1}>
                  <Form.Item
                    name="Saline"
                    label="Saline"
                    valuePropName="checked"
                    style={{ marginTop: "-20px", marginLeft: "12px" }}
                  >
                    <Switch
                      checkedChildren="Active"
                      unCheckedChildren="UnActive"
                    />
                  </Form.Item>
                  <Form.Item
                    name="Papian"
                    label="Papian"
                    valuePropName="checked"
                    style={{ marginTop: "-20px", marginLeft: "10px" }}
                  >
                    <Switch
                      checkedChildren="Active"
                      unCheckedChildren="UnActive"
                    />
                  </Form.Item>
                  <Form.Item
                    name="Coombs"
                    label="Coombs"
                    valuePropName="checked"
                    style={{ marginTop: "-20px" }}
                  >
                    <Switch
                      checkedChildren="Active"
                      unCheckedChildren="UnActive"
                    />
                  </Form.Item>
                  <Form.Item
                    name="AntiA"
                    label="AntiA"
                    valuePropName="checked"
                    style={{ marginTop: "-20px", marginLeft: "16px" }}
                  >
                    <Switch
                      checkedChildren="Active"
                      unCheckedChildren="UnActive"
                    />
                  </Form.Item>

                  <Form.Item
                    name="AntiB"
                    label="AntiB"
                    valuePropName="checked"
                    style={{ marginTop: "-20px", marginLeft: "16px" }}
                  >
                    <Switch
                      checkedChildren="Active"
                      unCheckedChildren="UnActive"
                    />
                  </Form.Item>
                  <Form.Item
                    name="TPHA"
                    label="TPHA"
                    valuePropName="checked"
                    style={{ marginTop: "-20px", marginLeft: "16px" }}
                  >
                    <Switch
                      checkedChildren="Active"
                      unCheckedChildren="UnActive"
                    />
                  </Form.Item>
                  <Form.Item
                    name="HBsAg"
                    label="HBsAg"
                    valuePropName="checked"
                    style={{ marginTop: "-20px", marginLeft: "12px" }}
                  >
                    <Switch
                      checkedChildren="Active"
                      unCheckedChildren="UnActive"
                    />
                  </Form.Item>
                </Col>
                <Col span={10} offset={1}>
                  <Form.Item
                    name="HIV"
                    label="HIV"
                    valuePropName="checked"
                    style={{ marginTop: "-20px", marginLeft: "32px" }}
                  >
                    <Switch
                      checkedChildren="Active"
                      unCheckedChildren="UnActive"
                    />
                  </Form.Item>
                  <Form.Item
                    name="HBV_NAT"
                    label="HBV NAT"
                    valuePropName="checked"
                    style={{ marginTop: "-20px" }}
                  >
                    <Switch
                      checkedChildren="Active"
                      unCheckedChildren="UnActive"
                    />
                  </Form.Item>
                  <Form.Item
                    name="HCV_NAT"
                    label="HCV NAT"
                    valuePropName="checked"
                    style={{ marginTop: "-20px" }}
                  >
                    <Switch
                      checkedChildren="Active"
                      unCheckedChildren="UnActive"
                    />
                  </Form.Item>
                  <Form.Item
                    name="HIV_NAT"
                    label="HIV NAT"
                    valuePropName="checked"
                    style={{ marginTop: "-20px", marginLeft: "5px" }}
                  >
                    <Switch
                      checkedChildren="Active"
                      unCheckedChildren="UnActive"
                    />
                  </Form.Item>
                  <Form.Item
                    name="ALT"
                    label="ALT"
                    valuePropName="checked"
                    style={{ marginTop: "-20px", marginLeft: "32px" }}
                  >
                    <Switch
                      checkedChildren="Active"
                      unCheckedChildren="UnActive"
                    />
                  </Form.Item>
                  <Form.Item
                    name="HCV"
                    label="HCV"
                    valuePropName="checked"
                    style={{ marginTop: "-20px", marginLeft: "32px" }}
                  >
                    <Switch
                      checkedChildren="Active"
                      unCheckedChildren="UnActive"
                    />
                  </Form.Item>
                  <Form.Item
                    name="HIVAg"
                    label="HIVAg"
                    valuePropName="checked"
                    style={{ marginTop: "-20px", marginLeft: "22px" }}
                  >
                    <Switch
                      checkedChildren="Active"
                      unCheckedChildren="UnActive"
                    />
                  </Form.Item>
                </Col>
                <br />
              </Row>
              <Row justify="center" style={{ marginTop: "-15px" }}>
                <Button
                  onClick={showModalPassSetting}
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
                    backgroundColor: "#3AB0FF",
                    color: "white",
                  }}
                >
                  บันทึกข้อมูล
                </Button>
              </Row>
            </Form>
          </Card>
        </Row>
      </Modal>

      <Modal
        visible={isModalPasswordSetting}
        onCancel={() => {
          setIsModalPasswordSetting(false), setPasswordSetting();
        }}
        width={250}
        footer={false}
      >
        <Row>
          <h style={{ fontSize: "14px" }}>ยืนยันรหัสผ่าน</h>
        </Row>

        <Input.Password
          id="passSetting"
          placeholder="กรุณากรอกรหัสผ่าน"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          style={{ width: "100%" }}
          value={passwordSetting}
          onChange={(e) => setPasswordSetting(e.target.value)}
          onKeyDown={({ target: { value }, keyCode }) => {
            if (keyCode === 13) {
              // 13 คือ enter
              Ok();
            }
          }}
        />

        <Row justify="end" style={{ marginTop: "10px" }}>
          <Button
            type="primary"
            danger
            onClick={() => {
              setIsModalPasswordSetting(false), setPasswordSetting();
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
            onClick={Ok}
            disabled={!passwordSetting}
          >
            ยืนยัน
          </Button>
        </Row>
        {/* <Input value={password} onChange={(e) => setPassword(e.target.value)} /> */}
      </Modal>
    </>
  );
};

export default Donor_result_import;
