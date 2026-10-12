// Single exit point for every lead. Replace the body once a backend is chosen
// (email, Google Sheet or CRM); callers only rely on it resolving or throwing.
export async function submitLead(lead) {
  console.info('[submitLead]', lead);
  return { ok: true };
}
