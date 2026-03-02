import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendReleaseNotification = async (subscribers, release, workspaceId) => {
    if (!subscribers || subscribers.length === 0)
        return;

    const subscriberEmails = subscribers.map((subscriber) => subscriber.email);

    try {
        const { data, error } = await resend.emails.send({
            from: `ChangelogHub <${process.env.RESEND_FROM_EMAIL}>`,
            to: subscriberEmails,
            subject: `🚀 New Update: ${release.title} in ${workspaceId.name}`,
            html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
              <h2 style="color: #6366f1;">New Feature Alert!</h2>
              <p>Hi there,</p>
              <p><strong>${workspaceId.name}</strong> just published a new update:</p>
              <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 20px 0;" />
              <h3 style="margin-bottom: 8px;">${release.title} <span style="font-size: 12px; color: #64748b;">v${release.version || '1.0.0'}</span></h3>
              <div style="color: #334155; line-height: 1.6;">
                ${release.content}
              </div>
              <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 20px 0;" />
              <p style="font-size: 12px; color: #94a3b8;">
                You are receiving this because you subscribed to updates from ${workspaceId.name}. 
                <a href="#" style="color: #6366f1;">Unsubscribe</a>
              </p>
            </div>
            `
        })

        if(error) {
            console.error("Resend Error:", error); 
            return { success: false, error }
        }

        return { success: true, data }

    } catch (err) {
        console.error("Mail Service Error:", err); 
        return { success: false, error: err.message }
    }
}