// import React, { useState } from 'react';
// import '../css/feedback.css';

// export default function Feedback() {
//   const taskFeedback = {
//   requestName: "Design Logo",
//   description: "Create a logo for a startup company.",
//   rating: 5,
//   feedbackText: "Great job, very clean and professional!",
//   userImage: "\man-icon-illustration-vector.jpg" // or null for default image
// };

//   return (
//     <>
//       <div className="history-track flex-col">
//   <div className="no-history">There is no feedback</div>

//   <div className="trackHistory flex-col">
//     <div className="hd flex-row">
//       <h6 className="request-title">Request Name</h6>
//     </div>

//     {/* Feedback section */}
//     <div className="feedback-summary flex-row ">

//       <div className="user-image">
//         <img
//           src={taskFeedback.userImage || "\man-icon-illustration-vector.jpg"}
//           alt="User"
//           style={{ width: "50px", height: "50px", borderRadius: "50%" }}
//         />
//       </div>
//       <div className="feedback-details flex-col" style={{ marginLeft: "10px" }}>
//         <div className="stars">
//           <strong>Rating:</strong>{" "}
//           {[...Array(5)].map((_, index) => (
//             <span key={index}>
//               {index < taskFeedback.rating ? "⭐" : "☆"}
//             </span>
//           ))}
//         </div>
//         <div className="user-feedback">
//           <strong>User Feedback:</strong> {taskFeedback.feedbackText}
//         </div>

//     <div className="description">
//       <strong>Description:</strong>{taskFeedback.description}
//     </div>
//       </div>
//     </div>
//   </div>
// </div>


//     </>
//   );
// }
