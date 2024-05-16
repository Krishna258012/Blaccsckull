import React, { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import "./review.css";

const reviewsColor = {
  Positive: "#D9F2DD",
  Negative: "#F2DBD9",
  Mixed: " #A1C3D1", //"#e8bd6d3d",  this color code is not working so i changed with a mixed color
  Neutral: "#B0B0B0", // "#eaf09b6b",  this color code is not working so i changed with a neutral color
};

const Reviews = () => {
  const [review, setReview] = useState([]);

  useEffect(() => {
    fetch("reviews_data.json")
      .then((res) => res.json())
      .then((data) => setReview(data));
  }, []);

  const gethighligtedSentence = (content, analytics) => {
    let highlightedContent = content;
    //  console.log(analytics);
    analytics.forEach(({ sentences, sentiment, topic }) => {
      sentences.forEach((element) => {
        const color = reviewsColor[sentiment];
        const highlightedsentece = `<span 
          data-tooltip-id="my-tooltip"
          data-tooltip-content="${topic}"
          data-tooltip-place="top" style="background-color: ${color};">${element}</span>`;
        // console.log(highlightedsentece);
        highlightedContent = highlightedContent.replace(
          element,
          highlightedsentece
        );
      });
    });
    return { __html: highlightedContent };
  };

  // This is Optional type highlighted-content with "highlight_indices"

  // const gethighligtedSentence = (content, analytics) => {
  //   let highlightedContent = content;

  //   analytics.map(({ sentences, sentiment, topic, highlight_indices }) => {
  //     highlight_indices.map((ele1) => {
  //       const result = content.substring(ele1[0], ele1[1]);
  //       // console.log(result, ele1[0],ele1[1],ele1[2]);

  //       const color = reviewsColor[sentiment];
  //       // console.log(topic , color);
  //       const highlightedsentece = `<span data-tooltip-id="my-tooltip" data-tooltip-content="${topic}" data-tooltip-place="top" style="background-color: ${color};">${result}</span>`;
  //       // console.log(highlightedsentece);
  //       highlightedContent = highlightedContent.replace(
  //         result,
  //         highlightedsentece
  //       );
  //       // console.log(content, ele1[0],ele1[1],ele1[2]);
  //       // console.log(highlightedContent);
  //       // });
  //     });
  //   });
  //   return { __html: highlightedContent };
  // };

  return (
    <div className="container p-4 mt-3 mb-3 bg-white newcon">
      <h1>React App for Review Sentiment Analysis</h1>
      {review.map((reviews, index) => (
        <div
          key={index}
          className="p-3 mt-4 bg-body-tertiary border border-info rounded-start rounded-end"
        >
          <div className="">
            <span className="title">{reviews.reviewer_name} </span>
            <span>wrote a review on </span>
            <span className="title">tripadviser.com</span>
          </div>
          <div className="d-flex p-1 mt-1">
            {Array.from({ length: 5 }, (v, index) => {
              let number = index + 0.5;
              let stars = reviews.rating_review_score / 2;
              return (
                <span key={index}>
                  {stars >= index + 1 ? (
                    <FaStar className="icon" />
                  ) : stars >= number ? (
                    <FaStarHalfAlt className="icon" />
                  ) : (
                    <AiOutlineStar className="icon" />
                  )}
                </span>
              );
            })}
            <p className="date">{reviews.date}</p>
          </div>
          <p
            className="p-2 mt-1"
            dangerouslySetInnerHTML={gethighligtedSentence(
              reviews.content,
              reviews.analytics
            )}
          />
          <a
            href={reviews.review_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Full Review
          </a>
          <Tooltip id="my-tooltip" />
        </div>
      ))}
    </div>
  );
};

export default Reviews;
