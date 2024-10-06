import loadingGif from "./assets/images/NecoArcWineShake.gif";
import nothingFoundGif from "./assets/images/NecoArcHasNoIdea.gif";

//that one is generally for showing stuff other than data, like loading screens, errors, and the text that displays when the site wasnt able to find any cocktails, mostly for the search bar
interface LoadingOrErrorProps {
  loading: boolean;
  error: string | null;
  results: number;
}

const LoadingOrError: React.FC<LoadingOrErrorProps> = ({
  loading,
  error,
  results,
}) => {
  if (loading) {
    return (
      <>
        <img src={loadingGif} /> <h2>Loading...</h2>
      </>
    );
  }
  if (error) {
    return <h2>Error has occurred: {error}</h2>;
  }
  if (results == 0) {
    return (
      <>
        <h2>
          {" "}
          Im terribly sorry to inform you but the site was unable to find
          anything like that. Check if all your inputs were corect, and pls
          don't leave that site{" "}
        </h2>
        <img src={nothingFoundGif} />
      </>
    );
  }
  return null;
};

export default LoadingOrError;
