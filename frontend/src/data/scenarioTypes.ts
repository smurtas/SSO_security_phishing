export type ScenarioCategory =
  | "baseline"
  | "fake_idp"
  | "oauth_consent"
  | "redirect"
  | "oidc_confusion"
  | "saml"
  | "email";

export type ScenarioProtocol =
  | "OAuth"
  | "OIDC"
  | "SAML"
  | "Email→OAuth"
  | "Email→OIDC"
  | "Email→SSO";

export type ScenarioClassification =
  | "legitimate"
  | "suspicious"
  | "malicious";

export type ScenarioType =
  | "full-flow"
  | "single-page";

export type ScenarioSteps =
  |{
    type: "classroom-entry";
    serviceName: string;
    actionLabel: string;

  }
  |{
    type: "google-account-chooser";
    domain: string;
    email: string;
  }
  |{
    type: "google-psw";
    domain:string;
    email: string;
  }
  |{
    type: "oauth-consent";
    domain:string;
    appName: string;
    permission: string[];
    publicher?: string;
  }
  |{
    type: "mfa-request";
    domain: string;
    message: string;
  }
  |{
    type: "browser-page";
    domain:string;
    heading: string;
    body: string;
  };
  

export interface Scenario {
  id: string;
  category: ScenarioCategory;
  protocol: ScenarioProtocol;
  title: string;
  instruction: string;
  expectedAnswer: ScenarioClassification;
  difficultyLevel: 1 | 2 | 3 | 4 | 5;
  type: ScenarioType;
  steps: ScenarioSteps[];
}

export interface ScenarioResponse {
  scenarioId: string;
  shownOrder: number;
  answer: ScenarioClassification;
  expectedAnswer: ScenarioClassification;
  isCorrect: boolean;
  confidence: number;
  reactionTimeMs: number;
  explanation: string;
  answeredAt: string;
}

