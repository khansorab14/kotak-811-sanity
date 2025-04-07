import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/components/lib/nodemailer";

type WebhookPayload = {
  _id: string;
  _type: string;
  title?: string;
  content?: string;
  _rev: string;
};

// let lastSnapshot: Record<string, unknown> = {}; // TEMP: store last for diff (in real app: use a DB)

export async function POST(req: NextRequest) {
  try {
    console.log("sending email");
    const payload: WebhookPayload = await req.json();
    console.log(payload, "payload");
    const title = payload.title || "No title";
    const sectionId = payload._id;
    // const isDraft = payload._id.startsWith("drafts.");
    // const docId = payload._id.replace("drafts.", "");

    const changedFields: string[] = [];

    // Compare new payload to last snapshot (mock)
    // for (const key in payload) {
    //   if (lastSnapshot[key] !== payload[key]) {
    //     changedFields.push(key);
    //   }
    // }

    // Save the snapshot for next call (in-memory example)
    // lastSnapshot = payload;

    // Compose email
    const html = `
      <h2>Insight Section Updated</h2>
      <p><strong>Title </strong>${title} </p>
      <p><strong>Section URL </strong>http://localhost:3333/structure/collection;959f7a0c-e838-4371-bae8-3a21eb633292;${sectionId}%2Ctype%3DinsightSection%2CparentRefPath%3Dsections%255B_key%253D%253D%25224d8ebd2473b1%2522%255D </p>
      <p><strong>Changed Fields:</strong> ${changedFields.join(", ") || "Unknown"}</p>
      <br/>
      <p>Please review the changes before publishing.</p>
    `;

    await sendMail(
      "sohrabmkhan@acpce.ac.com",
      "Update Detected: Insight Section",
      html
    );

    return NextResponse.json({ success: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Webhook email failed:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
