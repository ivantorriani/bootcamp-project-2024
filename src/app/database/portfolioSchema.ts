import mongoose, { Schema } from "mongoose";

// Define the PortfolioEntry type (optional but good for TypeScript)
type PortfolioEntry = {
  title: string;
  description: string;
  image: string;
};

// Define the portfolio schema
const portfolioSchema = new Schema<PortfolioEntry>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false },
});

// Check if the model is already defined, if not, define it
const Portfolio = mongoose.models.Portfolio ||
    mongoose.model('Portfolio', portfolioSchema, 'portfolio');

export default Portfolio;
