import {Link} from "react-router-dom";

export function Tvshow(props) {
    const tvshowUrl = `/details/${props.tvshow.tvshowId}`;

    return (
        <div className="column is-3-desktop is-4-tablet is-6-mobile">
            <Link to={tvshowUrl} className="card has-text-black" style={{ backgroundColor: props.tvshow.color, display: "block", minHeight: 700 }}>
                <div className="card-image">
                    <figure className="image is-square" style={{minHeight: 400}}>
                        <img src={props.tvshow.imgURL} alt={props.tvshow.name} />
                    </figure>
                </div>
                <div className="card-content" style={{ height: "100%" }}>
                    <div className="content" >
                        <h3 className="title is-3 has-text-centered has-text-black" style={{ minHeight: 100}}>{props.tvshow.title}</h3>
                        <div className="mb-0">
                            <span className="has-text-weight-bold" >Studio : </span>
                            <span>{props.tvshow.studio.name}</span>
                        </div>
                        <div className="mb-0">
                            <span className="has-text-weight-bold">Genres : </span>
                            <span>{props.tvshow.genres.map((p) => p.name).join(", ")}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
