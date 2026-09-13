import type { Scenario } from "../data/scenarioTypes";
import { BrowserMockup } from "./BrowserMockup";
import { MfaMockup } from "./MfaMockup";
import EmailScenarioContainer from "./EmailScenarioContainer";

interface ScenarioVisualProps {
  scenario: Scenario;
}

export function ScenarioVisual({
  scenario,
}: ScenarioVisualProps) {
  if (scenario.category === "email") {
  return <EmailScenarioContainer scenarioId={scenario.id} />;
}
  switch (scenario.id) {
    case "UC03":
      return (
        <BrowserMockup
          domain="accounts.google.com"
          secure
          provider="google"
        />
      );

    case "UC08":
      return (
        <BrowserMockup
          domain="accounts-google-auth.com"
          secure={false}
          provider="google"
        />
      );

    case "UC10":
      return <MfaMockup />;

    default:
      return (
        <div className="scenario-placeholder">
          <p>{scenario.instruction}</p>
        </div>
      );
  }
}