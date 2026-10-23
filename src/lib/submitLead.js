// The one place every lead form sends its data (PRODUCT.md, CLAUDE.md).
// PLACEHOLDER: no backend is chosen yet (docs/OPEN-ITEMS.md: email, Google Sheet or CRM), so this
// resolves without sending anything and says so with `delivered: false`. Forms must tell the visitor
// the truth while that is the case. When a destination exists, send the lead here and return
// `delivered: true`; no form needs to change.
//
// lead.type is required: "inquiry" or "download".
export async function submitLead(lead) {
  if (!lead || (lead.type !== "inquiry" && lead.type !== "download")) {
    throw new Error('submitLead needs a type of "inquiry" or "download".');
  }
  if (import.meta.env.DEV) console.info(`[submitLead] ${lead.type} lead (not sent: no backend yet)`);
  return { ok: true, delivered: false };
}
