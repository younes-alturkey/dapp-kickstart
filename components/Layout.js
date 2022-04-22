import Header from "./Header";
import { Container } from "semantic-ui-react";

export default ({ children }) => {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
};
