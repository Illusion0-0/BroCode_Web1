import SideBar from "../components/SideBar";
import MainBody from "../components/MainBody";
import NoteProvider from "../providers/NoteProvider";
export default function Dashboard() {
  return (
    <NoteProvider>
      <div className="dashboard">
        <SideBar />
        <MainBody />
      </div>
    </NoteProvider>
  );
}
