import React from "react";
import { deleteComment } from "../../Managers/CommentManager.js";

export const CommentDelete = (comment) => {
        if (window.confirm(`Would you like to delete this Post?\nSubject: ${comment.subject}`)) {
            deleteComment(comment.id).then(() => {
                window.alert("Successfully deleted comment.");
                window.location.reload();
        });
        } else return;
};
