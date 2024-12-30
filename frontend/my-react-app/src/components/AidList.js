import { useState, useEffect } from 'react';
import '../assets/cssfiles/aidList.css';  // Import the CSS file

function AidList() {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await fetch('/api/aid');
                const data = await response.json();
                setPrograms(data); // Store the fetched data in programs
            } catch (err) {
                setError('Failed to load programs');
            } finally {
                setLoading(false);
            }
        };

        fetchPrograms();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!programs || programs.length === 0) {
        return <div className="no-programs">No financial aid programs available.</div>;
    }

    return (
        <div className="aid-list">
            {programs.map((program) => (
                <div key={program._id} className="aid-item">
                    <h3>{program.title}</h3>
                    <p>{program.description}</p>
                    <p><strong>Eligibility Criteria:</strong> {program.eligibilityCriteria}</p>
                    <p><strong>Amount:</strong> ${program.amount}</p>
                    <p><strong>Contact Email:</strong> {program.contactEmail}</p>
                    <p><strong>Created By:</strong> {program.createdBy.name} ({program.createdBy.email})</p>
                    <p><strong>Created At:</strong> {new Date(program.createdAt).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
}

export default AidList;
