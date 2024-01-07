import React, { useState } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

export function usePasswordToggle() {
  const [visibile, setVisible] = useState(false);

  const Icon = visibile ? <EyeOutlined /> : <EyeInvisibleOutlined />;
  const InputType = visibile ? "text" : "password";

  const toggleVisibility = () => {
    setVisible(!visibile);
  };

  return { InputType, Icon, toggleVisibility };
}
