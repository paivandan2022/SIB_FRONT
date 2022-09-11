import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  InboxOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Table,
  Upload,
} from "antd";
import "moment/locale/th";
import Head from "next/head";
import { useState } from "react";
import { MdRefresh } from "react-icons/md";
import { VscSaveAs } from "react-icons/vsc";

import { Layout } from "../components";
import api from "../lib/api";

const { Dragger } = Upload;
const Donor_import_txt = () => {
  const [dataUpload, setDataUpload] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [sum_repeat, setSum_repeat] = useState();

  const [fileList, setFileList] = useState([]);

  const [password, setPassword] = useState();
  const [isModalPassword, setIsModalPassword] = useState(false);


  const parseData = async (data) => {
    const result = [];

    const row = data.split(/\n/g);

    let sum_repeat = 0;
    for (let i = 0; i < row.length; i++) {
      const col = row[i];
      // console.log("col--->", col);
      const full_name = col.slice(25, 62);
      const name = full_name.split(/\s/g);
      const params = { unit_no: col.slice(236, 247).trim() };
      const repeat = await api.get(`/check_repeat`, {
        params,
      });
      sum_repeat = sum_repeat + repeat.data.repeat;
      let object = {
        donor_no: `${col.slice(0, 10)}`,
        pname: `${col.slice(10, 16).trim()}`,
        fname: `${name[0]} `,
        lname: `${full_name.replace(name[0], "").trim()} `,
        sex: `${col.slice(62, 63).trim()}`,
        birth_day: `${col.slice(63, 69).trim()}`,
        address01: `${col.slice(69, 84).trim()}`,
        address02: `${col.slice(84, 124).trim()}`,
        address03: `${col.slice(124, 139).trim()}`,
        post_code: `${col.slice(139, 144).trim()}`,
        phone: `${col.slice(144, 154).trim()}`,
        cid: `${col.slice(173, 186).trim()}`,
        email: `${col.slice(186, 235).trim()}`,
        unit_no: `${col.slice(236, 247).trim()}`,
        count: `${col.slice(247, 250).trim()}`,
        place: `${col.slice(250, 256).trim()}`,
        exp: `${col.slice(257, 261).trim()}`,
        group: `${col.slice(261, 266).trim()}`,
        rh: `${col.slice(266, 267).trim()}`,
        //ผลไม่เท่ากับ 0 '' N = สีส้ม
        saline: `${col.slice(267, 268).trim()}`,
        papian: `${col.slice(268, 269).trim()}`,
        coomb: `${col.slice(269, 270).trim()}`,
        antia: `${col.slice(270, 271).trim()}`,
        antib: `${col.slice(271, 272).trim()}`,
        //
        //ผลไม่เท่ากับ 0 '' N = fail --> donor_blood ฟิล result
        tpha: `${col.slice(272, 273).trim()}`,
        hbsag: `${col.slice(273, 274).trim()}`,
        hiv: `${col.slice(274, 275).trim()}`,
        hbvnat: `${col.slice(275, 276).trim()}`,
        hcvnat: `${col.slice(276, 277).trim()}`,
        hivnat: `${col.slice(277, 278).trim()}`,
        alt: `${col.slice(278, 279).trim()}`,
        hcv: `${col.slice(279, 280).trim()}`,
        hivag: `${col.slice(280, 281).trim()}`,
        //-----
        repeat: repeat.data.repeat,
      };
      if (
        !["0", "N", ""].includes(object.saline) ||
        !["0", "N", ""].includes(object.papian) ||
        !["0", "N", ""].includes(object.coomb) ||
        !["0", "N", ""].includes(object.antia) ||
        !["0", "N", ""].includes(object.antib)
      ) {
        object.chk_plasma = "Y";
      } else {
        object.chk_plasma = "";
      }

      if (
        !["0", "N", ""].includes(object.tpha) ||
        !["0", "N", ""].includes(object.hbsag) ||
        !["0", "N", ""].includes(object.hiv) ||
        !["0", "N", ""].includes(object.hbvnat) ||
        !["0", "N", ""].includes(object.hcvnat) ||
        !["0", "N", ""].includes(object.hivnat) ||
        !["0", "N", ""].includes(object.alt) ||
        !["0", "N", ""].includes(object.hcv) ||
        !["0", "N", ""].includes(object.hivag)
      ) {
        object.results = "FAIL";
        object.status = "7";
      } else {
        object.results = "PASS";
        object.status = "10";
      }
      object.repeat;
      result.push(object);
    }

    setSum_repeat(sum_repeat);
    console.log("result---->", result);
    setDataUpload(result);
  };

  const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
      setLoadingTable(true);
      let reader = new FileReader();
      reader.onload = () => {
        resolve(parseData(reader.result));
      };
      reader.onerror = reject;
      reader.readAsText(file, "TIS-620");
      setLoadingTable(false);
    });
  };

  const onUpload = async (file) => {
    let data = await readFileAsync(file);
    // console.log(data);
  };

  const props = {
    name: "file",
    fileList: fileList,
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      setFileList(info.fileList);
      if (info.file.status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        // message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        // message.error(`${info.file.name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const showModal = () => {
    setIsModalPassword(true);
    setTimeout(() => {
      document.getElementById("pass").focus();
    }, 500);
  };
  const handleCancel = () => {
    setIsModalPassword(false);
  };

  // const wait = async (i)  => {
  //   await timer(1000);
  //   console.log(`Task ${i} done!`);
  // }
  const handleOk = async () => {
    // ส่ง user_name and password
    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });
    const staff =
      resultLogin.data.pname +
      " " +
      resultLogin.data.fname +
      " " +
      resultLogin.data.lname;
    console.log("resultLogin==>", staff);
    setIsModalPassword(false);
    setPassword();

    try {
      if (resultLogin.data.id_user) {
        const allUpdate = [];
        const Ddata = dataUpload.map((item) => item);
        let total_pass = 0;
        let total_fail = 0;
        let item_count = 0;
        let record_sum = 0;

        for (let index = 0; index < Ddata.length; index++) {
          setLoadingTable(true);
          const item = Ddata[index];
          item_count++;
          if (item.chk_plasma === "") {
            total_pass++;
          } else {
            total_fail++;
          }
          const result = await api.put(`/Add_fileTxt`, {
            item,
            staff_name: staff,
          });
          if (result.status === 200) {
            record_sum++;
          } else {
            record_sum++;
          }
          setLoadingTable(false);
        }
        console.log("=total", record_sum);
        console.log("==item_cont", item_count);
        console.log("==total_pass", total_pass);
        console.log("==total_fail", total_fail);
        console.log("==sum_repeat", sum_repeat);

        Modal.success({
          content: (
            <div>
              <br />
              TOTAL : {item_count}
              <br />
              PASS: {total_pass}
              <br />
              FAIL: {total_fail}
              <br />
              SUM_REPEAT: {sum_repeat}
              <br />
              SUM_RECORD : {record_sum}
            </div>
          ),
        });
        setDataUpload("");
        setFileList([]);
      } else {
        Modal.error({
          title: "Password invalid",
          content: "กรุณากรอกรหัสผ่านให้ถูกต้อง!!",
        });
      }
    } catch (error) {}
  };
  const clear_a = async () => {
    setDataUpload("");
    setFileList([]);
  };

  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "",
      align: "center",
      width: 70,
      fixed: "left",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    // {
    //   title: "donor_no",
    //   dataIndex: "donor_no",
    //   key: "donor_no",
    //   align: "center",
    //   fixed: "left",
    //   width: 130,
    // },
    // {
    //   title: "คำนำหน้า",
    //   dataIndex: "pname",
    //   key: "pname",
    //   fixed: "left",
    //   width: 100,
    // },
    // {
    //   title: "ชื่อ",
    //   dataIndex: "fname",
    //   key: "fname",
    //   fixed: "left",
    //   width: 130,
    // },
    // {
    //   title: "สกุล",
    //   dataIndex: "lname",
    //   key: "lname",
    //   fixed: "left",
    //   width: 130,
    // },
    // {
    //   title: "เพศ",
    //   dataIndex: "sex",
    //   key: "sex",
    //   width: 100,
    // },
    // {
    //   title: "วันเกิด",
    //   dataIndex: "birth_day",
    //   key: "birth_day",
    //   width: 100,
    // },
    // {
    //   title: "address01",
    //   dataIndex: "address01",
    //   key: "address01",
    //   width: 100,
    // },
    // {
    //   title: "address02",
    //   dataIndex: "address02",
    //   key: "address02",
    //   width: 250,
    // },
    // {
    //   title: "address03",
    //   dataIndex: "address03",
    //   key: "address03",
    //   width: 100,
    // },
    // {
    //   title: "post_code",
    //   dataIndex: "post_code",
    //   key: "post_code",
    //   width: 100,
    // },
    // {
    //   title: "phone",
    //   dataIndex: "phone",
    //   key: "phone",
    //   width: 130,
    // },
    // {
    //   title: "cid",
    //   dataIndex: "cid",
    //   key: "cid",
    //   align: "center",
    //   fixed: "left",
    //   width: 150,
    // },
    // {
    //   title: "email",
    //   dataIndex: "email",
    //   key: "email",
    //   width: 150,
    // },
    {
      title: "unit_no",
      dataIndex: "unit_no",
      key: "unit_no",
      align: "center",
      fixed: "left",
      width: 150,
    },
    {
      title: "count",
      dataIndex: "count",
      key: "count",
      align: "center",
      width: 70,
    },
    {
      title: "place",
      dataIndex: "place",
      key: "place",
      align: "center",
      width: 100,
    },
    {
      title: "exp",
      dataIndex: "exp",
      key: "exp",
      align: "center",
      width: 70,
    },
    {
      title: "group",
      dataIndex: "group",
      key: "group",
      align: "center",
      width: 70,
    },
    {
      title: "rh",
      dataIndex: "rh",
      key: "rh",
      align: "center",
      width: 50,
    },
    {
      title: "saline",
      dataIndex: "saline",
      key: "saline",
      align: "center",
      width: 70,
      render: (text) => (
        <div
          style={{
            backgroundColor:
              text === "" || text === "N" || text === "0" ? "" : "orange",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "papian",
      dataIndex: "papian",
      key: "papian",
      align: "center",
      width: 70,
      render: (text) => (
        <div
          style={{
            backgroundColor:
              text === "" || text === "N" || text === "0" ? "" : "orange",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "coomb",
      dataIndex: "coomb",
      key: "coomb",
      align: "center",
      width: 70,
      render: (text) => (
        <div
          style={{
            backgroundColor:
              text === "" || text === "N" || text === "0" ? "" : "orange",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "antia",
      dataIndex: "antia",
      key: "antia",
      align: "center",
      width: 70,
      render: (text) => (
        <div
          style={{
            backgroundColor:
              text === "" || text === "N" || text === "0" ? "" : "orange",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "antib",
      dataIndex: "antib",
      key: "antib",
      align: "center",
      width: 70,
      render: (text) => (
        <div
          style={{
            backgroundColor:
              text === "" || text === "N" || text === "0" ? "" : "orange",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "tpha",
      dataIndex: "tpha",
      key: "tpha",
      align: "center",
      width: 70,
      render: (text) => (
        <div
          style={{
            backgroundColor:
              text === "" || text === "N" || text === "0" ? "" : "red",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "hbsag",
      dataIndex: "hbsag",
      key: "hbsag",
      align: "center",
      width: 70,
      render: (text) => (
        <div
          style={{
            backgroundColor:
              text === "" || text === "N" || text === "0" ? "" : "red",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "hiv",
      dataIndex: "hiv",
      key: "hiv",
      align: "center",
      width: 70,
      render: (text) => (
        <div
          style={{
            backgroundColor:
              text === "" || text === "N" || text === "0" ? "" : "red",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "hbvnat",
      dataIndex: "hbvnat",
      key: "hbvnat",
      align: "center",
      width: 70,
      render: (text) => (
        <div
          style={{
            backgroundColor:
              text === "" || text === "N" || text === "0" ? "" : "red",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "hcvnat",
      dataIndex: "hcvnat",
      key: "hcvnat",
      align: "center",
      width: 70,
      render: (text) => (
        <div
          style={{
            backgroundColor:
              text === "" || text === "N" || text === "0" ? "" : "red",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "hivnat",
      dataIndex: "hivnat",
      key: "hivnat",
      align: "center",
      width: 70,
      render: (text) => (
        <div
          style={{
            backgroundColor:
              text === "" || text === "N" || text === "0" ? "" : "red",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "alt",
      dataIndex: "alt",
      key: "alt",
      align: "center",
      width: 70,
      render: (text) => (
        <div
          style={{
            backgroundColor:
              text === "" || text === "N" || text === "0" ? "" : "red",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "hcv",
      dataIndex: "hcv",
      key: "hcv",
      align: "center",
      width: 70,
      render: (text) => (
        <div
          style={{
            backgroundColor:
              text === "" || text === "N" || text === "0" ? "" : "red",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "hivag",
      dataIndex: "hivag",
      key: "hivag",
      align: "center",
      width: 70,
      render: (text) => (
        <div
          style={{
            backgroundColor:
              text === "" || text === "N" || text === "0" ? "" : "red",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "result",
      dataIndex: "results",
      key: "result",
      align: "center",
      width: 70,
      render: (text) => (
        <div
          style={{
            backgroundColor: text === "FAIL" ? "red" : "",
          }}
        >
          {text}
        </div>
      ),
    },
    // {
    //   title: "chk_plasma",
    //   dataIndex: "chk_plasma",
    //   key: "chk_plasma",
    //   align: "center",
    //   width: 70,
    // },
  ];
  return (
    <>
      <Layout keyTab="Donor_import_txt">
        <div>
          <Head>
            <title>SIBSOFT : นำเข้าผลตรวจกาชาด</title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
        </div>

        <br />
        <Row justify="center">
          <Col span={10}>
            <Dragger {...props} beforeUpload={onUpload}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">คลิกเลือกไฟล์ที่ต้องการ</p>
              <p className="ant-upload-hint" style={{ color: "red" }}>
                สามารถอัพโหลดได้ครั้งละ 1 ไฟล์เท่านั้น เฉพาะไฟล์ .txt เท่านั้น
              </p>
            </Dragger>
          </Col>
        </Row>
        <br />
        <br />
        <Row justify="center">
          {/* <Upload beforeUpload={onUpload} {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload> */}
          {dataUpload != "" ? (
            <Button
              htmlType="submit"
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
              style={{
                fontSize: "12px",
                height: "28px",
                backgroundColor: "#3AB0FF",
                color: "white",
              }}
            >
              บันทึกข้อมูล
            </Button>
          ) : (
            ""
          )}
          &nbsp;
          {dataUpload != "" ? (
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
              htmlType="submit"
              onClick={clear_a}
            >
              เริ่มใหม่
            </Button>
          ) : (
            ""
          )}
        </Row>
        <br />
        <Row>
          {dataUpload != "" ? (
            // <Form form={frm_import} >
            <Table
              columns={columns}
              dataSource={dataUpload}
              loading={loadingTable}
              scroll={{ x: 1500, y: 575 }}
              bordered
              pagination={false}
              size="small"
              className="xm"
              style={{ border: "1px solid" }}
            />
          ) : (
            // </Form>
            ""
          )}
        </Row>
      </Layout>
      <Modal
        visible={isModalPassword}
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
              handleOk();
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
            onClick={handleOk}
            disabled={!password}
          >
            ยืนยัน
          </Button>
        </Row>
      </Modal>
    </>
  );
};
export default Donor_import_txt;
