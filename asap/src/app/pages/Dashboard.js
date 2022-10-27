import { Suspense } from "react";
import { Helmet } from "react-helmet";

import { MainLayout, MainTheme } from "../components";
import SuspenseCircle from "../components/SuspenseCircle";

import { SettingsProvider } from "../context/SettingsContext";

export default function Dashboard() {
  return (
    <>
      <Helmet>
        <title>Tablero - ASAP</title>
        <meta name="Tablero" content="Tablero de administración" />
      </Helmet>
      <SettingsProvider>
        <Suspense fallback={<SuspenseCircle />}>
          <MainTheme>
            <MainLayout></MainLayout>
          </MainTheme>
        </Suspense>
      </SettingsProvider>
    </>
  );
}
