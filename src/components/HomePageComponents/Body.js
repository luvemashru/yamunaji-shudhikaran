import React from "react";
import BodyLeft from "./BodyLeft";
import BodyRight from "./BodyRight";

export default function HomeBody() {
    return (
    <div className="grid f-ht">
        <div className="col-12 md:col-6 lg:col-6">
        <BodyLeft />
        </div>
        <div className="col-12 md:col-6 lg:col-6">
        <BodyRight />
        </div>
    </div>
  );
}
