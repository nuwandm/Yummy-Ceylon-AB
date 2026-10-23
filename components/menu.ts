// Menu content, from yummyceylon.se/menu. Prices for à la carte dishes weren't public — add
// `price` (kr) per dish when the owner confirms them; dishes without a price just don't show one.

export type Dish = {
  name: { en: string; sv: string };
  description: { en: string; sv: string };
  price?: number;
  vegetarian?: boolean;
};

export type MenuCategory = {
  id: string;
  title: { en: string; sv: string };
  intro?: { en: string; sv: string };
  dishes: Dish[];
};

export const menu: MenuCategory[] = [
  {
    id: "fried-rice",
    title: { en: "Fried rice", sv: "Stekt ris" },
    dishes: [
      {
        name: { en: "Vegetable fried rice", sv: "Stekt ris med grönsaker" },
        description: {
          en: "Served with vegetable chop suey, aubergine moju and chili paste.",
          sv: "Serveras med grönsakschopsuey, auberginemoju och chilipasta.",
        },
        vegetarian: true,
      },
      {
        name: { en: "Egg fried rice", sv: "Stekt ris med ägg" },
        description: {
          en: "Served with bull's-eye eggs, vegetable chop suey and chili paste.",
          sv: "Serveras med stekta ägg, grönsakschopsuey och chilipasta.",
        },
      },
      {
        name: { en: "Chicken fried rice", sv: "Stekt ris med kyckling" },
        description: {
          en: "Served with devilled chicken curry and chili paste.",
          sv: "Serveras med devilled chicken curry och chilipasta.",
        },
      },
      {
        name: { en: "Mix fried rice", sv: "Mix stekt ris" },
        description: {
          en: "A Sri Lankan mix of chicken, pork, beef and shrimp, served with sauce and chili paste.",
          sv: "En lankesisk mix av kyckling, fläsk, nötkött och räkor, med sås och chilipasta.",
        },
      },
      {
        name: { en: "Nasigurang", sv: "Nasigurang" },
        description: {
          en: "Sri Lankan style with chicken and shrimp, served with bull's-eye eggs.",
          sv: "På lankesiskt vis med kyckling och räkor, serveras med stekta ägg.",
        },
      },
      {
        name: { en: "Family pack", sv: "Familjepack" },
        description: {
          en: "Egg fried rice with 4 chicken legs, 4 bull's-eye eggs and 4 grilled sausages.",
          sv: "Stekt ris med ägg, 4 kycklingklubbor, 4 stekta ägg och 4 grillade korvar.",
        },
      },
    ],
  },
  {
    id: "kottu",
    title: { en: "Kottu", sv: "Kottu" },
    intro: {
      en: "Sri Lanka's favourite street food: chopped roti stir-fried on the griddle.",
      sv: "Sri Lankas älskade gatumat: hackad roti som steks på stekbordet.",
    },
    dishes: [
      {
        name: { en: "Vegetable kottu", sv: "Grönsakskottu" },
        description: { en: "Served with sauce and chili paste.", sv: "Serveras med sås och chilipasta." },
        vegetarian: true,
      },
      {
        name: { en: "Chicken kottu", sv: "Kycklingkottu" },
        description: {
          en: "Served with chicken legs, curry and chili paste.",
          sv: "Serveras med kycklingklubbor, curry och chilipasta.",
        },
      },
      {
        name: { en: "Pork kottu", sv: "Fläskkottu" },
        description: { en: "Served with curry and chili paste.", sv: "Serveras med curry och chilipasta." },
      },
      {
        name: { en: "Beef kottu", sv: "Nötköttskottu" },
        description: { en: "Served with curry and chili paste.", sv: "Serveras med curry och chilipasta." },
      },
      {
        name: { en: "Mix kottu", sv: "Mix kottu" },
        description: {
          en: "Mixed meats, served with chicken legs, curry and chili paste.",
          sv: "Blandat kött, serveras med kycklingklubbor, curry och chilipasta.",
        },
      },
    ],
  },
  {
    id: "kids",
    title: { en: "Kids' menu", sv: "Barnmeny" },
    dishes: [
      {
        name: { en: "Fried rice with fries", sv: "Stekt ris med pommes" },
        description: { en: "Your choice of fried rice, served with French fries.", sv: "Valfritt stekt ris med pommes frites." },
      },
      {
        name: { en: "Kottu with fries", sv: "Kottu med pommes" },
        description: { en: "Your choice of kottu, served with French fries.", sv: "Valfri kottu med pommes frites." },
      },
      {
        name: { en: "Pancake", sv: "Pannkaka" },
        description: { en: "Served with jam and whipped cream.", sv: "Serveras med sylt och vispgrädde." },
        vegetarian: true,
      },
    ],
  },
];
