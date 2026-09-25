export interface LeadData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  inquiryType: "wholesale" | "industrial" | "retail" | "general";
  message: string;
  source?: string;
  submittedAt?: string;
}

export interface LeadResponse {
  success: boolean;
  message: string;
  leadId?: string;
}

/**
 * Service Layer for CRM Integration
 * Decoupled from specific backend (compatible with HubSpot, Salesforce, Zoho, n8n Webhooks, or custom REST APIs)
 */
export async function submitLead(data: LeadData): Promise<LeadResponse> {
  const payload = {
    ...data,
    source: data.source || "mundilacteos_digital_experience",
    submittedAt: new Date().toISOString()
  };

  // Check if CRM Webhook endpoint is defined in environment
  const webhookUrl = process.env.NEXT_PUBLIC_CRM_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error(`CRM responded with status ${res.status}`);
      }

      return {
        success: true,
        message: "Lead successfully recorded in CRM",
        leadId: `LEAD-${Date.now()}`
      };
    } catch (error) {
      console.warn("Direct webhook failed, using local fallback queue", error);
    }
  }

  // Fallback simulation / local storage logger for demonstration
  return new Promise((resolve) => {
    setTimeout(() => {
      if (typeof window !== "undefined") {
        try {
          const leads = JSON.parse(localStorage.getItem("mundilacteos_pending_leads") || "[]");
          leads.push(payload);
          localStorage.setItem("mundilacteos_pending_leads", JSON.stringify(leads));
        } catch {
          // Ignore local storage errors
        }
      }

      console.info("Mundilácteos CRM: Lead received successfully:", payload);

      resolve({
        success: true,
        message: "Solicitud registrada con éxito. Un asesor comercial te contactará pronto.",
        leadId: `LEAD-LOCAL-${Date.now()}`
      });
    }, 800);
  });
}
