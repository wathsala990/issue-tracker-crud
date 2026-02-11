const Issue = require("../models/issue.model")
const User = require("../models/user.model")

const {
    CreateIssueResDTO,
    GetAllMyIssuesResDTO,
    UpdateIssueResDTO,
    GetOneMyIssuesResDTO,
    GetAllIssuesResDTO,
    ModifyResDTO
} = require("../dtos/issue.dto")

const verifyToken = require("../utils/tokens/verifyToken")

const NotificationEmail = require("../templates/email/notification.template")

const logUserAction = require("../utils/others/logUserAction")

class IssueService {
    static async CreateIssue(data, token, req) {
        const decoded = verifyToken(token)

        const user = await User.findOne({ email: decoded.email })
        if (!user) {
            throw new Error("User not found");
        }

        // const existingIssue = await Issue.findOne({
        //     user: user._id,
        //     status: "Open"
        // });

        // if (existingIssue) {
        //     throw new Error("You already have Issue with OPEN State, and wait Admin to manage this")
        // }

        const createNewIssue = new Issue({
            title: data.title,
            desc: data.desc,
            user: user._id,
        });

        const resultcreateissue = await createNewIssue.save()

        if (resultcreateissue) {
            await NotificationEmail(user.email, "Successfully Created Issue");

            await logUserAction(
                req,
                "ISSUE_CREATED",
                `${user.email} Successfully Created a new Issue`,
                this._meta(req),
                user._id
            );

            return CreateIssueResDTO()
        }
    }

    static async getmyallissues(token, req) {
        const decoded = verifyToken(token)

        const user = await User.findOne({ email: decoded.email })
        if (!user) {
            throw new Error("User not found");
        }

        const getallissues = await Issue.find({ user: user._id })

        return GetAllMyIssuesResDTO(getallissues)
    }

    static async getoneissue(token, issueid) {
        const decoded = verifyToken(token)

        const user = await User.findOne({ email: decoded.email })
        if (!user) {
            throw new Error("User not found");
        }

        const getallissues = await Issue.findById(issueid)

        return GetOneMyIssuesResDTO(getallissues)
    }

    static async updateIssue(data, token, req) {
        const decoded = verifyToken(token)

        const user = await User.findOne({ email: decoded.email })
        if (!user) {
            throw new Error("User not found");
        }

        const issue = await Issue.findById(data.issueId)
        if (!issue) {
            throw new Error("Issue Cannot find on Database")
        }

        const updateData = {};

        // only set title/desc if they exist in request
        if (data.title) updateData.title = data.title;
        if (data.desc) updateData.desc = data.desc;

        const updatedIssue = await Issue.findByIdAndUpdate(
            data.issueId,
            updateData,
            { new: true }
        );

        if (updatedIssue) {
            await NotificationEmail(user.email, `Successfully Updated Issue ${issue._id}`);

            await logUserAction(
                req,
                "ISSUE_CREATED",
                `${user.email} Successfully Created a new Issue`,
                this._meta(req),
                user._id
            );

            return UpdateIssueResDTO()
        }
    }

    static async manageIssues(token, req) {
        const decoded = verifyToken(token)

        const user = await User.findOne({ email: decoded.email })
        if (!user) {
            throw new Error("User not found");
        }

        const getallissues = await Issue.find()

        return GetAllIssuesResDTO(getallissues)
    }


    static async modifyIssue(data, token, req) {
        const decoded = verifyToken(token)

        const user = await User.findOne({ email: decoded.email })
        if (!user) {
            throw new Error("User not found");
        }

        const issue = await Issue.findById(data.issueId)
        
        const issueOwner = await User.findById(issue.user)

        const updateData = {};

        // only set title/desc if they exist in request
        if (data.severity) updateData.severity = data.severity;
        if (data.priority) updateData.priority = data.priority;
        if (data.status) updateData.status = data.status;

        const updatedIssue = await Issue.findByIdAndUpdate(
            data.issueId,
            updateData,
            { new: true }
        );

        if (updatedIssue) {
            await NotificationEmail(issueOwner.email, `Your Issue has been updated by Admin`);

            await logUserAction(
                req,
                "ISSUE_MODIFY",
                `${user.email} Successfully Modify Issue ${issue._id}, ${issue.email}`,
                this._meta(req),
                user._id
            );

            return ModifyResDTO()
        }
    }

    // ============================================================================================


    // helper for get meta data
    static _ip(req) {
        return req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    }
    static _meta(req) {
        return {
            ipAddress: this._ip(req),
            userAgent: req.headers["user-agent"],
            timestamp: new Date()
        };
    }
}

module.exports = IssueService