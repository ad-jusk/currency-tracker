import { type ReactElement } from "react";
import "./firebase/firebase";
import { Container } from "@mui/material";
import { TopBar } from "./components/TopBar";

const App = (): ReactElement => {
  return (
    <Container maxWidth={false}>
      <TopBar />
    </Container>
  );
};

export default App;

