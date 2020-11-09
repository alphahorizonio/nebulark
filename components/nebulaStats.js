import React from "react";
import Stats from "./stats";
import Ion from "./ion";
import styled from "styled-components";

const Wrapper = styled.section`
  position: relative;
  margin-top: 70px;
  margin-left: 14px;
`;

const Div = styled.div`
  margin-left: 1px;
  display: flex;
  flex-direction: column;
`;

function NebulaStats() {
  return (
    <>
      <Wrapper>
        <h1>NebulaStats</h1>
        <Stats />
        <Div>
        <Ion ionName="John's Phone" ionStatus={true} />
        </Div>
        
      </Wrapper>
    </>
  );
}

export default NebulaStats;
