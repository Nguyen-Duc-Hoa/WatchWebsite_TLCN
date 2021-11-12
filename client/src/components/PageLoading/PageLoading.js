import React from "react";
import "./PageLoading.scss";

export default function PageLoading() {
  return (
    <div className='page-loading'>
      <div class="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
