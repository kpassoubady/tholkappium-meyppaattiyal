# கட்டமைப்பு வரைபடங்கள் (Architecture Diagrams)

இக்கோவை, தொ.மா.2098 கட்டுரையில் (*"செய்யறிவும் செம்மொழியும்"*) விவரிக்கப்படும் மெய்ப்பாட்டியல்-சார்ந்த உணர்வுசார் AI கட்டமைப்பின் (Affective AI Architecture) கூறு வரைபடங்களை ஒருங்கே தொகுக்கிறது: (1) முழுமையான அமைப்புக் கட்டமைப்பு, (2) நிலை இயந்திர (FSM) வரைபடம், (3) உணர்ச்சிகரப் பதில் இயந்திரம் (Empathetic Response Engine), (4) இயல்பு விலகல் கண்டறிதல் (Anomaly Detection) ஓட்டம், (5) மெய்ப்பாடு-நவீனக் கோட்பாடு ஒப்பீடு (Conceptual Mapping) மற்றும் 32 நிலைகளின் விளக்கப்படம், (6) அரட்டை இயலி இயக்க வரிசை வரைபடம் (Sequence Diagram), (7) எதிர்கால ஆய்வுத் திசைகளின் வரிசை வரைபடம் (Future-work Roadmap). மூலக் கட்டுரையின் §5.4-இல் உள்ள `system-architecture.mmd` மற்றும் `state-transition.mmd` கோப்புகளுடன் ஒத்திசைவாக வரையப்பட்டவை; கருத்தாக்க மேற்கோள்கள் தொல். பொ. 1192-1218 (மெய்ப்பாட்டியல்) அடிப்படையில்.

> குறிப்பு: "இணை வளர்ச்சி" (Parallel Development) நெறிமுறையின்படி, இவை தொல்காப்பியமும் நவீன AI-யும் **ஒரே கருத்தாக்கக் கட்டமைப்பை** தனித்தனியே அடைந்துள்ளதைக் காட்டும் விளக்கப் படங்களே — நேரடிச் சமன்பாடு அன்று.

## ஊடாடும் வரைபடங்கள் / Interactive Diagrams

| வரைபடம் / Diagram | விளக்கம் / Scope | திறக்க / Open |
|---|---|---|
| முழுமையான அமைப்புக் கட்டமைப்பு / Full system architecture | TPS அடுக்கு முதல் உணர்ச்சிகரமான இறுதிப் பதில் வரையிலான கூறுகளும் தகவல் ஓட்டமும் | [system-architecture.html](system-architecture.html) |
| அரட்டை இயலி இயக்க வரிசை / Chatbot runtime | பயனர் தூண்டுவினா, வகைப்பாடு, இயல்பு விலகல் சோதனை, FSM, பதில் உருவாக்கம் ஆகியவற்றின் காலவரிசை | [chatbot-runtime.html](chatbot-runtime.html) |
| இயல்பு விலகல் கண்டறிதல் / Anomaly detection | மருட்கைக் காரணிகளையும் நவீன இயல்பு விலகல் வகைகளையும் இணைக்கும் முடிவெடுப்பு ஓட்டம் | [anomaly-detection.html](anomaly-detection.html) |

இந்தத் தனித்த HTML கோப்புகளில் ஒளி/இருள் தோற்றம், பெரிதாக்கம், தேடல், கூறு மையப்படுத்தல், தொடர்புத் தடமறிதல், ஏற்றுமதி ஆகிய வசதிகள் உள்ளன.

---

## 1. முழுமையான அமைப்புக் கட்டமைப்பு (Full System Architecture)

பயனர் தூண்டுவினா (Prompt) TPS அடுக்கு வழியாகச் சென்று, மெய்ப்பாட்டியல் தர்க்க இயந்திரத்தின் மூன்று உள்கூறுகளால் (8 மெய்ப்பாடுகள், மருட்கை விதி, 32 நிலைகள்) செயலாக்கப்பட்டு, இறுதியில் உணர்ச்சிகரமான பதிலாக வெளிப்படும் முழு ஓட்டம்.

```mermaid
graph TD
    A[பயனர் தூண்டுவினா / User Prompt] --> B[TPS அடுக்கு / Tamil Prompt Standard Layer]
    B --> C{மெய்ப்பாட்டியல் தர்க்க இயந்திரம் / Meyppattiyal Logic Engine}

    C -->|8 மெய்ப்பாடுகள் தொல். பொ. 1194| D1[உணர்வு வகைப்பாடு / Emotion Classification]
    C -->|மருட்கை விதி தொல். பொ. 1198| D2[இயல்பு விலகல் கண்டறிதல் / Anomaly Detection]
    C -->|32 நிலைகள் தொல். பொ. 1192-1203| D3[நிலை இயந்திரம் / FSM Engine]

    D1 --> E[உணர்வுசார் செயலாக்கம் / Affective Processing]
    D2 --> E
    D3 --> E

    E --> F[உணர்ச்சிகரமான பதில் இயந்திரம் / Empathetic Response Engine]
    F --> G[இறுதிப் பதில் / Final Response to User]
```

