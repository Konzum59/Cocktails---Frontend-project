import loadingGif from "./assets/images/NecoArcWineShake.gif";

interface LoadingOrErrorProps {
  loading: boolean;
  error: string | null;
}

const LoadingOrError: React.FC<LoadingOrErrorProps> = ({ loading, error }) => {
  if (loading) {
    return (
      <>
        <img src={loadingGif} /> <div>Loading...</div>
      </>
    );
  }
  if (error) {
    return <div>Error has occurred: {error}</div>;
  }
  return null;
};

export default LoadingOrError;
