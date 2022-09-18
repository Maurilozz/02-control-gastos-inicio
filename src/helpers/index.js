export const generateId = () => {
    const random = Math.random().toString(36).slice(2);
    const date = Date.now().toString(36).slice(2);

    return random + date;
}

export const dateFormat = (dateProp) => {
    const date = new Date(dateProp);
    const config = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    }

    return date.toLocaleDateString('es-MX', config);
}

export const currencyFormat = (amount) => {
    return amount.toLocaleString("es-MX", {
        style: "currency",
        currency: "MXN",
    });
};

export const percentageMeter = (porcentajeUsado) => {
    if (porcentajeUsado < 85) return "#3b82f6";

    if (porcentajeUsado <= 100) return "#EBE533";

    if (porcentajeUsado > 100) return "#DC2626";
};