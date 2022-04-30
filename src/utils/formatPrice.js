// Formattage du prix en dizaines
const formatPrice = (price, barre) => {
	let newPrice = price / 100;
	if (barre){
		return newPrice;
	}
	return newPrice.toFixed(2);
};

// Export
export default formatPrice;