import { useNavigate } from 'react-router-dom'
import { useAccount } from 'wagmi'

import blob from "../public/images/magicpattern-blob-1647906613950.png"
import Button from "../components/Button"
import ViewSquadsForm from "../components/ViewSquadsForm"

export default () => {
  const navigate = useNavigate()
  const [{ data },] = useAccount()

  return (
    <section className="hero is-fullheight">
      <div className="hero-body p-2">
        <div className="container has-text-centered">
          <div className="block">
            <h1 className="title is-PicNic is-1 main has-text-green">SQUADZ</h1>
            <h2 className="subtitle is-Karrik is-italic is-4 has-text-green">composable communities</h2>
            <img className="m-3" src={blob} alt="Gradient blob" width={280} height={280} />
          </div>
          <div className="block m-4 mb-5">
            <Button
              text="Create squad"
              scale={3}
              widthPx={280}
              centered
              callback={() => navigate({ pathname: "/create" })}
            />
          </div>
          <div className="block has-text-centered">
            <ViewSquadsForm defaultAddress={data?.address} />
          </div>
        </div>
      </div>
    </section>
  )
}