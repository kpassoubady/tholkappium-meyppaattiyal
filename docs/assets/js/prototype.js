(function () {
  "use strict";

  var scenarios = window.prototypeScenarios || [];
  var scenarioById = {};
  scenarios.forEach(function (s) { scenarioById[s.id] = s; });

  var UNSUPPORTED_MESSAGE =
    "இந்தக் கருத்துச் செயல்விளக்கத்தில் தற்போது மூன்று முன்தயாரிக்கப்பட்ட எடுத்துக்காட்டுகள் உள்ளன. மேலுள்ள எடுத்துக்காட்டுகளில் ஒன்றைத் தேர்ந்தெடுக்கவும்.";

  var STAGE_STEP_DELAY = 350;
  var FSM_NODE_DELAY = 180;

  var els = {};
  var pendingTimers = [];

  function $(id) { return document.getElementById(id); }

  function cacheEls() {
    els.form = $("prototype-form");
    els.input = $("prompt-input");
    els.workflowStatus = $("workflow-status");
    els.skip = $("skip-animation");
    els.userMessage = $("user-message");
    els.assistant = $("assistant-output");
    els.media = $("media-output");
    els.sourceList = $("source-list");
    els.tpsList = $("tps-list");
    els.evidenceList = $("evidence-list");
    els.interpretationList = $("interpretation-list");
    els.fsmPath = $("fsm-path");
    els.stages = {
      tps: $("stage-tps"),
      evidence: $("stage-evidence"),
      classification: $("stage-classification"),
      fsm: $("stage-fsm"),
      answer: $("stage-answer")
    };
    els.prompts = Array.prototype.slice.call(
      document.querySelectorAll("button.scenario-prompt")
    );
  }

  function prefersReducedMotion() {
    return window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function clearTimers() {
    pendingTimers.forEach(function (t) {
      clearTimeout(t);
    });
    pendingTimers = [];
  }

  function schedule(fn, delay) {
    if (prefersReducedMotion()) {
      fn();
      return;
    }
    pendingTimers.push(setTimeout(fn, delay));
  }

  function clearChildren(node) {
    while (node && node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

  function setText(node, text) {
    if (!node) return;
    clearChildren(node);
    node.appendChild(document.createTextNode(text == null ? "" : String(text)));
  }

  function el(tag, opts) {
    var node = document.createElement(tag);
    opts = opts || {};
    if (opts.className) node.className = opts.className;
    if (opts.text != null) setText(node, opts.text);
    if (opts.attrs) {
      Object.keys(opts.attrs).forEach(function (k) {
        node.setAttribute(k, opts.attrs[k]);
      });
    }
    return node;
  }

  function hideStages() {
    Object.keys(els.stages).forEach(function (k) {
      var s = els.stages[k];
      if (s) s.classList.remove("is-visible");
    });
  }

  function showStage(k) {
    var s = els.stages[k];
    if (s) s.classList.add("is-visible");
  }

  function resetScenarioSurfaces() {
    clearTimers();
    hideStages();
    clearChildren(els.tpsList);
    clearChildren(els.evidenceList);
    clearChildren(els.interpretationList);
    clearChildren(els.fsmPath);
    clearChildren(els.sourceList);
    clearChildren(els.assistant);
    clearChildren(els.media);
    clearChildren(els.userMessage);
    setText(els.workflowStatus, "");
  }

  function routeInput(raw) {
    var value = (raw || "").trim().toLowerCase();
    if (!value) return null;
    if (/(காணொளி|video|கருதல்|ஆராய்ச்சி|ஐயம்)/.test(value)) {
      return scenarioById["video-state-path"] || null;
    }
    if (/(படம்|image|நினைதல்)/.test(value)) {
      return scenarioById["image-ninaital"] || null;
    }
    if (/(மருட்கை)/.test(value)) {
      return scenarioById["text-marutkai"] || null;
    }
    return null;
  }

  function renderUnsupported() {
    resetScenarioSurfaces();
    setText(els.workflowStatus, "");
    setSkipEnabled(false);
    var bubble = el("div", { className: "bubble bubble-assistant" });
    bubble.appendChild(el("span", {
      className: "bubble-label",
      text: "உதவி / Assistant"
    }));
    var para = el("p", { text: UNSUPPORTED_MESSAGE });
    bubble.appendChild(para);
    els.assistant.appendChild(bubble);
    moveFocus(els.assistant);
  }

  function renderUserPrompt(scenario, displayPrompt) {
    var bubble = el("div", { className: "bubble bubble-user" });
    bubble.appendChild(el("span", { className: "bubble-label", text: "நீங்கள் / You" }));
    var para = el("p", { text: displayPrompt != null ? displayPrompt : scenario.prompt });
    bubble.appendChild(para);
    els.userMessage.appendChild(bubble);
  }

  function renderAssistant(scenario) {
    var bubble = el("div", { className: "bubble bubble-assistant" });
    bubble.appendChild(el("span", {
      className: "bubble-label",
      text: "உதவி / Assistant"
    }));
    var para = el("p", { text: scenario.response });
    bubble.appendChild(para);
    if (scenario.disclosure) {
      bubble.appendChild(el("p", {
        className: "disclosure-inline",
        text: scenario.disclosure
      }));
    }
    els.assistant.appendChild(bubble);
  }

  function renderTps(scenario) {
    clearChildren(els.tpsList);
    scenario.tps.forEach(function (row) {
      var li = el("li", { className: "tps-row" });
      li.appendChild(el("span", { className: "tps-layer", text: row.layer }));
      li.appendChild(el("span", { className: "tps-value", text: row.value }));
      els.tpsList.appendChild(li);
    });
  }

  function renderEvidence(scenario) {
    clearChildren(els.evidenceList);
    clearChildren(els.sourceList);
    scenario.evidence.forEach(function (item) {
      els.evidenceList.appendChild(buildEvidenceCard(item));
      els.sourceList.appendChild(buildSourceRow(item));
    });
  }

  function buildEvidenceCard(item) {
    var card = el("article", { className: "evidence-card" });
    card.appendChild(el("span", { className: "evidence-badge", text: item.type }));
    card.appendChild(el("h4", { className: "evidence-label", text: item.label }));
    card.appendChild(el("p", { className: "evidence-detail", text: item.detail }));
    return card;
  }

  function buildSourceRow(item) {
    var li = el("li", { className: "source-row" });
    li.appendChild(el("span", { className: "evidence-badge", text: item.type }));
    li.appendChild(el("span", { className: "source-label", text: item.label }));
    return li;
  }

  function renderInterpretation(scenario) {
    clearChildren(els.interpretationList);
    scenario.interpretation.forEach(function (row) {
      var li = el("li", { className: "interp-row" });
      li.appendChild(el("span", { className: "interp-label", text: row.label }));
      li.appendChild(el("span", { className: "interp-value", text: row.value }));
      els.interpretationList.appendChild(li);
    });
  }

  function renderFsm(scenario) {
    clearChildren(els.fsmPath);
    var trigger = scenario.fsm && scenario.fsm.trigger;
    if (trigger) {
      var triggerRow = el("p", { className: "fsm-trigger" });
      triggerRow.appendChild(el("span", {
        className: "fsm-trigger-label",
        text: "தூண்டல் / Trigger:"
      }));
      triggerRow.appendChild(el("span", { className: "fsm-trigger-value", text: trigger }));
      els.fsmPath.appendChild(triggerRow);
    }
    var nodes = (scenario.fsm && scenario.fsm.nodes) || [];
    var ol = el("ol", { className: "fsm-path" });
    els.fsmPath.appendChild(ol);
    nodes.forEach(function (label, idx) {
      var node = el("li", { className: "fsm-node" });
      node.appendChild(el("span", { className: "fsm-node-label", text: label }));
      node.appendChild(el("span", { className: "fsm-node-state", text: "காத்திருக்கிறது / Pending" }));
      ol.appendChild(node);
    });
    return ol.querySelectorAll(".fsm-node");
  }

  function setFsmProgress(nodes, activeIndex) {
    nodes.forEach(function (node, idx) {
      node.classList.toggle("is-complete", idx < activeIndex);
      node.classList.toggle("is-active", idx === activeIndex);
      var state = node.querySelector(".fsm-node-state");
      if (idx < activeIndex) setText(state, "முடிந்தது / Complete");
      else if (idx === activeIndex) setText(state, "செயலில் / Active");
      else setText(state, "காத்திருக்கிறது / Pending");
    });
  }

  function animateFsmNodes(nodes, startDelay) {
    if (!nodes || !nodes.length) return;
    nodes.forEach(function (node, idx) {
      schedule(function () {
        setFsmProgress(nodes, idx);
      }, startDelay + idx * FSM_NODE_DELAY);
    });
  }

  function finalizeFsmNodes() {
    if (!els.fsmPath) return;
    var ol = els.fsmPath.querySelector(".fsm-path");
    if (!ol) return;
    var nodes = ol.querySelectorAll(".fsm-node");
    setFsmProgress(nodes, nodes.length - 1);
  }

  function renderMedia(scenario) {
    clearChildren(els.media);
    if (!scenario.media) return;
    if (scenario.media.type === "image") {
      renderImageMedia(scenario.media);
    } else if (scenario.media.type === "videos") {
      renderVideoCollection(scenario.media);
    }
  }

  function renderImageMedia(media) {
    var figure = el("figure", { className: "media-figure" });
    var img = el("img", {
      className: "img-fluid media-16x9",
      attrs: {
        src: media.src,
        alt: media.alt || ""
      }
    });
    figure.appendChild(img);
    figure.appendChild(el("figcaption", {
      className: "media-caption",
      text: "முன்தயாரிக்கப்பட்ட காட்சி / Prepared demonstration artifact."
    }));
    els.media.appendChild(figure);
  }

  function renderVideoCollection(media) {
    var collection = el("div", { className: "video-collection" });
    var videos = [];
    (media.items || []).forEach(function (item) {
      var card = buildVideoCard(item);
      collection.appendChild(card);
      var video = card.querySelector("video");
      if (video) videos.push(video);
    });
    videos.forEach(function (video) {
      video.addEventListener("play", function () {
        videos.forEach(function (other) {
          if (other !== video && !other.paused) {
            other.pause();
          }
        });
      });
    });
    els.media.appendChild(collection);
  }

  function buildVideoCard(media) {
    var card = el("article", { className: "video-card" });
    card.appendChild(el("h4", { className: "video-title", text: media.title }));
    var figure = el("figure", { className: "media-figure" });
    var video = el("video", {
      className: "media-16x9",
      attrs: {
        controls: "",
        preload: "metadata",
        playsinline: "",
        poster: media.poster || "",
        "aria-label": media.ariaLabel || ""
      }
    });
    var source = el("source", {
      attrs: {
        src: media.src,
        type: "video/mp4"
      }
    });
    video.appendChild(source);
    var fallback = el("p", { className: "video-fallback" });
    fallback.appendChild(document.createTextNode("உங்கள் உலாவி காணொளியை இயக்க முடியவில்லை. "));
    var link = el("a", {
      attrs: { href: media.src }
    });
    link.textContent = "உள்ளூர் MP4 காணொளியைத் திறக்கவும் / Open the local MP4";
    fallback.appendChild(link);
    video.appendChild(fallback);
    figure.appendChild(video);
    figure.appendChild(el("figcaption", {
      className: "media-caption",
      text: media.caption
    }));
    if (media.transcript) {
      var transcript = el("details", {
        className: "media-transcript",
        attrs: { open: "" }
      });
      transcript.appendChild(el("summary", {
        text: "காட்சிவிளக்கம் / Scene description"
      }));
      transcript.appendChild(el("p", { text: media.transcript }));
      figure.appendChild(transcript);
    }
    card.appendChild(figure);
    if (media.boundary) {
      var aside = el("aside", { className: "media-boundary", attrs: { role: "note" } });
      aside.appendChild(el("h5", { text: "ஆய்வியல் வரம்பு / Scholarly boundary" }));
      aside.appendChild(el("p", { text: media.boundary.ta }));
      aside.appendChild(el("p", { text: media.boundary.en }));
      card.appendChild(aside);
    }
    return card;
  }

  function scrollToWorkflow() {
    if (!els.workflowStatus) return;
    els.workflowStatus.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start"
    });
  }

  function moveFocus(target) {
    if (!target) return;
    target.setAttribute("tabindex", "-1");
    try {
      target.focus({ preventScroll: true });
    } catch (e) {
      target.focus();
    }
  }

  function setSkipEnabled(enabled) {
    if (!els.skip) return;
    if (enabled) {
      els.skip.removeAttribute("disabled");
    } else {
      els.skip.setAttribute("disabled", "");
    }
  }

  function loadScenario(scenario, displayPrompt) {
    if (!scenario) {
      renderUnsupported();
      return;
    }
    resetScenarioSurfaces();
    setText(els.workflowStatus, "செயலோட்டம் / Application workflow");
    scrollToWorkflow();
    renderUserPrompt(scenario, displayPrompt);
    renderTps(scenario);
    renderEvidence(scenario);
    renderInterpretation(scenario);
    var fsmNodes = renderFsm(scenario);
    var nodeCount = fsmNodes.length;

    if (prefersReducedMotion()) {
      showStage("tps");
      showStage("evidence");
      showStage("classification");
      showStage("fsm");
      finalizeFsmNodes();
      showStage("answer");
      renderAssistant(scenario);
      renderMedia(scenario);
      setSkipEnabled(false);
      moveFocus(els.workflowStatus);
      return;
    }

    setSkipEnabled(true);
    var fsmStart = STAGE_STEP_DELAY * 4;
    schedule(function () { showStage("tps"); }, STAGE_STEP_DELAY);
    schedule(function () { showStage("evidence"); }, STAGE_STEP_DELAY * 2);
    schedule(function () { showStage("classification"); }, STAGE_STEP_DELAY * 3);
    schedule(function () { showStage("fsm"); }, fsmStart);
    animateFsmNodes(fsmNodes, fsmStart + FSM_NODE_DELAY);
    schedule(function () {
      showStage("answer");
      renderAssistant(scenario);
      renderMedia(scenario);
      setSkipEnabled(false);
      moveFocus(els.workflowStatus);
    }, fsmStart + nodeCount * FSM_NODE_DELAY + 100);
  }

  function skipAnimation() {
    if (prefersReducedMotion()) return;
    clearTimers();
    var scenario = currentScenario;
    if (!scenario) return;
    showStage("tps");
    showStage("evidence");
    showStage("classification");
    showStage("fsm");
    showStage("answer");
    finalizeFsmNodes();
    if (!els.assistant.hasChildNodes()) {
      renderAssistant(scenario);
    }
    if (!els.media.hasChildNodes()) {
      renderMedia(scenario);
    }
    setText(els.workflowStatus, "செயலோட்டம் / Application workflow");
    setSkipEnabled(false);
    moveFocus(els.workflowStatus);
  }

  var currentScenario = null;

  function selectScenarioById(id) {
    var scenario = scenarioById[id];
    if (!scenario) {
      renderUnsupported();
      return;
    }
    currentScenario = scenario;
    loadScenario(scenario);
  }

  function handleSubmit(event) {
    event.preventDefault();
    var value = els.input ? els.input.value : "";
    var scenario = routeInput(value);
    if (!scenario) {
      currentScenario = null;
      renderUnsupported();
      return;
    }
    currentScenario = scenario;
    loadScenario(scenario, value.trim());
  }

  function init() {
    cacheEls();
    if (els.prompts) {
      els.prompts.forEach(function (btn) {
        btn.addEventListener("click", function () {
          var id = btn.getAttribute("data-scenario");
          selectScenarioById(id);
        });
      });
    }
    if (els.form) {
      els.form.addEventListener("submit", handleSubmit);
    }
    if (els.skip) {
      els.skip.addEventListener("click", skipAnimation);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
