import { Link } from 'react-router-dom'

function App() {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                            <h2 className="mb-0">data vizz d'alcool</h2>
                        </div>
                        <div className="card-body text-center">
                            <p className="card-text">Découvrez le dataviz d3 des alcools.</p>
                            <Link to="/histogram">
                                <button className="btn btn-lg btn-primary">
                                    Voir l'histogramme
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App