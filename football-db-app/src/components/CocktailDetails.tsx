// src/components/CocktailDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCocktails, Cocktail } from '../api/apiClient';
import '../styles/CocktailDetail.css';

const CocktailDetail: React.FC = () => {
    const { name = '' } = useParams<{ name: string }>();
    const [cocktail, setCocktail] = useState<Cocktail | null>(null);

    useEffect(() => {
        const fetchCocktail = async () => {
            const data = await getCocktails(name);
            if (data.length > 0) {
                setCocktail(data[0]);
            }
        };
        fetchCocktail();
    }, [name]);

    if (!cocktail) {
        return <div>Loading...</div>;
    }

    return (
        <div className="cocktail-detail-container">
            <Link to="/" className="back-arrow">← Back to Home</Link>
            <h1>{cocktail.name}</h1>
            <p><strong>Glass:</strong> {cocktail.glass}</p>
            <p><strong>Instructions:</strong> {cocktail.instructions}</p>
            <ul>
                <strong>Ingredients:</strong>
                {cocktail.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
        </div>
    );
};

export default CocktailDetail;
