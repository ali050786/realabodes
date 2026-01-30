import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
    name: string;
    email: string;
    phone?: string;
    message: string;
    to_email: string;
}

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const { name, email, phone, message, to_email }: EmailRequest = await req.json();

        if (!RESEND_API_KEY) {
            console.error("RESEND_API_KEY is not set");
            // We still return 200 to not break the frontend flow, but log the error
            return new Response(
                JSON.stringify({ error: "Server configuration error: Missing API Key" }),
                {
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                    status: 500,
                }
            );
        }

        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: "Contact Form <onboarding@resend.dev>", // Start with the testing email
                to: [to_email], // The admin email configured in settings
                subject: `New Inquiry from ${name}`,
                html: `
          <h1>New Contact Inquiry</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="background: #f9f9f9; padding: 10px; border-left: 5px solid #ccc;">
            ${message}
          </blockquote>
        `,
            }),
        });

        const data = await res.json();

        return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
        });
    }
});
