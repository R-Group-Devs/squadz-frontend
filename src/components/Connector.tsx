import ConnectButton from "./ConnectButton";
import NetworkDropdown from "./NetworkDropdown";

export default () => {
  return (
    <>
      <div className="level">
        <div className="level-right">
          <div className="level-item level-item-left p-2"><ConnectButton /></div>
          <div className="level-item level-item-left p-2"><NetworkDropdown /></div>
        </div>
      </div>
    </>
  )
}