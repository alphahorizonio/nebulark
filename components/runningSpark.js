import React, { useRef, useState } from "react";
import styled from "styled-components";

function RunningSpark() {
  const sparkName = "my-spark-1";
  const ionNumber = 4;

  const Wrapper = styled.section`
    ul {
      display: flex;
      list-style-type: none;
      justify-content: space-between;
    }
    button {
      background-color: red;
      border-radius: 2px;
      border: none;
      width: 80px;
      height: 20px;
      color: white;
    }
  `;

  const Divider = styled.hr`
    background-color: #404040;
    height: 3px;
    border: none;
    border-radius: 2px;
  `;

  const AccordionWrapper = styled.section`
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
  `;

  const Accordion__section = styled.div`
    display: flex;
    flex-direction: column;
  `;

  const Accordion__button = styled.button`
    background-color: red;
    border-radius: 2px;
    border: none;
    width: 80px;
    height: 20px;
    color: white;
  `;

  const content = useRef(null);

  function cancelSpark(e) {
    console.log("OK");
  }

  return (
    <>
      <Wrapper>
        <ul>
          <li>loadingbar</li>
          <li>{sparkName}</li>
          <li>{ionNumber} Ions</li>
          <li>7 mins</li>
          <li>
            <AccordionWrapper>
              <Accordion__section>
                <Accordion__button
                  onClick={(e) => {
                    if (
                      window.confirm(
                        `Are your sure you want to cancel spark ${sparkName}?`
                      )
                    )
                      cancelSpark(e);
                  }}
                >
                  Cancel
                </Accordion__button>
              </Accordion__section>
            </AccordionWrapper>
          </li>
        </ul>
      </Wrapper>
      <Divider />
    </>
  );
}

export default RunningSpark;
