interface ProgressStepsProps {
  currentStep: number;
}

const steps = [
  "Introduzione",
  "Consenso",
  "Profilazione",
  "Istruzioni",
];

export function ProgressSteps({
  currentStep,
}: ProgressStepsProps) {
  return (
    <ol className="progress-steps" aria-label="Avanzamento">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCurrent = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <li
            key={step}
            className={[
              "progress-step",
              isCurrent ? "progress-step--current" : "",
              isCompleted ? "progress-step--completed" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-current={isCurrent ? "step" : undefined}
          >
            <span className="progress-step__number">
              {stepNumber}
            </span>
            <span>{step}</span>
          </li>
        );
      })}
    </ol>
  );
}