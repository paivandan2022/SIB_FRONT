import { Col, Row } from "antd";
import JsBarcode from "jsbarcode";
import moment from "moment";
import { useEffect, useState } from "react";
const Sticker_02 = ({ data }) => {
  console.log("datadatadatadatadata", data);
  const [barcodeImage, setBarcodeImage] = useState();
  const [BarcodeComponent, setBarcodeComponent] = useState();
  const [BarcodeGr, setBarcodeGr] = useState();

  const onClickGenBarcode = (input) => {
    var canvas = document.createElement("canvas");
    JsBarcode(canvas, input, {
      format: "CODE128",
      fontSize: 12,
      displayValue: false,
    });
    const barcodeBase64 = canvas.toDataURL("image/png");
    setBarcodeImage(barcodeBase64);
  };

  const onClickGenBarcodeComponent = (input) => {
    var canvas = document.createElement("canvas");
    JsBarcode(canvas, input, {
      format: "CODE128",
      fontSize: 12,
      displayValue: false,
    });
    const barcodeBase64 = canvas.toDataURL("image/png");
    setBarcodeComponent(barcodeBase64);
  };
  const onClickGenBarcodeGr = (input) => {
    var canvas = document.createElement("canvas");
    JsBarcode(canvas, input, {
      format: "CODE128",
      fontSize: 12,
      displayValue: false,
    });
    const barcodeBase64 = canvas.toDataURL("image/png");
    setBarcodeGr(barcodeBase64);
  };

  useEffect(async () => {
    if (data.blood_no) {
      onClickGenBarcode(data.blood_no);
      onClickGenBarcodeComponent(data.s_name);
      onClickGenBarcodeGr(data.blood_group + data.blood_rh);
    }
  }, [data.blood_no]);

  return (
    <div
      className="print"
      style={{
        width: "378px",
        height: "	260px",
        border: "1px solid",
        margin: "3px",
      }}
    >
      <Row justify="end">
        <Col span={16}>
          <p style={{ marginTop: "1px" }}>
            <img src={barcodeImage} height={30} width={250} />
          </p>
          <p style={{ marginTop: "-17px" }}>
            <b style={{ fontSize: "14px" }}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {data.blood_no}
            </b>
          </p>
        </Col>
        <Col span={1}></Col>
      </Row>
      <hr style={{ marginTop: "-17px", border: "1px solid" }}></hr>
      <Row style={{ marginTop: "-6px" }}>
        <Col span={15}>
          <p>
            <b
              style={{
                fontSize: data.s_name === "LPRC" ? "13px" : "14px",
              }}
            >
              &nbsp;{data.l_name}&nbsp;({data.s_name})
            </b>
          </p>
        </Col>
        <Col span={9}>
          <img src={BarcodeComponent} height={30} width={120} />
          <p style={{ marginTop: "-7px" }}>
            <b style={{ fontSize: "14px" }}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {data.s_name}
            </b>
          </p>
        </Col>
      </Row>
      <hr style={{ marginTop: "-17px", border: "1px solid" }}></hr>
      <Row style={{ marginTop: "-6px" }}>
        <Col span={16}>
          <p style={{ marginTop: "-5px" }}>
            &nbsp;volume :{" "}
            <b style={{ fontSize: "16px" }}>{data.blood_value}</b> ml.
          </p>
          <p style={{ marginTop: "-17px" }}>
            &nbsp;Collection :{" "}
            <b style={{ fontSize: "16px" }}>
              {moment(data.donor_date).add(543, "year").format("DD-MM-YYYY")}
            </b>
          </p>
          <p style={{ marginTop: "-17px" }}>
            &nbsp;Use before :{" "}
            <b style={{ fontSize: "16px" }}>
              {moment(data.expiry_date).add(543, "year").format("DD-MM-YYYY")}
            </b>
          </p>
          <p style={{ marginTop: "-17px" }}>&nbsp;Confirmatory phenotyping :</p>
        </Col>
        <Col span={8}>
          {data.blood_group && <img src={BarcodeGr} height={30} width={120} />}
          <p style={{ marginTop: "-17px" }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <b style={{ fontSize: "45px" }}>{data.blood_group}</b>
          </p>

          <p style={{ marginTop: "-30px", marginLeft: "-15px" }}>
            {data.blood_rh && (
              <b style={{ fontSize: "18px" }}>Rh :&nbsp;{data.rh_long_name}</b>
            )}
          </p>
        </Col>
      </Row>
      <Row style={{ marginTop: "-20px" }}>
        <Col span={20}>
          <p style={{ fontSize: "14px" }}>
            &nbsp;Negative for : &nbsp;
            <b style={{ fontSize: "12px" }}>Syphilis, HBsAg, Anti-HCV, HIV,</b>
            <br />
            <b style={{ fontSize: "12px", marginTop: "-10px" }}>
              &nbsp;Ag/Ab, HIV RNA, HCV RNA HBV DNA
            </b>
          </p>
        </Col>
      </Row>
      {/* <hr style={{ marginTop: "-18px", border: "1px solid" }}></hr> */}
      <Row
        justify="center"
        style={{ backgroundColor: "black", marginTop: "-5px", height: "20px" }}
      >
        <Col span={24}>
          <p style={{ fontSize: "12px" }}>
            <center>
              <b style={{ color: "white" }}>
                AFF-Bloodbank by AFFINITECH.CO,.TH
              </b>
            </center>
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default Sticker_02;
