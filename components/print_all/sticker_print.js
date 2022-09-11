import { Button } from "antd";
import "moment/locale/th";
import { useRef } from "react";
import Print_Sticker from "./sticker_01";

import { PrinterFilled } from "@ant-design/icons";
import ReactToPrint from "react-to-print";

const Print = ({ data }) => {
  console.log("ddddddddddddd--->data", data);
  const printComponent = useRef(null);
  return (
    <>
      <div ref={(el) => (printComponent = el)}>
        {/* {data?.map((item) => ( */}
        <Print_Sticker data={data} />
        {/* ))} */}
      </div>
      <ReactToPrint
        trigger={() => (
          <Button
          type="primary"
            style={{
              fontSize: "12px",
              height: "25px",
            }}
            icon={
              <PrinterFilled
                style={{
                  fontSize: "12px",
                  marginTop: "3px",
                }}
              />
            }
          >
            พิมพ์สติกเกอร์
          </Button>
        )}
        content={() => printComponent}
      />
    </>
  );
};

export default Print;
