// AUTO-GENERATED FILE.
// Do not edit asset/main.js directly.
// Edit asset/main.ts and run: npm run build.
// @ts-nocheck
const CONFIG_KEY = "holdem-trainer-v3-config";
const STATS_KEY = "holdem-trainer-v3-stats";
const MIN_PLAYER_COUNT = 2;
const MAX_PLAYER_COUNT = 9;
const DEFAULT_PLAYER_COUNT = 6;
const PREFLOP_CALL_MARGIN = 0.005;
const POSTFLOP_CALL_MARGIN = 0.015;
const MISTAKE_RECOVERY_MARGIN = 0.02;
const defaultConfig = {
    mode: "equity-bucket",
    streetMode: "random",
    playerCountMode: "random",
    timerMode: "off",
    timerSeconds: null,
    revealPressureBeforeDecision: false,
    revealPressureAfterDecision: true,
    simulationTrials: 20000,
    allowPause: true,
    autoSubmitOnTimeout: true,
    showTimerBar: true,
    showTimerNumber: true,
    theme: "light",
};
const modeLabels = {
    "equity-bucket": "Equity Bucket",
    "pot-odds": "Pot Odds",
    "bet-sizing": "Bet Sizing",
    "mistake-recovery": "Mistake Recovery",
    "decision-pressure": "Decision Pressure",
    mixed: "Mixed Training",
};
const streetLabels = {
    preflop: "Pre-flop",
    flop: "Flop",
    turn: "Turn",
    river: "River",
    random: "Random",
};
const levelLabels = {
    low: "Low pressure",
    medium: "Medium pressure",
    high: "High pressure",
    extreme: "Extreme pressure",
};
const actionLabels = {
    fold: "Fold",
    check: "Check",
    call: "Call",
    raise: "Raise",
    "all-in": "All-in",
    small: "Small Bet",
    medium: "Medium Bet",
    large: "Large Bet",
    overbet: "Overbet",
};
const driverMeta = {
    potSizePressure: { label: "Pot Size Pressure", short: "Large pot", option: "Pot is large" },
    callAmountPressure: { label: "Call Amount Pressure", short: "Large call", option: "Call amount is large" },
    sunkCostPressure: { label: "Sunk Cost Pressure", short: "Committed too much", option: "Committed amount creates sunk-cost pressure" },
    equityMarginPressure: { label: "Equity Margin Pressure", short: "Close margin", option: "Equity is close to required equity" },
    streetPressure: { label: "Street Pressure", short: "Street pressure", option: "River or limited future-street room" },
    actionPositionPressure: { label: "Action Position Pressure", short: "Action order", option: "Unfavorable action order" },
    blindPressure: { label: "Blind Pressure", short: "Blind role", option: "Blind-role pressure" },
    positionPressure: { label: "Position Pressure", short: "Position disadvantage", option: "Position disadvantage" },
    multiwayPressure: { label: "Multiway Pressure", short: "Multiway pot", option: "Multiway information load" },
    sprPressure: { label: "SPR Pressure", short: "SPR pressure", option: "SPR creates future-street pressure" },
    stackOffPressure: { label: "Stack-off Pressure", short: "Near all-in", option: "Near stack-off threshold" },
    timePressure: { label: "Time Pressure", short: "Time pressure", option: "Timer pressure" },
};
const pressureTrainerDriverKeys = [
    "potSizePressure",
    "callAmountPressure",
    "sunkCostPressure",
    "equityMarginPressure",
    "positionPressure",
    "sprPressure",
    "multiwayPressure",
    "timePressure",
];
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
const suits = ["spades", "hearts", "diamonds", "clubs"];
const suitSymbols = { spades: "♠", hearts: "♥", diamonds: "♦", clubs: "♣" };
const rankValues = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    T: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
};
const equityBuckets = [
    { value: "0-12", label: "0-12%", min: 0, max: 0.125 },
    { value: "13-25", label: "13-25%", min: 0.125, max: 0.25 },
    { value: "26-37", label: "26-37%", min: 0.25, max: 0.375 },
    { value: "38-50", label: "38-50%", min: 0.375, max: 0.5 },
    { value: "51-62", label: "51-62%", min: 0.5, max: 0.625 },
    { value: "63-75", label: "63-75%", min: 0.625, max: 0.75 },
    { value: "76-87", label: "76-87%", min: 0.75, max: 0.875 },
    { value: "88-100", label: "88-100%", min: 0.875, max: 1.01 },
];
const handCategoryNames = {
    0: "high-card",
    1: "pair",
    2: "two-pair",
    3: "trips",
    4: "straight",
    5: "flush",
    6: "full-house",
    7: "quads",
    8: "straight-flush",
};
const app = document.querySelector("#app");
const state = {
    screen: "setup",
    config: loadConfig(),
    stats: loadStats(),
    currentHand: null,
    feedback: null,
    selectedLevel: null,
    selectedDriver: null,
    timer: null,
    timerSnapshot: null,
    currentTimedOut: false,
};
applyTheme(state.config.theme);
class TrainingTimer {
    constructor(totalSeconds) {
        this.totalMs = Math.max(1, Number(totalSeconds) || 1) * 1000;
        this.remainingMs = this.totalMs;
        this.elapsedBeforePause = 0;
        this.startedAt = 0;
        this.state = "idle";
        this.intervalId = null;
        this.tickCallbacks = [];
        this.expireCallbacks = [];
    }
    start() {
        this.clear();
        this.remainingMs = this.totalMs;
        this.elapsedBeforePause = 0;
        this.startedAt = performance.now();
        this.state = "running";
        this.intervalId = window.setInterval(() => this.update(), 120);
        this.emitTick();
    }
    pause() {
        if (this.state !== "running")
            return;
        const snapshot = this.getSnapshot();
        this.elapsedBeforePause = snapshot.elapsedMs;
        this.remainingMs = snapshot.remainingMs;
        this.state = "paused";
        this.clear();
        this.emitTick();
    }
    resume() {
        if (this.state !== "paused")
            return;
        this.clear();
        this.startedAt = performance.now();
        this.state = "running";
        this.intervalId = window.setInterval(() => this.update(), 120);
        this.emitTick();
    }
    stop() {
        if (this.state === "stopped")
            return;
        const snapshot = this.getSnapshot();
        this.remainingMs = snapshot.remainingMs;
        this.state = "stopped";
        this.clear();
        this.emitTick();
    }
    reset(totalSeconds) {
        this.clear();
        if (typeof totalSeconds === "number")
            this.totalMs = Math.max(1, totalSeconds) * 1000;
        this.remainingMs = this.totalMs;
        this.elapsedBeforePause = 0;
        this.startedAt = 0;
        this.state = "idle";
        this.emitTick();
    }
    getSnapshot() {
        const elapsedMs = this.state === "running"
            ? Math.min(this.totalMs, this.elapsedBeforePause + performance.now() - this.startedAt)
            : this.totalMs - this.remainingMs;
        const remainingMs = Math.max(0, this.totalMs - elapsedMs);
        return {
            state: this.state,
            totalMs: this.totalMs,
            remainingMs,
            elapsedMs,
            progress: this.totalMs ? elapsedMs / this.totalMs : 1,
            isExpired: this.state === "expired" || remainingMs <= 0,
        };
    }
    onTick(callback) {
        this.tickCallbacks.push(callback);
        return () => {
            this.tickCallbacks = this.tickCallbacks.filter((item) => item !== callback);
        };
    }
    onExpire(callback) {
        this.expireCallbacks.push(callback);
        return () => {
            this.expireCallbacks = this.expireCallbacks.filter((item) => item !== callback);
        };
    }
    update() {
        if (this.state !== "running")
            return;
        const snapshot = this.getSnapshot();
        this.remainingMs = snapshot.remainingMs;
        if (snapshot.remainingMs <= 0) {
            this.state = "expired";
            this.remainingMs = 0;
            this.clear();
            const expired = this.getSnapshot();
            this.tickCallbacks.forEach((callback) => callback(expired));
            this.expireCallbacks.forEach((callback) => callback(expired));
            return;
        }
        this.emitTick();
    }
    emitTick() {
        const snapshot = this.getSnapshot();
        this.tickCallbacks.forEach((callback) => callback(snapshot));
    }
    clear() {
        if (this.intervalId !== null) {
            window.clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}
function runTimerSelfTest() {
    const timer = new TrainingTimer(1);
    timer.start();
    if (timer.getSnapshot().state !== "running")
        throw new Error("Timer should be running after start");
    timer.pause();
    if (timer.getSnapshot().state !== "paused")
        throw new Error("Timer should be paused after pause");
    timer.resume();
    if (timer.getSnapshot().state !== "running")
        throw new Error("Timer should be running after resume");
    timer.stop();
    if (timer.getSnapshot().state !== "stopped")
        throw new Error("Timer should be stopped after stop");
}
function loadConfig() {
    try {
        return normalizeConfig({ ...defaultConfig, ...JSON.parse(localStorage.getItem(CONFIG_KEY) || "{}") });
    }
    catch {
        return normalizeConfig({ ...defaultConfig });
    }
}
function normalizeConfig(config) {
    const normalized = { ...defaultConfig, ...config };
    if (normalized.playerCountMode !== "random") {
        normalized.playerCountMode = normalizePlayerCount(Number(normalized.playerCountMode));
    }
    return normalized;
}
function saveConfig() {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(state.config));
}
function applyTheme(theme) {
    if (!document.body)
        return;
    document.body.dataset.theme = theme === "dark" ? "dark" : "light";
}
function createStats() {
    return {
        version: 1,
        totalHands: 0,
        correctCount: 0,
        incorrectCount: 0,
        timeoutCount: 0,
        avgDecisionTimeMs: 0,
        avgPressureScore: 0,
        groups: {
            mode: {},
            street: {},
            playerCount: {},
            timer: {},
            pressureLevel: {},
            heroPositionLabel: {},
            heroActionPositionType: {},
            blindRole: {},
        },
        pressure: {
            highPressureHands: 0,
            highPressureCorrect: 0,
            sunkCostMistakeCount: 0,
            overCallUnderPressureCount: 0,
            overFoldUnderPressureCount: 0,
            oversizedBetUnderPressureCount: 0,
            timeoutUnderPressureCount: 0,
            lowPressureTimeTotal: 0,
            lowPressureTimeCount: 0,
            highPressureTimeTotal: 0,
            highPressureTimeCount: 0,
        },
        position: {
            mistakeCountByHeroPositionLabel: {},
        },
    };
}
function loadStats() {
    try {
        return normalizeStats(JSON.parse(localStorage.getItem(STATS_KEY) || "null"));
    }
    catch {
        return createStats();
    }
}
function normalizeStats(candidate) {
    const stats = createStats();
    if (!candidate || typeof candidate !== "object")
        return stats;
    return {
        ...stats,
        ...candidate,
        groups: { ...stats.groups, ...(candidate.groups || {}) },
        pressure: { ...stats.pressure, ...(candidate.pressure || {}) },
        position: { ...stats.position, ...(candidate.position || {}) },
    };
}
function saveStats() {
    localStorage.setItem(STATS_KEY, JSON.stringify(state.stats));
}
function resetStats() {
    state.stats = createStats();
    saveStats();
    render();
}
function startTraining() {
    saveConfig();
    state.screen = "trainer";
    nextHand();
}
function backToSetup() {
    stopTimer();
    state.screen = "setup";
    state.currentHand = null;
    state.feedback = null;
    render();
}
function nextHand() {
    stopTimer();
    state.feedback = null;
    state.selectedLevel = null;
    state.selectedDriver = null;
    state.currentTimedOut = false;
    state.currentHand = generateHand(state.config);
    state.timerSnapshot = null;
    render();
    startTimerIfNeeded();
}
function startTimerIfNeeded() {
    const seconds = getTimerSeconds();
    if (!seconds) {
        state.timerSnapshot = {
            state: "idle",
            totalMs: 0,
            remainingMs: 0,
            elapsedMs: 0,
            progress: 0,
            isExpired: false,
        };
        updateTimerDom(state.timerSnapshot);
        return;
    }
    const timer = new TrainingTimer(seconds);
    state.timer = timer;
    timer.onTick((snapshot) => {
        state.timerSnapshot = snapshot;
        updateTimerDom(snapshot);
    });
    timer.onExpire((snapshot) => {
        state.timerSnapshot = snapshot;
        state.currentTimedOut = true;
        updateTimerDom(snapshot);
        if (state.config.autoSubmitOnTimeout && !state.feedback)
            submitAnswer(null, true);
    });
    timer.start();
}
function stopTimer() {
    if (state.timer) {
        state.timer.stop();
        state.timer = null;
    }
}
function getTimerSeconds() {
    if (state.config.timerMode === "off")
        return null;
    return Math.max(1, Number(state.config.timerSeconds) || 0);
}
function submitAnswer(answer, timedOut = false) {
    if (!state.currentHand || state.feedback)
        return;
    const hand = state.currentHand;
    const snapshot = state.timer ? state.timer.getSnapshot() : state.timerSnapshot;
    const actualTimedOut = timedOut || state.currentTimedOut;
    if (state.timer)
        state.timer.stop();
    let correct = false;
    if (!actualTimedOut) {
        if (hand.mode === "decision-pressure") {
            const level = answer?.level ?? state.selectedLevel;
            const driver = answer?.driver ?? state.selectedDriver;
            correct = level === hand.answer.level && driver === hand.answer.driver;
            answer = { level, driver };
        }
        else {
            correct = answer === hand.answer;
        }
    }
    const feedback = {
        answer,
        correct,
        timedOut: actualTimedOut,
        elapsedMs: snapshot?.elapsedMs ?? 0,
        remainingMs: snapshot?.remainingMs ?? 0,
    };
    state.feedback = feedback;
    updateStats(hand, feedback);
    render();
}
function updateStats(hand, feedback) {
    const stats = state.stats;
    const previousTotal = stats.totalHands;
    stats.totalHands += 1;
    if (feedback.timedOut)
        stats.timeoutCount += 1;
    else if (feedback.correct)
        stats.correctCount += 1;
    else
        stats.incorrectCount += 1;
    stats.avgDecisionTimeMs =
        (stats.avgDecisionTimeMs * previousTotal + feedback.elapsedMs) / Math.max(1, stats.totalHands);
    stats.avgPressureScore =
        (stats.avgPressureScore * previousTotal + hand.pressureResult.score) / Math.max(1, stats.totalHands);
    incrementGroup(stats.groups.mode, hand.mode, feedback.correct, feedback.timedOut);
    incrementGroup(stats.groups.street, hand.street, feedback.correct, feedback.timedOut);
    incrementGroup(stats.groups.playerCount, String(hand.playerCount), feedback.correct, feedback.timedOut);
    incrementGroup(stats.groups.timer, timerBucketLabel(), feedback.correct, feedback.timedOut);
    incrementGroup(stats.groups.pressureLevel, hand.pressureResult.level, feedback.correct, feedback.timedOut);
    incrementGroup(stats.groups.heroPositionLabel, hand.positionState?.heroPositionLabel ?? hand.heroPosition, feedback.correct, feedback.timedOut);
    incrementGroup(stats.groups.heroActionPositionType, hand.heroActionPositionType ?? heroActionPositionTypeForStreet(hand.positionState, hand.street), feedback.correct, feedback.timedOut);
    incrementGroup(stats.groups.blindRole, hand.positionState?.heroBlindRole ?? hand.heroBlindRole ?? "none", feedback.correct, feedback.timedOut);
    const highPressure = hand.pressureResult.level === "high" || hand.pressureResult.level === "extreme";
    if (highPressure) {
        stats.pressure.highPressureHands += 1;
        if (feedback.correct)
            stats.pressure.highPressureCorrect += 1;
        if (feedback.timedOut)
            stats.pressure.timeoutUnderPressureCount += 1;
        stats.pressure.highPressureTimeTotal += feedback.elapsedMs;
        stats.pressure.highPressureTimeCount += 1;
    }
    else {
        stats.pressure.lowPressureTimeTotal += feedback.elapsedMs;
        stats.pressure.lowPressureTimeCount += 1;
    }
    if (!feedback.correct && !feedback.timedOut) {
        const drivers = hand.pressureResult.mainDrivers;
        const positionLabel = hand.positionState?.heroPositionLabel ?? hand.heroPosition;
        stats.position.mistakeCountByHeroPositionLabel[positionLabel] =
            (stats.position.mistakeCountByHeroPositionLabel[positionLabel] || 0) + 1;
        if (drivers.includes("sunkCostPressure"))
            stats.pressure.sunkCostMistakeCount += 1;
        if (feedback.answer === "call" && hand.answer === "fold")
            stats.pressure.overCallUnderPressureCount += 1;
        if (feedback.answer === "fold" && hand.answer === "call")
            stats.pressure.overFoldUnderPressureCount += 1;
        if (["large", "overbet", "all-in"].includes(feedback.answer) && ["check", "small", "medium"].includes(hand.answer)) {
            stats.pressure.oversizedBetUnderPressureCount += 1;
        }
    }
    saveStats();
}
function incrementGroup(group, key, correct, timedOut) {
    if (!group[key])
        group[key] = { total: 0, correct: 0, timeout: 0 };
    group[key].total += 1;
    if (correct)
        group[key].correct += 1;
    if (timedOut)
        group[key].timeout += 1;
}
function generateHand(config) {
    const mode = config.mode === "mixed"
        ? sample(["equity-bucket", "pot-odds", "bet-sizing", "mistake-recovery", "decision-pressure"])
        : config.mode;
    let street = config.streetMode === "random" ? sample(["preflop", "flop", "turn", "river"]) : config.streetMode;
    if (mode === "mistake-recovery" && config.streetMode === "random")
        street = sample(["turn", "river"]);
    const playerCount = normalizePlayerCount(config.playerCountMode === "random" ? randomInt(MIN_PLAYER_COUNT, MAX_PLAYER_COUNT) : Number(config.playerCountMode));
    const ring = tableRingForPlayerCount(playerCount);
    const opponents = ring.filter((target) => target !== "hero");
    const activeOpponents = street === "preflop" ? opponents : shuffle(opponents).slice(0, randomInt(1, Math.max(1, Math.min(playerCount - 1, 5))));
    const activeTargets = ["hero", ...activeOpponents];
    const activeOpponentCount = activeOpponents.length;
    const dealerButtonTarget = safeDealerButtonTarget(playerCount, sample(ring));
    const positionState = derivePositionState({
        playerCount,
        buttonTarget: dealerButtonTarget,
        activeTargets,
        street,
    });
    const heroActionPositionType = heroActionPositionTypeForStreet(positionState, street);
    const positionType = positionState.heroPositionTypeForCurrentStreet;
    const deck = shuffle(createDeck());
    const heroCards = draw(deck, 2);
    const boardCards = draw(deck, boardCountForStreet(street));
    let potSize = randomInt(10, 132);
    let amountToCall = mode === "bet-sizing" ? 0 : randomInt(Math.max(3, potSize * 0.18), Math.max(5, potSize * 0.72));
    let heroCommittedAmount = randomInt(0, 44);
    let heroStackRemaining = randomInt(36, 160);
    if (mode === "mistake-recovery") {
        heroCommittedAmount = randomInt(32, 68);
        heroStackRemaining = randomInt(24, 82);
        potSize = randomInt(heroCommittedAmount + 34, heroCommittedAmount + 116);
        amountToCall = randomInt(Math.max(18, potSize * 0.36), Math.max(24, potSize * 0.86));
    }
    if (mode === "pot-odds") {
        amountToCall = randomInt(Math.max(5, potSize * 0.2), Math.max(8, potSize * 0.76));
    }
    const effectiveStack = Math.max(heroStackRemaining, randomInt(45, 180));
    const sprValue = heroStackRemaining / Math.max(1, potSize);
    const opponentCount = opponentCountForEquity(mode, street, playerCount, activeOpponentCount);
    const trials = Math.min(Math.max(1000, Number(config.simulationTrials) || recommendedTrialCount(street, playerCount)), recommendedTrialCount(street, playerCount));
    const equityResult = estimateEquityMonteCarlo({
        heroCards,
        knownBoard: boardCards,
        opponentCount,
        trials,
    });
    const rawEquity = equityResult.equity;
    const requiredEquityValue = amountToCall > 0 ? amountToCall / (potSize + amountToCall) : 0;
    const realizedEquity = realizeEquityV2({
        rawEquity,
        actionPositionType: heroActionPositionType,
        blindRole: positionState.heroBlindRole,
        activeOpponentCount,
        spr: sprValue,
        street,
    });
    const boardTexture = classifyBoardTexture(boardCards);
    const handCategoryName = boardCards.length >= 3 ? evaluateBestOfSeven([...heroCards, ...boardCards]).categoryName : "high-card";
    const handClass = classifySimpleHand({
        handCategoryName,
        rawEquity,
        realizedEquity,
        boardTexture,
    });
    const actionHistory = buildActionHistory(mode, street, potSize, heroCommittedAmount, heroStackRemaining);
    const pressureResult = calculateDecisionPressure({
        potSize,
        amountToCall,
        heroCommittedAmount,
        heroStackRemaining,
        effectiveStack,
        street,
        positionType,
        positionState,
        actionPositionType: heroActionPositionType,
        blindRole: positionState.heroBlindRole,
        playerCount,
        activeOpponentCount,
        rawEquity,
        realizedEquity,
        requiredEquity: requiredEquityValue,
        spr: sprValue,
        timerEnabled: Boolean(getTimerSeconds()),
        timerSeconds: getTimerSeconds(),
        elapsedMs: null,
        actionHistory,
    });
    const hand = {
        handId: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
        mode,
        street,
        heroCards,
        boardCards,
        playerCount,
        activeOpponentCount,
        activeTargets,
        positionState,
        heroPosition: positionState.heroPositionLabel,
        heroPositionLabel: positionState.heroPositionLabel,
        heroBlindRole: positionState.heroBlindRole,
        heroActionPositionType,
        positionType,
        dealerButtonTarget: positionState.buttonTarget,
        potSize,
        amountToCall,
        heroCommittedAmount,
        heroStackRemaining,
        effectiveStack,
        spr: sprValue,
        actionHistory,
        equityResult,
        equityMethod: "monte-carlo",
        algorithmVersion: "exact-evaluator-monte-carlo-v1",
        boardTexture,
        handCategoryName,
        handClass,
        rawEquity,
        realizedEquity,
        requiredEquity: requiredEquityValue,
        pressureResult,
        answerSource: "monte-carlo-equity",
        answer: null,
        review: "",
    };
    assignAnswer(hand);
    return hand;
}
function assignAnswer(hand) {
    if (hand.mode === "equity-bucket") {
        const bucket = bucketForEquity(hand.rawEquity);
        hand.answer = bucket.value;
        hand.review = `Monte Carlo raw equity is about ${formatPercent(hand.rawEquity)}, landing in the ${bucket.label} bucket.`;
        return;
    }
    if (hand.mode === "pot-odds") {
        hand.answer = isCallSupported({
            street: hand.street,
            realizedEquity: hand.realizedEquity,
            requiredEquity: hand.requiredEquity,
            mode: hand.mode,
        })
            ? "call"
            : "fold";
        hand.review =
            hand.answer === "call"
                ? "Realized equity is above required equity; the call is mathematically supported."
                : "Realized equity does not cover required equity; folding is the cleaner EV decision.";
        return;
    }
    if (hand.mode === "bet-sizing") {
        const sizingInput = {
            realizedEquity: hand.realizedEquity,
            rawEquity: hand.rawEquity,
            spr: hand.spr,
            pressureScore: hand.pressureResult.score,
            activeOpponentCount: hand.activeOpponentCount,
            isInPosition: hand.positionType === "in-position",
            heroBlindRole: hand.heroBlindRole,
            heroPositionLabel: hand.heroPositionLabel,
            boardTexture: hand.boardTexture,
            street: hand.street,
            handClass: hand.handClass,
            hasInitiative: false,
        };
        hand.betPurpose = inferBetPurpose(sizingInput);
        hand.answer = recommendBetSize({ ...sizingInput, betPurpose: hand.betPurpose });
        hand.review =
            hand.answer === "check"
                ? `Bet sizing is heuristic training, not a GTO solver. Purpose: ${hand.betPurpose}; texture: ${hand.boardTexture}; position, SPR, multiway status, and pressure support pot control.`
                : `Bet sizing is heuristic training, not a GTO solver. Purpose: ${hand.betPurpose}; texture: ${hand.boardTexture}; ${actionLabels[hand.answer]} matches position, SPR, multiway status, and board wetness.`;
        return;
    }
    if (hand.mode === "mistake-recovery") {
        hand.answer = isCallSupported({
            street: hand.street,
            realizedEquity: hand.realizedEquity,
            requiredEquity: hand.requiredEquity,
            mode: hand.mode,
        })
            ? "call"
            : "fold";
        hand.review =
            hand.answer === "fold"
                ? "Prior chips are sunk; this spot should be judged by current EV, and calling would extend the mistake."
                : "The previous line was imperfect, but current realized equity still supports continuing.";
        return;
    }
    const driver = canonicalPressureDriver(hand.pressureResult);
    hand.answer = { level: hand.pressureResult.level, driver };
    hand.review = `The main pressure source is ${driverMeta[driver].short}, with level ${levelLabels[hand.pressureResult.level]}.`;
}
function isCallSupported({ street, realizedEquity, requiredEquity, mode }) {
    if (mode === "mistake-recovery")
        return realizedEquity >= requiredEquity + MISTAKE_RECOVERY_MARGIN;
    if (street === "preflop")
        return realizedEquity >= requiredEquity + PREFLOP_CALL_MARGIN;
    return realizedEquity >= requiredEquity + POSTFLOP_CALL_MARGIN;
}
function canonicalPressureDriver(pressureResult) {
    const found = pressureResult.mainDrivers.find((key) => pressureTrainerDriverKeys.includes(key));
    if (found)
        return found;
    if (pressureResult.mainDrivers.includes("stackOffPressure"))
        return "callAmountPressure";
    if (pressureResult.mainDrivers.includes("streetPressure"))
        return "equityMarginPressure";
    if (pressureResult.mainDrivers.includes("actionPositionPressure"))
        return "positionPressure";
    if (pressureResult.mainDrivers.includes("blindPressure"))
        return "positionPressure";
    return pressureTrainerDriverKeys[0];
}
function createDeck() {
    return suits.flatMap((suit) => ranks.map((rank) => ({ rank, suit })));
}
function cardKey(card) {
    return `${card.rank}-${card.suit}`;
}
function removeCards(deck, knownCards) {
    const known = new Set(knownCards.map(cardKey));
    return deck.filter((card) => !known.has(cardKey(card)));
}
function randomIntExclusive(maxExclusive) {
    const max = Math.floor(maxExclusive);
    if (max <= 0)
        throw new Error(`randomIntExclusive requires a positive max, got ${maxExclusive}`);
    if (globalThis.crypto?.getRandomValues) {
        const range = 0x100000000;
        const limit = range - (range % max);
        const buffer = new Uint32Array(1);
        do {
            globalThis.crypto.getRandomValues(buffer);
        } while (buffer[0] >= limit);
        return buffer[0] % max;
    }
    return Math.floor(Math.random() * max);
}
function randomIntBetween(minInclusive, maxInclusive) {
    const min = Math.ceil(Number(minInclusive));
    const max = Math.floor(Number(maxInclusive));
    if (max < min)
        throw new Error(`Invalid random range: ${minInclusive}..${maxInclusive}`);
    return min + randomIntExclusive(max - min + 1);
}
function draw(deck, count) {
    return deck.splice(0, count);
}
function shuffle(items) {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
        const swapIndex = randomIntExclusive(index + 1);
        [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
}
function boardCountForStreet(street) {
    return { preflop: 0, flop: 3, turn: 4, river: 5 }[street];
}
function evaluateFive(cards) {
    if (cards.length !== 5)
        throw new Error(`evaluateFive requires 5 cards, got ${cards.length}`);
    const values = cards.map((card) => rankValues[card.rank]).sort((a, b) => b - a);
    const flush = cards.every((card) => card.suit === cards[0].suit);
    const straightHigh = straightHighCard(values);
    const rankCounts = new Map();
    for (const value of values)
        rankCounts.set(value, (rankCounts.get(value) || 0) + 1);
    const groups = Array.from(rankCounts.entries()).sort((a, b) => b[1] - a[1] || b[0] - a[0]);
    if (flush && straightHigh)
        return evaluatedHand(8, [straightHigh], cards);
    const quad = groups.find(([, count]) => count === 4);
    if (quad) {
        const kicker = groups.find(([, count]) => count === 1)?.[0] ?? 0;
        return evaluatedHand(7, [quad[0], kicker], cards);
    }
    const trip = groups.find(([, count]) => count === 3);
    const pair = groups.find(([, count]) => count === 2);
    if (trip && pair)
        return evaluatedHand(6, [trip[0], pair[0]], cards);
    if (flush)
        return evaluatedHand(5, values, cards);
    if (straightHigh)
        return evaluatedHand(4, [straightHigh], cards);
    if (trip) {
        const kickers = groups.filter(([, count]) => count === 1).map(([rank]) => rank).sort((a, b) => b - a);
        return evaluatedHand(3, [trip[0], ...kickers], cards);
    }
    const pairs = groups.filter(([, count]) => count === 2).map(([rank]) => rank).sort((a, b) => b - a);
    if (pairs.length === 2) {
        const kicker = groups.find(([, count]) => count === 1)?.[0] ?? 0;
        return evaluatedHand(2, [pairs[0], pairs[1], kicker], cards);
    }
    if (pairs.length === 1) {
        const kickers = groups.filter(([, count]) => count === 1).map(([rank]) => rank).sort((a, b) => b - a);
        return evaluatedHand(1, [pairs[0], ...kickers], cards);
    }
    return evaluatedHand(0, values, cards);
}
function evaluateBestOfSeven(cards) {
    if (cards.length < 5 || cards.length > 7) {
        throw new Error(`evaluateBestOfSeven requires 5 to 7 cards, got ${cards.length}`);
    }
    let best = null;
    for (let a = 0; a < cards.length - 4; a += 1) {
        for (let b = a + 1; b < cards.length - 3; b += 1) {
            for (let c = b + 1; c < cards.length - 2; c += 1) {
                for (let d = c + 1; d < cards.length - 1; d += 1) {
                    for (let e = d + 1; e < cards.length; e += 1) {
                        const candidate = evaluateFive([cards[a], cards[b], cards[c], cards[d], cards[e]]);
                        if (!best || candidate.score > best.score)
                            best = candidate;
                    }
                }
            }
        }
    }
    if (!best)
        throw new Error("No five-card hand could be evaluated");
    return best;
}
function compareSevenCardScores(aScore, bScore) {
    if (aScore > bScore)
        return 1;
    if (aScore < bScore)
        return -1;
    return 0;
}
function compareSevenCardHands(a, b) {
    return compareSevenCardScores(evaluateBestOfSeven(a).score, evaluateBestOfSeven(b).score);
}
function evaluatedHand(category, ranksForScore, cards) {
    const normalizedRanks = [...ranksForScore, 0, 0, 0, 0, 0].slice(0, 5);
    const score = normalizedRanks.reduce((total, rank, index) => total + rank * 15 ** (4 - index), category * 15 ** 5);
    return { category, categoryName: handCategoryNames[category], ranks: normalizedRanks, score, cards };
}
function straightHighCard(values) {
    const unique = Array.from(new Set(values));
    if (unique.includes(14))
        unique.push(1);
    unique.sort((a, b) => b - a);
    for (let index = 0; index <= unique.length - 5; index += 1) {
        const windowRanks = unique.slice(index, index + 5);
        if (windowRanks.every((rank, offset) => offset === 0 || rank === windowRanks[offset - 1] - 1)) {
            return windowRanks[0];
        }
    }
    return null;
}
function evaluateCardsForDisplayOnly(cards) {
    if (cards.length < 5) {
        const highRank = Math.max(...cards.map((card) => rankValues[card.rank]), 2);
        return { categoryScore: highRank / 100, drawBonus: 0 };
    }
    const best = evaluateBestOfSeven(cards.slice(0, 7));
    return { categoryScore: 0.16 + best.category * 0.1, drawBonus: cards.length < 7 ? drawBonus(cards) : 0 };
}
function drawBonus(cards) {
    const suitCounts = new Map();
    const rankSet = new Set();
    for (const card of cards) {
        suitCounts.set(card.suit, (suitCounts.get(card.suit) || 0) + 1);
        rankSet.add(rankValues[card.rank]);
    }
    const flushDraw = Array.from(suitCounts.values()).some((count) => count === 4);
    const straightDraw = detectStraightDraw(Array.from(rankSet));
    return (flushDraw ? 0.09 : 0) + (straightDraw ? 0.07 : 0);
}
function detectStraightDraw(values) {
    const unique = new Set(values);
    if (unique.has(14))
        unique.add(1);
    for (let start = 1; start <= 10; start += 1) {
        const hits = [start, start + 1, start + 2, start + 3, start + 4].filter((value) => unique.has(value)).length;
        if (hits >= 4)
            return true;
    }
    return false;
}
function runEvaluatorSelfTests() {
    assertBetter(testCards("As Ks Qs Js Ts"), testCards("Ah Ac Ad As 2d 3c 4h"), "straight flush > four of a kind");
    assertBetter(testCards("Ah Ac Ad As 2d 3c 4h"), testCards("Kh Kc Kd 2s 2h 3d 4c"), "four of a kind > full house");
    assertBetter(testCards("Kh Kc Kd 2s 2h 3d 4c"), testCards("Ah Jh 9h 5h 2h 3c 4d"), "full house > flush");
    assertBetter(testCards("Ah Jh 9h 5h 2h 3c 4d"), testCards("9s 8h 7d 6c 5s 2d 3h"), "flush > straight");
    assertBetter(testCards("9s 8h 7d 6c 5s 2d 3h"), testCards("Qs Qh Qd 9c 6s 2h 3d"), "straight > trips");
    assertBetter(testCards("Qs Qh Qd 9c 6s 2h 3d"), testCards("Js Jh 8d 8c 5s 2h 3d"), "trips > two pair");
    assertBetter(testCards("Js Jh 8d 8c 5s 2h 3d"), testCards("Ts Th 9d 7c 5s 2h 3d"), "two pair > pair");
    assertBetter(testCards("Ts Th 9d 7c 5s 2h 3d"), testCards("As Kd 9h 7c 5s 3d 2c"), "pair > high card");
    const wheel = evaluateBestOfSeven(testCards("As 2d 3c 4h 5s 9d Kc"));
    if (wheel.category !== 4 || wheel.ranks[0] !== 5)
        throw new Error("A-2-3-4-5 straight failed");
    assertBetter(testCards("Ah Ad Kc Qs 9h 4d 2c"), testCards("Ah Ad Jc Ts 9h 4d 2c"), "kicker comparison failed");
    const boardTieA = evaluateBestOfSeven(testCards("Ah Kd Qs Jc Ts 2d 3c"));
    const boardTieB = evaluateBestOfSeven(testCards("Ah Kd Qs Jc Ts 4d 5c"));
    if (boardTieA.score !== boardTieB.score)
        throw new Error("Public board tie should have equal score");
}
function runEquitySmokeTests() {
    const aa = estimateEquityMonteCarlo({
        heroCards: testCards("As Ah"),
        knownBoard: [],
        opponentCount: 1,
        trials: 1500,
    }).equity;
    if (aa < 0.75 || aa > 0.95)
        throw new Error(`AA heads-up equity out of smoke range: ${aa}`);
    const sevenTwo = estimateEquityMonteCarlo({
        heroCards: testCards("7c 2d"),
        knownBoard: [],
        opponentCount: 1,
        trials: 1500,
    }).equity;
    if (sevenTwo < 0.25 || sevenTwo > 0.45)
        throw new Error(`72o heads-up equity out of smoke range: ${sevenTwo}`);
    const lockedBroadway = estimateEquityMonteCarlo({
        heroCards: testCards("2c 3d"),
        knownBoard: testCards("As Kd Qc Jh Ts"),
        opponentCount: 1,
        trials: 500,
    }).equity;
    if (lockedBroadway < 0.45 || lockedBroadway > 0.55) {
        throw new Error(`Locked Broadway equity should be near 50%, got ${lockedBroadway}`);
    }
}
function assertBetter(a, b, message) {
    if (compareSevenCardHands(a, b) <= 0)
        throw new Error(message);
}
function testCards(input) {
    const suitMap = { s: "spades", h: "hearts", d: "diamonds", c: "clubs" };
    return input.split(/\s+/).map((token) => ({
        rank: token[0] === "1" ? "T" : token[0].toUpperCase(),
        suit: suitMap[token[token.length - 1].toLowerCase()],
    }));
}
function estimateEquityMonteCarlo({ heroCards, knownBoard, opponentCount, trials }) {
    validateEquityMonteCarloInput({ heroCards, knownBoard, opponentCount, trials });
    const actualTrials = Math.max(1, Math.floor(trials));
    const actualOpponentCount = Math.max(1, Math.floor(opponentCount));
    const knownCards = [...heroCards, ...knownBoard];
    let equityTotal = 0;
    let wins = 0;
    let ties = 0;
    let losses = 0;
    for (let trial = 0; trial < actualTrials; trial += 1) {
        const deck = shuffle(removeCards(createDeck(), knownCards));
        const board = [...knownBoard, ...draw(deck, 5 - knownBoard.length)];
        const heroScore = evaluateBestOfSeven([...heroCards, ...board]).score;
        let tiedOpponents = 0;
        let lost = false;
        for (let opponent = 0; opponent < actualOpponentCount; opponent += 1) {
            const opponentScore = evaluateBestOfSeven([...draw(deck, 2), ...board]).score;
            const comparison = compareSevenCardScores(heroScore, opponentScore);
            if (comparison < 0) {
                lost = true;
                break;
            }
            if (comparison === 0)
                tiedOpponents += 1;
        }
        if (lost) {
            losses += 1;
            continue;
        }
        if (tiedOpponents > 0) {
            ties += 1;
            equityTotal += 1 / (tiedOpponents + 1);
        }
        else {
            wins += 1;
            equityTotal += 1;
        }
    }
    return {
        equity: equityTotal / actualTrials,
        winRate: wins / actualTrials,
        tieRate: ties / actualTrials,
        loseRate: losses / actualTrials,
        trials: actualTrials,
    };
}
function validateEquityMonteCarloInput({ heroCards, knownBoard, opponentCount, trials }) {
    if (!Array.isArray(heroCards) || heroCards.length !== 2) {
        throw new Error(`estimateEquityMonteCarlo requires exactly 2 hero cards, got ${heroCards?.length ?? 0}`);
    }
    if (!Array.isArray(knownBoard) || knownBoard.length > 5) {
        throw new Error(`estimateEquityMonteCarlo requires knownBoard length <= 5, got ${knownBoard?.length ?? 0}`);
    }
    if (!Number.isFinite(opponentCount) || opponentCount < 1) {
        throw new Error(`estimateEquityMonteCarlo requires at least 1 opponent, got ${opponentCount}`);
    }
    if (!Number.isFinite(trials) || trials < 1) {
        throw new Error(`estimateEquityMonteCarlo requires a positive trial count, got ${trials}`);
    }
    const knownCards = [...heroCards, ...knownBoard];
    const keys = knownCards.map(cardKey);
    if (new Set(keys).size !== keys.length) {
        throw new Error("estimateEquityMonteCarlo does not allow duplicate known cards");
    }
    const cardsNeeded = (5 - knownBoard.length) + Math.floor(opponentCount) * 2;
    const remainingCards = removeCards(createDeck(), knownCards).length;
    if (remainingCards < cardsNeeded) {
        throw new Error(`estimateEquityMonteCarlo needs ${cardsNeeded} cards, only ${remainingCards} remain`);
    }
}
function recommendedTrialCount(street, playerCount) {
    const players = normalizePlayerCount(playerCount);
    const multiwayDiscount = players >= 7 ? 0.75 : players >= 5 ? 0.9 : 1;
    const base = { preflop: 10000, flop: 12000, turn: 9000, river: 6000 }[street];
    return Math.max(4000, Math.round(base * multiwayDiscount));
}
function opponentCountForEquity(mode, street, playerCount, activeOpponentCount) {
    if (mode === "equity-bucket" && street === "preflop")
        return normalizePlayerCount(playerCount) - 1;
    return Math.max(1, Math.min(normalizePlayerCount(playerCount) - 1, activeOpponentCount));
}
function realizeEquityV2(params) {
    let factor = 1;
    if (params.actionPositionType === "in-position")
        factor += 0.05;
    if (params.actionPositionType === "out-of-position")
        factor -= 0.1;
    const multiwayDiscount = params.street === "preflop"
        ? Math.max(0, params.activeOpponentCount - 1) * 0.01
        : Math.max(0, params.activeOpponentCount - 1) * 0.035;
    factor -= multiwayDiscount;
    if (params.street === "preflop" && params.blindRole !== "none")
        factor -= 0.03;
    if (params.street !== "preflop" && params.spr > 6 && params.actionPositionType !== "in-position")
        factor -= 0.06;
    if (params.street === "river")
        factor += 0.02;
    return clamp(params.rawEquity * factor, 0.03, 0.96);
}
function classifyBoardTexture(boardCards) {
    if (boardCards.length < 3)
        return "dry";
    const suitCounts = new Map();
    const ranksOnBoard = boardCards.map((card) => rankValues[card.rank]).sort((a, b) => a - b);
    for (const card of boardCards) {
        suitCounts.set(card.suit, (suitCounts.get(card.suit) || 0) + 1);
    }
    const paired = new Set(ranksOnBoard).size < ranksOnBoard.length;
    if (paired)
        return "paired";
    const maxSuitCount = Math.max(...Array.from(suitCounts.values()));
    if (maxSuitCount >= 3)
        return "monotone";
    const connectedness = ranksOnBoard[ranksOnBoard.length - 1] - ranksOnBoard[0];
    if (maxSuitCount === 2)
        return connectedness <= 5 ? "wet" : "two-tone";
    const highCards = ranksOnBoard.filter((rank) => rank >= 11).length;
    if (connectedness <= 4)
        return "connected";
    if (connectedness <= 6 && ranksOnBoard[ranksOnBoard.length - 1] <= 10)
        return "low-connected";
    if (highCards >= 2 && connectedness > 5)
        return "high-card-dry";
    if (connectedness <= 6)
        return "medium";
    return "dry";
}
function classifySimpleHand({ handCategoryName, rawEquity, realizedEquity }) {
    if (["straight-flush", "quads", "full-house"].includes(handCategoryName))
        return "very-strong-made";
    if (["flush", "straight", "trips"].includes(handCategoryName))
        return "strong-made";
    if (handCategoryName === "two-pair" || realizedEquity >= 0.55)
        return "medium-made";
    if (handCategoryName === "pair" || realizedEquity >= 0.38)
        return "weak-made";
    if (rawEquity >= 0.42)
        return "strong-draw";
    if (realizedEquity >= 0.3)
        return "weak-draw";
    return "air";
}
function inferBetPurpose(input) {
    const multiway = input.activeOpponentCount >= 2;
    const wet = isWetTexture(input.boardTexture);
    if (input.handClass === "very-strong-made")
        return "value";
    if (input.handClass === "strong-made")
        return wet ? "protection" : "value";
    if (input.handClass === "medium-made") {
        if (multiway || !input.isInPosition || input.spr > 6)
            return "pot-control";
        return "thin-value";
    }
    if (input.handClass === "weak-made")
        return "pot-control";
    if (input.handClass === "strong-draw")
        return input.isInPosition && !multiway ? "semi-bluff" : "pot-control";
    if (input.handClass === "weak-draw") {
        return input.isInPosition && input.hasInitiative && !multiway ? "semi-bluff" : "give-up";
    }
    if (input.hasInitiative && input.isInPosition && input.boardTexture === "dry" && !multiway)
        return "bluff";
    return "give-up";
}
function isWetTexture(texture) {
    return texture === "wet" || texture === "monotone" || texture === "connected" || texture === "low-connected";
}
// Heuristic training only. This is not a GTO solver.
function recommendBetSize(input, spr, pressureScore) {
    const params = typeof input === "object"
        ? input
        : {
            realizedEquity: input,
            spr,
            pressureScore,
            activeOpponentCount: 1,
            isInPosition: false,
            heroBlindRole: "none",
            heroPositionLabel: "Unknown",
            boardTexture: "medium",
            hasInitiative: false,
            handClass: "air",
        };
    const purpose = params.betPurpose || inferBetPurpose(params);
    const lowSpr = params.spr <= 1.5;
    const highSpr = params.spr >= 7;
    const activeOpponentCount = Math.max(1, Number(params.activeOpponentCount) || 1);
    const isInPosition = Boolean(params.isInPosition);
    const multiway = activeOpponentCount >= 2;
    const wet = isWetTexture(params.boardTexture);
    if (lowSpr && params.realizedEquity >= 0.45)
        return "all-in";
    if (purpose === "give-up")
        return "check";
    if (purpose === "pot-control")
        return isInPosition ? "check" : "small";
    if (purpose === "thin-value")
        return multiway ? "small" : isInPosition ? "medium" : "small";
    if (purpose === "value") {
        if (params.realizedEquity >= 0.78 && !multiway && !wet && !highSpr)
            return "overbet";
        if (wet || multiway)
            return "large";
        return "medium";
    }
    if (purpose === "protection")
        return multiway || wet ? "large" : "medium";
    if (purpose === "semi-bluff") {
        if (multiway)
            return "small";
        if (!isInPosition && highSpr)
            return "small";
        return wet ? "medium" : "small";
    }
    if (purpose === "bluff")
        return params.pressureScore >= 75 ? "small" : isInPosition ? "small" : "check";
    return "check";
}
function calculateDecisionPressure(input) {
    let sprPressure = 0.8;
    if (input.spr <= 1.5)
        sprPressure = 0.85;
    else if (input.spr <= 4)
        sprPressure = 0.55;
    else if (input.spr <= 8)
        sprPressure = 0.7;
    const actionPositionType = (input.positionState
        ? input.street === "preflop"
            ? input.positionState.heroPreflopActionPosition
            : input.positionState.heroPostflopActionPosition
        : null) ??
        input.actionPositionType ??
        (input.positionType === "in-position" || input.positionType === "out-of-position" ? input.positionType : "unknown");
    const blindRole = input.positionState?.heroBlindRole ?? input.blindRole ?? "none";
    const actionPositionPressureMap = {
        "in-position": 0.25,
        "out-of-position": 0.75,
        unknown: 0.5,
    };
    const actionPositionPressure = actionPositionPressureMap[actionPositionType] ?? actionPositionPressureMap.unknown;
    const blindPressure = blindPressureForRole(blindRole, input.street);
    const breakdown = {
        potSizePressure: clamp01(input.potSize / Math.max(1, input.effectiveStack)),
        callAmountPressure: clamp01(input.amountToCall / Math.max(1, input.heroStackRemaining)),
        sunkCostPressure: clamp01(input.heroCommittedAmount / Math.max(1, input.heroCommittedAmount + input.heroStackRemaining)),
        equityMarginPressure: 1 - clamp01(Math.abs(input.realizedEquity - input.requiredEquity) / 0.25),
        streetPressure: { preflop: 0.25, flop: 0.45, turn: 0.7, river: 0.95 }[input.street],
        actionPositionPressure,
        blindPressure,
        positionPressure: 0.7 * actionPositionPressure + 0.3 * blindPressure,
        multiwayPressure: clamp01((input.activeOpponentCount - 1) / 5),
        sprPressure,
        stackOffPressure: input.amountToCall >= input.heroStackRemaining * 0.75
            ? 1
            : clamp01(input.amountToCall / Math.max(1, input.heroStackRemaining * 0.75)),
        timePressure: input.timerEnabled && input.timerSeconds ? clamp01(1 - input.timerSeconds / 60) : 0,
    };
    const score = Math.round(100 *
        (0.1 * breakdown.potSizePressure +
            0.1 * breakdown.callAmountPressure +
            0.15 * breakdown.sunkCostPressure +
            0.2 * breakdown.equityMarginPressure +
            0.1 * breakdown.streetPressure +
            0.07 * breakdown.actionPositionPressure +
            0.03 * breakdown.blindPressure +
            0.1 * breakdown.multiwayPressure +
            0.05 * breakdown.sprPressure +
            0.05 * breakdown.stackOffPressure +
            0.05 * breakdown.timePressure));
    const level = score <= 30 ? "low" : score <= 60 ? "medium" : score <= 80 ? "high" : "extreme";
    const mainDrivers = Object.entries(breakdown)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([key]) => key);
    const likelyBiases = buildLikelyBiases(mainDrivers, input);
    const explanation = buildPressureExplanation(mainDrivers, input);
    return { score, level, breakdown, mainDrivers, likelyBiases, explanation };
}
function blindPressureForRole(blindRole, street) {
    if (blindRole === "none")
        return 0;
    if (street === "preflop")
        return blindRole === "big-blind" ? 0.65 : 0.75;
    return 0.25;
}
function buildLikelyBiases(mainDrivers, input) {
    const biases = new Set();
    if (mainDrivers.includes("sunkCostPressure"))
        biases.add("Sunk cost");
    if (mainDrivers.includes("callAmountPressure") || mainDrivers.includes("stackOffPressure"))
        biases.add("Loss aversion");
    if (mainDrivers.includes("equityMarginPressure"))
        biases.add("Equity margin hesitation");
    if (mainDrivers.includes("timePressure"))
        biases.add("Rushed decision under time pressure");
    if (mainDrivers.includes("positionPressure") ||
        mainDrivers.includes("actionPositionPressure") ||
        mainDrivers.includes("blindPressure")) {
        biases.add("Position disadvantage reduces realization");
    }
    if (mainDrivers.includes("multiwayPressure"))
        biases.add("Multiway information load");
    if (input.street === "river")
        biases.add("No future street on river");
    return Array.from(biases).slice(0, 4);
}
function buildPressureExplanation(mainDrivers, input) {
    if (mainDrivers.includes("sunkCostPressure")) {
        return "This spot can trigger sunk-cost bias; separate previously committed chips from the EV of the current action.";
    }
    if (mainDrivers.includes("equityMarginPressure")) {
        return "Realized equity is close to required equity; the correct decision depends on margin discipline, not raw equity alone.";
    }
    if (mainDrivers.includes("timePressure")) {
        return `The ${input.timerSeconds ?? 0}s timer can amplify rushed decisions; confirm required equity before acting.`;
    }
    return "Pressure mainly comes from hand structure; keep the decision anchored to equity, pot odds, position, and SPR.";
}
function buildActionHistory(mode, street, potSize, committed, stack) {
    if (mode === "mistake-recovery") {
        const history = [
            action("preflop", "Villain", "CO", "raise", 3, 4, 120),
            action("preflop", "Hero", "BB", "call", 10, 21, stack + committed - 10),
            action("flop", "Villain", "CO", "bet", 22, 43, 98),
            action("flop", "Hero", "BB", "call", 22, 65, Math.max(1, stack + committed - 32)),
        ];
        if (street === "turn" || street === "river") {
            history.push(action("turn", "Villain", "CO", "bet", Math.round(potSize * 0.34), Math.round(potSize * 0.72), 70));
        }
        if (street === "river") {
            history.push(action("river", "Villain", "CO", "bet", Math.round(potSize * 0.62), potSize, 40));
        }
        return history;
    }
    const history = [action("preflop", "Villain", "Button", "raise", 3, 4, 120)];
    if (street !== "preflop") {
        history.push(action("preflop", "Hero", "Blind", "call", 3, 7, stack + committed));
        history.push(action("flop", "Villain", "Button", "bet", Math.max(3, Math.round(potSize * 0.18)), Math.round(potSize * 0.42), 112));
    }
    if (street === "turn" || street === "river") {
        history.push(action("turn", "Hero", "Blind", "check", 0, Math.round(potSize * 0.52), stack));
        history.push(action("turn", "Villain", "Button", "bet", Math.max(6, Math.round(potSize * 0.24)), Math.round(potSize * 0.76), 96));
    }
    if (street === "river") {
        history.push(action("river", "Hero", "Blind", "check", 0, potSize, stack));
    }
    return history;
}
function action(street, playerId, position, playerAction, amount, potAfterAction, stackAfterAction) {
    return { street, playerId, position, action: playerAction, amount, potAfterAction, stackAfterAction };
}
function tableTargetsForPlayerCount(playerCount) {
    const opponentCount = normalizePlayerCount(playerCount) - 1;
    return ["hero", ...Array.from({ length: opponentCount }, (_, index) => `seat-${index}`)];
}
function tableRingForPlayerCount(playerCount) {
    return tableTargetsForPlayerCount(playerCount);
}
function heroPositionForDealerButtonTarget(playerCount, dealerButtonTarget) {
    return derivePositionState({
        playerCount,
        buttonTarget: dealerButtonTarget,
        street: "flop",
    }).heroPositionLabel;
}
function normalizePlayerCount(playerCount) {
    if (!Number.isFinite(playerCount))
        return DEFAULT_PLAYER_COUNT;
    return Math.max(MIN_PLAYER_COUNT, Math.min(MAX_PLAYER_COUNT, Math.floor(playerCount)));
}
function indexOfTargetOrThrow(ring, target) {
    const index = ring.indexOf(target);
    if (index === -1)
        throw new Error(`Target is not in rendered ring: ${target}`);
    return index;
}
function safeDealerButtonTarget(playerCount, target) {
    const ring = tableRingForPlayerCount(playerCount);
    if (target && ring.includes(target))
        return target;
    return sample(ring);
}
function offsetFromButton(ring, buttonTarget, target) {
    const buttonIndex = indexOfTargetOrThrow(ring, buttonTarget);
    const targetIndex = indexOfTargetOrThrow(ring, target);
    return (targetIndex - buttonIndex + ring.length) % ring.length;
}
function positionLabelForOffset(offset, playerCount) {
    const positionByPlayerCount = {
        2: ["Button / Small Blind", "Big Blind"],
        3: ["Button", "Small Blind", "Big Blind"],
        4: ["Button", "Small Blind", "Big Blind", "Cutoff"],
        5: ["Button", "Small Blind", "Big Blind", "Under the Gun", "Cutoff"],
        6: ["Button", "Small Blind", "Big Blind", "Under the Gun", "Hijack", "Cutoff"],
        7: ["Button", "Small Blind", "Big Blind", "Under the Gun", "Lojack", "Hijack", "Cutoff"],
        8: ["Button", "Small Blind", "Big Blind", "Under the Gun", "UTG+1", "Lojack", "Hijack", "Cutoff"],
        9: [
            "Button",
            "Small Blind",
            "Big Blind",
            "Under the Gun",
            "UTG+1",
            "Middle Position",
            "Lojack",
            "Hijack",
            "Cutoff",
        ],
    };
    const positions = positionByPlayerCount[normalizePlayerCount(playerCount)] ?? positionByPlayerCount[DEFAULT_PLAYER_COUNT];
    return positions[offset] ?? "Middle Position";
}
function blindRoleForPositionLabel(label) {
    if (label === "Button / Small Blind")
        return "button-small-blind";
    if (label === "Small Blind")
        return "small-blind";
    if (label === "Big Blind")
        return "big-blind";
    return "none";
}
function targetAtOffsetFromButton(ring, buttonIndex, offset) {
    return ring[(buttonIndex + offset) % ring.length];
}
function postflopActionOrder(ring, buttonTarget, activeTargets = ring) {
    const buttonIndex = indexOfTargetOrThrow(ring, buttonTarget);
    const active = new Set(activeTargets);
    const order = [];
    for (let offset = 1; offset <= ring.length; offset += 1) {
        const target = targetAtOffsetFromButton(ring, buttonIndex, offset);
        if (active.has(target))
            order.push(target);
    }
    return order;
}
function preflopActionOrder(ring, buttonTarget, activeTargets = ring) {
    const buttonIndex = indexOfTargetOrThrow(ring, buttonTarget);
    const active = new Set(activeTargets);
    const order = [];
    if (ring.length === 2) {
        for (const offset of [0, 1]) {
            const target = targetAtOffsetFromButton(ring, buttonIndex, offset);
            if (active.has(target))
                order.push(target);
        }
        return order;
    }
    for (let offset = 3; offset < ring.length; offset += 1) {
        const target = targetAtOffsetFromButton(ring, buttonIndex, offset);
        if (active.has(target))
            order.push(target);
    }
    for (const offset of [0, 1, 2]) {
        const target = targetAtOffsetFromButton(ring, buttonIndex, offset);
        if (active.has(target))
            order.push(target);
    }
    return order;
}
function actionPositionTypeForTarget(actionOrder, target) {
    const index = actionOrder.indexOf(target);
    if (index === -1)
        return "unknown";
    if (actionOrder.length <= 1)
        return "unknown";
    return index === actionOrder.length - 1 ? "in-position" : "out-of-position";
}
function legacyPositionTypeForStreet({ street, blindRole, preflopActionPosition, postflopActionPosition }) {
    if (street === "preflop") {
        if (blindRole !== "none")
            return "blind";
        return preflopActionPosition;
    }
    return postflopActionPosition;
}
function heroActionPositionTypeForStreet(positionState, street) {
    if (!positionState)
        return "unknown";
    return street === "preflop" ? positionState.heroPreflopActionPosition : positionState.heroPostflopActionPosition;
}
function derivePositionState({ playerCount, buttonTarget, activeTargets, street }) {
    const normalizedPlayerCount = normalizePlayerCount(playerCount);
    const ring = tableRingForPlayerCount(normalizedPlayerCount);
    const buttonIndex = indexOfTargetOrThrow(ring, buttonTarget);
    const heroTarget = "hero";
    const heroIndex = indexOfTargetOrThrow(ring, heroTarget);
    const heroOffsetFromButton = offsetFromButton(ring, buttonTarget, heroTarget);
    const heroPositionLabel = positionLabelForOffset(heroOffsetFromButton, normalizedPlayerCount);
    const heroBlindRole = blindRoleForPositionLabel(heroPositionLabel);
    const effectiveActiveTargets = activeTargets ?? ring;
    const preflopOrder = preflopActionOrder(ring, buttonTarget, effectiveActiveTargets);
    const postflopOrder = postflopActionOrder(ring, buttonTarget, effectiveActiveTargets);
    const heroPreflopActionPosition = actionPositionTypeForTarget(preflopOrder, heroTarget);
    const heroPostflopActionPosition = actionPositionTypeForTarget(postflopOrder, heroTarget);
    const heroPositionTypeForCurrentStreet = legacyPositionTypeForStreet({
        street,
        blindRole: heroBlindRole,
        preflopActionPosition: heroPreflopActionPosition,
        postflopActionPosition: heroPostflopActionPosition,
    });
    return {
        playerCount: normalizedPlayerCount,
        ring,
        buttonTarget,
        buttonIndex,
        heroTarget,
        heroIndex,
        heroOffsetFromButton,
        heroPositionLabel,
        heroBlindRole,
        preflopActionOrder: preflopOrder,
        postflopActionOrder: postflopOrder,
        heroPreflopActionPosition,
        heroPostflopActionPosition,
        heroPositionTypeForCurrentStreet,
    };
}
function runPositionSelfTests() {
    for (let playerCount = MIN_PLAYER_COUNT; playerCount <= MAX_PLAYER_COUNT; playerCount += 1) {
        const ring = tableRingForPlayerCount(playerCount);
        for (const target of ring) {
            const state = derivePositionState({ playerCount, buttonTarget: target, street: "flop" });
            if (!ring.includes(state.buttonTarget))
                throw new Error("Button target is not in ring");
            if (!ring.includes("hero"))
                throw new Error("Hero must be in ring");
        }
    }
    const heroButton = derivePositionState({ playerCount: 6, buttonTarget: "hero", street: "flop" });
    if (heroButton.heroPositionLabel !== "Button") {
        throw new Error(`Expected Hero Button, got ${heroButton.heroPositionLabel}`);
    }
    if (heroButton.heroPositionTypeForCurrentStreet !== "in-position") {
        throw new Error("Hero Button should be in-position postflop");
    }
    const headsUpPreflop = derivePositionState({ playerCount: 2, buttonTarget: "hero", street: "preflop" });
    if (headsUpPreflop.heroPositionLabel !== "Button / Small Blind") {
        throw new Error(`Expected Button / Small Blind, got ${headsUpPreflop.heroPositionLabel}`);
    }
    if (headsUpPreflop.heroBlindRole !== "button-small-blind") {
        throw new Error("Heads-up button should also be small blind");
    }
    if (headsUpPreflop.heroPositionTypeForCurrentStreet !== "blind") {
        throw new Error("Heads-up Button/SB should be treated as blind preflop");
    }
    const headsUpFlop = derivePositionState({ playerCount: 2, buttonTarget: "hero", street: "flop" });
    if (headsUpFlop.heroPositionTypeForCurrentStreet !== "in-position") {
        throw new Error("Heads-up Button/SB should be in-position postflop");
    }
    const cutoff = derivePositionState({ playerCount: 6, buttonTarget: "seat-0", street: "flop" });
    if (cutoff.heroPositionLabel !== "Cutoff") {
        throw new Error(`Expected Hero Cutoff, got ${cutoff.heroPositionLabel}`);
    }
}
function seatLayoutForPlayerCount(playerCount) {
    const safePlayerCount = normalizePlayerCount(playerCount);
    const opponentCount = safePlayerCount - 1;
    const step = 360 / safePlayerCount;
    return Array.from({ length: opponentCount }, (_, index) => {
        const angle = ((90 - (index + 1) * step) * Math.PI) / 180;
        return {
            left: Number((50 + 38 * Math.cos(angle)).toFixed(2)),
            top: Number((50 + 39 * Math.sin(angle)).toFixed(2)),
        };
    });
}
function coordinateForTarget(playerCount, target) {
    if (target === "hero")
        return { left: 50, top: 82 };
    const index = Number(String(target).replace("seat-", ""));
    return seatLayoutForPlayerCount(playerCount)[index] ?? { left: 50, top: 50 };
}
function dealerButtonCoordinateForTarget(playerCount, target) {
    const coord = coordinateForTarget(playerCount, target);
    if (target === "hero")
        return { left: 60, top: 74 };
    const vectorX = coord.left - 50;
    const vectorY = coord.top - 50;
    const length = Math.max(1, Math.hypot(vectorX, vectorY));
    const offset = 7;
    return {
        left: clamp(coord.left + (vectorX / length) * offset, 7, 93),
        top: clamp(coord.top + (vectorY / length) * offset, 7, 88),
    };
}
function render() {
    if (state.screen === "setup")
        renderSetup();
    else
        renderTrainer();
}
function renderSetup() {
    app.innerHTML = `
    <div class="app-shell">
      <header class="app-header">
        <div class="brand">
          <h1>Texas Holdem Decision Trainer</h1>
          <p>
            Equity, Pot Odds,
            <span class="info-popover-wrap inline-popover-wrap" data-popover="bet-sizing-info">
              <button
                type="button"
                class="info-popover-trigger inline-popover-trigger"
                aria-label="Explain current bet sizing behavior"
                aria-expanded="false"
                aria-controls="bet-sizing-popover"
              >Bet Sizing</button>
              <span id="bet-sizing-popover" class="info-popover" role="tooltip">
                <strong>Current Bet Sizing</strong>
                <span>This version uses lightweight heuristic rules to train sizing intuition. It combines realized equity, SPR, position, multiway status, board texture, and pressure to choose check / small / medium / large / overbet / all-in. It is not a GTO solver and does not calculate full EV for every size.</span>
                <strong>What a deeper version would add</strong>
                <span>Future versions could model range advantage, nut advantage, blockers, opponent continuing ranges, and EV across multiple bet sizes.</span>
                <strong>Why keep it light for now</strong>
                <span>The trainer already runs Monte Carlo equity on the main thread. Per-size EV simulation would multiply compute cost, so this version improves rule quality while staying fast and local.</span>
              </span>
            </span>,
            mistake recovery, and timed pressure training.
          </p>
        </div>
        <div class="topbar-right">
          <button class="ghost-button" data-action="toggle-theme">${state.config.theme === "dark" ? "Light" : "Dark"}</button>
          <div class="status-pill">${state.stats.totalHands} hands - ${formatPercent(overallAccuracy())} accuracy</div>
        </div>
      </header>

      <section class="setup-layout">
        <div class="setup-panel">
          ${renderModeControls()}
          ${renderStreetControls()}
          ${renderPlayerControls()}
          ${renderTimerControls()}
          ${renderPressureControls()}
          ${renderSimulationControls()}
          <div class="setup-actions">
            <button class="primary-button" data-action="start">Start Training</button>
            <button class="ghost-button" data-action="reset-stats">Reset Stats</button>
          </div>
        </div>
        ${renderStatsPanel()}
      </section>
    </div>
  `;
}
function renderModeControls() {
    return `
    <section class="control-section">
      <div class="section-title"><h2>Training Mode</h2><span>${state.config.mode === "equity-bucket" ? "Final-showdown equity bucket" : modeLabels[state.config.mode]}</span></div>
      <div class="segmented">
        ${Object.entries(modeLabels)
        .map(([value, label]) => configButton("mode", value, label, state.config.mode === value))
        .join("")}
      </div>
    </section>
  `;
}
function renderStreetControls() {
    return `
    <section class="control-section">
      <div class="section-title"><h2>Street</h2><span>${streetLabels[state.config.streetMode]}</span></div>
      <div class="segmented">
        ${Object.entries(streetLabels)
        .map(([value, label]) => configButton("street", value, label, state.config.streetMode === value))
        .join("")}
      </div>
    </section>
  `;
}
function renderPlayerControls() {
    const values = [2, 3, 4, 5, 6, 7, 8, 9, "random"];
    return `
    <section class="control-section">
      <div class="section-title"><h2>Players</h2><span>${state.config.playerCountMode === "random" ? "Random" : `${state.config.playerCountMode} players`}</span></div>
      <div class="segmented">
        ${values
        .map((value) => configButton("players", value, value === "random" ? "Random" : String(value), String(state.config.playerCountMode) === String(value)))
        .join("")}
      </div>
    </section>
  `;
}
function renderTimerControls() {
    const displayMode = state.config.showTimerBar && state.config.showTimerNumber
        ? "both"
        : state.config.showTimerNumber
            ? "number"
            : state.config.showTimerBar
                ? "bar"
                : "hidden";
    const timerValue = state.config.timerMode === "off" ? "off" : String(state.config.timerSeconds);
    return `
    <section class="control-section">
      <div class="section-title"><h2>Timer</h2><span>${timerBucketLabel()}</span></div>
      <div class="segmented">
        ${["off", 60, 45, 30, 15, 10]
        .map((value) => configButton("timer", value, value === "off" ? "Off" : `${value}s`, timerValue === String(value)))
        .join("")}
        ${configButton("timer", "custom", "Custom", state.config.timerMode === "custom")}
      </div>
      <div class="custom-row ${state.config.timerMode === "custom" ? "" : "hidden"}">
        <label for="customTimer">Seconds</label>
        <input id="customTimer" data-input="custom-timer" type="number" min="3" max="300" value="${state.config.timerSeconds ?? 30}" />
      </div>
      <div class="section-title" style="margin-top: 14px"><h3>Timer display</h3></div>
      <div class="segmented">
        ${[
        ["both", "Number + bar"],
        ["number", "Number"],
        ["bar", "Bar"],
        ["hidden", "Hidden"],
    ]
        .map(([value, label]) => configButton("timerDisplay", value, label, displayMode === value))
        .join("")}
      </div>
      <div class="section-title" style="margin-top: 14px"><h3>Timeout handling</h3></div>
      <div class="segmented">
        ${configButton("timeout", "auto", "Auto-submit", state.config.autoSubmitOnTimeout)}
        ${configButton("timeout", "mark", "Mark timeout", !state.config.autoSubmitOnTimeout)}
      </div>
    </section>
  `;
}
function renderPressureControls() {
    const pressureMode = state.config.revealPressureBeforeDecision
        ? "before"
        : state.config.revealPressureAfterDecision
            ? "after"
            : "hidden";
    return `
    <section class="control-section">
      <div class="section-title"><h2>Pressure display</h2><span>${pressureMode === "before" ? "Before decision" : pressureMode === "after" ? "After decision" : "Stats only"}</span></div>
      <div class="segmented">
        ${[
        ["after", "After decision"],
        ["before", "Before decision"],
        ["hidden", "Hidden"],
    ]
        .map(([value, label]) => configButton("pressure", value, label, pressureMode === value))
        .join("")}
      </div>
    </section>
  `;
}
function renderSimulationControls() {
    return `
    <section class="control-section">
      <div class="section-title"><h2>Simulation Precision</h2><span>${state.config.simulationTrials.toLocaleString()} trials</span></div>
      <div class="range-row">
        <input data-input="trials" type="range" min="5000" max="50000" step="5000" value="${state.config.simulationTrials}" />
        <output>${state.config.simulationTrials.toLocaleString()}</output>
      </div>
    </section>
  `;
}
function configButton(field, value, label, active) {
    return `<button type="button" data-config="${field}" data-value="${value}" aria-pressed="${active}">${label}</button>`;
}
function renderStatsPanel() {
    const stats = state.stats;
    const highAcc = stats.pressure.highPressureHands
        ? stats.pressure.highPressureCorrect / stats.pressure.highPressureHands
        : 0;
    return `
    <aside class="stats-panel">
      <div class="section-title"><h2>Training Stats</h2><span>localStorage</span></div>
      <div class="stats-grid">
        <div class="stat-tile"><strong>${stats.totalHands}</strong><span>Total hands</span></div>
        <div class="stat-tile"><strong>${formatPercent(overallAccuracy())}</strong><span>Accuracy</span></div>
        <div class="stat-tile"><strong>${stats.timeoutCount}</strong><span>Timeouts</span></div>
        <div class="stat-tile"><strong>${Math.round(stats.avgPressureScore)}</strong><span>Avg pressure</span></div>
      </div>
      <section class="control-section">
        <div class="section-title"><h3>By Timer</h3></div>
        <ul class="trend-list">${groupList(stats.groups.timer, "No timed records")}</ul>
      </section>
      <section class="control-section">
        <div class="section-title"><h3>Position</h3></div>
        <ul class="trend-list">${groupList(stats.groups.heroPositionLabel, "No position records")}</ul>
      </section>
      <section class="control-section">
        <div class="section-title"><h3>Action Position</h3></div>
        <ul class="trend-list">${groupList(stats.groups.heroActionPositionType, "No action-position records")}</ul>
      </section>
      <section class="control-section">
        <div class="section-title"><h3>Pressure Performance</h3></div>
        <ul class="compact-list">
          <li><span>High-pressure accuracy</span><strong>${formatPercent(highAcc)}</strong></li>
          <li><span>Sunk-cost mistakes</span><strong>${stats.pressure.sunkCostMistakeCount}</strong></li>
          <li><span>High-pressure timeouts</span><strong>${stats.pressure.timeoutUnderPressureCount}</strong></li>
        </ul>
      </section>
    </aside>
  `;
}
function renderTrainer() {
    const hand = state.currentHand;
    if (!hand)
        return;
    app.innerHTML = `
    <div class="trainer-shell">
      ${renderTopbar(hand)}
      <section class="trainer-main">
        <div class="table-zone">
          ${renderPokerTable(hand)}
          <div class="info-grid">
            ${infoTile("Position", `${hand.positionState?.heroPositionLabel ?? hand.heroPosition}`)}
            ${infoTile("Pot", formatBb(hand.potSize))}
            ${infoTile("Call", hand.amountToCall > 0 ? formatBb(hand.amountToCall) : "None")}
            ${infoTile("SPR", hand.spr.toFixed(1))}
          </div>
          ${renderAnswerOrFeedback(hand)}
        </div>
        ${renderSidePanel(hand)}
      </section>
    </div>
  `;
    updateTimerDom(state.timerSnapshot);
}
function renderTopbar(hand) {
    return `
    <header class="trainer-topbar">
      <div class="topbar-left">
        <button class="icon-button" data-action="setup" title="Back to setup" aria-label="Back to setup">&larr;</button>
        <span class="status-pill">${modeLabels[hand.mode]}</span>
        <span class="status-pill">${streetLabels[hand.street]}</span>
      </div>
      <div class="timer-wrap" data-timer-wrap>
        <div class="timer-line">
          <span class="timer-number ${state.config.showTimerNumber ? "" : "hidden"}" data-timer-number>${getTimerSeconds() ? `${getTimerSeconds()}s` : "No timer"}</span>
          ${state.config.allowPause && getTimerSeconds()
        ? `<button class="ghost-button" data-action="pause">${state.timer?.state === "paused" ? "Resume" : "Pause"}</button>`
        : ""}
        </div>
        <div class="timer-track ${state.config.showTimerBar ? "" : "hidden"}">
          <div class="timer-fill" data-timer-fill></div>
        </div>
      </div>
      <div class="topbar-right">
        <button class="ghost-button" data-action="toggle-theme">${state.config.theme === "dark" ? "Light" : "Dark"}</button>
        <span class="metric-pill">${state.stats.totalHands} hands</span>
        <span class="metric-pill">${formatPercent(overallAccuracy())}</span>
      </div>
    </header>
  `;
}
function renderPokerTable(hand) {
    const ring = hand.positionState?.ring ?? tableRingForPlayerCount(hand.playerCount);
    const activeTargets = new Set(hand.activeTargets ?? ["hero"]);
    const seats = ring.filter((target) => target !== "hero").map((target, index) => {
        const coord = coordinateForTarget(hand.playerCount, target);
        const active = activeTargets.has(target);
        return `
      <div class="seat dynamic-seat ${active ? "active" : ""}" style="--seat-left: ${coord.left}%; --seat-top: ${coord.top}%;">
        <strong>${active ? "Active" : "Seat"} ${index + 1}</strong>
        <span>${randomInt(36, 180)}BB</span>
      </div>
    `;
    }).join("");
    return `
    <div class="poker-table">
      ${seats}
      ${renderDealerButton(hand)}
      <div class="table-center">
        <div class="board-row">${renderBoardCards(hand.boardCards)}</div>
        <div class="pot-stack">
          <span class="pot-chip">Pot ${formatBb(hand.potSize)}</span>
          <span class="pot-chip">Call ${hand.amountToCall > 0 ? formatBb(hand.amountToCall) : "0BB"}</span>
        </div>
      </div>
      <div class="hero-area">
        <div class="hero-label">Hero - ${hand.positionState?.heroPositionLabel ?? hand.heroPosition}</div>
        <div class="hero-cards">${hand.heroCards.map(cardHtml).join("")}</div>
        <div class="seat-label">Stack ${formatBb(hand.heroStackRemaining)} - Invested ${formatBb(hand.heroCommittedAmount)}</div>
      </div>
    </div>
  `;
}
function renderDealerButton(hand) {
    const target = hand.positionState?.buttonTarget ?? hand.dealerButtonTarget ?? "hero";
    const coord = dealerButtonCoordinateForTarget(hand.playerCount, target);
    return `
    <div class="dealer-button" style="--button-left: ${coord.left}%; --button-top: ${coord.top}%;" title="Dealer Button" aria-label="Dealer Button">
      B
    </div>
  `;
}
function renderBoardCards(cards) {
    const realCards = cards.map(cardHtml).join("");
    const emptyCount = Math.max(0, 5 - cards.length);
    const empties = Array.from({ length: emptyCount }, () => `<div class="card empty"><span class="suit">-</span></div>`).join("");
    return `${realCards}${empties}`;
}
function cardHtml(card) {
    const color = card.suit === "hearts" || card.suit === "diamonds" ? "red" : "black";
    const rank = displayRank(card.rank);
    return `
    <div class="card ${color}" aria-label="${rank}${suitSymbols[card.suit]}">
      <span class="rank">${rank}</span>
      <span class="suit">${suitSymbols[card.suit]}</span>
    </div>
  `;
}
function displayRank(rank) {
    return rank === "T" ? "10" : rank;
}
function infoTile(label, value) {
    return `<div class="info-tile"><span>${label}</span><strong>${value}</strong></div>`;
}
function renderSidePanel(hand) {
    return `
    <aside class="side-panel">
      <section class="side-section">
        <div class="section-title"><h3>Current Math</h3></div>
        <ul class="compact-list">
          <li><span>raw equity</span><strong>${formatPercent(hand.rawEquity)}</strong></li>
          <li><span>realized equity</span><strong>${formatPercent(hand.realizedEquity)}</strong></li>
          <li><span>required equity</span><strong>${formatRequiredEquity(hand)}</strong></li>
          <li><span>active opponents</span><strong>${hand.activeOpponentCount}</strong></li>
          <li><span>action position</span><strong>${hand.heroActionPositionType}</strong></li>
          <li><span>blind role</span><strong>${hand.heroBlindRole}</strong></li>
        </ul>
      </section>
      <section class="side-section">
        <div class="section-title"><h3>Action History</h3></div>
        <ul class="action-log">
          ${hand.actionHistory
        .map((item) => `
              <li>
                <span class="street-tag">${streetLabels[item.street]}</span>
                <span>${item.playerId} ${actionLabels[item.action] ?? item.action}</span>
                <strong>${item.amount ? formatBb(item.amount) : ""}</strong>
              </li>
            `)
        .join("")}
        </ul>
      </section>
      <section class="side-section">
        ${renderPressurePreview(hand)}
      </section>
    </aside>
  `;
}
function renderPressurePreview(hand) {
    if (state.config.revealPressureBeforeDecision) {
        return `
      <div class="pressure-preview">
        <span>Decision Pressure Score</span>
        <strong>${hand.pressureResult.score} / 100 - ${levelLabels[hand.pressureResult.level]}</strong>
      </div>
    `;
    }
    if (hand.mode === "decision-pressure") {
        return `
      <div class="pressure-preview">
        <span>Dedicated training</span>
        <strong>Judge the pressure level and main source first</strong>
      </div>
    `;
    }
    return `
    <div class="pressure-preview">
      <span>Decision Pressure Score</span>
      <strong>${state.config.revealPressureAfterDecision ? "Show after decision" : "Stats only"}</strong>
    </div>
  `;
}
function renderAnswerOrFeedback(hand) {
    if (state.feedback)
        return renderFeedback(hand, state.feedback);
    if (hand.mode === "decision-pressure")
        return renderPressureQuestion(hand);
    return renderActionQuestion(hand);
}
function renderActionQuestion(hand) {
    const choices = choicesForMode(hand.mode);
    return `
    <section class="answer-panel">
      <div class="section-title"><h2>${questionText(hand.mode)}</h2><span>${state.currentTimedOut ? "Timed out; continuing will record this hand as a timeout" : ""}</span></div>
      <div class="choice-grid ${choices.length > 4 ? "wide" : ""}">
        ${choices
        .map((choice) => `
            <button class="choice-button" data-answer="${choice.value}">
              ${choice.label}
              ${choice.hint ? `<small>${choice.hint}</small>` : ""}
            </button>
          `)
        .join("")}
      </div>
    </section>
  `;
}
function renderPressureQuestion(hand) {
    return `
    <section class="answer-panel">
      <div class="section-title"><h2>Judge this spot's pressure</h2><span>${state.currentTimedOut ? "Timed out" : ""}</span></div>
      <div class="section-title"><h3>Pressure level</h3></div>
      <div class="choice-grid">
        ${Object.entries(levelLabels)
        .map(([value, label]) => `
            <button class="choice-button ${state.selectedLevel === value ? "selected" : ""}" data-level="${value}">
              ${label}
              <small>${levelRange(value)}</small>
            </button>
          `)
        .join("")}
      </div>
      <div class="section-title" style="margin-top: 14px"><h3>Main pressure source</h3></div>
      <div class="choice-grid wide">
        ${pressureTrainerDriverKeys
        .map((key) => `
            <button class="choice-button ${state.selectedDriver === key ? "selected" : ""}" data-driver="${key}">
              ${driverMeta[key].option}
            </button>
          `)
        .join("")}
      </div>
      <div class="setup-actions">
        <button class="primary-button" data-action="submit-pressure" ${state.selectedLevel && state.selectedDriver ? "" : "disabled"}>Submit judgment</button>
      </div>
    </section>
  `;
}
function renderFeedback(hand, feedback) {
    const badgeClass = feedback.timedOut ? "timeout" : feedback.correct ? "good" : "bad";
    const badgeText = feedback.timedOut ? "Timeout" : feedback.correct ? "Correct" : "Review";
    return `
    <section class="feedback-panel">
      <div class="feedback-head">
        <div>
          <div class="result-badge ${badgeClass}">${badgeText}</div>
        </div>
        <div class="status-pill">Elapsed ${formatSeconds(feedback.elapsedMs)}</div>
      </div>
      <div class="feedback-grid">
        <div class="feedback-box">
          <h3>Result</h3>
          <ul class="compact-list">
            <li><span>Your choice</span><strong>${answerLabel(hand, feedback.answer)}</strong></li>
            <li><span>Recommended</span><strong>${answerLabel(hand, hand.answer)}</strong></li>
            <li><span>Correct</span><strong>${feedback.correct ? "Yes" : "No"}</strong></li>
            <li><span>Timed out</span><strong>${feedback.timedOut ? "Yes" : "No"}</strong></li>
          </ul>
        </div>
        <div class="feedback-box">
          <h3>Math</h3>
          <ul class="compact-list">
            <li><span>raw equity</span><strong>${formatPercent(hand.rawEquity)}</strong></li>
            <li><span>realized equity</span><strong>${formatPercent(hand.realizedEquity)}</strong></li>
            <li><span>required equity</span><strong>${formatRequiredEquity(hand)}</strong></li>
            <li><span>Monte Carlo trials</span><strong>${formatTrials(hand.equityResult?.trials)}</strong></li>
            ${hand.mode === "bet-sizing" ? `<li><span>bet purpose</span><strong>${hand.betPurpose ?? "N/A"}</strong></li>` : ""}
            ${hand.mode === "bet-sizing" ? `<li><span>board texture</span><strong>${hand.boardTexture ?? "N/A"}</strong></li>` : ""}
            <li><span>SPR</span><strong>${hand.spr.toFixed(1)}</strong></li>
          </ul>
        </div>
        <div class="feedback-box">
          <h3>Review</h3>
          <p>${hand.review}</p>
        </div>
      </div>
      ${state.config.revealPressureAfterDecision ? renderPressureFeedback(hand) : `<div class="feedback-box"><h3>Pressure</h3><p>Pressure analysis is hidden, but this hand is still included in pressure stats.</p></div>`}
      <div class="feedback-actions">
        <button class="primary-button" data-action="next">Next hand</button>
        <button class="ghost-button" data-action="setup">Back to setup</button>
      </div>
    </section>
  `;
}
function renderPressureFeedback(hand) {
    const pressure = hand.pressureResult;
    return `
    <div class="feedback-box">
      <h3>Decision Pressure Score</h3>
      <div class="pressure-score"><strong>${pressure.score}</strong><span>/ 100 - ${levelLabels[pressure.level]}</span></div>
      <div class="feedback-grid">
        <div>
          <h3>Main Pressure Sources</h3>
          <ul class="compact-list">
            ${pressure.mainDrivers
        .map((key) => `<li><span>${driverMeta[key].label}</span><strong>${Math.round(pressure.breakdown[key] * 100)}</strong></li>`)
        .join("")}
          </ul>
        </div>
        <div>
          <h3>Likely Biases</h3>
          <ul class="compact-list">${pressure.likelyBiases.map((bias) => `<li><span>${bias}</span><strong></strong></li>`).join("")}</ul>
        </div>
        <div>
          <h3>Explanation</h3>
          <p>${pressure.explanation}</p>
        </div>
      </div>
      <div class="bar-list" style="margin-top: 12px">
        ${Object.entries(pressure.breakdown)
        .map(([key, value]) => `
            <div class="bar-row">
              <span>${driverMeta[key].short}</span>
              <div class="bar-track"><div class="bar-fill" style="width: ${Math.round(value * 100)}%"></div></div>
              <strong>${Math.round(value * 100)}</strong>
            </div>
          `)
        .join("")}
      </div>
    </div>
  `;
}
function choicesForMode(mode) {
    if (mode === "equity-bucket")
        return equityBuckets.map((bucket) => ({ value: bucket.value, label: bucket.label }));
    if (mode === "bet-sizing") {
        return [
            { value: "check", label: "Check" },
            { value: "small", label: "Small", hint: "25-33% pot" },
            { value: "medium", label: "Medium", hint: "50-66% pot" },
            { value: "large", label: "Large", hint: "75-100% pot" },
            { value: "overbet", label: "Overbet", hint: "125% pot+" },
            { value: "all-in", label: "All-in" },
        ];
    }
    if (mode === "mistake-recovery") {
        return [
            { value: "fold", label: "Fold", hint: "Stop the loss" },
            { value: "call", label: "Call", hint: "Current EV supports it" },
            { value: "raise", label: "Raise" },
            { value: "all-in", label: "All-in" },
        ];
    }
    return [
        { value: "fold", label: "Fold" },
        { value: "call", label: "Call" },
    ];
}
function questionText(mode) {
    if (mode === "equity-bucket")
        return "Estimate Hero raw equity bucket";
    if (mode === "pot-odds")
        return "Does realized equity support calling?";
    if (mode === "bet-sizing")
        return "If betting, which size is best?";
    if (mode === "mistake-recovery")
        return "After a prior mistake, what is the current EV correction?";
    return "Choose action";
}
function answerLabel(hand, answer) {
    if (!answer)
        return "No answer";
    if (hand.mode === "decision-pressure" && typeof answer === "object") {
        const level = answer.level ? levelLabels[answer.level] : "No level";
        const driver = answer.driver ? driverMeta[answer.driver].short : "No driver";
        return `${level} / ${driver}`;
    }
    const bucket = equityBuckets.find((item) => item.value === answer);
    return bucket?.label ?? actionLabels[answer] ?? String(answer);
}
function updateTimerDom(snapshot) {
    const wrap = document.querySelector("[data-timer-wrap]");
    if (!wrap)
        return;
    const number = document.querySelector("[data-timer-number]");
    const fill = document.querySelector("[data-timer-fill]");
    const seconds = getTimerSeconds();
    if (!seconds || !snapshot || snapshot.totalMs === 0) {
        if (number)
            number.textContent = "No timer";
        if (fill)
            fill.style.transform = "scaleX(1)";
        wrap.classList.remove("urgent");
        return;
    }
    const remainingRatio = snapshot.totalMs ? snapshot.remainingMs / snapshot.totalMs : 0;
    if (number)
        number.textContent = snapshot.isExpired ? "0s" : formatSeconds(snapshot.remainingMs);
    if (fill)
        fill.style.transform = `scaleX(${Math.max(0, remainingRatio)})`;
    wrap.classList.toggle("urgent", remainingRatio <= 0.2 && snapshot.state !== "paused");
}
function groupList(group, emptyText) {
    const entries = Object.entries(group || {}).sort((a, b) => b[1].total - a[1].total);
    if (!entries.length)
        return `<li><span>${emptyText}</span><strong></strong></li>`;
    return entries
        .slice(0, 6)
        .map(([key, bucket]) => `<li><span>${displayGroupKey(key)}</span><strong>${formatPercent(bucket.correct / bucket.total)}</strong></li>`)
        .join("");
}
function displayGroupKey(key) {
    if (modeLabels[key])
        return modeLabels[key];
    if (streetLabels[key])
        return streetLabels[key];
    if (levelLabels[key])
        return levelLabels[key];
    return key === "off" ? "No timer" : key;
}
function overallAccuracy() {
    return state.stats.totalHands ? state.stats.correctCount / state.stats.totalHands : 0;
}
function timerBucketLabel() {
    if (state.config.timerMode === "off" || !state.config.timerSeconds)
        return "No timer";
    return `${state.config.timerSeconds}s`;
}
function bucketForEquity(equity) {
    return equityBuckets.find((bucket) => equity >= bucket.min && equity < bucket.max) ?? equityBuckets[0];
}
function levelRange(level) {
    return { low: "0-30", medium: "31-60", high: "61-80", extreme: "81-100" }[level];
}
function formatPercent(value) {
    return `${Math.round((Number(value) || 0) * 100)}%`;
}
function formatRequiredEquity(hand) {
    return hand.amountToCall > 0 ? formatPercent(hand.requiredEquity) : "N/A";
}
function formatTrials(trials) {
    return Number.isFinite(trials) ? Math.round(trials).toLocaleString() : "N/A";
}
function formatBb(value) {
    return `${Math.round(Number(value) || 0)}BB`;
}
function formatSeconds(ms) {
    return `${Math.max(0, Math.ceil((Number(ms) || 0) / 1000))}s`;
}
function clamp01(value) {
    return clamp(value, 0, 1);
}
function clamp(value, min, max) {
    return Math.min(max, Math.max(min, Number(value) || 0));
}
function randomInt(min, max) {
    return randomIntBetween(min, max);
}
function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}
function sample(items) {
    return items[randomIntExclusive(items.length)];
}
app.addEventListener("click", (event) => {
    const target = event.target.closest("button");
    if (!target)
        return;
    if (target.classList.contains("info-popover-trigger")) {
        event.preventDefault();
        event.stopPropagation();
        toggleInfoPopover(target);
        return;
    }
    const configField = target.dataset.config;
    if (configField) {
        updateConfig(configField, target.dataset.value);
        return;
    }
    if (target.dataset.answer) {
        submitAnswer(target.dataset.answer, state.currentTimedOut);
        return;
    }
    if (target.dataset.level) {
        state.selectedLevel = target.dataset.level;
        render();
        return;
    }
    if (target.dataset.driver) {
        state.selectedDriver = target.dataset.driver;
        render();
        return;
    }
    const actionName = target.dataset.action;
    if (!actionName)
        return;
    if (actionName === "start")
        startTraining();
    if (actionName === "next")
        nextHand();
    if (actionName === "setup")
        backToSetup();
    if (actionName === "reset-stats")
        resetStats();
    if (actionName === "submit-pressure")
        submitAnswer({ level: state.selectedLevel, driver: state.selectedDriver }, state.currentTimedOut);
    if (actionName === "pause")
        togglePause();
    if (actionName === "toggle-theme")
        toggleTheme();
});
app.addEventListener("input", (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement))
        return;
    if (input.dataset.input === "custom-timer") {
        state.config.timerMode = "custom";
        state.config.timerSeconds = clamp(Number(input.value), 3, 300);
        saveConfig();
    }
    if (input.dataset.input === "trials") {
        state.config.simulationTrials = Number(input.value);
        saveConfig();
        render();
    }
});
document.addEventListener("click", () => {
    closeInfoPopovers();
});
function toggleInfoPopover(trigger) {
    const wrap = trigger.closest(".info-popover-wrap");
    if (!wrap)
        return;
    const willOpen = !wrap.classList.contains("open");
    closeInfoPopovers();
    wrap.classList.toggle("open", willOpen);
    trigger.setAttribute("aria-expanded", willOpen ? "true" : "false");
}
function closeInfoPopovers() {
    document.querySelectorAll(".info-popover-wrap.open").forEach((wrap) => {
        wrap.classList.remove("open");
        wrap.querySelector(".info-popover-trigger")?.setAttribute("aria-expanded", "false");
    });
}
function updateConfig(field, value) {
    if (field === "mode")
        state.config.mode = value;
    if (field === "street")
        state.config.streetMode = value;
    if (field === "players")
        state.config.playerCountMode = value === "random" ? "random" : normalizePlayerCount(Number(value));
    if (field === "timer") {
        if (value === "off") {
            state.config.timerMode = "off";
            state.config.timerSeconds = null;
        }
        else if (value === "custom") {
            state.config.timerMode = "custom";
            state.config.timerSeconds = state.config.timerSeconds || 30;
        }
        else {
            state.config.timerMode = "preset";
            state.config.timerSeconds = Number(value);
        }
    }
    if (field === "timerDisplay") {
        state.config.showTimerNumber = value === "both" || value === "number";
        state.config.showTimerBar = value === "both" || value === "bar";
    }
    if (field === "timeout")
        state.config.autoSubmitOnTimeout = value === "auto";
    if (field === "pressure") {
        state.config.revealPressureBeforeDecision = value === "before";
        state.config.revealPressureAfterDecision = value !== "hidden";
    }
    saveConfig();
    applyTheme(state.config.theme);
    render();
}
function togglePause() {
    if (!state.timer)
        return;
    if (state.timer.state === "running")
        state.timer.pause();
    else if (state.timer.state === "paused")
        state.timer.resume();
    render();
}
function toggleTheme() {
    state.config.theme = state.config.theme === "dark" ? "light" : "dark";
    saveConfig();
    applyTheme(state.config.theme);
    render();
}
function runSelfTestsFromUrl() {
    if (new URLSearchParams(window.location.search).get("selftest") !== "1")
        return;
    runEvaluatorSelfTests();
    runEquitySmokeTests();
    runPositionSelfTests();
    runTimerSelfTest();
    console.info("Self-tests passed.");
}
runSelfTestsFromUrl();
render();
