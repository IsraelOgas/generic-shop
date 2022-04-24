export const format = ( value: number ) => {

    // Crear formateador
    const formatter = new Intl.NumberFormat(process.env.NEXT_PUBLIC_CURRENCY || 'en-US', {
        style: 'currency',
        currency: process.env.NEXT_PUBLIC_CURRENCY || 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })

    return formatter.format( value ); //$2,500.00
}