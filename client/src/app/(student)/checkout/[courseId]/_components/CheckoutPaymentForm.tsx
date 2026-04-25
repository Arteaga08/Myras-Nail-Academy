"use client";

import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { LockKeyIcon as LockKey } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/formatters";
import { studentApiFetch } from "@/lib/studentApi";

interface CheckoutPaymentFormProps {
  amount: number;
  paymentId: string;
  onSuccess: () => void;
}

type ConfirmOutcome = "already_paid" | "paid" | "failed" | "in_flight";

export function CheckoutPaymentForm({
  amount,
  paymentId,
  onSuccess,
}: CheckoutPaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsSubmitting(true);
    setErrorMsg(null);

    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (result.error) {
      setErrorMsg(result.error.message ?? "Error al procesar el pago.");
      setIsSubmitting(false);
      return;
    }

    if (result.paymentIntent?.status !== "succeeded") {
      setErrorMsg("El pago no fue procesado. Intenta de nuevo.");
      setIsSubmitting(false);
      return;
    }

    // Reconciliación cliente: respaldo si el webhook no llega.
    // markPaymentPaid es idempotente en el backend, así que es seguro
    // aunque el webhook llegue al mismo tiempo.
    try {
      const confirmRes = await studentApiFetch<{
        data: { outcome: ConfirmOutcome; enrollmentCreated: boolean };
      }>(`/api/orders/${paymentId}/confirm`, { method: "POST" });

      const { outcome } = confirmRes.data;

      if (outcome === "paid" || outcome === "already_paid") {
        onSuccess();
        return;
      }

      setErrorMsg(
        outcome === "failed"
          ? "El pago fue rechazado. Intenta con otra tarjeta."
          : "El pago se está procesando. Recibirás un correo al confirmarse.",
      );
      setIsSubmitting(false);
    } catch {
      setErrorMsg(
        "No pudimos confirmar tu pago. Si ya te realizaron el cobro, contáctanos y lo resolvemos."
      );
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* Contenedor del Elemento de Stripe */}
      <div className="min-h-62.5">
        <PaymentElement options={{ layout: "tabs" }} />
      </div>

      {errorMsg && (
        <div className="rounded-2xl border border-error-500 bg-error-100 px-4 py-3 text-sm text-error-600">
          {errorMsg}
        </div>
      )}

      <div className="flex flex-col gap-4 pt-2">
        <Button type="submit" variant="primary" size="lg" fullWidth loading={isSubmitting}>
          {!isSubmitting && <LockKey size={20} weight="bold" />}
          {isSubmitting ? 'Procesando...' : `PAGAR ${formatCurrency(amount / 100)}`}
        </Button>

        <p className="text-center text-xs font-medium text-neutral-400">
          Tus datos están encriptados y protegidos por Stripe.
        </p>
      </div>
    </form>
  );
}
