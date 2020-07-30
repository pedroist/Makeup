import React from 'react';
import '../navbar/navbar.css';

class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar fixed-top navbar-expand-sm bg-dark">
                <div className="container">
                    <a>MakeUp</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMain">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarMain">

                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;