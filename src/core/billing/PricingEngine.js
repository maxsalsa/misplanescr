/**
 * 💰 PRICING ENGINE (TIERED MODEL)
 * Calculates B2B license costs based on volume.
 */

export const PRICING_TIERS = [
    { name: "BÁSICA", min: 1, max: 19, price: 120, label: "Unidocente / Pequeña" },
    { name: "ACADÉMICA", min: 20, max: 49, price: 85, label: "Escuela / Colegio Estándar" },
    { name: "TÉCNICA", min: 50, max: 150, price: 65, label: "CTP / IPEC" },
    { name: "CORPORATIVA", min: 151, max: 9999, price: 55, label: "Redes Educativas" } // Custom
];

export function calculateQuote(seats) {
    const tier = PRICING_TIERS.find(t => seats >= t.min && seats <= t.max) || PRICING_TIERS[PRICING_TIERS.length - 1];

    const total = seats * tier.price;
    const savings = (120 - tier.price) * seats; // Compared to base price

    return {
        tierName: tier.name,
        pricePerSeat: tier.price,
        totalSeats: seats,
        subtotal: total,
        tax: 0, // Educational Software usually tax exempt or VAT logic here
        total: total,
        savings: savings > 0 ? savings : 0,
        currency: "USD"
    };
}
