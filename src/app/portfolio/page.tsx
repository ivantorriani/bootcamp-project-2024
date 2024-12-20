import Head from 'next/head';
import PortfolioPreview from '../components/portfolioCompnents/portfolioPreview';
import connectDB from '../database/db';
import Portfolio from '../database/portfolioSchema';

// Fetch data within the component as a server-side function
export default async function PortfolioPage() {
    try {
        // Establish DB connection
        await connectDB();
        console.log("Connected to MongoDB successfully");

        // Fetch all portfolios from the database
        const portfolios = await Portfolio.find()  // Returns plain JS objects
        console.log(portfolios, "There should be something here")

        // Log the fetched portfolios to verify data
        console.log('Fetched Portfolios:', portfolios);  // Check the console

        // Check if no portfolios are found
        if (portfolios.length === 0) {
            console.log('No portfolios found in the database.');
        }

        return (
            <div>
                <Head>
                    <title>Portfolio</title>
                </Head>

                <h1 className="title">Portfolio</h1>

                {/* Render portfolios if available */}
                {portfolios && portfolios.length > 0 ? (
                    portfolios.map((portfolio) => (
                        <PortfolioPreview
                            key={portfolio._id}
                            title={portfolio.title}
                            description={portfolio.description}
                            image={portfolio.image}
                        />
                    ))
                ) : (
                    <p>There are no portfolios available.</p>
                )}
            </div>
        );
    } catch (err) {
        console.error('Error fetching portfolios:', err);

        return (
            <div>
                <Head>
                    <title>Portfolio</title>
                </Head>
                <h1 className="title">Portfolio</h1>
                <p>There was an error fetching the portfolios. Please try again later.</p>
            </div>
        );
    }
}