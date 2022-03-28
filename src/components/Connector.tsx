import ConnectButton from "./ConnectButton";
import NetworkDropdown from "./NetworkDropdown";

export default () => {
  return (
    <>
      <div className="level">
        <div className="level-right">
          <div className="level-item level-item-left pr-3"><ConnectButton /></div>
          <div className="level-item level-item-left"><NetworkDropdown /></div>
        </div>
      </div>
    </>
  )
}