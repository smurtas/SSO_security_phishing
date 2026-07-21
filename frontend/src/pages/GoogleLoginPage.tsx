import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router";
import googleLogo from "../assets/logoG_google.png";

export function GoogleLoginPage() {
    const navigate = useNavigate();
    const [step, setStep] = useState<"email" | "password">("email");
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        if (step === "email") {
            setStep("password");

            return;
        }
        /*passo la mail alla pagina successiva*/
        const normEmail = email.trim();
        sessionStorage.setItem("autenticatedEmail", normEmail);

        sessionStorage.setItem(
            "completedFlowScenarioId",
            "UC01",
        );

        navigate("/edu-hub",
        {
            state: {
                email: normEmail,
                scenarioID: "UC01",
            },
        });
    }

    return (
        <main className="google-login-page">
            <section className="google-login-card">
                <div className="google-login-intro">
                    <div className="google-logo" aria-label="Google">
                        {/*
                        <span className="google-blue">G</span>
                        <span className="google-red">o</span>
                        <span className="google-yellow">o</span>
                        <span className="google-blue">g</span>
                        <span className="google-green">l</span>
                        <span className="google-red">e</span>
                        */}
                        <img className="google-logo-image" src={googleLogo} alt="logo Google" />
                    </div>

                    <h1>{step === "email" ? "Accedi" : "Bentornato"}</h1>

                    {step === "email" && (
                        <p>Utilizza il tuo Account Google</p>
                    )}
                </div>

                <form className="google-login-form" onSubmit={handleSubmit}>
                    {step === "email" ? (
                        <>
                            <div className="google-field">
                                <input
                                    id="google-email"
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    placeholder=" "
                                    autoComplete="off"
                                    required
                                />
                                <label htmlFor="google-email">Email o telefono</label>
                            </div>

                            <button className="google-text-button" type="button">
                                Non ricordi l'indirizzo email?
                            </button>

                            <p className="google-secondary-text">
                                Non si tratta del tuo computer? Utilizza la modalità Ospite per accedere
                                privatamente.
                            </p>

                            <p className="google-simulation-warning">
                                Simulazione didattica: non inserire dati reali.
                            </p>

                            <div className="google-login-actions">
                                <button className="google-text-button" type="button">
                                    Crea un account
                                </button>

                                <button className="google-next-button" type="submit">
                                    Avanti
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <button
                                className="google-account-chip"
                                type="button"
                                onClick={() => setStep("email")}
                            >
                                <span className="google-account-avatar">
                                    {email.trim().charAt(0).toUpperCase() || "U"}
                                </span>
                                <span>{email}</span>
                                <span aria-hidden="true">⌄</span>
                            </button>

                            <div className="google-field">
                                <input
                                    id="google-password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder=" "
                                    autoComplete="new-password"
                                    required
                                />
                                <label htmlFor="google-password">Inserisci la password</label>
                            </div>

                            <label className="google-show-password">
                                <input
                                    type="checkbox"
                                    checked={showPassword}
                                    onChange={(event) => setShowPassword(event.target.checked)}
                                />
                                <span>Mostra password</span>
                            </label>

                            <p className="google-simulation-warning">
                                Non inserire una password reale. Il valore non viene salvato né inviato.
                            </p>

                            <div className="google-login-actions">
                                <button
                                    className="google-text-button"
                                    type="button"
                                    onClick={() => setStep("email")}
                                >
                                    Indietro
                                </button>

                                <button className="google-next-button" type="submit">
                                    Avanti
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </section>
        </main>
    );
}