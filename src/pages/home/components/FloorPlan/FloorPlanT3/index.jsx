import React, { useRef, useState } from "react";
import FloorPlanImageSlider from "./FloorPlanImageSlider";
import FloorPlanNavigator from "./FloorPlanNavigator";
import FloorPlanInfoSlider from "./FloorPlanInfoSlider";
import { useLocation } from "react-router-dom";
import { data } from "../../../../../data/floorData";
const FloorPlanT3 = () => {
  const floorData = data.find((x) => x.template == 3);

  const [selected, setSelected] = useState(0);
  const sliderRef = useRef();
  const sliderRef2 = useRef();
  const sliderRef3 = useRef();
  const location = useLocation();
  return (
    <>
      <div className="font-bold text-big md:text-huge uppercase text-center  drop-shadow-2xl pb-6 text-white">
        {
          floorData.title.find((x) => x.lng == location.pathname.substring(1))
            ?.value
        }
      </div>
      <div className="lg:grid lg:grid-cols-12 my-12">
        <div className="col-span-8 bg-secondary hidden lg:block lg:relative">
          <div className="absolute w-full h-ful -top-16">
            <FloorPlanImageSlider selected={selected} sliderRef={sliderRef2} />
          </div>
        </div>
        <div className="col-span-4 bg-white space-y-3 lg:space-y-12 ">
          <div className="lg:hidden max-lg:-mt-6 bg-secondary relative">
            <div className="absolute bottom-0 right-0 w-0 h-0 bg-transparent border-solid border-t-[100px] border-r-[100px] border-l-transparent border-r-transparent border-t-white z-10 rotate-180" />

            <FloorPlanImageSlider selected={selected} sliderRef={sliderRef3} />
          </div>
          <div className="flex max-md:flex-col lg:flex-col justify-evenly items-center">
            <FloorPlanNavigator
              selected={selected}
              setSelected={setSelected}
              sliderRef={sliderRef}
              sliderRef2={sliderRef2}
              sliderRef3={sliderRef3}
            />
            <FloorPlanInfoSlider selected={selected} sliderRef={sliderRef} />
          </div>
        </div>
      </div>
    </>
  );
};

export default FloorPlanT3;
