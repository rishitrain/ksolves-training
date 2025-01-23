const res={
    "user": {
      "id": 1,
      "name": "John Doe",
      "age": 30,
      "email": "johndoe@example.com",
      "address": {
        "street": "123 Main St",
        "city": "Anytown",
        "state": "CA",
        "zip": "12345"
      },
      "contactNumbers": {
        "home": "555-1234",
        "mobile": "555-5678"
      },
      "favoriteBooks": [
        {
          "title": "1984",
          "author": "George Orwell",
          "yearPublished": 1949
        },
        {
          "title": "To Kill a Mockingbird",
          "author": "Harper Lee",
          "yearPublished": 1960
        },
        {
          "title": "The Great Gatsby",
          "author": "F. Scott Fitzgerald",
          "yearPublished": 1925
        }
      ]
    }
  }
  
  
 const data =JSON.stringify(res);

 
 
 console.log(data);
 