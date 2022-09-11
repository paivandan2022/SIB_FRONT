import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import {
  Button,
  Card,
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
  TimePicker,
} from "antd";
import th_TH from "antd/lib/date-picker/locale/th_TH";
import moment from "moment";
import "moment/locale/th";
import Head from "next/head";
import { MdManageSearch, MdRefresh } from "react-icons/md";
import { VscSaveAs } from "react-icons/vsc";
import { Layout } from "../components";
import api from "../lib/api";

import { useEffect, useState } from "react";

const Patient_add_reaction = () => {
  const [frmReactBlood] = Form.useForm();
  const [frmSearch] = Form.useForm();

  const { Option } = Select;
  const { TabPane } = Tabs;
  const { Column, ColumnGroup } = Table;
  const [placement, SetPlacement] = useState("bottomLeft");

  const [dataReaction, setDataReaction] = useState([]);
  const [dataBlood, setDataBlood] = useState([]);
  const [reactionList, setreactionList] = useState();
  const [ChoiceAnti, setChoiceAnti] = useState();
  const [ChoiceResult, setChoiceResult] = useState();
  const [groupblood, setGroupblood] = useState();
  const [rhname, setRhname] = useState();
  const [disabledForm, setDisabledForm] = useState(true);
  const [dataBloodNo, setDataBloodNo] = useState();
  const [dataAcId, setDataAcId] = useState();

  const [disabledBtn, setDisabledBtn] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataSearch, setDataSearch] = useState();

  const showModal = (keyCode) => {
    const frm = frmReactBlood.getFieldValue();
    console.log(frm.order_number_search);

    if (keyCode === 32 && !frm.order_number_search) {
      setIsModalVisible(true);
      setTimeout(() => {
        document.getElementById("keyword").focus();
      }, 500);
    }
  };

  const handleCancel = () => {
    Clear();
    setIsModalVisible(false);
    setTimeout(() => {
      document.getElementById("search").focus();
    }, 500);
  };

  const SearchDetail = async () => {
    const frm = frmSearch.getFieldValue();
    try {
      const params = {
        keyword: frm.keyword,
      };
      const result = await api.get("/Search_detail", { params });
      console.log("SearchDetail", result.data);

      setDataSearch(result.data);
    } catch (error) {
      Modal.error({ title: "ไม่พบข้อมูล" });
    }
  };

  const setData_frm = (record) => {
    console.log("record", record.order_number);

    const frm = frmSearch.getFieldValue();
    frmReactBlood.setFieldsValue({
      order_number_search: record.order_number,
    });

    SearchDataBlood();
    setIsModalVisible(false);
    setDataSearch();
    frmSearch.resetFields();
  };

  const columnSearch = [
    {
      title: "#",
      dataIndex: "",
      key: "",
      align: "center",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Order_number",
      dataIndex: "order_number",
      key: "order_number",
      align: "center",
    },
    {
      title: "HN ",
      dataIndex: "hn",
      key: "hn",
      align: "center",
    },
    {
      title: "ชื่อ-นามสกุล",
      dataIndex: "fullname",
      key: "fullname",
      align: "center",
    },
    {
      title: "วันที่ขอ",
      dataIndex: "req_time",
      key: "req_time",
      align: "center",
    },
    {
      title: "Ward",
      dataIndex: "ward_name",
      key: "ward_name",
      align: "center",
    },
    {
      title: "แผนก",
      dataIndex: "department",
      key: "department",
      align: "center",
    },
  ];

  const SearchDataBlood = async () => {
    const frm = frmReactBlood.getFieldValue();
    if (!frm.order_number_search) {
      setIsModalVisible(true);
    } else {
      const result = await api.get("/CheckDataBlood", {
        params: {
          order_number: frm.order_number_search,
        },
      });
      setDataBlood(result.data);
      console.log("**", result.data);
      SearchDataReactionHis();
    }
  };

  const SearchDataReactionHis = async () => {
    const frm = frmReactBlood.getFieldValue();
    const result = await api.get("/DataReactionHis", {
      params: {
        order_number: frm.order_number_search,
      },
    });
    setDataReaction(result.data[0]);
    console.log("his", result.data[0]);
  };

  const FetchReactionList = async () => {
    const result = await api.get("/ReactionList");
    setreactionList(result.data[0]);
  };

  const FetchChoiceAnti = async () => {
    const result = await api.get("/Choiciall");
    setChoiceAnti(result.data[0]);
  };

  const FetchChoiceResult = async () => {
    const result = await api.get("/Antibody_Screening");
    setChoiceResult(result.data[0]);
  };

  const Fetch_bloodgroup = async () => {
    const result = await api.get("/Get_group");
    setGroupblood(result.data);
  };

  const Fetch_rh_name = async () => {
    const result = await api.get("/Get_Rh_Name");
    setRhname(result.data[0]);
  };

  const columnDataReaction = [
    {
      title: "ลำดับ",
      dataIndex: "No",
      key: "no",
      align: "center",
      width: "7%",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "วันที่",
      dataIndex: "date_save",
      key: "date_save",
      align: "center",
      width: "15%",
    },
    {
      title: "วันที่มีอาการ",
      dataIndex: "date_ac",
      key: "date_ac",
      align: "center",
      width: "15%",
    },
    {
      title: "ชนิดที่เเพ้",
      dataIndex: "s_name",
      key: "s_name",
      align: "center",
      width: "10%",
    },
    {
      title: "อาการ",
      dataIndex: "ac_action_detail",
      key: "ac_action_detail",
      align: "center",
      width: "40%",
    },
    {
      title: "ผู้บันทึก",
      dataIndex: "ac_save_staff",
      key: "ac_save_staff",
      align: "center",
      width: "20%",
    },
  ];

  const columnDataBlood = [
    {
      title: "Unit No.",
      dataIndex: "blood_no",
      key: "blood_no",
      align: "center",
      width: "30%",
    },
    {
      title: "ชนิดเลือด",
      dataIndex: "s_name",
      key: "s_name",
      align: "center",
      width: "30%",
    },
    {
      title: "Gr",
      dataIndex: "Gr",
      key: "Gr",
      align: "center",
      width: "15%",
    },
  ];

  const Patient_Grouping = [
    {
      // Cell Grouping
      key: "1",
      name1: "หมู่เลือดก่อนรับ",
      abo: (
        <Form.Item
          label=""
          name="abo_af"
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "11px" }}
            placeholder="group"
            // style={{ width: 120 }}
          >
            {groupblood?.map((item) => (
              <Option key={item.blood_id} value={item.blood_name}>
                <b style={{ fontSize: "12px" }}>{item.blood_name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      rh: (
        <Form.Item
          label=""
          name="rh_af"
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "11px" }}
            placeholder="rh"
            // style={{ width: 120 }}
          >
            {rhname?.map((item) => (
              <Option key={item.rh_id} value={item.rh_shot_name}>
                <b style={{ fontSize: "12px" }}>{item.rh_shot_name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      anti_a: (
        <Form.Item
          label=""
          name="anti_a_af"
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "11px" }}
            placeholder="Anti_A"
            // style={{ width: 120 }}
          >
            {ChoiceAnti?.map((item) => (
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
          name="anti_b_af"
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "11px" }}
            placeholder="Anti_B"
          >
            {ChoiceAnti?.map((item) => (
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
          name="anti_d_af"
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "11px" }}
            placeholder="Anti_D"
          >
            {ChoiceAnti?.map((item) => (
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
          name="cell_a_af"
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "11px" }}
            placeholder="A_Cell"
          >
            {ChoiceAnti?.map((item) => (
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
          name="cell_b_af"
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "11px" }}
            placeholder="B_Cell"
          >
            {ChoiceAnti?.map((item) => (
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
          name="cell_o_af"
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "11px" }}
            placeholder="O_Cell"
          >
            {ChoiceAnti?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
    },
    {
      // Cell Grouping
      key: "2",
      name1: "หมู่เลือดหลังรับ",
      abo: (
        <Form.Item
          label=""
          name="abo_lt"
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "11px" }}
            placeholder="group"
            // style={{ width: 120 }}
          >
            {groupblood?.map((item) => (
              <Option key={item.blood_id} value={item.blood_name}>
                <b style={{ fontSize: "12px" }}>{item.blood_name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      rh: (
        <Form.Item
          label=""
          name="rh_lt"
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "11px" }}
            placeholder="rh"
            // style={{ width: 120 }}
          >
            {rhname?.map((item) => (
              <Option key={item.rh_id} value={item.rh_shot_name}>
                <b style={{ fontSize: "12px" }}>{item.rh_shot_name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      anti_a: (
        <Form.Item
          label=""
          name="anti_a_lt"
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "11px" }}
            placeholder="Anti_A"
            // style={{ width: 120 }}
          >
            {ChoiceAnti?.map((item) => (
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
          name="anti_b_lt"
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "11px" }}
            placeholder="Anti_B"
          >
            {ChoiceAnti?.map((item) => (
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
          name="anti_d_lt"
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "11px" }}
            placeholder="Anti_D"
          >
            {ChoiceAnti?.map((item) => (
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
          name="cell_a_lt"
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "11px" }}
            placeholder="A_Cell"
          >
            {ChoiceAnti?.map((item) => (
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
          name="cell_b_lt"
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "11px" }}
            placeholder="B_Cell"
          >
            {ChoiceAnti?.map((item) => (
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
          name="cell_o_lt"
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "11px" }}
            placeholder="O_Cell"
          >
            {ChoiceAnti?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
    },
    {
      // Cell Grouping
      key: "3",
      name1: "Segment Group",
      abo: (
        <Form.Item
          label=""
          name="abo_sg"
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "11px" }}
            placeholder="group"
            // style={{ width: 120 }}
          >
            {groupblood?.map((item) => (
              <Option key={item.blood_id} value={item.blood_name}>
                <b style={{ fontSize: "12px" }}>{item.blood_name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      rh: (
        <Form.Item
          label=""
          name="rh_sg"
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "11px" }}
            placeholder="rh"
            // style={{ width: 120 }}
          >
            {rhname?.map((item) => (
              <Option key={item.rh_id} value={item.rh_shot_name}>
                <b style={{ fontSize: "12px" }}>{item.rh_shot_name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      anti_a: (
        <Form.Item
          label=""
          name="anti_a_sg"
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "11px" }}
            placeholder="Anti_A"
            // style={{ width: 120 }}
          >
            {ChoiceAnti?.map((item) => (
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
          name="anti_b_sg"
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "11px" }}
            placeholder="Anti_B"
          >
            {ChoiceAnti?.map((item) => (
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
          name="anti_d_sg"
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "11px" }}
            placeholder="Anti_D"
          >
            {ChoiceAnti?.map((item) => (
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
          name="cell_a_sg"
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "11px" }}
            placeholder="A_Cell"
          >
            {ChoiceAnti?.map((item) => (
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
          name="cell_b_sg"
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "11px" }}
            placeholder="B_Cell"
          >
            {ChoiceAnti?.map((item) => (
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
          name="cell_o_sg"
          style={{ width: "65px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "65px", fontSize: "11px" }}
            placeholder="O_Cell"
          >
            {ChoiceAnti?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
    },
  ];

  const Serum_Grouping = [
    {
      // Cell Grouping
      key: "1",
      nameAnti: "Antibody Screening ก่อนรับ",
      screening: "O1",
      anti_rt: (
        <Form.Item
          name=" anti_rt_o1af"
          style={{
            width: "85px",
            margin: "-8px",
            marginLeft: "-2px",
          }}
          textAlign="center"
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "85px", fontSize: "11px", textAlign: "center" }}
            placeholder="RT"
          >
            {ChoiceAnti?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      anti_37c: (
        <Form.Item
          label=""
          name=" anti_37c_o1af"
          style={{ width: "85px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "85px", fontSize: "11px" }}
            placeholder=" ํC"
          >
            {ChoiceAnti?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      anti_iat: (
        <Form.Item
          label=""
          name=" anti_iat_o1af"
          style={{ width: "85px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "85px", fontSize: "11px" }}
            placeholder="IAT"
          >
            {ChoiceAnti?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      anti_result: (
        <Form.Item
          label=""
          name=" anti_result_o1af"
          style={{ width: "85px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "85px", fontSize: "11px" }}
            placeholder="Result"
          >
            {ChoiceResult?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
    },
    {
      // Cell Grouping
      key: "2",
      screening: "O2",
      anti_rt: (
        <Form.Item
          name=" anti_rt_o2af"
          style={{
            width: "85px",
            margin: "-8px",
            marginLeft: "-2px",
          }}
          textAlign="center"
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "85px", fontSize: "11px", textAlign: "center" }}
            placeholder="RT"
          >
            {ChoiceAnti?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      anti_37c: (
        <Form.Item
          label=""
          name=" anti_37c_o2af"
          style={{ width: "85px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "85px", fontSize: "11px" }}
            placeholder=" ํC"
          >
            {ChoiceAnti?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      anti_iat: (
        <Form.Item
          label=""
          name=" anti_iat_o2af"
          style={{ width: "85px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "85px", fontSize: "11px" }}
            placeholder="IAT"
          >
            {ChoiceAnti?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      anti_result: (
        <Form.Item
          label=""
          name=" anti_result_o2af"
          style={{ width: "85px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "85px", fontSize: "11px" }}
            placeholder="Result"
          >
            {ChoiceResult?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
    },
    {
      // Cell Grouping
      key: "3",
      nameAnti: "Antibody Screening หลังรับ",
      screening: "O1",
      anti_rt: (
        <Form.Item
          name=" anti_rt_o1lt"
          style={{
            width: "85px",
            margin: "-8px",
            marginLeft: "-2px",
          }}
          textAlign="center"
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "85px", fontSize: "11px", textAlign: "center" }}
            placeholder="RT"
          >
            {ChoiceAnti?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      anti_37c: (
        <Form.Item
          label=""
          name=" anti_37c_o1lt"
          style={{ width: "85px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "85px", fontSize: "11px" }}
            placeholder=" ํC"
          >
            {ChoiceAnti?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      anti_iat: (
        <Form.Item
          label=""
          name=" anti_iat_o1lt"
          style={{ width: "85px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "85px", fontSize: "11px" }}
            placeholder="IAT"
          >
            {ChoiceAnti?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      anti_result: (
        <Form.Item
          label=""
          name=" anti_result_o1lt"
          style={{ width: "85px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "85px", fontSize: "11px" }}
            placeholder="Result"
          >
            {ChoiceResult?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
    },
    {
      // Cell Grouping
      key: "4",
      screening: "O2",
      anti_rt: (
        <Form.Item
          name=" anti_rt_o2lt"
          style={{
            width: "85px",
            margin: "-8px",
            marginLeft: "-2px",
          }}
          textAlign="center"
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "85px", fontSize: "11px", textAlign: "center" }}
            placeholder="RT"
          >
            {ChoiceAnti?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      anti_37c: (
        <Form.Item
          label=""
          name=" anti_37c_o2lt"
          style={{ width: "85px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "85px", fontSize: "11px" }}
            placeholder=" ํC"
          >
            {ChoiceAnti?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      anti_iat: (
        <Form.Item
          label=""
          name=" anti_iat_o2lt"
          style={{ width: "85px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "85px", fontSize: "11px" }}
            placeholder="IAT"
          >
            {ChoiceAnti?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      anti_result: (
        <Form.Item
          label=""
          name=" anti_result_o2lt"
          style={{ width: "85px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "85px", fontSize: "11px" }}
            placeholder="Result"
          >
            {ChoiceResult?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
    },
  ];

  const Crossmatching = [
    {
      // Cell Grouping
      key: "1",
      nameXM: "Crossmatching ก่อนรับ",
      unitNo: (
        <Form.Item
          label=""
          name="xm_unitno_af"
          style={{ width: "130px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Input
            disabled={disabledForm}
            placeholder="Unit No"
            style={{
              height: "25px",
              fontSize: "12px",
              textAlign: "center",
            }}
          ></Input>
        </Form.Item>
      ),
      xm_rt: (
        <Form.Item
          name="xm_rt_af"
          style={{
            width: "50px",
            margin: "-8px",
            marginLeft: "-2px",
          }}
          textAlign="center"
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "85px", fontSize: "11px", textAlign: "center" }}
            placeholder="RT"
          >
            {ChoiceAnti?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      xm_37c: (
        <Form.Item
          label=""
          name="xm_37c_af"
          style={{ width: "85px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "85px", fontSize: "11px" }}
            placeholder=" ํC"
          >
            {ChoiceAnti?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      xm_iat: (
        <Form.Item
          label=""
          name="xm_iat_af"
          style={{ width: "85px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "85px", fontSize: "11px" }}
            placeholder="IAT"
          >
            {ChoiceAnti?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      xm_result: (
        <Form.Item
          label=""
          name="xm_result_af"
          style={{ width: "85px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "85px", fontSize: "11px" }}
            placeholder="Result"
          >
            {ChoiceResult?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
    },
    {
      // Cell Grouping
      key: "2",
      nameXM: "Crossmatching หลังรับ",
      unitNo: (
        <Form.Item
          label=""
          name="xm_unitno_lt"
          style={{ width: "130px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Input
            disabled={disabledForm}
            placeholder="Unit No"
            style={{
              height: "25px",
              fontSize: "12px",
              textAlign: "center",
            }}
          ></Input>
        </Form.Item>
      ),
      xm_rt: (
        <Form.Item
          name="xm_rt_lt"
          style={{
            width: "50px",
            margin: "-8px",
            marginLeft: "-2px",
          }}
          textAlign="center"
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "85px", fontSize: "11px", textAlign: "center" }}
            placeholder="RT"
          >
            {ChoiceAnti?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      xm_37c: (
        <Form.Item
          label=""
          name="xm_37c_lt"
          style={{ width: "85px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "85px", fontSize: "11px" }}
            placeholder=" ํC"
          >
            {ChoiceAnti?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      xm_iat: (
        <Form.Item
          label=""
          name="xm_iat_lt"
          style={{ width: "85px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "85px", fontSize: "11px" }}
            placeholder="IAT"
          >
            {ChoiceAnti?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
      xm_result: (
        <Form.Item
          label=""
          name="xm_result_lt"
          style={{ width: "85px", margin: "-8px", marginLeft: "-1px" }}
        >
          <Select
            disabled={disabledForm}
            showArrow={false}
            dropdownMatchSelectWidth={false}
            placement={placement}
            size="small"
            style={{ width: "85px", fontSize: "11px" }}
            placeholder="Result"
          >
            {ChoiceResult?.map((item) => (
              <Option key={item.name} value={item.name}>
                <b style={{ fontSize: "12px" }}>{item.name}</b>
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
    },
  ];

  const Clear = () => {
    frmReactBlood.resetFields();
    frmSearch.resetFields();
    setDisabledForm(true);
    setDisabledBtn(true);
    setDataBloodNo();
    setDataAcId();
    setDataBlood();
    setDataReaction();
    setDataSearch();
    setTimeout(() => {
      document.getElementById("search").focus();
    }, 500);
  };

  const ClickRow = (record) => {
    setDataBloodNo(record.blood_no);
    setDataAcId();
    const checkData = dataReaction.some(
      (item) => item.blood_no == record.blood_no
    );
    console.log("checkData", checkData);

    if (checkData == true) {
      Modal.error({
        title: "แจ้งเตือน !!",
        content: "ถุงเลือดนี้บันทึกแพ้เลือดเเล้ว กรุณาตรวจสอบอีกครั้ง",
      });
      frmReactBlood.setFieldsValue({
        staff_save: null,
        bloodno_use: "",
        exp_date: "",
        unit_group: "",
        reacttion_detail: undefined,
        date_trans: moment(),
        time_trans: moment(),
        date_react: moment(),
        time_react: moment(),
      });
      setDisabledForm(true);
      setDisabledBtn(true);
    } else {
      console.log("else", record.blood_no);

      const setData = dataBlood.filter(
        (item) => item.blood_no == record.blood_no
      );
      frmReactBlood.setFieldsValue({
        staff_save: null,
        bloodno_use: setData[0].blood_no,
        exp_date: moment(setData[0].expiry_date),
        unit_group: setData[0].Gr,
        reacttion_detail: undefined,
        date_trans: moment(),
        time_trans: moment(),
        date_react: moment(),
        time_react: moment(),
      });
      setDisabledForm(false);
      setDisabledBtn(true);
    }
  };

  const changePassword = () => {
    const frm = frmReactBlood.getFieldValue();

    console.log("pass", frm.staff_save);
    if (frm.staff_save != undefined && frm.staff_save != "") {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  };

  const UpReactionList = async (value) => {
    console.log("UpDeletedetail", value);

    frmReactBlood.setFieldsValue({
      reacttion_detail: value
    })
  }

  const addReactBlood = async () => {
    const frm = frmReactBlood.getFieldValue();
    console.log("frmdetail =>>>", frm);
    const resultLogin = await api.post(`/Confirm_password`, {
      password: frm.staff_save,
    });

    const staff = resultLogin.data.user_name;
    const hn_user = dataBlood[0].hn;
    const order_number = frm.order_number_search;
    const bloodNo = dataBloodNo;

    if (frm.reacttion_detail === undefined) {
      Modal.warning({
        content: <div>กรุณาเลือกอาการเเพ้เลือด</div>,
      });

      frmReactBlood.setFieldsValue({
        staff_save: null,
      });
      setDisabledBtn(true);
    } else {
      console.log("frm.reacttion_detail =>>>", frm.reacttion_detail);

      try {
        const resultAddReact = await api.post(`/addReactionBlood`, {
          // ...frm,
          ac_hn: hn_user,
          ac_order_number: order_number,
          ac_save_staff: staff,
          date_react: moment(frm.date_react).format("YYYY-MM-DD"),
          time_react: moment(frm.time_react).format("HH:mm:ss"),
          ac_action_detail: frm.reacttion_detail,
          blood_no: bloodNo,
          ac_id: dataAcId,
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
            content: <div>บันทึกข้อมูลแพ้เลือดเรียบร้อยเเล้ว</div>,
            onCancel: (close) => {
              close();
            },
            onOk: (close) => {
              close();
              // Clear();
            },
            okButtonProps: { id: "ok" },
          });
        };

        if (resultAddReact.data.message === "success") {
          closeModal();
          window.addEventListener("keydown", handleKeyDown);
          SearchDataReactionHis();
          frmReactBlood.setFieldsValue({
            staff_save: null,
            bloodno_use: "",
            exp_date: "",
            unit_group: "",
            reacttion_detail: undefined,
            date_trans: moment(),
            time_trans: moment(),
            date_react: moment(),
            time_react: moment(),
          });
          setDisabledForm(true);
          setDisabledBtn(true);
        }
      } catch (error) {
        Modal.warning({
          content: <div>ไม่สามารถเพิ่มข้อมูลลสำเร็จ กรุณาตรวจสอบอีกครั้ง</div>,
        });
      }
    }
  };

  const updateHis = async (record) => {
    console.log("up", record.ac_id);
    setDataAcId(record.ac_id);
    frmReactBlood.setFieldsValue({
      staff_save: null,
      reacttion_detail: record.ac_action_detail,
      date_react: moment(record.ac_action_datetime),
      time_react: moment(record.ac_action_datetime),
    });
    setDisabledForm(false);
    setDataBloodNo();
    setDisabledBtn(true);
  };

  useEffect(async () => {
    await FetchReactionList();
    await FetchChoiceAnti();
    await Fetch_bloodgroup();
    await Fetch_rh_name();
    await FetchChoiceResult();

    document.getElementById("search").focus();
  }, []);

  return (
    <>
      <Layout keyTab="Patient_add_reaction">
        <div>
          <Head>
            <title>SIBSOFT : บันทึกปฏิกิริยา</title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
        </div>
        <Form form={frmReactBlood}>
          <Row style={{ padding: "10px" }}>
            <Col span={24}>
              <Card>
                <Row style={{ marginTop: "-20px" }}>
                  <Col span={5}>
                    <Form.Item
                      label="เลขที่ใบขอเลือด"
                      name="order_number_search"
                      style={{ fontSize: "14px", paddingRight: "12px" }}
                    >
                      <Input
                        id="search"
                        onChange={(e) => {
                          if (!e.target.value) {
                            Clear();
                          }
                        }}
                        onPressEnter={SearchDataBlood}
                        onKeyDown={({ target: { value }, keyCode }) => {
                          showModal(keyCode);
                        }}
                        size="small"
                        placeholder="เลขที่ใบขอเลือด"
                        style={{
                          width: "100%",

                          fontSize: "14px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    <Button
                      style={{
                        fontSize: "12px",
                        height: "28px",
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
                      onClick={SearchDataBlood}
                    >
                      ค้นหา
                    </Button>
                  </Col>
                  {dataBlood?.[0] && (
                    <Col offset={3}>
                      <h style={{ fontSize: "16px" }}>
                        HN: {dataBlood[0]?.hn} &nbsp; ชื่อ-นามสกุล:{" "}
                        {dataBlood[0]?.fullname} &nbsp; Ward:{" "}
                        {dataBlood[0]?.name_ward}
                      </h>
                    </Col>
                  )}
                </Row>

                <Row style={{ marginTop: "-20px" }}>
                  <Col span={7} style={{ paddingRight: "5px" }}>
                    <Card title="รายการถุงเลือดที่ได้รับ" className="Addreact">

                      <Row style={{ marginTop: "-10px" }}>
                        <Col span={24}>
                          <Table
                            className="dataBlood"
                            columns={columnDataBlood}
                            dataSource={dataBlood}
                            scroll={{ y: 100 }}
                            size="small"
                            pagination={false}
                            rowClassName={(record, index) => {
                              return record.blood_no === dataBloodNo
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
                          />
                        </Col>
                      </Row>
                    </Card>

                    <Card
                      title="อาการแพ้เลือด"
                      className="Addreact"
                      style={{ marginTop: "-15px", height: "200px" }}
                    >

                      <Row justify="center" style={{ marginTop: "-22px" }}>
                        <Col>
                          <Form.Item
                            name="reaction"
                            style={{
                              display: "inline-block",
                              fontSize: "12px",
                            }}
                          >
                            <Radio.Group disabled={disabledForm}>
                              <Radio value="0" style={{ fontSize: "12px" }}>
                                แพ้ทันทีหลังรับเลือด
                              </Radio>
                              <Radio value="1" style={{ fontSize: "12px" }}>
                                แพ้ภายหลัง
                              </Radio>
                            </Radio.Group>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row style={{ marginTop: "-28px" }}>
                        <Col span={24} style={{ paddingLeft: "58px" }}>
                          <Form.Item
                            label="อาการ"
                            name="reacttion_detail"
                            style={{ paddingRight: "12px", fontSize: "12px" }}
                          >
                            <Select
                              disabled={disabledForm}
                              size="small"
                              showArrow={false}
                              dropdownMatchSelectWidth={false}
                              placement={placement}
                              showSearch
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                              placeholder="กรุณาเลือกอาการ"
                              style={{
                                fontSize: "12px",
                              }}
                              onKeyDown={(e) => {
                                const value = e.target.value;
                                if (e.keyCode === 13) {
                                  // 13 คือ enter
                                  console.log("---", value);
                                  UpReactionList(value);
                                }
                              }}
                            >
                              {reactionList?.map((item) => (
                                <Option
                                  key={item.reac_lt_id}
                                  value={item.reac_lt_Reaction}
                                >
                                  {item.reac_lt_Reaction}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row style={{ marginTop: "-28px" }}>
                        <Col span={24}>
                          <Form.Item
                            label="ผลการตรวจสอบ"
                            name="result_detail"
                            style={{ paddingRight: "12px", fontSize: "12px" }}
                          >
                            <Input
                              disabled={disabledForm}
                              placeholder="ผลการตรวจสอบ"
                              style={{
                                height: "25px",
                                fontSize: "12px",
                              }}
                            ></Input>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row
                        style={{
                          paddingLeft: "18px",
                          marginTop: "-28px",
                        }}
                      >
                        <Col span={15}>
                          <Form.Item
                            name="date_trans"
                            label="วันที่ให้เลือด"
                            style={{
                              paddingLeft: "8px",
                              fontSize: "12px",
                            }}
                          >
                            <DatePicker
                              disabled={disabledForm}
                              defaultValue={moment()}
                              style={{
                                width: "110%",
                                height: "24px",
                                fontSize: "12px",
                              }}
                              format="DD-MM-YYYY"
                              locale={th_TH}
                              // onChange={onChangeDateTrans}
                            />
                          </Form.Item>
                        </Col>

                        <Col span={8}>
                          <Form.Item
                            name="time_trans"
                            style={{
                              paddingLeft: "12px",
                              fontSize: "12px",
                            }}
                          >
                            <TimePicker
                              disabled={disabledForm}
                              defaultValue={moment()}
                              format="HH:mm:ss"
                              locale={th_TH}
                              style={{
                                width: "101%",
                                height: "24px",
                                fontSize: "12px",
                              }}
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row
                        style={{
                          paddingLeft: "18px",
                          marginTop: "-28px",
                          fontSize: "12px",
                        }}
                      >
                        <Col span={15}>
                          <Form.Item
                            name="date_react"
                            label="วันที่เกิดปฏิกิริยา"
                            style={{
                              marginLeft: "-17px",
                            }}
                          >
                            <DatePicker
                              disabled={disabledForm}
                              defaultValue={moment()}
                              style={{
                                width: "110%",
                                height: "24px",
                                fontSize: "12px",
                              }}
                              format="DD-MM-YYYY"
                              locale={th_TH}
                              // onChange={onChangeDateTrans}
                            />
                          </Form.Item>
                        </Col>

                        <Col span={8}>
                          <Form.Item
                            name="time_react"
                            style={{
                              paddingLeft: "12px",
                            }}
                          >
                            <TimePicker
                              disabled={disabledForm}
                              style={{
                                width: "101%",
                                height: "24px",
                                fontSize: "12px",
                              }}
                              defaultValue={moment()}
                              format="HH:mm:ss"
                              locale={th_TH}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  </Col>

                  <Col span={17} style={{ paddingLeft: "5px" }}>
                    <Card title="ทดสอบปฏิกิริยาซ้ำ" className="Addreact">
                      <Row
                      // style={{
                      //   marginTop: "10px",
                      //   border: "1px solid",
                      //   padding: "5px",
                      //   borderRadius: "5px",
                      //   height: "335px",
                      // }}
                      >
                        {/* <Row justify="start" style={{ marginTop: -22 }}>
                        <p
                          style={{
                            fontSize: "14px",
                            backgroundColor: "white",
                            paddingLeft: "8px",
                            paddingRight: "8px",
                            border: "1px solid",
                            borderRadius: "5px",
                            height:"30px"
                          }}
                        >
                          ทดสอบปฏิกิริยาซ้ำ
                        </p>
                      </Row> */}

                        <Row>
                          <Tabs
                            tabPosition="left"
                            style={{ marginTop: "-10px" }}
                          >
                            <TabPane tab="ข้อมูลปฏิกิริยา 1" key="1">
                              <Row>
                                <Col span={8}>
                                  <Form.Item
                                    name="date_after"
                                    label="วันที่ก่อนรับ"
                                    style={{
                                      paddingLeft: "8px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    <DatePicker
                                      disabled={disabledForm}
                                      defaultValue={moment()}
                                      style={{
                                        width: "100%",
                                        height: "24px",
                                        fontSize: "12px",
                                      }}
                                      format="DD-MM-YYYY"
                                      locale={th_TH}
                                      // onChange={onChangeDateTrans}
                                    />
                                  </Form.Item>
                                </Col>

                                <Col span={8}>
                                  <Form.Item
                                    name="color_after"
                                    label="สีของ Serum"
                                    style={{
                                      paddingLeft: "8px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    <Select
                                      disabled={disabledForm}
                                      size="small"
                                      style={{
                                        width: 120,
                                      }}
                                    >
                                      <Option value=""></Option>
                                      <Option value="jack">Jack</Option>
                                      <Option value="lucy">Lucy</Option>
                                    </Select>
                                  </Form.Item>
                                </Col>

                                <Col span={8}>
                                  <Form.Item
                                    name="tube_group"
                                    label="Tube Group"
                                    style={{
                                      paddingLeft: "8px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    <Select
                                      size="small"
                                      disabled={disabledForm}
                                      style={{
                                        width: 120,
                                      }}
                                    >
                                      {groupblood?.map((item) => (
                                        <Option
                                          key={item.blood_id}
                                          value={item.blood_name}
                                        >
                                          <b style={{ fontSize: "12px" }}>
                                            {item.blood_name}
                                          </b>
                                        </Option>
                                      ))}
                                    </Select>
                                  </Form.Item>
                                </Col>
                              </Row>

                              <Row style={{ marginTop: "-28px" }}>
                                <Col span={8}>
                                  <Form.Item
                                    name="date_last"
                                    label="วันที่หลังรับ"
                                    style={{
                                      paddingLeft: "8px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    <DatePicker
                                      disabled={disabledForm}
                                      defaultValue={moment()}
                                      style={{
                                        width: "100%",
                                        height: "24px",
                                        fontSize: "12px",
                                      }}
                                      format="DD-MM-YYYY"
                                      locale={th_TH}
                                      // onChange={onChangeDateTrans}
                                    />
                                  </Form.Item>
                                </Col>

                                <Col span={8}>
                                  <Form.Item
                                    name="color_last"
                                    label="สีของ Serum"
                                    style={{
                                      paddingLeft: "8px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    <Select
                                      size="small"
                                      disabled={disabledForm}
                                      style={{
                                        width: 120,
                                      }}
                                    >
                                      <Option value=""></Option>
                                      <Option value="jack">Jack</Option>
                                      <Option value="lucy">Lucy</Option>
                                    </Select>
                                  </Form.Item>
                                </Col>
                              </Row>

                              <Row style={{ marginTop: "-28px" }}>
                                <Col span={8}>
                                  <Form.Item
                                    name="bloodno_use"
                                    label="ถุงเลือดที่ใช้"
                                    style={{
                                      paddingLeft: "8px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    <Input
                                      disabled={true}
                                      placeholder=""
                                      style={{
                                        width: "100%",
                                        height: "24px",
                                      }}
                                    ></Input>
                                  </Form.Item>
                                </Col>

                                <Col span={8}>
                                  <Form.Item
                                    name="exp_date"
                                    label="วันหมดอายุ"
                                    style={{
                                      paddingLeft: "23px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    <DatePicker
                                      disabled={true}
                                      style={{
                                        width: "100%",
                                        height: "24px",
                                        fontSize: "12px",
                                      }}
                                      format="DD-MM-YYYY"
                                      locale={th_TH}
                                      // onChange={onChangeDateTrans}
                                    />
                                  </Form.Item>
                                </Col>

                                <Col span={8}>
                                  <Form.Item
                                    name="unit_group"
                                    label="Unit Group"
                                    style={{
                                      paddingLeft: "8px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    <Input
                                      disabled={true}
                                      placeholder=""
                                      style={{
                                        width: "30%",
                                        height: "24px",
                                      }}
                                    ></Input>
                                  </Form.Item>
                                </Col>
                              </Row>

                              <Row style={{ marginTop: "-22px" }}>
                                <Col span={24}>
                                  <Table
                                    className="PGr"
                                    dataSource={Patient_Grouping}
                                    pagination={false}
                                    size="small"
                                  >
                                    <Column
                                      title=""
                                      dataIndex="name1"
                                      key="name1"
                                      align="center"
                                      width="120px"
                                    />
                                    <Column
                                      title="ABO"
                                      dataIndex="abo"
                                      key="abo"
                                      align="center"
                                      width="70px"
                                    />
                                    <Column
                                      title="Rh"
                                      dataIndex="rh"
                                      key="rh"
                                      align="center"
                                      width="70px"
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
                                        title="Anti-D"
                                        dataIndex="anti_d"
                                        key="anti_d"
                                        align="center"
                                        width="70px"
                                      />
                                    </ColumnGroup>

                                    <ColumnGroup title="Serum Grouping">
                                      <Column
                                        title="A-Cell"
                                        align="center"
                                        width="70px"
                                        dataIndex="cell_a"
                                        key="cell_a"
                                      />
                                      <Column
                                        title="B-Cell"
                                        align="center"
                                        width="70px"
                                        dataIndex="cell_b"
                                        key="cell_b"
                                      />
                                      <Column
                                        title="O-Cell"
                                        align="center"
                                        width="70px"
                                        dataIndex="cell_o"
                                        key="cell_o"
                                      />
                                    </ColumnGroup>
                                  </Table>
                                </Col>
                              </Row>

                              <Row
                                justify="center"
                                style={{ marginTop: "6px" }}
                              >
                                <Col span={8}>
                                  <Form.Item
                                    name="segment_no"
                                    label="Segment no"
                                    style={{
                                      fontSize: "12px",
                                    }}
                                  >
                                    <Input
                                      disabled={disabledForm}
                                      placeholder=""
                                      style={{
                                        height: "24px",
                                      }}
                                    ></Input>
                                  </Form.Item>
                                </Col>

                                <Col span={8}>
                                  <Form.Item
                                    name="dat_after"
                                    label="DAT ก่อนรับเลือด"
                                    style={{
                                      fontSize: "12px",
                                    }}
                                  >
                                    <Select
                                      size="small"
                                      disabled={disabledForm}
                                    >
                                      <Option value=""></Option>
                                      <Option value="jack">Jack</Option>
                                      <Option value="lucy">Lucy</Option>
                                    </Select>
                                  </Form.Item>
                                </Col>

                                <Col span={8}>
                                  <Form.Item
                                    name="dat_last"
                                    label="DAT หลังรับเลือด"
                                    style={{
                                      fontSize: "12px",
                                    }}
                                  >
                                    <Select
                                      size="small"
                                      disabled={disabledForm}
                                    >
                                      <Option value=""></Option>
                                      <Option value="jack">Jack</Option>
                                      <Option value="lucy">Lucy</Option>
                                    </Select>
                                  </Form.Item>
                                </Col>
                              </Row>
                            </TabPane>

                            <TabPane tab="ข้อมูลปฏิกิริยา 2" key="2">
                              <Row>
                                <Col span={24}>
                                  <Table
                                    className="SGr"
                                    dataSource={Serum_Grouping}
                                    pagination={false}
                                    size="small"
                                  >
                                    <Column
                                      title=""
                                      dataIndex="nameAnti"
                                      key="nameAnti"
                                      align="center"
                                      width="180px"
                                      // rowSpan= "2"
                                    />
                                    <ColumnGroup title="Serum Grouping">
                                      <Column
                                        title="Screening Cell"
                                        dataIndex="screening"
                                        key="screening"
                                        align="center"
                                        width="120px"
                                      />
                                      <Column
                                        title="RT"
                                        dataIndex="anti_rt"
                                        key="anti_rt"
                                        align="center"
                                        width="70px"
                                      />
                                      <Column
                                        title="37 ํC"
                                        dataIndex="anti_37c"
                                        key="anti_37c"
                                        align="center"
                                        width="70px"
                                      />
                                      <Column
                                        title="IAT"
                                        dataIndex="anti_iat"
                                        key="anti_iat"
                                        align="center"
                                        width="70px"
                                      />
                                      <Column
                                        title="Result"
                                        dataIndex="anti_result"
                                        key="anti_result"
                                        align="center"
                                        width="70px"
                                      />
                                    </ColumnGroup>
                                  </Table>
                                </Col>
                              </Row>

                              <Row style={{ marginTop: "12px" }}>
                                <Col span={24}>
                                  <Table
                                    className="xm"
                                    dataSource={Crossmatching}
                                    pagination={false}
                                    size="small"
                                  >
                                    <Column
                                      title=""
                                      dataIndex="nameXM"
                                      key="nameXM"
                                      align="center"
                                      width="180px"
                                    />
                                    <Column
                                      title="Unit"
                                      dataIndex="unitNo"
                                      key="unitNo"
                                      align="center"
                                      width="140px"
                                    />
                                    <Column
                                      title="RT"
                                      dataIndex="xm_rt"
                                      key="xm_rt"
                                      align="center"
                                      width="100px"
                                    />
                                    <Column
                                      title="37 ํC"
                                      dataIndex="xm_37c"
                                      key="xm_37c"
                                      align="center"
                                      width="100px"
                                    />
                                    <Column
                                      title="IAT"
                                      dataIndex="xm_iat"
                                      key="xm_iat"
                                      align="center"
                                      width="100px"
                                    />
                                    <Column
                                      title="Result"
                                      dataIndex="xm_result"
                                      key="xm_result"
                                      align="center"
                                      width="100px"
                                    />
                                  </Table>
                                </Col>
                              </Row>

                              <Row
                                justify="start"
                                style={{ marginTop: "12px" }}
                              >
                                <Col span={24}>
                                  <Form.Item
                                    label="การทดสอบอื่นๆ"
                                    name="test_detail"
                                    style={{
                                      paddingRight: "12px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    <Input
                                      disabled={disabledForm}
                                      placeholder="การทดสอบอื่นๆ"
                                      style={{
                                        width: "100%",
                                        height: "24px",
                                      }}
                                    ></Input>
                                  </Form.Item>
                                </Col>
                              </Row>
                            </TabPane>
                          </Tabs>
                        </Row>
                      </Row>

                      <Row
                        style={{ marginTop: "-14px", paddingRight: "12px" }}
                        justify="end"
                      >
                        <Col span={6}>
                          <Form.Item
                            name="staff_save"
                            label="Password"
                            style={{ fontSize: "12px" }}
                          >
                            <Input.Password
                              disabled={disabledForm}
                              placeholder="กรุณากรอกรหัสผ่าน"
                              iconRender={(visible) =>
                                visible ? (
                                  <EyeTwoTone />
                                ) : (
                                  <EyeInvisibleOutlined />
                                )
                              }
                              style={{
                                width: "100%",
                                fontSize: "12px",
                                height: "24px",
                              }}
                              onChange={changePassword}
                              onKeyDown={({ target: { value }, keyCode }) => {
                                if (keyCode === 13) {
                                  // 13 คือ enter
                                  addReactBlood();
                                }
                              }}
                            />
                          </Form.Item>
                        </Col>

                        <Col
                          span={3}
                          style={{ marginRight: "20px", marginLeft: "8px" }}
                        >
                          <Button
                            style={{
                              fontSize: "12px",
                              height: "28px",
                              backgroundColor:
                                disabledBtn === true ? "" : "#3AB0FF",
                              color: disabledBtn === true ? "" : "white",
                            }}
                            icon={
                              <VscSaveAs
                                style={{
                                  fontSize: "14px",
                                  marginRight: "3px",
                                  marginBottom: "-2px",
                                }}
                              />
                            }
                            size="samll"
                            onClick={addReactBlood}
                            disabled={disabledBtn}
                          >
                            บันทึกข้อมูล
                          </Button>
                        </Col>

                        <Col span={2}>
                          <Button
                            style={{
                              fontSize: "12px",
                              height: "28px",
                              marginLeft: "-15px",
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
                            size="samll"
                            onClick={Clear}
                          >
                            เริ่มใหม่
                          </Button>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>

                <Card
                  style={{ marginTop: "-45px", padding: "5px" }}
                  title="รายการแพ้เลือด"
                  className="Addreact"
                >
                  <Col span={24}>
                    <Row style={{ marginTop: "-10px" }}>
                      <Col span={22} offset={1}>
                        <Table
                          className="dataBlood"
                          columns={columnDataReaction}
                          dataSource={dataReaction}
                          scroll={{ y: 110 }}
                          size="small"
                          pagination={false}
                          rowClassName={(record, index) => {
                            return record.ac_id === dataAcId ? "clickRow" : "";
                          }}
                          onRow={(record) => {
                            return {
                              onClick: () => {
                                updateHis(record);
                              },
                            };
                          }}
                        ></Table>
                      </Col>
                    </Row>
                  </Col>
                </Card>
              </Card>
            </Col>
          </Row>
        </Form>
      </Layout>

      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        width={850}
        footer={false}
        style={{ top: 30 }}
      >
        <Row>
          <h style={{ fontSize: "14px" }}>ค้นหา</h>
        </Row>

        <Form form={frmSearch}>
          <Row justify="center">
            <Col span={5}>
              <Form.Item
                name="keyword"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกข้อมูล !",
                  },
                ]}
              >
                <Input
                  placeholder="HN / เลขที่ใบขอเลือด"
                  id="keyword"
                  onPressEnter={SearchDetail}
                  style={{
                    width: "160px",
                    // height: "40px",
                    fontSize: "12px",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={3}>
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
                  marginTop: "1px",
                  fontSize: "12px",
                  height: "28.84px",
                  backgroundColor: "#17a2b8",
                  color: "white",
                }}
                onClick={SearchDetail}
                // htmlType="submit"
                size="small"
              >
                ค้นหา
              </Button>
            </Col>
          </Row>
        </Form>

        <Row justify="center">
          <Col span={22}>
            <Table
              className={!dataSearch ? "xm" : "xm colorPointer"}
              bordered
              onRow={(record) => {
                return {
                  onDoubleClick: () => {
                    setData_frm(record);
                  },
                };
              }}
              columns={columnSearch}
              dataSource={dataSearch}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};
export default Patient_add_reaction;
