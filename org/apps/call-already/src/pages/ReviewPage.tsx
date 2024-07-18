import React from "react";
import { postResponses } from "../gateways";

export function ReviewPage() {

  async function onChange() {
    const serverResponse = await postResponses();
    console.log(serverResponse);
  };

  return (
    <>
      <h1>This is the Review page</h1>
      <button onClick={onChange}>Confirm call</button>
    </>
  );
}
