class Book {
  constructor(title, author, quantity) {
    this.title = title;
    this.author = author;
    this.quantity = quantity;
  }

  getAvailability() {
    if (this.quantity === 0) {
      return "Out of stock";
    } else if (this.quantity < 5) {
      return "Low stock";
    } else {
      return "In stock";
    }
  }

  sell(num) {
    this.quantity -= num;
  }

  restock(num) {
    this.quantity += num;
  }
}

let book1 = new Book("To Kill a Mockingbird", "Harper Lee", 10);
let book2 = new Book("1984", "George Orwell", 5);

console.log(book1.getAvailability()); // In stock
console.log(book2.getAvailability()); // Low stock

book1.sell(3);
book2.restock(10);

console.log(book1.getAvailability()); // Low stock
console.log(book2.getAvailability()); // In stock

module.exports = Book
