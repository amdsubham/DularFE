/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

const {onRequest} = require('firebase-functions/v2/https');
// const logger = require('firebase-functions/logger');
const stripe = require('stripe')('sk_test_ZFzr6C1sCooTqpz9Ldqkw6gY');

exports.payWithStripe = onRequest(async (request, response) => {
  console.log('payWithStripe ====>', request.body);
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2024-06-20'},
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: request.body.amount,
    currency: request.body.currency,
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  response.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: 'pk_test_N5ePiznnc3Uen6XLMm0g5B8O',
  });
});
