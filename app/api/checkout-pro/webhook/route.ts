import { createAdminClient } from "@/lib/supabase/admin";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";

const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

function getTopicAndId(request: NextRequest): { topic: string | null; id: string | null } {
  const url = request.nextUrl;

  const queryTopic = url.searchParams.get("topic");
  const queryId = url.searchParams.get("id");
  if (queryTopic && queryId) return { topic: queryTopic, id: queryId };

  return { topic: null, id: null };
}

export async function GET(request: NextRequest) {
  const { topic, id } = getTopicAndId(request);
  if (!topic || !id) {
    return NextResponse.json(
      { error: "Parâmetros topic e id são obrigatórios." },
      { status: 400 }
    );
  }
  return handleNotification(request, topic, id);
}

export async function POST(request: NextRequest) {
  let topic: string | null = null;
  let id: string | null = null;

  const fromQuery = getTopicAndId(request);
  if (fromQuery.topic && fromQuery.id) {
    topic = fromQuery.topic;
    id = fromQuery.id;
  } else {
    try {
      const body = await request.json();
      if (body.data?.id) {
        id = String(body.data.id);
        topic = body.type ?? body.topic ?? "payment";
      } else if (body.id != null) {
        id = String(body.id);
        topic = body.topic ?? body.type ?? "payment";
      }
    } catch {
      // body não é JSON ou está vazio
    }
  }

  if (!topic || !id) {
    return NextResponse.json(
      { error: "Não foi possível obter topic e id da notificação." },
      { status: 400 }
    );
  }

  return handleNotification(request, topic, id);
}

async function handleNotification(
  _request: NextRequest,
  topic: string,
  id: string
): Promise<NextResponse> {
  if (!accessToken) {
    return NextResponse.json(
      { error: "Webhook não configurado (MERCADOPAGO_ACCESS_TOKEN)." },
      { status: 503 }
    );
  }

  processNotification(topic, id).catch((err: unknown) => {
    console.error("[Checkout Pro Webhook] Erro ao processar notificação:", err);
  });

  return NextResponse.json({ received: true }, { status: 200 });
}

async function processNotification(topic: string, id: string): Promise<void> {
  if (topic !== "payment") {
    console.log("[Checkout Pro Webhook] Tópico ignorado:", topic, "id:", id);
    return;
  }

  const client = new MercadoPagoConfig({
    accessToken: accessToken!,
    options: { timeout: 10000 },
  });
  const paymentClient = new Payment(client);

  try {
    const payment = await paymentClient.get({ id });
    const status = payment.status;
    const externalRef = payment.external_reference ?? "";
    const amount = payment.transaction_amount;

    console.log("[Checkout Pro Webhook] Pagamento:", {
      id: payment.id,
      status,
      status_detail: payment.status_detail,
      external_reference: externalRef,
      transaction_amount: amount,
    });

    if (status === "approved" && amount != null && amount > 0) {
      await registerCreditsAndUpdateProfile({
        paymentId: String(payment.id),
        externalReference: externalRef,
        amount,
      });
    }
  } catch (err) {
    console.error("[Checkout Pro Webhook] Falha ao buscar pagamento:", id, err);
    throw err;
  }
}

/** Formato: credits-{userId}-{timestamp} */
function parseUserIdFromExternalReference(externalRef: string): string | null {
  const match = /^credits-([0-9a-f-]{36})-\d+$/i.exec(externalRef.trim());
  return match ? match[1] : null;
}

async function registerCreditsAndUpdateProfile(params: {
  paymentId: string;
  externalReference: string;
  amount: number;
}): Promise<void> {
  const { paymentId, externalReference, amount } = params;
  const userId = parseUserIdFromExternalReference(externalReference);

  if (!userId) {
    console.warn(
      "[Checkout Pro Webhook] external_reference sem user_id, créditos não atribuídos:",
      externalReference
    );
    return;
  }

  const webhookSecret = process.env.CHECKOUT_WEBHOOK_SECRET;
  if (!webhookSecret?.trim()) {
    console.error("[Checkout Pro Webhook] CHECKOUT_WEBHOOK_SECRET não configurado.");
    return;
  }

  let supabase;
  try {
    supabase = createAdminClient();
  } catch (e) {
    console.error("[Checkout Pro Webhook] SUPABASE_SERVICE_ROLE_KEY não configurado:", e);
    return;
  }

  const { error: rpcError } = await supabase.rpc("register_credits_webhook_internal", {
    p_user_id: userId,
    p_amount: amount,
    p_mp_payment_id: paymentId,
  });

  if (rpcError) {
    console.error("[Checkout Pro Webhook] Erro ao registrar créditos:", rpcError);
    throw rpcError;
  }

  console.log(
    "[Checkout Pro Webhook] Créditos registrados: user_id=",
    userId,
    "valor=",
    amount,
    "payment_id=",
    paymentId
  );
}
