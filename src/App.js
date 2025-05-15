import { Routes, Route } from "react-router-dom";
import Main from "./components/layout/Main";
import Banner from "./components/banner/Banner";
// import HomePage from "./pages/HomePage";
// import MoviePage from "./pages/MoviePage";
// import MovieDetailsPage from "./pages/MovieDetailsPage";
import { lazy, Suspense } from "react";
// dynamic import
const HomePage = lazy(() => import("./pages/HomePage"));
const MoviePageV2 = lazy(() => import("./pages/MoviePageV2"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));
function App() {
  return (
    <>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Main></Main>}>
            <Route
              path="/"
              element={
                <>
                  <Banner></Banner>
                  <HomePage></HomePage>
                </>
              }
            ></Route>
            <Route path="/movies" element={<MoviePageV2></MoviePageV2>}></Route>
            <Route
              path="/movies/:movieId"
              element={<MovieDetailsPage></MovieDetailsPage>}
            ></Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
export default App;

