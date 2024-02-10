import { BillingForm } from "@/components/billing-form";
import { getUserSubscriptionPlan } from "@/lib/stripe";

export default function Page() {
  const subscriptionPlan = getUserSubscriptionPlan();

  return <BillingForm subscriptionPlan={subscriptionPlan} />;
}
