# YardThreads Clothing

A responsive, animated clothing brand showcase using the supplied YardThreads artwork. All shirts are described as 100% cotton, as specified by the brand owner.

## Run

Serve `dist/` with any static web server, or open `dist/index.html` directly. No build or install is required.

## Features

- Animated editorial hero, scrolling type and motion toggle
- Signature and Money collections with color selection
- Accessible product dialogs with front and graphic views
- Responsive mobile layout and reduced-motion support
- Cart with sizes, colours, JMD prices and contact/delivery form
- EmailJS owner notification and linked customer confirmation

## Before selling

All products are currently out of stock, so checkout is disabled. Update stock in `dist/app.js` when ordering reopens. Order details go through the owner's connected EmailJS Gmail service, with a linked customer thank-you email. Bank transfer and cash on delivery require manual confirmation; delivery cost is confirmed before fulfillment. EmailJS History and the store inbox hold notifications. There is no central inventory reservation, payment processor or order database; the owner must verify every order before fulfillment.

EmailJS public IDs are in `dist/orders.js`. Keep private credentials out of this repository. The free account has 200 monthly email requests; each order uses two. Domain restrictions require a plan upgrade and have not been enabled. If sending fails, the cart remains; ambiguous network failures instruct the customer to contact the store before retrying. Customer contact details are not saved in local storage.

Assets are supplied by the brand owner. No license to reuse the brand artwork is granted. Fonts load from Google Fonts with local system fallbacks.
