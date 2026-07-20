import { Suspense, lazy } from "react";
import LoadingScreen from "@/components/LoadingScreen";

const DissertationPage = lazy(() => import("@/components/DissertationPage"));

export default function App() {
  return (
    <>
      <LoadingScreen />
      <Suspense fallback={<div className="min-h-screen bg-paperBg" />}>
        <DissertationPage />
      </Suspense>
    </>
  );
}
