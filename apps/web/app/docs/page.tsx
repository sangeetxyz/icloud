import { openApiDocument } from "@/server/openapi";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const App = () => (
  <SwaggerUI spec={openApiDocument} displayOperationId displayRequestDuration />
);

export default App;
