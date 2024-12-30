// Sessions.js
import React from 'react';

const Sessions = ({ sessions }) => {
    return (
        <div>
            <h3>Your Sessions</h3>
            <div className="row">
                {/* Upcoming Sessions */}
                <div className="col-md-4 mb-3">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h5>Upcoming Sessions</h5>
                        </div>
                        <div className="card-body">
                            {sessions.upcomingSessions.length > 0 ? (
                                <ul className="list-group">
                                    {sessions.upcomingSessions.map((session) => (
                                        <li key={session._id} className="list-group-item d-flex justify-content-between align-items-center">
                                            <div>
                                                <strong>{session.schedule}</strong>
                                                <div>{session.topics}</div>
                                            </div>
                                            <span className="badge bg-info text-white">Upcoming</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted">No upcoming sessions.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Pending Sessions */}
                <div className="col-md-4 mb-3">
                    <div className="card">
                        <div className="card-header bg-warning text-dark">
                            <h5>Pending Sessions</h5>
                        </div>
                        <div className="card-body">
                            {sessions.pendingSessions.length > 0 ? (
                                <ul className="list-group">
                                    {sessions.pendingSessions.map((session) => (
                                        <li key={session._id} className="list-group-item d-flex justify-content-between align-items-center">
                                            <div>
                                                <strong>{session.schedule}</strong>
                                                <div>{session.topics}</div>
                                            </div>
                                            <span className="badge bg-warning text-dark">Pending</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted">No pending sessions.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Completed Sessions */}
                <div className="col-md-4 mb-3">
                    <div className="card">
                        <div className="card-header bg-success text-white">
                            <h5>Completed Sessions</h5>
                        </div>
                        <div className="card-body">
                            {sessions.completedSessions.length > 0 ? (
                                <ul className="list-group">
                                    {sessions.completedSessions.map((session) => (
                                        <li key={session._id} className="list-group-item d-flex justify-content-between align-items-center">
                                            <div>
                                                <strong>{session.schedule}</strong>
                                                <div>{session.topics}</div>
                                            </div>
                                            <span className="badge bg-success text-white">Completed</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted">No completed sessions.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sessions;
