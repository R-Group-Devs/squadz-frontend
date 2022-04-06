import ConnectButton from "./ConnectButton";
import NetworkDropdown from "./NetworkDropdown";

export default () => {
  return (
    <>
      <div className="level">
        <div className="level-left">
          <div className="level-item level-item-left pr-3 mb-6"><ConnectButton /></div>
          <div className="level-item level-item-left mb-6"><NetworkDropdown /></div>
        </div>
      </div>
    </>
  )
}