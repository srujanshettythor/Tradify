const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "ASCYVWXpc5OeExfCuzbbS-WQZttroC7TkpFaDgWhukEMyyzSiG_vuqJqXscqrSXF9RX1zPTtZq1DAJBK",
  client_secret: "EOoWAQaINI-37a0fJzGbUJN7eUBvv292f5JA_0yQf5P1f1zckhHz427SYgWO3gdQXIy4dV9gH8Dj1I-M",
});

module.exports = paypal;
