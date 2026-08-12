export const categories = ["Parrilla", "Arroces", "Cócteles", "Promos"];

export const menuItems = [
  {
    id: "costillas-san-luis",
    name: "San Luis Costillas",
    category: "Parrilla",
    image: "/img/promo6.png",
    description: "Costillas ahumadas a la parrilla, glaseadas en salsa San Luis, servidas con papas rústicas.",
    tags: ["Más Vendido", "2x$24.5"],
    sizes: [
      { label: "Individual", price: 14.5 },
      { label: "Para Compartir (2x)", price: 24.5 },
    ],
  },
  {
    id: "costillas-baby-back",
    name: "Costillas Baby Back",
    category: "Parrilla",
    image: "/img/promo4.png",
    description: "Costillas baby back jugosas, marinadas 24h y terminadas al carbón. Disponibles los miércoles.",
    tags: ["Picante"],
    sizes: [
      { label: "Individual", price: 15.9 },
      { label: "Familiar", price: 27.9 },
    ],
  },
  {
    id: "arroz-dos-pollos",
    name: "Arroz Dos Pollos",
    category: "Arroces",
    image: "/img/promo3.png",
    description: "Arroz criollo salteado con dos cortes de pollo a la parrilla, vegetales frescos y un toque ahumado.",
    tags: ["Favorito de la Casa"],
    sizes: [{ label: "Porción", price: 12.0 }],
  },
  {
    id: "coctel-domingo",
    name: "Cóctel de la Casa",
    category: "Cócteles",
    image: "/img/promo5.png",
    description: "Nuestra coctelería de autor, refrescante y con carácter. Los domingos, 2x1 en todos los cócteles.",
    tags: ["2x1 Domingos"],
    sizes: [{ label: "Copa", price: 7.5 }],
  },
  {
    id: "promo-semana",
    name: "Promociones de la Semana",
    category: "Promos",
    image: "/img/promo1.png",
    description: "Descubre nuestras increíbles promociones semanales, rotando cada día con lo mejor de la parrilla.",
    tags: ["Tiempo Limitado"],
    sizes: [{ label: "Combo", price: 12.5 }],
  },
  {
    id: "promo-lunes",
    name: "Lunes 2x$12.5",
    category: "Promos",
    image: "/img/promo2.png",
    description: "Arranca la semana disfrutando 2x1 en tus platos favoritos, todos los lunes.",
    tags: ["2x1 Lunes"],
    sizes: [{ label: "Combo", price: 12.5 }],
  },
];
