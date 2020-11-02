import React from "react";
import styled from "styled-components";

function Header({ nebulaID }) {
  const Nebula = styled.h1`
    font-size: 20px;
  `;

  const Divider = styled.hr`
    background-color: #404240;
    height: 5px;
    border: none;
    border-radius: 2px;
  `;

  const Category = styled.h1`
    font-size: 20px;
    text-align: right;
  `;
  return (
    <>
      <Nebula> nebulark / {nebulaID}</Nebula>
      <Category>Setup</Category>
      <Divider />
    </>
  );
}

export default Header;
