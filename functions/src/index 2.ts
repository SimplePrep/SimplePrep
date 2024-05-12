

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import axios, {AxiosError} from "axios";

admin.initializeApp();

export const registerUserInBackendAndCleanup = functions.firestore
  .document("users/{userId}")
  .onUpdate(async (change, context) => {
    console.log("Function execution started");

    if (!change.before.exists || !change.after.exists) {
      console.log("Document not found");
      return;
    }

    const beforeData = change.before.data();
    const afterData = change.after.data();

    console.log("Data before update:", beforeData);
    console.log("Data after update:", afterData);

    // Check if emailVerified was changed to true
    if (!beforeData.emailVerified && afterData.emailVerified) {
      console.log("Email verified status changed to true");
      const userData = {
        email: afterData.email,
        first_name: afterData.firstName,
        last_name: afterData.lastName,
        firebase_uid: afterData.firebase_uid,
        subscription_type: "free",
      };

      try {
        // Ensure to replace 'http://localhost:8080/auth/user/signup' with your production API endpoint when deploying
        console.log("Attempting to register user in backend");
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const body = JSON.stringify(userData);
        console.log("Sending data to backend:", JSON.stringify(userData));
        console.log("2Sending data to backend:", body);

        const response = await axios.post(
          "https://httpbin.org/anything",
          body,
          config
        );
        console.log("Backend registration successful:", response.data);

        if (response.data.success) {
          await admin.firestore().doc(
            `users/${context.params.userId}`)
            .delete();
          console.log("Temporary user data removed from Firestore");
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          // Now TypeScript knows this is an AxiosError
          const e = error as AxiosError;
          if (e.response) {
            console.error("Backend registration failed:", e.response.data);
            console.error("Status code:", e.response.status);
            console.error("Headers:", e.response.headers);
          } else if (e.request) {
            console.error("No response received:", e.request);
          } else {
            console.error("Error setting up request:", e.message);
          }
        } else {
          // Error not from Axios
          console.error("Unexpected error:", error);
        }
      }
    } else {
      // Log when condition is not met
      console.log("Email verified status not changed");
    }
  });
