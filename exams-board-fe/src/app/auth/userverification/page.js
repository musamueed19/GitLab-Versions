"use client";

import CodeVerification from "@/components/Forms/CodeVerification";
import { useState } from "react";
export default function UserVerificationCode() {
  const [verify, setVerify] = useState(false);
  const handleVerifyClick = () => {
    setVerify(true);
  };
  return verify ? (
    <SetPassword></SetPassword>
  ) : (
    <CodeVerification
      title={"User"}
      onVerify={handleVerifyClick}
    ></CodeVerification>
  );
}
