import './style.css';

export const Progress = ({ value=0, max=100, text='' }) =>
    <div className="progress">
        <div
            className="progress-bar"
            style={{ '--progress-width': `${100*value/max}%` }}
        />
        <span className="progress-text">
            {value}/{max} {text}
        </span>
    </div>
