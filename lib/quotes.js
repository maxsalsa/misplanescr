export const inspirationalQuotes = [
  // 🧮 MATEMÁTICAS & PROGRAMACIÓN
  {
    text: "No te preocupes por tus dificultades en matemáticas. Te aseguro que las mías son mayores.",
    author: "Albert Einstein",
    role: "Físico y Matemático",
  },
  {
    text: "Escribo para descubrir lo que pienso. Programo para descubrir lo que es posible.",
    author: "Ada Lovelace",
    role: "Primera Programadora de la Historia",
  },
  {
    text: "La simplicidad es la máxima sofisticación.",
    author: "Leonardo da Vinci",
    role: "Polímata e Ingeniero",
  },

  // ⚡ ELECTRÓNICA & CIENCIA
  {
    text: "El presente es de ellos; el futuro, por el que realmente he trabajado, es mío.",
    author: "Nikola Tesla",
    role: "Ingeniero Eléctrico",
  },
  {
    text: "Nada en la vida es para ser temido, es solo para ser comprendido.",
    author: "Marie Curie",
    role: "Científica (Nobel de Física y Química)",
  },

  // 📊 CONTABILIDAD & NEGOCIOS
  {
    text: "Quien no sabe llevar su contabilidad, camina a ciegas por sus negocios.",
    author: "Luca Pacioli",
    role: "Padre de la Contabilidad",
  },
  {
    text: "El precio es lo que pagas. El valor es lo que obtienes.",
    author: "Warren Buffett",
    role: "Inversor y Economista",
  },

  // 🏛️ FILOSOFÍA & EDUCACIÓN
  {
    text: "La educación no cambia el mundo, cambia a las personas que van a cambiar el mundo.",
    author: "Paulo Freire",
    role: "Pedagogo y Filósofo",
  },
  {
    text: "Las raíces de la educación son amargas, pero el fruto es dulce.",
    author: "Aristóteles",
    role: "Filósofo Griego",
  },
  {
    text: "Enseñar es aprender dos veces.",
    author: "Joseph Joubert",
    role: "Ensayista",
  },
  // 💻 INGENIERÍA DE SOFTWARE & TI
  {
    text: "El buen código es su propia mejor documentación. La claridad es la reina.",
    author: "Steve McConnell",
    role: "Ingeniero de Software (Code Complete)",
  },

  // 🌍 TURISMO & HOSPITALIDAD
  {
    text: "El turismo es la industria de la felicidad. Servir es un privilegio, no una carga.",
    author: "César Ritz",
    role: "Rey de los Hoteleros",
  },

  // ♿ EDUCACIÓN ESPECIAL & INCLUSIÓN
  {
    text: "Si un niño no puede aprender de la manera en que enseñamos, quizás debemos enseñar de la manera en que él aprende.",
    author: "Ignacio Estrada",
    role: "Educador Especial",
  },
];

export function getRandomQuote() {
  return inspirationalQuotes[
    Math.floor(Math.random() * inspirationalQuotes.length)
  ];
}
