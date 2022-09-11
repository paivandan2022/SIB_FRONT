import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Spin,
  Table,
  Tooltip,
  Typography,
  Upload,
} from "antd";
import Head from "next/head";

import th_TH from "antd/lib/date-picker/locale/th_TH";
import moment from "moment";
import "moment/locale/th";
import os from "os";
import { useEffect, useRef, useState } from "react";
import {
  MdManageSearch,
  MdOutlineAddPhotoAlternate,
  MdRefresh,
} from "react-icons/md";
import { RiUserAddLine } from "react-icons/ri";
import ReactToPrint from "react-to-print";
import Layout from "../components/layout";
import api from "../lib/api";
import env from "/env.json";

const { TextArea } = Input;
const { Option } = Select;

const { Text } = Typography;

const Donor_register = () => {
  const printComponent = useRef(null); // ปริ้นใบสมัคร

  const [newBloodgroup, setBloodgroup] = useState([]); //fecth กรุ๊ปเลือด
  const [newPname, setNewPname] = useState([]); //fecth คำนำหน้า
  const [newSex, setNewSex] = useState([]); //fecth เพศ
  const [newOccu, setOccu] = useState([]); //fecth อาชีพ
  const [newMary, setMary] = useState([]); //fecth สถานะ
  const [strAge, setstrAge] = useState(); //fecth อายุ
  const [rhName, setRhName] = useState(); //fecth RH

  const [newDonorlist, setnewDonorlist] = useState([]);
  const [newDonor_Blood, setnewDonor_Blood] = useState([]); // fecth donor_no
  //facth ที่อยู่ตามบัตรประชาชน
  const [Province, setProvince] = useState([]);
  const [Ampure, setAmpure] = useState([]);
  const [Tumbon, setTumbon] = useState([]);
  //facth ใช้ที่อยู่ ตามบัตรประชาชน
  const [newProvince, setNewProvince] = useState([]);
  const [newAmpure, setNewAmpure] = useState([]);
  const [newTumbon, setNewTumbon] = useState([]);

  const [newStrBirthday, setStrBirthday] = useState();
  const [loadingUploadPic, setLoadingUploadPic] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [password, setPassword] = useState();

  const [Spinloading, setSpinLoading] = useState(false);
  const [Btn_loading, setBtn_loading] = useState(false);
  const [Btn_reset_loading, setBtn_reset_loading] = useState(false);

  const [checkcid, setCheckcid] = useState();
  const [checkgroup, setCheckgroup] = useState();
  const [checkrh, setCheckrh] = useState();
  const [checkpname, setCheckpname] = useState();
  const [checkfname, setCheckfname] = useState();
  const [checklname, setChecklname] = useState();
  const [checkdob, setCheckdob] = useState();
  const [checksex, setChecksex] = useState();
  const [checkaddrpart, setCheckaddrpart] = useState();
  const [checkaddrpartNew, setCheckaddrpartNew] = useState();
  const [checkchwpart, setCheckchwpart] = useState();
  const [checkchwpartNew, setCheckchwpartNew] = useState();
  const [checkamppart, setCheckamppart] = useState();
  const [checkamppartNew, setCheckamppartNew] = useState();
  const [checktmbpart, setChecktmbpart] = useState();
  const [checktmbpartNew, setChecktmbpartNew] = useState();
  const [checkpostcode, setCheckpostcode] = useState();
  const [checkpostcodeNew, setCheckpostcodeNew] = useState();

  const [checkDonorNo, setCheckDonorNo] = useState();
  const [checkAge, setCheckAge] = useState();
  const [checkTel, setCheckTel] = useState();
  const [checkEmail, setCheckEmail] = useState();
  const [checkAddMore, setCheckAddMore] = useState();
  const [checkAddNow, setCheckAddNow] = useState();
  const [checkAddCard, setCheckAddCard] = useState();

  const [isModalSearch, setIsModalSearch] = useState(false);
  const [choice, setChoice] = useState(1);
  const [dataSearch, setDataSearch] = useState();

  //------------------------------------//
  const [frmOpen] = Form.useForm();
  const [frmSearch] = Form.useForm();

  useEffect(async () => {
    await fetch_pname();
    await Fetch_Sex();
    await Fetch_mary();
    await Fetch_occu();
    await Fetch_bloodgroup();
    await Fetch_Province();
    await Fetch_Province_new();
    await fetch_RhName();
    setCheckcid("");
    setCheckgroup("");
    setCheckrh("");
    setCheckpname("");
    setCheckfname("");
    setChecklname("");
    setCheckdob("");
    setChecksex("");
    setCheckaddrpart("");
    setCheckaddrpartNew("");
    setCheckchwpart("");
    setCheckchwpartNew("");
    setCheckamppart("");
    setCheckamppartNew("");
    setChecktmbpart("");
    setChecktmbpartNew("");
    setCheckpostcode("");
    setCheckpostcodeNew("");
  }, []);

  const showModal = async () => {
    setIsModalVisible(true);
    setTimeout(() => {
      document.getElementById("pass").focus();
    }, 500);
  };

  const handleOk = async () => {
    // ส่ง user_name and password
    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });
    const staff_name =
      resultLogin.data.pname +
      " " +
      resultLogin.data.fname +
      " " +
      resultLogin.data.lname;
    // console.log("resultLogin", resultLogin.data);
    try {
      if (resultLogin.data.id_user) {
        setSpinLoading(true);
        window.scrollTo(0, 0);
        const formData = frmOpen.getFieldsValue();
        console.log("AddformData", formData);
        const result1 = await api.put(`/Add_donor`, {
          ...formData,

          birthday: moment(formData.dob).format("YYYY-MM-DD"),
          image: `${formData.cid}.jpg`,
          dn: formData.donor_no,
          staff: staff_name,
        });
        await api.post("/image-upload-donor", image, {
          params: { id: `${formData.cid}.jpg` },
        });
        setIsModalVisible(false);
        setPassword();
        // window.close();
        frmOpen.resetFields();
        setstrAge();
        setImageUrl();
      } else {
        Modal.error({
          title: "Password invalid",
          content: "กรุณากรอกรหัสผ่านให้ถูกต้อง!!",
        });
      }
      setIsModalVisible(false);
    } catch (error) {
      Modal.error({
        title: "Error",
        content: "กรุณากรอกข้อมูลให้ครบถ้วน!!",
      });
      console.log("----", error);
    }
    setSpinLoading(false);
  };
  //----------------------------------//

  const onCheckaddress = async (e) => {
    console.log(`checked = ${e.target.checked}`);
    if (e.target.checked) {
      const formData = frmOpen.getFieldsValue();
      console.log("formData------->", formData);
      frmOpen.setFieldsValue({
        addrpart_new: formData.addrpart,
        soipart_new: formData.soipart,
        moopart_new: formData.moopart,
        roadpart_new: formData.roadpart,
        chwpart_new: formData.chwpart,
        amppart_new: formData.amppart,
        tmbpart_new: formData.tmbpart,
        postcode_new: formData.postcode,
      });
      // setNewZip({ zipcode: Zip.zipcode });
      setNewProvince(Province);
      setNewAmpure(Ampure);
      setNewTumbon(Tumbon);
      setCheckaddrpartNew("data");
      setCheckchwpartNew("data");
      setCheckamppartNew("data");
      setChecktmbpartNew("data");
      setCheckpostcodeNew("data");
    } else {
      frmOpen.setFieldsValue({
        addrpart_new: "",
        soipart_new: "",
        moopart_new: "",
        roadpart_new: "",
        chwpart_new: "",
        amppart_new: "",
        tmbpart_new: "",
        postcode_new: "",
      });
    }

    setCheckAddNow(checkAddCard);
    setCheckpostcodeNew(checkpostcode);
  };
  const fetch_RhName = async () => {
    const result = await api.get("/Get_Rh_Name");
    setRhName(result.data[0]);
  };
  const fetch_pname = async () => {
    const result = await api.get("/pname_en_th");
    setNewPname(result.data);
    console.log("fetch_pname", result.data);
  };
  const Fetch_Sex = async () => {
    const result = await api.get("/Get_sex");
    setNewSex(result.data);
    console.log("Fetch_Sex", result.data);
  };
  const Fetch_bloodgroup = async () => {
    const result = await api.get("/Get_group");
    setBloodgroup(result.data);
    console.log("Fetch_bloodgroup", result.data);
  };
  const Fetch_occu = async () => {
    const result = await api.get("/Get_occu");
    setOccu(result.data);
    console.log("Fetch_occu", result.data);
  };
  const Fetch_mary = async () => {
    const result = await api.get("/Get_mary");
    setMary(result.data);
    console.log("Fetch_mary", result.data);
  };

  //facth ที่อยู่ตามบัตรประชาชน
  const Fetch_Province = async () => {
    const result = await api.get("/Get_Province");
    setProvince(result.data);
    console.log("newProvince", newProvince);
  };
  const Fetch_Aumpure = async (value, skipResetForm = false) => {
    const frm = frmOpen.getFieldValue();
    console.log(";;;;;;-------", value, skipResetForm);

    if (frm.chwpart) {
      setCheckchwpart(value);
    }
    if (frm.chwpart_new) {
      setCheckchwpartNew(value);
    }

    const result = await api.get("/Get_Aumpure", {
      params: {
        PROVINCE_ID: value,
      },
    });
    console.log("Fetch_Aumpure", result.data);
    setAmpure(result.data);

    if (skipResetForm === false) {
      console.log(";;;;;;");
      frmOpen.setFieldsValue({
        amppart: "",
        tmbpart: "",
        postcode: "",
      });
    }
  };
  const Fetch_Tumbon = async (value) => {
    const frm = frmOpen.getFieldValue();
    if (frm.amppart) {
      setCheckamppart(value);
    }
    if (frm.amppart_new) {
      setCheckamppartNew(value);
    }
    const result = await api.get("/Get_Tumbon", {
      params: {
        AMPHUR_ID: value,
      },
    });
    setTumbon(result.data);
  };
  const Fetch_Zip = async (value) => {
    const result = await api.get("/Get_Zip", {
      params: {
        DISTRICT_CODE: value,
      },
    });
    frmOpen.setFieldsValue({
      postcode: result.data[0]?.zipcode,
    });
    const frm = frmOpen.getFieldValue();
    if (frm.tmbpart) {
      setChecktmbpart(value);
      setCheckpostcode(result.data[0]?.zipcode);
    }
    if (frm.tmbpart_new) {
      setChecktmbpartNew(value);
      setCheckpostcodeNew(result.data[0]?.zipcode);
    }
    console.log("frm---333", frm);

    const chw = Province.filter((item) => item.PROVINCE_ID == frm.chwpart);
    const ampure = Ampure.filter((item) => item.AMPHUR_ID == frm.amppart);
    const tumbon = Tumbon.filter((item) => item.DISTRICT_CODE == frm.tmbpart);

    const addressCard = `บ้านเลขที่ ${frm.addrpart} หมู่ที่ ${
      frm.moopart === "" ? "-" : frm.moopart
    } ถนน ${frm.roadpart === "" ? "-" : frm.roadpart} ซอย ${
      frm.soipart === "" ? "-" : frm.soipart
    } ตำบล ${tumbon[0].DISTRICT_NAME}อำเภอ ${ampure[0].AMPHUR_NAME}จังหวัด ${
      chw[0].PROVINCE_NAME
    }`;

    setCheckAddCard(addressCard);
  };
  // end fecth addrees //
  // --------------------------------------------//
  //facth ใช้ที่อยู่ตามบัตรประชาชน
  const Fetch_Province_new = async () => {
    const result = await api.get("/Get_Province_new");
    setNewProvince(result.data);
  };
  const Fetch_Aumpure_new = async (value, skipResetForm = false) => {
    const result = await api.get("/Get_Aumpure_new", {
      params: {
        PROVINCE_ID: value,
      },
    });
    setNewAmpure(result.data);
    if (skipResetForm === false) {
      frmOpen.setFieldsValue({
        amppart_new: "",
        tmbpart_new: "",
        postcode_new: "",
      });
    }
  };
  const Fetch_Tumbon_new = async (value) => {
    const result = await api.get("/Get_Tumbon_new", {
      params: {
        AMPHUR_ID: value,
      },
    });
    setNewTumbon(result.data);
  };
  const Fetch_Zip_new = async (value) => {
    const result = await api.get("/Get_Zip_new", {
      params: {
        DISTRICT_CODE: value,
      },
    });
    frmOpen.setFieldsValue({
      postcode_new: result.data[0]?.zipcode,
    });

    const frm = frmOpen.getFieldValue();
    console.log("frm---333", frm);

    const chw = newProvince.filter(
      (item) => item.PROVINCE_ID == frm.chwpart_new
    );
    const ampure = newAmpure.filter(
      (item) => item.AMPHUR_ID == frm.amppart_new
    );
    const tumbon = newTumbon.filter(
      (item) => item.DISTRICT_CODE == frm.tmbpart_new
    );

    const addressNow = `บ้านเลขที่ ${frm.addrpart_new} หมู่ที่ ${
      frm.moopart_new === "" ? "-" : frm.moopart_new
    } ถนน ${frm.roadpart_new === "" ? "-" : frm.roadpart_new} ซอย ${
      frm.soipart_new === "" ? "-" : frm.soipart_new
    } ตำบล ${tumbon[0].DISTRICT_NAME}อำเภอ ${ampure[0].AMPHUR_NAME}จังหวัด ${
      chw[0].PROVINCE_NAME
    }`;

    setCheckAddNow(addressNow);
    setCheckpostcodeNew(result.data[0]?.zipcode);
  };
  //end new fecth addrees //
  const setDOB = (dateValue) => {
    setCheckdob(dateValue);
    console.log("dateValue------------------>", dateValue);
    const a = moment();
    const b = moment(dateValue, "YYYY-MM-DD");

    setStrBirthday(b.toString());
    const age = moment.duration(a.diff(b));
    const years = age.years();
    const months = age.months();
    const day = age.days();
    const Age = years + " ปี " + months + " เดือน " + day + " วัน";
    setstrAge(Age);
    setCheckAge(years);
  };

  //-------------Upload FILE---------------//
  const [fileType, setFileType] = useState("png");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("ขนาดไฟล์ไม่เกิน 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = async (info) => {
    if (info.file.status === "uploading") {
      setLoadingUploadPic(true);
      return;
    }
    if (info.file.status === "done") {
      console.log("info", info);
      const type = info.file.type?.split("/")[1];
      if (type === "jpeg") {
        setFileType("jpg");
      } else {
        setFileType(type);
      }
      const formData = new FormData();
      formData.append(
        "my-image-file",
        info.file.originFileObj,
        info.file.originFileObj.name
      );
      setImage(formData);
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
        setLoadingUploadPic(false);
      });
    }
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
      setImageUrl();
    }, 1000);
  };
  //----------------------------------------------------//
  const Search = async (e) => {
    const FormData2 = frmOpen.getFieldValue();
    const FormData3 = frmSearch.getFieldValue();

    console.log("FormData3", FormData3);
    console.log("value", choice);

    if (FormData2.cid || FormData2.donor_no) {
      console.log("ifssssssss");

      try {
        const params = {
          cid: FormData2.cid,
          donor_no: FormData2.donor_no,
        };
        setBtn_loading(true);
        const result = await api.get("/Search_donor_list", { params });
        console.log("มาๆๆๆ", result.data[0]);

        setnewDonorlist(result.data[0]);
        await Fetch_Aumpure(result.data[0].chwpart, true);
        await Fetch_Tumbon(result.data[0].amppart);
        await Fetch_Aumpure_new(result.data[0].chwpart_new, true);
        await Fetch_Tumbon_new(result.data[0].amppart_new);

        // setstrAge(result.data[0].age);

        frmOpen.setFieldsValue({
          ...result.data[0],
          fname: result.data[0].fname.trim(),
          lname: result.data[0].lname.trim(),

          chwpart: result.data[0].chwpart
            ? Number(result.data[0].chwpart)
            : null,
          amppart: result.data[0]?.amppart
            ? Number(result.data[0]?.amppart)
            : null,
          tmbpart: result.data[0]?.tmbpart,

          chwpart_new: result.data[0].chwpart_new
            ? Number(result.data[0].chwpart_new)
            : null,
          amppart_new: result.data[0]?.amppart_new
            ? Number(result.data[0]?.amppart_new)
            : null,
          tmbpart_new: result.data[0]?.tmbpart_new,

          dob: moment(result.data[0].birthday),
          sex: result.data[0]?.sex,
          job: Number(result.data[0].job),
          age: frmOpen.strAge,
          marrystatus: Number(result.data[0].marrystatus),
          blood_rh: result.data[0].bloodgroup_rh,
          donor_phone: result.data[0].phone,
          donor_email: result.data[0].email,
          // fullname: result.data[0].fullname,
        });
        setCheckcid(result.data[0].cid);
        setCheckgroup("data");
        setCheckrh("data");
        setCheckpname("data");
        setCheckfname("data");
        setChecklname("data");
        setChecksex(result.data[0]?.sex);
        setCheckaddrpart("data");
        setCheckaddrpartNew("data");
        setCheckchwpart("data");
        setCheckchwpartNew("data");
        setCheckamppart("data");
        setCheckamppartNew("data");
        setChecktmbpart("data");
        setChecktmbpartNew("data");
        setCheckpostcode(result.data[0]?.postcode);
        setCheckpostcodeNew(result.data[0]?.postcode_new);
        setCheckAddMore(result.data[0]?.address_more);
        setCheckDonorNo(result.data[0]?.donor_no);
        setCheckdob(moment(result.data[0].birthday));
        setDOB(moment(result.data[0].birthday));
        setCheckEmail(result.data[0]?.email);
        setCheckTel(result.data[0]?.phone);

        console.log("new", result.data[0]?.addrpart_new);

        if (result.data[0]?.addrpart_new == null) {
          setCheckAddNow("");
          setCheckAddCard("");
        } else {
          const chw_new = newProvince.filter(
            (item) => item.PROVINCE_ID == result.data[0].chwpart_new
          );
          const ampure_new = newAmpure.filter(
            (item) => item.AMPHUR_ID == result.data[0].amppart_new
          );
          const tumbon_new = newTumbon.filter(
            (item) => item.DISTRICT_CODE == result.data[0].tmbpart_new
          );

          const addressNow = `บ้านเลขที่ ${
            result.data[0]?.addrpart_new
          } หมู่ที่ ${
            result.data[0]?.moopart_new === ""
              ? "-"
              : result.data[0]?.moopart_new
          } ถนน ${
            result.data[0]?.roadpart_new === ""
              ? "-"
              : result.data[0]?.roadpart_new
          } ซอย ${
            result.data[0]?.soipart_new === ""
              ? "-"
              : result.data[0]?.soipart_new
          } ตำบล ${tumbon_new[0].DISTRICT_NAME}อำเภอ ${
            ampure_new[0].AMPHUR_NAME
          }จังหวัด ${chw_new[0].PROVINCE_NAME}`;
          setCheckAddNow(addressNow);

          const chw = Province.filter(
            (item) => item.PROVINCE_ID == result.data[0]?.chwpart
          );
          const ampure = Ampure.filter(
            (item) => item.AMPHUR_ID == result.data[0]?.amppart
          );
          const tumbon = Tumbon.filter(
            (item) => item.DISTRICT_CODE == result.data[0]?.tmbpart
          );

          const addressCard = `บ้านเลขที่ ${result.data[0]?.addrpart} หมู่ที่ ${
            result.data[0]?.moopart === "" ? "-" : result.data[0]?.moopart
          } ถนน ${
            result.data[0]?.roadpart === "" ? "-" : result.data[0]?.roadpart
          } ซอย ${
            result.data[0]?.soipart === "" ? "-" : result.data[0]?.soipart
          } ตำบล ${tumbon[0].DISTRICT_NAME}อำเภอ ${
            ampure[0].AMPHUR_NAME
          }จังหวัด ${chw[0].PROVINCE_NAME}`;
          setCheckAddCard(addressCard);
        }
        Get_Donor_blood(result.data[0].donor_no);
      } catch (error) {
        Modal.error({ title: "ไม่พบข้อมูลผู้บริจาค" });
      }
      setBtn_loading(false);
    } else {
      console.log("else");
      setIsModalSearch(true);
    }
  };

  const SearchDetail = async (e) => {
    const FormData = frmSearch.getFieldValue();

    console.log("FormData3", FormData);
    console.log("value", choice);

    try {
      const params = {
        choice: choice,
        keyword: FormData.keyword,
      };
      setBtn_loading(true);
      const result = await api.get("/Search_donor_detail", { params });
      console.log("SearchDetail", result.data);

      setDataSearch(result.data);
    } catch (error) {
      Modal.error({ title: "ไม่พบข้อมูลผู้บริจาค" });
    }
    setBtn_loading(false);
  };

  const setData_frm = async (value) => {
    console.log("value", value);

    setnewDonorlist(value);
    await Fetch_Aumpure(value.chwpart, true);
    await Fetch_Tumbon(value.amppart);
    await Fetch_Aumpure_new(value.chwpart_new, true);
    await Fetch_Tumbon_new(value.amppart_new);

    setstrAge(value.age);

    frmOpen.setFieldsValue({
      ...value,
      fname: value.fname.trim(),
      lname: value.lname.trim(),
      chwpart: value.chwpart ? Number(value.chwpart) : null,
      amppart: value?.amppart ? Number(value?.amppart) : null,
      tmbpart: value?.tmbpart,

      chwpart_new: value.chwpart_new ? Number(value.chwpart_new) : null,
      amppart_new: value?.amppart_new ? Number(value?.amppart_new) : null,
      tmbpart_new: value?.tmbpart_new,

      dob: moment(value.birthday),
      sex: value?.sex,
      job: Number(value.job),
      age: frmOpen.strAge,
      marrystatus: Number(value.marrystatus),
      blood_rh: value.bloodgroup_rh,
      donor_phone: value.phone,
      donor_email: value.email,
      // fullname: result.data[0].fullname,
    });
    setCheckcid(value.cid);
    setCheckgroup("data");
    setCheckrh("data");
    setCheckpname("data");
    setCheckfname("data");
    setChecklname("data");
    setChecksex(value.sex);
    setCheckaddrpart("data");
    setCheckaddrpartNew("data");
    setCheckchwpart("data");
    setCheckchwpartNew("data");
    setCheckamppart("data");
    setCheckamppartNew("data");
    setChecktmbpart("data");
    setChecktmbpartNew("data");
    setCheckpostcode(value.postcode);
    setCheckpostcodeNew(value.postcode_new);
    setCheckAddMore(value.address_more);
    setCheckDonorNo(value.donor_no);
    setCheckdob(moment(value.birthday));
    setDOB(moment(value.birthday));
    setCheckEmail(value.email);
    setCheckTel(value.phone);

    if (value.addrpart_new == null) {
      setCheckAddNow("");
      setCheckAddCard("");
    } else {
      const chw_new = newProvince.filter(
        (item) => item.PROVINCE_ID == value.chwpart_new
      );
      const ampure_new = newAmpure.filter(
        (item) => item.AMPHUR_ID == value.amppart_new
      );
      const tumbon_new = newTumbon.filter(
        (item) => item.DISTRICT_CODE == value.tmbpart_new
      );
      console.log("tumbon_new", tumbon_new);

      const addressNow = `บ้านเลขที่ ${value.addrpart_new} หมู่ที่ ${
        value.moopart_new === "" ? "-" : value.moopart_new
      } ถนน ${value.roadpart_new === "" ? "-" : value.roadpart_new} ซอย ${
        value.soipart_new === "" ? "-" : value.soipart_new
      } ตำบล ${tumbon_new[0].DISTRICT_NAME}อำเภอ ${
        ampure_new[0].AMPHUR_NAME
      }จังหวัด ${chw_new[0].PROVINCE_NAME}`;

      setCheckAddNow(addressNow);

      const chw = Province.filter((item) => item.PROVINCE_ID == value.chwpart);
      const ampure = Ampure.filter((item) => item.AMPHUR_ID == value.amppart);
      const tumbon = Tumbon.filter(
        (item) => item.DISTRICT_CODE == value.tmbpart
      );

      const addressCard = `บ้านเลขที่ ${value.addrpart} หมู่ที่ ${
        value.moopart === "" ? "-" : value.moopart
      } ถนน ${value.roadpart === "" ? "-" : value.roadpart} ซอย ${
        value.soipart === "" ? "-" : value.soipart
      } ตำบล ${tumbon[0].DISTRICT_NAME}อำเภอ ${ampure[0].AMPHUR_NAME}จังหวัด ${
        chw[0].PROVINCE_NAME
      }`;
      setCheckAddNow(addressCard);
    }

    Get_Donor_blood(value.donor_no);
    setIsModalSearch(false);
  };

  const Reset = () => {
    setBtn_reset_loading(true);
    frmOpen.resetFields();
    setImageUrl();
    setnewDonorlist();
    setstrAge();
    setBtn_reset_loading(false);
    setCheckcid("");
    setCheckgroup("");
    setCheckrh("");
    setCheckpname("");
    setCheckfname("");
    setChecklname("");
    setCheckdob("");
    setChecksex("");
    setCheckaddrpart("");
    setCheckaddrpartNew("");
    setCheckchwpart("");
    setCheckchwpartNew("");
    setCheckamppart("");
    setCheckamppartNew("");
    setChecktmbpart("");
    setChecktmbpartNew("");
    setCheckpostcode("");
    setCheckpostcodeNew("");
    setCheckDonorNo("");
    setCheckAge("");
    setCheckTel("");
    setCheckEmail("");
    setCheckAddMore("");
    setCheckAddNow("");
    setCheckAddCard("");
  };
  const Get_Donor_blood = async (value) => {
    const result = await api.get("/Get_Donor_Blood", {
      params: {
        donor_no: value,
      },
    });
    const txt = result.data;
    setnewDonor_Blood(txt);
    if (result.data[0]?.sumday < 90) {
      //แต่งสวยๆ
      Modal.warning({
        title: "แจ้งเตือน ไม่ครบกำหนดบริจาคเลือด",
        content: (
          <div>
            <p>บริจาคครั้งล่าสุด วันที่ {result.data[0].donor_date}</p>
            <p>
              วันครบกำหนดบริจาคครั้งถัดไป วันที่ {result.data[0].to_donate_date}
            </p>
          </div>
        ),
      });
    }
  };

  const columns = [
    {
      title: "ครั้งที่",
      dataIndex: "donor_count",
      key: "donor_count",
    },
    {
      title: "เลขที่ถุงเลือด",
      dataIndex: "Unitnumber_dot",
      key: "Unitnumber_dot",
    },
    {
      title: "วันที่บริจาคเลือด",
      dataIndex: "donor_date",
      key: "donor_date",
    },
    {
      title: "สถานที่",
      dataIndex: "mobname",
      key: "mobname",
    },
    {
      title: "ถุง",
      dataIndex: "donor_type",
      key: "donor_type",
    },
    {
      title: "หมู่เลือด",
      dataIndex: "bag_gr",
      key: "bag_gr",
    },
    {
      title: "ผลการตรวจ",
      dataIndex: "blood_result",
      key: "blood_result",
    },
  ];

  const columnSearch = [
    {
      title: "#",
      dataIndex: "pid",
      key: "pid",
      align: "center",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "ชื่อ-นามสกุล",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "หมู่เลือด",
      dataIndex: "",
      key: "",
      align: "center",
      render: (text, record, index) => {
        return record.bloodgroup + record.bloodgroup_rh;
      },
    },
    {
      title: "เลขประจำตัวประชาชน",
      dataIndex: "cid",
      key: "cid",
      align: "center",
    },
    {
      title: "เลขประจำตัวผู้บริจาค",
      dataIndex: "donor_no",
      key: "donor_no",
      align: "center",
    },
    {
      title: "เบอร์โทร",
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
  ];
  return (
    <>
      <Layout keyTab="Donor_register">
        <Spin tip="Loading..." spinning={Spinloading} size="large">
          <Form form={frmOpen} Layout="horizontal">
            <div>
              <Head>
                <title>SIBSOFT : ลงทะเบียนผู้บริจาคเลือด</title>
                <meta property="og:title" content="My page title" key="title" />
              </Head>
            </div>
            <Row>
              <Col span={22} offset={1}>
                <Card span={24} style={{ marginTop: "17px" }}>
                  <Row style={{ marginTop: "-17px" }}>
                    <Col>
                      <h style={{ fontSize: "14px" }}>
                        ลงทะเบียนผู้บริจาคเลือด
                      </h>
                    </Col>
                  </Row>

                  <Row justify="start" style={{ marginTop: "18px" }}>
                    <Col span={5} style={{ marginTop: "5px" }}>
                      <Row justify="center">
                        <Col>
                          <Form.Item
                            name="image"
                            // style={{
                            //   marginLeft: "-20px",
                            //   marginTop: "15px",
                            // }}
                          >
                            <Upload
                              name="image"
                              listType="picture-card"
                              className="avatar-uploader"
                              showUploadList={false}
                              beforeUpload={beforeUpload}
                              onChange={handleChange}
                              customRequest={dummyRequest}
                            >
                              <Spin spinning={loadingUploadPic}>
                                {imageUrl ? (
                                  <Avatar
                                    src={imageUrl}
                                    alt="avatar"
                                    size={100}
                                  />
                                ) : (
                                  <div>
                                    <Tooltip
                                      placement="right"
                                      title="คลิกเพิ่มรูปภาพ"
                                    >
                                      <Avatar
                                        size={100}
                                        icon={
                                          <MdOutlineAddPhotoAlternate
                                            style={{
                                              marginBottom: "-4px",
                                            }}
                                          />
                                        }
                                        src={`${env.PATH_IMG}/image/${
                                          newDonorlist?.image
                                        }?pathType=2&date=${moment().format(
                                          "HHmmss"
                                        )}`}
                                      />
                                    </Tooltip>
                                    {loading}
                                  </div>
                                )}
                              </Spin>
                            </Upload>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row justify="center">
                        <Col style={{ marginTop: "-20px" }}>
                          <Form.Item
                            name="donor_no"
                            label="เลขประจำตัวผู้บริจาค"
                            style={{
                              display: "inline-block",
                              // width: "100%",
                            }}
                            rules={[{ required: false }]}
                          >
                            <Input
                              style={{
                                width: "100%",
                                // height: "40px",
                                fontSize: "14px",
                              }}
                              onChange={(e) => setCheckDonorNo(e.target.value)}
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row justify="center">
                        <Col style={{ marginTop: "-22px" }}>
                          <Form.Item
                            name="cid"
                            label="เลขประจำตัวประชาชน"
                            rules={[
                              {
                                required: true,
                                message: "กรุณากรอกข้อมูล !",
                              },
                            ]}
                            style={{
                              display: "inline-block",
                              // width: "100%",
                            }}
                          >
                            <Input
                              onKeyDown={({ target: { value }, keyCode }) => {
                                if (keyCode === 32) {
                                  Search();
                                }
                              }}
                              onChange={(e) => setCheckcid(e.target.value)}
                              style={{
                                width: "100%",
                                // height: "40px",
                                fontSize: "14px",
                              }}
                            />
                          </Form.Item>
                          {/* {console.log("newDonorlist",newDonorlist)} */}
                        </Col>
                      </Row>

                      <Row justify="center">
                        <Col style={{ marginTop: "-18px" }}>
                          <Tooltip
                            placement="right"
                            title="กรอกเลขประจำตัวผู้บริจาคหรือเลขประจำตัวประชาชนเพื่อตรวจสอบข้อมูล"
                          >
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
                              onClick={Search}
                              // htmlType="submit"
                              loading={Btn_loading}
                              size="small"
                            >
                              ค้นหา
                            </Button>
                          </Tooltip>
                          &nbsp;&nbsp;
                          <Button
                            onClick={Reset}
                            loading={Btn_reset_loading}
                            disabled={newDonorlist != "" ? false : true}
                            size="small"
                            style={{
                              fontSize: "12px",
                              height: "28px",
                              marginLeft: "5px",
                              backgroundColor:
                                newDonorlist != "" ? "orange" : "",
                              color: newDonorlist != "" ? "white" : "",
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
                          >
                            เริ่มใหม่
                          </Button>
                        </Col>
                      </Row>

                      <Row justify="center">
                        <Col style={{ marginTop: "-2px" }}>
                          <Row>
                            <Form.Item
                              label="หมู่ของกรุ๊ปเลือด"
                              name="bloodgroup"
                              rules={[
                                {
                                  required: true,
                                  message: "กรุณากรอกข้อมูล !",
                                },
                              ]}
                              style={{
                                display: "inline-block",
                              }}
                            >
                              <Select
                                onChange={(e) => setCheckgroup(e)}
                                placeholder="กรุ๊ปเลือด"
                                style={{ width: "80px%" }}
                              >
                                {newBloodgroup?.map((item) => (
                                  <Option
                                    key={item.blood_id}
                                    value={item.blood_name}
                                  >
                                    {item.blood_name}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                            &nbsp;
                            <Form.Item
                              label="RH"
                              name="blood_rh"
                              rules={[
                                {
                                  required: true,
                                  message: "กรุณากรอกข้อมูล !",
                                },
                              ]}
                              style={{
                                display: "inline-block",
                              }}
                            >
                              <Select
                                onChange={(e) => setCheckrh(e)}
                                placeholder="RH"
                                style={{ width: "100%" }}
                              >
                                {rhName?.map((item) => (
                                  <Option
                                    key={item.rh_id}
                                    value={item.rh_shot_name}
                                  >
                                    {item.rh_shot_name}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Row>
                        </Col>
                      </Row>
                    </Col>

                    <Col span={19}>
                      <Row style={{ marginTop: "-30px" }}>
                        <Col>
                          <Form.Item
                            name="pname"
                            label="คำนำหน้า"
                            rules={[
                              {
                                required: true,
                                message: "กรุณากรอกข้อมูล !",
                              },
                            ]}
                            style={{
                              marginRight: "5px",
                              width: "150px",
                            }}
                          >
                            <Select
                              onChange={(e) => setCheckpname(e)}
                              placeholder="เลือกคำนำหน้า"
                              style={{
                                width: "120px",
                                fontSize: "14px",
                              }}
                              dropdownMatchSelectWidth={false}
                              placement={"bottomLeft"}
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
                          &nbsp;{" "}
                        </Col>

                        <Col
                          style={{
                            marginLeft: "87px",
                            marginRight: "5px",
                          }}
                        >
                          <Form.Item
                            name="fname"
                            label="ชื่อ"
                            rules={[
                              {
                                required: true,
                                message: "กรุณากรอกข้อมูล !",
                              },
                            ]}
                          >
                            <Input
                              onChange={(e) => setCheckfname(e.target.value)}
                              placeholder="ชื่อจริง"
                              style={{
                                width: "175px",
                                fontSize: "14px",
                              }}
                            />
                          </Form.Item>
                          &nbsp;{" "}
                        </Col>

                        <Col
                          style={{
                            marginLeft: "5px",
                          }}
                        >
                          <Form.Item
                            name="lname"
                            label="นามสกุล"
                            rules={[
                              {
                                required: true,
                                message: "กรุณากรอกข้อมูล !",
                              },
                            ]}
                          >
                            <Input
                              onChange={(e) => setChecklname(e.target.value)}
                              placeholder="นามสกุล"
                              style={{
                                width: "175px",
                                fontSize: "14px",
                              }}
                            />
                          </Form.Item>
                          &nbsp;
                        </Col>
                      </Row>

                      <Row style={{ marginTop: "-40px" }}>
                        <Col
                          style={{
                            marginLeft: "40px",
                            marginRight: "5px",
                          }}
                        >
                          <Form.Item
                            name="pname_en"
                            label="Title"
                            rules={[{ required: false }]}
                          >
                            <Select
                              placeholder="PREFIX"
                              // size="large"
                              style={{ width: "120px" }}
                              dropdownMatchSelectWidth={false}
                              placement={"bottomLeft"}
                            >
                              {newPname.map((item) => (
                                <Option
                                  key={item.prefix_id_en}
                                  value={item.pname_en}
                                >
                                  {item.pname_en}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                          &nbsp;{" "}
                        </Col>

                        <Col>
                          <Form.Item
                            name="fname_en"
                            label="Name"
                            rules={[{ required: false }]}
                          >
                            <Input
                              placeholder="Name"
                              style={{
                                width: "175px",
                                fontSize: "14px",
                              }}
                            />
                          </Form.Item>
                          &nbsp;
                        </Col>

                        <Col
                          style={{
                            marginLeft: "8px",
                          }}
                        >
                          <Form.Item
                            name="lname_en"
                            label="Sername"
                            rules={[{ required: false }]}
                          >
                            <Input
                              placeholder="Sername"
                              style={{
                                width: "175px",
                                fontSize: "14px",
                              }}
                            />
                          </Form.Item>
                          &nbsp;
                        </Col>
                      </Row>

                      <Row style={{ marginTop: "-48px", marginLeft: "81px" }}>
                        <Col>
                          <Form.Item
                            name="dob"
                            label="วัน-เดือน-ปีเกิด"
                            rules={[
                              {
                                required: true,
                                message: "กรุณากรอกข้อมูล !",
                              },
                            ]}
                            style={{
                              display: "inline-block",
                              marginRight: "5px",
                              width: "120px",
                            }}
                          >
                            <DatePicker
                              onChange={setDOB}
                              format="DD-MM-YYYY"
                              // size="large"
                              locale={th_TH}
                            />
                          </Form.Item>
                        </Col>

                        <Col style={{ marginLeft: "25px" }}>
                          <Form.Item
                            label="อายุ"
                            style={{
                              display: "inline-block",
                              marginRight: "5px",
                            }}
                          >
                            <Input
                              placeholder="อายุ"
                              style={{
                                width: "143px",
                                // height: "40px",
                                fontSize: "14px",
                              }}
                              value={strAge}
                              disabled
                            />
                          </Form.Item>
                        </Col>

                        <Col style={{ marginLeft: "25px" }}>
                          <Form.Item
                            label="เพศ"
                            name="sex"
                            style={{
                              display: "inline-block",
                              width: "80px",
                              // margin: "0 8px",
                              marginRight: "5px",
                            }}
                            rules={[
                              {
                                required: true,
                                message: "กรุณากรอกข้อมูล !",
                              },
                            ]}
                          >
                            <Select
                              onChange={(e) => setChecksex(e)}
                              placeholder="เลือกเพศ"
                              // size="large"
                              style={{ fontSize: "14px", width: "100%" }}
                            >
                              {newSex.map((item) => (
                                <Option key={item.code} value={item.code}>
                                  {item.name}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>

                        <Col style={{ marginLeft: "29px" }}>
                          <Form.Item
                            label="สถานะ"
                            name="marrystatus"
                            rules={[{ required: false }]}
                            style={{
                              display: "inline-block",
                              // width: "calc(35% - 8px)",
                            }}
                          >
                            <Select
                              placeholder="เลือกสถานะ"
                              // size="large"
                              style={{ fontSize: "14px", width: "210px" }}
                              dropdownMatchSelectWidth={false}
                              placement={"bottomLeft"}
                            >
                              {newMary.map((item) => (
                                <Option
                                  key={item.status_id}
                                  value={item.status_id}
                                >
                                  {item.status_name}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row style={{ marginTop: "-18px", marginLeft: "33px" }}>
                        <Col>
                          <Form.Item
                            label="อาชีพ"
                            name="job"
                            rules={[{ required: false }]}
                          >
                            <Select
                              placeholder="เลือกอาชีพ"
                              dropdownMatchSelectWidth={false}
                              placement={"bottomLeft"}
                              style={{ width: "170px" }}
                            >
                              {newOccu.map((item) => (
                                <Option key={item.occu_id} value={item.occu_id}>
                                  {item.occu_name}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>

                        <Col style={{ marginLeft: "7px" }}>
                          <Form.Item
                            name="donor_phone"
                            label="เบอร์ติดต่อ"
                            rules={[{ required: false }]}
                          >
                            <Input
                              placeholder="โทรศัพท์"
                              style={{
                                width: "120px",
                                // height: "40px",
                                fontSize: "14px",
                              }}
                              onChange={(e) => setCheckTel(e.target.value)}
                            />
                          </Form.Item>
                        </Col>

                        <Col style={{ marginLeft: "12px" }}>
                          <Form.Item
                            type="email"
                            name="donor_email"
                            label="อีเมลล์"
                            rules={[{ required: false }]}
                          >
                            <Input
                              placeholder="Email"
                              style={{
                                width: "210px",
                                // height: "40px",
                                fontSize: "14px",
                              }}
                              onChange={(e) => setCheckEmail(e.target.value)}
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row style={{ marginTop: "-15px" }}>
                        <Col flex={2}>
                          <hr />
                        </Col>
                      </Row>

                      <Row style={{ marginTop: "-3px" }}>
                        <Col>
                          <b style={{ fontSize: "14px" }}>
                            ที่อยู่ตามบัตรประชาชน
                          </b>
                        </Col>
                      </Row>

                      <Row style={{ marginTop: "5px" }}>
                        <Col>
                          <Form.Item
                            name="addrpart"
                            label="บ้านเลขที่"
                            rules={[
                              {
                                required: true,
                                message: "กรุณากรอกข้อมูล !",
                              },
                            ]}
                          >
                            <Input
                              onChange={(e) => setCheckaddrpart(e.target.value)}
                              placeholder="บ้านเลขที่"
                              style={{
                                width: "50%",
                                fontSize: "14px",
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col
                          style={{
                            marginLeft: "-80px",
                          }}
                        >
                          <Form.Item
                            name="soipart"
                            label="ซอย"
                            rules={[{ required: false }]}
                          >
                            <Input
                              placeholder="ซอย"
                              style={{
                                width: "100px",
                                fontSize: "14px",
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col
                          style={{
                            marginLeft: "5px",
                          }}
                        >
                          <Form.Item
                            name="moopart"
                            label="หมู่"
                            rules={[{ required: false }]}
                          >
                            <Input
                              placeholder="หมู่"
                              style={{
                                width: "50%",
                                fontSize: "14px",
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col
                          style={{
                            marginLeft: "-80px",
                          }}
                        >
                          <Form.Item
                            name="roadpart"
                            label="ถนน"
                            rules={[{ required: false }]}
                          >
                            <Input
                              placeholder="ถนน"
                              style={{
                                width: "100%",
                                fontSize: "14px",
                              }}
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row style={{ marginTop: "-20px" }}>
                        <Col
                          style={{
                            marginLeft: "16px",
                          }}
                        >
                          <Form.Item
                            label="จังหวัด"
                            name="chwpart"
                            rules={[
                              {
                                required: true,
                                message: "กรุณากรอกข้อมูล !",
                              },
                            ]}
                          >
                            <Select
                              onChange={(value) => Fetch_Aumpure(value)}
                              style={{
                                width: "150px",
                                fontSize: "14px",
                              }}
                              dropdownMatchSelectWidth={false}
                              placement={"bottomLeft"}
                              // size="large"
                              placeholder="จังหวัด"
                            >
                              {Province.map((item) => (
                                <Option
                                  key={item.PROVINCE_ID}
                                  value={item.PROVINCE_ID}
                                >
                                  {item.PROVINCE_NAME}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>

                        <Col>
                          <Form.Item
                            label="อำเภอ"
                            name="amppart"
                            rules={[
                              {
                                required: true,
                                message: "กรุณากรอกข้อมูล !",
                              },
                            ]}
                          >
                            <Select
                              onChange={(value) => Fetch_Tumbon(value)}
                              style={{
                                width: "175px",
                                fontSize: "14px",
                              }}
                              dropdownMatchSelectWidth={false}
                              placement={"bottomLeft"}
                              placeholder="อำเภอ"
                            >
                              {Ampure?.map((item) => (
                                <Option
                                  key={item.AMPHUR_ID}
                                  value={item.AMPHUR_ID}
                                >
                                  {item.AMPHUR_NAME}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col>
                          <Form.Item
                            label="ตำบล"
                            name="tmbpart"
                            rules={[
                              {
                                required: true,
                                message: "กรุณากรอกข้อมูล !",
                              },
                            ]}
                          >
                            <Select
                              onChange={(value) => Fetch_Zip(value)}
                              style={{
                                width: "175px",
                                fontSize: "14px",
                              }}
                              dropdownMatchSelectWidth={false}
                              placement={"bottomLeft"}
                              placeholder="ตำบล"
                            >
                              {Tumbon.map((item) => (
                                <Option
                                  key={item.DISTRICT_CODE}
                                  value={item.DISTRICT_CODE}
                                >
                                  {item.DISTRICT_NAME}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col>
                          <Form.Item
                            label="ไปรษณีย์"
                            name="postcode"
                            rules={[
                              {
                                required: true,
                                message: "กรุณากรอกข้อมูล !",
                              },
                            ]}
                          >
                            <Input
                              onChange={(e) => setCheckpostcode(e.target.value)}
                              style={{
                                width: "80px",
                                fontSize: "14px",
                              }}
                              placeholder="ไปรษณีย์"
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row style={{ marginTop: "-30px" }}>
                        <Col flex={2}>
                          <b style={{ fontSize: "14px" }}>ที่อยู่ปัจจุบัน</b>
                        </Col>
                      </Row>

                      <Row style={{ marginTop: "5px" }}>
                        <Checkbox onChange={onCheckaddress}>
                          <Text style={{ fontSize: "12px" }} underline>
                            ใช้ที่อยู่ตามบัตรประชาชน
                          </Text>
                        </Checkbox>
                      </Row>

                      <Row style={{ marginTop: "5px" }}>
                        <Col>
                          <Form.Item
                            name="addrpart_new"
                            label="บ้านเลขที่"
                            rules={[
                              {
                                required: true,
                                message: "กรุณากรอกข้อมูล !",
                              },
                            ]}
                          >
                            <Input
                              onChange={(e) =>
                                setCheckaddrpartNew(e.target.value)
                              }
                              placeholder="บ้านเลขที่"
                              style={{
                                width: "50%",
                                fontSize: "14px",
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col
                          style={{
                            marginLeft: "-80px",
                          }}
                        >
                          <Form.Item
                            name="soipart_new"
                            label="ซอย"
                            rules={[{ required: false }]}
                          >
                            <Input
                              placeholder="ซอย"
                              style={{
                                width: "50%",
                                fontSize: "14px",
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col
                          style={{
                            marginLeft: "-80px",
                          }}
                        >
                          <Form.Item
                            name="moopart_new"
                            label="หมู่"
                            rules={[{ required: false }]}
                          >
                            <Input
                              placeholder="หมู่"
                              style={{
                                width: "50%",
                                fontSize: "14px",
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col
                          style={{
                            marginLeft: "-80px",
                          }}
                        >
                          <Form.Item
                            name="roadpart_new"
                            label="ถนน"
                            rules={[{ required: false }]}
                          >
                            <Input
                              placeholder="ถนน"
                              style={{
                                width: "100%",
                                fontSize: "14px",
                              }}
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row style={{ marginTop: "-20px" }}>
                        <Col
                          style={{
                            marginLeft: "16px",
                          }}
                        >
                          <Form.Item
                            label="จังหวัด"
                            name="chwpart_new"
                            rules={[
                              {
                                required: true,
                                message: "กรุณากรอกข้อมูล !",
                              },
                            ]}
                          >
                            <Select
                              onChange={(value) => Fetch_Aumpure_new(value)}
                              style={{
                                width: "150px",
                                fontSize: "14px",
                              }}
                              dropdownMatchSelectWidth={false}
                              placement={"bottomLeft"}
                              // size="large"
                              placeholder="จังหวัด"
                            >
                              {newProvince.map((item) => (
                                <Option
                                  key={item.PROVINCE_ID}
                                  value={item.PROVINCE_ID}
                                >
                                  {item.PROVINCE_NAME}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>

                        <Col>
                          <Form.Item
                            label="อำเภอ"
                            name="amppart_new"
                            rules={[
                              {
                                required: true,
                                message: "กรุณากรอกข้อมูล !",
                              },
                            ]}
                          >
                            <Select
                              onChange={(value) => Fetch_Tumbon_new(value)}
                              style={{
                                width: "175px",
                                fontSize: "14px",
                              }}
                              dropdownMatchSelectWidth={false}
                              placement={"bottomLeft"}
                              placeholder="อำเภอ"
                            >
                              {newAmpure?.map((item) => (
                                <Option
                                  key={item.AMPHUR_ID}
                                  value={item.AMPHUR_ID}
                                >
                                  {item.AMPHUR_NAME}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col>
                          <Form.Item
                            label="ตำบล"
                            name="tmbpart_new"
                            rules={[
                              {
                                required: true,
                                message: "กรุณากรอกข้อมูล !",
                              },
                            ]}
                          >
                            <Select
                              onChange={(value) => Fetch_Zip_new(value)}
                              style={{
                                width: "175px",
                                fontSize: "14px",
                              }}
                              dropdownMatchSelectWidth={false}
                              placement={"bottomLeft"}
                              placeholder="ตำบล"
                            >
                              {newTumbon.map((item) => (
                                <Option
                                  key={item.DISTRICT_CODE}
                                  value={item.DISTRICT_CODE}
                                >
                                  {item.DISTRICT_NAME}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col>
                          <Form.Item
                            label="ไปรษณีย์"
                            name="postcode_new"
                            rules={[
                              {
                                required: true,
                                message: "กรุณากรอกข้อมูล !",
                              },
                            ]}
                          >
                            <Input
                              onChange={(e) =>
                                setCheckpostcodeNew(e.target.value)
                              }
                              style={{
                                width: "80px",
                                fontSize: "14px",
                              }}
                              placeholder="ไปรษณีย์"
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row style={{ marginTop: "-20px" }}>
                        <Col span={22} style={{ marginLeft: "20px" }}>
                          <Form.Item
                            name="address_more"
                            label="เพิ่มเติม"
                            // name=""
                            //   rules={[{ required: true,message:'กรุณากรอกข้อมูล !' }]}
                          >
                            <TextArea showCount maxLength={100} />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row justify="end">
                        <Col flex={2}>
                          <Row justify="end">
                            <Tooltip
                              placement="right"
                              title={
                                !(
                                  checkcid &&
                                  checkgroup &&
                                  checkrh &&
                                  checkpname &&
                                  checkfname &&
                                  checklname &&
                                  checkdob &&
                                  checksex &&
                                  checkaddrpart &&
                                  checkaddrpartNew &&
                                  checkchwpart &&
                                  checkchwpartNew &&
                                  checkamppart &&
                                  checkamppartNew &&
                                  checktmbpart &&
                                  checktmbpartNew &&
                                  checkpostcode &&
                                  checkpostcodeNew
                                )
                                  ? "กรุณากรอกข้อมูลให้ครบถ้วน !!"
                                  : ""
                              }
                            >
                              <Button
                                disabled={
                                  !(
                                    checkcid &&
                                    checkgroup &&
                                    checkrh &&
                                    checkpname &&
                                    checkfname &&
                                    checklname &&
                                    checkdob &&
                                    checksex &&
                                    checkaddrpart &&
                                    checkaddrpartNew &&
                                    checkchwpart &&
                                    checkchwpartNew &&
                                    checkamppart &&
                                    checkamppartNew &&
                                    checktmbpart &&
                                    checktmbpartNew &&
                                    checkpostcode &&
                                    checkpostcodeNew
                                  )
                                }
                                type="primary"
                                htmlType="submit"
                                icon={
                                  <RiUserAddLine
                                    style={{
                                      color: !(
                                        checkcid &&
                                        checkgroup &&
                                        checkrh &&
                                        checkpname &&
                                        checkfname &&
                                        checklname &&
                                        checkdob &&
                                        checksex &&
                                        checkaddrpart &&
                                        checkaddrpartNew &&
                                        checkchwpart &&
                                        checkchwpartNew &&
                                        checkamppart &&
                                        checkamppartNew &&
                                        checktmbpart &&
                                        checktmbpartNew &&
                                        checkpostcode &&
                                        checkpostcodeNew
                                      )
                                        ? "gray"
                                        : "white",
                                    }}
                                  />
                                }
                                onClick={showModal}
                              >
                                &nbsp; ลงทะเบียน
                              </Button>
                            </Tooltip>
                            &nbsp; &nbsp;
                            <div ref={(el) => (printComponent = el)}>
                              <Print_Data
                                date_now={moment().format("DD/MM/YYYY")}
                                cid={checkcid}
                                donor_no={checkDonorNo}
                                age_year={checkAge}
                                birthday={moment(checkdob)
                                  .add(543, "year")
                                  .format("DD/MM/YYYY")}
                                sex={checksex}
                                donor_phone={checkTel}
                                donor_email={checkEmail}
                                address_more={checkAddMore}
                                addrpart_card={checkAddCard} //ที่อยู่ตามบัตร ปชช
                                addrpart_now={checkAddNow} //ที่อยู่ตามบัตร ปจบ
                                postCode_card={checkpostcode} //รหัสไปรษณีย์ ปชช
                                postCode_now={checkpostcodeNew} //รหัสไปรษณีย์ ปจบ
                              />
                            </div>
                            <ReactToPrint
                              trigger={() => (
                                <Button type="primary">พิมพ์ใบสมัคร</Button>
                              )}
                              content={() => printComponent}
                            />
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row style={{ marginTop: "-15px", marginLeft: "98px" }}>
                    <Col>
                      <b style={{ fontSize: "14px" }}>ประวัติการบริจาค</b>
                    </Col>
                  </Row>

                  <Row style={{ marginBottom: "20px" }} justify="center">
                    <Col span={20}>
                      <Table
                        dataSource={newDonor_Blood}
                        columns={columns}
                        size="small"
                        className="xm"
                        bordered
                      />
                    </Col>
                  </Row>

                  <Row style={{ marginLeft: "98px", marginTop: "-15px" }}>
                    <Col>
                      <Row justify="end">
                        <b style={{ fontSize: "12px" }}>
                          <Text underline>หมายเหตุ</Text>
                        </b>
                        &nbsp;
                        <Text type="danger" style={{ fontSize: "12px" }}>
                          ผลตรวจคือ Salne, Papian, Coombs, Anti-A, Anti-B และ
                          HBsAg, TPHA, HIV,HBA-NAT, ALT, HCV, HIVAg ตามลำดับ
                        </Text>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>

            {/* --------------------------------- */}

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
              {/* <Input value={password} onChange={(e) => setPassword(e.target.value)} /> */}
            </Modal>

            {/* ------------------------ */}

            <Modal
              visible={isModalSearch}
              onCancel={() => {
                setIsModalSearch(false);
              }}
              width={700}
              footer={false}
            >
              <Row>
                <h style={{ fontSize: "14px" }}>ค้นหา</h>
              </Row>
              <Form form={frmSearch}>
                <Row>
                  <Col span={9}>
                    <Form.Item
                      name="choice"
                      label="ตัวเลือก"
                      rules={[
                        {
                          required: true,
                          message: "กรุณากรอกข้อมูล !",
                        },
                      ]}
                    >
                      <Select
                        className="choice"
                        defaultValue="1"
                        onChange={(e) => setChoice(e)}
                        placeholder=" "
                        style={{
                          width: "175px",
                          fontSize: "12px",
                        }}
                        dropdownMatchSelectWidth={false}
                        placement={"bottomLeft"}
                      >
                        <Option key="1" value="1">
                          เลขประจำตัวประชาชน
                        </Option>
                        <Option key="2" value="2">
                          เลขประจำตัวผู้บริจาค
                        </Option>
                        <Option key="3" value="3">
                          ชื่อ - สกุล
                        </Option>
                        <Option key="4" value="4">
                          เบอร์โทร
                        </Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  &nbsp;&nbsp;
                  <Col span={6}>
                    <Form.Item
                      name="keyword"
                      label=""
                      rules={[
                        {
                          required: true,
                          message: "กรุณากรอกข้อมูล !",
                        },
                      ]}
                    >
                      <Input
                        onPressEnter={SearchDetail}
                        style={{
                          width: "150px",
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
                      loading={Btn_loading}
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

              {/* <Input value={password} onChange={(e) => setPassword(e.target.value)} /> */}
            </Modal>

            {/* ------------------------ */}
          </Form>
        </Spin>
      </Layout>
    </>
  );
};

export default Donor_register;

const Print_Data = ({
  donor_no,
  date_now,
  cid,
  addrpart_card,
  postCode_card,
  addrpart_now,
  postCode_now,
  address_more,
  birthday,
  sex,
  postcode,
  donor_phone,
  donor_email,
  age_year,
}) => {
  return (
    <div
      className="print"
      style={{
        backgroundColor: "white",
        //  border: "1px solid",
        // margin: "35px",
        width: "870px",
        height: "1237px",
        // paddingRight:"20px",
        // position: "fixed",
      }}
    >
      <Row
        justify="center"
        style={{
          height: "95px",
        }}
      ></Row>

      <Row
        style={{
          height: "45px",
        }}
      >
        <Col span={6} offset={18}>
          <p style={{ fontSize: "16px", marginLeft: "45px" }}>
            <b>{date_now}</b>
          </p>
        </Col>
      </Row>

      <Row style={{ height: "255px" }}></Row>

      <Row
        style={{
          marginLeft: "13px",
        }}
      >
        <Col offset={6}>
          <p
            style={{
              fontSize: "16px",
            }}
          >
            {cid === undefined ? "" : cid?.slice(0, 1)}{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {cid === undefined ? "" : cid?.slice(1, 2)} &nbsp;&nbsp;&nbsp;
            {cid === undefined ? "" : cid?.slice(2, 3)} &nbsp;&nbsp;&nbsp;
            {cid === undefined ? "" : cid?.slice(3, 4)} &nbsp;&nbsp;&nbsp;&nbsp;
            {cid === undefined ? "" : cid?.slice(4, 5)}{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {cid === undefined ? "" : cid?.slice(5, 6)} &nbsp;&nbsp;&nbsp;&nbsp;
            {cid === undefined ? "" : cid?.slice(7, 8)} &nbsp;&nbsp;&nbsp;&nbsp;
            {cid === undefined ? "" : cid?.slice(6, 7)} &nbsp;&nbsp;&nbsp;&nbsp;
            {cid === undefined ? "" : cid?.slice(8, 9)} &nbsp;&nbsp;&nbsp;&nbsp;
            {cid === undefined ? "" : cid?.slice(9, 10)}{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {cid === undefined ? "" : cid?.slice(10, 11)} &nbsp;&nbsp;&nbsp;
            {cid === undefined ? "" : cid?.slice(11, 12)}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {cid === undefined ? "" : cid?.slice(12, 13)}
          </p>
        </Col>
      </Row>

      <Row>
        <Col span={6} offset={5}>
          <p style={{ fontSize: "16px", marginLeft: "45px" }}>{donor_no}</p>
        </Col>
      </Row>

      <Row
        style={{
          height: "33px",
          marginLeft: "15px",
        }}
      >
        <Col span={4} offset={1}>
          <p style={{ fontSize: "16px", marginLeft: "72px" }}>
            {!birthday ? "" : birthday}
          </p>
        </Col>
        <Col span={4} offset={4}>
          <p style={{ fontSize: "16px", marginLeft: "72px" }}>{age_year}</p>
        </Col>
        <Col span={4} offset={1}>
          <p style={{ fontSize: "16px" }}>{sex == "1" ? "ชาย" : "หญิง"}</p>
        </Col>
      </Row>

      <Row
        style={{
          marginLeft: "20px",
          marginTop: "22px",
        }}
      >
        <Col>
          <p
            style={{
              fontSize: "16px",
            }}
          >
            {addrpart_now
              ? addrpart_now
              : addrpart_card
              ? addrpart_card
              : address_more}
          </p>
        </Col>
      </Row>

      <Row
        style={{
          marginTop: "-15px",
        }}
      >
        <Col span={4} offset={2}>
          <p style={{ fontSize: "16px", marginLeft: "45px" }}>
            {postCode_now ? postCode_now : postCode_card}
          </p>
        </Col>

        <Col span={5} offset={10}>
          <p style={{ fontSize: "16px", marginLeft: "10px" }}>
            {!donor_phone ? "" : `${donor_phone.slice(0, 3)}-`}
            {!donor_phone ? "" : `${donor_phone.slice(3, 6)}-`}
            {!donor_phone ? "" : donor_phone.slice(6, 10)}
          </p>
        </Col>
      </Row>
      <Row
        style={{
          marginTop: "-12px",
        }}
      >
        <Col span={4} offset={2}>
          <p style={{ fontSize: "16px", marginLeft: "65px" }}>
            {donor_email ? donor_email : " "}{" "}
          </p>
        </Col>
      </Row>
    </div>
  );
};

export async function getServerSideProps(context) {
  const computerName = os.hostname();
  return {
    props: { computerName }, // will be passed to the page component as props
  };
}
