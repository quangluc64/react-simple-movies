import { Fragment } from "react";

export default function App() {
  return (
    <Fragment>
      <header className="header flex items-center justify-center gap-x-5 text-white py-10">
        <span className="text-primary">Home</span>
        <span>Movies</span>
      </header>
      <section className="banner h-[400px] page-container">
        <div className="w-full h-full rounded-xl bg-white relative">
          <div className="overlay absolute inset-0 rounded-xl bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)]"></div>
          <img
            src="https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/BF0D/production/_106090984_2e39b218-c369-452e-b5be-d2476f9d8728.jpg"
            alt=""
            className="w-full h-full rounded-xl object-cover"
          />
          <div className="absolute left-5 bottom-5 text-white">
            <h2 className="text-3xl font-bold mb-5">Avengers: Endgame</h2>
            <div className="flex items-center gap-x-3 mb-8">
              <span className="px-4 py-2 border border-white rounded-md">Action</span>
              <span className="px-4 py-2 border border-white rounded-md">Adventure</span>
              <span className="px-4 py-2 border border-white rounded-md">Drama</span>
            </div>
            <button className="px-6 py-3 bg-primary rounded-lg font-medium">Watch Now</button>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
