import { type ReactElement } from "react";
import "./firebase/firebase";
import { Container } from "@mui/material";
import { TopBar } from "./components/TopBar";
import { CurrencyTable } from "./components/CurrencyTable";

const App = (): ReactElement => {
  return (
    <Container maxWidth={false} sx={{ px: { xs: 0, md: 2 } }}>
      <TopBar />
      <CurrencyTable />
    </Container>
  );
};

export default App;

