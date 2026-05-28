import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/navbar/Navbar";
import Task from "./page/task/Task";
import Buses from "./page/buses/Buses";
import { APP_ROUTES } from "./config/routes.ts";
import BusDetails from "./page/buses/BusDetails";
import EditBusPage from "./page/buses/BusEdit";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path={APP_ROUTES.TASK} element={<Task />} />

        <Route path={APP_ROUTES.BUS_CRUD}>
          <Route index element={<Buses />} />
          <Route path={APP_ROUTES.BUS_DETAILS} element={<BusDetails />} />
          <Route path={APP_ROUTES.BUS_EDIT} element={<EditBusPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
