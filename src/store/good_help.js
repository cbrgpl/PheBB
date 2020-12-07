export default class Good {
	constructor({categoryID, name, price, goodID}) {
		this.categoryID = categoryID;
		this.name = name;
		this.price = price;
		this.goodID = goodID;
	}

	toObject() {
		return {
			name: this.name,
			categoryID: this.categoryID,
			price: this.price, 
			goodID: this.goodID, 
		}
	}
}