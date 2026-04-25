"use client";

import { use } from "react";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  ArrowLeftIcon as ArrowLeft,
  LockKeyIcon as LockKey,
} from "@phosphor-icons/react/ssr";
import { STRIPE_PUBLISHABLE_KEY } from "@/lib/env";
import { useCheckout } from "@/hooks/useCheckout";
import { FullPageSpinner } from "@/components/ui/Spinner";
import { CheckoutSummary } from "./_components/CheckoutSummary";
import { CheckoutPaymentForm } from "./_components/CheckoutPaymentForm";
import { CheckoutSuccess } from "./_components/CheckoutSuccess";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

interface PageProps {
  params: Promise<{ courseId: string }>;
}

function CheckoutClient({ courseId }: { courseId: string }) {
  const {
    course,
    clientSecret,
    paymentId,
    paymentAmount,
    isLoading,
    error,
    step,
    setStep,
  } = useCheckout(courseId);

  if (isLoading) return <FullPageSpinner />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <p className="mb-6 text-lg text-neutral-600">{error}</p>
        <Link
          href="/student/explore"
          className="rounded-full bg-rose-50 px-6 py-2 text-sm font-semibold text-rose-500 transition-colors hover:bg-rose-100"
        >
          Volver al catálogo
        </Link>
      </div>
    );
  }

  if (!course || !clientSecret || !paymentId) return null;

  if (step === "success") {
    return <CheckoutSuccess course={course} />;
  }

  return (
    <div className="min-h-[80vh] bg-stone-50/30 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-250">
        {/* Header de Checkout */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/student/explore"
            className="group flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-rose-500"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-neutral-200 transition-all group-hover:ring-rose-200">
              <ArrowLeft size={16} />
            </span>
            Volver al catálogo
          </Link>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-600">
            <LockKey size={16} weight="bold" />
            Pago Seguro
          </div>
        </div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          {/* Columna Izquierda: Formulario de Pago */}
          <div className="order-2 lg:order-1">
            <div className="mb-6">
              <h1 className="font-display text-3xl font-bold text-neutral-900">
                Finalizar compra
              </h1>
              <p className="mt-2 text-sm text-neutral-500">
                Ingresa tus datos de pago para acceder de por vida al curso.
              </p>
            </div>

            <div className="rounded-4xl border border-white bg-white p-6 shadow-xl shadow-rose-900/5 ring-1 ring-neutral-100 sm:p-10">
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: {
                    theme: "stripe",
                    variables: {
                      colorPrimary: "#f43f5e", // rose-500
                      colorBackground: "#ffffff",
                      colorText: "#171717", // neutral-900
                      colorDanger: "#ef4444",
                      fontFamily: "system-ui, sans-serif",
                      spacingUnit: "4px",
                      borderRadius: "12px",
                    },
                  },
                }}
              >
                <CheckoutPaymentForm
                  amount={paymentAmount}
                  paymentId={paymentId}
                  onSuccess={() => setStep("success")}
                />
              </Elements>
            </div>
          </div>

          {/* Columna Derecha: Resumen (Ticket Premium) */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-24">
            <CheckoutSummary course={course} amount={paymentAmount} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage({ params }: PageProps) {
  const { courseId } = use(params);
  return <CheckoutClient courseId={courseId} />;
}
