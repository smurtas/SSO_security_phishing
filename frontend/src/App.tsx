import { Route, Routes } from "react-router";
import { AppLayout } from "./components/AppLayout";
import { ConsentPage } from "./pages/ConsentPage";
import { EduHubPage } from "./pages/EduHubPage";
import { ExperimentPage } from "./pages/ExperimentPage";
import { InstructionPage } from "./pages/InstructionPage";
import { LandingPage } from "./pages/LandingPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ParticipantPage } from "./pages/ParticipantPage";
import { ResultsPage } from "./pages/ResultsPage";
import { GoogleLoginPage } from "./pages/GoogleLoginPage";
import { MicrosoftLoginPage } from "./pages/MicrosoftLoginPage";
import { TeamsPage } from "./pages/TeamsPage";
import "./App.css";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/consent" element={<ConsentPage />} />
        <Route path="/participant" element={<ParticipantPage />} />
        <Route path="/instructions" element={<InstructionPage />} />
        <Route path="/edu-hub" element={<EduHubPage />} />
        <Route path="/experiment" element={<ExperimentPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/google-login" element={<GoogleLoginPage />} />
        <Route path="/microsoft-login" element={<MicrosoftLoginPage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </AppLayout>
  );
}

export default App;