**கூறு வரைபடம் மூலம்:** [../diagrams/system-architecture.mmd](../diagrams/system-architecture.mmd)

---

## 2. நிலை இயந்திர வரைபடம் (Meyppaattiyal State Machine — FSM)

மருட்கை (Wonder/Surprise) தூண்டல் ஏற்படும்போது மனம் நடுவுநிலையிலிருந்து விலகி, சிந்தனைச் சுழற்சி வழியாக மீண்டும் சமநிலை அடையும் ஐந்து-நிலைச் சுழற்சி (தொல். பொ. 1203).

```mermaid
stateDiagram-v2
    [*] --> நடுவுநிலை: சமநிலை (Equilibrium)
    நடுவுநிலை --> நினைதல்: புதிய உள்ளீடு + மருட்கை (Wonder Trigger)
    நினைதல் --> கருதல்: சிந்தனை தொடர்ச்சி (Deliberation)
    கருதல் --> ஆராய்ச்சி: ஆராய்வு தொடக்கம் (Investigation)
    ஆராய்ச்சி --> ஐயம்: ஐயம் எழுதல் (Hypothesis Formed)
    ஐயம் --> நடுவுநிலை: முடிபு / சமநிலை (Resolution)

    note right of நடுவுநிலை
        FSM இயல்பு நிலை (Idle State)
        புதிய தூண்டல் வரும் வரை நிலைத்திருக்கும்
    end note
    note right of ஐயம்
        Point / Contextual / Collective
        Anomaly வகைப்பாடு இங்கு தீர்மானிக்கப்படுகிறது
    end note
```

**கூறு வரைபடம் மூலம்:** [../diagrams/state-transition.mmd](../diagrams/state-transition.mmd)

---

## 3. உணர்ச்சிகரப் பதில் இயந்திரம் (Empathetic Response Engine)

உணர்வு வகைப்பாடு, இயல்பு விலகல் கண்டறிதல், FSM நிலை ஆகிய மூன்று உள்ளீடுகளும் ஒன்றிணைந்து, பண்பாட்டு உணர்வுச் சாய்வுகளைக் (Cultural Sensitivity) கருத்தில் கொண்டு இறுதிப் பதிலை உருவாக்கும் விரிவான உட்-கட்டமைப்பு.

```mermaid
graph TD
    subgraph Inputs [உள்ளீடுகள் / Inputs]
        I1[8 மெய்ப்பாடு வகைப்பாடு / Emotion Label]
        I2[மருட்கை / Anomaly Score]
        I3[FSM நடப்பு நிலை / Current State]
    end

    I1 --> M{உணர்வுசார் செயலாக்கம் / Affective Fusion}
    I2 --> M
    I3 --> M

    M --> P1[பண்பாட்டு உணர்வுச் சாய்வு சரிசெய்தல் / Cultural Bias Adjustment]
    P1 --> P2[தொனி & பாதி தேர்வு / Tone & Register Selection]
    P2 --> P3{TPS உணர்வுத் தூண்டுதல் / Emotional Prompting}

    P3 -->|நினைதல் → கருதல் → ஆராய்ச்சி → ஐயம்| P4[நிலைமாற்றத் தூண்டுதல் / State-transition Prompting]
    P4 --> R[உணர்ச்சிகரமான பதில் / Empathetic Response]

    R --> V{சரிபார்ப்பு / Consistency Check}
    V -->|பொருந்தும்| G[இறுதிப் பதில் / Deliver Response]
    V -->|பொருந்தாது| M
```

**செயல்பாட்டு விளக்கம்:** ஒரு செய்யறிவு அரட்டை இயலி (AI Chatbot) "நகை" மெய்ப்பாட்டைக் கண்டறிந்து, எதிர்பாராத உள்ளீட்டை "மருட்கை"யாக இயல்பு விலகலாகக் குறித்து, பின் FSM பாதையில் இயங்கி, பண்பாட்டு உணர்வுச் சாய்வுகளுக்கு ஏற்ப தொனியைச் சரிசெய்து இறுதிப் பதிலை வழங்கும் ஓட்டம் (§5.4, §6.2 காண்க).

---

## 4. இயல்பு விலகல் கண்டறிதல் ஓட்டம் (Anomaly Detection — மருட்கை Pipeline)

மருட்கையின் நான்கு காரணிகளும் (தொல். பொ. 1198) சாந்தோலா முதலியோர் (2009) வரையறுத்த மூன்று Anomaly வகைகளுடன் இணைந்து முடிவெடுக்கும் தீர்மான மரம் (Decision Tree).

