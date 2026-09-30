/**
 * MEDIA MAP
 * ------------------------------------------------------------------
 * Every image/video in the demo is referenced from this one file.
 *
 * PRODUCT PHOTOS (src/assets):
 *   The original client photos were not available to the build, so these are
 *   placeholder product shots modelled on the client's items. To swap in the
 *   real photography: drop the files into src/assets/ using the same file names
 *   (or change the imports below). Nothing else needs to change.
 *
 * LIFESTYLE / EDITORIAL: stock photography (Pexels licence) referenced by URL.
 */
import capTan from "@/assets/cap-tan-flag.jpg";
import capBlack from "@/assets/cap-black-crown.jpg";
import capNavyJournal from "@/assets/cap-navy-journal.jpg";
import journalBlue from "@/assets/journal-blue.jpg";
import journalCognac from "@/assets/journal-cognac.jpg";
import braceletObsidian from "@/assets/bracelet-obsidian.jpg";
import braceletSlate from "@/assets/bracelet-slate.jpg";
import braceletTiger from "@/assets/bracelet-tiger.jpg";
import walletBlack from "@/assets/wallet-black.jpg";
import walletBrown from "@/assets/wallet-brown.jpg";

export const productPhotos = {
  capTan,
  capBlack,
  capNavyJournal,
  journalBlue,
  journalCognac,
  braceletObsidian,
  braceletSlate,
  braceletTiger,
  walletBlack,
  walletBrown,
};

const px = (id: number, w = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const lifestyle = {
  // brand / editorial
  introPortrait: px(33290971, 1200),
  editorialWrist: px(13570494, 1800),
  aboutProfile: px(33290975, 1400),
  aboutCuffs: px(37148293, 1200),
  // categories
  braceletsHero: px(15325460, 2000),
  braceletsLife: px(7327182, 1200),
  journalsHero: px(2260202, 2000),
  journalsLife: px(11911065, 1600),
  walletsHero: px(9210383, 2000),
  walletsLife: px(447570, 1600),
  capsHero: px(18224833, 1600),
  capsLife: px(15906279, 1200),
};

export const heroVideo = {
  // Pexels video 6328383 — "Man adjusting his wristwatch" (Kaboompics). Free to use.
  sources: [
    { src: "https://videos.pexels.com/video-files/6328383/6328383-hd_2048_1080_25fps.mp4", type: "video/mp4" },
    { src: "https://videos.pexels.com/video-files/6328383/6328383-sd_960_506_25fps.mp4", type: "video/mp4" },
  ],
  poster: "https://images.pexels.com/videos/6328383/man-screw-on-watch-6328383.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=1920",
};
