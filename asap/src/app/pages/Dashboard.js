import { Outlet } from "react-router-dom";
import { MainLayout, MainTheme } from "../components";
import { SettingsProvider } from "../context/SettingsContext";

export default function Dashboard() {
  return (
    <SettingsProvider>
      <MainTheme>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </MainTheme>
    </SettingsProvider>
  );
}
