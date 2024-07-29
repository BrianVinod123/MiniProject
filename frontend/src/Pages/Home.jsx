import Navbar from "../components/navbar"; // Ensure correct casing

const HomePage = () => {
    return (
        <div
            style={{
                backgroundImage: "url('https://www.fda.gov/files/Drugs-Img-Drug-Information-Find-Information-Drugs-at-FDA-Mixed-Pills-Table-1600x900.png')",
                height: '100vh', // Set height to full viewport height
                backgroundSize: 'cover', // Make sure the background image covers the entire div
                backgroundPosition: 'center' // Center the background image
            }}
        >
            <Navbar />
            <div id="About" className="flex flex-col items-center justify-center text-center text-white bg-gray-800 bg-opacity-50 p-8 rounded-md mt-8 mx-4">
                <h2 className="text-5xl font-bold mb-4 text-black">About Our Drug-Drug Prediction System</h2>
                <p className="mb-4 text-black">
                    Our Drug-Drug Prediction System is designed to help healthcare professionals and patients understand the potential interactions between various medications.
                    With the increasing complexity of drug regimens, it is crucial to ensure safety and efficacy in treatment plans.
                </p>
                <p className="mb-4 text-black">
                    Using advanced algorithms and a comprehensive database of drug interactions, our system analyzes user inputs to provide real-time predictions of potential drug interactions.
                    This helps to minimize adverse effects and optimize therapeutic outcomes.
                </p>
                <p className="text-black">
                    Our mission is to empower users with knowledge, enhance patient safety, and improve overall healthcare quality through innovative technology.
                </p>
            </div>
        </div>
    );
};

export default HomePage;
