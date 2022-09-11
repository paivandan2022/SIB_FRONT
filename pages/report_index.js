import { Carousel, Col, Row, Spin } from "antd";
import Head from "next/head";

import "moment/locale/th";
import { useState } from "react";
import Layout from "../components/layout";
import env from "/env.json";

const Report_index = () => {
  const [Spinloading, setSpinLoading] = useState(false);

  return (
    <>
      <Layout keyTab="report_index">
        <Spin tip="Loading..." spinning={Spinloading} size="large">
          <div>
            <Head>
              <title>SIBSOFT : ลงทะเบียนผู้บริจาคเลือด</title>
              <meta property="og:title" content="My page title" key="title" />
            </Head>
          </div>
          <Row style={{ marginBottom: "-15px" }}>
            <Col span={24}>
              <Carousel autoplay dotPosition={"top"}>
                <div>
                  <h3 className="contentStyle_imageCarousel">
                    <img
                      width={"100%"}
                      src={`${env.PATH_IMG}/image/test.jpg?pathType=1`}
                    />
                  </h3>
                </div>
                <div>
                  <h3 className="contentStyle_imageCarousel">
                    <img
                      width={"100%"}
                      src={`${env.PATH_IMG}/image/test.jpg?pathType=1`}
                    />
                  </h3>
                </div>
                <div>
                  <h3 className="contentStyle_imageCarousel">
                    {" "}
                    <img
                      width={"100%"}
                      src={`${env.PATH_IMG}/image/test.jpg?pathType=1`}
                    />
                  </h3>
                </div>
                <div>
                  <h3 className="contentStyle_imageCarousel">
                    {" "}
                    <img
                      width={"100%"}
                      src={`${env.PATH_IMG}/image/test.jpg?pathType=1`}
                    />
                  </h3>
                </div>
              </Carousel>
            </Col>
          </Row>
          <Row justify="center">
            <p style={{ fontSize: "50px" }}>เลือกรายงานที่ต้องการ</p>
          </Row>
        </Spin>
      </Layout>
    </>
  );
};

export default Report_index;
