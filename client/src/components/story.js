import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getStory, getViewCount } from "../store/actions/storyActions";
import Header from "./shared/header";
import { Floater, FloaterContainer } from "./shared/floaters";
import CustomCrumbs from "./shared/breadcrumbs";
import SplashScreen from "./shared/splash";

const Story = (props) => {
  const [loading, setLoading] = useState(true);
  const { storyId } = useParams();
  const crumbs = [
    {
      name: "Stories",
      link: "/",
    },
    {
      name: `${props.story.title}`,
      link: `/story/${props.story.storyId}`,
    },
  ];
  const { getStory, getViewCount } = props;
  useEffect(() => {
    const loadStory = async () => {
      await Promise.all([getStory(storyId), getViewCount(storyId)]);
      setLoading(false);
    };
    if (loading) loadStory();
    const timer = setInterval(() => getViewCount(storyId), 30 * 1000);
    return () => clearInterval(timer);
  }, [getStory, getViewCount, loading, storyId]);

  return (
    <React.Fragment>
      <Header />
      {loading ? (
        <SplashScreen />
      ) : (
        <div className="main-content">
          <CustomCrumbs links={crumbs} />
          <FloaterContainer>
            <Floater label="Currently Viewed By" value={props.currentViews} />
            <Floater label="Total Views" value={props.totalViews} />
          </FloaterContainer>
          <div className="custom-titles">{props.story.title}</div>
          <div className="story-mode">{props.story.content}</div>
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  story: state.story.story,
  currentViews: state.story.currentViews,
  totalViews: state.story.totalViews,
});

export default connect(mapStateToProps, { getStory, getViewCount })(Story);
