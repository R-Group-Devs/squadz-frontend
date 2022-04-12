import { Link } from 'react-router-dom'

const levelItemClassStyle = "level-item pr-2"

export default () => {
  return (
    <nav className="level footer">
      <div className="level-left">
        <div className={levelItemClassStyle}>
          <a href="https://github.com/R-Group-Devs/squadz-frontend/blob/main/docs/README.md" target="_blank">
            <span className="has-text-pink">docs</span>
          </a>
        </div>
        <div className={levelItemClassStyle}>
          <Link to="/credits">
            <span className="has-text-pink">credits</span>
          </Link>
        </div>
        <div className={levelItemClassStyle}>
          <a href="https://github.com/R-Group-Devs" target="_blank">
            <span className="has-text-pink">github</span>
          </a>
        </div>
        <div className={levelItemClassStyle}>
          <a href="https://playgrounds.wtf" target="_blank">
            <span className="has-text-pink">playgrounds</span>
          </a>
        </div>
        <div className={levelItemClassStyle}>
          <a href="https://rrrrr.group" target="_blank">
            <span className="has-text-pink">r group</span>
          </a>
        </div>
      </div>
    </nav>
  )
}