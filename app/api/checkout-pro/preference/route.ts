import { MercadoPagoConfig, Preference } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";

const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
const useSandbox = process.env.MERCADOPAGO_SANDBOX === "true";

export async function POST(request: NextRequest) {
  if (!accessToken) {
    return NextResponse.json(
      { error: "Checkout Pro não configurado. Defina MERCADOPAGO_ACCESS_TOKEN." },
      { status: 503 }
    );
  }

  let body: {
    amount: number;
    title?: string;
    description?: string;
    user_id?: string;
    payer?: {
      email?: string;
      name?: string;
      surname?: string;
      phone?: { area_code?: string; number?: string };
      identification?: { type?: string; number?: string };
    };
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Corpo da requisição inválido." },
      { status: 400 }
    );
  }

  const {
    amount,
    title = "Créditos",
    description = "Adição de créditos ao painel",
    user_id: userId,
    payer: payerInput,
  } = body;
  const value = Number(amount);

  const externalReference = userId
    ? `credits-${userId}-${Date.now()}`
    : `credits-${Date.now()}`;

  if (!Number.isFinite(value) || value <= 0) {
    return NextResponse.json(
      { error: "Valor inválido. Envie um número maior que zero." },
      { status: 400 }
    );
  }

  // URL base absoluta obrigatória para back_urls do Checkout Pro
  const host =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    "";
  const protocol = request.headers.get("x-forwarded-proto") ?? "http";
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    (host ? `${protocol}://${host}` : request.nextUrl.origin);

  if (!baseUrl || baseUrl === "undefined" || !baseUrl.startsWith("http")) {
    console.error("Checkout Pro: baseUrl inválida para back_urls:", baseUrl);
    return NextResponse.json(
      { error: "Configure NEXT_PUBLIC_APP_URL com a URL do site (ex: https://seusite.com)." },
      { status: 503 }
    );
  }

  const client = new MercadoPagoConfig({
    accessToken,
    options: { timeout: 5000 },
  });
  const preference = new Preference(client);

  const preferenceBody: Parameters<Preference["create"]>[0]["body"] = {
    items: [
      {
        id: "credits",
        title,
        description,
        quantity: 1,
        currency_id: "BRL",
        unit_price: value,
      },
    ],
    back_urls: {
      success: `${baseUrl}/pagamento/sucesso`,
      failure: `${baseUrl}/pagamento/erro`,
      pending: `${baseUrl}/pagamento/pendente`,
    },
    auto_return: "approved",
    external_reference: externalReference,
  };

  if (payerInput && (payerInput.email ?? payerInput.name ?? payerInput.surname)) {
    preferenceBody.payer = {};
    if (payerInput.email) preferenceBody.payer.email = payerInput.email;
    if (payerInput.name) preferenceBody.payer.name = payerInput.name;
    if (payerInput.surname) preferenceBody.payer.surname = payerInput.surname;
    if (payerInput.phone?.number) {
      preferenceBody.payer.phone = {
        area_code: payerInput.phone.area_code ?? "",
        number: String(payerInput.phone.number).replace(/\D/g, "").slice(0, 9),
      };
    }
    if (payerInput.identification?.number) {
      preferenceBody.payer.identification = {
        type: payerInput.identification.type ?? "CPF",
        number: String(payerInput.identification.number).replace(/\D/g, "").slice(0, 11),
      };
    }
  }

  try {
    const result = await preference.create({
      body: preferenceBody,
    });

    const redirectUrl =
      useSandbox && "sandbox_init_point" in result && result.sandbox_init_point
        ? result.sandbox_init_point
        : result.init_point;

    return NextResponse.json({ redirectUrl, preferenceId: result.id });
  } catch (err) {
    console.error("Mercado Pago preference error:", err);
    const message = err instanceof Error ? err.message : "Erro ao criar preferência.";
    return NextResponse.json(
      { error: message },
      { status: 502 }
    );
  }
}
