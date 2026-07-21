import type { Scenario } from "../data/scenarioTypes";

export function selectExperimentScenarios(
  scenarios: readonly Scenario[],
  numberOfScenarios = 30,
): Scenario[] {
  const shuffledScenarios = [...scenarios];

  for (
    let index = shuffledScenarios.length - 1;
    index > 0;
    index -= 1
  ) {
    const randomIndex = Math.floor(
      Math.random() * (index + 1),
    );

    [shuffledScenarios[index], shuffledScenarios[randomIndex]] = [
      shuffledScenarios[randomIndex],
      shuffledScenarios[index],
    ];
  }

  return shuffledScenarios.slice(0, numberOfScenarios);
}