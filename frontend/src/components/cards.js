import React from "react";

const Card = () => {
    return(
        <div className="main-content">
            <div className="glass-box">
                <h2>Profile</h2>
                <p>Name: John Doe</p>
                <p>Email: john.doe@example.com</p>
                <p>Education: Master of Science in Computer Science</p>
            </div>

            <div className="glass-box social-box">
                <h2>Social Links</h2>
                <ul>
                <li><a href="#">GitHub</a></li>
                <li><a href="#">LinkedIn</a></li>
                <li><a href="#">Portfolio</a></li>
                </ul>
            </div>

            <div className="glass-box">
                <h2>Skills</h2>
                <ul>
                <li>Python</li>
                <li>JavaScript</li>
                <li>React</li>
                <li>Node.js</li>
                <li>SQL</li>
                </ul>
                <div className="search-section">
                <input type="text" placeholder="Search skills..." />
                <button>Search</button>
                </div>
            </div>

            <div className="glass-box projects-box">
                <h2>Projects</h2>
                <div className="project-item">
                <h3>Project Alpha</h3>
                <p>Description: A web application for task management.</p>
                <p>Links: <a href="#">GitHub</a>, <a href="#">Portfolio</a></p>
                </div>
                <div className="project-item">
                <h3>Project Beta</h3>
                <p>Description: A data analysis tool using Python.</p>
                <p>Links: <a href="#">GitHub</a></p>
                </div>
                <div className="search-section">
                <input type="text" placeholder="Search projects by skill..." />
                <button>Search</button>
                </div>
            </div>

            <div className="glass-box">
                <h2>Work Experience</h2>
                <div className="work-item">
                <h3>Software Engineer at Tech Corp</h3>
                <p>Duration: 2020 - Present</p>
                <p>Responsibilities: Developed and maintained web services.</p>
                </div>
            </div>
        </div>
    )
}

export default Card;