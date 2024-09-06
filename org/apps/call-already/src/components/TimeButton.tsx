import React from "react";
import styled from "styled-components";
import { theme } from "../styles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  isDaytime: boolean;
}

export const StyledTimeButton = styled.button<{ $daytime?: boolean }>`
  background: ${theme.time.background};
  color: ${theme.time.text};
  box-shadow: 3px 3px ${theme.time.boxShadow};

  width: 6em;
  height: 2em;

  font-size: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  border: none;

  margin-bottom: 2px;

  &:hover,
  &:focus {
    background: ${theme.primary.active};
  }
  &:active {
    background: ${theme.primary.active};
  }
`;

export const TimeButton: React.FC<ButtonProps> = ({
  title,
  isDaytime,
  ...props
}) => {
  const icon = isDaytime ? (
    <i className="fa-solid fa-sun"></i>
  ) : (
    <i className="fa-solid fa-moon"></i>
  );
  return (
    <StyledTimeButton {...props}>
      {icon}
      {title}
    </StyledTimeButton>
  );
};
