import React from "react";

import UpdateEmployerForm from "../components/UpdateEmployerForm";

const UpdateEmployer = () => {
  return (
    <div className="flex w-full min-h-screen bg-slate-800">
      <div className="w-full flex items-center justify-center">
        <UpdateEmployerForm />
      </div>
    </div>
  );
};

export default UpdateEmployer;
