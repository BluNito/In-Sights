import React, { useEffect, useState } from "react";
import Header from "./shared/header";
import { connect } from "react-redux";
import {
  getStories,
  getTrending,
  getRecents,
  setCollectionPage,
} from "../store/actions/storyActions";
import Grid from "@material-ui/core/Grid";
import StoryTables from "./shared/storyTables";
import CollectionPager from "./shared/collectionPager";
import SplashScreen from "./shared/splash";

const Landing = (props) => {
  const [loading, setLoading] = useState(true);
  const [mainWidth, setMainWidth] = useState(8);
  const [subWidth, setSubWidth] = useState(4);
  const [miniWidth, setMiniWidth] = useState(12);

  const handlePage = (mode) => {
    if (mode === 0 && props.collectionPrev) {
      props.setCollectionPage(collectionPage - 1);
      getStories(collectionPage - 1);
    } else if (mode === 1 && props.collectionNext) {
      props.setCollectionPage(collectionPage + 1);
      getStories(collectionPage + 1);
    }
  };

  const {
    getStories,
    getTrending,
    getRecents,
    dimensions,
    collectionPage,
  } = props;
  useEffect(() => {
    const loadStories = async () => {
      await Promise.all([
        getStories(collectionPage),
        getTrending(),
        getRecents(),
      ]);
      setLoading(false);
    };
    if (dimensions.width < 1170) {
      setMainWidth(12);
      setSubWidth(12);
      setMiniWidth(6);
    } else {
      setMainWidth(8);
      setSubWidth(4);
      setMiniWidth(12);
    }
    if (loading) loadStories();
  }, [
    getStories,
    getTrending,
    getRecents,
    dimensions,
    loading,
    collectionPage,
  ]);
  return (
    <React.Fragment>
      <Header />
      {loading ? (
        <SplashScreen />
      ) : (
        <Grid container spacing={0}>
          <Grid item xs={mainWidth}>
            <StoryTables
              title="All Stories"
              content={props.collection}
              footer={
                <CollectionPager
                  page={props.collectionPage}
                  next={props.collectionNext}
                  prev={props.collectionPrev}
                  onClick={handlePage}
                />
              }
            />
          </Grid>
          <Grid item xs={subWidth}>
            <Grid container spacing={0}>
              <Grid item xs={miniWidth}>
                <StoryTables title="Trending" content={props.trending} />
              </Grid>
              <Grid item xs={miniWidth}>
                <StoryTables title="Recent" content={props.recents} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  collection: state.story.collection,
  collectionPage: state.story.collectionPage,
  collectionNext: state.story.collectionNext,
  collectionPrev: state.story.collectionPrev,
  trending: state.story.trending,
  recents: state.story.recents,
  dimensions: state.coms.dimensions,
});

export default connect(mapStateToProps, {
  getStories,
  getTrending,
  getRecents,
  setCollectionPage,
})(Landing);
