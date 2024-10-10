import { Paper, Text, Group, CloseButton } from "@mantine/core";
import { useEffect } from "react";

interface BannerProps extends React.HTMLAttributes<HTMLElement> {
  message: string;
  onClose: () => void;
}

export type ErrorObject = {
  [key: string]: any;
};

export const Banner: React.FC<BannerProps> = ({ message, onClose }) => {
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
        border: "1px solid red",
        padding: "1em",
        background: "white",
        borderRadius: "3px",
        margin: "0 auto 0 auto",
        boxShadow: "3px 3px red",
      }}
    >
      <div style={{ display: "flex", gap: "0.5em", alignItems: "center" }}>
        <CloseButton
          style={{ color: "red" }}
          mr={-6}
          onClick={() => onClose()}
        />
        <Text style={{ color: "red", textAlign: "center" }} fz="sm" fw={500}>
          {message}
        </Text>
      </div>
    </div>
  );
};
