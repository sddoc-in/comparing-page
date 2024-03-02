import React from 'react'
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color:  rgb(156, 39, 176);
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
`;
export default function Loading() {
    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full blur-sm bg-white bg-opacity-25 z-100 flex justify-center items-center">
            </div>
            <div className='fixed w-full h-full' style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-2%,-10%)'
            }}>
                <HashLoader
                    color={'#7F7FD5'} css={override} size={80} margin={10} speedMultiplier={2} />
            </div>
        </>
    );
}