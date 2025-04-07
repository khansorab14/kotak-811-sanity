// /src/app/api/test-email/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/components/lib/nodemailer";

type WebhookPayload = {
  _id: string;
  _type: string;
  title?: string;
  content?: string;
  _rev: string;
};

let lastSnapshot: Record<string, any> = {}; // TEMP: store last for diff (in real app: use a DB)

export async function POST(req: NextRequest) {
  try {
    const payload: WebhookPayload = await req.json();

    const isDraft = payload._id.startsWith("drafts.");
    const docId = payload._id.replace("drafts.", "");

    const changedFields: string[] = [];

    // Compare new payload to last snapshot (mock)
    for (const key in payload) {
      if (lastSnapshot[key] !== payload[key]) {
        changedFields.push(key);
      }
    }

    // Save the snapshot for next call (in-memory example)
    lastSnapshot = payload;

    // Compose email
    const html = `
      <h2>Insight Section Updated</h2>
      <p><strong>Document ID:</strong> ${docId}</p>
      <p><strong>Draft:</strong> ${isDraft ? "Yes" : "No"}</p>
      <p><strong>Changed Fields:</strong> ${changedFields.join(", ") || "Unknown"}</p>
      <br/>
      <p>Please review the changes before publishing.</p>
    `;

    await sendMail(
      "sohrabmkhan@acpce.ac.coma",
      "Update Detected: Insight Section",
      html
    );

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Webhook email failed:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
