import React, { useState } from "react";
import styled from "styled-components";
import { StyledTimeButton, theme } from "../styles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  isDaytime: boolean;
}

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
    <StyledTimeButton $daytime={isDaytime} {...props}>
      {icon}
      <span>  </span>
      {title}
    </StyledTimeButton>
  );
};
