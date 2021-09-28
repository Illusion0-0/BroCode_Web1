import SideBar from "../components/SideBar";
import MainBody from "../components/MainBody";
import React from "react";
export default function Dashboard() {
  return (
    <div className="notedash">
      <SideBar />
      <MainBody />
    </div>
  );
}
