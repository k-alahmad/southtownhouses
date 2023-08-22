import React from "react";
import Button from "../../../../../components/UI/Button";
import HeaderTextSlider from "./HeaderTextSlider";
import { data } from "../../../../../data/headerData";
import headerWaveRight from "../../../../../assets/images/headerWaveRight.svg";
import { handleScroll } from "../../../../../helpers/scroll";
import { useTranslation } from "react-i18next";
const HeaderT3 = () => {
  const headerData = data.find((d) => d.template == 3);
  const { t } = useTranslation();
  return (
    <>
      <div
        className="bg-primary h-[400px] relative bg-no-repeat bg-right bg-contain z-10"
        style={{
          backgroundImage: `url(${headerWaveRight})`,
        }}
      >
        <div
          style={{ backgroundImage: `url(${headerData.HeroBottom})` }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-24 h-[500px] w-[90%] md:w-[80%] xl:w-[60%] rounded-md bg-center bg-no-repeat bg-cover "
        >
          <div className="flex flex-col justify-evenly items-center w-full h-full bg-black/40 rounded-md">
            <HeaderTextSlider />
            <Button
              text={t("register")}
              bgColor={"bg-third"}
              BR={6}
              customStyle={"hover:bg-secondary animate-pulse"}
              onClick={() => handleScroll("contactus")}
              textColor={"text-primary"}
              w={"170px"}
              h={"50px"}
            />
          </div>
        </div>
      </div>
      <div className="h-48" />
    </>
  );
};

export default HeaderT3;
