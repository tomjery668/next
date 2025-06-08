import { serve } from "inngest/next";
import Order from "@/models/order";

import { createUserOrder, inngest, syncUserCreation, syncUserDeletion, syncUserUpdation } from "@/config/inngest";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
   syncUserCreation,
   syncUserUpdation,
   syncUserDeletion,
   createUserOrder
  ],
});