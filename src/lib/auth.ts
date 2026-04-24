import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import {
  dodopayments,
  checkout,
  portal,
  webhooks,
} from "@dodopayments/better-auth";
import DodoPayments from "dodopayments";

const dodoClient = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
  environment:
    (process.env.DODO_PAYMENTS_ENVIRONMENT as "test_mode" | "live_mode") ??
    "test_mode",
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
        input: false,
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  plugins: [
    dodopayments({
      client: dodoClient,
      createCustomerOnSignUp: true,
      getCustomerParams: (user) => ({
        metadata: { userId: user.id },
      }),
      use: [
        checkout({
          products: [
            // Replace these with your actual Dodo Payments product IDs
            { productId: "pdt_0NdPm0piqH5cyaIiwwWoc", slug: "basic" },
            { productId: "pdt_0NdPm92swvyHOFE7aOyRY", slug: "professional" },
            { productId: "pdt_0NdPmFhQBanoDwwcZ6MTC", slug: "partners" },
          ],
          successUrl: "/dashboard/subscription/success",
          authenticatedUsersOnly: true,
        }),
        portal(),
        webhooks({
          webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_SECRET!,
          onSubscriptionActive: async (payload) => {
            console.log("✅ Subscription active:", payload.type);
            const data = payload.data as any;
            let userId = data.customer?.metadata?.userId;
            const customerId = data.customer?.customer_id;

            if (!userId && customerId) {
              try {
                const customer = await dodoClient.customers.retrieve(customerId);
                userId = customer.metadata?.userId;
              } catch (e) {
                console.error("Failed to fetch Dodo customer", e);
              }
            }

            if (userId) {
              await prisma.hospital.updateMany({
                where: { adminId: userId },
                data: {
                  subscriptionPlan: data.product_id,
                  subscriptionStatus: "active",
                  dodoCustomerId: customerId,
                  dodoSubscriptionId: data.subscription_id,
                },
              });
              console.log(`✅ Hospital subscription activated for user ${userId}`);
            }
          },
          onSubscriptionCancelled: async (payload) => {
            console.log("❌ Subscription cancelled:", payload.type);
            const data = payload.data as any;
            let userId = data.customer?.metadata?.userId;
            const customerId = data.customer?.customer_id;

            if (!userId && customerId) {
              try {
                const customer = await dodoClient.customers.retrieve(customerId);
                userId = customer.metadata?.userId;
              } catch (e) {}
            }

            if (userId) {
              await prisma.hospital.updateMany({
                where: { adminId: userId },
                data: {
                  subscriptionStatus: "cancelled",
                },
              });
              console.log(`❌ Hospital subscription cancelled for user ${userId}`);
            }
          },
          onSubscriptionRenewed: async (payload) => {
            console.log("🔄 Subscription renewed:", payload.type);
            const data = payload.data as any;
            let userId = data.customer?.metadata?.userId;
            const customerId = data.customer?.customer_id;

            if (!userId && customerId) {
              try {
                const customer = await dodoClient.customers.retrieve(customerId);
                userId = customer.metadata?.userId;
              } catch (e) {}
            }

            if (userId) {
              await prisma.hospital.updateMany({
                where: { adminId: userId },
                data: {
                  subscriptionStatus: "active",
                },
              });
              console.log(`🔄 Hospital subscription renewed for user ${userId}`);
            }
          },
          onPaymentSucceeded: async (payload) => {
            console.log("💰 Payment succeeded:", payload.type);
          },
          onPaymentFailed: async (payload) => {
            console.log("⚠️ Payment failed:", payload.type);
          },
        }),
      ],
    }),
  ],
});
