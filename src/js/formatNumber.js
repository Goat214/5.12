const formatNumber = (price, discount = 0) => {
    return new Intl.NumberFormat("en-us",{
        style: "currency",
        currency: "usd"

    }).format(price-(price/100)*discount)
}
export default formatNumber