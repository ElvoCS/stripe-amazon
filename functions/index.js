const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { application } = require("express");
const stripe = require("stripe")(
  "sk_test_51HPo50BCz8y3t4c6cE0yoCFsbGJ157l1DVsjKKmd7Je0JxUBou8QC4zkk04TJYWCpugb27aOFsAOxEUqCgmZYWte00ARiLD0Jj"
);
//app config
const app = express();
//middlewares
app.use(cors({ origin: true }));
app.use(express.json());
//api routes
app.get("/", (request, response) => response.status(200).send("hellow world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("payment request received BOOM! for this amount", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });
  //ok created something
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
//listen cmd
exports.api = functions.https.onRequest(app);

//example off api endpoint
//http://localhost:5001/stripe-6e2ac/us-central1/api