```mermaid
graph TD
    S[புதிய உள்ளீடு / New Data Point] --> Q{முன் அனுபவப் பரவலுக்கு வெளியே? / Outside Prior Distribution?}

    Q -->|இல்லை| N[இயல்பு நிகழ்வு / Normal — நடுவுநிலை தொடர்கிறது]
    Q -->|ஆம்| T{மருட்கைக் காரணி வகைப்பாடு / Wonder-factor Classification}

    T -->|புதுமை Novelty| A1[Point Anomaly]
    T -->|பெருமை Magnitude| A2["Contextual Anomaly (high-tail)"]
    T -->|சிறுமை Smallness| A3["Contextual Anomaly (low-tail)"]
    T -->|ஆக்கம் Generative Force| A4[Collective Anomaly]

    A1 --> F[FSM: நினைதல் நிலைக்கு மாற்றம் / Transition to நினைதல்]
    A2 --> F
    A3 --> F
    A4 --> F

    F --> O[ஆராய்ச்சி → ஐயம் → பதில் உருவாக்கம் / Proceed to Investigation]
```

**அட்டவணை மூலம்:** §5.2, அட்டவணை 2 (மருட்கைக் காரணி ↔ Anomaly வகை ஒப்புமை).

---

## 5. மெய்ப்பாடு - நவீனக் கோட்பாடு ஒப்பீடு (Conceptual Mapping)

தொல்காப்பிய மெய்ப்பாடுகளுக்கும் நவீன உணர்வுசார் கணினியியல் (Affective Computing) கருத்தாக்கங்களுக்கும் இடையிலான இணை வளர்ச்சி ஒப்புமை.

```mermaid
graph LR
    subgraph Tholkappiyam_System [தொல்காப்பிய மெய்ப்பாடுகள்]
    T1(நகை / நகைப்பு)
    T2(மருட்கை / வியப்பு)
    T3(அழுகை / சோகம்)
    end

    subgraph Modern_AI_Sentiment [நவீன AI உணர்வு வகைப்பாடு]
    M1(Joy / Happiness)
    M2(Surprise / Anomaly)
    M3(Sadness)
    end

    T1 <-->|இணை வளர்ச்சி| M1
    T2 <-->|இணை வளர்ச்சி| M2
    T3 <-->|இணை வளர்ச்சி| M3
```

**கட்டுரை மூலம்:** [../paper/paper.md](../paper/paper.md) §5.

### 32 நிலைகளின் வகைப்பாட்டு விளக்கப்படம் (32 Mental States Illustration)

தொல். பொ. 1192-1203-இல் வரையறுக்கப்பட்ட 32 நிலைகளை உடல்/சூழல்சார், உணர்வுசார், அறிவுசார் என மூன்று குழுக்களாக (§5.3.1) காட்சிப்படுத்தும் விளக்கப் படம்.

32 நிலைகளின் உடல்/சூழல்சார், உணர்வுசார், அறிவுசார் வகைப்பாட்டுப் பட்டியல் [முழுக் கட்டுரையின் §5.3.1](../paper/paper.md)-இல் தரப்பட்டுள்ளது.

---

## 6. அரட்டை இயலி இயக்க வரிசை வரைபடம் (AI Chatbot Runtime — Sequence Diagram)

§5.4-இல் (§121) விவரிக்கப்படும் நடைமுறை நிகழ்வை — ஒரு செய்யறிவு அரட்டை இயலி பயனரின் தூண்டுவினாவை மெய்ப்பாட்டியல் தர்க்கத்தின் மூன்று உள்கூறுகள் வழியாகச் செலுத்தி உணர்ச்சிகரமான பதிலாக மாற்றும் காலவரிசை — கூறு-கூறாகக் காட்டும் Sequence Diagram.

```mermaid
sequenceDiagram
    actor U as பயனர் / User
    participant TPS as TPS அடுக்கு / Tamil Prompt Standard Layer
    participant ME as மெய்ப்பாட்டியல் தர்க்க இயந்திரம் / Meyppattiyal Logic Engine
    participant EC as உணர்வு வகைப்பாடு / Emotion Classification
    participant AD as இயல்பு விலகல் கண்டறிதல் / Anomaly Detection
    participant FSM as நிலை இயந்திரம் / FSM Engine
    participant ERE as உணர்ச்சிகரப் பதில் இயந்திரம் / Empathetic Response Engine

    U->>TPS: தூண்டுவினா / Prompt ("நகை" மெய்ப்பாடு கொண்ட உள்ளீடு)
    TPS->>ME: பகுப்பாய்வுக்கு அனுப்புதல் / Forward for analysis

    ME->>EC: 8 மெய்ப்பாடு வகைப்பாடு கோரிக்கை (தொல். பொ. 1194)
    EC-->>ME: "நகை" கண்டறியப்பட்டது / Emotion label = நகை

    ME->>AD: மருட்கை சோதனை / Check for Wonder-trigger (தொல். பொ. 1198)
    AD-->>ME: எதிர்பாராத உள்ளீடு → இயல்பு விலகல் / Anomaly flagged

    ME->>FSM: நிலை மாற்றம் தொடங்கு / Trigger transition
    FSM->>FSM: நடுவுநிலை → நினைதல் → கருதல் → ஆராய்ச்சி → ஐயம்
    FSM-->>ME: இறுதி நிலை = ஐயம் (Resolved)

    ME->>ERE: வகைப்பாடு + Anomaly + FSM நிலை அனுப்புதல்
    ERE->>ERE: பண்பாட்டு உணர்வுச் சாய்வு சரிசெய்தல் / Cultural bias adjustment
    ERE-->>U: உணர்ச்சிகரமான பதில் / Empathetic Response
```

