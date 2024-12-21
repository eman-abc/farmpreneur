# Empower Roots - Web-Based Solution for Women Entrepreneurs

## Overview

**Empower Roots** is a web-based platform designed to empower women entrepreneurs in rural Pakistan. It aims to provide access to a broader marketplace, essential resources, and mentorship opportunities. The platform helps address challenges like limited market access, lack of technical knowledge, and socio-economic barriers, enabling women to grow their businesses and achieve financial independence.

### Features

- **Marketplace for Products**: Entrepreneurs can list, manage, and sell products online, gaining access to a wider audience.
- **Educational Resources**: A comprehensive library of resources (e.g., PDFs, videos) to help entrepreneurs improve their technical and business skills.
- **Mentorship Program**: Connecting women with experienced mentors to guide them in their entrepreneurial journey.
- **Order Management**: A seamless system to manage product orders, track deliveries, and view order histories.
- **Product Reviews**: Customers can leave reviews and ratings for products, helping build trust and credibility.
- **Role-Based Access**: Multiple roles (entrepreneurs, mentors, admins, NGOs) with customized access and permissions to ensure a tailored experience.

## Technologies Used

- **Backend**: Node.js, Express
- **Database**: MongoDB (using Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Environment Configuration**: dotenv
- **API Testing**: Postman or Insomnia

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:
- Node.js (v14 or higher)
- MongoDB (or use MongoDB Atlas for cloud hosting)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/empower-roots.git
   cd empower-roots
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root of your project and configure your environment variables:

   ```bash
   MONGO_URI=<Your MongoDB URI>
   JWT_SECRET=<Your JWT Secret Key>
   PORT=5000
   ```

4. Start the development server:

   ```bash
   npm start
   ```

   The application should now be running at `http://localhost:5000`.

### Endpoints

Here are the main API endpoints for interacting with the platform:

#### **User Routes**
- `POST /api/users/register`: Register a new user (Entrepreneur, Mentor, Admin, NGO).
- `POST /api/users/login`: Login and receive a JWT token.
- `GET /api/users/:id`: Get a user’s profile details.
- `PUT /api/users/:id`: Update user profile.

#### **Product Routes**
- `POST /api/products`: Create a new product listing.
- `GET /api/products`: Get a list of all products.
- `GET /api/products/:id`: Get product details by ID.
- `PUT /api/products/:id`: Update product details.
- `DELETE /api/products/:id`: Delete a product listing.

#### **Order Routes**
- `POST /api/orders`: Create a new order.
- `GET /api/orders`: Get all orders.
- `GET /api/orders/:id`: Get order details by ID.
- `PUT /api/orders/:id`: Update order status.

#### **Resource Routes**
- `POST /api/resources`: Upload a new educational resource (PDF, video, link).
- `GET /api/resources`: Get all resources.
- `GET /api/resources/:id`: Get resource details by ID.
- `DELETE /api/resources/:id`: Delete a resource.

#### **Mentorship Routes**
- `POST /api/mentorship`: Create a mentorship session.
- `GET /api/mentorship`: Get all mentorship sessions.
- `GET /api/mentorship/:id`: Get mentorship session details.
- `PUT /api/mentorship/:id`: Update mentorship session.
- `DELETE /api/mentorship/:id`: Delete a mentorship session.

#### **Review Routes**
- `POST /api/reviews`: Add a review for a product.
- `GET /api/reviews`: Get all reviews for a product.
- `GET /api/reviews/:id`: Get a single review by ID.

### Testing

To test your API, you can use tools like **Postman** or **Insomnia**. Simply configure the necessary HTTP methods (GET, POST, PUT, DELETE) for the respective endpoints and check the responses.

Example:
- To create a product, send a `POST` request to `/api/products` with a JSON body containing product details.
- To get all products, send a `GET` request to `/api/products`.

### Example Request Body

#### Create a Product

```json
{
  "title": "Handcrafted Necklace",
  "description": "A beautiful handcrafted necklace made from local materials.",
  "price": 1500,
  "ownerId": "609b64f5c742d035bde455f0",
  "category": "Handicrafts",
  "imageUrl": "http://example.com/necklace.jpg"
}
```

### Error Handling

Error handling is implemented throughout the API. In case of invalid requests, the API returns relevant error messages with status codes (e.g., 400 for bad request, 404 for not found, 500 for internal server error). Ensure that the error messages are meaningful and guide users to resolve any issues.

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests. Here’s how you can contribute:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

---

This **README** file provides detailed information on how to get started, how to test the application, and the functionality of the project. You can adjust the content as needed depending on the specific features or adjustments you've made to your application.
