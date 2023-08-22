import React, { lazy } from "react";
import Slider from "react-slick";
import { systemSettings } from "../../../../../settings";
import { data } from "../../../../../data/floorData";
import { useTranslation } from "react-i18next";
import { FaDownload } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  downloadBrochure,
  selectRegisterState,
  showModal,
} from "../../../../../redux/modal.slice";
import Register from "../../../../../components/UI/Register";
import { data as brochureData } from "../../../../../data/brochureData";
import { useLocation } from "react-router-dom";
const FloorPlanInfoSlider = ({ sliderRef, selected }) => {
  const brochure = brochureData.find(
    (d) => d.template == systemSettings.brochure.template
  );
  const floorData = data.find((d) => d.template == 3);
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();
  const registerState = useSelector(selectRegisterState);
  const location = useLocation();
  return (
    <div className="flex flex-col justify-center items-center">
      <Slider
        ref={sliderRef}
        dots={false}
        infinite={false}
        speed={300}
        centerMode
        slidesToScroll={1}
        slidesToShow={1}
        vertical={true}
        touchMove={false}
        arrows={false}
        className="w-[270px] h-full"
      >
        {floorData.floors.map((item, index) => {
          return (
            <div
              key={index}
              dir={
                i18n.language == "ar" || i18n.language == "fa" ? "rtl" : "ltr"
              }
              className={`${
                selected == index ? "scale-100" : "scale-0"
              } h-[300px] xl:h-[300px] flex flex-col justify-center items-center space-y-8`}
            >
              <p className="font-semibold text-big">
                {
                  item.title.find(
                    (x) => x.lng == location.pathname.substring(1)
                  )?.value
                }
              </p>
              <p className="font-semibold text-small">
                Plot: <span className="font-extralight">{item.plot}</span>
              </p>
              <p className="font-semibold text-small">
                BUA: <span className="font-extralight">{item.total}</span>
              </p>
              <div className="flex flex-col space-y-8">
                <button
                  className="bg-primary rounded  text-white shadow-lg drop-shadow-lg flex items-center justify-center py-2 font-semibold"
                  onClick={() => {
                    if (registerState) {
                      let alink = document.createElement("a");
                      alink.href = brochure.file;
                      alink.download = "BrochurePdf.pdf";
                      alink.click();
                    } else {
                      dispatch(downloadBrochure());
                      systemSettings.registerModal.status &&
                        dispatch(
                          showModal({ data: <Register modal={true} /> })
                        );
                    }
                  }}
                >
                  <FaDownload className="text-med" />
                  <p className="text-small px-2">{t("brochurDownload")}</p>
                </button>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default FloorPlanInfoSlider;
