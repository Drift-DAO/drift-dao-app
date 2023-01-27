import React from "react";
import AreaChart from "./AreaChart";
import DoughnutChart from "./DoughnutChart";
import SimpleBar from "simplebar-react";

const MainAnalytics = () => {
  return (
    <SimpleBar className="" style={{ maxHeight: "88vh" }}>
      <div className="flex justify-center">
        <div className="" style={{ width: "50vw" }}>
          <AreaChart />
          <DoughnutChart />
        </div>
      </div>
    </SimpleBar>
  );
};

export default MainAnalytics;
