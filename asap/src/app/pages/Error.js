import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import NotFound from "./NotFound";

export default function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <NotFound />;
    }
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
        <a href="/">Recargar la p&aacute;gina</a>
      </p>
    </div>
  );
}
