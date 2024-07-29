import React, { useEffect, useState } from "react";

const ResultContentBox = ({ content }) => {
    const [predictContent, setPredictContent] = useState(content);

    useEffect(() => {
        setPredictContent(content);
    }, [content]); 

    return (
        <div className="box-border hover:box-content p-4 border rounded-md mt-4 bg-gray-50">
            <h3 className="font-bold text-lg">Prediction Result:</h3>
            <p className="text-gray-700">{predictContent || "No result available."}</p>
        </div>
    );
};

export default ResultContentBox;
