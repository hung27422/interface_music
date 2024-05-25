import { Audio, ColorRing } from "react-loader-spinner";
function SpinnerLoading() {
  return (
    <div
      style={{
        width: "100%",
        height: "calc(100vh - (90px + 76px))",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    </div>
  );
}

export default SpinnerLoading;
