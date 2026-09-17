(function () {
  "use strict";

  var textMarutkai = {
    id: "text-marutkai",
    shortPrompt: "மருட்கையை எளிமையாக விளக்குக",
    prompt: "மருட்கை என்ற மெய்ப்பாட்டை எட்டாம் வகுப்பு மாணவருக்குப் புரியும் வகையில், ஓர் எடுத்துக்காட்டுடன் 80 சொற்களுக்குள் விளக்குக.",
    tps: [
      { layer: "L1 Role", value: "Teacher" },
      { layer: "L2 Domain", value: "Literature (`lit`), with education context" },
      { layer: "L3 Skill Level", value: "Grade 6-12" },
      { layer: "L4 Intent", value: "EXPL" },
      { layer: "L5 Tone", value: "Casual/Friendly, with clear Tamil" },
      { layer: "L6 Format", value: "Essay, short explanation" },
      { layer: "L7 Constraints", value: "Maximum 80 words, one example, cite source" },
      { layer: "L8 Safety", value: "Preserve cultural context, avoid unsupported equivalence" }
    ],
    evidence: [
      {
        type: "Primary source reference",
        label: "தொல். பொ. 1198",
        detail: "மருட்கையுடன் தொடர்புடைய நான்கு காரணிகளை வரையறுக்கும் மூலப் பகுதி."
      },
      {
        type: "Paper author’s interpretation",
        label: "Paper section 5.2",
        detail: "இயல்பு விலகல் கண்டறிதலுடனான கட்டமைப்பு ஒப்பீட்டை முன்மொழிகிறது."
      },
      {
        type: "Paper author’s interpretation",
        label: "Paper section 5.5",
        detail: "ஒப்பிடத்தக்க கருத்துருவாக்கம் என்னும் வரம்பிற்குள் ஒப்பீட்டை மட்டுப்படுத்துகிறது."
      },
      {
        type: "Modern technical comparison",
        label: "Point anomaly",
        detail: "மருட்கையின் புதுமைக் காரணி, நவீன புள்ளி இயல்பு விலகலுடன் கட்டமைப்பு ரீதியாக ஒப்பிடப்படுகிறது."
      },
      {
        type: "Prototype-only implementation choice",
        label: "Prepared explanation text",
        detail: "மாணவருக்கான விளக்கம் முன்தயாரிக்கப்பட்டு, நூற்பா மேற்கோள் இன்றி தொகுக்கப்பட்டுள்ளது."
      }
    ],
    interpretation: [
      { label: "மெய்ப்பாடு", value: "மருட்கை" },
      { label: "Relevant factor for this example", value: "புதுமை" },
      { label: "Modern comparison", value: "Point anomaly" },
      { label: "Status", value: "Structural comparison, not direct equivalence" }
    ],
    fsm: {
      trigger: "புதிய உள்ளீடு + மருட்கைத் தூண்டல்",
      nodes: ["நடுவுநிலை", "நினைதல்", "கருதல்", "ஆராய்ச்சி", "ஐயம்", "நடுவுநிலை"]
    },
    response: "மருட்கை என்பது எதிர்பாராத புதுமை, பெருமை, சிறுமை அல்லது ஆக்கம் ஒன்றைக் காணும்போது மனத்தில் தோன்றும் வியப்புணர்வு. எடுத்துக்காட்டாக, வகுப்பில் வைத்த விதை சில நாள்களில் முளைத்ததைப் பார்க்கும் மாணவனுக்கு வியப்பு ஏற்படும். இங்கு புதிய மாற்றமே மருட்கையைத் தூண்டுகிறது. இது தொல்காப்பிய வரையறையையும் நவீன இயல்பு விலகல் கருத்தையும் நேரடியாகச் சமமாக்காது; அமைப்புச் சார்ந்த ஒப்பீடாக மட்டுமே காட்டப்படுகிறது.",
    media: null,
    disclosure: "Prepared demonstration artifact"
  };

  var imageNinaital = {
    id: "image-ninaital",
    shortPrompt: "நினைதல் நிலைக்கான படம் உருவாக்குக",
    prompt: "“நினைதல்” என்னும் தொல்காப்பிய நிலையை ஓலைச்சுவடி ஓவியப் பாணியும் நவீனத் தரவுக் காட்சியும் இணைந்த ஒரு படமாக உருவாக்குக. படத்தில் எழுத்துகள் வேண்டாம். தமிழ்ப் பண்பாட்டு மரியாதையைப் பேணுக.",
    tps: [
      { layer: "L1 Role", value: "Storyteller, with visual concept-design context" },
      { layer: "L2 Domain", value: "Literature (`lit`), with affective-computing context" },
      { layer: "L3 Skill Level", value: "Beginner (`beg`), general audience" },
      { layer: "L4 Intent", value: "CREA" },
      { layer: "L5 Tone", value: "Poetic, culturally respectful" },
      { layer: "L6 Format", value: "Image (prototype extension)" },
      { layer: "L7 Constraints", value: "16:9, no lettering, website palette, no watermark" },
      { layer: "L8 Safety", value: "Avoid religious, caste, political, or historical misrepresentation" }
    ],
    evidence: [
      {
        type: "Primary source reference",
        label: "தொல். பொ. 1203",
        detail: "ஆய்வுக் கட்டுரையில் 32 நிலைப் பட்டியலுக்காக மேற்கோள் காட்டப்பட்ட மூலப் பகுதி."
      },
      {
        type: "Paper author’s interpretation",
        label: "Paper section 5.3.1.3",
        detail: "நினைதல், ஆசிரியரால் முன்மொழியப்பட்ட அறிவுசார் பிரிவின் கீழ் குழுவாக்கப்பட்டுள்ளது."
      },
      {
        type: "Paper author’s interpretation",
        label: "Paper section 5.3",
        detail: "நினைதல் நிலை, கருத்துநிலை FSM பாதையில் பயன்படுத்தப்படுகிறது."
      },
      {
        type: "Prototype-only implementation choice",
        label: "Prepared image asset",
        detail: "உள்ளூர் வலைத்தள ஆச்சாத்திலிருந்து முன்தயாரிக்கப்பட்ட படம் இணைக்கப்படுகிறது; இது பொத்தானை அழுத்தியபோது உருவாக்கப்பட்டது அன்று."
      }
    ],
    interpretation: [
      { label: "Selected state", value: "நினைதல்" },
      { label: "State number in the paper's listed order", value: "18" },
      { label: "Author-proposed group", value: "அறிவுசார் / Cognitive" },
      { label: "Media status", value: "Prepared demonstration artifact" }
    ],
    fsm: {
      trigger: "புதிய காட்சிக் கோரிக்கை",
      nodes: ["நடுவுநிலை", "நினைதல்"]
    },
    response: "“நினைதல்” என்னும் அறிவுசார் நிலையை உருவகப்படுத்தும் முன்தயாரிக்கப்பட்ட காட்சி இணைக்கப்பட்டுள்ளது. இது பொத்தானை அழுத்தியபோது உருவாக்கப்பட்ட படம் அன்று.",
    media: {
      type: "image",
      src: "assets/img/prototype-ninaital-concept.webp",
      alt: "ஓலைச்சுவடி மரபையும் நவீனத் தரவுப் புள்ளிகளையும் இணைத்து, நினைதல் என்னும் அறிவுசார் நிலையை உருவகப்படுத்தும் காட்சி."
    },
    disclosure: "Prepared demonstration artifact"
  };

  var videoStatePath = {
    id: "video-state-path",
    shortPrompt: "ஐந்து நிலைமாற்றங்களைக் காணொளியாகக் காட்டுக",
    prompt: "நடுவுநிலை -> நினைதல் -> கருதல் -> ஆராய்ச்சி -> ஐயம் என்ற நிலைமாற்றத்தை விளக்கும் 20 வினாடிக் காணொளி உருவாக்குக.",
    tps: [
      { layer: "L1 Role", value: "Teacher, with motion-graphics context" },
      { layer: "L2 Domain", value: "Literature (`lit`), with technology context" },
      { layer: "L3 Skill Level", value: "Beginner (`beg`), general audience" },
      { layer: "L4 Intent", value: "CREA" },
      { layer: "L5 Tone", value: "Academic, visually clear" },
      { layer: "L6 Format", value: "Video (prototype extension)" },
      { layer: "L7 Constraints", value: "Two prepared clips: 10-second conceptual animation and 20-second human illustration; 16:9; no generated lettering" },
      { layer: "L8 Safety", value: "Preserve scholarly scope and cultural context" }
    ],
    evidence: [
      {
        type: "Primary source reference",
        label: "தொல். பொ. 1203",
        detail: "ஆய்வுக் கட்டுரையில் 32 நிலைப் பட்டியலுக்காக மேற்கோள் காட்டப்பட்ட மூலப் பகுதி."
      },
      {
        type: "Paper author’s interpretation",
        label: "Paper section 5.3",
        detail: "நிலைமாற்றப் படம் மற்றும் கருத்துநிலை FSM பாதையை விளக்குகிறது."
      },
      {
        type: "Paper author’s interpretation",
        label: "Paper section 5.4",
        detail: "அரட்டை இயலி பாதையை விவரிக்கிறது."
      },
      {
        type: "Prototype-only implementation choice",
        label: "Two prepared companion videos",
        detail: "ஒரே கருத்துநிலைப் பாதை 10 வினாடிக் கருத்தியல் அசைவாகவும் 20 வினாடி மனிதக் காட்சியாகவும் தனித்தனியாகக் காட்டப்படுகிறது."
      }
    ],
    interpretation: [
      { label: "Initial state", value: "நடுவுநிலை" },
      { label: "Trigger (not a displayed state)", value: "மருட்கை" },
      { label: "Transition path", value: "நினைதல் -> கருதல் -> ஆராய்ச்சி -> ஐயம்" },
      { label: "Resolution", value: "return to நடுவுநிலை" }
    ],
    fsm: {
      trigger: "மருட்கைத் தூண்டல் (இது நிலை அன்று)",
      nodes: ["நடுவுநிலை", "நினைதல்", "கருதல்", "ஆராய்ச்சி", "ஐயம்", "நடுவுநிலை"]
    },
    response: "ஒரே கருத்துநிலைப் பாதையை இரு வேறு விளக்கங்களில் காட்டும் முன்தயாரிக்கப்பட்ட காணொளிகள் இணைக்கப்பட்டுள்ளன: 10 வினாடிக் கருத்தியல் நிலைமாற்ற அசைவும், 20 வினாடி மனிதக் காட்சியும். மனிதக் காட்சி ஆசிரியர் தேர்ந்தெடுத்த கட்டமைப்பு விளக்கம் மட்டுமே; நேரடிச் சமன்பாடு அன்று.",
    media: {
      type: "videos",
      items: [
        {
          title: "1. கருத்துநிலைப் பாதை / Conceptual path",
          src: "assets/video/meyppaattiyal-state-transition-10s-master.mp4",
          poster: "assets/img/prototype-state-transition-video-poster.webp",
          ariaLabel: "மெய்ப்பாட்டியல் நிலைமாற்றத்தின் 10 வினாடிக் கருத்தியல் செயல்விளக்கம்",
          caption: "முன்தயாரிக்கப்பட்ட 10 வினாடிக் கருத்தியல் FSM அசைவு / Prepared 10-second conceptual FSM animation.",
          transcript: "நடுவுநிலையில் தொடங்கும் அசைவு, மருட்கைத் தூண்டலுக்குப் பின் நினைதல், கருதல், ஆராய்ச்சி, ஐயம் ஆகிய நிலைகளை வரிசையாகக் காட்டி, மீண்டும் நடுவுநிலைக்குத் திரும்புகிறது."
        },
        {
          title: "2. மனிதக் காட்சி / Human illustration",
          src: "assets/video/real-humon-state-transition.mp4",
          poster: "assets/img/prototype-human-state-transition-poster.webp",
          ariaLabel: "மெய்ப்பாட்டியல் கருத்துநிலை மாற்றத்தின் 20 வினாடி மனிதக் காட்சி",
          caption: "முன்தயாரிக்கப்பட்ட 20 வினாடி மனிதக் காட்சி / Prepared 20-second human illustration.",
          transcript: "அமைதியான நடுவுநிலையில் இருக்கும் ஒருவர், எதிர்பாராத புதிய காட்சியால் மருட்கைத் தூண்டலை அடைந்து, நினைதல், கருதல், ஆராய்ச்சி, ஐயம் ஆகிய கருத்துநிலைகளுக்கு உரிய முகபாவ மாற்றங்களை வெளிப்படுத்தி, மீண்டும் அமைதியான நடுவுநிலையை அடையும் காட்சிவிளக்கம்.",
          boundary: {
            ta: "இந்த முன்தயாரிக்கப்பட்ட காட்சி, ஆய்வுக் கட்டுரை ஆசிரியர் தேர்ந்தெடுத்த மெய்ப்பாட்டியல் கருத்துநிலை மாற்றப் பாதையைத் தற்கால மனிதச் சூழலில் கட்டமைப்பு விளக்கமாக மட்டுமே காட்டுகிறது. இது தொல்காப்பியத்தையும் நவீன உளவியலையும் நேரடியாகச் சமன்படுத்தும் கூற்று அன்று.",
            en: "This prepared scene illustrates one author-selected structural interpretation of a conceptual Meyppaattiyal state-transition path in a modern human setting. It does not claim direct equivalence between Tolkappiyam and modern psychology."
          }
        }
      ]
    },
    disclosure: "Prepared demonstration artifact"
  };

  function deepFreeze(value) {
    Object.keys(value).forEach(function (key) {
      var child = value[key];
      if (child && typeof child === "object" && !Object.isFrozen(child)) deepFreeze(child);
    });
    return Object.freeze(value);
  }

  window.prototypeScenarios = deepFreeze([textMarutkai, imageNinaital, videoStatePath]);
})();
