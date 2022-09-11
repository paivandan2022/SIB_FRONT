import "moment/locale/th";
import { useRef } from "react";
import Sticker_02 from "./sticker_02";

import { PrinterFilled } from "@ant-design/icons";
import ReactToPrint from "react-to-print";

const Print_split = ({ data }) => {
  console.log("ddddddddddddd--->data", data);
  const printComponent = useRef(null);
  return (
    <>
      <div ref={(el) => (printComponent = el)}>
        {data?.map((item) => (
        
          <Sticker_02 key={item.id} data={item} />
        
        ))}
      </div>
      <ReactToPrint
        trigger={() => (
          <PrinterFilled
            style={{
              fontSize: "14px",
              color: "red",
            }}
          />
        )}
        content={() => printComponent}
      />
    </>
  );
};

export default Print_split;