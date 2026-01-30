
export function parsePrice(priceStr: string): number {
    if (!priceStr) return 0;

    // Normalize string
    const str = priceStr.toLowerCase().replace(/,/g, '');

    // Extract number
    const match = str.match(/[\d.]+/);
    if (!match) return 0;

    const num = parseFloat(match[0]);

    // Apply multiplier
    if (str.includes('cr') || str.includes('crore')) {
        return num * 10000000;
    }
    if (str.includes('l') || str.includes('lakh') || str.includes('lac')) {
        return num * 100000;
    }
    if (str.includes('k')) {
        return num * 1000;
    }

    // If just a number/price, assume it's raw value if > 1000, otherwise might be a unit issue?
    // Most prices in our data have "Lakh" or "Cr" or "per sq.ft" (which is rent/lease usually)
    return num;
}

export function matchesBudget(project: any, budgetRange: string): boolean {
    if (!budgetRange || budgetRange === 'All Budgets') return true;

    let min = 0;
    let max = Infinity;

    // Parse budget range
    // Options:
    // "₹30 Lakh - ₹50 Lakh"
    // "₹50 Lakh - ₹75 Lakh"
    // "₹75 Lakh - ₹1 Crore"
    // "₹1 Crore - ₹2 Crore"
    // "Above ₹2 Crore"

    if (budgetRange.includes('Above')) {
        min = 20000000; // 2 Cr
    } else {
        // Extract both numbers
        const parts = budgetRange.split('-');
        if (parts.length === 2) {
            min = parsePrice(parts[0]);
            max = parsePrice(parts[1]);
        }
    }

    // Get all prices associated with the project
    const prices: number[] = [];

    // Check priceRange string
    if (project.priceRange) {
        // If it's a range "X - Y", we should check overlap? 
        // Or just check if either end is in range?
        // Let's parse all numbers found in priceRange string
        // Simple approach: Extract all numbers with units
        // This is hard.

        // Alternative: extract just min and max from project.priceRange if it matches pattern
        // "₹65 Lakh - ₹2.5 Cr"
        const rangeParts = project.priceRange.split('-');
        if (rangeParts.length > 0) prices.push(parsePrice(rangeParts[0]));
        if (rangeParts.length > 1) prices.push(parsePrice(rangeParts[1]));
    }

    // Check floorPlans
    if (project.floorPlans) {
        project.floorPlans.forEach((plan: any) => {
            if (plan.price) {
                prices.push(parsePrice(plan.price));
            }
        });
    }

    // If no prices found, maybe include? Or exclude. Let's exclude.
    if (prices.length === 0) return false;

    // Check if any price falls within range
    // Or if project range overlaps with budget range
    // Simple check: is there any price point in the project that is >= min and <= max
    return prices.some(p => p >= min && p <= max);
}
