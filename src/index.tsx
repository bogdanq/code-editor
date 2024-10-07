import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { fork } from "effector";
import { Provider } from "effector-react";
import App from "./App";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

export const scope = fork();

root.render(
  <>
    <Provider value={scope}>
      <BrowserRouter>
        <Routes>
          <Route path="/editor/:editorId" element={<App />}>
            <Route path=":docId" element={<App />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </>
);
