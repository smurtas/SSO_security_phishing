import type { Scenario } from "./scenarioTypes";

export const pilotScenarios: Scenario[] = [
  // =========================================================
  // FLUSSI LEGITTIMI / BASELINE — UC01-UC05
  // =========================================================

  {
    id: "UC01",
    category: "baseline",
    protocol: "OIDC",
    title: "Flusso di accesso Google corretto",
    instruction:
      'Accesso a Google Classroom tramite il pulsante "Accedi con Google" e valutazione del flusso completato.',
    expectedAnswer: "legitimate",
    difficultyLevel: 1,
    type: "full-flow",
    steps: [],
  },
  /*
  {
    id: "UC02",
    category: "baseline",
    protocol: "OIDC",
    title: "Flusso di accesso Microsoft corretto",
    instruction:
      'Accedi alla piattaforma scolastica tramite il pulsante "Accedi con Microsoft" e valuta il flusso completato.',
    expectedAnswer: "legitimate",
    difficultyLevel: 1,
    type: "full-flow",
    steps: [],
  },
  */
  {
    id: "UC03",
    category: "baseline",
    protocol: "OAuth",
    title: "Richiesta di consenso minima",
    instruction:
      'Accedi a Google Classroom tramite il pulsante "Accedi con Google" e valuta il flusso completato.',
    expectedAnswer: "legitimate",
    difficultyLevel: 2,
    type: "single-page",
    steps: [],
  },

  /*
  {
    id: "UC04",
    category: "baseline",
    protocol: "SAML",
    title: "Accesso SAML corretto",
    instruction:
      "Accedi al registro elettronico e verifica le informazioni associate alla tua identità scolastica.",
    expectedAnswer: "legitimate",
    difficultyLevel: 2,
    type: "full-flow",
    steps: [],
  },
  {
    id: "UC05",
    category: "baseline",
    protocol: "OIDC",
    title: "Interfaccia Google aggiornata",
    instruction:
      "Valuta una schermata di accesso Google con grafica differente da quella abituale.",
    expectedAnswer: "legitimate",
    difficultyLevel: 2,
    type: "single-page",
    steps: [],
  },

  // =========================================================
  // IDENTITY PROVIDER SPOOFING — UC06-UC12
  // =========================================================

  {
    id: "UC06",
    category: "fake_idp",
    protocol: "OIDC",
    title: "Falso accesso Google",
    instruction:
      'Accedi a Google Classroom tramite il pulsante "Accedi con Google" e valuta il flusso mostrato.',
    expectedAnswer: "malicious",
    difficultyLevel: 2,
    type: "full-flow",
    steps: [],
  },
  {
    id: "UC07",
    category: "fake_idp",
    protocol: "OIDC",
    title: "Falso accesso Microsoft",
    instruction:
      'Accedi alla piattaforma scolastica tramite il pulsante "Accedi con Microsoft".',
    expectedAnswer: "malicious",
    difficultyLevel: 2,
    type: "full-flow",
    steps: [],
  },
  */
  {
    id: "UC08",
    category: "fake_idp",
    protocol: "OIDC",
    title: "Falso Identity Provider scolastico",
    instruction:
      "Valuta la schermata di autenticazione Classroom mostrata dal portale scolastico.",
    expectedAnswer: "malicious",
    difficultyLevel: 2,
    type: "single-page",
    steps: [],
  },
  /*
  {
    id: "UC09",
    category: "fake_idp",
    protocol: "OIDC",
    title: "Falso provider SPID",
    instruction:
      "Seleziona il provider SPID proposto per accedere al servizio amministrativo.",
    expectedAnswer: "malicious",
    difficultyLevel: 3,
    type: "full-flow",
    steps: [],
  },
  */
  {
    id: "UC10",
    category: "fake_idp",
    protocol: "OIDC",
    title: "Richiesta MFA inattesa",
    instruction:
      "Valuta la richiesta di approvazione MFA comparsa durante l'accesso al servizio scolastico.",
    expectedAnswer: "malicious",
    difficultyLevel: 3,
    type: "single-page",
    steps: [],
  },
  /*
  {
    id: "UC11",
    category: "fake_idp",
    protocol: "OIDC",
    title: "HTTPS con dominio falso",
    instruction:
      "Valuta la pagina di autenticazione, considerando sia il certificato HTTPS sia il dominio mostrato.",
    expectedAnswer: "malicious",
    difficultyLevel: 2,
    type: "single-page",
    steps: [],
  },
  {
    id: "UC12",
    category: "fake_idp",
    protocol: "OIDC",
    title: "Logo corretto e dominio anomalo",
    instruction:
      "Valuta la pagina Google mostrata, prestando attenzione all'indirizzo del sito.",
    expectedAnswer: "malicious",
    difficultyLevel: 2,
    type: "single-page",
    steps: [],
  },

  // =========================================================
  // OAUTH CONSENT ABUSE — UC13-UC19
  // =========================================================

  {
    id: "UC13",
    category: "oauth_consent",
    protocol: "OAuth",
    title: "Consenso OAuth coerente",
    instruction:
      "Valuta le autorizzazioni richieste dall'applicazione Classroom Planner.",
    expectedAnswer: "legitimate",
    difficultyLevel: 2,
    type: "full-flow",
    steps: [],
  },
  {
    id: "UC14",
    category: "oauth_consent",
    protocol: "OAuth",
    title: "Richiesta di lettura delle email",
    instruction:
      "Valuta la richiesta OAuth presentata dall'applicazione Compiti Classroom Online.",
    expectedAnswer: "malicious",
    difficultyLevel: 2,
    type: "single-page",
    steps: [],
  },
  {
    id: "UC15",
    category: "oauth_consent",
    protocol: "OAuth",
    title: "Invio di email a nome dell'utente",
    instruction:
      "Valuta le autorizzazioni richieste dall'applicazione Homework Assistant.",
    expectedAnswer: "malicious",
    difficultyLevel: 3,
    type: "single-page",
    steps: [],
  },
  {
    id: "UC16",
    category: "oauth_consent",
    protocol: "OAuth",
    title: "Accesso completo ai file",
    instruction:
      "Valuta i permessi richiesti da un'applicazione che mostra l'orario scolastico.",
    expectedAnswer: "malicious",
    difficultyLevel: 2,
    type: "full-flow",
    steps: [],
  },
  {
    id: "UC17",
    category: "oauth_consent",
    protocol: "OAuth",
    title: "Accesso permanente ai dati",
    instruction:
      "Valuta la richiesta di accesso ai dati anche quando l'applicazione non è utilizzata.",
    expectedAnswer: "malicious",
    difficultyLevel: 3,
    type: "single-page",
    steps: [],
  },
  {
    id: "UC18",
    category: "oauth_consent",
    protocol: "OAuth",
    title: "Publisher sconosciuto",
    instruction:
      "Valuta la richiesta di autorizzazione di School Calendar Sync e le informazioni sul publisher.",
    expectedAnswer: "suspicious",
    difficultyLevel: 3,
    type: "single-page",
    steps: [],
  },
  {
    id: "UC19",
    category: "oauth_consent",
    protocol: "OAuth",
    title: "Impersonificazione del brand Microsoft",
    instruction:
      "Valuta l'applicazione Microsoft School Sync, il publisher e i permessi richiesti.",
    expectedAnswer: "malicious",
    difficultyLevel: 3,
    type: "single-page",
    steps: [],
  },

  // =========================================================
  // REDIRECT MANIPULATION — UC20-UC25
  // =========================================================

  {
    id: "UC20",
    category: "redirect",
    protocol: "OIDC",
    title: "Redirect Microsoft corretto",
    instruction:
      "Segui il flusso di autenticazione tra Student Hub e Microsoft e valuta i domini attraversati.",
    expectedAnswer: "legitimate",
    difficultyLevel: 2,
    type: "full-flow",
    steps: [],
  },
  {
    id: "UC21",
    category: "redirect",
    protocol: "OIDC",
    title: "Dominio intermedio inatteso",
    instruction:
      "Segui il flusso di autenticazione e valuta la presenza di un dominio intermedio.",
    expectedAnswer: "malicious",
    difficultyLevel: 3,
    type: "full-flow",
    steps: [],
  },
  {
    id: "UC22",
    category: "redirect",
    protocol: "OAuth",
    title: "Open redirect",
    instruction:
      "Apri il collegamento proveniente dal portale scolastico e valuta la destinazione finale.",
    expectedAnswer: "malicious",
    difficultyLevel: 3,
    type: "full-flow",
    steps: [],
  },
  {
    id: "UC23",
    category: "redirect",
    protocol: "OIDC",
    title: "Redirect URI anomala",
    instruction:
      "Completa il login Microsoft e verifica il dominio sul quale termina il flusso.",
    expectedAnswer: "malicious",
    difficultyLevel: 3,
    type: "full-flow",
    steps: [],
  },
  {
    id: "UC24",
    category: "redirect",
    protocol: "OIDC",
    title: "Catena di redirect lunga",
    instruction:
      "Osserva la sequenza dei domini attraversati durante il processo di autenticazione.",
    expectedAnswer: "suspicious",
    difficultyLevel: 4,
    type: "full-flow",
    steps: [],
  },
  {
    id: "UC25",
    category: "redirect",
    protocol: "OAuth",
    title: "Parametri OAuth sospetti",
    instruction:
      "Valuta i parametri OAuth mostrati nella barra degli indirizzi.",
    expectedAnswer: "malicious",
    difficultyLevel: 4,
    type: "single-page",
    steps: [],
  },

  // =========================================================
  // OIDC PROVIDER & ENDPOINT CONFUSION — UC26-UC30
  // =========================================================

  {
    id: "UC26",
    category: "oidc_confusion",
    protocol: "OIDC",
    title: "Provider OIDC corretti",
    instruction:
      "Scegli tra i provider Google e Microsoft proposti dal servizio scolastico.",
    expectedAnswer: "legitimate",
    difficultyLevel: 2,
    type: "single-page",
    steps: [],
  },
  {
    id: "UC27",
    category: "oidc_confusion",
    protocol: "OIDC",
    title: "Provider duplicato",
    instruction:
      "Valuta i due provider Classroom Login e Classroom Secure Login.",
    expectedAnswer: "malicious",
    difficultyLevel: 3,
    type: "single-page",
    steps: [],
  },
  {
    id: "UC28",
    category: "oidc_confusion",
    protocol: "OIDC",
    title: "Incoerenza tra issuer e brand",
    instruction:
      "Valuta la schermata che mostra il logo Google ma utilizza il dominio di un provider differente.",
    expectedAnswer: "malicious",
    difficultyLevel: 3,
    type: "single-page",
    steps: [],
  },
  {
    id: "UC29",
    category: "oidc_confusion",
    protocol: "OIDC",
    title: "Discovery endpoint sospetto",
    instruction:
      "Valuta la configurazione OIDC caricata da un endpoint non istituzionale.",
    expectedAnswer: "malicious",
    difficultyLevel: 4,
    type: "single-page",
    steps: [],
  },
  {
    id: "UC30",
    category: "oidc_confusion",
    protocol: "OIDC",
    title: "Provider sconosciuto",
    instruction:
      "Valuta il nuovo provider EduID Connect proposto dal portale scolastico.",
    expectedAnswer: "suspicious",
    difficultyLevel: 3,
    type: "single-page",
    steps: [],
  },

  // =========================================================
  // SAML IDENTITY & ASSERTION ANOMALIES — UC31-UC36
  // =========================================================

  {
    id: "UC31",
    category: "saml",
    protocol: "SAML",
    title: "Attributi SAML coerenti",
    instruction:
      "Verifica gli attributi restituiti dal sistema dopo l'accesso al servizio scolastico.",
    expectedAnswer: "legitimate",
    difficultyLevel: 2,
    type: "single-page",
    steps: [],
  },
  {
    id: "UC32",
    category: "saml",
    protocol: "SAML",
    title: "Ruolo amministratore inatteso",
    instruction:
      "Controlla il ruolo assegnato al tuo account dopo l'accesso al servizio.",
    expectedAnswer: "malicious",
    difficultyLevel: 3,
    type: "single-page",
    steps: [],
  },
  {
    id: "UC33",
    category: "saml",
    protocol: "SAML",
    title: "Identità incoerente",
    instruction:
      "Controlla l'identità mostrata dal servizio dopo il completamento del login.",
    expectedAnswer: "malicious",
    difficultyLevel: 2,
    type: "single-page",
    steps: [],
  },
  {
    id: "UC34",
    category: "saml",
    protocol: "SAML",
    title: "Sessione già attiva",
    instruction:
      "Apri il servizio scolastico e valuta la sessione di autenticazione già presente.",
    expectedAnswer: "suspicious",
    difficultyLevel: 3,
    type: "single-page",
    steps: [],
  },
  {
    id: "UC35",
    category: "saml",
    protocol: "SAML",
    title: "Login IdP-initiated inatteso",
    instruction:
      "Apri il collegamento ricevuto dalla scuola e valuta l'accesso automatico al servizio.",
    expectedAnswer: "legitimate",
    difficultyLevel: 4,
    type: "full-flow",
    steps: [],
  },
  {
    id: "UC36",
    category: "saml",
    protocol: "SAML",
    title: "Attributi SAML mancanti",
    instruction:
      "Verifica la completezza delle informazioni associate alla tua identità dopo l'accesso.",
    expectedAnswer: "suspicious",
    difficultyLevel: 3,
    type: "single-page",
    steps: [],
  },

  // =========================================================
  // EMAIL COME VETTORE VERSO SSO PHISHING — UC37-UC40
  // =========================================================

  */
  {
    id: "UC37",
    category: "email",
    protocol: "Email→OIDC",
    title: "Aggiornamento urgente dell'account scolastico",
    instruction:
      "Apri il messaggio relativo alla disattivazione dell'account e valuta il successivo flusso di login.",
    expectedAnswer: "malicious",
    difficultyLevel: 2,
    type: "full-flow",
    steps: [],
  },
  {
    id: "UC38",
    category: "email",
    protocol: "Email→OAuth",
    title: "Invito a Classroom Helper",
    instruction:
      "Apri l'invito ricevuto via email e valuta la richiesta OAuth successiva.",
    expectedAnswer: "malicious",
    difficultyLevel: 3,
    type: "full-flow",
    steps: [],
  },
  {
    id: "UC39",
    category: "email",
    protocol: "Email→SSO",
    title: "Account sospeso con richiesta urgente",
    instruction:
      "Apri il messaggio relativo a un'attività sospetta e valuta il flusso di verifica dell'identità.",
    expectedAnswer: "malicious",
    difficultyLevel: 2,
    type: "full-flow",
    steps: [],
  },
  {
    id: "UC40",
    category: "email",
    protocol: "Email→SSO",
    title: "Comunicazione scolastica autentica",
    instruction:
      "Apri la comunicazione relativa all'orario scolastico e valuta il collegamento al portale.",
    expectedAnswer: "legitimate",
    difficultyLevel: 2,
    type: "full-flow",
    steps: [],
  },
];