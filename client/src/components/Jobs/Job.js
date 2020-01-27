import React from "react";

export default function Jobs({ job }) {
  return (
    <div className={"job"}>
      {job.title}
      {job.company}
    </div>
  );
}
