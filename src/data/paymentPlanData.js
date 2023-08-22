export const data = [
  {
    template: 1,
    title: "PaymentPlan",
    type: "PaymentPlanType",
    plans: [
      {
        number: 20,
        text: "BookingAmount",
        customStyle: "left-[4%] capitalize",
      },
      {
        number: 60,
        text: "installments",
        customStyle: "left-[40%] capitalize",
      },
      {
        number: 20,
        text: "finalInsallment",
        customStyle: "left-[75%] capitalize",
      },
    ],
  },
  {
    template: 2,
    title: "PaymentPlan",
    type: "PaymentPlanType",
    plans: [
      {
        title: "Cash Plan",
        subtitle: "Cash Payment Plan",
        feature: [{ text: "20% On Booking " }, { text: "80% On Completion " }],
      },
      {
        title: "Short Plan",
        subtitle: "1 Year Post-handover Plan",
        feature: [
          { text: "20% On Booking " },
          { text: "20% On Completion" },
          { text: "60% Installment for 1 Year Divided by 15% each 3 Months" },
        ],
      },
      {
        title: "Long Plan",
        subtitle: "2 Years Post-handover Plan",
        feature: [
          { text: "20% On Booking " },
          { text: "30% On Completion" },
          {
            text: "50% Installment for 2 Years Divided by 6.25% each 3 Months",
          },
        ],
      },
    ],
  },
  {
    template: 3,
    title: [
      { lng: "en", value: "HANDOVER" },
      { lng: "ar", value: "HANDOVER" },
      { lng: "ru", value: "СДАВАТЬ" },
      { lng: "fa", value: "HANDOVER" },
    ],

    type: "2026",
    plan: {
      title: [
        { lng: "en", value: "HANDOVER" },
        { lng: "ar", value: "HANDOVER" },
        { lng: "ru", value: "СДАВАТЬ" },
        { lng: "fa", value: "HANDOVER" },
      ],
      subtitle: [
        { lng: "en", value: "Q3 2026" },
        { lng: "ar", value: "Q3 2026" },
        { lng: "ru", value: "Q3 2026" },
        { lng: "fa", value: "Q3 2026" },
      ],
      feature: [
        {
          amount: "5%",
          text: [
            { lng: "en", value: "down payment" },
            { lng: "ar", value: "down payment" },
            { lng: "ru", value: "Авансовый платеж" },
            { lng: "fa", value: "down payment" },
          ],
        },
        {
          amount: "5 Y",
          text: [
            { lng: "en", value: "payment plan" },
            { lng: "ar", value: "payment plan" },
            { lng: "ru", value: "План оплаты" },
            { lng: "fa", value: "payment plan" },
          ],
        },
        {
          amount: "45%",
          text: [
            { lng: "en", value: "during construction" },
            { lng: "ar", value: "during construction" },
            { lng: "ru", value: "Во время строительства" },
            { lng: "fa", value: "during construction" },
          ],
        },
        {
          amount: "50%",
          text: [
            { lng: "en", value: "2 years post completion" },
            { lng: "ar", value: "2 years post completion" },
            { lng: "ru", value: "2 года после завершения" },
            { lng: "fa", value: "2 years post completion" },
          ],
        },
      ],
    },
  },
];
