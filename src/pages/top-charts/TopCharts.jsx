import { useSelector } from "react-redux";

import Error from "../../components/error/Error";
import Loader from "../../components/loader/Loader";
import TopChartCard from "../../components/top-chart-card/TopChartCard";
import { useGetTopChartsQuery } from "../../redux/api/shazamCore";
import "./top-charts.scss";

const TopCharts = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <Loader />;
  if (error) return <Error />;

  return (
    <div className="top__charts">
      <h1 className="top__charts-title">Top Charts</h1>
      <div className="top__charts-content">
        {data
          ?.map((song, index) => (
            <TopChartCard
              key={song.key}
              data={data}
              song={song}
              index={index}
              isPlaying={isPlaying}
              activeSong={activeSong}
            />
          ))
          .reverse()}
      </div>
    </div>
  );
};

export default TopCharts;
