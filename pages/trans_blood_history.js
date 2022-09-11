import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
  Tabs,
  Card
} from "antd";
import th_TH from "antd/lib/date-picker/locale/th_TH";
import moment from "moment";
import "moment/locale/th";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { MdManageSearch, MdRefresh } from "react-icons/md";

import { FcPrint } from "react-icons/fc";
import ReactToPrint from "react-to-print";
import { Layout } from "../components";


import api from "../lib/api";

const Trans_blood_history = () => {
  const [frmTransBloodHis] = Form.useForm();

  const { Option } = Select;
  const [placement, SetPlacement] = useState("bottomLeft");
  const printComponent = useRef(null);
  const { RangePicker } = DatePicker;
  const { TabPane } = Tabs;

  const [dataMap, setDataMap] = useState([]);
  const [hospital, setHospital] = useState();
  const [dataHisTrans, setDataHisTrans] = useState([]);

  const Fetch_hospital = async () => {
    const result = await api.get("/hospitals");
    setHospital(result.data[0]);
    frmTransBloodHis.setFieldsValue({
      hos_point: result.data[0][0].hos_long_name_th,
    });
  };

  const columnsHisTrans = [
    {
      title: "#",
      dataIndex: "No",
      key: "no",
      align: "center",
      width: "3%",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "พิมพ์",
      dataIndex: "payment",
      key: "",
      align: "center",
      width: "6%",
      render: (_, record) => (
        <Button
          type="link"
          icon={<FcPrint />}
          style={{ color: "#FF8D29" }}
          onClick={() => hisTransPrint(record.payment)}
        />
      ),
    },
    {
      title: "Payment.",
      dataIndex: "payment",
      key: "payment",
      align: "center",
      width: "8%",
    },
    {
      title: "Unit No.",
      dataIndex: "unit_no_dot",
      key: "unit_no_dot",
      align: "center",
      width: "8%",
    },
    {
      title: "Group",
      dataIndex: "Gr",
      key: "Gr",
      align: "center",
      width: "4%",
    },
    {
      title: "Type",
      dataIndex: "s_name",
      key: "s_name",
      align: "center",
      width: "5%",
    },
    {
      title: "Expire Date",
      dataIndex: "expiry_date",
      key: "expiry_date",
      align: "center",
      width: "7%",
    },
    {
      title: "จ่ายไปยัง",
      dataIndex: "hos_long_name_th",
      key: "hos_long_name_th",
      align: "center",
      width: "12%",
    },
    {
      title: "วันที่จ่าย",
      dataIndex: "trans_date",
      key: "trans_date",
      align: "center",
      width: "7%",
    },
    {
      title: "ผู้จ่าย",
      dataIndex: "Pname",
      key: "Pname",
      align: "center",
      width: "12%",
    },
    {
      title: "ผู้รับเลือด",
      dataIndex: "recipient",
      key: "recipient",
      align: "center",
      width: "10%",
    },
  ];

  const SearchHisTrans = async () => {
    const frm = frmTransBloodHis.getFieldsValue();
    console.log("femSearch", frm);

    const params = {
      date_start: moment(frm.date_Search[0]).subtract(543, "years").format("YYYY-MM-DD"),
      date_last: moment(frm.date_Search[1]).subtract(543, "years").format("YYYY-MM-DD"),
      hos_id: frm.hos_id,
      unit_no: frm.unit_no,
    };
    delete params.date_Search;

    try {
      const resultHisTrans = await api.get("/search_his_trans", { params });

      if (resultHisTrans.data.length < 1) {
        Modal.warning({
          content: <div>ไม่พบข้อมูล กรุณาตรวจสอบข้อมูลอีกครั้ง</div>,
          onOk() {
            clearSearch();
          },
        });
      } else {
        console.log(resultHisTrans.data);
        setDataHisTrans(resultHisTrans.data);
      }
    } catch (error) {}

    console.log("params", params);
  };

  const clearSearch = () => {
    setDataHisTrans([]);
    frmTransBloodHis.resetFields();
  };

  const hisTransPrint = async (value) => {
    console.log("hisTransPrint", value);
    const dataPrint = [];
    const params = {
      payment: value,
    };
    const resultTransBloodPrint = await api.get("/dataTransBlood", { params });
    console.log("มีpayment", resultTransBloodPrint?.data);
    dataPrint.push(resultTransBloodPrint?.data);

    setDataMap(dataPrint);
    btnPrint.click();
  };

  useEffect(async () => {
    await Fetch_hospital();
  }, []);

  return (
    <>
      <Layout keyTab="trans_blood_history">
        <div>
          <Head>
            <title>SIBSOFT : ประวัติการจ่ายเลือด</title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
        </div>

        <Row justify="center" style={{ padding: "10px" }}>
          <Col span={24}>
        <Card>
        <Tabs  type="card" style={{ marginTop: -20 }} >
        <TabPane tab="ประวัติการจ่ายเลือด" key="1">
 <Form
          form={frmTransBloodHis}
          initialValues={{
            date_Search: [moment().add(543, "year"), moment().add(543, "year")],
          }}
        >
          <Row style={{ paddingTop: "10px" }}>
            <Col span={22} offset={1}>
              <Row justify="center">
                <Col span={6}>
                  <Form.Item name="date_Search" label="วันที่จ่าย">
                    <RangePicker
                      size="small"
                      placeholder={["วันเริ่ม", "วันสุดท้าย"]}
                      format="DD-MM-YYYY"
                      locale={th_TH}
                    />
                  </Form.Item>
                </Col>

                <Col span={4} style={{ marginLeft: "3px" }}>
                  <Form.Item
                    name="hos_id"
                    style={{
                      marginRight: "2px",
                    }}
                  >
                    <Select
                      size="small"
                      showArrow={false}
                      dropdownMatchSelectWidth={false}
                      placement={placement}
                      placeholder="เลือกโรงพยาบาล"
                      style={{ width: "100%" }}
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

                <Col span={3} style={{ marginLeft: "3px" }}>
                  <Form.Item name="unit_no" style={{ paddingRight: "12px" }}>
                    <Input
                      size="small"
                      placeholder="เลขที่ถุงเลือด"
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
                    onClick={SearchHisTrans}
                  >
                    ค้นหา
                  </Button>
                </Col>

                <Col span={2} style={{ marginLeft: "5px" }}>
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
                    onClick={clearSearch}
                  >
                    เริ่มใหม่
                  </Button>
                </Col>
              </Row>

              <Row style={{ marginTop: "-15px" }}>
                <Col span={24}>
                  <Table
                    bordered
                    className="xm"
                    size="small"
                    dataSource={dataHisTrans}
                    columns={columnsHisTrans}
                  ></Table>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
        </TabPane>
        </Tabs>
       </Card>
</Col>
</Row>
        {/* PRINT DETAIL */}
        <div ref={(el) => (printComponent = el)}>
          {dataMap?.map((item) => (
            <div key={item.id}>
              <PrintDetail data={item} />
            </div>
          ))}
        </div>

        <ReactToPrint
          trigger={() => <Button id="btnPrint" type="text"></Button>}
          content={() => printComponent}
        />
      </Layout>
    </>
  );
};

export default Trans_blood_history;

const PrintDetail = ({ data }) => {
  console.log("paymentPrint", data);

  return (
    <div className="print">
      <p>เลข Payment : {data[0].payment}</p>

      <p>
        เลขถุงเลือด :{" "}
        <b>
          {" "}
          {data.map((item, index) => (
            <p key={index}>{item.blood_no}</p>
          ))}
        </b>
      </p>
    </div>
  );
};
