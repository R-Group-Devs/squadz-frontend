import ConnectButton from "./ConnectButton";
import NetworkDropdown from "./NetworkDropdown";

export default ({ extraspace }: { extraspace: boolean }) => {
  let mb = 0
  if (extraspace) mb = 6

  return (
    <>
      <div className="level">
        <div className="level-left">
          <div className={`level-item level-item-left pr-3 mb-${mb}`}><ConnectButton /></div>
          <div className={`level-item level-item-left mb-${mb}`}><NetworkDropdown /></div>
        </div>
      </div>
    </>
  )
}