**செயல்பாட்டு விளக்கம்:** இந்த வரைபடம் §1 (System Architecture), §2 (FSM), §3 (Empathetic Response Engine) ஆகிய மூன்று கட்டமைப்பு வரைபடங்களையும் **ஒரு காலவரிசை ஓட்டமாக** (temporal flow) இணைத்துக் காட்டுகிறது — கூறுகளுக்கு இடையேயான தகவல் பரிமாற்ற வரிசையை தெளிவுபடுத்துகிறது.

---

## 7. எதிர்கால ஆய்வுத் திசைகளின் வரிசை வரைபடம் (§7 Future-work Roadmap)

§7-இல் முன்மொழியப்பட்ட நான்கு எதிர்கால ஆய்வுத் திசைகளும் ஒரு தொடர் சார்பு (sequential dependency) கொண்டவை — ஒவ்வொன்றும் முந்தையதன் அடிப்படையில் கட்டமைக்கப்படக்கூடியவை.

```mermaid
graph LR
    R1["1. Operational Meyppadu Model
    32 நிலைகள் அடிப்படையிலான FSM
    உணர்வுசார் AI மாதிரியின்
    நடைமுறை செயலாக்கம்"]

    R2["2. Tamil-First Dataset
    மெய்ப்பாட்டியல் வகைப்பாட்டைத்
    தரவு குறியீடாகக் (Annotation
    Schema) கொண்ட தமிழ் முதல்
    உணர்வுத் தரவுக் கணம்"]

    R3["3. TPS-Meyppadu Integration
    ஆசிரியரின் TPS தரத்துடன்
    மெய்ப்பாட்டியல் சொல்லாடலை
    ஒருங்கிணைத்த தூண்டுவினா
    கட்டமைப்பு"]

    R4["4. Culturally-aware Affective AI
    மெய்ப்பாட்டியல் வழி 'தமிழ்ப்
    பண்பாட்டுச் சார்பு' உணர்வு
    AI மாதிரி"]

    R1 -->|மாதிரி தேவைப்படும் தரவு| R2
    R2 -->|தரவு தூண்டும் தூண்டுவினா நுட்பம்| R3
    R3 -->|முழுமையான பண்பாட்டு ஒருங்கிணைப்பு| R4
```

**செயல்பாட்டு விளக்கம்:** R1 (FSM மாதிரி செயலாக்கம்) இல்லாமல் R2 (தரவுக் கணம் வகைப்படுத்த) நடைமுறையில் சாத்தியமில்லை; R2 இல்லாமல் R3-இன் தூண்டுவினா நுட்பத்தை பயிற்சி/சரிபார்ப்பு செய்ய முடியாது; R3 முழுமையாகும்போதே R4-இன் பண்பாட்டு அடுக்கு பொருத்தமாக அமையும். இக்கட்டமைப்பு கட்டுரையின் §7-இல் பட்டியலாக மட்டும் தரப்பட்ட நான்கு திசைகளுக்கும் இடையேயான தர்க்கரீதியான வரிசையை வெளிப்படுத்துகிறது.

---

## மேற்கோள் / References

- தொல்காப்பியர். *தொல்காப்பியம்: பொருளதிகாரம், மெய்ப்பாட்டியல்* (புலியூர்க் கேசிகன் உரை, 1961). நூற்பா 1192-1218.
- Chandola, V., Banerjee, A., & Kumar, V. (2009). Anomaly detection: A survey. *ACM Computing Surveys*, *41*(3), 1-58.
- Picard, R. W. (1997). *Affective Computing*. MIT Press.
- Ekman, P., & Friesen, W. V. (1978). *Facial Action Coding System (FACS)*.
- Kring, A. M. (2023). *The Facial Expression Coding System (FACES): A user's guide*. ESI Lab, UC Berkeley.

முழு விவரம்: [../paper/paper.md](../paper/paper.md) §5.
