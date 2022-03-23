import blob from "../public/images/magicpattern-blob-1647906613950.png"
import Button from "../components/Button"
import ViewSquadzForm from "../components/ViewSquadzForm"

export default () => {
  console.log(blob)
  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="block">
            <h1 className="title is-PicNic is-1 main has-green-text">SQUADZ</h1>
            <h2 className="subtitle is-Karrik is-italic is-4 main has-green-text">composable communities</h2>
            <img className="m-3" src={blob} alt="Gradient blob" width={280} height={280} />
          </div>
          <div className="block m-4 mb-6">
            <Button text="Create squad" scale={3} widthPx={280} callback={(e) => console.log(e)} />
          </div>
          <div className="block m-4">
            <ViewSquadzForm />
          </div>
        </div>
      </div>
    </section>
  )
}