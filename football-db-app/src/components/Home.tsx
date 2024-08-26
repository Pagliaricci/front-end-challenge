import React, { useState, useEffect } from 'react';
import { getCocktails, Cocktail } from '../api/apiClient';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
    const [cocktails, setCocktails] = useState<Cocktail[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [categoryFilter, setCategoryFilter] = useState<string>('');
    const [alcoholicFilter, setAlcoholicFilter] = useState<string>('');
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

    const fetchCocktails = async (name: string) => {
        if (name.trim() === '') {
            setCocktails([]);
            return;
        }

        const data = await getCocktails(name, categoryFilter, alcoholicFilter);
        setCocktails(data);
    };

    useEffect(() => {
        fetchCocktails(searchTerm);
    }, [searchTerm, categoryFilter, alcoholicFilter]);

    return (
        <div className='home-container'>
        <div className='header'>
            <h1>Make Your Favorite Cocktail!</h1>
            <input
                type="text"
                placeholder="Search cocktail by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="filters">
                <select onChange={(e) => setCategoryFilter(e.target.value)}>
                    <option value="">All Categories</option>
                    <option value="Ordinary Drink">Ordinary Drink</option>
                    <option value="Cocktail">Cocktail</option>
                    {/* Add more categories as needed */}
                </select>
                <select onChange={(e) => setAlcoholicFilter(e.target.value)}>
                    <option value="">All Types</option>
                    <option value="Alcoholic">Alcoholic</option>
                    <option value="Non-Alcoholic">Non-Alcoholic</option>
                </select>
            </div>
            <div className="view-toggle">
                <button onClick={() => setViewMode('list')}>List View</button>
                <button onClick={() => setViewMode('grid')}>Grid View</button>
            </div>
        </div>
        <div className={`cocktail-container ${viewMode}`}>
            {viewMode === 'list' ? (
                <ul className='cocktail-list'>
                    {cocktails.map((cocktail, index) => (
                        <li key={index}>
                            <Link to={`/cocktail/${cocktail.name}`}>
                                <img src={cocktail.imageUrl || 'default-image-url'} />
                                {cocktail.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className='cocktail-grid'>
                    {cocktails.map((cocktail, index) => (
                        <div key={index} className='cocktail-card'>
                            <Link to={`/cocktail/${cocktail.name}`}>
                                <img src={cocktail.imageUrl || 'default-image-url'} alt={cocktail.name} />
                                <h3>{cocktail.name}</h3>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
                               );
                            };

export default Home;
