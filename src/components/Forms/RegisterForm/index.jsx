import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { useDispatch, useSelector } from "react-redux";
import { MdMail, MdPerson } from "react-icons/md";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { data as brochureData } from "../../../data/brochureData";
import {
  hideModal,
  register,
  counterIsFull,
  selectDownloadState,
  selectRegisterState,
  selectListRegisterState,
} from "../../../redux/modal.slice";
import { useTranslation } from "react-i18next";
import { systemSettings } from "../../../settings";
const CustomInput = ({
  icon,
  placeholder,
  type,
  name,
  id,
  value,
  onChange,
  errorMessage,
  error,
}) => {
  return (
    <div className="py-3 px-4">
      <div className="border-b-[1px] border-primary  flex">
        {icon}
        <input
          type={type}
          className="bg-transparent px-2 w-full outline-none"
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          id={id}
          value={value}
        />
      </div>
      {error && (
        <p className="text-red-600 text-tiny font-semibold">{errorMessage}</p>
      )}
    </div>
  );
};
const RegisterForm = () => {
  const brochure = brochureData.find(
    (d) => d.template == systemSettings.brochure.template
  );
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useRef();
  const downloadState = useSelector(selectDownloadState);
  const registerState = useSelector(selectRegisterState);
  const listRegister = useSelector(selectListRegisterState);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_5wdnu6j",
        "template_slqqcpm",
        form.current,
        "sxh5TJan60LQqD6Sw"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData(form.current);
    console.log(listRegister);

    try {
      let sameEmail = listRegister.find((element) => {
        return element.email == form.current.email.value;
      });
      let samePhone = listRegister.find((element) => {
        return element.phone == form.current.phone.value;
      });
      if (!sameEmail && !samePhone) {
        const response = await fetch(import.meta.env.VITE_ZAPPIER_URL, {
          method: "POST",
          body: formData,
          "Content-Type": "multipart/form-data",
        });
        const result = response.json();
        console.log("Success:", result);
        sendEmail(e);
        if (downloadState) {
          let alink = document.createElement("a");
          alink.href = brochure.file;
          alink.download = "BrochurePdf.pdf";
          alink.click();
        }
        dispatch(
          register({
            email: form.current.email.value,
            phoneNo: form.current.phone.value,
          })
        );
        dispatch(counterIsFull());
        dispatch(hideModal());
        navigate("/thankyou");
      } else {
        alert("We Already Have a registration with this data");
      }
    } catch (error) {
      console.error("Error here:", error);
    }
  };

  return (
    <form
      ref={form}
      onSubmit={handleSubmit}
      className="flex flex-col justify-between items-stretch h-full space-y-8"
    >
      <CustomInput
        icon={<MdPerson className="text-primary text-big" />}
        placeholder={t("formFullName")}
        type="text"
        name="fullName"
        id="fullName"
        value={fullName}
        onChange={(event) => setFullName(event.target.value)}
      />

      <CustomInput
        icon={<MdMail className="text-primary text-big" />}
        placeholder={t("formEmail")}
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
          let EmailRegExp;
          EmailRegExp = new RegExp(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(event.target.value);

          console.log(emailError);
          if (!EmailRegExp) {
            setEmailError(true);
          } else {
            setEmailError(false);
          }
        }}
        error={emailError}
        errorMessage={"please enter a valid email"}
      />
      <input
        type="text"
        className="hidden"
        name={"project"}
        value="Dubai South Project"
        readOnly
      />
      <PhoneInput
        country={"ae"}
        placeholder={t("formPhoneNumber")}
        enableSearch={true}
        inputProps={{
          name: "phone",
          id: "phone",
          required: true,
        }}
        onChange={setPhone}
        containerClass="!border-b-[1px] border-primary px-1 flex "
        inputClass={`!bg-transparent !w-full !text-lg !text-primary !h-full !border-none  ${
          i18n.language == "en" ? "px-0" : "mx-10"
        } !outline-none`}
        buttonClass={`!border-none !text-lg`}
        buttonStyle={{ direction: "ltr" }}
        inputStyle={{
          direction: "ltr",
        }}
        isValid={(value, country) => {
          if (value.match(/^\+?[1-9][0-9]{7,14}$/)) {
            setPhoneError(false);
            return true;
          } else {
            setPhoneError(true);
            return "Invalid Phone Number";
          }
        }}
      />
      <button
        className={`${"bg-primary"} text-white text-small w-full py-4 disabled:bg-fourth/60`}
        disabled={emailError || fullName.replace(/ /g, "") == "" || phoneError}
      >
        {t("register")}
      </button>
    </form>
  );
};

export default RegisterForm;
