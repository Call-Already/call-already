import { Paper, Text, Group, CloseButton } from "@mantine/core";
import { useEffect } from "react";
import { palette } from "../styles";

const color = palette.primary[800];

interface SuccessBannerProps extends React.HTMLAttributes<HTMLElement> {
  message: string;
  onClose: () => void;
}

export type MessageObject = {
  [key: string]: any;
};

export const SuccessBanner: React.FC<SuccessBannerProps> = ({
  message,
  onClose,
}) => {
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToTop();
  }, [message]);

  return (
    <div
      style={{
        border: `1px solid ${color}`,
        background: "white",
        padding: "1em",
        borderRadius: "3px",
        margin: "0 auto 0 auto",
        boxShadow: `3px 3px ${color}`,
      }}
    >
      <div style={{ display: "flex", gap: "0.5em", alignItems: "center" }}>
        <CloseButton
          style={{ color: `${color}` }}
          mr={-6}
          onClick={() => onClose()}
        />
        <Text
          style={{ color: `${color}`, textAlign: "center" }}
          fz="sm"
          fw={500}
        >
          {message}
        </Text>
      </div>
    </div>
  );
};
