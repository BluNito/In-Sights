const express = require("express");
const auth = require("../config/auth");
const keys = require("../config/keys");
const router = express.Router();

//Load input validation
const validateStoryInput = require("../validation/stories");

//Load stories models
const Story = require("../models/Stories");
const ViewLog = require("../models/ViewLog");

// @route   POST api/stories/create
// @desc    Add stories
// @access  private
router.post("/create", auth.isUser, async (req, res) => {
  const { errors, isValid } = validateStoryInput(req.body);
  if (!isValid) {
    res.status(400).json(errors);
  } else {
    try {
      const story = await Story.findOne({ title: req.body.title });
      if (story) {
        return res.status(400).json({ title: "Title already taken" });
      } else {
        const newStory = new Story({
          title: req.body.title,
          content: req.body.content,
          totalView: [],
        });
        newStory.save().then((_) => {
          res.json({ message: "Added successfully" });
        });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: "An error has occurred" });
    }
  }
});

// @route   GET api/stories/collection
// @desc    Get story collection
// @access  private
router.get("/collection", auth.isUser, async (req, res) => {
  const limit = 11;
  const page = parseInt(req.query.page);
  try {
    const [collection, count] = await Promise.all([
      Story.find(
        {},
        { content: 0 },
        { skip: (page - 1) * limit, limit: limit }
      ),
      Story.estimatedDocumentCount(),
    ]);
    return res.json({
      stories: collection.map((story) => {
        return {
          storyId: story._id,
          title: story.title,
          totalView: story.totalView.length,
        };
      }),
      records: count,
      limit: limit,
      page: page,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "An error has occurred" });
  }
});

// @route   GET api/stories/trending
// @desc    Get trending stories
// @access  private
router.get("/trending", auth.isUser, async (req, res) => {
  try {
    const trending = await Story.find(
      {},
      { content: 0 },
      { sort: { totalView: -1 }, limit: 5 }
    );
    return res.json(
      trending.map((story) => {
        return {
          storyId: story._id,
          title: story.title,
          totalView: story.totalView.length,
        };
      })
    );
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "An error has occurred" });
  }
});

// @route   GET api/stories/story/:storyId
// @desc    Get a story
// @access  private
router.get("/story", auth.isUser, async (req, res) => {
  try {
    const story = await Story.findById(req.query.storyId);
    let offset = 0;
    if (story) {
      Story.updateOne(
        {
          _id: req.query.storyId,
          totalView: { $ne: req.user.id },
        },
        {
          $push: { totalView: req.user.id },
        },
        (err, response) => {
          offset = response.nModified;
        }
      );
      return res.json({
        storyId: story._id,
        title: story.title,
        content: story.content,
        totalView: story.totalView.length + offset,
      });
    } else return res.status(404).json({ error: "Story not found" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "An error has occurred" });
  }
});

// @route   GET api/stories/viewlog/:storyId
// @desc    Get a number of people viewing a story
// @access  private
router.get("/viewlog", auth.isUser, async (req, res) => {
  try {
    const t = new Date();
    await ViewLog.updateOne(
      { uid: req.user.id },
      { sid: req.query.storyId, time: t },
      { upsert: true },
      (err, _) => {
        if (err) console.log(err);
      }
    );
    t.setSeconds(t.getSeconds() - 30);
    const [currentViews, totalViews] = await Promise.all([
      ViewLog.find({
        sid: req.query.storyId,
        time: {
          $gte: t,
        },
      }),
      Story.findById(req.query.storyId, { totalView: 1 }),
    ]);
    res.json({
      currentViews: currentViews.length,
      totalViews: totalViews.totalView.length,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "An error has occurred" });
  }
});

module.exports = router;
