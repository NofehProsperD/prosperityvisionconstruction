import { initializeApp, getApps } from "firebase/app";
import { getAI, getGenerativeModel, GoogleAIBackend, InferenceMode } from "firebase/ai";

// Add these VITE_FIREBASE_* values to your client .env file.
// Firebase web config is public clients configuration; protect usage with Firebase App Check. 
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const quickAnswers = [
  {
    match: /\b(hello|hi|hey|good morning|good afternoon)\b/i,
    answer: "Hello! Welcome to Prosperity Vision Construction. I'm Vision Engineer. I can help with construction planning, preliminary estimates, materials, project risks and sustainable building. What would you like to explore?",
  },
  {
    match: /\b(what can you do|what do you do|your services|help me)\b/i,
    answer: "I can help you prepare preliminary work estimates, understand construction materials and methods, plan project stages, identify possible delays and explore sustainable construction options. Tell me about your project and I'll guide you.",
  },
  {
    match: /\b(sustainable construction|green building|eco.?friendly)\b/i,
    answer: "Sustainable construction can include passive ventilation and daylight, efficient insulation, durable locally available materials, responsible water use, waste sorting and reuse, and energy-efficient lighting. The best choices depend on your climate, site, budget and local building rules.",
  },
  {
    match: /\b(estimate|cost estimate|how much.*build|building cost)\b/i,
    answer: "I can help prepare a preliminary estimate. Please share the project type, location, approximate dimensions or floor area, number of floors, quality of finish, and any drawings or bill of quantities you have. An AI estimate is for planning only; confirm quantities and prices with a qualified local quantity surveyor or contractor.",
  },
  {
    match: /\b(delay|project prediction|predict.*project|risk)\b/i,
    answer: "I can help assess project risks, but I need details such as project type, size, location, planned start date, duration, procurement status, workforce and known constraints. I can then outline likely schedule risks and mitigation options. It will be a scenario-based assessment, not a guaranteed prediction.",
  },
];

function getQuickAnswer(question) {
  const item = quickAnswers.find((entry) => entry.match.test(question));
  return item?.answer || null;
}

function buildPrompt(question, history) {
  const transcript = (history || []).slice(-10).map((item) =>
    `${item.role === "assistant" ? "Vision Engineer" : "User"}: ${item.text}`
  ).join("\n");

  return `You are Vision Engineer, the construction-focused AI assistant for Prosperity Vision Construction.

Your scope:
- Preliminary construction work and material estimates.
- Construction methods, planning, sequencing, and practical site advice.
- Scenario-based project/job forecasts and risk analysis.
- Sustainable construction, energy efficiency, water conservation, and waste reduction.
- Explain construction concepts in clear, accessible,educational language.
- Constructin site security/safety  practices/measures 
- Legal,moral and best social  practices  to prioeitize before/during/after  construction projects 


Rules:
1. Be practical, structured, and honest. Ask for missing project details before estimating.
2. Never invent Prosperity Vision Construction company facts, prices, services, projects, staff, or policies. If company-specific information is not supplied, say you do not have verified details.
3. For estimates, clearly state assumptions, units, exclusions, uncertainty, and that local supplier quotations and a qualified quantity surveyor/engineer must verify the result.
4. Never present structural calculations, code compliance, geotechnical conclusions, electrical/gas designs, or safety-critical instructions as certified professional advice. Recommend a licensed local professional and applicable regulations.
5. For predictions, explain assumptions and risks; never promise a guaranteed outcome.
6. Keep answers focused on construction. If a question is unrelated, politely explain your specialist scope.
7. Use plain text headings and bullet points when useful. Do not claim you accessed live job or company databases.

Conversation so far:
${transcript}

Respond to the latest user question:
${question}`;
}

function createHybridModel() {
  const missing = Object.values(firebaseConfig).some((value) => !value);
  if (missing) throw new Error("Firebase is not configured yet. Add the Firebase web app values to your .env file.");

  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  const ai = getAI(app, { backend: new GoogleAIBackend() });
  return getGenerativeModel(ai, {
    model: "gemini-3.5-flash-lite",
    mode: InferenceMode.PREFER_ON_DEVICE,
    generationConfig: { temperature: 0.35, maxOutputTokens: 900 },
  });
}

let modelInstance;

export async function askVisionEngineer({ question, history = [] }) {
  const quick = getQuickAnswer(question);
  if (quick) return { text: quick, source: "frontend" };

  try {
    modelInstance ||= createHybridModel();

    // The web hybrid implementation supports single-turn generation. We pass a
    // compact transcript into each prompt instead of using the multi-turn chat API.
    // This allows the SDK to prefer Chrome on-device inference and fall back to cloud.
    const deviceInit = modelInstance.initializeDeviceModel?.();
    if (deviceInit?.catch) deviceInit.catch(() => {});
    const result = await modelInstance.generateContent(buildPrompt(question, history));
    const text = result?.response?.text?.();
    if (!text) throw new Error("The AI service returned an empty response.");
    const metadata = result?.response?.usageMetadata;
    const source = result?.response?.inferenceMode === "on-device" ? "local" : "cloud";
    return { text, source, metadata };
  } catch (error) {
    console.error("Vision Engineer AI error:", error);
    throw new Error(error?.message || "Unable to reach Firebase AI Logic. Check your Firebase setup and internet connection.");
  }
}
