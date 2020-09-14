const express = require("express");
const auth = require("../config/auth");
const keys = require("../config/keys");
const router = express.Router();

//Load input validation
const validateStoryInput = require("../validation/stories");

//Load stories models
const Story = require("../models/Stories");
const ViewLog = require("../models/ViewLog");
const Users = require("../models/Users");

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
        return res.status(400).json({ error: "Title already taken" });
      } else {
        const newStory = new Story({
          title: req.body.title,
          content: req.body.content,
          author: req.user.id,
          created: Date.now(),
          totalView: [],
        });
        newStory.save().then((_) => {
          res.json({ success: "Story shared successfully" });
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
        { sort: { _id: -1 }, skip: (page - 1) * limit, limit: limit }
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
      { sort: { totalView: -1, _id: -1 }, limit: 5 }
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

// @route   GET api/stories/recents
// @desc    Get recently opened stories
// @access  private
router.get("/recents", auth.isUser, async (req, res) => {
  try {
    const response = await User.findById(req.user.id, { recents: 1, _id: 0 });
    const recentInfo = await Promise.all(
      response.recents.map((e) =>
        Story.findById(e.sid, { title: 1, totalView: 1 }).then((res) => {
          return {
            storyId: e.sid,
            date: e.date,
            title: res.title,
            totalView: res.totalView.length,
          };
        })
      )
    );
    return res.json(recentInfo);
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
    const author = await User.findById(story.author, {
      fname: 1,
      lname: 1,
    });
    if (story) {
      if (!story.totalView.includes(req.user.id)) {
        story.totalView.push(req.user.id);
        story.save();
      }
      Users.findById(req.user.id, (err, response) => {
        if (err) throw err;
        else {
          response.recents = response.recents.filter(
            (e) => e.sid != req.query.storyId
          );
          response.recents.unshift({
            sid: req.query.storyId,
            date: Date.now(),
          });
          if (response.recents.length > 5) response.recents.pop();
          response.save();
        }
      });
      return res.json({
        storyId: story._id,
        title: story.title,
        content: story.content,
        author: author ? `${author.fname} ${author.lname}` : "Anonimous",
        totalView: story.totalView.length,
      });
    } else return res.status(404).json({ error: "Story not found" });
  } catch (e) {
    console.log(e);
    return res.status(404).json({ error: "Invalid Story ID provided" });
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
    return res.status(404).json({ error: "Document not found" });
  }
});

module.exports = router;
